---
title: Docker的数据卷
date: 2024-01-15
tags: Docker
categories: linux
order: 3
---



# 数据卷
数据卷的使用，类似于 Linux 下对目录或文件进行`mount`，镜像中的被指定为挂载点的目录中的文件会复制到数据卷中（仅数据卷为空时会复制）。

数据卷(`Data Volume`)是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性：
数据卷可以在容器之间共享和重用
对数据卷的修改会立马生效
对数据卷的更新，不会影响镜像
卷会一直存在，直到没有容器使用

## 创建一个数据卷
```bash
[root@localhost ~]# docker volume create my-vol
# 查看所有的数据卷
[root@localhost ~]# docker volume ls
​
DRIVER    VOLUME NAME
local     my-vol
```
在用`docker run`命令的时候，使用`-v`标记来创建一个数据卷并挂载到容器里。在一次`run`中多次使用可以挂载多个数据卷。

下面创建一个 web 容器，并加载一个数据卷到容器的`/webapp-data`目录。
```shell
[root@localhost ~]# docker run -d -P --name web -v /webapp-data training/webapp python app.py
e331e83e59486a131919cba8698b24eaee051a947838bb1c15c03df8b3464b97
```
我们看下容器内部是否生成`/webapp-data`目录
```shell
[root@localhost ~]# docker exec -it web /bin/bash
root@e331e83e5948:/opt/webapp# cd /webapp-data
root@e331e83e5948:/webapp-data# ll
total 8
drwxr-xr-x 2 root root 4096 Feb 20 01:24 ./
drwxr-xr-x 1 root root 4096 Feb 20 01:24 ../
root@e331e83e5948:/webapp-data#
```
注意：也可以在`Dockerfile`中使用`VOLUME`来添加一个或者多个新的卷到由该镜像创建的任意容器。
## 挂载一个主机目录作为数据卷
可以在创建容器的时候，将宿主机的目录与容器内的目录进行映射，这样我们就可以通过修改宿主机某个目录的文件从而去影响容器。

创建容器时使用`-v`也可以指定挂载一个本地主机的目录到容器中去，后边为宿主机目录:容器目录，例如：`docker run -di -v /usr/local/test:/usr/local/test --name=mycentos3 centos:7`。
```shell
[root@localhost ~]# docker rm -f web
web
[root@localhost opt]# docker run -d --name web -v /opt/webapp-data5:/opt/webapp2 training/webapp
fce27f6ea9ce9699864644a48aed6db8b772c96be36f46bee6154d2e2c9915b9
```
我们验证下：
```shell
[root@localhost opt]# docker exec -it web /bin/bash
root@fce27f6ea9ce:/opt/webapp# cd ..
root@fce27f6ea9ce:/opt# ls
webapp  webapp2
root@fce27f6ea9ce:/opt# cd webapp2
root@fce27f6ea9ce:/opt/webapp2# mkdir test
root@fce27f6ea9ce:/opt/webapp2# exit
exit
[root@localhost opt]# cd webapp-data5
[root@localhost webapp-data5]# ll
total 4
drwxr-xr-x 2 root root 4096 Feb 20 10:12 test
```
上面的命令加载主机的`/opt/webapp-data5`目录到容器的`/opt/webapp2`目录。这个功能在进行测试的时候十分方便，比如用户可以放置一些程序到本地目录中，来查看容器是否正常工作。本地目录的路径必须是绝对路径，如果目录不存在 Docker 会自动为你创建它。

> 注意：如果你共享的是多级的目录，可能会出现权限不足的提示。这是因为 CentOS7 中的安全模块 selinux 把权限禁掉了，需要添加参数`--privileged=true`来解决挂载的目录没有权限的问题。

注意：`Dockerfile`显然是不支持这种用法，这是因为`Dockerfile`是为了移植和分享用的, 因为不同操作系统的路径格式不一样，所以目前还不能支持。我们删除容器，看主机上数据是否会被删除
```shell
[root@localhost opt]# docker rm -f web
web
[root@localhost opt]# cd /opt/webapp-data5
[root@localhost webapp-data5]# ll
total 4
drwxr-xr-x 2 root root 4096 Feb 20 10:12 test
```
很明显，没有被删除
## 挂载一个本地主机文件作为数据卷
`-v`标记也可以从主机挂载单个文件到容器中
```shell
[root@localhost ~]# docker run --rm -it -v ~/.bash_history:/.bash_history ubuntu /bin/bash
root@79eca07938db:/# ll | grep .bash_history
-rw-------   1 root root 19549 Feb 19 10:28 .bash_history
root@79eca07938db:/# exit
exit
```
这样就可以记录在容器输入过的命令了。

注意：如果直接挂载一个文件，很多文件编辑工具，包括 vi 或者`sed --in-place`，可能会造成文件`inode`的改变，从 Docker 1.1.0 起，这会导致报错误信息。所以最简单的办法就直接挂载文件的父目录。
## 文件拷贝
将 linux 宿主机中的文件拷贝到容器内可以使用命令`docker cp`：
```shell
# docker cp 需要拷贝的文件或目录 容器名称:容器目录

# 创建一个文件abc.txt
$ touch abc.txt
# 复制abc.txt到mycentos2的容器的 / 目录下
$ docker cp abc.txt mycentos2:/
# 进入mycentos2容器
$ docker exec -it mycentos2 /bin/bash
# 查看容器 / 目录下文件
$ ll
```
将文件从容器内拷贝出来到linux宿主机使用命令：
```shell
# docker cp 容器名称:容器目录 需要拷贝的文件或目录
#进入容器后创建文件cba.txt
touch cba.txt
# 退出容器 exit
# 在Linux宿主机器执行复制；将容器mycentos2的/cba.txt文件复制到 宿主机器的/root目录下
docker cp mycentos2:/cba.txt /root
```

> 注意：容器在停止状态下也可以完成文件的拷贝

## 删除数据卷
```
docker volume rm my-vol
```
数据卷是被设计用来持久化数据的，它的生命周期独立于容器，Docker 不会在容器被删除后自动删除数据卷，并且也不存在垃圾回收这样的机制来处理没有任何容器引用的数据卷。如果需要在删除容器的同时移除数据卷。可以在删除容器的时候使用`docker rm -v`这个命令。

无主的数据卷可能会占据很多空间，要清理请使用以下命令
```
docker volume prune
```
## 查看数据卷的具体信息
在主机里使用以下命令可以查看指定数据卷的信息。
```bash
[root@localhost ~]# docker volume inspect my-vol
[
    {
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",
        "Name": "my-vol",
        "Options": {},
        "Scope": "local"
    }
]
```
在主机里使用以下命令可以查看 web 容器的数据卷信息。
```bash
[root@localhost ~]# docker inspect web
```
数据卷信息在`"Mounts"`属性下面
```bash
"Mounts": [
    {
        "Type": "volume",
        "Name": "my-vol",
        "Source": "/var/lib/docker/volumes/my-vol/_data",
        "Destination": "/usr/share/nginx/html",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
```

# 数据卷容器(Data Volume Container)
上面讲述的是主机和容器之间共享数据，那么如何你有一些持续更新的数据需要在容器之间共享，最好的方法就是创建数据卷容器。数据卷容器，其实就是一个正常的容器，专门用来提供数据卷供其它容器挂载的。
```shell
[root@localhost ~]# docker run -d -v /dbdata --name dbdata training/postgres
70966085a85b05dd741a44a96725e2e44f146cc404b1b4e3aa3e519cd546c6b4
[root@localhost ~]# docker run -d --volumes-from dbdata --name db1 training/postgres
4c92240096d919724b233e1a5cfca94b5ceb0505e43262a7121cb83cfd8542f6
[root@localhost ~]# docker run -d --volumes-from dbdata --name db2 training/postgres
25246ebfae2f8437316b10d7eac3b34c1bd1522f50ba81651aec198bc79415a2
[root@localhost ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
70966085a85b        training/postgres   "su postgres -c '/us…"   46 seconds ago       Up 45 seconds       5432/tcp            dbdata
25246ebfae2f        training/postgres   "su postgres -c '/us…"   About a minute ago   Up About a minute   5432/tcp            db2
4c92240096d9        training/postgres   "su postgres -c '/us…"   2 minutes ago        Up 2 minutes        5432/tcp            db1
```
`-volumes-from`可以多次使用来`mount`多个`conatainer`里的多个`volumes`。这个操作是链式的，我们在`db1`中通过`--volumes-from mount`进来的 `volume`可以继续被其他`container`使用
```shell
[root@localhost ~]# docker run -d --name db3 --volumes-from db1 training/postgres
44d0719377e86e3080b26d22adcb6055de93033dc9509ca2ecd8be2c93dc33b5
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
44d0719377e8        training/postgres   "su postgres -c '/us…"   3 seconds ago       Up 2 seconds        5432/tcp            db3
70966085a85b        training/postgres   "su postgres -c '/us…"   3 minutes ago       Up 3 minutes        5432/tcp            dbdata
25246ebfae2f        training/postgres   "su postgres -c '/us…"   4 minutes ago       Up 4 minutes        5432/tcp            db2
4c92240096d9        training/postgres   "su postgres -c '/us…"   4 minutes ago       Up 4 minutes        5432/tcp            db1
```
使用`--volumes-from`参数所挂载数据卷的容器自己并不需要保持在运行状态。如果删除了挂载的容器（包括`dbdata、db1`和`db2`），数据卷并不会被自动删除。如果要删除一个数据卷，必须在删除最后一个还挂载着它的容器时使用`docker rm -v`命令来指定同时删除关联的容器。 这可以让用户在容器之间升级和移动数据卷。

# 数据备份、恢复、迁移数据卷
可以利用数据卷对其中的数据进行进行备份、恢复和迁移。
## 备份
首先使用`--volumes-from`标记来创建一个加载`dbdata`容器卷的容器，并从本地主机挂载当前到容器的`/backup`目录。命令如下：
```shell
[root@localhost ~]# docker run --volumes-from dbdata -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata
tar: Removing leading `/' from member names
/dbdata/
[root@localhost ~]# ll | grep backup.tar
-rw-r--r-- 1 root root    10240 Feb 20 12:39 backup.tar
[root@localhost ~]#
```
容器启动后，使用了`tar`命令来将`dbdata`卷备份为本地的`/backup/backup.tar`。
# 恢复
如果要恢复数据到一个容器首先创建一个带有数据卷的容器`dbdata2`
```shell
[root@localhost ~]# docker run -v /dbdata --name dbdata2 ubuntu /bin/bash
```
然后创建另一个容器，挂载 dbdata2 的容器，并使用 untar 解压备份文件到挂载的容器卷中。
```shell
[root@localhost ~]# docker run --volumes-from dbdata2 -v $(pwd):/backup ubuntu tar xvf /backup/backup.tar
dbdata/
```