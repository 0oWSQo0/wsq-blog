


OSPF(`Open Shortest Path First`，开放最短路径优先)是基于链路状态算法的 IGP 内部网关路由协议，主要用于大中型网络，广泛应用在接入和城域网中。

OSPF 发展经过了几个版本，OSPFV1 版本一直处于实验阶段，没有公开使用。目前针对 IPv4 使用 OSPFV2。OSPFv3 是针对 IPv6 技术的版本。若没有特别说明，下文中所提到的 OSPF 均指 OSPFV2。

OSPF 直接运行于 IP 协议之上，使用 IP 协议号 89。

OSPF 是一个链路状态路由协议，采用 SPF 算法(也称 Diikstra 算法)，在同一个区域内的所有路由器交换 LSA(`Link-State Advertisement`)链路状态通告，构建LSDB(`Link-State Database`)链路状态数据库，每台路由器以本路由器为根，基于 LSDB 执行 SPF 算法，生成 SPF 树(`ShortestPathTree`)，计算到每个目的地的最短路径，产生路由表。
## 特点
OSPF 具有很多显著的特点：
* 支持 CIDR：早期的路由协议如 RIPv1 并不支持 CIDR，而 OSPF 可以支持 CIDR 同时在发布路由信息时携带了子网掩码信息,使得路由信息不再局限于有类网络。
* 支持区域划分：OSPF 协议允许自治系统内的网络被划分成区域来管理。通过划分区域来实现更加灵活的分级管理。
* 无路由自环：OSPF 从设计上保证了无路由环路。OSPF 支持区域的划分，区域内部的路由器都使用 SPF 最短路径算法保证了区域内部的无环路。区域之间 OSPF 利用区域的连接规则保证了区域之间无路由自环路。
* 路由变化收敛速度快：OSPF 被设计为触发式更新方式。当网络拓扑结构发生变化，新的链路状态信息会立刻泛洪。OSPF 对拓扑变化敏感，因此路由收敛速度加快。
* 使用 IP 组播收发协议数据：OSPF 路由器使用组播和单播收发协议数据，因此占用的网络流量很小。
* 支持多条等值路由：当到达目的地有多条等值开销路径时，流量被均衡地分担在这些等值开销路径上，实现了负载分担，更好地利用了链路带宽资源。
* 支持协议报文的认证：在某些安全级别较高的网络中，OSPF 路由器可以提供认证功能。OSPF 路由器之间的报文可以配置成必须经过验证才能交换。通过验证可以提高网络的安全性。

## 几个基本概念
OSPF 中有几个非常重要的基本概念：自治系统、链路状态、邻居关系、邻接关系、区域和花费。
1. 自治系统(AS)
   AS(自治系统)通常称为进程 ID，是运行同一种路由协议并且由同一组织结构管理的一组路由器组成。同一个 AS 中的所有路由器必须运行相同的路由协议。在 OSPF 网络中只有在同一个 AS 中的路由器才会相互交换链路状态信息，所有的 OSPF 路由器都维护一个相同的链路状态数据库 LSDB。
2. 链路状态(`Link-State`)
   链路状态的信息，包括接口的 IP 地址和子网掩码、接口的网络类型、链路的花费`Cost`、以及链路上的邻居。
3. 邻居关系(`Neighbor`)
   OSPF 路由器启动后，便会通过 OSPF 接口向外发送`Hello`报文用于发现邻居。收到`Hello`报文的 OSPF 路由器会检查报文中所定义的一些参数，如果双方一致就会形成邻居关系。
4. 邻接关系(`Adiacency`)
   邻接关系是指两台路由器之间允许直接交换路由更新数据。OSPF只与建立了邻接关系的邻居共享链路状态信息，并不是所有的邻居都可以成为邻接关系，这取决于网络的类型和路由器的配置。只有当双方成功交换`DD`报文并能交换 LSA 之后，才形成真正意义上的邻接关系。
5. 区域(`Area`)
   OSPF 通过划分区域来实现层次结构设计，在一个 AS 内部可以划分多个不同的区域 OSPF 是以链路划分区域的。
6. 花费(`Cost`)
   每条链路都有一个花费。花费是根据链路的带宽计算而来的，并且可以人为地修改。OSPF 使用的唯一度量值就是花费。

### 度量值
每种路由协议对度量值的定义是不同的，OSPF 使用`Cost`作为路由度量值，`Cost`值越小，则路径（路由）越优。每一个激活 OSPF 的接口都有一个接口的`Cost`值，值等于 100/接口带宽 Mbit/s，计算结果取整数部分，当结果小于 1 时，值取 1。这个值也可以人为修改，修改值会直接影响`Cost`值的计算，从而影响网络中 OSPF 路由的选择。

[](OSPF/cost-1.png)

### Router-ID
`Router-ID`用于标识 OSPF 路由器，是一个 32 位的数值，跟 IPv4 地址格式一样。连续的 OSPF 路由器组成的网络叫做 OSPF 域，域内`Router-ID`必须唯一，也就是在同一个域内不允许出现两台相同`Router-ID`的路由器。`Router-ID`可以手动设置，也可以自动生成，常见的做法是把设备的`Router-ID`指定为设备的`Loopback`接口的 IP 地址。

[](OSPF/route-id.png)

### Loopback 接口
`Loopback`接口也就是本地回环接口，是一种软件的、逻辑的接口，不只网络设备支持`Loopback`接口，Windows 主机或 Linux 主机也支持。根据业务需求，在网络设备上创建`Loopback`接口，并配置 IP 地址。`Loopback`接口非常稳定，除非手动进行关闭或删除，否则是永远不会失效的。正因如此，`Loopback`接口常用于设备网管、网络测试、网络协议应用等。
```bash
# 为设备创建一个 Loopback 接口，并配置接口的 IP 地址
[router]interface loopback 0
[router-loopback0]ip address 1.1.1.1 32
[router-loopback0]quit

# 创建一个 OSPF 进程，并配置设备的 Router-ID 为 1.1.1.1
[router]ospf 1 router-id 1.1.1.1
```

## 区域
随着网络规模日益扩大，当一个大型网络中的路由器都运行 OSPF 路由协议时，路由器数量的增多会导致 LSDB 非常庞大，占用大量的存储空间，并使得运行 SPF 算法的复杂度增加，导致 CPU 负担很重。

在网络规模增大之后，拓扑结构发生变化的概率也增大，网络会经常处于“动荡”之中，造成网络中会有大量的 OSPF 协议报文在传递，降低了网络的带宽利用率。更为严重的是，每一次变化都会导致网络中所有的路由器重新进行路由计算。OSPF 协议通过将自治系统划分成不同的区域(`Area`)来解决上述问题。区域是从逻辑上将路由器划分为不同的组，每个组用区域号(`AreaID`)来标识。

区域是一组网段的集合。OSPF 支持将一组网段组合在一起，这样的一个组合称为一个区域，即区域是一组网段的集合。划分区域可以缩小 LSDB 规模，减少网络流量。区域内的详细拓扑信息不向其他区域发送，区域间传递的是抽象的路由信息，而不是详细描述拓扑结构的链路状态信息。每个区域都有自己的 LSDB，不同区域的 LSDB 是不同的。路由器会为每一个自己所连接到的区域维护一个单独的 LSDB。由于详细链路状态信息不会被发布到区域以外，因此 LSDB 的规模大大缩小了。

### Area-ID
OSPF 的每一个区域都由一个编号，不同的编号表示不同的区域，这个区域编号也叫做区域 ID（`Area-ID`）。区域 ID 是一个 32 位二进制数，与 IPv4 地址的格式一样，比如`Area 0.0.0.1`，为了方便起见，也会用十进制数表示，`Area 0.0.0.1`简化成`Area1`，`Area 0.0.0.255`简化成`Area255`，`Area 0.0.1.0`简化成`Area256`。

### 区域的分层结构
![](OSPF/area.png)

上图中，`Area0`称为骨干区域，骨干区域负责在非骨干区域之间发布由区域边界路由器汇总的路由信息(并非详细的链路状态信息)，为了避免区域间路由环路，非骨干区域之间不允许直接相互发布区域间路由信息。因此，所有区域边界路由器都至少有一个接口属于`Area0`，即每个区域都必须连接到骨干区域。如果一个域内有多个区域，那么有且只有一个`Area0`。因此，所有的 ABR（`Area Border Router`，区域边界路由器）至少有一个接口属于`Area0`，所以`Area0`包含所有的 ABR。有点类似星型结构，骨干区域在中间，每个非骨干区域是分支。

任何一个非骨干区域都必须与`Area0`相连，当网络中某个区域没有与`Area0`相连时，这个区域的路由计算就会出问题。OSPF 的区域间路由都由`Area0`中转，任何两个非骨干区域之间是不能直接交互路由的。

[](OSPF/area-2.png)

解决方法是修改 OSPF 的网络设计，与`Area0`直接相连。如果不能改或改动成本大等问题，可以考虑使用 OSPF 虚链路（`Virtual Link`）。`Virtual Link`是一种逻辑的链路，不是一条真实的链路。通过搭建一条`Virtual Link`，可以把原来没有与骨干区域直连的区域给连接起来。

另一个可能的问题是，骨干区域不连续或被分隔开。非骨干区域交互区域路由时，容易引发路由环路。因此，OSPF 要求 ABR 只能将自己直连的区域内部路由通告给`Area0`，而不能将自己到达其它区域的域间路由通告给`Area0`。另外，ABR 可以将自己直连区域的内部路由和到达其它区域的域间路由通告给非骨干区域。这样就能规避网络规划不合理导致的路由环路。解决问题最好的办法是修改 OSPF 的规划，当然建立`Virtual Link`也可以临时解决这个问题。

[](OSPF/area-3.png)

实际部署中，Virtual Link 并不是一种常规的技术，而是一种临时方案，合理的 OSPF 网络规划依然是一个最佳的选择。

## OSPF路由器角色
OSPF 不仅在路由器上使用，许多交换机、防火墙，甚至 Linux 主机都能实现。这里说的 OSPF 路由器，实际上是以路由器为代表。

[](OSPF/router.png)

OSPF 定义了一系列类型的路由器：
1. 内部路由器(`Internal Router，IR`)
   指所有接口网段都在一个区域的路由器。属于同一个区域的 IR 维护相同的 LSDB。
   图中 R1、R4、R5 是 IR。
2. 区域边界路由器(`Area Border Router，ABR`)
   指连接到多个区域的路由器。并非所有接入多个区域的路由器都是 ABR。它至少有一个接口在`Area0`中，同时还有其它接口在其它区域中。ABR 负责在区域之间传递路由信息，因此必须连接到`Area0`，同时连接着其它区域。ABR 为每一个所连接的区域维护一个 LSDB。区域之间的路由信息通过 ABR 来交互。
   图中 R2、R3 是 ABR。
3. 骨干路由器(`Backbone Router，BR`)
   骨干路由器是指至少有一个端口(或者虚连接)连接到骨干区域的路由器，包括所有的 ABR 和所有端口都在骨干区域的路由器。由于非骨干区域必须与骨干区域直接相连，因此骨干区域中路由器(即 BR)往往会处理多个区域的路由信息。
   图中 R1、R2、R3、R6 是 BR。
4. AS 边界路由器(`AS Boundary Router，ASBR`)
   指和其他 AS 中的路由器交换路由信息的路由器，这种路由器负责向整个 AS 通告 AS 外部路由信息。AS 内部路由器通过 ASBR 与 AS 外部进行通信。AS 边界路由器可以是内部路由器 IR 或 ABR，可以属于骨干区域也可以不属于骨干区域。
   图中 R6 是 ASBR。
   
## OSPF支持的网络类型
并非所有的邻居关系都可以形成邻接关系并交换链路状态信息以及路由信息，这与网络类型有关系。所谓网络类型是指运行 OSPF 网段的二层链路类型。

OSPF 根据链路层协议类型将网络分为下列 4 种类型：点到点网络、广播型网络、NBMA 网络和点到多点网络。
### 点到点网络
P2P(`Point-to-Point`) 网络是在一条链路上只能连接两台路由器的环境。

典型的例子就是 PPP 链路，当两台路由器通过 PPP 链路直连时，接口的封装协议就是 PPP，接口激活 OSPF 后，网络类型就是 P2P。

OSPF 在 P2P 网络类型中，接口以组播方式发送协议报文，组播地址是`224.0.0.5`，报文类型包括`Hello`报文、`DD`报文、`LSR`报文、`LSU`报文和`LSAck`报文。

默认情况下，P2P 类型接口的`Hello`报文发送间隔是 10 秒。P2P 类型的网络中，不会选举 DR 和 BDR。

[](OSPF/p2p.png)

即使在以太网中只有两台路由器，OSPF 也会选举 DR 和 BDR，实际上没必要且浪费时间，因为从逻辑上看是点对点的连接，选举 DR 和 BDR 实在是画蛇添足。因此，为了提高 OSPF 的效率，加快邻接关系的建立过程，可以把互联接口的网络类型修改为 P2P。
### 广播型网络
广播型网络(`Broadcast Multi-Access，BMA`)中可以多台路由器接入，任意两台路由器之间都能进行二层通信，一台路由器发送出去的广播数据，其它所有路由器都能收到，是一个支持广播的网络环境。以太网就是典型的 BMA 网络。

当多台路由器接入到 BMA 网络时，比如多台路由器连接在同一台二层交换机上，这些路由器的接口激活 OSPF 就会开始发送组播的`Hello`报文，从而发现网络中的其它路由器。

BMA 网络中，会选举 DR 和 BDR，所有非 DR、BDR 路由器仅与 DR 和 BDR 建立邻接关系。

[](OSPF/bma.png)

### 非广播网络
非广播网络(`Non-Broadcast Multi-Access，NBMA`)也允许多台路由器接入，但是不具备广播能力，这时组播发送的`Hello`报文在 NBMA 网络中可能会有问题。为了让 OSPF 路由器之间能够顺利发现彼此，并正确建立邻接关系，还需要手动配置，比如使用单播方式发送 OSPF 报文等。

帧中继、X.25 就是 NBMA 网络。NBMA 网络中，也会进行 DR 和 BDR 选举。默认情况下，NBMA 类型接口的`Hello`报文发送间隔是 30 秒。
### 点到多点网络
点到多点网络(`Point-to-Multipoint ，P2MP`)中，路由器接口的数据链路层封装不会自动设置，必须手动指定。

P2MP 类似将多条 P2P 链路的一头进行捆绑的网络。在 P2MP 网络中无需选举 DR、BDR。

OSPF 在 P2MP 类型的接口上以组播方式发送`Hello`报文，以单播方式发送其它报文。默认情况下，`Hello`报文发送间隔是 30 秒。

即使两个路由器的直连接口的网络类型不同，也能建立 OSPF 邻接关系，但是 OSPF 路由计算容易出现问题，因为网络类型会影响 LSA 对接口的描述，关系到路由器对网络拓扑的理解和路由计算。因此，OSPF 邻接的路由器，互联接口的网络类型必须一致。

### 修改网络类型
在华为设备上修改 OSPF 接口的网络类型命令：
```shell
[Huawei]interface g0/0/0
[Huawei-GigabitEthernet0/0/0]ospf network-type ?
  broadcast  Specify OSPF broadcast network
  nbma       Specify OSPF NBMA network
  p2mp       Specify OSPF point-to-multipoint network
  p2p        Specify OSPF point-to-point network
[Huawei-GigabitEthernet0/0/0]ospf network-type p2p
```
## OSPF 协议大致过程
[](OSPF/ospf-step.png)

OSPF 协议有四个主要过程：
* 寻找邻居
  OSPF 协议启动后，先寻找网络中的邻居，也就是通过`Hello`报文确认可以双向通信。
  [](OSPF/ospf-step-2.png)
* 建立邻接关系
  一部分路由器形成邻居关系后，就开始进行建立邻接关系。建立了邻居关系的路由器才能互相传递链路状态信息。
  [](OSPF/ospf-step-3.png)
* 链路状态信息同步
  建立邻接关系的 OSPF 路由器在网络中交互 LSA（链路状态通告），最后形成包含网络完整链路状态信息的 LSDB（链路状态数据库）。
  [](OSPF/ospf-step-4.png)
* 计算路由
  LSDB 同步完成后，OSPF 区域内的每个路由器对网络结构有相同的认识，邻居路由器之间形成完全的邻接关系。然后，每台路由器根据 LSDB 的信息使用 SPF（最短路径优先）算法独立计算出路由。
  [](OSPF/ospf-step-5.png)
  
## OSPF报文类型
OSPF 协议的报文直接使用 IP 封装，在 IP 报文头部对应的协议号是 89。

![](OSPF/ospf-ip.png)

通常 OSPF 的协议报文使用组播地址作为目的 IP 地址，有两个组播 IP 地址是 OSPF 专用：
* `224.0.0.5`：这个组播地址是指所有的 OSPF 路由器。
* `224.0.0.6`：这个组播地址是指所有的 OSPF DR/BDR 路由器。

OSPF 报文主要有 5 种类型：`Hello`报文、DD(`DatabaseDescription`，数据库描述)报文、LSR(`LinkState Request`，链路状态请求)报文、LSU(`LinkState Update`，链路状态更新)报文和LSAck(`LinkState Acknowledgment`，链路状态应答)报文。它们使用相同的 OSPF 报头格式，头部长度是 24 字节。

c

报头字段含义：
* 版本：OSPFv2 的值为 2。
* 类型：表示 OSPF 报文的类型。值与报文类型对应关系是：`1–Hello；2–DD；3–LSR；4–LSU；5–LSAck`。
* 报文长度：整个 OSPF 报文的长度，单位是字节。
* 路由器 ID：路由器的 OSPF `Router-ID`，是每台路由器的唯一标识。
* 区域 ID：表示所属的区域 ID，是一个 4 字节的数值。
* 校验和：用来校验报文有效性。
* 认证类型：表示报文使用的认证类型。0 表示无认证；1 表示明文验证；2 表示 MD5 验证。
* 认证数据：用于报文认证的内容。具体值根据不同验证类型而定。验证类型为 0 时，此字段没有数据。验证类型为 1 时，此字段为验证密码。验证类型为 2 时，此字段为 MD5 摘要消息。

路由器的接口一旦激活 OSPF，就会开始发送`Hello`报文。`Hello`报文的一个重要功能就是发现直连链路上的 OSPF 邻居。发现邻居后，就开始邻接关系的建立。这个过程中，DD 报文用于发送 LSA 的头部摘要。通过 DD 报文的交互，路由器知道了对方所有的 LSA，而 LSR 向对方请求完整的 LSA。LSU 对 LSR 进行回应，或者主动更新 LSA，LSU 包含完整的 LSA 数据。LSAck 保证 OSPF 更新机制的可靠性。此外，`Hello`报文负责 OSPF 邻居关系的维护，两台直连路由器形成邻接关系后，双方仍然周期性的发送`Hello`报文，告知对方自己是在线状态。

| 类型 | 报文名称 | 报文说明 |
| :--: | :--: | :--: |
| 1 |     Hello     | 用于发现直连链路上的 OSPF 邻居，以及维护 OSPF 邻居关系 |
| 2 | DD<br>Database Description<br>数据库描述 | 用于描述LSDB，报文中携带的是 LSA 的头部数据，不是完整的 LSA 内容 |
| 3 | LSR<br>Link State Request<br>链路状态请求 | 向 OSPF 邻居请求 LSA |
| 4 | LSU<br>Link State Update<br>链路状态更新 | 用于发送 LSA，报文中携带的是完整的 LSA 数据 |
| 5 | LSAck<br>Link State Acknowledgment<br>链路状态确认 | 设备收到 LSU 后，LSAck对接收的 LSA 进行确认 |

### Hello 报文
`Hello`报文用于发现直连链路上的邻居，以及维护邻居关系。`Hello`报文携带邻居关系建立的各项参数，建立邻居关系的过程中，会检查这些参数，只有参数匹配，才能正确建立邻居关系。

[OSPF 报头格式](OSPF/hello.png)

`Hello`报文字段含义：
* 网络掩码：表示发送`Hello`报文接口的 IP 地址对应的子网掩码。如果两台路由器是通过以太网接口连接，那么直连的两个接口必须配置相同的网络掩码。如果收到的`Hello`报文中网络掩码字段与自己接口的不同，就忽略这个`Hello`报文，不会建立邻居关系。
* `Hello`间隔：接口周期性发送`Hello`报文的时间间隔，单位是秒。两台路由器要建立邻居关系，需要接口的`Hello`间隔相同，否则邻居关系无法建立。默认情况下，OSPF 路由器在 P2P 或 Broadcast 类型的接口上，`Hello`间隔是 10 秒，在 NBMA 及 P2MP 类型的接口上，`Hello`间隔是 30 秒。
* 选项：这个字段一共 8 比特，每个比特位都表示路由器的某个特性。路由器通过设置相应的「选项」比特位来通告自己支持某种特性或拥有某种能力。
* 路由器优先级：也叫做 DR 优先级，用于 DR 和 BDR 的选举。默认情况下，OSPF 接口的 DR 优先级是 1，这个值也可以通过命令进行修改。
* 路由器失效时间：路由器等待对方发送`Hello`报文的时间，超过这个时间就认为是路由器已离线。路由器建立邻居关系，也需要双方接口的路由器失效时间相同。默认情况下，路由器失效时间是`Hello`间隔的 4 倍。
* 指定路由器：网络中 DR 的`Route-ID`。如果值为`0.0.0.0`，表示没有 DR 或 DR 还未选举出来。
* 备份指定路由器：网络中 BDR 的`Route-ID`。如果值为`0.0.0.0`，表示没有 BDR 或 BDR 还未选举出来。
* 邻居：表示邻居的`Router-ID`，是在直连链路上发现的有效邻居，如果发现多个邻居，就包含多个邻居字段。

#### 修改Hello间隔和路由器失效时间
在华为设备上修改 OSPF 接口的网络类型命令：
```shell
[Huawei]interface g0/0/0
[Huawei-GigabitEthernet0/0/0]ospf timer hello 15
[Huawei-GigabitEthernet0/0/0]ospf timer dead 45
```
### DD 报文
DD 报文用于描述本地 LSDB 的摘要信息，这个报文携带的是 LSDB 中 LSA 的头部数据，并非完整的 LSA 内容。

互为邻居的路由器使用空的 DD 报文来协商主/从（`Master/Slave`），空的 DD 报文不包含任何 LSA 头部信息。`Router-ID`更大的路由器成为`Master`路由器。

`Master/Slave`确定后，双方开始使用 DD 报文描述各自的 LSDB，这时的 DD 报文包含 LSDB 里的 LSA 头部信息。路由器可以使用多个 DD 报文来描述 LSDB，为了确保 DD 报文传输的有序和可靠，`Master`路由器使用“DD Sequence Number（DD 序列号）”字段主导整个 LSDB 交互过程。比如：`Master`路由器发送一个 DD 序列号是 100 的 DD 报文给`Slave`路由器，`Slave`收到这个报文后，才发送自己的 DD 报文，而 DD 序列号也使用 100。`Master`路由器发送下一个 DD 报文（DD 序列号是 101），`Slave`路由器才会发送 DD 报文。这个过程一直持续，直到 LSDB 同步完成。

[DD报文交互流程](OSPF/dd-1.png)

[DD 报文格式](OSPF/dd-2.png)

DD 报文字段含义：
* 接口最大传输单元（`Interface Maximum Transmission Unit`）：接口的 MTU。默认情况下，接口发送的 DD 报文中，无论接口实际的 MTU 值是多少，值都为 0。
* 选项：路由器支持的 OSPF 可选项。
  * I 位（`Initial Bit`）：初始化位，协商`Master/Slave`路由器时，值为 1，`Master/Slave`选举完成后，值为 0。
  * M 位（`More Bit`）：如果值为 1，表示后续还有 DD 报文；如果值为 0，表示这是最后一个 DD 报文。
  * MS 位（`Master Bit`）：`Master`路由器发送的 DD 报文中，值为 1，`Slave`路由器则值为 0。
* DD 序列号：DD 报文的序列号，在 DD 报 文交互过程中，逐次加 1，确保传输的有序和可靠。DD 序列号必须由`Master`路由器决定，而`Slave`路由器只能使用`Master`路由器发送的 DD 序列号来发送自己的 DD 报文。
* LSA 头部：当路由器使用 DD 报文描述自己的 LSDB 时，LSA 头部信息就在这里。一个 DD 报文可能包含一条或多条 LSA 头部信息。

### LSR 报文
在与 OSPF 邻居交换 DD 报文后，路由器就知道了邻居的 LSDB 摘要，向邻居发送 LSR 报文请求所需 LSA 的完整数据。LSR 报文的链路状态类型（`Link-State Type`）、链路状态 ID（`Link-State ID`）、通告路由器（`Advertising Router`）三个字段表示路由器请求的 LSA。如果请求多个 LSA，那么 LSR 可能包含多个三元组。

[LSR 报文格式](OSPF/lsr.png)

* 链路状态类型：表示 LSA 类型。OSPF 有多种 LSA 类型，每种 LSA 描述 OSPF 网络的某个部分，使用不同的类型编号。常见的 LSA 类型值和 LSA 名称是：`1–Router LSA，2–Network LSA，3–Network Summary LSA，4–ASBR Summary LSA，5–AS External LSA`。
* 链路状态标识：LSA 的标识。不同的 LSA 类型，字段的定义不同。
* 通告路由器：生成这条 LSA 的路由器的`Router-ID`。

### LSU 报文
路由器收到邻居发送的 LSR 后，会使用 LSU 报文进行回应，在 LSU 报文中包含请求 LSA 的完整信息，一个 LSU 报文可以包含多个 LSA。另外，当路由器感知到网络发生变化时，也会触发 LSU 报文的泛洪，及时把网络变化通告给其它路由器。在 BMA 网络中，非 DR、BDR 路由器向组播地址`224.0.0.6`发送 LSU 报文，而 DR 和 BDR 会侦听这个组播地址，DR 在接收 LSU 报文后向`224.0.0.5`发送 LSU 报文，从而将更新信息泛洪到整个 OSPF 区域，所有的 OSPF 路由器都会侦听`224.0.0.5`这个组播地址。

[LSU 报文格式](OSPF/lsu.png)

### LSAck 报文
当一台路由器收到邻居发送的 LSU 报文时，为了确认 LSA 已经送达，需要对报文中的 LSA 进行确认，就是回复一个 LSAck 报文。LSAck 报文包含路由器确认的 LSA 头部信息。

[LSAck 报文格式](OSPF/lsack.png)


## 邻居与邻接
运行 OSPF 的路由器之间需要交换链路状态信息和路由信息，在交换这些信息之前路由器之间首先需要建立邻接关系。

* 邻居路由器(`Neighbor`)
  当 OSPF 路由器启动后,便会通过 OSPF 接口向外发送`Hello`报文用于发现邻居。收到`Hello`报文的 OSPF 路由器会检查报文中所定义的一些参数，如果双方一致就会形成邻居关系。
* 邻接(`Adiacency`)
  形成邻居关系的双方不一定都能形成邻接关系，这要根据网络类型而定。只有当双方成功交换 DD 报文并能交换 LSA 之后，才形成真正意义上的邻接关系。路由器在发送 LSA 之前必须先发现邻居并建立邻居关系。当两者的 LSDB 同步完成后，两台路由器形成对网络拓扑的一致认知，并开始独立计算路由。这时，两台路由器形成了邻接关系。

## OSPF邻居状态机变迁
OSPF 是一种链路状态路由协议，邻居设备间交换的是链路状态信息，OSPF 路由也是依据由链路状态路由信息构成的链路状态数据库(LSDB)计算得到的。所以在 OSPF 中，建立设备间的邻居关系，交换彼此的 LSDB 非常重要。而邻居关系建立的过程体现在 OSPF 接口的状态转换过程中。在 OSPF 中，共有 8 种状态机，分别是`Down、Attempt、Init、2-way、ExstartExchange、Loading、Full`。OSPF 邻居关系的建立需要经历多个过程。

[OSPF邻居状态](OSPF/neighbor-status.png)

### 邻居状态建立
#### Down（失效）
OSPF 邻居的初始状态，表示接口没有收到邻居发来的`Hello`报文。
#### Init（初始）
收到邻居发送的`Hello`报文，但是报文内没有自己的`Router-ID`，邻居状态就是`Init`。这个状态表示，直连链路上有一个 OSPF 路由器，但是尚未与邻居建立双向通信关系。接下来，路由器会把对方的`Router-ID`添加到发送的`Hello`报文中。

[Init 状态](OSPF/neighbor-init.png)

#### Attempt（尝试）
只在 NBMA 网络中出现。当路由器的 NBMA 接口启动后，邻居状态从`Down`切换到`Attempt`。这种状态下，路由器周期性的向邻居发送`Hello`报文，但是未收到邻居的有效`Hello`报文。当路由器收到邻居发送的没有自己`Router-ID`的`Hello`报文后，就将邻居状态切换到`Init`。

[attempt 状态](OSPF/neighbor-attempt.png)

#### 2-Way（双向通信）
路由器收到邻居的`Hello`报文，报文里有自己的`Router-ID`时，状态切换成`2-Way`，表示两个路由器形成了可以双向通信的邻居关系，但是没有与邻居建立邻接关系。这是建立邻接关系以前的最高级状态。 如果网络为广播网络或者 BMA 网络则选举 DR/BDR。

[2-way 状态](OSPF/neighbor-2-way.png)

在形成邻居关系过程中，需要对`Hello`报文携带的参数进行协商：
* 如果接收端口的网络类型是广播型，点到多点或者 NBMA，所接收的`Hello`报文中`Network Mask`字段必须和接收端口的网络掩码一致,如果接收端口的网络类型为点到点类型或者是虚连接，则不检查`Network Mask`字段；
* 所接收的`Hello`报文中的`Hello`和`Dead`字段必须和接收端口的配置保持一致；
* 所接收的`Hello`报文中的认证字段需要一致；
* 所接收的`He1lo`报文中的`Options`字段中的`E-bit`(表示是否接收外部路由信息)必须和相关区域的配置保持一致；
* 所接收的`Hello`报文中的区域字段必须一致。

### 邻接状态建立

![邻接状态建立过程](OSPF/adiacency-status-1.png)
![邻接状态建立过程](OSPF/adiacency-status-2.png)

#### ExSart（交换开始）
接下来，RTA 会进入`ExStart`状态，发送空的 DD 报文，用于协商`Master/Slave`，`Router-ID`最大的路由器成为`Master`路由器，DD 报文的序列号由 RTA 自己决定，假设为 X。协商`Master/Slave`的报文是空的、不携带 LSA 头部的 DD 报文，这时报文的 I 位被设置成 1，表示这是第一个 DD 报文，M 位被设置成 1，表示后续还有 DD 报文要发送，MS 位被设置成 1，标识宣告自己为`Master`路由器。

RTB 进入`ExStart`状态后，会向 RTA 发送第一个 DD 报文，DD 报文的序列号由 RTB 自己决定，假设为 Y。报文的 I 位被设置成 1，表示这是第一个 DD 报文，M 位被设置成 1，表示后续还有 DD 报文要发送。由于自己的`Router-ID`比 RTA 大，所以 RTB 应该为`Master`路由器，所以 MS 位被设置成 1。

当`Route-ID`比较结束后，RTA 会产生一个`NegotiationDone`事件，然后 RTA 将状态从`ExStart`变为`Exchange`。
#### Exchange（交换）
接下来，路由器进入`Exchange`状态，向邻居发送描述自己 LSDB 的 DD 报文，DD 报文中包含 LSA 头部。DD 报文逐个发送，每个报文中都有 DD 序列号，DD 序列号由`Master`路由器决定，序列号在 DD 报文的交互过程中递增，确保交互过程的有序性和可靠性。

如果任何一台路由器收到不在其数据库中的有关链路的信息，则该路由器就向其邻居请求有关该链路的完整信息。完整的路由状态信息在`Loading`状态下交换。当邻居状态机变为`Exchange`以后，RTA 发送一个新的 DD 报文，在这个新的报文中包含 LSDB 的摘要信息，序列号设置为 RTB(在第二步里使用的序列号)，More 比特为 0 表示不需要另外的 DD 报文描述 LSDB，Master 比特为 0 表示 RTA 宣告自己为从路由器。收到这样一个报文以后，R2 会产生一个`NegotiationDone`事件，因此 R2 将邻居状态改变为`Exchange`。

当邻居状态变为`Exchange`后，RTB 发送一个新的 DD 报文，该报文中包含 LSDB 的描述信息，DD 序列号设为 Y+1。
即使 RTA 不需要新的 DD 报文描述自己的 LSDB，但是作为从路由器，RTA 需要对主路由器 RTB 发送的每一个 DD 报文进行确认。所以，RTA 向 RTB 发送一个新的 DD 报文，序列号为 Y+1，该报文内容为空。

#### Loading（加载）
路由器发送 LSR 报文向邻居请求对方的路由条目的详细信息，当路由器收到一个 LSR 时，它会用 LSU 进行回应。LSU 中含有确切的 LSA，收到  LSU 的路由器需要使用 LSAck 对发送 LSU 的路由器进行确认。

当邻居状态变为 Loading 后，RTA 开始向 RTB 发送 LSR 报文,请求那些在 Exchange 状态下通过 DD 报文发现的，而且在本地 LSDB 中没有的链路状态信息。RTB 收到 LSR 报文后，向 RTA 发送 LSU 报文，在 LSU 报文中，包含了那些被请求的链路状态的详细信息。RTA 收到 LSU 报文后，将邻居状态从 Loading 改变成 Full。RTA 向 RTB 发送 LSAck报文，确保信息传输的可靠性。LSAck 报文用于泛洪对已接收 LSA 的确认。
#### Full（完全邻接状态）
当接口上需要请求的 LSA 列表为空时，表示路由器已经完成了和邻居的 LSDB 同步，没有再需要请求的 LSA 了，这时邻居的状态就是`Full`。

## DR和BDR选举
如果路由器是在一个 MA 网络，会进行 DR 和 BDR 选举。

DR、BDR 的选举通过`Hello`报文实现，发生在`2-Way`状态之后。`Hello`报文有路由器接口的 DR 优先级，取值范围是`0~255`，默认值为 1，DR 优先级为 0 的接口没有 DR 和 BDR 的选举资格。

在 MA 网络中，`n`台路由器都两两建立邻接关系，那么就有`n(n-1)/2`个邻接关系，会消耗大量的路由器资源，增加网络中 LSA 的泛洪数量。为了优化邻接关系数量，减少不必要的协议流量，OSPF 会在每一个 MA 网络中选举一个 DR（`Designated Router`， 指定路由器）和一个 BDR（`Backup Designated Router`， 备用指定路由器）。

既不是 DR 也不是 BDR 的路由器叫做 DROther，MA 网络中所有 DROther 只和 DR 及 BDR 建立 OSPF 邻接关系，BDR 也和 DR 建立邻接关系，DROther 之间只停留在`2-Way`状态。这样，就有`2(n-2)+1`个邻接关系，数量得到优化。

[](OSPF/dr-bdr.png)

### DR 的主要功能
DR 具有以下主要功能:
* 产生代表本网络的网络路由宣告，这个宣告列出了连到该网络有哪些路由器，其中包括 DR 自己；
* DR 同本网络的所有其他的路由器建立一种星型的邻接关系，这种邻接关系是用来交换各个路由器的链路状态信息，从而同步链路状态信息库。DR 在路由器的链路状态信息库的同步上起到核心的作用。

另一个比较重要的路由器是 BDR。BDR 也和该网络中的其他路由器建立邻接关系。因此，BDR 的设立是为了保证当 DR 发生故障时尽快接替 DR 的工作，而不致于出现由于需要重新选举 DR 和重新构筑拓扑数据库而产生大范围的数据库振荡。在 DR 存在的情况下 BDR 不生成网络链路广播消息。

### DR 和 BDR 的选举原则
1. 在选举期内，优先级高的成为 DR，次高的成为 BDR；
2. 在选举期内，如果优先级一样，`Router-ID`高的成为 DR，次高的成为 BDR；
3. 在选举期外，不存在抢占性，DR 失效以后，BDR 升级成为 DR，重新选举 BDR。Reset OSPF Process(重启OSPF进程)可以重选。

另外必须强调一下，DR 和 BDR 的选举是基于接口的，而不是基于路由器的。当 DR 正常时，BDR 只接收所有信息，转发 LSA 和同步 LSDB 的任务由 DR 完成；当 DR 故障时，BDR自动成为 DR，完成原 DR 的工作，并选举新的 BDR。
### 选举过程
当接口激活 OSPF 后，它会查看网络中是否存在 DR，如果有就使用已经存在的 DR，也就是 DR 不可抢占，否则选择最高优先级的路由器成为 DR，当优先级相等时，选择`Router-ID`最大的路由器成为 DR。之后还会进行 BDR 的选举，选举过程与 DR 类似。

[](OSPF/dr-bdr-2.png)

在一个 MA 网络中，DR 要确保接入到网络中的所有路由器有相同的 LSDB，也就是确保 LSDB 同步。DR 使用组播地址`224.0.0.5`向网络中发送 LSU 报文，所有 OSPF 路由器都会侦听这个组播地址，并与 DR 同步 LSDB。而 DROther 感知到拓扑变化时，向`224.0.0.6`发送 LSU 报文通告这个变化，DR 和 BDR 会侦听这个组播地址。

在 DR、BDR 的选举完成后，该网络内其他路由器向DR、BDR 发送链路状态信息；并经 DR 转发到和 DR建立邻接关系的其他路由器。当链路状态信息交换完毕时，DR 和其他路由器的邻接关系进入了稳定态，区域范围内统一的拓扑(链路状态)数据库也就建立了，每个路由器以该数据库为基础，采用 SPF 算法计算出各个路由器的路由表，这样就可以进行路由转发了。

## OSPF 三张表
OSPF 使用三种表格确保能正常运行。
### 邻居表（Peer Table）
在 OSPF 交互 LSA 之前，两台直连路由器需要建立 OSPF 邻居关系。当一个接口激活 OSPF 后，就会周期性的发送`Hello`报文，同时侦听`Hello`报文从而发现直连链路上的邻居。在接口上发现邻居后，邻居的信息会写入路由器的 OSPF 邻居表，随后一个邻接关系的建立过程也开始了。
```shell
[router]display ospf peer
   OSPF Process 1 with Router ID 1.1.1.1
        Neighbors
Area 0.0.0.0 interface 12.12.12.1(GigabitEthernet0/0/2)'s neighbors
Router ID: 2.2.2.2          Address: 12.12.12.2
State: Full   Mode:Nbr is Master    Priority: 1

Dead timer due in 40 sec
Retrans timer interval: 5
Neighbor is up for 00:22:53
Authentication Sequence: [ 0 ]

[router]
```
### 链路状态数据库（Link-State Database ，LSDB）
OSPF 路由器在网络中泛洪的链路状态信息，叫做 LSA（`Link-State Advertisement`，链路状态通告）。路由器搜集 LSA 并添加到自己的 LSDB 中，路由器通过 LSDB 获取网络的完整信息。OSPF 定义了多种类型的 LSA，这些 LSA 各有用途，最终目的是让路由器知道网络的拓扑结构以及网段信息，并计算出最短路径树，从而发现到达全网各个网段的路由。
```shell
[router] display ospf lsdb
    OSPF Process 1 with Router ID 1.1.1.1
      Link State Database
      
           Area: 0.0.0.0
Type     LinkState ID   AdvRouter  Age  Len  Sequence  Metric
Router   2.2.2.2        2.2.2.2    1273 48   80000006  1
Router   1.1.1.1        1.1.1.1    1336 60   8000000B  1
Network  12.12.12.1     1.1.1.1    1583 32   80000002  0

[router]
```
### OSPF 路由表（Routing Table）
OSPF 根据 LSDB 中的数据，运行 SPF 算法，得到一棵以自己为根、无环的最短路径树，基于这棵树，OSPF 能够发现到达网络中各个网段的最佳路径，从而得到路由信息，并添加到 OSPF 路由表中。当然，这些 OSPF 路由表中的路由最终是否被添加到全局路由器，还需要经过比较路由优先级等过程。
```shell
[router]display ospf routing
    OSPF Process 1 with Router ID 1.1.1.1
         Routing Tables
         
Routing for Network
Destination     Cost Type     NextHop       AdvRouter  Area
12.12.12.0/30   1    Transit  12.12.12.1    1.1.1.1    0.0.0.0
172.16.1.0/24   1    Stub     172.16.1.254  1.1.1.1    0.0.0.0
172.16.2.0/24   1    Stub     172.16.2.254  1.1.1.1    0.0.0.0
172.16.255.2/32 1    Stub     12.12.12.2    2.2.2.2    0.0.0.0

Total Nets: 4
Intra Area: 4 Inter Area: 0 ASE: 0 NSSA: 0

[router]
```

## 路由计算
先评估一台路由器到另一台路由器需要的度量值。OSPF 协议是根据路由器的每一个接口的度量值决定最短路径的。一条路由的开销是指到达目的网络的路径上所有路由器接口的度量值总和。

同步 OSPF 区域内每台路由器的 LSDB，路由器通过交互 LSA 实现 LSDB 的同步。LSA 不但携带了网络连接状况信息，而且携带各接口的`Cost`信息。

由于一条 LSA 是对一台路由器或一个网段拓扑结构的描述，整个 LSDB 就形成了对整个网络的拓扑结构的描述。所有路由器得到一张完全相同的图。

[](OSPF/spf-1.png)

使用 SPF（最短路径优先算法）计算出路由。OSPF 路由器用 SPF 算法以自己为根节点，计算出一棵最短路径树。这棵树上，由根到各个节点的累计开销最小，也就是从根到各个节点的路径都是最优的，这样就获得了由根去往各个节点的路由。计算完成后，路由器将路由加入到 OSPF 路由表。当 SPF 算法发现有两条到达目的网络的路由的`Cost`值相同，会将这两条路由都加入到 OSPF 路由表中，形成等价路由。

[](OSPF/spf-2.png)


## LSA
OSPF 是链路状态协议，路由器彼此之间通过发送 LSA(`LinkState Advertisement`)链路状态通告来交换并保存整个网络的链路状态信息，构建整个网络的拓扑结构，并生成链路状态数据库 LSDB，然后 OSPF 路由器根据自身的 LSDB，利用 SPF(`ShortestPath First`最短路径优先)路由算法独立地计算出到达任意目的地的路由信息。

在 OSPF 网络中，对各 OSPF 路由器根据其用途进行了分类，所以不同类型的 OSPF 路由器所发送的 LSA 的用途和通告的范围各自不同。
### LSA类型

| 类型 | 名称                             | 宣告路由器 | 描述                                               |
|----|--------------------------------|-------|--------------------------------------------------|
| 1  | 路由器LSA<br>Router-LSA           | 所有路由器 | 每台路由器都会生成的LSA，描述了路由器直连接口的状态和Cost值，区域内传播          |
| 2  | 网络LSA<br>Network-LSA           | DR    | 只有DR会生成的LSA，描述MA网络中所有邻接关系的路由器，包括DR本身，区域内传播       |
| 3  | 网络汇总LSA<br>Network-summary-LSA | ABR   | 由ABR生成，描述到达区域内所有网段的路由，区域间传播(除特殊区域外)              |
| 4  | ASBR汇总LSA<br>ASBR-summary-LSA  | ABR   | 由ABR生成，描述ASBR，相当于一条到达LSBR的主机路由，OSPF 域内传播(除特殊区域外) |
| 5  | AS外部LSA<br>AS-extermal-LSA     | ASBR  | 由ASBR生成，描述AS之外的外部路由，OSPF 域内传播(除特殊区域外)            |
| 7  | 非完全末梢区域LSA<br>NSSA LSA         | ASBR  | 由ASBR生成，描述AS之外的外部路由，仅在 NSSA 区域内传播                |

还有一些类型的 LSA 很少使用：
* 第六类 LSA：在 MOSPF 协议中使用的组播 LSA。
* 第八类 LSA：在 OSPF 域内传播 BGP 属性时使用的外部属性 LSA。
* 第九类 LSA：本地链路范围的透明 LSA。
* 第十类 LSA：区域范围内的透明 LSA。
* 第十一类 LSA：AS 范围内的透明 LSA。

### LSA头部
除`Hello`报文外，其他的 OSPF 报文都携带 LSA 头部信息。虽然 LSA 有多种类型，但是这些 LSA 使用相同的 LSA 头部。

[LSA 头部报文位置](OSPF/lsa-header-1.png)

LSA 头部一共 20 字节。

[LSA 头部信息](OSPF/lsa-header-2.png)

LSA 头部信息字段含义：
* 链路状态老化时间（`Link-State Age`）：表示 LSA 的老化时间，也就是说，LSA 存在了多长时间，单位是秒。路由器生成 LSA 时，这个值为 0，随着 LSA 在网络中传输，老化时间逐渐累加。当 LSA 存储到路由器的 LSDB 后，LSA 的老化时间也在递增，当到达`MaxAge`（最大老化时间）时，这个 LSA 不在用于路由计算。
* 可选项(`Options`)：每一比特位对应 OSPF 的某种特性。
* 链路状态类型(`Link-State Type`)：表示 LSA 的类型。OSPF 有多种类型的 LSA，每个 LSA 类型都由对应的类型编号。
* 链路状态 ID(`Link-State ID`)：LSA 的标识。不同的 LSA 类型，字段的含义不同。
* 通告路由器(`Advertising Router`)：生成这条 LSA 的路由器的`Router-ID`。
* 链路状态序列号(`Link-State Sequence Number`)：表示这个 LSA 的序列号，用于判断 LSA 的新旧或重复。
* 链路状态校验和(`Link-State Checksum`)：关于 LSA 的全部信息的校验和。因为`Age`字段，所以校验和会随着老化时间的增大而每次都需要重新进行计算。
* 长度(`Length`)：是一个包含 LSA 头部在内的 LSA 的长度。

每个 LSA 头部的 链路状态类型 、链路状态 ID、通告路由器这三个字段唯一标识一个 LSA。如果出现三个字段都相同的多条 LSA，还可以根据链路状态老化时间、链路状态序列号、校验和字段来判断 LSA 的新旧。
### LSA 详解
[LSA](OSPF/lsa-detail.png)

图中网络部署了 OSPF，R1、R2、R3 都连接在一台二层交换机上，三台路由器的 G0/0 接口都激活了 OSPF，并且都属于`Area0`。通过设置，R3 的 G0/0 接口成为 DR。R1 的 G0/1 连接的网段和 R2 的 G0/1 连接网段也激活了 OSPF，也属于`Area0`。R3 和 R4 使用 Serial1/0 接口连接，接口采用 PPP 封装，激活了 OSPF，且属于`Area1`。R4 还连接着外部网络，连接的接口没激活 OSPF，并将外部路由引入到了 OSPF 域。R1 的`Router-ID`是`1.1.1.1`，R2 的`Router-ID`是`2.2.2.2`，R3 的`Router-ID`是`3.3.3.3`，R4 的`Router-ID`是`4.4.4.4`。

每种 LSA 都有各自的功能，
* Type-1 LSA（Router LSA，路由器 LSA）和 Type-2 LSA（Network LSA，网络 LSA）是描述的区域内的网络拓扑和 IP 网段信息，只能在区域内泛洪。有了这两种 LSA，区域内的路由器就可以计算出区域内各个网段的路由，这些路由叫做区域内部路由。
* Type-3 LSA（Network Summary LSA，网络汇总 LSA）用于描述一个区域内的路由信息，并在其它区域内传递。也就是说，这种 LSA 用来告诉其它区域到达生成 LSA 这个区域的路由，这些路由叫做区域间路由。
* Type-4 LSA（ASBR Summary LSA，ASBR 汇总 LSA），用于描述 ASBR 的`Router-ID`。它不会主动生成，触发条件是 ABR 收到一个 Type-5 LSA，目的是让区域内的路由器知道如何到达 ASBR。
* Type-5 LSA（AS External LSA，AS 外部 LSA）用来描述 OSPF 域外的路由，它一旦生成，会在整个 OSPF 域内扩散。OSPF 域外的路由信息来源，通常是静态路由或其它路由协议的路由。

#### Type-1 LSA
每一台运行 OSPF 的路由器都会生成 Type-1 LSA，这个 LSA 描述了路由器的直连接口状态和接口`Cost`，同一个区域的接口共用一个 Type-1 LSA 描述。当路由器的多个接口属于不同区域，就分别为每个区域单独生成一个 Type-1 LSA，LSA 只描述各种区域的接口信息。

[Type-1 LSA](OSPF/type-1-lsa-1.png)

在 Type-1 LSA 中，LSA 头部的链路状态类型字段值为 1，链路状态 ID 字段值是生成 Type-1 LSA 的路由器的`Router-ID`。

V 位（`Virtual Link Endpoint Bit`）：如果值为 1，表示路由器是 Virtual Link 的端点。

E 位（`External Bit`）：如果值为 1，表示路由器是 ASBR。

B 位（`Border Bit`）：如果值为 1，表示路由器是两个区域的边界路由器。一个路由器连接两个或两个以上的区域，生成的 Type-1 LSA 的 B 位值为 1。

链路数量（`Links Number`）：表示 Type-1 LSA 的 Link 数量。Link 是描述直连接口的，每条 Link 都包含链路类型、链路 ID、链路数量、度量值这些关键信息。路由器可能会使用一个或者多个 Link 来描述某个接口。

链路类型（`Link Type`）：表示 Link 的类型。OSPF 中有多种网络类型：P2P、P2MP、Broadcast、NBMA，可以根据接口的协议来判断接口的网络类型。链路类型不同，对应的链路 ID、链路数据也不同。注意：链路类型和网络类型是不同的概念。

| 链路类型 | 描述           | 链路ID         | 链路数据             |
|------|--------------|--------------|------------------|
| 1    | 点对点连接到另一台路由器 | 邻居的Router-ID | 生成LSA的路由器的接口IP地址 |
| 2    | 连接到一个传输网络    | DR的接口IP地址    | 生成LSA的路由器的接口IP地址 |
| 3    | 连接到一个传输网络    | 网络IP地址       | 网络掩码             |
| 4    | 虚链路          | 邻居的Router-ID | 生成LSA的路由器的接口IP地址 |

链路 ID（`Link ID`）：Link 的标识，不同的链路类型，链路 ID 的定义也不同。

链路数据（`Link Data`）：不同的链路类型，对链路数据的定义也是不同的。

度量值（`Metric`）：Cost 值。由于 TOS 和 TOS 度量值在 RFC2328 中不再支持，保留仅仅只是为了兼容早期的 OSPF 版本，可以忽略和 TOS 相关的字段。

[](OSPF/type-1-lsa-2.png)

以 R1 为例，G0/0 和 G0/1 都激活了 OSPF，都接入了`Area0`，因此路由器会生成一个 Type-1 LSA，描述两个接口的状况，并在`Area0`内泛洪。R1 的 G0/1 是一个以太网接口，且没有建立 OSPF 邻接关系，这个接口的 Link 内容是：链路类型 = 3，表示连接到一个末梢网络；链路 ID = 192.168.1.0，是接口 IP 地址的网络地址；链路数据 = 255.255.255.0，是接口的网络掩码；度量值 = 1，是接口的 Cost 值。R1 的 G0/0 和 R3 建立了邻接关系，接口的关键信息是：链路类型 = 2，表示连接到一个传输网络；链接 ID = 192.168.123.3，是 DR 的接口 IP 地址，也就是 R3 的接口 IP 地址；链路数据 = 192.168.123.1，是自己接口的 IP 地址；度量值 = 1。R1 生成的这个 Type-1 LSA 包含两个 Link，在整个 Area0 内泛洪。

[](OSPF/type-1-lsa-3.png)

R3 的情况比较特殊，两个接口分别连接两个区域，G0/0 连接的 Area0 ，Serial1/0 连接的 Area1 ，显然是一台 ABR 。R3 会生成两个 Type-1 LSA ，一个在 Area0 内泛洪，描述的是 G0/0 接口信息，包含一个描述 G0/0 接口的 Link ，链路类型 = 2 ，表示连接到一个传输网络；链路 ID = 192.168.123.3 ；链路数据 = 192.168.123.3 ，度量值 = 1 。R3 生成的另一个 Type-1 LSA ，在 Area1 内泛洪，描述的是接口 Serial1/0 。Serial1/0 接口的网络类型是 P2P ，描述这种类型的接口时，OSPF 可能会使用多条 Link 。R3 的 Serial1/0 ，这个 P2P 接口有一个 Full 的邻居，这样会使用两个 Link 来描述这个接口和邻居关系。其中一个 Link 的链接类型 = 1 ，表示点对点连接到另一个路由器；链路 ID = 4.4.4.4 ，是这个邻居的 Router-ID ，也就是 R4 的 Router-ID ；链路数据 = 192.168.34.3 ，是自己接口的 IP 地址；度量值 = 48 。另一个 Link 的链路类型 = 3 ，表示接入一个末梢网络；链路 ID = 192.168.34.0 ；链路数据 = 255.255.255.0 ；度量值 = 48 。为什么要两个 Link 来描述一个接口？Type-1 LSA 的主要用途是帮助其它路由器绘制出网络拓扑和发现网段信息。这两个 Link 中，前一个是用于绘制拓扑，后一个是描述这段链路的网段信息。

Type-1 LSA 在处理 Loopback 接口时，无论接口的掩码地址是多少位，描述的掩码都是 32 位的。描述接口时，链路类型为 3 ，接入一个末梢网络，链路 ID 是接口的 IP 地址，链路数据全是 F ，表示掩码是 255.255.255.255 ，会计算出一条 32 位的主机路由。要想把路由的掩码恢复成 Loopback 接口的真实掩码，可以把 Loopback 接口的网络类型修改为 Broadcast 或 NBMA 。

