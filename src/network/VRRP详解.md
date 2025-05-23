---
title: VRRP 详解
date: 2025-05-30
tags: network
categories: 计算机网络
order: 31
---

## VRRP
VRRP(`Virtual Router Redundancy Protocol`，虚拟路由冗余协议) 是一种容错协议，可通过把几台路由设备联合组成一台虚拟的路由设备，然后使用一定的机制保证在下一跳路由设备出现故障时上一跳设备及时将业务切换到备份路由设备，从而保持通信的连续性和可靠性。

VRRP 将多个路由设备组成一台虚拟路由设备，并在其中指定一台成员路由设备作为主用(`Master`)设备，其他成员设备作为备用(`Backup`)设备，然后为这台虚拟路由器分配一个 IP 地址，作为下游设备的默认网关，当现有网关设备发生故障时，VRRP 机制能够选举新的网关设备承担数据流量，这样就可防止单点故障问题，实现路由设备容错，为上、下游设备保持持续的连通服务。

VRRP 除了最基本的主备备份功能外，还可通过配置多个虚拟备份组，指定不同设备担当主用设备，实现多路由设备之间的负载分担；还可与各种其他对象一起联动，实现更加强大的监视功能。

### VRRP术语
* VRRP 路由器：运行 VRRP 的设备，可以是路由器也可以是三层交换机。一台 VRRP 路由器（的接口）可以同时参与到多个 VRRP 组中，在不同的组中，一台 VRRP 路由器可以充当不同的角色。
* VRRP 组：一个 VRRP 组由多个 VRRP 路由器组成，属于同一 VRRP 组的 VRRP 路由器互相交换信息，每一个 VRRP 组中只能有一个`Master`。同属一个 VRRP 组的路由器（的接口）使用相同的 VRID。同属一个 VRRP 组的路由器之间交互 VRRP 报文，这些路由器必须处于相同的广播域中。
* VRID：虚拟路由器标识，用来唯一标识一个 VRRP 备份组。
* 虚拟路由器：对于每一个 VRRP 组，抽象出来的一个逻辑路由器，该路由器充当网络用户的网关，该路由器并非真实存在，事实上对于用户而言，只需知道虚拟路由器的 IP 地址，至于虚拟路由器的角色由谁来承担、数据转发任务由谁来承担、`Master`挂掉之后谁来接替，这是 VRRP 的工作。
* 虚拟 IP 地址、虚拟 MAC 地址：虚拟 IP 地址是虚拟路由器的 IP 地址，该地址一般就是用户的网关地址。与虚拟 IP 地址对应的 MAC 地址也是虚拟的，该 MAC 地址由固定比特位加上 VRID 构成，当 PC 发送 ARP 报文去请求虚拟 IP 地址对应的 MAC 地址时，`Master`路由器响应这个 ARP 请求并告知虚拟 MAC 地址。
* `Master`路由器、`Backup`路由器：`Master`路由器就是在 VRRP 组中的主路由器，它是实际转发业务数据包的路由器，在每一个 VRRP 组中，仅有`Master`才会响应对虚拟 IP 地址的 ARP 请求，也只有`Master`才会转发业务数据。
  `Master`路由器以一定的时间间隔发送 VRRP 报文，以便通知`Backup`路由器自己的存活。
  `Backup`路由器是在 VRRP 组中备份状态的路由器，一旦`Master`路由器出现故障，`Backup`路由器就开始接替工作。
* 优先级：用来标识虚拟路由器中各成员路由设备的优先级。虚拟路由器根据优先级选举出`Master`设备和`Backup`设备。优先级越大越优先，默认为 100，如果优先级相等则比接口 IP 地址（IP 地址最大的胜出）。
* 抢占模式：在抢占模式下，如果`Backup`设备的优先级比当前`Master`设备的优先级高，则主动将自己切换成`Master`。
* 非抢占模式：在非抢占模式下，只要`Master`设备没有出现故障，`Backup`设备即使随后被配置了更高的优先级也不会成为`Master`设备。

![](VRRP详解/vrrp-3.png)

通过 VRRP 形成的虚拟路由器使用虚拟 IP 地址和虚拟 MAC 与网络中的 PC 进行通信。虚拟 MAC 地址的格式如上图所示，其中 MAC 地址的最后 1 个字节填充 VRID，例如 VRID 是 1，虚拟MAC地址为`00-00-5E-00-01-01`。
## VRRP优点
* 简化网络管理：VRRP 能在当前网关设备出现故障时仍然提供高可靠的缺省链路，且无需修改动态路由协议、路由发现协议等配置信息，可有效避免单一链路发生故障后的网络中断问题。
* 适应性强：VRRP 报文封装在 IP 报文中，支持各种上层协议。
* 网络开销小：VRRP 只定义了一种报文，即 VRRP 协议报文，有效减轻了网络设备的额外负担。

## VRRP配置实例
### VRRP主备备份配置
#### 实验拓扑
![](VRRP详解/vrrp-12.png)
#### 实验要求
* 正常情况下，PC 以 R1 作为默认网关接入 Internet，当 R1 故障时，R2 接替作为网关，R1 故障恢复后，可以在 20s 内重新成为网关。
* R1、R2、R3 采用 OSPF 协议进行互连。
* R1、R2 上配置 VRRP 备份组，R1 配置较高优先级和 20s 抢占延时，作为`Master`设备承担流量转发，R2 配置较低优先级，作为备用路由器，实现网关冗余备份。

#### 实验步骤
1. 配置各设备接口 IP 地址。（省略）
2. R1、R2、R3 配置 OSPF
```shell
[R1]ospf 1
[R1-ospf-1]area 0
[R1-ospf-1-area-0.0.0.0]network 10.1.1.0 0.0.0.255
[R1-ospf-1-area-0.0.0.0]network 192.168.1.0 0.0.0.255 
```
```shell
[R2]ospf 1
[R2-ospf-1]area 0
[R2-ospf-1-area-0.0.0.0]network 10.1.1.0 0.0.0.255
[R2-ospf-1-area-0.0.0.0]network 192.168.2.0 0.0.0.255
```
```shell
[R3]ospf 1
[R3-ospf-1]area 0
[R3-ospf-1-area-0.0.0.0]network 192.168.1.0 0.0.0.255
[R3-ospf-1-area-0.0.0.0]network 192.168.2.0 0.0.0.255
[R3-ospf-1-area-0.0.0.0]network 20.1.1.0 0.0.0.255
```
3. 配置 VRRP
在 R1 上创建 VRRP 备份组 1，配置虚拟路由器 IP 地址，必须与对应的 VRRP 接口 IP 地址在同一网段，并设置 R1 在该备份组中的优先级为 120（优先级值默认为100）、抢占时间为 20s。
```shell
[R1]interface GigabitEthernet 0/0/1
[R1-GigabitEthernet0/0/1]vrrp ?
  arp       Gratuitous arp
  un-check  Uncheck VRRP packet TTL value
  vrid      Specify virtual router identifier
[R1-GigabitEthernet0/0/1]vrrp vrid 1 ?
  authentication-mode  Specify password and authentication mode
  preempt-mode         Specify preempt mode
  priority             Specify priority
  timer                Specify timer
  track                Specify the track configuration
  version-3            Specify the device to support V3 for VRRP
  virtual-ip           Specify virtual IP address
# 接口激活VRRP，加入VRRP组（VRID为1），并且虚拟IP为10.1.1.254
[R1-GigabitEthernet0/0/1]vrrp vrid 1 virtual-ip 10.1.1.254
# 该接口在该VRRP组中的优先级为120（优先级值默认为100）
[R1-GigabitEthernet0/0/1]vrrp vrid 1 priority 120
[R1-GigabitEthernet0/0/0]vrrp vrid 1 preempt-mode ?
  disable  Cancel current configuration
  timer    Specify timer
[R1-GigabitEthernet0/0/0]vrrp vrid 1 preempt-mode timer ?
  delay  Specify interval of delay
[R1-GigabitEthernet0/0/0]vrrp vrid 1 preempt-mode timer delay ?
  INTEGER<0-3600>  Value of timer, in seconds(default is 0)
# 配置虚拟路由器的抢占时间为20s，抢占时间是指当主设备因为故障修复重新切换为主状态时等待的时间
[R1-GigabitEthernet0/0/1]vrrp vrid 1 preempt-mode timer delay 20
```
在 R2 上创建 VRRP 备份组 1，配置与 R1 上备份组 1 相同的虚拟 IP 地址，并配置其在该备份组中的优先级为缺省值 100。
```shell
[R2]interface GigabitEthernet 0/0/2
[R2-GigabitEthernet0/0/2]vrrp vrid 1 virtual-ip 10.1.1.254
```
4. 在 R1、R2 上查看 VRRP 状态。
```shell
[R1]display vrrp
  GigabitEthernet0/0/1 | Virtual Router 1
    State : Master  # 接口在该VRRP组中的状态
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 120  # 接口在该VRRP组中的优先级
    PriorityConfig : 120
    MasterPriority : 120
    Preempt : YES   Delay Time : 20 s # 开启抢占，且接口在该VRRP组中的抢占时间为20s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-19 18:20:08 UTC-08:00
    Last change time : 2025-05-19 18:20:11 UTC-08:00 

[R1]display vrrp brief 
Total:1     Master:1     Backup:0     Non-active:0      
VRID  State        Interface                Type     Virtual IP     
----------------------------------------------------------------
1     Master       GE0/0/1                  Normal   10.1.1.254 
```
```shell
[R2]display vrrp
  GigabitEthernet0/0/2 | Virtual Router 1
    State : Backup
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 100
    PriorityConfig : 100
    MasterPriority : 120
    Preempt : YES   Delay Time : 0 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-19 18:27:01 UTC-08:00
    Last change time : 2025-05-19 18:27:01 UTC-08:00
    
[R2]display vrrp brief 
Total:1     Master:0     Backup:1     Non-active:0      
VRID  State        Interface                Type     Virtual IP     
----------------------------------------------------------------
1     Backup       GE0/0/2                  Normal   10.1.1.254  
```
5. 在 R1 的`GigabitEthernet0/0/1`上执行`shutdown`，模拟 R1 出现故障，再在 R2 上查看 VRRP 状态，可看到 R2 的状态变为`Master`，表明切换成功。
```shell
[R1]interface GigabitEthernet 0/0/1
[R1-GigabitEthernet0/0/1]shutdown
```
```shell
[R2]display vrrp
  GigabitEthernet0/0/2 | Virtual Router 1
    State : Master
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.2
    PriorityRun : 100
    PriorityConfig : 100
    MasterPriority : 100
    Preempt : YES   Delay Time : 0 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-19 18:27:01 UTC-08:00
    Last change time : 2025-05-19 18:33:45 UTC-08:00

[R2]display vrrp brief
Total:1     Master:1     Backup:0     Non-active:0      
VRID  State        Interface                Type     Virtual IP     
----------------------------------------------------------------
1     Master       GE0/0/2                  Normal   10.1.1.254  
```
6. 再在 R1 的`GigabitEthernet0/0/1`上执行`undo shutdown`，等待 20s 后在 R1 上查看 VRRP状态，可看到 R1 又恢复成`Master`。
```shell
[R1-GigabitEthernet0/0/1]undo shutdown
[R1-GigabitEthernet0/0/1]display vrrp
  GigabitEthernet0/0/1 | Virtual Router 1
    State : Master
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 120
    PriorityConfig : 120
    MasterPriority : 120
    Preempt : YES   Delay Time : 20 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-19 18:20:08 UTC-08:00
    Last change time : 2025-05-19 18:36:16 UTC-08:00 
```
通过以上验证，表示配置是正确的。
### VRRP多网关负载分担配置
#### 实验拓扑
![](VRRP详解/vrrp-13.png)
#### 实验要求
两台用户主机采用不同的设备作为默认网关实现流量的负载均衡。
#### 实验步骤
1. 配置各设备接口 IP 地址。（省略）
2. R1、R2、R3 配置 OSPF（同主备备份配置）
3. 配置 VRRP
在 R1、R2 上分别创建 VRRP 备份组 1，配置虚拟路由器 IP 地址，配置 R1 优先级为 120、抢占延时为 20s；R2 优先级为缺省值 100。使 R1 为`Master`，R2 为`Backup`。（同主备备份配置）
```shell
[R1]interface GigabitEthernet 0/0/1
[R1-GigabitEthernet0/0/1]vrrp vrid 1 virtual-ip 10.1.1.254
[R1-GigabitEthernet0/0/1]vrrp vrid 1 priority 120
[R1-GigabitEthernet0/0/1]vrrp vrid 1 preempt-mode timer delay 20
```
```shell
[R2]interface GigabitEthernet 0/0/2
[R2-GigabitEthernet0/0/2]vrrp vrid 1 virtual-ip 10.1.1.254
```
在 R1、R2 上分别创建 VRRP 备份组 2，配置虚拟路由器 IP 地址，配置 R2 优先级为 120、抢占延时为 20s；R1 优先级为缺省值 100。使 R2 为`Master`，R1 为`Backup`。
```shell
[R1]interface GigabitEthernet 0/0/1
[R1-GigabitEthernet0/0/1]vrrp vrid 1 virtual-ip 10.1.1.253
```
```shell
[R2]interface GigabitEthernet 0/0/2
[R2-GigabitEthernet0/0/2]vrrp vrid 2 virtual-ip 10.1.1.253
[R2-GigabitEthernet0/0/2]vrrp vrid 2 priority 120
[R2-GigabitEthernet0/0/2]vrrp vrid 2 preempt-mode timer delay 20
```
4. 在 R1、R2 上查看 VRRP 状态。可以看到 R1 在备份组 1 中为`Master`，备份组 2 中为`Backup`；R2 在备份组 1 中为`Backup`，备份组 2 中为`Master`。
```shell
[R1]display vrrp brief 
Total:2     Master:1     Backup:1     Non-active:0      
VRID  State        Interface                Type     Virtual IP     
----------------------------------------------------------------
1     Master       GE0/0/1                  Normal   10.1.1.254     
2     Backup       GE0/0/1                  Normal   10.1.1.253  
```
```shell
[R2]display vrrp brief 
Total:2     Master:1     Backup:1     Non-active:0      
VRID  State        Interface                Type     Virtual IP     
----------------------------------------------------------------
1     Backup       GE0/0/2                  Normal   10.1.1.254     
2     Master       GE0/0/2                  Normal   10.1.1.253 
```
5. 在用户主机上`ping 20.1.1.1`可以`ping`通，说明配置正确。

### VRRP与BFD联动配置
#### 实验拓扑

[//]: # (![]&#40;VRRP详解/vrrp-14.png&#41;)
#### 实验要求
* 正常情况下，PC 以 R1 作为默认网关接入 Internet，当 R1 或 R1 到 SW 间链路故障时，主备网关间的切换时间小于 1s。

#### 实验步骤
1. 配置各设备接口 IP 地址。（省略）
2. R1、R2、R3 配置 OSPF（同主备备份配置）
3. 配置 VRRP（同主备备份配置）
4. 在 R1、R2 上配置静态 BFD 会话，检测备份组之间的链路
```shell
# 全局使能 BFD 功能
[R1]bfd
[R1-bfd]quit
# 创建名为atob的BFD会话，绑定对端（R2的VRRP接口IP地址）和出接口（R1的VRRP接口）
[R1]bfd atob bind peer-ip 10.1.1.2 interface GigabitEthernet 0/0/1
# 配置本地标识符为1
[R1-bfd-session-atob]discriminator local 1
# 配置对端标识符为2
[R1-bfd-session-atob]discriminator remote 2
# 配置最大BFD会话报文的接收时间间隔为50ms
[R1-bfd-session-atob]min-rx-interval 50
# 配置最大BFD会话报文的发送时间间隔为50ms
[R1-bfd-session-atob]min-tx-interval 50
# 提交BFD会话设置
[R1-bfd-session-atob]commit
[R1-bfd-session-atob]quit
```
```shell
[R2]bfd
[R2-bfd]quit
[R2]bfd btoa bind peer-ip 10.1.1.1 interface GigabitEthernet 0/0/2
[R2-bfd-session-btoa]discriminator local 2
[R2-bfd-session-btoa]discriminator remote 1
[R2-bfd-session-btoa]min-rx-interval 50
[R2-bfd-session-btoa]min-tx-interval 50
[R2-bfd-session-btoa]commit
[R2-bfd-session-btoa]quit
```
配置完成后，在 R1、R2 上查看 BFD 会话状态，可看到会话状态为`Up`，说明 BFD 会话状态已建立。
```shell
[R1]display bfd session all
--------------------------------------------------------------------------------
Local Remote     PeerIpAddr      State     Type        InterfaceName            
--------------------------------------------------------------------------------

1     2          10.1.1.2        Up        S_IP_IF     GigabitEthernet0/0/1     
--------------------------------------------------------------------------------
     Total UP/DOWN Session Number : 1/0
```
```shell
[R2]display bfd session all
--------------------------------------------------------------------------------
Local Remote     PeerIpAddr      State     Type        InterfaceName            
--------------------------------------------------------------------------------

2     1          10.1.1.1        Up        S_IP_IF     GigabitEthernet0/0/2     
--------------------------------------------------------------------------------
     Total UP/DOWN Session Number : 1/0
```
5. 在 R2 上配置 VRRP 与 BFD 联动，当 BFD 会话状态`Down`时，R2 的优先级增加 40。
```shell
[R2]interface GigabitEthernet 0/0/2
[R2-GigabitEthernet0/0/2]vrrp vrid 1 track bfd-session 2 ?
  increased  Increase priority
  reduced    Reduce priority
  <cr>       Please press ENTER to execute command 
[R2-GigabitEthernet0/0/2]vrrp vrid 1 track bfd-session 2 increased 40
```
在 R1、R2 上执行`display vrrp`，可以看出 R1 为`Master`，R2 为`Backup`，联动的 BFD 会话状态为`Up`。
```shell
[R1]display vrrp
  GigabitEthernet0/0/1 | Virtual Router 1
    State : Master
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 120
    PriorityConfig : 120
    MasterPriority : 120
    Preempt : YES   Delay Time : 20 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-20 15:25:08 UTC-08:00
    Last change time : 2025-05-20 18:01:04 UTC-08:00
```
```shell
[R2]display vrrp
  GigabitEthernet0/0/2 | Virtual Router 1
    State : Backup
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 100
    PriorityConfig : 100
    MasterPriority : 120
    Preempt : YES   Delay Time : 0 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Track BFD : 2  Priority increased : 40
    BFD-session state : UP
    Create time : 2025-05-20 15:28:01 UTC-08:00
    Last change time : 2025-05-20 18:01:05 UTC-08:00
```
6. 在 R1 的`GigabitEthernet0/0/1`上执行`shutdown`，模拟链路故障，在 R1、R2 上查看 VRRP 状态，可以看到 R1 状态变为`Initialize`，R2 变为`Master`，联动的 BFD 会话状态为`Down`。
```shell
[R1]display vrrp 
  GigabitEthernet0/0/1 | Virtual Router 1
    State : Initialize
    Virtual IP : 10.1.1.254
    Master IP : 0.0.0.0
    PriorityRun : 120
    PriorityConfig : 120
    MasterPriority : 0
    Preempt : YES   Delay Time : 20 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-20 15:25:08 UTC-08:00
    Last change time : 2025-05-20 18:06:50 UTC-08:00 
```
```shell
[R2]display vrrp
  GigabitEthernet0/0/2 | Virtual Router 1
    State : Master
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.2
    PriorityRun : 140
    PriorityConfig : 100
    MasterPriority : 140
    Preempt : YES   Delay Time : 0 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Track BFD : 2  Priority increased : 40
    BFD-session state : DOWN
    Create time : 2025-05-20 15:28:01 UTC-08:00
    Last change time : 2025-05-20 18:06:51 UTC-08:00
```
7. 再在 R1 的`GigabitEthernet0/0/1`上执行`undo shutdown`，模拟故障恢复，20s 后查看 VRRP 状态，R1 变为`Master`，R2 变为`Backup`，联动的 BFD 会话状态为`Up`。
```shell
[R1]display vrrp
  GigabitEthernet0/0/1 | Virtual Router 1
    State : Master
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 120
    PriorityConfig : 120
    MasterPriority : 120
    Preempt : YES   Delay Time : 20 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Create time : 2025-05-20 15:25:08 UTC-08:00
    Last change time : 2025-05-20 18:11:11 UTC-08:00 
```
```shell
[R2]dis vrrp
  GigabitEthernet0/0/2 | Virtual Router 1
    State : Backup
    Virtual IP : 10.1.1.254
    Master IP : 10.1.1.1
    PriorityRun : 100
    PriorityConfig : 100
    MasterPriority : 120
    Preempt : YES   Delay Time : 0 s
    TimerRun : 1 s
    TimerConfig : 1 s
    Auth type : NONE
    Virtual MAC : 0000-5e00-0101
    Check TTL : YES
    Config type : normal-vrrp
    Backup-forward : disabled
    Track BFD : 2  Priority increased : 40
    BFD-session state : UP
    Create time : 2025-05-20 15:28:01 UTC-08:00
    Last change time : 2025-05-20 18:12:10 UTC-08:00
```


### track接口状态

![](VRRP详解/vrrp-4.png)


```shell
[R1]interface GigabitEthernet 0/0/0
[R1-GigabitEthernet0/0/0]ip address 192.168.1.253 24
[R1-GigabitEthernet0/0/0]vrrp vrid 1 virtual-ip 192.168.1.254
[R1-GigabitEthernet0/0/0]vrrp vrid 1 priority 120
# 跟踪GE0/0/1口的状态，如果接口Down了，则优先级减去30
[R1-GigabitEthernet0/0/0]vrrp vrid 1 track interface GigabitEthernet 0/0/1 reduced 30
[R1-GigabitEthernet0/0/0]vrrp vrid 1 preempt-mode timer delay 20
```
### 在三层交换机上部署VRRP

![](VRRP详解/vrrp-5.png)

SW1 及 SW2 都是三层交换机，内网有`VLAN10`的用户，网段为`192.168.10.0/24`。现在要在 SW1 及 SW2 间跑一组 VRRP。正常情况下 SW1 的`vlanif10`为主，SW2 为备。
```shell
[SW1]vlan 10
[SW1-vlan10]quit
[SW1]interface GigabitEthernet 0/0/22
[SW1-GigabitEthernet0/0/22]port link-type trunk
[SW1-GigabitEthernet0/0/22]port trunk allow-pass vlan 10
[SW1-GigabitEthernet0/0/22]quit
[SW1]interface Vlanif 10
[SW1-Vlanif10]ip address 192.168.10.253 24
[SW1-Vlanif10]vrrp vrid 1 virtual-ip 192.168.10.254
[SW1-Vlanif10]vrrp vrid 1 priority 120
[SW1-Vlanif10]vrrp vrid 1 preempt-mode timer delay 20
```
```shell
[SW2]vlan 10
[SW2-vlan10]quit
[SW2]interface GigabitEthernet0/0/23
[SW2-GigabitEthernet0/0/23]port link-type trunk
[SW2-GigabitEthernet0/0/23]port trunk allow-pass vlan 10
[SW2]interface Vlanif 10
[SW2-Vlanif10]ip address 192.168.10.252 24
[SW2-Vlanif10]vrrp vrid 1 virtual-ip 192.168.10.254
```
### VRRP+MSTP典型组网

![](VRRP详解/vrrp-6.png)

SW1及SW2为核心交换机，SW3为接入层交换机下联PC。三台交换机构成一个三角形冗余环境。内网存在四个VLAN：10、20、30和40。要求网络正常时，VLAN10、20的用户上行的流量走SW1；VLAN30、40的上行流量走SW2，并且当SW1
或SW2发生故障时，能够进行自动切换。

这里实际上需要同时考虑两个因素，一是 VRRP，二是 MSTP。

从三层的角度来说，SW1 是`VLAN10、20`的`VRRP Master`，SW2 是`VLAN30、40`的`VRRP Master`。从二层的角度来看，网络里肯定是有环路的，因此需要借助 MSTP 来打破环路，但是不能随便阻塞端口，应该保证`VLAN10、20`的流量走左侧的链路到 SW1，而`VLAN30、40`的流量走右侧到 SW2。因此 MSTP 的配置上，将`VLAN10、20`及`VLAN30、40`分别映射到不同的 MSTP 实例。

例如将`VLAN10、20`映射到`Instance1`，将`VLAN30、40`映射到`Instance2`，然后将 SW1 设置为`Instance1`的主根、SW2 为`Instance1`的次根，将 SW1 为`Instance2`的次根，SW2 为`Instance2`的主根。这样一来，在`Instance1`的生成树中，SW3 的`G0/0/23`将被阻塞，在`Instance2`的生成树中，SW3 的`GE0/0/22`将被阻塞。
```shell
[SW3]vlan batch 10 20 30 40
[SW3]interface GigabitEthernet0/0/22
[SW3-GigabitEthernet0/0/22]port link-type trunk
[SW3-GigabitEthernet0/0/22]port trunk allow-pass vlan 10 20 30 40
[SW3]interface GigabitEthernet0/0/23
[SW3-GigabitEthernet0/0/23]port link-type trunk
[SW3-GigabitEthernet0/0/23]port trunk allow-pass vlan 10 20 30 40
# 配置MSTP，将vlan10 20映射到实例1，将vlan30 40映射到实例2
# 另外，在SW3上，MSTP实例1及实例2的优先级保持默认32768
[SW3]stp mode mstp
[SW3]stp region-configuration
[SW3-mst-region]region-name huawei
[SW3-mst-region]instance 1 vlan 10 20
[SW3-mst-region]instance 2 vlan 30 40
[SW3-mst-region]active region-configuration
[SW3-mst-region]quit
[SW3]stp instance 1 priority 32768
[SW3]stp instance 2 priority 32768
[SW3]stp enable
```
```shell
[SW1]vlan batch 10 20 30 40
[SW1]interface GigabitEthernet0/0/24
[SW1-GigabitEthernet0/0/24]port link-type trunk
[SW1-GigabitEthernet0/0/24]port trunk allow-pass vlan 10 20 30 40
[SW1]interface GigabitEthernet0/0/22
[SW1-GigabitEthernet0/0/22]port link-type trunk
[SW1-GigabitEthernet0/0/22]port trunk allow-pass vlan 10 20 30 40
# 配置MSTP，将vlan10 20映射到实例1，将vlan30 40映射到实例2
# 另外，将SW1的MSTP设置为实例1的主根，实例2的次根
[SW1]stp mode mstp
[SW1]stp region-configuration
[SW1-mst-region]region-name huawei
[SW1-mst-region]instance 1 vlan 10 20
[SW1-mst-region]instance 2 vlan 30 40
[SW1-mst-region]active region-configuration
[SW1-mst-region]quit
[SW1]stp instance 1 root primary
[SW1]stp instance 2 root secondary
[SW1] stp enable
# 配置vlanif10、vlanif20、vlanif30、vlanif40，然后分别加入VRRP组1,2,3,4
# 其中SW1为VRRP组1及2的Master，为组3及4的Backup
[SW1]interface Vlanif10
[SW1-vlanif10]ip address 192.168.10.253 255.255.255.0
[SW1-vlanif10]vrrp vrid 1 virtual-ip 192.168.10.254
[SW1-vlanif10]vrrp vrid 1 priority 120
[SW1]interface Vlanif20
[SW1-vlanif20]ip address 192.168.20.253 255.255.255.0
[SW1-vlanif20]vrrp vrid 2 virtual-ip 192.168.20.254
[SW1-vlanif20]vrrp vrid 2 priority 120
[SW1]interface Vlanif30
[SW1-vlanif30] ip address 192.168.30.252 255.255.255.0
[SW1-vlanif30] vrrp vrid 3 virtual-ip 192.168.30.254
[SW1]interface Vlanif40
[SW1-vlanif40]ip address 192.168.40.252 255.255.255.0
[SW1-vlanif40]vrrp vrid 4 virtual-ip 192.168.40.254
```
```shell
[SW2]vlan batch 10 20 30 40
[SW2]interface GigabitEthernet0/0/24
[SW2-GigabitEthernet0/0/24]port link-type trunk
[SW2-GigabitEthernet0/0/24]port trunk allow-pass vlan 10 20 30 40
[SW2]interface GigabitEthernet0/0/23
[SW2-GigabitEthernet0/0/23]port link-type trunk
[SW2-GigabitEthernet0/0/23]port trunk allow-pass vlan 10 20 30 40
# 配置MSTP，将vlan10 20映射到实例1，将vlan30 40映射到实例2
# 将SW1的MSTP设置为实例2的主根，实例1的次根
[SW2]stp mode mstp
[SW2]stp region-configuration
[SW2-mst-region]region-name huawei
[SW2-mst-region]instance 1 vlan 10 20
[SW2-mst-region]instance 2 vlan 30 40
[SW2-mst-region]active region-configuration
[SW2-mst-region]quit
[SW2]stp instance 1 root secondary
[SW2]stp instance 2 root primary
[SW2]stp enable
# 配置vlanif10、vlanif20、vlanif30、vlanif40
# 配置vlanif10、vlanif20、vlanif30、vlanif40，分别加入VRRP组1,2,3,4
# 其中SW2为VRRP组3及4的Master，为组1及2的Backup
[SW2]interface Vlanif10
[SW2-vlanif10]ip address 192.168.10.252 255.255.255.0
[SW2-vlanif10]vrrp vrid 1 virtual-ip 192.168.10.254
[SW2]interface Vlanif20
[SW2-vlanif20]ip address 192.168.20.252 255.255.255.0
[SW2-vlanif20]vrrp vrid 2 virtual-ip 192.168.20.254
[SW2]interface Vlanif30
[SW2-vlanif30]ip address 192.168.30.253 255.255.255.0
[SW2-vlanif30]vrrp vrid 3 virtual-ip 192.168.30.254
[SW2-vlanif30]vrrp vrid 3 priority 120
[SW2]interface Vlanif40
[SW2-vlanif40]ip address 192.168.40.253 255.255.255.0
[SW2-vlanif40]vrrp vrid 4 virtual-ip 192.168.40.254
[SW2-vlanif40]vrrp vrid 4 priority 120
```
完成配置后，各 VLAN 的用户都能够`ping`通自己的网关；我们在 SW3 上看看：
```shell
[SW3] display stp brief
MSTID Port Role STP State Protection
 0 GigabitEthernet0/0/1 DESI FORWARDING NONE
 0 GigabitEthernet0/0/2 DESI FORWARDING NONE
 0 GigabitEthernet0/0/22 DESI FORWARDING NONE
 0 GigabitEthernet0/0/23 DESI FORWARDING NONE
 1 GigabitEthernet0/0/1 DESI FORWARDING NONE
 1 GigabitEthernet0/0/22 ROOT FORWARDING NONE
 1 GigabitEthernet0/0/23 ALTE DISCARDING NONE
 2 GigabitEthernet0/0/2 DESI FORWARDING NONE
 2 GigabitEthernet0/0/22 ALTE DISCARDING NONE
 2 GigabitEthernet0/0/23 ROOT FORWARDING NONE 
```
我们看到，MSTP 实例 1 中被阻塞的端口是`GE0/0/23`口；MSTP 实例 2 中被阻塞的端口是`GE0/0/22`，符合需求。再去 SW1 上看看 VRRP 组的状态：
```shell
[SW1] display vrrp brief
VRID State Interface Type Virtual IP
--------------------------------------------------------------------------------------------------
1 Master Vlanif10 Normal 192.168.10.254
2 Master Vlanif20 Normal 192.168.20.254
3 Backup Vlanif30 Normal 192.168.30.254 
4 Backup Vlanif40 Normal 192.168.40.254
--------------------------------------------------------------------------------------------------
Total:4 Master:2 Backup:2 Non-active:0
```
从上述输出可以看出，SW1 为 VRRP 组 1 及组 2 的`Master`，同时也为 VRRP 组 3 和组 4 的`Backup`。

## VRRP 常见问题
### VRRP双主问题
由于 VRRP 协议报文是以组播的方式发送的，这就提出了一个限制：VRRP 的成员接口必须处于一个 LAN 或者说一个广播域内，否则 VRRP 报文将无法正常收发，如果同一个 VRRP 组内的接口无法正常收发 VRRP 报文，就容易出现双主故障。

![VRRP](VRRP详解/vrrp-7.png)

在上图中，R1 及 R2 的`GE0/0/0`接口接入同一个交换机，此时 R1、R2 的`GE0/0/0`接口处于一个广播域内，VRRP 的协议报文收发应该没有问题，此时 VRRP 能够正常工作。但是如果交换机连接 R1、R2 的这两个接口被划分到了两个不同的 VLAN 中，那么就会出现双主故障。因为一台路由器发出的 VRRP 报文无法被另一台接收，双方感知不到对方的存在。

![VRRP](VRRP详解/vrrp-8.png)

在上图所示的场景中，下行设备均为路由器，如果这些路由器都采用三层接口（而不是二层接口）与上面的设备对接，那么上面的设备就不具备运行 VRRP 的条件，因为在这种场景中，VRRP 协议报文无法被下面的路由器透传。这样，上述两种组网就不能够部署 VRRP，此时，可采用动态路由协议。
### 同一个广播域内VRRP VRID冲突

![VRRP](VRRP详解/vrrp-9.png)

如图中所示，路由器与交换机之间通过  VRRP 的方式进行三层对接，但上、下行 VRRP 的 VRID 被设置为一样，由于 VRRP 通过 VRID 来区分不同的 VRRP 组，因此，如果出现上图这类情况就会造成 VRRP 的计算混乱，误认为四台设备的接口加入了同一个 VRRP 组。

所以在同一个广播域内，不同的 VRRP 组的 VRID 切记不能产生冲突。
## VRRP 与 NQA 的联动
NQA（`Network Quality Analysis`）是用于网络质量分析的一个特性。该特性能够检测网络的各项性能指标，最简单应用如使用 NQA 检测网络中某个 IP 地址的可达性。当然 NQA 的功能非常丰富，还能够用于采集网络 HTTP 的总时延、TCP 连接时延、文件传输速率、FTP 连接时延、DNS 解析时延、DNS 解析错误率等。NQA 的采集结果可以被多种应用所使用，例如和静态路由关联，从而为静态路由带来更好的灵活性，或者与 VRRP 联动，提高 VRRP 的可靠性。

![VRRP](VRRP详解/vrrp-10.png)

例如上图所示的环境中，R1 与 R2 之间隔着一台二层交换机，R1 配置到达`8.8.8.0/24`网络的静态路由，如果 R2 发生故障，或者交换机与 R2 之间的互联线路发生故障，R1 是无法感知的，这就会产生问题。为了规避这个问题，可以在 R1 上运行一组 NQA 实例，探测到达`10.1.12.2`的可达性，然后，静态路由跟踪这个探测的结果，如果探测的结果是失败的，意味着`10.1.12.2`不可达了，则将静态路由失效。
### 验证实验

![VRRP](VRRP详解/vrrp-11.png)

在上图所示的环境中，`VLAN10`为用户所在的 VLAN。
* SW1、SW2 创建`VLAN10`及`VLAN11`，在`vlanif10`上运行 VRRP，缺省情况下 SW1 为主，SW2 为备。PC 的网关设置为 VRRP 组的虚拟 IP 地址。
* SW1 及 SW2 的`VLAN11`用于上联，仅做测试，不部署 VRRP。在 SW4 上配置一个 IP 作为测试 IP 地址。
* 要求网络正常时，VRRP 组的`Master`在 SW1 上。当`11.1.1.100`不可达时，VRRP 组能够自动切换。

```shell
[SW1]nqa ?
  test-instance  Specify an NQA test instance
[SW1]nqa test-instance ?
  STRING<1-32>  Specify NQA test administer name
# 创建一组NQA探测实例
[SW1]nqa test-instance admin 1
[SW1-nqa-admin-1]test-?
  test-aaa                                test-failtimes
  test-type                               
# 探测协议类型为ICMP
[SW1-nqa-admin-1]test-type icmp
[SW1-nqa-admin-1]destination-address ?
  ipv4  Set destination-address in IPv4
  url   Set destination-address in URL
# 目标地址
[SW1-nqa-admin-1]destination-address ipv4 11.1.1.100
[SW1-nqa-admin-1]frequency ?
  INTEGER<1-604800>  Seconds, interval time between two continue same NQA test
# 探测周期为3s
[SW1-nqa-admin-1]frequency 3
[SW1-nqa-admin-1]interval ?
  milliseconds  Set interval time in milliseconds
  seconds       Set interval time in seconds
# ICMP报文的发送间隔
[SW1-nqa-admin-1]interval seconds 1
[SW1-nqa-admin-1]timeout ?
  INTEGER<1-60>  Seconds, probe timeout time
# 超时时间
[SW1-nqa-admin-1]timeout 1
# 一个探测周期下的发包个数
[SW1-nqa-admin-1]probe-count 2
# 立即开始探测
[SW1-nqa-admin-1]start now
[SW1-nqa-admin-1]quit
[SW1]interface Vlanif 10
[SW1-Vlanif10]ip address 10.1.1.3 24
[SW1-Vlanif10]vrrp vrid 1 virtual-ip 10.1.1.1
[SW1-Vlanif10]vrrp vrid 1 priority 110
[SW1-Vlanif10]vrrp vrid 1 track ?
  admin-vrrp   Specify configuration information of the administrator VRRP
  bfd-session  Specify BFD session
  interface    Interface information
  ip           Specify IP protocol
  nqa          Specify NQA test class

[SW1-Vlanif10]vrrp vrid 1 track nqa ?
  STRING<1-32>  Specify NQA test administer name

[SW1-Vlanif10]vrrp vrid 1 track nqa admin 1 ?
  reduced  Reduce priority
  <cr>     
# VRRP组跟踪NQA实例的状态，如果NQA检测结果为Failed，则将当前VRRP优先级减去20
[SW1-Vlanif10]vrrp vrid 1 track nqa admin 1 reduced 20
```
```shell
interface Vlanif10
ip address 10.1.1.2 255.255.255.0
vrrp vrid 1 virtual-ip 10.1.1.1
```
SW2的关键配置：
```shell
[R2]interface Vlanif 10
[R2-Vlanif10]ip address 10.1.1.2 24
[R2-Vlanif10]vrrp vrid 1 virtual-ip 10.1.1.1
```
在 SW4 上`undo`掉 IP 地址`11.1.1.100`来模拟`11.1.1.100`不可达。注意，此刻 SW1 与 SW4 之间的连线仍然是正常的，传统的 VRRP 只能跟踪直连接口的状态，但是与 NQA 联动的 VRRP 能够感知到远端 IP 的可达性。因此在`undo`掉`11.1.1.100`这个地址后，SW1 的 NQA 实例会检测到目标 IP 地址不可达，从而 NQA 的测试实例状态会变成`failed`，而 VRRP 也会检测到这个变化，并将自己的优先级减去 20，如此一来 SW2 就会成为新的`Master`。

当`11.1.1.100`恢复时（重新配置上这个 IP 地址），NQA 能够检测到，测试用例的状态变成`Success`，VRRP 感知到后，将优先级变回 110，如此 SW1 又抢占回`Master`，SW2 则变成`Backup`。

:::warning
在部署 NQA 时，各项参数的配置务必注意，如果参数配置不当，有可能会导致 NQA 检测结果的异常。参数需遵循如下规则：`interval * probe-count + timeout < fruency`
:::