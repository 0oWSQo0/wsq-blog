



## 第一个Python爬虫程序
下面使用 Python 内置的`urllib`库获取网页的 html 信息。注意，`urllib`库属于 Python 的标准库模块，无须单独安装，它是 Python 爬虫的常用模块。
### 获取网页html信息
#### 1. 获取响应对象
向[百度](http://www.baidu.com/)发起请求，获取百度首页的 HTML 信息：
```python
# 导包,发起请求使用urllib库的request请求模块
# 另外一种导包方式
# from urllib import request
import urllib.request
# urlopen()向URL发请求,返回响应对象,注意url必须完整
response=urllib.request.urlopen('http://www.baidu.com/')
print(response)
```
上述代码会返回百度首页的响应对象， 其中`urlopen()`表示打开一个网页地址。注意：请求的`url`必须带有`http`或者`https`传输协议。

输出结果：
```
<http.client.HTTPResponse object at 0x00000266F8D58D60>
```
#### 2. 输出HTML信息
```python
import urllib.request
response=urllib.request.urlopen('http://www.baidu.com/')
#提取响应内容
html = response.read().decode('utf-8')
#打印响应内容
print(html)
```
输出结果：
```
<!DOCTYPE html><!--STATUS OK--><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta content="always" name="referrer"><meta name="theme-color" content="#ffffff"><meta name="description" content="全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。"><link ...
```
通过调用`response`响应对象的`read()`方法提取 HTML 信息，该方法返回的结果是字节串类型(`bytes`)，因此需要使用`decode()`转换为字符串。

通过上述代码获取了百度首页的 html 信息，这是最简单、最初级的爬虫程序。
### urllib常用方法
`Request()`方法用于创建请求对象、包装请求头，比如重构`User-Agent`（即用户代理，指用户使用的浏览器）使程序更像人类的请求，而非机器。重构`User-Agent`是爬虫和反爬虫斗争的第一步。

`urllib.request.Request(url,headers)`
参数说明：
* `url`：请求的URL地址。
* `headers`：重构请求头。

`html`响应对象方法
```
bytes = response.read() # read()返回结果为 bytes 数据类型
string = response.read().decode() # decode()将字节串转换为 string 类型
url = response.geturl() # 返回响应对象的URL地址
code = response.getcode() # 返回请求时的HTTP响应码
```
## User-Agent（用户代理）
`User-Agent`即用户代理，简称“UA”，它是一个特殊字符串头。网站服务器通过识别 “UA”来确定用户所使用的操作系统版本、CPU 类型、浏览器版本等信息。而网站服务器则通过判断 UA 来给客户端发送不同的页面。

常见的`User-Agent`请求头：

| 系统      | 浏览器     | User-Agent字符串  |
|---------|---------|:--|
| Mac     | Chrome  | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36  |
| Mac     | Firefox | Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:65.0) Gecko/20100101 Firefox/65.0  |
| Mac     | Safari  | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15  |
| Windows | Edge    | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763  |
| Windows | IE      | 	Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko  |
| Windows | Chrome  | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36  |
| iOS     | Chrome  | Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/31.0.1650.18 Mobile/11B554a Safari/8536.25|
| iOS     | Safari  | Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4  |
| Android | Chrome  | Mozilla/5.0 (Linux; Android 4.2.1; M040 Build/JOP40D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36  |
| Android | Webkit  | 	Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; M351 Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30  |

使用上表中的浏览器 UA，我们可以很方便的构建出`User-Agent`。通过[在线识别工具](https://useragent.buyaocha.com/#google_vignette)，可以查看本机的浏览器版本以及 UA 信息：

|        |                                                                                                                 |
|--------|:----------------------------------------------------------------------------------------------------------------|
| 浏览器名字  | Chrome                                                                                                          |
| 浏览器版本  | 131.0.0.0                                                                                                       |
| 系统平台   | Windows                                                                                                         |
| 原始UA信息 | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 |

### 爬虫程序UA信息
通过向 [HTTP 测试网站](http://httpbin.org/)发送 GET 请求来查看请求头信息，从而获取爬虫程序的 UA。
```python
import urllib.request

res = urllib.request.urlopen('http://httpbin.org/get')
html = res.read().decode('utf-8')
print(html)
```
程序运行后，输出的请求头信息如下所示：
```
{
  "args": {}, 
  "headers": {
    "Accept-Encoding": "identity", 
    "Host": "httpbin.org", 
    "User-Agent": "Python-urllib/3.13", 
    "X-Amzn-Trace-Id": "Root=1-675ff4b8-6f0bcc827057cbbd34b40e70"
  }, 
  "origin": "27.187.253.34", 
  "url": "http://httpbin.org/get"
}
```
从输出结果可以看出，`User-Agent`竟然是`Python-urllib/3.13`，这显然是爬虫程序访问网站。因此就需要重构`User-Agent`，将其伪装成“浏览器”访问网站。
### 重构爬虫UA信息
```python
from urllib import request
# 定义变量：URL 与 headers
url = 'http://httpbin.org/get' #向测试网站发送请求
#重构请求头，伪装成 Mac火狐浏览器访问，可以使用上表中任意浏览器的UA信息
headers = {
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:65.0) Gecko/20100101 Firefox/65.0'
}
# 1、创建请求对象，包装ua信息
req = request.Request(url=url,headers=headers)
# 2、发送请求，获取响应对象
res = request.urlopen(req)
# 3、提取响应内容
html = res.read().decode('utf-8')
print(html)
```
```
{
  "args": {}, 
  "headers": {
    "Accept-Encoding": "identity", 
    "Host": "httpbin.org", 
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:65.0) Gecko/20100101 Firefox/65.0", 
    "X-Amzn-Trace-Id": "Root=1-675ff631-440d851c1bec00c7130cb375"
  }, 
  "origin": "27.187.253.34", 
  "url": "http://httpbin.org/get"
}
```
上述代码重构了`User-Agent`字符串信息，这样就解决了网站通过识别`User-Agent`来封杀爬虫程序的问题。当然这只是应对反爬策略的第一步。重构 UA 也可以通过其他模块实现，比如`requests`模块。
## 构建User-Agent代理池
在编写爬虫程序时，一般都会构建一个`User-Agent`（用户代理）池，就是把多个浏览器的 UA 信息放进列表中，然后再从中随机选择。构建用户代理池，能够避免总是使用一个 UA 来访问网站，因为短时间内总使用一个 UA 高频率访问的网站，可能会引起网站的警觉，从而封杀掉 IP。
### 自定义UA代理池
构建代理池的方法也非常简单，在 Pycharm 工作目录中定义一个`ua_info.py`文件，并将以下 UA 信息以列表的形式粘贴到该文件中：
```python
ua_list = [
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
    'User-Agent:Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11',
    'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0',
    ' Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1',
    ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
]
```
经过上述操作，用户代理池就构建成功。
### 模块随机获取UA
也可以使用专门第三方的模块来随机获取浏览器 UA 信息，不过该模块需要单独安装：
```shell
pip install fake-useragent
```
```python
from fake_useragent import UserAgent
#实例化一个对象
ua=UserAgent()
#随机获取一个浏览器ua
print(ua.chrome)
print(ua.firefox)
```
```
Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36
Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0
```
## URL编码/解码
当 URL 路径或者查询参数中，带有中文或者特殊字符的时候，就需要对 URL 进行编码（采用十六进制编码格式）。URL 编码的原则是使用安全字符去表示那些不安全的字符。
### 哪些字符需要编码
URL 之所以需要编码，是因为 URL 中的某些字符会引起歧义，比如 URL 查询参数中包含了`&`或者`%`就会造成服务器解析错误；再比如，URL 的编码格式采用的是 ASCII 码而非 Unicode 格式，这表明 URL 中不允许包含任何非 ASCII 字符（比如中文），否则就会造成 URL 解析错误。

URL 编码协议规定（RFC3986 协议）：URL 中只允许使用 ASCII 字符集可以显示的字符，比如英文字母、数字、和`- _ . ~ ! *`这 6 个特殊字符。当在 URL 中使用不属于 ASCII 字符集的字符时，就要使用特殊的符号对该字符进行编码，比如空格需要用`%20`来表示。

哪些字符需要编码，分为以下三种情况：
* ASCII 表中没有对应的可显示字符，例如，汉字。
* 不安全字符，包括：`# " % <> [] {} | \ ^ \` `。
* 部分保留字符，即`& / : ; = ? @`。

| 字符  | 含义                      | 十六进制值编码 |
|-----|-------------------------|---------|
| +   | URL 中 + 号表示空格           | %2B     |
| 空格  | URL中的空格可以编码为 + 号或者 %20	 | %20     |
| /   | 分隔目录和子目录                | %2F     |
| ?   | 分隔实际的 URL 和参数           | %3F     |
| %   | 指定特殊字符                  | 	%25    |
| #   | 表示书签                    | %23     |
| &   | URL 中指定的参数间的分隔符         | %26     |
| =   | URL 中指定参数的值             | %3D     |

### Python实现编码与解码
Python 的标准库`urllib.parse`模块中提供了用来编码和解码的方法，分别是`urlencode()`与`unquote()`方法。

| 方法          | 说明                     |
|-------------|:-----------------------|
| urlencode() | 实现了对 url 地址的编码操作       |
| unquote()   | 将编码后的 url 地址进行还原，被称为解码 |

#### 编码urlencode()
```text
https://www.baidu.com/s?wd=爬虫
```
```python
#导入parse模块
from urllib import parse
#构建查询字符串字典
query_string = {
	'wd' : '爬虫'
}
#调用parse模块的urlencode()进行编码
result = parse.urlencode(query_string)
#使用format函数格式化字符串，拼接url地址
url = 'http://www.baidu.com/s?{}'.format(result)
print(url)
```
输出结果：
```
wd=%E7%88%AC%E8%99%AB
http://www.baidu.com/s?wd=%E7%88%AC%E8%99%AB
```
编码后的 URL 地址依然可以通过地网页址栏实现搜索功能。

除了使用`urlencode()`方法之外，也可以使用`quote(string)`方法实现编码 ：
```python
from urllib import parse
#注意url的书写格式，和 urlencode存在不同
url = 'http://www.baidu.com/s?wd={}'
word = input('请输入要搜索的内容:')
#quote()只能对字符串进行编码
query_string = parse.quote(word)
print(url.format(query_string))
```
注意：`quote()`只能对字符串编码，而`urlencode()`可以直接对查询字符串字典进行编码。因此在定义 URL 时，需要注意两者之间的差异。
```python
# urllib.parse
urllib.parse.urlencode({'key':'value'}) #字典
urllib.parse.quote(string) #字符串
```
#### 解码unquote(string)
解码是对编码后的 URL 进行还原的一种操作：
```python
from urllib import parse
string = '%E7%88%AC%E8%99%AB'
result = parse.unquote(string)
print(result)
```
输出结果：
```
爬虫
```
#### URL地址拼接方式
除了使用`format()`函数外，还可以使用字符串相加，以及字符串占位符：
```python
# 1、字符串相加
  baseurl = 'http://www.baidu.com/s?'
  params='wd=%E7%88%AC%E8%99%AB'
  url = baseurl + params

# 2、字符串格式化（占位符）
  params='wd=%E7%88%AC%E8%99%AB'
  url = 'http://www.baidu.com/s?%s'% params

# 3、format()方法
  url = 'http://www.baidu.com/s?{}'
  params='wd=%E7%88%AC%E8%99%AB'
  url = url.format(params)
```
## 爬虫实战案例
首先我们对要编写的爬虫程序进行简单地分析，该程序可分为以下三个部分：
* 拼接 url 地址
* 发送请求
* 将照片保存至本地

```python
from urllib import request,parse
# 1.拼url地址
url = 'http://www.baidu.com/s?wd={}'
word = input('请输入搜索内容:')
params = parse.quote(word)
full_url = url.format(params)
# 2.发请求保存到本地
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0'}
req = request.Request(url=full_url,headers=headers)
res = request.urlopen(req)
html = res.read().decode('utf-8')
# 3.保存文件至当前目录
filename = word + '.html'
with open(filename,'w',encoding='utf-8') as f:
    f.write(html)
```
### 函数式编程修改程序
```python
from urllib import request
from urllib import parse

# 拼接URL地址
def get_url(word):
  url = 'http://www.baidu.com/s?{}'
  #此处使用urlencode()进行编码
  params = parse.urlencode({'wd':word})
  url = url.format(params)
  return url

# 发请求,保存本地文件
def request_url(url,filename):
  headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0'}
  # 请求对象 + 响应对象 + 提取内容
  req = request.Request(url=url,headers=headers)
  res = request.urlopen(req)
  html = res.read().decode('utf-8')
  # 保存文件至本地
  with open(filename,'w',encoding='utf-8') as f:
    f.write(html)

# 主程序入口
if __name__ == '__main__':
  word = input('请输入搜索内容:')
  url = get_url(word)
  filename = word + '.html'
  request_url(url,filename)
```
