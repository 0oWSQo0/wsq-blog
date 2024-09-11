---
title: Linux网络相关命令
date: 2024-03-15
tags: linux基础
categories: linux
order: 9
---

[//]: # (## ip)

[//]: # (```shell)

[//]: # (ip [选项] OBJECT { COMMAND | help })

[//]: # (```)

[//]: # ()
[//]: # (|  OBJECT   | 说明                |)

[//]: # (|:---------:|:------------------|)

[//]: # (|   link    | 网络设备              |)

[//]: # (|  address  | 设备上的协议（IP或IPv6）地址 |)

[//]: # (| addrlabel | 协议地址选择的标签配置       |)

[//]: # (|   route   | 路由表条目             |)

[//]: # (|   rule    | 路由策略数据库中的规则       |)

[//]: # ()
[//]: # (| 选项     | 说明 |)

[//]: # (|--------|----|)

[//]: # (| -h     | 输出人类可读的统计信息和后缀   |)

[//]: # (| -b     | 从提供的文件或标准输入中读取命令并调用它们。第一次故障将导致ip终止   |)

[//]: # (| -force | 不要在批处理模式下终止ip。如果在执行命令期间出现任何错误，应用程序返回代码将为非零   |)

[//]: # (| -s     | 输出更多信息。如果该选项出现两次或更多，则信息量会增加。通常，信息是统计信息或一些时间值   |)

[//]: # (| -d     | 输出详细信息   |)

[//]: # (| -4       | 指定使用的网络层协议是IPv4协议   |)

[//]: # (| -6       | 指定使用的网络层协议是IPv6协议   |)

[//]: # (| -B       | 指定使用的网桥   |)

[//]: # (| -o       | 输出信息每条记录输出一行，即使内容较多也不换行显示   |)

[//]: # (| -r         | 显示主机时，不使用IP地址，而使用主机的域名   |)

[//]: # (| -t         | 使用监视器选项时显示当前时间   |)

[//]: # ()
[//]: # (### ip address)

[//]: # (`ip address`：用于管理`ip`地址。)

[//]: # ()
[//]: # (### ip link)

[//]: # ()
[//]: # (### ip rule)

[//]: # ()
[//]: # (### ip route)

[//]: # (`ip route`：用于管理静态路由表。)

[//]: # ()
[//]: # (linux 系统中，可以自定义从 1－252 个路由表。其中，linux 系统维护了 4 个路由表：)

[//]: # (`0#`表： 系统保留表)

[//]: # (`253#`表：`defulte table`没特别指定的默认路由都放在改表)

[//]: # (`254#`表：`main table`没指明路由表的所有路由放在该表)

[//]: # (`255#`表：`local table`保存本地接口地址，广播地址、NAT 地址 由系统维护，用户不得更改)

[//]: # ()
[//]: # (路由表的查看可以通过`ip route list table table_number [table_name]`命令。路由表序号和表名的对应关系在`/etc/iproute2/rt_tables`文件中，可手动编辑，路由表添加完毕即时生效。)

[//]: # (#### ip route add/change/replace)

[//]: # (#### ip route show)

[//]: # (#### ip route get)

[//]: # (#### ip route delete)

[//]: # (#### ip route save)

[//]: # (#### ip route restore)

[//]: # (#### ip route flush)

[//]: # (清空路由表或删除特定目标的路由。)

[//]: # (```shell)

[//]: # (ip route flush 10.38.0.0/16 # 删除特定路由)

[//]: # (ip route flush table main # 清空路由表)

[//]: # (```)

## netstat
`netstat`命令一般用于检验本机各端口的网络连接情况，用于显示与 IP、TCP、UDP 和 ICMP 协议相关的统计数据。
### 安装命令
```shell
yum install net-tools
```
```shell
netstat [选项] 
```

| 选项               | 说明                          |
|:-----------------|:----------------------------|
| -a, --all        | 显示所有网络连接（包括监听和非监听的）和监听端口    |
| -t, --tcp        | 显示TCP连接                     |
| -u, --udp        | 显示UDP连接                     |
| -n, --numeric    | 显示IP地址和端口号，不进行域名解析和端口服务名称解析 |
| -r, --route      | 显示路由表                       |
| -l, --listening  | 显示监听中的套接字（等待连接的端口）          |
| -p, --programs   | 显示与每个连接或监听端口相关的进程ID和进程名称    |
| -s, --statistics | 显示每个协议的统计信息                 |
| -i, --interfaces | 显示网络接口的信息，包括收发数据包的统计        |
| -c, --continuous | 持续列出网络状态                    |
| -e, --extend     | 显示更多信息                      |
| -C, --cache      | 显示路由器配置的快取信息                |
| -F, --fib        | 显示 FIB                      |

### netstat 输出结果解析
`netstat`的输出结果可以分为两个部分：
`Active Internet connections (w/o servers)`：这部分显示了当前活跃的互联网连接，但不包括作为服务器监听的连接。信息包括：
* `Proto`：连接使用的协议
* `Recv-Q`：单位是字节，是表示程序总共还有多少字节的数据没有从内核空间的套接字缓存拷贝到用户空间
* `Send-Q`：单位是字节，表示远程主机还没有接收到的数据量。发送队列`Send-Q`不能很快的清零，可能是有应用向外发送数据包过快，或者是对方接收数据包不够快
* `Local Address`：本地主机名和端口号
* `Foreign Address`：远程主机名和端口号
* `State`：链路状态，共有12种状态

`Active UNIX domain sockets`，这部分列出了活跃的 UNIX 域套接字连接（也称为本地套接字），同样不包括监听中的套接字。UNIX 域套接字用于同一台机器上进程间的通信。信息包括：
* `Proto`：连接使用的协议，对于 UNIX 域套接字通常是`unix`
* `RefCnt`：引用计数，表示有多少进程引用这个套接字
* `Flags`: 套接字标志
* `Type`：显示套接字的类型
* `State`：套接字状态
* `I-Node`：使用该套接字的文件系统的索引节点
* `Path`：套接字在文件系统中的路径

```shell
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0     52 VM-20-4-centos:ssh      27.187.252.112:34223    ESTABLISHED
tcp        0      0 VM-20-4-centos:57082    169.254.0.55:lsi-bobcat ESTABLISHED
tcp        0      0 VM-20-4-centos:48604    169.254.0.138:8186      ESTABLISHED
tcp        0      0 VM-20-4-centos:57084    169.254.0.55:lsi-bobcat ESTABLISHED
Active UNIX domain sockets (w/o servers)
Proto RefCnt Flags       Type       State         I-Node   Path
unix  2      [ ]         DGRAM                    5347989  @/usr/local/qcloud/YunJing/conf/ydrpc_3
unix  3      [ ]         DGRAM                    8370     /run/systemd/notify
unix  2      [ ]         DGRAM                    8372     /run/systemd/cgroups-agent
unix  5      [ ]         DGRAM                    8383     /run/systemd/journal/socket
unix  14     [ ]         DGRAM                    8385     /dev/log
unix  2      [ ]         DGRAM                    12489    /run/systemd/shutdownd
unix  3      [ ]         STREAM     CONNECTED     21796    /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     24342    /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     16318    /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     2433374  
unix  3      [ ]         STREAM     CONNECTED     24523    
unix  2      [ ]         DGRAM                    5348103  
unix  3      [ ]         STREAM     CONNECTED     24503    
unix  3      [ ]         STREAM     CONNECTED     24488    
unix  3      [ ]         STREAM     CONNECTED     27279    /run/containerd/containerd.sock
unix  3      [ ]         STREAM     CONNECTED     24452    
...省略部分输出...
```
### State链路状态

|      状态      | 说明                                                                                |
|:------------:|:----------------------------------------------------------------------------------|
|    LISTEN    | 监听TCP连接请求                                                                         |
|   SYN_SENT   | 客户端发送 SYN 请求连接之后，等待匹配的连接请求，此时状态为 SYN_SENT                                         |
|   SYN_RECV   | 服务端发出 ACK 确认客户端的 SYN，同时向客户端发送一个 SYN 等待对连接请求的确认，之后状态置为 SYN_RECV                    |
| ESTABLISHED  | 连接已成功建立                                                                           |
|  FIN_WAIT1   | 主动关闭端应用程序调用 close，于是其 TCP 发出 FIN 请求主动关闭连接，之后进入 FIN_WAIT1 状态。等待远程TCP的连接中断请求        |
| CLOSE_WAIT   | 被动关闭端 TCP 接到 FIN 后，就发出 ACK 以回应 FIN 请求，此时状态为 CLOSE_WAIT，等待从本地用户发来的连接中断请求           |
|  FIN_WAIT2   | 主动关闭端接到 ACK 后，就进入了 FIN_WAIT2。从远程 TCP 等待连接中断请求                                     |
|   LAST_ACK   | 被动关闭端一段时间后，接收到文件结束符的应用程 序将调用 CLOSE 关闭连接。这导致它的TCP也发送一个 FIN，等待对方的 ACK，就进入了 LAST-ACK |
|  TIME_WAIT   | 在主动关闭端接收到 FIN 后，TCP 就发送 ACK 包，并进入 TIME-WAIT 状态。等待足够的时间以确保远程 TCP 接收到连接中断请求的确认      |
|   CLOSING    | 等待远程TCP对连接中断的确认                                                                   |
|    CLOSED    | 被动关闭端在接受到ACK包后，就进入了closed的状态。连接结束                                                 |
|   UNKNOWN    | 未知的Socket状态                                                                       |


### sockets Type 套接字类型
套接字(`Socket`)，就是对网络中不同主机上的应用进程之间进行双向通信的端点的抽象。一个套接字就是网络上进程通信的一端，提供了应用层进程利用网络协议交换数据的机制。

|   类型    | 说明               |
|:-------:|:-----------------|
|  DGRAM  | 此套接字用于数据报(无连接)模式 |
| STREAM  | 流模式(连接)套接字       |
|  RAW    | 此套接字用于RAW模式      |
|   RDM   | 一种服务可靠性传递信息      |
| PACKET  | RAW接口使用套接字       |
| UNKNOWN | 未知类型             |

### nestat 常用命令

| 命令                                | 说明                                                   |
|:----------------------------------|:-----------------------------------------------------|
| netstat -a                        | 列出所有连接的网络状况                                          |
| netstat -at                       | 列出 TCP 协议的连接                                         |
| netstat -au                       | 列出 UDP 协议的连接                                         |
| netstat -tnl                      | 只列出监听中的TCP连接                                         |
| netstat -tnpl                     | 只列出监听中的TCP连接及其进程编号、进程名称                              |
| netstat -s                        | 显示网络统计信息                                             |
| netstat -rn                       | 显示路由信息                                               |
| netstat -i                        | 显示网络接口                                               |
| netstat -atnp \| grep ESTABLISHED | 只列出 active 状态的连接，active 状态的套接字连接用 "ESTABLISHED" 字段表示 |
| netstat -aple \| grep ssh         | 查看ssh服务是否在运行                                         |

## route
`route`命令用于显示和操作 IP 静态路由表。`route`命令属于`net-tools`工具包，可以通过`yum`安装。
```shell
route [add|del|flush] [选项]
```
### 常用选项
| 选项             | 说明                                                         |
|----------------|------------------------------------------------------------|
| -v, --verbose  | 显示详细的处理信息                                                  |
| -n, --numeric  | 显示 IP 地址和端口号，不显示主机名形式                                      |
| -e, --extend   | 显示更多信息                                                     |
| add            | 添加一条路由                                                     |
| del            | 删除一条路由                                                     |
| -net           | 到一个网络的路由表                                                  |
| -host          | 到一个主机的路由表                                                  |
| target         | 指定目标网络或主机。可以用点分十进制形式的IP地址或主机/网络名                           |
| `netmask <子网掩码>` | 为添加的路由指定网络掩码                                               |
| gw Gw          | 为发往目标网络/主机的任何分组指定网关。注意：指定的网关首先必须是可达的。也就是说必须为该网关预先指定一条静态路由。 |
| dev If         | 强制使路由与指定的网口关联                                              |


| 示例                                                          | 说明            |
|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------|
| `route add -net 192.56.76.0 netmask 255.255.255.0 dev eth0` | 向"eth0"添加一条指向网络192.56.76.x的路由 |
| `route add -host 10.60.60.143 gw 10.20.30.40`               | 添加到主机的路由                                                                                             |
| `route add default gw mango-gw`                               | 添加一条缺省路由(如果无法匹配其它路由则用它)。使用此路由的所有分组将通过网关"mango-gw"进行传输。实际使用此路由的设备取决于如何到达"mango-gw" - 先前必须设好到"mango-gw"的静态路由。 |
| `route add 10.0.0.0 netmask 255.0.0.0 reject`                 | 此命令为私有网络"10.x.x.x."设置一条阻塞路由      |
| `route del -net 192.56.76.0 netmask 255.255.255.0 dev eth0`   | 删除192.56.76.0的路由      |
| `route del default gw 192.168.1.1 eth0`                       | 删除默认路由   |

### 输出结果解析
```shell
[root@localhost ~]# route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         0.0.0.0         UG    0      0        0 eth0
10.2.20.0       0.0.0.0         255.255.252.0   U     0      0        0 eth0
link-local      0.0.0.0         255.255.0.0     U     1002   0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
[root@localhost ~]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         10.2.20.1       0.0.0.0         UG    0      0        0 eth0
10.2.20.0       0.0.0.0         255.255.252.0   U     0      0        0 eth0
169.254.0.0     0.0.0.0         255.255.0.0     U     1002   0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
```
* `Destination`：目标网络或目标主机
* `Gateway`：网关地址或`*`（如未设置）
* `Genmask`：目标网络的子网掩码；`255.255.255.255`为主机，`0.0.0.0`为缺省路由
* `Flags`：路由标志
 * `U (route is up)`：路由正常
 * `H (target is a host)`：主机路由
 * `G (use gateway)`：使用网关的间接路由
 * `R (reinstate route for dynamic routing)`：为动态选路恢复路由
 * `D (dynamically installed by daemon or redirect)`：该路由由选路进程或重定向动态创建
 * `M (modified from routing daemon or rederict)`：该路由已由选路进程或重定向修改
 * `! (reject route)`：阻塞路由
* `Metric`：通向目标的距离(通常以跳来计算)
* `Ref`：使用此路由的活动进程个数(Linux 内核并不使用)
* `Use`：查找此路由的次数。根据`-F`和`-C`的使用，此数值是路由缓存的损失数或采样数
* `Iface`：使用此路由发送分组的接口（网卡名字）

### 永久修改路由：
直接执行`route`命令来添加路由，是不会永久保存的，当网卡重启或者机器重启之后，该路由就失效了。要想永久保存，可以保存到配置文件。linux 默认只支持一条默认路由，当重新启动网口时，会把其他默认路由去掉，只剩下一条该网口生成的默认路由。

`/etc/sysconfig/static-routes`文件为路由固化文件，但是 linux 系统一般不会自动生成，需要手动创建。

在文件内编辑路由，路由格式是固定的：
* 添加默认路由：`any net 0.0.0.0 netmask 0.0.0.0 gw 10.60.60.1`
* 添加网络路由：`any net 1.1.1.0 netmask 255.255.255.0 gw 10.60.60.1`

### route 和 ip route的区别
* `ip route`以其最简单的形式可用于显示输出主路由表。该命令的输出与`route`的输出明显不同
* 可以通过`ip route show table local`命令查看本地路由表，而`route`命令无法查看
* `ip route add`与`route add`一样，可以用于添加路由，但是`ip route add`提供了更多`route`命令无法实现的选项，如`prohibit、from、src`

## nslookup
`nslookup`命令主要用来查询域名的 DNS 信息。
### 安装
```shell
# 查看提供nslookup命令的软件包
yum  provides  */nslookup   
yum install -y bind-utils
```
### 常用命令
`nslookup`拥有“交互模式”和“非交互模式”。在“交互模式”下，用户可以向域名服务器查询各类主机、域名的信息，或者输出域名中的主机列表。而在“非交互模式”下，用户可以针对一个主机或域名来查询对应的信息。
* 交互模式： 仅输入`nslookup`命令，不加任何参数，即可直接进入交互模式，此时`nslookup`会连接到默认的域名服务器（即`/etc/resolv.conf`的第一个`dns`地址）。或者输入`nslookup -nameserver/ip`。
* 非交互模式： 直接输入`nslookup 域名`。

```shell
nslookup [选项] [域名]
```

| 选项           | 命令           |
|:-------------|:-------------|
| -sil         | 不显示任何警告信息    |
| exit         | 退出命令         |
| server       | 指定解析域名的服务器地址 |
| set type=soa | 设置查询域名授权起始信息 |
| set type=a   | 设置查询域名A记录    |
| set type=mx  | 设置查询域名邮件交换记录 |

```shell
# 交互模式下，查看www.baidu.com的域名DNS信息
[root@localhost ~]# nslookup
> set type=soa
> www.baidu.com
Server:         100.100.2.138
Address:        100.100.2.138#53

Non-authoritative answer:
www.baidu.com   canonical name = www.a.shifen.com.

Authoritative answers can be found from:
a.shifen.com
        origin = ns1.a.shifen.com
        mail addr = baidu_dns_master.baidu.com
        serial = 2101090002
        refresh = 5
        retry = 5
        expire = 2592000
        minimum = 3600
> server www.baidu.com
Default server: www.baidu.com
Address: 14.215.177.39#53
Default server: www.baidu.com
Address: 14.215.177.38#53
> exit
# 非交互模式下，查看www.baidu.com的域名DNS信息
[root@localhost ~]# nslookup www.baidu.com
Server:         100.100.2.138
Address:        100.100.2.138#53

Non-authoritative answer:
www.baidu.com   canonical name = www.a.shifen.com.
Name:   www.a.shifen.com
Address: 14.215.177.38
Name:   www.a.shifen.com
Address: 14.215.177.39

```
## 查看内外网IP
查看内网 IP:
```shell
ifconfig
# 简化输出
ifconfig | grep inet
# 或
ip addr 
```
```shell
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::42:68ff:fe1a:9945  prefixlen 64  scopeid 0x20<link>
        ether 02:42:68:1a:99:45  txqueuelen 0  (Ethernet)
        RX packets 19166  bytes 14822962 (14.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 18372  bytes 93940948 (89.5 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.2.20.4  netmask 255.255.252.0  broadcast 10.2.23.255
        inet6 fe80::5054:ff:fed3:d465  prefixlen 64  scopeid 0x20<link>
        ether 52:54:00:d3:d4:65  txqueuelen 1000  (Ethernet)
        RX packets 3473513  bytes 1451618800 (1.3 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2729139  bytes 422192030 (402.6 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 1  bytes 49 (49.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1  bytes 49 (49.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethb392aae: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::7c23:abff:fe15:822f  prefixlen 64  scopeid 0x20<link>
        ether 7e:23:ab:15:82:2f  txqueuelen 0  (Ethernet)
        RX packets 17195  bytes 14328877 (13.6 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 16344  bytes 87769380 (83.7 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
查看外网 IP：
```shell
curl ifconfig.me
```
## ifconfig
`ifconfig(network interfaces configuring )`用于查看和配置网卡的地址和参数。
```shell
# 显示激活状态（up 状态）的网卡信息
[root@localhost ~]# ifconfig
docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:44:f5:7b:43  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.20.251  netmask 255.255.255.0  broadcast 172.16.20.255
        inet6 fe80::225:a9ff:fe0e:bf19  prefixlen 64  scopeid 0x20<link>
        ether 00:25:a9:0e:bf:19  txqueuelen 1000  (Ethernet)
        RX packets 18052  bytes 2702349 (2.5 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5316  bytes 932509 (910.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device memory 0x58000000-580fffff  

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 16  bytes 1248 (1.2 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 16  bytes 1248 (1.2 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
......
```
以`eth0`为例，其网卡信息含义：

| 字段        | 说明                |
|-----------|-------------------|
| eth0      | 网卡名称              |
| mtu       | 网卡的最大传输单元         |
| inet      | 网卡的 ip 地址         |
| netmask   | 子网掩码              |
| inet6     | ipv6 地址           |
| prefixlen | 表示该IPv6地址的前缀长度为64 |
| ether     | MAC 地址            |
| RX        | 接收数据包的统计情况        |
| TX        | 发送数据包的统计情况        |

```shell
ifconfig [网卡名称] [选项]
```

| 选项                            | 说明                        |
|-------------------------------|---------------------------|
| `-a`                          | 显示所有当前可用的网卡，包括处于 down 的网卡 |
| `up`                          | 激活指定的网卡                   |
| `down`                        | 关闭指定的网卡                   |
| `add <address>[/<prefixlen>]` | 设置网络设备的ipv6地址             |
| `del <address>[/<prefixlen>]` | 删除网络设备的ipv6地址             |
| `netmask <子网掩码>`              | 设置网络设备的子网掩码               |
| `hw <网络设备类型> <MAC 地址>`        | 设置网络设备的类型与 MAC 地址         |
| `mtu <字节>`                    | 设置网络设备的MTU                |
| `[-]broadcast <address>`      | 设置网卡的广播地址                 |
| `<address>`                   | 设置指定网卡的 ip 地址             |


```shell
# 修改mac地址
ifconfig eth0 hw ether 00:0c:29:ff:4f:25
# 配置ip地址
ifconfig eth0 192.168.1.10
ifconfig eth0 192.168.1.10 netmask 255.255.255.0
# 删除 ip 地址
ifconfig eth0 del 192.168.1.10
# 单张网卡添加多个 ip 地址
ifconfig eth0:0 192.168.1.20 netmask 255.255.255.0
```
:::tip
用 ifconfig 配置的参数不重启就可生效，但重启后会失效，因为参数并未写入配置文件，只是临时生效。
:::
