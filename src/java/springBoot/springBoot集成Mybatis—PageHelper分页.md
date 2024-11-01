



## 准备知识
### 逻辑分页和物理分页的区别
* 逻辑分页：从数据库将所有记录查询出来，存储到内存中，展示当前页，然后数据再直接从内存中获取（前台分页）
* 物理分页：只从数据库中查询当前页的数据（后台分页）

由于 MyBatis 默认实现中采用的是逻辑分页，所以才诞生了`PageHelper`一类的物理分页框架。
### 不同数据库的物理分页是如何实现的？
不同的数据库有不同的实现方式：（简单而言：mysql 使用`limit`，SQLServer 使用`top`，Oracle 使用`rowNum`）。

MySQL 使用`LIMIT`
```sql
SELECT username, password 
FROM tb_user 
WHERE id = 1 
LIMIT 100,10
```
SQLServer 2012 使用`top`
```sql
SELECT top(50) LastName, FirstName, EmailAddress
FROM Employee
ORDER BY LastName, FirstName, EmailAddress
OFFSET 14000 ROWS
FETCH NEXT 50 ROWS ONLY;
```
ORACLE
```sql
SELECT *  
  FROM (SELECT AA.*, ROWNUM RN  
          FROM (SELECT * FROM USERS ORDER BY ID DESC) AA  
         WHERE ROWNUM <= 10 )  
 WHERE RN > 0 
```
## 简单示例
`PageHelper`有多种用法，这里主要介绍几种常见用法。具体请参考[官网的介绍](https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/HowToUse.md)。
### 第一种：RowBounds方式的调用
```java
List<User> list = sqlSession.selectList("x.y.selectIf", null, new RowBounds(0, 10));
```
### 第二种：Mapper接口方式的调用startPage
推荐这种使用方式。
```java
PageHelper.startPage(1, 10);
List<User> list = userMapper.selectIf(1);
```
### 第三种：Mapper接口方式的调用offsetPage
推荐这种使用方式。
```java
PageHelper.offsetPage(1, 10);
List<User> list = userMapper.selectIf(1);
```
### 第四种:参数方法调用
```java
//存在以下 Mapper 接口方法，你不需要在 xml 处理后两个参数
public interface CountryMapper {
    List<User> selectByPageNumSize(
            @Param("user") User user,
            @Param("pageNum") int pageNum, 
            @Param("pageSize") int pageSize);
}
//配置supportMethodsArguments=true
//在代码中直接调用：
List<User> list = userMapper.selectByPageNumSize(user, 1, 10);
```
### 第五种:参数对象
```java
//如果 pageNum 和 pageSize 存在于 User 对象中，只要参数有值，也会被分页
//有如下 User 对象
public class User {
    //其他fields
    //下面两个参数名和 params 配置的名字一致
    private Integer pageNum;
    private Integer pageSize;
}
//存在以下 Mapper 接口方法，你不需要在 xml 处理后两个参数
public interface CountryMapper {
    List<User> selectByPageNumSize(User user);
}
//当 user 中的 pageNum!= null && pageSize!= null 时，会自动分页
List<User> list = userMapper.selectByPageNumSize(user);
```
### 第六种：ISelect 接口方式
jdk6,7 用法，创建接口
```java
Page<User> page = PageHelper.startPage(1, 10).doSelectPage(new ISelect() {
    @Override
    public void doSelect() {
        userMapper.selectGroupBy();
    }
});
```
jdk8 lambda用法
```java
Page<User> page = PageHelper.startPage(1, 10).doSelectPage(()-> userMapper.selectGroupBy());
```
也可以直接返回`PageInfo`，注意`doSelectPageInfo`方法和`doSelectPage`
```java
pageInfo = PageHelper.startPage(1, 10).doSelectPageInfo(new ISelect() {
    @Override
    public void doSelect() {
        userMapper.selectGroupBy();
    }
});
```
对应的`lambda`用法
```java
pageInfo = PageHelper.startPage(1, 10).doSelectPageInfo(() -> userMapper.selectGroupBy());
```
`count`查询，返回一个查询语句的`count`数
```java
long total = PageHelper.count(new ISelect() {
    @Override
    public void doSelect() {
        userMapper.selectLike(user);
    }
});
```
对应的`lambda`用法
```java
total = PageHelper.count(()->userMapper.selectLike(user));
```
## 进一步理解
### PageHelper是如何实现分页的？
我们知道如何使用`PageHelper`后，我们发现使用`PageHelper.startPage(pageNum, pageSize, orderBy)`方法后的第一个`select`是具备分页能力的，那它是如何做到的呢？

理解它的原理，有两个点：
* 第一，相对于 JDBC 这种嵌入式的分页而言，`PageHelper`分页是独立的，能做到独立分页查询，那它必然是通过某个拦截点进行了拦截，这样它才能够进行解耦分离出分页。
* 第二，我们通过`PageHelper.startPage(pageNum, pageSize, orderBy)`方法后的第一个`select`是具备分页能力的，那它必然缓存了分页信息，同时结合线程知识，这里必然使用的是本地栈`ThreadLocal`，即每个线程有一个本地缓存。

关键就是两点（拦截，`ThreadLocal`），我们看下源码：
```java
/**
 * Mybatis拦截器方法
 *
 * @param invocation 拦截器入参
 * @return 返回执行结果
 * @throws Throwable 抛出异常
 */
public Object intercept(Invocation invocation) throws Throwable {
    if (autoRuntimeDialect) {
        SqlUtil sqlUtil = getSqlUtil(invocation);
        return sqlUtil.processPage(invocation);
    } else {
        if (autoDialect) {
            initSqlUtil(invocation);
        }
        return sqlUtil.processPage(invocation);
    }
}
```
进而看下`sqlUtil.processPage(invocation);`方法。
```java
/**
 *
 * @param invocation 拦截器入参
 * @return 返回执行结果
 * @throws Throwable 抛出异常
 */
private Object _processPage(Invocation invocation) throws Throwable {
    final Object[] args = invocation.getArgs();
    Page page = null;
    //支持方法参数时，会先尝试获取Page
    if (supportMethodsArguments) {
        // 从线程本地变量中获取Page信息，就是我们刚刚设置的
        page = getPage(args);
    }
    //分页信息
    RowBounds rowBounds = (RowBounds) args[2];
    //支持方法参数时，如果page == null就说明没有分页条件，不需要分页查询
    if ((supportMethodsArguments && page == null)
            //当不支持分页参数时，判断LocalPage和RowBounds判断是否需要分页
            || (!supportMethodsArguments && SqlUtil.getLocalPage() == null && rowBounds == RowBounds.DEFAULT)) {
        return invocation.proceed();
    } else {
        //不支持分页参数时，page==null，这里需要获取
        if (!supportMethodsArguments && page == null) {
            page = getPage(args);
        }
        // 进入查看
        return doProcessPage(invocation, page, args);
    }
}
```
所以`startPage`方法和这里的`getPage(args);`这方法里应该包含了`ThreadLocal`中设置和获取分页参数的，让我们看下`startPage`方法即可：
```java
public static <E> Page<E> startPage(int pageNum, int pageSize, boolean count, Boolean reasonable, Boolean pageSizeZero) {
    Page<E> page = new Page(pageNum, pageSize, count);
    page.setReasonable(reasonable);
    page.setPageSizeZero(pageSizeZero);
    Page<E> oldPage = getLocalPage();
    if (oldPage != null && oldPage.isOrderByOnly()) {
        page.setOrderBy(oldPage.getOrderBy());
    }

    setLocalPage(page);
    return page;
}
// ...
protected static final ThreadLocal<Page> LOCAL_PAGE = new ThreadLocal();

protected static void setLocalPage(Page page) {
    LOCAL_PAGE.set(page); // 看这里
}

// ...
```
### 使用PageHelper注意点
* 只有紧跟在`PageHelper.startPage`方法后的第一个 Mybatis 的查询（`Select`）方法会被分页。
* 不要配置多个分页插件：使用 Spring 时，`mybatis-config.xml`和 Spring`<bean>`配置方式，请选择其中一种，不要同时配置多个分页插件。
* 分页插件不支持带有`for update`语句的分页：对于带有`for update`的`sql`，会抛出运行时异常，对于这样的`sql`建议手动分页，毕竟这样的`sql`需要重视。
* 分页插件不支持嵌套结果映射：由于嵌套结果方式会导致结果集被折叠，因此分页查询的结果在折叠后总数会减少，所以无法保证分页结果数量正确。
