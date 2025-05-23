


常见的 ARP 攻击方式：
* ARP 泛洪攻击：也叫 DoS（Denial of Service，拒绝服务）攻击，主要采用以下两种攻击方式：
  * 攻击者通过伪造大量源 IP 地址变化的 ARP 报文(以广播方式发送)，使得设备 ARP 映射表缓存资源被无效的 ARP 表项耗尽(因为设备在接收到 ARP 报文后会提取报文中的源 IP 地址和源 MAC 地址，如果设备上没有对应的 ARP 映射表项就会生成新的 ARP 映射表项)，造成合法用户的 ARP 报文不能继续生成 ARP 表项，最终导致正常用户的通信被中断。
  * 攻击者利用工具扫描本网段主机或者进行跨网段扫描时，会向设备发送大量目的 IP 地址不能解析的 IP 报文，导致设备触发大量 ARP Miss(ARP表项丢失) 消息，生成并下发大量临时 ARP 表项,然后还会广播大量 ARP 请求报文以对目的 IP 地址进行解析，从而造成 CPU 负荷过重，直到瘫痪。
* ARP 欺骗攻击：攻击者通过发送伪造的 ARP 报文(可以是伪造的免费 AR P报文，也可以是伪造的 ARP 请求报文或 ARP 应答报文)，非法修改设备或网络内其他用户主机的 ARP 表项，造成用户或网络的报文通信异常。

针对 ARP 泛洪攻击，可采取的防御措施：
* ARP 报文限速：通过限制接口接收 ARP 报文的速率(可以基于 ARP 报文中的源 IP 地址或源 MAC 地址进行 ARP 报文限速，也可基于全局、VLAN 或者接口进行 ARP 报文限速配置)，可以防止设备因处理大量 ARP 报文而导致 CPU 负荷过重而无法处理其他业务的现象发生。
* ARP 报文源抑制：配置 ARP 报文源(指 ARP 报文中的源 IP 地址或源 MAC 地址)抑制功能后，可使当设备在一段时间内收到某一源 IP 地址或者源 MAC 的 ARP 报文数目超过设定阈值时，不再处理超出闯值部分的 ARP 请求报文，可以防止设置因处理大量某一源 IP 地址或者源 MAC 的 ARP 报文而致 CPU 负荷过重而无法处理其他业务的现象发生。
* ARP Miss 消息限速：通过对发送 ARP Miss 消息进行限速，可以防止设备因收到大量目的 IP 不能解析的 IP 报文而短时间内触发大量 ARP Miss 消息导致 CPU 负荷过重而无法处理其他业务的现象发生。
* ARP Miss 消息源抑制：配置 ARP Miss 消息源(仅指 ARP Miss消息中的源 IP 地址)抑制功能后，如果一个源 IP 地址在一定时间内不断触发 ARP Miss 消息，当其速率超过了设定的阈值后，设备就认为此 IP 地址在进行攻击。此时，对于前 16 个攻击源，设备将下发 ACL 规则，在后续的一段时间内把这个地址发出的 IP 报文丢弃；对于之后的攻击源，设备使用设定的闽值对 IP 报文进行抑制。这样可以防止设备因收到某个源 IP 发送的大量目的 IP 不能解析的 IP 报文，触发大量 ARP Miss 消息，导致 CPU 负荷过重而无法处理其他业务的现象发生。
* 免费 ARP 报文主动丢弃：免费 ARP 报文是指源 IP 地址和目的 IP 地址均为发送设备 IP 地址的 ARP 报文，主要用来通知其他设备更新针对自己的 ARP 表项。使能免费 ARP 报文主动丢弃功能后，设备直接丢弃免费 ARP 报文，可以防止设备因处理大量免费 ARP 报文，导致 CPU 负荷过重而无法处理其他业务的现象发生。
* ARP 表项严格学习：使能 ARP 表项严格学习功能后，只有本设备主动发送的 ARP 请求报文的应答报文才能触发本设备学习 ARP，其他设备主动向本设备发送的 ARP 报文不能触发本设备学习 ARP。这可以防止设备的缓存空间被无效的 ARP 表项占满。
* ARP 表项限制：使能 ARP 表项限制功能后，设备接口只能学习到设定的最大动态 ARP 表项数目，这样可以防止当一个接口所接入的某一台用户主机发起 ARP 攻击时整个设备的 ARP 表资源都被耗尽。

针对 ARP 欺骗攻击，可采取的防御措施：
* ARP 表项固化：使能 ARP 表项固化功能后，设备在第一次学习到 ARP 表项后不再允许用户更新此 ARP 表项，或只能更新此 ARP 表项的部分信息，或者需要通过发送 ARP 请求报文的方式进行确认，以防止攻击者伪造 ARP 报文修改正常用户的 ARP 表项内容。设备提供三种模式防御 ARP 地址欺骗攻击：`fixed-all`模式、`fixed-mac`模式和`send-ack`模式。
* 动态 ARP 检测：使能动态 ARP 检测(`DynamicARPInspection，DAI`)功能后，当设备收到 ARP 报文时，将此 ARP 报文的源 IP 地址、源 MAC 地址、收到 ARP 报文的接口及 VLAN 信息和 DHCP Snooping 绑定表的信息进行比较，如果信息匹配则认为是合法用户，允许此用户的 ARP 报文通过，否则认为是攻击，丢弃该 ARP 报文。本功能仅适用于 DHCP Snooping 场景。
* ARP 防网关冲突：通过 ARP 防网关冲突功能，可以防止用户仿冒网关发送 ARP 报文，非法修改网络内其他用户的 ARP 表项。
* 免费 ARP 报文主动丢弃：使能免费 ARP 报文主动丢弃功能后，设备直接丢弃免费 ARP 报文，可以防止非法修改网关或用户主机的 ARP 表项。
* 发送免费 ARP 报文：使能发送免费 ARP 报文功能后，网关设备主动向用户发送以自己 IP 地址为目的 IP 地址的 ARP 请求报文，定时更新用户 ARP 表项的网关 MAC 地址，防止用户的报文不能正常地转发到网关或者被恶意攻击者窃听。
* ARP 报文内 MAC 地址一致性检查：通过 ARP 报文内 MAC 地址一致性检查功能，可以防止以太网数据帧头部中的源/目的 MAC 地址和 ARP 报文数据区中的源/目的 MAC 地址不一致的 ARP 欺骗攻击。
* ARP 报文合法性检查：使能 ARP 报文合法性检查功能后，设备会对 MAC 地址和 IP 地址不合法的报文进行过滤。设备提供 3 种检查模式：源 MAC 地址、目的 MAC 地址和 IP 地址检查模式。
* ARP 表项严格学习：使能 ARP 表项严格学习功能后，只有本设备主动发送的 ARP 请求报文的应答报文才能触发本设备学习 ARP，其他设备主动向本设备发送的 ARP 报文不能触发本设备学习 ARP 这可以防止设备因收到伪造的 ARP 报文，错误地更新 ARP 表项，导致合法用户的通信流量发生中断。
* DHCP 触发 ARP 学习：使能 DHCP 触发 ARP 学习功能后，设备根据收到的 DHCPACK 报文直接生成 ARP 表项。当 DHCP 用户数目很大时，可以避免大规模 ARP 表项的学习和老化对设备性能和网络环境形成的冲击此时设备上还可同时部署动态 ARP 检测功能，防止 DHCP 用户的 ARP 表项被伪造的 ARP 报文恶意修改。

## 配置防 ARP 泛洪攻击
ARP 泛洪攻击的基本思想就是发送大量的 ARP 报文，一方面可以使设备中用于缓存 ARP 表的内存资源被无效 ARP 表项耗尽，另一方面可能会使设备的 CPU 负荷过重造成用户无法正常通信。

攻击者可能用来进行 ARP 泛洪攻击的报文包括 ARP 请求应答报文、ARP Miss 消息、免费 ARP 报文。

### 配置基于源 MAC 地址的 ARP 报文限速
设备处理大量源 MAC 地址相对固定的 ARP 报文会造成 CPU 繁忙，并且如果 ARP 报文的源 IP 地址同时不断变化，还会导致设备的 ARP 表资源被耗尽。为了避免此问题可以配置设备根据源 MAC 地址进行 ARP 报文限速。设备会对上送 CPU 的 ARP 报文根据源 MAC 地址进行统计，如果在 1s 内收到的同一个源 MAC 地址的 ARP 报文超过设定阈值(ARP 报文限速值)，设备则丢弃超出阈值部分的 ARP 报文。
```shell
# 针对所有源 MAC 地址的 ARP 报文源抑制速率
# 单位是 pps（每秒多少个报文）
arp speed-limit source-mac maximum 100
# 针对指定源 MAC 地址的 ARP 报文源抑制速率
# MAC 地址格式为 H-H-H，H 为 4位 16进制数
arp speed-limit source-mac 0-0-1 maximum 50
# 缺省情况下，所有 MAC 地址的 ARP 报文源抑制速率为 0pps，即不对 ARP 报文进行源抑制
```
### 配置基于源 IP 地址的 ARP 报文限速
设备处理大量源 IP 地址相对固定的 ARP 报文，会造成 CPU 繁忙，影响到正常业务的处理。为了避免此问题，可以配置设备根据源 IP 地址进行 ARP 报文限速。设备会对上送 CPU 的 ARP 报文根据源 IP 地址进行统计，如果在 1s 内收到的同一个源 IP 地址的 ARP 报文超过设定阈值，则丢弃超出阈值部分的 ARP 报文。
```shell
arp speed-limit source-ip maximum 100
arp speed-limit source-ip 192.168.10.1 maximum 50
```
### 配置基于全局、VLAN 或接口的 ARP 报文限速
在 ARP 泛洪攻击的报文中，如果源 MAC 地址，或者源 IP 地址都不是相对固定的情况下，可以在全局、VLAN 或接口下配置针对所有 ARP 报文的限速和限速时间。在 ARP 报文限速时间内，如果收到的所有 ARP 报文数目超过 ARP 报文限速值，设备会丢弃超出限速值的 ARP 报文。
1. 全局的 ARP 报文限速：在设备出现 ARP 攻击时，需要限制全局处理的 ARP 报文数量(是指设备各个接口上接收到的 ARP 报文的总数)。
2. VLAN 的 ARP 报文限速：在某个 VLAN 内的所有接口出现 ARP 攻击时，可以仅限制处理收到的该 VLAN 内的 ARP 报文数量，配置本功能可以保证不影响其他 VLAN 内所有接口的 ARP 学习。
3. 接口的 ARP 报文限速：在某个接口出现 ARP 攻击时，可以仅限制处理该接口(可以是各种以太网接口，也可以是`Eth-Trunk`接口，还可以是端口组)收到的 ARP 报文数量，配置本功能可以保证不影响其他接口的 ARP 学习。

当同时在全局、VLAN 或接口下配置 ARP 报文的限速值和限速时间时，设备会先按照接口进行限速，再按照 VLAN 进行限速，最后按照全局进行限速。当设备丢弃的 ARP 报文数量较多时，如果希望设备能够以告警的方式提醒网络管理员，则还可以使能 ARP 报文限速丢弃告警功能。当丢弃的 ARP 报文数超过告警值时，设备将产生告警。
```shell
# 在全局、VLAN、接口下使能 ARP 报文限速功能
[Huawei]arp anti-attack rate-limit enable
[Huawei-Vlanif10]arp anti-attack rate-limit enable
[Huawei-GigabitEthernet0/0/1]arp anti-attack rate-limit enable

# 基于全局或VLAN配置时
# packet-number 表示 ARP 报文的限速值，即限速时间内允许通过的 ARP 报文的个数，默认 100，取值：1~16384
# interval-value，可选，指定 ARP报文的限速时间，默认 1s，取值 1~86400
arp anti-attack rate-limit packet-number [interval-value]
[Huawei]arp anti-attack rate-limit 200 20
[Huawei-Vlanif10]arp anti-attack rate-limit 200 20

# 基于接口配置时
# block timer timer指定持续丢弃超过ARP报文限速值的接口下收到的所有ARP报文的时长，默认1s，取值 1~86400
arp anti-attack rate-limit packet-number [interval-value | block timer timer]
[Huawei-GigabitEthernet0/0/1]arp anti-attack rate-limit 200 20 block timer 60

# (可选) 使能 ARP 报文限速丢弃告警功能
[Huawei]arp anti-attack rate-limit alarm enable
[Huawei-Vlanif10]arp anti-attack rate-limit alarm enable
[Huawei-GigabitEthernet0/0/1]arp anti-attack rate-limit alarm enable

# (可选) 配置 ARP 报文限速丢弃告警阈值，默认 100，取值 1~16384
[Huawei]arp anti-attack rate-limit alarm threshold 200
[Huawei-Vlanif10]arp anti-attack rate-limit alarm threshold 200
[Huawei-GigabitEthernet0/0/1]arp anti-attack rate-limit alarm threshold 200
```
### 配置 ARP Miss 消息源抑制
### 配置全局、VLAN和接口的 ARP Miss 消息限速
### 配置临时 ARP 表项的老化时间
### 配置 ARP 表项严格学习
### 配置基于接口的 ARP 表项限制
为了防止当一个接口(可以是二层物理接口、Eth-Trunk 接口、VLANIF 接口、三层物理子接口和端口组)所接入的某一用户主机发起 ARP 攻击时导致整个设备的 ARP 表资源被耗尽，可以在指定接口下配置接口能够学习到的最大动态 ARP 表项数目。当指定接口下的动态 ARP 表项达到允许学习的最大数目后，将不允许新增动态 ARP 表项。
### 配置免费 ARP 报文主动丢弃

















## 配置 ARP 防欺骗攻击
ARP 表项攻击、网关攻击、中间人攻击是 ARP 欺骗攻击的主要应用场景。

### 配置 ARP 表项固化
为了防止 ARP 地址欺骗攻击，可以配置 ARP 表项固化功能，使欺骗类 ARP 报文不能修改原来 ARP 表项。

有 3 种 ARP 表项固化模式：
1. `fixed-mac`方式：以报文中源 MAC 地址与 ARP 表中现有对应 IP 地址的表项中的 MAC 地址是否匹配为审查的关键依据。当这两个 MAC 地址不匹配时，则直接丢弃该 ARP 报文；如果这两个 MAC 地址是匹配的，但是报文中的接口或 VLAN 信息与 ARP 表中对应表项不匹配时，则可以更新对应 ARP 表项中的接口和 VLAN 信息。这种模式适用于静态配置 IP 地址，但网络存在冗余链路(这样可以改变出接口和 VLAN)的情况。当链路切换时，ARP 表项中的接口信息可以快速改变。
2. `fixed-all`方式：仅当 ARP 报文对应的 MAC 地址、接口、VLAN 信息和 ARP 表中对应表项的信息完全匹配时，设备才可以更新 ARP 表项的其他内容。这种模式匹配最严格，适用于静态配置 IP 地址，网络没有冗余链路(这样不可以改变出接口和 VLAN)，且同一 IP 地址用户不会从不同接口接入的情况。
3. `send-ack`方式：这种模式是当设备收到一个涉及 MAC 地址、VLAN、接口修改的 ARP 报文时，不会立即更新 ARP 表项，而是先向待更新的 ARP 表项现有 MAC 地址对应的用户发送一个单播的 ARP 请求报文，再根据用户的确认结果决定是否更新 ARP 表项中的 MAC 地址、VLAN 和接口信息。此方式适用于动态分配 IP 地址，有余链路的网络。
   
可在全局和 VLANIF 接口下配置 ARP 表项固化功能，全局配置该功能后，缺省设备上所有接口的 ARP 表项固化功能均已使能。当全局和 VLANIF 接口下同时配置了该功能时，VLANIF 接口下的配置优先生效。
```shell
# 在全局或 VLANIF 接口下配置 ARP 表项固化功能
arp anti-attack entry-check { fixed-mac|fixed-all|send-ack }
[Huawei]arp anti-attack entry-check fixed-mac
[Huawei-Vlanif10]arp anti-attack entry-check fixed-mac

[Huawei]arp anti-attack entry-check fixed-all enable
[Huawei-Vlanif10]arp anti-attack entry-check fixed-all enable
```
### 配置动态 ARP 检测
为了防御中间人攻击，避免合法用户的数据被中间人窃取，可以使能动态 ARP 检测功能，仅适用于启用了 DHCP Snooping 的场景。这样，设备会将 ARP 报文中的源 IP、源 MAC、接口、VLAN 信息和 DHCP Snooping 中的绑定表(或者手动添加静态绑定表)信息进行比较，如果匹配，说明发送该 ARP 报文的用户是合法用户，允许此用户的 ARP 报文通过，否则就认为是攻击，丢弃该 ARP 报文。
:::info
设备使能 DHCP Snooping 功能后，当 DHCP 用户上线时设备会自动生成 DHCP Snooping 绑定表；对于静态配置 IP 地址的用户，设备不会生成 DHCP Snooping 绑定表所以需要手动添加静态绑定表。可用u`ser-bind static {ip-address start-ip[to end-ip&<]-10>| mac-address mac-address } * [interface interface-type interface-number ][ vlan vlan-id[ce-vlan ce-vlan-id]]`命令配置 IP 地址、MAC 地址、接口和内/外层 VLAN 的静态用户绑定表项。
:::
如果希望仅匹配绑定表中某一项或某两项内容的特殊 ARP报文也能够通过,则可以配置对 ARP 报文进行绑定表匹配检查时只检查某一项或某两项内容。如果希望设备在丢弃的不匹配绑定表的 ARP 报文数量较多时能够以告警的方式提醒网络管理员,则还可以使能动态 ARP 检测丢弃报文告警功能。这样，当丢弃的ARP报文数超过告警值时设备将产生告警。

可在接口(包括物理接口、Eth-Trunk 接口、VLANIF 接口和端口组)视图或 VLAN 视图下配置动态 ARP 检测功能。在接口视图下使能时，则对该接口收到的所有 ARP 报文进行绑定表匹配检查：在 VLAN 视图下使能时，则对加入该 VLAN 的接口收到的属于该 VLAN 的 ARP 报文进行绑定表匹配检查。




### 配置 ARP 防网关冲突
### 配置发送 ARP 免费报文
### 配置 ARP 报文内 MAC 地址一致性检查
### 配置 ARP 报文合法性检查
### 配置 DHCP 触发 ARP 学习
在 DHCP 用户场景下，当 DHCP 用户数目很多时，设备进行大规模 ARP 表项的学习和老化会对设备性能和网络环境形成冲击。为了避免此问题，可以在网关设备上使能 DHCP 触发 ARP 学习功能。当 DHCP 服务器给用户分配了正地址，网关设备会根据 VLANIF 接口上收到的 DHCPACK(确认) 报文直接生成该用户的 ARP 表项。但 DHCP 触发 ARP 学习功能生效的前提是已在网关设备上通过`dhcp snooping enable`命令使能了 DHCP Snooping 功能。
:::info
在 VRRP 和 DHCP Relay 组合场景下，VRRP 主备设备上都不能再配置命令`dhcp snooping enable`和`arp learning dhcp-trigger`。网关设备上还可同时部署动态 ARP 检测功能，防止 DHCP 用户的 ARP 表项被伪造的 ARP 报文恶意修改。
:::
DHCP 触发 ARP 学习的配置方法也很简单，就是在对应的 VLANIF 接口视图下执行`arp learning dhcp-trigger`命令使能 DHCP 触发 ARP 学习功能。缺省情况下，没有使能 DHCP 触发 ARP 学习功能。