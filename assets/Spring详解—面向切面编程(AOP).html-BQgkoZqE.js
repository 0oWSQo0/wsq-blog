import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as p,o as l}from"./app-ByvFWdWZ.js";const o="/wsq-blog/assets/spring-framework-aop-4-CiJ2hCuB.png",e="/wsq-blog/assets/spring-framework-aop-2-BM316HmH.png",t="/wsq-blog/assets/spring-framework-aop-3-DoADcpzg.png",c="/wsq-blog/assets/spring-framework-aop-5-lv-jYmtd.png",r="/wsq-blog/assets/spring-framework-aop-6-DLhHqP55.png",F="/wsq-blog/assets/spring-framework-aop-7-Co1ynGZ3.png",i={};function y(d,s){return l(),a("div",null,s[0]||(s[0]=[p(`<h1 id="引入" tabindex="-1"><a class="header-anchor" href="#引入"><span>引入</span></a></h1><ol><li>Spring 框架通过定义切面，拦截切点实现了不同业务模块的解耦，这个就叫面向切面编程 - <code>Aspect Oriented Programming(AOP)</code></li><li>为什么<code>@Aspect</code>注解使用的是<code>aspectj</code>的<code>jar</code>包呢？这就引出了 Aspect4J 和 Spring AOP 的历史渊源，只有理解了 Aspect4J 和 Spring 的渊源才能理解有些注解上的兼容设计</li><li>如何支持更多拦截方式来实现解耦， 以满足更多场景需求呢？这就是@Around, @Pointcut... 等的设计</li><li>那么Spring框架又是如何实现AOP的呢？ 这就引入代理技术，分静态代理和动态代理，动态代理又包含JDK代理和CGLIB代理等</li></ol><h1 id="如何理解aop" tabindex="-1"><a class="header-anchor" href="#如何理解aop"><span>如何理解AOP</span></a></h1><p>AOP的本质也是为了解耦，它是一种设计思想；在理解时也应该简化理解。</p><h2 id="aop是什么" tabindex="-1"><a class="header-anchor" href="#aop是什么"><span>AOP是什么</span></a></h2><p>AOP 为<code>Aspect Oriented Programming</code>的缩写，意为：面向切面编程。</p><p>AOP 最早是 AOP 联盟的组织提出的，指定的一套规范，spring 将 AOP 的思想引入框架之中，通过预编译方式和运行期间动态代理实现程序的统一维护的一种技术。</p><p>先来看一个例子， 如何给如下<code>UserServiceImpl</code>中所有方法添加进入方法的日志。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> UserServiceImpl</span><span style="color:#FF9492;"> implements</span><span style="color:#91CBFF;"> IUserService</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * find user list.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span><span style="color:#BDC4CC;"> user list</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> List&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#DBB7FF;">findUserList</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;execute method： findUserList&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> Collections.</span><span style="color:#DBB7FF;">singletonList</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;pdai&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">18</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * add user</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> addUser</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;execute method： addUser&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">        // do something</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>我们将记录日志功能解耦为日志切面，它的目标是解耦。进而引出 AOP 的理念：就是将分散在各个业务逻辑代码中相同的代码通过横向切割的方式抽取到一个独立的模块中！</p><figure><img src="`+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>OOP 面向对象编程，针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的逻辑单元划分。而 AOP 则是针对业务处理过程中的切面进行提取，它所面对的是处理过程的某个步骤或阶段，以获得逻辑过程中各部分之间低耦合的隔离效果。这两种设计思想在目标上有着本质的差异。</p><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="aop术语" tabindex="-1"><a class="header-anchor" href="#aop术语"><span>AOP术语</span></a></h2><p>首先让我们从一些重要的AOP概念和术语开始。这些术语不是Spring特有的。</p><ul><li>连接点（<code>Jointpoint</code>）：表示需要在程序中插入横切关注点的扩展点，连接点可能是类初始化、方法执行、方法调用、字段调用或处理异常等等，Spring 只支持方法执行连接点，在 AOP 中表示为在哪里干；</li><li>切入点（<code>Pointcut</code>）：选择一组相关连接点的模式，即可以认为连接点的集合，Spring 支持 perl5 正则表达式和 AspectJ 切入点模式，Spring 默认使用 AspectJ 语法，在 AOP 中表示为在哪里干的集合；</li><li>通知（<code>Advice</code>）：在连接点上执行的行为，通知提供了在 AOP 中需要在切入点所选择的连接点处进行扩展现有行为的手段；包括前置通知（<code>before advice</code>）、后置通知(<code>after advice</code>)、环绕通知（<code>around advice</code>），在 Spring 中通过代理模式实现 AOP，并通过拦截器模式以环绕连接点的拦截器链织入通知；在 AOP 中表示为干什么；</li><li>方面/切面（<code>Aspect</code>）：横切关注点的模块化，比如上边提到的日志组件。可以认为是通知、引入和切入点的组合；在 Spring 中可以使用 Schema 和 @AspectJ 方式进行组织实现；在 AOP 中表示为在哪干和干什么集合；</li><li>引入（<code>inter-type declaration</code>）：也称为内部类型声明，为已有的类添加额外新的字段或方法，Spring 允许引入新的接口（必须对应一个实现）到所有被代理对象（目标对象）, 在 AOP 中表示为干什么（引入什么）；</li><li>目标对象（<code>Target Object</code>）：需要被织入横切关注点的对象，即该对象是切入点选择的对象，需要被通知的对象，从而也可称为被通知对象；由于 Spring AOP 通过代理模式实现，从而这个对象永远是被代理对象，在 AOP 中表示为对谁干；</li><li>织入（<code>Weaving</code>）：把切面连接到其它的应用程序类型或者对象上，并创建一个被通知的对象。这些可以在编译时（例如使用 AspectJ 编译器），类加载时和运行时完成。Spring 和其他纯 Java AOP 框架一样，在运行时完成织入。在 AOP 中表示为怎么实现的；</li><li>AOP 代理（<code>AOP Proxy</code>）：AOP 框架使用代理模式创建的对象，从而实现在连接点处插入通知（即应用切面），就是通过代理来对目标对象应用切面。在 Spring 中，AOP 代理可以用 JDK 动态代理或 CGLIB 代理实现，而通过拦截器模型应用切面。在 AOP 中表示为怎么实现的一种典型方式；</li></ul><p>通知类型：</p><ul><li>前置通知（<code>Before advice</code>）：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。</li><li>后置通知（<code>After returning advice</code>）：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。</li><li>异常通知（<code>After throwing advice</code>）：在方法抛出异常退出时执行的通知。</li><li>最终通知（<code>After (finally) advice</code>）：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。</li><li>环绕通知（<code>Around Advice</code>）：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。</li></ul><p>环绕通知是最常用的通知类型。和 AspectJ 一样，Spring 提供所有类型的通知，我们推荐你使用尽可能简单的通知类型来实现需要的功能。例如，如果你只是需要一个方法的返回值来更新缓存，最好使用后置通知而不是环绕通知，尽管环绕通知也能完成同样的事情。用最合适的通知类型可以使得编程模型变得简单，并且能够避免很多潜在的错误。比如，你不需要在<code>JoinPoint</code>上调用用于环绕通知的<code>proceed()</code>方法，就不会有调用的问题。</p><p>我们把这些术语串联到一起，方便理解</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="spring-aop和aspectj是什么关系" tabindex="-1"><a class="header-anchor" href="#spring-aop和aspectj是什么关系"><span>Spring AOP和AspectJ是什么关系</span></a></h2><h3 id="首先aspectj是什么" tabindex="-1"><a class="header-anchor" href="#首先aspectj是什么"><span>首先AspectJ是什么？</span></a></h3><p>AspectJ 是一个 java 实现的 AOP 框架，它能够对 java 代码进行 AOP 编译（一般在编译期进行），让 java 代码具有 AspectJ 的 AOP 功能（当然需要特殊的编译器）。</p><p>可以这样说 AspectJ 是目前实现AOP框架中最成熟，功能最丰富的语言，更幸运的是，AspectJ 与 java 程序完全兼容，几乎是无缝关联，因此对于有 java 编程基础的工程师，上手和使用都非常容易。</p><h3 id="其次-为什么需要理清楚spring-aop和aspectj的关系" tabindex="-1"><a class="header-anchor" href="#其次-为什么需要理清楚spring-aop和aspectj的关系"><span>其次，为什么需要理清楚Spring AOP和AspectJ的关系？</span></a></h3><p>我们看下<code>@Aspect</code>以及增强的几个注解，为什么不是 Spring 包，而是来源于 aspectJ 呢？</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="spring-aop和aspectj是什么关系-1" tabindex="-1"><a class="header-anchor" href="#spring-aop和aspectj是什么关系-1"><span>Spring AOP和AspectJ是什么关系？</span></a></h3><ol><li>AspectJ 是更强的 AOP 框架，是实际意义的 AOP 标准；</li><li>Spring 为何不写类似 AspectJ 的框架？Spring AOP 使用纯 Java 实现，它不需要专门的编译过程，它一个重要的原则就是无侵入性（<code>non-invasiveness</code>）；Spring 小组完全有能力写类似的框架，只是 Spring AOP 从来没有打算通过提供一种全面的 AOP 解决方案来与 AspectJ 竞争。Spring 的开发小组相信无论是基于代理（<code>proxy-based</code>）的框架如 Spring AOP 或者是成熟的框架如 AspectJ 都是很有价值的，他们之间应该是互补而不是竞争的关系。</li><li>Spring小组喜欢<code>@AspectJ</code>注解风格更胜于 Spring XML 配置；所以在 Spring 2.0 使用了和 AspectJ 5 一样的注解，并使用 AspectJ 来做切入点解析和匹配。但是，AOP 在运行时仍旧是纯的 Spring AOP，并不依赖于 AspectJ 的编译器或者织入器（<code>weaver</code>）。</li><li>Spring2.5 对 AspectJ 的支持：在一些环境下，增加了对 AspectJ 的装载时编织支持，同时提供了一个新的<code>bean</code>切入点。</li></ol><h3 id="更多关于aspectj" tabindex="-1"><a class="header-anchor" href="#更多关于aspectj"><span>更多关于AspectJ？</span></a></h3><p>了解 AspectJ 应用到 java 代码的过程（这个过程称为织入），对于织入这个概念，可以简单理解为<code>aspect</code>(切面)应用到目标函数(类)的过程。</p><p>对于这个过程，一般分为动态织入和静态织入：</p><ul><li>动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的，如 Java JDK 的动态代理(<code>Proxy</code>，底层通过反射实现)或者 CGLIB 的动态代理(底层通过继承实现)，Spring AOP 采用的就是基于运行时增强的代理技术</li><li>ApectJ 采用的就是静态织入的方式。ApectJ 主要采用的是编译期织入，在这个期间使用 AspectJ 的 acj 编译器(类似javac)把<code>aspect</code>类编译成<code>class</code>字节码后，在 java 目标类编译时织入，即先编译<code>aspect</code>类再编译目标类。</li></ul><figure><img src="'+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="aop的配置方式" tabindex="-1"><a class="header-anchor" href="#aop的配置方式"><span>AOP的配置方式</span></a></h1><p>Spring AOP 支持对 XML 模式和基于<code>@AspectJ</code>注解的两种配置方式。</p><h2 id="xml-schema配置方式" tabindex="-1"><a class="header-anchor" href="#xml-schema配置方式"><span>XML Schema配置方式</span></a></h2><p>Spring 提供了使用<code>aop</code>命名空间来定义一个切面，我们来看个例子：</p><p>定义目标类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> tech.pdai.springframework.service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> AopDemoServiceImpl</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doMethod1</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;AopDemoServiceImpl.doMethod1()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">doMethod2</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;AopDemoServiceImpl.doMethod2()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;hello world&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">doMethod3</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Exception {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;AopDemoServiceImpl.doMethod3()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Exception</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;some exception&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>定义切面类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> tech.pdai.springframework.aspect;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.ProceedingJoinPoint;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> LogAspect</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 环绕通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> pjp</span><span style="color:#BDC4CC;"> pjp</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span><span style="color:#BDC4CC;"> obj</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@throws</span><span style="color:#FFB757;"> Throwable</span><span style="color:#BDC4CC;"> exception</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">doAround</span><span style="color:#F0F3F6;">(ProceedingJoinPoint </span><span style="color:#FFB757;">pjp</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Throwable {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----------------------&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;环绕通知: 进入方法&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        Object</span><span style="color:#F0F3F6;"> o</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> pjp.</span><span style="color:#DBB7FF;">proceed</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;环绕通知: 退出方法&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> o;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 前置通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doBefore</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;前置通知&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 后置通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> result</span><span style="color:#BDC4CC;"> return val</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doAfterReturning</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">result</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;后置通知, 返回值: &quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> result);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 异常通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> e</span><span style="color:#BDC4CC;"> exception</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doAfterThrowing</span><span style="color:#F0F3F6;">(Exception </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;异常通知, 异常: &quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> e.</span><span style="color:#DBB7FF;">getMessage</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 最终通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doAfter</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;最终通知&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>XML配置AOP</p><div class="language-xml" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">&lt;?</span><span style="color:#72F088;">xml</span><span style="color:#91CBFF;"> version</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;1.0&quot;</span><span style="color:#91CBFF;"> encoding</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;UTF-8&quot;</span><span style="color:#F0F3F6;">?&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">beans</span><span style="color:#91CBFF;"> xmlns</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:xsi</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:aop</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/aop&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:context</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xsi:schemaLocation</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span style="color:#ADDCFF;"> http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span style="color:#ADDCFF;"> http://www.springframework.org/schema/aop</span></span>
<span class="line"><span style="color:#ADDCFF;"> http://www.springframework.org/schema/aop/spring-aop.xsd</span></span>
<span class="line"><span style="color:#ADDCFF;"> http://www.springframework.org/schema/context</span></span>
<span class="line"><span style="color:#ADDCFF;"> http://www.springframework.org/schema/context/spring-context.xsd</span></span>
<span class="line"><span style="color:#ADDCFF;">&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">context:component-scan</span><span style="color:#91CBFF;"> base-package</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;tech.pdai.springframework&quot;</span><span style="color:#F0F3F6;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">aop:aspectj-autoproxy</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!-- 目标类 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> id</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;demoService&quot;</span><span style="color:#91CBFF;"> class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;tech.pdai.springframework.service.AopDemoServiceImpl&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!-- configure properties of bean here as normal --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!-- 切面 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> id</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;logAspect&quot;</span><span style="color:#91CBFF;"> class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;tech.pdai.springframework.aspect.LogAspect&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!-- configure properties of aspect here as normal --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">aop:config</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!-- 配置切面 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">aop:aspect</span><span style="color:#91CBFF;"> ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;logAspect&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">            &lt;!-- 配置切入点 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">aop:pointcut</span><span style="color:#91CBFF;"> id</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;pointCutMethod&quot;</span><span style="color:#91CBFF;"> expression</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;execution(* tech.pdai.springframework.service.*.*(..))&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">            &lt;!-- 环绕通知 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">aop:around</span><span style="color:#91CBFF;"> method</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;doAround&quot;</span><span style="color:#91CBFF;"> pointcut-ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;pointCutMethod&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">            &lt;!-- 前置通知 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">aop:before</span><span style="color:#91CBFF;"> method</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;doBefore&quot;</span><span style="color:#91CBFF;"> pointcut-ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;pointCutMethod&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">            &lt;!-- 后置通知；returning属性：用于设置后置通知的第二个参数的名称，类型是Object --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">aop:after-returning</span><span style="color:#91CBFF;"> method</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;doAfterReturning&quot;</span><span style="color:#91CBFF;"> pointcut-ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;pointCutMethod&quot;</span><span style="color:#91CBFF;"> returning</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;result&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">            &lt;!-- 异常通知：如果没有异常，将不会执行增强；throwing属性：用于设置通知第二个参数的的名称、类型--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">aop:after-throwing</span><span style="color:#91CBFF;"> method</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;doAfterThrowing&quot;</span><span style="color:#91CBFF;"> pointcut-ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;pointCutMethod&quot;</span><span style="color:#91CBFF;"> throwing</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;e&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">            &lt;!-- 最终通知 --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">            &lt;</span><span style="color:#72F088;">aop:after</span><span style="color:#91CBFF;"> method</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;doAfter&quot;</span><span style="color:#91CBFF;"> pointcut-ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;pointCutMethod&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;/</span><span style="color:#72F088;">aop:aspect</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">aop:config</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!-- more bean definitions for data access objects go here --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">beans</span><span style="color:#F0F3F6;">&gt;</span></span></code></pre></div><p>测试类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">/**</span></span>
<span class="line"><span style="color:#BDC4CC;">  * main interfaces.</span></span>
<span class="line"><span style="color:#BDC4CC;">  *</span></span>
<span class="line"><span style="color:#BDC4CC;">  * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> args</span><span style="color:#BDC4CC;"> args</span></span>
<span class="line"><span style="color:#BDC4CC;">  */</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] args) {</span></span>
<span class="line"><span style="color:#BDC4CC;">    // create and configure beans</span></span>
<span class="line"><span style="color:#F0F3F6;">    ApplicationContext</span><span style="color:#F0F3F6;"> context</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> ClassPathXmlApplicationContext</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;aspects.xml&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    // retrieve configured instance</span></span>
<span class="line"><span style="color:#F0F3F6;">    AopDemoServiceImpl</span><span style="color:#F0F3F6;"> service</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> context.</span><span style="color:#DBB7FF;">getBean</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;demoService&quot;</span><span style="color:#F0F3F6;">, AopDemoServiceImpl.class);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    // use configured instance</span></span>
<span class="line"><span style="color:#F0F3F6;">    service.</span><span style="color:#DBB7FF;">doMethod1</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    service.</span><span style="color:#DBB7FF;">doMethod2</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">    try</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">        service.</span><span style="color:#DBB7FF;">doMethod3</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (Exception </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">        // e.printStackTrace();</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>输出结果</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>AopDemoServiceImpl.doMethod1()</span></span>
<span class="line"><span>环绕通知: 退出方法</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>AopDemoServiceImpl.doMethod2()</span></span>
<span class="line"><span>环绕通知: 退出方法</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>后置通知, 返回值: hello world</span></span>
<span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>AopDemoServiceImpl.doMethod3()</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>异常通知, 异常: some exception</span></span></code></pre></div><h2 id="aspectj注解方式" tabindex="-1"><a class="header-anchor" href="#aspectj注解方式"><span>AspectJ注解方式</span></a></h2><p>基于 XML 的声明式 AspectJ 存在一些不足，需要在 Spring 配置文件配置大量的代码信息，为了解决这个问题，Spring 使用了<code>@AspectJ</code>框架为 AOP 的实现提供了一套注解。</p><table><thead><tr><th style="text-align:center;">注解名称</th><th style="text-align:left;">解释</th></tr></thead><tbody><tr><td style="text-align:center;">@Aspect</td><td style="text-align:left;">用来定义一个切面。</td></tr><tr><td style="text-align:center;">@pointcut</td><td style="text-align:left;">用于定义切入点表达式。在使用时还需要定义一个包含名字和任意参数的方法签名来表示切入点名称，这个方法签名就是一个返回值为void，且方法体为空的普通方法。</td></tr><tr><td style="text-align:center;">@Before</td><td style="text-align:left;">用于定义前置通知，相当于BeforeAdvice。在使用时，通常需要指定一个value属性值，该属性值用于指定一个切入点表达式(可以是已有的切入点，也可以直接定义切入点表达式)。</td></tr><tr><td style="text-align:center;">@AfterReturning</td><td style="text-align:left;">用于定义后置通知，相当于AfterReturningAdvice。在使用时可以指定pointcut/value和returning属性，其中pointcut/value这两个属性的作用一样，都用于指定切入点表达式。</td></tr><tr><td style="text-align:center;">@Around</td><td style="text-align:left;">用于定义环绕通知，相当于MethodInterceptor。在使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。</td></tr><tr><td style="text-align:center;">@After-Throwing</td><td style="text-align:left;">用于定义异常通知来处理程序中未处理的异常，相当于ThrowAdvice。在使用时可指定pointcut / value和throwing属性。其中pointcut/value用于指定切入点表达式，而throwing属性值用于指定-一个形参名来表示Advice方法中可定义与此同名的形参，该形参可用于访问目标方法抛出的异常。</td></tr><tr><td style="text-align:center;">@After</td><td style="text-align:left;">用于定义最终final 通知，不管是否异常，该通知都会执行。使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。</td></tr><tr><td style="text-align:center;">@DeclareParents</td><td style="text-align:left;">用于定义引介通知，相当于IntroductionInterceptor (不要求掌握)。</td></tr></tbody></table><p>Spring AOP 的实现方式是动态织入，动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的；如 Java JDK 的动态代理(<code>Proxy</code>，底层通过反射实现)或者 CGLIB 的动态代理(底层通过继承实现)，Spring AOP 采用的就是基于运行时增强的代理技术。所以我们看下如下的两个例子：</p><ul><li>基于JDK代理例子</li><li>基于Cglib代理例子</li></ul><h3 id="接口使用jdk代理" tabindex="-1"><a class="header-anchor" href="#接口使用jdk代理"><span>接口使用JDK代理</span></a></h3><p>定义接口</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">/**</span></span>
<span class="line"><span style="color:#BDC4CC;"> * Jdk Proxy Service.</span></span>
<span class="line"><span style="color:#BDC4CC;"> *</span></span>
<span class="line"><span style="color:#BDC4CC;"> */</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> interface</span><span style="color:#FFB757;"> IJdkProxyService</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    void</span><span style="color:#DBB7FF;"> doMethod1</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    String </span><span style="color:#DBB7FF;">doMethod2</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    String </span><span style="color:#DBB7FF;">doMethod3</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Exception;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>实现类</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Service</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> JdkProxyDemoServiceImpl</span><span style="color:#FF9492;"> implements</span><span style="color:#91CBFF;"> IJdkProxyService</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doMethod1</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;JdkProxyServiceImpl.doMethod1()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">doMethod2</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;JdkProxyServiceImpl.doMethod2()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;hello world&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">doMethod3</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Exception {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;JdkProxyServiceImpl.doMethod3()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Exception</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;some exception&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>定义切面</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> tech.pdai.springframework.aspect;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.ProceedingJoinPoint;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.After;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.AfterReturning;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.AfterThrowing;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.Around;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.Aspect;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.Before;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.aspectj.lang.annotation.Pointcut;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.context.annotation.EnableAspectJAutoProxy;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">EnableAspectJAutoProxy</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Component</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Aspect</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> LogAspect</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * define point cut.</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Pointcut</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;execution(* tech.pdai.springframework.service.*.*(..))&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> pointCutMethod</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 环绕通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> pjp</span><span style="color:#BDC4CC;"> pjp</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span><span style="color:#BDC4CC;"> obj</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@throws</span><span style="color:#FFB757;"> Throwable</span><span style="color:#BDC4CC;"> exception</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Around</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;pointCutMethod()&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">doAround</span><span style="color:#F0F3F6;">(ProceedingJoinPoint </span><span style="color:#FFB757;">pjp</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Throwable {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----------------------&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;环绕通知: 进入方法&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        Object</span><span style="color:#F0F3F6;"> o</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> pjp.</span><span style="color:#DBB7FF;">proceed</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;环绕通知: 退出方法&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> o;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 前置通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Before</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;pointCutMethod()&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doBefore</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;前置通知&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 后置通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> result</span><span style="color:#BDC4CC;"> return val</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">AfterReturning</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">pointcut</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;pointCutMethod()&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">returning</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;result&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doAfterReturning</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">result</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;后置通知, 返回值: &quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> result);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 异常通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> e</span><span style="color:#BDC4CC;"> exception</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">AfterThrowing</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">pointcut</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;pointCutMethod()&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">throwing</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;e&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doAfterThrowing</span><span style="color:#F0F3F6;">(Exception </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;异常通知, 异常: &quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> e.</span><span style="color:#DBB7FF;">getMessage</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 最终通知.</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">After</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;pointCutMethod()&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doAfter</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;最终通知&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>输出</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>JdkProxyServiceImpl.doMethod1()</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>环绕通知: 退出方法</span></span>
<span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>JdkProxyServiceImpl.doMethod2()</span></span>
<span class="line"><span>后置通知, 返回值: hello world</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>环绕通知: 退出方法</span></span>
<span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>JdkProxyServiceImpl.doMethod3()</span></span>
<span class="line"><span>异常通知, 异常: some exception</span></span>
<span class="line"><span>最终通知</span></span></code></pre></div><h3 id="非接口使用cglib代理类定义" tabindex="-1"><a class="header-anchor" href="#非接口使用cglib代理类定义"><span>非接口使用Cglib代理类定义</span></a></h3><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">/**</span></span>
<span class="line"><span style="color:#BDC4CC;"> * Cglib proxy.</span></span>
<span class="line"><span style="color:#BDC4CC;"> *</span></span>
<span class="line"><span style="color:#BDC4CC;"> */</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Service</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> CglibProxyDemoServiceImpl</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> doMethod1</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;CglibProxyDemoServiceImpl.doMethod1()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">doMethod2</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;CglibProxyDemoServiceImpl.doMethod2()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;hello world&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">doMethod3</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Exception {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;CglibProxyDemoServiceImpl.doMethod3()&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Exception</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;some exception&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>切面定义和上面相同。</p><p>输出</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>CglibProxyDemoServiceImpl.doMethod1()</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>环绕通知: 退出方法</span></span>
<span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>CglibProxyDemoServiceImpl.doMethod2()</span></span>
<span class="line"><span>后置通知, 返回值: hello world</span></span>
<span class="line"><span>最终通知</span></span>
<span class="line"><span>环绕通知: 退出方法</span></span>
<span class="line"><span>-----------------------</span></span>
<span class="line"><span>环绕通知: 进入方法</span></span>
<span class="line"><span>前置通知</span></span>
<span class="line"><span>CglibProxyDemoServiceImpl.doMethod3()</span></span>
<span class="line"><span>异常通知, 异常: some exception</span></span>
<span class="line"><span>最终通知</span></span></code></pre></div><h1 id="aop使用问题小结" tabindex="-1"><a class="header-anchor" href="#aop使用问题小结"><span>AOP使用问题小结</span></a></h1><p>这里总结下实际开发中会遇到的一些问题：</p><h2 id="切入点-pointcut-的申明规则" tabindex="-1"><a class="header-anchor" href="#切入点-pointcut-的申明规则"><span>切入点（pointcut）的申明规则?</span></a></h2><p>Spring AOP 用户可能会经常使用<code>execution</code>切入点指示符。执行表达式的格式如下：</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>execution（modifiers-pattern? ret-type-pattern declaring-type-pattern? name-pattern（param-pattern） throws-pattern?）</span></span></code></pre></div><ul><li><code>ret-type-pattern</code>返回类型模式, <code>name-pattern</code>名字模式和<code>param-patter</code>n参数模式是必选的，其它部分都是可选的。返回类型模式决定了方法的返回类型必须依次匹配一个连接点。你会使用的最频繁的返回类型模式是<code>*</code>，它代表了匹配任意的返回类型。</li><li><code>declaring-type-pattern</code>, 一个全限定的类型名将只会匹配返回给定类型的方法。</li><li><code>name-pattern</code>名字模式匹配的是方法名。你可以使用<code>*</code>通配符作为所有或者部分命名模式。</li><li><code>param-pattern</code>参数模式稍微有点复杂：<code>()</code>匹配了一个不接受任何参数的方法，而<code>(..)</code>匹配了一个接受任意数量参数的方法（零或者更多）。模式<code>()</code>匹配了一个接受一个任何类型的参数的方法。模式<code>(,String)</code>匹配了一个接受两个参数的方法，第一个可以是任意类型，第二个则必须是<code>String</code>类型。</li></ul><p>对应到我们上面的例子：</p><figure><img src="`+F+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下面给出一些通用切入点表达式的例子。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// 任意公共方法的执行：</span></span>
<span class="line"><span style="color:#F0F3F6;">execution（</span><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> *</span><span style="color:#FF9492;"> *</span><span style="color:#F0F3F6;">（..））</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个名字以“set”开始的方法的执行：</span></span>
<span class="line"><span style="color:#F0F3F6;">execution（</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;"> set</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">（..））</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// AccountService接口定义的任意方法的执行：</span></span>
<span class="line"><span style="color:#F0F3F6;">execution（</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;"> com.xyz.service.AccountService.</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">（..））</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 在service包中定义的任意方法的执行：</span></span>
<span class="line"><span style="color:#F0F3F6;">execution（</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;"> com.xyz.service.</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">.</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">（..））</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 在service包或其子包中定义的任意方法的执行：</span></span>
<span class="line"><span style="color:#F0F3F6;">execution（</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;"> com.xyz.service..</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">.</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">（..））</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 在service包中的任意连接点（在Spring AOP中只是方法执行）：</span></span>
<span class="line"><span style="color:#F0F3F6;">within（com.xyz.service.</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 在service包或其子包中的任意连接点（在Spring AOP中只是方法执行）：</span></span>
<span class="line"><span style="color:#F0F3F6;">within（com.xyz.service..</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 实现了AccountService接口的代理对象的任意连接点 （在Spring AOP中只是方法执行）：</span></span>
<span class="line"><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">（com.xyz.service.AccountService）</span><span style="color:#BDC4CC;">// &#39;this&#39;在绑定表单中更加常用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 实现AccountService接口的目标对象的任意连接点 （在Spring AOP中只是方法执行）：</span></span>
<span class="line"><span style="color:#F0F3F6;">target（com.xyz.service.AccountService） </span><span style="color:#BDC4CC;">// &#39;target&#39;在绑定表单中更加常用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个只接受一个参数，并且运行时所传入的参数是Serializable 接口的连接点（在Spring AOP中只是方法执行）</span></span>
<span class="line"><span style="color:#F0F3F6;">args（java.io.Serializable） </span><span style="color:#BDC4CC;">// &#39;args&#39;在绑定表单中更加常用; 请注意在例子中给出的切入点不同于 execution(* *(java.io.Serializable))： args版本只有在动态运行时候传入参数是Serializable时才匹配，而execution版本在方法签名中声明只有一个 Serializable类型的参数时候匹配。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 目标对象中有一个 @Transactional 注解的任意连接点 （在Spring AOP中只是方法执行）</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">target</span><span style="color:#F0F3F6;">（org.springframework.transaction.annotation.Transactional）</span><span style="color:#BDC4CC;">// &#39;@target&#39;在绑定表单中更加常用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个目标对象声明的类型有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）：</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">within</span><span style="color:#F0F3F6;">（org.springframework.transaction.annotation.Transactional） </span><span style="color:#BDC4CC;">// &#39;@within&#39;在绑定表单中更加常用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个执行的方法有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">annotation</span><span style="color:#F0F3F6;">（org.springframework.transaction.annotation.Transactional） </span><span style="color:#BDC4CC;">// &#39;@annotation&#39;在绑定表单中更加常用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个只接受一个参数，并且运行时所传入的参数类型具有@Classified 注解的连接点（在Spring AOP中只是方法执行）</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">args</span><span style="color:#F0F3F6;">（com.xyz.security.Classified） </span><span style="color:#BDC4CC;">// &#39;@args&#39;在绑定表单中更加常用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个在名为&#39;tradeService&#39;的Spring bean之上的连接点 （在Spring AOP中只是方法执行）</span></span>
<span class="line"><span style="color:#F0F3F6;">bean（tradeService）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 任何一个在名字匹配通配符表达式&#39;*Service&#39;的Spring bean之上的连接点 （在Spring AOP中只是方法执行）</span></span>
<span class="line"><span style="color:#F0F3F6;">bean（</span><span style="color:#FF9492;">*</span><span style="color:#F0F3F6;">Service）</span></span></code></pre></div><p>此外 Spring 支持如下三个逻辑运算符来组合切入点表达式：</p><ul><li><code>&amp;&amp;</code>：要求连接点同时匹配两个切入点表达式</li><li><code>||</code>：要求连接点匹配任意个切入点表达式</li><li><code>!:</code>：要求连接点不匹配指定的切入点表达式</li></ul><h2 id="多种增强通知的顺序" tabindex="-1"><a class="header-anchor" href="#多种增强通知的顺序"><span>多种增强通知的顺序？</span></a></h2><p>如果有多个通知想要在同一连接点运行会发生什么？Spring AOP 遵循跟 AspectJ 一样的优先规则来确定通知执行的顺序。在“进入”连接点的情况下，最高优先级的通知会先执行（所以给定的两个前置通知中，优先级高的那个会先执行）。在“退出”连接点的情况下，最高优先级的通知会最后执行。（所以给定的两个后置通知中，优先级高的那个会第二个执行）。</p><p>当定义在不同的切面里的两个通知都需要在一个相同的连接点中运行，那么除非你指定，否则执行的顺序是未知的。你可以通过指定优先级来控制执行顺序。在标准的 Spring 方法中可以在切面类中实现<code>org.springframework.core.Ordered</code>接口或者用<code>Order</code>注解做到这一点。在两个切面中，<code>Ordered.getValue()</code>方法返回值（或者注解值）较低的那个有更高的优先级。</p><p>当定义在相同的切面里的两个通知都需要在一个相同的连接点中运行，执行的顺序是未知的（因为这里没有方法通过反射<code>javac</code>编译的类来获取声明顺序）。考虑在每个切面类中按连接点压缩这些通知方法到一个通知方法，或者重构通知的片段到各自的切面类中 - 它能在切面级别进行排序。</p><h2 id="spring-aop-和-aspectj-之间的关键区别" tabindex="-1"><a class="header-anchor" href="#spring-aop-和-aspectj-之间的关键区别"><span>Spring AOP 和 AspectJ 之间的关键区别？</span></a></h2><p>AspectJ 可以做 Spring AOP 干不了的事情，它是 AOP 编程的完全解决方案，Spring AOP 则致力于解决企业级开发中最普遍的 AOP（方法织入）。</p><p>下表总结了 Spring AOP 和 AspectJ 之间的关键区别:</p><table><thead><tr><th style="text-align:left;">Spring AOP</th><th style="text-align:left;">AspectJ</th></tr></thead><tbody><tr><td style="text-align:left;">在纯 Java 中实现</td><td style="text-align:left;">使用Java 编程语言的扩展实现</td></tr><tr><td style="text-align:left;">不需要单独的编译过程</td><td style="text-align:left;">除非设置 LTW，否则需要 AspectJ 编译器 (ajc)</td></tr><tr><td style="text-align:left;">只能使用运行时织入</td><td style="text-align:left;">运行时织入不可用。支持编译时、编译后和加载时织入</td></tr><tr><td style="text-align:left;">功能不强-仅支持方法级编织</td><td style="text-align:left;">更强大 - 可以编织字段、方法、构造函数、静态初始值设定项、最终类/方法等......。</td></tr><tr><td style="text-align:left;">只能在由 Spring 容器管理的 bean 上实现</td><td style="text-align:left;">可以在所有域对象上实现</td></tr><tr><td style="text-align:left;">仅支持方法执行切入点</td><td style="text-align:left;">支持所有切入点</td></tr><tr><td style="text-align:left;">代理是由目标对象创建的, 并且切面应用在这些代理上</td><td style="text-align:left;">在执行应用程序之前 (在运行时) 前, 各方面直接在代码中进行织入</td></tr><tr><td style="text-align:left;">比 AspectJ 慢多了</td><td style="text-align:left;">更好的性能</td></tr><tr><td style="text-align:left;">易于学习和应用</td><td style="text-align:left;">相对于 Spring AOP 来说更复杂</td></tr></tbody></table><h2 id="spring-aop还是完全用aspectj" tabindex="-1"><a class="header-anchor" href="#spring-aop还是完全用aspectj"><span>Spring AOP还是完全用AspectJ？</span></a></h2><p>以下 Spring 官方的回答：（总结来说就是 Spring AOP 更易用，AspectJ 更强大）。</p><ul><li>Spring AOP 比完全使用 AspectJ 更加简单， 因为它不需要引入 AspectJ 的编译器／织入器到你开发和构建过程中。 如果你仅仅需要在 Spring bean 上通知执行操作，那么 Spring AOP 是合适的选择。</li><li>如果你需要通知<code>domain</code>对象或其它没有在 Spring 容器中管理的任意对象，那么你需要使用 AspectJ。</li><li>如果你想通知除了简单的方法执行之外的连接点（如：调用连接点、字段<code>get</code>或<code>set</code>的连接点等等），也需要使用 AspectJ。</li></ul><p>当使用 AspectJ 时，你可以选择使用 AspectJ 语言（也称为“代码风格”）或<code>@AspectJ</code>注解风格。 如果切面在你的设计中扮演一个很大的角色，并且你能在 Eclipse 等 IDE 中使用<code>AspectJ Development Tools (AJDT)</code>， 那么首选 AspectJ 语言 :- 因为该语言专门被设计用来编写切面，所以会更清晰、更简单。如果你没有使用 Eclipse 等 IDE，或者在你的应用中只有很少的切面并没有作为一个主要的角色，你或许应该考虑使用<code>@AspectJ</code>风格 并在你的 IDE 中附加一个普通的 Java 编辑器，并且在你的构建脚本中增加切面织入（链接）的段落。</p>`,92)]))}const u=n(i,[["render",y],["__file","Spring详解—面向切面编程(AOP).html.vue"]]),h=JSON.parse('{"path":"/java/Spring/Spring%E8%AF%A6%E8%A7%A3%E2%80%94%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%BC%96%E7%A8%8B(AOP).html","title":"引入","lang":"zh-CN","frontmatter":{"description":"引入 Spring 框架通过定义切面，拦截切点实现了不同业务模块的解耦，这个就叫面向切面编程 - Aspect Oriented Programming(AOP) 为什么@Aspect注解使用的是aspectj的jar包呢？这就引出了 Aspect4J 和 Spring AOP 的历史渊源，只有理解了 Aspect4J 和 Spring 的渊源才能理解...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/java/Spring/Spring%E8%AF%A6%E8%A7%A3%E2%80%94%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%BC%96%E7%A8%8B(AOP).html"}],["meta",{"property":"og:title","content":"引入"}],["meta",{"property":"og:description","content":"引入 Spring 框架通过定义切面，拦截切点实现了不同业务模块的解耦，这个就叫面向切面编程 - Aspect Oriented Programming(AOP) 为什么@Aspect注解使用的是aspectj的jar包呢？这就引出了 Aspect4J 和 Spring AOP 的历史渊源，只有理解了 Aspect4J 和 Spring 的渊源才能理解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-23T09:49:11.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-23T09:49:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"引入\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-23T09:49:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"AOP是什么","slug":"aop是什么","link":"#aop是什么","children":[]},{"level":2,"title":"AOP术语","slug":"aop术语","link":"#aop术语","children":[]},{"level":2,"title":"Spring AOP和AspectJ是什么关系","slug":"spring-aop和aspectj是什么关系","link":"#spring-aop和aspectj是什么关系","children":[{"level":3,"title":"首先AspectJ是什么？","slug":"首先aspectj是什么","link":"#首先aspectj是什么","children":[]},{"level":3,"title":"其次，为什么需要理清楚Spring AOP和AspectJ的关系？","slug":"其次-为什么需要理清楚spring-aop和aspectj的关系","link":"#其次-为什么需要理清楚spring-aop和aspectj的关系","children":[]},{"level":3,"title":"Spring AOP和AspectJ是什么关系？","slug":"spring-aop和aspectj是什么关系-1","link":"#spring-aop和aspectj是什么关系-1","children":[]},{"level":3,"title":"更多关于AspectJ？","slug":"更多关于aspectj","link":"#更多关于aspectj","children":[]}]},{"level":2,"title":"XML Schema配置方式","slug":"xml-schema配置方式","link":"#xml-schema配置方式","children":[]},{"level":2,"title":"AspectJ注解方式","slug":"aspectj注解方式","link":"#aspectj注解方式","children":[{"level":3,"title":"接口使用JDK代理","slug":"接口使用jdk代理","link":"#接口使用jdk代理","children":[]},{"level":3,"title":"非接口使用Cglib代理类定义","slug":"非接口使用cglib代理类定义","link":"#非接口使用cglib代理类定义","children":[]}]},{"level":2,"title":"切入点（pointcut）的申明规则?","slug":"切入点-pointcut-的申明规则","link":"#切入点-pointcut-的申明规则","children":[]},{"level":2,"title":"多种增强通知的顺序？","slug":"多种增强通知的顺序","link":"#多种增强通知的顺序","children":[]},{"level":2,"title":"Spring AOP 和 AspectJ 之间的关键区别？","slug":"spring-aop-和-aspectj-之间的关键区别","link":"#spring-aop-和-aspectj-之间的关键区别","children":[]},{"level":2,"title":"Spring AOP还是完全用AspectJ？","slug":"spring-aop还是完全用aspectj","link":"#spring-aop还是完全用aspectj","children":[]}],"git":{"createdTime":1730426129000,"updatedTime":1745401751000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":20.99,"words":6298},"filePathRelative":"java/Spring/Spring详解—面向切面编程(AOP).md","localizedDate":"2024年11月1日","autoDesc":true}');export{u as comp,h as data};
