

## @WebServlet注解
在 Servlet 中，web.xml 扮演的角色十分的重要，它可以将所有的 Servlet 的配置集中进行管理，但是若项目中 Servelt 数量较多时，web.xml 的配置会变得十分的冗长。这种情况下，注解（Annotation）就是一种更好的选择。

与 XML 不同，注解不需要依赖于配置文件，它可以直接在类中使用，其配置只对当前类有效，这样就避免了集中管理造成的配置冗长问题。那么 Servelt 支持注解吗？

为了简化 Servlet 的配置，Servlet 3.0 中增加了注解支持，例如：@WebServlet、@WebInitParm 、@WebFilter 和 @WebLitener 等，这使得 web.xml 从 Servlet 3.0 开始不再是必选项了。下面我们对 @WebServlet 进行介绍。
### @WebServlet 注解的属性
@WebServlet 用于将一个类声明为 Servlet，该注解会在部署时被容器处理，容器根据其具体的属性配置将相应的类部署为 Servlet。该注解具有下表给出的一些常用属性。


### @WebServlet 注解的使用
1. 启用注解支持
	 web.xml 的顶层标签 <web-app> 中有一个属性：metadata-complete，该属性用于指定当前 web.xml 是否是完全的。若该属性设置为 true，则容器在部署时将只依赖 web.xml，忽略所有的注解。若不配置该属性，或者将其设置为 false，则表示启用注解支持。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
    id="WebApp_ID" metadata-complete="false" version="4.0">
    <!-- metadata-complete取值为true，表示关闭注解支持 -->
    <!-- metadata-complete取值为false，表示启用注解支持 -->
</web-app>
```
由于 metadata-complete 属性的默认值是 false，即默认启用 Servlet 注解支持，所以默认情况下，使用该注解时，不必创建 web.xml 文件。

2. 使用 @WebServlet 注解
	 @WebServlet 属于类级别的注解，标注在继承了 HttpServlet 的类之上。常用的写法是将 Servlet 的相对请求路径（即 value）直接写在注解内，如下所示。
	 @Web​Servlet("/MyServlet")

该写法省略了 urlPatterns 属性名，其完整的写法如下所示。
@WebServlet(​urlPatterns = "/MyServlet")。

如果 @WebServlet 中需要设置多个属性，则属性之间必须使用逗号隔开，如下所示。
```java
@WebServlet(asyncSupported = true, name = "myServlet", description = "name描述", loadOnStartup = 1, urlPatterns = {
        "/MyServlet", "/*" }, initParams = {
                @WebInitParam(name = "编程帮", value = "www.biancheng.net", description = "init参数1"),
                @WebInitParam(name = "京东", value = "www.jd.com", description = "init参数2") })
public class MyServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
}
```
注意事项：
通过实现 Serlvet 接口或继承 GenericServlet 创建的 Servlet 类无法使用 @WebServlet 注解。
使用 @WebServlet 注解配置的 Servlet 类，不要在 web.xml 文件中再次配置该 Servlet 相关属性。若同时使用 web.xml 与 @WebServlet 配置同一 Servlet 类，则 web.xml 中 <servlet-name> 的值与注解中 name 取值不能相同，否则容器会忽略注解中的配置。
### @WebServlet 注解 和 web.xml 的优缺点
使用 web.xml 或 @WebServlet 注解都可以配置 Servlet， 两者各有优缺点。
@WebServlet 注解配置 Servlet
优点：@WebServlet 直接在 Servlet 类中使用，代码量少，配置简单。每个类只关注自身业务逻辑，与其他 Servlet 类互不干扰，适合多人同时开发。

缺点：Servlet 较多时，每个 Servlet 的配置分布在各自的类中，不便于查找和修改。
web.xml 配置文件配置 Servlet
优点：集中管理 Servlet 的配置，便于查找和修改。

缺点：代码较繁琐，可读性不强，不易于理解。

## Servlet生命周期
Servlet 的生命周期就是 Servlet 从创建到销毁的过程。Servlet 的生命周期由 Servlet 容器管理，主要分为以下 3 个阶段。
初始化阶段
运行时阶段
销毁阶段

在 javax.servlet.Servlet 接口中定义了 3 个方法：init()、service()、destory()，它们分别在 Servlet 生命周期的不同阶段被 Servlet 容器调用。
### 初始化阶段
Servlet 初始化是其生命周期的第一个阶段，也是其他阶段的基础。只有完成了初始化，Servlet 才能处理来自客户端的请求。

Servlet 初始化阶段分为 2 步：
加载和实例化 Servlet；
调用 init() 方法进行初始化。
1. 加载和实例化 Servlet
	 Servlet 容器负责加载和实例化 Servlet。当容器启动或首次请求某个 Servlet 时，容器会读取 web.xml 或 @WebServlet 中的配置信息，对指定的 Servlet 进行加载。加载成功后，容器会通过反射对 Servlet 进行实例化。
	 因为 Servlet 容器是通过 Java 的反射 API 来创建 Servlet 实例的，需要调用 Servlet 的默认构造方法（default constructor，即不带参数的构造方法），所以在编写 Servlet 类时，不能只提供一个带参数的构造方法。

2. 调用 init() 方法进行初始化
	 加载和实例化完成后，Servlet 容器调用 init() 方法初始化 Servlet 实例。

初始化的目的：让 Servlet 实例在处理请求之前完成一些初始化工作，例如建立数据库连接，获取配置信息等。

在 Servlet 的整个生命周期内，init() 方法只能被调用一次。

初始化期间，Servlet 实例可以通过 ServletConfig 对象获取在 web.xml 或者 @WebServlet 中配置的初始化参数。
### 运行时阶段
运行时阶段是 Servlet 生命周期中最重要的阶段。Servlet 容器接收到来自客户端请求时，容器会针对该请求分别创建一个 ServletRequst 对象和 ServletResponse 对象，将它们以参数的形式传入 service() 方法内，并调用该方法对请求进行处理。

这里需要注意的是，执行 service() 方法前，init() 方法必须已成功执行。

在 service() 方法中，Servlet 通过 ServletRequst 对象获取客户端的相关信息和请求信息。在请求处理完成后，通过 ServletResponse 对象将响应信息进行包装，返回给客户端。当 Servlet 容器将响应信息返回给客户端后，ServletRequst 对象与 ServletResponse 对象就会被销毁。

在 Servlet 的整个生命周期内，对于 Servlet 的每一次请求，Servlet 容器都会调用一次 service() 方法，并创建新的 ServletRequest 和 ServletResponse 对象。即 service() 方法在 Servlet 的整个生命周期中会被调用多次。
### 销毁阶段
当 Servlet 容器关闭、重启或移除 Servlet 实例时，容器就会调用 destory() 方法，释放该实例使用的资源，例如：关闭数据库连接，关闭文件的输入流和输出流等，随后该实例被 Java 的垃圾收集器所回收。

对于每个 Servlet 实例来说，destory() 方法只能被调用一次。
### Servlet 生命周期执行流程

![](servlet2/6.png)

在 Servlet 的整个生命周期中，创建 Servlet 实例、init() 方法和 destory() 方法都只执行一次。当初始化完成后，Servlet 容器会将该实例保存在内存中，通过调用它的 service() 方法，为接收到的请求服务。
## load-on-startup元素：控制Servlet启动优先级
load-on-startup 是 web.xml 中的一个节点，是 servlet 元素的子元素，用来标记 Servlet 容器启动时是否初始化当前 Servlet，以及当前 Servlet 的初始化顺序。

load-on-startup 元素取值规则如下：
它的取值必须是一个整数；
当值小于 0 或者没有指定时，则表示容器在该 Servlet 被首次请求时才会被加载；
当值大于 0 或等于 0 时，表示容器在启动时就加载并初始化该 Servlet，取值越小，优先级越高；
当取值相同时，容器就会自行选择顺序进行加载。
@WebServlet 注解的 loadOnStartup 属性与 web.xml 中的 load-on-startup 元素相对应，取值的规则和含义相同。

```java
public class MyServlet1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
    @Override
    public void destroy() {
        System.out.println(this.getServletName() + "：销毁");
    }
    @Override
    public void init() throws ServletException {
        System.out.println(this.getServletName() + "：初始化完成");
    }
}
```
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         id="WebApp_ID" metadata-complete="false" version="4.0">
    <servlet>
        <servlet-name>MyServlet1</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet1</servlet-class>
        <!-- load-on-startup 取值0 -->
        <load-on-startup>0</load-on-startup>
    </servlet>
    <servlet>
        <servlet-name>MyServlet2</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet1</servlet-class>
        <!-- load-on-startup 取值1 -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet>
        <servlet-name>MyServlet3</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet1</servlet-class>
        <!-- load-on-startup 取值2 -->
        <load-on-startup>2</load-on-startup>
    </servlet>
    <servlet>
        <servlet-name>MyServlet4</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet1</servlet-class>
        <!-- load-on-startup 取值-1-->
        <load-on-startup>-1</load-on-startup>
    </servlet>
    <!--不设置 load-on-startup ，去默认值 -->
    <servlet>
        <servlet-name>MyServlet5</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet1</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>MyServlet1</servlet-name>
        <url-pattern>/MyServlet1</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>MyServlet2</servlet-name>
        <url-pattern>/MyServlet2</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>MyServlet3</servlet-name>
        <url-pattern>/MyServlet3</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>MyServlet4</servlet-name>
        <url-pattern>/MyServlet4</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>MyServlet5</servlet-name>
        <url-pattern>/MyServlet5</url-pattern>
    </servlet-mapping>
</web-app>
```

由示例可知：
由于 MyServlet1、MyServlet2 和 MyServlet3 的 load-on-startup 元素取值都大于等于 0，因此当 Tomcat 启动时，就对它们进行了初始化。
由于在 Servlet 的生命周期内，init() 方法（初始化方法）只能被调用一次，因此当 Tomcat 启动完成后，第一次访问 MyServlet1、MyServlet2 和 MyServlet3 时，它们不会再次被初始化。
由于 MyServlet4 的 load-on-startup 元素取值为负数，因此只有当第一次请求它时，才会进行初始化。
由于 MyServlet5  没有指定 load-on-startup 元素取值，因此只有当第一次请求它时，才会进行初始化。

## Servlet虚拟路径映射
客户端通过 URL 地址来访问 Web 服务器中的资源，Servlet 程序若想被外界访问，就必须被映射到一个 URL 地址上。很多时候，该 URL 地址和 Servlet 程序的物理路径（在硬盘上的存储位置）并不一致，因此它被称为虚拟路径。Servlet 与虚拟路径的对应关系就叫做 Servlet 虚拟路径映射。

Servlet 虚拟路径映射可以被分为 2 类：
单一映射
多重映射

### Servlet 单一映射
Servelt 单一映射是指一个 Servlet 只被映射到一个虚拟路径上。

Servlet 单一映射的实现方式有 2 种：
使用 web.xml 实现单一映射；
使用 @WebServlet 实现单一映射。
1. web.xml 实现单一映射
	 在 web.xml 文件中，使用 <servlet> 和 <servlet-mapping> 元素实现 Servlet 单一映射，代码如下。
	

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         id="WebApp_ID" metadata-complete="false" version="4.0">
    <servlet>
        <servlet-name>MyServlet</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>MyServlet</servlet-name>
        <url-pattern>/myServlet</url-pattern>
    </servlet-mapping>
</web-app>
```
对以上标签说明如下：
<servlet> 元素用于注册 Servlet，即给 Servlet 起一个独一无二的名字。
<servlet> 包含两个主要的子元素 <servlet-name> 和 <servlet-class>，分别用于指定 Servlet 的名称和 Servlet 的完整限定名（包名+类名）。
<servlet-mapping> 元素用于定义 Servlet 与虚拟路径之间的映射。
<servlet-mapping> 包含两个子元素 <servlet-name> 和 <url-pattern>，分别用于指定 Servlet 的名称和虚拟路径。
2. @WebServlet 实现单一映射
	 在 @WebServlet 注解中，一般使用 value 属性实现 Servlet 单一映射，代码如下。
	
```java
@WebServlet("/MyServlet")
public class MyServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```
也可以使用 urlPatterns 属性实现 Servlet 单一映射，代码如下。
```java
@WebServlet(urlPatterns = "/myServlet")
public class MyServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```
### Servlet 多重映射
Servlet 的多重映射是指一个 Servlet 可以被映射到多个虚拟路径上。此时，客户端可以通过多个路径实现对同一个 Servlet 的访问。

Servlet 多重映射的实现方式有 3 种：
配置多个 <servlet-mapping> 元素。
配置多个 <url-pattern> 子元素。
在 @WebServlet 的 urlPatterns 属性中使用字符串数组
1. 配置多个 <servlet-mapping> 元素
	 Servlet 2.5 规范之前，<servlet-mapping> 元素只允许包含一个 <url-pattern> 子元素，若要实现 Servet 的多重映射，只能通过配置多个 <servlet-mapping> 元素实现。

以 serveltDemo 为例，在 web.xml 中配置两个 <servlet-mapping> 元素，代码如下所示。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
    id="WebApp_ID" metadata-complete="false" version="4.0">
    <servlet>
        <servlet-name>MyServlet</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>MyServlet</servlet-name>
        <url-pattern>/myServlet</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>MyServlet</servlet-name>
        <url-pattern>/myServlet2</url-pattern>
    </servlet-mapping>
</web-app>
```
配置多个 <url-pattern> 子元素
从 Servlet 2.5 开始，<servlet-mapping> 元素可以包含多个 <url-pattern> 子元素，每个 <url-pattern> 代表一个虚拟路径的映射规则。因此，通过在一个 <servlet-mapping> 元素中配置多个 <url-pattern> 子元素，也可以实现 Servlet 的多重映射。

以 servletDemo 为例，<servlet-mapping> 元素下添加两个 <url-pattern> 子元素，代码如下。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
    id="WebApp_ID" metadata-complete="false" version="4.0">
    <servlet>
        <servlet-name>MyServlet</servlet-name>
        <servlet-class>net.biancheng.www.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>MyServlet</servlet-name>
        <url-pattern>/myServlet</url-pattern>
        <url-pattern>/myServlet3</url-pattern>
    </servlet-mapping>
</web-app>
```
@WebServlet 实现多重映射
Servlet 3.0 增加了对 @WebServlet 注解的支持，我们可以在 urlPatterns 属性中，以字符串数组的形式指定一组映射规则来实现 Servlet 的多重映射。

以 servletDemo 为例，在 @WebServlet 注解的 urlPatterns 属性中添加一组虚拟路径，代码如下。

```java
@WebServlet(
        urlPatterns = { "/myServlet", "/myServlet4" })
public class MyServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private int initCount = 0;
    private int httpCount = 0;
    private int destoryCount = 0;
    @Override
    public void destroy() {
        destoryCount++;
        super.destroy();
        // 向控制台输出destory方法被调用次数
        System.out.println(
                "**********************************destroy方法：" + destoryCount + "*******************************");
    }
    @Override
    public void init() throws ServletException {
        initCount++;
        super.init();
        // 向控制台输出init方法被调用次数
        System.out.println("init方法：" + initCount);
    }
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        httpCount++;
        // 控制台输出doGet方法次数
        System.out.println("doGet方法：" + httpCount);
        // 设置返回页面格式与字符集
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();
        // 向页面输出
        writer.write("初始化次数:" + initCount + "<br/>" + "处理请求次数:" + httpCount + "<br/>" + "销毁次数:" + destoryCount);
        writer.close();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
}
```
## Servlet虚拟路径匹配规则
当 Servlet 容器接收到请求后，容器会将请求的 URL 减去当前应用的上下文路径，使用剩余的字符串作为映射 URL 与 Servelt 虚拟路径进行匹配，匹配成功后将请求交给相应的 Servlet 进行处理。

以 servletDemo 为例，若 URL 为“http://localhost:8080/servletDemo/myServlet”，其应用上下文是 servletDemo，容器会将“http://localhost:8080/servletDemo”去掉，使用剩余的“/myServlet”与 Servlet 虚拟路径进行匹配。
### 匹配规则
Servlet 虚拟路径匹配规则有以下 4 种：
完全路径匹配
目录匹配
扩展名匹配
缺省匹配（默认匹配）

下面我们以 servletDemo 为例，分别介绍 4 种规则。





### 匹配优先级
Servlet 虚拟路径的匹配优先级顺序为：全路径匹配（精确匹配）> 目录匹配 > 扩展名匹配 > 缺省匹配（默认匹配）。

Servlet 容器会从优先级高的虚拟路径开始匹配，匹配成功后就会立刻将请求交给相应的 Servlet 进行处理，不会再关注其他虚拟路径是否匹配成功。
示例 1
下面我们通过一个实例加深对 Servlet 虚拟路径匹配的理解。

在 servletDemo 的 net.biancheng.www 包下，创建名称为 VirtualPathServlet 的 Servlet 类，代码如下。

```java
public class VirtualPathServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();
        // 向页面输出
        writer.write("本次访问的Servlet是:" + this.getServletName());
        writer.close();
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```
web.xml 的配置如下。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
    id="WebApp_ID" metadata-complete="false" version="4.0">
    <servlet>
        <servlet-name>MyServlet1</servlet-name>
        <servlet-class>net.biancheng.www.VirtualPathServlet</servlet-class>
    </servlet>
    <servlet>
        <servlet-name>MyServlet2</servlet-name>
        <servlet-class>net.biancheng.www.VirtualPathServlet</servlet-class>
    </servlet>
    <servlet>
        <servlet-name>MyServlet3</servlet-name>
        <servlet-class>net.biancheng.www.VirtualPathServlet</servlet-class>
    </servlet>
    <servlet>
        <servlet-name>MyServlet4</servlet-name>
        <servlet-class>net.biancheng.www.VirtualPathServlet</servlet-class>
    </servlet>
    <servlet>
        <servlet-name>MyServlet5</servlet-name>
        <servlet-class>net.biancheng.www.VirtualPathServlet</servlet-class>
    </servlet>
    <!-- 完全路径匹配 -->
    <servlet-mapping>
        <servlet-name>MyServlet1</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
    <!-- 目录匹配 -->
    <servlet-mapping>
        <servlet-name>MyServlet2</servlet-name>
        <url-pattern>/abc/my/*</url-pattern>
    </servlet-mapping>
    <!-- 目录匹配 -->
    <servlet-mapping>
        <servlet-name>MyServlet3</servlet-name>
        <url-pattern>/abc/*</url-pattern>
    </servlet-mapping>
    <!-- 扩展名匹配 -->
    <servlet-mapping>
        <servlet-name>MyServlet4</servlet-name>
        <url-pattern>*.do</url-pattern>
    </servlet-mapping>
    <!--缺省匹配 -->
    <servlet-mapping>
        <servlet-name>MyServlet5</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```
### Tomcat 中的缺省 Servlet
在 Tomcat 安装目录的 \conf\web.xml 文件中，注册了一个名称为 org.apache.catalina.servlets.DefaultServlet 的 Servlet，并将它设置为缺省 Servlet。
```xml
<servlet>
		<servlet-name>default</servlet-name>
		<servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
		<init-param>
				<param-name>debug</param-name>
				<param-value>0</param-value>
		</init-param>
		<init-param>
				<param-name>listings</param-name>
				<param-value>false</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>/</url-pattern>
</servlet-mapping>
```
Tomcat 服务器中的 Web 应用没有缺省 Servlet 时，会将 DefaultServlet 作为其缺省 Servlet。当客户端访问 Tomcat 服务器中某个静态 HTML 文件或者图片时，DefaultServlet 会判断该 HTML 或图片是否存在，若存在，则将数据以流的形式返回客户端，否则会报告 404 错误。
