---
title: Bash脚本——变量
date: 2024-05-10
tags: Bash
categories: Linux
order: 20
---


## 简介
Bash 变量分成环境变量和自定义变量两类。

在 Bash 中，每一个变量的值都是字符串，无论你给变量赋值时有没有使用引号，值都会以字符串的形式存储。
### 环境变量
环境变量是 Bash 环境自带的变量，进入 Shell 时已经定义好了，可以直接使用。它们通常是系统定义好的，也可以由用户从父 Shell 传入子 Shell。

`env`或`printenv`命令，可以显示所有环境变量。
```shell
[root@localhost ~]# env
# 或者
[root@localhost ~]# printenv
```
常见的环境变量：

|    环境变量名称    | 作用                              |
|:------------:|:--------------------------------|
|     HOME     | 用户的主(家)目录                       |
|    SHELL     | 用户使用的 Shell 解释器名称               |
|     PATH     | 由冒号分开的目录列表，当输入可执行程序名后，会搜索这个目录列表 |
|     LANG     | 系统语言及语言编码，比如`zh_CN.UTF-8`       |
|   HISTSIZE   | 输出的历史命令记录条数                     |
| HISTFILESIZE | 保存的历史命令记录条数                     |
|     MAIL     | 邮件保存路径                          |
|   HOSTNAME   | 当前主机的名称                         |
|     LANG     | 字符集以及语言编码，比如zh_CN.UTF-8         |
|     PWD      | 当前工作目录                          |
|     TERM     | 终端类型名，即终端仿真器所用的协议               |
|     USER     | 当前用户的用户名                        |
|     UID      | 当前用户的ID编号                       |
|     PS1      | Shell 提示符                       |
|     PS2      | 输入多行命令时，次要的 Shell 提示符           |

很多环境变量很少发生变化，而且是只读的，可以视为常量。环境变量的名称一般都是大写的，这是一种约定俗成的规范。

查看单个环境变量的值，可以使用`printenv`命令或`echo`命令。
```shell
[root@localhost ~]# printenv PATH
# 或者
[root@localhost ~]# echo $PATH
```
:::warning
`printenv`命令后面的变量名，不用加前缀`$`。
:::
```bash
[root@localhost ~]# echo $HOME
/root
[root@localhost ~]# su - user1 # 切换到 user1 用户身份
[user1@localhost ~]$ printenv HOME
/home/user1
```
#### PATH 环境变量及作用
`which`命令，它用于查找某个命令所在的绝对路径。
```bash
[root@localhost ~]# which rm
/bin/rm
[root@localhost ~]# which rmdir
/bin/rmdir
[root@localhost ~]# which ls
alias ls='ls --color=auto'
        /bin/ls
```
注意，`ls`是一个相对特殊的命令，它使用`alias`命令做了别名，也就是说，我们常用的`ls`实际上执行的是`ls --color=auto`。

通过使用`which`命令，可以查找各个外部命令（和 shell 内置命令相对）所在的绝对路径。为什么前面在使用`rm、rmdir、ls`等命令时，无论当前位于哪个目录，都可以直接使用，而无需指明命令的执行文件所在的位置（绝对路径）呢？其实，这是`PATH`环境变量在起作用。

首先，执行如下命令：
```bash
[root@localhost ~]# echo $PATH
/usr/local/sbin:/usr/sbin:/sbin:/usr/local/bin:/usr/bin:/bin:/root/bin
```
这里的`echo`命令用来输出`PATH`环境变量的值（这里的`$`是`PATH`的前缀符号），`PATH`环境变量的内容是由一堆目录组成的，各目录之间用冒号“:”隔开。当执行某个命令时，Linux 会依照`PATH`中包含的目录依次搜寻该命令的可执行文件，一旦找到，即正常执行；反之，则提示无法找到该命令。

如果在`PATH`包含的目录中，有多个目录都包含某命令的可执行文件，那么会执行先搜索到的可执行文件。

从执行结果中可以看到，`/bin`目录已经包含在`PATH`环境变量中，因此在使用类似`rm、rmdir、ls`等命令时，即便直接使用其命令名，Linux 也可以找到该命令。
### 自定义变量
自定义变量是用户在当前 Shell 里面自己定义的变量，仅在当前 Shell 可用。一旦退出当前 Shell，该变量就不存在了。

`set`命令可以显示所有变量（包括环境变量和自定义变量），以及所有的 Bash 函数。
```shell
[root@localhost ~]# set
```
## 创建变量
变量名命名规则：
* 字母、数字和下划线字符组成
* 第一个字符必须是一个字母或一个下划线，不能是数字
* 不允许出现空格和标点符号

```shell
variable=value
variable='value'
variable="value"
```
上面命令中，等号左边是变量名，右边是变量。
:::warning
等号两边不能有空格。
:::
如果变量的值包含空格，则必须将值放在引号中。
```shell
myvar="hello world"
```
Bash 没有数据类型的概念，所有的变量值都是字符串。

下面是一些自定义变量的例子。
```shell
a=z                     # 变量 a 赋值为字符串 z
b="a string"            # 变量值包含空格，就必须放在引号里面
c="a string and $b"     # 变量值可以引用其他变量的值
d="\t\ta string\n"      # 变量值可以使用转义字符
e=$(ls -l foo.txt)      # 变量值可以是命令的执行结果
f=$((5 * 7))            # 变量值可以是数学运算的结果
```
变量可以重复赋值，后面的赋值会覆盖前面的赋值。
```shell
[root@localhost ~]# foo=1
[root@localhost ~]# foo=2
[root@localhost ~]# echo $foo
2
```
如果同一行定义多个变量，必须使用分号`;`分隔。
```shell
[root@localhost ~]# foo=1;bar=2
```
## 读取变量
读取变量的时候，直接在变量名前加上`$`就可以了。
```shell
[root@localhost ~]# foo=bar
[root@localhost ~]# echo $foo
bar
```
每当 Shell 看到以`$`开头的单词时，就会尝试读取这个变量名对应的值。

如果变量不存在，Bash 不会报错，而会输出空字符。

由于`$`在 Bash 中有特殊含义，把它当作美元符号使用时，一定要非常小心，
```shell
[root@localhost ~]# echo The total is $100.00
The total is 00.00
```
上面命令的原意是输入`$100`，但是 Bash 将`$1`解释成了变量，该变量为空，因此输入就变成了 00.00。所以，如果要使用`$`的原义，需要在`$`前面放上反斜杠，进行转义。
```shell
[root@localhost ~]# echo The total is \$100.00
The total is $100.00
```
读取变量的时候，变量名也可以使用花括号`{}`包围，比如`$a`也可以写成`${a}`。这种写法可以用于变量名与其他字符连用的情况。
```shell
[root@localhost ~]# a=foo
[root@localhost ~]# echo $a_file

[root@localhost ~]# echo ${a}_file
foo_file
```
上面代码中，变量名`a_file`不会有任何输出，因为 Bash 将其整个解释为变量，而这个变量是不存在的。只有用花括号区分`$a`，Bash 才能正确解读。

事实上，读取变量的语法`$foo`，可以看作是`${foo}`的简写形式。

如果变量的值本身也是变量，可以使用`${!varname}`的语法，读取最终的值。
```shell
[root@localhost ~]# myvar=USER
[root@localhost ~]# echo ${!myvar}
ruanyf
```
上面的例子中，变量`myvar`的值是`USER`，`${!myvar}`的写法将其展开成最终的值。

如果变量值包含连续空格（或制表符和换行符），最好放在双引号里面读取。
```shell
[root@localhost ~]# a="1 2  3"
[root@localhost ~]# echo $a
1 2 3
[root@localhost ~]# echo "$a"
1 2  3
```
上面示例中，变量`a`的值包含两个连续空格。如果直接读取，Shell 会将连续空格合并成一个。只有放在双引号里面读取，才能保持原来的格式。

Shell 也支持将命令的执行结果赋值给变量，常见的有以下两种方式：
```sh
variable=`command`
variable=$(command)
```
第一种方式把命令用反引号```包围起来；第二种方式把命令用`$()`包围起来，区分更加明显，所以推荐使用这种方式。
## 删除变量
`unset`命令用来删除一个变量。
```
unset NAME
```
这个命令不是很有用。因为不存在的 Bash 变量一律等于空字符串，所以即使`unset`命令删除了变量，还是可以读取这个变量，值为空字符串。

所以，删除一个变量，也可以将这个变量设成空字符串。
```shell
[root@localhost ~]# foo=''
[root@localhost ~]# foo=
```
上面两种写法，都是删除了变量`foo`。由于不存在的值默认为空字符串，所以后一种写法可以在等号右边不写任何值。
## 输出变量，export 命令
用户创建的变量仅可用于当前 Shell，子 Shell 默认读取不到父 Shell 定义的变量。为了把变量传递给子 Shell，需要使用`export`命令。这样输出的变量，对于子 Shell 来说就是环境变量。

`export`命令用来向子 Shell 输出变量。
```shell
NAME=foo
export NAME
```
上面命令输出了变量`NAME`。变量的赋值和输出也可以在一个步骤中完成。
```shell
export NAME=value
```
上面命令执行后，当前 Shell 及随后新建的子 Shell，都可以读取变量`$NAME`。

子 Shell 如果修改继承的变量，不会影响父 Shell。
```shell
# 输出变量 $foo
[root@localhost ~]# export foo=bar

# 新建子 Shell
[root@localhost ~]# bash

# 读取 $foo
[root@localhost ~]# echo $foo
bar

# 修改继承的变量
[root@localhost ~]# foo=baz

# 退出子 Shell
[root@localhost ~]# exit

# 读取 $foo
[root@localhost ~]# echo $foo
bar
```
上面例子中，子 Shell 修改了继承的变量`$foo`，对父 Shell 没有影响。
## 特殊变量
Bash 提供一些特殊变量。这些变量的值由 Shell 提供，用户不能进行赋值。
### `$?`
`$?`为上一个命令的退出码，用来判断上一个命令是否执行成功。返回值是 0，表示上一个命令执行成功；如果不是零，表示上一个命令执行失败。
```shell
[root@localhost ~]# ls doesnotexist
ls: doesnotexist: No such file or directory

[root@localhost ~]# echo $?
1
```
上面例子中，`ls`命令查看一个不存在的文件，导致报错。`$?`为 1，表示上一个命令执行失败。
### `$$`
`$$`为当前 Shell 的进程 ID。
```shell
[root@localhost ~]# echo $$
10662
```
这个特殊变量可以用来命名临时文件。
```shell
LOGFILE=/tmp/output_log.$$
```
### `$_`
`$_`为上一个命令的最后一个参数。
```shell
[root@localhost ~]# grep dictionary /usr/share/dict/words
dictionary

[root@localhost ~]# echo $_
/usr/share/dict/words
```
### `$!`
`$!`为最近一个后台执行的异步命令的进程 ID。
```shell
[root@localhost ~]# firefox &
[1] 11064

[root@localhost ~]# echo $!
11064
```
上面例子中，firefox 是后台运行的命令，`$!`返回该命令的进程 ID。
### `$0`
`$0`为当前 Shell 的名称（在命令行直接执行时）或者脚本名（在脚本中执行时）。
```shell
[root@localhost ~]# echo $0
bash
```
上面例子中，`$0`返回当前运行的是 Bash。
### `$-`
`$-`为当前 Shell 的启动参数。
```shell
[root@localhost ~]# echo $-
himBHs
```
### `$@`和`$#`
`$#`表示脚本的参数数量，`$@`表示脚本的参数值。
## 变量的默认值
Bash 提供四个特殊语法，跟变量的默认值有关，目的是保证变量不为空。
```shell
${varname:-word}
```
上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则返回`word`。它的目的是返回一个默认值，比如`${count:-0}`表示变量`count`不存在时返回 0。
```shell
${varname:=word}
```
上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则将它设为`word`，并且返回`word`。它的目的是设置变量的默认值，比如`${count:=0}`表示变量`count`不存在时返回 0，且将count设为0。
```shell
${varname:+word}
```
上面语法的含义是，如果变量名存在且不为空，则返回`word`，否则返回空值。它的目的是测试变量是否存在，比如`${count:+1}`表示变量`count`存在时返回 1（表示`true`），否则返回空值。
```shell
${varname:?message}
```
上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则打印出`varname: message`，并中断脚本的执行。如果省略了`message`，则输出默认的信息`“parameter null or not set.”`。它的目的是防止变量未定义，比如`${count:?"undefined!"}`表示变量`count`未定义时就中断执行，抛出错误，返回给定的报错信息`undefined!`。

上面四种语法如果用在脚本中，变量名的部分可以用数字 1 到 9，表示脚本的参数。
```shell
filename=${1:?"filename missing."}
```
上面代码出现在脚本中，1 表示脚本的第一个参数。如果该参数不存在，就退出脚本并报错。
## declare 命令
`declare`命令可以声明一些特殊类型的变量，为变量设置一些限制，比如声明只读类型的变量和整数类型的变量。
```
declare OPTION VARIABLE=value
```
`declare`命令的主要参数（`OPTION`）：
* `-a`：声明数组变量。
* `-f`：输出所有函数定义。
* `-F`：输出所有函数名。
* `-i`：声明整数变量。
* `-l`：声明变量为小写字母。
* `-p`：查看变量信息。
* `-r`：声明只读变量。
* `-u`：声明变量为大写字母。
* `-x`：该变量输出为环境变量。

`declare`命令如果用在函数中，声明的变量只在函数内部有效，等同于`local`命令。

不带任何参数时，`declare`命令输出当前环境的所有变量，包括函数在内，等同于不带有任何参数的`set`命令。
```
[root@localhost ~]# declare
```
### -i 参数
`-i`参数声明整数变量以后，可以直接进行数学运算。
```shell
[root@localhost ~]# declare -i val1=12 val2=5
[root@localhost ~]# declare -i result
[root@localhost ~]# result=val1*val2
[root@localhost ~]# echo $result
60
```
上面例子中，如果变量`result`不声明为整数，`val1*val2`会被当作字面量，不会进行整数运算。另外，`val1`和`val2`其实不需要声明为整数，因为只要`result`声明为整数，它的赋值就会自动解释为整数运算。

注意，一个变量声明为整数以后，依然可以被改写为字符串。
```shell
[root@localhost ~]# declare -i var=12
[root@localhost ~]# var=foo
[root@localhost ~]# echo $var
0
```
上面例子中，变量`var`声明为整数，覆盖以后，Bash 不会报错，但会赋以不确定的值，上面的例子中可能输出 0，也可能输出的是 3。
### -x 参数
`-x`参数等同于`export`命令，可以输出一个变量为子 Shell 的环境变量。
```shell
[root@localhost ~]# declare -x foo
# 等同于
[root@localhost ~]# export foo
```
### -r 参数
`-r`参数可以声明只读变量，无法改变变量值，也不能`unset`变量。
```shell
[root@localhost ~]# declare -r bar=1

[root@localhost ~]# bar=2
bash: bar：只读变量
[root@localhost ~]# echo $?
1

[root@localhost ~]# unset bar
bash: bar：只读变量
[root@localhost ~]# echo $?
1
```
上面例子中，后两个赋值语句都会报错，命令执行失败。
### -u 参数
`-u`参数声明变量为大写字母，可以自动把变量值转成大写字母。
```shell
[root@localhost ~]# declare -u foo
[root@localhost ~]# foo=upper
[root@localhost ~]# echo $foo
UPPER
```
### -l 参数
`-l`参数声明变量为小写字母，可以自动把变量值转成小写字母。
```shell
[root@localhost ~]# declare -l bar
[root@localhost ~]# bar=LOWER
[root@localhost ~]# echo $bar
lower
```
### -p 参数
`-p`参数输出变量信息。
```shell
[root@localhost ~]# foo=hello
[root@localhost ~]# declare -p foo
declare -- foo="hello"
[root@localhost ~]# declare -p bar
bar：未找到
```
上面例子中，`declare -p`可以输出已定义变量的值，对于未定义的变量，会提示找不到。

如果不提供变量名，`declare -p`输出所有变量的信息。
```shell
[root@localhost ~]# declare -p
```
### -f 参数
`-f`参数输出当前环境的所有函数，包括它的定义。
```shell
[root@localhost ~]# declare -f
```
### -F参数
`-F`参数输出当前环境的所有函数名，不包含函数定义。
```shell
[root@localhost ~]# declare -F
```
## readonly 命令
`readonly`命令等同于`declare -r`，用来声明只读变量，不能改变变量值，也不能`unset`变量。
```shell
[root@localhost ~]# readonly foo=1
[root@localhost ~]# foo=2
-bash: foo：只读变量
[root@localhost ~]# echo $?
1
```
`readonly`命令有三个参数：
* `-f`：声明的变量为函数名
* `-p`：打印出所有的只读变量
* `-a`：声明的变量为数组

## let 命令
`let`命令声明变量时，可以直接执行算术表达式。
```shell
[root@localhost ~]# let foo=1+2
[root@localhost ~]# echo $foo
3
```
上面例子中，`let`命令可以直接计算`1 + 2`。

`let`命令的参数表达式如果包含空格，就需要使用引号。
```shell
[root@localhost ~]# let "foo = 1 + 2"
```
`let`可以同时对多个变量赋值，赋值表达式之间使用空格分隔。
```shell
[root@localhost ~]# let "v1 = 1" "v2 = v1++"
[root@localhost ~]# echo $v1,$v2
2,1
```
上面例子中，`let`声明了两个变量`v1`和`v2`，其中`v2`等于`v1++`，表示先返回`v1`的值，然后`v1`自增。
## read命令
### 用法
有时，脚本需要在执行过程中，由用户提供一部分数据，这时可以使用`read`命令。它将用户的输入存入一个变量，方便后面的代码使用。用户按下回车键，就表示输入结束。
```shell
read [options] [variable...]
```
上面语法中，`options`是参数选项，`variable`是用来保存输入数值的一个或多个变量名。如果没有提供变量名，环境变量`REPLY`会包含用户输入的一整行数据。
```bash
#!/bin/bash

echo -n "输入一些文本 > "
read text
echo "你的输入：$text"
```
上面例子中，先显示一行提示文本，然后会等待用户输入文本。用户输入的文本，存入变量`text`，在下一行显示出来。
```shell
[root@localhost ~]# bash demo.sh
输入一些文本 > 你好，世界
你的输入：你好，世界
```
`read`可以接受用户输入的多个值。
```bash
#!/bin/bash
echo Please, enter your firstname and lastname
read FN LN
echo "Hi! $LN, $FN !"
```
```shell
[root@localhost ~]# ./test.sh
Please, enter your firstname and lastname
你好 世界
Hi! 世界, 你好 !
```
上面例子中，`read`根据用户的输入，同时为两个变量赋值。

如果用户的输入项少于`read`命令给出的变量数目，那么额外的变量值为空。如果用户的输入项多于定义的变量，那么多余的输入项会包含到最后一个变量中。
```shell
[root@localhost ~]# ./test.sh
Please, enter your firstname and lastname
你好
Hi! , 你好 !
[root@localhost ~]# ./test.sh
Please, enter your firstname and lastname
1 2 3
Hi! 2 3, 1 !
```
如果`read`命令之后没有定义变量名，那么环境变量`REPLY`会包含所有的输入。
````bash
#!/bin/bash
echo -n "Enter one or more values > "
read
echo "REPLY = '$REPLY'"
````
上面脚本的运行结果如下。
```shell
[root@localhost ~]# ./test.sh
Enter one or more values > a b c d
REPLY = 'a b c d'
```
`read`命令除了读取键盘输入，可以用来读取文件。
```bash
#!/bin/bash

filename='/etc/hosts'

while read myline
do
echo "$myline"
done < $filename
```
上面的例子通过`read`命令，读取一个文件的内容。`done`命令后面的定向符`<`，将文件内容导向`read`命令，每次读取一行，存入变量`myline`，直到文件读取完毕。
### 参数
#### `-t` 参数
`read`命令的`-t`参数，设置了超时的秒数。如果超过了指定时间，用户仍然没有输入，脚本将放弃等待，继续向下执行。
```bash
#!/bin/bash

echo -n "输入一些文本 > "
if read -t 3 response; then
  echo "用户已经输入了"
else
  echo "用户没有输入"
fi
```
上面例子中，输入命令会等待 3 秒，如果用户超过这个时间没有输入，这个命令就会执行失败。`if`根据命令的返回值，转入`else`代码块，继续往下执行。
#### `-p` 参数
`-p`参数指定用户输入的提示信息。
```bash
read -p "Enter one or more values > "
echo "REPLY = '$REPLY'"
```
上面例子中，先显示Enter one or more values >，再接受用户的输入。
#### -a 参数
`-a`参数把用户的输入赋值给一个数组，从零号位置开始。
```shell
[root@localhost ~]# read -a people
alice duchess dodo
[root@localhost ~]# echo ${people[2]}
dodo
```
#### `-n` 参数
`-n`参数指定只读取若干个字符作为变量值，而不是整行读取。
```shell
$ read -n 3 letter
abcdefghij
$ echo $letter
abc
```
上面例子中，变量`letter`只包含 3 个字母。
#### `-e` 参数
`-e`参数允许用户输入的时候，使用`readline`库提供的快捷键，比如自动补全。
```shell
#!/bin/bash

echo Please input the path to the file:

read -e fileName

echo $fileName
```
上面例子中，`read`命令接受用户输入的文件名。这时，用户可能想使用`Tab`键的文件名“自动补全”功能，但是`read`命令的输入默认不支持`readline`库的功能。`-e`参数就可以允许用户使用自动补全。
#### 其他参数
* `-d delimiter`：定义字符串`delimiter`的第一个字符作为用户输入的结束，而不是一个换行符。
* `-r`：`raw`模式，表示不把用户输入的反斜杠字符解释为转义字符。
* `-s`：使得用户的输入不显示在屏幕上，这常常用于输入密码或保密信息。
* `-u fd`：使用文件描述符`fd`作为输入。

### IFS 变量
`read`命令读取的值，默认是以空格分隔。可以通过自定义环境变量 IFS（内部字段分隔符，`Internal Field Separator`的缩写），修改分隔标志。

IFS 的默认值是空格、`Tab`符号、换行符号，通常取第一个（即空格）。

如果把 IFS 定义成冒号（:）或分号（;），就可以分隔以这两个符号分隔的值，这对读取文件很有用。
```bash
#!/bin/bash
# read-ifs: read fields from a file

FILE=/etc/passwd

read -p "Enter a username > " user_name
file_info="$(grep "^$user_name:" $FILE)"

if [ -n "$file_info" ]; then
  IFS=":" read user pw uid gid name home shell <<< "$file_info"
  echo "User = '$user'"
  echo "UID = '$uid'"
  echo "GID = '$gid'"
  echo "Full Name = '$name'"
  echo "Home Dir. = '$home'"
  echo "Shell = '$shell'"
else
  echo "No such user '$user_name'" >&2
  exit 1
fi
```
上面例子中，IFS 设为冒号，然后用来分解`/etc/passwd`文件的一行。IFS 的赋值命令和`read`命令写在一行，这样的话，IFS 的改变仅对后面的命令生效，该命令执行后 IFS 会自动恢复原来的值。如果不写在一行，就要采用下面的写法。
```shell
OLD_IFS="$IFS"
IFS=":"
read user pw uid gid name home shell <<< "$file_info"
IFS="$OLD_IFS"
```
另外，上面例子中，`<<<`是`Here`字符串，用于将变量值转为标准输入，因为`read`命令只能解析标准输入。

如果 IFS 设为空字符串，就等同于将整行读入一个变量。
```shell
#!/bin/bash
input="/path/to/txt/file"
while IFS= read -r line
do
echo "$line"
done < "$input"
```
上面的命令可以逐行读取文件，每一行存入变量`line`，打印出来以后再读取下一行。
