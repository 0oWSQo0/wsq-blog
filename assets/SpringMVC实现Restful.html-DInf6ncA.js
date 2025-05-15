import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as p,o as l}from"./app-ByvFWdWZ.js";const o={};function F(e,s){return l(),a("div",null,s[0]||(s[0]=[p(`<p>在 Spring MVC 中，我们可以通过<code>@RequestMapping +@PathVariable</code>注解的方式，来实现 RESTful 风格的请求。</p><h2 id="通过-requestmapping-注解的路径设置" tabindex="-1"><a class="header-anchor" href="#通过-requestmapping-注解的路径设置"><span>通过@RequestMapping 注解的路径设置</span></a></h2><p>当请求中携带的参数是通过请求路径传递到服务器中时，我们就可以在<code>@RequestMapping</code>注解的<code>value</code>属性中通过占位符<code>{xxx}</code>来表示传递的参数，示例代码如下。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;/testRest/{id}/{username}&quot;</span><span style="color:#F0F3F6;">)</span></span></code></pre></div><p>注意：value 属性中占位符的位置应当与请求 URL 中参数的位置保持一致，否则会出现传错参数的情况。</p><h2 id="通过-pathvariable-注解绑定参数" tabindex="-1"><a class="header-anchor" href="#通过-pathvariable-注解绑定参数"><span>通过 @PathVariable 注解绑定参数</span></a></h2><p>我们可以在控制器方法的形参位置通过 @PathVariable 注解，将占位符 {xxx} 所表示的参数赋值给指定的形参。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;/testRest/{id}/{username}&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">testRest</span><span style="color:#F0F3F6;">(@</span><span style="color:#FF9492;">PathVariable</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;id&quot;</span><span style="color:#F0F3F6;">) String id, @</span><span style="color:#FF9492;">PathVariable</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;username&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">        String username) {</span></span>
<span class="line"><span style="color:#F0F3F6;">    System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;id:&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> id </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;,username:&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> username);</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#ADDCFF;"> &quot;success&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><h2 id="通过-hiddenhttpmethodfilter-对请求进行过滤" tabindex="-1"><a class="header-anchor" href="#通过-hiddenhttpmethodfilter-对请求进行过滤"><span>通过 HiddenHttpMethodFilter 对请求进行过滤</span></a></h2><p>由于浏览器默认只支持发送 GET 和 POST 方法的请求，因此我们需要在 web.xml 中使用 Spring MVC 提供的 HiddenHttpMethodFilter 对请求进行过滤。这个过滤器可以帮助我们将 POST 请求转换为 PUT 或 DELETE 请求，其具体配置内容如下。</p><div class="language-xml" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">&lt;!--来处理 PUT 和 DELETE 请求的过滤器--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">filter</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;HiddenHttpMethodFilter&lt;/</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter-class</span><span style="color:#F0F3F6;">&gt;org.springframework.web.filter.HiddenHttpMethodFilter&lt;/</span><span style="color:#72F088;">filter-class</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">filter</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">filter-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;HiddenHttpMethodFilter&lt;/</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;/*&lt;/</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">filter-mapping</span><span style="color:#F0F3F6;">&gt;</span></span></code></pre></div><p>HiddenHttpMethodFilter 处理 PUT 和 DELETE 请求时，必须满足以下 2 个条件：<br> 当前请求的请求方式必须为 POST；<br> 当前请求必须传输请求参数 _method。</p><p>在满足了以上条件后，HiddenHttpMethodFilter 过滤器就会将当前请求的请求方式转换为请求参数 _method 的值，即请求参数 _method 的值才是最终的请求方式，因此我们需要在 POST 请求中携带一个名为 _method 的参数，参数值为 DELETE 或 PUT。<br> 注意：若 web.xml 中同时存在 CharacterEncodingFilter 和 HiddenHttpMethodFilter 两个过滤器，必须先注册 CharacterEncodingFilter，再注册 HiddenHttpMethodFilter。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>web.xml 配置</p><div class="language-xml" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">&lt;?</span><span style="color:#72F088;">xml</span><span style="color:#91CBFF;"> version</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;1.0&quot;</span><span style="color:#91CBFF;"> encoding</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;UTF-8&quot;</span><span style="color:#F0F3F6;">?&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">web-app</span><span style="color:#91CBFF;"> xmlns</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://xmlns.jcp.org/xml/ns/javaee&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">         xmlns:xsi</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">         xsi:schemaLocation</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">         version</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;4.0&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--请求和响应的字符串过滤器--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;CharacterEncodingFilter&lt;/</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">filter-class</span><span style="color:#F0F3F6;">&gt;org.springframework.web.filter.CharacterEncodingFilter&lt;/</span><span style="color:#72F088;">filter-class</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">init-param</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">param-name</span><span style="color:#F0F3F6;">&gt;encoding&lt;/</span><span style="color:#72F088;">param-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">param-value</span><span style="color:#F0F3F6;">&gt;UTF-8&lt;/</span><span style="color:#72F088;">param-value</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;/</span><span style="color:#72F088;">init-param</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">init-param</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">param-name</span><span style="color:#F0F3F6;">&gt;forceResponseEncoding&lt;/</span><span style="color:#72F088;">param-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">param-value</span><span style="color:#F0F3F6;">&gt;true&lt;/</span><span style="color:#72F088;">param-value</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;/</span><span style="color:#72F088;">init-param</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">filter</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;CharacterEncodingFilter&lt;/</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;/*&lt;/</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">filter-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--来处理 PUT 和 DELETE 请求的过滤器--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;HiddenHttpMethodFilter&lt;/</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">filter-class</span><span style="color:#F0F3F6;">&gt;org.springframework.web.filter.HiddenHttpMethodFilter&lt;/</span><span style="color:#72F088;">filter-class</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">filter</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">filter-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;HiddenHttpMethodFilter&lt;/</span><span style="color:#72F088;">filter-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;/*&lt;/</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">filter-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!-- 配置SpringMVC的前端控制器，对浏览器发送的请求统一进行处理 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">servlet</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">servlet-name</span><span style="color:#F0F3F6;">&gt;dispatcherServlet&lt;/</span><span style="color:#72F088;">servlet-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">servlet-class</span><span style="color:#F0F3F6;">&gt;org.springframework.web.servlet.DispatcherServlet&lt;/</span><span style="color:#72F088;">servlet-class</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--配置 DispatcherServlet 的一个初始化参数：spring mvc 配置文件按的位置和名称--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">init-param</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">param-name</span><span style="color:#F0F3F6;">&gt;contextConfigLocation&lt;/</span><span style="color:#72F088;">param-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">param-value</span><span style="color:#F0F3F6;">&gt;classpath:springMVC.xml&lt;/</span><span style="color:#72F088;">param-value</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;/</span><span style="color:#72F088;">init-param</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--作为框架的核心组件，在启动过程中有大量的初始化操作要做</span></span>
<span class="line"><span style="color:#BDC4CC;">            而这些操作放在第一次请求时才执行会严重影响访问速度</span></span>
<span class="line"><span style="color:#BDC4CC;">            因此需要通过此标签将启动控制DispatcherServlet的初始化时间提前到服务器启动时--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">load-on-startup</span><span style="color:#F0F3F6;">&gt;1&lt;/</span><span style="color:#72F088;">load-on-startup</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">servlet</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">servlet-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">servlet-name</span><span style="color:#F0F3F6;">&gt;dispatcherServlet&lt;/</span><span style="color:#72F088;">servlet-name</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--设置springMVC的核心控制器所能处理的请求的请求路径</span></span>
<span class="line"><span style="color:#BDC4CC;">        /所匹配的请求可以是/login或.html或.js或.css方式的请求路径</span></span>
<span class="line"><span style="color:#BDC4CC;">        但是/不能匹配.jsp请求路径的请求--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;/&lt;/</span><span style="color:#72F088;">url-pattern</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">servlet-mapping</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">web-app</span><span style="color:#F0F3F6;">&gt;</span></span></code></pre></div><p>Spring MVC 的配置文件</p><div class="language-xml" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">&lt;?</span><span style="color:#72F088;">xml</span><span style="color:#91CBFF;"> version</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;1.0&quot;</span><span style="color:#91CBFF;"> encoding</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;UTF-8&quot;</span><span style="color:#F0F3F6;">?&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">beans</span><span style="color:#91CBFF;"> xmlns</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:xsi</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:context</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:mvc</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/mvc&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xsi:schemaLocation</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span style="color:#ADDCFF;">       http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span style="color:#ADDCFF;">       http://www.springframework.org/schema/context</span></span>
<span class="line"><span style="color:#ADDCFF;">       https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--开启组件扫描--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">context:component-scan</span><span style="color:#91CBFF;"> base-package</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;net.biancheng.c&quot;</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">context:component-scan</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!-- 配置 Thymeleaf 视图解析器 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> id</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;viewResolver&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">          class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;org.thymeleaf.spring5.view.ThymeleafViewResolver&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;order&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;1&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;characterEncoding&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;UTF-8&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;templateEngine&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;org.thymeleaf.spring5.SpringTemplateEngine&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;templateResolver&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                    &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">                        &lt;!-- 视图前缀 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;prefix&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;/WEB-INF/templates/&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">                        &lt;!-- 视图后缀 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;suffix&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;.html&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;templateMode&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;HTML5&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;characterEncoding&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;UTF-8&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                    &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">                &lt;/</span><span style="color:#72F088;">property</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;/</span><span style="color:#72F088;">property</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--    view-name：设置请求地址所对应的视图名称--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">mvc:view-controller</span><span style="color:#91CBFF;"> path</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;/&quot;</span><span style="color:#91CBFF;"> view-name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;login&quot;</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">mvc:view-controller</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">mvc:view-controller</span><span style="color:#91CBFF;"> path</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;/addPage&quot;</span><span style="color:#91CBFF;"> view-name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;product_add&quot;</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">mvc:view-controller</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--当SpringMVC中设置任何一个view-controller时，其他控制器中的请求映射将全部失效，此时需要在SpringMVC的核心配置文件中设置开启mvc注解驱动的标签：--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">mvc:annotation-driven</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">mvc:annotation-driven</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--</span></span>
<span class="line"><span style="color:#BDC4CC;">    处理静态资源，例如html、js、css、jpg</span></span>
<span class="line"><span style="color:#BDC4CC;">    若只设置该标签，则只能访问静态资源，其他请求则无法访问</span></span>
<span class="line"><span style="color:#BDC4CC;">    此时必须设置&lt;mvc:annotation-driven/&gt;解决问题</span></span>
<span class="line"><span style="color:#BDC4CC;">    --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">mvc:default-servlet-handler</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">beans</span><span style="color:#F0F3F6;">&gt;</span></span></code></pre></div><p>User 的类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.bean;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> User</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> userId;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> userName;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> password;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getUserId</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userId;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setUserId</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">userId</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.userId </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> userId;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userName;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setUserName</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">userName</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.userName </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> userName;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getPassword</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> password;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setPassword</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">password</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.password </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> password;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;User{&quot;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;userId=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userId </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, userName=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userName </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, password=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> password </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &#39;}&#39;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>Product 的类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.bean;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.math.BigDecimal;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> Product</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> productId;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> productName;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> BigDecimal</span><span style="color:#F0F3F6;"> price;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> Integer</span><span style="color:#F0F3F6;"> stock;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> introduction;</span></span>
<span class="line"><span style="color:#F0F3F6;">   </span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getIntroduction</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> introduction;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setIntroduction</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">introduction</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.introduction </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> introduction;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> productId;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setProductId</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">productId</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.productId </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> productId;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getProductName</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> productName;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setProductName</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">productName</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.productName </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> productName;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> BigDecimal </span><span style="color:#DBB7FF;">getPrice</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> price;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setPrice</span><span style="color:#F0F3F6;">(BigDecimal </span><span style="color:#FFB757;">price</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.price </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> price;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Integer </span><span style="color:#DBB7FF;">getStock</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> stock;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setStock</span><span style="color:#F0F3F6;">(Integer </span><span style="color:#FFB757;">stock</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.stock </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> stock;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;Product{&quot;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;productId=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> productId </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, productName=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> productName </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, price=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> price </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, stock=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> stock </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, introduction=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> introduction </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &#39;}&#39;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>Controller 类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.controller;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.bean.User;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.dao.UserDao;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Controller;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> javax.servlet.http.HttpServletRequest;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> javax.servlet.http.HttpSession;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Controller</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> LoginController</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Autowired</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> UserDao</span><span style="color:#F0F3F6;"> userDao;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 登录</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> request</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;/login&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">login</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">, HttpServletRequest </span><span style="color:#FFB757;">request</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> loginUser</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">getUserByUserName</span><span style="color:#F0F3F6;">(user.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (loginUser </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> &amp;&amp;</span><span style="color:#F0F3F6;"> loginUser.</span><span style="color:#DBB7FF;">getPassword</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">equals</span><span style="color:#F0F3F6;">(user.</span><span style="color:#DBB7FF;">getPassword</span><span style="color:#F0F3F6;">())) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            HttpSession</span><span style="color:#F0F3F6;"> session</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> request.</span><span style="color:#DBB7FF;">getSession</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#BDC4CC;">            //将用户信息放到 session 域中</span></span>
<span class="line"><span style="color:#F0F3F6;">            session.</span><span style="color:#DBB7FF;">setAttribute</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;loginUser&quot;</span><span style="color:#F0F3F6;">, loginUser);</span></span>
<span class="line"><span style="color:#BDC4CC;">            //重定向到商品列表</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#ADDCFF;"> &quot;redirect:/products&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">        request.</span><span style="color:#DBB7FF;">setAttribute</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;msg&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#ADDCFF;">&quot;账号或密码错误&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;login&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.controller;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.bean.Product;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.dao.ProductDao;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Controller;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.ui.Model;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.web.bind.annotation.PathVariable;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.web.bind.annotation.RequestMethod;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">/**</span></span>
<span class="line"><span style="color:#BDC4CC;">* </span><span style="color:#FF9492;">@author</span><span style="color:#BDC4CC;"> C语言中文网</span></span>
<span class="line"><span style="color:#BDC4CC;">*/</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Controller</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> ProductController</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Resource</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> ProductDao</span><span style="color:#F0F3F6;"> productDao;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 获取商品列表</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> model</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;/products&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getProductList</span><span style="color:#F0F3F6;">(Model </span><span style="color:#FFB757;">model</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        List</span><span style="color:#F0F3F6;"> productList</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> productDao.</span><span style="color:#DBB7FF;">getProductList</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        model.</span><span style="color:#DBB7FF;">addAttribute</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;productList&quot;</span><span style="color:#F0F3F6;">, productList);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;product_list&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 查看或回显商品信息，get：查看商品信息  update:为修改页回显的商品信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> action</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> productId</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> model</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;/product/{action}/{productId}&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getProductList</span><span style="color:#F0F3F6;">(@</span><span style="color:#FF9492;">PathVariable</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;action&quot;</span><span style="color:#F0F3F6;">) String </span><span style="color:#FFB757;">action</span><span style="color:#F0F3F6;">, @</span><span style="color:#FF9492;">PathVariable</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;productId&quot;</span><span style="color:#F0F3F6;">) String </span><span style="color:#FFB757;">productId</span><span style="color:#F0F3F6;">, Model </span><span style="color:#FFB757;">model</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        Product</span><span style="color:#F0F3F6;"> product</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> productDao.</span><span style="color:#DBB7FF;">getProductById</span><span style="color:#F0F3F6;">(productId);</span></span>
<span class="line"><span style="color:#F0F3F6;">        model.</span><span style="color:#DBB7FF;">addAttribute</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;product&quot;</span><span style="color:#F0F3F6;">, product);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //根据参数 action 判断跳转到商品详细信息页还是商品修改页</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (action.</span><span style="color:#DBB7FF;">equals</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;get&quot;</span><span style="color:#F0F3F6;">)) {</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#ADDCFF;"> &quot;product_info&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#ADDCFF;"> &quot;product_update&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 新增商品</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> product</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">value</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;/product&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">method</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> RequestMethod.POST)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">addProduct</span><span style="color:#F0F3F6;">(Product </span><span style="color:#FFB757;">product</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        productDao.</span><span style="color:#DBB7FF;">addProduct</span><span style="color:#F0F3F6;">(product);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;redirect:/products&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 修改商品信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> product</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">value</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;/product&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">method</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> RequestMethod.PUT)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">updateProduct</span><span style="color:#F0F3F6;">(Product </span><span style="color:#FFB757;">product</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        productDao.</span><span style="color:#DBB7FF;">updateProduct</span><span style="color:#F0F3F6;">(product);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;redirect:/products&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 删除商品</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> productId</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">RequestMapping</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">value</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;/product&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">method</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> RequestMethod.DELETE)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">deleteProduct</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">productId</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        productDao.</span><span style="color:#DBB7FF;">deleteProduct</span><span style="color:#F0F3F6;">(productId);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;redirect:/products&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>UserDao 的类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.dao;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.bean.User;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Repository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.</span><span style="color:#91CBFF;">*</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Repository</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> UserDao</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#F0F3F6;"> Map</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">String</span><span style="color:#FFB757;">, </span><span style="color:#FF9492;">User</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">users</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    static</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">        users </span><span style="color:#FF9492;">=</span><span style="color:#FF9492;"> new</span><span style="color:#F0F3F6;"> HashMap&lt;</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">, </span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setUserId</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;1001&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setUserName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;Java用户&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setPassword</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;987654321&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user2</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        user2.</span><span style="color:#DBB7FF;">setUserId</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;1002&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user2.</span><span style="color:#DBB7FF;">setUserName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;admin&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user2.</span><span style="color:#DBB7FF;">setPassword</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;admin&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        users.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(user.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">(), user);</span></span>
<span class="line"><span style="color:#F0F3F6;">        users.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(user2.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">(), user2);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 根据用户名获取用户信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> userName</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> User </span><span style="color:#DBB7FF;">getUserByUserName</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">userName</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> users.</span><span style="color:#DBB7FF;">get</span><span style="color:#F0F3F6;">(userName);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> user;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>ProductDao 的类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.dao;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.bean.Product;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Repository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.math.BigDecimal;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.</span><span style="color:#91CBFF;">*</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Repository</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> ProductDao</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#F0F3F6;"> Map</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">String</span><span style="color:#FFB757;">, </span><span style="color:#FF9492;">Product</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">products</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    static</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">        products </span><span style="color:#FF9492;">=</span><span style="color:#FF9492;"> new</span><span style="color:#F0F3F6;"> HashMap&lt;</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">, </span><span style="color:#FF9492;">Product</span><span style="color:#F0F3F6;">&gt;();</span></span>
<span class="line"><span style="color:#F0F3F6;">        Product</span><span style="color:#F0F3F6;"> product</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Product</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        product.</span><span style="color:#DBB7FF;">setProductId</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;1&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product.</span><span style="color:#DBB7FF;">setProductName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;茅台&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product.</span><span style="color:#DBB7FF;">setPrice</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">new</span><span style="color:#DBB7FF;"> BigDecimal</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">9999</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">        product.</span><span style="color:#DBB7FF;">setStock</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">1000</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product.</span><span style="color:#DBB7FF;">setIntroduction</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;茅台酒是大曲酱香型酒的鼻祖,它具有色清透明、酱香突出、醇香馥郁、幽雅细腻、入口柔绵、清冽甘爽、酒体醇厚丰满、回味悠长的特点、人们把茅台酒独有的香味称为</span><span style="color:#FF9492;">\\&quot;</span><span style="color:#ADDCFF;">茅香</span><span style="color:#FF9492;">\\&quot;</span><span style="color:#ADDCFF;">,是中国酱香型风格的典范。&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        Product</span><span style="color:#F0F3F6;"> product1</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Product</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        product1.</span><span style="color:#DBB7FF;">setProductId</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;2&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product1.</span><span style="color:#DBB7FF;">setProductName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;五粮液&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product1.</span><span style="color:#DBB7FF;">setPrice</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">new</span><span style="color:#DBB7FF;"> BigDecimal</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">8888</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">        product1.</span><span style="color:#DBB7FF;">setStock</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">1000</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product1.</span><span style="color:#DBB7FF;">setIntroduction</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;五粮液，四川省宜宾市特产，中国国家地理标志产品。以五粮液为代表的中国白酒，有着4000多年的酿造历史，堪称世界最古老、最具神秘特色的食品制造产业之一。&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        Product</span><span style="color:#F0F3F6;"> product2</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Product</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        product2.</span><span style="color:#DBB7FF;">setProductId</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;3&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product2.</span><span style="color:#DBB7FF;">setProductName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;信阳毛尖&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product2.</span><span style="color:#DBB7FF;">setPrice</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">new</span><span style="color:#DBB7FF;"> BigDecimal</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">7777</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">        product2.</span><span style="color:#DBB7FF;">setStock</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">1000</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product2.</span><span style="color:#DBB7FF;">setIntroduction</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;信阳毛尖又称豫毛峰，属绿茶类，是中国十大名茶之一，也是河南省著名特产之一；其主要产地在信阳市浉河区（原信阳市）、平桥区（原信阳县）和罗山县。&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        Product</span><span style="color:#F0F3F6;"> product3</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Product</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        product3.</span><span style="color:#DBB7FF;">setProductId</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;4&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product3.</span><span style="color:#DBB7FF;">setProductName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;深州大蜜桃&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product3.</span><span style="color:#DBB7FF;">setPrice</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">new</span><span style="color:#DBB7FF;"> BigDecimal</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">6666</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">        product3.</span><span style="color:#DBB7FF;">setStock</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">1000</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        product3.</span><span style="color:#DBB7FF;">setIntroduction</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;深州蜜桃，河北省深州市特产，中国国家地理标志产品。深州蜜桃个头硕大，果型秀美，色鲜艳，皮薄肉细，汁甜如蜜。2014年10月8日，国家质检总局正式批准“深州蜜桃”为原产地域保护产品（即地理标志保护产品）。&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(product.</span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">(), product);</span></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(product1.</span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">(), product1);</span></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(product2.</span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">(), product2);</span></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(product3.</span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">(), product3);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 获取商品列表</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> List </span><span style="color:#DBB7FF;">getProductList</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        List</span><span style="color:#F0F3F6;"> productList</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> ArrayList</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        Set</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">String</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">keys</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> products.</span><span style="color:#DBB7FF;">keySet</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (String</span><span style="color:#F0F3F6;"> key</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> keys) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            Product</span><span style="color:#F0F3F6;"> product</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> products.</span><span style="color:#DBB7FF;">get</span><span style="color:#F0F3F6;">(key);</span></span>
<span class="line"><span style="color:#F0F3F6;">            productList.</span><span style="color:#DBB7FF;">add</span><span style="color:#F0F3F6;">(product);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> productList;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 根据商品 id 获取商品信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> productId</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Product </span><span style="color:#DBB7FF;">getProductById</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">productId</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> products.</span><span style="color:#DBB7FF;">get</span><span style="color:#F0F3F6;">(productId);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 新增商品</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> product</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> addProduct</span><span style="color:#F0F3F6;">(Product </span><span style="color:#FFB757;">product</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(product.</span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">(), product);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 修改商品</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> product</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> updateProduct</span><span style="color:#F0F3F6;">(Product </span><span style="color:#FFB757;">product</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">put</span><span style="color:#F0F3F6;">(product.</span><span style="color:#DBB7FF;">getProductId</span><span style="color:#F0F3F6;">(), product);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 删除商品</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> productId</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> deleteProduct</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">productId</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        products.</span><span style="color:#DBB7FF;">remove</span><span style="color:#F0F3F6;">(productId);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div>`,29)]))}const r=n(o,[["render",F],["__file","SpringMVC实现Restful.html.vue"]]),y=JSON.parse('{"path":"/java/springMVC/SpringMVC%E5%AE%9E%E7%8E%B0Restful.html","title":"","lang":"zh-CN","frontmatter":{"description":"在 Spring MVC 中，我们可以通过@RequestMapping +@PathVariable注解的方式，来实现 RESTful 风格的请求。 通过@RequestMapping 注解的路径设置 当请求中携带的参数是通过请求路径传递到服务器中时，我们就可以在@RequestMapping注解的value属性中通过占位符{xxx}来表示传递的参数...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/java/springMVC/SpringMVC%E5%AE%9E%E7%8E%B0Restful.html"}],["meta",{"property":"og:description","content":"在 Spring MVC 中，我们可以通过@RequestMapping +@PathVariable注解的方式，来实现 RESTful 风格的请求。 通过@RequestMapping 注解的路径设置 当请求中携带的参数是通过请求路径传递到服务器中时，我们就可以在@RequestMapping注解的value属性中通过占位符{xxx}来表示传递的参数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-27T02:39:10.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-27T02:39:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-27T02:39:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"通过@RequestMapping 注解的路径设置","slug":"通过-requestmapping-注解的路径设置","link":"#通过-requestmapping-注解的路径设置","children":[]},{"level":2,"title":"通过 @PathVariable 注解绑定参数","slug":"通过-pathvariable-注解绑定参数","link":"#通过-pathvariable-注解绑定参数","children":[]},{"level":2,"title":"通过 HiddenHttpMethodFilter 对请求进行过滤","slug":"通过-hiddenhttpmethodfilter-对请求进行过滤","link":"#通过-hiddenhttpmethodfilter-对请求进行过滤","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1745401751000,"updatedTime":1745721550000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":7.47,"words":2240},"filePathRelative":"java/springMVC/SpringMVC实现Restful.md","localizedDate":"2025年4月23日","autoDesc":true}');export{r as comp,y as data};
