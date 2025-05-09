


Spring MVC 的控制器方法支持`ModelAndView、ModelMap、View、String`多种类型的返回值，但无论控制器方法的返回值是哪种类型，Spring MVC 内部最终都会将它们封装成一个`ModelAndView`对象。

`ModelAndView`对象由`model`（模型数据）和`view`（视图）两部分组成，但这里的`view`通常并不是一个真正的`View`视图对象，而仅仅是一个`String`类型的逻辑视图名（`View Name`）而已，例如`“success”`、`“index”`等。这种情况下，Spring MVC 就需要借助`ViewResolver`（视图解析器）将`ModelAndView`对象中逻辑视图名解析为真正的`View`视图对象，然后才能响应给客户端展示。

Spring MVC 的核心理念是将`View`视图与`Model`模型进行解耦，其工作重心聚焦在`Model`（模型）数据上。至于最终究竟采用何种视图技术对模型数据进行渲染，它并不关心，更不会强迫用户使用某种特定的视图实现技术。因此我们可以在 Spring MVC 项目中，根据自身需求自由地选择所需的视图技术，例如 Thymeleaf、JSP、FreeMarker、Velocity、Excel 等等。
## 视图
我们知道，Spring MVC 是一款基于 MVC 模式的 Web 开发框架，这里所说的 V 指的就是 View，即“视图”。

在 Spring MVC 中，视图扮演着十分重要的角色，它主要负责整合 Web 资源、对模型数据进行渲染，并最终将 Model 中的数据以特定的形式展示给用户。

通俗点说，View 就是用来渲染页面的，它目的是将程序返回的数据（Model 数据）填入到页面中，最终生成 HTML、JSP、Excel 表单、Word 文档、PDF 文档以及 JSON 数据等形式的文件，展示给用户。
### View 接口
Spring MVC 在`org.springframework.web.servlet`包中定义了一个高度抽象的 View（视图）接口，该接口中共定义了两个方法，如下表。

| 方法 | 说明 |
|----|----|
| default String getContentType()   | 获取 HTTP 响应文件的类型，例如 HTML、JSON、PDF 等。    |
| void render(@Nullable Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception   | 负责将 Model（模型）数据渲染到视图中，这是视图的核心方法。其中参数 model 表示模型数据，参数 request 表示请求对象，参数response 则表示响应对象。    |

### 常用视图类
为了简化视图的开发，Spring MVC 为我们提供了许多已经开发好的视图，这些视图都是`View`接口的实现类。

下表中列举了几个常用的视图，它们中的每一个都对应 Java Web 中的特定视图技术。

| 实现类                     | 说明                                               |
|-------------------------|--------------------------------------------------|
| ThymeleafView           | Thymeleaf 视图。当项目中使用的视图技术为 Thymeleaf 时，就需要使用该视图类。 |
| InternalResourceView    | 转发视图，通过它可以实现请求的转发跳转。与此同时，它也是 JSP 视图。             |
| RedirectView            | 重定向视图，通过它可以实现请求的重定向跳转。                           |
| FreeMarkerView          | FreeMarker 视图                                    |
| MappingJackson2JsonView | JSON 视图                                          |
| AbstractPdfView         | PDF 视图                                           |

### 视图的分类
我们可以将 Spring MVC 中`View`视图划分为两大类：逻辑视图和非逻辑视图。
#### 逻辑视图
逻辑视图最大的特点就是，其控制器方法返回的`ModelAndView`中的`view`可以不是一个真正的视图对象，而是一个字符串类型的逻辑视图名。对于逻辑视图而言，它需要一个视图解析器（`ViewResolver`）进行解析，才能得到真正的物理视图对象。

在 Spring MVC 中，控制器方法返回逻辑视图名的方式一般以下有两种。

1. 直接在控制器方法中返回字符串类型的逻辑视图名，然后通过与 Model、Map、ModelMap 等对象的配合将 Model（模型）数据带入到视图中。
```java
@RequestMapping("/testView")
public String testView(Model model) {
    model.addAttribute("product","模型数据")
    return "success";
}
```
2. 在控制器方法中通过 ModelAndView 提供的 setViewName() 方法设置逻辑视图名，然后通过 ModelAndView 的 addObject() 等方法将模型数据带入到视图中。
```java
@RequestMapping("/testView")
public ModelAndView testView() {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("productList");
    List<Product> productList = productService.getProductList();
    modelAndView.addObject(productList);
    return modelAndView;
}
```
注：像 Thymeleaf、JSP 等这样的逻辑视图，在其控制器方法返回的 view 其实并不是必须为字符串类型的逻辑视图名，也可以使一个真正的 View 视图对象（通过 ModelAndView 提供的方法构造）并返回，此时这个视图也不需要视图解析器的解析，而直接渲染。

非逻辑视图
非逻辑视图，则与逻辑视图完全相反，其控制方法返回的是一个真正的视图对象，而不是逻辑视图名，因此这种视图是不需要视图解析器解析的，只需要直接将视图模型渲染出来即可，例如 MappingJackson2JsonView 就是这样的情况。

MappingJackson2JsonView 的目的就是将数据模型转换为 JSON 视图，展现给用户，无须对视图名字再进行下一步的解析。
```java
@RequestMapping("/testJsonView")
public ModelAndView testJsonView(Integer productId) {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("url", "c.biancheng.net");
    //设置 ModelAndView 的 View 对象
    modelAndView.setView(new MappingJackson2JsonView());
    return modelAndView;
}
```
在上面的代码中，我们通过 ModelAndView 的 setView() 方法构造了一个具体的 MappingJackson2JsonView 视图对象，该视图可以直接渲染，最终将 Model 数据转换为 JSON 数据。
## 视图解析器
视图解析器（ViewResolver）是 Spring MVC 的重要组成部分，它提供了逻辑视图名称与实际视图之间的映射，负责将逻辑视图名解析为一个具体的视图对象。

SpringMVC 提供了一个视图解析器的接口 ViewResolver，所有具体的视图解析器必须实现该接口。
```java
public interface ViewResolver {
    @Nullable
    View resolveViewName(String viewName, Locale locale) throws Exception;
}
```
Spring MVC 提供了很多 ViewResolver 接口的实现类，它们中的每一个都对应 Java Web 应用中某些特定视图技术。如果我们在使用某个特定的视图解析器，就需要将它以 Bean 组件的形式注入到 Spring MVC 的容器中，否则 Spring MVC 会使用默认的 InternalResourceViewResolver 进行解析。

| 视图解析器                        | 说明                                                                         |
|------------------------------|----------------------------------------------------------------------------|
| BeanNameViewResolver         | 将视图解析后，映射成一个 Bean，视图的名称就是 Bean 的 id。                                       |
| InternalResourceViewResolver | 将视图解析后，映射成一个资源文件。例如将一个视图名为字符串“success.jsp”的视图解析后，映射成一个名为 success 的 JSP 文件。 |
| FreeMarkerViewResolver       | 将视图解析后，映射成一个 FreeMarker 模板文件。                                              |
| ThymeleafViewResolver        | 将视图解析后，映射成一个 Thymeleaf 模板文件。                                               |

我们知道，非逻辑视图是不需要视图解析器进行解析的，例如 MappingJackson2JsonView ，它的含义是将当前的数据模型转换为 JSON，并不需要对视图逻辑名称进行转换。但对于逻辑视图而言，将逻辑视图名转换为视图却是一个不可缺少的过程。

以 ThymeleafView 为例，它就是一个十分典型的逻辑视图，想要使用 Thymeleaf 进行前端页面开发，通常都需要在 Spring MVC 的配置文件中配置一个 Thymeleaf 视图解析器，示例配置如下。
```xml
<!-- 配置 Thymeleaf 视图解析器 -->
<bean id="viewResolver"
      class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <!--定义视图解析器的优先级，order 值越小，优先级越高-->
    <property name="order" value="1"/>
    <!--定义视图文件的字符集-->
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
```
在以上配置中，我们在 Spring MVC 的配置文件中定义一个 Thymeleaf 视图解析器，并设置了视图前缀（prefix）和视图后缀（suffix）。

Spring MVC 程序运行时，Thymeleaf 视图解析器会将视图的前缀和后缀与逻辑视图名拼接，组成真正的 Thymeleaf 文件路径，然后再把 Model 数据渲染到这个 Thymeleaf 中，以达到将视图展示给用户的目的。
## 同时配置多个视图解析器
针对不同的视图对象，我们使用不同的视图解析器来完成视图的实例化工作。我们可以在 Spring 上下文配置多个视图解析器，并通过其 order 属性来指定它们之间的解析优先级顺序，order 越小，优先级越高。Spring MVC 会遍历所有视图解析器，并按照其优先级依次对逻辑视图名进行解析，直到解析成功并返回视图对象为止。

例如，我们可以 Spring MVC 的配置文件中，同时配置 Thymeleaf 和 JSP 两种视图解析器，配置内容如下。
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
        <!--逻辑视图名的规则-->
        <property name="viewNames" value="th*,base/*"/>
        <!--视图解析器的优先级，值越小，优先级越高-->
        <property name="order" value="2"/>
        <!--定义视图文件的字符集-->
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                        <!--设置视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>
                        <!--设置视图后缀 -->
                        <property name="suffix" value=".html"/>
                        <property name="templateMode" value="HTML5"/>
                        <property name="characterEncoding" value="UTF-8"/>
                    </bean>
                </property>
            </bean>
        </property>
    </bean>

    <!--解析 JSP -->
    <bean id="viewResolver1" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!--逻辑视图名的规则-->
        <property name="viewNames" value="j/*"/>
        <!--视图解析器的优先级，值越小，优先级越高-->
        <property name="order" value="1"/>
        <property name="viewClass"
                  value="org.springframework.web.servlet.view.InternalResourceView"/>
        <!--视图前缀-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!--视图后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

</beans>
```
需要注意的是，在上面配置中除了对两个视图解析器优先级（order）进行了配置外，我们还通过 viewNames 属性，对这两个视图解析器可以处理的逻辑视图名的规则进行了配置。
```xml
<property name="viewNames" value="th*,base/*"/>
```
上面的配置含义是，当控制器方法返回的逻辑视图名是以“th”或者“base/”开头时，它所对应的视图解析器才对视图进行解析。
## 视图控制器
如果控制器方法只返回一个逻辑视图名，而没有返回任何 Model 数据，那么这个控制器方法就可以使用 View-Controller（视图控制器）标签来代替。

例如，下面的控制器方法只返回一个逻辑视图名“add”，而没有返回任何 Model 数据，即它仅仅是用来跳转到“新增”页面的，代码入下。
```java
@RequestMapping("/addPage")
public String addPage() {
    return "base/add";
}
```
此时，我们就可以在 Spring MVC 中通过以下配置来代替这个控制器方法，配置内容如下。
```xml
<mvc:view-controller path="/addPage" view-name="base/add"></mvc:view-controller>
```
注意：如果 Spring MVC 中设置了任意一个视图控制器（View-Controller），那么其他控制器中请求映射将全部失效，此时我们需要在 Spring MVC 的核心配置文件中开启 mvc 注解驱动标签。
```xml
<mvc:annotation-driven />
```
