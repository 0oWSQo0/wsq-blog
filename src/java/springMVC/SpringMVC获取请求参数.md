


Spring MVC 提供了多种获取请求参数的方式：
通过 HttpServletRequest 获取请求参数
通过控制器方法的形参获取请求参数
使用 @RequestParam 注解获取请求参数
通过实体类对象获取请求参数（推荐）

## 通过 HttpServletRequest 获取请求参数
我们可以在控制器方法中设置一个`HttpServletRequest`类型的形参，Spring MVC 会自动将请求中携带的参数封装到`HttpServletRequest`形参中，然后我们就可以通过`HttpServletRequest`提供的`getParameter()`方法获取所需的请求参数了。

`web.xml`配置。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         id="WebApp_ID" version="4.0">
    <display-name>first-springmvc-demo</display-name>
    <!-- 配置SpringMVC的前端控制器，对浏览器发送的请求统一进行处理 -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--配置 DispatcherServlet 的一个初始化参数：spring mvc 配置文件按的位置和名称-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springMVC.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <!--设置springMVC的核心控制器所能处理的请求的请求路径/所匹配的请求可以是/login或.html或.js或.css方式的请求路径但是/不能匹配.jsp请求路径的请求-->
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```
Spring MVC 配置文件。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd ">

    <!--开启组件扫描-->
    <context:component-scan base-package="net.biancheng.c"></context:component-scan>

    <!-- 配置 Thymeleaf 视图解析器 -->
    <bean id="viewResolver"
          class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="order" value="1"/>
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                        <!-- 视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>
                        <!-- 视图后缀 -->
                        <property name="suffix" value=".html"/>
                        <property name="templateMode" value="HTML5"/>
                        <property name="characterEncoding" value="UTF-8"/>
                    </bean>
                </property>
            </bean>
        </property>
    </bean>

</beans>
```
`Controller`类。
```java
package net.biancheng.c.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ParamController {
    @RequestMapping("/")
    public String sayHello() {
        return "index";
    }

    /**
     * 通过 HttpServletRequest 获取请求参数
     * @param request
     * @return
     */
    @RequestMapping("/getRequestParam")
    public String requestParam(HttpServletRequest request) {
        String name = request.getParameter("name");
        String url = request.getParameter("url");

        System.out.println("name:" + name);
        System.out.println("url:" + url);
        return "index";
    }
}
```
在 `webapp/WEB-INF` 下新建一个`templates`目录，并在该目录下创建一个`index.html`。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
<h1>hello world</h1>
</body>
</html>
```
## 通过形参获取请求参数
我们可以在`Controller`的控制器方法中设置与请求参数同名的形参，以获取请求中携带的参数。当浏览器发送的请求匹配到这个控制器方法时，Spring MVC 会自动将请求参数赋值给相应的方法形参。

例如，当发送的请求的 url 为`http://localhost:8080/project/test?name=tom&language=java`时，那么处理该请求的控制器方法的代码如下
```java
@RequestMapping("/test")
public String test(String name, String language) {
    System.out.println("a：" + a);
    System.out.println("b：" + b);
    return "success";
}
```
通过控制器方法的形参获取请求参数时，我们需要注意以下几点：
#### 1. 必须保证参数名一致
必须保证控制器方法的形参名称与请求中携带参数的名称完全一致（区分大小写），否则控制器方法接收到的请求参数值会是`null`。

如果由于一些特殊原因，实在无法保证参数名严格一致，我们还可以通过`@RequestParam`注解来解决。
#### 2. 无视数据类型
这种方式是无视参数的数据类型的，我们可以在控制器方法中使用`String`字符串类型的形参接收所有的请求参数，也可以根据实际情况在控制器方法中使用对应数据类型的参数来接收请求参数，而无须自行进行数据类型转换。 

例如，请求为`http://localhost:8080/project/test?a=java&b=1025`，此时我们可以通过以下 2 种方式来获取请求参数。
1. 直接通过 String 类型的参数来接收请求参数。
```java
@RequestMapping("/test")
public String test(String a, String b) {
    System.out.println("a：" + a);
    System.out.println("b：" + b);
    return "success";
}
```
2. 使用`int`或`Integer`类型的参数接收`b`参数。
```java
@RequestMapping("/test")
public String test(String a, Integer b) {
    System.out.println("a：" + a);
		System.out.println("b：" + b);
		return "success";
}
```
#### 3. 不适用于请求参数过多的请求
当请求中携带的参数过多时，如果我们还使用这种方式来获取请求参数，那就需要我们在控制器方法中设置大量的形参，这会让使代码变得十分臃肿，不易维护。
#### 4. 同名请求参数的处理方式
当请求中包含多个同名的请求参数时，我们可以通过以下 2 种类型的形参来获取请求参数。

| 形参的数据类型     | 获取到的请求参数值                                                                                                                                                   | 举例                        |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| String（字符串） | 所有同名请求参数的值通过逗号（“,”）拼接在一起                                                                                                                                    | "true,false,true"         |
| 数组          | 由所有同名请求参数值组成的数组。该数组通常为 String（字符串）类型的，如果所有同名请求参数值都符合同一个数据类型的规范，我们还可以使用与之对应的数据类型的数组进行接收。例如，如果所有同名请求参数的取值都是 true 或 false，那么我们就可以在控制器方法中使用 Boolean 类型数组的形参进行接收 | {"true", "false", "true"} |

### 示例
`Controller`类
```java
package net.biancheng.c.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FormalParamController {
    /**
     * 跳转到 user.html
     * @return
     */
    @RequestMapping("/user")
    public String sayHello() {
        return "user";
    }

    /**
     * 通过形参获取请求参数
     * @param userId
     * @param userName
     * @param password
     * @return
     */
    @RequestMapping("/getFormalParam")
    public String getFormalParam(String userId, String userName, String password) {
        System.out.println("userId：" + userId);
        System.out.println("userName：" + userName);
        System.out.println("password：" + password);
        return "success";
    }
}
```
## 使用 @RequestParam 注解获取
我们可以在控制器方法中通过`@RequestParam`注解，在请求参数与控制器方法的形参之间建立起映射关系，将它们绑定起来。这样即使请求参数与控制器方法中的形参名称不一致，我们也能获取到对应的请求参数值。

例如，如果请求的地址为`http://localhost:8080/project/test?name=Java&pass=yyds`，那么负责处理该请求的控制器方法可以是这样的，代码如下。
```java
@RequestMapping("/testRequestParam")
public String testRequestParam(@RequestParam("name") String username, @RequestParam("pass") String password) {
    System.out.println(username + "," + password);
    return "success";
}
```
`@RequestParam`注解中共包含 4 个属性：

| 属性           | 说明                                                                        |
|--------------|---------------------------------------------------------------------------|
| name         | 请求中的参数名。name 为 @RequestParam 注解 value 属性的别名，它与 value 属性完全等价。              |
| value        | 请求中的参数名。value 为 @RequestParam 注解 name 属性的别名，它与 name 属性完全等价。               |
| required     | 该请求参数名是否必须，默认值为 true，即默认情况下请求中必须包含对应的请求参数名，否则就会抛出异常。至于该请求参数是否有值则无所谓。      |
| defaultValue | 请求参数的默认值。defaultValue 属性会使 required ="true" 失效，即将 required 属性自动设置为 false。 |

## 通过实体类对象获取
我们可以在`Controller`控制器方法的形参中设置一个实体类形参，如果请求参数的参数名与实体类中的属性名一致，那么 Spring MVC 会自动将请求参数封装到该实体类对象中。此时我们就可以通过该实体类对象获取所需的请求参数了。

### 示例
`User`的实体类
```java
public class User {
    private String UserId;
    private String UserName;
    private Integer age;

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "UserId='" + UserId + '\'' +
                ", UserName='" + UserName + '\'' +
                ", age=" + age +
                '}';
    }
}
```
`Controller`类
```java
package net.biancheng.c.controller;

import net.biancheng.c.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

    /**
     * 通过实体类获取请求参数
     *
     * @param user
     * @return
     */
    @RequestMapping("/getUser")
    public String getUser(User user) {
        System.out.println("userId：" + user.getUserId());
        System.out.println("userName：" + user.getUserName());
        System.out.println("password：" + user.getPassword());
        return "success";
    }
}
```
## 解决获取请求参数的乱码问题
当我们在`post`请求中传递的参数为中文时，控制器方法获取到的参数值会出现乱码的情况。

Spring MVC 默认提供了一个过滤器`CharacterEncodingFilter`，我们只需要在`web.xml`中对该`Filter`进行简单的配置，即可解决请求和响应中的中文乱码问题，代码如下。
```xml
<!--请求和响应的字符串过滤器-->
<filter>
     <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <!--设置请求的编码-->
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <!--设置响应的编码，这里我们可以省略-->
    <init-param>
        <param-name>forceResponseEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
