



## Redis是什么
[Redis](https://redis.io/) 全称 Remote Dictionary Server（即远程字典服务），它是一个基于内存实现的键值型非关系（NoSQL）数据库，由意大利人 Salvatore Sanfilippo 使用 C 语言编写。

与 SQL 型数据库截然不同，Redis 没有提供新建数据库的操作，因为它自带了 16（0—15）个数据库（默认使用 0 库）。在同一个库中，`key`是唯一存在的、不允许重复的，它就像一把“密钥”，只能打开一把“锁”。键值存储的本质就是使用`key`来标识`value`，当想要检索`value`时，必须使用与`value`相对应的`key`进行查找。
## Redis架构
Redis体系架构主要分为两个部分：
* Redis服务端
* Redis客户端

客户端和服务端可以位于同一台计算机上，也可以位于不同的计算机上。服务端是整个架构的“大脑”，能够把数据存储到内存中，并且起到管理数据的作用。
## Redis优势
下面对 Redis 的优势进行了简单总结：
* 性能极高：Redis 基于内存实现数据存储，它的读取速度是 110000次/s，写速度是 81000次/s；
* 多用途工具：Redis 有很多的用途，比如可以用作缓存、消息队列、搭建 Redis 集群等；
* 命令提示功能：Redis 客户端拥有强大的命令提示功能，使用起来非常的方便，降低了学习门槛；
* 可移植性：Redis 使用用标准 C语言编写的，能够在大多数操作系统上运行，比如 Linux，Mac，Solaris 等。

## Redis应用场景
Redis 用来缓存一些经常被访问的热点数据、或者需要耗费大量资源的内容，通过把这些内容放到 Redis 中，可以让应用程序快速地读取它们。例如，网站的首页需要经常被访问，并且在创建首页的过程中会消耗的较多的资源，此时就可以使用 Redis 将整个首页缓存起来，从而降低网站的压力，减少页面访问的延迟时间。

我们知道，数据库的存储方式大体可分为两大类，基于磁盘存储和基于内存存储。磁盘存储的数据库，因为磁头机械运动以及系统调用等因素导致读写效率较低。Redis 基于内存来实现数据存取，相对于磁盘来说，其读写速度要高出好几个数量级。


| 名称        | 类型               |            数据存储选项            |         附加功能         |
|:----------|:-----------------|:----------------------------:|:--------------------:|
| Redis     | 基于内存存储的键值非关系型数据库 |  字符串、列表、散列、有序集合、无序集合         |  发布与订阅、主从复制、持久化存储等   |
| Memcached | 基于内存存储的键值缓存型数据库   |           键值之间的映射            |   为提升性能构建了多线程服务器     |
| MySQL     | 基于磁盘的关系型数据库         | 每个数据库包含多个表，每个表包含多条记录；支持第三方扩展 | 支持 ACID 性质、主从复制和主主复制 |
| MongoDB   | 基于磁盘存储的非关系文档型数据库 |  每个数据库可以包含多个集合，每个集合可以插入多个文档  | 支持聚合操作、主从复制、分片和空间索引  |

Redis 基于内存来实现数据的存储，因此其速度非常快。但是我们知道，计算机的内存是非常珍贵的资源，所以 Redis 不适合存储较大的文件或者二进制数据，否则会出现错误，Redis 适合存储较小的文本信息。理论上 Redis 的每个`key、value`的大小不超过 512 MB。
## Redis命令行模式
Redis 命令用于在 Redis 服务器上执行一些操作，而命令运行的方式是通过客户端命令行来执行的，这种方式也被称为“命令行模式”。因此想要在 Redis 服务器上运行命令，首先需要开启一个 Redis 客户端。

在 CMD 命令行输入以下命令启动一个 Redis 客户端：
```shell
redis-cli
```
### 本地服务器运行命令
本地服务器指的是，Redis 服务器和客户端安装在同一台计算机上。

在计算机上打开一个 Redis 客户端输入以下命令，验证客户端与Redis 服务器是否成功连接。
```shell
[root@localhost ~]# cd /usr/local/redis-6.2.5/src
[root@localhost src]# ./redis-cli
127.0.0.1:6379> PING
PONG
127.0.0.1:6379>
```
通过执行命令 PING，以检查服务器是否正在运行，结果返回 PONG，说明已经成功连接了本地 Redis 服务器。
### 远程服务器上运行命令
远程服务器顾名思义指的是服务器安装在另外一台计算机上，而非本地。这台远程计算机可以是局域网中的一台，也可以是 Internet 联网状态下的远程计算机。Redis 提供了连接远程服务器的命令：
```shell
redis-cli -h host -p port -a password
```
参数说明：
* `-h`：用于指定远程 Redis 服务器的 IP 地址
* `-p`：用于指定 Redis 远程服务器的端口号
* `-a`：可选参数，若远程服务器设置了密码，则需要输入

服务器 IP 是`172.16.20.125`，端口号为 6379 ，密码为 123456。
```shell
C:\Users\Administrator>redis-cli -h 172.16.20.125 -p 6379 -a 123456
redis 127.0.0.1:6379>
redis 127.0.0.1:6379> PING
PONG
```
### 命令行自动提示功能
Redis 拥有强大的命令行提示功能，支持Tab键自动补全，并且您也可以通过HELP命令查看帮助信息：
```shell
127.0.0.1:6379> HELP SET
SET key value [expiration EX seconds|PX milliseconds] [NX|XX]
summary: Set the string value of a key
since: 1.0.0
group: string
```
## Redis配置文件
在 Redis 的安装目录中有一个名为`redis.windows.conf`的配置文件，若在 Linux 中则为`redis.conf`。
### 查看配置项
可以使用 Redis 的`CONFIG`命令来查看或者更改 Redis 的配置信息：
```shell
redis 127.0.0.1:6379> CONFIG GET 配置名称
```
```shell
127.0.0.1:6379> CONFIG GET loglevel
1) "loglevel"
2) "notice"
```
通过使用`*`可以查看所有配置项：
```shell
127.0.0.1:6379> CONFIG GET *
```
### 更改配置项
如果想要重新设置配置项，需要使用以下命令：
```shell
127.0.0.1:6379> CONFIG SET 配置项名称 配置项参数值
```
```shell
127.0.0.1:6379> CONFIG SET loglevel "verbose"
OK
127.0.0.1:6379> CONFIG GET loglevel
1) "loglevel"
2) "verbose"
```
Redis 的日志级别有四种：
* `debug`：会打印出很多信息，适用于开发和测试阶段
* `verbose`（冗长的）：包含很多不太有用的信息，但比`debug`简化一些
* `notice`：适用于生产模式
* `warning`: 警告信息

Redis 默认设置为`verbose`，开发测试阶段可以用`debug`，生产模式一般选用`notice`。
### 更改配置文件
Redis 某些配置信息无法直接通过命令修改，此时就需要修改配置文，比如设置 Redis 允许远程连接的功能：
```shell
# 1.注释掉本地IP地址,绑定要访问的外部IP
#bind 127.0.0.1 ::1
bind 192.168.1.1
# 2.关闭保护模式(把yes改为no)
protected-mode no
# 3.重启服务器,windows重启
redis-server --service-stop
redis-server --service-start
# Linux重启
redis-server restart
```
### 配置项说明
常用配置项说明：

| 配置项            | 参数             | 说明                                                                    |
|----------------|----------------|-----------------------------------------------------------------------|
| daemonize      | no/yes         | 默认为 no，表示 Redis 不是以守护进程的方式运行，通过修改为 yes 启用守护进程                         |
| pidfile        | 文件路径           | 当 Redis 以守护进程方式运行时，会把进程 pid 写入自定义的文件中                                 |
| port           | 6379           | 指定 Redis 监听端口，默认端口为 6379                                              |
| bind           | 127.0.0.1      | 绑定的主机地址                                                               |
| timeout        | 0              | 客户端闲置多长秒后关闭连接，若指定为 0 ，表示不启用该功能                                        |
| loglevel       | notice         | 指定日志记录级别，支持四个级别：debug、verbose、notice、warning，默认为 notice               |
| logfile        | stdout         | 日志记录方式，默认为标准输出                                                        |
| databases      | 16             | 设置数据库的数量（0-15个）共16个，Redis 默认选择的是 0 库，可以使用 SELECT 命令来选择数据库             |
| rdbcompression | yes/no         | 当数据存储至本地数据库时是否要压缩数据，默认为 yes                                           |
| dbfilename     | dump.rdb       | 指定本地存储数据库的文件名，默认为 dump.rdb                                            |
| dir            | ./             | 	指定本地数据库存放目录                                                          |
| requirepass    | foobared       | 密码配置项，默认关闭，用于设置 Redis 连接密码。如果配置了连接密码，客户端连接 Redis 时需要通过<password> 密码认证 |
| appendfilename | appendonly.aof | 指定 AOF 持久化时保存数据的文件名，默认为 appendonly.aof                                |
| glueoutputbuf  | yes            | 设置向客户端应答时，是否把较小的包合并为一个包发送，默认开启状态                                      |
