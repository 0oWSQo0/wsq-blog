---
title: Linux入门
date: 2024-02-05
tags: linux基础
categories: linux
order: 1
---

## 命令格式
### 命令提示符
登录系统后，第一眼看到的内容是：
```
[root@localhost ~]#
```
这就是 Linux 系统的命令提示符。
* `[]`：这是提示符的分隔符号，没有特殊含义
* `root`：显示的是当前的登录用户
* `@`：分隔符号，没有特殊含义
* `localhost`：当前系统的简写主机名（完整主机名是`localhost.localdomain`）
* `~`：代表用户当前所在的目录，此例中用户当前所在的目录是家目录
* `#`：命令提示符，Linux 用这个符号标识登录的用户权限等级。如果是超级用户，提示符就是`#`；如果是普通用户，提示符就是`$`

用户登录后，要有一个初始登录的位置，这个初始登录位置就称为用户的主目录：
* 超级用户的主目录：`/root`
* 普通用户的主目录：`/home/用户名`

```
[root@localhost ~]# cd /usr/local
[root@localhost local]#
```
如果切换用户所在目录，那么命令提示符中的会变成用户当前所在目录的最后一个目录（不显示完整的所在目录`/usr/ local`，只显示最后一个目录`local`）。
### 环境变量 PS1
命令提示符通常是美元符号`$`，对于根用户则是井号`#`。这个符号是环境变量`PS1`决定的，执行下面的命令，可以看到当前命令提示符的定义。
```shell
$ echo $PS1
```
Bash 允许用户自定义命令提示符，只要改写这个变量即可。改写后的`PS1`，可以放在用户的 Bash 配置文件`.bashrc`里面，以后新建 Bash 对话时，新的提示符就会生效。要在当前窗口看到修改后的提示符，可以执行下面的命令。
```shell
$ source ~/.bashrc
```
命令提示符的定义，可以包含特殊的转义字符，表示特定内容。

| 转义字符 | 说明 |
|------|----|
| \a     | 响铃，计算机发出一记声音   |
| \d     | 以星期、月、日格式表示当前日期，例如“Mon May 26”   |
| \h     | 本机的主机名   |
| \H     | 完整的主机名   |
| \j     | 运行在当前 Shell 会话的工作数   |
| \l     | 当前终端设备名   |
| \n     | 一个换行符   |
| \r     | 一个回车符   |
| \s     | Shell 的名称   |
| \t     | 24小时制的hours:minutes:seconds格式表示当前时间   |
| \T     | 12小时制的当前时间   |
| \@     | 12小时制的AM/PM格式表示当前时间   |
| \A     | 24小时制的hours:minutes表示当前时间   |
| \u     | 当前用户名   |
| \v     | Shell 的版本号   |
| \V     | Shell 的版本号和发布号   |
| \w     | 当前的工作路径   |
| \W     | 当前目录名   |
| \!     | 当前命令在命令历史中的编号   |
| \#     | 当前 shell 会话中的命令数   |
| \$     | 普通用户显示为$字符，根用户显示为#字符   |
| \[     | 非打印字符序列的开始标志   |
| \]     | 非打印字符序列的结束标志   |

举例来说，`[\u@\h \W]\$`这个提示符定义，显示出来就是`[user@host ~]$`（具体的显示内容取决于你的系统）。
```shell
[user@host ~]$ echo $PS1
[\u@\h \W]\$
```
改写`PS1`变量，就可以改变这个命令提示符。
```shell
$ PS1="\A \h \$ "
17:33 host $
```
注意，`$`后面最好跟一个空格，这样的话，用户的输入与提示符就不会连在一起。
### 命令的基本格式
```
[root@localhost ~]# 命令 [选项] [参数]
```
命令格式中的`[]`代表可选项，也就是有些命令可以不写选项或参数，也能执行。
#### 选项的作用
Linux 的选项又分为短格式选项（`-l`）和长格式选项（`--all`）。短格式选项是英文的简写，用一个减号调用。
```bash
[root@localhost ~]# ls -l
```
而长格式选项是英文完整单词，一般用两个减号调用。
```bash
[root@localhost ~]# ls --all
```
一般情况下，短格式选项是长格式选项的缩写，也就是一个短格式选项会有对应的长格式选项。当然也有例外，比如`ls`命令的短格式选项`-l`就没有对应的长格式选项。

单个命令一般都是一行，用户按下回车键，就开始执行。有些命令比较长，写成多行会有利于阅读和编辑，这时可以在每一行的结尾加上反斜杠，Bash 就会将下一行跟当前行放在一起解释。
```shell
[root@localhost ~]# echo foo bar
# 等同于
[root@localhost ~]# echo foo \
bar
```
#### 参数的作用
参数是命令的操作对象，一般文件、目录、用户和进程等可以作为参数被命令操作。
```bash
[root@localhost ~]# ls -l anaconda-ks.cfg
-rw-------.1 root root 1207 1 月 14 18:18 anaconda-ks.cfg
```
命令一般都需要加入参数，用于指定命令操作的对象是谁。如果可以省略参数，则一般都有默认参数。
```bash
[root@localhost ~]# ls
anaconda-ks.cfg install.log install.log.syslog
```
这个`ls`命令后面没有指定参数，默认参数是当前所在位置，所以会显示当前目录下的文件名。
:::tip
命令的选项用于调整命令功能，而命令的参数是这个命令的操作对象。
:::

### 空格
Shell 使用空格（或`Tab`键）区分不同的参数。
```shell
[root@localhost ~]# command foo bar
```
上面命令中，`foo`和`bar`之间有一个空格，所以 Shell 认为它们是两个参数。

如果参数之间有多个空格，Shell 会自动忽略多余的空格。
```shell
[root@localhost ~]# echo this is a     test
this is a test
```
上面命令中，`a`和`test`之间有多个空格，Shell 会忽略多余的空格。
### 分号
分号（`;`）是命令的结束符，使得一行可以放置多个命令，上一个命令执行结束后，再执行第二个命令。
```shell
[root@localhost ~]# clear; ls
```
上面例子中，先执行`clear`命令，执行完成后，再执行`ls`命令。
:::warning
注意，使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。
:::
### 命令的组合符&&和||
除了分号，Shell 还提供两个命令组合符`&&`和`||`，允许更好地控制多个命令之间的继发关系。
```shell
Command1 && Command2
```
上面命令的意思是，如果`Command1`命令运行成功，则继续运行`Command2`命令。
```shell
Command1 || Command2
```
上面命令的意思是，如果`Command1`命令运行失败，则继续运行`Command2`命令。
```shell
[root@localhost ~]# cat filelist.txt; ls -l filelist.txt
```
上面例子中，只要`cat`命令执行结束，不管成功或失败，都会继续执行`ls`命令。
```shell
[root@localhost ~]# cat filelist.txt && ls -l filelist.txt
```
上面例子中，只有`cat`命令执行成功，才会继续执行`ls`命令。如果`cat`执行失败（比如不存在文件`flielist.txt`），那么`ls`命令就不会执行。
```shell
[root@localhost ~]# mkdir foo || mkdir bar
```
上面例子中，只有`mkdir foo`命令执行失败（比如`foo`目录已经存在），才会继续执行`mkdir bar`命令。如果`mkdir foo`命令执行成功，就不会创建`bar`目录了。
### 颜色
默认情况下，命令提示符是显示终端预定义的颜色。Bash 允许自定义提示符颜色。

使用下面的代码，可以设定其后文本的颜色。

| 代码 | 颜色 |
|----|----|
| \033[0;30m   | 黑色   |
| \033[1;30m   | 深灰色   |
| \033[0;31m   | 红色   |
| \033[1;31m   | 浅红色   |
| \033[0;32m   | 绿色   |
| \033[1;32m   | 浅绿色   |
| \033[0;33m   | 棕色   |
| \033[1;33m   | 黄色   |
| \033[0;34m   | 蓝色   |
| \033[1;34m   | 浅蓝色   |
| \033[0;35m   | 粉红   |
| \033[1;35m   | 浅粉色   |
| \033[0;36m   | 青色   |
| \033[1;36m   | 浅青色   |
| \033[0;37m   | 浅灰色   |
| \033[1;37m   | 白色   |

举例来说，如果要将提示符设为红色，可以将·设成下面的代码。
```shell
PS1='\[\033[0;31m\]<\u@\h \W>\$'
```
但是，上面这样设置以后，用户在提示符后面输入的文本也是红色的。为了解决这个问题， 可以在结尾添加另一个特殊代码`\[\033[00m\]`，表示将其后的文本恢复到默认颜色。
```shell
PS1='\[\033[0;31m\]<\u@\h \W>\$\[\033[00m\]'
```
除了设置前景颜色，Bash 还允许设置背景颜色。

| 代码         | 颜色  |
|------------|-----|
| \033[0;40m | 蓝色  |
| \033[1;44m | 黑色  |
| \033[0;41m | 红色  |
| \033[1;45m | 粉红  |
| \033[0;42m | 绿色  |
| \033[1;46m | 青色  |
| \033[0;43m | 棕色  |
| \033[1;47m | 浅灰色 |

下面是一个带有红色背景的提示符。
```shell
PS1='\[\033[0;41m\]<\u@\h \W>\$\[\033[0m\] '
```
### 环境变量 PS2，PS3，PS4
除了`PS1`，Bash 还提供了提示符相关的另外三个环境变量。

环境变量`PS2`是命令行折行输入时系统的提示符，默认为`>`。
```shell
$ echo "hello
> world"
```
上面命令中，输入`hello`以后按下回车键，系统会提示继续输入。这时，第二行显示的提示符就是`PS2`定义的`>`。

环境变量`PS3`是使用`select`命令时，系统输入菜单的提示符。

环境变量`PS4`默认为`+`。它是使用 Bash 的`-x`参数执行脚本时，每一行命令在执行前都会先打印出来，并且在行首出现的那个提示符。

比如下面是脚本`test.sh`。
```shell
#!/bin/bash

echo "hello world"
```

使用`-x`参数执行这个脚本。
```shell
$ bash -x test.sh
+ echo 'hello world'
	hello world
```
上面例子中，输出的第一行前面有一个`+`，这就是变量`PS4`定义的。
## Linux命令的执行过程
Linux 命令的执行过程分为如下 4 个步骤：
### 1. 判断路径
判断用户是否以绝对路径或相对路径的方式输入命令（如`/bin/ls`），如果是的话直接执行。
### 2. 检查别名
Linux 系统会检查用户输入的命令是否为“别名命令”。要知道，通过`alias`命令是可以给现有命令自定义别名的，即用一个自定义的命令名称来替换原本的命令名称。

例如，我们经常使用的`rm`命令，其实就是`rm -i`这个整体的别名：
```bash
[root@localhost ~]# alias rm
alias rm='rm -i'
```
这使得当使用`rm`命令删除指定文件时，Linux 系统会要求我们再次确认是否执行删除操作。
```bash
[root@localhost ~]# rm a.txt <-- 假定当前目录中已经存在 a.txt 文件
rm: remove regular file 'a.txt'? y <-- 手动输入 y，即确定删除
[root@localhost ~]#
```
这里可以使用`unalias`命令，将 Linux 系统设置的`rm`别名删除掉：
```bash
[root@localhost ~]# alias rm
alias rm='rm -i'
[root@localhost ~]# unalias rm
[root@localhost ~]# rm a.txt
[root@localhost ~]# <--直接删除，不再询问
```
### 3. 判断是内部命令还是外部命令
shell 会判断用户输入的命令是内部命令还是外部命令。内部命令会被直接执行；而外部命令交给步骤四继续处理。

内部命令由 Shell 自带，会随着系统启动，可以直接从内存中读取；而外部命令仅是在系统中有对应的可执行文件，执行时需要读取该文件。

判断一个命令属于内部命令还是外部命令，可以使用`type`命令实现。
```bash
[root@localhost ~]# type pwd
pwd is a shell builtin <-- pwd是内部命令
[root@localhost ~]# type top
top is /usr/bin/top <-- top是外部命令
[root@localhost ~]# type type
type is a shell builtin <-- type本身也是内置命令
```
如果要查看一个命令的所有定义，可以使用`type -a`。
```shell
[root@localhost ~]# type -a echo
echo is shell builtin
echo is /usr/bin/echo
```
上面代码表示，`echo`命令既是内置命令，也有对应的外部程序。

`type -t`可以返回一个命令的类型：别名（`alias`），关键词（`keyword`），函数（`function`），内置命令（`builtin`）和文件（`file`）。
```shell
[root@localhost ~]# type -t bash
file
[root@localhost ~]# type -t if
keyword
```
上面例子中，`bash`是文件，`if`是关键词。
### 4. 查找外部命令对应的可执行文件
当用户执行的是外部命令时，系统会在指定的多个路径中查找该命令的可执行文件，而定义这些路径的变量，就称为`PATH`环境变量，其作用就是告诉 Shell 待执行命令的可执行文件可能存放的位置，也就是说，Shell 会在`PATH`变量包含的多个路径中逐个查找，直到找到为止（如果找不到，Shell 会提供用户“找不到此命令”）。
## 启动环境
### Session
用户每次使用 Shell，都会开启一个与 Shell 的`Session`（对话）。

`Session`有两种类型：登录`Session`和非登录`Session`，也可以叫做`login shell`和`non-login shell`。
#### 登录 Session
登录`Session`是用户登录系统以后，系统为用户开启的原始`Session`，通常需要用户输入用户名和密码进行登录。

登录`Session`一般进行整个系统环境的初始化，启动的初始化脚本依次如下。
* `/etc/profile`：所有用户的全局配置脚本。
* `/etc/profile.d`目录里面所有`.sh`文件
* `~/.bash_profile`：用户的个人配置脚本。如果该脚本存在，则执行完就不再往下执行。
* `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试执行这个脚本（C shell 的初始化脚本）。如果该脚本存在，则执行完就不再往下执行。
* `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本（Bourne shell 和 Korn shell 的初始化脚本）。

Linux 发行版更新的时候，会更新`/etc`里面的文件，比如`/etc/profile`，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在`/etc/profile.d`目录里面新建.`sh`脚本。

如果想修改你个人的登录环境，一般是写在`~/.bash_profile`里面。下面是一个典型的`.bash_profile`文件。
```shell
# .bash_profile
PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
PATH=$PATH:$HOME/bin

SHELL=/bin/bash
MANPATH=/usr/man:/usr/X11/man
EDITOR=/usr/bin/vi
PS1='\h:\w\$ '
PS2='> '

if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi

export PATH
export EDITOR
```
可以看到，这个脚本定义了一些最基本的环境变量，然后执行了`~/.bashrc`。

`bash`命令的`--login`参数，会强制执行登录`Session`会执行的脚本。
```shell
$ bash --login
```
`bash`命令的`--noprofile`参数，会跳过上面这些`Profile`脚本。
```shell
$ bash --noprofile
```
#### 非登录 Session
非登录`Session`是用户进入系统以后，手动新建的`Session`，这时不会进行环境初始化。比如，在命令行执行`bash`命令，就会新建一个非登录`Session`。

非登录`Session`的初始化脚本依次如下。
* `/etc/bash.bashrc`：对全体用户有效。
* `~/.bashrc`：仅对当前用户有效。

对用户来说，`~/.bashrc`通常是最重要的脚本。非登录`Session`默认会执行它，而登录`Session`一般也会通过调用执行它。每次新建一个 Bash 窗口，就相当于新建一个非登录`Session`，所以`~/.bashrc`每次都会执行。注意，执行脚本相当于新建一个非互动的 Bash 环境，但是这种情况不会调用`~/.bashrc`。

`bash`命令的`--norc`参数，可以禁止在非登录`Session`执行`~/.bashrc`脚本。
```shell
$ bash --norc
```
`bash`命令的`--rcfile`参数，指定另一个脚本代替`.bashrc`。
```shell
$ bash --rcfile testrc
```
#### .bash_logout
`~/.bash_logout`脚本在每次退出`Session`时执行，通常用来做一些清理工作和记录工作，比如删除临时文件，记录用户在本次`Session`花费的时间。

如果没有退出时要执行的命令，这个文件也可以不存在。
### 启动选项
为了方便 Debug，有时在启动 Bash 的时候，可以加上启动参数。

| 参数 | 说明 |
|----|----|
| -n   | 不运行脚本，只检查是否有语法错误。   |
| -v   | 输出每一行语句运行结果前，会先输出该行语句。   |
| -x   | 每一个命令处理之前，先输出该命令，再执行该命令。   |

```shell
$ bash -n scriptname
$ bash -v scriptname
$ bash -x scriptname
```
## 行操作
Bash 内置了 Readline 库，具有这个库提供的很多“行操作”功能，比如命令的自动补全，可以大大加快操作速度。

这个库默认采用 Emacs 快捷键，也可以改成 Vi 快捷键。
```bash
$ set -o vi
```
下面的命令可以改回 Emacs 快捷键。
```bash
$ set -o emacs
```
如果想永久性更改编辑模式（Emacs/Vi），可以将命令写在`~/.inputrc`文件，这个文件是 Readline 的配置文件。
```bash
set editing-mode vi
```
Bash 默认开启这个库，但是允许关闭。
```bash
$ bash --noediting
```
上面命令中，`--noediting`参数关闭了 Readline 库，启动的 Bash 就不带有行操作功能。
### 常用快捷键
Readline 提供的快捷键：

| 快捷键                | 说明                                |
|--------------------|-----------------------------------|
| `Ctrl + a`         | 移到行首                              |
| `Ctrl + b`         | 向行首移动一个字符，与左箭头作用相同                |
| `Ctrl + e`         | 移到行尾                              |
| `Ctrl + f`         | 向行尾移动一个字符，与右箭头作用相同                |
| `Alt + f`          | 移动到当前单词的词尾                        |
| `Alt + b`          | 移动到当前单词的词首                        |
| `Ctrl + l`         | 清除屏幕，即将当前行移到屏幕的第一行，与`clear`命令作用相同 |
| `Ctrl + d`         | 删除光标位置的字符（`delete`）               |
| `Ctrl + w`         | 删除光标前一个单词                         |
| `Ctrl + t`         | 光标位置的字符与它前面一位的字符交换位置（`transpose`） |
| `Alt + t`          | 光标位置的词与它前面一位的词交换位置（`transpose`）   |
| `Alt + l`          | 将光标位置至词尾转为小写（`lowercase`）         |
| `Alt + u`          | 将光标位置至词尾转为大写（`uppercase`）         |
| `Ctrl + k`         | 剪切光标位置到行尾的文本                      |
| `Ctrl + u`         | 剪切光标位置到行首的文本                      |
| `Alt + d`          | 剪切光标位置到词尾的文本                      |
| `Alt + Backspace`  | 剪切光标位置到词首的文本                      |
| `Ctrl + y`         | 在光标位置粘贴文本                         |
| `Ctrl + c`         | 终止当前正在执行的命令                       |
| `Shift + PageUp`   | 向上滚动                              |
| `Shift + PageDown` | 向下滚动                              |


使用`Ctrl + d`的时候，如果当前行没有任何字符，会导致退出当前 Shell，所以要小心。

`Alt`键可以用`Esc`键代替。
### 自动补全
命令输入到一半的时候，可以按一下`Tab`键，Readline 会自动补全命令或路径。比如，输入`cle`，再按下`Tab`键，Bash 会自动将这个命令补全为`clear`。

如果符合条件的命令或路径有多个，就需要连续按两次`Tab`键，Bash 会提示所有符合条件的命令或路径。

除了命令或路径，`Tab`还可以补全其他值。如果一个值以`$`开头，则按下`Tab`键会补全变量；如果以`~`开头，则补全用户名；如果以`@`开头，则补全主机名（`hostname`），主机名以列在`/etc/hosts`文件里面的主机为准。

自动补全相关的快捷键。

| 快捷键           | 说明                                         |
|---------------|--------------------------------------------|
| `Tab`         | 完成自动补全。                                    |
| `Alt + ?`     | 列出可能的补全，与连按两次 Tab 键作用相同。                   |
| `Alt + /`     | 尝试文件路径补全。                                  |
| `Ctrl + x /`  | 先按`Ctrl + x`，再按/，等同于`Alt + ?`，列出可能的文件路径补全。 |
| `Alt + !`     | 命令补全。                                      |
| `Ctrl + x !`  | 先按`Ctrl + x`，再按!，等同于`Alt + !`，命令补全。        |
| `Alt + ~`     | 用户名补全。                                     |
| `Ctrl + x ~`  | 先按`Ctrl + x`，再按~，等同于`Alt + ~`，用户名补全。       |
| `Alt + $`     | 变量名补全。                                     |
| `Ctrl + x $`  | 先按`Ctrl + x`，再按$，等同于`Alt + $`，变量名补全。       |
| `Alt + @`     | 主机名补全。                                     |
| `Ctrl + x @`  | 先按`Ctrl + x`，再按@，等同于`Alt + @`，主机名补全。       |
| `Alt + *`     | 在命令行一次性插入所有可能的补全。                          |
| `Alt + Tab`   | 尝试用`.bash_history`里面以前执行命令，进行补全。           |

上面的`Alt`键也可以用`ESC`键代替。

## 引号和转义
Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都视为字符串。因此，字符串相关的引号和转义，对 Bash 来说就非常重要。
### 转义
某些字符在 Bash 里面有特殊含义（比如`$、&、*`）。
```shell
[root@localhost ~]# echo $date

[root@localhost ~]# 
```
上面例子中，输出`$date`不会有任何结果，因为`$`是一个特殊字符。

如果想要原样输出这些特殊字符，就必须在它们前面加上反斜杠，使其变成普通字符。这就叫做“转义”。
```shell
[root@localhost ~]# echo \$date
$date
```
反斜杠本身也是特殊字符，如果想要原样输出反斜杠，就需要对它自身转义，连续使用两个反斜线（`\\`）。
```shell
[root@localhost ~]# echo \\
\
```
反斜杠除了用于转义，还可以表示一些不可打印的字符。
* `\a`：响铃
* `\b`：退格
* `\n`：换行
* `\r`：回车
* `\t`：制表符

如果想要在命令行使用这些不可打印的字符，可以把它们放在引号里面，然后使用`echo`命令的`-e`参数。
```shell
[root@localhost ~]# echo a\tb
atb
[root@localhost ~]# echo -e "a\tb"
a        b
```
上面例子中，命令行直接输出不可打印字符`\t`，Bash 不能正确解释。必须把它们放在引号之中，然后使用`echo`命令的`-e`参数。

换行符是一个特殊字符，表示命令的结束，Bash 收到这个字符以后，就会对输入的命令进行解释执行。换行符前面加上反斜杠转义，就使得换行符变成一个普通字符，Bash 会将其当作长度为 0 的空字符处理，从而可以将一行命令写成多行。
```shell
[root@localhost ~]# mv \
/path/to/foo \
/path/to/bar

# 等同于
[root@localhost ~]# mv /path/to/foo /path/to/bar
```
上面例子中，如果一条命令过长，就可以在行尾使用反斜杠，将其改写成多行。这是常见的多行命令的写法。
### 单引号
Bash 允许字符串放在单引号或双引号之中，加以引用。

单引号用于保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符，比如星号（`*`）、美元符号（`$`）、反斜杠（`\`）等。
```shell
[root@localhost ~]# echo '*'
*
[root@localhost ~]# echo '$USER'
$USER
[root@localhost ~]# echo '$((2+2))'
$((2+2))
[root@localhost ~]# echo '$(echo foo)'
$(echo foo)
```
上面命令中，单引号使得 Bash 扩展、变量引用、算术运算和子命令，都失效了。如果不使用单引号，它们都会被 Bash 自动扩展。

由于反斜杠在单引号里面变成了普通字符，所以如果单引号之中，还要使用单引号，不能使用转义，需要在外层的单引号前面加上一个美元符号（`$`），然后再对里层的单引号转义。
```shell
# 不正确
[root@localhost ~]# echo it's
# 不正确
[root@localhost ~]# echo 'it\'s'
# 正确
[root@localhost ~]# echo $'it\'s'
```
不过，更合理的方法是改在双引号之中使用单引号。
```shell
[root@localhost ~]# echo "it's"
it's
```
### 双引号
双引号比单引号宽松，大部分特殊字符在双引号里面，都会失去特殊含义，变成普通字符。
```shell
[root@localhost ~]# echo "*"
*
```
上面例子中，通配符`*`是一个特殊字符，放在双引号之中，就变成了普通字符，会原样输出。这一点需要特别留意，这意味着，双引号里面不会进行文件名扩展。

但是，三个特殊字符除外：美元符号（`$`）、反引号（```）和反斜杠（`\`）。这三个字符在双引号之中，依然有特殊含义，会被 Bash 自动扩展。
```shell
[root@localhost ~]# echo "$SHELL"
/bin/bash
[root@localhost ~]# echo "`date`"
Mon Jan 27 13:33:18 CST 2024
```
上面例子中，美元符号（`$`）和反引号（```）在双引号中，都保持特殊含义。美元符号用来引用变量，反引号则是执行子命令。
```shell
[root@localhost ~]# echo "I'd say: \"hello!\""
I'd say: "hello!"
[root@localhost ~]# echo "\\"
\
```
上面例子中，反斜杠在双引号之中保持特殊含义，用来转义。所以，可以使用反斜杠，在双引号之中插入双引号，或者插入反斜杠本身。

换行符在双引号之中，会失去特殊含义，Bash 不再将其解释为命令的结束，只是作为普通的换行符。所以可以利用双引号，在命令行输入多行文本。
```shell
[root@localhost ~]# echo "hello
world"
hello
world
```
上面命令中，Bash 正常情况下会将换行符解释为命令结束，但是换行符在双引号之中就失去了这种特殊作用，只用来换行，所以可以输入多行。`echo`命令会将换行符原样输出，显示的时候正常解释为换行。

双引号的另一个常见的使用场合是，文件名包含空格。这时就必须使用双引号（或单引号），将文件名放在里面。
```shell
[root@localhost ~]# ls "two words.txt"
```
上面命令中，`two words.txt`是一个包含空格的文件名，如果不放在双引号里面，就会被 Bash 当作两个文件。

双引号会原样保存多余的空格。
```shell
[root@localhost ~]# echo "this is a     test"
this is a     test
```
双引号还有一个作用，就是保存原始命令的输出格式。
```shell
# 单行输出
[root@localhost ~]# echo $(cal)
一月 2020 日 一 二 三 四 五 六 1 2 3 ... 31

# 原始格式输出
[root@localhost ~]# echo "$(cal)"
      一月 2020
日 一 二 三 四 五 六
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31
```
上面例子中，如果`$(cal)`不放在双引号之中，`echo`就会将所有结果以单行输出，丢弃了所有原始的格式。
