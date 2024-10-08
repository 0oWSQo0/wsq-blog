---
title: Linux权限管理
date: 2024-03-05
tags: linux基础
categories: linux
order: 7
---

## chgrp命令：修改文件和目录的所属组
`chgrp`命令用于修改文件或目录的所属组。
```bash
chgrp [-R] 所属组 文件名（目录名）
```
`-R`（注意是大写）选项常作用于更改目录的所属组，表示更改连同子目录中所有文件的所属组信息。

使用此命令需要注意的一点是，要被改变的群组名必须是真实存在的，否则命令无法正确执行，会提示`invaild group name`。

当以`root`身份登录 Linux 系统时，主目录中会存在一个名为`install.log`的文件，我们可以使用如下方法修改此文件的所属组：
```bash
[root@localhost ~]# groupadd group1
#新建用于测试的群组 group1
[root@localhost ~]# chgrp group1 install.log
#修改install.log文件的所属组为group1
[root@localhost ~]# ll install.log
-rw-r--r--. 1 root group1 78495 Nov 17 05:54 install.log
#修改生效
[root@localhost ~]# chgrp testgroup install.log
chgrp: invaild group name 'testgroup'
```
## chown命令：修改文件和目录的所有者和所属组
`chown(change owner)`命令主要用于修改文件或目录的所有者，也可以修改文件或目录的所属组。

当只需要修改所有者时，可使用如下`chown`命令：
```
chown [-R] 所有者 文件或目录
```
`-R`（大写）选项表示连同子目录中的所有文件，都更改所有者。

如果需要同时更改所有者和所属组，`chown`命令：
```
chown [-R] 所有者:所属组 文件或目录
```
当然，`chown`命令也支持单纯的修改文件或目录的所属组，例如`chown:group install.log`就表示修改`install.log`文件的所属组，但修改所属组通常使用`chgrp`命令，因此并不推荐使用`chown`命令。

另外需要注意的一点是，使用`chown`命令修改文件或目录的所有者（或所属者）时，要保证使用者用户（或用户组）存在，否则该命令无法正确执行，会提示`invalid user`或者`invaild group`。
```bash
[root@localhost ~]# touch file #由root用户创建file文件
[root@localhost ~]# ll file
-rw-r--r--. 1 root root 0 Apr 17 05:12 file
#文件的所有者是root，普通用户user对这个文件拥有只读权限
[root@localhost ~]# chown user file #修改文件的所有者
[root@localhost ~]# ll file
-rw-r--r--. 1 user root 0 Apr 17 05:12 file
#所有者变成了user用户，这时user用户对这个文件就拥有了读、写权限
```
可以看到，通过修改`file`文件的所有者，`user`用户从其他人身份（只对此文件有读取权限）转变成了所有者身份，对此文件拥有读和写权限。

Linux 系统中，用户等级权限的划分是非常清楚的，`root`用户拥有最高权限，可以修改任何文件的权限，而普通用户只能修改自己文件的权限（所有者是自己的文件）：
```bash
[root@localhost ~]# cd /home/user #进入user用户的家目录
[root@localhost user]# touch test #由root用户新建文件test
[root@localhost user]# ll test
-rw-r--r--. 1 root root 0 Apr 17 05:37 test
#文件所有者和所属组都是root用户
[root@localhost user]# su - user #切换为user用户
[user@localhost ~]$ chmod 755 test
chmod:更改"test"的权限：不允许的操作 #user用户不能修改test文件的权限
[user@localhost ~]$ exit #退回到root身份
[root@localhost user]# chown user test
#由root用户把test文件的所有者改为user用户
[root@localhost user]# su - user #切换为user用户
[user@localhost ~]$ chmod 755 test
#user用户由于是test文件的所有者，所以可以修改文件的权限
[user@localhost ~]$ ll test
-rwxr-xr-x. 1 user root 0 Apr 17 05:37 test
#查看权限
```
可以看到，`user`用户无权更改所有者为`root`用户文件的权限，只有普通用户是这个文件的所有者，才可以修改文件的权限。
```bash
[root@localhost ~]# chown user:group file
[root@localhost ~]# ll file
-rw-r--r--. 1 user group 0 Apr 17 05:12 file
```
## 权限位
最常见的文件权限有 3 种，即对文件的读（用`r`表示）、写（用`w`表示）和执行（用`x`表示，针对可执行文件或目录）权限。每个文件都明确规定了不同身份用户的访问权限，通过`ls`命令即可看到。
```bash
[root@localhost ~]# ls -al
total 156
drwxr-x---.   4    root   root     4096   Sep  8 14:06 .
drwxr-xr-x.  23    root   root     4096   Sep  8 14:21 ..
-rw-------.   1    root   root     1474   Sep  4 18:27 anaconda-ks.cfg
-rw-------.   1    root   root      199   Sep  8 17:14 .bash_history
-rw-r--r--.   1    root   root       24   Jan  6  2007 .bash_logout
...
```
可以看到，每行的第一列表示的就是各文件针对不同用户设定的权限，一共 11 位，但第 1 位用于表示文件的具体类型，最后一位此文件受 SELinux 的安全规则管理。

因此，为文件设定不同用户的读、写和执行权限，仅涉及到 9 位字符，以`ls`命令输出信息中的`.bash_logout`文件为例，设定不同用户的访问权限是`rw-r--r--`，各权限位的含义如图所示。

![文件权限位](Linux权限管理/1.gif)

从图中可以看到，Linux 将访问文件的用户分为 3 类，分别是文件的所有者，所属组（也就是文件所属的群组）以及其他人。

除了所有者，以及所属群组中的用户可以访问文件外，其他用户（其他群组中的用户）也可以访问文件，这部分用户都归为其他人范畴。

很显然，Linux 系统为 3 种不同的用户身份，分别规定了是否对文件有读、写和执行权限。
## 读写执行权限（-r、-w、-x）的含义
### rwx 权限对文件的作用
文件，是系统中用来存储数据的，包括普通的文本文件、数据库文件、二进制可执行文件，等等。

| rwx 权限 | 对文件的作用 |
| :--: | :-- |
| 读权限（r） | 表示可读取此文件中的实际内容，例如，可以对文件执行 cat、more、less、head、tail 等文件查看命令。 |
| 写权限（w） | 表示可以编辑、新增或者修改文件中的内容，例如，可以对文件执行 vim、echo 等修改文件数据的命令。注意，无权限不赋予用户删除文件的权利，除非用户对文件的上级目录拥有写权限才可以。 |
| 执行权限（x） | 表示该文件具有被系统执行的权限。Window系统中查看一个文件是否为可执行文件，是通过扩展名（.exe、.bat 等），但在 Linux 系统中，文件是否能被执行，是通过看此文件是否具有 x 权限来决定的。也就是说，只要文件拥有 x 权限，则此文件就是可执行文件。但是，文件到底能够正确运行，还要看文件中的代码是否正确。 |

对于文件来说，执行权限是最高权限。给用户或群组设定权限时，是否赋予执行权限需要慎重考虑，否则会对系统安装造成严重影响。
### rwx 权限对目录的作用
目录，主要用来记录文件名列表，不同的权限对目录的作用如表 2 所示。

| rwx 权限   | 对目录的作用 |
| :--: | :-- |
| 读权限（r） | 表示具有读取目录结构列表的权限，也就是说，可以看到目录中有哪些文件和子目录。一旦对目录拥有 r 权限，就可以在此目录下执行 ls 命令，查看目录中的内容。 |
| 写权限（w） | 对于目录来说，w 权限是最高权限。对目录拥有 w 权限，表示可以对目录做以下操作：在此目录中建立新的文件或子目录；删除已存在的文件和目录（无论子文件或子目录的权限是怎样的）；对已存在的文件或目录做更名操作；移动此目录下的文件和目录的位置。一旦对目录拥有 w 权限，就可以在目录下执行`touch、rm、cp、mv`等命令。 |
| 执行权限（x） | 目录是不能直接运行的，对目录赋予 x 权限，代表用户可以进入目录，也就是说，赋予 x 权限的用户或群组可以使用`cd`命令。 |

对目录来说，如果只赋予`r`权限，则此目录是无法使用的。很简单，只有`r`权限的目录，用户只能查看目录结构，根本无法进入目录（需要用`x`权限），更不用说使用了。

> 注意：如果要删除一个文件，不是看文件有没有对应的权限，而是看文件所在的目录，是否有写权限，有才可以删除（同时具备执行权限）。

## chmod命令：修改文件或目录的权限
`chmod`命令设定文件权限的方式有 2 种，分别可以使用数字或者符号来进行权限的变更。
### 使用数字修改文件权限
文件的基本权限由 9 个字符组成，以`rwxrw-r-x`为例，我们可以使用数字来代表各个权限，各个权限与数字的对应关系如下：
```
r --> 4
w --> 2
x --> 1
```
由于这 9 个字符分属 3 类用户，因此每种用户身份包含 3 个权限（`r、w、x`），通过将 3 个权限对应的数字累加，最终得到的值即可作为每种用户所具有的权限。

拿`rwxrw-r-x`来说，所有者、所属组和其他人分别对应的权限值为：
```
所有者 = rwx = 4+2+1 = 7
所属组 = rw- = 4+2 = 6
其他人 = r-x = 4+1 = 5
```
所以，此权限对应的权限值就是 765。

使用数字修改文件权限的`chmod`命令：
```bash
chmod [-R] 权限值 文件名
```
`-R`（注意是大写）选项表示连同子目录中的所有文件，也都修改设定的权限。
```bash
[root@localhost ~]# ls -al .bashrc
-rw-r--r--. 1 root root 176 Sep 22 2004 .bashrc
[root@localhost ~]# chmod 777 .bashrc
[root@localhost ~]# ls -al .bashrc
-rwxrwxrwx. 1 root root 176 Sep 22 2004 .bashrc
```
通常我们以 Vim 编辑 Shell 文件批处理文件后，文件权限通常是`rw-rw-r--（644）`，那么，如果要将该文件变成可执行文件，并且不让其他人修改此文件，则只需将此文件的权限该为`rwxr-xr-x（755）`即可。
### 使用字母修改文件权限
既然文件的基本权限就是 3 种用户身份（所有者、所属组和其他人）搭配 3 种权限（`rwx`），`chmod`命令中用`u、g、o`分别代表 3 种身份，还用`a`表示全部的身份（`all`的缩写）。另外，`chmod`命令仍使用`r、w、x`分别表示读、写、执行权限。

使用字母修改文件权限的`chmod`命令，其基本格式如图所示。

![chmod 命令基本格式](Linux权限管理/2.gif)

例如，如果我们要设定`.bashrc`文件的权限为`rwxr-xr-x`，则可执行如下命令：
```bash
[root@localhost ~]# chmod u=rwx,go=rx .bashrc
[root@localhost ~]# ls -al .bashrc
-rwxr-xr-x. 1 root root 176 Sep 22 2004 .bashrc
```
如果想要增加`.bashrc`文件的每种用户都可做写操作的权限，可以使用如下命令：
```bash
[root@localhost ~]# ls -al .bashrc
-rwxr-xr-x. 1 root root 176 Sep 22 2004 .bashrc
[root@localhost ~]# chmod a+w .bashrc
[root@localhost ~]# ls -al .bashrc
-rwxrwxrwx. 1 root root 176 Sep 22 2004 .bashrc
```
## umask命令：默认权限的设定和修改
Windows 系统中，新建的文件和目录时通过继承上级目录的权限获得的初始权限，而 Linux 不同，它是通过使用`umask`默认权限来给所有新建的文件和目录赋予初始权限的。

直接通过`umask`命令可得知`umask`默认权限的值即可：
```bash
[root@localhost ~]# umask
0022
#root用户默认是0022，普通用户默认是 0002
```
`umask`默认权限确实由 4 个八进制数组成，但第 1 个数代表的是文件所具有的特殊权限（SetUID、SetGID、Sticky BIT）。也就是说，后 3 位数字 "022" 才是真正要用到的`umask`权限值，将其转变为字母形式为`----w--w-`。

注意，虽然`umask`默认权限是用来设定文件或目录的初始权限，但并不是直接将`umask`默认权限作为文件或目录的初始权限，还要对其进行"再加工"。

文件和目录的真正初始权限，可通过以下的计算得到：
```
文件（或目录）的初始权限 = 文件（或目录）的最大默认权限 - umask权限
```
如果按照官方的标准算法，需要将`umask`默认权限使用二进制并经过逻辑与和逻辑非运算后，才能得到最终文件或目录的初始权限，计算过程比较复杂，且容易出错。

显然，如果想最终得到文件或目录的初始权限值，我们还需要了解文件和目录的最大默认权限值。在 Linux 系统中，文件和目录的最大默认权限是不一样的：
* 对文件来讲，其可拥有的最大默认权限是 666，即`rw-rw-rw-`。也就是说，使用文件的任何用户都没有执行（`x`）权限。原因很简单，执行权限是文件的最高权限，赋予时绝对要慎重，因此绝不能在新建文件的时候就默认赋予，只能通过用户手工赋予。
* 对目录来讲，其可拥有的最大默认权限是 777，即`rwxrwxrwx`。

接下来，我们利用字母权限的方式计算文件或目录的初始权限。以`umask`值为 022 为例，分别计算新建文件和目录的初始权限：
* 文件的最大默认权限是 666，换算成字母就是`-rw-rw-rw-`，`umask`的值是 022，换算成字母为`-----w--w-`。把两个字母权限相减，得到`(-rw-rw-rw-) - (-----w--w-) = (-rw-r--r--)`，这就是新建文件的初始权限。我们测试一下：
```bash
[root@localhost ~]# umask
0022
#默认umask的值是0022
[root@localhost ~]# touch file  <--新建file空文件
[root@localhost ~]# ll -d file
-rw-r--r--. 1 root root 0 Apr 18 02:36 file
```
* 目录的默认权限最大可以是 777，换算成字母就是`drwxrwxrwx`，`umask`的值是 022，也就是`-----w--w-`。把两个字母权限相减，得到的就是新建目录的默认权限，即`(drwxrwxrwx) - (-----w--w-) = (drwxr-xr-x)`。我们再来测试一下：
```bash
[root@localhost ~]# umask
0022
[root@localhost ~]# mkdir catalog  <--新建catalog目录
[root@localhost ~]# ll -d catalog
drwxr-xr-x. 2 root root 4096 Apr 18 02:36 catalog
```

注意，在计算文件或目录的初始权限时，不能直接使用最大默认权限和`umask`权限的数字形式做减法，这是不对的。例如，若`umask`默认权限的值为 033，按照数字形式计算文件的初始权限，666-033=633，但我们按照字母的形式计算会得到`（rw-rw-rw-) - (----wx-wx) = (rw-r--r--)`，换算成数字形式是 644。

这里的减法，其实是“遮盖”的意思，也就是说，最大默认权限中和`umask`权限公共的部分，通过减法运算会被遮盖掉，最终剩下的“最大默认权限”，才是最终赋予文件或目录的初始权限。
### umask默认权限的修改方法
`umask`权限值可以通过如下命令直接修改：
```bash
[root@localhost ~]# umask 002
[root@localhost ~]# umask
0002
[root@localhost ~]# umask 033
[root@localhost ~]# umask
0033
```
不过，这种方式修改的`umask`只是临时有效，一旦重启或重新登陆系统，就会失效。如果想让修改永久生效，则需要修改对应的环境变量配置文件`/etc/profile`。例如：
```bash
[root@localhost ~]# vim /etc/profile
...省略部分内容...
if [ $UID -gt 199]&&[ "'id -gn'" = "'id -un'" ]; then
    umask 002
    #如果UID大于199（普通用户），则使用此umask值
else
    umask 022
    #如果UID小于199（超级用户），则使用此umask值
fi
…省略部分内容…
```
普通用户的`umask`由`if`语句的第一段定义，而超级用户`root`的`umask`值由`else`语句定义即可。 修改此文件，则`umask`值就会永久生效。
## ACL访问控制权限
Linux 系统传统的权限控制方式，无非是利用 3 种身份（文件所有者，所属群组，其他用户），并分别搭配 3 种权限（读`r`，写`w`，访问`x`）。比如，我们可以通过`ls -l`命令查看当前目录中所有文件的详细信息，其中就包含对各文件的权限设置：
```bash
[root@localhost ~]# ls -l
total 36
drwxr-xr-x. 2 root root 4096 Apr 15 16:33 Desktop
drwxr-xr-x. 2 root root 4096 Apr 15 16:33 Documents
...
-rwxr-xr-x. 2 root root 4096 Apr 15 16:33 post-install
...
```
以上输出信息中，`rwxr-xr-x`就指明了不同用户访问文件的权限，即文件所有者拥有对文件的读、写、访问权限（`rwx`），文件所属群组拥有对文件的读、访问权限（`r-x`），其他用户拥有对文件的读、访问权限（`r-x`）。

权限前的字符，表示文件的具体类型，比如`d`表示目录，`-`表示普通文件，`l`表示连接文件，`b`表示设备文件，等等。

普通权限的三种身份不够用了，无法实现对某个单独的用户设定访问权限，这种情况下，就需要使用 ACL 访问控制权限。

ACL，是`Access Control List`（访问控制列表）的缩写，在 Linux 系统中，ACL 可实现对单一用户设定访问文件的权限。也可以这么说，设定文件的访问权限，除了用传统方式（3 种身份搭配 3 种权限），还可以使用 ACL 进行设定。
### 开启 ACL 权限
CentOS 6.x 系统中，ACL 权限默认处于开启状态，无需手工开启。但如果你的操作系统不是 CentOS 6.x，可以通过如下方式查看ACL权限是否开启：
```bash
[root@localhost ~]# mount
/dev/sda1 on /boot type ext4 (rw)
/dev/sda3 on I type ext4 (rw)
…省略部分输出…
#使用mount命令可以看到系统中已经挂载的分区，但是并没有看到ACL权限的设置
[root@localhost ~]# dumpe2fs -h /dev/sda3
#dumpe2fs是查询指定分区文件系统详细信息的命令
…省略部分输出…
Default mount options: user_xattr acl
…省略部分输出…
```
其中，`dumpe2fs`命令的`-h`选项表示仅显示超级块中的信息，而不显示磁盘块组的详细信息；

使用`mount`命令可以查看到系统中已经挂载的分区，而使用`dumpe2fs`命令可以查看到这个分区文件系统的详细信息。大家可以看到，我们的 ACL 权限是`/dev/sda3`分区的默认挂载选项，所以不需要手工挂载。

如果 Linux 系统如果没有默认挂载，可以执行如下命令实现手动挂载：
```bash
[root@localhost ~]# mount -o remount,acl /
#重新挂载根分区，并加入ACL权限
```
使用`mount`命令重新挂载，并加入 ACL 权限。但使用此命令只是临时生效，要想永久生效，需要修改`/etc/fstab`文件，修改方法如下：
```bash
[root@localhost ~]# vi /etc/fstab
UUID=c2ca6f57-b15c-43ea-bca0-f239083d8bd2 /ext4 defaults,acl 1 1
#加入ACL权限
[root@localhost ~]# mount -o remount /
#重新挂载文件系统或重启系统，使修改生效
```
在你需要开启 ACL 权限的分区行上（也就是说 ACL 权限针对的是分区），手工在`defaults`后面加入`"，acl"`即可永久在此分区中开启 ACL 权限。
## ACL权限设置
设定 ACL 权限，常用命令有 2 个，分别是`setfacl`和`getfacl`命令，前者用于给指定文件或目录设定 ACL 权限，后者用于查看是否配置成功。

`getfacl`命令用于查看文件或目录当前设定的 ACL 权限信息：
```
getfacl 文件名
```
`getfacl`命令的使用非常简单，且常和`setfacl`命令一起搭配使用。

`setfacl`命令可直接设定用户或群组对指定文件的访问权限。
```
setfacl 选项 文件名
```

| 选项	  | 功能 |
| :--: | :-- |
| -m 参数	  | 设定 ACL 权限。如果是给予用户 ACL 权限，参数则使用 "u:用户名:权限" 的格式，例如`setfacl -m u:st:rx /project`表示设定 st 用户对 project 目录具有 rx 权限；如果是给予组 ACL 权限，参数则使用 "g:组名:权限" 格式，例如`setfacl -m g:tgroup:rx /project`表示设定群组 tgroup 对 project 目录具有 rx 权限。 |
| -x 参数	  | 删除指定用户（参数使用 u:用户名）或群组（参数使用 g:群组名）的 ACL 权限，例如 setfacl -x u:st /project 表示删除 st 用户对 project 目录的 ACL 权限。 |
| -b	      | 删除所有的 ACL 权限，例如 setfacl -b /project 表示删除有关 project 目录的所有 ACL 权限。 |
| -d	      | 设定默认 ACL 权限，命令格式为 "setfacl -m d:u:用户名:权限 文件名"（如果是群组，则使用 d:g:群组名:权限），只对目录生效，指目录中新建立的文件拥有此默认权限，例如 setfacl -m d:u:st:rx /project 表示 st 用户对 project 目录中新建立的文件拥有 rx 权限。 |
| -R	      | 递归设定 ACL 权限，指设定的 ACL 权限会对目录下的所有子文件生效，命令格式为 "setfacl -m u:用户名:权限 -R 文件名"（群组使用 g:群组名:权限），例如 setfacl -m u:st:rx -R /project 表示 st 用户对已存在于 project 目录中的子文件和子目录拥有 rx 权限。 |
| -k	      | 删除默认 ACL 权限。 |
| setfacl -m  | 给用户或群组添加 ACL 权限 |

示例：
根目录中有一个`/project`目录，这是班级的项目目录。班级中的每个学员都可以访问和修改这个目录，老师需要拥有对该目录的最高权限，其他班级的学员当然不能访问这个目录。有一天，班里来了一位试听的学员 st，她必须能够访问`/project`目录，所以必须对这个目录拥有 r 和 x 权限；但是她又没有学习过以前的课程，所以不能赋予她 w 权限，怕她改错了目录中的内容，所以学员 st 的权限就是`r-x`。

解决：
* 老师使用`root`用户，并作为`/project`的所有者，对`project`目录拥有`rwx`权限；
* 新建`tgroup`群组，并作为`project`目录的所属组，包含本班所有的班级学员（假定只有`zhangsan`和`lisi`），拥有对`project`的 rwx 权限；
* 将其他用户访问`project`目录的权限设定为 0（也就是 ---）。
* 对于试听学员 st 来说，我们对其设定 ACL 权限，令该用户对`project`拥有`rx`权限。

```bash
[root@localhost ~]# useradd zhangsan
[root@localhost ~]# useradd lisi
[root@localhost ~]# useradd st
[root@localhost ~]# groupadd tgroup <-- 添加需要试验的用户和用户组，省略设定密码的过程
[root@localhost ~]# mkdir /project <-- 建立需要分配权限的目录
[root@localhost ~]# chown root:tgroup /project <-- 改变/project目录的所有者和所属组
[root@localhost ~]# chmod 770 /project  <-- 指定/project目录的权限
[root@localhost ~]# ll -d /project
drwxrwx---. 2 root tgroup 4096 Apr 16 12:55 /project
#这时st学员来试听了，如何给她分配权限
[root@localhost ~]# setfacl -m u:st:rx /project
#给用户st赋予r-x权限，使用"u:用户名：权限" 格式
[root@localhost /]# cd /
[root@localhost /]# ll -d /project
drwxrwx---+ 2 root tgroup 4096 Apr 16 12:55 /project
#如果查询时会发现，在权限位后面多了一个"+"，表示此目录拥有ACL权限
[root@localhost /]# getfacl project
#查看/prpject目录的ACL权限
#file:project <--文件名
#owner:root <--文件的所有者
#group:tgroup <--文件的所属组
user::rwx <--用户名栏是空的，说明是所有者的权限
user:st:r-x <--用户st的权限
group::rwx <--组名栏是空的，说明是所属组的权限
mask::rwx <--mask权限
other::--- <--其他人的权限
```
可以看到，通过设定 ACL 权限，我们可以单独给 st 用户分配`r-x`权限，而无需给 st 用户设定任何身份。

同样的道理，也可以给用户组设定 ACL 权限：
```bash
[root@localhost /]# groupadd tgroup2
#添加新群组
[root@localhost /]# setfacl -m g:tgroup2:rwx project
#为组tgroup2纷配ACL权限
[root@localhost /]# ll -d project
drwxrwx---+ 2 root tgroup 4096 1月19 04:21 project
#属组并没有更改
[root@localhost /]# getfacl project
#file: project
#owner: root
#group: tgroup
user::rwx
user:st:r-x
group::rwx
group:tgroup2:rwx <-用户组tgroup2拥有了rwx权限
mask::rwx
other::---
```
### setfacl -d：设定默认 ACL 权限
既然已经对`project`目录设定了 ACL 权限，那么，如果在这个目录中新建一些子文件和子目录，这些文件是否会继承父目录的 ACL 权限呢？执行以下命令进行验证：
```bash
[root@localhost /]# cd project
[root@localhost project]# touch abc
[root@localhost project]# mkdir d1
#在/project目录中新建了abc文件和d1目录
[root@localhost project]#ll
总用量4
-rw-r--r-- 1 root root 01月19 05:20 abc
drwxr-xr-x 2 root root 4096 1月19 05:20 d1
```
可以看到，这两个新建立的文件权限位后面并没有 "+"，表示它们没有继承 ACL 权限。这说明，后建立的子文件或子目录，并不会继承父目录的 ACL 权限。

当然，我们可以手工给这两个文件分配 ACL 权限，但是如果在目录中再新建文件，都要手工指定，则显得过于麻烦。这时就需要用到默认 ACL 权限。

默认 ACL 权限的作用是，如果给父目录设定了默认 ACL 权限，那么父目录中所有新建的子文件都会继承父目录的 ACL 权限。需要注意的是，默认 ACL 权限只对目录生效。

例如，给 project 文件设定 st 用户访问 rx 的默认 ACL 权限，可执行如下指令：
```bash
[root@localhost /]# setfacl -m d:u:st:rx project
[root@localhost project]# getfacl project
# file: project
# owner: root
# group: tgroup
user:: rwx
user:st:r-x
group::rwx
group:tgroup2:rwx
mask::rwx
other::---
default:user::rwx <--多出了default字段
default:user:st:r-x
default:group::rwx
default:mask::rwx
default:other::---
[root@localhost /]# cd project
[root@localhost project]# touch bcd
[root@localhost project]# mkdir d2
#新建子文件和子目录
[root@localhost project]# ll 总用量8
-rw-r--r-- 1 root root 01月19 05:20 abc
-rw-rw----+ 1 root root 01月19 05:33 bcd
drwxr-xr-x 2 root root 4096 1月19 05:20 d1
drwxrwx---+ 2 root root 4096 1月19 05:33 d2
#新建的bcd和d2已经继承了父目录的ACL权限
```
原先的 abc 和 d1 还是没有 ACL 权限，因为默认 ACL 权限是针对新建立的文件生效的。

对目录设定的默认 ACL 权限，可直接使用`setfacl -k`命令删除。
```
[root@localhost /]# setfacl -k project
```
通过此命令，即可删除`project`目录的默认 ACL 权限。
### setfacl -R：设定递归 ACL 权限
递归 ACL 权限指的是父目录在设定 ACL 权限时，所有的子文件和子目录也会拥有相同的 ACL 权限。

例如，给`project`目录设定 st 用户访问权限为`rx`的递归 ACL 权限，执行命令如下：
```bash
[root@localhost project]# setfacl -m u:st:rx -R project
[root@localhost project]# ll
总用量 8
-rw-r-xr--+ 1 root root 01月19 05:20 abc
-rw-rwx--+ 1 root root 01月19 05:33 bcd
drwxr-xr-x+ 2 root root 4096 1月19 05:20 d1
drwxrwx---+ 2 root root 4096 1月19 05:33 d2
#abc和d1也拥有了ACL权限
```
注意，默认 ACL 权限指的是针对父目录中后续建立的文件和目录会继承父目录的 ACL 权限；递归 ACL 权限指的是针对父目录中已经存在的所有子文件和子目录会继承父目录的 ACL 权限。
### setfacl -x：删除指定的 ACL 权限
使用`setfacl -x`命令，可以删除指定的 ACL 权限，例如，删除前面建立的`st`用户对`project`目录的 ACL 权限：
```bash
[root@localhost /]# setfacl -x u:st project
#删除指定用户和用户组的ACL权限
[root@localhost /]# getfacl project
# file:project
# owner: root
# group: tgroup
user::rwx
group::rwx
group:tgroup2:rwx
mask::rwx
other::---
#st用户的权限已被删除
```
### setfacl -b：删除指定文件的所有 ACL 权限
此命令可删除所有与指定文件或目录相关的 ACL 权限。例如，现在我们删除一切与`project`目录相关的 ACL 权限：
```bash
[root@localhost /]# setfacl -b project
#会删除文件的所有ACL权限
[root@localhost /]# getfacl project
#file: project
#owner: root
# group: tgroup
user::rwx
group::rwx
other::---
#所有ACL权限已被删除
```
## chattr命令：修改文件系统的权限属性
`chattr`命令，专门用来修改文件或目录的隐藏属性，只有`root`用户可以使用。
```
chattr [+-=] [属性] 文件或目录名
```
`+`表示给文件或目录添加属性，`-`表示移除文件或目录拥有的某些属性，`=`表示给文件或目录设定一些属性。

| 属性选项 | 功能 |
| :--: | :--: |
| i        | 如果对文件设置 i 属性，那么不允许对文件进行删除、改名，也不能添加和修改数据；<br> 如果对目录设置 i 属性，那么只能修改目录下文件中的数据，但不允许建立和删除文件；|
| a        | 如果对文件设置 a 属性，那么只能在文件中増加数据，但是不能删除和修改数据；<br>如果对目录设置 a 属性，那么只允许在目录中建立和修改文件，但是不允许删除文件；|
| u        | 设置此属性的文件或目录，在删除时，其内容会被保存，以保证后期能够恢复，常用来防止意外删除文件或目录。|
| s        | 和 u 相反，删除文件或目录时，会被彻底删除（直接从硬盘上删除，然后用 0 填充所占用的区域），不可恢复。|

```bash
[root@localhost ~]# touch ftest #建立测试文件
[root@localhost ~]# chattr +i ftest
[root@localhost ~]# rm -rf ftest
rm:cannot remove 'ftest':Operation not permitted
#无法删除"ftesr"，操作不允许
#被赋予i属性后，root不能删除
[root@localhost ~]# echo 111>>ftest
bash:ftest:Permission denied
#权限不够，不能修改文件中的数据
```
可以看到，设置有 i 属性的文件，即便是 root 用户，也无法删除和修改数据。
```bash
[root@localhost ~]# mkdir dtest
#建立测试目录
[root@localhost dtest]# touch dtest/abc
#再建立一个测试文件abc
[root@localhost ~]# chattr +i dtest
#给目录赋予i属性
[root@localhost ~]# cd dtest
[root@localhost dtest]# touch bed
touch: cannot touch 'bed':Permission denied
#无法创建"bcd"，权限不够，dtest目录不能新建文件
[root@localhost dtest]# echo 11>>abc
[root@localhost dtest]# cat abc
11
#可以修改文件内容
[root@localhost dtest]# rm -rf abc
rm: cannot remove 'abc': Permission denied
#无法删除"abc"，权限不够
```
一旦给目录设置 i 属性，即使是 root 用户，也无法在目录内部新建或删除文件，但可以修改文件内容。

给设置有 i 属性的文件删除此属性也很简单，只需将 chattr 命令中 + 改为 - 即可。

假设有这样一种应用，我们每天自动实现把服务器的日志备份到指定目录，备份目录可设置 a 属性，变为只可创建文件而不可删除。命令如下：
```bash
[root@localhost ~]# mkdir -p /back/log
#建立备份目录
[root@localhost ~]# chattr +a /back/log
#赋予a属性
[root@localhost ~]# cp /var/log/messages /back/log
#可以复制文件和新建文件到指定目录中
[root@localhost ~]# rm -rf /back/log/messages
rm: cannot remove '/back/log/messages': Permission denied
#无法删除 /back/log/messages，操作不允许
```
注意，通常情况下，不要使用`chattr`命令修改`/、/dev/、/tmp/、/var/`等目录的隐藏属性，很容易导致系统无法启动。另外，`chatrr`命令常与`lsattr`命令合用，前者修改文件或目录的隐藏属性，后者用于查看是否修改成功。
## lsattr命令：查看文件系统属性
使用`chattr`命令配置文件或目录的隐藏属性后，可以使用`lsattr`命令查看。

`lsattr`命令，用于显示文件或目录的隐藏属性：
```
lsattr [选项] 文件或目录名
```

| 选项 | 含义 |
| :--: | :--: |
| -a   | 后面不带文件或目录名，表示显示所有文件和目录（包括隐藏文件和目录） |
| -d   | 如果目标是目录，只会列出目录本身的隐藏属性，而不会列出所含文件或子目录的隐藏属性信息； |
| -R   | 和 -d 恰好相反，作用于目录时，会连同子目录的隐藏信息数据也一并显示出来。 |

```bash
[root@localhost ~]# touch attrtest
-----------e- attrtest
[root@localhost ~]# chattr +aij attrtest
[root@localhost ~]# lsattr attrtest
----ia---j-e- attrtest
```
注意，不使用任何选项，仅用于显示文件的隐藏信息，不适用于目录。
```bash
[root@localhost ~]#lsattr -a
-----------e- ./.
------------- ./..
-----------e- ./.gconfd
-----------e- ./.bashrc
...
```
```bash
[root@localhost ~]#lsattr -d /back/log
-----a------e- /back/log
#查看/back/log目录，其拥有a和e属性
```
## sudo命令：系统权限管理
使用`su`命令可以让普通用户切换到`root`身份去执行某些特权命令，但存在一些问题，比如说：
* 仅仅为了一个特权操作就直接赋予普通用户控制系统的完整权限；
* 当多人使用同一台主机时，如果大家都要使用`su`命令切换到`root`身份，那势必就需要`root`的密码，这就导致很多人都知道`root`的密码；

考虑到使用`su`命令可能对系统安装造成的隐患，最常见的解决方法是使用`sudo`命令，此命令也可以让你切换至其他用户的身份去执行命令。

相对于使用`su`命令还需要新切换用户的密码，`sudo`命令的运行只需要知道自己的密码即可，甚至于，我们可以通过手动修改`sudo`的配置文件，使其无需任何密码即可运行。

`sudo`命令默认只有`root`用户可以运行：
```bash
sudo [-b] [-u 新使用者账号] 要执行的命令
```
常用的选项与参数：
* `-b`：将后续的命令放到背景中让系统自行运行，不对当前的 shell 环境产生影响。
* `-u`：后面可以接欲切换的用户名，若无此项则代表切换身份为`root`。
* `-l`：此选项的用法为`sudo -l`，用于显示当前用户可以用`sudo`执行那些命令。

```bash
[root@localhost ~]#  grep sshd /etc/passwd
sshd:x:74:74:privilege-separated SSH:/var/empty/sshd:/sbin.nologin
[root@localhost ~]#  sudo -u sshd touch /tmp/mysshd
[root@localhost ~]#  ll /tmp/mysshd
-rw-r--r-- 1 sshd sshd 0 Feb 28 17:42 /tmp/mysshd
```
本例中，无法使用`su - sshd`的方式成功切换到`sshd`账户中，因为此用户的默认 Shell 是`/sbin/nologin`。这时就显现出`sudo`的优势，我们可以使用`sudo`以`sshd`的身份在`/tmp`目录下创建`mysshd`文件，可以看到，新创建的`mysshd`文件的所有者确实是`sshd`。
```bash
[root@localhost ~]#  sudo -u vbird1 sh -c "mkdir ~vbird1/www; cd ~vbird1/www; \
>  echo 'This is index.html file' > index.html"
[root@localhost ~]#  ll -a ~vbird1/www
drwxr-xr-x 2 vbird1 vbird1 4096 Feb 28 17:51 .
drwx------ 5 vbird1 vbird1 4096 Feb 28 17:51 ..
-rw-r--r-- 1 vbird1 vbird1   24 Feb 28 17:51 index.html
```
这个例子中，使用`sudo`命令切换至`vbird1`身份，并运行`sh -c`的方式来运行一连串的命令。

默认情况下`sudo`命令只有`root`身份可以使用，那么，如何让普通用户也能使用它呢？

解决这个问题之前，先给大家分析一下`sudo`命令的执行过程。`sudo`命令的运行，需经历如下几步：
* 当用户运行`sudo`命令时，系统会先通过`/etc/sudoers`文件，验证该用户是否有运行`sudo`的权限；
* 确定用户具有使用`sudo`命令的权限后，还要让用户输入自己的密码进行确认。出于对系统安全性的考虑，如果用户在默认时间内（默认是 5 分钟）不使用`sudo`命令，此后使用时需要再次输入密码；
* 密码输入成功后，才会执行`sudo`命令后接的命令。

显然，能否使用`sudo`命令，取决于对`/etc/sudoers`文件的配置（默认情况下，此文件中只配置有`root`用户）。
### sudo命令的配置文件/etc/sudoers
修改`/etc/sudoers`，不建议直接使用`vim`，而是使用`visudo`。因为修改`/etc/sudoers`文件需遵循一定的语法规则，使用`visudo`的好处就在于，当修改完毕`/etc/sudoers`文件，离开修改页面时，系统会自行检验`/etc/sudoers`文件的语法。
```bash
[root@localhost ~]# visudo
…省略部分输出…
root ALL=(ALL) ALL  <--大约 76 行的位置
# %wheel ALL=(ALL) ALL   <--大约84行的位置
#这两行是系统为我们提供的模板，我们参照它写自己的就可以了
…省略部分输出…
```
通过`visudo`命令，我们就打开了`/etc/sudoers`文件，可以看到如上显示的 2 行信息，这是系统给我们提供的 2 个模板，分别用于添加用户和群组，使其能够使用`sudo`命令。

这两行模板的含义分为是：
```
root ALL=(ALL) ALL
#用户名 被管理主机的地址=(可使用的身份) 授权命令(绝对路径)
#%wheel ALL=(ALL) ALL
#%组名 被管理主机的地址=(可使用的身份) 授权命令(绝对路径)
```
`/etc/sudoers`用户和群组模板的含义：

| 模块	| 含义 |
| :--: | :--: |
| 用户名或群组名    | 表示系统中的那个用户或群组，可以使用 sudo 这个命令。 |
| 被管理主机的地址	| 用户可以管理指定 IP 地址的服务器。这里如果写 ALL，则代表用户可以管理任何主机；如果写固定 IP，则代表用户可以管理指定的服务器。如果我们在这里写本机的 IP 地址，不代表只允许本机的用户使用指定命令，而是代表指定的用户可以从任何 IP 地址来管理当前服务器。 |
| 可使用的身份      | 就是把来源用户切换成什么身份使用，（ALL）代表可以切换成任意身份。这个字段可以省略。 |
| 授权命令         | 表示 root 把什么命令命令授权给用户，换句话说，可以用切换的身份执行什么命令。需要注意的是，此命令必须使用绝对路径写。默认值是 ALL，表示可以执行任何命令。 |

授权用户`lamp`可以重启服务器，由`root`用户添加，可以在`/etc/sudoers`模板下添加如下语句：
```bash
[root@localhost ~]# visudo
lamp ALL=/sbin/shutdown -r now
```
注意，这里也可以写多个授权命令，之间用逗号分隔。用户`lamp`可以使用`sudo -l`查看授权的命令列表：
```bash
[root@localhost ~]# su - lamp
#切换成lamp用户
[lamp@localhost ~]$ sudo -l
[sudo] password for lamp:
#需要输入lamp用户的密码
User lamp may run the following commands on this host:
(root) /sbin/shutdown -r now
```
可以看到，`lamp`用户拥有了`shutdown -r now`的权限。这时，`lamp`用户就可以使用`sudo`执行如下命令重启服务器：
```bash
[lamp@localhost ~]$ sudo /sbin/shutdown -r now
```
再次强调，授权命令要使用绝对路径（或者把`/sbin`路径导入普通用户`PATH`路径中，不推荐使用此方式），否则无法执行。

假设现在有`pro1，pro2，pro3`这 3 个用户，还有一个`group`群组，我们可以通过在`/etc/sudoers`文件配置`wheel`群组信息，令这 3 个用户同时拥有管理系统的权限。

首先，向`/etc/sudoers`文件中添加群组配置信息：
```bash
[root@localhost ~]# visudo
....(前面省略)....
%group     ALL=(ALL)    ALL
#在 84 行#wheel这一行后面写入
```
此配置信息表示，`group`这个群组中的所有用户都能够使用`sudo`切换任何身份，执行任何命令。接下来，我们使用`usermod`命令将`pro1`加入`group` 群组，看看有什么效果：
```bash
[root@localhost ~]# usermod -a -G group pro1
[pro1@localhost ~]# sudo tail -n 1 /etc/shadow <==注意身份是 pro1
....(前面省略)....
Password:  <==输入 pro1 的口令喔！
pro3:$1$GfinyJgZ$9J8IdrBXXMwZIauANg7tW0:14302:0:99999:7:::
[pro2@localhost ~]# sudo tail -n 1 /etc/shadow <==注意身份是 pro2
Password:
pro2 is not in the sudoers file.  This incident will be reported.
#此错误信息表示 pro2 不在 /etc/sudoers 的配置中。
```
可以看到，由于`pro1`加入到了`group`群组，因此`pro1`就可以使用`sudo`命令，而`pro2`不行。同样的道理，如果我们想让`pro3`也可以使用`sudo`命令，不用再修改`/etc/sudoers`文件，只需要将`pro3`加入`group`群组即可。
