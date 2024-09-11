---
title: Bash脚本——常用命令
date: 2024-06-10
tags: Bash
categories: Linux
order: 26
---


## shift 命令
`shift`命令可以改变脚本参数，每次执行都会移除脚本当前的第一个参数（`$1`），使得后面的参数向前一位，即`$2`变成`$1、$3`变成`$2、$4`变成`$3`，以此类推。

`while`循环结合`shift`命令，也可以读取每一个参数。
```bash
#!/bin/bash

echo "一共输入了 $# 个参数"

while [ "$1" != "" ]; do
  echo "剩下 $# 个参数"
  echo "参数：$1"
  shift
done
```
上面例子中，`shift`命令每次移除当前第一个参数，从而通过`while`循环遍历所有参数。

`shift`命令可以接受一个整数作为参数，指定所要移除的参数个数，默认为 1。
```
shift 3
```
上面的命令移除前三个参数，原来的`$4`变成`$1`。
## getopts 命令
`getopts`命令用在脚本内部，可以解析复杂的脚本命令行参数，通常与`while`循环一起使用，取出脚本所有的带有前置连词线（-）的参数。
```bash
getopts optstring name
```
它带有两个参数。第一个参数`optstring`是字符串，给出脚本所有的连词线参数。比如，某个脚本可以有三个配置项参数`-l、-h、-a`，其中只有`-a`可以带有参数值，而`-l`和`-h`是开关参数，那么`getopts`的第一个参数写成`lha:`，顺序不重要。注意，`a`后面有一个冒号，表示该参数带有参数值，getopts规定带有参数值的配置项参数，后面必须带有一个冒号（:）。`getopts`的第二个参数`name`是一个变量名，用来保存当前取到的配置项参数，即`l、h`或`a`。

下面是一个例子。
```bash
while getopts 'lha:' OPTION; do
  case "$OPTION" in
    l)
      echo "linuxconfig"
      ;;

    h)
      echo "h stands for h"
      ;;

    a)
      avalue="$OPTARG"
      echo "The value provided is $OPTARG"
      ;;
    ?)
      echo "script usage: $(basename $0) [-l] [-h] [-a somevalue]" >&2
      exit 1
      ;;
  esac
done
shift "$(($OPTIND - 1))"
```
上面例子中，`while`循环不断执行`getopts 'lha:' OPTION`命令，每次执行就会读取一个连词线参数（以及对应的参数值），然后进入循环体。变量`OPTION`保存的是，当前处理的那一个连词线参数（即`l、h`或`a`）。如果用户输入了没有指定的参数（比如`-x`），那么`OPTION`等于`?`。循环体内使用`case`判断，处理这四种不同的情况。

如果某个连词线参数带有参数值，比如`-a foo`，那么处理`a`参数的时候，环境变量`$OPTARG`保存的就是参数值。

注意，只要遇到不带连词线的参数，`getopts`就会执行失败，从而退出`while`循环。比如，`getopts`可以解析`command -l foo`，但不可以解析`command foo -l`。另外，多个连词线参数写在一起的形式，比如`command -lh`，`getopts`也可以正确处理。

变量`$OPTIND`在`getopts`开始执行前是 1，然后每次执行就会加 1。等到退出`while`循环，就意味着连词线参数全部处理完毕。这时，`$OPTIND - 1`就是已经处理的连词线参数个数，使用`shift`命令将这些参数移除，保证后面的代码可以用`$1、$2`等处理命令的主参数。
## exit 命令
`exit`命令用于终止当前脚本的执行，并向 Shell 返回一个退出值。
```
[root@localhost ~]# exit
```
上面命令中止当前脚本，将最后一条命令的退出状态，作为整个脚本的退出状态。

`exit`命令后面可以跟参数，该参数就是退出状态。
```bash
# 退出值为0（成功）
[root@localhost ~]# exit 0

# 退出值为1（失败）
[root@localhost ~]# exit 1
```
退出时，脚本会返回一个退出值。脚本的退出值是一个介于 0~255 之间的整数，一般而言，0 表示正常，1 表示发生错误，2 表示用法不对，126 表示不是可执行脚本，127 表示命令没有发现。如果脚本被信号 N 终止，则退出值为 128 + N。如果不指定，默认状态值是 0。简单来说，只要退出值非 0，就认为执行出错。
```bash
if [ $(id -u) != "0" ]; then
  echo "根用户才能执行当前脚本"
  exit 1
fi
```
上面的例子中，`id -u`命令返回用户的 ID，一旦用户的 ID 不等于 0（根用户的 ID），脚本就会退出，并且退出码为 1，表示运行失败。

`exit`与`return`命令的差别是，`return`命令是函数的退出，并返回一个值给调用者，脚本依然执行。`exit`是整个脚本的退出，如果在函数之中调用`exit`，则退出函数，并终止脚本执行。
## source 命令
`source`命令用于执行一个脚本，通常用于重新加载一个配置文件。
```shell
[root@localhost ~]# source .bashrc
```
`source`命令最大的特点是在当前 Shell 执行脚本，不像直接执行脚本时，会新建一个子 Shell。所以，`source`命令执行脚本时，不需要`export`变量。
```bash
#!/bin/bash
# test.sh
echo $foo
```
上面脚本输出`$foo`变量的值。
```bash
# 当前 Shell 新建一个变量 foo
[root@localhost ~]# foo=1

# 打印输出 1
[root@localhost ~]# source test.sh
1

# 打印输出空字符串
[root@localhost ~]# bash test.sh
```
上面例子中，当前 Shell 的变量`foo`并没有`export`，所以直接执行无法读取，但是`source`执行可以读取。

`source`命令的另一个用途，是在脚本内部加载外部库。
```bash
#!/bin/bash

source ./lib.sh
function_from_lib
```
上面脚本在内部使用`source`命令加载了一个外部库，然后就可以在脚本里面，使用这个外部库定义的函数。

`source`有一个简写形式，可以使用一个点（.）来表示。
```
[root@localhost ~]# . .bashrc
```
## 别名，alias 命令
`alias`命令用来为一个命令指定别名，这样更便于记忆。
```
alias NAME=DEFINITION
```
上面命令中，`NAME`是别名的名称，`DEFINITION`是别名对应的原始命令。注意，等号两侧不能有空格，否则会报错。

一个常见的例子是为`grep`命令起一个`search`的别名。
```bash
alias search=grep
```
`alias`也可以用来为长命令指定一个更短的别名。下面是通过别名定义一个`today`的命令。
```bash
[root@localhost ~]# alias today='date +"%A, %B %-d, %Y"'
[root@localhost ~]# today
星期一, 一月 6, 2020
```
`alias`定义的别名也可以接受参数，参数会直接传入原始命令。
```bash
[root@localhost ~]# alias echo='echo It says: '
[root@localhost ~]# echo hello world
It says: hello world
```
上面例子中，别名定义了`echo`命令的前两个参数，等同于修改了`echo`命令的默认行为。

指定别名以后，就可以像使用其他命令一样使用别名。一般来说，都会把常用的别名写在`~/.bashrc`的末尾。另外，只能为命令定义别名，为其他部分（比如很长的路径）定义别名是无效的。

直接调用`alias`命令，可以显示所有别名。
```bash
[root@localhost ~]# alias
```
`unalias`命令可以解除别名。
```bash
[root@localhost ~]# unalias lt
```
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
#!/bin/bash
echo -n "Enter one or more values > "
read
echo "REPLY = '$REPLY'"
```
```shell
[root@localhost ~]# ./test.sh
Enter one or more values >a   
REPLY = 'a'
```
#### `-a` 参数
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
## echo 命令
`echo`命令用于在终端输出字符串或变量。
```shell
[root@localhost ~]# echo [字符串 | 变量]
```
```shell
[root@localhost ~]# echo hello world
hello world
[root@localhost ~]# echo $SHELL
/bin/bash
```
如果想要输出的是多行文本，即包括换行符。这时就需要把多行文本放在引号里面。
```shell
[root@localhost ~]# echo "<HTML>
  <HEAD>
    <TITLE>Page Title</TITLE>
  </HEAD>
  <BODY>
    Page body.
  </BODY>
</HTML>"
```
#### -n 参数
默认情况下，`echo`输出的文本末尾会有一个回车符。`-n`参数可以取消末尾的回车符，使得下一个提示符紧跟在输出内容的后面。
```shell
[root@localhost ~]# echo -n hello world
hello world[root@localhost ~]# 
```
```shell
[root@localhost ~]# echo a;echo b
a
b
[root@localhost ~]# echo -n a;echo b
ab
```
#### -e 参数
`-e`参数会解释引号（双引号和单引号）里面的特殊字符（比如换行符`\n`）。如果不使用`-e`参数，即默认情况下，引号会让特殊字符变成普通字符，`echo`不解释它们，原样输出。
```shell
[root@localhost ~]# echo "Hello\nWorld"
Hello\nWorld
# 双引号的情况
[root@localhost ~]# echo -e "Hello\nWorld"
Hello
World
# 单引号的情况
[root@localhost ~]# echo -e 'Hello\nWorld'
Hello
World
```
上面代码中，`-e`参数使得`\n`解释为换行符，导致输出内容里面出现换行。
## Here 文档
Here 文档是一种输入多行字符串的方法，格式如下。
```shell
<< token
text
token
```
它的格式分成开始标记（`<< token`）和结束标记（`token`）。开始标记是两个小于号`+ Here`文档的名称，名称可以随意取，后面必须是一个换行符；结束标记是单独一行顶格写的 Here 文档名称，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。

下面是一个通过 Here 文档输出 HTML 代码的例子。
```shell
[root@localhost ~]# cat << _EOF_
<html>
<head>
    <title>
    The title of your page
    </title>
</head>

<body>
    Your page content goes here.
</body>
</html>
_EOF_
```
Here 文档内部会发生变量替换，同时支持反斜杠转义，但是不支持通配符扩展，双引号和单引号也失去语法作用，变成了普通字符。
```shell
[root@localhost ~]# foo='hello world'
[root@localhost ~]# cat << _example_
$foo
"$foo"
'$foo'
_example_

hello world
"hello world"
'hello world'
```
上面例子中，变量`$foo`发生了替换，但是双引号和单引号都原样输出了，表明它们已经失去了引用的功能。

如果不希望发生变量替换，可以把 Here 文档的开始标记放在单引号之中。
```shell
[root@localhost ~]# foo='hello world'
[root@localhost ~]# cat << '_example_'
$foo
"$foo"
'$foo'
_example_

$foo
"$foo"
'$foo'
```
上面例子中，Here 文档的开始标记（`_example_`）放在单引号之中，导致变量替换失效了。

Here 文档的本质是重定向，它将字符串重定向输出给某个命令，相当于包含了`echo`命令。
```shell
[root@localhost ~]# command << token
  string
token

# 等同于
[root@localhost ~]# echo string | command
```
上面代码中，Here 文档相当于`echo`命令的重定向。

所以，Here 字符串只适合那些可以接受标准输入作为参数的命令，对于其他命令无效，比如`echo`命令就不能用 Here 文档作为参数。
```shell
[root@localhost ~]# echo << _example_
hello
_example_
```
上面例子不会有任何输出，因为 Here 文档对于`echo`命令无效。

此外，Here 文档也不能作为变量的值，只能用于命令的参数。
## Here 字符串
Here 文档还有一个变体，叫做 Here 字符串，使用三个小于号（`<<<`）表示。
```
<<< string
```
它的作用是将字符串通过标准输入，传递给命令。

有些命令直接接受给定的参数，与通过标准输入接受参数，结果是不一样的。所以才有了这个语法，使得将字符串通过标准输入传递给命令更方便，比如cat命令只接受标准输入传入的字符串。
```shell
[root@localhost ~]# cat <<< 'hi there'
# 等同于
[root@localhost ~]# echo 'hi there' | cat
```
上面的第一种语法使用了 Here 字符串，要比第二种语法看上去语义更好，也更简洁。
```shell
[root@localhost ~]# md5sum <<< 'ddd'
# 等同于
[root@localhost ~]# echo 'ddd' | md5sum
```
上面例子中，`md5sum`命令只能接受标准输入作为参数，不能直接将字符串放在命令后面，会被当作文件名，即`md5sum ddd`里面的`ddd`会被解释成文件名。这时就可以用 Here 字符串，将字符串传给`md5sum`命令。

## set 命令
Bash 执行脚本时，会创建一个子 Shell。
```bash
$ bash script.sh
```
上面代码中，`script.sh`是在一个子 Shell 里面执行。这个子 Shell 就是脚本的执行环境，Bash 默认给定了这个环境的各种参数。

`set`命令用来修改子 Shell 环境的运行参数，即定制环境。

如果命令行下不带任何参数，直接运行`set`，会显示所有的环境变量和 Shell 函数。
```bash
[root@localhost ~]# set
BASH=/bin/bash
BASHOPTS=checkwinsize:cmdhist:complete_fullquote:expand_aliases:extquote:force_fignore:globasciiranges:histappend:hostcomplete:interactive_comments:login_shell:progcomp:promptvars:sourcepath
BASHRCSOURCED=Y
BASH_ALIASES=()
BASH_ARGC=([0]="0")
BASH_ARGV=()
......
```
### set -u
执行脚本时，如果遇到不存在的变量，Bash 默认忽略它。
```bash
#!/usr/bin/env bash

echo $a
echo bar
```
上面代码中，`$a`是一个不存在的变量。
```bash
[root@localhost ~]# ./test.sh 

bar
```
可以看到，`echo $a`输出了一个空行，Bash 忽略了不存在的`$a`，然后继续执行`echo bar`。大多数情况下，这不是开发者想要的行为，遇到变量不存在，脚本应该报错，而不是一声不响地往下执行。

`set -u`就用来改变这种行为。脚本在头部加上它，遇到不存在的变量就会报错，并停止执行。
```bash
#!/usr/bin/env bash
set -u

echo $a
echo bar
```
运行结果如下。
```shell
[root@localhost ~]# ./test.sh 
./test.sh:行5: a：未绑定的变量
```
可以看到，脚本报错了，并且不再执行后面的语句。

`-u`还有另一种写法`-o nounset`，两者是等价的。
```
set -o nounset
```
### set -x
默认情况下，脚本执行后，只输出运行结果，没有其他内容。如果多个命令连续执行，它们的运行结果就会连续输出。有时会分不清，某一段内容是什么命令产生的。

`set -x`用来在运行结果之前，先输出执行的那一行命令。
```bash
#!/usr/bin/env bash
set -x

echo bar
```
```shell
[root@localhost ~]# ./test.sh
+ echo bar
bar
```
可以看到，执行`echo bar`之前，该命令会先打印出来，行首以+表示。这对于调试复杂的脚本是很有用的。

`-x`还有另一种写法`-o xtrace`。
```
set -o xtrace
```
脚本当中如果要关闭命令输出，可以使用`set +x`。
```bash
#!/bin/bash

number=1

set -x
if [ $number = "1" ]; then
  echo "Number equals 1"
else
  echo "Number does not equal 1"
fi
set +x
```
上面的例子中，只对特定的代码段打开命令输出。
### Bash 的错误处理
如果脚本里面有运行失败的命令（返回值非 0），Bash 默认会继续执行后面的命令。
```bash
#!/usr/bin/env bash

foo
echo bar
```
上面脚本中，`foo`是一个不存在的命令，执行时会报错。但是，Bash 会忽略这个错误，继续往下执行。
```shell
[root@localhost ~]# ./test.sh 
./test.sh:行4: foo：未找到命令
bar
```
这种行为很不利于脚本安全和除错。实际开发中，如果某个命令失败，往往需要脚本停止执行，防止错误累积。这时，一般采用下面的写法。
```bash
command || exit 1
```
上面的写法表示只要`command`有非零返回值，脚本就会停止执行。

如果停止执行之前需要完成多个操作，就要采用下面三种写法。
```
# 写法一
command || { echo "command failed"; exit 1; }

# 写法二
if ! command; then echo "command failed"; exit 1; fi

# 写法三
command
if [ "$?" -ne 0 ]; then echo "command failed"; exit 1; fi
```
另外，除了停止执行，还有一种情况。如果两个命令有继承关系，只有第一个命令成功了，才能继续执行第二个命令，那么就要采用下面的写法。
```bash
command1 && command2
set -e
```
上面这些写法多少有些麻烦，容易疏忽。`set -e`从根本上解决了这个问题，它使得脚本只要发生错误，就终止执行。
```bash
#!/usr/bin/env bash
set -e

foo
echo bar
```
```shell
[root@localhost ~]# ./test.sh 
./test.sh:行4: foo：未找到命令
```
`set -e`根据返回值来判断，一个命令是否运行失败。但是，某些命令的非零返回值可能不表示失败，或者开发者希望在命令失败的情况下，脚本继续执行下去。这时可以暂时关闭`set -e`，该命令执行结束后，再重新打开`set -e`。
```
set +e
command1
command2
set -e
```
上面代码中，`set +e`表示关闭`-e`选项，`set -e`表示重新打开`-e`选项。

还有一种方法是使用`command || true`，使得该命令即使执行失败，脚本也不会终止执行。
```bash
#!/bin/bash
set -e

foo || true
echo bar
```
上面代码中，`true`使得这一行语句总是会执行成功，后面的`echo bar`会执行。

`-e`还有另一种写法`-o errexit`。
```
set -o errexit
```
### set -o pipefail
`set -e`有一个例外情况，就是不适用于管道命令。

所谓管道命令，就是多个子命令通过管道运算符（|）组合成为一个大的命令。Bash 会把最后一个子命令的返回值，作为整个命令的返回值。也就是说，只要最后一个子命令不失败，管道命令总是会执行成功，因此它后面命令依然会执行，`set -e`就失效了。
```bash
#!/usr/bin/env bash
set -e

foo | echo a
echo bar
```
执行结果如下。
```
$ bash script.sh
a
script.sh:行4: foo: 未找到命令
bar
```
上面代码中，`foo`是一个不存在的命令，但是`foo | echo a`这个管道命令会执行成功，导致后面的`echo bar`会继续执行。

`set -o pipefail`用来解决这种情况，只要一个子命令失败，整个管道命令就失败，脚本就会终止执行。
```bash
#!/usr/bin/env bash
set -eo pipefail

foo | echo a
echo bar
```
运行后，结果如下。
```
$ bash script.sh
a
script.sh:行4: foo: 未找到命令
```
可以看到，`echo bar`没有执行。
### set -E
一旦设置了`-e`参数，会导致函数内的错误不会被`trap`命令捕获。-E参数可以纠正这个行为，使得函数也能继承`trap`命令。
```
#!/bin/bash
set -e

trap "echo ERR trap fired!" ERR

myfunc()
{
  # 'foo' 是一个不存在的命令
  foo
}

myfunc
```
上面示例中，`myfunc`函数内部调用了一个不存在的命令`foo`，导致执行这个函数会报错。
```
$ bash test.sh
test.sh:行9: foo：未找到命令
```
但是，由于设置了`set -e`，函数内部的报错并没有被`trap`命令捕获，需要加上`-E`参数才可以。
```
#!/bin/bash
set -Eeuo pipefail

trap "echo ERR trap fired!" ERR

myfunc()
{
  # 'foo' 是一个不存在的命令
  foo
}

myfunc
```
执行上面这个脚本，就可以看到`trap`命令生效了。
```
$ bash test.sh
test.sh:行9: foo：未找到命令
ERR trap fired!
```
### 其他参数
`set`命令还有一些其他参数。

| 参数                         | 说明                   |
|----------------------------|----------------------|
| set -n <br> set -o noexec  | 不运行命令，只检查语法是否正确      |
| set -f <br> set -o noglob  | 表示不对通配符进行文件名扩展       |
| set -v <br> set -o verbose | 表示打印 Shell 接收到的每一行输入 |
| set -o noclobber           | 防止使用重定向运算符>覆盖已经存在的文件 |

上面的`-f`和`-v`参数，可以分别使用`set +f、set +v`关闭。
### set 命令总结
上面重点介绍的set命令的几个参数，一般都放在一起使用。
```
# 写法一
set -Eeuxo pipefail

# 写法二
set -Eeux
set -o pipefail
```
这两种写法建议放在所有 Bash 脚本的头部。

另一种办法是在执行 Bash 脚本的时候，从命令行传入这些参数。
```
$ bash -euxo pipefail script.sh
```
## shopt 命令
`shopt`命令用来调整 Shell 的参数，跟`set`命令的作用很类似。之所以会有这两个类似命令的主要原因是，`set`是从 Ksh 继承的，属于 POSIX 规范的一部分，而`shopt`是 Bash 特有的。

直接输入`shopt`可以查看所有参数，以及它们各自打开和关闭的状态。
```
$ shopt
```
`shopt`命令后面跟着参数名，可以查询该参数是否打开。
```
$ shopt globstar
globstar  off
```
上面例子表示`globstar`参数默认是关闭的。

1. `-s`
`-s`用来打开某个参数。
```
$ shopt -s optionNameHere
```
2. `-u`
`-u`用来关闭某个参数。
```
$ shopt -u optionNameHere
```
举例来说，`histappend`这个参数表示退出当前 Shell 时，将操作历史追加到历史文件中。这个参数默认是打开的，如果使用下面的命令将其关闭，那么当前 Shell 的操作历史将替换掉整个历史文件。
```
$ shopt -u histappend
```
3. `-q`
`-q`的作用也是查询某个参数是否打开，但不是直接输出查询结果，而是通过命令的执行状态（`$?`）表示查询结果。如果状态为 0，表示该参数打开；如果为 1，表示该参数关闭。
```
$ shopt -q globstar
$ echo $?
1
```
上面命令查询`globstar`参数是否打开。返回状态为 1，表示该参数是关闭的。

这个用法主要用于脚本，供`if`条件结构使用。下面例子是如果打开了这个参数，就执行`if`结构内部的语句。
```
if (shopt -q globstar); then
  ...
fi
```
