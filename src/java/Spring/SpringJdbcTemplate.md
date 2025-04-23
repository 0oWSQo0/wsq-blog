

Spring 提供了一个 JDBC 模块，它对 JDBC API 进行了封装，其的主要目的降低 JDBC API 的使用难度，以一种更直接、更简洁的方式使用 JDBC API。

使用 Spring JDBC，开发人员只需要定义必要的参数、指定需要执行的 SQL 语句，即可轻松的进行 JDBC 编程，对数据库进行访问。

至于驱动的加载、数据库连接的开启与关闭、SQL 语句的创建与执行、异常处理以及事务处理等繁杂乏味的工作，则都是由 Spring JDBC 完成的。这样就可以使开发人员从繁琐的 JDBC API 中解脱出来，有更多的精力专注于业务的开发。

Spring JDBC 提供了多个实用的数据库访问工具，以简化 JDBC 的开发，其中使用最多就是 JdbcTemplate。
## JdbcTemplate
JdbcTemplate 是 Spring JDBC 核心包中的核心类，它可以通过配置文件、注解、Java 配置类等形式获取数据库的相关信息，实现了对 JDBC 开发过程中的驱动加载、连接的开启和关闭、SQL 语句的创建与执行、异常处理、事务处理、数据类型转换等操作的封装。我们只要对其传入SQL 语句和必要的参数即可轻松进行 JDBC 编程。

JdbcTemplate 的全限定命名为`org.springframework.jdbc.core.JdbcTemplate`，它提供了大量的查询和更新数据库的方法。

| 方法                                                                            | 说明                                                                |
|-------------------------------------------------------------------------------|-------------------------------------------------------------------|
| public int update(String sql)<br>public int update(String sql,Object... args) | 用于执行新增、更新、删除等语句；<br>sql：需要执行的 SQL 语句；<br>args 表示需要传入到 SQL 语句中的参数  |
| public void execute(String sql)<br>public T execute(String sql, PreparedStatementCallback action) | 可以执行任意 SQL，一般用于执行 DDL 语句；<br>sql：需要执行的 SQL 语句；<br>action 表示执行完 SQL 语句后，要调用的函数 |
| public <T> List<T> query(String sql, RowMapper<T> rowMapper, @Nullable Object... args)   | 用于执行查询语句；<br>sql：需要执行的 SQL 语句；<br>rowMapper：用于确定返回的集合（List）的类型；<br>args：表示需要传入到 SQL 语句的参数 |
| public <T> T queryForObject(String sql, RowMapper<T> rowMapper, @Nullable Object... args)  | 同上                                                                |
|  public int[] batchUpdate(String sql, List<Object[]> batchArgs, final int[] argTypes)    | 用于批量执行新增、更新、删除等语句；<br>sql：需要执行的 SQL 语句；<br>argTypes：需要注入的 SQL 参数的 JDBC 类型；<br>batchArgs：表示需要传入到 SQL 语句的参数 |

## 示例
1.创建一个用户信息（`user`）表。
```sql
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户 ID',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `status` varchar(255) DEFAULT NULL COMMENT '用户状态',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
```
2.创建项目引入依赖。
```text
spring-beans-5.3.13.RELEASE.jar
spring-context-5.3.13.RELEASE.jar
spring-core-5.3.13.RELEASE.jar
spring-expression-5.3.13.RELEASE.jar
commons-logging-1.2.jar
spring-jdbc-5.3.13.RELEASE.jar # Spring JDBC 的核心依赖包
spring-tx-5.3.13.RELEASE.jar # 用来处理事务和异常的依赖包
spring-aop-5.3.13.jar
mysql-connector-java-8.0.23.jar # MySQL 提供的 JDBC 驱动包
```
3.在 src 目录下创建一个 jdbc.properties，并在该配置文件中对数据库连接信息进行配置。
```text
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://127.0.0.1:3306/spring_jdbc_db
jdbc.username=root
jdbc.password=root
```
4.在 src 目录下创建一个 XML 配置文件`Beans.xml`。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd">
    <!--开启组件扫描-->
    <context:component-scan base-package="net.biancheng.c"></context:component-scan>
    <!--引入 jdbc.properties 中的配置-->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

    <!--定义数据源 Bean-->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <!--数据库连接地址-->
        <property name="url" value="${jdbc.url}"/>
        <!--数据库的用户名-->
        <property name="username" value="${jdbc.username}"/>
        <!--数据库的密码-->
        <property name="password" value="${jdbc.password}"/>
        <!--数据库驱动-->
        <property name="driverClassName" value="${jdbc.driver}"/>
    </bean>

    <!--定义JdbcTemplate Bean-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <!--将数据源的 Bean 注入到 JdbcTemplate 中-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>
   
</beans>
```
5.创建`User`的实体类。
```java
package net.biancheng.c.entity;

public class User {
    private Integer userId;
    private String userName;
    private String status;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
```
6.创建`UserDao`。
```java
package net.biancheng.c.dao;

import net.biancheng.c.entity.User;

import java.util.List;

public interface UserDao {
    /**
     * 新增一条用户
     *
     * @param user
     * @return
     */
    int addUer(User user);

    /**
     * 更新指定的用户信息
     *
     * @param user
     * @return
     */
    int update(User user);

    /**
     * 删除指定的用户信息
     *
     * @param user
     * @return
     */
    int delete(User user);

    /**
     * 统计用户个数
     *
     * @param user
     * @return
     */
    int count(User user);

    /**
     * 查询用户列表
     *
     * @param user
     * @return
     */
    List<User> getList(User user);

    /**
     * 查询单个用户信息
     *
     * @param user
     * @return
     */
    User getUser(User user);

    /**
     * 批量增加用户
     *
     * @param batchArgs
     */
    void batchAddUser(List<Object[]> batchArgs);
}
```
7.创建`UserDao`的实现类`UserDaoImpl`。
```java
package net.biancheng.c.dao.impl;

import net.biancheng.c.dao.UserDao;
import net.biancheng.c.entity.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Resource
    private JdbcTemplate jdbcTemplate;
    @Resource
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public int addUer(User user) {
        String sql = "INSERT into `user` (`user`.user_name,`user`.`status`) VALUES(?,?);";
        int update = jdbcTemplate.update(sql, user.getUserName(), user.getStatus());
        return update;
    }

    @Override
    public int update(User user) {
        String sql = "UPDATE `user` SET status=? WHERE user_name=?;";

        return jdbcTemplate.update(sql, user.getStatus(), user.getUserName());
    }

    @Override
    public int delete(User user) {
        String sql = "DELETE FROM `user` where user_name=?;";
        return jdbcTemplate.update(sql, user.getUserName());
    }

    @Override
    public int count(User user) {
        String sql = "SELECT COUNT(*) FROM `user` where `status`=?;";
        return jdbcTemplate.queryForObject(sql, Integer.class, user.getStatus());
    }


    @Override
    public List<User> getList(User user) {
        String sql = "SELECT * FROM `user` where `status`=?;";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<User>(User.class), user.getStatus());
    }

    @Override
    public User getUser(User user) {
        String sql = "SELECT * FROM `user` where `user_id`=?;";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), user.getUserId());
    }

    @Override
    public void batchAddUser(List<Object[]> batchArgs) {
        String sql = "INSERT into `user` (`user`.user_name,`user`.`status`) VALUES(?,?);";
        jdbcTemplate.batchUpdate(sql, batchArgs);
    }

}
```
8.创建一个名为`UserService`的接口。
```java
package net.biancheng.c.service;

import net.biancheng.c.entity.User;

import java.util.List;

public interface UserService {
    /**
     * 新增用户数据
     *
     * @param user
     * @return
     */
    public int addUser(User user);

    /**
     * 更新用户数据
     *
     * @param user
     * @return
     */
    public int updateUser(User user);

    /**
     * 删除用户数据
     *
     * @param user
     * @return
     */
    public int deleteUser(User user);

    /**
     * 统计用户数量
     *
     * @param user
     * @return
     */
    public int countUser(User user);

    /**
     * 查询用户数据
     *
     * @param user
     * @return
     */
    public List<User> getUserList(User user);

    /**
     * 查询单个用户信息
     *
     * @param user
     * @return
     */
    public User getUser(User user);

    /**
     * 批量添加用户
     *
     * @param batchArgs
     */
    public void batchAddUser(List<Object[]> batchArgs);

}
```
9.创建`UserService`的实现类`UserServiceImpl`。
```java
package net.biancheng.c.service.impl;

import net.biancheng.c.dao.UserDao;
import net.biancheng.c.entity.User;
import net.biancheng.c.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userDao;

    @Override
    public int addUser(User user) {
        return userDao.addUer(user);
    }

    @Override
    public int updateUser(User user) {

        return userDao.update(user);
    }

    @Override
    public int deleteUser(User user) {
        return userDao.delete(user);
    }

    @Override
    public int countUser(User user) {
        return userDao.count(user);
    }

    @Override
    public List<User> getUserList(User user) {
        return userDao.getList(user);
    }

    @Override
    public User getUser(User user) {
        return userDao.getUser(user);
    }

    @Override
    public void batchAddUser(List<Object[]> batchArgs) {
        userDao.batchAddUser(batchArgs);
    }

    @Override
    public int countOfUserByName(User user) {
        return userDao.countOfUserByName(user);
    }

    @Override
    public User getUserByUserId(User user) {
        return userDao.getUserByUserId(user);
    }

}
```
10.创建一个名为`MainApp`的类。
```java
package net.biancheng.c;

import net.biancheng.c.entity.User;
import net.biancheng.c.service.UserService;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;
import java.util.List;


public class MainApp {

    public static void main(String[] args) {
        ApplicationContext context2 = new ClassPathXmlApplicationContext("Beans.xml");
        UserService userService = context2.getBean("userService", UserService.class);

        User user = new User();
        user.setUserName("小张");
        user.setStatus("离线线");
        //新增一个用户
        int i = userService.addUser(user);
        System.out.println("新增用户成功！");

        User user1 = new User();
        user1.setUserName("小张");
        user1.setStatus("在线");
        int u = userService.updateUser(user1);
        System.out.println("修改用户成功");

        List<Object[]> batchArgs = new ArrayList<>();
        Object[] o1 = {"小明", "在线"};
        Object[] o2 = {"小龙", "离线"};
        Object[] o3 = {"小林", "在线"};
        Object[] o4 = {"小李", "在线"};
        batchArgs.add(o1);
        batchArgs.add(o2);
        batchArgs.add(o3);
        batchArgs.add(o4);
        userService.batchAddUser(batchArgs);
        System.out.println("批量增加完毕");

        User user2 = new User();
        user2.setStatus("在线");
        int i1 = userService.countUser(user2);
        System.out.println("在线用户的个数为：" + i1);

        List<User> userList = userService.getUserList(user2);
        System.out.println("在线用户列表查询成功！");
        for (User user4 : userList) {
            System.out.println("用户 ID:" + user4.getUserId() + "，用户名：" + user4.getUserName() + "，状态：" + user4.getStatus());
        }
    }
}
```
11.执行`MainApp`中的`main`方法，控制台输出如下。
```text
新增用户成功！
修改用户成功
批量增加完毕
在线用户的个数为：4
在线用户列表查询成功！
用户 ID:1，用户名：小张，状态：在线
用户 ID:2，用户名：小明，状态：在线
用户 ID:4，用户名：小林，状态：在线
用户 ID:5，用户名：小李，状态：在线
```
