import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,d as l,o as p}from"./app-CRBxQhNH.js";const o="/wsq-blog/assets/springboot-druid-11-Cw3rIITc.png",e="/wsq-blog/assets/springboot-druid-12-B-Xikj4P.png",t="/wsq-blog/assets/springboot-druid-13-iUl9_mdh.png",r={};function c(F,s){return p(),n("div",null,s[0]||(s[0]=[l(`<p>Druid连接池是阿里巴巴开源的数据库连接池项目。Druid连接池为监控而生，内置强大的监控功能，监控特性不影响性能。功能强大，能防SQL注入，内置Loging能诊断Hack应用行为。</p><ul><li>Github项目地址 https://github.com/alibaba/druid</li><li>文档 https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98</li><li>下载 http://repo1.maven.org/maven2/com/alibaba/druid/</li><li>监控DEMO http://120.26.192.168/druid/index.html</li></ul><h2 id="简单示例" tabindex="-1"><a class="header-anchor" href="#简单示例"><span>简单示例</span></a></h2><h3 id="pom-配置" tabindex="-1"><a class="header-anchor" href="#pom-配置"><span>POM 配置</span></a></h3><div class="language-xml" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">&lt;!-- https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter --&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;</span><span style="color:#72F088;">dependency</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">groupId</span><span style="color:#F0F3F6;">&gt;com.alibaba&lt;/</span><span style="color:#72F088;">groupId</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">artifactId</span><span style="color:#F0F3F6;">&gt;druid-spring-boot-starter&lt;/</span><span style="color:#72F088;">artifactId</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">    &lt;</span><span style="color:#72F088;">version</span><span style="color:#F0F3F6;">&gt;1.2.9&lt;/</span><span style="color:#72F088;">version</span><span style="color:#F0F3F6;">&gt;</span></span>
<span class="line"><span style="color:#F0F3F6;">&lt;/</span><span style="color:#72F088;">dependency</span><span style="color:#F0F3F6;">&gt;</span></span></code></pre></div><h3 id="yml配置" tabindex="-1"><a class="header-anchor" href="#yml配置"><span>yml配置</span></a></h3><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#72F088;">spring</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">  datasource</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">    url</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">jdbc:mysql://localhost:3306/test_db?useSSL=false&amp;autoReconnect=true&amp;characterEncoding=utf8</span></span>
<span class="line"><span style="color:#72F088;">    driver-class-name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#72F088;">    username</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span></span>
<span class="line"><span style="color:#72F088;">    password</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">bfXa4Pt2lUUScy8jakXf</span></span>
<span class="line"><span style="color:#BDC4CC;">    # Druid datasource</span></span>
<span class="line"><span style="color:#72F088;">    type</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">com.alibaba.druid.pool.DruidDataSource</span></span>
<span class="line"><span style="color:#72F088;">    druid</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 初始化大小</span></span>
<span class="line"><span style="color:#72F088;">      initial-size</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">5</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 最小连接数</span></span>
<span class="line"><span style="color:#72F088;">      min-idle</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">10</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 最大连接数</span></span>
<span class="line"><span style="color:#72F088;">      max-active</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">20</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 获取连接时的最大等待时间</span></span>
<span class="line"><span style="color:#72F088;">      max-wait</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">60000</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 一个连接在池中最小生存的时间，单位是毫秒</span></span>
<span class="line"><span style="color:#72F088;">      min-evictable-idle-time-millis</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">300000</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 多久才进行一次检测需要关闭的空闲连接，单位是毫秒</span></span>
<span class="line"><span style="color:#72F088;">      time-between-eviction-runs-millis</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">60000</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 配置扩展插件：stat-监控统计，log4j-日志，wall-防火墙（防止SQL注入），去掉后，监控界面的sql无法统计</span></span>
<span class="line"><span style="color:#72F088;">      filters</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">stat,wall</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 检测连接是否有效的 SQL语句，为空时以下三个配置均无效</span></span>
<span class="line"><span style="color:#72F088;">      validation-query</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">SELECT 1</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 申请连接时执行validationQuery检测连接是否有效，默认true，开启后会降低性能</span></span>
<span class="line"><span style="color:#72F088;">      test-on-borrow</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 归还连接时执行validationQuery检测连接是否有效，默认false，开启后会降低性能</span></span>
<span class="line"><span style="color:#72F088;">      test-on-return</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 申请连接时如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效，默认false，建议开启，不影响性能</span></span>
<span class="line"><span style="color:#72F088;">      test-while-idle</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 是否开启 StatViewServlet</span></span>
<span class="line"><span style="color:#72F088;">      stat-view-servlet</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        enabled</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 设置白名单，不填则允许所有访问</span></span>
<span class="line"><span style="color:#72F088;">        allow</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">127.0.0.1</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 控制台管理用户名和密码</span></span>
<span class="line"><span style="color:#72F088;">        login-username</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">admin</span></span>
<span class="line"><span style="color:#72F088;">        login-password</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">admin</span></span>
<span class="line"><span style="color:#BDC4CC;">      # FilterStat</span></span>
<span class="line"><span style="color:#72F088;">      filter</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        stat</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#BDC4CC;">          # 是否开启 FilterStat，默认true</span></span>
<span class="line"><span style="color:#72F088;">          enabled</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#BDC4CC;">          # 是否开启 慢SQL 记录，默认false</span></span>
<span class="line"><span style="color:#72F088;">          log-slow-sql</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#BDC4CC;">          # 慢 SQL 的标准，默认 3000，单位：毫秒</span></span>
<span class="line"><span style="color:#72F088;">          slow-sql-millis</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">5000</span></span>
<span class="line"><span style="color:#BDC4CC;">          # 合并多个连接池的监控数据，默认false</span></span>
<span class="line"><span style="color:#72F088;">          merge-sql</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">false</span></span>
<span class="line"><span style="color:#72F088;">  jpa</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">    open-in-view</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">false</span></span>
<span class="line"><span style="color:#72F088;">    generate-ddl</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">false</span></span>
<span class="line"><span style="color:#72F088;">    show-sql</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">false</span></span>
<span class="line"><span style="color:#72F088;">    properties</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">      hibernate</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        dialect</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">org.hibernate.dialect.MySQLDialect</span></span>
<span class="line"><span style="color:#72F088;">        format_sql</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span></span>
<span class="line"><span style="color:#72F088;">        use-new-id-generator-mappings</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">false</span></span></code></pre></div><p>更多的配置，请参考<a href="https://github.com/alibaba/druid/wiki/DruidDataSource%E9%85%8D%E7%BD%AE%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8" target="_blank" rel="noopener noreferrer">官方配置</a>。</p><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h3><p>访问<code>http://localhost:8080/druid/datasource.html</code></p><p><code>admin/admin</code>登录</p><figure><img src="`+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>访问接口，进行 SQL 查询</p><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>SQL 和慢查询监控</p><figure><img src="'+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="druid-多数据源" tabindex="-1"><a class="header-anchor" href="#druid-多数据源"><span>Druid 多数据源</span></a></h2><h3 id="yml配置-1" tabindex="-1"><a class="header-anchor" href="#yml配置-1"><span>yml配置</span></a></h3><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#72F088;">spring</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#BDC4CC;">  # datasource 数据源配置内容</span></span>
<span class="line"><span style="color:#72F088;">  datasource</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#BDC4CC;">    # 订单数据源配置</span></span>
<span class="line"><span style="color:#72F088;">    orders</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">      url</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">jdbc:mysql://127.0.0.1:3306/test_orders?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8</span></span>
<span class="line"><span style="color:#72F088;">      driver-class-name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">com.mysql.jdbc.Driver</span></span>
<span class="line"><span style="color:#72F088;">      username</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span></span>
<span class="line"><span style="color:#72F088;">      password</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">      type</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">com.alibaba.druid.pool.DruidDataSource</span><span style="color:#BDC4CC;"> # 设置类型为 DruidDataSource</span></span>
<span class="line"><span style="color:#BDC4CC;">      # Druid 自定义配置，对应 DruidDataSource 中的 setting 方法的属性</span></span>
<span class="line"><span style="color:#72F088;">      min-idle</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">0</span><span style="color:#BDC4CC;"> # 池中维护的最小空闲连接数，默认为 0 个。</span></span>
<span class="line"><span style="color:#72F088;">      max-active</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">20</span><span style="color:#BDC4CC;"> # 池中最大连接数，包括闲置和使用中的连接，默认为 8 个。</span></span>
<span class="line"><span style="color:#BDC4CC;">    # 用户数据源配置</span></span>
<span class="line"><span style="color:#72F088;">    users</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">      url</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">jdbc:mysql://127.0.0.1:3306/test_users?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8</span></span>
<span class="line"><span style="color:#72F088;">      driver-class-name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">com.mysql.jdbc.Driver</span></span>
<span class="line"><span style="color:#72F088;">      username</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span></span>
<span class="line"><span style="color:#72F088;">      password</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">      type</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">com.alibaba.druid.pool.DruidDataSource</span><span style="color:#BDC4CC;"> # 设置类型为 DruidDataSource</span></span>
<span class="line"><span style="color:#BDC4CC;">      # Druid 自定义配置，对应 DruidDataSource 中的 setting 方法的属性</span></span>
<span class="line"><span style="color:#72F088;">      min-idle</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">0</span><span style="color:#BDC4CC;"> # 池中维护的最小空闲连接数，默认为 0 个。</span></span>
<span class="line"><span style="color:#72F088;">      max-active</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">20</span><span style="color:#BDC4CC;"> # 池中最大连接数，包括闲置和使用中的连接，默认为 8 个。</span></span>
<span class="line"><span style="color:#BDC4CC;">    # Druid 自定已配置</span></span>
<span class="line"><span style="color:#72F088;">    druid</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#BDC4CC;">      # 过滤器配置</span></span>
<span class="line"><span style="color:#72F088;">      filter</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        stat</span><span style="color:#F0F3F6;">: </span><span style="color:#BDC4CC;"># 配置 StatFilter ，对应文档 https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatFilter</span></span>
<span class="line"><span style="color:#72F088;">          log-slow-sql</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span><span style="color:#BDC4CC;"> # 开启慢查询记录</span></span>
<span class="line"><span style="color:#72F088;">          slow-sql-millis</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">5000</span><span style="color:#BDC4CC;"> # 慢 SQL 的标准，单位：毫秒</span></span>
<span class="line"><span style="color:#BDC4CC;">      # StatViewServlet 配置</span></span>
<span class="line"><span style="color:#72F088;">      stat-view-servlet</span><span style="color:#F0F3F6;">: </span><span style="color:#BDC4CC;"># 配置 StatViewServlet ，对应文档 https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatViewServlet%E9%85%8D%E7%BD%AE</span></span>
<span class="line"><span style="color:#72F088;">        enabled</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">true</span><span style="color:#BDC4CC;"> # 是否开启 StatViewServlet</span></span>
<span class="line"><span style="color:#72F088;">        login-username</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">admin</span><span style="color:#BDC4CC;"> # 账号</span></span>
<span class="line"><span style="color:#72F088;">        login-password</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">admin</span><span style="color:#BDC4CC;"> # 密码</span></span></code></pre></div><h3 id="数据源配置类" tabindex="-1"><a class="header-anchor" href="#数据源配置类"><span>数据源配置类</span></a></h3><div class="language-java" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;">// DataSourceConfig.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">@</span><span style="color:#FF9492;">Configuration</span></span>
<span class="line"><span style="color:#FF9492;">public</span><span style="color:#FF9492;"> class</span><span style="color:#FFB757;"> DataSourceConfig</span><span style="color:#F0F3F6;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 创建 orders 数据源</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Primary</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Bean</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">name</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;ordersDataSource&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">ConfigurationProperties</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">prefix</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;spring.datasource.orders&quot;</span><span style="color:#F0F3F6;">) </span><span style="color:#BDC4CC;">// 读取 spring.datasource.orders 配置到 HikariDataSource 对象</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> DataSource </span><span style="color:#DBB7FF;">ordersDataSource</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> DruidDataSourceBuilder.</span><span style="color:#DBB7FF;">create</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">build</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">    /**</span></span>
<span class="line"><span style="color:#BDC4CC;">     * 创建 users 数据源</span></span>
<span class="line"><span style="color:#BDC4CC;">     */</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">Bean</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">name</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;usersDataSource&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#F0F3F6;">    @</span><span style="color:#FF9492;">ConfigurationProperties</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">prefix</span><span style="color:#FF9492;"> =</span><span style="color:#ADDCFF;"> &quot;spring.datasource.users&quot;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#FF9492;">    public</span><span style="color:#F0F3F6;"> DataSource </span><span style="color:#DBB7FF;">usersDataSource</span><span style="color:#F0F3F6;">() {</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> DruidDataSourceBuilder.</span><span style="color:#DBB7FF;">create</span><span style="color:#F0F3F6;">().</span><span style="color:#DBB7FF;">build</span><span style="color:#F0F3F6;">();</span></span>
<span class="line"><span style="color:#F0F3F6;">    }</span></span>
<span class="line"><span style="color:#F0F3F6;">}</span></span></code></pre></div>`,21)]))}const d=a(r,[["render",c],["__file","springBoot—集成Druid连接池.html.vue"]]),C=JSON.parse('{"path":"/java/springBoot/springBoot%E2%80%94%E9%9B%86%E6%88%90Druid%E8%BF%9E%E6%8E%A5%E6%B1%A0.html","title":"","lang":"zh-CN","frontmatter":{"description":"Druid连接池是阿里巴巴开源的数据库连接池项目。Druid连接池为监控而生，内置强大的监控功能，监控特性不影响性能。功能强大，能防SQL注入，内置Loging能诊断Hack应用行为。 Github项目地址 https://github.com/alibaba/druid 文档 https://github.com/alibaba/druid/wiki...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/java/springBoot/springBoot%E2%80%94%E9%9B%86%E6%88%90Druid%E8%BF%9E%E6%8E%A5%E6%B1%A0.html"}],["meta",{"property":"og:description","content":"Druid连接池是阿里巴巴开源的数据库连接池项目。Druid连接池为监控而生，内置强大的监控功能，监控特性不影响性能。功能强大，能防SQL注入，内置Loging能诊断Hack应用行为。 Github项目地址 https://github.com/alibaba/druid 文档 https://github.com/alibaba/druid/wiki..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-01T01:55:29.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-01T01:55:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-01T01:55:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"简单示例","slug":"简单示例","link":"#简单示例","children":[{"level":3,"title":"POM 配置","slug":"pom-配置","link":"#pom-配置","children":[]},{"level":3,"title":"yml配置","slug":"yml配置","link":"#yml配置","children":[]},{"level":3,"title":"测试","slug":"测试","link":"#测试","children":[]}]},{"level":2,"title":"Druid 多数据源","slug":"druid-多数据源","link":"#druid-多数据源","children":[{"level":3,"title":"yml配置","slug":"yml配置-1","link":"#yml配置-1","children":[]},{"level":3,"title":"数据源配置类","slug":"数据源配置类","link":"#数据源配置类","children":[]}]}],"git":{"createdTime":1730426129000,"updatedTime":1730426129000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1011},"filePathRelative":"java/springBoot/springBoot—集成Druid连接池.md","localizedDate":"2024年11月1日","autoDesc":true}');export{d as comp,C as data};
