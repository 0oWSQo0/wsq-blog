---
title: Linux软件安装
date: 2024-03-10
tags: linux基础
categories: linux
order: 8
---

## Linux软件包
Linux下的软件包可细分为两种，分别是源码包和二进制包。
### 源码包
源码包就是一大堆源代码程序，是由程序员按照特定的格式和语法编写出来的。

由于源码包的安装需要把源代码编译为二进制代码，因此安装时间较长。
### 二进制包
二进制包，也就是源码包经过成功编译之后产生的包。由于二进制包在发布之前就已经完成了编译的工作，因此用户安装软件的速度较快。

二进制包是 Linux 下默认的软件安装包，因此二进制包又被称为默认安装软件包。主要有以下 2 大主流的二进制包管理系统：
* RPM 包管理系统：例如 Fedora、CentOS 等
* DPKG 包管理系统：主要应用在 Debian 和 Ubuntu 中

RPM 包管理系统和 DPKG 管理系统的原理和形式大同小异，可以触类旁通。
### 源码包 VS RPM二进制包
使用源码包安装软件具有以下几点好处：
* 开源，如果你有足够的能力，则可以修改源代码
* 可以自由选择所需的功能
* 因为软件是编译安装的，所以更加适合自己的系统，更加稳定，效率也更高
* 卸载方便

但同时，使用源码包安装软件也有几点不足：
* 安装过程步骤较多，尤其是在安装较大的软件集合时，容易出现拼写错误
* 编译时间较长，所以安装时间比二进制安装要长
* 因为软件是编译安装的，所以在安装过程中一旦报错，新手很难解决

相比源码包，二进制包是在软件发布时已经进行过编译的软件包，所以安装速度比源码包快得多。也正是因为已经进行通译，无法看到软件的源代码。

使用 RPM 包安装软件具有以下 2 点好处：
* 包管理系统简单，只通过几个命令就可以实现包的安装、升级、査询和卸载
* 安装速度比源码包安装快得多

与此同时，使用 RPM 包安装软件有如下不足：
* 经过编译，不能看到源代码
* 功能选择不如源码包灵活
* 依赖性：在安装软件包 a 时需要先安装 b 和 c，而在安装 b 时需要先安装 d 和 e。这就需要先安装 d 和 e，再安装 b 和 c，最后才能安装 a

## RPM包统一命名规则
RPM 二进制包的命名需遵守统一的命名规则，用户通过名称就可以直接获取这类包的版本、适用平台等信息。

RPM 二进制包命名的一般格式如下：
```
包名-版本号-发布次数-发行商-Linux平台-适合的硬件平台-包扩展名
```

例如，RPM 包的名称是`httpd-2.2.15-15.el6.centos.i686.rpm`，其中：
* `httped`：软件包名。这里需要注意，`httped`是包名，而`httpd-2.2.15-15.el6.centos.1.i686.rpm`通常称为包全名，包名和包全名是不同的，在某些 Linux 命令中，有些命令（如包的安装和升级）使用的是包全名，而有些命令（包的查询和卸载）使用的是包名。
* `2.2.15`：包的版本号，版本号的格式通常为主版本号.次版本号.修正号。
* 15：二进制包发布的次数，表示此 RPM 包是第几次编程生成的。
* `el*`：软件发行商，el6 表示此包是由 RedHat 公司发布，适合在 RHEL6.x 和 CentOS6.x 上使用。
* `centos`：表示此包适用于 CentOS 系统。
* `i686`：表示此包使用的硬件平台
* `rpm`：RPM 包的扩展名，表明这是编译好的二进制包，可以使用 rpm 命令直接安装。

## RPM包安装、卸载和升级
以安装`apache`程序为例。
### RPM包默认安装路径
通常情况下，RPM 包采用系统默认的安装路径，所有安装文件会按照类别分散安装到下表所示的目录中。

| 安装路径         | 含 义 |
| :--: | :--: |
| /etc/            | 配置文件安装目录 |
| /usr/bin/        | 可执行的命令安装目录 |
| /usr/lib/        | 程序所使用的函数库保存位置 |
| /usr/share/doc/  | 基本的软件使用手册保存位置 |
| /usr/share/man/  | 帮助文件保存位置 |

RPM 包的默认安装路径是可以通过命令查询的。

除此之外，RPM 包也支持手动指定安装路径，但此方式并不推荐。因为一旦手动指定安装路径，所有的安装文件会集中安装到指定位置，且系统中用来查询安装路径的命令也无法使用（需要进行手工配置才能被系统识别），得不偿失。

与 RPM 包不同，源码包的安装通常采用手动指定安装路径（习惯安装到`/usr/local/`中）的方式。既然安装路径不同，同一`apache`程序的源码包和 RPM 包就可以安装到一台 Linux 服务器上（但同一时间只能开启一个，因为它们需要占用同一个 80 端口）。

实际情况中，一台服务器几乎不会同时包含两个 apache 程序，不好管理，还会占用过多的服务器磁盘空间。
### 常用参数

| 参数                             | 说明                               |
|--------------------------------|----------------------------------|
| -a, --all                      | 查询/验证所有软件包                       |
| -f, --file                     | 查询/验证文件属于的软件包                    |
| -g, --group                    | 查询/验证组中的软件包                      |
| -p, --package                  | 查询/验证一个软件包                       |
| -qc                            | 列出所有配置文件                         |
| -ql                            | 列出软件包中的文件                        |
| `-e, --erase=<package>+`       | 清除 (卸载) 软件包                      |
| -h, --hash                     | 软件包安装的时候列出哈希标记 (和 -v 一起使用效果更好)   |
| -i, --install                  | 安装软件包                            |
| --nodeps                       | 不验证软件包依赖                         |
| `--prefix=<dir>`               | 指定安装路径                     |
| --test                         | 不真正安装，只是判断下是否能安装                 |
| `-U, --upgrade=<packagefile>+` | 升级软件包                            |
| -v, --verbose                  | 提供更多的详细信息输出                      |
| --replacepkgs                  | 如果软件包已经有了，重新安装软件包                |
| --replacefiles                 | 忽略软件包之间的冲突的文件                    |
| --force                        | 强制安装。不管是否已经安装，都重新安装。--replacepkgs --replacefiles 的缩写 |

### RPM 包的安装
安装 RPM 的命令格式为：
```
rpm -ivh 包全名
```
注意一定是包全名。

|      选项       |         含义        |
|:-------------:|:-----------------:|
| -i, --install |    安装    |
| -v, --verbose | 显示更详细的信息 |
|  -h, --hash   | 打印 #，显示安装进度 |

例如，使用此命令安装 apache 软件包：
```shell
[root@localhost ~]# rpm -ivh /usr/local/httpd-2.2.15-15.el6.centos.i686.rpm
Preparing...
####################
[100%]
1:httpd
####################
[100%]
```
注意，直到出现两个 100% 才是真正的安装成功，第一个 100% 仅表示完成了安装准备工作。

此命令还可以一次性安装多个软件包，将包全名用空格分开：
```shell
[root@localhost ~]# rpm -ivh a.rpm b.rpm c.rpm
```
服务安装完成后，可以尝试启动：
```shell
service 服务名 start|stop|restart|status
```
```shell
[root@localhost ~]# service httpd start #启动apache服务
```
服务启动后，可以查看端口号 80 是否出现。
```shell
[root@localhost ~]# netstat -tlun | grep 80
tcp 0 0 :::80:::* LISTEN
```
也可以在浏览器中输入 Linux 服务器的 IP 地址，访问这个`apache`服务器。
### RPM包的升级
使用如下命令即可实现 RPM 包的升级：
```shell
rpm -Uvh 包全名
```
`-U`（大写）：如果该软件没安装过则直接安装；若已经安装则升级至最新版本。
```shell
rpm -Fvh 包全名
```
`-F`（大写）：如果该软件没有安装，则不会安装，必须安装有较低版本才能升级。
### RPM包的卸载
RPM 软件包的卸载要考虑包之间的依赖性。例如，我们先安装的`httpd`软件包，后安装`httpd`的功能模块`mod_ssl`包，那么在卸载时，就必须先卸载`mod_ssl`，然后卸载`httpd`，否则会报错。

如果卸载 RPM 软件不考虑依赖性，执行卸载命令会包依赖性错误，例如：
```shell
[root@localhost ~]# rpm -e httpd
error: Failed dependencies:
httpd-mmn = 20051115 is needed by (installed) mod_wsgi-3.2-1.el6.i686
httpd-mmn = 20051115 is needed by (installed) php-5.3.3-3.el6_2.8.i686
httpd-mmn = 20051115 is needed by (installed) mod_ssl-1:2.2.15-15.el6.
centos.1.i686
httpd-mmn = 20051115 is needed by (installed) mod_perl-2.0.4-10.el6.i686
httpd = 2.2.15-15.el6.centos.1 is needed by (installed) httpd-manual-2.2.
15-15.el6.centos.1 .noarch
httpd is needed by (installed) webalizer-2.21_02-3.3.el6.i686
httpd is needed by (installed) mod_ssl-1:2.2.15-15.el6.centos.1.i686
httpd=0:2.2.15-15.el6.centos.1 is needed by(installed)mod_ssl-1:2.2.15-15.el6.centos.1.i686
```
RPM 软件包的卸载命令：
```shell
rpm -e 包名
```
`-e`选项表示卸载，也就是`erase`的首字母。

RPM 软件包的卸载命令支持使用`--nocteps`选项，即可以不检测依赖性直接卸载，但此方式不推荐使用，因为此操作很可能导致其他软件也无法正常使用。
## rpm命令查询软件包
`rpm`命令还可用来对 RPM 软件包做查询操作，具体包括：
* 查询软件包是否已安装
* 查询系统中所有已安装的软件包
* 查看软件包的详细信息
* 查询软件包的文件列表
* 查询某系统文件具体属于哪个 RPM 包

使用rpm`做查询命令的格式：
```shell
rpm 选项 查询对象
```
### rpm -q：查询软件包是否安装
```
rpm -q 包名
```
`-q`表示查询，是`query`的首字母。

查看 Linux 系统中是否安装 apache：
```shell
[root@localhost ~]# rpm -q httpd
httpd-2.2.15-15.el6.centos.1.i686
```
这里使用的是包名，而不是包全名。因为已安装的软件包只需给出包名，系统就可以成功识别（使用包全名反而无法识别）。
### rpm -qa：查询系统中所有安装的软件包
这里还可以使用管道符查找出需要的内容：
```shell
[root@localhost ~]# rpm -qa | grep httpd
httpd-devel-2.2.15-15.el6.centos.1.i686
httpd-tools-2.2.15-15.el6.centos.1.i686
httpd-manual-2.2.15-15.el6.centos.1.noarch
httpd-2.2.15-15.el6.centos.1.i686
```
相比`rpm -q`包名命令，采用这种方式可以找到含有包名的所有软件包。
### rpm -qi：查询软件包的详细信息
`-i`选项表示查询软件信息，是`information`的首字母。
```shell
[root@localhost ~]# rpm -qi httpd
Name : httpd Relocations:(not relocatable)
#包名
Version : 2.2.15 Vendor:CentOS
#版本和厂商
Release : 15.el6.centos.1 Build Date: 2012年02月14日星期二 06时27分1秒
#发行版本和建立时间
Install Date: 2013年01月07日星期一19时22分43秒
Build Host:
c6b18n2.bsys.dev.centos.org
#安装时间
Group : System Environment/Daemons Source RPM:
httpd-2.2.15-15.el6.centos.1.src.rpm
#组和源RPM包文件名
Size : 2896132 License: ASL 2.0
#软件包大小和许可协议
Signature :RSA/SHA1,2012年02月14日星期二 19时11分00秒，Key ID
0946fca2c105b9de
#数字签名
Packager：CentOS BuildSystem <http://bugs.centos.org>
URL : http://httpd.apache.org/
#厂商网址
Summary : Apache HTTP Server
#软件包说明
Description:
The Apache HTTP Server is a powerful, efficient, and extensible web server.
#描述
```
除此之外，还可以查询未安装软件包的详细信息：
```
rpm -qip 包全名
```
`-p`选项表示查询未安装的软件包，是`package`的首字母。

注意，这里用的是包全名，且未安装的软件包需使用“绝对路径+包全名”的方式才能确定包。
### rpm -ql：查询软件包的文件列表
`rpm`软件包通常采用默认路径安装，各安装文件会分门别类安放在适当的目录文件下。使用`rpm`命令可以查询到已安装软件包中包含的所有文件及各自安装路径：
```
rpm -ql 包名
```
`-l`选项表示列出软件包所有文件的安装目录。
```shell
[root@localhost ~]# rpm -ql httpd
/etc/httpd
/etc/httpd/conf
/etc/httpd/conf.d
/etc/httpd/conf.d/README
/etc/httpd/conf.d/welcome.conf
/etc/httpd/conf/httpd.conf
/etc/httpd/conf/magic
…省略部分输出…
```
同时，`rpm`命令还可以查询未安装软件包中包含的所有文件以及打算安装的路径：
```
rpm -qlp 包全名
```
`-p`选项表示查询未安装的软件包信息，是`package`的首字母。

注意，由于软件包还未安装，因此需要使用“绝对路径+包全名”的方式才能确定包。

比如，我们想查看 bing 软件包（未安装，绝对路径为：`/mnt/cdrom/Packages/bind-9.8.2-0.10.rc1.el6.i686.rpm`）中的所有文件及各自打算安装的位置，可以执行如下命令：
```shell
[root@localhost ~]# rpm -qlp /mnt/cdrom/Packages/bind-9.8.2-0.10.rc1.el6.i686.rpm
/etc/NetworkManager/dispatcher.d/13-named
/etc/logrotate.d/named
/etc/named
/etc/named.conf
/etc/named.iscdlv.key
/etc/named.rfc1912.zones
…省略部分输出…
```
### rpm -qf：查询系统文件属于哪个RPM包
`rpm -ql`命令是通过软件包查询所含文件的安装路径，`rpm`还支持反向查询，即查询某系统文件所属哪个 RPM 软件包。
```
rpm -qf 系统文件名
```
`-f`选项的含义是查询系统文件所属哪个软件包，是`file`的首字母。

注意，只有使用 RPM 包安装的文件才能使用该命令，手动方式建立的文件无法使用此命令。
```shell
[root@localhost ~]# rpm -qf /bin/ls
coreutils-8.4-19.el6.i686
```
### rpm -qR：查询软件包的依赖关系
使用`rpm`命令安装 RPM 包，需考虑与其他 RPM 包的依赖关系。`rpm -qR`命令就用来查询某已安装软件包依赖的其他包。
```
rpm -qR 包名
```
`-R`（大写）选项的含义是查询软件包的依赖性，是`requires`的首字母。
```shell
[root@localhost ~]# rpm -qR httpd
/bin/bash
/bin/sh
/etc/mime.types
/usr/sbin/useradd
apr-util-ldap
chkconfig
config(httpd) = 2.2.15-15.el6.centos.1
httpd-tods = 2.2.15-15.el6.centos.1
initscripts >= 8.36
…省略部分输出…
```
同样，在此命令的基础上增加`-p`选项，即可实现查找未安装软件包的依赖性。

例如，`bind`软件包尚未安装（绝对路径为：`/mnt/cdrom/Packages/bind-9.8.2-0.10.rc1.el6.i686.rpm`），查看此软件包的依赖性可执行如下命令：
```shell
[root@localhost ~]# rpm -qRp /mnt/cdrom/Packages/bind-9.8.2-0.10.rc1.el6.i686.rpm
/bin/bash
/bin/sh
bind-libs = 32:9.8.2-0.10.rc1.el6
chkconfig
chkconfig
config(bind) = 32:9.8.2-0.10.rc1.el6
grep
libbind9.so.80
libc.so.6
libc.so.6(GLIBC_2.0)
libc.so.6(GLIBC_2.1)
…省略部分输出…
```
注意，这里使用的也是“绝对路径+包全名”的方式。
## yum
`yum(Yellow dog Updater, Modified)`，是一个专门为了解决包的依赖关系而存在的软件包管理器。

可以这么说，`yum`是改进型的 RPM 软件管理器，它很好的解决了 RPM 所面临的软件包依赖问题。`yum`在服务器端存有所有的 RPM 包，并将各个包之间的依赖关系记录在文件中，当使用`yum`安装 RPM 包时，`yum`会先从服务器端下载包的依赖性文件，通过分析此文件从服务器端一次性下载所有相关的 RPM 包并进行安装。

`yum`软件可以用`rpm`命令安装，安装之前可以通过如下命令查看`yum`是否已安装：
```shell
[root@localhost ~]# rpm -qa | grep yum
yum-3.2.29-30.el6.centos.noarch
```
可以看到，系统上已经安装了`yum`。

使用`yum`安装软件包之前，需指定好`yum`下载 RPM 包的位置，此位置称为`yum`源。换句话说，`yum`源指的就是软件安装包的来源。

使用`yum`安装软件时至少需要一个`yum`源。`yum`源既可以使用网络`yum`源，也可以将本地光盘作为`yum`源。
### yum源
一般情况下，只要你的主机网络正常，可以直接使用网络`yum`源，不需要对配置文件做任何修改。

网络`yum`源配置文件位于`/etc/yum.repos.d/`目录下，文件扩展名为`*.repo`（只要扩展名为`*.repo`的文件都是`yum`源的配置文件）。
```shell
[root@localhost ~]# ls /etc/yum.repos.d/
CentOS-Base.repo
CentOS-Epel.repo
docker-ce.repo
```
通常情况下`CentOS-Base.repo`文件生效。我们可以尝试打开此文件：
```shell
[root@localhost yum.repos.d]# vim /etc/yum.repos.d/CentOS-Base.repo
[extras]
gpgcheck=1
gpgkey=http://mirrors.tencentyun.com/centos/RPM-GPG-KEY-CentOS-7
enabled=1
baseurl=http://mirrors.tencentyun.com/centos/$releasever/extras/$basearch/
name=Qcloud centos extras - $basearch
[os]
gpgcheck=1
gpgkey=http://mirrors.tencentyun.com/centos/RPM-GPG-KEY-CentOS-7
enabled=1
baseurl=http://mirrors.tencentyun.com/centos/$releasever/os/$basearch/
name=Qcloud centos os - $basearch
[updates]
gpgcheck=1
gpgkey=http://mirrors.tencentyun.com/centos/RPM-GPG-KEY-CentOS-7
enabled=1
baseurl=http://mirrors.tencentyun.com/centos/$releasever/updates/$basearch/
```
此文件中含有 3 个`yum`源容器，`extras`容器中各参数的含义：
* `[extras]`：容器名称，一定要放在`[]`中。
* `name`：容器说明，可以随便写
* `baseurl`：我们的`yum`源服务器的地址。默认是 CentOS 官方的`yum`源服务器。如果你觉得慢，则可以改成你喜欢的`yum`源地址
* `enabled`：此容器是否生效，如果不写或写成`enabled=1`则表示此容器生效，写成`enable=0`则表示此容器不生效
* `gpgcheck`：1 则表示 RPM 的数字证书生效；0 则表示 RPM 的数字证书不生效
* `gpgkey`：数字证书的公钥文件保存位置。不用修改

#### 使用阿里yum源
```shell
[root@localhost yum.repos.d]# cd /etc/yum.repos.d/
# 备份本地源文件
[root@localhost yum.repos.d]# mv CentOS-Base.repo CentOS-Base.repo.bak
# 下载阿里云源文件
[root@localhost yum.repos.d]# curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# 清理yum缓存
[root@localhost yum.repos.d]# yum clean all
# 重新建立缓存，让新yum源生效
[root@localhost yum.repos.d]# yum makecache
```
#### epel
很多时候，我们安装完了 linux 系统之后，一般都会把`yum`源改成国内阿里云。但是世界上的软件这么多，阿里云或者`yum`源官方公司不可能去把所有的软件都收集起来，让你们去通过`yum install`一键安装，所以 Fedora 社区就搞了个额外软件库，就是`EPEL(Extra Packages for Enterprise Linux)`。

EPEL，一个非官方的第三方软件库，用于补充主流Linux发行版如CentOS的yum源，特别在安装小众软件时提供丰富资源。通过EPEL，用户可以方便地安装大部分软件，即使在主流源中找不到也能在EPEL仓库找到解决方案。。装上了 EPEL 之后，就相当于添加了一个第三方源。

```shell
[root@localhost yum.repos.d]# yum install -y epel-release
[root@localhost yum.repos.d]# ls
CentOS-Base.repo  CentOS-Epel.repo  docker-ce.repo  epel.repo  epel-testing.repo
```
### yum命令

| 命令        | 说明               |
|-----------|------------------|
| clean     | 删除缓存数据           |
| erase     | 删除一个或多个软件包       |
| info      | 显示关于软件包或组的详细信息   |
| install   | 安装一个或多个软件包       |
| list      | 列出一个或一组软件包       |
| makecache | 创建元数据缓存          |
| reinstall | 覆盖安装软件包          |
| repolist  | 显示已配置的源          |
| search    | 在软件包详细信息中搜索指定字符串 |
| update    | 更新系统中的一个或多个软件包   |

`yum`命令参数：

| 参数                | 说明                                      |
|-------------------|-----------------------------------------|
| --downloadonly    | 仅下载                                     |
| --downloaddir=DIR | 指定下载目录                                  |
| -y, --assumeyes   | 回答全部问题为是，如果不加`-y`，那么每个安装的软件都需要手工回答`yes` |
| -v, --verbose | 详尽的操作过程 |

#### yum查询命令
查询操作常用命令：
* `yum list`：查询所有已安装和可安装的软件包
* `yum list 包名`：查询执行软件包的安装情况
* `yum search 关键字`：从`yum`源服务器上查找与关键字相关的所有软件包
* `yum info 包名`：显示关于软件包或组的详细信息

```shell
[root@localhost yum.repos.d]# yum info samba
#查询samba软件包的信息
Available Packages <-没有安装
Name : samba <-包名
Arch : i686 <-适合的硬件平台
Version : 3.5.10 <―版本
Release : 125.el6 <—发布版本
Size : 4.9M <—大小
Repo : c6-media <-在光盘上
…省略部分输出…
```
#### yum 安装命令
```shell
yum -y install 包名
```

```shell
#使用yum自动安装gcc
[root@localhost yum jepos.d]# yum -y install gcc
```
#### yum 升级命令
使用`yum`升级软件包，需确保`yum`源服务器中软件包的版本比本机安装的软件包版本高。

`yum`升级软件包命令：
* `yum -y update`：升级所有软件包。不过考虑到服务器强调稳定性，因此该命令并不常用
* `yum -y update 包名`：升级特定的软件包

#### yum 卸载命令
使用`yum`卸载软件包时，会同时卸载所有与该包有依赖关系的其他软件包，即便有依赖包属于系统运行必备文件，也会被`yum`无情卸载，带来的直接后果就是使系统崩溃。

除非你能确定卸载此包以及它的所有依赖包不会对系统产生影响，否则不要使用`yum`卸载软件包。
```shell
#卸载指定的软件包
yum remove 包名 [-y]
```
## 源码包安装和卸载
Linux 系统中，绝大多数软件的源代码都是用 C 语言编写的，少部分用 C++（或其他语言）编写。因此要想安装源码包，必须安装`gcc`编译器（如果涉及 C++ 源码程序，还需要安装`gcc-c++`）。

安装`gcc`之前，可先使用如下命令看看是否已经安装：
```shell
[root@localhost ~]# rpm -q gcc
gcc-4.4.6-4.el6.i686
```
如果未安装，考虑到安装`gcc`所依赖的软件包太多，推荐使用`yum`安装`gcc`。

除了安装编译器，还需要安装`make`编译命令。要知道，编译源码包可不像编译一个`hello.c`文件那样轻松，包中含大量的源码文件，且文件之间有着非常复杂的关联，直接决定着各文件编译的先后顺序，因此手动编译费时费力，而使用`make`命令可以完成对源码包的自动编译。

同样，在安装`make`命令之前，可使用如下命令查看其是否已经安装：
```shell
[root@localhost yum. repos.d]# rpm -q make
make-3.81-20.el6.i686
```
如果未安装，可使用`yum -y install make`命令直接安装`make`。
### Linux源码包安装软件
以安装`apache`为例，安装过程分为如下几步：
1. 下载`apache`源码包。源码包可通过[官方网站](http://httpd.apache.org/download.cgi)下载
Linux 系统中用于保存源代码的位置主要有 2 个，分别是`/usr/src`和`/usr/local/src`，其中`/usr/src`用来保存内核源代码，`/usr/local/src`用来保存用户下载的源代码。
2. 将源码包进行解压缩
```shell
[root@localhost ~]# tar -zxvf httpd-2.2.9.tar.gz|more
```
3. 进入解压目录
```shell
[root@localhost ~]# ls
anaconda-ks.cfg httpd-2.2.9 httpd-2.2.9.tar.gz install.log install.log.syslog
[root@localhost ~]# cd httpd-2.2.9
```
4. `./configure`软件配置与检查
通过`./configure --prefix=安装路径`可以指定安装路径。注意，`configure`不是系统命令，而是源码包软件自带的一个脚本程序，所以必须采用`./configure`方式执行。
```shell
[root@localhost httpd-2.2.9]# ./configure --prefix=/usr/local/apache2
checking for chosen layout...Apache
checking for working mkdir -p…yes
checking build system type...i686-pc-linux-gnu
checking host system type...i686-pc-linux-gnu
checking target system typa...i686-pc-linux-gnu
…省略部分输出…
```
`--prefix`选项的含义为指定安装目录。

此命令没有加载其他功能，只是指定安装目录。需要说明的是，`/usr/local/apache2`目录不需要手工建立，安装完成后会自动建立（这个目录是否生成也是检测软件是否正确安装的重要标志）。

5. `make`编译。`make`会调用`gcc`编译器，并读取`Makefile`文件中的信息进行系统软件编译。编译的目的就是把源码程序转变为能被 Linux 识别的可执行文件，这些可执行文件保存在当前目录下。
```shell
[root@localhost httpd-2.2.9]# make
```
6. 正式开始安装软件，这里通常会写清程序的安装位置，如果没有，建议把安装的执行过程保存下来，以备将来删除软件时使用。
```shell
[root@localhost httpd-2.2.9]# make install
```
整个过程不报错，即为安装成功。

安装源码包过程中，如果出现`error`（或`warning`）且安装过程停止，表示安装失败；反之，如果仅出现警告信息，但安装过程还在继续，这并不是安装失败，顶多使软件部分功能无法使用。
:::tip
如果在`./configure`或`make`编译中报错，则在重新执行命令前一定要执行`make clean`命令，它会清空`Makefile`文件或编译产生的`.o`头文件。
:::
### Linux源码包卸载
通过源码包方式安装的各个软件，其安装文件独自保存在`/usr/local/`目录下的各子目录中。例如，`apache`所有的安装文件都保存在`/usr/local/apache2`目录下。

源码包的卸载，只需要找到软件的安装位置，直接删除所在目录即可，不会遗留任何垃圾文件。需要注意的是，在删除软件之前，应先将软件停止服务。

以删除`apache`为例，只需关闭`apache`服务后执行如下命令即可：
```shell
[root@localhost ~]# rm -rf /usr/local/apache2/
```
