


在 Spring MVC 中，我们可以通过`@RequestMapping +@PathVariable`注解的方式，来实现 RESTful 风格的请求。
## 通过@RequestMapping 注解的路径设置
当请求中携带的参数是通过请求路径传递到服务器中时，我们就可以在`@RequestMapping`注解的`value`属性中通过占位符`{xxx}`来表示传递的参数，示例代码如下。
```java
@RequestMapping("/testRest/{id}/{username}")
```
注意：value 属性中占位符的位置应当与请求 URL 中参数的位置保持一致，否则会出现传错参数的情况。
## 通过 @PathVariable 注解绑定参数
我们可以在控制器方法的形参位置通过 @PathVariable 注解，将占位符 {xxx} 所表示的参数赋值给指定的形参。
```java
@RequestMapping("/testRest/{id}/{username}")
public String testRest(@PathVariable("id") String id, @PathVariable("username")
        String username) {
    System.out.println("id:" + id + ",username:" + username);
    return "success";
}
```
## 通过 HiddenHttpMethodFilter 对请求进行过滤
由于浏览器默认只支持发送 GET 和 POST 方法的请求，因此我们需要在 web.xml 中使用 Spring MVC 提供的 HiddenHttpMethodFilter 对请求进行过滤。这个过滤器可以帮助我们将 POST 请求转换为 PUT 或 DELETE 请求，其具体配置内容如下。
```xml
<!--来处理 PUT 和 DELETE 请求的过滤器-->
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
HiddenHttpMethodFilter 处理 PUT 和 DELETE 请求时，必须满足以下 2 个条件：
当前请求的请求方式必须为 POST；
当前请求必须传输请求参数 _method。

在满足了以上条件后，HiddenHttpMethodFilter 过滤器就会将当前请求的请求方式转换为请求参数 _method 的值，即请求参数 _method 的值才是最终的请求方式，因此我们需要在 POST 请求中携带一个名为 _method 的参数，参数值为 DELETE 或 PUT。
注意：若 web.xml 中同时存在 CharacterEncodingFilter 和 HiddenHttpMethodFilter 两个过滤器，必须先注册 CharacterEncodingFilter，再注册 HiddenHttpMethodFilter。
## 示例
web.xml 配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--请求和响应的字符串过滤器-->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceResponseEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--来处理 PUT 和 DELETE 请求的过滤器-->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!-- 配置SpringMVC的前端控制器，对浏览器发送的请求统一进行处理 -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--配置 DispatcherServlet 的一个初始化参数：spring mvc 配置文件按的位置和名称-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springMVC.xml</param-value>
        </init-param>

        <!--作为框架的核心组件，在启动过程中有大量的初始化操作要做
            而这些操作放在第一次请求时才执行会严重影响访问速度
            因此需要通过此标签将启动控制DispatcherServlet的初始化时间提前到服务器启动时-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <!--设置springMVC的核心控制器所能处理的请求的请求路径
        /所匹配的请求可以是/login或.html或.js或.css方式的请求路径
        但是/不能匹配.jsp请求路径的请求-->
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```
Spring MVC 的配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

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

    <!--    view-name：设置请求地址所对应的视图名称-->
    <mvc:view-controller path="/" view-name="login"></mvc:view-controller>

    <mvc:view-controller path="/addPage" view-name="product_add"></mvc:view-controller>

    <!--当SpringMVC中设置任何一个view-controller时，其他控制器中的请求映射将全部失效，此时需要在SpringMVC的核心配置文件中设置开启mvc注解驱动的标签：-->
    <mvc:annotation-driven></mvc:annotation-driven>
    <!--
    处理静态资源，例如html、js、css、jpg
    若只设置该标签，则只能访问静态资源，其他请求则无法访问
    此时必须设置<mvc:annotation-driven/>解决问题
    -->
    <mvc:default-servlet-handler/>
</beans>
```
User 的类
```java
package net.biancheng.c.bean;

public class User {
    private String userId;
    private String userName;
    private String password;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```
Product 的类
```java
package net.biancheng.c.bean;

import java.math.BigDecimal;

public class Product {
    private String productId;
    private String productName;
    private BigDecimal price;
    private Integer stock;
    private String introduction;
   
    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                ", introduction='" + introduction + '\'' +
                '}';
    }
}
```
Controller 类
```java
package net.biancheng.c.controller;

import net.biancheng.c.bean.User;
import net.biancheng.c.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {
    @Autowired
    private UserDao userDao;

    /**
     * 登录
     * @param user
     * @param request
     * @return
     */
    @RequestMapping("/login")
    public String login(User user, HttpServletRequest request) {
        User loginUser = userDao.getUserByUserName(user.getUserName());
        if (loginUser != null && loginUser.getPassword().equals(user.getPassword())) {
            HttpSession session = request.getSession();
            //将用户信息放到 session 域中
            session.setAttribute("loginUser", loginUser);
            //重定向到商品列表
            return "redirect:/products";
        }
        request.setAttribute("msg", "账号或密码错误");
        return "login";
    }
}
```
```java
package net.biancheng.c.controller;

import net.biancheng.c.bean.Product;
import net.biancheng.c.dao.ProductDao;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.util.List;

/**
* @author C语言中文网
*/
@Controller
public class ProductController {

    @Resource
    private ProductDao productDao;

    /**
     * 获取商品列表
     * @param model
     * @return
     */
    @RequestMapping("/products")
    public String getProductList(Model model) {
        List productList = productDao.getProductList();
        model.addAttribute("productList", productList);
        return "product_list";
    }

    /**
     * 查看或回显商品信息，get：查看商品信息  update:为修改页回显的商品信息
     * @param action
     * @param productId
     * @param model
     * @return
     */
    @RequestMapping("/product/{action}/{productId}")
    public String getProductList(@PathVariable("action") String action, @PathVariable("productId") String productId, Model model) {
        Product product = productDao.getProductById(productId);
        model.addAttribute("product", product);
        //根据参数 action 判断跳转到商品详细信息页还是商品修改页
        if (action.equals("get")) {
            return "product_info";
        } else {
            return "product_update";
        }
    }

    /**
     * 新增商品
     * @param product
     * @return
     */
    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public String addProduct(Product product) {
        productDao.addProduct(product);
        return "redirect:/products";
    }

    /**
     * 修改商品信息
     * @param product
     * @return
     */
    @RequestMapping(value = "/product", method = RequestMethod.PUT)
    public String updateProduct(Product product) {
        productDao.updateProduct(product);
        return "redirect:/products";
    }

    /**
     * 删除商品
     * @param productId
     * @return
     */
    @RequestMapping(value = "/product", method = RequestMethod.DELETE)
    public String deleteProduct(String productId) {
        productDao.deleteProduct(productId);
        return "redirect:/products";
    }
}
```
UserDao 的类
```java
package net.biancheng.c.dao;

import net.biancheng.c.bean.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UserDao {
    private static Map<String, User> users = null;

    static {
        users = new HashMap<String, User>();

        User user = new User();
        user.setUserId("1001");
        user.setUserName("Java用户");
        user.setPassword("987654321");

        User user2 = new User();
        user2.setUserId("1002");
        user2.setUserName("admin");
        user2.setPassword("admin");

        users.put(user.getUserName(), user);
        users.put(user2.getUserName(), user2);
    }


    /**
     * 根据用户名获取用户信息
     *
     * @param userName
     * @return
     */
    public User getUserByUserName(String userName) {
        User user = users.get(userName);
        return user;
    }
}
```
ProductDao 的类
```java
package net.biancheng.c.dao;

import net.biancheng.c.bean.Product;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.*;

@Repository
public class ProductDao {

    private static Map<String, Product> products = null;

    static {
        products = new HashMap<String, Product>();
        Product product = new Product();
        product.setProductId("1");
        product.setProductName("茅台");
        product.setPrice(new BigDecimal(9999));
        product.setStock(1000);
        product.setIntroduction("茅台酒是大曲酱香型酒的鼻祖,它具有色清透明、酱香突出、醇香馥郁、幽雅细腻、入口柔绵、清冽甘爽、酒体醇厚丰满、回味悠长的特点、人们把茅台酒独有的香味称为\"茅香\",是中国酱香型风格的典范。");

        Product product1 = new Product();
        product1.setProductId("2");
        product1.setProductName("五粮液");
        product1.setPrice(new BigDecimal(8888));
        product1.setStock(1000);
        product1.setIntroduction("五粮液，四川省宜宾市特产，中国国家地理标志产品。以五粮液为代表的中国白酒，有着4000多年的酿造历史，堪称世界最古老、最具神秘特色的食品制造产业之一。");

        Product product2 = new Product();
        product2.setProductId("3");
        product2.setProductName("信阳毛尖");
        product2.setPrice(new BigDecimal(7777));
        product2.setStock(1000);
        product2.setIntroduction("信阳毛尖又称豫毛峰，属绿茶类，是中国十大名茶之一，也是河南省著名特产之一；其主要产地在信阳市浉河区（原信阳市）、平桥区（原信阳县）和罗山县。");

        Product product3 = new Product();
        product3.setProductId("4");
        product3.setProductName("深州大蜜桃");
        product3.setPrice(new BigDecimal(6666));
        product3.setStock(1000);
        product3.setIntroduction("深州蜜桃，河北省深州市特产，中国国家地理标志产品。深州蜜桃个头硕大，果型秀美，色鲜艳，皮薄肉细，汁甜如蜜。2014年10月8日，国家质检总局正式批准“深州蜜桃”为原产地域保护产品（即地理标志保护产品）。");

        products.put(product.getProductId(), product);
        products.put(product1.getProductId(), product1);
        products.put(product2.getProductId(), product2);
        products.put(product3.getProductId(), product3);
    }

    /**
     * 获取商品列表
     *
     * @return
     */
    public List getProductList() {
        List productList = new ArrayList();
        Set<String> keys = products.keySet();
        for (String key : keys) {
            Product product = products.get(key);
            productList.add(product);
        }
        return productList;
    }

    /**
     * 根据商品 id 获取商品信息
     *
     * @param productId
     * @return
     */
    public Product getProductById(String productId) {
        return products.get(productId);
    }

    /**
     * 新增商品
     *
     * @param product
     */
    public void addProduct(Product product) {
        products.put(product.getProductId(), product);
    }

    /**
     * 修改商品
     *
     * @param product
     */
    public void updateProduct(Product product) {
        products.put(product.getProductId(), product);

    }

    /**
     * 删除商品
     *
     * @param productId
     */
    public void deleteProduct(String productId) {
        products.remove(productId);
    }
}
```
