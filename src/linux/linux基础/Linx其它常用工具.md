---
index: false
---

## wget
`wget`是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP 协议下载，并可以使用 HTTP 代理。`wget`这个名称来源于`World Wide Web`与`get`的结合。所谓自动下载，是指`wget`可以在用户退出系统的之后在继续后台执行，直到下载任务完成。

```shell
wget [选项] URL
```
常用参数：

|              选项               | 用法                                                                 |
|:-----------------------------:|:-------------------------------------------------------------------|
|       -b, --background        | 启动后转入后台运行                                                          |
|          -q, --quiet          | 静默模式，下载过程中不输出任何信息                                                  |
|         -v, --verbose         | 显示详细信息（默认选项）                                                       |
|        -c, --continue         | 断点续传，如果下载过程中出现中断，则在新的终端重新使用wget命令，并加上该参数，即可从断点处继续下载。该参数在下载大文件时非常实用 |
| -P, --directory-prefix=PREFIX | 指定下载文件保存的目录，默认会在当前目录下保存，可以使用该参数指定保存的目录                             |
|  -O, --output-document=FILE   | 将下载的文件写入指定的文件中，也就是对下载的文件名进行重新命名（重命名）                               |
|   -o, --output-file=FILE      | 将日志消息记录到指定的文件中                                                     |

### 用法
使用`wget`下载单个文件，下载`a.sh`文件并保持在当前目录中：
```shell
wget https://download.djl.cn/a.sh
```
使用`-O`参数重命名，下载`a.sh`文件并对下载的文件重命名为`a111.sh`：
```shell
wget -O a111.sh https://download.djl.cn/a.sh
```
使用`-c`参数进去断点续传，重新启动下载中断的文件。需要继续中断的下载时可以使用`-c`参数：
```shell
wget -c a111.sh https://download.djl.cn/a.sh
```
使用`-b`参数后台下载，使用后台下载，会在当前目录生成一个名字为`wget-log`的日志文件：
```shell
wget -b https://download.djl.cn/a.sh
```
使用`-o, --output-file=FILE`参数把下载信息存入日志文件，你不希望下载信息直接显示在终端而是在一个日志文件：
```shell
wget -o download.log https://download.djl.cn/a.sh
```
## curl
`curl`命令用来请求 Web 服务器。它的名字就是客户端（`client`）的 URL 工具的意思。
```shell
curl [参数] URL
```

| 选项 |              说明               | 使用                                                |
|:--:|:-----------------------------:|:--------------------------------------------------|
| -b |        向服务器发送 Cookie          | `curl -b 'foo1=bar;foo2=bar2' https://baidu.com`  |
| -d |        发送 POST 请求的数据体         | `curl -d 'login=emma＆password=123' https://baidu.com/login` |
| -G |         构造 URL 的查询字符串         | `curl -G -d 'q=kitties' -d 'count=20' https://baidu.com/search` |
| -o |    将服务器的回应保存成文件，等同于wget命令     | `curl -o example.html https://baidu.com`          |
| -O | 将服务器回应保存成文件，并将 URL 的最后部分当作文件名 | `curl -O https://www.example.com/foo/bar.html`    |
| -s |          不输出错误和进度信息           | `curl -s https://www.example.com`                 |
| -S |      指定只输出错误信息，通常与-s一起使用      | `curl -S -o /dev/null https://google.com`         |
| -u |       用来设置服务器认证的用户名和密码        | `curl -u 'admin:123456' https://baidu.com/login`  |
| -X |         指定 HTTP 请求的方法         | `curl -X POST https://baidu.com`                  |
