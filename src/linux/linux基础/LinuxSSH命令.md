---
title: LinuxSSH命令
date: 2024-04-10
tags: linux基础
categories: linux
order: 14
---


SSH（`Secure Shell`的缩写）是一种网络协议，用于加密两台计算机之间的通信，并且支持各种身份验证机制。

实务中，它主要用于保证远程登录和远程通信的安全，任何网络服务都可以用这个协议来加密。
## SSH 是什么
历史上，网络主机之间的通信是不加密的，属于明文通信。这使得通信很不安全，一个典型的例子就是服务器登录。登录远程服务器的时候，需要将用户输入的密码传给服务器，如果这个过程是明文通信，就意味着传递过程中，线路经过的中间计算机都能看到密码，这是很可怕的。

SSH 就是为了解决这个问题而诞生的，它能够加密计算机之间的通信，保证不被窃听或篡改。它还能对操作者进行认证（`authentication`）和授权（`authorization`）。明文的网络协议可以套用在它里面，从而实现加密。
## SSH 架构
SSH 的软件架构是服务器-客户端模式（C/S）。在这个架构中，SSH 软件分成两个部分：向服务器发出请求的部分，称为客户端，OpenSSH 的实现为`ssh`；接收客户端发出的请求的部分，称为服务器，OpenSSH 的实现为`sshd`。
:::info
SSH 有多种实现，既有免费的，也有收费的。OpenSSH 是开源免费的 SSH 的一种实现。
:::
## SSH客户端
OpenSSH 的客户端是二进制程序`ssh`。它在 Linux/Unix 系统的位置是`/usr/local/bin/ssh`。

Linux 系统一般都自带`ssh`，如果没有就需要安装。
```shell
# Ubuntu 和 Debian
[root@localhost ~]# apt install openssh-client

# CentOS 和 Fedora
[root@localhost ~]# yum install openssh-clients
```
安装以后，可以使用`-V`参数输出版本号，查看一下是否安装成功。
```shell
[root@localhost ~]# ssh -V
```
### 基本用法
`ssh`最常见的用途就是登录服务器，这要求服务器安装并正在运行 SSH 服务器软件。

`ssh`登录服务器的命令：
```shell
[root@localhost ~]# ssh hostname
```
`hostname`是主机名，它可以是域名，也可能是 IP 地址或局域网内部的主机名。不指定用户名的情况下，将使用客户端的当前用户名，作为远程服务器的登录用户名。如果要指定用户名，可以采用下面的语法。
```shell
[root@localhost ~]# ssh user@hostname
```
用户名也可以使用`ssh`的`-l`参数指定，这样的话，用户名和主机名就不用写在一起了。
```shell
[root@localhost ~]# ssh -l username host
```
`ssh`默认连接服务器的 22 端口，`-p`参数可以指定其他端口。
```shell
[root@localhost ~]# ssh -p 8821 foo.com
```
### 连接流程
`ssh`连接远程服务器后，首先有一个验证过程，验证远程服务器是否为陌生地址。

如果是第一次连接某一台服务器，命令行会显示一段文字，表示不认识这台机器，提醒用户确认是否需要连接。
```text
The authenticity of host 'foo.com (192.168.121.111)' can't be established.
ECDSA key fingerprint is SHA256:Vybt22mVXuNuB5unE++yowF7lgA/9/2bLSiO3qmYWBY.
Are you sure you want to continue connecting (yes/no)?
```
上面这段文字告诉用户，`foo.com`这台服务器的指纹是陌生的，让用户选择是否要继续连接（输入`yes`或`no`）。

所谓“服务器指纹”，指的是 SSH 服务器公钥的哈希值。每台 SSH 服务器都有唯一一对密钥，用于跟客户端通信，其中公钥的哈希值就可以用来识别服务器。

下面的命令可以查看某个公钥的指纹。
```shell
[root@localhost ~]# ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
256 SHA256:EK+N53BPNhIDsw4+7cN22hqqr+sR0UR9Tq8HrhMOqoo no comment (ECDSA)
```
`ssh`会将本机连接过的所有服务器公钥的指纹，都储存在本机的`~/.ssh/known_hosts`文件中。每次连接服务器时，通过该文件判断是否为陌生主机（陌生公钥）。

在上面这段文字后面，输入`yes`，就可以将当前服务器的指纹也储存在本机`~/.ssh/known_hosts`文件中，并显示下面的提示。以后再连接的时候，就不会再出现警告了。
```text
Warning: Permanently added 'foo.com (192.168.121.111)' (RSA) to the list of known hosts
```
然后，客户端就会跟服务器建立连接。接着，`ssh`就会要求用户输入所要登录账户的密码。用户输入并验证密码正确以后，就能登录远程服务器的 Shell 了。
### 服务器密钥变更
服务器指纹可以防止有人恶意冒充远程主机。如果服务器的密钥发生变更（比如重装了 SSH 服务器），客户端再次连接时，就会发生公钥指纹不吻合的情况。这时，客户端就会中断连接，并显示一段警告信息。
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that the RSA host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
77:a5:69:81:9b:eb:40:76:7b:13:04:a9:6c:f4:9c:5d.
Please contact your system administrator.
Add correct host key in /home/me/.ssh/known_hosts to get rid of this message.
Offending key in /home/me/.ssh/known_hosts:36
```
上面这段文字的意思是，该主机的公钥指纹跟`~/.ssh/known_hosts`文件储存的不一样，必须处理以后才能连接。这时，你需要确认是什么原因，使得公钥指纹发生变更，到底是恶意劫持，还是管理员变更了 SSH 服务器公钥。

如果新的公钥确认可以信任，需要继续执行连接，你可以执行下面的命令，将原来的公钥指纹从`~/.ssh/known_hosts`文件删除。
```shell
[root@localhost ~]# ssh-keygen -R hostname
```
上面命令中，`hostname`是发生公钥变更的主机名。

除了使用上面的命令，你也可以手工修改`known_hosts`文件，将公钥指纹删除。

删除了原来的公钥指纹以后，重新执行`ssh`命令连接远程服务器，将新的指纹加入`known_hosts`文件，就可以顺利连接了。
## SSH 密钥登录
SSH 默认采用密码登录，这种方法有很多缺点，简单的密码不安全，复杂的密码不容易记忆，每次手动输入也很麻烦。密钥登录是比密码登录更好的解决方案。

SSH 密钥登录采用的是非对称加密，每个用户通过自己的密钥登录。其中，私钥必须私密保存，不能泄漏；公钥则是公开的，可以对外发送。它们的关系是，公钥和私钥是一一对应的，每一个私钥都有且仅有一个对应的公钥，反之亦然。
### 密钥登录的过程
SSH 密钥登录分为以下的步骤：
预备步骤，客户端通过`ssh-keygen`生成自己的公钥和私钥。
1. 第一步，手动将客户端的公钥放入远程服务器的指定位置。
2. 第二步，客户端向服务器发起 SSH 登录的请求。
3. 第三步，服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。
4. 第四步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。
5. 第五步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录

### ssh-keygen命令：生成密钥
#### 基本用法
密钥登录时，首先需要生成公钥和私钥。OpenSSH 提供了一个工具程序`ssh-keygen`命令，用来生成密钥。

直接输入`ssh-keygen`，程序会询问一系列问题，然后生成密钥。
```shell
[root@localhost ~]# ssh-keygen
```
通常做法是使用`-t`参数，指定密钥的加密算法。
```shell
[root@localhost ~]# ssh-keygen -t dsa
```
上面示例中，`-t`参数用来指定密钥的加密算法，一般会选择 DSA 算法或 RSA 算法。如果省略该参数，默认使用 RSA 算法。

输入上面的命令以后，`ssh-keygen`会要求用户回答一些问题。
```shell
[root@localhost ~]# ssh-keygen -t dsa
Generating public/private dsa key pair.
Enter file in which to save the key (/home/username/.ssh/id_dsa):  press ENTER
Enter passphrase (empty for no passphrase): ********
Enter same passphrase again: ********
Your identification has been saved in /home/username/.ssh/id_dsa.
Your public key has been saved in /home/username/.ssh/id_dsa.pub.
The key fingerprint is:
14:ba:06:98:a8:98:ad:27:b5:ce:55:85:ec:64:37:19 username@shell.isp.com
```
上面示例中，执行`ssh-keygen`命令以后，会出现第一个问题，询问密钥保存的文件名，默认是`~/.ssh/id_dsa`文件，这个是私钥的文件名，对应的公钥文件`~/.ssh/id_dsa.pub`是自动生成的。用户的密钥一般都放在主目录的`.ssh`目录里面。

如果选择`rsa`算法，生成的密钥文件默认就会是`~/.ssh/id_rsa`（私钥）和`~/.ssh/id_rsa.pub`（公钥）。

接着，就会是第二个问题，询问是否要为私钥文件设定密码保护（`passphrase`）。这样的话，即使入侵者拿到私钥，还是需要破解密码。如果为了方便，不想设定密码保护，可以直接按回车键，密码就会为空。后面还会让你再输入一次密码，两次输入必须一致。注意，这里“密码”的英文单词是`passphrase`，这是为了避免与 Linux 账户的密码单词`password`混淆，表示这不是用户系统账户的密码。

最后，就会生成私钥和公钥，屏幕上还会给出公钥的指纹，以及当前的用户名和主机名作为注释，用来识别密钥的来源。

公钥文件和私钥文件都是文本文件，可以用文本编辑器看一下它们的内容。公钥文件的内容类似下面这样。
```text
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAvpB4lUbAaEbh9u6HLig7amsfywD4fqSZq2ikACIUBn3GyRPfeF93l/
weQh702ofXbDydZAKMcDvBJqRhUotQUwqV6HJxqoqPDlPGUUyo8RDIkLUIPRyq
ypZxmK9aCXokFiHoGCXfQ9imUP/w/jfqb9ByDtG97tUJF6nFMP5WzhM= username@shell.isp.com
```
上面示例中，末尾的`username@shell.isp.com`是公钥的注释，用来识别不同的公钥，表示这是哪台主机（`shell.isp.com`）的哪个用户（`username`）的公钥，不是必需项。

注意，公钥只有一行。因为它太长了，所以上面分成三行显示。

下面的命令可以列出用户所有的公钥。
```shell
[root@localhost ~]# ls -l ~/.ssh/id_*.pub
```
生成密钥以后，建议修改它们的权限，防止其他人读取。
```shell
[root@localhost ~]# chmod 600 ~/.ssh/id_rsa
[root@localhost ~]# chmod 600 ~/.ssh/id_rsa.pub
```
#### 配置项
`ssh-keygen`的命令行配置项，主要有下面这些。
##### -b
`-b`参数指定密钥的二进制位数。这个参数值越大，密钥就越不容易破解，但是加密解密的计算开销也会加大。

一般来说，`-b`至少应该是 1024，更安全一些可以设为 2048 或者更高。
##### -C
`-C`参数可以为密钥文件指定新的注释，格式为`username@host`。

下面命令生成一个 4096 位 RSA 加密算法的密钥对，并且给出了用户名和主机名。
```shell
[root@localhost ~]# ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```
##### -f
`-f`参数指定生成的私钥文件。
```shell
[root@localhost ~]# ssh-keygen -t dsa -f mykey
```
上面命令会在当前目录生成私钥文件`mykey`和公钥文件`mykey.pub`。
##### -F
`-F`参数检查某个主机名是否在`known_hosts`文件里面。
```shell
[root@localhost ~]# ssh-keygen -F example.com
```
##### -N
`-N`参数用于指定私钥的密码（`passphrase`）。
```shell
[root@localhost ~]# ssh-keygen -t dsa -N secretword
```
##### -p
`-p`参数用于重新指定私钥的密码（`passphrase`）。它与`-N`的不同之处在于，新密码不在命令中指定，而是执行后再输入。`ssh`先要求输入旧密码，然后要求输入两遍新密码。
##### -R
`-R`参数将指定的主机公钥指纹移出`known_hosts`文件。
```shell
$ ssh-keygen -R example.com
```
##### -t
`-t`参数用于指定生成密钥的加密算法，一般为`dsa`或`rsa`
### 手动上传公钥
生成密钥以后，公钥必须上传到服务器，才能使用公钥登录。

OpenSSH 规定，用户公钥保存在服务器的`~/.ssh/authorized_keys`文件。你要以哪个用户的身份登录到服务器，密钥就必须保存在该用户主目录的`~/.ssh/authorized_keys`文件。只要把公钥添加到这个文件之中，就相当于公钥上传到服务器了。每个公钥占据一行。如果该文件不存在，可以手动创建。

用户可以手动编辑该文件，把公钥粘贴进去，也可以在本机计算机上，执行下面的命令。
```shell
[root@localhost ~]# cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```
上面示例中，`user@host`要替换成你所要登录的用户名和主机名。

注意，`authorized_keys`文件的权限要设为 644，即只有文件所有者才能写。如果权限设置不对，SSH 服务器可能会拒绝读取该文件。
```shell
[root@localhost ~]# chmod 644 ~/.ssh/authorized_keys
```
只要公钥上传到服务器，下次登录时，OpenSSH 就会自动采用密钥登录，不再提示输入密码。
```shell
[root@localhost ~]# ssh -l username shell.isp.com
Enter passphrase for key '/home/you/.ssh/id_dsa': ************
Last login: Mon Mar 24 02:17:27 2014 from ex.ample.com
shell.isp.com>
```
上面例子中，SSH 客户端使用私钥之前，会要求用户输入密码（`passphrase`），用来解开私钥。
### ssh-copy-id 命令：自动上传公钥
OpenSSH 自带一个ssh-copy-id命令，可以自动将公钥拷贝到远程服务器的`~/.ssh/authorized_keys`文件。如果`~/.ssh/authorized_keys`文件不存在，`ssh-copy-id`命令会自动创建该文件。

用户在本地计算机执行下面的命令，就可以把本地的公钥拷贝到服务器。
```shell
$ ssh-copy-id -i key_file user@host
```
上面命令中，`-i`参数用来指定公钥文件，`user`是所要登录的账户名，`host`是服务器地址。如果省略用户名，默认为当前的本机用户名。执行完该命令，公钥就会拷贝到服务器。

注意，公钥文件可以不指定路径和`.pub`后缀名，`ssh-copy-id`会自动在`~/.ssh`目录里面寻找。
```shell
$ ssh-copy-id -i id_rsa user@host
```
上面命令中，公钥文件会自动匹配到`~/.ssh/id_rsa.pub`。

`ssh-copy-id`会采用密码登录，系统会提示输入远程服务器的密码。

注意，`ssh-copy-id`是直接将公钥添加到`authorized_keys`文件的末尾。如果`authorized_keys`文件的末尾不是一个换行符，会导致新的公钥添加到前一个公钥的末尾，两个公钥连在一起，使得它们都无法生效。所以，如果`authorized_keys`文件已经存在，使用ssh-copy-id命令之前，务必保证`authorized_keys`文件的末尾是换行符（假设该文件已经存在）。
### ssh-agent 命令，ssh-add 命令
#### 基本用法
私钥设置了密码以后，每次使用都必须输入密码，有时让人感觉非常麻烦。比如，连续使用scp命令远程拷贝文件时，每次都要求输入密码。

`ssh-agent`命令就是为了解决这个问题而设计的，它让用户在整个 Bash 对话（`session`）之中，只在第一次使用 SSH 命令时输入密码，然后将私钥保存在内存中，后面都不需要再输入私钥的密码了。

第一步，使用下面的命令新建一次命令行对话。
```shell
$ ssh-agent bash
```
上面命令中，如果你使用的命令行环境不是 Bash，可以用其他的 Shell 命令代替。比如zsh和fish。

如果想在当前对话启用`ssh-agent`，可以使用下面的命令。
```shell
$ eval `ssh-agent`
```
上面命令中，`ssh-agent`会先自动在后台运行，并将需要设置的环境变量输出在屏幕上，类似下面这样。
```shell
$ ssh-agent
SSH_AUTH_SOCK=/tmp/ssh-barrett/ssh-22841-agent; export SSH_AUTH_SOCK;
SSH_AGENT_PID=22842; export SSH_AGENT_PID;
echo Agent pid 22842;
```
`eval`命令的作用，就是运行上面的`ssh-agent`命令的输出，设置环境变量。

第二步，在新建的 Shell 对话里面，使用`ssh-add`命令添加默认的私钥（比如`~/.ssh/id_rsa`，或`~/.ssh/id_dsa`，或`~/.ssh/id_ecdsa`，或`~/.ssh/id_ed25519`）。
```shell
$ ssh-add
Enter passphrase for /home/you/.ssh/id_dsa: ********
Identity added: /home/you/.ssh/id_dsa (/home/you/.ssh/id_dsa)
```
上面例子中，添加私钥时，会要求输入密码。以后，在这个对话里面再使用密钥时，就不需要输入私钥的密码了，因为私钥已经加载到内存里面了。

如果添加的不是默认私钥，`ssh-add`命令需要显式指定私钥文件。
```shell
$ ssh-add my-other-key-file
```
上面的命令中，`my-other-key-file`就是用户指定的私钥文件。

第三步，使用`ssh`命令正常登录远程服务器。
```shell
$ ssh remoteHost
```
上面命令中，`remoteHost`是远程服务器的地址，`ssh`使用的是默认的私钥。这时如果私钥设有密码，`ssh`将不再询问密码，而是直接取出内存里面的私钥。

如果要使用其他私钥登录服务器，需要使用`ssh`命令的`-i`参数指定私钥文件。
```shell
$ ssh –i OpenSSHPrivateKey remoteHost
```
最后，如果要退出`ssh-agent`，可以直接退出子 Shell（按下`Ctrl + d`），也可以使用下面的命令。
```shell
$ ssh-agent -k
```
#### ssh-add命令
`ssh-add`命令用来将私钥加入`ssh-agent`，它有如下的参数。

|   |   |   |
|---|---|---|
| -d  | 从内存中删除指定的私钥  | ssh-add -d name-of-key-file  |
| -D  | 从内存中删除所有已经添加的私钥  | ssh-add -D  |
| -l  | 列出所有已经添加的私钥  | ssh-add -l  |
|   |   |   |

### 关闭密码登录
为了安全性，启用密钥登录之后，最好关闭服务器的密码登录。

对于 OpenSSH，具体方法就是打开服务器 `sshd` 的配置文件`/etc/ssh/sshd_config`，将`PasswordAuthentication`这一项设为`no`。
```text
PasswordAuthentication no
```
修改配置文件以后，不要忘了重新启动`sshd`，否则不会生效。
## SSH 服务器
SSH 的架构是 C/S 模式，两端运行的软件是不一样的。OpenSSH 的客户端软件是`ssh`，服务器软件是`sshd`。

如果没有安装`sshd`，可以用下面的命令安装。
```shell
# Debian
$ sudo aptitude install openssh-server

# Red Hat
$ sudo yum install openssh-server
```
一般来说，`sshd`安装后会跟着系统一起启动。如果当前`sshd`没有启动，可以用下面的命令启动。
```shell
$ sshd
```
上面的命令运行后，如果提示`sshd re-exec requires execution with an absolute path`，就需要使用绝对路径来启动。这是为了防止有人出于各种目的，放置同名软件在`$PATH`变量指向的目录中，代替真正的`sshd`。
```shell
# Centos、Ubuntu、OS X
$ /usr/sbin/sshd
```
上面的命令运行以后，`sshd`自动进入后台，所以命令后面不需要加上`&`。

除了直接运行可执行文件，也可以通过`Systemd`启动`sshd`。
```shell
# 启动
systemctl start sshd.service
# 停止
systemctl stop sshd.service
# 重启
systemctl restart sshd.service
```
下面的命令让`sshd`在计算机下次启动时自动运行。
```shell
systemctl enable sshd.service
```
### sshd 配置文件
`sshd`的配置文件在`/etc/ssh`目录，主配置文件是`sshd_config`，此外还有一些安装时生成的密钥。
* `/etc/ssh/sshd_config`：配置文件
* `/etc/ssh/ssh_host_ecdsa_key`：ECDSA 私钥
* `/etc/ssh/ssh_host_ecdsa_key.pub`：ECDSA 公钥
* `/etc/ssh/ssh_host_key`：用于 SSH 1 协议版本的 RSA 私钥
* `/etc/ssh/ssh_host_key.pub`：用于 SSH 1 协议版本的 RSA 公钥
* `/etc/ssh/ssh_host_rsa_key`：用于 SSH 2 协议版本的 RSA 私钥
* `/etc/ssh/ssh_host_rsa_key.pub`：用于 SSH 2 协议版本的 RSA 公钥
* `/etc/pam.d/sshd`：PAM 配置文件

注意，如果重装`sshd`，上面这些密钥都会重新生成，导致客户端重新连接`ssh`服务器时，会跳出警告，拒绝连接。为了避免这种情况，可以在重装`sshd`时，先备份`/etc/ssh`目录，重装后再恢复这个目录。

配置文件`sshd_config`的格式是，每个命令占据一行。每行都是配置项和对应的值，配置项的大小写不敏感，与值之间使用空格分隔。
```text
Port 2034
```
上面的配置命令指定，配置项`Port`的值是 2034。`Port`写成`port`也可。

配置文件还有另一种格式，就是配置项与值之间有一个等号，等号前后的空格可选。
```text
Port = 2034
```
配置文件里面，`#`开头的行表示注释。

注意，注释只能放在一行的开头，不能放在一行的结尾。
```text
Port 2034 # 此处不允许注释
```
上面的写法是错误的。

另外，空行等同于注释。

`sshd`启动时会自动读取默认的配置文件。如果希望使用其他的配置文件，可以用`sshd`命令的`-f`参数指定。
```shell
$ sshd -f /usr/local/ssh/my_config
```
上面的命令指定`sshd`使用另一个配置文件`my_config`。

修改配置文件以后，可以用`sshd`命令的`-t（test）`检查有没有语法错误。
```shell
$ sshd -t
```
配置文件修改以后，并不会自动生效，必须重新启动`sshd`。
```shell
$ sudo systemctl restart sshd.service
```
### sshd 密钥
`sshd`有自己的一对或多对密钥。它使用密钥向客户端证明自己的身份。所有密钥都是公钥和私钥成对出现，公钥的文件名一般是私钥文件名加上后缀`.pub`。

DSA 格式的密钥文件默认为`/etc/ssh/ssh_host_dsa_key`（公钥为`ssh_host_dsa_key.pub`），RSA 格式的密钥为`/etc/ssh/ssh_host_rsa_key`（公钥为`ssh_host_rsa_key.pub`）。如果需要支持 SSH 1 协议，则必须有密钥`/etc/ssh/ssh_host_key`。

如果密钥不是默认文件，那么可以通过配置文件`sshd_config`的`HostKey`配置项指定。默认密钥的`HostKey`设置如下。
```text
# HostKey for protocol version 1
# HostKey /etc/ssh/ssh_host_key

# HostKeys for protocol version 2
# HostKey /etc/ssh/ssh_host_rsa_key
# HostKey /etc/ssh/ssh_host_dsa_ke
```
上面命令前面的`#`表示这些行都是注释，因为这是默认值，有没有这几行都一样。

如果要修改密钥，就要去掉行首的`#`，指定其他密钥。
```text
HostKey /usr/local/ssh/my_dsa_key
HostKey /usr/local/ssh/my_rsa_key
HostKey /usr/local/ssh/my_old_ssh1_key
```
### sshd 配置项
以下是`/etc/ssh/sshd_config`文件里面的配置项。
* `AcceptEnv`
`AcceptEnv`指定允许接受客户端通过`SendEnv`命令发来的哪些环境变量，即允许客户端设置服务器的环境变量清单，变量名之间使用空格分隔（`AcceptEnv PATH TERM`）。
* `AllowGroups`
`AllowGroups`指定允许登录的用户组（`AllowGroups groupName`），多个组之间用空格分隔。如果不使用该项，则允许所有用户组登录。
* `AllowUsers`
`AllowUsers`指定允许登录的用户，用户名之间使用空格分隔（`AllowUsers user1 user2`），也可以使用多行`AllowUsers`命令指定，用户名支持使用通配符。如果不使用该项，则允许所有用户登录。该项也可以使用用户名@域名的格式（比如`AllowUsers jones@example.com`）。
* `AllowTcpForwarding`
`AllowTcpForwarding`指定是否允许端口转发，默认值为`yes（AllowTcpForwarding yes）`，`local`表示只允许本地端口转发，remote表示只允许远程端口转发。
* `AuthorizedKeysFile`
`AuthorizedKeysFile`指定储存用户公钥的目录，默认是用户主目录的`ssh/authorized_keys`目录（`AuthorizedKeysFile .ssh/authorized_keys`）。
* `Banner`
`Banner`指定用户登录后，`sshd`向其展示的信息文件（`Banner /usr/local/etc/warning.txt`），默认不展示任何内容。
* `ChallengeResponseAuthentication`
`ChallengeResponseAuthentication`指定是否使用“键盘交互”身份验证方案，默认值为`yes（ChallengeResponseAuthentication yes）`。

从理论上讲，“键盘交互”身份验证方案可以向用户询问多重问题，但是实践中，通常仅询问用户密码。如果要完全禁用基于密码的身份验证，请将`PasswordAuthentication`和`ChallengeResponseAuthentication`都设置为`no`。
* `Ciphers`
`Ciphers`指定`sshd`可以接受的加密算法（`Ciphers 3des-cbc`），多个算法之间使用逗号分隔。
* `ClientAliveCountMax`
`ClientAliveCountMax`指定建立连接后，客户端失去响应时（超过指定时间，没有收到任何消息），服务器尝试连接（发送消息）的次数（`ClientAliveCountMax 8`）。
* `ClientAliveInterval`
`ClientAliveInterval`指定允许客户端发呆的时间，单位为秒（`ClientAliveInterval 180`）。超过这个时间，服务器将发送消息以请求客户端的响应。如果为0，表示不向客户端发送消息，即连接不会自动断开。
* `Compression`
`Compression`指定客户端与服务器之间的数据传输是否压缩。默认值为`yes（Compression yes）`
* `DenyGroups`
`DenyGroups`指定不允许登录的用户组（`DenyGroups groupName`）。
* `DenyUsers`
`DenyUsers`指定不允许登录的用户（`DenyUsers user1`），用户名之间使用空格分隔，也可以使用多行`DenyUsers`命令指定。
* `FascistLogging`
SSH 1 版本专用，指定日志输出全部`Debug`信息（`FascistLogging yes`）。
* `HostKey`
`HostKey`指定`sshd`服务器的密钥，详见前文。
* `KeyRegenerationInterval`
`KeyRegenerationInterval`指定 SSH 1 版本的密钥重新生成时间间隔，单位为秒，默认是 3600 秒（`KeyRegenerationInterval 3600`）。
* `ListenAddress`
`ListenAddress`指定`sshd`监听的本机 IP 地址，即`sshd`启用的 IP 地址，默认是`0.0.0.0（ListenAddress 0.0.0.0）`表示在本机所有网络接口启用。可以改成只在某个网络接口启用（比如`ListenAddress 192.168.10.23`），也可以指定某个域名启用（比如`ListenAddress server.example.com`）。

如果要监听多个指定的 IP 地址，可以使用多行`ListenAddress`命令。
```text
ListenAddress 172.16.1.1
ListenAddress 192.168.0.1
LoginGraceTime

```
`LoginGraceTime`指定允许客户端登录时发呆的最长时间，比如用户迟迟不输入密码，连接就会自动断开，单位为秒（`LoginGraceTime 60`）。如果设为 0，就表示没有限制。
* `LogLevel`
`LogLevel`指定日志的详细程度，可能的值依次为`QUIET、FATAL、ERROR、INFO、VERBOSE、DEBUG、DEBUG1、DEBUG2、DEBUG3`，默认为`INFO（LogLevel INFO）`。
* `MACs`
`MACs`指定`sshd`可以接受的数据校验算法（`MACs hmac-sha1`），多个算法之间使用逗号分隔。
* `MaxAuthTries`
`MaxAuthTries`指定允许 SSH 登录的最大尝试次数（`MaxAuthTries 3`），如果密码输入错误达到指定次数，SSH 连接将关闭。
* `MaxStartups`
`MaxStartups`指定允许同时并发的 SSH 连接数量（`MaxStartups`）。如果设为 0，就表示没有限制。
这个属性也可以设为`A:B:C`的形式，比如`MaxStartups 10:50:20`，表示如果达到 10 个并发连接，后面的连接将有50%的概率被拒绝；如果达到 20 个并发连接，则后面的连接将 100% 被拒绝。
* `PasswordAuthentication`
`PasswordAuthentication`指定是否允许密码登录，默认值为`yes（PasswordAuthentication yes）`，建议改成`no`（禁止密码登录，只允许密钥登录）。
* `PermitEmptyPasswords`
`PermitEmptyPasswords`指定是否允许空密码登录，即用户的密码是否可以为空，默认为`yes（PermitEmptyPasswords yes）`，建议改成`no`（禁止无密码登录）。
* `PermitRootLogin`
`PermitRootLogin`指定是否允许根用户登录，默认为`yes（PermitRootLogin yes）`，建议改成`no`（禁止根用户登录）。

还有一种写法是写成`prohibit-password`，表示`root`用户不能用密码登录，但是可以用密钥登录。
```text
PermitRootLogin prohibit-password
```
* `PermitUserEnvironment`
`PermitUserEnvironment`指定是否允许`sshd`加载客户端的`~/.ssh/environment`文件和`~/.ssh/authorized_keys`文件里面的`environment= options`环境变量设置。默认值为`no（PermitUserEnvironment no）`。
* `Port`
`Port`指定`sshd`监听的端口，即客户端连接的端口，默认是`22（Port 22）`。出于安全考虑，可以改掉这个端口（比如`Port 8822`）。

配置文件可以使用多个`Port`命令，同时监听多个端口。
```text
Port 22
Port 80
Port 443
Port 8080
```
上面的示例表示同时监听4个端口。
* `PrintMotd`
`PrintMotd`指定用户登录后，是否向其展示系统的`motd（Message of the day）`的信息文件`/etc/motd`。该文件用于通知所有用户一些重要事项，比如系统维护时间、安全问题等等。默认值为`yes（PrintMotd yes）`，由于 Shell 一般会展示这个信息文件，所以这里可以改为`no`。
* `PrintLastLog`
`PrintLastLog`指定是否打印上一次用户登录时间，默认值为`yes（PrintLastLog yes）`。
* `Protocol`
`Protocol`指定`sshd`使用的协议。`Protocol 1`表示使用 SSH 1 协议，建议改成`Protocol 2`（使用 SSH 2 协议）。`Protocol 2,1`表示同时支持两个版本的协议。
* `PubkeyAuthentication`
`PubkeyAuthentication`指定是否允许公钥登录，默认值为`yes（PubkeyAuthentication yes）`。
* `QuietMode`
SSH 1 版本专用，指定日志只输出致命的错误信息（`QuietMode yes`）。
* `RSAAuthentication`
`RSAAuthentication`指定允许 RSA 认证，默认值为`yes（RSAAuthentication yes）`。
* `ServerKeyBits`
`ServerKeyBits`指定 SSH 1 版本的密钥重新生成时的位数，默认是`768（ServerKeyBits 768）`。
* `StrictModes`
`StrictModes`指定`sshd`是否检查用户的一些重要文件和目录的权限。默认为`yes（StrictModes yes）`，即对于用户的 SSH 配置文件、密钥文件和所在目录，SSH 要求拥有者必须是根用户或用户本人，用户组和其他人的写权限必须关闭。
* `SyslogFacility`
`SyslogFacility`指定`Syslog`如何处理`sshd`的日志，默认是`Auth（SyslogFacility AUTH）`。
* `TCPKeepAlive`
`TCPKeepAlive`指定系统是否应向客户端发送`TCP keepalive`消息（`TCPKeepAlive yes`）。
* `UseDNS`
`UseDNS`指定用户 SSH 登录一个域名时，服务器是否使用 DNS，确认该域名对应的 IP 地址包含本机（`UseDNS yes`）。打开该选项意义不大，而且如果 DNS 更新不及时，还有可能误判，建议关闭。
* `UseLogin`
`UseLogin`指定用户认证内部是否使用`/usr/bin/login`替代 SSH 工具，默认为`no（UseLogin no）`。
* `UserPrivilegeSeparation`
`UserPrivilegeSeparation`指定用户认证通过以后，使用另一个子线程处理用户权限相关的操作，这样有利于提高安全性。默认值为`yes（UsePrivilegeSeparation yes）`。
* `VerboseMode`
SSH 2 版本专用，指定日志输出详细的`Debug`信息（`VerboseMode yes`）。
* `X11Forwarding`
`X11Forwarding`指定是否打开 X window 的转发，默认值为`no（X11Forwarding no）`。

修改配置文件以后，可以使用下面的命令验证，配置文件是否有语法错误。
```shell
$ sshd -t
```
新的配置文件生效，必须重启`sshd`。
```shell
$ sudo systemctl restart sshd
```

### sshd 的命令行配置项
`sshd`命令有一些配置项。这些配置项在调用时指定，可以覆盖配置文件的设置。
#### -d
`-d`参数用于显示`debug`信息。
```shell
$ sshd -d
```
#### -D
`-D`参数指定`sshd`不作为后台守护进程运行。
```shell
$ sshd -D
```
#### -e
`-e`参数将`sshd`写入系统日志`syslog`的内容导向标准错误（`standard error`）。
#### -f
`-f`参数指定配置文件的位置。
#### -h
`-h`参数用于指定密钥。
```shell
$ sshd -h /usr/local/ssh/my_rsa_key
```
#### -o
`-o`参数指定配置文件的一个配置项和对应的值。
```shell
$ sshd -o "Port 2034"
```
配置项和对应值之间，可以使用等号。
```shell
$ sshd -o "Port = 2034"
```
如果省略等号前后的空格，也可以不使用引号。
```shell
$ sshd -o Port=2034
```
`-o`参数可以多个一起使用，用来指定多个配置关键字。
#### -p
`-p`参数指定`sshd`的服务端口。
```shell
$ sshd -p 2034
```
上面命令指定`sshd`在 2034 端口启动。

`-p`参数可以指定多个端口。
```shell
$ sshd -p 2222 -p 3333
```
#### -t
`-t`参数检查配置文件的语法是否正确。
