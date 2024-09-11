---
title: Linux文件目录相关命令
date: 2024-02-15
tags: linux基础
categories: linux
order: 3
---


## cd：切换目录
`cd(change directory)`：更改当前所处的工作目录，路径可以是绝对路径，也可以是相对路径，若省略不写则会跳转至当前登录者的家目‍录。
```shell
cd [相对路径或绝对路径]
```
`cd`命令后面可以跟一些特殊符号，表达固定的含义：

| 特殊符号 | 作 用        |
|:----:|:-----------|
|  ~   | 当前登录用户的家目录 |
|  -   | 上次所在目录     |
|  .   | 当前目录       |
|  ..  | 上级目录       |

```shell
# 表示回到自己的主目录，对于 root 用户，其主目录为 /root
[root@localhost vbird]# cd ~
# 没有加上任何路径，也代表回到当前登录用户的主目录
[root@localhost ~]# cd
# 表示切换到当前目录的上一级目录；
[root@localhost ~]# cd ..
# 表示回到刚刚的那个目录
[root@localhost /]# cd -
# 进入/usr/local/src目录
[root@localhost ~]# cd /usr/local/src  
[root@localhost src]# cd -
/root
```
## pwd：显示当前路径
`pwd(Print Working Directory)`（打印工作目录）：显示用户当前所处的工作目录的绝对路径。
```shell
[root@localhost ~]# pwd
/root
```
注意，在`[demo@localhost ~]#`这一部分中，虽然也显示出当前所在的目录（例如`~`表示主目录），但此位置只会列出整个路径中最后的那一个目录。
```shell
[root@localhost ~]# cd /var/mail
[root@localhost mail]# pwd
/var/mail
```
不同的目录中，目录名是可以重复的，因此，仅通过`[root@localhost mail]`中的`mail`，根本无法判断其所在的具体位置，而使用`pwd`命令，可以输出当前所在目录的完整路径。
## ls：查看目录下文件
`ls(list)`：显示当前目录下的内容。
```shell
[root@localhost ~]# ls [选项] 目录名称
```

|          选项          | 说明                                                      |
|:--------------------:|:--------------------------------------------------------|
|      -a, --all       | 显示全部的文件，包括隐藏文件（开头为 . 的文件）也一起罗列出来，这是最常用的选项之一。            |
|          -A          | 显示全部的文件，连同隐藏文件，但不包括 . 与 .. 这两个目录。                       |
|   -d, --directory    | 仅列出目录本身，而不是列出目录内的文件数据。                                  |
| -h, --human-readable | 以人们易读的方式显示文件或目录大小，如 1KB、234MB、2GB 等。                    |
|     -i, --inode      | 显示 inode 节点信息。                                          |
|        -l            | 使用长格式列出文件和目录信息。                                         |
|    -r, --reverse     | 将排序结果反向输出，比如，若原本文件名由小到大，反向则为由大到小。                       |
|   -R, --recursive    | 连同子目录内容一起列出来，等於将该目录下的所有文件都显示出来。                         |
|          -t          | 以时间排序，而不是以文件名排序。                                        |

当`ls`命令不使用任何选项时，默认只会显示非隐藏文件的名称，并以文件名进行排序，同时会根据文件的具体类型给文件名配色（蓝色显示目录，白色显示一般文件）。
```shell
[root@www ~]# ls -al ~
total 156
drwxr-x---  4 root root  4096 Sep 24 00:07 .
drwxr-xr-x 23 root root  4096 Sep 22 12:09 ..
-rw-------  1 root root  1474 Sep  4 18:27 anaconda-ks.cfg
-rw-------  1 root root   955 Sep 24 00:08 .bash_history
-rw-r--r--  1 root root    24 Jan  6  2007 .bash_logout
-rw-r--r--  1 root root   191 Jan  6  2007 .bash_profile
-rw-r--r--  1 root root   176 Jan  6  2007 .bashrc
drwx------  3 root root  4096 Sep  5 10:37 .gconf
-rw-r--r--  1 root root 42304 Sep  4 18:26 install.log
-rw-r--r--  1 root root  5661 Sep  4 18:25 install.log.syslog
```
通过使用`-a`，你会看到以`.`为开头的几个文件，以及目录文件`（.）、（..）、.gconf`等等，这些都是隐藏的目录和文件。

不仅如此，这里的`ls`命令还使用了`-l`选项，因此才显示出了文件的详细信息，此选项显示的这 7 列的含义分别是：
* 第一列：规定了不同的用户对文件所拥有的权限。
* 第二列：引用计数，文件的引用计数代表该文件的硬链接个数，而目录的引用计数代表该目录有多少个一级子目录。
* 第三列：所有者，也就是这个文件属于哪个用户。默认所有者是文件的建立用户。
* 第四列：所属组，默认所属组是文件建立用户的有效组，一般情况下就是建立用户的所在组。
* 第五列：大小，默认单位是字节。
* 第六列：文件修改时间，文件状态修改时间或文件数据修改时间都会更改这个时间，注意这个时间不是文件的创建时间。
* 第七列：文件名或目录名。

```shell
[root@localhost usr]# ls -l /usr/
总用量44
dr-xr-xr-x.  2 root root 20480 8月   4 19:11 bin
drwxr-xr-x.  2 root root     6 4月  11 2018 etc
drwxr-xr-x.  2 root root     6 4月  11 2018 games
drwxr-xr-x. 34 root root  8192 8月   4 19:11 include
drwxr-xr-x.  3 root root    60 8月   3 17:27 java
dr-xr-xr-x. 28 root root  4096 8月   4 19:11 lib
dr-xr-xr-x. 41 root root 28672 8月   4 19:11 lib64
...
```
这个命令会显示目录下的内容，而不会显示这个目录本身的详细信息。如果想显示目录本身的信息，就必须加入`-d`选项。
```shell
[root@localhost ~]# ls -ld /root/
drwxr-xr-x. 15 root root 180 8月   3 17:58 /usr/
```

## mkdir：创建目录
`mkdir(make directories)`：创建新目录。
```shell
mkdir [选项] 目录名
```

| 选项                  | 说明             |
|---------------------|----------------|
| `-m, --mode=<MODE>` | 建立目录时同时设置目录的权限 |
| `-p, --parents `    | 递归创建所有目录           |

```shell
[root@localhost ~]# mkdir lm/movie/jp/cangls
mkdir:无法创建目录"lm/movie/jp/cangls":没有那个文件或目录
[root@localhost ~]# mkdir -p lm/movie/jp/cangls
[root@localhost ~]# ls
anaconda-ks.cfg cangls install.log install.log.syslog lm
[root@localhost ~]# ls lm/
movie
#这里只查看一级子目录，其实后续的jp目录、cangls目录都已经建立
```
使用`-m`选项自定义目录权限。
```shell
[root@localhost ~]# mkdir -m 711 test2
[root@localhost ~]# ls -l
drwxr-xr-x  3 root  root 4096 Jul 18 12:50 test
drwxr-xr-x  3 root  root 4096 Jul 18 12:53 test1
drwx--x--x  2 root  root 4096 Jul 18 12:54 test2
```
## rmdir：删除空目录
`rmdir(remove empty directories)`：删除空目录，只能删除空目录。
```shell
rmdir [选项] 目录
```

| 选项            | 说明       |
|---------------|----------|
| -p, --parents | 递归删除空目录  |

`rmdir`命令的作用十分有限，因为只能刪除空目录，所以一旦目录中有内容，就会报错。
```shell
# 命令后面加目录名称即可，但命令执行成功与否，取决于要删除目录是否是空目录，因为`rmdir`命令只能删除空目录
[root@localhost ~]# rmdir cangls

# 注意，此方式先删除最低一层地目录
# 然后逐层删除上级目录，删除时也需要保证各级目录是空目录
[root@localhost ~]# rmdir -p lm/movie/jp/cangls

[root@localhost ~]# mkdir test #建立测试目录
[root@localhost ~]# touch test/boduo
[root@localhost ~]# touch test/longze
#在测试目录中建立两个文件
[root@localhost ~]# rmdir test
rmdir:删除"test"失败：目录非空
```
## touch：创建文件及修改文件时间戳
`touch`命令不光可以用来创建文件（当指定操作文件不存在时，该命令会在当前位置建立一个空文件），此命令更重要的功能是修改文件的时间参数（但当文件存在时，会修改此文件的时间参数）。

Linux 系统中，每个文件主要拥有 3 个时间参数（通过`stat`命令进行查看），分别是文件的访问时间、数据修改时间以及状态修改时间：
* 访问时间（`Access Time`，简称`atime`）：只要文件的内容被读取，访问时间就会更新。例如，使用`cat`命令可以查看文件的内容，此时文件的访问时间就会发生改变。
* 数据修改时间（`Modify Time`，简称`mtime`）：当文件的内容数据发生改变，此文件的数据修改时间就会跟着相应改变。
* 状态修改时间（`Change Time`，简称`ctime`）：当文件的状态发生变化，就会相应改变这个时间。比如说，如果文件的权限或者属性发生改变，此时间就会相应改变。

```shell
touch [选项] 文件名
```
|        选项        | 说明                                                 |
|:----------------:|:---------------------------------------------------|
|        `-a`        | 只修改文件的访问时间                                         |
| `-c, --no-create`  | 仅修改文件的时间参数（3 个时间参数都改变），如果文件不存在，则不建立新文件             |
| `-d, --date=<字符串>` | 后面可以跟欲修订的日期，而不用当前的日期，即把文件的`atime`和`mtime`时间改为指定的时间 |
|        `-m`        | 只修改文件的数据修改时间                                       |

```shell
#建立名为 bols 的空文件
[root@localhost ~]#touch bols

[root@localhost ~]# touch -d "2017-05-04 15:44" bols
[root@localhost ~]# ll bols; ll --time=atime bols; ll --time=ctime bols
-rw-r--r-- 1 root root 0 May 4 2017 bols
-rw-r--r-- 1 root root 0 May 4 2017 bols
-rw-r--r-- 1 root root 0 Sep 25 21:40 bols
#ctime不会变为设定时间，但更新为当前服务器的时间
```

## cp：复制文件或目录
`cp(copy)`：复制文件或目录。
```shell
cp [选项] 源文件 目标文件
```
| 选项  | 说明 |
|:---:|:---|
| -a  | 相当于`-d、-p、-r`选项的集合   |
| -d  | 如果源文件为软链接（对硬链接无效），则复制出的目标文件也为软链接   |
| -l  | 把目标文件建立为源文件的硬链接文件，而不是复制源文件   |
| -s  | 把目标文件建立为源文件的软链接文件，而不是复制源文件   |
| -p  | 复制后目标文件保留源文件的属性（包括所有者、所属组、权限和时间）   |
| -r  | 递归复制，用于复制目录   |

需要注意的是，源文件可以有多个，但这种情况下，目标文件必须是目录才可以。

这里的软链接，类似于 Windows 系统中的快捷方式，而硬链接则是透过文件系统的`inode`号产生一个新的文件名。无论是复制软链接还是硬链接，都不是复制源文件。
```shell
#建立源文件
[root@localhost ~]# touch cangls
#把源文件不改名复制到 /tmp/ 目录下
[root@localhost ~]# cp cangls /tmp/
#改名复制
[root@localhost ~]# cp cangls /tmp/bols
```
复制目录只需使用`-r`选项即可：
```shell
#建立测试目录
[root@localhost ~]# mkdir movie
#目录原名复制
[root@localhost ~]# cp -r /root/movie/ /tmp/
```
## rm：删除文件或目录
`rm`是强大的删除命令，它可以永久性地删除文件系统中指定的文件或目录。在使用`rm`命令删除文件或目录时，系统不会产生任何提示信息。
```shell
rm [选项] 文件或目录
```
|         选项          | 说明                                                       |
|:-------------------:|:---------------------------------------------------------|
|     -f, --force     | 强制删除（`force`），和`-i`选项相反，使用`-f`，系统将不再询问，而是直接删除目标文件或目录     |
|         -i          | 和`-f`正好相反，在删除文件或目录之前，系统会给出提示信息，使用`-i`可以有效防止不小心删除有用的文件或目录 |
| -r, -R, --recursive | 递归删除，主要用于删除目录，可删除指定目录及包含的所有内容，包括所有的子目录和文件                |
|     -d, --dir       | 删除空目录                                                    |

`rm`命令如果任何选项都不加，则默认执行的是"`rm -i`文件名"，也就是在删除一个文件之前会先询问是否删除。
```shell
[root@localhost ~]# touch cangls
[root@localhost ~]# rm cangls
rm:是否删除普通空文件"cangls"?y
#删除前会询问是否删除
```
如果需要删除目录，则需要使用`-r`选项。
```shell
[root@localhost ~]# mkdir -p /test/lm/movie/jp
#递归建立测试目录
[root@localhost ~]# rm /test
rm:无法删除"/test/": 是一个目录
#如果不加"-r"选项，则会报错
[root@localhost ~]# rm -r /test
rm:是否进入目录"/test"?y
rm:是否进入目录"/test/lm/movie"?y
rm:是否删除目录"/test/lm/movie/jp"?y
rm:是否删除目录"/test/lm/movie"?y
rm:是否删除目录"/test/lm"?y
rm:是否删除目录"/test"?y
#会分别询问是否进入子目录、是否删除子目录
```
强制删除。
```shell
[root@localhost ~]# mkdir -p /test/lm/movie/jp
#重新建立测试目录
[root@localhost ~]# rm -rf /test
#强制删除，一了百了
```
加入了强制功能之后，删除就会变得很简单，但是需要注意，数据强制删除之后无法恢复。

虽然`-rf`选项是用来删除目录的，但是删除文件也不会报错。所以，为了使用方便，一般不论是删除文件还是删除目录，都会直接使用`-rf`选项。
## mv：移动文件或改名
`mv(move)`命令，既可以在不同的目录之间移动文件或目录，也可以对文件和目录进行重命名。
```shell
mv [选项] 源文件 目标文件
```
|        选项         | 说明                                |
|:-----------------:|:----------------------------------|
|    -f, --force    | 强制覆盖，如果目标文件已经存在，则不询问，直接强制覆盖       |
| -i, --interactive | 交互移动，如果目标文件已经存在，则询问用户是否覆盖（默认选项）   |
|   -n， --clobber   | 如果目标文件已经存在，则不会覆盖移动，而且不询问用户        |
|   -u, --update    | 若目标文件已经存在，但两者相比，源文件更新，则会对目标文件进行升级 |
|    -b, --black    | 覆盖前先进行备份                          |

```shell
[root@localhost ~]# mv cangls /tmp
#移动之后，源文件会被删除，类似剪切
[root@localhost ~]# mkdir movie
[root@localhost ~]# mv movie/ /tmp
#也可以移动目录。和 rm、cp 不同的是，mv 移动目录不需要加入 "-r" 选项
```
如果移动的目标位置已经存在同名的文件，则同样会提示是否覆盖，因为`mv`命令默认执行的也是`mv -i`的别名。
```shell
[root@localhost ~]# touch cangls
#重新建立文件
[root@localhost ~]# mv cangls /tmp
mv:是否覆盖"tmp/cangls"？y
#由于 /tmp 目录下已经存在 cangls 文件，所以会提示是否覆盖，需要手工输入 y 覆盖移动
```
如果源文件和目标文件在同一目录中，那就是改名。
```shell
#把 bols 改名为 lmls
[root@localhost ~]# mv bols lmls
```
目录也可以按照同样的方法改名。
## find：查找命令
在指定目录中搜索文件。
```
find < path > <expression> <cmd>
find <指定目录> <指定条件> <指定动作>
```
* `path`：所要搜索的目录及其所有子目录。默认为当前目录
* `expression`：所要搜索的文件的特征
* `cmd`：对搜索结果进行特定的处理

如果什么参数也不加，`find`默认搜索当前目录及其子目录，并且不过滤任何结果（也就是返回所有文件），将它们全都显示在屏幕上。

| 指定条件  | 说明                 |
|-------|--------------------|
| -name | 指定文件名，支持通配符`*`和`?` |
| -user | 指定属主               |
| -type | 指定类型               |

```shell
# 按扩展名查找文件
find /home -name "*.txt"
```
在不区分大小写的模式下，查找与给定名称匹配的目录
```shell
# 语法
find root_path -type d -iname '*lib*'
# 示例
find /home -type d -name "*service*"
```
通过匹配多个模式查找文件
```shell
# 语法
find root_path -name '*pattern_1*' -or -name '*pattern_2*'
# 示例
find . -name "*.txt" -o -name "*.pdf"
```
查找与路径模式匹配的文件
```shell
# 语法
find root_path -path '**/lib/**/*.ext'
# 示例
find /usr/ -path "*local*"
```
查找与给定大小范围匹配的文件:
```shell
find root_path -size +500k -size -10M
```
找到最近7天修改过的文件，并删除它们:
```shell
find root_path -mtime -7 -delete
```
根据文件类型进行搜索
```shell
find . -type 类型参数
```
类型参数列表：
* `f`普通文件
* `l`符号连接
* `d`目录
* `c`字符设备
* `b`块设备
* `s`套接字
* `p``Fifo`

根据文件时间戳进行搜索
```shell
find . -type f 时间戳
```
UNIX/Linux 文件系统每个文件都有三种时间戳：
* 访问时间（`-atime`/天，`-amin`/分钟）：用户最近一次访问时间。
* 修改时间（`-mtime`/天，`-mmin`/分钟）：文件最后一次修改时间。
* 变化时间（`-ctime`/天，`-cmin`/分钟）：文件数据元（例如权限等）最后一次修改时间。

搜索最近七天内被访问过的所有文件
```shell
find . -type f -atime -7
```
搜索恰好在七天前被访问过的所有文件
```shell
find . -type f -atime 7
```
搜索超过七天内被访问过的所有文件
```shell
find . -type f -atime +7
```
搜索访问时间超过10分钟的所有文件
```shell
find . -type f -amin +10
```
找出比`file.log`修改时间更长的所有文件
```shell
find . -type f -newer file.log
```

[//]: # (## locate：查找文件)

[//]: # (`locate`命令其实是`find -name`的另一种写法，但是要比后者快得多，原因在于它不搜索具体目录，而是搜索一个数据库（`/var/lib/locatedb`），这个数据库中含有本地所有文件信息。Linux 系统自动创建这个数据库，并且每天自动更新一次，所以使用`locate`命令查不到最新变动过的文件。为了避免这种情况，可以在使用`locate`之前，先使用`updatedb`命令，手动更新数据库。)

[//]: # (```)

[//]: # (locate [选项] [pattern])

[//]: # (```)

