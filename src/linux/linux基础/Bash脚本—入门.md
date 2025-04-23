---
title: Bash脚本——入门
date: 2024-04-30
tags: Bash
categories: Linux
order: 18
---

## Bash简介
Bash 是 Unix 系统和 Linux 系统的一种 Shell（命令行环境），是目前绝大多数 Linux 发行版的默认 Shell。
### Shell的含义
Shell 这个单词的原意是“外壳”，跟 kernel（内核）相对应，比喻内核外面的一层，即用户跟内核交互的对话界面。

具体来说，Shell 这个词有多种含义。

首先，Shell 是一个程序，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为命令行环境（`command line interface`，简写为 CLI）。Shell 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户。除非特别指明，Shell 指的就是命令行环境。

其次，Shell 是一个命令解释器，解释用户输入的命令。它支持变量、条件判断、循环操作等语法，所以用户可以用 Shell 命令写出各种小程序，又称为脚本（`script`）。这些脚本都通过 Shell 的解释执行，而不通过编译。

最后，Shell 是一个工具箱，提供了各种小工具，供用户方便地使用操作系统的功能。
### Shell 的种类
Shell 有很多种，只要能给用户提供命令行环境的程序，都可以看作是 Shell。

历史上，主要的 Shell 有下面这些：
* Bourne Shell（sh）
* Bourne Again shell（bash）
* C Shell（csh）
* TENEX C Shell（tcsh）
* Korn shell（ksh）
* Z Shell（zsh）
* Friendly Interactive Shell（fish）

Bash 是目前最常用的 Shell，除非特别指明，下文的 Shell 和 Bash 当作同义词使用，可以互换。

下面的命令可以查看当前设备的默认 Shell。
```shell
[root@localhost ~]# echo $SHELL
/bin/bash
```
当前正在使用的 Shell 不一定是默认 Shell，一般来说，`ps`命令结果的倒数第二行是当前 Shell。
```shell
[root@localhost ~]# ps
    PID TTY          TIME CMD
  21961 pts/0    00:00:00 bash
  22627 pts/0    00:00:00 ps
```
上面示例中，`ps`命令结果的倒数第二行显示，运行的命令（`cmd`）是`bash`，表明当前正在使用的 Shell 是 Bash。

下面的命令可以查看当前的 Linux 系统安装的所有 Shell。
```shell
[root@localhost ~]# cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
```
Linux 允许每个用户使用不同的 Shell，用户的默认 Shell 一般都是 Bash，或者与 Bash 兼容。

使用`chsh`命令，可以改变系统的默认 Shell。举例来说，要将默认 Shell 从 Bash 改成 Fish，首先要找出 Fish 可执行文件的位置。
```shell
[root@localhost ~]# which fish
```
上面命令找出 Fish 可执行文件的位置，一般是`/usr/bin/fish`。

然后，使用`chsh`命令切换默认 Shell。
```shell
[root@localhost ~]# chsh -s /usr/bin/fish
```
上面命令会将当前的默认 Shell 改成 Fish。
## 脚本入门
脚本（`script`）就是包含一系列命令的一个文本文件。Shell 读取这个文件，依次执行里面的所有命令，就好像这些命令直接输入到命令行一样。所有能够在命令行完成的任务，都能够用脚本完成。

脚本的好处是可以重复使用，也可以指定在特定场合自动调用，比如系统启动或关闭时自动执行脚本。
### Shebang 行
脚本的第一行通常是指定解释器，即这个脚本必须通过什么解释器执行。这一行以`#!`字符开头，这个字符称为`Shebang`，所以这一行就叫做`Shebang`行。

`#!`后面就是脚本解释器的位置，Bash 脚本的解释器一般是`/bin/sh`或`/bin/bash`。`#!`与脚本解释器之间有没有空格，都是可以的。
```bash
#!/bin/sh
# 或者
#!/bin/bash
```
如果 Bash 解释器不放在目录`/bin`，脚本就无法执行了。为了保险，可以写成下面这样。
```bash
#!/usr/bin/env bash
```
上面命令使用`env`命令（这个命令总是在`/usr/bin`目录），返回 Bash 可执行文件的位置。

`Shebang`行不是必需的，但是建议加上这行。如果缺少该行，就需要手动将脚本传给解释器。举例来说，脚本是`script.sh`，有`Shebang`行的时候，可以直接调用执行。
```shell
[root@localhost ~]# ./script.sh
```
上面例子中，`script.sh`是脚本文件名。脚本通常使用`.sh`后缀名，不过这不是必需的。

如果没有`Shebang`行，就只能手动将脚本传给解释器来执行。
```bash
[root@localhost ~]# /bin/sh ./script.sh
# 或者
[root@localhost ~]# bash ./script.sh
```
### 执行权限和路径
只要指定了`Shebang`行的脚本，可以直接执行。这有一个前提条件，就是脚本需要有执行权限。可以使用下面的命令，赋予脚本执行权限。
```shell
# 给所有用户执行权限
[root@localhost ~]# chmod +x script.sh

# 给所有用户读权限和执行权限
[root@localhost ~]# chmod +rx script.sh
# 或者
[root@localhost ~]# chmod 755 script.sh

# 只给脚本拥有者读权限和执行权限
[root@localhost ~]# chmod u+rx script.sh
```
脚本的权限通常设为 755（拥有者有所有权限，其他人有读和执行权限）或者 700（只有拥有者可以执行）。

除了执行权限，脚本调用时，一般需要指定脚本的路径（比如`path/script.sh`）。如果将脚本放在环境变量`$PATH`指定的目录中，就不需要指定路径了。因为 Bash 会自动到这些目录中，寻找是否存在同名的可执行文件。

建议在主目录新建一个`~/bin`子目录，专门存放可执行脚本，然后把`~/bin`加入`$PATH`。
```bash
export PATH=$PATH:~/bin
```
上面命令改变环境变量`$PATH`，将`~/bin`添加到`$PATH`的末尾。可以将这一行加到`~/.bashrc`文件里面，然后重新加载一次`.bashrc`，这个配置就可以生效了。
```shell
[root@localhost ~]# source ~/.bashrc
```
以后不管在什么目录，直接输入脚本文件名，脚本就会执行。
```bash
[root@localhost ~]# script.sh
```
上面命令没有指定脚本路径，因为`script.sh`在`$PATH`指定的目录中。
### env 命令
`env`命令总是指向`/usr/bin/env`文件，或者说，这个二进制文件总是在目录`/usr/bin`。

`#!/usr/bin/env NAME`这个语法的意思是，让 Shell 查找`$PATH`环境变量里面第一个匹配的`NAME`。如果你不知道某个命令的具体路径，或者希望兼容其他用户的机器，这样的写法就很有用。

`/usr/bin/env bash`的意思就是，返回`bash`可执行文件的位置，前提是`bash`的路径是在`$PATH`里面。其他脚本文件也可以使用这个命令。比如 Node.js 脚本的`Shebang`行，可以写成下面这样。
```bash
#!/usr/bin/env node
```
`env`命令的参数：
* `-i, --ignore-environment`：不带环境变量启动。
* `-u, --unset=NAME`：从环境变量中删除一个变量。
* `--help`：显示帮助。
* `--version`：输出版本信息。

下面是一个例子，新建一个不带任何环境变量的 Shell。
```bash
[root@localhost ~]# env -i /bin/sh
```
### 注释
Bash 脚本中，`#`表示注释，可以放在行首，也可以放在行尾。
```bash
# 本行是注释
echo 'Hello World!'

echo 'Hello World!' # 井号后面的部分也是注释
```
建议在脚本开头，使用注释说明当前脚本的作用，这样有利于日后的维护。
### 脚本参数
调用脚本的时候，脚本文件名后面可以带有参数。
```shell
[root@localhost ~]# script.sh word1 word2 word3
```
脚本文件内部，可以使用特殊变量，引用这些参数。
* `$0`：脚本文件名，即`script.sh`
* `$1~$9`：对应脚本的第一个参数到第九个参数
* `$#`：参数的总数
* `$@`：全部的参数，参数之间使用空格分隔
* `$*`：全部的参数，参数之间使用变量`$IFS`值的第一个字符分隔，默认为空格，但是可以自定义

如果脚本的参数多于 9 个，那么第 10 个参数可以用`${10}`的形式引用，以此类推。

注意，如果命令是`command -o foo bar`，那么`-o`是`$1`，`foo`是`$2`，`bar`是`$3`。

下面是一个脚本内部读取命令行参数的例子。
```bash
#!/bin/bash
# script.sh

echo "全部参数：" $@
echo "命令行参数数量：" $#
echo '$0 = ' $0
echo '$1 = ' $1
echo '$2 = ' $2
echo '$3 = ' $3
```
执行结果如下。
```shell
[root@localhost ~]# ./script.sh a b c
全部参数：a b c
命令行参数数量：3
$0 =  script.sh
$1 =  a
$2 =  b
$3 =  c
```
用户可以输入任意数量的参数，利用`for`循环，可以读取每一个参数。
```bash
#!/bin/bash

for i in "$@"; do
  echo $i
done
```
如果多个参数放在双引号里面，视为一个参数。
```shell
[root@localhost ~]# ./script.sh "a b"
```
上面例子中，Bash 会认为`"a b"`是一个参数，`$1`会返回`a b`。注意，返回时不包括双引号。

### 配置项参数终止符 --
`-`和`--`开头的参数，会被 Bash 当作配置项解释。但是，有时它们不是配置项，而是实体参数的一部分，比如文件名叫做`-f`或`--file`。
```bash
[root@localhost ~]# cat -f
[root@localhost ~]# cat --file
```
上面命令的原意是输出文件`-f`和`--file`的内容，但是会被 Bash 当作配置项解释。

这时就可以使用配置项参数终止符--，它的作用是告诉 Bash，在它后面的参数开头的`-`和`--`不是配置项，只能当作实体参数解释。
```bash
[root@localhost ~]# cat -- -f
[root@localhost ~]# cat -- --file
```
上面命令可以正确展示文件`-f`和`--file`的内容，因为它们放在--的后面，开头的`-`和`--`就不再当作配置项解释了。

如果要确保某个变量不会被当作配置项解释，就要在它前面放上参数终止符`--`。
```shell
[root@localhost ~]# ls -- $myPath
```
上面示例中，--强制变量`$myPath`只能当作实体参数（即路径名）解释。如果变量不是路径名，就会报错。
```bash
[root@localhost ~]# myPath="-l"
[root@localhost ~]# ls -- $myPath
ls: 无法访问'-l': 没有那个文件或目录
```
上面例子中，变量`myPath`的值为`-l`，不是路径。但是，--强制`$myPath`只能作为路径解释，导致报错“不存在该路径”。

下面是另一个实际的例子，如果想在文件里面搜索`--hello`，这时也要使用参数终止符--。
```bash
[root@localhost ~]# grep -- "--hello" example.txt
```
上面命令在`example.txt`文件里面，搜索字符串`--hello`。这个字符串是--开头，如果不用参数终止符，`grep`命令就会把`--hello`当作配置项参数，从而报错。
### 命令执行结果
命令执行结束后，会有一个返回值。0 表示执行成功，非 0（通常是 1）表示执行失败。环境变量`$?`可以读取前一个命令的返回值。

利用这一点，可以在脚本中对命令执行结果进行判断。
```bash
cd /path/to/somewhere
if [ "$?" = "0" ]; then
  rm *
else
  echo "无法切换目录！" 1>&2
  exit 1
fi
```
上面例子中，`cd /path/to/somewhere`这个命令如果执行成功（返回值等于 0），就删除该目录里面的文件，否则退出脚本，整个脚本的返回值变为 1，表示执行失败。

由于`if`可以直接判断命令的执行结果，执行相应的操作，上面的脚本可以改写成下面的样子。
```bash
if cd /path/to/somewhere; then
  rm *
else
  echo "Could not change directory! Aborting." 1>&2
  exit 1
fi
```
更简洁的写法是利用两个逻辑运算符`&&`（且）和`||`（或）。
```bash
# 第一步执行成功，才会执行第二步
cd /path/to/somewhere && rm *

# 第一步执行失败，才会执行第二步
cd /path/to/somewhere || exit 1
```

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

## 脚本除错
### 常见错误
编写 Shell 脚本的时候，一定要考虑到命令失败的情况，否则很容易出错。
```bash
#! /bin/bash

dir_name=/path/not/exist

cd $dir_name
rm *
```
上面脚本中，如果目录`$dir_name`不存在，`cd $dir_name`命令就会执行失败。这时，就不会改变当前目录，脚本会继续执行下去，导致`rm *`命令删光当前目录的文件。

如果改成下面的样子，也会有问题。
```shell
cd $dir_name && rm *
```
上面脚本中，只有`cd $dir_name`执行成功，才会执行`rm *`。但是，如果变量`$dir_name`为空，`cd`就会进入用户主目录，从而删光用户主目录的文件。

下面的写法才是正确的。
```shell
[[ -d $dir_name ]] && cd $dir_name && rm *
```
上面代码中，先判断目录`$dir_name`是否存在，然后才执行其他操作。

如果不放心删除什么文件，可以先打印出来看一下。
```shell
[[ -d $dir_name ]] && cd $dir_name && echo rm *
```
上面命令中，`echo rm *`不会删除文件，只会打印出来要删除的文件。
### bash的-x参数
bash 的`-x`参数可以在执行每一行命令之前，打印该命令。一旦出错，这样就比较容易追查。
```bash
# script.sh
echo hello world
```
加上`-x`参数，执行每条命令之前，都会显示该命令。
```shell
$ bash -x script.sh
+ echo hello world
	hello world
```
上面例子中，行首为+的行，显示该行是所要执行的命令，下一行才是该命令的执行结果。

`-x`也可以写在脚本内部。
```bash
#! /bin/bash -x
# trouble: script to demonstrate common errors

number=1
if [ $number = 1 ]; then
echo "Number is equal to 1."
else
echo "Number is not equal to 1."
fi
```
上面的脚本执行之后，会输出每一行命令。
```shell
$ trouble
+ number=1
+ '[' 1 = 1 ']'
+ echo 'Number is equal to 1.'
	Number is equal to 1.
```
输出的命令之前的+号，是由系统变量`PS4`决定，可以修改这个变量。
```shell
$ export PS4='$LINENO + '
$ trouble
5 + number=1
7 + '[' 1 = 1 ']'
8 + echo 'Number is equal to 1.'
Number is equal to 1.
```
另外，`set`命令也可以设置 Shell 的行为参数，有利于脚本除错。
### 环境变量
有一些环境变量常用于除错。
#### LINENO
变量`LINENO`返回它在脚本里面的行号。
```shell
#!/bin/bash

echo "This is line $LINENO"
```
执行上面的脚本`test.sh`，`$LINENO`会返回 3。
```shell
$ ./test.sh
This is line 3
```
#### FUNCNAME
变量`FUNCNAME`返回一个数组，内容是当前的函数调用堆栈。该数组的 0 号成员是当前调用的函数，1 号成员是调用当前函数的函数，以此类推。
```shell
#!/bin/bash

function func1()
{
  echo "func1: FUNCNAME0 is ${FUNCNAME[0]}"
  echo "func1: FUNCNAME1 is ${FUNCNAME[1]}"
  echo "func1: FUNCNAME2 is ${FUNCNAME[2]}"
  func2
}

function func2()
{
  echo "func2: FUNCNAME0 is ${FUNCNAME[0]}"
  echo "func2: FUNCNAME1 is ${FUNCNAME[1]}"
  echo "func2: FUNCNAME2 is ${FUNCNAME[2]}"
}

func1
```
执行上面的脚本`test.sh`，结果如下。
```shell
$ ./test.sh
func1: FUNCNAME0 is func1
func1: FUNCNAME1 is main
func1: FUNCNAME2 is
func2: FUNCNAME0 is func2
func2: FUNCNAME1 is func1
func2: FUNCNAME2 is main
```
上面例子中，执行`func1`时，变量`FUNCNAME`的 0 号成员是`func1`，1号成员是调用`func1`的主脚本`main`。执行`func2`时，变量`FUNCNAME`的 0 号成员是`func2`，1 号成员是调用`func2`的`func1`。
### BASH_SOURCE
变量`BASH_SOURCE`返回一个数组，内容是当前的脚本调用堆栈。该数组的0号成员是当前执行的脚本，1 号成员是调用当前脚本的脚本，以此类推，跟变量`FUNCNAME`是一一对应关系。

下面有两个子脚本`lib1.sh`和`lib2.sh`。
```bash
# lib1.sh
function func1()
{
  echo "func1: BASH_SOURCE0 is ${BASH_SOURCE[0]}"
  echo "func1: BASH_SOURCE1 is ${BASH_SOURCE[1]}"
  echo "func1: BASH_SOURCE2 is ${BASH_SOURCE[2]}"
  func2
}
```
```bash
# lib2.sh
function func2()
{
  echo "func2: BASH_SOURCE0 is ${BASH_SOURCE[0]}"
  echo "func2: BASH_SOURCE1 is ${BASH_SOURCE[1]}"
  echo "func2: BASH_SOURCE2 is ${BASH_SOURCE[2]}"
}
```
然后，主脚本`main.sh`调用上面两个子脚本。
```shell
#!/bin/bash
# main.sh

source lib1.sh
source lib2.sh

func1
```
执行主脚本`main.sh`，会得到下面的结果。
```shell
$ ./main.sh
func1: BASH_SOURCE0 is lib1.sh
func1: BASH_SOURCE1 is ./main.sh
func1: BASH_SOURCE2 is
func2: BASH_SOURCE0 is lib2.sh
func2: BASH_SOURCE1 is lib1.sh
func2: BASH_SOURCE2 is ./main.sh
```
上面例子中，执行函数`func1`时，变量`BASH_SOURCE`的 0 号成员是`func1`所在的脚本`lib1.sh`，1 号成员是主脚本`main.sh`；执行函数`func2`时，变量`BASH_SOURCE`的 0 号成员是`func2`所在的脚本`lib2.sh`，1 号成员是调用`func2`的脚本`lib1.sh`。
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

| 参数 | 说明                       |
|----|--------------------------|
| -n | 不运行脚本，只检查是否有语法错误。        |
| -v | 输出每一行语句运行结果前，会先输出该行语句。   |
| -x | 每一个命令处理之前，先输出该命令，再执行该命令。 |

```shell
$ bash -n scriptname
$ bash -v scriptname
$ bash -x scriptname
```
