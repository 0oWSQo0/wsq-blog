



从网络分层上看，我们知道二层网络中，使用 MAC 地址进行传输，MAC 地址做为数据链路层的设备标识符。

![](ARP详解/1.png)

三层网络中，使用 IP 地址进行传输，IP 地址做为网络层的设备标识符。

![](ARP详解/2.png)

我们还知道，域名通过 DNS 解析成 IP 地址，有了 IP 地址就可以在网络上找到目的地。

![](ARP详解/3.png)

IP 地址通过 ARP，获得 MAC 地址，有了 MAC 地址才能在物理网络上传输数据。

![](ARP详解/4.png)

ARP 是地址解析协议。根据设备的 IP 地址来查询对应 MAC 地址的协议。主机通过 ARP 查询到 MAC 地址后，将在 ARP 缓存表中增加映射表项，即 IP 地址和 MAC 地址的映射表项。

![](ARP详解/5.png)

![](ARP详解/img15.png)

## MAC 地址
每个网卡或三层网口都有一个 MAC 地址，MAC 地址是烧录到硬件上，因此也称为硬件地址。MAC 地址作为数据链路设备的地址标识符，需要保证网络中的每个 MAC 地址都是唯一的，才能正确识别到数据链路上的设备。

MAC 地址由 6 个字节组成。前 3 个字节表示厂商识别码，每个网卡厂商都有特定唯一的识别数字。后 3 个字节由厂商给每个网卡进行分配。厂商可以保证生产出来的网卡不会有相同 MAC 地址的网卡。

![](ARP详解/0.png)

现在可以通过软件修改 MAC 地址，虚拟机使用物理机网卡的 MAC 地址，并不能保证 MAC 地址是唯一的。但是只要 MAC 地址相同的设备不在同一个数据链路上就没问题。

为了查看方便，6 个字节的 MAC 地址使用十六进制来表示。每个字节的 8 位二进制数分别用 2 个十六进制数来表示，例如我的网卡 MAC 地址是`E0-06-E6-39-86-31`。

比特(`bit`)，也叫位。二进制中最小单位，一个比特的值要么是 0 要么是 1。

字节(`Byte`)。一个字节由八个比特构成。
## ARP 原理
ARP 是如何知道 MAC 地址的呢？简单说，ARP 是通过 ARP 请求和 ARP 响应报文确定 MAC 地址的。

![](ARP详解/6.png)

假如主机 A 向同一网段上的主机 B 发送数据。主机 A 的 IP 地址为`10.0.0.1`，主机 B 的 IP 地址为`10.0.0.2`，主机 C 的 IP 地址为`10.0.0.3`。它们都不知道对方的 MAC 地址。ARP 地址解析过程如下：

![](ARP详解/7.png)

1. 主机 A 首先查看自己的 ARP 表（即 ARP 缓存表），确定是否有主机 B 的 IP 地址对应表项。如果有，则直接使用表项中的 MAC 地址进行封装，封装成帧后发送给主机 B。
	 ![](ARP详解/8.png)
2. 如果主机 A 的 ARP 表没有对应的表项，就发送一个广播帧，源 IP 和源 MAC 地址是主机 A，目的 IP 地址是主机 B，目的 MAC 地址是广播 MAC 地址，即`FFFF-FFFF-FFFF`。这就是 ARP 请求报文。
	 ![](ARP详解/9.png)
3. ARP 请求是广播报文，同一个网段的所有主机都能收到。只有主机 B 发现报文中的目的 IP 地址是自己，于是主机 B 发送响应报文给主机 A，源 MAC 地址和源 IP 地址是主机 B，目的 MAC 地址和目的 IP 地址是主机 A ，这个报文就叫 ARP 响应报文。同时，主机 B 的 ARP 表记录主机 A 的映射关系，即主机 A 的 IP 地址和 MAC 地址的对应关系。
	 ![](ARP详解/10.png)
4. 主机 C 也收到了 ARP 请求报文，但目的 IP 地址不是自己，所以不会进行响应。于是主机 C 添加主机 A 的映射关系到 ARP 表，并丢弃 ARP 请求报文。
	 ![](ARP详解/11.png)
5. 主机 A 收到 ARP 响应报文后，添加主机 B 的映射关系，同时用主机 B 的 MAC 地址做为目的地址封装成帧，并发送给主机 B。
	 ![](ARP详解/12.png)

如果每发送一个 IP 报文就要进行一次 ARP 请求，来确定 MAC 地址，那将会造成不必要的网络流量，通常的做法是用 ARP 表记录 IP 地址和 MAC 地址的映射关系。主机发送报文时，首先会查看它的 ARP 表，目的是为了确定是否是已知的设备 MAC 地址。如果有，就直接使用；如果没有，就发起 ARP 请求获取。不过，缓存是有一定期限的。ARP 表项在老化时间（`aging time`）内是有效的，如果老化时间内未被使用，表项就会被删除。

![](ARP详解/13.png)

ARP 表项分为动态 ARP 表项和静态 ARP 表项：
* 动态 ARP 表项由 ARP 动态获取，因此在网络通信中，无需事先知道 MAC 地址，只要有 IP 地址即可。如果老化时间内未被使用，表项就会被自动删除。
* 静态 ARP 表项是手工配置，不会老化。静态 ARP 表项的优先级高于动态 ARP 表项，可以将相应的动态 ARP 表项覆盖。

![](ARP详解/14.png)

## 代理 ARP
ARP 广播报文会被路由器隔离，没有默认网关、网段不同的主机相互通信时，连接这两个网络的路由器可以响应这个 ARP 请求，这个过程叫做代理 ARP（`Proxy ARP`）。

![](ARP详解/15.png)

主机 A 与另一个网段的主机 B 通信，主机 A 直接发送 ARP 请求，解析主机 B 的 MAC 地址。运行了代理 ARP 的路由器收到 ARP 请求后，代替主机 A 在`20.0.0.0`网段发出 ARP 请求，解析主机 B 的地址。

![](ARP详解/16.png)

主机 B 收到路由器发出的 ARP 请求，发出 ARP 响应报文，告知自己的 MAC 地址是`2222-2222-2222`。路由器收到 ARP 响应后，也向主机 A 发送 ARP 响应，但目的 MAC 地址是与`10.0.0.0`网段连接的端口 MAC 地址是`1010-1010-1010`。主机 A 收到报文后，在 ARP 表中添加 IP 地址是`20.0.0.1`和 MAC 地址是`1010-1010-1010`的映射表项。

![](ARP详解/17.png)

因此主机 A 会将所有要发送给主机 B 的数据发送给路由器，路由器再将其转发给主机 B。反之亦然。

代理 ARP 功能屏蔽了分离的网络，主机不用修改 IP地址和子网掩码就可以和现有的网络互通。让用户使用起来，跟在同一个网络上一样。代理 ARP 使用在主机没有默认网络，或没有任何路由的网络上，通常是那些不支持设定子网掩码的老设备。但代理 ARP 会转发 ARP 广播报文，造成网络效率低，不适合用于大规模网络。

![](ARP详解/18.png)

## RARP
RARP 是将 ARP 反过来，从设备 MAC 地址获取 IP 地址的一种协议。通常是打印机等小型嵌入式设备接入网络时会用得到。

![](ARP详解/19.png)

### RARP 原理
使用 RARP 需要搭建一台 RARP 服务器，在服务器上注册设备的 MAC 地址及 IP 地址。

设备插电启动后，广播发送一个请求报文，希望获得 IP 地址应答。目的 MAC 地址是广播地址，源 MAC 地址是自己的物理地址。

![](ARP详解/20.png)

RARP 服务器收到 IP 地址请求后，给设备分配一个 IP 地址，并通过响应报文发送给设备。设备收到响应报文后，把 RARP 服务器分配的 IP 地址设置成自己的 IP 地址。

![](ARP详解/21.png)

## 免费 ARP
免费 ARP 是一种特殊的 ARP 请求，它并非通过 IP 找到对应的 MAC 地址，而是当主机启动的时候，发送一个免费 ARP 请求，即请求自己的 IP 地址的 MAC 地址。

![](ARP详解/22.png)

与普通 ARP 请求报文的区别在于报文中的目标 IP 地址。普通 ARP 报文中的目标 IP 地址是其它主机的 IP 地址；而免费 ARP 的请求报文中，目标 IP 地址是自己的 IP 地址。

![](ARP详解/23.png)

免费 ARP 的作用：

起到一个宣告作用。它以广播的形式将数据包发送出去，不需要得到回应，只为了告诉其它主机自己的 IP 地址和 MAC 地址。

可用于检测 IP 地址冲突。当一台主机发送了免费 ARP 请求报文后，如果收到了 ARP 响应报文，则说明网络内已经存在使用该 IP 地址的主机。

可用于更新其它主机的 ARP 缓存表。如果该主机更换了网卡，而其它主机的 ARP 缓存表仍然保留着原来的 MAC 地址。这时，通过免费的 ARP 数据包，更新其它主机的 ARP 缓存表。
## ARP 报文
ARP 报文分为 ARP 请求报文和 ARP 应答报文，它们的报文格式相同，但是各个字段的取值不同。

![](ARP详解/24.png)

ARP 报文中各个字段的含义如下。

![](ARP详解/25.png)

## 网络实战
ARP 可以动态地进行地址解析，因此网络中的设备无需配置，只要有 IP 地址就可以自动获得 MAC 地址。但是静态 ARP 和代理 ARP 等是需要单独配置。下面我们代理 ARP 的实验。
### 代理 ARP
#### 网络拓扑

![](ARP详解/26.png)

#### 实验要求
* PC1 和 PC2 只配置 IP 地址和子网掩码；
* RT（路由器）配置代理 ARP 功能，PC1 可以 ping 通 PC2。

#### 操作步骤
PC1 、PC2 分别配置 IP 地址。

![](ARP详解/27.png)

RT 配置 IP 地址和代理 ARP 功能。

![](ARP详解/28.png)

#### 功能验证
配置完成后，下面就要进行验证，检查功能是否生效、配置是否正确。在 PC1 上 ping PC2 的 IP 地址，进行连通性测试。

![](ARP详解/29.png)

还可以抓包查看完整的报文交互过程，同时验证下理论知识是否正确。

![](ARP详解/30.png)

