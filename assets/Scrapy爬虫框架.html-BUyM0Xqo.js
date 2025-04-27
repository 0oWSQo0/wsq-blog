import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,d as p,o as l}from"./app-Coac0FJ0.js";const e="/wsq-blog/assets/1-B2voilUg.gif",t={};function o(c,s){return l(),n("div",null,s[0]||(s[0]=[p(`<p><a href="https://docs.scrapy.org/en/latest/intro/install.html#intro-install" target="_blank" rel="noopener noreferrer">Scrapy</a>是一个 Python 实现的轻量级爬虫框架，它借助 Twisted 实现异步抓取。</p><p>Scrapy 是一个为了爬取网站数据，提取结构性数据而编写的应用框架。 可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。</p><h2 id="爬虫基本流程" tabindex="-1"><a class="header-anchor" href="#爬虫基本流程"><span>爬虫基本流程</span></a></h2><ol><li>发起请求：通过 HTTP 向目标站点发起请求，即发送一个<code>Request</code>，请求可以包含额外的<code>headers</code>等信息，等待服务器响应。</li><li>解析内容：得到的内容可能是 HTML，可以用正则表达式、网页解析库进行解析。可能是 Json，可以直接转为 Json 对象解析，可能是二进制数据，可以做保存或者进一步的处理。</li><li>获取响应内容：如果服务器能正常响应，会得到一个<code>Response</code>，<code>Response</code>的内容便是所要获取的页面内容，类型可能有 HTML，Json 字符串，二进制数据（如图片视频）等类型。</li><li>保存数据：保存形式多样，可以存为文本，也可以保存至数据库，或者保存特定格式的文件。</li></ol><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装"><span>下载安装</span></a></h2><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># windows</span></span>
<span class="line"><span style="color:#FFB757;">python</span><span style="color:#91CBFF;"> -m</span><span style="color:#ADDCFF;"> pip</span><span style="color:#ADDCFF;"> install</span><span style="color:#ADDCFF;"> scrapy</span></span></code></pre></div><p>验证安装：</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">C:\\Users\\Administrator</span><span style="color:#F0F3F6;">&gt;</span><span style="color:#ADDCFF;">python</span></span>
<span class="line"><span style="color:#FFB757;">Python</span><span style="color:#91CBFF;"> 3.7.4</span><span style="color:#F0F3F6;"> (tags/v3.7.4:e09359112e, </span><span style="color:#ADDCFF;">Jul</span><span style="color:#91CBFF;">  8</span><span style="color:#ADDCFF;"> 2019,</span><span style="color:#ADDCFF;"> 19:29:22</span><span style="color:#F0F3F6;">) [MSC v.1916 </span><span style="color:#91CBFF;">32</span><span style="color:#F0F3F6;"> bit (Intel)] on win32</span></span>
<span class="line"><span style="color:#FFB757;">Type</span><span style="color:#ADDCFF;"> &quot;help&quot;,</span><span style="color:#ADDCFF;"> &quot;copyright&quot;,</span><span style="color:#ADDCFF;"> &quot;credits&quot;</span><span style="color:#ADDCFF;"> or</span><span style="color:#ADDCFF;"> &quot;license&quot;</span><span style="color:#ADDCFF;"> for</span><span style="color:#ADDCFF;"> more</span><span style="color:#ADDCFF;"> information.</span></span>
<span class="line"><span style="color:#F0F3F6;">&gt;&gt;&gt; </span><span style="color:#FFB757;">import</span><span style="color:#ADDCFF;"> scrapy</span></span>
<span class="line"><span style="color:#F0F3F6;">&gt;&gt;&gt; </span><span style="color:#DBB7FF;">exit</span><span style="color:#F0F3F6;">()</span></span></code></pre></div><p>如果可以正常执行<code>exit()</code>操作，并且没有出现<code>ERROR</code>错误，则说明安装成功。</p><h2 id="创建scrapy爬虫项目" tabindex="-1"><a class="header-anchor" href="#创建scrapy爬虫项目"><span>创建Scrapy爬虫项目</span></a></h2><p>Scrapy 框架提供了一些常用的命令用来创建项目、查看配置信息，以及运行爬虫程序。</p><table><thead><tr><th>命令</th><th style="text-align:left;">格式</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td>startproject</td><td style="text-align:left;"><code>scrapy startproject &lt;项目名&gt;</code></td><td style="text-align:left;">创建一个新项目</td></tr><tr><td>genspider</td><td style="text-align:left;"><code>scrapy genspider &lt;爬虫文件名&gt; &lt;域名&gt;</code></td><td style="text-align:left;">新建爬虫文件</td></tr><tr><td>runspider</td><td style="text-align:left;"><code>scrapy runspider &lt;爬虫文件&gt;</code></td><td style="text-align:left;">运行一个爬虫文件，不需要创建项目</td></tr><tr><td>crawl</td><td style="text-align:left;"><code>scrapy crawl &lt;spidername&gt;</code></td><td style="text-align:left;">运行一个爬虫项目，必须要创建项目</td></tr><tr><td>list</td><td style="text-align:left;"><code>scrapy list</code></td><td style="text-align:left;">列出项目中所有爬虫文件</td></tr><tr><td>view</td><td style="text-align:left;"><code>scrapy view &lt;url地址&gt; </code></td><td style="text-align:left;">从浏览器中打开 url 地址</td></tr><tr><td>shell</td><td style="text-align:left;"><code>csrapy shell &lt;url地址&gt;</code></td><td style="text-align:left;">命令行交互模式</td></tr><tr><td>settings</td><td style="text-align:left;"><code>scrapy settings</code></td><td style="text-align:left;">查看当前项目的配置信息</td></tr></tbody></table><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">scrapy</span><span style="color:#ADDCFF;"> startproject</span><span style="color:#ADDCFF;"> Baidu</span></span>
<span class="line"><span style="color:#91CBFF;">cd</span><span style="color:#ADDCFF;"> Baidu</span></span>
<span class="line"><span style="color:#FFB757;">scrapy</span><span style="color:#ADDCFF;"> genspider</span><span style="color:#ADDCFF;"> baidu</span><span style="color:#ADDCFF;"> www.baidu.com</span></span></code></pre></div><p>打开新建的项目<code>Baidu</code>会有以下项目文件：</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>Baidu                   # 项目文件夹</span></span>
<span class="line"><span>├── Baidu               # 用来装载项目文件的目录</span></span>
<span class="line"><span>│   ├── __init__.py     # 创建项目时自动生成，无需任何改动</span></span>
<span class="line"><span>│   ├── items.py        # 定义要抓取的数据结构</span></span>
<span class="line"><span>│   ├── middlewares.py  # 中间件，用来设置一些处理规则</span></span>
<span class="line"><span>│   ├── pipelines.py    # 管道文件，处理抓取的数据</span></span>
<span class="line"><span>│   ├── settings.py     # 全局配置文件</span></span>
<span class="line"><span>│   └── spiders         # 用来装载爬虫文件的目录  </span></span>
<span class="line"><span>│       ├── __init__.py # 创建项目时自动生成，无需任何改动</span></span>
<span class="line"><span>│       ├── baidu.py    # 具体的爬虫程序</span></span>
<span class="line"><span>└── scrapy.cfg          # 项目基本配置文件</span></span></code></pre></div><h2 id="scrapy爬虫工作流程" tabindex="-1"><a class="header-anchor" href="#scrapy爬虫工作流程"><span>Scrapy爬虫工作流程</span></a></h2><p>Scrapy 框架由五大组件构成：</p><table><thead><tr><th>名称</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td>Engine(引擎)</td><td style="text-align:left;">整个 Scrapy 框架的核心，主要负责数据和信号在不同模块间传递</td></tr><tr><td>Scheduler(调度器)</td><td style="text-align:left;">用来维护引擎发送过来的 request 请求队列</td></tr><tr><td>Downloader(下载器)</td><td style="text-align:left;">接收引擎发送过来的 request 请求，并生成请求的响应对象，将响应结果返回给引擎</td></tr><tr><td>Spider(爬虫程序)</td><td style="text-align:left;">处理引擎发送过来的 response， 主要用来解析、提取数据和获取需要跟进的二级URL，然后将这些数据交回给引擎</td></tr><tr><td>Pipeline(项目管道)</td><td style="text-align:left;">实现数据存储，对引擎发送过来的数据进一步处理，比如存 MySQL 数据库等</td></tr></tbody></table><p>在整个执行过程中，还涉及到两个<code>middlewares</code>中间件，分别是下载器中间件（<code>Downloader Middlewares</code>）和蜘蛛中间件（<code>Spider Middlewares</code>），它们分别承担着不同的作用：</p><ul><li>下载器中间件，位于引擎和下载器之间，主要用来包装<code>request</code>请求头，比如 UersAgent、Cookies 和代理 IP 等</li><li>蜘蛛中间件，位于引擎与爬虫文件之间，它主要用来修改响应对象的属性</li></ul><figure><img src="`+e+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上述示意图描述如下，当一个爬虫项目启动后，Scrapy 框架会进行以下工作：</p><ol><li>第一步：由“引擎”向爬虫文件索要第一个待爬取的 URL，并将其交给调度器加入 URL 队列当中（对应图中1/2步骤）。</li><li>第二步：调度器处理完请求后， 将第一个 URL 出队列返回给引擎；引擎经由下载器中间件将该 URL 交给下载器去下载<code>response</code>对象（对应3/4步骤）。</li><li>第三步：下载器得到响应对象后，将响应结果交给引擎，引擎收到后，经由蜘蛛中间件将响应结果交给爬虫文件（对应5/6步骤）。</li><li>第四步：爬虫文件对响应结果进行处理、分析，并提取出所需要的数据。</li><li>第五步：最后，提取的数据会交给管道文件去存数据库，同时将需要继续跟进的二级页面 URL 交给调度器去入队列（对应7/8/9步骤）。</li></ol><p>上述过程会一直循环，直到没有要爬取的 URL 为止，也就是 URL 队列为空时才会停止。</p><h2 id="settings配置文件" tabindex="-1"><a class="header-anchor" href="#settings配置文件"><span>settings配置文件</span></a></h2><p>在使用 Scrapy 框架时，还需要对配置文件进行稍微改动。下面使用 Pycharm 打开刚刚创建的“Baidu”项目，对配置文件进行如下修改：</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span># 1、定义User-Agent</span></span>
<span class="line"><span>USER_AGENT = &#39;Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)&#39;</span></span>
<span class="line"><span># 2、是否遵循robots协议，一般设置为False</span></span>
<span class="line"><span>ROBOTSTXT_OBEY = False</span></span>
<span class="line"><span># 3、最大并发量，默认为16</span></span>
<span class="line"><span>CONCURRENT_REQUESTS = 32</span></span>
<span class="line"><span># 4、下载延迟时间</span></span>
<span class="line"><span>DOWNLOAD_DELAY = 1</span></span></code></pre></div><p>其余常用配置项介绍：</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span># 设置日志级别，DEBUG &lt; INFO &lt; WARNING &lt; ERROR &lt; CRITICAL</span></span>
<span class="line"><span>LOG_LEVEL = &#39; &#39;</span></span>
<span class="line"><span># 将日志信息保存日志文件中，而不在终端输出</span></span>
<span class="line"><span>LOG_FILE = &#39;&#39;</span></span>
<span class="line"><span># 设置导出数据的编码格式(主要针对于json文件)</span></span>
<span class="line"><span>FEED_EXPORT_ENCODING = &#39;&#39;</span></span>
<span class="line"><span># 非结构化数据的存储路径</span></span>
<span class="line"><span>IMAGES_STORE = &#39;路径&#39;</span></span>
<span class="line"><span># 请求头，此处可以添加User-Agent、cookies、referer等</span></span>
<span class="line"><span>DEFAULT_REQUEST_HEADERS={</span></span>
<span class="line"><span>   &#39;Accept&#39;: &#39;text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8&#39;,</span></span>
<span class="line"><span>   &#39;Accept-Language&#39;: &#39;en&#39;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span># 项目管道，300 代表激活的优先级 越小越优先，取值1到1000</span></span>
<span class="line"><span>ITEM_PIPELINES={</span></span>
<span class="line"><span>  &#39;Baidu.pipelines.BaiduPipeline&#39;:300</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span># 添加下载器中间件</span></span>
<span class="line"><span>DOWNLOADER_MIDDLEWARES = {}</span></span></code></pre></div><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战"><span>实战</span></a></h2><p>把百度的<code>title</code>抓取下来。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 创建爬虫文件</span></span>
<span class="line"><span style="color:#FFB757;">scrapy</span><span style="color:#ADDCFF;"> genspider</span><span style="color:#ADDCFF;"> title</span><span style="color:#ADDCFF;"> www.baidu.com</span></span></code></pre></div><p>打开爬虫文件<code>title.py</code>，编写如下代码，其中一些代码 Scrapy 框架已经自动生成：</p><div class="language-python" data-highlighter="shiki" data-ext="python" data-title="python" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> scrapy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> TitleSpider</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">scrapy</span><span style="color:#F0F3F6;">.</span><span style="color:#91CBFF;">Spider</span><span style="color:#F0F3F6;">):</span></span>
<span class="line"><span style="color:#F0F3F6;">    name </span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;"> &quot;title&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">    allowed_domains </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> [</span><span style="color:#ADDCFF;">&quot;www.baidu.com&quot;</span><span style="color:#F0F3F6;">]</span></span>
<span class="line"><span style="color:#F0F3F6;">    start_urls </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> [</span><span style="color:#ADDCFF;">&quot;https://www.baidu.com&quot;</span><span style="color:#F0F3F6;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9492;">    def</span><span style="color:#DBB7FF;"> parse</span><span style="color:#F0F3F6;">(self, response):</span></span>
<span class="line"><span style="color:#BDC4CC;">        #.extract()：提取文本内容,将列表中所有元素序列化为Unicode字符串</span></span>
<span class="line"><span style="color:#BDC4CC;">        #.extract_first()：提取列表中第1个文本内容</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 以下是我们自己编写的代码，而自动生成的代码不用改动</span></span>
<span class="line"><span style="color:#F0F3F6;">        result </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> response.xpath(</span><span style="color:#ADDCFF;">&#39;/html/head/title/text()&#39;</span><span style="color:#F0F3F6;">).extract_first()</span></span>
<span class="line"><span style="color:#91CBFF;">        print</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&#39;-&#39;</span><span style="color:#FF9492;"> *</span><span style="color:#91CBFF;"> 60</span><span style="color:#F0F3F6;"> )</span></span>
<span class="line"><span style="color:#91CBFF;">        print</span><span style="color:#F0F3F6;">(result)</span></span>
<span class="line"><span style="color:#91CBFF;">        print</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&#39;-&#39;</span><span style="color:#FF9492;"> *</span><span style="color:#91CBFF;"> 60</span><span style="color:#F0F3F6;">)</span></span></code></pre></div><p>修改<code>settings</code>文件的配置项。</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>USER_AGENT = &#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36&#39;</span></span>
<span class="line"><span>ROBOTSTXT_OBEY = False</span></span>
<span class="line"><span>DEFAULT_REQUEST_HEADERS = {</span></span>
<span class="line"><span>  &#39;Accept&#39;: &#39;text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8&#39;,</span></span>
<span class="line"><span>  &#39;Accept-Language&#39;: &#39;en&#39;,</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用Pycharm IDE运行项目。</p><p>为了省去终端敲命令的环节，可以在项目中自定义一个运行文件<code>mian.py</code>（该文件与<code>scrapy.cfg</code>同目录），并编写如下代码：</p><div class="language-python" data-highlighter="shiki" data-ext="python" data-title="python" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">from</span><span style="color:#F0F3F6;"> scrapy </span><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> cmdline</span></span>
<span class="line"><span style="color:#BDC4CC;"># 注意，cmdline.execute()是为了减少输入命令的操作，该方法的参数必须为列表。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 执行爬虫文件来启动项目</span></span>
<span class="line"><span style="color:#F0F3F6;">cmdline.execute(</span><span style="color:#ADDCFF;">&#39;scrapy crawl title&#39;</span><span style="color:#F0F3F6;">.split())</span></span></code></pre></div><p>编写完成后，执行<code>main.py</code>文件。</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>024-12-19 14:00:47 [scrapy.utils.log] INFO: Scrapy 2.12.0 started (bot: Baidu)</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.utils.log] INFO: Versions: lxml 5.3.0.0, libxml2 2.11.7, cssselect 1.2.0, parsel 1.9.1, w3lib 2.2.1, Twisted 24.11.0, Python 3.13.1 (tags/v3.13.1:0671451, Dec  3 2024, 19:06:28) [MSC v.1942 64 bit (AMD64)], pyOpenSSL 24.3.0 (OpenSSL 3.4.0 22 Oct 2024), cryptography 44.0.0, Platform Windows-11-10.0.22631-SP0</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.addons] INFO: Enabled addons:</span></span>
<span class="line"><span>[]</span></span>
<span class="line"><span>2024-12-19 14:00:47 [asyncio] DEBUG: Using selector: SelectSelector</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.windows_events._WindowsSelectorEventLoop</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.windows_events._WindowsSelectorEventLoop</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.extensions.telnet] INFO: Telnet Password: 2238fe617664f4f1</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.middleware] INFO: Enabled extensions:</span></span>
<span class="line"><span>[&#39;scrapy.extensions.corestats.CoreStats&#39;,</span></span>
<span class="line"><span> &#39;scrapy.extensions.telnet.TelnetConsole&#39;,</span></span>
<span class="line"><span> &#39;scrapy.extensions.logstats.LogStats&#39;]</span></span>
<span class="line"><span>2024-12-19 14:00:47 [scrapy.crawler] INFO: Overridden settings:</span></span>
<span class="line"><span>{&#39;BOT_NAME&#39;: &#39;Baidu&#39;,</span></span>
<span class="line"><span> &#39;FEED_EXPORT_ENCODING&#39;: &#39;utf-8&#39;,</span></span>
<span class="line"><span> &#39;NEWSPIDER_MODULE&#39;: &#39;Baidu.spiders&#39;,</span></span>
<span class="line"><span> &#39;SPIDER_MODULES&#39;: [&#39;Baidu.spiders&#39;],</span></span>
<span class="line"><span> &#39;TWISTED_REACTOR&#39;: &#39;twisted.internet.asyncioreactor.AsyncioSelectorReactor&#39;,</span></span>
<span class="line"><span> &#39;USER_AGENT&#39;: &#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 &#39;</span></span>
<span class="line"><span>               &#39;(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36&#39;}</span></span>
<span class="line"><span>2024-12-19 14:00:48 [scrapy.middleware] INFO: Enabled downloader middlewares:</span></span>
<span class="line"><span>[&#39;scrapy.downloadermiddlewares.offsite.OffsiteMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.useragent.UserAgentMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.retry.RetryMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.redirect.RedirectMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.cookies.CookiesMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.downloadermiddlewares.stats.DownloaderStats&#39;]</span></span>
<span class="line"><span>2024-12-19 14:00:48 [scrapy.middleware] INFO: Enabled spider middlewares:</span></span>
<span class="line"><span>[&#39;scrapy.spidermiddlewares.httperror.HttpErrorMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.spidermiddlewares.referer.RefererMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.spidermiddlewares.urllength.UrlLengthMiddleware&#39;,</span></span>
<span class="line"><span> &#39;scrapy.spidermiddlewares.depth.DepthMiddleware&#39;]</span></span>
<span class="line"><span>2024-12-19 14:00:48 [scrapy.middleware] INFO: Enabled item pipelines:</span></span>
<span class="line"><span>[]</span></span>
<span class="line"><span>2024-12-19 14:00:48 [scrapy.core.engine] INFO: Spider opened</span></span>
<span class="line"><span>2024-12-19 14:00:48 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)</span></span>
<span class="line"><span>2024-12-19 14:00:48 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023</span></span>
<span class="line"><span>2024-12-19 14:00:49 [scrapy.core.engine] DEBUG: Crawled (200) &lt;GET https://www.baidu.com&gt; (referer: None)</span></span>
<span class="line"><span>------------------------------------------------------------</span></span>
<span class="line"><span>百度一下，你就知道</span></span>
<span class="line"><span>------------------------------------------------------------</span></span>
<span class="line"><span>2024-12-19 14:00:49 [scrapy.core.engine] INFO: Closing spider (finished)</span></span>
<span class="line"><span>2024-12-19 14:00:49 [scrapy.statscollectors] INFO: Dumping Scrapy stats:</span></span>
<span class="line"><span>{&#39;downloader/request_bytes&#39;: 290,</span></span>
<span class="line"><span> &#39;downloader/request_count&#39;: 1,</span></span>
<span class="line"><span> &#39;downloader/request_method_count/GET&#39;: 1,</span></span>
<span class="line"><span> &#39;downloader/response_bytes&#39;: 114217,</span></span>
<span class="line"><span> &#39;downloader/response_count&#39;: 1,</span></span>
<span class="line"><span> &#39;downloader/response_status_count/200&#39;: 1,</span></span>
<span class="line"><span> &#39;elapsed_time_seconds&#39;: 0.338409,</span></span>
<span class="line"><span> &#39;finish_reason&#39;: &#39;finished&#39;,</span></span>
<span class="line"><span> &#39;finish_time&#39;: datetime.datetime(2024, 12, 19, 6, 0, 49, 149891, tzinfo=datetime.timezone.utc),</span></span>
<span class="line"><span> &#39;httpcompression/response_bytes&#39;: 468203,</span></span>
<span class="line"><span> &#39;httpcompression/response_count&#39;: 1,</span></span>
<span class="line"><span> &#39;items_per_minute&#39;: None,</span></span>
<span class="line"><span> &#39;log_count/DEBUG&#39;: 6,</span></span>
<span class="line"><span> &#39;log_count/INFO&#39;: 10,</span></span>
<span class="line"><span> &#39;response_received_count&#39;: 1,</span></span>
<span class="line"><span> &#39;responses_per_minute&#39;: None,</span></span>
<span class="line"><span> &#39;scheduler/dequeued&#39;: 1,</span></span>
<span class="line"><span> &#39;scheduler/dequeued/memory&#39;: 1,</span></span>
<span class="line"><span> &#39;scheduler/enqueued&#39;: 1,</span></span>
<span class="line"><span> &#39;scheduler/enqueued/memory&#39;: 1,</span></span>
<span class="line"><span> &#39;start_time&#39;: datetime.datetime(2024, 12, 19, 6, 0, 48, 811482, tzinfo=datetime.timezone.utc)}</span></span>
<span class="line"><span>2024-12-19 14:00:49 [scrapy.core.engine] INFO: Spider closed (finished)</span></span></code></pre></div><p>上述过程中，我们只在<code>title.py</code>中使用 Xpath 做了解析数据的操作，就拿到了我们想要的数据。由此可见 URL 入队出队， 发起<code>request</code>请求，返回<code>response</code>响应等操作都是由 Scrapy 框架自动完成的。</p><h2 id="猫眼电影案例" tabindex="-1"><a class="header-anchor" href="#猫眼电影案例"><span>猫眼电影案例</span></a></h2><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">scrapy</span><span style="color:#ADDCFF;"> startproject</span><span style="color:#ADDCFF;"> Maoyan100</span></span>
<span class="line"><span style="color:#BDC4CC;">#进入项目目录</span></span>
<span class="line"><span style="color:#91CBFF;">cd</span><span style="color:#ADDCFF;"> Maoyan100</span></span>
<span class="line"><span style="color:#BDC4CC;"># 创建爬虫文件,注意url 一定要是网站域名</span></span>
<span class="line"><span style="color:#FFB757;">scrapy</span><span style="color:#ADDCFF;"> genspider</span><span style="color:#ADDCFF;"> maoyan</span><span style="color:#ADDCFF;"> www.maoyan.com</span></span></code></pre></div><p>首先在<code>items.py</code>中定义要抓取的数据结构：</p><div class="language-python" data-highlighter="shiki" data-ext="python" data-title="python" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">name </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#F0F3F6;">star </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#F0F3F6;">time </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> scrapy.Field()</span></span></code></pre></div><p>接下来编写爬虫文件<code>maoyan.py</code>：</p><div class="language-python" data-highlighter="shiki" data-ext="python" data-title="python" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> scrapy</span></span>
<span class="line"><span style="color:#FF9492;">from</span><span style="color:#F0F3F6;"> Maoyan100.items </span><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> Maoyan100Item</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Maoyan100Spider</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">scrapy</span><span style="color:#F0F3F6;">.</span><span style="color:#91CBFF;">Spider</span><span style="color:#F0F3F6;">):</span></span>
<span class="line"><span style="color:#BDC4CC;">    # name 指定爬虫文件名字</span></span>
<span class="line"><span style="color:#F0F3F6;">    name </span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;"> &#39;maoyan&#39;</span></span>
<span class="line"><span style="color:#F0F3F6;">    allowed_domains </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> [</span><span style="color:#ADDCFF;">&#39;maoyan.com&#39;</span><span style="color:#F0F3F6;">]  </span><span style="color:#BDC4CC;"># 网站域名</span></span>
<span class="line"><span style="color:#F0F3F6;">    start_urls </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> [</span><span style="color:#ADDCFF;">&#39;https://maoyan.com/board/4?offset=0&#39;</span><span style="color:#F0F3F6;">]  </span><span style="color:#BDC4CC;"># 第一个要抓取的url</span></span>
<span class="line"><span style="color:#F0F3F6;">    offset </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> 0</span><span style="color:#BDC4CC;">  #查询字符串参数</span></span>
<span class="line"><span style="color:#BDC4CC;">    # response 为 start_urls中影响对象</span></span>
<span class="line"><span style="color:#FF9492;">    def</span><span style="color:#DBB7FF;"> parse</span><span style="color:#F0F3F6;">(self,response):</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 基准xpath，匹配电影信息的dd节点对象列表</span></span>
<span class="line"><span style="color:#F0F3F6;">        dd_list </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> response.xpath(</span><span style="color:#ADDCFF;">&#39;//dl[@class=&quot;board-wrapper&quot;]/dd&#39;</span><span style="color:#F0F3F6;">)</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 给items.py 中的类：Maoyan100Item（）实例化</span></span>
<span class="line"><span style="color:#F0F3F6;">        item </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> Maoyan100Item()</span></span>
<span class="line"><span style="color:#FF9492;">        for</span><span style="color:#F0F3F6;"> dd </span><span style="color:#FF9492;">in</span><span style="color:#F0F3F6;"> dd_list:</span></span>
<span class="line"><span style="color:#F0F3F6;">            item[</span><span style="color:#ADDCFF;">&#39;name&#39;</span><span style="color:#F0F3F6;">] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> dd.xpath(</span><span style="color:#ADDCFF;">&#39;./a/@title&#39;</span><span style="color:#F0F3F6;">).get().strip()  </span><span style="color:#BDC4CC;"># 1.6以后版本使用   原来用 extract_first()</span></span>
<span class="line"><span style="color:#F0F3F6;">            item[</span><span style="color:#ADDCFF;">&#39;star&#39;</span><span style="color:#F0F3F6;">] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> dd.xpath(</span><span style="color:#ADDCFF;">&#39;.//p[@class=&quot;star&quot;]/text()&#39;</span><span style="color:#F0F3F6;">).get().strip()</span></span>
<span class="line"><span style="color:#F0F3F6;">            item[</span><span style="color:#ADDCFF;">&#39;time&#39;</span><span style="color:#F0F3F6;">] </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> dd.xpath(</span><span style="color:#ADDCFF;">&#39;.//p[@class=&quot;releasetime&quot;]/text()&#39;</span><span style="color:#F0F3F6;">).get().strip()</span></span>
<span class="line"><span style="color:#FF9492;">            yield</span><span style="color:#F0F3F6;"> item</span></span>
<span class="line"><span style="color:#FF9492;">        if</span><span style="color:#91CBFF;"> self</span><span style="color:#F0F3F6;">.offset </span><span style="color:#FF9492;">&lt;</span><span style="color:#91CBFF;"> 90</span><span style="color:#F0F3F6;">:  </span><span style="color:#BDC4CC;"># 判断条件</span></span>
<span class="line"><span style="color:#91CBFF;">            self</span><span style="color:#F0F3F6;">.offset </span><span style="color:#FF9492;">+=</span><span style="color:#91CBFF;"> 10</span></span>
<span class="line"><span style="color:#F0F3F6;">            url </span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;"> &#39;https://maoyan.com/board/4?offset=&#39;</span><span style="color:#FF9492;"> +</span><span style="color:#91CBFF;"> str</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">self</span><span style="color:#F0F3F6;">.offset)</span></span>
<span class="line"><span style="color:#BDC4CC;">            # 把url交给secheduer入队列</span></span>
<span class="line"><span style="color:#BDC4CC;">            # response会自动传给 callback 回调的 parse()函数 </span></span>
<span class="line"><span style="color:#BDC4CC;">            #Scrapy.request()向url发起请求，并将响应结果交给回调的解析函数</span></span>
<span class="line"><span style="color:#FF9492;">            yield</span><span style="color:#F0F3F6;"> scrapy.Request(</span><span style="color:#FFB757;">url</span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;">url, </span><span style="color:#FFB757;">callback</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">self</span><span style="color:#F0F3F6;">.parse)</span></span></code></pre></div><p>通过编写管道文件<code>pipelinse.py</code>文件实现数据的存储，将抓取的数据存放在 MySQL 数据库，这里需要提前建库、建表。</p><div class="language-python" data-highlighter="shiki" data-ext="python" data-title="python" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> pymysql</span></span>
<span class="line"><span style="color:#FF9492;">from</span><span style="color:#F0F3F6;"> Maoyan100.settings </span><span style="color:#FF9492;">import</span><span style="color:#FF9492;"> *</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Maoyan100Pipeline</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">object</span><span style="color:#F0F3F6;">):</span></span>
<span class="line"><span style="color:#FF9492;">    def</span><span style="color:#DBB7FF;"> process_item</span><span style="color:#F0F3F6;">(self, item, spider):</span></span>
<span class="line"><span style="color:#91CBFF;">        print</span><span style="color:#F0F3F6;">(item[</span><span style="color:#ADDCFF;">&#39;name&#39;</span><span style="color:#F0F3F6;">], item[</span><span style="color:#ADDCFF;">&#39;star&#39;</span><span style="color:#F0F3F6;">], item[</span><span style="color:#ADDCFF;">&#39;time&#39;</span><span style="color:#F0F3F6;">])</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> item  </span><span style="color:#BDC4CC;"># 多个管道有体现</span></span>
<span class="line"><span style="color:#BDC4CC;"># 存入mysql数据库的管道</span></span>
<span class="line"><span style="color:#FF9492;">class</span><span style="color:#FFB757;"> Maoyan100MysqlPipeline</span><span style="color:#F0F3F6;">(</span><span style="color:#91CBFF;">object</span><span style="color:#F0F3F6;">):</span></span>
<span class="line"><span style="color:#BDC4CC;">    #开始</span></span>
<span class="line"><span style="color:#FF9492;">    def</span><span style="color:#DBB7FF;"> open_spider</span><span style="color:#F0F3F6;">(self, spider):</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 爬虫项目启动，执行连接数据操作</span></span>
<span class="line"><span style="color:#BDC4CC;">        # 以下常量需要定义在settings配置文件中</span></span>
<span class="line"><span style="color:#91CBFF;">        self</span><span style="color:#F0F3F6;">.db </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> pymysql.connect(</span></span>
<span class="line"><span style="color:#FFB757;">            host</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">MYSQL_HOST</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#FFB757;">            user</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">MYSQL_USER</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#FFB757;">            password</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">MYSQL_PWD</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#FFB757;">            database</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">MYSQL_DB</span><span style="color:#F0F3F6;">,</span></span>
<span class="line"><span style="color:#FFB757;">            charset</span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;">MYSQL_CHARSET</span></span>
<span class="line"><span style="color:#F0F3F6;">        )</span></span>
<span class="line"><span style="color:#91CBFF;">        self</span><span style="color:#F0F3F6;">.cursor </span><span style="color:#FF9492;">=</span><span style="color:#91CBFF;"> self</span><span style="color:#F0F3F6;">.db.cursor()</span></span>
<span class="line"><span style="color:#BDC4CC;">    # 向表中插入数据</span></span>
<span class="line"><span style="color:#FF9492;">    def</span><span style="color:#DBB7FF;"> process_item</span><span style="color:#F0F3F6;">(self, item, spider):</span></span>
<span class="line"><span style="color:#F0F3F6;">        ins </span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;"> &#39;insert into movieinfo values(</span><span style="color:#FF9492;">%s</span><span style="color:#ADDCFF;">,</span><span style="color:#FF9492;">%s</span><span style="color:#ADDCFF;">,</span><span style="color:#FF9492;">%s</span><span style="color:#ADDCFF;">)&#39;</span></span>
<span class="line"><span style="color:#F0F3F6;">        L </span><span style="color:#FF9492;">=</span><span style="color:#F0F3F6;"> [</span></span>
<span class="line"><span style="color:#F0F3F6;">            item[</span><span style="color:#ADDCFF;">&#39;name&#39;</span><span style="color:#F0F3F6;">], item[</span><span style="color:#ADDCFF;">&#39;star&#39;</span><span style="color:#F0F3F6;">], item[</span><span style="color:#ADDCFF;">&#39;time&#39;</span><span style="color:#F0F3F6;">]</span></span>
<span class="line"><span style="color:#F0F3F6;">        ]</span></span>
<span class="line"><span style="color:#91CBFF;">        self</span><span style="color:#F0F3F6;">.cursor.execute(ins, L)</span></span>
<span class="line"><span style="color:#91CBFF;">        self</span><span style="color:#F0F3F6;">.db.commit()</span></span>
<span class="line"><span style="color:#FF9492;">        return</span><span style="color:#F0F3F6;"> item</span></span>
<span class="line"><span style="color:#BDC4CC;">   # 结束存放数据，在项目最后一步执行</span></span>
<span class="line"><span style="color:#FF9492;">    def</span><span style="color:#DBB7FF;"> close_spider</span><span style="color:#F0F3F6;">(self, spider):</span></span>
<span class="line"><span style="color:#BDC4CC;">        # close_spider()函数只在所有数据抓取完毕后执行一次，</span></span>
<span class="line"><span style="color:#91CBFF;">        self</span><span style="color:#F0F3F6;">.cursor.close()</span></span>
<span class="line"><span style="color:#91CBFF;">        self</span><span style="color:#F0F3F6;">.db.close()</span></span>
<span class="line"><span style="color:#91CBFF;">        print</span><span style="color:#F0F3F6;">(</span><span style="color:#ADDCFF;">&#39;执行了close_spider方法,项目已经关闭&#39;</span><span style="color:#F0F3F6;">)</span></span></code></pre></div><p>定义项目启动文件<code>run.py</code>；</p><div class="language-python" data-highlighter="shiki" data-ext="python" data-title="python" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FF9492;">from</span><span style="color:#F0F3F6;"> scrapy </span><span style="color:#FF9492;">import</span><span style="color:#F0F3F6;"> cmdline</span></span>
<span class="line"><span style="color:#BDC4CC;">#执行爬虫文件 -o 指定输出文件的格式</span></span>
<span class="line"><span style="color:#F0F3F6;">cmdline.execute(</span><span style="color:#ADDCFF;">&#39;scrapy crawl maoyan -o maoyan.csv&#39;</span><span style="color:#F0F3F6;">.split()) </span><span style="color:#BDC4CC;">#执行项目，并且将数据存csv文件格式</span></span></code></pre></div><p>修改配置文件，主要有修改以下内容：添加日志输出、激活管道<code>pipelines</code>、定义数据库常量，以及其他一些常用选项：</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>#设置 robots.txt 为False</span></span>
<span class="line"><span>ROBOTSTXT_OBEY = False</span></span>
<span class="line"><span>#设置日志级别： DEBUG &lt; INFO &lt; WARNING &lt; ERROR &lt; CRITICAL</span></span>
<span class="line"><span>#日志需要自己添加，配置文件中没有，在空白处添加即可</span></span>
<span class="line"><span>LOG_LEVEL=&#39;DEBUG&#39;</span></span>
<span class="line"><span>#定义日志输出文件</span></span>
<span class="line"><span>LOG_FILE=&#39;maoyan.log&#39;</span></span>
<span class="line"><span>#设置导出数据的编码格式</span></span>
<span class="line"><span>FEED_EXPORT_ENCODING=&#39;utf-8&#39;</span></span>
<span class="line"><span>#设置下载器延迟时间，秒为单位</span></span>
<span class="line"><span>DOWNLOAD_DELAY = 1</span></span>
<span class="line"><span>#请求头，添加useragent等信息</span></span>
<span class="line"><span>DEFAULT_REQUEST_HEADERS = {</span></span>
<span class="line"><span>  &#39;Accept&#39;: &#39;text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8&#39;,</span></span>
<span class="line"><span>  &#39;Accept-Language&#39;: &#39;en&#39;,</span></span>
<span class="line"><span>  &#39;User-Agent&#39;:&#39;Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#激活管道，并添加数据存放mysql的类，200为执行优先级</span></span>
<span class="line"><span>ITEM_PIPELINES = {</span></span>
<span class="line"><span>   &#39;Maoyan100.pipelines.Maoyan100Pipeline&#39;: 300,</span></span>
<span class="line"><span>    # 执行数据存储mysql</span></span>
<span class="line"><span>   &#39;Maoyan100.pipelines.Maoyan100MysqlPipeline&#39;: 200</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#在配置文件末尾添加mysql常用变量</span></span>
<span class="line"><span>MYSQL_HOST=&#39;localhost&#39;</span></span>
<span class="line"><span>MYSQL_USER=&#39;root&#39;</span></span>
<span class="line"><span>MYSQL_PWD=&#39;123456&#39;</span></span>
<span class="line"><span>MYSQL_DB=&#39;maoyandb&#39;</span></span>
<span class="line"><span>MYSQL_CHARSET=&#39;utf8&#39;</span></span></code></pre></div>`,54)]))}const F=a(t,[["render",o],["__file","Scrapy爬虫框架.html.vue"]]),d=JSON.parse('{"path":"/python/%E5%B8%B8%E7%94%A8%E6%A8%A1%E5%9D%97/Scrapy%E7%88%AC%E8%99%AB%E6%A1%86%E6%9E%B6.html","title":"","lang":"zh-CN","frontmatter":{"description":"Scrapy是一个 Python 实现的轻量级爬虫框架，它借助 Twisted 实现异步抓取。 Scrapy 是一个为了爬取网站数据，提取结构性数据而编写的应用框架。 可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。 爬虫基本流程 发起请求：通过 HTTP 向目标站点发起请求，即发送一个Request，请求可以包含额外的headers等...","head":[["meta",{"property":"og:url","content":"https://wsq01.github.io/wsq-blog/python/%E5%B8%B8%E7%94%A8%E6%A8%A1%E5%9D%97/Scrapy%E7%88%AC%E8%99%AB%E6%A1%86%E6%9E%B6.html"}],["meta",{"property":"og:description","content":"Scrapy是一个 Python 实现的轻量级爬虫框架，它借助 Twisted 实现异步抓取。 Scrapy 是一个为了爬取网站数据，提取结构性数据而编写的应用框架。 可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。 爬虫基本流程 发起请求：通过 HTTP 向目标站点发起请求，即发送一个Request，请求可以包含额外的headers等..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-27T02:39:10.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-27T02:39:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-27T02:39:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://wsq01.github.com\\"}]}"]]},"headers":[{"level":2,"title":"爬虫基本流程","slug":"爬虫基本流程","link":"#爬虫基本流程","children":[]},{"level":2,"title":"下载安装","slug":"下载安装","link":"#下载安装","children":[]},{"level":2,"title":"创建Scrapy爬虫项目","slug":"创建scrapy爬虫项目","link":"#创建scrapy爬虫项目","children":[]},{"level":2,"title":"Scrapy爬虫工作流程","slug":"scrapy爬虫工作流程","link":"#scrapy爬虫工作流程","children":[]},{"level":2,"title":"settings配置文件","slug":"settings配置文件","link":"#settings配置文件","children":[]},{"level":2,"title":"实战","slug":"实战","link":"#实战","children":[]},{"level":2,"title":"猫眼电影案例","slug":"猫眼电影案例","link":"#猫眼电影案例","children":[]}],"git":{"createdTime":1745401751000,"updatedTime":1745721550000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":10.17,"words":3052},"filePathRelative":"python/常用模块/Scrapy爬虫框架.md","localizedDate":"2025年4月23日","autoDesc":true}');export{F as comp,d as data};
