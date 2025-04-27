


在 Redis 的安装目录中有一个名为`redis.windows.conf`的配置文件，若在 Linux 中则为`redis.conf`，以 Windows 系统为例。
## 查看配置项
可以使用`CONFIG`命令来查看或者更改 Redis 的配置信息。
```shell
redis 127.0.0.1:6379> CONFIG GET 配置名称
```
获取日志等级的配置项：
```shell
redis 127.0.0.1:6379> CONFIG GET loglevel
```
输出结果：
```shell
1) "loglevel"
2) "notice"
```
使用`*`可以查看所有配置项：
```shell
redis 127.0.0.1:6379> CONFIG GET *

1) "dbfilename"
2) "dump.rdb"
3) "requirepass"
4) ""
5) "masterauth"
6) ""
7) "cluster-announce-ip"
8) ""
9) "unixsocket"
10) ""
11) "logfile"
12) ""
13) "pidfile"
...
```
## 更改配置项
如果想要重新设置配置项，需要使用以下命令：
```shell
redis 127.0.0.1:6379> CONFIG SET 配置项名称 配置项参数值
```
```shell
127.0.0.1:6379> CONFIG SET loglevel "verbose"
OK
127.0.0.1:6379> CONFIG GET loglevel
1) "loglevel"
2) "verbose"
```
Redis 的日志级别有以下四种：
* `debug`：会打印出很多信息，适用于开发和测试阶段。
* `verbose`（冗长的）：包含很多不太有用的信息，但比`debug`简化一些。
* `notice`：适用于生产模式。
* `warning`：警告信息。
	 
Redis 默认设置为`verbose`，开发测试阶段可以用`debug`，生产模式一般选用`notice`。
## 更改配置文件
Redis 某些配置信息无法直接通过命令修改，此时就需要修改配置文，比如设置 Redis 允许远程连接的功能。配置文件修改如下：
```text
1.注释掉本地IP地址,绑定要访问的外部IP
#bind 127.0.0.1 ::1
bind 192.168.1.1
2.关闭保护模式(把yes改为no)
protected-mode no
3.重启服务器,windows重启
redis-server --service-stop
redis-server --service-start
Linux重启
sudo /etc/init.d/redis-server restart
```
## 配置项说明

| 配置项                               | 参数                                           | 说明 |
|-----------------------------------|----------------------------------------------|----|
| daemonize                         | no/yes                                       | 默认为 no，表示 Redis 不是以守护进程的方式运行，通过修改为 yes 启用守护进程  |
| pidfile                           | 文件路径                                         | 当 Redis 以守护进程方式运行时，会把进程 pid 写入自定义的文件中  |
| port                              | 6379                                         | 指定 Redis 监听端口，默认端口为 6379   |
| bind                              | 127.0.0.1                                    | 绑定的主机地址   |
| timeout                           | 0                                            |  客户端闲置多长秒后关闭连接，若指定为 0，表示不启用该功能   |
| loglevel                          | notice                                       | 指定日志记录级别，支持四个级别：debug、verbose、notice、warning，默认为 notice   |
| logfile                           | stdout                                       | 日志记录方式，默认为标准输出   |
| databases                         | 16                                           | 设置数据库的数量（0-15个）共16个，Redis 默认选择的是 0 库，可以使用 SELECT 命令来选择使用哪个数据库储存数据   |
| save \[seconds] \[changes]        | 可以同时配置三种模式：<br>save 900 1<br>save 300 10<br>save 60 10000 | 表示在规定的时间内，执行了规定次数的写入或修改操作，Redis 就会将数据同步到指定的磁盘文件中。比如 900s 内做了一次更改，Redis 就会自动执行数据同步   |
| rdbcompression                    | yes/no                                       | 当数据存储至本地数据库时是否要压缩数据，默认为 yes   |
| dbfilename                        | dump.rdb                                     | 指定本地存储数据库的文件名，默认为 dump.rdb   |
| dir                               | ./                                           | 指定本地数据库存放目录   |
| slaveof \<masterip> \<masterport> | 主从复制配置选项                                     | 当本机为 slave 服务时，设置 master 服务的 IP 地址及端口，在 Redis 启动时，它会自动与 master 主机进行数据同步   |
| requirepass                       | foobared 默认关闭                                | 密码配置项，默认关闭，用于设置 Redis 连接密码。如果配置了连接密码，客户端连接 Redis 时需要通过`<password>` 密码认证   |
| maxmemory \<bytes>                | 最大内存限制配置项                                    | 指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会尝试清除已到期或即将到期的 Key，当此方法处理 后，若仍然到达最大内存设置，将无法再进行写入操作，但可以进行读取操作   |
| appendfilename                    | appendonly.aof                               | 指定 AOF 持久化时保存数据的文件名，默认为 appendonly.aof   |
| glueoutputbuf                     | yes                                          | 设置向客户端应答时，是否把较小的包合并为一个包发送，默认开启状态   |

## 配置项汇总
### 基本配置
```text
port 6379  # 监听端口号，默认为6379，如果你设为 0 ，redis 将不在 socket 上监听任何客户端连接。
daemonize no #指定redis是否以守护线程的方式启动
databases 16 #创建database的数量，默认为0库

save 900 1 #刷新快照到硬盘中。必须满足下列三个要求之一才会触发，即900秒内至少有1个key发生变化。
save 300 10 #在300秒内至少10个key发生变化。
save 60 10000 #在60秒之内至少有10000个可以发生变化。

stop-writes-on-bgsave-error yes #后台存储错误并停止写入命令。
rdbcompression yes #使用LZF方式压缩rdb文件。如果你想节省一些CPU可设置成'no'
rdbchecksum yes #在存储、加载rdb文件时进行校验。
dbfilename dump.rdb #设置rdb文件名。
dir ./ #设置工作目录，rdb文件会自动存放在该目录。
```
### 主从服务配置
```text
slaveof <masterip> <masterport> #将本机设为某台机器的从服务器
masterauth <master-password> #连接主服务器的密码
slave-serve-stale-data yes # 当主机和从机断开时或这正处于在复制过程中，是否让从服务器是应答请求
slave-read-only yes #设置从服务器为只读模式
repl-diskless-sync no  #是否同时向多个从服务器节点同时发数据
repl-diskless-sync-delay 5 #发送数据的延迟时间
repl-ping-slave-period 10 #主节点默认每隔 10 秒对从节点发送 ping 命令
repl-timeout 60 #主从服务器超时时间(超时认为断线了),要比period设置的时间大

#如果master不能再正常工作，那么会在多个slave中，选择优先值最小的一个slave提升为master，
#优先值为0表示不能提升为master，一般在哨兵sentinel环境中使用。
slave-priority 100 

#在slave和master同步后，后续的同步是否设置成TCP_NODELAY，设置成no，则redis master会立即发送同步数据，没有延迟
repl-disable-tcp-nodelay no 
min-slaves-to-write 3 #主节点仅允许当能够通信的从节点数量大于等于此处的值时，才允许接受写操作；
min-slaves-max-lag 10 #从节点延迟时长超出此处指定的时间时，主节点会拒绝写入操作；
```
### 安全配置
```text
requirepass foobared # 用来配置密码
rename-command CONFIG b84 #在公共环境下重命名部分敏感命令 如config、flushall等
```
### 限制配置
```text
maxclients 10000 #最大连接数
maxmemory <bytes> #最大使用内存
maxmemory-policy volatile-lru #内存到极限后的处理策略

#内存处理策略，用于在超出内存限制时，删除一些key
volatile-lru # LRU算法删除过期key
allkeys-lru # LRU算法删除key(不区分过不过期)
volatile-random # 随机删除过期key
allkeys-random # 随机删除key(不区分过不过期)
volatile-ttl # 删除快过期的key
noeviction # 禁止删除key,这如果内存不足，会直接返回错误。默认配置

#用于提高LRU/TTL算法的精准度，在自动清理内存时，指定的数字越大，CPU消耗就越多，默认为5。
maxmemory-samples 5
```
### AOF日志模式
```text
appendonly no #是否启用日志模式
appendfsync no # 有系统决定何时写,统一写,速度快
appendfsync always # 系统不缓冲,一直写,但是慢,这种方式几乎不丢失数据
appendfsync everysec #每秒写1次

no-appendfsync-on-rewrite no #相当于将appendfsync设置为no，不存在磁盘操作，只是将数据写入了缓冲区，写入速度非常快
auto-AOF-rewrite-percentage 100 #触发aof重写操作，要求本次文件大小比上次重写时要增加1（100%）倍
auto-AOF-rewrite-min-size 64mb #触发aof重写操作，至少要达到的aof文件大小
```
### 慢查询配置
Redis slowlog 是一个记录 Redis 执行查询命令时所耗费时间的日志系统，它仅记录执行一个查询命令所耗费的时间，不记录其他内容。
```text
slowlog-log-slower-than 10000 #记录响应时间大于10000微秒的慢查询
slowlog-max-len 128 # 最多记录128条
```
### 服务端命令
```text
time #返回时间戳+微秒
dbsize #返回key的数量
bgrewriteaof #重写aof
bgsave #后台开启子进程来执行数据持久化
save #以阻塞的方式对数据进行持久化
lastsave #返回最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示。

slaveof host port #设置为host:port的从服务器(数据清空,复制新的主服务器内容)
slaveof no one   #变成主服务器(原数据不丢失,一般用于主服失败后)

flushdb 清空当前数据库的所有数据
flushall 清空所有数据库的所有数据

shutdown [save/nosave] 关闭服务器,保存数据,修改AOF

slowlog get 获取慢查询日志
slowlog len 获取慢查询日志条数
slowlog reset 清空慢查询
```
### 客户端命令
```text
#以易于理解和阅读的方式返回Redis服务器的各种信息、统计数值
info [server|clients|memory|stats|]
config get [配置项]    #获取配置文件选项
config set [配置项] [参数值] #重新设置配置文件选项和对应参数
config rewrite  #对启动Redis服务器时所指定的配置文件进行改写
config resetstat #重置info命令中的某些统计信息

debug object key #调试选项,看一个key的情况
debug segfault #该命令能够让服务器崩溃
object key (refcount|encoding|idletime)
monitor #调试用，打开控制台,观察命令
client list #列出所有连接
client kill #杀死某个连接 CLIENT KILL 127.0.0.1:6379
client getname #获取连接的名称 默认nil
client setname  #设置连接名称,便于调试
```
### 连接命令
```text
auth 密码  #验证登录密码(如果设置了密码)
ping      #测试服务器是否可用
echo "hello www.biancheng.net" #测试服务器是否正常交互
select 0/1/2/3/4...  #选择数据库0-15
quit  #退出连接
```
