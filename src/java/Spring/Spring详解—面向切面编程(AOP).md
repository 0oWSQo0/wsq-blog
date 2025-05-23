





# 引入
1. Spring 框架通过定义切面，拦截切点实现了不同业务模块的解耦，这个就叫面向切面编程 - `Aspect Oriented Programming(AOP)`
2. 为什么`@Aspect`注解使用的是`aspectj`的`jar`包呢？这就引出了 Aspect4J 和 Spring AOP 的历史渊源，只有理解了 Aspect4J 和 Spring 的渊源才能理解有些注解上的兼容设计
3. 如何支持更多拦截方式来实现解耦， 以满足更多场景需求呢？这就是@Around, @Pointcut... 等的设计
4. 那么Spring框架又是如何实现AOP的呢？ 这就引入代理技术，分静态代理和动态代理，动态代理又包含JDK代理和CGLIB代理等


# 如何理解AOP
AOP的本质也是为了解耦，它是一种设计思想；在理解时也应该简化理解。
## AOP是什么
AOP 为`Aspect Oriented Programming`的缩写，意为：面向切面编程。

AOP 最早是 AOP 联盟的组织提出的，指定的一套规范，spring 将 AOP 的思想引入框架之中，通过预编译方式和运行期间动态代理实现程序的统一维护的一种技术。

先来看一个例子， 如何给如下`UserServiceImpl`中所有方法添加进入方法的日志。
```java
public class UserServiceImpl implements IUserService {

    /**
     * find user list.
     *
     * @return user list
     */
    @Override
    public List<User> findUserList() {
        System.out.println("execute method： findUserList");
        return Collections.singletonList(new User("pdai", 18));
    }

    /**
     * add user
     */
    @Override
    public void addUser() {
        System.out.println("execute method： addUser");
        // do something
    }

}
```
我们将记录日志功能解耦为日志切面，它的目标是解耦。进而引出 AOP 的理念：就是将分散在各个业务逻辑代码中相同的代码通过横向切割的方式抽取到一个独立的模块中！

![](Spring详解—面向切面编程(AOP)/spring-framework-aop-4.png)

OOP 面向对象编程，针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的逻辑单元划分。而 AOP 则是针对业务处理过程中的切面进行提取，它所面对的是处理过程的某个步骤或阶段，以获得逻辑过程中各部分之间低耦合的隔离效果。这两种设计思想在目标上有着本质的差异。

![](Spring详解—面向切面编程(AOP)/spring-framework-aop-2.png)

## AOP术语
首先让我们从一些重要的AOP概念和术语开始。这些术语不是Spring特有的。
* 连接点（`Jointpoint`）：表示需要在程序中插入横切关注点的扩展点，连接点可能是类初始化、方法执行、方法调用、字段调用或处理异常等等，Spring 只支持方法执行连接点，在 AOP 中表示为在哪里干；
* 切入点（`Pointcut`）：选择一组相关连接点的模式，即可以认为连接点的集合，Spring 支持 perl5 正则表达式和 AspectJ 切入点模式，Spring 默认使用 AspectJ 语法，在 AOP 中表示为在哪里干的集合；
* 通知（`Advice`）：在连接点上执行的行为，通知提供了在 AOP 中需要在切入点所选择的连接点处进行扩展现有行为的手段；包括前置通知（`before advice`）、后置通知(`after advice`)、环绕通知（`around advice`），在 Spring 中通过代理模式实现 AOP，并通过拦截器模式以环绕连接点的拦截器链织入通知；在 AOP 中表示为干什么；
* 方面/切面（`Aspect`）：横切关注点的模块化，比如上边提到的日志组件。可以认为是通知、引入和切入点的组合；在 Spring 中可以使用 Schema 和 @AspectJ 方式进行组织实现；在 AOP 中表示为在哪干和干什么集合；
* 引入（`inter-type declaration`）：也称为内部类型声明，为已有的类添加额外新的字段或方法，Spring 允许引入新的接口（必须对应一个实现）到所有被代理对象（目标对象）, 在 AOP 中表示为干什么（引入什么）；
* 目标对象（`Target Object`）：需要被织入横切关注点的对象，即该对象是切入点选择的对象，需要被通知的对象，从而也可称为被通知对象；由于 Spring AOP 通过代理模式实现，从而这个对象永远是被代理对象，在 AOP 中表示为对谁干；
* 织入（`Weaving`）：把切面连接到其它的应用程序类型或者对象上，并创建一个被通知的对象。这些可以在编译时（例如使用 AspectJ 编译器），类加载时和运行时完成。Spring 和其他纯 Java AOP 框架一样，在运行时完成织入。在 AOP 中表示为怎么实现的；
* AOP 代理（`AOP Proxy`）：AOP 框架使用代理模式创建的对象，从而实现在连接点处插入通知（即应用切面），就是通过代理来对目标对象应用切面。在 Spring 中，AOP 代理可以用 JDK 动态代理或 CGLIB 代理实现，而通过拦截器模型应用切面。在 AOP 中表示为怎么实现的一种典型方式；

通知类型：
* 前置通知（`Before advice`）：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。
* 后置通知（`After returning advice`）：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。
* 异常通知（`After throwing advice`）：在方法抛出异常退出时执行的通知。
* 最终通知（`After (finally) advice`）：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。
* 环绕通知（`Around Advice`）：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。

环绕通知是最常用的通知类型。和 AspectJ 一样，Spring 提供所有类型的通知，我们推荐你使用尽可能简单的通知类型来实现需要的功能。例如，如果你只是需要一个方法的返回值来更新缓存，最好使用后置通知而不是环绕通知，尽管环绕通知也能完成同样的事情。用最合适的通知类型可以使得编程模型变得简单，并且能够避免很多潜在的错误。比如，你不需要在`JoinPoint`上调用用于环绕通知的`proceed()`方法，就不会有调用的问题。

我们把这些术语串联到一起，方便理解

![](Spring详解—面向切面编程(AOP)/spring-framework-aop-3.png)


## Spring AOP和AspectJ是什么关系
### 首先AspectJ是什么？
AspectJ 是一个 java 实现的 AOP 框架，它能够对 java 代码进行 AOP 编译（一般在编译期进行），让 java 代码具有 AspectJ 的 AOP 功能（当然需要特殊的编译器）。

可以这样说 AspectJ 是目前实现AOP框架中最成熟，功能最丰富的语言，更幸运的是，AspectJ 与 java 程序完全兼容，几乎是无缝关联，因此对于有 java 编程基础的工程师，上手和使用都非常容易。
### 其次，为什么需要理清楚Spring AOP和AspectJ的关系？
我们看下`@Aspect`以及增强的几个注解，为什么不是 Spring 包，而是来源于 aspectJ 呢？

![](Spring详解—面向切面编程(AOP)/spring-framework-aop-5.png)

### Spring AOP和AspectJ是什么关系？
1. AspectJ 是更强的 AOP 框架，是实际意义的 AOP 标准；
2. Spring 为何不写类似 AspectJ 的框架？Spring AOP 使用纯 Java 实现，它不需要专门的编译过程，它一个重要的原则就是无侵入性（`non-invasiveness`）；Spring 小组完全有能力写类似的框架，只是 Spring AOP 从来没有打算通过提供一种全面的 AOP 解决方案来与 AspectJ 竞争。Spring 的开发小组相信无论是基于代理（`proxy-based`）的框架如 Spring AOP 或者是成熟的框架如 AspectJ 都是很有价值的，他们之间应该是互补而不是竞争的关系。
3. Spring小组喜欢`@AspectJ`注解风格更胜于 Spring XML 配置；所以在 Spring 2.0 使用了和 AspectJ 5 一样的注解，并使用 AspectJ 来做切入点解析和匹配。但是，AOP 在运行时仍旧是纯的 Spring AOP，并不依赖于 AspectJ 的编译器或者织入器（`weaver`）。
4. Spring2.5 对 AspectJ 的支持：在一些环境下，增加了对 AspectJ 的装载时编织支持，同时提供了一个新的`bean`切入点。

### 更多关于AspectJ？
了解 AspectJ 应用到 java 代码的过程（这个过程称为织入），对于织入这个概念，可以简单理解为`aspect`(切面)应用到目标函数(类)的过程。

对于这个过程，一般分为动态织入和静态织入：
* 动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的，如 Java JDK 的动态代理(`Proxy`，底层通过反射实现)或者 CGLIB 的动态代理(底层通过继承实现)，Spring AOP 采用的就是基于运行时增强的代理技术
* ApectJ 采用的就是静态织入的方式。ApectJ 主要采用的是编译期织入，在这个期间使用 AspectJ 的 acj 编译器(类似javac)把`aspect`类编译成`class`字节码后，在 java 目标类编译时织入，即先编译`aspect`类再编译目标类。

![](Spring详解—面向切面编程(AOP)/spring-framework-aop-6.png)

# AOP的配置方式
Spring AOP 支持对 XML 模式和基于`@AspectJ`注解的两种配置方式。
## XML Schema配置方式
Spring 提供了使用`aop`命名空间来定义一个切面，我们来看个例子：

定义目标类
```java
package tech.pdai.springframework.service;

public class AopDemoServiceImpl {

    public void doMethod1() {
        System.out.println("AopDemoServiceImpl.doMethod1()");
    }

    public String doMethod2() {
        System.out.println("AopDemoServiceImpl.doMethod2()");
        return "hello world";
    }

    public String doMethod3() throws Exception {
        System.out.println("AopDemoServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```
定义切面类
```java
package tech.pdai.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

public class LogAspect {

    /**
     * 环绕通知.
     *
     * @param pjp pjp
     * @return obj
     * @throws Throwable exception
     */
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    /**
     * 前置通知.
     */
    public void doBefore() {
        System.out.println("前置通知");
    }

    /**
     * 后置通知.
     *
     * @param result return val
     */
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    /**
     * 异常通知.
     *
     * @param e exception
     */
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    /**
     * 最终通知.
     */
    public void doAfter() {
        System.out.println("最终通知");
    }
}
```
XML配置AOP
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans.xsd
 http://www.springframework.org/schema/aop
 http://www.springframework.org/schema/aop/spring-aop.xsd
 http://www.springframework.org/schema/context
 http://www.springframework.org/schema/context/spring-context.xsd
">

    <context:component-scan base-package="tech.pdai.springframework" />

    <aop:aspectj-autoproxy/>

    <!-- 目标类 -->
    <bean id="demoService" class="tech.pdai.springframework.service.AopDemoServiceImpl">
        <!-- configure properties of bean here as normal -->
    </bean>

    <!-- 切面 -->
    <bean id="logAspect" class="tech.pdai.springframework.aspect.LogAspect">
        <!-- configure properties of aspect here as normal -->
    </bean>

    <aop:config>
        <!-- 配置切面 -->
        <aop:aspect ref="logAspect">
            <!-- 配置切入点 -->
            <aop:pointcut id="pointCutMethod" expression="execution(* tech.pdai.springframework.service.*.*(..))"/>
            <!-- 环绕通知 -->
            <aop:around method="doAround" pointcut-ref="pointCutMethod"/>
            <!-- 前置通知 -->
            <aop:before method="doBefore" pointcut-ref="pointCutMethod"/>
            <!-- 后置通知；returning属性：用于设置后置通知的第二个参数的名称，类型是Object -->
            <aop:after-returning method="doAfterReturning" pointcut-ref="pointCutMethod" returning="result"/>
            <!-- 异常通知：如果没有异常，将不会执行增强；throwing属性：用于设置通知第二个参数的的名称、类型-->
            <aop:after-throwing method="doAfterThrowing" pointcut-ref="pointCutMethod" throwing="e"/>
            <!-- 最终通知 -->
            <aop:after method="doAfter" pointcut-ref="pointCutMethod"/>
        </aop:aspect>
    </aop:config>

    <!-- more bean definitions for data access objects go here -->
</beans>
```
测试类
```java
/**
  * main interfaces.
  *
  * @param args args
  */
public static void main(String[] args) {
    // create and configure beans
    ApplicationContext context = new ClassPathXmlApplicationContext("aspects.xml");

    // retrieve configured instance
    AopDemoServiceImpl service = context.getBean("demoService", AopDemoServiceImpl.class);

    // use configured instance
    service.doMethod1();
    service.doMethod2();
    try {
        service.doMethod3();
    } catch (Exception e) {
        // e.printStackTrace();
    }
}
```
输出结果
```
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod1()
环绕通知: 退出方法
最终通知
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod2()
环绕通知: 退出方法
最终通知
后置通知, 返回值: hello world
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod3()
最终通知
异常通知, 异常: some exception
```
## AspectJ注解方式
基于 XML 的声明式 AspectJ 存在一些不足，需要在 Spring 配置文件配置大量的代码信息，为了解决这个问题，Spring 使用了`@AspectJ`框架为 AOP 的实现提供了一套注解。

| 注解名称        |  解释|
| :--: | :-- |
| @Aspect         | 用来定义一个切面。|
| @pointcut       | 用于定义切入点表达式。在使用时还需要定义一个包含名字和任意参数的方法签名来表示切入点名称，这个方法签名就是一个返回值为void，且方法体为空的普通方法。|
| @Before         | 用于定义前置通知，相当于BeforeAdvice。在使用时，通常需要指定一个value属性值，该属性值用于指定一个切入点表达式(可以是已有的切入点，也可以直接定义切入点表达式)。|
| @AfterReturning | 用于定义后置通知，相当于AfterReturningAdvice。在使用时可以指定pointcut/value和returning属性，其中pointcut/value这两个属性的作用一样，都用于指定切入点表达式。|
| @Around        | 用于定义环绕通知，相当于MethodInterceptor。在使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。|
| @After-Throwing | 用于定义异常通知来处理程序中未处理的异常，相当于ThrowAdvice。在使用时可指定pointcut / value和throwing属性。其中pointcut/value用于指定切入点表达式，而throwing属性值用于指定-一个形参名来表示Advice方法中可定义与此同名的形参，该形参可用于访问目标方法抛出的异常。|
| @After          | 用于定义最终final 通知，不管是否异常，该通知都会执行。使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。|
| @DeclareParents | 用于定义引介通知，相当于IntroductionInterceptor (不要求掌握)。|

Spring AOP 的实现方式是动态织入，动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的；如 Java JDK 的动态代理(`Proxy`，底层通过反射实现)或者 CGLIB 的动态代理(底层通过继承实现)，Spring AOP 采用的就是基于运行时增强的代理技术。所以我们看下如下的两个例子：
* 基于JDK代理例子
* 基于Cglib代理例子

### 接口使用JDK代理
定义接口
```java
/**
 * Jdk Proxy Service.
 *
 */
public interface IJdkProxyService {

    void doMethod1();

    String doMethod2();

    String doMethod3() throws Exception;
}
```
实现类
```java
@Service
public class JdkProxyDemoServiceImpl implements IJdkProxyService {

    @Override
    public void doMethod1() {
        System.out.println("JdkProxyServiceImpl.doMethod1()");
    }

    @Override
    public String doMethod2() {
        System.out.println("JdkProxyServiceImpl.doMethod2()");
        return "hello world";
    }

    @Override
    public String doMethod3() throws Exception {
        System.out.println("JdkProxyServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```
定义切面
```java
package tech.pdai.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

@EnableAspectJAutoProxy
@Component
@Aspect
public class LogAspect {

    /**
     * define point cut.
     */
    @Pointcut("execution(* tech.pdai.springframework.service.*.*(..))")
    private void pointCutMethod() {
    }


    /**
     * 环绕通知.
     *
     * @param pjp pjp
     * @return obj
     * @throws Throwable exception
     */
    @Around("pointCutMethod()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    /**
     * 前置通知.
     */
    @Before("pointCutMethod()")
    public void doBefore() {
        System.out.println("前置通知");
    }


    /**
     * 后置通知.
     *
     * @param result return val
     */
    @AfterReturning(pointcut = "pointCutMethod()", returning = "result")
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    /**
     * 异常通知.
     *
     * @param e exception
     */
    @AfterThrowing(pointcut = "pointCutMethod()", throwing = "e")
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    /**
     * 最终通知.
     */
    @After("pointCutMethod()")
    public void doAfter() {
        System.out.println("最终通知");
    }
}
```
输出
```
-----------------------
环绕通知: 进入方法
前置通知
JdkProxyServiceImpl.doMethod1()
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
JdkProxyServiceImpl.doMethod2()
后置通知, 返回值: hello world
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
JdkProxyServiceImpl.doMethod3()
异常通知, 异常: some exception
最终通知
```
### 非接口使用Cglib代理类定义
```java
/**
 * Cglib proxy.
 *
 */
@Service
public class CglibProxyDemoServiceImpl {

    public void doMethod1() {
        System.out.println("CglibProxyDemoServiceImpl.doMethod1()");
    }

    public String doMethod2() {
        System.out.println("CglibProxyDemoServiceImpl.doMethod2()");
        return "hello world";
    }

    public String doMethod3() throws Exception {
        System.out.println("CglibProxyDemoServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```
切面定义和上面相同。

输出
```
-----------------------
环绕通知: 进入方法
前置通知
CglibProxyDemoServiceImpl.doMethod1()
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
CglibProxyDemoServiceImpl.doMethod2()
后置通知, 返回值: hello world
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
CglibProxyDemoServiceImpl.doMethod3()
异常通知, 异常: some exception
最终通知
```
# AOP使用问题小结
这里总结下实际开发中会遇到的一些问题：
## 切入点（pointcut）的申明规则?
Spring AOP 用户可能会经常使用`execution`切入点指示符。执行表达式的格式如下：
```
execution（modifiers-pattern? ret-type-pattern declaring-type-pattern? name-pattern（param-pattern） throws-pattern?）
```
* `ret-type-pattern`返回类型模式, `name-pattern`名字模式和`param-patter`n参数模式是必选的，其它部分都是可选的。返回类型模式决定了方法的返回类型必须依次匹配一个连接点。你会使用的最频繁的返回类型模式是`*`，它代表了匹配任意的返回类型。
* `declaring-type-pattern`, 一个全限定的类型名将只会匹配返回给定类型的方法。
* `name-pattern`名字模式匹配的是方法名。你可以使用`*`通配符作为所有或者部分命名模式。
* `param-pattern`参数模式稍微有点复杂：`()`匹配了一个不接受任何参数的方法，而`(..)`匹配了一个接受任意数量参数的方法（零或者更多）。模式`()`匹配了一个接受一个任何类型的参数的方法。模式`(,String)`匹配了一个接受两个参数的方法，第一个可以是任意类型，第二个则必须是`String`类型。

对应到我们上面的例子：

![](Spring详解—面向切面编程(AOP)/spring-framework-aop-7.png)

下面给出一些通用切入点表达式的例子。
```java
// 任意公共方法的执行：
execution（public * *（..））

// 任何一个名字以“set”开始的方法的执行：
execution（* set*（..））

// AccountService接口定义的任意方法的执行：
execution（* com.xyz.service.AccountService.*（..））

// 在service包中定义的任意方法的执行：
execution（* com.xyz.service.*.*（..））

// 在service包或其子包中定义的任意方法的执行：
execution（* com.xyz.service..*.*（..））

// 在service包中的任意连接点（在Spring AOP中只是方法执行）：
within（com.xyz.service.*）

// 在service包或其子包中的任意连接点（在Spring AOP中只是方法执行）：
within（com.xyz.service..*）

// 实现了AccountService接口的代理对象的任意连接点 （在Spring AOP中只是方法执行）：
this（com.xyz.service.AccountService）// 'this'在绑定表单中更加常用

// 实现AccountService接口的目标对象的任意连接点 （在Spring AOP中只是方法执行）：
target（com.xyz.service.AccountService） // 'target'在绑定表单中更加常用

// 任何一个只接受一个参数，并且运行时所传入的参数是Serializable 接口的连接点（在Spring AOP中只是方法执行）
args（java.io.Serializable） // 'args'在绑定表单中更加常用; 请注意在例子中给出的切入点不同于 execution(* *(java.io.Serializable))： args版本只有在动态运行时候传入参数是Serializable时才匹配，而execution版本在方法签名中声明只有一个 Serializable类型的参数时候匹配。

// 目标对象中有一个 @Transactional 注解的任意连接点 （在Spring AOP中只是方法执行）
@target（org.springframework.transaction.annotation.Transactional）// '@target'在绑定表单中更加常用

// 任何一个目标对象声明的类型有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）：
@within（org.springframework.transaction.annotation.Transactional） // '@within'在绑定表单中更加常用

// 任何一个执行的方法有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）
@annotation（org.springframework.transaction.annotation.Transactional） // '@annotation'在绑定表单中更加常用

// 任何一个只接受一个参数，并且运行时所传入的参数类型具有@Classified 注解的连接点（在Spring AOP中只是方法执行）
@args（com.xyz.security.Classified） // '@args'在绑定表单中更加常用

// 任何一个在名为'tradeService'的Spring bean之上的连接点 （在Spring AOP中只是方法执行）
bean（tradeService）

// 任何一个在名字匹配通配符表达式'*Service'的Spring bean之上的连接点 （在Spring AOP中只是方法执行）
bean（*Service）
```
此外 Spring 支持如下三个逻辑运算符来组合切入点表达式：
* `&&`：要求连接点同时匹配两个切入点表达式
* `||`：要求连接点匹配任意个切入点表达式
* `!:`：要求连接点不匹配指定的切入点表达式

## 多种增强通知的顺序？
如果有多个通知想要在同一连接点运行会发生什么？Spring AOP 遵循跟 AspectJ 一样的优先规则来确定通知执行的顺序。在“进入”连接点的情况下，最高优先级的通知会先执行（所以给定的两个前置通知中，优先级高的那个会先执行）。在“退出”连接点的情况下，最高优先级的通知会最后执行。（所以给定的两个后置通知中，优先级高的那个会第二个执行）。

当定义在不同的切面里的两个通知都需要在一个相同的连接点中运行，那么除非你指定，否则执行的顺序是未知的。你可以通过指定优先级来控制执行顺序。在标准的 Spring 方法中可以在切面类中实现`org.springframework.core.Ordered`接口或者用`Order`注解做到这一点。在两个切面中，`Ordered.getValue()`方法返回值（或者注解值）较低的那个有更高的优先级。

当定义在相同的切面里的两个通知都需要在一个相同的连接点中运行，执行的顺序是未知的（因为这里没有方法通过反射`javac`编译的类来获取声明顺序）。考虑在每个切面类中按连接点压缩这些通知方法到一个通知方法，或者重构通知的片段到各自的切面类中 - 它能在切面级别进行排序。
## Spring AOP 和 AspectJ 之间的关键区别？
AspectJ 可以做 Spring AOP 干不了的事情，它是 AOP 编程的完全解决方案，Spring AOP 则致力于解决企业级开发中最普遍的 AOP（方法织入）。

下表总结了 Spring AOP 和 AspectJ 之间的关键区别:

| Spring AOP                      | AspectJ                                      |
|:--------------------------------|:---------------------------------------------|
| 在纯 Java 中实现                     | 使用Java 编程语言的扩展实现                             |
| 不需要单独的编译过程                      | 除非设置 LTW，否则需要 AspectJ 编译器 (ajc)              |
| 只能使用运行时织入                       | 运行时织入不可用。支持编译时、编译后和加载时织入                     |
| 功能不强-仅支持方法级编织                   | 更强大 - 可以编织字段、方法、构造函数、静态初始值设定项、最终类/方法等......。 |
| 只能在由 Spring 容器管理的 bean 上实现      | 可以在所有域对象上实现                                  |
| 仅支持方法执行切入点                      | 支持所有切入点                                      |
| 代理是由目标对象创建的, 并且切面应用在这些代理上       | 在执行应用程序之前 (在运行时) 前, 各方面直接在代码中进行织入            |
| 比 AspectJ 慢多了                   | 更好的性能                                        |
| 易于学习和应用                         | 相对于 Spring AOP 来说更复杂                         |


## Spring AOP还是完全用AspectJ？
以下 Spring 官方的回答：（总结来说就是 Spring AOP 更易用，AspectJ 更强大）。
* Spring AOP 比完全使用 AspectJ 更加简单， 因为它不需要引入 AspectJ 的编译器／织入器到你开发和构建过程中。 如果你仅仅需要在 Spring bean 上通知执行操作，那么 Spring AOP 是合适的选择。
* 如果你需要通知`domain`对象或其它没有在 Spring 容器中管理的任意对象，那么你需要使用 AspectJ。
* 如果你想通知除了简单的方法执行之外的连接点（如：调用连接点、字段`get`或`set`的连接点等等），也需要使用 AspectJ。

当使用 AspectJ 时，你可以选择使用 AspectJ 语言（也称为“代码风格”）或`@AspectJ`注解风格。 如果切面在你的设计中扮演一个很大的角色，并且你能在 Eclipse 等 IDE 中使用`AspectJ Development Tools (AJDT)`， 那么首选 AspectJ 语言 :- 因为该语言专门被设计用来编写切面，所以会更清晰、更简单。如果你没有使用 Eclipse 等 IDE，或者在你的应用中只有很少的切面并没有作为一个主要的角色，你或许应该考虑使用`@AspectJ`风格 并在你的 IDE 中附加一个普通的 Java 编辑器，并且在你的构建脚本中增加切面织入（链接）的段落。
