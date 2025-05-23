---
title: IPv6详解
date: 2025-02-10
tags: network
categories: 计算机网络
order: 9
---


## 初识 IPv6
2019 年 11 月 25 日已分配完公网 IPv4 地址，以后就没有多余地址可以分配了。短期内可以使用 NAT 技术进行缓解。长期来看，还是要用 128 位的 IPv6 地址替代 32 位的 IPv4 地址，IPv6 可以满足未来 IP 地址的需求。

IPv4 地址数量：$$2^32$$
IPv6 地址数量：$$2^128 = 3.4 * 10^38$$

## IPv6 地址
### IPv6 地址表示
IPv6 地址使用十六进制表示法，分隔成 8 个 16 位段，每 16 位段的值在`0000~FFFF`的十六进制数之间，每个 16 位段之间用`:`分开。
```
2001:1111:0100:000a:0000:00bc:2500:0a0b
```
为了方便理解，可以查看下面的进制转换表。

|  二进制  | 十进制 | 十六进制 |
|:-----:|:---:|:----:|
| 0000  |  0  |  0   |
| 0001  |  1  |  1   |
| 0010  |  2  |  2   |
| 0010  |  3  |  3   |
| 0010  |  4  |  4   |
| 0010  |  5  |  5   |
| 0010  |  6  |  6   |
| 0010  |  7  |  7   |
| 0010  |  8  |  8   |
| 0010  |  9  |  9   |
| 0010  | 10  |  A   |
| 0010  | 11  |  B   |
| 0010  | 12  |  C   |
| 0010  | 13  |  D   |
| 0010  | 14  |  E   |
| 0010  | 15  |  F   |

但是 IPv6 地址还是太长，不方便记忆，也不方便书写。于是就有了两条简化规则。第一条规则是：**每组十六进制数中开头的 0 可以省略。**

上面的 IPv6 地址可以写成：`2001:1111:100:a:0:bc:2500:a0b`。

这里需要注意，**开头的 0 才能省略，末尾的 0 是不能省略的**。

如果有个 IPv6 地址有一串的 0，比如：`2001:0000:0000:0000:0000:0000:0000:0003`，可以简写成：`2001:0:0:0:0:0:0:3`。

这时，还可以使用第二个规则进行简化，第二条规则是：**由全 0 组成的连续的 16 位段可以用一对冒号`::`表示。**

上面的地址还可以简化成：`2001::3`。

这里需要注意，**一个 IPv6 地址内，只能使用一次`::`表示**。如果使用两次及以上，也会产生歧义。举个栗子：
```
2001:0a0c:0000:0000:0021:0000:0000:0077
```
正确的写法有是：
```
2001:a0c::21:0:0:77
2001:a0c:0:0:21::77
```
如果使用了两次`::`，那么就是错误的：`2001:a0c::21::77`。

有两个全 0 字符串，就无法确定它们的长度，上面错误的地址会有几种可能：
```
2001:0a0c:0000:0021:0000:0000:0000:0077
2001:0a0c:0000:0000:0021:0000:0000:0077
2001:0a0c:0000:0000:0000:0021:0000:0077
```
IPv4 的网段地址可以用子网掩码表示，还可以用斜线法表示。IPv6 只能用斜线法表示网段地址，即在 IPv6 地址后面加上一个斜线`/`，后面加上一个十进制的数字，来表示前面多少位是网络位。

网络位是 64 位的 IPv6 地址表示：`3001:2222:333:aa:bc::707:9900/64`，对应的网段地址是：`3001:2222:333:aa::/64`。

全是 0 的 IPv6 地址可以写成一对冒号。当网络位是 0 位时，表示默认地址。
```
::/0
```
当网络位是 128 位时，表示未指定地址。设备未分配 IPv6 地址时，就用未指定地址作为标识进行报文交互。
```
::/128
```
### IPv6 地址类型
IPv6 地址根据使用范围和功能，分为三种类型：单播、任意播、组播。

对比 IPv4，IPv6 地址中没有广播地址，但是有一个包含全部节点的组播地址，跟 IPv4 中的广播地址功能相同。

其中单播地址又细分为全球单播地址、唯一本地地址和链路本地地址等。
#### 全球单播地址
单播地址表示单台设备的地址。全球单播地址是指这个单播地址是全球唯一的。也就是说，全球单播地址是可以在公网使用、全网可路由的 IPv6 地址，类似于 IPv4 的公网 IP 地址。全球单播 IPv6 地址是由 Internet 地址授权委员会（IANA）分配给地区 Internet 注册机构（RIR），再由 RIR 分配给 Internet 服务提供商（ISP）。

IANA 分配 128 位的 IPv6 地址时，同 IPv4 一样，也是分配一个网段，即网络/子网位，不会分配 128 位的地址。IPv6 单播地址的通用格式：

![](IPv6详解/2.png)

全球单播 IPv6 地址的前 3 位固定为`001`；第`4~48`位的这 45 位由地址分配机构分配；48 位之后的 16 位是网络划分子网位，称为子网 ID；剩余的 64 位 IPv6 地址就是主机位，但是叫做接口 ID（Interface ID）。因为一台主机可以有几个接口，用 IPv6 地址表示主机的一个接口更准确，而不是表示一台主机。同时，一个接口可以有多个 IPv6 地址，还可以有一个 IPv4 地址，接口 ID 只是这个接口的几个标识符之一。

通常，全球 IPv6 地址的接口 ID 是 64 位，子网 ID 是 16 位。一个 16 位的子网 ID 可以划分 65536 个不同的子网。很少有这么多子网的网络，因此全球单播 IPv6 地址还有另外一种格式：前缀是`n`位，子网 ID 是`64-n`位，接口 ID 也是 64 位。两种格式也不是矛盾的。

将全球单播 IPv6 地址的前 3 位固定值转换为 IPv6 表示法，可知全球单播地址的前缀为`2000::/3`。

IANA 和 RIR 把长度`/32`或`/35`的 IPv6 前缀分配给本地 Internet 注册机构（LIR）。LIR 通常是大型的 ISP，LIR 分配前缀长度`/48`的 IPv6 地址给各个客户。也有一些例外，会分配不同长度的前缀：
* 如果一个客户非常庞大，那么可以分配一个长度小于`/48`的前缀。
* 如果有且仅有一个子网需要地址，那么可以分配一个长度是`/64`的前缀。
* 如果有且仅有一台设备需要地址，那么可以分配一个长度是`/128`的前缀。

#### IPv6 地址类型
IPv6 地址开头的二进制标识地址类型。比如：全球单播地址的前 3 位是 001。

|  地址类型   | 格式前缀(二进制)  |  IPv6前缀   |
|:-------:|:----------:|:---------:|
|  未指定地址  | 00...0     | ::/128    |
| 回环地址    |   00...1   |  ::1/128  |
| 链路本地地址  | 1111111010 | FE80::/10 |
| 唯一本地地址  |  11111101  | FD00::/8  |
| 全球单播地址  |     其它     |    其它     |
|  组播地址   |  11111111  | FF00::/8  |
|  任播地址   |     其它     |    其它     |

#### 本地单播地址
本地单播地址有 4 种类型：唯一本地地址、链路本地地址、未指定地址、回环地址。
##### 唯一本地地址
虽然 IPv6 地址非常充足，但是 IANA 还是分配了一段可以在私有网络使用的私有 IP 地址空间。这种可以自行使用而不用申请的单播 IPv6 地址叫做唯一本地地址。唯一本地地址只能在私有网络使用，不能在全球路由，不同的私网可以复用这类地址。它的作用和范围跟 IPv4 的私有 IP 地址相同。

唯一本地地址的前 7 为固定是`1111110`，前缀为`FC00::/7`的 IPv6 地址。之前还有站点本地地址（`Site Local Address`），前缀是`FEC0::/10`，已被 ULA 取代。

![](IPv6详解/3.png)

唯一本地地址的第 8 位比较特殊。第 8 位为 0 时，未定义，也就是说，`FC00::/8`这个 IPv6 地址前缀属于保留的地址空间。目前私有网络使用的 IPv6 地址是以`11111101`开头的，即前缀为`FD00::/8`的 IPv6 地址。

![](IPv6详解/4.png)

##### 链路本地地址
IPv6 的链路本地地址（`Link-Local Address`），是 IPv4 地址中没有的类型，是 IPv6 新定义的地址类型。

链路本地地址是只在链路内有效的地址。启动 IPv6 时，网络接口会自动配置这样的一个 IPv6 地址，就可以直接和同一链路上的其它设备通信。因为链路本地地址只在链路本地有效，所以这些数据包不会被发送到其它链路上。

链路本地地址的前 10 位固定是`1111111010`，之后的 54 位固定为 0，最后 64 位是接口 ID。也就是说，链路本地地址的前缀为`FE80::/10`。

![](IPv6详解/5.png)

如果链路本地地址的前 64 位都是相同的，那么接口如何使用 64 位的接口 ID 进行标识，才能确保链路本地地址在链路中不会出现 IP 地址冲突呢？答案是接口使用自己的物理 MAC 地址来填充接口 ID 字段。理论上接口的 MAC 地址是唯一的，因此通过 MAC 地址生成的接口 ID 和链路本地地址也是唯一的。

把 MAC 地址转换成接口 ID，使用 MAC-to-EUI64 转换法。简单的讲，就是使用接口的 48 位 MAC 地址，在 MAC 地址中间，也就是 OUI 后面，插入一个固定的十六进制数`0xFFFE`，并把第 7 位的 U/L （全局/本地）位设置为 1，这样就转换为一个 64 位的接口 ID。

![](IPv6详解/6.png)

##### 未指定地址
未指定地址是 128 位全为 0 的前缀地址，简写成`::/128`，相当于 IPv4 中的`0.0.0.0/32`。这个地址不能分配给接口使用，只有当 IPv6 设备还没获取到地址时，才将未指定地址作为数据包的源 IPv6 地址。
##### 回环地址
回环地址是前 127 位全为 0，最后一位是 1 的 128 位前缀地址，简写成`::1/128`，相当于 IPv4 中的回环地址`127.0.0.1/8`。回环地址表示节点自己，不能分配给接口使用。只要设备的协议栈状态正常，设备就可以收到发送给回环地址的数据包。
#### 任意播地址
IPv6 定义了一种任性的功能，通过任意播地址实现。任意播地址是根据功能定义的，而不是根据报文格式，IPv6 没有定义任意播的地址空间，与单播使用相同的地址空间。所以，无法根据地址判断是单播地址还是任意播地址。

单播是一对一，组播是一对多，广播是一对全体，那么任意播就是一对最近的通信方式。

![](IPv6详解/7.png)

一个任意播地址可以分配给多台设备，路由器会有多条路由到达相同的目的地，选择代价最小的路由进行数据转发。在大型网络中，流量可以发送到最近的设备，数据传输效率更高。而且当最近的设备故障时，路由器可以把路由指向下一台最近的路由器。

![](IPv6详解/8.png)

任意播地址不能用作源地址，只能作为目的地址。不能指定给 IPv6 主机，只能指定给 IPv6 路由器。
#### 组播地址
组播地址不是标识一台设备，而是一组设备：一个组播组（`Multicast Group`）。发送组播数据包通常是单台设备，可以是组播组成员，也可以是其它主机，数据包的目的地址是组播地址。

组播组成员有可能是一台设备，也可能是这个网络上的所有设备。IPv6 没有广播地址，但是有一个包含所有节点的组播组，和广播地址做相同的事情：所有节点都是这个组播组的成员。

组播地址的前 8 位全是 1，后面跟着 4 位标记位，再后面就是 4 位表示地址范围。最后的 112 位作为组 ID （`Group ID`），标识不同的组播组。前面的 80 位是 0，只使用后面的 32 位。

![](IPv6详解/9.png)

4 位标记位中，第 1 位是保留标记位，未使用，使用固定值 0。第 2 位用于汇集点（`Rendezvous Point`），汇集点是组播的一个概念，叫做 R 位，通常取值为 0。第 3 位表示组播地址是否带了前缀，叫做 P 位。组播地址没前缀，取值为 0。大多数情况是 0。最后一位是 T 位，值为 0 时表示是已定义的、永久的组播地址；值为 1 时是临时充当一些设备的组播组。因此，各个协议使用的组播组是以 FF0 开头的 IPv6 地址，而自定义的组播组是以 FF1 开头的。

组播地址和单播地址一样，有一个有效范围，4 为范围位定义了组播地址的使用范围。不同取值的范围表如下：

| 范围位值 |  表示范围  |
|:----:|:------:|
|  1   |  接口本地  |
|  2   |  链路本地  |
|  3   |  子网本地  |
|  4   | 管理范围本地 |
|  5   |  站点本地  |
|  8   | 组织机构本地 |
|  E   |   全局   |

常见的 IPv6 组播地址的格式是标记位的值是 0，范围位的值是 2，即前缀为`FF02`的组播地址。

|    地址     | 组播组          |
|:---------:|:-------------|
|  FF02::1  | 所有节点         |
| FF02::1   | 所有路由器        |
|  FF02::1  | OSPFv3路由器    |
|  FF02::1  | OSPFv3指定路由器  |
|  FF02::1  | RIP路由器       |
|  FF02::1  | DHCP服务器/中继代理 |

#### 嵌入的 IPv4 地址
在 IPv6 地址的环境中使用 IPv4 地址，需要用到转换技术，把 IPv4 地址转换成 IPv6 地址。比如 6to4 技术就是将 IPv4 地址转换成 16 进制数，再嵌入到 IPv6 地址的最后 32 位。
## IPv6 数据报
IPv6 仍支持无连接的传送，但将协议数据单元 PDU 称为分组。

所引进的主要变化如下：
* 更大的地址空间。IPv6 将地址从 IPv4 的 32 位增大到了 128 位。
* 扩展的地址层次结构。
* 灵活的首部格式。IPv6 定义了许多可选的扩展首部。
* 改进的选项。IPv6 允许数据报包含有选项的控制信息，其选项放在有效载荷中。
* 允许协议继续扩充。
* 支持即插即用（即自动配置）。因此 IPv6 不需要使用 DHCP。
* 支持资源的预分配。IPv6 支持实时视像等要求，保证一定的带宽和时延的应用。

IPv6 首部改为 8 字节对齐。首部长度必须是 8 字节的整数倍。原来的 IPv4 首部是 4 字节对齐。
### IPv6 数据报的一般形式
IPv6 数据报由两大部分组成：
* 基本首部
* 有效载荷(`payload`)。有效载荷也称为净负荷。有效载荷允许有零个或多个扩展首部(`extension header`)，再后面是数据部分。

![](IPv6详解/img1.png)

#### IPv6 数据报的基本首部
IPv6 将首部长度变为固定的 40 字节，称为基本首部。

把首部中不必要的功能取消了，使得 IPv6 首部的字段数减少到只有 8 个。

IPv6 对首部中的某些字段进行了如下的更改：

![](IPv6详解/img2.png)
![](IPv6详解/img3.png)

* 版本(`version`)—— 4 位。它指明了协议的版本，对 IPv6 该字段总是 6。
* 通信量类(`traffic class`)—— 8 位。这是为了区分不同的 IPv6 数据报的类别或优先级。目前正在进行不同的通信量类性能的实验。
* 流标号(`flow label`)—— 20 位。 “流”是互联网络上从特定源点到特定终点的一系列数据报， “流”所经过的路径上的路由器都保证指明的服务质量。所有属于同一个流的数据报都具有同样的流标号。
* 有效载荷长度(`payload length`)—— 16 位。它指明 IPv6 数据报除基本首部以外的字节数（所有扩展首部都算在有效载荷之内），其最大值是 64 KB。
* 下一个首部(`next header`)—— 8 位。它相当于 IPv4 的协议字段或可选字段。
* 跳数限制(`hop limit`)—— 8 位。源站在数据报发出时即设定跳数限制。路由器在转发数据报时将跳数限制字段中的值减 1。当跳数限制的值为零时，就要将此数据报丢弃。
* 源地址—— 128 位。数据报的发送站的 IP 地址。
* 目的地址—— 128 位。数据报的接收站的 IP 地址。

#### IPv6 的扩展首部
IPv6 把原来 IPv4 首部中选项的功能都放在扩展首部中，并将扩展首部留给路径两端的源站和目的站的主机来处理。

数据报途中经过的路由器都不处理这些扩展首部（只有一个首部例外，即逐跳选项扩展首部）。

这样就大大提高了路由器的处理效率。

在 RFC 中定义了六种扩展首部：逐跳选项、路由选择、分片、鉴别、封装安全有效载荷、目的站选项。
## 从 IPv4 向 IPv6 过渡
向 IPv6 过渡只能采用逐步演进的办法，同时，还必须使新安装的 IPv6 系统能够向后兼容：IPv6 系统必须能够接收和转发 IPv4 分组，并且能够为 IPv4 分组选择路由。

两种向 IPv6 过渡的策略：使用双协议栈、使用隧道技术。
### 双协议栈
双协议栈是指在完全过渡到 IPv6 之前，使一部分主机（或路由器）装有两个协议栈，一个 IPv4 和一个 IPv6。

双协议栈的主机（或路由器）记为 IPv6/IPv4，表明它同时具有两种 IP 地址：一个 IPv6 地址和一个 IPv4 地址。

双协议栈主机在和 IPv6 主机通信时是采用 IPv6 地址，而和 IPv4 主机通信时就采用 IPv4 地址。

根据 DNS 返回的地址类型可以确定使用 IPv4 地址还是 IPv6 地址。

![](IPv6详解/img6.png)

### 隧道技术
在 IPv6 数据报要进入 IPv4 网络时，把 IPv6 数据报封装成为 IPv4 数据报，整个的 IPv6 数据报变成了 IPv4 数据报的数据部分。

当 IPv4 数据报离开 IPv4 网络中的隧道时，再把数据部分（即原来的 IPv6 数据报）交给主机的 IPv6 协议栈。

![](IPv6详解/img7.png)

要使双协议栈的主机知道 IPv4 数据报里面封装的数据是一个 IPv6 数据报，就必须把 IPv4 首部的协议字段的值设置为 41，41 表示数据报的数据部分是 IPv6 数据报。

## ICMPv6
IPv6 也不保证数据报的可靠交付，因为互联网中的路由器可能会丢弃数据报。因此 IPv6 也需要使用 ICMP 来实现错误检查和报告机制功能。新的版本称为 ICMPv6。

IPv4 协议中 ICMP 使用的协议号是 1，而 IPv6 协议中 ICMPv6 使用的值是 58。ICMPv6 对于头部字段的定义也与 ICMP 相同。

![](IPv6详解/10.png)

地址解析协议 ARP 和网际组管理协议 IGMP 协议的功能都已被合并到 ICMPv6 中。

![](IPv6详解/img8.png)

ping 功能也是使用 Echo 请求和 Echo 应答报文。除此之外，还有一个基于 ICMP 的新协议：邻居发现协议。
### ICMPv6 报文的分类
ICMPv6 是面向报文的协议，它利用报文来报告差错，获取信息，探测邻站或管理多播通信。

ICMPv6 还增加了几个定义报文的功能及含义的其他协议。

![](IPv6详解/img9.png)

## NDP
IPv6 的邻居发现协议（NDP）相当于 IPv4 的 ARP、ICMP 的路由器发现和 ICMP 的重定向，还可以发现网络中使用的 IPv6 地址前缀等参数，并实现地址自动配置等。IPv6 协议通过 NDP 功能实现即插即用特性：
* 路由器发现（`Router Discovery`）：当一个节点接入到 IPv6 链路时，它可以发现链路上的路由器，而不需要借助使用 DHCP。
* 前缀发现（`Prefix Discovery`）：当一个节点接入到 IPv6 链路时，它能够发现链路的前缀。
* 参数发现（`Parameter Discovery`）：节点能够发现所在链路的参数，像链路的 MTU 和跳数限制等。
* 地址自动配置（`Address Autoconfiguration`）：节点能够自动配置，不需要使用 DHCP。
* 地址解析（`Address Resolution`）：节点不需要通过 ARP 就能够获取链路上其它节点的 MAC 地址。
* 下一跳确定（`Next-Hop Determination`）：能够确定到达目的节点的下一跳链路层节点，或者所在链路的目的节点，或是到达目的节点的路由器。
* 邻居不可达检测（`Neighbor Unreachability Detection`）：节点上能够检测到链路上的邻居何时不可达，邻居有可能是主机，也可能是路由器。
* 地址冲突检测（`Duplicate Address Detection`）：节点能够检测到要使用的地址是否已经被其它节点占用。
* 重定向（`Redirect`）：对于非连接的目的节点，路由器能够通知主机存在更好的下一跳路由。

NDP 报文是在数据链路内接收和发送，因此封装 NDP 的数据包是使用 IPv6 链路本地地址，或者是链路范围内的组播地址。在安全性上也有加强，NDP 报文的跳数限制是 255。如果收到的数据包的跳数限制值小于 255，那么这个数据包至少经过了一台路由器，因此丢弃这个数据包。这样可以阻止 NDP 不会受到非本地链路的攻击或欺骗。

### NDP 报文
NDP 定义了 5 种报文类型，且跳数限制字段值都是 255。如果收到的 NDP 报文中跳数限制字段值不是 255，那么会丢弃这个 NDP 报文。在 ICMPv6 封装这 5 种 NDP 报文时，编码字段都是 0，不同报文类型通过类型值来标识：
* 路由器请求（`Router Solicitation，RS`）：路由器请求报文是由主机发出的，用来请求链路中的路由器发送一个 RA。类型字段值是 133。
* 路由器通告（`Router Advertisement，RA`）：路由器通告报文是路由器发出的，用来通告路由器的存在和链路参数，比如：链路前缀、链路 MTU，以及跳数限制等。这些报文周期性的发送，也用于响应路由器请求报文。类型字段值是 134。
* 邻居请求（`Neighbor Solicitation，NS`）：也是有主机发起，用来请求另一台主机的 MAC 地址，也用于地址冲突检测、邻居不可达检测。类型字段值是 135。
* 邻居通告（`Neighbor Advertisement，NA`）：用于响应邻居请求报文。如果一个节点改变了 MAC 地址，那么它通过发送一个未请求的邻居通告报文来告知这个新地址。类型字段值是 136。
* 重定向（`Redirect`）：跟 IPv4 协议中的 ICMP 用法相同，只不过是移植到 NDP 中。类型字段值是 137。

### 路由器发现
路由器在所在的链路上周期性发送 RA，告知它的存在和配置的所有参数。未收到请求的 RA 的源地址是路由器接口的链路本地 IPv6 地址，目的地址是所有节点的组播地址（`FF02::1`）。

刚接入到链路的主机，需要等待一个 RA，用来发现链路上的路由器和链路参数。默认等待 200 秒的时间太长。所以，主机激活时，就会发送一个 RS，这个报文的源地址可以是未指定地址（`::`），也可以是主机的链路本地 IPv6 地址。目的地址就是所有路由器的组播地址（`FF02::2`），请求链路本地路由器为主机提供一些信息。

只有路由器才会监听链路本地路由器组播地址，当路由器收到 RS 时，就会发送一条 RA 作为响应。如果收到报文的源地址是链路本地地址，那么使用链路本地地址单播发送。如果源地址是未指定地址（`::`），那么会以组播方式发送给所有节点（`FF02::1`）。

![](IPv6详解/11.png)

当主机收到 RS 时，会把路由器的链路本地地址作为默认路由地址，添加到自己的路由表中。如果路由器列表有多条默认路由器条目，那么主机要给出选定默认路由器的方法。要么是整个默认路由器列表依次轮询，要么选择单台路由器作为默认路由。
### 地址自动配置
当一台 IPv6 的设备第一次接入链路时，它能够自动配置自己的接口地址。这个过程的第一步就是确定 64 位接口 ID 部分，使用 MAC-to-EUI64 转换法获取接口 ID。

当然，接口 ID 只是 IPv6 地址的一半，还需要一个 64 位的前缀。前面提到过，链路本地前缀是`0xFF80::/10`。用它作为 64 位前缀（`0xFF80::/64`），再加上转换后的接口 ID，就是一个完整的 IPv6 地址，可以和同一链路上设备进行通信。

如果一台主机只需要和所在链路上的设备通信，那么它自动配置的链路本地地址就已经满足了。但是如果主机需要和链路之外的设备通信，那么它就需要一个更大范围的地址，通常是一个全球 IPv6 地址。有两种途径获取这类地址：有状态或无状态的地址自动配置。

使用 DHCPv6 服务器来分配 IPv6 地址，称为有状态地址自动配置。主机要么根据预先的配置查找 DHCPv6 服务器，要么收到字段 M 置位的路由器通告报文来获取 DHCPv6 服务器。

更有趣的是无状态地址自动配置（`Stateless Address Autoconfiguration ，SLAAC`），不依赖服务器、不需要手动配置。这个过程非常简单，当一台 IPv6 设备接入网络时，会发送 RS 来查询网络中是否存在路由器。RA 有一个字段可以告诉 IPv6 设备使用哪种方式配置自己的 IPv6 地址，这个字段称为 M 位。如果 M 位置位，值为 1 时，表示设备通过 DHCPv6 协议动态配置 IPv6 地址；如果 M 位不置位，值为 0 时，则表示设备通过 SLAAC 来配置 IPv6 地址。

IPv6 设备从收到的 RA 中获取一个或多个链路前缀，再加上之前确定的接口 ID，就得到了一个全球唯一的 IPv6 地址。

IPv6 设备执行 SLAAC 的过程，不需要人工干预，也没有 DHCP 服务器参与，设备自行完成配置。也就是说，这种机制为 IPv6 网络提供了即插即用功能。
### 邻居地址解析
IPv4 通过 ARP 获取 MAC 地址，然而 ARP 协议无法照搬到 IPv6 环境中，IPv6 没有定义广播地址。为了解决查询目的设备的 MAC 地址问题， IPv6 通过 NDP 获取 MAC 地址。IPv6 设备使用 NS 和 NA 来实现 MAC 地址的查询和响应。IPv6 使用目的节点组播地址作为 NS 的目的地址。

目的节点的组播地址的前 104 位固定是`FF02::1:FF`，后 24 位使用目的单播 IPv6 地址接口 ID 的后 24 位。当接口获取一个单播或任意播 IPv6 地址时，就会同时监听发送给这个单播地址对于的目的节点组播地址。

如果目的节点是链路之外的节点，那么可以通过路由器通告报文，获取默认路由器的 MAC 地址。如果目的节点在链路内，那么节点会先查找邻居缓存看一下是否已经学到这个地址。IPv6 的邻居缓存和 IPv4 的 ARP 缓存相似，记录 IP 地址和 MAC 地址的对应关系。

如果地址不在邻居缓存中，节点会发送一个 NS。目的节点收到报文后，就知道源节点的 MAC 地址，并回复邻居通告报文。

如果目的节点存在并且收到了 NS，那么它会回复一个 NA。这个 NA 的目的地址就是源节点的源地址。收到响应的 NA 后，源节点就把目的节点的 MAC 地址添加到邻居缓存的条目中。

NDP 的 NA 还有另一种用法，当 IPv6 节点的 MAC 地址发生变化时，也可以在未收到 NS 的情况下，直接向本地链路发生一条 NA，向本地链路上其它设备通告新的 IPv6 地址和 MAC 地址的对应关系。因为目的是通告给链路中所有设备，而不是某一台设备，所有 NA 的目的地址就是链路本地所有节点组播地址（`FF02::1`）。
### 地址冲突检测
虽然通过 MAC 地址转换成接口 ID，大多数情况下可以保证是设备地址是唯一的，但是也可能存在重复 MAC 地址的情况，因此不管设备是如何获取地址的，都需要在使用之前进行地址冲突检测。

获取一个地址的节点会把新地址作为临时状态的地址。在地址冲突检测完成前，地址不能被使用。节点会发送目的地址是新地址的 NS 来验证。NS 的源地址是未指定地址，目的地址是目的节点的组播地址。

如果节点收到一个 NS，并且目的地址是这个节点已经使用的地址，就会发送一个目的地址为已使用地址的 NA。源节点收到 NA 后，就会知道这个地址是冲突的，并且不能使用。
### 私有地址
无状态地址自动配置会有一个安全隐患：即使一台设备从一个子网转移到另一个子网，它的接口 ID 始终保持不变。那么就可以通过接口 ID 来识别用户，推断出用户的所在位置，追踪用户的活动和位置记录，暴露个人隐私信息。

这个问题可以通过 IPv6 私有地址来解决。私有地址是随机生成的接口 ID。接口 ID 通常一天变化一次，也会在获取一个新的 IPv6 地址时改变。

但是服务器的地址不需要经常变化。跟服务器通信的节点，以及 DNS 服务器必须通过静态地址了解服务器的位置。因此，标准的无状态配置的 IPv6 地址保留“公共”地址，任何一个向服务器发送数据时，使用这个地址作为目的地址。但是服务器发送数据时，使用的却是私有地址。这就像公司的分机短号一样，你能看见是谁在打你电话，但是别人看不到你的号码。
