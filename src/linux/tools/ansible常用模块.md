---
title: ansible常用模块
date: 2024-06-20
tags: Bash
categories: Linux
order: 28
---


Ansible 默认提供了很多模块来供我们使用，[常用模块帮助文档 2.9.x](https://docs.ansible.com/ansible/2.9/modules/modules_by_category.html)。

我们可以通过`ansible-doc -l`命令查看到当前`ansible`都支持哪些模块。

通过`ansible-doc -s 模块名`可以查看该模块有哪些参数可以使用。
## ping 模块
检测远程主机的连通性。
```shell
root@localhost:~# ansible qkx1 -m ping
qkx1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```
## command 模块
在远程主机执行系统命令，此为默认模块，可忽略`-m`选项。
:::warning
不支持`$VARNAME < > | ; &`等，不具有幂等性
:::
```shell
# command 模块不支持重定向
ansible websrvs -m command -a 'echo hello > /root/hello.log'
ansible websrvs -m command -a 'cat /root/hello.log'
# command 模块不支持变量引用  
ansible websrvs -m command -a "echo $HOSTNAME"
# command 模块不支持管道符
ansible websrvs -m command -a 'echo 123456 | passwd --stdin wangj'
# 仅支持简单的 Shell 命令, 且不具备幂等性
# 首行 WARNING 是告知我们所执行的操作可以使用其他模块代替
ansible websrvs -m command -a 'mkdir /data'
ansible websrvs -m command -a 'touch /data/1.log'
ansible websrvs -m command -a 'ls /data'
```

|   参数    | 说明                          |
|:-------:|:----------------------------|
|  chdir  | 运行 command 命令前先 cd 到这个目录    |
| creates | 如果这个参数对应的文件存在，就不运行 command  |
| removes | 如果这个参数对应的文件不存在，就不运行 command |

```shell
# chdir 参数
# 先切换到 /data 目录, 然后执行 ls -l 命令
ansible websrvs -m command -a 'chdir=/data ls -l'

# creates,removes 参数
# 如果 /data/mysql 目录存在, 则跳过创建.
# 如果 /data/mysql 目录不存在, 则创建 /data/mysql 目录.
ansible websrvs -m command -a 'creates=/data/mysql mkdir /data/mysql'
ansible websrvs -m command -a 'removes=/data/mysql mkdir /data/mysql'
```
总结：
* `command`模块的命令不支持启动 Shell，直接通过 SSH 执行命令
* `command`不支持 Bash 的特性，如管道和重定向等功能
* 若需要通过 Shell 运行一个命令，比如`< > |`等，需要使用 Shell 模块
* `command`模块更安全，因为它不受用户环境的影响

## shell 模块
让远程主机在 Shell 进程下执行命令，从而支持 Shell 的特性，如管道等。此模块不具有幂等性。

与`command`模块几乎相同，但在执行命令的时候使用的是`/bin/sh`。
:::warning
注意： Command 和 Shell 模块都只能去执行一些非交互式的命令，不能去执行一些交互式的命令，比如 vim 或 top。
:::
```shell
# Shell 模块支持变量引用
[root@ansible ~] ansible websrvs -m shell -a 'echo $HOSTNAME'
# Shell 模块支持管道符
[root@ansible ~] ansible websrvs -m shell -a 'useradd wangj'
[root@ansible ~] ansible websrvs -m shell -a 'echo 123456 | passwd --stdin wangj'
[root@ansible ~] ansible websrvs -m shell -a 'ls -l /etc/shadow'
# Shell 模块支持重定向
[root@ansible ~] ansible websrvs -m shell -a 'echo hello > /data/hello.log'
[root@ansible ~] ansible websrvs -m shell -a 'cat /data/hello.log'
```
:::warning
即使是调用 bash 执行命令，类似`cat /tmp/test.md | awk -F'|' '{print $1,$2}' &> /tmp/example.txt`这些复杂命令，使用 Shell 模块也可能会失败。

解决办法： 建议写到脚本中，copy 到远程，执行，再把需要的结果拉回执行命令的机器
:::
## script 模块
在远程主机上运行 Ansible 服务器上的脚本，此模块不具有幂等性。
```shell
ansible websrvs -m script -a '/root/test.sh'
```
## copy 模块
从 Ansible 服务器主控端复制文件到远程主机。`src=file`如果没指明绝对路径，则为当前目录或当前目录下的`files`目录下的`file`文件。

| 参数             | 说明                                                           | 取值/数据类型    |
|----------------|--------------------------------------------------------------|------------|
| src            | 被复制到远程主机的本地文件，如果路径是一个目录，则会递归复制                               | path       |
| dest           | 远程主机目录，必选项                                                   | path       |
| mode           | 复制到远程主机后文件的权限                                                | string     |
| owner          | 复制到远程主机后文件的属主                                                | string     |
| group          | 复制到远程主机后文件的属组                                                | string     |
| content        | content作为内容，复制到远程主机，不能与`src`一起使用                             | string     |
| backup         | 当文件内容发生改变后，在覆盖之前是否把源文件备份                                     | no(默认)/yes |
| force          | 当目标主机包含该文件，但内容不同时，设为"yes"，表示强制覆盖；设为"no"，表示目标主机的目标位置不存在该文件才复制 | no/yes(默认) |
| directory_mode | 递归设定目录的权限，默认为系统默认权限                                          |            |

```shell
# backup 参数
# 如目标存在, 默认覆盖, 此处指定先备份
# ansible websrvs -m shell -a 'useradd wangj'
ansible websrvs -m copy -a 'src=/root/test.sh dest=/root/test01.sh owner=wangj group=bin backup=yes'
# content 参数
# 指定内容, 直接生成目标文件    
ansible websrvs -m copy -a "content='test line1\ntest line2\n' dest=/tmp/test.txt"
# 复制 /etc 目录自身. ( 注意: /etc 后面没有 / )
# ansible websrvs -m shell -a "mkdir /backup"
ansible websrvs -m copy -a "src=/etc dest=/backup"
# 复制 /etc/ 下的文件, 不包括 /etc 目录自身. ( 注意: /etc/ 后面有 / )
ansible websrvs -m copy -a "src=/etc/ dest=/backup"
```
## get_url 模块
用于将文件从`http、https`或`ftp`下载到被管理机节点上。被管理机节点必须要能够直接访问对应的远程资源。

| 参数             | 说明                                                                    |
|----------------|-----------------------------------------------------------------------|
| url            | 下载文件的 URL，支持 HTTP, HTTPS 或 FTP 协议                                     |
| dest           | 下载到目标路径(绝对路径)，如果目标是一个目录，就用服务器上面文件的名称，如果目标设置了名称就用目标设置的名称               |
| owner          | 指定属主                                                                  |
| group          | 指定属组                                                                  |
| mode           | 指定权限                                                                  |
| force          | 设为yes，即强制下载，如果同名文件存在，则覆盖；设为no，则只有在文件不存在时才下载                           |
| checksum       | 对下载后的文件计算校验和，与 checksum 指定的校验和进行比对，确保下载文件的完好性                         |
| url_username   | 基于http basic认证的用户名（如果访问的URL需要的话）                                      |
| url_password   | 基于http basic认证的密码，和url_username一起使用（如果URL允许使用空密码，则仅需提供url_username即可） |
| validate_certs | 是否校验 SSL 证书，默认为yes                                                    |
| timeout        | URL 请求的超时时间，单位为 s                                                     |

```shell
# 提前下载好软件包验证哈希值
[root@ansible ~] wget http://nginx.org/download/nginx-1.18.0.tar.gz
# 使用如下两条命令验证哈希值
[root@ansible ~] openssl md5 nginx-1.18.0.tar.gz
[root@ansible ~] md5sum nginx-1.18.0.tar.gz 
b2d33d24d89b8b1f87ff5d251aa27eb8  nginx-1.18.0.tar.gz
# ansible get_url 模块使用
[root@ansible ~] ansible websrvs -m get_url -a 'url=http://nginx.org/download/nginx-1.18.0.tar.gz dest=/usr/local/src/nginx.tar.gz checksum="md5:b2d33d24d89b8b1f87ff5d251aa27eb8"'
```
## fetch模块
从远程主机提取文件至 Ansible 的主控端。 与`copy`模块相反，目前不支持目录（可以将目录打包，然后将压缩包拷贝至 Ansible 主控端）。

常用于复制客户端的日志文件至 Ansible 主控端。

| 参数   | 说明                         |
|------|----------------------------|
| src  | 在远程拉取的文件，并且必须是一个file，不能是目录 |
| dest | 用来存放文件的目录                  |

```shell
ansible websrvs -m fetch -a 'src=/var/log/messages dest=/root/logs'
```
## file 模块
文件管理模块，用于对文件或文件夹相关的操作。主要用来设置文件、链接、目录的属性，或者移除文件、链接、目录。比如：创建文件或目录，删除文件或目录，设置文件目录属性，创建目录软链接等等。

幂等性：任意次执行所产生的影响均与一次执行的影响相同。

| 参数     | 说明                          | 取值/数据类型     |
|--------|-----------------------------|----------------------------|
| path   | 必选项，指定远程主机目录或文件信息              | path                       |
| mode   | 定义文件/目录的权限                  | string                     |
| state  | 状态                          | directory(如果目录不存在，就创建目录)<br>file(即使文件不存在，也不会被创建)<br>link(创建软连接)<br>hard(创建硬链接)<br>touch(如果文件不存在，则会创建一个新的文件，如果文件或目录已存在，则更新其最后修改时间)<br>absent(删除目录、文件或者取消链接文件) |
| owner  | 定义文件/目录的属主，后面必须跟上path：定义文件/目录的路径 | string                     |
| group  | 定义文件/目录的属组，后面可以加上mode：定义文件/目录的权限 | string                     |
| force | 需要在两种情况下强制创建软链接，一种是源文件不存在，但之后会建立的情况下；另一种是目标软链接已存在，需要先取消之前的软链，然后创建新的软链 | no(默认)/yes                 |
| recurse | 递归设置文件的属性，只对目录有效，后面跟上src：被链接的源文件路径，只应用于state=link的情况 |                            |
| dest | 被链接到的路径，只应用于state=link的情况   |                            |

```shell
# 创建空文件
ansible all -m file -a 'path=/data/test.txt state=touch'
ansible all -m file -a "path=/root/test.txt state=touch owner=wangj mode=755"
# 创建目录 state=directory
ansible all -m file -a "path=/data/mysql state=directory owner=mysql group=mysql"
# 创建软链接 state=link
ansible all -m file -a 'src=/data/testfile dest=/data/testfile-link state=link'
# 递归修改目录属性, 但不递归至子目录
ansible all -m file -a "path=/data/mysql state=directory owner=mysql group=mysql"
# recurse 参数
# 递归修改目录及子目录的属性
ansible all -m file -a "path=/data/mysql state=directory owner=mysql group=mysql recurse=yes"
# 删除文件或目录 state=absent
ansible all -m file -a "path=/data/mysql state=absent"
```
## stat 模块
`stat`模块将获取指定文件或目录的信息，并使用`register`参数将其保存。

选项：
* `path`：文件/对象的完整路径(必须)

常用的返回值判断：
* `exists`：判断是否存在
* `isuid`：调用用户的 ID 与所有者 ID 是否匹配

```shell
[root@ansible ~] ansible 127.0.0.1 -m stat -a 'path=/etc/passwd'
127.0.0.1 | SUCCESS => {
    "changed": false,
    "stat": {
        "atime": 1730942083.759907,
        "attr_flags": "e",
        "attributes": [
            "extents"
        ],
        "block_size": 4096,
        "blocks": 8,
        "charset": "us-ascii",
        "checksum": "3b58457efd824fb7f3dc2fb1473bb99fe0958600",
        "ctime": 1729236170.6131256,
        "dev": 45830,
        "device_type": 0,
        "executable": false,
        "exists": true,
        "gid": 0,
        "gr_name": "root",
        "inode": 178,
        "isblk": false,
        "ischr": false,
        "isdir": false,
        "isfifo": false,
        "isgid": false,
        "islnk": false,
        "isreg": true,
        "issock": false,
        "isuid": false,
        ...
    }
}
```
使用`stat`模块验证文件状态，通过文件状态推进下一步实施动作。
```yml

  - name: install | Check if file is already configured.
    stat: path={{ nginx_file_path }}
    connection: local
    register: nginx_file_result
    
  - name: install | Download nginx file
    get_url: url={{ nginx_file_url }} dest={{ software_files_path }} validate_certs=no
    connection: local
    when: , not. nginx_file_result.stat.exists
```
```shell
# 检查 websrvs 主机组中的所有主机上的 /data/mysql 路径是否存在
# 如果路径不存在, 它将在每个主机上输出一条调试信息, 说明该路径不存在
[root@ansible ansible] cat stat.yml
---
- hosts: websrvs
  tasks:
    - name: Check file
      stat: path=/data/mysql
      register: st
    - name: debug
      debug:
        msg: "/data/mysql is not exist"
      when: not st.stat.exists

[root@ansible ansible] ansible-playbook stat.yml
```
## unarchive 模块
解压缩。

实现有两种用法：
* 将 Ansible 主机上的压缩包传到远程主机后解压缩至特定目录，设置`copy=yes`，此为默认值，可省略
* 将远程主机上的某个压缩包解压缩到指定路径下，设置`copy=no`

| 参数         | 说明                                                                       | 取值/数据类型    |
|------------|--------------------------------------------------------------------------|------------|
| copy       | copy=yes，拷贝的文件从 ansible 主机复制到远程主机，copy=no 表示在远程主机上寻找源文件解压                | no/yes(默认) |
| src        | tar包源路径，可以是 ansible 主机上的路径，也可以是远程主机上的路径，如果是远程主机上的路径，则需设置 copy=no         | path       |
| dest       | 解压后文件的目标绝对路径                                                             | path       |
| remote_src | 和 copy 功能一样且互斥，remote_src=yes 表示文件在远程主机上，remote_src=no 表示文件在 ansible 主机上 | no(默认)/yes |
| mode       | 设置解压缩后的文件权限                                                              |            |

```shell
# copy=yes ( 默认值 )
# 拷贝的文件是从 ansible 控制主机复制到远程主机上
ansible all -m unarchive -a 'src=/root/nginx-1.18.0.tar.gz dest=/usr/local/src owner=wangj group=bin'
# copy=no ( 在远程被控主机上寻找 src 源文件 )
# ansible websrvs -m get_url -a 'url=http://nginx.org/download/nginx-1.18.0.tar.gz dest=/root/nginx-1.18.0.tar.gz'
ansible all -m unarchive -a 'src=/root/nginx-1.18.0.tar.gz dest=/usr/local/src copy=no mode=0777'
# 下载压缩包并解压缩至指定目录 ( 需要添加参数 copy=no )
ansible websrvs -m unarchive -a 'src=http://nginx.org/download/nginx-1.18.0.tar.gz dest=/usr/local/src/ copy=no'
# remote_src=yes ( 表示内容在远程主机上 )
ansible websrvs -m unarchive -a 'src=https://releases.ansible.com/ansible/ansible-2.1.6.0-0.1.rc1.tar.gz dest=/usr/local/src owner=root remote_src=yes'
```
## archive 模块
打包压缩，保存在被管理节点。
```shell
ansible websrvs -m archive -a 'path=/var/log/ dest=/data/log.tar.bz2 format=bz2 owner=wangj mode=0600'
```
## hostname 模块
管理主机名。
```shell
# 使用
ansible 192.168.80.18 -m hostname -a 'name=node18.wuhanjiayou.cn' 
# 验证
ansible 192.168.80.18 -m shell -a 'hostname'
# 注意:
# 千万别以分组来修改主机名 ( 不然整个组的主机名都是同一个 ) 
# 除非你确实有这个需求 
ansible websrvs -m hostname -a 'name=node.wuhanjiayou.cn'
ansible websrvs -m shell -a 'hostname'
```
## cron 模块
`cron`模块可以 帮助我们批量管理远程主机中的计划任务。

| 参数           | 说明                              | 取值/数据类型                                                               |
|--------------|---------------------------------|-----------------------------------------------------------------------|
| day          | 日                               | 1-31, *, */2, etc                                                     |
| hour         | 小时                              | 0-23, *, */2, etc                                                     |
| minute       | 分钟                              | 0-59, *, */2, etc                                                     |
| month        | 月                               | 1-12, *, */2, etc                                                     |
| weekday      | 周                               | 0-6 for Sunday-Saturday, *, etc                                       |
| job          | 指明运行的命令是什么                      | string                                                                |
| name         | 定时任务描述                          | string                                                                |
| reboot       | 任务在重启时运行，不建议使用，建议使用special_time | no(默认)/yes                                                            |
| special_time | 特殊的时间范围                         | reboot（重启时），annually（每年），monthly（每月），weekly（每周），daily（每天），hourly（每小时） |
| state        | 指定状态                            | present(添加定时任务，默认)/absent(删除定时任务)                                     |
| user         | 以哪个用户的身份执行                      | string                                                                |
| disabled     | 是否禁用定时任务                        | no(默认)/yes                                                            |

```shell
# 创建任务
ansible 10.0.0.8 -m cron -a 'hour=2 minute=30 weekday=1-5 name="backup mysql" job=/root/mysql_backup.sh'
ansible websrvs -m cron -a "minute=*/5 job='/usr/sbin/ntpdate ntp.aliyun.com &>/dev/null' name=Synctime"

# 禁用计划任务
ansible websrvs -m cron -a "minute=*/5 job='/usr/sbin/ntpdate 172.20.0.1 &>/dev/null' name=Synctime disabled=yes"

# 启用计划任务
ansible websrvs -m cron -a "minute=*/5 job='/usr/sbin/ntpdate 172.20.0.1 &>/dev/null' name=Synctime disabled=no"

# 删除任务
ansible websrvs -m cron -a "name='backup mysql' state=absent"
ansible websrvs -m cron -a 'state=absent name=Synctime'
```
## yum/apt 模块
* `yum`模块：管理软件包，支持 RHEL，CentOS，fedora，不支持 Ubuntu 其它版本
* `apt`模块：管理 Debian 相关版本的软件包

后续：我们可以通过判断 Linux 系统版本来决定使用哪个模块。

| 参数                | 说明                                    | 取值/数据类型                                    |
|-------------------|---------------------------------------|--------------------------------------------|
| name              | 安装的包的名称                               | string/list                                |
| state             | 4种状态                                  | present(安装)<br>latest(安装最新的)<br>absent(卸载) |
| update_cache      | 是否强制更新yum的缓存                          | no(默认)/yes                                 |
| disable_pgp_check | 是否禁止GPG checking，只用于present or latest | no(默认)/yes                                 |
| disablerepo       | 临时禁止使用yum库。 只用于安装或更新时                 |                                            |
| enablerepo        | 临时使用的yum库。只用于安装或更新时                   |                                            |
| conf_file         | 指定远程yum安装时所依赖的配置文件（安装本地已有的包）          |                                            |

```shell
# 安装: present
ansible websrvs -m yum -a 'name=httpd state=present'

# 卸载: absent
ansible websrvs -m yum -a 'name=httpd state=absent'

# 启用 epel 源进行安装
ansible websrvs -m yum -a 'name=nginx state=present enablerepo=epel'

# 升级除 kernel 和 foo 开头以外的所有包 ( 安装多个软件包 )
ansible websrvs -m yum -a 'name=* state=lastest exclude=kernel*,foo*'

# 一次安装多个软件包
[root@ansible ~] ansible websrvs -m yum -a 'name=sl,cowsay'
```
```shell
# 安装软件包
# 注意: RadHat 使用 yum 模块, Ubuntu 使用 apt 模块
[root@centos8 ~] ansible 192.168.80.18 -m apt -a 'name=bb,sl,cowsay,cmatrix,oneko,hollywood,boxes,libaa-bin,x11-apps state=present'

# 卸载软件包
# 注意: RadHat 使用 yum 模块, Ubuntu 使用 apt 模块
[root@centos8 ~] ansible websrvs -m apt -a 'name=sl,cowsay state=absent'
[root@ansible ~] ansible localhost -m yum -a "list=tree"
```
## yum_repository 模块
可以帮助我们批量管理远程主机上的 Yum 仓库。

| 参数          | 说明                                    |
|-------------|---------------------------------------|
| name        | 指定仓库名称，对应yum配置文件中`[]`中的内容，必须参数        |
| baseurl     | 指定yum仓库的源地址，对应yum配置文件中baseurl，必须参数    |
| description | 设置仓库的注释信息，对应yum配置文件中的name，必须参数        |
| file        | 设置仓库的配置文件名称，对应yum配置文件的名称（.repo的前缀）    |
| enabled     | 设置是否启用yum源，默认值为yes，对应yum配置文件中的enabled |
| gpgcheck    | 设置是否启用验证，默认值为no，对应yum配置文件中的gpgcheck   |
| gpgcakey    | 当gpgcheck=yes时，需要使用此参数指定验证包所需的公钥      |
| state       | 默认值为present，当值为absent时，表示删除对应的yum源    |

```yaml
task:
	- name: Add multiple repositories into the same file (1/2) 
	  yum_repository:
		  name: epel
		  description: EPEL YUM repo
		  file: external_repos
		  baseurl: https://download.fedoraproject.org/pub/epel/$releasever/$basearch/
		  gpgcheck: no
	- name: Add multiple repositories into the same file (2/2)
	  yum_repository:
	    name: rpmforge
			description: RPMforge YUM repo
			file: external_repos
			baseurl: http://apt.sw.be/redhat/el7/en/$basearch/rpmforge
			mirrorlist: http://mirrorlist.repoforge.org/el7/mirrors-rpmforge
			enabled: no
	- name: Remove repository from a specific repo file
	  yum_repository:
		  name: epel
			file: external_repos
			state: absent                           
```
创建和删除仓库
```shell
[root@ansible ~] cat yum_repo.yml
- hosts: websrvs
  tasks:
    - name: Add multiple repositories into the same file 
      yum_repository:
      name: test
      description: EPEL YUM repo
      file: external_repos
      baseurl: https://download.fedoraproject.org/pub/epel/$releasever/$basearch/
      gpgcheck: no

[root@ansible ~] ansible-playbook yum_repo.yml
[root@web1 ~] cat /etc/yum.repos.d/external_repos.repo
[test]
baseurl = https://download.fedoraproject.org/pub/epel/$releasever/$basearch/
gpgcheck = 0
name = EPEL YUM repo

[root@ansible ~] cat remove_yum_repo.yml
- hosts: websrvs
  tasks:
    - name: remove repo 
      yum_repository:
        name: test
        file: external_repos
        state: absent
        
[root@ansible ~] ansible-playbook remove_yum_repo.yml        
```
## service 模块
管理远程主机上的服务。

| 参数       | 说明                             | 取值/数据类型                                                       |
|----------|--------------------------------|---------------------------------------------------------------|
| name     | 必选项，服务名称                       | string                                                        |
| state    | 有四种状态                          | started(启动)<br>stopped(停止)<br>restarted(重启)<br>reloaded(重载配置) |
| enabled  | 是否开机启动                         | no/yes                                                        |
| runlevel | 开机启动的级别，一般不用指定                 | "default"(默认)/string                                          |
| sleep    | 在重启服务的过程中，是否等待。如在服务关闭以后等待2秒再启动 | integer                                                       |

```shell
# 启动远程主机的 httpd 服务,并实现开机自启
ansible 192.168.80.18 -m service -a 'name=httpd state=started enabled=yes'

# 停止服务   
ansible websrvs -m service -a 'name=httpd state=stopped'

# 生效服务
ansible websrvs -m service -a 'name=httpd state=reloaded'

# 重启服务
ansible websrvs -m shell -a "sed -i 's/^Listen 80/Listen 8080/' /etc/httpd/conf/httpd.conf"
ansible websrvs -m service -a 'name=httpd state=restarted'
```
## user 模块
批量管理远程主机上的用户，比如创建用户、修改用户、删除用户、为用户创建密钥对等操作。

| 参数          | 说明                          | 取值/数据类型               |
|-------------|-----------------------------|-----------------------|
| name        | 用户名，必选参数                    | string                |
| state       | 设置帐号状态                      | present(创建，默认)/absent |
| system      | 是否为系统用户                     | no(默认)/yes            |
| uid         | 指定用户的uid                    | integer               |
| group       | 指定基本组                       | string                |
| groups      | 指定附加组，如果指定为(groups=)表示删除所有组 | list                  |
| shell       | 指定默认shell                   | string                |
| create_home | 是否创建家目录                     | no/yes(默认)            |
| password    | 指定用户密码                      | string                |
| remove      | 当`state=absent`时，是否删除用户的家目录 | no(默认)/yes            |
| home        | 设置用户的家目录                    | path                  |

```shell
# 创建用户
ansible all -m user -a 'name=user1 comment="test user" uid=2048 home=/app/user1 group=root'
ansible all -m user -a 'name=nginx comment=nginx uid=88 group=nginx groups="root,daemon" shell=/sbin/nologin system=yes create_home=no home=/data/nginx non_unique=yes'

# remove=yes 表示删除用户及家目录等数据, 默认 remove=no
ansible all -m user -a 'name=nginx state=absent remove=yes'

# 生成 123456 加密的密码
ansible localhost -m debug -a "msg={{ '123456'| password_hash('sha512','salt')}}"
localhost | SUCCESS => {
    "msg": "$6$salt$MktMKPZJ6t59GfxcJU20DwcwQzfMvOlHFVZiOVD71w."
}

# 用上面创建的密码创建用户
ansible websrvs -m user -a 'name=test password="$6$salt$MktMKPZJ6t59GfxcJU20DwcwQzfMvOlHFVZiOVD71w."'

# 创建用户 test, 并生成 4096bit 的私钥
ansible websrvs -m user -a 'name=test generate_ssh_key=yes ssh_key_bits=4096 ssh_key_file=.ssh/id_rsa'
```
## group 模块
管理组。

| 参数     | 说明         | 取值/数据类型                   |
|--------|------------|---------------------------|
| gid    | 设置组的GID号   | integer                   |
| name   | 指定组的名称，必填项 | string                    |
| state  | 指定组的状态     | present(创建，默认)/absent(删除) |
| system | 是否创建为系统组   | no(默认)/yes                |

```shell
# 创建组
ansible websrvs -m group -a 'name=nginx gid=88 system=yes'
# 删除组
ansible websrvs -m group -a 'name=nginx state=absent'
```
## lineinfile 模块
相当于`sed`，可以修改文件内容。

Ansible 在使用`sed`进行替换时，经常会遇到需要转义的问题，而且 Ansible 在遇到特殊符号进行替换时，存在问题，无法正常进行替换。

其实在 Ansible 自身提供了两个模块：`lineinfile`模块和`replace`模块，可以方便的进行替换，一般在 Ansible 当中去修改某个文件的单行进行替换的时候需要使用`lineinfile`模块。

幂等性：重复执行不会创建多行内容，多次执行，依然只增加有最后一行。

参数：
* `regexp`参数：使用正则表达式匹配对应的行，当替换文本时，如果有多行文本都能被匹配，则只有最后面被匹配到的那行文本才会被替换，当删除文本时，如果有多行文本都能被匹配，这么这些行都会被删除。如果想进行多行匹配进行替换需要使用`replace`模块。

```shell
# 将 Listen 开头的行,修改为 Listen 8080 ( regexp 参数 )
ansible 192.168.80.18 -m lineinfile -a "path=/etc/httpd/conf/httpd.conf regexp='^Listen' line='Listen 8080'"

# 批量禁用远程主机的 SELinux 功能
ansible all -m lineinfile -a "path=/etc/selinux/config regexp='^SELINUX=' line='SELINUX=disabled'"

# 将 # 开头的行都删除
ansible 192.168.80.18 -m lineinfile -a 'dest=/etc/fstab state=absent regexp="^#"'
```
## replace 模块
`lineinfile`模块与`replace`模块区别：
* `lineinfile`模块`regexp`参数：使用正则表达式匹配对应的行，当替换文本时，如果有多行文本都能被匹配，则只有最后面被匹配到的那行文本才会被替换，当删除文本时，如果有多行文本都能被匹配，这么这些行都会被删除。
* `replace`模块：可以根据我们指定的正则表达式替换文件中的字符串，文件中所有被匹配到的字符串都会被替换。

| 参数      | 说明                                   | 取值/数据类型 |
|---------|--------------------------------------|---------|
| path    | 必须参数，指定要修改的文件                        |         |
| regexp  | 必须参数，指定一个正则表达式                       |         |
| replace | 替换regexp参数匹配到的字符串                    |         |
| backup  | 修改源文件前创建一个包含时间戳信息的备份文件               | no/yes  |
| before  | 如果指定，则仅替换/删除此匹配之前的内容，可以和after参数结合使用  |         |
| after   | 如果指定，则仅替换/删除此匹配之后的内容，可以和before参数结合使用 |         |
| owner   | 修改文件用户名                              |         |
| group   | 修改文件组名                               |         |
| mode    | 修改文件权限                               |         |

```shell
# 查找所有以 UUID 开头的行, 并将这些行注释掉
ansible all -m replace -a "path=/etc/fstab regexp='^(UUID.*)' replace='#\1'"

# 查找所有以 # 开头, 紧接着是 UUID 的 行 (这些行是被注释掉的)
# 并移除行首的 # 符号, 从而取消这些行的注释.
ansible all -m replace -a "path=/etc/fstab regexp='^#(UUID.*)' replace='\1'"
```
## selinux 模块
批量管理远端主机的 SELINUX 策略。
```shell
# 启用
[root@ansible ~] ansible 192.168.80.18 -m selinux -a 'state=enforcing policy=targeted'

# 禁用
[root@ansible ~] ansible 192.168.80.18 -m selinux -a 'state=disabled'

# 验证
[root@centos8 ~] grep -v '#' /etc/selinux/config
SELINUX=disabled
SELINUXTYPE=targeted

[root@centos8 ~] getenforce 
Permissive
```
## reboot 模块
```shell
[root@ansible ~] ansible websrvs -m reboot
```
## mount 模块
批量管理被控端设备挂载。

| 参数     | 说明                             |
|--------|--------------------------------|
| src    | 本地或远程设备的路径                     |
| path   | 设备挂载至本地的路径                     |
| fstype | 挂载的文件系统类型，xfs、nfs...           |
| opts   | 挂载的参数，defaults、ro...           |
| state  | 挂载的状态，absent、mounted、unmounted |

```shell
# 临时挂载
mount websrvs -m mount -a 'src="UUID=b3e48f45-f933-4c8e-a700-22a159ec9077" path=/home fstype=xfs opts=noatime state=present'

# 临时取消挂载
mount websrvs -m mount -a 'path=/home fstype=xfs opts=noatime state=unmounted'

# 永久挂载
ansible websrvs -m mount -a 'src=10.0.0.8:/data/wordpress path=/var/www/html/wp-content/uploads opts="_netdev" state=mounted'

// 永久卸载
ansible websrvs -m mount -a 'src=10.0.0.8:/data/wordpress path=/var/www/html/wp￾content/uploads state=absent'
```
## setup 模块
`setup`模块用于收集主机的系统信息，这些`facts`信息可以直接以变量的形式使用。

但是如果主机较多，会影响执行速度。我们可以使用`gather_facts: no`来禁止 Ansible 收集`facts`信息。

`filter`参数：用于进行条件过滤。如果设置，仅返回匹配过滤条件的信息。
```shell
# 这条命令会收集 inventory 中 websrvs 组下所有主机的所有 facts
# 并将这些信息打印出来
ansible websrvs -m setup

# 主机的节点名
ansible websrvs -m setup -a "filter=ansible_nodename"

# 主机的主机名
ansible websrvs -m setup -a "filter=ansible_hostname"

# 主机所属的域名 
ansible websrvs -m setup -a "filter=ansible_domain"

# 主机的总内存量
ansible websrvs -m setup -a "filter=ansible_memtotal_mb"

# 主机的物理内存量
ansible websrvs -m setup -a "filter=ansible_memory_mb"

# 主机当前空闲的内存量
ansible websrvs -m setup -a "filter=ansible_memfree_mb"

# 主机操作系统的家族 // 例如 RedHat、Debian 等
ansible websrvs -m setup -a "filter=ansible_os_family"

# 主机操作系统的主版本号
ansible websrvs -m setup -a "filter=ansible_distribution_major_version"

# 主机操作系统的完整版本号
ansible websrvs -m setup -a "filter=ansible_distribution_version"

# 主机的虚拟 CPU 数量
ansible websrvs -m setup -a "filter=ansible_processor_vcpus"

# 主机的所有 IPv4 地址列表
ansible websrvs -m setup -a "filter=ansible_all_ipv4_addresses"

# 主机的架构类型
ansible websrvs -m setup -a "filter=ansible_architecture"

# 主机已运行的时间
ansible websrvs -m setup -a "filter=ansible_uptime_seconds"

# 以 ansible_processor 开头的所有 facts
ansible websrvs -m setup -a "filter=ansible_processor*"

# 主机的环境变量 
ansible websrvs -m setup -a 'filter=ansible_env'
```
取 IP 地址
```shell
# 取所有 IP
ansible 192.168.80.18 -m setup -a 'filter=ansible_all_ipv4_addresses'

# 取默认 IP
ansible all -m setup -a 'filter="ansible_default_ipv4"'
```
## debug 模块
此模块可以用于输出信息，并且通过`msg`定制输出的信息内容。
:::warning
msg 后面跟变量时，需要加 " " 引起来
:::
```shell
# 默认输出 Hello world ( 默认没有指定 msg, 默认输出 "Hello world!" )
[root@ansible ~] ansible 192.168.80.18 -m debug
```
利用`debug`模块输出变量。
```shell
[root@centos8 ~] vim debug.yaml
---
- hosts: websrvs
  tasks:
  - name: output variables
    debug:
      msg: Host "{{ ansible_nodename }}" Ip "{{ ansible_default_ipv4.address }}"
      
[root@centos8 ~] ansible-playbook debug.yaml
```
显示字符串特定字符
```shell
# cat debug.yml
- hosts: all
  gather_facts: n
  vars:
    a: "12345"
  tasks:
  - debug:
    msg: "{{a[2]}}"
    
// 定义了一个字符串变量 a, 如果想要获取 a 字符串的第 3 个字符
// 则可以使用 "a[2]" 获取, 索引从 0 开始, 执行上例 playbook, debug 的输出信息如下:
TASK [debug] *************************
ok: [test71] => {
    "msg": "3"
}
```
