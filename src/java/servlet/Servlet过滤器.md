
## Filter（过滤器）
`Servlet Filter`又称`Servlet`过滤器，它能够对 Servlet 容器传给 Web 资源的`request`对象和`response`对象进行检查和修改。

`Filter`不是`Servlet`，不能直接访问，它本身也不能生成`request`对象和`response`对象，它只能为 Web 资源提供以下过滤功能：
* 在 Web 资源被访问前，检查`request`对象，修改请求头和请求正文，或对请求进行预处理操作。
* 将请求传递到下一个过滤器或目标资源。
* 在 Web 资源被访问后，检查`response`对象，修改响应头和响应正文。

注意：过滤器并不是必须要将请求传递到下一个过滤器或目标资源，它可以自行对请求进行处理，并发送响应给客户端，也可以将请求转发或重定向到其他的 Web 资源。

通过`Filter`可以对服务器管理的所有 Web 资源（例如 JSP、Servlet、静态 HTML 文件、静态图片等）进行拦截，从而实现一些特殊的功能，例如用户的权限控制、过滤敏感词、设置统一编码格式等。
### Filter 接口
与开发`Servlet`需要实现`javax.servlet.Servlet`接口类似，开发过滤器要实现`javax.servlet.Filter`接口，并提供一个公开的不带参的构造方法。在`Filter`接口中，定义了 3 个方法，如下表所示。

| 返回值类型 | 方法 | 功能描述 |
|-------|----|------|
| void      | init (FilterConfig filterConfig)   | 初始化过滤器     |
| void      | doFilter(ServletRequest request,SeivletResponse response, FilterChain chain)   | 完成实际的过滤操作，当客户端请求的 URL 与过滤器映射的 URL 匹配时，容器会先调用该方法对请求进行拦截。参数 chain 代表当前 Filter 链对象，在该方法内部，调用 chain.doFilter() 方法，才能把请求交付给 Filter 链中的下一个 Filter 或者 Web 资源。     |
| void      | destroy()   | 在销毁 Filter 对象之前被调用，用于释放被 Filter 对象占用的资源     |

### Filter 的工作流程




客户端请求访问容器内的 Web 资源。
Servlet 容器接收请求，并针对本次请求分别创建一个 request 对象和 response 对象。
请求到达 Web 资源之前，先调用 Filter 的 doFilter() 方法，检查 request 对象，修改请求头和请求正文，或对请求进行预处理操作。
在 Filter 的 doFilter() 方法内，调用 FilterChain.doFilter() 方法，将请求传递给下一个过滤器或目标资源。
目标资源生成响应信息返回客户端之前，处理控制权会再次回到 Filter 的 doFilter() 方法，执行 FilterChain.doFilter() 后的语句，检查 response 对象，修改响应头和响应正文。
响应信息返回客户端。
### Filter 的生命周期
`Filter`的生命周期分为 3 个阶段：
* 初始化阶段
* 拦截和过滤阶段
* 销毁阶段

#### 1. 初始化阶段
`Servlet`容器负责加载和实例化`Filter`。容器启动时，读取`web.xml`或`@WebFilter`的配置信息对所有的过滤器进行加载和实例化。

加载和实例化完成后，`Servlet`容器调用`init()`方法初始化`Filter`实例。在`Filter`的生命周期内，`init()`方法只执行一次。
#### 2. 拦截和过滤阶段
该阶段是`Filter`生命周期中最重要的阶段。当客户端请求访问 Web 资源时，`Servlet`容器会根据`web.xml`或`@WebFilter`的过滤规则进行检查。当客户端请求的 URL 与过滤器映射匹配时，容器将该请求的`request`对象、`response`对象以及`FilterChain`对象以参数的形式传递给`Filter`的`doFilter()`方法，并调用该方法对请求/响应进行拦截和过滤。
#### 3. 销毁阶段
`Filter`对象创建后会驻留在内存中，直到容器关闭或应用被移除时销毁。销毁`Filter`对象之前，容器会先调用`destory()`方法，释放过滤器占用的资源。在`Filter`的生命周期内，`destory()`只执行一次。
	
### 注册与映射 Filter
注册和映射`Filter`有 2 种方式：
* 通过`web.xml`配置
* 通过`@WebFilter`注解配置


#### 1. 通过web.xml配置
```xml
<filter>
    <filter-name>myFilter</filter-name>
    <filter-class>net.biancheng.www.MyFilter</filter-class>
    <init-param>
        <param-name>name</param-name>
        <param-value>编程帮</param-value>
    </init-param>
    <init-param>
        <param-name>URL</param-name>
        <param-value>www.biancheng.net</param-value>
    </init-param>
</filter>
```
说明：
`<filter>`用于注册过滤器
* `<filter-name>`是`<filter>`元素的子元素， 用于指定过滤器的注册名，该元素的内容不能为空。
* `<filter-class>`是`<filter>`元素的子元素，用于指定过滤器的完整限定名（包名+类名）。
* `<init-param>`是`<filter>`元素的子元素，用于为过滤器指定初始化参数，它的子元素 `<param-name>`指定参数的名称，`<param-value>`指定参数的值。

在`web.xml`中，通过使用`<filter-mapping>`及其子元素映射`Filter`。
```xml
<filter-mapping>
    <filter-name>myFilter</filter-name>
    <url-pattern>/login</url-pattern>
    <dispatcher>REQUEST</dispatcher>
    <dispatcher>FORWARD</dispatcher>
</filter-mapping>
<filter-mapping>
    <filter-name>myFilter</filter-name>
    <servlet-name>ServletDemo</servlet-name>
</filter-mapping>
```
说明：
* `<filter-mapping>`元素用于设置`Filter`负责拦截的资源。
* `<filter-name>`是`<filter-mapping>`元素的子元素，用于设置`Filter`的注册名，该值必须在`<filter>`元素的子元素`<filter-name>`中声明过。
* `<url-pattern>`是`<filter-mapping>`元素的子元素，用于设置`Filter`拦截的请求路径。
* `<servlet-name>`是`<filter-mapping>`元素的子元素，用于设置`Filter`拦截的 `Servlet` 名称。
* `<dispatcher>`是`<filter-mapping>`元素的子元素，用于指定`Filter`拦截的资源被`Servlet`容器调用的方式，可以是`REQUEST、INCLUDE、FORWARD`和`ERROR`之一，默认`REQUEST`。用户可以设置多个`<dispatcher>`子元素指定`Filter`对资源的多种调用方式进行拦截。

`<dispatcher>`元素的取值及其意义：
* `REQUEST`：当用户直接访问页面时，容器将会调用过滤器。如果目标资源是通过`RequestDispatcher`的`include()`或`forward()`方法访问，则该过滤器就不会被调用。
* `INCLUDE`：如果目标资源通过`RequestDispatcher`的`include()`方法访问，则该过滤器将被调用。除此之外，该过滤器不会被调用。
* `FORWARD`：如果目标资源通过`RequestDispatcher`的`forward()`方法访问，则该过滤器将被调用，除此之外，该过滤器不会被调用。
* `ERROR`：如果目标资源通过声明式异常处理机制访问，则该过滤器将被调用。除此之外，过滤器不会被调用。

#### 2. 使用 @WebFilter 注解进行配置
`@WebFilter`注解也可以对过滤器进行配置，容器在部署应用时，会根据其具体属性配置将相应的类部署为过滤器。

`@WebFilter`注解具有下表给出的一些常用属性。以下所有属性均为可选属性，但`value、urlPatterns、servletNames`三者必需至少包含一个，且`value`和`urlPatterns`不能共存，如果同时指定，通常忽略`value`的取值。

|       属性名       | 类型             | 描述                                                                                      |
|:---------------:|:---------------|:----------------------------------------------------------------------------------------|
|   filterName    | String         | 指定过滤器的 name 属性，等价于 <filter-name>。                                                       |
|   urlPatterns   | String[]       | 指定过滤器的 URL 匹配模式。等价于 <url-pattern> 标签。                                                   |
|      value      | String[]       | 该属性等价于 urlPatterns 属性，但是两者不能同时使用。                                                       |
|  servletNames   | String[]       | 指定过滤器将应用于哪些 Servlet。取值是 @WebServlet 中 filterName 属性的取值，或者 web.xml 中 <servlet-name> 的取值。 |
| dispatcherTypes | DispatcherType | 指定过滤器拦截的资源被 Servlet 容器调用的方式。具体取值包括： ASYNC、ERROR、FORWARD、INCLUDE、REQUEST。                |
|   initParams    | WebInitParam[] | 指定一组过滤器初始化参数，等价于 <init-param> 标签。                                                       |
| asyncSupported  | boolean        | 声明过滤器是否支持异步操作模式，等价于 <async-supported> 标签。                                               |
|   description   | String         | 指定过滤器的描述信息，等价于 <description> 标签。                                                        |
|   displayName   | String         | 指定过滤器的显示名，等价于 <display-name> 标签。                                                        |

使用`@WebFilter`注解配置过滤器。
```java
package net.biancheng.www.filter;

import java.io.IOException;
import java.util.logging.LogRecord;
import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;

@WebFilter(
        dispatcherTypes = {
                DispatcherType.REQUEST,
                DispatcherType.FORWARD,
                DispatcherType.INCLUDE,
                DispatcherType.ERROR
        },
        asyncSupported = true,
        description = "过滤器4",
        urlPatterns = {"/login"},
        initParams = {
                @WebInitParam(name = "name", value = "编程帮", description = "name的描述")
        },
        servletNames = {"SuccessServlet"})
public class MyFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
    }

}
```
### 示例



## FilterChain过滤器链
在 Web 应用中，可以部署多个`Filter`，若这些`Filter`都拦截同一目标资源，则它们就组成了一个`Filter`链（也称过滤器链）。过滤器链中的每个过滤器负责特定的操作和任务，客户端的请求在这些过滤器之间传递，直到传递给目标资源。
### FilterChain 接口
`javax.servlet`包中提供了一个`FilterChain`接口，该接口由容器实现。容器将其实例对象作为参数传入`Filter`对象的`doFilter()`方法中。`Filter`对象可以使用`FilterChain`对象调用链中下一个`Filter`的`doFilter()`方法，若该`Filter`是链中最后一个过滤器，则调用目标资源的`service()`方法。`FilterChain`接口中只有一个方法，如下表。





### Filter 链的拦截过程

### Filter 链中 Filter 的执行顺序
通过`web.xml`配置的`Filter`过滤器，执行顺序由`<filter-mapping>`标签的配置顺序决定。`<filter-mapping>`靠前，则`Filter`先执行，靠后则后执行。通过修改`<filter-mapping>`的顺序便可以修改`Filter`的执行顺序。

通过 `@WebFilter`注解配置的`Filter`过滤器，无法进行排序，若需要对`Filter`过滤器进行排序，建议使用`web.xml`进行配置。

### 示例



## FilterConfig接口
`Javax.Servet`包中提供了一个`FilterCofig`接口，它与`ServletConfig`接口相似，用于在过滤器初始化期间向其传递信息。

`FilterConfig`接口由容器实现，容器将它作为参数传入过滤器的`init()`方法中。通过`filterConfig`对象就可以获得`Filter`的初始化参数。

在`FilterConfig`接口中，定义了 4 个方法，如下表。

