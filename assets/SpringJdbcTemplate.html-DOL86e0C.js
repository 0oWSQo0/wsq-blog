import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as p,o as l}from"./app-ByvFWdWZ.js";const o={};function e(F,s){return l(),a("div",null,s[0]||(s[0]=[p(`<p>Spring 提供了一个 JDBC 模块，它对 JDBC API 进行了封装，其的主要目的降低 JDBC API 的使用难度，以一种更直接、更简洁的方式使用 JDBC API。</p><p>使用 Spring JDBC，开发人员只需要定义必要的参数、指定需要执行的 SQL 语句，即可轻松的进行 JDBC 编程，对数据库进行访问。</p><p>至于驱动的加载、数据库连接的开启与关闭、SQL 语句的创建与执行、异常处理以及事务处理等繁杂乏味的工作，则都是由 Spring JDBC 完成的。这样就可以使开发人员从繁琐的 JDBC API 中解脱出来，有更多的精力专注于业务的开发。</p><p>Spring JDBC 提供了多个实用的数据库访问工具，以简化 JDBC 的开发，其中使用最多就是 JdbcTemplate。</p><h2 id="jdbctemplate" tabindex="-1"><a class="header-anchor" href="#jdbctemplate"><span>JdbcTemplate</span></a></h2><p>JdbcTemplate 是 Spring JDBC 核心包中的核心类，它可以通过配置文件、注解、Java 配置类等形式获取数据库的相关信息，实现了对 JDBC 开发过程中的驱动加载、连接的开启和关闭、SQL 语句的创建与执行、异常处理、事务处理、数据类型转换等操作的封装。我们只要对其传入SQL 语句和必要的参数即可轻松进行 JDBC 编程。</p><p>JdbcTemplate 的全限定命名为<code>org.springframework.jdbc.core.JdbcTemplate</code>，它提供了大量的查询和更新数据库的方法。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>public int update(String sql)<br>public int update(String sql,Object... args)</td><td>用于执行新增、更新、删除等语句；<br>sql：需要执行的 SQL 语句；<br>args 表示需要传入到 SQL 语句中的参数</td></tr><tr><td>public void execute(String sql)<br>public T execute(String sql, PreparedStatementCallback action)</td><td>可以执行任意 SQL，一般用于执行 DDL 语句；<br>sql：需要执行的 SQL 语句；<br>action 表示执行完 SQL 语句后，要调用的函数</td></tr><tr><td><code>public &lt;T&gt; List&lt;T&gt; query(String sql, RowMapper&lt;T&gt; rowMapper, @Nullable Object... args)</code></td><td>用于执行查询语句；<br>sql：需要执行的 SQL 语句；<br>rowMapper：用于确定返回的集合（List）的类型；<br>args：表示需要传入到 SQL 语句的参数</td></tr><tr><td><code>public &lt;T&gt; T queryForObject(String sql, RowMapper&lt;T&gt; rowMapper, @Nullable Object... args)</code></td><td>同上</td></tr><tr><td><code>public int[] batchUpdate(String sql, List&lt;Object[]&gt; batchArgs, final int[] argTypes)</code></td><td>用于批量执行新增、更新、删除等语句；<br>sql：需要执行的 SQL 语句；<br>argTypes：需要注入的 SQL 参数的 JDBC 类型；<br>batchArgs：表示需要传入到 SQL 语句的参数</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>1.创建一个用户信息（<code>user</code>）表。</p><div class="language-sql" data-highlighter="shiki" data-ext="sql" data-title="sql" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">DROP</span><span style="color:#FF9492;"> TABLE</span><span style="color:#FF9492;"> IF</span><span style="color:#FF9492;"> EXISTS</span><span style="color:#ADDCFF;"> \`user\`</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">CREATE</span><span style="color:#FF9492;"> TABLE</span><span style="color:#F0F3F6;"> \`</span><span style="color:#DBB7FF;">user</span><span style="color:#F0F3F6;">\` (</span></span>
<span class="line"><span style="color:#ADDCFF;">  \`user_id\`</span><span style="color:#FF9492;"> int</span><span style="color:#FF9492;"> NOT NULL</span><span style="color:#F0F3F6;"> AUTO_INCREMENT COMMENT </span><span style="color:#ADDCFF;">&#39;用户 ID&#39;</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#ADDCFF;">  \`user_name\`</span><span style="color:#FF9492;"> varchar</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">255</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">DEFAULT</span><span style="color:#FF9492;"> NULL</span><span style="color:#F0F3F6;"> COMMENT </span><span style="color:#ADDCFF;">&#39;用户名&#39;</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#ADDCFF;">  \`status\`</span><span style="color:#FF9492;"> varchar</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">255</span><span style="color:#F0F3F6;">) </span><span style="color:#FF9492;">DEFAULT</span><span style="color:#FF9492;"> NULL</span><span style="color:#F0F3F6;"> COMMENT </span><span style="color:#ADDCFF;">&#39;用户状态&#39;</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#FF9492;">  PRIMARY KEY</span><span style="color:#F0F3F6;"> (</span><span style="color:#ADDCFF;">\`user_id\`</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">) ENGINE</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">InnoDB AUTO_INCREMENT</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">6</span><span style="color:#FF9492;"> DEFAULT</span><span style="color:#F0F3F6;"> CHARSET</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">utf8;</span></span></code></pre></div><p>2.创建项目引入依赖。</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>spring-beans-5.3.13.RELEASE.jar</span></span>
<span class="line"><span>spring-context-5.3.13.RELEASE.jar</span></span>
<span class="line"><span>spring-core-5.3.13.RELEASE.jar</span></span>
<span class="line"><span>spring-expression-5.3.13.RELEASE.jar</span></span>
<span class="line"><span>commons-logging-1.2.jar</span></span>
<span class="line"><span>spring-jdbc-5.3.13.RELEASE.jar # Spring JDBC 的核心依赖包</span></span>
<span class="line"><span>spring-tx-5.3.13.RELEASE.jar # 用来处理事务和异常的依赖包</span></span>
<span class="line"><span>spring-aop-5.3.13.jar</span></span>
<span class="line"><span>mysql-connector-java-8.0.23.jar # MySQL 提供的 JDBC 驱动包</span></span></code></pre></div><p>3.在 src 目录下创建一个 jdbc.properties，并在该配置文件中对数据库连接信息进行配置。</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>jdbc.driver=com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span>jdbc.url=jdbc:mysql://127.0.0.1:3306/spring_jdbc_db</span></span>
<span class="line"><span>jdbc.username=root</span></span>
<span class="line"><span>jdbc.password=root</span></span></code></pre></div><p>4.在 src 目录下创建一个 XML 配置文件<code>Beans.xml</code>。</p><div class="language-xml" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">&lt;?</span><span style="color:#72F088;">xml</span><span style="color:#91CBFF;"> version</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;1.0&quot;</span><span style="color:#91CBFF;"> encoding</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;UTF-8&quot;</span><span style="color:#F0F3F6;">?&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">beans</span><span style="color:#91CBFF;"> xmlns</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:xsi</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xmlns:context</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">       xsi:schemaLocation</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span style="color:#ADDCFF;">    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd</span></span>
<span class="line"><span style="color:#ADDCFF;">    http://www.springframework.org/schema/context</span></span>
<span class="line"><span style="color:#ADDCFF;">            http://www.springframework.org/schema/context/spring-context.xsd&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--开启组件扫描--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">context:component-scan</span><span style="color:#91CBFF;"> base-package</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;net.biancheng.c&quot;</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">context:component-scan</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--引入 jdbc.properties 中的配置--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">context:property-placeholder</span><span style="color:#91CBFF;"> location</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;classpath:jdbc.properties&quot;</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">context:property-placeholder</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--定义数据源 Bean--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> id</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;dataSource&quot;</span><span style="color:#91CBFF;"> class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;org.springframework.jdbc.datasource.DriverManagerDataSource&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--数据库连接地址--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;url&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;\${jdbc.url}&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--数据库的用户名--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;username&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;\${jdbc.username}&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--数据库的密码--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;password&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;\${jdbc.password}&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--数据库驱动--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;driverClassName&quot;</span><span style="color:#91CBFF;"> value</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;\${jdbc.driver}&quot;</span><span style="color:#F0F3F6;">/&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    &lt;!--定义JdbcTemplate Bean--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">bean</span><span style="color:#91CBFF;"> id</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;jdbcTemplate&quot;</span><span style="color:#91CBFF;"> class</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;org.springframework.jdbc.core.JdbcTemplate&quot;</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#BDC4CC;">        &lt;!--将数据源的 Bean 注入到 JdbcTemplate 中--&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">        &lt;</span><span style="color:#72F088;">property</span><span style="color:#91CBFF;"> name</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;dataSource&quot;</span><span style="color:#91CBFF;"> ref</span><span style="color:#F0F3F6;">=</span><span style="color:#ADDCFF;">&quot;dataSource&quot;</span><span style="color:#F0F3F6;">&gt;&lt;/</span><span style="color:#72F088;">property</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;/</span><span style="color:#72F088;">bean</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">   </span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">beans</span><span style="color:#F0F3F6;">&gt;</span></span></code></pre></div><p>5.创建<code>User</code>的实体类。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.entity;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> User</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> Integer</span><span style="color:#F0F3F6;"> userId;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> userName;</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> String</span><span style="color:#F0F3F6;"> status;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> Integer </span><span style="color:#DBB7FF;">getUserId</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userId;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setUserId</span><span style="color:#F0F3F6;">(Integer </span><span style="color:#FFB757;">userId</span><span style="color:#F0F3F6;">) {</span></span>
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
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">getStatus</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> status;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> setStatus</span><span style="color:#F0F3F6;">(String </span><span style="color:#FFB757;">status</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#91CBFF;">        this</span><span style="color:#F0F3F6;">.status </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> status;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> String </span><span style="color:#DBB7FF;">toString</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#ADDCFF;"> &quot;User{&quot;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;userId=&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userId </span><span style="color:#FF9492;">+</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, userName=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> userName </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &quot;, status=&#39;&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> status </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &#39;</span><span style="color:#FF9492;">\\&#39;</span><span style="color:#ADDCFF;">&#39;</span><span style="color:#FF9492;"> +</span></span>
<span class="line"><span style="color:#ADDCFF;">                &#39;}&#39;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>6.创建<code>UserDao</code>。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.dao;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.entity.User;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> interface</span><span style="color:#FFB757;"> UserDao</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 新增一条用户</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    int</span><span style="color:#DBB7FF;"> addUer</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 更新指定的用户信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    int</span><span style="color:#DBB7FF;"> update</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 删除指定的用户信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    int</span><span style="color:#DBB7FF;"> delete</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 统计用户个数</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    int</span><span style="color:#DBB7FF;"> count</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 查询用户列表</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    List&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#DBB7FF;">getList</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 查询单个用户信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    User </span><span style="color:#DBB7FF;">getUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 批量增加用户</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> batchArgs</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    void</span><span style="color:#DBB7FF;"> batchAddUser</span><span style="color:#F0F3F6;">(List&lt;</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[]&gt; </span><span style="color:#FFB757;">batchArgs</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>7.创建<code>UserDao</code>的实现类<code>UserDaoImpl</code>。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.dao.impl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.dao.UserDao;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.entity.User;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.jdbc.core.BeanPropertyRowMapper;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.jdbc.core.JdbcTemplate;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.jdbc.core.namedparam.MapSqlParameterSource;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.jdbc.core.namedparam.SqlParameterSource;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Repository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Repository</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> UserDaoImpl</span><span style="color:#FF9492;"> implements</span><span style="color:#91CBFF;"> UserDao</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Resource</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> JdbcTemplate</span><span style="color:#F0F3F6;"> jdbcTemplate;</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Resource</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> NamedParameterJdbcTemplate</span><span style="color:#F0F3F6;"> namedParameterJdbcTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> addUer</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;INSERT into \`user\` (\`user\`.user_name,\`user\`.\`status\`) VALUES(?,?);&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        int</span><span style="color:#F0F3F6;"> update</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> jdbcTemplate.</span><span style="color:#DBB7FF;">update</span><span style="color:#F0F3F6;">(sql, user.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">(), user.</span><span style="color:#DBB7FF;">getStatus</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> update;</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> update</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;UPDATE \`user\` SET status=? WHERE user_name=?;&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> jdbcTemplate.</span><span style="color:#DBB7FF;">update</span><span style="color:#F0F3F6;">(sql, user.</span><span style="color:#DBB7FF;">getStatus</span><span style="color:#F0F3F6;">(), user.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> delete</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;DELETE FROM \`user\` where user_name=?;&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> jdbcTemplate.</span><span style="color:#DBB7FF;">update</span><span style="color:#F0F3F6;">(sql, user.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> count</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;SELECT COUNT(*) FROM \`user\` where \`status\`=?;&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> jdbcTemplate.</span><span style="color:#DBB7FF;">queryForObject</span><span style="color:#F0F3F6;">(sql, Integer.class, user.</span><span style="color:#DBB7FF;">getStatus</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> List&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#DBB7FF;">getList</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;SELECT * FROM \`user\` where \`status\`=?;&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> jdbcTemplate.</span><span style="color:#DBB7FF;">query</span><span style="color:#F0F3F6;">(sql, </span><span style="color:#FF9492;">new</span><span style="color:#F0F3F6;"> BeanPropertyRowMapper&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt;(User.class), user.</span><span style="color:#DBB7FF;">getStatus</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> User </span><span style="color:#DBB7FF;">getUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;SELECT * FROM \`user\` where \`user_id\`=?;&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> jdbcTemplate.</span><span style="color:#DBB7FF;">queryForObject</span><span style="color:#F0F3F6;">(sql, </span><span style="color:#FF9492;">new</span><span style="color:#F0F3F6;"> BeanPropertyRowMapper&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt;(User.class), user.</span><span style="color:#DBB7FF;">getUserId</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> batchAddUser</span><span style="color:#F0F3F6;">(List&lt;</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[]&gt; </span><span style="color:#FFB757;">batchArgs</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        String</span><span style="color:#F0F3F6;"> sql</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;INSERT into \`user\` (\`user\`.user_name,\`user\`.\`status\`) VALUES(?,?);&quot;</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#F0F3F6;">        jdbcTemplate.</span><span style="color:#DBB7FF;">batchUpdate</span><span style="color:#F0F3F6;">(sql, batchArgs);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>8.创建一个名为<code>UserService</code>的接口。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.entity.User;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> interface</span><span style="color:#FFB757;"> UserService</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 新增用户数据</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> addUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 更新用户数据</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> updateUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 删除用户数据</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> deleteUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 统计用户数量</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> countUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 查询用户数据</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> List&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#DBB7FF;">getUserList</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 查询单个用户信息</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> user</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@return</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> User </span><span style="color:#DBB7FF;">getUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 批量添加用户</span></span>
<span class="line"><span style="color:#BDC4CC;">     *</span></span>
<span class="line"><span style="color:#BDC4CC;">     * </span><span style="color:#FF9492;">@param</span><span style="color:#FFB757;"> batchArgs</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> batchAddUser</span><span style="color:#F0F3F6;">(List&lt;</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[]&gt; </span><span style="color:#FFB757;">batchArgs</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>9.创建<code>UserService</code>的实现类<code>UserServiceImpl</code>。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c.service.impl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.dao.UserDao;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.entity.User;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.service.UserService;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Service</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;userService&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> UserServiceImpl</span><span style="color:#FF9492;"> implements</span><span style="color:#91CBFF;"> UserService</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Resource</span></span>
<span class="line"><span style="color:#FF9492;">    private</span><span style="color:#F0F3F6;"> UserDao</span><span style="color:#F0F3F6;"> userDao;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> addUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">addUer</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> updateUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">update</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> deleteUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">delete</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> countUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">count</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> List&lt;</span><span style="color:#FF9492;">User</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#DBB7FF;">getUserList</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">getList</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> User </span><span style="color:#DBB7FF;">getUser</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">getUser</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> batchAddUser</span><span style="color:#F0F3F6;">(List&lt;</span><span style="color:#FF9492;">Object</span><span style="color:#F0F3F6;">[]&gt; </span><span style="color:#FFB757;">batchArgs</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        userDao.</span><span style="color:#DBB7FF;">batchAddUser</span><span style="color:#F0F3F6;">(batchArgs);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> int</span><span style="color:#DBB7FF;"> countOfUserByName</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">countOfUserByName</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Override</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> User </span><span style="color:#DBB7FF;">getUserByUserId</span><span style="color:#F0F3F6;">(User </span><span style="color:#FFB757;">user</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> userDao.</span><span style="color:#DBB7FF;">getUserByUserId</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>10.创建一个名为<code>MainApp</code>的类。</p><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">package</span><span style="color:#F0F3F6;"> net.biancheng.c;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.entity.User;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> net.biancheng.c.service.UserService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> MainApp</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#FF9492;"> static</span><span style="color:#FF9492;"> void</span><span style="color:#DBB7FF;"> main</span><span style="color:#F0F3F6;">(</span><span style="color:#FF9492;">String</span><span style="color:#F0F3F6;">[] </span><span style="color:#FFB757;">args</span><span style="color:#F0F3F6;">) {</span></span>
<span class="line"><span style="color:#F0F3F6;">        ApplicationContext</span><span style="color:#F0F3F6;"> context2</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> ClassPathXmlApplicationContext</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;Beans.xml&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        UserService</span><span style="color:#F0F3F6;"> userService</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> context2.</span><span style="color:#DBB7FF;">getBean</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;userService&quot;</span><span style="color:#F0F3F6;">, UserService.class);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setUserName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;小张&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user.</span><span style="color:#DBB7FF;">setStatus</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;离线线&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#BDC4CC;">        //新增一个用户</span></span>
<span class="line"><span style="color:#FF9492;">        int</span><span style="color:#F0F3F6;"> i</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> userService.</span><span style="color:#DBB7FF;">addUser</span><span style="color:#F0F3F6;">(user);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;新增用户成功！&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user1</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        user1.</span><span style="color:#DBB7FF;">setUserName</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;小张&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#F0F3F6;">        user1.</span><span style="color:#DBB7FF;">setStatus</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;在线&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        int</span><span style="color:#F0F3F6;"> u</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> userService.</span><span style="color:#DBB7FF;">updateUser</span><span style="color:#F0F3F6;">(user1);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;修改用户成功&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        List</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">Object</span><span style="color:#FFB757;">[]&gt; </span><span style="color:#F0F3F6;">batchArgs</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#F0F3F6;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#FF9492;">        Object</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">o1</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> {</span><span style="color:#ADDCFF;">&quot;小明&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#ADDCFF;">&quot;在线&quot;</span><span style="color:#F0F3F6;">};</span></span>
<span class="line"><span style="color:#FF9492;">        Object</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">o2</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> {</span><span style="color:#ADDCFF;">&quot;小龙&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#ADDCFF;">&quot;离线&quot;</span><span style="color:#F0F3F6;">};</span></span>
<span class="line"><span style="color:#FF9492;">        Object</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">o3</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> {</span><span style="color:#ADDCFF;">&quot;小林&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#ADDCFF;">&quot;在线&quot;</span><span style="color:#F0F3F6;">};</span></span>
<span class="line"><span style="color:#FF9492;">        Object</span><span style="color:#FFB757;">[] </span><span style="color:#F0F3F6;">o4</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> {</span><span style="color:#ADDCFF;">&quot;小李&quot;</span><span style="color:#F0F3F6;">, </span><span style="color:#ADDCFF;">&quot;在线&quot;</span><span style="color:#F0F3F6;">};</span></span>
<span class="line"><span style="color:#F0F3F6;">        batchArgs.</span><span style="color:#DBB7FF;">add</span><span style="color:#F0F3F6;">(o1);</span></span>
<span class="line"><span style="color:#F0F3F6;">        batchArgs.</span><span style="color:#DBB7FF;">add</span><span style="color:#F0F3F6;">(o2);</span></span>
<span class="line"><span style="color:#F0F3F6;">        batchArgs.</span><span style="color:#DBB7FF;">add</span><span style="color:#F0F3F6;">(o3);</span></span>
<span class="line"><span style="color:#F0F3F6;">        batchArgs.</span><span style="color:#DBB7FF;">add</span><span style="color:#F0F3F6;">(o4);</span></span>
<span class="line"><span style="color:#F0F3F6;">        userService.</span><span style="color:#DBB7FF;">batchAddUser</span><span style="color:#F0F3F6;">(batchArgs);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;批量增加完毕&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        User</span><span style="color:#F0F3F6;"> user2</span><span style="color:#FF9492;"> =</span><span style="color:#FF9492;"> new</span><span style="color:#DBB7FF;"> User</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">        user2.</span><span style="color:#DBB7FF;">setStatus</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;在线&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        int</span><span style="color:#F0F3F6;"> i1</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> userService.</span><span style="color:#DBB7FF;">countUser</span><span style="color:#F0F3F6;">(user2);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;在线用户的个数为：&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> i1);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">        List</span><span style="color:#FFB757;">&lt;</span><span style="color:#FF9492;">User</span><span style="color:#FFB757;">&gt; </span><span style="color:#F0F3F6;">userList</span><span style="color:#FF9492;"> =</span><span style="color:#F0F3F6;"> userService.</span><span style="color:#DBB7FF;">getUserList</span><span style="color:#F0F3F6;">(user2);</span></span>
<span class="line"><span style="color:#F0F3F6;">        System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;在线用户列表查询成功！&quot;</span><span style="color:#F0F3F6;">);</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> (User</span><span style="color:#F0F3F6;"> user4</span><span style="color:#FF9492;"> :</span><span style="color:#F0F3F6;"> userList) {</span></span>
<span class="line"><span style="color:#F0F3F6;">            System.out.</span><span style="color:#DBB7FF;">println</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&quot;用户 ID:&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> user4.</span><span style="color:#DBB7FF;">getUserId</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;，用户名：&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> user4.</span><span style="color:#DBB7FF;">getUserName</span><span style="color:#F0F3F6;">() </span><span style="color:#FF9492;">+</span><span style="color:#ADDCFF;"> &quot;，状态：&quot;</span><span style="color:#FF9492;"> +</span><span style="color:#F0F3F6;"> user4.</span><span style="color:#DBB7FF;">getStatus</span><span style="color:#F0F3F6;">());</span></span>
<span class="line"><span style="color:#F0F3F6;">        }</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div><p>11.执行<code>MainApp</code>中的<code>main</code>方法，控制台输出如下。</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>新增用户成功！</span></span>
<span class="line"><span>修改用户成功</span></span>
<span class="line"><span>批量增加完毕</span></span>
<span class="line"><span>在线用户的个数为：4</span></span>
<span class="line"><span>在线用户列表查询成功！</span></span>
<span class="line"><span>用户 ID:1，用户名：小张，状态：在线</span></span>
<span class="line"><span>用户 ID:2，用户名：小明，状态：在线</span></span>
<span class="line"><span>用户 ID:4，用户名：小林，状态：在线</span></span>
<span class="line"><span>用户 ID:5，用户名：小李，状态：在线</span></span></code></pre></div>`,31)]))}const r=n(o,[["render",e],["__file","SpringJdbcTemplate.html.vue"]]),y=JSON.parse('{"path":"/java/Spring/SpringJdbcTemplate.html","title":"","lang":"zh-CN","frontmatter":{"description":"Spring 提供了一个 JDBC 模块，它对 JDBC API 进行了封装，其的主要目的降低 JDBC API 的使用难度，以一种更直接、更简洁的方式使用 JDBC API。 使用 Spring JDBC，开发人员只需要定义必要的参数、指定需要执行的 SQL 语句，即可轻松的进行 JDBC 编程，对数据库进行访问。 至于驱动的加载、数据库连接的开启与...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/java/Spring/SpringJdbcTemplate.html"}],["meta",{"property":"og:description","content":"Spring 提供了一个 JDBC 模块，它对 JDBC API 进行了封装，其的主要目的降低 JDBC API 的使用难度，以一种更直接、更简洁的方式使用 JDBC API。 使用 Spring JDBC，开发人员只需要定义必要的参数、指定需要执行的 SQL 语句，即可轻松的进行 JDBC 编程，对数据库进行访问。 至于驱动的加载、数据库连接的开启与..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-27T02:39:10.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-27T02:39:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-27T02:39:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"JdbcTemplate","slug":"jdbctemplate","link":"#jdbctemplate","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1745401751000,"updatedTime":1745721550000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":6.32,"words":1895},"filePathRelative":"java/Spring/SpringJdbcTemplate.md","localizedDate":"2025年4月23日","autoDesc":true}');export{r as comp,y as data};
