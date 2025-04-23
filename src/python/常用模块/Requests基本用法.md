

[`Requests`库](https://requests.readthedocs.io/en/latest/)是在`urllib`的基础上开发而来，与`urllib`相比，R`equests`更加方便、快捷，因此在编写爬虫程序时R`equests`库使用较多。
## 安装
```shell
pip3 install requests
```
## 发送请求
使用`Requests`发送网络请求非常简单。

我们首先需要导入`Requests`模块：
```
import requests
```
然后，我们就可以尝试获取某个网页。本例子中，我们来获取 Github 的公共时间线：
```python
r = requests.get('https://api.github.com/events')
```
现在，我们有一个名为`r`的`Response`对象。我们可以从这个对象中获取所有我们想要的信息。

`Requests` 简便的 API 意味着所有 HTTP 请求类型都是显而易见的。例如，你可以这样发送一个 HTTP POST 请求：
```python
r = requests.post('http://httpbin.org/post', data = {'key':'value'})
```
那么其他 HTTP 请求类型：`PUT，DELETE，HEAD`以及`OPTIONS`都是一样的：
```python
r = requests.put('http://httpbin.org/put', data = {'key':'value'})
r = requests.delete('http://httpbin.org/delete')
r = requests.head('http://httpbin.org/get')
r = requests.options('http://httpbin.org/get')
```
## 传递参数
我们在发送请求时，经常需要向服务端发送请求参数，通常参数都是以键/值对的形式置于 URL 中，跟在一个问号的后面。例如，`httpbin.org/get?key=val`。`Requests`允许你使用`params`关键字参数，以一个字符串字典来提供这些参数。举例来说，如果你想传递`key1=value1`和`key2=value2`到`httpbin.org/get`，那么你可以使用如下代码：
```python
payload = {'key1': 'value1', 'key2': 'value2'}
r = requests.get("http://httpbin.org/get", params=payload)
print(r.url)

# 输出结果
http://httpbin.org/get?key1=value1&key2=value2
```
注意字典里值为`None`的键都不会被添加到 URL 的查询字符串里。

你还可以将一个列表作为值传入：
```python
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
r = requests.get("http://httpbin.org/get", params=payload)

# 输出结果
http://httpbin.org/get?key1=value1&key2=value2&key2=value3
```
## 响应内容
我们可以通过返回读取服务器响应的内容，以请求百度首页为例：
```python
import requests
r = requests.get('http://www.baidu.com')
print(r.text)

#返回（太多，只显示一部分）

<!DOCTYPE html>
<!--STATUS OK--><html> <head><meta http-eq...
```
`Requests`会自动解码来自服务器的内容，大多数`unicode`字符集都能被无缝地解码。

请求发出后，`Requests`会基于 HTTP 头部对响应的编码作出有根据的推测。当你访问`r.text`之时，`Requests`会使用其推测的文本编码。你可以通过`r.encoding`来获取`Requests`使用的编码：
```python
r.encoding

# 输出结果
'utf-8'
```
并且能够使用`r.encoding`属性来改变它：
```python
r.encoding = 'ISO-8859-1'
```
如果你改变了编码，每当你访问`r.text`，`Requests`都将会使用`r.encoding`的新值。
### 二进制响应内容
对于非文本请求（例如图片），你也能以字节的方式访问请求响应体，`Requests` 会自动为你解码`gzip`和`deflate`传输编码的响应数据。

例如，以请求返回的二进制数据创建一张图片，你可以使用如下代码：
```python
import requests
from PIL import Image
from io import BytesIO

r = requests.get('http://img.sccnn.com/bimg/326/203.jpg')
print(r.content)
bi = BytesIO(r.content)
print(bi)
i = Image.open(bi)
print(i)

# 输出结果
b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\...
<_io.BytesIO object at 0x1112fdbf8>
<PIL.JpegImagePlugin.JpegImageFile image mode=RGB size=600x400 at 0x111020588>
```
### JSON 响应内容
`Requests`中有一个内置的 JSON 解码器，可以帮助你处理 JSON 数据：
```python
r = requests.get('https://api.github.com/events')
print(r.json())

# 输出结果
[{u'repository': {u'open_issues': 0, u'url': 'https://github.com/...
```
如果 JSON 解码失败，`r.json()`就会抛出一个异常。
```python
r = requests.get('https://www.baidu.com')
print(r.json())

# 输出结果
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
```
需要注意的是，成功调用`r.json()`并不意味着响应的成功。有的服务器会在失败的响应中包含一个 JSON 对象（比如 HTTP 500 的错误细节）。这种 JSON 会被解码返回。要检查请求是否成功，请使用`r.raise_for_status()`或者检查`r.status_code`是否和你的期望相同。
### 原始响应内容
在极少数情况下，你可能想获取来自服务器的原始套接字响应，那么你可以访问`r.raw`。 这个时候请确保在初始请求中设置了`stream=True`。具体你可以这么做：
```python
r = requests.get('https://api.github.com/events', stream=True)
print(r.raw)
print(r.raw.read(10))

# 输出结果
<requests.packages.urllib3.response.HTTPResponse object at 0x101194810>
'\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03'
```
## 设置请求头
如果你在爬取某个页面内容的时候，发现获取的数据为空，但是直接用浏览器访问 URL 没问题，这时候很有可能是你被服务器识别为爬虫用户了，怎么办呢？我们应该要模拟浏览器去请求，这时候你需要为请求添加 HTTP 头部信息，只要简单地传递一个`dict`给`headers`参数就可以了。

例如，我们设置一下`User-Agent`：
```python
url = 'http://www.baidu.com'
headers = {'User-Agent': 'myagent/2.21.0'}
r = requests.get(url, headers=headers)
print(r.request.headers)

# 输出结果
{'User-Agent': 'myagent/2.21.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
```
可以看到，请求的`User-Agent`已经变成了设置的`myagent/2.21.0`。
## 复杂的 POST 请求
我们在使用 POST 请求的时候，打印一下`r.text`会发现每次都会出现几个关键字：
```json
{
	"args": {},
	"data": "",
	"files": {},
	"form": {},
	"headers": {},
	"json": null,
	"origin": "221.232.172.222, 221.232.172.222",
	"url": "https://httpbin.org/post"
}
```
这些关键字都可以在 POST 的参数里面设置。其中`headers`和`args`分别表示请求头和参数信息。`origin`是指请求的路由`ip`，`url`是我们请求的`url`，其他几个我们都是可以设置的。
### 设置data参数
如果你在 POST 请求时想提交表单，也只需要简单的传递一个字典给`data`参数即可。你的数据字典在发出请求时会自动编码为表单形式：
```python
payload = {'key1': 'value1', 'key2': 'value2'}
r = requests.post("http://httpbin.org/post", data=payload)
print(r.text)

# 输出结果
{
  ...
  "form": {
    "key1": "value1", 
    "key2": "value2"
  }, 
  ...
}
```
也可以为`data`参数传入一个元组列表。`Requests`会自动将其转换成一个列表：
```python
payload = (('key1', 'value1'), ('key1', 'value2'))
r = requests.post("http://httpbin.org/post", data=payload)
print(r.text)

# 输出结果
{
  ...
  "form": {
    "key1": [
      "value1", 
      "value2"
    ]
  }, 
  ...
}
```
### 设置 json 参数
`Requests`允许你使用`json`直接传递参数，然后它就会被自动编码。
```python
payload = {'some': 'data'}
r = requests.post("http://httpbin.org/post", json=payload)
print(r.text)

# 输出结果
{
  "args": {}, 
  "data": "{\"some\": \"data\"}", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Content-Length": "16", 
    "Content-Type": "application/json", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.21.0"
  }, 
  "json": {
    "some": "data"
  }, 
  "origin": "221.232.172.222, 221.232.172.222", 
  "url": "https://httpbin.org/post"
}
```
注意，这里不仅赋值给`json`了，而且还自动赋值给`data`了，`json`里面的键值对也被自动编码到`data`中了。
### 设置文件参数
`Requests`上传文件很简单：
```python
files = {'file': open('test.txt', 'rb')}
r = requests.post('http://httpbin.org/post', files=files)
print(r.text)

# 输出结果
{
  ...
  "files": {
    "file": "this is a file test"
  }, 
  ...
}
```
你也可以增加一个参数，把字符串发送到上传的文件中：
```python
files = {'file': ('test.txt', 'some,data,to,send\nanother,row,to,send\n')}
r = requests.post('http://httpbin.org/post', files=files)
print(r.text)

# 输出结果
{
  ...
  "files": {
    "file": "some,data,to,send\nanother,row,to,send\n"
  }, 
  ...
}
```
## 响应状态码和响应头
我们可以从服务器响应的结果中获取状态码和响应头的信息：
```python
r = requests.get('http://httpbin.org/get')
print(r.status_code)

# 输出结果
200
```
为方便引用，`Requests`还附带了一个内置的状态码查询对象：
```python
print(r.status_code == requests.codes.ok)

# 输出结果
True
```
我们还可以查看响应的响应头信息：
```python
r = requests.get('http://httpbin.org/get')
print(r.headers)

# 输出结果
{'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*', 'Content-Encoding': 'gzip', 'Content-Type': 'application/json', 'Date': 'Wed, 18 Sep 2019 12:22:06 GMT', 'Referrer-Policy': 'no-referrer-when-downgrade', 'Server': 'nginx', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'X-XSS-Protection': '1; mode=block', 'Content-Length': '183', 'Connection': 'keep-alive'}
```
要获取响应头的某个字段值，我们可以这样：
```python
print(r.headers['Content-Encoding'])

# 输出结果
gzip
```
## Cookie
如果一个响应中包含了`cookie`，那么我们可以利用`cookies`变量来拿到:
```python
url = 'http://example.com/some/cookie/setting/url'
r = requests.get(url)
r.cookies['example_cookie_name']

# 输出结果
'example_cookie_value'
```
以上程序仅是样例，运行程序并不会得到下面的返回。需要包含`cookie`的响应才可以得到。

另外可以利用`cookies`变量来向服务器发送`cookies`信息：
```python
cookies = dict(cookies_are='working')
r = requests.get('http://httpbin.org/cookies', cookies=cookies)
print(r.text)

# 输出结果
{
  "cookies": {
    "cookies_are": "working"
  }
}
```
可以看到我们设置`cookies`参数后，返回中就包含了我们设置的信息。

`Cookie`的返回对象为`RequestsCookieJar`，它和字典类似，适合跨域名跨路径使用，也就是说我们可以为不同的域名或者路径设置不同的`cookie`。你还可以把`Cookie Jar`传到`Requests`中：
```python
jar = requests.cookies.RequestsCookieJar()
#为路径/cookies设置cookie
jar.set('tasty_cookie', 'yum', domain='httpbin.org', path='/cookies')
#为路径/elsewhere设置cookie
jar.set('gross_cookie', 'blech', domain='httpbin.org', path='/elsewhere')
#请求路径为/cookies的URL
url = 'http://httpbin.org/cookies'
r = requests.get(url, cookies=jar)
print(r.text)

# 输出结果
{
  "cookies": {
    "tasty_cookie": "yum"
  }
}
```
## 重定向与请求历史
默认情况下，除了`HEAD`请求, `Requests`会自动处理所有重定向。

可以使用响应对象的`history`方法来追踪重定向。

`Response.history`是一个`Response`对象的列表，这个对象列表按照从最老到最近的请求进行排序。

例如，Github 将所有的 HTTP 请求重定向到 HTTPS：
```python
r = requests.get('http://github.com')
print(r.url)
print(r.status_code)
print(r.history)

# 输出结果
https://github.com/
200
[<Response [301]>]
```
我们还可以通过`allow_redirects`参数禁用重定向处理：
```python
r = requests.get('http://github.com', allow_redirects=False)
print(r.status_code)
print(r.history)

# 输出结果
301
[]
```
## 超时
你可以通过设置`timeout`参数来告诉`requests`在经过以`timeout`参数设定的秒数时间之后停止等待响应。
```python
requests.get('http://github.com', timeout=0.001)

# 输出结果
requests.exceptions.ConnectTimeout: HTTPConnectionPool(host='github.com', port=80): Max retries exceeded with url: / (Caused by ConnectTimeoutError(<urllib3.connection.HTTPConnection object at 0x110adf400>, 'Connection to github.com timed out. (connect timeout=0.001)'))
```
这里通过设置极短的超时时间导致请求停止等待响应，从而引发报错。注意`timeout`仅对连接过程有效，与响应体的下载无关。`timeout`并不是整个下载响应的时间限制，而是如果服务器在`timeout`秒内没有应答，将会引发一个异常。

我们知道，一个 HTTP 请求会有`connect`和`read`两部分时间，上面的例子中设置的是二者加起来的超时时间。如果要分别制定，我们需要传入一个元组：
```python
r = requests.get('https://github.com', timeout=(3.05, 27))
```
如果远端服务器很慢，如果你想要`Requests`一直等待服务器返回，那么可以给`timeout`赋值`None`：
```python
r = requests.get('https://github.com', timeout=None)
```
## 会话维持
在`requests`中，直接使用`get()`或`post()`方法确实可以做到模拟网页的请求，但是这实际上是两个不同的会话，相当于用了两个浏览器打开不同的页面，而这两个页面是不共享`cookies`的。会话维持相当于打在原来的浏览器上新开了一个页面，这样就不用每次去设置`cookies`了——这就是`Session`对象。
```python
s = requests.Session()
s.get('http://httpbin.org/cookies/set/sessioncookie/123456789')
r = s.get("http://httpbin.org/cookies")
print(r.text)

# 输出结果
{
  "cookies": {}
}
```
这里我们请求了一个测试网站，设置了一个`Cookie`，名称为`num`，内容为 123456，之后又发起了请求，获取`Cookies`，结果并没有取到第一次请求的`Cookie`。

试想一种常见的场景：我登录一个网站之后，点击里面某个功能的时候，是不需要再登录的，为什么？因为登录操作之后，浏览器与服务器之间就建立了一个`Session`，我在同一浏览器再次请求服务器的时候，共用的是这一个`Session`，所以不用再次登录。那么如果我使用代码去请求呢？按照上面的例子，我请求两次并不会共享`Session`，那就没法实现这个场景功能。而`Requests`的会话可以实现这种场景功能。
```python
session = requests.Session()
session.get('http://httpbin.org/cookies/set/num/123456')
res = session.get('http://httpbin.org/cookies')
print(res.text)

# 输出结果
{
  "cookies": {
    "num": "123456"
  }
}
```
这个例子中，我们使用`Session`对象请求，第一次请求设置的`Cookie`，在第二次请求中我们仍然可以获取到，说明两次请求在同一个`Session`中。
## 身份认证
在访问网站时，我们经常会遇到需要身份认证的页面，需要输入用户名和密码才能登录网站。这个时候我们可以使用`Requests`自带的身份认证功能。
```python
import requests
from requests.auth import HTTPBasicAuth

#请将username和password替换成自己在该网站的登录用户名和密码
res = requests.get('http://www.baidu.com', auth=HTTPBasicAuth('username', 'password'))
print(res.status_code)

# 输出结果
200
```
如果用户名和密码都正确的话，就会成功，返回 200 状态码。否则返回 401 状态码。
## SSL证书验证
现在随处可见`https`开头的网站，`Requests`可以为 HTTPS 请求验证 SSL 证书，就像 web 浏览器一样。要想检查某个主机的 SSL 证书，你可以使用`verify`参数：
```python
import requests

r = requests.get('https://httpbin.org', verify=True)
print(r.text)
```
如果想检查验证某个主机的 SSL 证书，就将`verify`设置为`True`，如果证书无效，就会报`requests.exceptions.SSLError`的错误。如果想跳过检查，就将`verify`参数设置为`False`。`verify`参数默认是`True`，所以如果需要的话，需要手动设置下这个变量。
## 代理设置
对于某些网站，如果请求几次，或许能正常获取内容。一旦开始爬取，对于大规模的频繁请求，网站可能会弹出验证码，或者跳转到登陆认证，或者封禁 IP，导致一定时间内无法访问。此时，就需要设置代理还解决这个问题，就要用到`proxies`参数。
```python
# 代理设置
proxies = {
    'http': 'http://127.0.0.1:9001',
    'https': 'https://127.0.0.2:9002'
}
requests.get('http://www.baidu.com', proxies=proxies)
```
这里的两个地址都是编的，仅做示例用。如果你想跑起来的话需要换成有效代理。
## SOCKS
除了基本的 HTTP 代理，`Requests`还支持 SOCKS 协议的代理。这是一个可选功能，若要使用，需要安装第三方库。
```shell
pip install requests[socks]
```
安装好依赖以后，使用 SOCKS 代理和使用 HTTP 代理一样简单：
```python
proxies = {
    'http': 'socks5://user:pass@host:port',
    'https': 'socks5://user:pass@host:port'
}
```
