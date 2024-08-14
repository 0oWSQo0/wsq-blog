---
title: Docker基础
date: 2024-01-05
tags: Docker
categories: linux
order: 1
---

## Docker 架构
Docker 使用 C/S 架构模式，使用远程 API 来管理和创建 Docker 容器。
* Docker 客户端(`Client`)：Docker 客户端通过命令行或者其他工具使用 [Docker SDK](https://docs.docker.com/develop/sdk/) 与 Docker 的守护进程通信。
* Docker 主机(`Host`)：一个物理或者虚拟的机器用于执行 Docker 守护进程和容器。

Docker 包括三个基本概念：
* 镜像（`Image`）：镜像就相当于是一个`root`文件系统。比如官方镜像`ubuntu:22.04`就包含了完整的一套`Ubuntu22.04`最小系统的`root`文件系统。
* 容器（`Container`）：镜像和容器的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
* 仓库（`Repository`）：仓库可看成一个代码控制中心，用来保存镜像。

![Docker 架构](Docker基础/docker-architecture.svg)
## Docker 安装
::: warning
从 2017 年 3 月开始 Docker 分为两个分支版本: DockerCE（社区免费版）和 DockerEE（企业版）；DockerEE 强调安全，但需付费使用；这里将展示在 CentOS 上安装 Docker。
:::
### 卸载老的Docker及依赖

::: info 为什么要删除较低的 Docker 安装？
因为旧版本的 Docker 被称为 docker 或 docker-engine（它是一个简化 Docker 安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装 Docker，比如 VirtualBox）
:::

```shell
yum remove docker \
            docker-client \
            docker-client-latest \
            docker-common \
            docker-latest \
            docker-latest-logrotate \
            docker-logrotate \
            docker-engine
```
### 安装前准备
```shell
# yum-utils 提供 yum-config-manager 类库
yum install -y yum-utils
# 设置稳定版本的库
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
### 安装Docker CE
```shell
[root@localhost ~]# yum install -y docker-ce
# 安装完之后启动
[root@localhost ~]# systemctl start docker
# 测试是否安装成功
[root@localhost ~]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: active (running) since Mon 2020-02-17 13:57:45 CST; 39s ago
     Docs: https://docs.docker.com
 Main PID: 26029 (dockerd)
    Tasks: 8
   Memory: 36.9M
   CGroup: /system.slice/docker.service
           └─26029 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd
```
## 仓库配置
Docker 安装好以后，我们就要开始为拉取镜像准备了；国内从 DockerHub 拉取镜像有时会特别慢，此时可以配置镜像加速器。

Docker 官方和国内很多云服务商都提供了国内加速器服务：
* [阿里云的加速器](https://help.aliyun.com/document_detail/60750.html)
* [网易加速器](http://hub-mirror.c.163.com)
* [Docker官方中国加速器](https://registry.docker-cn.com)
* [ustc 的镜像](https://docker.mirrors.ustc.edu.cn)

对于使用`systemd`的系统，请在`/etc/docker/daemon.json`中写入如下内容（如果文件不存在请新建该文件）
```json
{"registry-mirrors":["https://registry.docker-cn.com"]}
```
之后重新启动服务
```shell
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl restart docker
```
## Docker 镜像
当运行容器时，使用的镜像如果在本地中不存在，Docker 就会自动从 Docker 镜像仓库中下载，默认是从 DockerHub 公共镜像源下载。
### 镜像列表
列出本地主机上的镜像，可以使用`docker image ls`或`docker images`。
```shell
[root@localhost ~]# docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              ccc6e87d482b        4 weeks ago         64.2MB
hello-world         latest              fce289e99eb9        13 months ago       1.84kB
```
选项说明:
* `REPOSITORY`：表示镜像的仓库源
* `TAG`：镜像的标签，同一仓库源可以有多个`TAG`，代表这个仓库源的不同个版本
* `IMAGE ID`：镜像 ID，是镜像的唯一标识
* `CREATED`：镜像创建时间
* `SIZE`：镜像大小

### 查找镜像
以查找 MySQL 的镜像为例：
* 通过 [DockerHub](https://hub.docker.com/search?q=mysql&type=image) 查找
* 使用`docker search`命令来查找官方仓库中的镜像

```bash
docker search [OPTIONS] 镜像名称
```
`OPTIONS`：

::: center
| 参数         | 描述 |
| :--: | :--: |
| --filter, -f | 根据指定条件过滤结果 |
| --limit	     | 搜索结果的最大条数 |
| --no-trunc	 | 不截断输出，显示完整的输出 |
:::

```bash
[root@localhost ~]# docker search mysql
NAME                                    DESCRIPTION                                     STARS     OFFICIAL
mysql                                   MySQL is a widely used, open-source relation…   15262     [OK]
mariadb                                 MariaDB Server is a high performing open sou…   5805      [OK]
percona                                 Percona Server is a fork of the MySQL relati…   630       [OK]
phpmyadmin                              phpMyAdmin - A web interface for MySQL and M…   1011      [OK]
bitnami/mysql                           Bitnami container image for MySQL               114       
circleci/mysql                          MySQL is a widely used, open-source relation…   30        
cimg/mysql                                                                              3         
bitnami/mysqld-exporter                 Bitnami container image for MySQL Server Exp…   7         
airbyte/source-mysql                                                                    0         
bitnamicharts/mysql                                                                     0         
ubuntu/mysql                            MySQL open source fast, stable, multi-thread…   64        
rapidfort/mysql                         RapidFort optimized, hardened image for MySQL   25        
airbyte/normalization-mysql                                                             0         
percona/percona-server-mysql-operator                                                   0         
hashicorp/mysql-portworx-demo                                                           0         
elestio/mysql                           Mysql, verified and packaged by Elestio         0         
airbyte/destination-mysql                                                               0         
airbyte/source-mysql-strict-encrypt                                                     0         
newrelic/k8s-nri-mysql                  New Relic Infrastructure MySQL Integration (…   0         
percona/proxysql                        High-performance MySQL proxy with a GPL lice…   26        
rapidfort/mysql8-ib                     RapidFort optimized, hardened image for MySQ…   9         
google/mysql                            MySQL server for Google Compute Engine          25        
bitnami/percona-mysql                   Bitnami container image for Percona MySQL       0         
rapidfort/mysql-official                RapidFort optimized, hardened image for MySQ…   9         
percona/proxysql2                       High-performance MySQL proxy with a GPL lice…   5         
```
选项说明：
* `NAME`：镜像仓库源的名称
* `DESCRIPTION`：镜像描述
* `OFFICIAL`：是否是 Docker 官方发布
* `STARS`：点赞数

根据是否是官方提供，可将镜像分为两类：
* 一种是基础镜像或根镜像。这些基础镜像由 Docker 公司创建、验证、支持、提供。这样的镜像往往使用单个单词作为名字。
* 还有一种类型，比如`bitnami/mysql`镜像，它是由 DockerHub 的注册用户创建并维护的，往往带有用户名称前缀。可以通过前缀`username/`来指定使用某个用户提供的镜像，比如`bitnami`用户。

### 拉取镜像
可以通过`docker pull`命令从 Docker 镜像仓库获取镜像。
```bash
docker pull [选项] [Docker 镜像仓库地址[:端口号]/]仓库名[:标签]
```
具体的选项可以通过`docker pull --help`命令看到。

镜像名称的格式：
* Docker 镜像仓库地址：地址的格式一般是`<域名/IP>[:端口号]`。默认地址是`DockerHub(docker.io)`。
* 仓库名：仓库名是两段式名称，即`<用户名>/<软件名>`。对于 DockerHub，如果不给出用户名，则默认为`library`，也就是官方镜像。

```shell
[root@localhost ~]# docker pull mysql
Using default tag: latest
latest: Pulling from library/mysql
d9a40b27c30f: Pull complete 
fe4b01031aab: Pull complete 
aa72c34c4347: Pull complete 
473ade985fa2: Pull complete 
cc168a9482de: Pull complete 
3ca3786815dd: Pull complete 
3e3fac98ea83: Pull complete 
10e5505c3ae4: Pull complete 
a79ade39aab9: Pull complete 
ae34d51c6da2: Pull complete 
Digest: sha256:d8df069848906979fd7511db00dc22efeb0a33a990d87c3c6d3fcdafd6fc6123
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
mysql        latest    7ce93a845a8a   9 days ago   586MB
```
`docker pull`命令的输出结果最后一行给出了镜像的完整名称，即：`docker.io/library/centos:7`。
### 删除镜像
删除本地的镜像，可以使用`docker image rm`或`docker rmi`。
```
docker image rm [选项] <镜像1> [<镜像2> ...]
//或 docker rmi [选项] <镜像1> [<镜像2> ...]
```
```shell
[root@localhost ~]# docker image rm mysql
Untagged: mysql:latest
Untagged: mysql@sha256:d8df069848906979fd7511db00dc22efeb0a33a990d87c3c6d3fcdafd6fc6123
Deleted: sha256:7ce93a845a8a98c89bd58a5e45fe71277ca5f52177c88046858a6a0af969ba74
Deleted: sha256:5f272bb3ff021589961b41dfd52486837f2bf55b257ecae518ca58f49f7cd05c
Deleted: sha256:3c053c0c18b0a01fe38376222040192bc70333fd033fdc0dc8982221b8e28094
Deleted: sha256:027b6d1a4884ded3bcd7d3e045501fe77670aa24c55bca0c6cfd32915b2ec0c6
Deleted: sha256:b18d8cac7e324a500bc7da81a37ab8249282ba61dbdeba8595f7b3893a5abfe7
Deleted: sha256:cae0e6c244b3ef3dabdc2e80148c6d816502887a27cdf6c8b9555c9cfecc170d
Deleted: sha256:86f178c90fd041f1b20a9e342ad6af31a0db1b22094c16eae4d1ea3c07a09314
Deleted: sha256:05b2d940624b43f8a3ed710dcaba6bc5427d6ce2853588eddc49f833cce80e2a
Deleted: sha256:9d9ac1b7ddb58fe8de72181da67b1f3d0b2a197f8e4f8fe42af7e108f576fd83
Deleted: sha256:02b4320329b9e205e7090059e0ac630d97395708803d3793f4628f8ecb926294
Deleted: sha256:2606c15a4838dfb909dab29f47c601a797f657f51a35005bd06d01da891d813c
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```
### 更新镜像
针对`ubuntu`的镜像，我们能否在里面安装一些软件，然后重新生成一个镜像呢？这就是重新`commit`出一个新的镜像。
```shell
[root@localhost ~]# docker run -it ubuntu
root@ba07a44eadc7:/# apt-get update
Get:1 http://archive.ubuntu.com/ubuntu noble InRelease [256 kB]
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Get:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
Get:4 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [325 kB]
Get:5 http://archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
Get:6 http://archive.ubuntu.com/ubuntu noble/main amd64 Packages [1808 kB]
Get:7 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 Packages [12.7 kB]
Get:8 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [261 kB]
Get:9 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [325 kB]
Get:10 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages [19.3 MB
Get:11 http://archive.ubuntu.com/ubuntu noble/restricted amd64 Packages [117 kB]
Get:12 http://archive.ubuntu.com/ubuntu noble/multiverse amd64 Packages [331 kB]
Get:13 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Packages [261 kB]
Get:14 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Packages [413 kB]
Get:15 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Packages [16.9 kB]
Get:16 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages [385 kB]
Get:17 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 Packages [11.5 kB]
Fetched 24.2 MB in 8s (2933 kB/s) 
Reading package lists... Done
root@ba07a44eadc7:/# exit
exit
```
此时 ID 为`ba07a44eadc7`的容器，是按我们的需求更改的容器。我们可以通过命令`docker commit`来提交容器副本：
```shell
[root@localhost ~]# docker commit -m="update test" -a="wsq" ba07a44eadc7 wsq/ubuntu:v1.0.1
sha256:4f356e7122415dbb4e595a61f1b8cc14c135c7d443ba13c54ef3c250904755e2
```
可以看到已经生成成功, 且镜像的大小不一样了：
```shell
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
wsq/ubuntu   v1.0.1    4f356e712241   24 seconds ago   117MB
ubuntu       latest    35a88802559d   7 weeks ago      78.1MB
```
### 生成镜像
如果是生成一个全新的镜像，可以使用命令`docker build`，通过创建一个`Dockerfile`文件，其中包含一组指令来告诉 Docker 如何构建我们的镜像。
```dockerfile
FROM    wsq/ubuntu:v1.0.1

RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd wsq
RUN     /bin/echo 'wsq:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D
```
稍微解释下：
* 每一个指令都会在镜像上创建一个新的层，每一个指令的前缀都必须是大写的
* `FROM`指令，指定使用哪个镜像源
* `RUN`指令告诉 Docker 在镜像内执行命令
* 我们使用`Dockerfile`文件，通过`docker build`命令来构建一个镜像

接下来生成镜像：
```shell
[root@localhost docker-test]# docker build -t wsq/ubuntu:v2.0.1 .
[+] Building 1.3s (9/9) FINISHED                                                                                 docker:default
 => [internal] load build definition from Dockerfile                                                                       0.0s
 => => transferring dockerfile: 258B                                                                                       0.0s
 => [internal] load metadata for docker.io/wsq/ubuntu:v1.0.1                                                               0.0s
 => [internal] load .dockerignore                                                                                          0.0s
 => => transferring context: 2B                                                                                            0.0s
 => [1/5] FROM docker.io/wsq/ubuntu:v1.0.1                                                                                 0.0s
 => [2/5] RUN /bin/echo 'root:123456' | chpasswd                                                                           0.3s
 => [3/5] RUN useradd wsq                                                                                                  0.3s
 => [4/5] RUN /bin/echo 'wsq:123456' | chpasswd                                                                            0.2s
 => [5/5] RUN /bin/echo -e "LANG="en_US.UTF-8"" >/etc/default/local                                                        0.2s
 => exporting to image                                                                                                     0.1s
 => => exporting layers                                                                                                    0.1s
 => => writing image sha256:983aeebc0909b860e1b0fd4137a9558a3c193960edd667652341c3495d707324                               0.0s
 => => naming to docker.io/wsq/ubuntu:v2.0.1
```
参数说明：
* `-t`：指定要创建的目标镜像名
* `.`：`Dockerfile`文件所在目录，可以指定`Dockerfile`的绝对路径

使用`docker images`查看创建的镜像已经在列表中存在。
```shell
[root@localhost docker-test]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
wsq/ubuntu   v2.0.1    983aeebc0909   19 seconds ago   117MB
wsq/ubuntu   v1.0.1    4f356e712241   15 minutes ago   117MB
ubuntu       latest    35a88802559d   7 weeks ago      78.1MB
```
我们可以使用新的镜像来创建容器
```shell
[root@localhost docker-test]# docker run -it wsq/ubuntu:v2.0.1 /bin/bash
root@f5332ebce695:/# id wsq
uid=1000(wsq) gid=1000(wsq) groups=1000(wsq)
root@f5332ebce695:/# exit
exit
```
从上面看到新镜像已经包含我们创建的用户 wsq。
### 镜像标签
`docker tag`命令，为镜像添加一个新的标签。
```shell
[root@localhost ~]# docker tag 983aeebc0909 wsq/ubuntu:v3.0.1
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
wsq/ubuntu   v2.0.1    983aeebc0909   9 minutes ago    117MB
wsq/ubuntu   v3.0.1    983aeebc0909   9 minutes ago    117MB
wsq/ubuntu   v1.0.1    4f356e712241   25 minutes ago   117MB
ubuntu       latest    35a88802559d   7 weeks ago      78.1MB
```
### 镜像导出和导入
区别于容器的导出和导入。

镜像导出
```shell
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
wsq/ubuntu   v2.0.1    983aeebc0909   9 minutes ago    117MB
wsq/ubuntu   v3.0.1    983aeebc0909   9 minutes ago    117MB
wsq/ubuntu   v1.0.1    4f356e712241   25 minutes ago   117MB
ubuntu       latest    35a88802559d   7 weeks ago      78.1MB
[root@localhost ~]# docker save > wsq-ubuntu-v2.0.2.tar 983aeebc0909
[root@localhost ~]# ll | grep wsq-u
-rw-rw-r-- 1 root root 93898240 Jun  4 09:06 wsq-ubuntu-v2.0.2.tar
```
镜像导入
```
docker load < wsq-ubuntu-v2.0.2.tar
```
其中`-i`或者`<`表示从文件输入。会成功导入镜像及相关元数据，包括`tag`信息。

可以依据具体使用场景来选择命令：
* 若是只想备份`images`，使用`save、load`即可
* 若是在启动容器后，容器内容有变化，需要备份，则使用`export、import`

## Docker 容器
### 容器启动
启动容器有两种方式：
* 基于镜像新建一个容器并启动
* 将在终止状态（`exited`）的容器重新启动。

#### 新建并启动
使用的命令为`docker run`。

参数说明：
* `-i`：允许你对容器内的标准输入 (STDIN) 进行交互，`-it`可以连写的。
* `-t`：表示容器启动后会进入其命令行。加入这个参数后，容器创建就能登录进去。即分配一个伪终端。
* `--name`：为创建的容器命名。
* `-v`：表示目录映射关系（前者是宿主机目录，后者是映射到宿主机上的目录），可以使用多个`-v`做多个目录或文件映射。
* `-d`：创建一个守护式容器在后台运行（这样创建容器后不会自动进入容器，如果只加`-it`，创建后就会自动进入容器）。
* `-p`：表示端口映射，前者是宿主机端口，后者是容器内的映射端口。可以使用多个`-p`做多个端口映射

```shell
[root@localhost docker-test]# docker run -it wsq/ubuntu:v2.0.1 /bin/bash
root@f5332ebce695:/# id wsq
uid=1000(wsq) gid=1000(wsq) groups=1000(wsq)
root@f5332ebce695:/# exit
exit
```
当利用`docker run`来创建容器时，Docker 在后台运行的标准操作包括：
* 检查本地是否存在指定的镜像，不存在就从仓库下载
* 利用镜像创建并启动一个容器
* 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
* 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
* 从地址池配置一个`ip`地址给容器
* 执行用户指定的应用程序
* 执行完毕后容器被终止

以`-it`方式创建并启动容器，启动完成后，直接进入当前容器。使用`exit`命令退出容器。需要注意的是以此种方式启动容器，如果退出容器，则容器会进入停止状态。

以`-id`方式创建并启动容器，启动完成后，不会进入当前容器，会在后台运行容器。
#### 启动已终止容器
可以利用`docker container start 容器名/ID`或`docker start 容器名/ID`命令，直接将一个已经终止（`exited`）的容器启动运行。
### 容器查看
查看正在运行的容器：`docker ps`或`docker container ls`。查看所有容器：`docker ps -a`或`docker container ls -a`。
```shell
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE               COMMAND       CREATED              STATUS                       PORTS     NAMES
3fe0e9a9e0b2   wsq/ubuntu:v2.0.1   "/bin/bash"   About a minute ago   Exited (127) 3 seconds ago             distracted_bouman
ba07a44eadc7   ubuntu              "/bin/bash"   2 hours ago          Exited (0) 2 hours ago                 peaceful_curran
```
参数说明：
* `CONTAINER ID`: 容器 ID
* `IMAGE`: 使用的镜像
* `COMMAND`: 启动容器时运行的命令
* `CREATED`: 容器的创建时间
* `STATUS`: 容器状态(状态有7种)
  * `created`（已创建）
  * `restarting`（重启中）
  * `running`（运行中）
  * `removing`（迁移中）
  * `paused`（暂停）
  * `exited`（停止）
  * `dead`（死亡）
* `PORTS`: 容器的端口信息和使用的连接类型（`tcp\udp`）
* `NAMES`: 自动分配的容器名称

### 容器再启动
```shell
[root@localhost ~]# docker start ba07a44eadc7
ba07a44eadc7
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS         PORTS     NAMES
ba07a44eadc7   ubuntu    "/bin/bash"   2 hours ago   Up 2 seconds             peaceful_curran
```
### 容器停止和重启
可以使用`docker container stop 容器名/ID`或`docker stop 容器名称/ID`来终止一个运行中的容器。
```shell
[root@localhost ~]# docker stop ba07a44eadc7
ba07a44eadc7
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@localhost ~]# docker restart ba07a44eadc7
ba07a44eadc7
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE               COMMAND       CREATED         STATUS                       PORTS     NAMES
3fe0e9a9e0b2   wsq/ubuntu:v2.0.1   "/bin/bash"   5 minutes ago   Exited (127) 4 minutes ago             distracted_bouman
ba07a44eadc7   ubuntu              "/bin/bash"   2 hours ago     Up 4 seconds                           peaceful_curran
```
### 后台模式与进入
在使用`-d`参数时，容器启动后会进入后台，如何进入容器呢？

第一种：`docker attach`
```shell
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS         PORTS     NAMES
ba07a44eadc7   ubuntu    "/bin/bash"   2 hours ago   Up 5 minutes             peaceful_curran
[root@localhost ~]# docker attach ba07a44eadc7
root@ba07a44eadc7:/# echo 'wsq'
wsq
root@ba07a44eadc7:/# exit
exit
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS         PORTS     NAMES
```
使用`docker attach`进入后，`exit`便容器也停止了。

第二种：`docker exec`
```shell
[root@localhost ~]# docker exec -it ba07a44eadc7 /bin/bash
Error response from daemon: container ba07a44eadc73561429cb43ff05d0dc5b731a82827bdc655ff1ee99ab76e7b75 is not running
[root@localhost ~]# docker restart ba07a44eadc7
ba07a44eadc7
[root@localhost ~]# docker exec -it ba07a44eadc7 /bin/bash
root@ba07a44eadc7:/# exit
exit
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS         PORTS     NAMES
ba07a44eadc7   ubuntu    "/bin/bash"   2 hours ago   Up 4 seconds             peaceful_curran
```
注意：
* 我特意在容器停止状态下执行了`docker exec`，是让你看到`docker exec`是在容器启动状态下用的，且注意下错误信息；
* 推荐大家使用`docker exec`命令，因为此命令退出容器终端，不会导致容器的停止。

### 容器导出和导入
在生产环境中，很多时候是无法连接外网的，所以有时候需要用到容器的导入和导出。

容器的导出
```shell
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS          PORTS            NAMES
3fe0e9a9e0b2   wsq/ubuntu:v2.0.1   "/bin/bash"   16 minutes ago   Up 27 seconds   22/tcp, 80/tcp   distracted_bouman
[root@localhost ~]# docker export 3fe0e9a9e0b2 > ubuntu-wsq-v2.tar
[root@localhost ~]# ll
-rw-r--r-- 1 root root 119413760 Aug  1 14:04 ubuntu-wsq-v2.tar
```
同时你可以发现，导出容器的时候，容器无需关闭。

容器导入
```shell
[root@localhost ~]# docker import ubuntu-wsq-v2.tar wsq/ubuntu:v2.0.2
sha256:0bc3598a00b77996f60485d555dcdc428b63a3ec697b47a7bf374d5dbad51432
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
wsq/ununtu   v2.0.2    0bc3598a00b7   14 seconds ago   117MB
wsq/ubuntu   v2.0.1    983aeebc0909   2 hours ago      117MB
wsq/ubuntu   v3.0.1    983aeebc0909   2 hours ago      117MB
wsq/ubuntu   v1.0.1    4f356e712241   3 hours ago      117MB
ubuntu       latest    35a88802559d   7 weeks ago      78.1MB
```
### 删除容器
可以使用`docker container rm 容器名/ID`或`docker rm 容器名/ID`来删除一个处于终止状态的容器。

如果要删除一个运行中的容器，可以添加`-f`参数。
```shell
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS         PORTS            NAMES
3fe0e9a9e0b2   wsq/ubuntu:v2.0.1   "/bin/bash"   19 minutes ago   Up 3 minutes   22/tcp, 80/tcp   distracted_bouman
[root@localhost ~]# docker rm -f 3fe0e9a9e0b2
3fe0e9a9e0b2
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS                       PORTS     NAMES
ba07a44eadc7   ubuntu    "/bin/bash"   3 hours ago   Exited (137) 4 minutes ago             peaceful_curran
```
### 删除所有停止的容器
删除所有停止的容器: `docker container prune`
```shell
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS                       PORTS     NAMES
ba07a44eadc7   ubuntu    "/bin/bash"   3 hours ago   Exited (137) 4 minutes ago             peaceful_curran
[root@localhost ~]# docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
ba07a44eadc73561429cb43ff05d0dc5b731a82827bdc655ff1ee99ab76e7b75

Total reclaimed space: 38.83MB
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```
### 容器别名及操作
我们上述对容器的操作都是针对容器 ID，这个 ID 是随机的，能否添加一个`name`对我们自己设置的`name`操作呢？
```shell
[root@localhost ~]# docker run -itd --name wsq-ubuntu-202 wsq/ubuntu:v2.0.2 /bin/bash
572642db48bb5560778b0b1b75e97eb0a36073a61d2427271e4c77bf805ed8f5
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS          PORTS     NAMES
572642db48bb   wsq/ubuntu:v2.0.2   "/bin/bash"   12 seconds ago   Up 11 seconds             wsq-ubuntu-202
[root@localhost ~]# docker stop wsq-ubuntu-202
wsq-ubuntu-202
[root@localhost ~]# docker ps -a
CONTAINER ID   IMAGE               COMMAND       CREATED          STATUS                                PORTS     NAMES
572642db48bb   wsq/ubuntu:v2.0.2   "/bin/bash"   50 seconds ago   Exited (137) Less than a second ago             wsq-ubuntu-202 
```
### 容器错误日志
```
例：实时查看docker容器名为user-uat的最后10行日志
docker logs -f -t --tail 10 user-uat

例：查看指定时间后的日志，只显示最后100行：
docker logs -f -t --since="2018-02-08" --tail=100 user-uat

例：查看最近30分钟的日志:
docker logs --since 30m user-uat

例：查看某时间之后的日志：
docker logs -t --since="2018-02-08T13:23:37" user-uat

例：查看某时间段日志：
docker logs -t --since="2018-02-08T13:23:37" --until "2018-02-09T12:23:37" user-uat

例：将错误日志写入文件：
docker logs -f -t --since="2018-02-18" user-uat | grep error >> logs_error.txt
```
### 在容器外执行容器内命令
在宿主机内让容器执行命令可以使用`docker exec`。
```
docker exec centos ls
bin  boot  data  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```