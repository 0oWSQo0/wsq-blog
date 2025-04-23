


[Scrapy](https://docs.scrapy.org/en/latest/intro/install.html#intro-install)是一个 Python 实现的轻量级爬虫框架，它借助 Twisted 实现异步抓取。

Scrapy 是一个为了爬取网站数据，提取结构性数据而编写的应用框架。 可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。

## 爬虫基本流程
1. 发起请求：通过 HTTP 向目标站点发起请求，即发送一个`Request`，请求可以包含额外的`headers`等信息，等待服务器响应。
2. 解析内容：得到的内容可能是 HTML，可以用正则表达式、网页解析库进行解析。可能是 Json，可以直接转为 Json 对象解析，可能是二进制数据，可以做保存或者进一步的处理。
3. 获取响应内容：如果服务器能正常响应，会得到一个`Response`，`Response`的内容便是所要获取的页面内容，类型可能有 HTML，Json 字符串，二进制数据（如图片视频）等类型。
4. 保存数据：保存形式多样，可以存为文本，也可以保存至数据库，或者保存特定格式的文件。

## 下载安装
```shell
# windows
python -m pip install scrapy
```
验证安装：
```shell
C:\Users\Administrator>python
Python 3.7.4 (tags/v3.7.4:e09359112e, Jul  8 2019, 19:29:22) [MSC v.1916 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import scrapy
>>> exit()
```
如果可以正常执行`exit()`操作，并且没有出现`ERROR`错误，则说明安装成功。
## 创建Scrapy爬虫项目
Scrapy 框架提供了一些常用的命令用来创建项目、查看配置信息，以及运行爬虫程序。

| 命令           | 格式                             | 说明               |
|--------------|:-------------------------------|:-----------------|
| startproject | scrapy startproject <项目名>      | 创建一个新项目          |
| genspider    | scrapy genspider <爬虫文件名> <域名>	 | 新建爬虫文件           |
| runspider    | scrapy runspider <爬虫文件>        | 运行一个爬虫文件，不需要创建项目 |
| crawl        | scrapy crawl <spidername>      | 运行一个爬虫项目，必须要创建项目 |
| list         | scrapy list                    | 列出项目中所有爬虫文件      |
| view         | scrapy view <url地址>            | 从浏览器中打开 url 地址   |
| shell        | csrapy shell <url地址>           | 命令行交互模式          |
| settings     | scrapy settings                | 查看当前项目的配置信息      |

```shell
scrapy startproject Baidu
cd Baidu
scrapy genspider baidu www.baidu.com
```
打开新建的项目`Baidu`会有以下项目文件：
```text
Baidu                   # 项目文件夹
├── Baidu               # 用来装载项目文件的目录
│   ├── __init__.py     # 创建项目时自动生成，无需任何改动
│   ├── items.py        # 定义要抓取的数据结构
│   ├── middlewares.py  # 中间件，用来设置一些处理规则
│   ├── pipelines.py    # 管道文件，处理抓取的数据
│   ├── settings.py     # 全局配置文件
│   └── spiders         # 用来装载爬虫文件的目录  
│       ├── __init__.py # 创建项目时自动生成，无需任何改动
│       ├── baidu.py    # 具体的爬虫程序
└── scrapy.cfg          # 项目基本配置文件
```
## Scrapy爬虫工作流程
Scrapy 框架由五大组件构成：

| 名称               | 说明                                                        |
|------------------|:----------------------------------------------------------|
| Engine(引擎)       | 整个 Scrapy 框架的核心，主要负责数据和信号在不同模块间传递                         |
| Scheduler(调度器)   | 用来维护引擎发送过来的 request 请求队列                                  |
| Downloader(下载器)	 | 接收引擎发送过来的 request 请求，并生成请求的响应对象，将响应结果返回给引擎                |
| Spider(爬虫程序)     | 处理引擎发送过来的 response， 主要用来解析、提取数据和获取需要跟进的二级URL，然后将这些数据交回给引擎 |
| Pipeline(项目管道)   | 实现数据存储，对引擎发送过来的数据进一步处理，比如存  MySQL 数据库等                    |

在整个执行过程中，还涉及到两个`middlewares`中间件，分别是下载器中间件（`Downloader Middlewares`）和蜘蛛中间件（`Spider Middlewares`），它们分别承担着不同的作用：
* 下载器中间件，位于引擎和下载器之间，主要用来包装`request`请求头，比如 UersAgent、Cookies 和代理 IP 等
* 蜘蛛中间件，位于引擎与爬虫文件之间，它主要用来修改响应对象的属性

![](Scrapy爬虫框架/1.gif)

上述示意图描述如下，当一个爬虫项目启动后，Scrapy 框架会进行以下工作：
1. 第一步：由“引擎”向爬虫文件索要第一个待爬取的 URL，并将其交给调度器加入 URL 队列当中（对应图中1/2步骤）。
2. 第二步：调度器处理完请求后， 将第一个 URL 出队列返回给引擎；引擎经由下载器中间件将该  URL 交给下载器去下载`response`对象（对应3/4步骤）。
3. 第三步：下载器得到响应对象后，将响应结果交给引擎，引擎收到后，经由蜘蛛中间件将响应结果交给爬虫文件（对应5/6步骤）。
4. 第四步：爬虫文件对响应结果进行处理、分析，并提取出所需要的数据。
5. 第五步：最后，提取的数据会交给管道文件去存数据库，同时将需要继续跟进的二级页面 URL 交给调度器去入队列（对应7/8/9步骤）。

上述过程会一直循环，直到没有要爬取的 URL 为止，也就是 URL 队列为空时才会停止。
## settings配置文件
在使用 Scrapy 框架时，还需要对配置文件进行稍微改动。下面使用 Pycharm 打开刚刚创建的“Baidu”项目，对配置文件进行如下修改：
```text
# 1、定义User-Agent
USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
# 2、是否遵循robots协议，一般设置为False
ROBOTSTXT_OBEY = False
# 3、最大并发量，默认为16
CONCURRENT_REQUESTS = 32
# 4、下载延迟时间
DOWNLOAD_DELAY = 1
```
其余常用配置项介绍：
```text
# 设置日志级别，DEBUG < INFO < WARNING < ERROR < CRITICAL
LOG_LEVEL = ' '
# 将日志信息保存日志文件中，而不在终端输出
LOG_FILE = ''
# 设置导出数据的编码格式(主要针对于json文件)
FEED_EXPORT_ENCODING = ''
# 非结构化数据的存储路径
IMAGES_STORE = '路径'
# 请求头，此处可以添加User-Agent、cookies、referer等
DEFAULT_REQUEST_HEADERS={
   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'Accept-Language': 'en',
}
# 项目管道，300 代表激活的优先级 越小越优先，取值1到1000
ITEM_PIPELINES={
  'Baidu.pipelines.BaiduPipeline':300
}
# 添加下载器中间件
DOWNLOADER_MIDDLEWARES = {}
```
## 实战
把百度的`title`抓取下来。
```shell
# 创建爬虫文件
scrapy genspider title www.baidu.com
```
打开爬虫文件`title.py`，编写如下代码，其中一些代码  Scrapy 框架已经自动生成：
```python
import scrapy

class TitleSpider(scrapy.Spider):
    name = "title"
    allowed_domains = ["www.baidu.com"]
    start_urls = ["https://www.baidu.com"]

    def parse(self, response):
        #.extract()：提取文本内容,将列表中所有元素序列化为Unicode字符串
        #.extract_first()：提取列表中第1个文本内容
        # 以下是我们自己编写的代码，而自动生成的代码不用改动
        result = response.xpath('/html/head/title/text()').extract_first()
        print('-' * 60 )
        print(result)
        print('-' * 60)
```
修改`settings`文件的配置项。
```text
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
ROBOTSTXT_OBEY = False
DEFAULT_REQUEST_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en',
}
```
使用Pycharm IDE运行项目。

为了省去终端敲命令的环节，可以在项目中自定义一个运行文件`mian.py`（该文件与`scrapy.cfg`同目录），并编写如下代码：
```python
from scrapy import cmdline
# 注意，cmdline.execute()是为了减少输入命令的操作，该方法的参数必须为列表。
# 执行爬虫文件来启动项目
cmdline.execute('scrapy crawl title'.split())
```
编写完成后，执行`main.py`文件。
```text
024-12-19 14:00:47 [scrapy.utils.log] INFO: Scrapy 2.12.0 started (bot: Baidu)
2024-12-19 14:00:47 [scrapy.utils.log] INFO: Versions: lxml 5.3.0.0, libxml2 2.11.7, cssselect 1.2.0, parsel 1.9.1, w3lib 2.2.1, Twisted 24.11.0, Python 3.13.1 (tags/v3.13.1:0671451, Dec  3 2024, 19:06:28) [MSC v.1942 64 bit (AMD64)], pyOpenSSL 24.3.0 (OpenSSL 3.4.0 22 Oct 2024), cryptography 44.0.0, Platform Windows-11-10.0.22631-SP0
2024-12-19 14:00:47 [scrapy.addons] INFO: Enabled addons:
[]
2024-12-19 14:00:47 [asyncio] DEBUG: Using selector: SelectSelector
2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor
2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.windows_events._WindowsSelectorEventLoop
2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor
2024-12-19 14:00:47 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.windows_events._WindowsSelectorEventLoop
2024-12-19 14:00:47 [scrapy.extensions.telnet] INFO: Telnet Password: 2238fe617664f4f1
2024-12-19 14:00:47 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.logstats.LogStats']
2024-12-19 14:00:47 [scrapy.crawler] INFO: Overridden settings:
{'BOT_NAME': 'Baidu',
 'FEED_EXPORT_ENCODING': 'utf-8',
 'NEWSPIDER_MODULE': 'Baidu.spiders',
 'SPIDER_MODULES': ['Baidu.spiders'],
 'TWISTED_REACTOR': 'twisted.internet.asyncioreactor.AsyncioSelectorReactor',
 'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
               '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}
2024-12-19 14:00:48 [scrapy.middleware] INFO: Enabled downloader middlewares:
['scrapy.downloadermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware',
 'scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware',
 'scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware',
 'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware',
 'scrapy.downloadermiddlewares.retry.RetryMiddleware',
 'scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware',
 'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware',
 'scrapy.downloadermiddlewares.redirect.RedirectMiddleware',
 'scrapy.downloadermiddlewares.cookies.CookiesMiddleware',
 'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware',
 'scrapy.downloadermiddlewares.stats.DownloaderStats']
2024-12-19 14:00:48 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2024-12-19 14:00:48 [scrapy.middleware] INFO: Enabled item pipelines:
[]
2024-12-19 14:00:48 [scrapy.core.engine] INFO: Spider opened
2024-12-19 14:00:48 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)
2024-12-19 14:00:48 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023
2024-12-19 14:00:49 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.baidu.com> (referer: None)
------------------------------------------------------------
百度一下，你就知道
------------------------------------------------------------
2024-12-19 14:00:49 [scrapy.core.engine] INFO: Closing spider (finished)
2024-12-19 14:00:49 [scrapy.statscollectors] INFO: Dumping Scrapy stats:
{'downloader/request_bytes': 290,
 'downloader/request_count': 1,
 'downloader/request_method_count/GET': 1,
 'downloader/response_bytes': 114217,
 'downloader/response_count': 1,
 'downloader/response_status_count/200': 1,
 'elapsed_time_seconds': 0.338409,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2024, 12, 19, 6, 0, 49, 149891, tzinfo=datetime.timezone.utc),
 'httpcompression/response_bytes': 468203,
 'httpcompression/response_count': 1,
 'items_per_minute': None,
 'log_count/DEBUG': 6,
 'log_count/INFO': 10,
 'response_received_count': 1,
 'responses_per_minute': None,
 'scheduler/dequeued': 1,
 'scheduler/dequeued/memory': 1,
 'scheduler/enqueued': 1,
 'scheduler/enqueued/memory': 1,
 'start_time': datetime.datetime(2024, 12, 19, 6, 0, 48, 811482, tzinfo=datetime.timezone.utc)}
2024-12-19 14:00:49 [scrapy.core.engine] INFO: Spider closed (finished)
```
上述过程中，我们只在`title.py`中使用 Xpath 做了解析数据的操作，就拿到了我们想要的数据。由此可见 URL 入队出队， 发起`request`请求，返回`response`响应等操作都是由 Scrapy 框架自动完成的。
## 猫眼电影案例
```shell
scrapy startproject Maoyan100
#进入项目目录
cd Maoyan100
# 创建爬虫文件,注意url 一定要是网站域名
scrapy genspider maoyan www.maoyan.com
```
首先在`items.py`中定义要抓取的数据结构：
```python
name = scrapy.Field()
star = scrapy.Field()
time = scrapy.Field()
```
接下来编写爬虫文件`maoyan.py`：
```python
import scrapy
from Maoyan100.items import Maoyan100Item
class Maoyan100Spider(scrapy.Spider):
    # name 指定爬虫文件名字
    name = 'maoyan'
    allowed_domains = ['maoyan.com']  # 网站域名
    start_urls = ['https://maoyan.com/board/4?offset=0']  # 第一个要抓取的url
    offset = 0  #查询字符串参数
    # response 为 start_urls中影响对象
    def parse(self,response):
        # 基准xpath，匹配电影信息的dd节点对象列表
        dd_list = response.xpath('//dl[@class="board-wrapper"]/dd')
        # 给items.py 中的类：Maoyan100Item（）实例化
        item = Maoyan100Item()
        for dd in dd_list:
            item['name'] = dd.xpath('./a/@title').get().strip()  # 1.6以后版本使用   原来用 extract_first()
            item['star'] = dd.xpath('.//p[@class="star"]/text()').get().strip()
            item['time'] = dd.xpath('.//p[@class="releasetime"]/text()').get().strip()
            yield item
        if self.offset < 90:  # 判断条件
            self.offset += 10
            url = 'https://maoyan.com/board/4?offset=' + str(self.offset)
            # 把url交给secheduer入队列
            # response会自动传给 callback 回调的 parse()函数 
            #Scrapy.request()向url发起请求，并将响应结果交给回调的解析函数
            yield scrapy.Request(url=url, callback=self.parse)  
```
通过编写管道文件`pipelinse.py`文件实现数据的存储，将抓取的数据存放在 MySQL 数据库，这里需要提前建库、建表。
```python
import pymysql
from Maoyan100.settings import *
class Maoyan100Pipeline(object):
    def process_item(self, item, spider):
        print(item['name'], item['star'], item['time'])
        return item  # 多个管道有体现
# 存入mysql数据库的管道
class Maoyan100MysqlPipeline(object):
    #开始
    def open_spider(self, spider):
        # 爬虫项目启动，执行连接数据操作
        # 以下常量需要定义在settings配置文件中
        self.db = pymysql.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PWD,
            database=MYSQL_DB,
            charset=MYSQL_CHARSET
        )
        self.cursor = self.db.cursor()
    # 向表中插入数据
    def process_item(self, item, spider):
        ins = 'insert into movieinfo values(%s,%s,%s)'
        L = [
            item['name'], item['star'], item['time']
        ]
        self.cursor.execute(ins, L)
        self.db.commit()
        return item
   # 结束存放数据，在项目最后一步执行
    def close_spider(self, spider):
        # close_spider()函数只在所有数据抓取完毕后执行一次，
        self.cursor.close()
        self.db.close()
        print('执行了close_spider方法,项目已经关闭')
```
定义项目启动文件`run.py`；
```python
from scrapy import cmdline
#执行爬虫文件 -o 指定输出文件的格式
cmdline.execute('scrapy crawl maoyan -o maoyan.csv'.split()) #执行项目，并且将数据存csv文件格式
```
修改配置文件，主要有修改以下内容：添加日志输出、激活管道`pipelines`、定义数据库常量，以及其他一些常用选项：
```text
#设置 robots.txt 为False
ROBOTSTXT_OBEY = False
#设置日志级别： DEBUG < INFO < WARNING < ERROR < CRITICAL
#日志需要自己添加，配置文件中没有，在空白处添加即可
LOG_LEVEL='DEBUG'
#定义日志输出文件
LOG_FILE='maoyan.log'
#设置导出数据的编码格式
FEED_EXPORT_ENCODING='utf-8'
#设置下载器延迟时间，秒为单位
DOWNLOAD_DELAY = 1
#请求头，添加useragent等信息
DEFAULT_REQUEST_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en',
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1'
}
#激活管道，并添加数据存放mysql的类，200为执行优先级
ITEM_PIPELINES = {
   'Maoyan100.pipelines.Maoyan100Pipeline': 300,
    # 执行数据存储mysql
   'Maoyan100.pipelines.Maoyan100MysqlPipeline': 200

}
#在配置文件末尾添加mysql常用变量
MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PWD='123456'
MYSQL_DB='maoyandb'
MYSQL_CHARSET='utf8'
```
