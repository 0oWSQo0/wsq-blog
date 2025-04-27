import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,d as n,e as o,o as t,r as e}from"./app-Coac0FJ0.js";const F="/wsq-blog/assets/java-basic-reflection-1-DgDnO1wo.png",c={};function r(y,s){const a=e("Mermaid");return t(),p("div",null,[s[0]||(s[0]=n(`<p>JAVA 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为 java 语言的反射机制。</p><h2 id="反射基础" tabindex="-1"><a class="header-anchor" href="#反射基础"><span>反射基础</span></a></h2><p><code>RTTI（Run-Time Type Identification）</code>运行时类型识别。其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的” RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。</p><p>反射就是把 Java 类中的各种成分映射成一个个的 Java 对象。例如：一个类有：成员变量、方法、构造方法、包等等信息，利用反射技术可以对一个类进行解剖，把个个组成部分映射成一个个对象。</p><p>这里我们首先需要理解<code>Class</code>类，以及类的加载机制；然后基于此我们如何通过反射获取<code>Class</code>类以及类中的成员变量、方法、构造方法等。</p><h3 id="class类" tabindex="-1"><a class="header-anchor" href="#class类"><span>Class类</span></a></h3><p><code>Class</code>类也是一个实实在在的类，存在于 JDK 的<code>java.lang</code>包中。<code>Class</code>类的实例表示 java 应用运行时的类或接口（每个 java 类运行时都在 JVM 里表现为一个<code>class</code>对象，可通过类名<code>.class</code>、类型<code>.getClass()</code>、<code>Class.forName(&quot;类名&quot;)</code>等方法获取<code>class</code>对象）。</p><p>数组同样也被映射为<code>class</code>对象的一个类，所有具有相同元素类型和维数的数组都共享该<code>Class</code>对象。基本类型<code>boolean，byte，char，short，int，long，float，double</code>和关键字<code>void</code>同样表现为<code>class</code>对象。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> final</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> Class</span><span style="color:#F0F3F6;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#FF9492;">implements</span><span style="color:#F0F3F6;"> java.io.</span><span style="color:#91CBFF;">Serializable</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">GenericDeclaration</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">Type</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">AnnotatedElement</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> final</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> ANNOTATION</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> 0x00002000</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> final</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> ENUM</span><span style="color:#FF9492;">      =</span><span style="color:#91CBFF;"> 0x00004000</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> final</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> SYNTHETIC</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0x00001000</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> native</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> registerNatives</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">    static</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#DBB7FF;">        registerNatives</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /*</span></span>
<span class="line"><span style="color:#BDC4CC;">     *  //私有构造器，只有JVM才能调用创建Class对象</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#DBB7FF;"> Class</span><span style="color:#F0F3F6;">(ClassLoader </span><span style="color:#FFB757;">loader</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">        // Initialize final field for classLoader.  The initialization value of non-null</span></span>
<span class="line"><span style="color:#BDC4CC;">        // prevents future JIT optimizations from assuming this final field is null.</span></span>
<span class="line"><span style="color:#F0F3F6;">        classLoader </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> loader;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span></code></pre></div><p>到这我们也就可以得出以下几点信息：</p><ul><li><code>Class</code>类也是类的一种，与<code>class</code>关键字是不一样的。</li><li>手动编写的类被编译后会产生一个<code>Class</code>对象，其表示的是创建的类的类型信息，而且这个<code>Class</code>对象保存在同名<code>.class</code>的文件中(字节码文件)</li><li>每个通过关键字<code>class</code>标识的类，在内存中有且只有一个与之对应的<code>Class</code>对象来描述其类型信息，无论创建多少个实例对象，其依据的都是用一个<code>Class</code>对象。</li><li><code>Class</code>类只存私有构造函数，因此对应<code>Class</code>对象只能有 JVM 创建和加载<code>Class</code>类的对象作用是运行时提供或获得某个对象的类型信息，这点对于反射技术很重要。</li></ul><h3 id="类加载" tabindex="-1"><a class="header-anchor" href="#类加载"><span>类加载</span></a></h3><p>类加载机制流程</p>`,13)),o(a,{id:"mermaid-56",code:"eJxLy8kvT85ILCpR8Ani4nzateDF3r26unYvV/W8WN/IxVlcmpRelFiQofBi/7xnfUu5OCESQBVP29ueLmkHagHTQIEXyxc/mzeBizM1L4WLE8IBKeuY+3R599OeaUCVMCZQ+Mne/c+nrODihNAgdb07gDZzAQCeX0kd"}),s[1]||(s[1]=n(`<p>类的加载</p><h2 id="反射的使用" tabindex="-1"><a class="header-anchor" href="#反射的使用"><span>反射的使用</span></a></h2><p>在 Java 中，<code>Class</code>类与<code>java.lang.reflect</code>类库一起对反射技术进行了全力的支持。在反射包中，我们常用的类主要有：</p><ul><li><code>Constructor</code>类，表示的是<code>Class</code>对象所表示的类的构造方法，利用它可以在运行时动态创建对象</li><li><code>Field</code>表示<code>Class</code>对象所表示的类的成员变量，通过它可以在运行时动态修改成员变量的属性值(包含<code>private</code>)</li><li><code>Method</code>表示<code>Class</code>对象所表示的类的成员方法，通过它可以动态调用对象的方法(包含<code>private</code>)</li></ul><p>下面对这几个重要类进行分别说明。</p><h3 id="class类对象的获取" tabindex="-1"><a class="header-anchor" href="#class类对象的获取"><span>Class类对象的获取</span></a></h3><p>在类加载的时候，JVM 会创建一个<code>class</code>对象。</p><p><code>class</code>对象是可以说是反射中最常用的，获取<code>class</code>对象的方式的主要有三种：</p><ul><li>根据类名：类名<code>.class</code></li><li>根据对象：对象<code>.getClass()</code></li><li>根据全限定类名：<code>Class.forName(全限定类名)</code></li></ul><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Test</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> classTest</span><span style="color:#F0F3F6;">() throws Exception {</span></span>
<span class="line"><span style="color:#BDC4CC;">    // 获取Class对象的三种方式</span></span>
<span class="line"><span style="color:#F0F3F6;">    logger.</span><span style="color:#DBB7FF;">info</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;根据类名:  </span><span style="color:#FF9492;">\\t</span><span style="color:#ADDCFF;">&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> User.class);</span></span>
<span class="line"><span style="color:#F0F3F6;">    logger.</span><span style="color:#DBB7FF;">info</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;根据对象:  </span><span style="color:#FF9492;">\\t</span><span style="color:#ADDCFF;">&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">getClass</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    logger.</span><span style="color:#DBB7FF;">info</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;根据全限定类名:</span><span style="color:#FF9492;">\\t</span><span style="color:#ADDCFF;">&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;com.test.User&quot;</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#BDC4CC;">    // 常用的方法</span></span>
<span class="line"><span style="color:#F0F3F6;">    logger.</span><span style="color:#DBB7FF;">info</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;获取全限定类名:</span><span style="color:#FF9492;">\\t</span><span style="color:#ADDCFF;">&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userClass.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    logger.</span><span style="color:#DBB7FF;">info</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;获取类名:</span><span style="color:#FF9492;">\\t</span><span style="color:#ADDCFF;">&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userClass.</span><span style="color:#DBB7FF;">getSimpleName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    logger.</span><span style="color:#DBB7FF;">info</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;实例化:</span><span style="color:#FF9492;">\\t</span><span style="color:#ADDCFF;">&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userClass.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// ...</span></span>
<span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> com.test;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> User</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> name</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;init&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">() {}</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">name</span><span style="color:#F0F3F6;">, </span><span style="color:#FF9492;">int</span><span style="color:#FFB757;"> age</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        super</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.name </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.age </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setName</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">name</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.name </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> getAge</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setAge</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">int</span><span style="color:#FFB757;"> age</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.age </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;User [name=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> name </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;, age=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> age </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;]&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>输出结果：</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>根据类名:  	class com.test.User</span></span>
<span class="line"><span>根据对象:  	class com.test.User</span></span>
<span class="line"><span>根据全限定类名:	class com.test.User</span></span>
<span class="line"><span>获取全限定类名:	com.test.User</span></span>
<span class="line"><span>获取类名:	User</span></span>
<span class="line"><span>实例化:	User [name=init, age=0]</span></span></code></pre></div><p><code>Class</code>类的方法：</p><table><thead><tr><th style="text-align:left;">方法名</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">forName()</td><td style="text-align:left;">(1)获取Class对象的一个引用，但引用的类还没有加载(该类的第一个对象没有生成)就加载了这个类。<br>(2)为了产生Class引用，forName()立即就进行了初始化。</td></tr><tr><td style="text-align:left;">getClass()</td><td style="text-align:left;">获取Class对象的一个引用，返回表示该对象的实际类型的Class引用。</td></tr><tr><td style="text-align:left;">getName()</td><td style="text-align:left;">取全限定的类名(包括包名)，即类的完整名字。</td></tr><tr><td style="text-align:left;">getSimpleName()</td><td style="text-align:left;">获取类名(不包括包名)</td></tr><tr><td style="text-align:left;">getCanonicalName()</td><td style="text-align:left;">获取全限定的类名(包括包名)</td></tr><tr><td style="text-align:left;">isInterface()</td><td style="text-align:left;">判断Class对象是否是表示一个接口</td></tr><tr><td style="text-align:left;">getInterfaces()</td><td style="text-align:left;">返回Class对象数组，表示Class对象所引用的类所实现的所有接口。</td></tr><tr><td style="text-align:left;">getSupercalss()</td><td style="text-align:left;">返回Class对象，表示Class对象所引用的类所继承的直接基类。应用该方法可在运行时发现一个对象完整的继承结构。</td></tr><tr><td style="text-align:left;">newInstance()</td><td style="text-align:left;">返回一个Oject对象，是实现“虚拟构造器”的一种途径。使用该方法创建的类，必须带有无参的构造器。</td></tr><tr><td style="text-align:left;">getFields()</td><td style="text-align:left;">获得某个类的所有的公共（public）的字段，包括继承自父类的所有公共字段。 类似的还有getMethods和getConstructors。</td></tr><tr><td style="text-align:left;">getDeclaredFields</td><td style="text-align:left;">获得某个类的自己声明的字段，即包括public、private和proteced，默认但是不包括父类声明的任何字段。类似的还有getDeclaredMethods和getDeclaredConstructors。</td></tr></tbody></table><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> com.cry;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.lang.reflect.Field;</span></span>
<span class="line"><span style="color:#FF9492;">interface</span><span style="color:#FFB757;"> I1</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">interface</span><span style="color:#FFB757;"> I2</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Cell</span><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mCellPublic;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Animal</span><span style="color:#FF9492;"> extends</span><span style="color:#91CBFF;">  Cell</span><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mAnimalPrivate;</span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mAnimalProtected;</span></span>
<span class="line"><span style="color:#FF9492;">    int</span><span style="color:#F0F3F6;"> mAnimalDefault;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mAnimalPublic;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sAnimalPrivate;</span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sAnimalProtected;</span></span>
<span class="line"><span style="color:#FF9492;">    static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sAnimalDefault;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sAnimalPublic;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Dog</span><span style="color:#FF9492;"> extends</span><span style="color:#91CBFF;"> Animal</span><span style="color:#FF9492;"> implements</span><span style="color:#91CBFF;"> I1</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">I2</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mDogPrivate;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mDogPublic;</span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mDogProtected;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> mDogDefault;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sDogPrivate;</span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sDogProtected;</span></span>
<span class="line"><span style="color:#FF9492;">    static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sDogDefault;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> sDogPublic;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> Test</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> IllegalAccessException, InstantiationException {</span></span>
<span class="line"><span style="color:#F0F3F6;">        Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">Dog</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">dog</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Dog.class;</span></span>
<span class="line"><span style="color:#BDC4CC;">        //类名打印</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(dog.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//com.cry.Dog</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(dog.</span><span style="color:#DBB7FF;">getSimpleName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//Dog</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(dog.</span><span style="color:#DBB7FF;">getCanonicalName</span><span style="color:#F0F3F6;">());</span><span style="color:#BDC4CC;">//com.cry.Dog</span></span>
<span class="line"><span style="color:#BDC4CC;">        //接口</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(dog.</span><span style="color:#DBB7FF;">isInterface</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//false</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Class</span><span style="color:#F0F3F6;"> iI</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> dog.</span><span style="color:#DBB7FF;">getInterfaces</span><span style="color:#F0F3F6;">()) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(iI);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#BDC4CC;">         /*</span></span>
<span class="line"><span style="color:#BDC4CC;">          interface com.cry.I1</span></span>
<span class="line"><span style="color:#BDC4CC;">          interface com.cry.I2</span></span>
<span class="line"><span style="color:#BDC4CC;">         */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //父类</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(dog.</span><span style="color:#DBB7FF;">getSuperclass</span><span style="color:#F0F3F6;">());</span><span style="color:#BDC4CC;">//class com.cry.Animal</span></span>
<span class="line"><span style="color:#BDC4CC;">        //创建对象</span></span>
<span class="line"><span style="color:#F0F3F6;">        Dog</span><span style="color:#F0F3F6;"> d</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> dog.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#BDC4CC;">        //字段</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Field</span><span style="color:#F0F3F6;"> f</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> dog.</span><span style="color:#DBB7FF;">getFields</span><span style="color:#F0F3F6;">()) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(f.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#BDC4CC;">        /*</span></span>
<span class="line"><span style="color:#BDC4CC;">            mDogPublic</span></span>
<span class="line"><span style="color:#BDC4CC;">            sDogPublic</span></span>
<span class="line"><span style="color:#BDC4CC;">            mAnimalPublic</span></span>
<span class="line"><span style="color:#BDC4CC;">            sAnimalPublic</span></span>
<span class="line"><span style="color:#BDC4CC;">            mCellPublic  //父类的父类的公共字段也打印出来了</span></span>
<span class="line"><span style="color:#BDC4CC;">         */</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;---------&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Field</span><span style="color:#F0F3F6;"> f</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> dog.</span><span style="color:#DBB7FF;">getDeclaredFields</span><span style="color:#F0F3F6;">()) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(f.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#BDC4CC;">        /** 只有自己类声明的字段</span></span>
<span class="line"><span style="color:#BDC4CC;">         mDogPrivate</span></span>
<span class="line"><span style="color:#BDC4CC;">         mDogPublic</span></span>
<span class="line"><span style="color:#BDC4CC;">         mDogProtected</span></span>
<span class="line"><span style="color:#BDC4CC;">         mDogDefault</span></span>
<span class="line"><span style="color:#BDC4CC;">         sDogPrivate</span></span>
<span class="line"><span style="color:#BDC4CC;">         sDogProtected</span></span>
<span class="line"><span style="color:#BDC4CC;">         sDogDefault</span></span>
<span class="line"><span style="color:#BDC4CC;">         sDogPublic</span></span>
<span class="line"><span style="color:#BDC4CC;">         */</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p><code>getName、getCanonicalName</code>与<code>getSimpleName</code>的区别：</p><ul><li><code>getSimpleName</code>：只获取类名</li><li><code>getName</code>：类的全限定名，JVM 中<code>Class</code>的表示，可以用于动态加载<code>Class</code>对象，例如<code>Class.forName</code>。</li><li><code>getCanonicalName</code>：返回更容易理解的表示，主要用于输出（<code>toString</code>）或l<code>og</code>打印，大多数情况下和<code>getName</code>一样，但是在内部类、数组等类型的表示形式就不同了。</li></ul><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> com.cry;</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> Test</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;">  class</span><span style="color:#FFB757;"> inner</span><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> ClassNotFoundException {</span></span>
<span class="line"><span style="color:#BDC4CC;">        //普通类</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(Test.class.</span><span style="color:#DBB7FF;">getSimpleName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//Test</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(Test.class.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//com.cry.Test</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(Test.class.</span><span style="color:#DBB7FF;">getCanonicalName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//com.cry.Test</span></span>
<span class="line"><span style="color:#BDC4CC;">        //内部类</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(inner.class.</span><span style="color:#DBB7FF;">getSimpleName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//inner</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(inner.class.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//com.cry.Test$inner</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(inner.class.</span><span style="color:#DBB7FF;">getCanonicalName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//com.cry.Test.inner</span></span>
<span class="line"><span style="color:#BDC4CC;">        //数组</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(args.</span><span style="color:#DBB7FF;">getClass</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">getSimpleName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//String[]</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(args.</span><span style="color:#DBB7FF;">getClass</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//[Ljava.lang.String;</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(args.</span><span style="color:#DBB7FF;">getClass</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">getCanonicalName</span><span style="color:#F0F3F6;">()); </span><span style="color:#BDC4CC;">//java.lang.String[]</span></span>
<span class="line"><span style="color:#BDC4CC;">        //我们不能用getCanonicalName去加载类对象，必须用getName</span></span>
<span class="line"><span style="color:#BDC4CC;">        //Class.forName(inner.class.getCanonicalName()); 报错</span></span>
<span class="line"><span style="color:#F0F3F6;">        Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(inner.class.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><h3 id="constructor类及其用法" tabindex="-1"><a class="header-anchor" href="#constructor类及其用法"><span>Constructor类及其用法</span></a></h3><p><code>Constructor</code>类存在于反射包(<code>java.lang.reflect</code>)中，反映的是<code>Class</code>对象所表示的类的构造方法。</p><p>获取<code>Constructor</code>对象是通过<code>Class</code>类中的方法获取的，<code>Class</code>类与<code>Constructor</code>相关的主要方法：</p><table><thead><tr><th style="text-align:center;">方法返回值</th><th style="text-align:left;">方法名称</th><th style="text-align:left;">方法说明</th></tr></thead><tbody><tr><td style="text-align:center;">static Class&lt;?&gt;</td><td style="text-align:left;">forName(String className)</td><td style="text-align:left;">返回与带有给定字符串名的类或接口相关联的 Class 对象。</td></tr><tr><td style="text-align:center;">Constructor</td><td style="text-align:left;">getConstructor(Class&lt;?&gt;... parameterTypes)</td><td style="text-align:left;">返回指定参数类型、具有public访问权限的构造函数对象</td></tr><tr><td style="text-align:center;">Constructor&lt;?&gt;[]</td><td style="text-align:left;">getConstructors()</td><td style="text-align:left;">返回所有具有public访问权限的构造函数的Constructor对象数组</td></tr><tr><td style="text-align:center;">Constructor</td><td style="text-align:left;">getDeclaredConstructor(Class&lt;?&gt;... parameterTypes)</td><td style="text-align:left;">返回指定参数类型、所有声明的（包括private）构造函数对象</td></tr><tr><td style="text-align:center;">Constructor&lt;?&gt;[]</td><td style="text-align:left;">getDeclaredConstructors()</td><td style="text-align:left;">返回所有声明的（包括private）构造函数对象</td></tr><tr><td style="text-align:center;">T</td><td style="text-align:left;">newInstance()</td><td style="text-align:left;">调用无参构造器创建此 Class 对象所表示的类的一个新实例。</td></tr></tbody></table><p>下面看一个简单例子来了解<code>Constructor</code>对象的使用：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> ConstructionTest</span><span style="color:#FF9492;"> implements</span><span style="color:#91CBFF;"> Serializable</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">clazz</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //获取Class对象的引用</span></span>
<span class="line"><span style="color:#F0F3F6;">        clazz </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;com.example.javabase.User&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //第一种方法，实例化默认构造方法，User必须无参构造函数,否则将抛异常</span></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (User) clazz.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setAge</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">20</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;Jack&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;--------------------------------------------&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //获取带String参数的public构造函数</span></span>
<span class="line"><span style="color:#F0F3F6;">        Constructor</span><span style="color:#F0F3F6;"> cs1</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;">clazz.</span><span style="color:#DBB7FF;">getConstructor</span><span style="color:#F0F3F6;">(String.class);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //创建User</span></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user1</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> (User) cs1.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;hiway&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user1.</span><span style="color:#DBB7FF;">setAge</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">22</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;user1:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">user1.</span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;--------------------------------------------&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //取得指定带int和String参数构造函数,该方法是私有构造private</span></span>
<span class="line"><span style="color:#F0F3F6;">        Constructor</span><span style="color:#F0F3F6;"> cs2</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">clazz.</span><span style="color:#DBB7FF;">getDeclaredConstructor</span><span style="color:#F0F3F6;">(int.class,String.class);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //由于是private必须设置可访问</span></span>
<span class="line"><span style="color:#F0F3F6;">        cs2.</span><span style="color:#DBB7FF;">setAccessible</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">true</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //创建user对象</span></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user2</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> (User) cs2.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">25</span><span style="color:#F0F3F6;">,</span><span style="color:#ADDCFF;">&quot;hiway2&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;user2:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">user2.</span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;--------------------------------------------&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //获取所有构造包含private</span></span>
<span class="line"><span style="color:#F0F3F6;">        Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">cons</span><span style="color:#FFB757;">[] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getDeclaredConstructors</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 查看每个构造方法需要的参数</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">int</span><span style="color:#F0F3F6;"> i</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">; i </span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;"> cons.length; i</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">            //获取构造函数参数类型</span></span>
<span class="line"><span style="color:#F0F3F6;">            Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">clazzs</span><span style="color:#FFB757;">[] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> cons[i].</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;构造函数[&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">i</span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;">&quot;]:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">cons[i].</span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">() );</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">print</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;参数类型[&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">i</span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;">&quot;]:(&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">            for</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">int</span><span style="color:#F0F3F6;"> j</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">; j </span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;"> clazzs.length; j</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">                if</span><span style="color:#F0F3F6;"> (j </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> clazzs.length </span><span style="color:#FF9492;">-</span><span style="color:#91CBFF;"> 1</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">                    System.out.</span><span style="color:#DBB7FF;">print</span><span style="color:#F0F3F6;">(clazzs[j].</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#FF9492;">                else</span></span>
<span class="line"><span style="color:#F0F3F6;">                    System.out.</span><span style="color:#DBB7FF;">print</span><span style="color:#F0F3F6;">(clazzs[j].</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;,&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">            }</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;)&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> User</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#91CBFF;">        super</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">name</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        super</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.name </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 私有构造</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> age</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> name</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">int</span><span style="color:#FFB757;"> age</span><span style="color:#F0F3F6;">, String </span><span style="color:#FFB757;">name</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        super</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.age </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.name </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> getAge</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setAge</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">int</span><span style="color:#FFB757;"> age</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.age </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setName</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">name</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.name </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;User{&quot;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;age=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> age </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, name=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> name </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &#39;}&#39;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>输出结果</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>/* output </span></span>
<span class="line"><span>User{age=20, name=&#39;Jack&#39;}</span></span>
<span class="line"><span>--------------------------------------------</span></span>
<span class="line"><span>user1:User{age=22, name=&#39;hiway&#39;}</span></span>
<span class="line"><span>--------------------------------------------</span></span>
<span class="line"><span>user2:User{age=25, name=&#39;hiway2&#39;}</span></span>
<span class="line"><span>--------------------------------------------</span></span>
<span class="line"><span>构造函数[0]:private com.example.javabase.User(int,java.lang.String)</span></span>
<span class="line"><span>参数类型[0]:(int,java.lang.String)</span></span>
<span class="line"><span>构造函数[1]:public com.example.javabase.User(java.lang.String)</span></span>
<span class="line"><span>参数类型[1]:(java.lang.String)</span></span>
<span class="line"><span>构造函数[2]:public com.example.javabase.User()</span></span>
<span class="line"><span>参数类型[2]:()</span></span></code></pre></div><p>关于<code>Constructor</code>类本身一些常用方法如下(仅部分，其他可查API)</p><table><thead><tr><th>方法返回值</th><th>方法名称</th><th>方法说明</th></tr></thead><tbody><tr><td>Class</td><td>getDeclaringClass()</td><td>返回 Class 对象，该对象表示声明由此 Constructor 对象表示的构造方法的类,其实就是返回真实类型（不包含参数）</td></tr><tr><td>Type[]</td><td>getGenericParameterTypes()</td><td>按照声明顺序返回一组 Type 对象，返回的就是 Constructor对象构造函数的形参类型。</td></tr><tr><td>String</td><td>getName()</td><td>以字符串形式返回此构造方法的名称。</td></tr><tr><td>Class&lt;?&gt;[]</td><td>getParameterTypes()</td><td>按照声明顺序返回一组 Class 对象，即返回Constructor 对象所表示构造方法的形参类型</td></tr><tr><td>T</td><td>newInstance(Object... initargs)</td><td>使用此 Constructor对象表示的构造函数来创建新实例</td></tr><tr><td>String</td><td>toGenericString()</td><td>返回描述此 Constructor 的字符串，其中包括类型参数。</td></tr></tbody></table><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">Constructor</span><span style="color:#F0F3F6;"> cs3</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getDeclaredConstructor</span><span style="color:#F0F3F6;">(int.class,String.class);</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----getDeclaringClass-----&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">Class</span><span style="color:#F0F3F6;"> uclazz</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">cs3.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#BDC4CC;">//Constructor对象表示的构造方法的类</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;构造方法的类:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">uclazz.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----getGenericParameterTypes-----&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">//对象表示此 Constructor 对象所表示的方法的形参类型</span></span>
<span class="line"><span style="color:#FF9492;">Type</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">tps</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">cs3.</span><span style="color:#DBB7FF;">getGenericParameterTypes</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">for</span><span style="color:#F0F3F6;"> (Type</span><span style="color:#F0F3F6;"> tp</span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;">tps) {</span></span>
<span class="line"><span style="color:#F0F3F6;">    System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;参数名称tp:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">tp);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----getParameterTypes-----&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">//获取构造函数参数类型</span></span>
<span class="line"><span style="color:#F0F3F6;">Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">clazzs</span><span style="color:#FFB757;">[] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> cs3.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">for</span><span style="color:#F0F3F6;"> (Class</span><span style="color:#F0F3F6;"> claz</span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;">clazzs) {</span></span>
<span class="line"><span style="color:#F0F3F6;">    System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;参数名称:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">claz.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----getName-----&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">//以字符串形式返回此构造方法的名称</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;getName:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">cs3.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;-----getoGenericString-----&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">//返回描述此 Constructor 的字符串，其中包括类型参数。</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;getoGenericString():&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">cs3.</span><span style="color:#DBB7FF;">toGenericString</span><span style="color:#F0F3F6;">());</span></span></code></pre></div><p>输出结果</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>-----getDeclaringClass-----</span></span>
<span class="line"><span>构造方法的类:com.example.javabase.User</span></span>
<span class="line"><span>-----getGenericParameterTypes-----</span></span>
<span class="line"><span>参数名称tp:int</span></span>
<span class="line"><span>参数名称tp:class java.lang.String</span></span>
<span class="line"><span>-----getParameterTypes-----</span></span>
<span class="line"><span>参数名称:int</span></span>
<span class="line"><span>参数名称:java.lang.String</span></span>
<span class="line"><span>-----getName-----</span></span>
<span class="line"><span>getName:com.example.javabase.User</span></span>
<span class="line"><span>-----getoGenericString-----</span></span>
<span class="line"><span>getoGenericString():private com.example.javabase.User(int,java.lang.String)</span></span></code></pre></div><h3 id="field类及其用法" tabindex="-1"><a class="header-anchor" href="#field类及其用法"><span>Field类及其用法</span></a></h3><p><code>Field</code>提供有关类或接口的单个字段的信息，以及对它的动态访问权限。反射的字段可能是一个类（静态）字段或实例字段。</p><p>同样的道理，我们可以通过<code>Class</code>类提供的方法来获取代表字段信息的<code>Field</code>对象，<code>Class</code>类与<code>Field</code>对象相关方法如下：</p><table><thead><tr><th>方法返回值</th><th>方法名称</th><th>方法说明</th></tr></thead><tbody><tr><td>Field</td><td>getDeclaredField(String name)</td><td>获取指定name名称的(包含private修饰的)字段，不包括继承的字段</td></tr><tr><td>Field[]</td><td>getDeclaredFields()</td><td>获取Class对象所表示的类或接口的所有(包含private修饰的)字段,不包括继承的字段</td></tr><tr><td>Field</td><td>getField(String name)</td><td>获取指定name名称、具有public修饰的字段，包含继承字段</td></tr><tr><td>Field[]</td><td>getFields()</td><td>获取修饰符为public的字段，包含继承字段</td></tr></tbody></table><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> ReflectField</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> ClassNotFoundException, NoSuchFieldException {</span></span>
<span class="line"><span style="color:#F0F3F6;">        Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">clazz</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;reflect.Student&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //获取指定字段名称的Field类,注意字段修饰符必须为public而且存在该字段,</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 否则抛NoSuchFieldException</span></span>
<span class="line"><span style="color:#F0F3F6;">        Field</span><span style="color:#F0F3F6;"> field</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getField</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;age&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;field:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">field);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //获取所有修饰符为public的字段,包含父类字段,注意修饰符为public才会获取</span></span>
<span class="line"><span style="color:#F0F3F6;">        Field</span><span style="color:#F0F3F6;"> fields</span><span style="color:#FFB757;">[] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getFields</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Field</span><span style="color:#F0F3F6;"> f</span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;">fields) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;f:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">f.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;================getDeclaredFields====================&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //获取当前类所字段(包含private字段),注意不包含父类的字段</span></span>
<span class="line"><span style="color:#F0F3F6;">        Field</span><span style="color:#F0F3F6;"> fields2</span><span style="color:#FFB757;">[] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getDeclaredFields</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Field</span><span style="color:#F0F3F6;"> f</span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;">fields2) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;f2:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">f.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#BDC4CC;">        //获取指定字段名称的Field类,可以是任意修饰符的自动,注意不包含父类的字段</span></span>
<span class="line"><span style="color:#F0F3F6;">        Field</span><span style="color:#F0F3F6;"> field2</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getDeclaredField</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;desc&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;field2:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">field2);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">      输出结果: </span></span>
<span class="line"><span style="color:#BDC4CC;">     field:public int reflect.Person.age</span></span>
<span class="line"><span style="color:#BDC4CC;">     f:public java.lang.String reflect.Student.desc</span></span>
<span class="line"><span style="color:#BDC4CC;">     f:public int reflect.Person.age</span></span>
<span class="line"><span style="color:#BDC4CC;">     f:public java.lang.String reflect.Person.name</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">     ================getDeclaredFields====================</span></span>
<span class="line"><span style="color:#BDC4CC;">     f2:public java.lang.String reflect.Student.desc</span></span>
<span class="line"><span style="color:#BDC4CC;">     f2:private int reflect.Student.score</span></span>
<span class="line"><span style="color:#BDC4CC;">     field2:public java.lang.String reflect.Student.desc</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Person</span><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> age;</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> name;</span></span>
<span class="line"><span style="color:#BDC4CC;">    //省略set和get方法</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Student</span><span style="color:#FF9492;"> extends</span><span style="color:#91CBFF;"> Person</span><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> desc;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> score;</span></span>
<span class="line"><span style="color:#BDC4CC;">    //省略set和get方法</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>上述方法需要注意的是，如果我们不期望获取其父类的字段，则需使用<code>Class</code>类的<code>getDeclaredField/getDeclaredFields</code>方法来获取字段即可，倘若需要连带获取到父类的字段，那么请使用<code>Class</code>类的<code>getField/getFields</code>，但是也只能获取到<code>public</code>修饰的的字段，无法获取父类的私有字段。</p><p>下面将通过<code>Field</code>类本身的方法对指定类属性赋值：</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>//获取Class对象引用</span></span>
<span class="line"><span>Class&lt;?&gt; clazz = Class.forName(&quot;reflect.Student&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Student st= (Student) clazz.newInstance();</span></span>
<span class="line"><span>//获取父类public字段并赋值</span></span>
<span class="line"><span>Field ageField = clazz.getField(&quot;age&quot;);</span></span>
<span class="line"><span>ageField.set(st,18);</span></span>
<span class="line"><span>Field nameField = clazz.getField(&quot;name&quot;);</span></span>
<span class="line"><span>nameField.set(st,&quot;Lily&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//只获取当前类的字段,不获取父类的字段</span></span>
<span class="line"><span>Field descField = clazz.getDeclaredField(&quot;desc&quot;);</span></span>
<span class="line"><span>descField.set(st,&quot;I am student&quot;);</span></span>
<span class="line"><span>Field scoreField = clazz.getDeclaredField(&quot;score&quot;);</span></span>
<span class="line"><span>//设置可访问，score是private的</span></span>
<span class="line"><span>scoreField.setAccessible(true);</span></span>
<span class="line"><span>scoreField.set(st,88);</span></span>
<span class="line"><span>System.out.println(st.toString());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//输出结果：Student{age=18, name=&#39;Lily ,desc=&#39;I am student&#39;, score=88}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//获取字段值</span></span>
<span class="line"><span>System.out.println(scoreField.get(st));</span></span>
<span class="line"><span>// 88</span></span></code></pre></div><p>其中的<code>set(Object obj, Object value)</code>方法是<code>Field</code>类本身的方法，用于设置字段的值，而<code>get(Object obj)</code>则是获取字段的值，当然关于<code>Field</code>类还有其他常用的方法如下：</p><table><thead><tr><th>方法返回值</th><th>方法名称</th><th>方法说明</th></tr></thead><tbody><tr><td>void</td><td>set(Object obj, Object value)</td><td>将指定对象变量上此 Field 对象表示的字段设置为指定的新值。</td></tr><tr><td>Object</td><td>get(Object obj)</td><td>返回指定对象上此 Field 表示的字段的值</td></tr><tr><td>Class&lt;?&gt;</td><td>getType()</td><td>返回一个 Class 对象，它标识了此Field 对象所表示字段的声明类型。</td></tr><tr><td>boolean</td><td>isEnumConstant()</td><td>如果此字段表示枚举类型的元素则返回 true；否则返回 false</td></tr><tr><td>String</td><td>toGenericString()</td><td>返回一个描述此 Field（包括其一般类型）的字符串</td></tr><tr><td>String</td><td>getName()</td><td>返回此 Field 对象表示的字段的名称</td></tr><tr><td>Class&lt;?&gt;</td><td>getDeclaringClass()</td><td>返回表示类或接口的 Class 对象，该类或接口声明由此 Field 对象表示的字段</td></tr><tr><td>void</td><td>setAccessible(boolean flag)</td><td>将此对象的 accessible 标志设置为指示的布尔值,即设置其可访问性</td></tr></tbody></table><p>上述方法可能是较为常用的，事实上在设置值的方法上，<code>Field</code>类还提供了专门针对基本数据类型的方法，如<code>setInt()/getInt()</code>、<code>setBoolean()/getBoolean</code>、<code>setChar()/getChar()</code>等等方法。</p><p>需要特别注意的是被<code>final</code>关键字修饰的<code>Field</code>字段是安全的，在运行时可以接收任何修改，但最终其实际值是不会发生改变的。</p><h3 id="method类及其用法" tabindex="-1"><a class="header-anchor" href="#method类及其用法"><span>Method类及其用法</span></a></h3><p><code>Method</code>提供关于类或接口上单独某个方法（以及如何访问该方法）的信息，所反映的方法可能是类方法或实例方法（包括抽象方法）。</p><p>下面是<code>Class</code>类获取<code>Method</code>对象相关的方法：</p><table><thead><tr><th>方法返回值</th><th>方法名称</th><th>方法说明</th></tr></thead><tbody><tr><td>Method</td><td>getDeclaredMethod(String name, Class&lt;?&gt;... parameterTypes)</td><td>返回一个指定参数的Method对象，该对象反映此 Class 对象所表示的类或接口的指定已声明方法。</td></tr><tr><td>Method[]</td><td>getDeclaredMethods()</td><td>返回 Method 对象的一个数组，这些对象反映此 Class 对象表示的类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但不包括继承的方法。</td></tr><tr><td>Method</td><td>getMethod(String name, Class&lt;?&gt;... parameterTypes)</td><td>返回一个 Method 对象，它反映此 Class 对象所表示的类或接口的指定公共成员方法。</td></tr><tr><td>Method[]</td><td>getMethods()</td><td>返回一个包含某些 Method 对象的数组，这些对象反映此 Class 对象所表示的类或接口（包括那些由该类或接口声明的以及从超类和超接口继承的那些的类或接口）的公共 member 方法。</td></tr></tbody></table><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.lang.reflect.Method;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> ReflectMethod</span><span style="color:#F0F3F6;">  {</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">throws</span><span style="color:#F0F3F6;"> ClassNotFoundException, NoSuchMethodException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        Class</span><span style="color:#F0F3F6;"> clazz</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;reflect.Circle&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //根据参数获取public的Method,包含继承自父类的方法</span></span>
<span class="line"><span style="color:#F0F3F6;">        Method</span><span style="color:#F0F3F6;"> method</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getMethod</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;draw&quot;</span><span style="color:#F0F3F6;">,int.class,String.class);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;method:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">method);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //获取所有public的方法:</span></span>
<span class="line"><span style="color:#FF9492;">        Method</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">methods</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;">clazz.</span><span style="color:#DBB7FF;">getMethods</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Method</span><span style="color:#F0F3F6;"> m</span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;">methods){</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;m::&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">m);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;=========================================&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        //获取当前类的方法包含private,该方法无法获取继承自父类的method</span></span>
<span class="line"><span style="color:#F0F3F6;">        Method</span><span style="color:#F0F3F6;"> method1</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getDeclaredMethod</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;drawCircle&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;method1::&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">method1);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //获取当前类的所有方法包含private,该方法无法获取继承自父类的method</span></span>
<span class="line"><span style="color:#FF9492;">        Method</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">methods1</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">clazz.</span><span style="color:#DBB7FF;">getDeclaredMethods</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (Method</span><span style="color:#F0F3F6;"> m</span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;">methods1){</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;m1::&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">m);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Shape</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> draw</span><span style="color:#F0F3F6;">(){</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;draw&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> draw</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">int</span><span style="color:#FFB757;"> count</span><span style="color:#F0F3F6;"> , String </span><span style="color:#FFB757;">name</span><span style="color:#F0F3F6;">){</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;draw &quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;"> name </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;">&quot;,count=&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">count);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Circle</span><span style="color:#FF9492;"> extends</span><span style="color:#91CBFF;"> Shape</span><span style="color:#F0F3F6;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> drawCircle</span><span style="color:#F0F3F6;">(){</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;drawCircle&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> getAllCount</span><span style="color:#F0F3F6;">(){</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#91CBFF;"> 100</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>输出结果:</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>method:public void reflect.Shape.draw(int,java.lang.String)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>m::public int reflect.Circle.getAllCount()</span></span>
<span class="line"><span>m::public void reflect.Shape.draw()</span></span>
<span class="line"><span>m::public void reflect.Shape.draw(int,java.lang.String)</span></span>
<span class="line"><span>m::public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException</span></span>
<span class="line"><span>m::public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException</span></span>
<span class="line"><span>m::public final void java.lang.Object.wait() throws java.lang.InterruptedException</span></span>
<span class="line"><span>m::public boolean java.lang.Object.equals(java.lang.Object)</span></span>
<span class="line"><span>m::public java.lang.String java.lang.Object.toString()</span></span>
<span class="line"><span>m::public native int java.lang.Object.hashCode()</span></span>
<span class="line"><span>m::public final native java.lang.Class java.lang.Object.getClass()</span></span>
<span class="line"><span>m::public final native void java.lang.Object.notify()</span></span>
<span class="line"><span>m::public final native void java.lang.Object.notifyAll()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=========================================</span></span>
<span class="line"><span>method1::private void reflect.Circle.drawCircle()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>m1::public int reflect.Circle.getAllCount()</span></span>
<span class="line"><span>m1::private void reflect.Circle.drawCircle()</span></span></code></pre></div><p>在通过<code>getMethods</code>方法获取<code>Method</code>对象时，会把父类的方法也获取到，如上的输出结果，把<code>Object</code>类的方法都打印出来了。而<code>getDeclaredMethod/getDeclaredMethods</code>方法都只能获取当前类的方法。我们在使用时根据情况选择即可。</p><p>下面将演示通过<code>Method</code>对象调用指定类的方法：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">Class</span><span style="color:#F0F3F6;"> clazz</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;reflect.Circle&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">//创建对象</span></span>
<span class="line"><span style="color:#F0F3F6;">Circle</span><span style="color:#F0F3F6;"> circle</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (Circle) clazz.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">//获取指定参数的方法对象Method</span></span>
<span class="line"><span style="color:#F0F3F6;">Method</span><span style="color:#F0F3F6;"> method</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getMethod</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;draw&quot;</span><span style="color:#F0F3F6;">,int.class,String.class);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">//通过Method对象的invoke(Object obj,Object... args)方法调用</span></span>
<span class="line"><span style="color:#F0F3F6;">method.</span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(circle,</span><span style="color:#91CBFF;">15</span><span style="color:#F0F3F6;">,</span><span style="color:#ADDCFF;">&quot;圈圈&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">//对私有无参方法的操作</span></span>
<span class="line"><span style="color:#F0F3F6;">Method</span><span style="color:#F0F3F6;"> method1</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> clazz.</span><span style="color:#DBB7FF;">getDeclaredMethod</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;drawCircle&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">//修改私有方法的访问标识</span></span>
<span class="line"><span style="color:#F0F3F6;">method1.</span><span style="color:#DBB7FF;">setAccessible</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">true</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">method1.</span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(circle);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">//对有返回值得方法操作</span></span>
<span class="line"><span style="color:#F0F3F6;">Method</span><span style="color:#F0F3F6;"> method2</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;">clazz.</span><span style="color:#DBB7FF;">getDeclaredMethod</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;getAllCount&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">Integer</span><span style="color:#F0F3F6;"> count</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (Integer) method2.</span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(circle);</span></span>
<span class="line"><span style="color:#F0F3F6;">System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;count:&quot;</span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;">count);</span></span></code></pre></div><p>输出结果</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>draw 圈圈,count=15</span></span>
<span class="line"><span>drawCircle</span></span>
<span class="line"><span>count:100</span></span></code></pre></div><p>在上述代码中调用方法，使用了<code>Method</code>类的<code>invoke(Object obj,Object... args)</code>第一个参数代表调用的对象，第二个参数传递的调用方法的参数。这样就完成了类方法的动态调用。</p><table><thead><tr><th>方法返回值</th><th>方法名称</th><th>方法说明</th></tr></thead><tbody><tr><td>Object</td><td>invoke(Object obj, Object... args)</td><td>对带有指定参数的指定对象调用由此 Method 对象表示的底层方法。</td></tr><tr><td>Class&lt;?&gt;</td><td>getReturnType()</td><td>返回一个 Class 对象，该对象描述了此 Method 对象所表示的方法的正式返回类型,即方法的返回类型</td></tr><tr><td>Type</td><td>getGenericReturnType()</td><td>返回表示由此 Method 对象所表示方法的正式返回类型的 Type 对象，也是方法的返回类型。</td></tr><tr><td>Class&lt;?&gt;[]</td><td>getParameterTypes()</td><td>按照声明顺序返回 Class 对象的数组，这些对象描述了此 Method 对象所表示的方法的形参类型。即返回方法的参数类型组成的数组</td></tr><tr><td>Type[]</td><td>getGenericParameterTypes()</td><td>按照声明顺序返回 Type 对象的数组，这些对象描述了此 Method 对象所表示的方法的形参类型的，也是返回方法的参数类型</td></tr><tr><td>String</td><td>getName()</td><td>以 String 形式返回此 Method 对象表示的方法名称，即返回方法的名称</td></tr><tr><td>boolean</td><td>isVarArgs()</td><td>判断方法是否带可变参数，如果将此方法声明为带有可变数量的参数，则返回 true；否则，返回 false。</td></tr><tr><td>String</td><td>toGenericString()</td><td>返回描述此 Method 的字符串，包括类型参数。</td></tr></tbody></table><p><code>getReturnType</code>方法/<code>getGenericReturnType</code>方法都是获取<code>Method</code>对象表示的方法的返回类型，只不过前者返回的<code>Class</code>类型后者返回的<code>Type</code>，<code>Type</code>就是一个接口而已，在 Java8 中新增一个默认的方法实现，返回的就参数类型信息</p><div class="language-" data-highlighter="shiki" data-ext="" data-title="" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>public interface Type {</span></span>
<span class="line"><span>    //1.8新增</span></span>
<span class="line"><span>    default String getTypeName() {</span></span>
<span class="line"><span>        return toString();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>而<code>getParameterTypes/getGenericParameterTypes</code>也是同样的道理，都是获取<code>Method</code>对象所表示的方法的参数类型，其他方法与前面的<code>Field</code>和<code>Constructor</code>是类似的。</p><h2 id="反射机制执行的流程" tabindex="-1"><a class="header-anchor" href="#反射机制执行的流程"><span>反射机制执行的流程</span></a></h2><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> HelloReflect</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        try</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">            // 1. 使用外部配置的实现，进行动态加载类</span></span>
<span class="line"><span style="color:#F0F3F6;">            TempFunctionTest</span><span style="color:#F0F3F6;"> test</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (TempFunctionTest)Class.</span><span style="color:#DBB7FF;">forName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;com.tester.HelloReflect&quot;</span><span style="color:#F0F3F6;">).</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">            test.</span><span style="color:#DBB7FF;">sayHello</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;call directly&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">            // 2. 根据配置的函数名，进行方法调用（不需要通用的接口抽象）</span></span>
<span class="line"><span style="color:#F0F3F6;">            Object</span><span style="color:#F0F3F6;"> t2</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> TempFunctionTest</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">            Method</span><span style="color:#F0F3F6;"> method</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> t2.</span><span style="color:#DBB7FF;">getClass</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">getDeclaredMethod</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;sayHello&quot;</span><span style="color:#F0F3F6;">, String.class);</span></span>
<span class="line"><span style="color:#F0F3F6;">            method.</span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(test, </span><span style="color:#ADDCFF;">&quot;method invoke&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (ClassNotFoundException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            e.</span><span style="color:#DBB7FF;">printStackTrace</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (InstantiationException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            e.</span><span style="color:#DBB7FF;">printStackTrace</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (IllegalAccessException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            e.</span><span style="color:#DBB7FF;">printStackTrace</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (NoSuchMethodException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;"> ) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            e.</span><span style="color:#DBB7FF;">printStackTrace</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (InvocationTargetException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            e.</span><span style="color:#DBB7FF;">printStackTrace</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> sayHello</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">word</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;hello,&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> word);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>来看执行流程</p><figure><img src="`+F+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="反射获取类实例" tabindex="-1"><a class="header-anchor" href="#反射获取类实例"><span>反射获取类实例</span></a></h3><p>首先调用了<code>java.lang.Class</code>的静态方法，获取类信息。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">CallerSensitive</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> static</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#DBB7FF;"> forName</span><span style="color:#F0F3F6;">(String className) throws ClassNotFoundException {</span></span>
<span class="line"><span style="color:#BDC4CC;">	// 先通过反射，获取调用进来的类信息，从而获取当前的 classLoader</span></span>
<span class="line"><span style="color:#F0F3F6;">	Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">caller</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Reflection.</span><span style="color:#DBB7FF;">getCallerClass</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#BDC4CC;">	// 调用native方法进行获取class信息</span></span>
<span class="line"><span style="color:#FF9492;">	return</span><span style="color:#DBB7FF;"> forName0</span><span style="color:#F0F3F6;">(className, </span><span style="color:#91CBFF;">true</span><span style="color:#F0F3F6;">, ClassLoader.</span><span style="color:#DBB7FF;">getClassLoader</span><span style="color:#F0F3F6;">(caller), caller);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p><code>forName()</code>反射获取类信息，并没有将实现留给 java，而是交给了 jvm 去加载。</p><p>主要是先获取<code>ClassLoader</code>，然后调用<code>native</code>方法，获取信息，加载类则是回调 <code>java.lang.ClassLoader</code>。</p><p>最后，jvm 又会回调<code>ClassLoader</code>进类加载。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#DBB7FF;"> loadClass</span><span style="color:#F0F3F6;">(String name) throws ClassNotFoundException {</span></span>
<span class="line"><span style="color:#FF9492;">return</span><span style="color:#DBB7FF;"> loadClass</span><span style="color:#F0F3F6;">(name, </span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">        // sun.misc.Launcher</span></span>
<span class="line"><span style="color:#FF9492;">        public</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#DBB7FF;"> loadClass</span><span style="color:#F0F3F6;">(String var1, </span><span style="color:#FF9492;">boolean</span><span style="color:#F0F3F6;"> var2) throws ClassNotFoundException {</span></span>
<span class="line"><span style="color:#FF9492;">            int</span><span style="color:#F0F3F6;"> var3</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> var1.</span><span style="color:#DBB7FF;">lastIndexOf</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">46</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">            if</span><span style="color:#F0F3F6;">(var3 </span><span style="color:#FF9492;">!=</span><span style="color:#FF9492;"> -</span><span style="color:#91CBFF;">1</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">                SecurityManager</span><span style="color:#F0F3F6;"> var4</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> System.</span><span style="color:#DBB7FF;">getSecurityManager</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">                if</span><span style="color:#F0F3F6;">(var4 </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">                    var4.</span><span style="color:#DBB7FF;">checkPackageAccess</span><span style="color:#F0F3F6;">(var1.</span><span style="color:#DBB7FF;">substring</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">0</span><span style="color:#F0F3F6;">, var3));</span></span>
<span class="line"><span style="color:#F0F3F6;">                }</span></span>
<span class="line"><span style="color:#F0F3F6;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">            if</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">.ucp.</span><span style="color:#DBB7FF;">knownToNotExist</span><span style="color:#F0F3F6;">(var1)) {</span></span>
<span class="line"><span style="color:#F0F3F6;">                Class</span><span style="color:#F0F3F6;"> var5</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">.</span><span style="color:#DBB7FF;">findLoadedClass</span><span style="color:#F0F3F6;">(var1);</span></span>
<span class="line"><span style="color:#FF9492;">                if</span><span style="color:#F0F3F6;">(var5 </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">                    if</span><span style="color:#F0F3F6;">(var2) {</span></span>
<span class="line"><span style="color:#91CBFF;">                        this</span><span style="color:#F0F3F6;">.</span><span style="color:#DBB7FF;">resolveClass</span><span style="color:#F0F3F6;">(var5);</span></span>
<span class="line"><span style="color:#F0F3F6;">                    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">                    return</span><span style="color:#F0F3F6;"> var5;</span></span>
<span class="line"><span style="color:#F0F3F6;">                } </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">                    throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> ClassNotFoundException</span><span style="color:#F0F3F6;">(var1);</span></span>
<span class="line"><span style="color:#F0F3F6;">                }</span></span>
<span class="line"><span style="color:#F0F3F6;">            } </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">                return</span><span style="color:#91CBFF;"> super</span><span style="color:#F0F3F6;">.</span><span style="color:#DBB7FF;">loadClass</span><span style="color:#F0F3F6;">(var1, var2);</span></span>
<span class="line"><span style="color:#F0F3F6;">            }</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#BDC4CC;">    // java.lang.ClassLoader</span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#DBB7FF;"> loadClass</span><span style="color:#F0F3F6;">(String name, </span><span style="color:#FF9492;">boolean</span><span style="color:#F0F3F6;"> resolve)</span></span>
<span class="line"><span style="color:#F0F3F6;">        throws ClassNotFoundException</span></span>
<span class="line"><span style="color:#F0F3F6;">    {</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 先获取锁</span></span>
<span class="line"><span style="color:#FF9492;">        synchronized</span><span style="color:#F0F3F6;"> (</span><span style="color:#DBB7FF;">getClassLoadingLock</span><span style="color:#F0F3F6;">(name)) {</span></span>
<span class="line"><span style="color:#BDC4CC;">            // First, check if the class has already been loaded</span></span>
<span class="line"><span style="color:#BDC4CC;">            // 如果已经加载了的话，就不用再加载了</span></span>
<span class="line"><span style="color:#F0F3F6;">            Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">c</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> findLoadedClass</span><span style="color:#F0F3F6;">(name);</span></span>
<span class="line"><span style="color:#FF9492;">            if</span><span style="color:#F0F3F6;"> (c </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">                long</span><span style="color:#F0F3F6;"> t0</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> System.</span><span style="color:#DBB7FF;">nanoTime</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">                try</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">                    // 双亲委托加载</span></span>
<span class="line"><span style="color:#FF9492;">                    if</span><span style="color:#F0F3F6;"> (parent </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">                        c </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> parent.</span><span style="color:#DBB7FF;">loadClass</span><span style="color:#F0F3F6;">(name, </span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">                    } </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">                        c </span><span style="color:#FF9492;">=</span><span style="color:#DBB7FF;"> findBootstrapClassOrNull</span><span style="color:#F0F3F6;">(name);</span></span>
<span class="line"><span style="color:#F0F3F6;">                    }</span></span>
<span class="line"><span style="color:#F0F3F6;">                } </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (ClassNotFoundException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">                    // ClassNotFoundException thrown if class not found</span></span>
<span class="line"><span style="color:#BDC4CC;">                    // from the non-null parent class loader</span></span>
<span class="line"><span style="color:#F0F3F6;">                }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">                // 父类没有加载到时，再自己加载</span></span>
<span class="line"><span style="color:#FF9492;">                if</span><span style="color:#F0F3F6;"> (c </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">                    // If still not found, then invoke findClass in order</span></span>
<span class="line"><span style="color:#BDC4CC;">                    // to find the class.</span></span>
<span class="line"><span style="color:#FF9492;">                    long</span><span style="color:#F0F3F6;"> t1</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> System.</span><span style="color:#DBB7FF;">nanoTime</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">                    c </span><span style="color:#FF9492;">=</span><span style="color:#DBB7FF;"> findClass</span><span style="color:#F0F3F6;">(name);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">                    // this is the defining class loader; record the stats</span></span>
<span class="line"><span style="color:#F0F3F6;">                    sun.misc.PerfCounter.</span><span style="color:#DBB7FF;">getParentDelegationTime</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">addTime</span><span style="color:#F0F3F6;">(t1 </span><span style="color:#FF9492;">-</span><span style="color:#F0F3F6;"> t0);</span></span>
<span class="line"><span style="color:#F0F3F6;">                    sun.misc.PerfCounter.</span><span style="color:#DBB7FF;">getFindClassTime</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">addElapsedTimeFrom</span><span style="color:#F0F3F6;">(t1);</span></span>
<span class="line"><span style="color:#F0F3F6;">                    sun.misc.PerfCounter.</span><span style="color:#DBB7FF;">getFindClasses</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">increment</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">                }</span></span>
<span class="line"><span style="color:#F0F3F6;">            }</span></span>
<span class="line"><span style="color:#FF9492;">            if</span><span style="color:#F0F3F6;"> (resolve) {</span></span>
<span class="line"><span style="color:#DBB7FF;">                resolveClass</span><span style="color:#F0F3F6;">(c);</span></span>
<span class="line"><span style="color:#F0F3F6;">            }</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#F0F3F6;"> c;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">getClassLoadingLock</span><span style="color:#F0F3F6;">(String className) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        Object</span><span style="color:#F0F3F6;"> lock</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (parallelLockMap </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">            // 使用 ConcurrentHashMap来保存锁</span></span>
<span class="line"><span style="color:#F0F3F6;">            Object</span><span style="color:#F0F3F6;"> newLock</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> Object</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">            lock </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> parallelLockMap.</span><span style="color:#DBB7FF;">putIfAbsent</span><span style="color:#F0F3F6;">(className, newLock);</span></span>
<span class="line"><span style="color:#FF9492;">            if</span><span style="color:#F0F3F6;"> (lock </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">                lock </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> newLock;</span></span>
<span class="line"><span style="color:#F0F3F6;">            }</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> lock;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#FF9492;">    protected</span><span style="color:#FF9492;"> final</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#DBB7FF;"> findLoadedClass</span><span style="color:#F0F3F6;">(String name) {</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#DBB7FF;">checkName</span><span style="color:#F0F3F6;">(name))</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#DBB7FF;"> findLoadedClass0</span><span style="color:#F0F3F6;">(name);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span></code></pre></div><p>下面来看一下<code>newInstance()</code>的实现方式。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// 首先肯定是 Class.newInstance</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">CallerSensitive</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> T </span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">() throws InstantiationException, IllegalAccessException {</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (System.</span><span style="color:#DBB7FF;">getSecurityManager</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#DBB7FF;">				checkMemberAccess</span><span style="color:#F0F3F6;">(Member.PUBLIC, Reflection.</span><span style="color:#DBB7FF;">getCallerClass</span><span style="color:#F0F3F6;">(), </span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// NOTE: the following code may not be strictly correct under</span></span>
<span class="line"><span style="color:#BDC4CC;">		// the current Java memory model.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Constructor lookup</span></span>
<span class="line"><span style="color:#BDC4CC;">		// newInstance() 其实相当于调用类的无参构造函数，所以，首先要找到其无参构造器</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (cachedConstructor </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (</span><span style="color:#91CBFF;">this</span><span style="color:#FF9492;"> ==</span><span style="color:#F0F3F6;"> Class.class) {</span></span>
<span class="line"><span style="color:#BDC4CC;">						// 不允许调用 Class 的 newInstance() 方法</span></span>
<span class="line"><span style="color:#FF9492;">						throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> IllegalAccessException</span><span style="color:#F0F3F6;">(</span></span>
<span class="line"><span style="color:#ADDCFF;">								&quot;Can not call newInstance() on the Class for java.lang.Class&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">						);</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#FF9492;">				try</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">						// 获取无参构造器</span></span>
<span class="line"><span style="color:#F0F3F6;">						Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">empty</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> {};</span></span>
<span class="line"><span style="color:#FF9492;">						final</span><span style="color:#F0F3F6;"> Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">c</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> getConstructor0</span><span style="color:#F0F3F6;">(empty, Member.DECLARED);</span></span>
<span class="line"><span style="color:#BDC4CC;">						// Disable accessibility checks on the constructor</span></span>
<span class="line"><span style="color:#BDC4CC;">						// since we have to do the security check here anyway</span></span>
<span class="line"><span style="color:#BDC4CC;">						// (the stack depth is wrong for the Constructor&#39;s</span></span>
<span class="line"><span style="color:#BDC4CC;">						// security check to work)</span></span>
<span class="line"><span style="color:#F0F3F6;">						java.security.AccessController.</span><span style="color:#DBB7FF;">doPrivileged</span><span style="color:#F0F3F6;">(</span></span>
<span class="line"><span style="color:#FF9492;">								new</span><span style="color:#F0F3F6;"> java.security.PrivilegedAction&lt;</span><span style="color:#FF9492;">Void</span><span style="color:#F0F3F6;">&gt;() {</span></span>
<span class="line"><span style="color:#FF9492;">										public</span><span style="color:#F0F3F6;"> Void </span><span style="color:#DBB7FF;">run</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">														c.</span><span style="color:#DBB7FF;">setAccessible</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">true</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">														return</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">												}</span></span>
<span class="line"><span style="color:#F0F3F6;">										});</span></span>
<span class="line"><span style="color:#F0F3F6;">						cachedConstructor </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> c;</span></span>
<span class="line"><span style="color:#F0F3F6;">				} </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (NoSuchMethodException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">						throw</span><span style="color:#F0F3F6;"> (InstantiationException)</span></span>
<span class="line"><span style="color:#FF9492;">								new</span><span style="color:#DBB7FF;"> InstantiationException</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">()).</span><span style="color:#DBB7FF;">initCause</span><span style="color:#F0F3F6;">(e);</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">tmpConstructor</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> cachedConstructor;</span></span>
<span class="line"><span style="color:#BDC4CC;">		// Security check (same as in java.lang.reflect.Constructor)</span></span>
<span class="line"><span style="color:#FF9492;">		int</span><span style="color:#F0F3F6;"> modifiers</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> tmpConstructor.</span><span style="color:#DBB7FF;">getModifiers</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">Reflection.</span><span style="color:#DBB7FF;">quickCheckMemberAccess</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">, modifiers)) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">caller</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Reflection.</span><span style="color:#DBB7FF;">getCallerClass</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (newInstanceCallerCache </span><span style="color:#FF9492;">!=</span><span style="color:#F0F3F6;"> caller) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						Reflection.</span><span style="color:#DBB7FF;">ensureMemberAccess</span><span style="color:#F0F3F6;">(caller, </span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">, </span><span style="color:#91CBFF;">null</span><span style="color:#F0F3F6;">, modifiers);</span></span>
<span class="line"><span style="color:#F0F3F6;">						newInstanceCallerCache </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> caller;</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#BDC4CC;">		// Run constructor</span></span>
<span class="line"><span style="color:#FF9492;">		try</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">				// 调用无参构造器</span></span>
<span class="line"><span style="color:#FF9492;">				return</span><span style="color:#F0F3F6;"> tmpConstructor.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">((</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[])</span><span style="color:#91CBFF;">null</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (InvocationTargetException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				Unsafe.</span><span style="color:#DBB7FF;">getUnsafe</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">throwException</span><span style="color:#F0F3F6;">(e.</span><span style="color:#DBB7FF;">getTargetException</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#BDC4CC;">				// Not reached</span></span>
<span class="line"><span style="color:#FF9492;">				return</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p><code>newInstance()</code>主要做了三件事：</p><ul><li>权限检测，如果不通过直接抛出异常；</li><li>查找无参构造器，并将其缓存起来；</li><li>调用具体方法的无参构造方法，生成实例并返回；</li></ul><p>下面是获取构造器的过程：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">private</span><span style="color:#F0F3F6;"> Constructor</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#DBB7FF;"> getConstructor0</span><span style="color:#F0F3F6;">(Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">[] parameterTypes, </span><span style="color:#FF9492;">int</span><span style="color:#F0F3F6;"> which) throws NoSuchMethodException {</span></span>
<span class="line"><span style="color:#BDC4CC;">		// 获取所有构造器</span></span>
<span class="line"><span style="color:#F0F3F6;">		Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">constructors</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> privateGetDeclaredConstructors</span><span style="color:#F0F3F6;">((which </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> Member.PUBLIC));</span></span>
<span class="line"><span style="color:#FF9492;">		for</span><span style="color:#F0F3F6;"> (Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">constructor</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> constructors) {</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (</span><span style="color:#DBB7FF;">arrayContentsEq</span><span style="color:#F0F3F6;">(parameterTypes,</span></span>
<span class="line"><span style="color:#F0F3F6;">														constructor.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">())) {</span></span>
<span class="line"><span style="color:#FF9492;">						return</span><span style="color:#DBB7FF;"> getReflectionFactory</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">copyConstructor</span><span style="color:#F0F3F6;">(constructor);</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> NoSuchMethodException</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;.&lt;init&gt;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#DBB7FF;"> argumentTypesToString</span><span style="color:#F0F3F6;">(parameterTypes));</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p><code>getConstructor0()</code>为获取匹配的构造方器；分三步：</p><ul><li>先获取所有的<code>constructors</code>，然后通过进行参数类型比较</li><li>找到匹配后，通过<code>ReflectionFactory</code>copy 一份<code>constructor</code>返回</li><li>否则抛出<code>NoSuchMethodException</code></li></ul><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// 获取当前类所有的构造方法，通过jvm或者缓存</span></span>
<span class="line"><span style="color:#BDC4CC;">// Returns an array of &quot;root&quot; constructors. These Constructor</span></span>
<span class="line"><span style="color:#BDC4CC;">// objects must NOT be propagated to the outside world, but must</span></span>
<span class="line"><span style="color:#BDC4CC;">// instead be copied via ReflectionFactory.copyConstructor.</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#F0F3F6;"> Constructor</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;">[] </span><span style="color:#DBB7FF;">privateGetDeclaredConstructors</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">boolean</span><span style="color:#F0F3F6;"> publicOnly) {</span></span>
<span class="line"><span style="color:#DBB7FF;">    checkInitted</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">res;</span></span>
<span class="line"><span style="color:#BDC4CC;">    // 调用 reflectionData(), 获取保存的信息，使用软引用保存，从而使内存不够可以回收</span></span>
<span class="line"><span style="color:#F0F3F6;">    ReflectionData</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">rd</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> reflectionData</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (rd </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        res </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> publicOnly </span><span style="color:#FF9492;">?</span><span style="color:#F0F3F6;"> rd.publicConstructors </span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;"> rd.declaredConstructors;</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 存在缓存，则直接返回</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (res </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">return</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#BDC4CC;">    // No cached value available; request value from VM</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (</span><span style="color:#DBB7FF;">isInterface</span><span style="color:#F0F3F6;">()) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        @</span><span style="color:#FF9492;">SuppressWarnings</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;unchecked&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">        Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">temporaryRes</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (Constructor</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;">[]) </span><span style="color:#FF9492;">new</span><span style="color:#F0F3F6;"> Constructor&lt;</span><span style="color:#FF9492;">?</span><span style="color:#F0F3F6;">&gt;[</span><span style="color:#91CBFF;">0</span><span style="color:#F0F3F6;">];</span></span>
<span class="line"><span style="color:#F0F3F6;">        res </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> temporaryRes;</span></span>
<span class="line"><span style="color:#F0F3F6;">    } </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 使用native方法从jvm获取构造器</span></span>
<span class="line"><span style="color:#F0F3F6;">        res </span><span style="color:#FF9492;">=</span><span style="color:#DBB7FF;"> getDeclaredConstructors0</span><span style="color:#F0F3F6;">(publicOnly);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (rd </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 最后，将从jvm中读取的内容，存入缓存</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (publicOnly) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            rd.publicConstructors </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">        } </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">            rd.declaredConstructors </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// Lazily create and cache ReflectionData</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#F0F3F6;"> ReflectionData</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#DBB7FF;"> reflectionData</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#F0F3F6;">    SoftReference</span><span style="color:#FFB757;">&lt;</span><span style="color:#F0F3F6;">ReflectionData</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt;&gt; </span><span style="color:#F0F3F6;">reflectionData</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">.reflectionData;</span></span>
<span class="line"><span style="color:#FF9492;">    int</span><span style="color:#F0F3F6;"> classRedefinedCount</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">.classRedefinedCount;</span></span>
<span class="line"><span style="color:#F0F3F6;">    ReflectionData</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">rd;</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (useCaches </span><span style="color:#FF9492;">&amp;&amp;</span></span>
<span class="line"><span style="color:#F0F3F6;">        reflectionData </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> &amp;&amp;</span></span>
<span class="line"><span style="color:#F0F3F6;">        (rd </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> reflectionData.</span><span style="color:#DBB7FF;">get</span><span style="color:#F0F3F6;">()) </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> &amp;&amp;</span></span>
<span class="line"><span style="color:#F0F3F6;">        rd.redefinedCount </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> classRedefinedCount) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> rd;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#BDC4CC;">    // else no SoftReference or cleared SoftReference or stale ReflectionData</span></span>
<span class="line"><span style="color:#BDC4CC;">    // -&gt; create and replace new instance</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#DBB7FF;"> newReflectionData</span><span style="color:#F0F3F6;">(reflectionData, classRedefinedCount);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// 新创建缓存，保存反射信息</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#F0F3F6;"> ReflectionData</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#DBB7FF;"> newReflectionData</span><span style="color:#F0F3F6;">(SoftReference</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">ReflectionData</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;&gt;</span><span style="color:#F0F3F6;"> oldReflectionData,</span></span>
<span class="line"><span style="color:#FF9492;">                                            int</span><span style="color:#F0F3F6;"> classRedefinedCount) {</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">useCaches) </span><span style="color:#FF9492;">return</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    // 使用cas保证更新的线程安全性，所以反射是保证线程安全的</span></span>
<span class="line"><span style="color:#FF9492;">    while</span><span style="color:#F0F3F6;"> (</span><span style="color:#91CBFF;">true</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        ReflectionData</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">rd</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#F0F3F6;"> ReflectionData&lt;&gt;(classRedefinedCount);</span></span>
<span class="line"><span style="color:#BDC4CC;">        // try to CAS it...</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (Atomic.</span><span style="color:#DBB7FF;">casReflectionData</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">, oldReflectionData, </span><span style="color:#FF9492;">new</span><span style="color:#F0F3F6;"> SoftReference&lt;&gt;(rd))) {</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#F0F3F6;"> rd;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#BDC4CC;">        // 先使用CAS更新，如果更新成功，则立即返回，否则测查当前已被其他线程更新的情况，如果和自己想要更新的状态一致，则也算是成功了</span></span>
<span class="line"><span style="color:#F0F3F6;">        oldReflectionData </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">.reflectionData;</span></span>
<span class="line"><span style="color:#F0F3F6;">        classRedefinedCount </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">.classRedefinedCount;</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (oldReflectionData </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> &amp;&amp;</span></span>
<span class="line"><span style="color:#F0F3F6;">            (rd </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> oldReflectionData.</span><span style="color:#DBB7FF;">get</span><span style="color:#F0F3F6;">()) </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> &amp;&amp;</span></span>
<span class="line"><span style="color:#F0F3F6;">            rd.redefinedCount </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> classRedefinedCount) {</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#F0F3F6;"> rd;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>如上，<code>privateGetDeclaredConstructors()</code>，获取所有的构造器主要步骤：</p><ul><li>先尝试从缓存中获取；</li><li>如果缓存没有，则从 jvm 中重新获取，并存入缓存，缓存使用软引用进行保存，保证内存可用；</li></ul><p>另外，使用<code>relactionData()</code>进行缓存保存；<code>ReflectionData</code>的数据结构如下。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// reflection data that might get invalidated when JVM TI RedefineClasses() is called</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> ReflectionData</span><span style="color:#F0F3F6;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#F0F3F6;">&gt; {</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#FF9492;"> Field</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">declaredFields;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#FF9492;"> Field</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">publicFields;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#FF9492;"> Method</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">declaredMethods;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#FF9492;"> Method</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">publicMethods;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#F0F3F6;"> Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">declaredConstructors;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#F0F3F6;"> Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">publicConstructors;</span></span>
<span class="line"><span style="color:#BDC4CC;">    // Intermediate results for getFields and getMethods</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#FF9492;"> Field</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">declaredPublicFields;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#FF9492;"> Method</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">declaredPublicMethods;</span></span>
<span class="line"><span style="color:#FF9492;">    volatile</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt;[] </span><span style="color:#F0F3F6;">interfaces;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    // Value of classRedefinedCount when we created this ReflectionData instance</span></span>
<span class="line"><span style="color:#FF9492;">    final</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> redefinedCount;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#DBB7FF;">    ReflectionData</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">int</span><span style="color:#FFB757;"> redefinedCount</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.redefinedCount </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> redefinedCount;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>其中，还有一个点，就是如何比较构造是否是要查找构造器，其实就是比较类型完成相等就完了，有一个不相等则返回<code>false</code>。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> boolean</span><span style="color:#DBB7FF;"> arrayContentsEq</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] a1, </span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] a2) {</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (a1 </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> a2 </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> ||</span><span style="color:#F0F3F6;"> a2.length </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (a2 </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> a1.length </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (a1.length </span><span style="color:#FF9492;">!=</span><span style="color:#F0F3F6;"> a2.length) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#91CBFF;"> false</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    for</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">int</span><span style="color:#F0F3F6;"> i</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">; i </span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;"> a1.length; i</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (a1[i] </span><span style="color:#FF9492;">!=</span><span style="color:#F0F3F6;"> a2[i]) {</span></span>
<span class="line"><span style="color:#FF9492;">            return</span><span style="color:#91CBFF;"> false</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#91CBFF;"> true</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#BDC4CC;">// sun.reflect.ReflectionFactory</span></span>
<span class="line"><span style="color:#BDC4CC;">/** Makes a copy of the passed constructor. The returned</span></span>
<span class="line"><span style="color:#BDC4CC;">    constructor is a &quot;child&quot; of the passed one; see the comments</span></span>
<span class="line"><span style="color:#BDC4CC;">    in Constructor.java for details. */</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> &lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;"> Constructor</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#DBB7FF;"> copyConstructor</span><span style="color:#F0F3F6;">(Constructor</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;"> arg) {</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#DBB7FF;"> langReflectAccess</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">copyConstructor</span><span style="color:#F0F3F6;">(arg);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">// java.lang.reflect.Constructor, copy 其实就是新new一个 Constructor 出来</span></span>
<span class="line"><span style="color:#F0F3F6;">Constructor</span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;">T</span><span style="color:#FF9492;">&gt;</span><span style="color:#DBB7FF;"> copy</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#BDC4CC;">    // This routine enables sharing of ConstructorAccessor objects</span></span>
<span class="line"><span style="color:#BDC4CC;">    // among Constructor objects which refer to the same underlying</span></span>
<span class="line"><span style="color:#BDC4CC;">    // method in the VM. (All of this contortion is only necessary</span></span>
<span class="line"><span style="color:#BDC4CC;">    // because of the &quot;accessibility&quot; bit in AccessibleObject,</span></span>
<span class="line"><span style="color:#BDC4CC;">    // which implicitly requires that new java.lang.reflect</span></span>
<span class="line"><span style="color:#BDC4CC;">    // objects be fabricated for each reflective call on Class</span></span>
<span class="line"><span style="color:#BDC4CC;">    // objects.)</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (</span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">.root </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">        throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> IllegalArgumentException</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;Can not copy a non-root Constructor&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    Constructor</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">res</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#F0F3F6;"> Constructor&lt;&gt;(clazz,</span></span>
<span class="line"><span style="color:#F0F3F6;">                                           parameterTypes,</span></span>
<span class="line"><span style="color:#F0F3F6;">                                           exceptionTypes, modifiers, slot,</span></span>
<span class="line"><span style="color:#F0F3F6;">                                           signature,</span></span>
<span class="line"><span style="color:#F0F3F6;">                                           annotations,</span></span>
<span class="line"><span style="color:#F0F3F6;">                                           parameterAnnotations);</span></span>
<span class="line"><span style="color:#BDC4CC;">    // root 指向当前 constructor</span></span>
<span class="line"><span style="color:#F0F3F6;">    res.root </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> this</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#BDC4CC;">    // Might as well eagerly propagate this if already present</span></span>
<span class="line"><span style="color:#F0F3F6;">    res.constructorAccessor </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> constructorAccessor;</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>通过上面，获取到<code>Constructor</code>了。</p><p>接下来就只需调用其相应构造器的<code>newInstance()</code>，即返回实例了。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// return tmpConstructor.newInstance((Object[])null); </span></span>
<span class="line"><span style="color:#BDC4CC;">// java.lang.reflect.Constructor</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">CallerSensitive</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> T </span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(Object ... initargs)</span></span>
<span class="line"><span style="color:#F0F3F6;">    throws InstantiationException, IllegalAccessException,</span></span>
<span class="line"><span style="color:#F0F3F6;">           IllegalArgumentException, InvocationTargetException</span></span>
<span class="line"><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">override) {</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">Reflection.</span><span style="color:#DBB7FF;">quickCheckMemberAccess</span><span style="color:#F0F3F6;">(clazz, modifiers)) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">caller</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Reflection.</span><span style="color:#DBB7FF;">getCallerClass</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#DBB7FF;">            checkAccess</span><span style="color:#F0F3F6;">(caller, clazz, </span><span style="color:#91CBFF;">null</span><span style="color:#F0F3F6;">, modifiers);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> ((clazz.</span><span style="color:#DBB7FF;">getModifiers</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">&amp;</span><span style="color:#F0F3F6;"> Modifier.ENUM) </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">        throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> IllegalArgumentException</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;Cannot reflectively create enum objects&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">    ConstructorAccessor</span><span style="color:#F0F3F6;"> ca</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> constructorAccessor;   </span><span style="color:#BDC4CC;">// read volatile</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (ca </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        ca </span><span style="color:#FF9492;">=</span><span style="color:#DBB7FF;"> acquireConstructorAccessor</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">SuppressWarnings</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;unchecked&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">    T</span><span style="color:#F0F3F6;"> inst</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (T) ca.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(initargs);</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#F0F3F6;"> inst;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#BDC4CC;">// sun.reflect.DelegatingConstructorAccessorImpl</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] args)</span></span>
<span class="line"><span style="color:#F0F3F6;">  throws InstantiationException,</span></span>
<span class="line"><span style="color:#F0F3F6;">         IllegalArgumentException,</span></span>
<span class="line"><span style="color:#F0F3F6;">         InvocationTargetException</span></span>
<span class="line"><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#F0F3F6;"> delegate.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(args);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#BDC4CC;">// sun.reflect.NativeConstructorAccessorImpl</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] args)</span></span>
<span class="line"><span style="color:#F0F3F6;">    throws InstantiationException,</span></span>
<span class="line"><span style="color:#F0F3F6;">           IllegalArgumentException,</span></span>
<span class="line"><span style="color:#F0F3F6;">           InvocationTargetException</span></span>
<span class="line"><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#BDC4CC;">    // We can&#39;t inflate a constructor belonging to a vm-anonymous class</span></span>
<span class="line"><span style="color:#BDC4CC;">    // because that kind of class can&#39;t be referred to by name, hence can&#39;t</span></span>
<span class="line"><span style="color:#BDC4CC;">    // be found from the generated bytecode.</span></span>
<span class="line"><span style="color:#FF9492;">    if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">numInvocations </span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;"> ReflectionFactory.</span><span style="color:#DBB7FF;">inflationThreshold</span><span style="color:#F0F3F6;">()</span></span>
<span class="line"><span style="color:#FF9492;">            &amp;&amp;</span><span style="color:#FF9492;"> !</span><span style="color:#F0F3F6;">ReflectUtil.</span><span style="color:#DBB7FF;">isVMAnonymousClass</span><span style="color:#F0F3F6;">(c.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">())) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        ConstructorAccessorImpl</span><span style="color:#F0F3F6;"> acc</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (ConstructorAccessorImpl)</span></span>
<span class="line"><span style="color:#FF9492;">            new</span><span style="color:#DBB7FF;"> MethodAccessorGenerator</span><span style="color:#F0F3F6;">().</span></span>
<span class="line"><span style="color:#DBB7FF;">                generateConstructor</span><span style="color:#F0F3F6;">(c.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                    c.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                    c.</span><span style="color:#DBB7FF;">getExceptionTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                    c.</span><span style="color:#DBB7FF;">getModifiers</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">        parent.</span><span style="color:#DBB7FF;">setDelegate</span><span style="color:#F0F3F6;">(acc);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    // 调用native方法，进行调用 constructor</span></span>
<span class="line"><span style="color:#FF9492;">    return</span><span style="color:#DBB7FF;"> newInstance0</span><span style="color:#F0F3F6;">(c, args);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>返回构造器的实例后，可以根据外部进行进行类型转换，从而使用接口或方法进行调用实例功能了。</p><h3 id="反射获取方法" tabindex="-1"><a class="header-anchor" href="#反射获取方法"><span>反射获取方法</span></a></h3><p>第一步，先获取<code>Method</code>;</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// java.lang.Class</span></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">CallerSensitive</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> Method </span><span style="color:#DBB7FF;">getDeclaredMethod</span><span style="color:#F0F3F6;">(String name, Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">... parameterTypes)</span></span>
<span class="line"><span style="color:#F0F3F6;">		throws NoSuchMethodException, SecurityException {</span></span>
<span class="line"><span style="color:#DBB7FF;">		checkMemberAccess</span><span style="color:#F0F3F6;">(Member.DECLARED, Reflection.</span><span style="color:#DBB7FF;">getCallerClass</span><span style="color:#F0F3F6;">(), </span><span style="color:#91CBFF;">true</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		Method</span><span style="color:#F0F3F6;"> method</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> searchMethods</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">privateGetDeclaredMethods</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">), name, parameterTypes);</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (method </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">				throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> NoSuchMethodException</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;.&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> name </span><span style="color:#FF9492;">+</span><span style="color:#DBB7FF;"> argumentTypesToString</span><span style="color:#F0F3F6;">(parameterTypes));</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> method;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>忽略第一个检查权限，剩下就只有两个动作了。</p><ol><li>获取所有方法列表；</li><li>根据方法名称和方法列表，选出符合要求的方法；</li><li>如果没有找到相应方法，抛出异常，否则返回对应方法；</li></ol><p>所以，先看一下怎样获取类声明的所有方法？</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// Returns an array of &quot;root&quot; methods. These Method objects must NOT</span></span>
<span class="line"><span style="color:#BDC4CC;">// be propagated to the outside world, but must instead be copied</span></span>
<span class="line"><span style="color:#BDC4CC;">// via ReflectionFactory.copyMethod.</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#FF9492;"> Method</span><span style="color:#F0F3F6;">[] </span><span style="color:#DBB7FF;">privateGetDeclaredMethods</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">boolean</span><span style="color:#F0F3F6;"> publicOnly) {</span></span>
<span class="line"><span style="color:#DBB7FF;">		checkInitted</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		Method</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">res;</span></span>
<span class="line"><span style="color:#F0F3F6;">		ReflectionData</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">T</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">rd</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> reflectionData</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (rd </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				res </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> publicOnly </span><span style="color:#FF9492;">?</span><span style="color:#F0F3F6;"> rd.declaredPublicMethods </span><span style="color:#FF9492;">:</span><span style="color:#F0F3F6;"> rd.declaredMethods;</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (res </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">return</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#BDC4CC;">		// No cached value available; request value from VM</span></span>
<span class="line"><span style="color:#F0F3F6;">		res </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> Reflection.</span><span style="color:#DBB7FF;">filterMethods</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">, </span><span style="color:#DBB7FF;">getDeclaredMethods0</span><span style="color:#F0F3F6;">(publicOnly));</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (rd </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (publicOnly) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						rd.declaredPublicMethods </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">				} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">						rd.declaredMethods </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>很相似，和获取所有构造器的方法很相似，都是先从缓存中获取方法，如果没有，则从 jvm 中获取。</p><p>不同的是，方法列表需要进行过滤<code>Reflection.filterMethods;</code>当然后面看来，这个方法我们一般不会派上用场。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// sun.misc.Reflection</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> Method</span><span style="color:#F0F3F6;">[] </span><span style="color:#DBB7FF;">filterMethods</span><span style="color:#F0F3F6;">(Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;"> containingClass, </span><span style="color:#FF9492;">Method</span><span style="color:#F0F3F6;">[] methods) {</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (methodFilterMap </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">				// Bootstrapping</span></span>
<span class="line"><span style="color:#FF9492;">				return</span><span style="color:#F0F3F6;"> methods;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">Method</span><span style="color:#F0F3F6;">[])</span><span style="color:#DBB7FF;">filter</span><span style="color:#F0F3F6;">(methods, methodFilterMap.</span><span style="color:#DBB7FF;">get</span><span style="color:#F0F3F6;">(containingClass));</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#BDC4CC;">// 可以过滤指定的方法，一般为空，如果要指定过滤，可以调用 registerMethodsToFilter(), 或者...</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> Member</span><span style="color:#F0F3F6;">[] </span><span style="color:#DBB7FF;">filter</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">Member</span><span style="color:#F0F3F6;">[] members, </span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] filteredNames) {</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> ((filteredNames </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">||</span><span style="color:#F0F3F6;"> (members.length </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">)) {</span></span>
<span class="line"><span style="color:#FF9492;">				return</span><span style="color:#F0F3F6;"> members;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		int</span><span style="color:#F0F3F6;"> numNewMembers</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">		for</span><span style="color:#F0F3F6;"> (Member</span><span style="color:#F0F3F6;"> member</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> members) {</span></span>
<span class="line"><span style="color:#FF9492;">				boolean</span><span style="color:#F0F3F6;"> shouldSkip</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> false</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">				for</span><span style="color:#F0F3F6;"> (String</span><span style="color:#F0F3F6;"> filteredName</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> filteredNames) {</span></span>
<span class="line"><span style="color:#FF9492;">						if</span><span style="color:#F0F3F6;"> (member.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> filteredName) {</span></span>
<span class="line"><span style="color:#F0F3F6;">								shouldSkip </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> true</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">								break</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">						}</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">shouldSkip) {</span></span>
<span class="line"><span style="color:#FF9492;">						++</span><span style="color:#F0F3F6;">numNewMembers;</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		Member</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">newMembers</span><span style="color:#FF9492;"> =</span></span>
<span class="line"><span style="color:#F0F3F6;">				(</span><span style="color:#FF9492;">Member</span><span style="color:#F0F3F6;">[])Array.</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">(members[</span><span style="color:#91CBFF;">0</span><span style="color:#F0F3F6;">].</span><span style="color:#DBB7FF;">getClass</span><span style="color:#F0F3F6;">(), numNewMembers);</span></span>
<span class="line"><span style="color:#FF9492;">		int</span><span style="color:#F0F3F6;"> destIdx</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">		for</span><span style="color:#F0F3F6;"> (Member</span><span style="color:#F0F3F6;"> member</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> members) {</span></span>
<span class="line"><span style="color:#FF9492;">				boolean</span><span style="color:#F0F3F6;"> shouldSkip</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> false</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">				for</span><span style="color:#F0F3F6;"> (String</span><span style="color:#F0F3F6;"> filteredName</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> filteredNames) {</span></span>
<span class="line"><span style="color:#FF9492;">						if</span><span style="color:#F0F3F6;"> (member.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> filteredName) {</span></span>
<span class="line"><span style="color:#F0F3F6;">								shouldSkip </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> true</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">								break</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">						}</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">shouldSkip) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						newMembers[destIdx</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> member;</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> newMembers;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>第二步，根据方法名和参数类型过滤指定方法返回：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">private</span><span style="color:#FF9492;"> static</span><span style="color:#F0F3F6;"> Method </span><span style="color:#DBB7FF;">searchMethods</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">Method</span><span style="color:#F0F3F6;">[] methods,	String name, Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">[] parameterTypes) {</span></span>
<span class="line"><span style="color:#F0F3F6;">		Method</span><span style="color:#F0F3F6;"> res</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#BDC4CC;">		// 使用常量池，避免重复创建String</span></span>
<span class="line"><span style="color:#F0F3F6;">		String</span><span style="color:#F0F3F6;"> internedName</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> name.</span><span style="color:#DBB7FF;">intern</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		for</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">int</span><span style="color:#F0F3F6;"> i</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">; i </span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;"> methods.length; i</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				Method</span><span style="color:#F0F3F6;"> m</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> methods[i];</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (m.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">==</span><span style="color:#F0F3F6;"> internedName</span></span>
<span class="line"><span style="color:#FF9492;">						&amp;&amp;</span><span style="color:#DBB7FF;"> arrayContentsEq</span><span style="color:#F0F3F6;">(parameterTypes, m.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">())</span></span>
<span class="line"><span style="color:#FF9492;">						&amp;&amp;</span><span style="color:#F0F3F6;"> (res </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span></span>
<span class="line"><span style="color:#FF9492;">								||</span><span style="color:#F0F3F6;"> res.</span><span style="color:#DBB7FF;">getReturnType</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">isAssignableFrom</span><span style="color:#F0F3F6;">(m.</span><span style="color:#DBB7FF;">getReturnType</span><span style="color:#F0F3F6;">())))</span></span>
<span class="line"><span style="color:#F0F3F6;">						res </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> m;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> (res </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#FF9492;"> ?</span><span style="color:#F0F3F6;"> res </span><span style="color:#FF9492;">:</span><span style="color:#DBB7FF;"> getReflectionFactory</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">copyMethod</span><span style="color:#F0F3F6;">(res));</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>大概意思看得明白，就是匹配到方法名，然后参数类型匹配，才可以。但是可以看到，匹配到一个方法，并没有退出<code>for</code>循环，而是继续进行匹配。这里是匹配最精确的子类进行返回（最优匹配）最后，还是通过<code>ReflectionFactory, copy</code>方法后返回。</p><h3 id="调用-method-invoke-方法" tabindex="-1"><a class="header-anchor" href="#调用-method-invoke-方法"><span>调用 method.invoke() 方法</span></a></h3><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">CallerSensitive</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(Object obj, Object... args)</span></span>
<span class="line"><span style="color:#F0F3F6;">		throws IllegalAccessException, IllegalArgumentException,</span></span>
<span class="line"><span style="color:#F0F3F6;">			 InvocationTargetException</span></span>
<span class="line"><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">override) {</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#F0F3F6;">Reflection.</span><span style="color:#DBB7FF;">quickCheckMemberAccess</span><span style="color:#F0F3F6;">(clazz, modifiers)) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">caller</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> Reflection.</span><span style="color:#DBB7FF;">getCallerClass</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#DBB7FF;">						checkAccess</span><span style="color:#F0F3F6;">(caller, clazz, obj, modifiers);</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		MethodAccessor</span><span style="color:#F0F3F6;"> ma</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> methodAccessor;             </span><span style="color:#BDC4CC;">// read volatile</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (ma </span><span style="color:#FF9492;">==</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				ma </span><span style="color:#FF9492;">=</span><span style="color:#DBB7FF;"> acquireMethodAccessor</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> ma.</span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(obj, args);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p><code>invoke</code>时，是通过<code>MethodAccessor</code>进行调用的，而<code>MethodAccessor</code>是个接口，在第一次时调用<code>acquireMethodAccessor()</code>进行新创建。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// probably make the implementation more scalable.</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#F0F3F6;"> MethodAccessor </span><span style="color:#DBB7FF;">acquireMethodAccessor</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#BDC4CC;">		// First check to see if one has been created yet, and take it</span></span>
<span class="line"><span style="color:#BDC4CC;">		// if so</span></span>
<span class="line"><span style="color:#F0F3F6;">		MethodAccessor</span><span style="color:#F0F3F6;"> tmp</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (root </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) tmp </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> root.</span><span style="color:#DBB7FF;">getMethodAccessor</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (tmp </span><span style="color:#FF9492;">!=</span><span style="color:#91CBFF;"> null</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#BDC4CC;">				// 存在缓存时，存入 methodAccessor，否则调用 ReflectionFactory 创建新的 MethodAccessor</span></span>
<span class="line"><span style="color:#F0F3F6;">				methodAccessor </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> tmp;</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">				// Otherwise fabricate one and propagate it up to the root</span></span>
<span class="line"><span style="color:#F0F3F6;">				tmp </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> reflectionFactory.</span><span style="color:#DBB7FF;">newMethodAccessor</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">this</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#DBB7FF;">				setMethodAccessor</span><span style="color:#F0F3F6;">(tmp);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> tmp;</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#BDC4CC;">// sun.reflect.ReflectionFactory</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> MethodAccessor </span><span style="color:#DBB7FF;">newMethodAccessor</span><span style="color:#F0F3F6;">(Method method) {</span></span>
<span class="line"><span style="color:#DBB7FF;">		checkInitted</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (noInflation </span><span style="color:#FF9492;">&amp;&amp;</span><span style="color:#FF9492;"> !</span><span style="color:#F0F3F6;">ReflectUtil.</span><span style="color:#DBB7FF;">isVMAnonymousClass</span><span style="color:#F0F3F6;">(method.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">())) {</span></span>
<span class="line"><span style="color:#FF9492;">				return</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> MethodAccessorGenerator</span><span style="color:#F0F3F6;">().</span></span>
<span class="line"><span style="color:#DBB7FF;">						generateMethod</span><span style="color:#F0F3F6;">(method.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">													 method.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">													 method.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">													 method.</span><span style="color:#DBB7FF;">getReturnType</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">													 method.</span><span style="color:#DBB7FF;">getExceptionTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">													 method.</span><span style="color:#DBB7FF;">getModifiers</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">				NativeMethodAccessorImpl</span><span style="color:#F0F3F6;"> acc</span><span style="color:#FF9492;"> =</span></span>
<span class="line"><span style="color:#FF9492;">						new</span><span style="color:#DBB7FF;"> NativeMethodAccessorImpl</span><span style="color:#F0F3F6;">(method);</span></span>
<span class="line"><span style="color:#F0F3F6;">				DelegatingMethodAccessorImpl</span><span style="color:#F0F3F6;"> res</span><span style="color:#FF9492;"> =</span></span>
<span class="line"><span style="color:#FF9492;">						new</span><span style="color:#DBB7FF;"> DelegatingMethodAccessorImpl</span><span style="color:#F0F3F6;">(acc);</span></span>
<span class="line"><span style="color:#F0F3F6;">				acc.</span><span style="color:#DBB7FF;">setParent</span><span style="color:#F0F3F6;">(res);</span></span>
<span class="line"><span style="color:#FF9492;">				return</span><span style="color:#F0F3F6;"> res;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>两个<code>Accessor</code>详情：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">//     NativeMethodAccessorImpl / DelegatingMethodAccessorImpl</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> NativeMethodAccessorImpl</span><span style="color:#FF9492;"> extends</span><span style="color:#91CBFF;"> MethodAccessorImpl</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> final</span><span style="color:#F0F3F6;"> Method</span><span style="color:#F0F3F6;"> method;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> DelegatingMethodAccessorImpl</span><span style="color:#F0F3F6;"> parent;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> int</span><span style="color:#F0F3F6;"> numInvocations;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#DBB7FF;">    NativeMethodAccessorImpl</span><span style="color:#F0F3F6;">(Method </span><span style="color:#FFB757;">method</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.method </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> method;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(Object </span><span style="color:#FFB757;">obj</span><span style="color:#F0F3F6;">, </span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">        throws</span><span style="color:#F0F3F6;"> IllegalArgumentException, InvocationTargetException</span></span>
<span class="line"><span style="color:#F0F3F6;">    {</span></span>
<span class="line"><span style="color:#BDC4CC;">        // We can&#39;t inflate methods belonging to vm-anonymous classes because</span></span>
<span class="line"><span style="color:#BDC4CC;">        // that kind of class can&#39;t be referred to by name, hence can&#39;t be</span></span>
<span class="line"><span style="color:#BDC4CC;">        // found from the generated bytecode.</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">numInvocations </span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;"> ReflectionFactory.</span><span style="color:#DBB7FF;">inflationThreshold</span><span style="color:#F0F3F6;">()</span></span>
<span class="line"><span style="color:#FF9492;">                &amp;&amp;</span><span style="color:#FF9492;"> !</span><span style="color:#F0F3F6;">ReflectUtil.</span><span style="color:#DBB7FF;">isVMAnonymousClass</span><span style="color:#F0F3F6;">(method.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">())) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            MethodAccessorImpl</span><span style="color:#F0F3F6;"> acc</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (MethodAccessorImpl)</span></span>
<span class="line"><span style="color:#FF9492;">                new</span><span style="color:#DBB7FF;"> MethodAccessorGenerator</span><span style="color:#F0F3F6;">().</span></span>
<span class="line"><span style="color:#DBB7FF;">                    generateMethod</span><span style="color:#F0F3F6;">(method.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                   method.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                   method.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                   method.</span><span style="color:#DBB7FF;">getReturnType</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                   method.</span><span style="color:#DBB7FF;">getExceptionTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">                                   method.</span><span style="color:#DBB7FF;">getModifiers</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">            parent.</span><span style="color:#DBB7FF;">setDelegate</span><span style="color:#F0F3F6;">(acc);</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#DBB7FF;"> invoke0</span><span style="color:#F0F3F6;">(method, obj, args);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    void</span><span style="color:#DBB7FF;"> setParent</span><span style="color:#F0F3F6;">(DelegatingMethodAccessorImpl </span><span style="color:#FFB757;">parent</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.parent </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> parent;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> native</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">invoke0</span><span style="color:#F0F3F6;">(Method </span><span style="color:#FFB757;">m</span><span style="color:#F0F3F6;">, Object </span><span style="color:#FFB757;">obj</span><span style="color:#F0F3F6;">, </span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> DelegatingMethodAccessorImpl</span><span style="color:#FF9492;"> extends</span><span style="color:#91CBFF;"> MethodAccessorImpl</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> MethodAccessorImpl</span><span style="color:#F0F3F6;"> delegate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#DBB7FF;">    DelegatingMethodAccessorImpl</span><span style="color:#F0F3F6;">(MethodAccessorImpl </span><span style="color:#FFB757;">delegate</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#DBB7FF;">        setDelegate</span><span style="color:#F0F3F6;">(delegate);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(Object </span><span style="color:#FFB757;">obj</span><span style="color:#F0F3F6;">, </span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">        throws</span><span style="color:#F0F3F6;"> IllegalArgumentException, InvocationTargetException</span></span>
<span class="line"><span style="color:#F0F3F6;">    {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> delegate.</span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(obj, args);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    void</span><span style="color:#DBB7FF;"> setDelegate</span><span style="color:#F0F3F6;">(MethodAccessorImpl </span><span style="color:#FFB757;">delegate</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.delegate </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> delegate;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>进行<code>ma.invoke(obj, args);</code>调用时，调用<code>DelegatingMethodAccessorImpl.invoke();</code>最后被委托到<code>NativeMethodAccessorImpl.invoke()</code>，即：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> Object </span><span style="color:#DBB7FF;">invoke</span><span style="color:#F0F3F6;">(Object obj, </span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[] args) throws IllegalArgumentException, InvocationTargetException {</span></span>
<span class="line"><span style="color:#BDC4CC;">		// We can&#39;t inflate methods belonging to vm-anonymous classes because</span></span>
<span class="line"><span style="color:#BDC4CC;">		// that kind of class can&#39;t be referred to by name, hence can&#39;t be</span></span>
<span class="line"><span style="color:#BDC4CC;">		// found from the generated bytecode.</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">numInvocations </span><span style="color:#FF9492;">&gt;</span><span style="color:#F0F3F6;"> ReflectionFactory.</span><span style="color:#DBB7FF;">inflationThreshold</span><span style="color:#F0F3F6;">()</span></span>
<span class="line"><span style="color:#FF9492;">						&amp;&amp;</span><span style="color:#FF9492;"> !</span><span style="color:#F0F3F6;">ReflectUtil.</span><span style="color:#DBB7FF;">isVMAnonymousClass</span><span style="color:#F0F3F6;">(method.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">())) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				MethodAccessorImpl</span><span style="color:#F0F3F6;"> acc</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (MethodAccessorImpl)</span></span>
<span class="line"><span style="color:#FF9492;">						new</span><span style="color:#DBB7FF;"> MethodAccessorGenerator</span><span style="color:#F0F3F6;">().</span></span>
<span class="line"><span style="color:#DBB7FF;">								generateMethod</span><span style="color:#F0F3F6;">(method.</span><span style="color:#DBB7FF;">getDeclaringClass</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">															 method.</span><span style="color:#DBB7FF;">getName</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">															 method.</span><span style="color:#DBB7FF;">getParameterTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">															 method.</span><span style="color:#DBB7FF;">getReturnType</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">															 method.</span><span style="color:#DBB7FF;">getExceptionTypes</span><span style="color:#F0F3F6;">(),</span></span>
<span class="line"><span style="color:#F0F3F6;">															 method.</span><span style="color:#DBB7FF;">getModifiers</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">				parent.</span><span style="color:#DBB7FF;">setDelegate</span><span style="color:#F0F3F6;">(acc);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// invoke0 是个 native 方法，由jvm进行调用业务方法。从而完成反射调用功能。</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#DBB7FF;"> invoke0</span><span style="color:#F0F3F6;">(method, obj, args);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>其中，<code>generateMethod()</code>是生成具体类的方法：</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">/** This routine is not thread-safe */</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#F0F3F6;"> MethodAccessor </span><span style="color:#DBB7FF;">generateMethod</span><span style="color:#F0F3F6;">(Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;"> declaringClass,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 String   name,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">[] parameterTypes,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">   returnType,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">[] checkedExceptions,</span></span>
<span class="line"><span style="color:#FF9492;">																		 int</span><span style="color:#F0F3F6;"> modifiers)</span></span>
<span class="line"><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> (MethodAccessor) </span><span style="color:#DBB7FF;">generate</span><span style="color:#F0F3F6;">(declaringClass,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 name,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 parameterTypes,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 returnType,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 checkedExceptions,</span></span>
<span class="line"><span style="color:#F0F3F6;">																		 modifiers,</span></span>
<span class="line"><span style="color:#91CBFF;">																		 false</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#91CBFF;">																		 false</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#91CBFF;">																		 null</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p><code>generate()</code>详情。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">/** This routine is not thread-safe */</span></span>
<span class="line"><span style="color:#FF9492;">private</span><span style="color:#F0F3F6;"> MagicAccessorImpl </span><span style="color:#DBB7FF;">generate</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">final</span><span style="color:#F0F3F6;"> Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;"> declaringClass,</span></span>
<span class="line"><span style="color:#F0F3F6;">																	 String name,</span></span>
<span class="line"><span style="color:#F0F3F6;">																	 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">[] parameterTypes,</span></span>
<span class="line"><span style="color:#F0F3F6;">																	 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">   returnType,</span></span>
<span class="line"><span style="color:#F0F3F6;">																	 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;">[] checkedExceptions,</span></span>
<span class="line"><span style="color:#FF9492;">																	 int</span><span style="color:#F0F3F6;"> modifiers,</span></span>
<span class="line"><span style="color:#FF9492;">																	 boolean</span><span style="color:#F0F3F6;"> isConstructor,</span></span>
<span class="line"><span style="color:#FF9492;">																	 boolean</span><span style="color:#F0F3F6;"> forSerialization,</span></span>
<span class="line"><span style="color:#F0F3F6;">																	 Class</span><span style="color:#FF9492;">&lt;?&gt;</span><span style="color:#F0F3F6;"> serializationTargetClass)</span></span>
<span class="line"><span style="color:#F0F3F6;">{</span></span>
<span class="line"><span style="color:#F0F3F6;">		ByteVector</span><span style="color:#F0F3F6;"> vec</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> ByteVectorFactory.</span><span style="color:#DBB7FF;">create</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm </span><span style="color:#FF9492;">=</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> ClassFileAssembler</span><span style="color:#F0F3F6;">(vec);</span></span>
<span class="line"><span style="color:#91CBFF;">		this</span><span style="color:#F0F3F6;">.declaringClass </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> declaringClass;</span></span>
<span class="line"><span style="color:#91CBFF;">		this</span><span style="color:#F0F3F6;">.parameterTypes </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> parameterTypes;</span></span>
<span class="line"><span style="color:#91CBFF;">		this</span><span style="color:#F0F3F6;">.returnType </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> returnType;</span></span>
<span class="line"><span style="color:#91CBFF;">		this</span><span style="color:#F0F3F6;">.modifiers </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> modifiers;</span></span>
<span class="line"><span style="color:#91CBFF;">		this</span><span style="color:#F0F3F6;">.isConstructor </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> isConstructor;</span></span>
<span class="line"><span style="color:#91CBFF;">		this</span><span style="color:#F0F3F6;">.forSerialization </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> forSerialization;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitMagicAndVersion</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">		short</span><span style="color:#F0F3F6;"> numCPEntries</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> NUM_BASE_CPOOL_ENTRIES </span><span style="color:#FF9492;">+</span><span style="color:#F0F3F6;"> NUM_COMMON_CPOOL_ENTRIES;</span></span>
<span class="line"><span style="color:#FF9492;">		boolean</span><span style="color:#F0F3F6;"> usesPrimitives</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> usesPrimitiveTypes</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (usesPrimitives) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				numCPEntries </span><span style="color:#FF9492;">+=</span><span style="color:#F0F3F6;"> NUM_BOXING_CPOOL_ENTRIES;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (forSerialization) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				numCPEntries </span><span style="color:#FF9492;">+=</span><span style="color:#F0F3F6;"> NUM_SERIALIZATION_CPOOL_ENTRIES;</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Add in variable-length number of entries to be able to describe</span></span>
<span class="line"><span style="color:#BDC4CC;">		// non-primitive parameter types and checked exceptions.</span></span>
<span class="line"><span style="color:#F0F3F6;">		numCPEntries </span><span style="color:#FF9492;">+=</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">short</span><span style="color:#F0F3F6;">) (</span><span style="color:#91CBFF;">2</span><span style="color:#FF9492;"> *</span><span style="color:#DBB7FF;"> numNonPrimitiveParameterTypes</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">add</span><span style="color:#F0F3F6;">(numCPEntries, S1));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">		final</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> generatedName</span><span style="color:#FF9492;"> =</span><span style="color:#DBB7FF;"> generateName</span><span style="color:#F0F3F6;">(isConstructor, forSerialization);</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(generatedName);</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolClass</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">		thisClass </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (isConstructor) {</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (forSerialization) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						asm.emitConstantPoolUTF8</span></span>
<span class="line"><span style="color:#F0F3F6;">								(</span><span style="color:#ADDCFF;">&quot;sun/reflect/SerializationConstructorAccessorImpl&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">				} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">						asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;sun/reflect/ConstructorAccessorImpl&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;sun/reflect/MethodAccessorImpl&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolClass</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">		superClass </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">getClassName</span><span style="color:#F0F3F6;">(declaringClass, </span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolClass</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">		targetClass </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		short</span><span style="color:#F0F3F6;"> serializationTargetClassIdx</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">short</span><span style="color:#F0F3F6;">) </span><span style="color:#91CBFF;">0</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (forSerialization) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">getClassName</span><span style="color:#F0F3F6;">(serializationTargetClass, </span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolClass</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">				serializationTargetClassIdx </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(name);</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">buildInternalSignature</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitConstantPoolNameAndType</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">sub</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">(), S1), asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (</span><span style="color:#DBB7FF;">isInterface</span><span style="color:#F0F3F6;">()) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolInterfaceMethodref</span><span style="color:#F0F3F6;">(targetClass, asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (forSerialization) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						asm.</span><span style="color:#DBB7FF;">emitConstantPoolMethodref</span><span style="color:#F0F3F6;">(serializationTargetClassIdx, asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">				} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">						asm.</span><span style="color:#DBB7FF;">emitConstantPoolMethodref</span><span style="color:#F0F3F6;">(targetClass, asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		targetMethodRef </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (isConstructor) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;newInstance&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;invoke&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		invokeIdx </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (isConstructor) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;([Ljava/lang/Object;)Ljava/lang/Object;&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		} </span><span style="color:#FF9492;">else</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">				asm.emitConstantPoolUTF8</span></span>
<span class="line"><span style="color:#F0F3F6;">						(</span><span style="color:#ADDCFF;">&quot;(Ljava/lang/Object;[Ljava/lang/Object;)Ljava/lang/Object;&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"><span style="color:#F0F3F6;">		invokeDescriptorIdx </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Output class information for non-primitive parameter types</span></span>
<span class="line"><span style="color:#F0F3F6;">		nonPrimitiveParametersBaseIdx </span><span style="color:#FF9492;">=</span><span style="color:#DBB7FF;"> add</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">(), S2);</span></span>
<span class="line"><span style="color:#FF9492;">		for</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">int</span><span style="color:#F0F3F6;"> i</span><span style="color:#FF9492;"> =</span><span style="color:#91CBFF;"> 0</span><span style="color:#F0F3F6;">; i </span><span style="color:#FF9492;">&lt;</span><span style="color:#F0F3F6;"> parameterTypes.length; i</span><span style="color:#FF9492;">++</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">				Class</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">?</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">c</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> parameterTypes[i];</span></span>
<span class="line"><span style="color:#FF9492;">				if</span><span style="color:#F0F3F6;"> (</span><span style="color:#FF9492;">!</span><span style="color:#DBB7FF;">isPrimitive</span><span style="color:#F0F3F6;">(c)) {</span></span>
<span class="line"><span style="color:#F0F3F6;">						asm.</span><span style="color:#DBB7FF;">emitConstantPoolUTF8</span><span style="color:#F0F3F6;">(</span><span style="color:#DBB7FF;">getClassName</span><span style="color:#F0F3F6;">(c, </span><span style="color:#91CBFF;">false</span><span style="color:#F0F3F6;">));</span></span>
<span class="line"><span style="color:#F0F3F6;">						asm.</span><span style="color:#DBB7FF;">emitConstantPoolClass</span><span style="color:#F0F3F6;">(asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">				}</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Entries common to FieldAccessor, MethodAccessor and ConstructorAccessor</span></span>
<span class="line"><span style="color:#DBB7FF;">		emitCommonConstantPoolEntries</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Boxing entries</span></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (usesPrimitives) {</span></span>
<span class="line"><span style="color:#DBB7FF;">				emitBoxingContantPoolEntries</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">		if</span><span style="color:#F0F3F6;"> (asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">!=</span><span style="color:#F0F3F6;"> numCPEntries) {</span></span>
<span class="line"><span style="color:#FF9492;">				throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> InternalError</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;Adjust this code (cpi = &quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> asm.</span><span style="color:#DBB7FF;">cpi</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">																&quot;, numCPEntries = &quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> numCPEntries </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;)&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Access flags</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(ACC_PUBLIC);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// This class</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(thisClass);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Superclass</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(superClass);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Interfaces count and interfaces</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(S0);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Fields count and fields</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(S0);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Methods count and methods</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(NUM_METHODS);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#DBB7FF;">		emitConstructor</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#DBB7FF;">		emitInvoke</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Additional attributes (none)</span></span>
<span class="line"><span style="color:#F0F3F6;">		asm.</span><span style="color:#DBB7FF;">emitShort</span><span style="color:#F0F3F6;">(S0);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">		// Load class</span></span>
<span class="line"><span style="color:#F0F3F6;">		vec.</span><span style="color:#DBB7FF;">trim</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#FF9492;">		final</span><span style="color:#FF9492;"> byte</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">bytes</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> vec.</span><span style="color:#DBB7FF;">getData</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#BDC4CC;">		// Note: the class loader is the only thing that really matters</span></span>
<span class="line"><span style="color:#BDC4CC;">		// here -- it&#39;s important to get the generated code into the</span></span>
<span class="line"><span style="color:#BDC4CC;">		// same namespace as the target class. Since the generated code</span></span>
<span class="line"><span style="color:#BDC4CC;">		// is privileged anyway, the protection domain probably doesn&#39;t</span></span>
<span class="line"><span style="color:#BDC4CC;">		// matter.</span></span>
<span class="line"><span style="color:#FF9492;">		return</span><span style="color:#F0F3F6;"> AccessController.</span><span style="color:#DBB7FF;">doPrivileged</span><span style="color:#F0F3F6;">(</span></span>
<span class="line"><span style="color:#FF9492;">				new</span><span style="color:#F0F3F6;"> PrivilegedAction&lt;</span><span style="color:#FF9492;">MagicAccessorImpl</span><span style="color:#F0F3F6;">&gt;() {</span></span>
<span class="line"><span style="color:#FF9492;">						public</span><span style="color:#F0F3F6;"> MagicAccessorImpl </span><span style="color:#DBB7FF;">run</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">										try</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">										return</span><span style="color:#F0F3F6;"> (MagicAccessorImpl)</span></span>
<span class="line"><span style="color:#F0F3F6;">										ClassDefiner.defineClass</span></span>
<span class="line"><span style="color:#F0F3F6;">														(generatedName,</span></span>
<span class="line"><span style="color:#F0F3F6;">														 bytes,</span></span>
<span class="line"><span style="color:#91CBFF;">														 0</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#F0F3F6;">														 bytes.length,</span></span>
<span class="line"><span style="color:#F0F3F6;">														 declaringClass.</span><span style="color:#DBB7FF;">getClassLoader</span><span style="color:#F0F3F6;">()).</span><span style="color:#DBB7FF;">newInstance</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">										} </span><span style="color:#FF9492;">catch</span><span style="color:#F0F3F6;"> (InstantiationException | IllegalAccessException </span><span style="color:#FFB757;">e</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">												throw</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> InternalError</span><span style="color:#F0F3F6;">(e);</span></span>
<span class="line"><span style="color:#F0F3F6;">										}</span></span>
<span class="line"><span style="color:#F0F3F6;">								}</span></span>
<span class="line"><span style="color:#F0F3F6;">						});</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>主要看这一句：<code>ClassDefiner.defineClass(xx, declaringClass.getClassLoader()).newInstance();</code>。</p><p>在<code>ClassDefiner.defineClass</code>方法实现中，每被调用一次都会生成一个<code>DelegatingClassLoader</code>类加载器对象 ，这里每次都生成新的类加载器，是为了性能考虑，在某些情况下可以卸载这些生成的类，因为类的卸载是只有在类加载器可以被回收的情况下才会被回收的，如果用了原来的类加载器，那可能导致这些新创建的类一直无法被卸载。</p><p>而反射生成的类，有时候可能用了就可以卸载了，所以使用其独立的类加载器，从而使得更容易控制反射类的生命周期。</p><h3 id="反射调用流程小结" tabindex="-1"><a class="header-anchor" href="#反射调用流程小结"><span>反射调用流程小结</span></a></h3><p>最后，用几句话总结反射的实现原理：</p><ul><li>反射类及反射方法的获取，都是通过从列表中搜寻查找匹配的方法，所以查找性能会随类的大小方法多少而变化；</li><li>每个类都会有一个与之对应的<code>Class</code>实例，从而每个类都可以获取<code>method</code>反射方法，并作用到其他实例身上；</li><li>反射也是考虑了线程安全的，放心使用；</li><li>反射使用软引用<code>relectionData</code>缓存<code>class</code>信息，避免每次重新从 jvm 获取带来的开销；</li><li>反射调用多次生成新代理<code>Accessor</code>, 而通过字节码生存的则考虑了卸载功能，所以会使用独立的类加载器；</li><li>当找到需要的方法，都会<code>copy</code>一份出来，而不是使用原来的实例，从而保证数据隔离；</li><li>调度反射方法，最终是由 jvm 执行<code>invoke0()</code>执行；</li></ul>`,121))])}const B=l(c,[["render",r],["__file","Java基础—反射机制.html.vue"]]),C=JSON.parse('{"path":"/java/java%E5%9F%BA%E7%A1%80/Java%E5%9F%BA%E7%A1%80%E2%80%94%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6.html","title":"","lang":"zh-CN","frontmatter":{"description":"JAVA 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为 java 语言的反射机制。 反射基础 RTTI（Run-Time Type Identification）运行时类型识别。其作用是在运行时识别一个对象的类型和类的信息...","head":[["meta",{"property":"og:url","content":"https://wsq01.github.io/wsq-blog/java/java%E5%9F%BA%E7%A1%80/Java%E5%9F%BA%E7%A1%80%E2%80%94%E5%8F%8D%E5%B0%84%E6%9C%BA%E5%88%B6.html"}],["meta",{"property":"og:description","content":"JAVA 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为 java 语言的反射机制。 反射基础 RTTI（Run-Time Type Identification）运行时类型识别。其作用是在运行时识别一个对象的类型和类的信息..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-27T02:39:10.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-27T02:39:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-27T02:39:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://wsq01.github.com\\"}]}"]]},"headers":[{"level":2,"title":"反射基础","slug":"反射基础","link":"#反射基础","children":[{"level":3,"title":"Class类","slug":"class类","link":"#class类","children":[]},{"level":3,"title":"类加载","slug":"类加载","link":"#类加载","children":[]}]},{"level":2,"title":"反射的使用","slug":"反射的使用","link":"#反射的使用","children":[{"level":3,"title":"Class类对象的获取","slug":"class类对象的获取","link":"#class类对象的获取","children":[]},{"level":3,"title":"Constructor类及其用法","slug":"constructor类及其用法","link":"#constructor类及其用法","children":[]},{"level":3,"title":"Field类及其用法","slug":"field类及其用法","link":"#field类及其用法","children":[]},{"level":3,"title":"Method类及其用法","slug":"method类及其用法","link":"#method类及其用法","children":[]}]},{"level":2,"title":"反射机制执行的流程","slug":"反射机制执行的流程","link":"#反射机制执行的流程","children":[{"level":3,"title":"反射获取类实例","slug":"反射获取类实例","link":"#反射获取类实例","children":[]},{"level":3,"title":"反射获取方法","slug":"反射获取方法","link":"#反射获取方法","children":[]},{"level":3,"title":"调用 method.invoke() 方法","slug":"调用-method-invoke-方法","link":"#调用-method-invoke-方法","children":[]},{"level":3,"title":"反射调用流程小结","slug":"反射调用流程小结","link":"#反射调用流程小结","children":[]}]}],"git":{"createdTime":1730426129000,"updatedTime":1745721550000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":30.59,"words":9178},"filePathRelative":"java/java基础/Java基础—反射机制.md","localizedDate":"2024年11月1日","autoDesc":true}');export{B as comp,C as data};
