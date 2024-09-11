---
title: Linux防火墙详解
date: 2024-04-15
tags: linux基础
categories: linux
order: 15
---

## firewalld
`firewalld`服务是 Centos7中默认的防火墙管理工具。

`firewalld`服务操作命令。
```
systemctl status/start/stop/restart/enable/disable firewalld
```
### 区域
防火墙的网络区域定义了网络连接的可信等级，我们可以根据不同场景来调用不同的区域，区域规则有：

|    区域    | 默认规则策略                                                                 |
|:--------:|:-----------------------------------------------------------------------|
| trusted  | 允许所有的数据包                                                               |
|   home   | 拒绝流入的数据包，除非与输出流量数据包相关，或ssh,mdns,cockpit,samba-client,dhcpv6-client服务允许 |
| internal | 等同于 home                                                               |
|   work   | 拒绝流入的数据包，除非与输出流量数据包相关，或ssh,cockpit,dhcpv6-client服务允许                   |
|  public  | 拒绝流入的数据包，除非与输出流量数据包相关，或ssh,cockpit,dhcpv6-client服务允许                   |
| external | 拒绝流入的数据包，除非与输出流量数据包相关，或ssh服务允许                                         |
|   dmz    | 拒绝流入的数据包，除非与输出流量数据包相关，或ssh服务允许                                         |
|  block   | 拒绝流入的数据包，除非与输出流量数据包相关                                                  |
|   drop   | 拒绝流入的数据包，除非与输出流量数据包相关                                                  |

简单来说就是为用户预先准备了几套规则集合，我们可以根据不同场景选择合适的规则集合。
:::tip
默认区域是 public。
:::
### firewall-cmd
`firewall-cmd`命令是`firewalld`服务提供的操作防火墙的命令。

#### 两种运行模式
防火墙有两种模式：
* 运行模式：不会把规则保存到防火墙的配置文件中，设置完后立即生效
* 永久模式：会把规则写入到防火墙的配置文件中，但需要`reload`重载后才会生效，需要使用`--permanent`参数

#### firewall-cmd 选项

| 选项                                    | 说明                        |
|:--------------------------------------|:--------------------------|
| `--state`                             | 显示状态                      |
| `--reload`                            | 让配置文件中的规则立即生效             |
| `--permanent`                         | 永久模式，将规则写入配置文件中           |
| `--list-all`                          | 显示当前区域的网卡配置参数、资源、端口及服务等信息 |
| `--list-ports`                        | 查看所有打开的端口                 |
| `--list-all-zones`                    | 显示所有区域的网卡配置参数、资源、端口及服务等信息 |
| `--panic-on`                          | 启动应急模式，阻止所有网络流量           |
| `--panic-off`                         | 关闭应急模式，允许网络流量通过防火墙        |
| `--query-service=<服务名>`               | 检查指定服务是否在指定区域的规则中         |
| `--get-zones`                         | 显示可用的区域                   |
| `--get-services`                      | 显示预先定义的服务                 |
| `--get-default-zone`                  | 查询默认的区域名称                 |
| `--get-active-zones`                  | 显示当前正在使用的区域与网卡名称          |
| `--get-zone-of-interface=<interface>` | 查询网卡属于哪个区域                |
| `--set-default-zone=<zone>`           | 设置默认的区域，永久生效              |
| `--add-service=<服务名>`                 | 设置默认区域允许该服务的流量            |
| `--add-port=<端口号>/<tcp/udp>`          | 设置默认区域允许该端口的流量            |
| `--add-source=<source>`               | 将来源于此 IP 或子网的流量导向指定的区域    |
| `--add-interface=<网卡名称>`              | 将来自于该网卡的所有流量都导向某个指定的区域    |
| `--change-interface=<网卡名称>`           | 将某个网卡与区域做关联               |
| `--remove-port=<端口号>/<tcp/udp>`       | 设置默认区域不再允许该端口的流量          |
| `--remove-service=<service>`          | 设置默认区域不再允许该服务的流量          |
| `--remove-source=<source>`            | 不再将此 IP 或子网的流量导向某个指定的区域   |
| `--zone=<zone>`                       | 指定要操作的区域                  |

防火墙默认区域为`public`，因此在使用`firewall-cmd`命令设置默认区域时，可以不用加`--zone=<zone>`。

`--add-service`的服务名必须是定义在`/usr/lib/firewalld/services`下的服务名。
#### 示例
```shell
# 查看防火墙服务(firewalld)状态
# 也可以用 systemctl status firewalld
[root@localhost ~]# firewall-cmd --state
running
# 查询当前默认的区域
[root@localhost ~]# firewall-cmd --get-default-zone
public
# 查询eth0网卡属于哪个区域
[root@localhost ~]# firewall-cmd --get-zone-of-interface=eth0
public
# 查询ssh服务是否在public中
[root@localhost ~]# firewall-cmd --zone=public --query-service=ssh
yes
# 设置默认区域为dmz
[root@localhost ~]# firewall-cmd --set-default-zone=dmz
success
# 查看默认区域的配置信息
[root@localhost services]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: ens160
  sources: 
  services: cockpit dhcpv6-client ssh
  ports: 
  protocols: 
  forward: yes
  masquerade: no
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules:
# 不加--zone=public 设置的是默认区域
[root@localhost services]# firewall-cmd --add-port=443/tcp
success
#打开443/TCP端口，默认就有--zone=public，所以不加也可以；
[root@localhost services]# firewall-cmd --zone=public --add-port=443/tcp
success
#永久打开3306/TCP端口
[root@localhost services]# firewall-cmd --zone=public --add-port=3306/tcp --permanent
success
# 删除已开放的某个不需要的端口
[root@localhost services]# firewall-cmd --zone=public --remove-port=3306/tcp --permanent
success
# 刷新配置
[root@localhost services]# firewall-cmd --reload
success
#批量添加多个端口：53、25端口
[root@localhost services]# firewall-cmd --zone=public --add-port=53/tcp --add-port=25/tcp --permanent
# 批量添加某一段端口
[root@localhost services]# firewall-cmd --zone=public --add-port=1-110/tcp --permanent
```
富规则使用：
```shell
# 禁止 IP 为`172.16.11.332`的地址访问 22 端口
firewall-cmd --add-rich-rule='rule family="ipv4" source address="172.16.11.332" port protocol="tcp" port="22" reject' --permanent
# 删除限制或解除 IP 这条防火墙规则
firewall-cmd --remove-rich-rule='rule family="ipv4" source address="172.16.11.332" port protocol="tcp" port="22" accept' --permanent
# 限制 IP 地址段
firewall-cmd --add-rich-rule='rule family="ipv4" source address="172.0.0.1/24" port protocol="tcp" port="22" reject' --permanent
# 解除 IP 地址段
firewall-cmd --add-rich-rule='rule family="ipv4" source address="172.0.0.1/24" port protocol="tcp" port="22" accept' --permanent
```
