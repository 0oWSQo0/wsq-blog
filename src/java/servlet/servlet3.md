


## ServletConfig接口
Servlet 容器初始化 Servlet 时，会为这个 Servlet 创建一个 ServletConfig 对象，并将 ServletConfig 对象作为参数传递给 Servlet 。通过 ServletConfig 对象即可获得当前 Servlet 的初始化参数信息。

一个 Web 应用中可以存在多个 ServletConfig 对象，一个 Servlet 只能对应一个 ServletConfig 对象，即 Servlet 的初始化参数仅对当前 Servlet 有效。
### 获得 ServletConfig 对象
获得 ServletConfig 对象一般有 2 种方式：
直接从带参的 init() 方法中提取
```java
public class ServletConfigDemo extends HttpServlet {
    private ServletConfig servletConfig;
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获取Servlet得名字
        this.servletConfig.getServletName();
    }
    @Override
    public void init(ServletConfig config) throws ServletException {
        //从带参init方法中，提取ServletConfig对象
        this.servletConfig = config;
    }
}
```
调用 GenericServlet 提供的 getServletConfig() 方法获得
```java
//调用 GenericServlet 提供的 getServletConfig 方法获得 ServletConfig 对象
ServletConfig servletConfig = this.getServletConfig();
```
javax.servlet 包提供了一个 ServletConfig 接口，该接口中提供了以下方法。





### 配置 Servlet 初始化参数
配置 Servlet 的初始化参数有 2 种方式：
使用 web.xml 配置初始化参数；
使用 @WebServlet 配置初始化参数。
1.使用 web.xml 配置初始化参数
在 web.xml 中可以使用一个或多个 <init-param> 元素为 Servlet 配置初始化参数，代码如下。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
    id="WebApp_ID" metadata-complete="false" version="4.0">
    <servlet>
        <servlet-name>MyServlet</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet</servlet-class>
        <!-- Servlet 初始化参数 -->
        <init-param>
            <param-name>name</param-name>
            <param-value>编程帮</param-value>
        </init-param>
        <!-- Servlet 初始化参数 -->
        <init-param>
            <param-name>URL</param-name>
            <param-value>www.biancheng.net</param-value>
        </init-param>
    </servlet>
</web-app>
```
以上配置说明如下：
<init-param> 元素是 <servlet> 的子元素， 需要在 <servlet> 元素内使用，表示只对当前 Servlet 有效 。
<param-name> 子元素表示参数的名称。
<param-value> 子元素表示参数的值。
2.使用 @WebServlet 配置初始化参数
通过 @WebServlet 的 initParams 属性也可以为 Servlet 设置初始化参数，代码如下。 
```java
@WebServlet(urlPatterns = {"/MyServlet"}, initParams = {@WebInitParam(name = "name", value = "编程帮"),
        @WebInitParam(name = "URL", value = "www.biancheng.net")})
public class MyServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```
### 获取 Servlet 初始化参数
下面我们通过一个例子演示如何通过 ServletConfig 对象读取 Servlet 的初始化参数。

以 servletDemo 工程为例，在 net.biancheng.www 包下，创建名称为 ReadConfigServlet 的类，代码如下。
```java
@WebServlet(urlPatterns = { "/ReadConfigServlet" }, initParams = { @WebInitParam(name = "name", value = "编程帮"),
        @WebInitParam(name = "URL", value = "www.biancheng.net") })
public class ReadConfigServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        // 获取ServletConfig对象
        ServletConfig config = getServletConfig();
        // 获取servletName
        String servletName = config.getServletName();
        // 返回 servlet 的初始化参数的名称的集合
        Enumeration<String> initParameterNames = config.getInitParameterNames();
        // 遍历集合获取初始化参数名称
        while (initParameterNames.hasMoreElements()) {
            // 获取初始化参数名称
            String initParamName = initParameterNames.nextElement();
            // 获取相应的初始参数的值
            String initParamValue = config.getInitParameter(initParamName);
            // 向页面输出
            writer.write(initParamName + "  :  " + initParamValue + "<br/>");
        }
        // 关闭流
        writer.close();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
```
## ServletContext接口
Servlet 容器启动时，会为每个 Web 应用（webapps 下的每个目录都是一个 Web 应用）创建一个唯一的 ServletContext 对象，该对象一般被称为“Servlet 上下文”。

ServletContext 对象的生命周期从 Servlet 容器启动时开始，到容器关闭或应用被卸载时结束。

Web 应用中的所有 Servlet 共享同一个 ServletContext 对象，不同 Servlet 之间可以通过 ServletContext 对象实现数据通讯，因此 ServletContext 对象也被称为 Context 域对象。
域对象是服务器在内存上创建的存储空间，该空间用于不同动态资源（例如 Servlet、JSP）之间传递与共享数据。

### 获得 ServletContext 对象
获得 ServletContext 对象有以下 4 种方式：
1. 通过 GenericServlet 提供的 getServletContext() 方法
	 //通过 GenericServlet的getServletContext方法获取ServletContext对象
	 ServletContext servletContext = this.getServletContext();
2. 通过 ServletConfig 提供的 getServletContext() 方法
	 //通过 ServletConfig的 getServletContext方法获取ServletContext对象
	 ServletContext servletContext = this.getServletConfig().getServletContext();
3. 通过 HttpSession 提供的 getServletContext() 方法
	 //通过 HttpSession的 getServletContext方法获取ServletContext对象
	 ServletContext servletContext = req.getSession().getServletContext();
4. 通过 HttpServletRequest 提供的 getServletContext() 方法
	 //通过 HttpServletRequest的 getServletContext方法获取ServletContext对象
	 ServletContext servletContext = req.getServletContext();

### ServletContext 的应用
javax.servlet 包提供了一个 ServletContext 接口，该接口定义了一组方法，Servlet 可以使用这些方法与容器进行通信。

ServletContext 的应用主要有以下 3 个：
获取上下文初始化参数
实现 Servlet 之间的数据通讯
读取 Web 应用下的资源文件
1. 获取上下文初始化参数
	 使用 ServletContext 对象获取 Web 应用的上下文初始化参数，分为 2 步：
1) 设置上下文初始化参数
2) 调用接口中方法获取初始化参数
1) 设置上下文初始化参数
	 通过 web.xml 中的 <context-param> 元素可以为 Web 应用设置一些全局的初始化参数，这些参数被称为上下文初始化参数。

与 Servlet 的初始化参数不同，应用中的所有 Servlet 都共享同一个上下文初始化参数。在 Web 应用的整个生命周期中，上下文初始化参数会一直存在，并且可以随时被任意一个 Servlet 访问。

在 web.xml 文件中配置上下文初始化参数，代码如下所示。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0" metadata-complete="false">

    <!--设置全局初始化参数 -->
    <context-param>
        <param-name>name</param-name>
        <param-value>编程帮</param-value>
    </context-param>

    <context-param>
        <param-name>url</param-name>
        <param-value>www.biancheng.net</param-value>
    </context-param>

</web-app>
```
对以上标签说明如下：
<context-param> 元素用来声明上下文初始化参数，必须在根元素 <web-app> 内使用。
<param-name> 子元素表示参数名，参数名在整个 Web 应用中必须是唯一的。
<param-value> 子元素表示参数值。
2) 调用接口中方法获取初始化参数
	 Servlet 容器启动时，会为容器内每个 Web 应用创建一个 ServletContext 对象，并将 <context-param> 元素中的上下文初始化参数以键值对的形式存入该对象中，因此我们可以通过 ServletContext 的相关方法获取到这些初始化参数。

下表列举了 ServletContext 接口中用于获取上下文初始化参数的相关方法。





以 servletDemo 为例，在 net.biancheng.www 包下创建一个名称为 ReadContextServlet 的类，代码如下。
```java
@WebServlet("/ReadContextServlet")
public class ReadContextServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        // 调用httpServlet父类GenericServlet的getServletContext方法获取ServletContext对象
        ServletContext context = super.getServletContext();
        // 返回 context 上下文初始化参数的名称
        Enumeration<String> initParameterNames = context.getInitParameterNames();
        while (initParameterNames.hasMoreElements()) {
            // 获取初始化参数名称
            String initParamName = initParameterNames.nextElement();
            // 获取相应的初始参数的值
            String initParamValue = context.getInitParameter(initParamName);
            // 向页面输出
            writer.write(initParamName + "  :  " + initParamValue + "<br/>");
        }
        // 关闭流
        writer.close();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
```
实现数据通讯
在 Servlet 中，调用 ServletContext 接口的 setAttribute() 方法可以创建一些属性，这些属性被存放在 ServletContext 对象中。应用中所有 Servlet 都可以对这些属性进行访问和操作，通过它们可以实现应用内不同 Servlet 之间的数据通讯。
数据通讯的相关方法
下表列举了 ServletContext 接口实现数据通讯的相关方法。

返回值类型	方法	描述
void	setAttribute(String name, Object object)	把一个 Java 对象与一个属性名绑定，并将它作为一个属性存放到 ServletContext 中。
参数 name 为属性名，参数 object 为属性值。
void	removeAttribute(String name)	从 ServletContext 中移除属性名为 name 的属性。
Object	getAttribute(String name)	根据指定的属性名 name，返回 ServletContext 中对应的属性值。
ServletContext 属性与上下文初始化参数对比
虽然 ServletContext 的属性与上下文初始化参数都是存放在 ServletContext 对象中，但它们是不同的。

不同点	ServletContext 的属性	上下文初始化参数
创建方式	ServletContext 的属性通过调用 ServletContext 接口的 setAttribute() 方法创建	上下文初始化参数通过 web.xml 使用 <context-param> 元素配置
可进行的操作	ServletContext 的属性可以通过 ServletContext 接口的方法进行读取、新增、修改、移除等操作	上下文初始化参数在容器启动后只能被读取，不能进行新增、修改和移除操作
生命周期	ServletContext 中属性的生命周期从创建开始，到该属性被移除（remove）或者容器关闭结束	上下文初始化参数的生命周期，从容器启动开始，到 Web 应用被卸载或容器关闭结束
作用	使用 ServletContext 中的属性可以实现 Servlet 之间的数据通讯	使用上下文初始化参数无法实现数据通讯
例 2
我们通过编写一个统计页面访问量的案例，来演示如何通过 ServletContext 对象实现数据通讯。

在 servletDemo 的 net.biancheng.www 包下，创建一个名称为 CountServlet 的 Servlet 类，代码如下。
```java
@WebServlet("/CountServlet")
public class CountServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    public void init() throws ServletException {
        // 获取ServletContext对象
        ServletContext context = getServletContext();
        // 初始化时，向ServletContext中设置count属性，初始值为0
        context.setAttribute("count", 0);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 调用httpServlet父类GenericServlet的getServletContext方法获取ServletContext对象
        ServletContext context = super.getServletContext();
        // 获取count的值，自增
        Integer count = (Integer) context.getAttribute("count");
        // 存入到域对象中
        context.setAttribute("count", ++count);
        // 向页面输出内容
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write("<h3>编程帮  www.biancheng.net 欢迎您</h3>");
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
```
然后再创建一个名称为 ShowServlet 的 Servlet 类，代码如下。
```java
@WebServlet("/ShowServlet")
public class ShowServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 获取ServletContext中存放的count属性（即页面的访问次数）
        Integer count = (Integer) getServletContext().getAttribute("count");
        // 向页面输出
        response.setContentType("text/html;charset=UTF-8");
        // 若CountServlet已被访问
        if (count != null) {
            response.getWriter().write("<h3>该网站一共被访问了" + count + "次</h3>");
        } else {
            // 若CountServlet未被访问，提示先访问CountServlet
            response.getWriter().write("<h3>请先访问 CountServlet</h3>");
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
```
读取 Web 应用下的资源文件
在实际开发中，有时会需要读取 Web 应用中的一些资源文件，如配置文件和日志文件等。为此，ServletContext 接口定义了一些读取 Web 资源的方法 ，如下表。

返回值类型	方法	方法描述
Set	getResourcePaths(String path)	返回一个 Set 集合，该集合中包含资源目录中的子目录和文件的名称。
String 	getRealPath(String path) 	返回资源文件的真实路径（文件的绝对路径）。
URL 	getResource(String path)	返回映射到资源文件的 URL 对象。
InputStream	getResourceAsStream(String path)	返回映射到资源文件的 InputStream 输入流对象。

注：上表中参数 path 代表资源文件的虚拟路径，它以正斜线/开始，/表示当前 Web 应用的根目录。
例 3
下面我们通过一个例子演示如何使用 ServletContext 对象读取资源文件。

在 servletDemo 的 src 目录中，创建一个名称为 db.properties 的文件，文件中输入如下所示的配置信息。
name=编程帮
url=www.biancheng.net
desc=编程帮,欢迎你

```java
@WebServlet("/ReadServlet")
public class ReadServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        // 获取相对路径中的输入流对象
        InputStream ins = getServletContext().getResourceAsStream("/WEB-INF/classes/db.properties");
        // 获取输入流
        Properties pro = new Properties();
        // 加载
        pro.load(ins);
        // 获取文件中的内容
        String name = pro.getProperty("name");
        String url = pro.getProperty("url");
        String desc = pro.getProperty("desc");
        writer.write("用户名：" + name + "<br/>" + "地址：" + url + "<br/>" + "描述：" + desc + "<br/>");
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
```
## HttpServletRequest接口
客户端通过 HTTP 协议来访问服务器的资源，Servlet 主要用来处理 HTTP 请求。

![](servlet3/1.png)

Servlet 处理 HTTP 请求的流程：
1. Servlet 容器接收到来自客户端的 HTTP 请求后，容器会针对该请求分别创建一个`HttpServletRequest`对象和`HttpServletReponse`对象。
2. 容器将`HttpServletRequest`对象和`HttpServletReponse`对象以参数的形式传入`service()`方法内，并调用该方法。
3. 在`service()`方法中 Servlet 通过`HttpServletRequest`对象获取客户端信息以及请求的相关信息。
4. 对 HTTP 请求进行处理。
5. 请求处理完成后，将响应信息封装到`HttpServletReponse`对象中。
6. Servlet 容器将响应信息返回给客户端。
7. 当 Servlet 容器将响应信息返回给客户端后，`HttpServletRequest`对象和`HttpServletReponse`对象被销毁。

通过以上流程可以看出，`HttpServletRequest`对象用于封装 HTTP 请求信息，`HttpServletReponse`对象用于封装 HTTP 响应信息。
### HttpServletRequest 接口
`HttpServletRequest`接口继承自`ServletRequest`接口。`HttpServletRequest`对象专门用于封装 HTTP 请求消息，简称`request`对象。

HTTP 请求消息分为请求行、请求消息头和请求消息体三部分，所以`HttpServletRequest`接口中定义了获取请求行、请求头和请求消息体的相关方法。
#### 获取请求行信息
HTTP 请求的请求行中包含请求方法、请求资源名、请求路径等信息，`HttpServletRequest`接口定义了一系列获取请求行信息的方法：

| 返回值类型  | 方法声明             | 描述                                                             |
|--------|------------------|----------------------------------------------------------------|
| String | getMethod()      | 获取 HTTP 请求方式（如 GET、POST 等）                                     |
| String | getRequestURI()  | 获取请求行中的资源名称部分，即位于 URL 的主机和端口之后，参数部分之前的部分                       |
| String | getQueryString() | 获取请求行中的参数部分，也就是 URL 中“?”以后的所有内容                                |
| String | getContextPath() | 返回当前 Servlet 所在的应用的名字（上下文）。对于默认（ROOT）上下文中的 Servlet，此方法返回空字符串"" |
| String | getServletPath() | 获取 Servlet 所映射的路径                                              |
| String | getRemoteAddr()  | 获取客户端的 IP 地址                                                   |
| String | getRemoteHost()	 | 获取客户端的完整主机名，如果无法解析出客户机的完整主机名，则该方法将会返回客户端的 IP 地址                |

```java
@WebServlet("/RequestLine")
public class RequestLine extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.println("请求方式:" + request.getMethod() + "<br/>" +
                "客户端的 IP 地址:" + request.getRemoteAddr() + "<br/>" +
                "应用名字（上下文）:" + request.getContextPath() + "<br/>" +
                "URI:" + request.getRequestURI() + "<br/>" +
                "请求字符串:" + request.getQueryString() + "<br/>" +
                "Servlet所映射的路径:" + request.getServletPath() + "<br/>" +
                "客户端的完整主机名:" + request.getRemoteHost() + "<br/>"
        );
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
```
#### 获取请求头信息
当浏览器发送请求时，需要通过请求头向服务器传递一些附加信息，例如客户端可以接收的数据类型、压缩方式、语言等。为了获取请求头中的信息，`HttpServletRequest`接口定义了一系列用于获取 HTTP 请求头字段的方法。

| 返回值类型        | 方法声明                    | 描述                                                   |
|--------------|-------------------------|------------------------------------------------------|
| String       | getHeader(String name)  | 获取一个指定头字段的值。如果请求消息中包含多个指定名称的头字段，则该方法返回其中第一个头字段的值     |
| Enumeration	 | getHeaders(String name) | 返回指定头字段的所有值的枚举集合，在多数情况下，一个头字段名在请求消息中只出现一次，但有时可能会出现多次 |
| Enumeration	 | getHeaderNames()        | 该方法返回请求头中所有头字段的枚举集合                                  |
| String       | getContentType()        | 该方法用于获取 Content-Type 头字段的值                           |
| int          | getContentLength()      | 该方法用于获取 Content-Length 头字段的值                         |
| String       | getCharacterEncoding()  | 该方法用于返回请求消息的字符集编码                                    |


```java
@WebServlet("/RequestHeader")
public class RequestHeader extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        //获得所有请求头字段的枚举集合
        Enumeration<String> headers = request.getHeaderNames();
        while (headers.hasMoreElements()) {
            //获得请求头字段的值
            String value = request.getHeader(headers.nextElement());
            writer.write(headers.nextElement() + ":" + value + "<br/>");
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
```
#### 获取 form 表单的数据
为了方便获取表单中的请求参数，`ServletRequest`定义了一系列获取请求参数的方法。

| 返回值类型       | 方法声明                              | 描述                                            |
|-------------|-----------------------------------|-----------------------------------------------|
| String      | getParameter(String name)         | 返回指定参数名的参数值                                   |
| String[]    | 	getParameterValues (String name) | 以字符串数组的形式返回指定参数名的所有参数值（HTTP 请求中可以有多个相同参数名的参数） |
| Enumeration | getParameterNames()               | 以枚举集合的形式返回请求中所有参数名                            |
| Map         | getParameterMap()                 | 用于将请求中的所有参数名和参数值装入一个 Map 对象中返回                |

```java
@WebServlet("/RequestParam")
public class RequestParam extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = response.getWriter();
        // 获取内容，做其他操作
        // 获取姓名
        String username = request.getParameter("username");
        // 获取密码
        String password = request.getParameter("password");
        // 获取性别
        String sex = request.getParameter("sex");
        // 获取城市
        String city = request.getParameter("city");
        // 获取语言
        String[] languages = request.getParameterValues("language");
        writer.write("用户名：" + username + "<br/>" + "密码：" + password + "<br/>" + "性别：" + sex + "<br/>" + "城市：" + city
                + "<br/>" + "使用过的语言：" + Arrays.toString(languages) + "<br/>");
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
```
### 中文乱码问题
根据请求方式的不同，请求一般可以被分为两种：GET 请求和 POST 请求。这两种请求方式都可能会产生中文乱码问题。
#### POST 请求
乱码的原因：POST 提交的数据在请求体中，其所使用的编码格式与页面一致（即 utf-8）。`request`对象接收到数据之后，会将数据放到`request`缓冲区，缓冲区的默认字符集是 ISO-8859-1（该字符集不支持中文），两者使用的字符集不一致导致乱码。

解决方案：在获取请求参数之前设置`request`缓冲区字符集为 utf-8。
```java
//修改request缓冲区的字符集为UTF-8
request.setCharacterEncoding("utf-8");
// 获取用户名
String username = request.getParameter("username");
```
#### GET 请求
乱码的原因：Get 请求将请求数据附加到 URL 后面作为参数，浏览器发送文字时采用的编码格式与页面编码保持一致（utf-8）。如果 Tomcat 没有设置字符集，接收 URL 时默认使用 ISO-8859-1 进行解码，ISO-8859-1 不兼容中文，无法正确解码，导致出现乱码。

需要注意的是，在 Tomcat8 中已解决了`get`方式提交请求中文乱码的问题，使用 Tomcat8 及以上版本不必再考虑此问题了，如果您使用的是 Tomcat7 或更早的版本，出现乱码问题可以使用如下的方案解决。

解决方案：解决 GET 请求中文乱码问题，有以下 3 种解决方案。

1. 修改`tomcat/conf/server.xml`中的配置。
```xml
<Connector port="80" protocol="HTTP/1.1"
			connectionTimeout="20000"
			redirectPort="8443" URIEncoding="UTF-8"/>
```
2. 使用`URLEncoder`和`URLDecoder`进行编码和解码的操作（逆向编解码）。
```java
//得到TOMCAT通过ISO8859-1解码的字符串
String username = request.getParameter("username");
//对字符串使用ISO8859-1进行编码，得到最初浏览器使用UTF-8编码的字符串
username = URLEncoder.encode(username, "ISO8859-1");
//将使用UTF-8编码的字符串使用UTF-8进行解码，得到正确的字符串
username = URLDecoder.decode(username, "UTF-8");
```
3. 使用`String`的构造方法：`String(byte[] bytes, String charset)`，对字节数组（`bytes`）按照指定的字符集（`charset`）进行解码，返回解码后的字符串，解决乱码问题（推荐使用）。
```java
//获取姓名
String username = request.getParameter("username");
//使用String的构造方法解决乱码的问题
username = new String(username.getBytes("ISO-8859-1"),"UTF-8");
```
## Servlet请求转发
Web 应用在处理客户端的请求时，经常需要多个 Web 资源共同协作才能生成响应结果。但由于`Serlvet`对象无法直接调用其他 Servlet 的`service()`方法，所以 Servlet 规范提供了 2 种解决方案：
* 请求转发
* 请求包含（了解即可）

### 请求转发
请求转发属于服务器行为。容器接收请求后，Servlet 会先对请求做一些预处理，然后将请求传递给其他 Web 资源，来完成包括生成响应在内的后续工作。
#### RequestDispatcher 接口
`javax.servlet`包中定义了一个`RequestDispatcher`接口，`RequestDispatcher`对象由 Servlet 容器创建，用于封装由路径所标识的 Web 资源。利用`RequestDispatcher`对象可以把请求转发给其他的 Web 资源。

Servlet 可以通过 2 种方式获得`RequestDispatcher`对象：
* 调用`ServletContext`的`getRequestDispatcher(String path)`方法，参数`path`指定目标资源的路径，必须为绝对路径；
* 调用`ServletRequest`的`getRequestDispatcher(String path)`方法，参数`path`指定目标资源的路径，可以为绝对路径，也可以为相对路径。

`RequestDispatcher`接口中提供了以下方法。

| 返回值类型 | 方法                                                       | 功能描述                                                                  |
|-------|----------------------------------------------------------|-----------------------------------------------------------------------|
| void  | forward(ServletRequest request,ServletResponse response) | 用于将请求转发给另一个 Web 资源。该方法必须在响应提交给客户端之前被调用，否则将抛出 IllegalStateException 异常 |
| void  | include(ServletRequest request,ServletResponse response) | 用于将其他的资源作为当前响应内容包含进来                                                  |

#### 请求转发的工作原理
在 Servlet 中，通常使用`forward()`方法将当前请求转发给其他的 Web 资源进行处理。请求转发的工作原理：

