---
title: Linux其它常用命令
date: 2024-03-30
tags: linux基础
categories: linux
order: 12
---

## wget
`wget`是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP 协议下载，并可以使用 HTTP 代理。`wget`这个名称来源于`World Wide Web`与`get`的结合。所谓自动下载，是指`wget`可以在用户退出系统的之后在继续后台执行，直到下载任务完成。

```shell
wget [选项] URL
```

|              选项               | 用法                                                  |
|:-----------------------------:|:----------------------------------------------------|
|       -b, --background        | 启动后转入后台运行                                           |
|          -q, --quiet          | 静默模式，下载过程中不输出任何信息                                   |
|         -v, --verbose         | 显示详细信息（默认选项）                                        |
|        -c, --continue         | 断点续传，如果下载过程中出现中断，则在新的终端重新使用wget命令，并加上该参数，即可从断点处继续下载 |
| -P, --directory-prefix=PREFIX | 指定下载文件保存的目录，默认会在当前目录下保存，可以使用该参数指定保存的目录              |
|  -O, --output-document=FILE   | 将下载的文件写入指定的文件中，也就是对下载的文件名进行重新命名（重命名）                |
|   -o, --output-file=FILE      | 将日志消息记录到指定的文件中                                      |

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

## scp
`scp`是`secure copy`的缩写，相当于`cp`命令 + SSH。它的底层是 SSH 协议，默认端口是 22，相当于先使用`ssh`命令登录远程主机，然后再执行拷贝操作。

`scp`主要用于以下三种复制操作：
* 本地复制到远程。
* 远程复制到本地。
* 两个远程系统之间的复制。

使用`scp`传输数据时，文件和密码都是加密的，不会泄漏敏感信息。
### 基本语法
`scp`的语法类似`cp`的语法。
```shell
scp source destination
```
`source`是文件当前的位置，`destination`是文件所要复制到的位置。它们都可以包含用户名和主机名。
```shell
scp user@host:foo.txt bar.txt
```
上面命令将远程主机（`user@host`）用户主目录下的`foo.txt`，复制为本机当前目录的`bar.txt`。可以看到，主机与文件之间要使用冒号（:）分隔。

`scp`会先用 SSH 登录到远程主机，然后在加密连接之中复制文件。客户端发起连接后，会提示用户输入密码，这部分是跟 SSH 的用法一致的。

用户名和主机名都是可以省略的。用户名的默认值是本机的当前用户名，主机名默认为当前主机。注意，`scp`会使用 SSH 客户端的配置文件`.ssh/config`，如果配置文件里面定义了主机的别名，这里也可以使用别名连接。

`scp`支持一次复制多个文件。
```shell
scp source1 source2 destination
```
上面命令会将`source1`和`source2`两个文件，复制到`destination`。

注意，如果所要复制的文件，在目标位置已经存在同名文件，`scp`会在没有警告的情况下覆盖同名文件。
### 用法示例
本地文件复制到远程。
```shell
# 语法
$ scp SourceFile user@host:directory/TargetFile

# 示例
$ scp file.txt remote_username@10.10.0.2:/remote/directory
```
下面是复制整个目录的例子。
```shell
# 将本机的 documents 目录拷贝到远程主机，
# 会在远程主机创建 documents 目录
$ scp -r documents username@server_ip:/path_to_remote_directory

# 将本机整个目录拷贝到远程目录下
$ scp -r localmachine/path_to_the_directory username@server_ip:/path_to_remote_directory/

# 将本机目录下的所有内容拷贝到远程目录下
$ scp -r localmachine/path_to_the_directory/* username@server_ip:/path_to_remote_directory/
```
远程文件复制到本地。
```shell
# 语法
$ scp user@host:directory/SourceFile TargetFile

# 示例
$ scp remote_username@10.10.0.2:/remote/file.txt /local/directory
```
下面是复制整个目录的例子。
```shell
# 拷贝一个远程目录到本机目录下
$ scp -r username@server_ip:/path_to_remote_directory local-machine/path_to_the_directory/

# 拷贝远程目录下的所有内容，到本机目录下
$ scp -r username@server_ip:/path_to_remote_directory/* local-machine/path_to_the_directory/
$ scp -r user@host:directory/SourceFolder TargetFolder
```
本机发出指令，从远程主机 A 拷贝到远程主机 B。
```shell
# 语法
$ scp user@host1:directory/SourceFile user@host2:directory/SourceFile

# 示例
$ scp user1@host1.com:/files/file.txt user2@host2.com:/files
```
系统将提示你输入两个远程帐户的密码。数据将直接从一个远程主机传输到另一个远程主机。
### 配置项

| 选项 | 说明                                   |
|:--:|:-------------------------------------|
| -c | 指定文件拷贝数据传输的加密算法                      |
| -C | 是否在传输时压缩文件                           |
| -F | 指定 ssh_config 文件，供 ssh 使用            |
| -i | 指定密钥                                 |
| -l | 限制传输数据的带宽速率，单位是 Kbit/sec             |
| -p | 保留修改时间、访问时间、文件状态等原始文件的信息             |
| -P | 指定远程主机的 SSH 端口。如果远程主机使用默认端口22，可以不用指定 |
| -q | 关闭显示拷贝的进度条                           |
| -r | 是否以递归方式复制目录                          |
| -v | 显示详细的输出                              |

```shell
scp -c blowfish some_file your_username@remotehost.edu:~
scp -c blowfish -C local_file your_username@remotehost.edu:~
scp -F /home/pungki/proxy_ssh_config Label.pdf root@172.20.10.8:/root
scp -vCq -i private_key.pem ~/test.txt root@192.168.1.3:/some/path/test.txt
# scp命令占用的带宽限制为每秒 80K 比特位，即每秒 10K 字节
scp -l 80 yourusername@yourserver:/home/yourusername/* .
scp -p ~/test.txt root@192.168.1.3:/some/path/test.txt
scp -P 2222 user@host:directory/SourceFile TargetFile
scp -q Label.pdf mrarianto@202.x.x.x:.
scp -v ~/test.txt root@192.168.1.3:/root/help2356.txt
```
## shutdown
只有`root`用户才能使用这个命令。
```
shutdown [options] [time] [message]
```

| 选项 | 说明             |
|----|----------------|
| -r | 重启             |
| -h | 等待指定时间后关机      |
| -c | 取消 shutdown 操作 |

`time`格式：`hh:mm`、`+m`、`now`
## uptime
`uptime`是用来为用户提供系统从开启到当前运行`uptime`命令时系统已运行的时长信息，除此之外，还提了系统启动时间，当前登录用户，系统平均负载信息。
```shell
uptime [options]
```

| 选项 | 说明 |
|:--:|:---|
| -p | 以人类可识别的方式输出系统从开机到到当前的运行时长 |
| -s | 以yyyy-mm-dd HH:MM:SS格式输出系统的启动时间 |

```shell
[root@localhost ~]# uptime
 14:17:49 up 25 min,  7 user,  load average: 0.00, 0.00, 0.00
[root@localhost ~]# uptime -s
2024-09-08 13:52:11
[root@localhost ~]# uptime -p
up 30 minutes
```
## who
`who`命令只能显示当前登陆的用户信息。
```shell
[root@localhost ~]# who
root     pts/0        2024-09-08 09:02 (172.16.20.14)
root     pts/1        2024-09-08 14:31 (172.16.10.30)
root     pts/2        2024-09-08 14:58 (172.16.10.25)
root     pts/3        2024-09-08 10:32 (172.16.20.3)
root     pts/4        2024-09-08 12:00 (172.16.20.3)
root     pts/6        2024-09-08 10:26 (172.16.20.3)
root     pts/7        2024-09-08 12:00 (172.16.20.3)
```
## w
`w`命令是`uptime + who`命令的结合体。
```shell
[root@localhost ~]# w
 15:13:36 up  1:21,  1 user,  load average: 0.34, 0.14, 0.05
USER     TTY        LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0     13:52    0.00s  0.05s  0.01s w
```
## uname
`uname`命令用于查看系统的内核名称，节点名称，内核发行版本，内核版本，硬件名称，硬件平台，处理器类型，操作系统等信息。
```shell
uname [选项]
```

| 选项                     | 说明       |
|------------------------|----------|
| -a, --all              | 显示全部信息   |
| -s, --kernel-name      | 显示内核名称   |
| -n, --nodename         | 显示主机名称   |
| -m, --machine          | 显示硬件架构名称 |
| -o, --operating-system | 显示操作系统名称 |
