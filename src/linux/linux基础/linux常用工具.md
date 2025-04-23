---
title: linux常用工具
date: 2024-07-05
tags: Bash
categories: Linux
order: 31
---



## 端口扫描工具
Nmap（网络映射器）是全球领先的 Linux 系统网络安全扫描工具，可帮助识别开放端口并预防潜在的网络安全威胁。
### 安装
```shell
yum install nmap -y
```
### 简单扫描
```shell
nmap [target]
```
`target`可以是域名或IP 地址。

不带任何选项的命令会扫描最常见的 1000 个端口。Nmap 可以扫描目标上的单个端口、端口范围或所有端口。
```shell
[root@localhost ~]# nmap 10.168.4.49
Starting Nmap 7.70 ( https://nmap.org ) at 2024-10-14 19:32 CST
Nmap scan report for 10.168.4.49
Host is up (0.00011s latency).
Not shown: 995 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
111/tcp  open  rpcbind
3306/tcp open  mysql
8080/tcp open  http-proxy
9090/tcp open  zeus-admin
MAC Address: 00:25:A9:06:2A:A7 (Shanghai Embedway Information Technologies)

Nmap done: 1 IP address (1 host up) scanned in 2.06 seconds
```
### 扫描单个端口
```shell
nmap -p [port] [target]
```
```shell
[root@localhost ~]# nmap -p 80 10.168.4.49
Starting Nmap 7.70 ( https://nmap.org ) at 2024-10-14 19:37 CST
Nmap scan report for 10.168.4.49
Host is up (0.00010s latency).

PORT   STATE  SERVICE
80/tcp closed http
MAC Address: 00:25:A9:06:2A:A7 (Shanghai Embedway Information Technologies)

Nmap done: 1 IP address (1 host up) scanned in 1.01 seconds
```
输出显示端口号和协议(80/tcp)、端口的状态(关闭)以及与端口相关的服务(http)。
### 扫描所有端口
```shell
nmap -p- [target]
```
耗时有点长。
```shell
[root@localhost ~]# nmap -p- 10.168.4.49
Starting Nmap 7.70 ( https://nmap.org ) at 2024-10-14 19:41 CST
Stats: 0:04:15 elapsed; 0 hosts completed (1 up), 1 undergoing SYN Stealth Scan
SYN Stealth Scan Timing: About 23.53% done; ETC: 19:59 (0:13:49 remaining)
Nmap scan report for 10.168.4.49
Host is up (0.00015s latency).
Not shown: 65519 closed ports
PORT      STATE SERVICE
22/tcp    open  ssh
111/tcp   open  rpcbind
3306/tcp  open  mysql
3307/tcp  open  opsession-prxy
6379/tcp  open  redis
6380/tcp  open  unknown
8080/tcp  open  http-proxy
9090/tcp  open  zeus-admin
13306/tcp open  unknown
16379/tcp open  unknown
18848/tcp open  unknown
19848/tcp open  unknown
19849/tcp open  unknown
20008/tcp open  unknown
20011/tcp open  unknown
33060/tcp open  mysqlx
MAC Address: 00:25:A9:06:2A:A7 (Shanghai Embedway Information Technologies)

Nmap done: 1 IP address (1 host up) scanned in 5711.22 seconds
```
### 扫描标准端口
```shell
nmap -F [target]
```
快速扫描会检查 100 个最常用的端口。
### 扫描一系列端口
扫描指定范围内的端口。
```shell
nmap -p [start]-[end] [target]
```
`start，end`表示端口号的范围。

扫描多个特定端口：
```shell
nmap -p [port1, port2, ...] [target]
```
结合这两种方法可以扫描特定端口号和范围。
```shell
nmap -p 22,80,100-200 [target]
```
### Nmap 识别的端口的状态
Nmap 将端口状态分为六种不同的状态：

| 状态                | 说明                                         |
|-------------------|--------------------------------------------|
| open              | 关联端口上的服务处于活动状态并侦听传入连接。该端口可用于连接             |
| closed            | 没有服务正在监听该端口。没有服务绑定在该端口上，并且该端口将拒绝所有传入连接     |
| filtered          | 端口状态未知。由于数据包筛选、防火墙规则或网络安全设备配置，端口状态被隐藏或限制   |
| 未过滤               | 端口状态未知。端口可访问且不受限制，但没有与之关联的活动服务。            |
| open\|filtered    | 端口状态为 open 或filtered。由于网络状况，Nmap 无法确定是哪种情况 |
| closed\| filtered | 端口状态为关闭或过滤。由于网络状况，确切状态尚不确定                 |

