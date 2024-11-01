---
title: Bash脚本——流程控制
date: 2024-05-25
tags: Bash
categories: Linux
order: 23
---


## 条件判断
### if 结构
```bash
if commands; then
  commands
[elif commands; then
  commands...]
[else
  commands]
fi
```
这个命令分成三个部分：`if、elif`和`else`。其中，后两个部分是可选的。
```bash
if test $USER = "foo"; then
  echo "Hello foo."
else
  echo "You are not foo."
fi
```
上面的例子中，判断条件是环境变量`$USER`是否等于`foo`，如果等于就输出`Hello foo.`，否则输出其他内容。

`if`和`then`写在同一行时，需要分号分隔。分号是 Bash 的命令分隔符。它们也可以写成两行，这时不需要分号。
```bash
if true
then
  echo 'hello world'
fi
```
除了多行的写法，`if`结构也可以写成单行。
```bash
if true; then echo 'hello world'; fi
```
注意，`if`关键字后面也可以是一条命令，该条命令执行成功（返回值 0），就意味着判断条件成立。
```shell
[root@localhost ~]# if echo 'hi'; then echo 'hello world'; fi
hi
hello world
```
`if`后面可以跟任意数量的命令。这时，所有命令都会执行，但是判断真伪只看最后一个命令，即使前面所有命令都失败，只要最后一个命令返回 0，就会执行`then`的部分。
```shell
[root@localhost ~]# if false; true; then echo 'hello world'; fi
hello world
```
`elif`部分可以有多个。
```bash
#!/bin/bash

echo -n "输入一个1到3之间的数字（包含两端）> "
read character
if [ "$character" = "1" ]; then
    echo 1
elif [ "$character" = "2" ]; then
    echo 2
elif [ "$character" = "3" ]; then
    echo 3
else
    echo 输入不符合要求
fi
```
上面例子中，如果用户输入 3，就会连续判断 3 次。
### test 命令
`if`结构的判断条件，一般使用`test`命令，有三种形式。
```bash
# 写法一
test expression

# 写法二
[ expression ]

# 写法三
[[ expression ]]
```
上面三种形式是等价的，但是第三种形式还支持正则判断，前两种不支持。

上面的`expression`是一个表达式。这个表达式为真，`test`命令执行成功（返回值为 0）；表达式为伪，`test`命令执行失败（返回值为 1）。注意，第二种和第三种写法，`[`和`]`与内部的表达式之间必须有空格。
```bash
[root@localhost ~]# test -f /etc/hosts
[root@localhost ~]# echo $?
0

[root@localhost ~]# [ -f /etc/hosts ]
[root@localhost ~]# echo $?
0
```
上面的例子中，`test`命令采用两种写法，判断`/etc/hosts`文件是否存在，这两种写法是等价的。命令执行后，返回值为 0，表示该文件确实存在。

实际上，`[`这个字符是`test`命令的一种简写形式，可以看作是一个独立的命令，这解释了为什么它后面必须有空格。

下面把`test`命令的三种形式，用在`if`结构中，判断一个文件是否存在。
```bash
# 写法一
if test -e /tmp/foo.txt ; then
  echo "Found foo.txt"
fi

# 写法二
if [ -e /tmp/foo.txt ] ; then
  echo "Found foo.txt"
fi

# 写法三
if [[ -e /tmp/foo.txt ]] ; then
  echo "Found foo.txt"
fi
```
### 判断表达式
`if`关键字后面，跟的是一个命令。这个命令可以是`test`命令，也可以是其他命令。命令的返回值为 0 表示判断成立，否则表示不成立。因为这些命令主要是为了得到返回值，所以可以视为表达式。

常用的判断表达式有下面这些。
#### 文件判断
以下表达式用来判断文件状态。

| 表达式                   | 说明                                      |
|:----------------------|:----------------------------------------|
| `[ -a file ]`         | 如果`file`存在，则为`true`                     |
| `[ -b file ]`         | 如果`file`存在并且是一个块（设备）文件，则为`true`         |
| `[ -c file ]`         | 如果`file`存在并且是一个字符（设备）文件，则为`true`        |
| `[ -d file ]`         | 如果`file`存在并且是一个目录，则为`true`              |
| `[ -e file ]`         | 如果`file`存在，则为`true`                     |
| `[ -f file ]`         | 如果`file`存在并且是一个普通文件，则为`true`            |
| `[ -g file ]`         | 如果`file`存在并且设置了组 ID，则为`true`            |
| `[ -G file ]`         | 如果`file`存在并且属于有效的组 ID，则为`true`          |
| `[ -h file ]`         | 如果`file`存在并且是符号链接，则为`true`              |
| `[ -k file ]`         | 如果`file`存在并且设置了它的`sticky bit`，则为`true`  |
| `[ -L file ]`         | 如果`file`存在并且是一个符号链接，则为`true`            |
| `[ -N file ]`         | 如果`file`存在并且自上次读取后已被修改，则为`true`         |
| `[ -O file ]`         | 如果`file`存在并且属于有效的用户 ID，则为`true`         |
| `[ -p file ]`         | 如果`file`存在并且是一个命名管道，则为`true`            |
| `[ -r file ]`         | 如果`file`存在并且可读（当前用户有可读权限），则为`true`      |
| `[ -s file ]`         | 如果`file`存在且其长度大于零，则为`true`              |
| `[ -S file ]`         | 如果`file`存在且是一个网络 socket，则为`true`        |
| `[ -t fd ]`           | 如果`fd`是一个文件描述符，并且重定向到终端，则为`true`。这可以用来判断是否重定向了标准输入／输出／错误 |
| `[ -u file ]`         | 如果`file`存在并且设置了`setuid`位，则为`true`       |
| `[ -w file ]`         | 如果`file`存在并且可写（当前用户拥有可写权限），则为`true`     |
| `[ -x file ]`         | 如果`file`存在并且可执行（有效用户有执行／搜索权限），则为`true`  |
| `[ file1 -nt file2 ]` | 如果`FILE1`比`FILE2`的更新时间最近，或者`FILE1`存在而`FILE2`不存在，则为`true` |
| `[ file1 -ot file2 ]` | 如果`FILE1`比`FILE2`的更新时间更旧，或者`FILE2`存在而`FILE1`不存在，则为`true` |
| `[ FILE1 -ef FILE2 ]` | 如果`FILE1`和`FILE2`引用相同的设备和`inode`编号，则为`true` |


```bash
#!/bin/bash

FILE=~/.bashrc

if [ -e "$FILE" ]; then
  if [ -f "$FILE" ]; then
    echo "$FILE is a regular file."
  fi
  if [ -d "$FILE" ]; then
    echo "$FILE is a directory."
  fi
  if [ -r "$FILE" ]; then
    echo "$FILE is readable."
  fi
  if [ -w "$FILE" ]; then
    echo "$FILE is writable."
  fi
  if [ -x "$FILE" ]; then
    echo "$FILE is executable/searchable."
  fi
else
  echo "$FILE does not exist"
  exit 1
fi
```
上面代码中，`$FILE`要放在双引号之中，这样可以防止变量`$FILE`为空，从而出错。因为`$FILE`如果为空，这时`[ -e $FILE ]`就变成`[ -e ]`，这会被判断为真。而`$FILE`放在双引号之中，`[ -e "$FILE" ]`就变成`[ -e "" ]`，这会被判断为伪。
#### 字符串判断
以下表达式用来判断字符串。

| 表达式                       | 说明                                       |
|:--------------------------|:-----------------------------------------|
| `[ string ]`              | 如果`string`不为空（长度大于0），则为`true`            |
| `[ -n string ]`           | 如果字符串`string`的长度大于零，则为`true`             |
| `[ -z string ]`           | 如果字符串`string`的长度为零，则为`true`              |
| `[ string1 = string2 ]`   | 如果`string1`和`string2`相同，则为`true`         |
| `[ string1 == string2 ]`  | 等同于`[ string1 = string2 ]`               |
| `[ string1 != string2 ]`  | 如果`string1`和`string2`不相同，则为`true`        |
| `[ string1 '>' string2 ]` | 如果按照字典顺序`string1`排列在`string2`之后，则为`true` |
| `[ string1 '<' string2 ]` | 如果按照字典顺序`string1`排列在`string2`之前，则为`true` |


> 注意，`test`命令内部的`>`和`<`，必须用引号引起来（或者是用反斜杠转义）。否则，它们会被 shell 解释为重定向操作符。

```bash
#!/bin/bash

ANSWER=maybe

if [ -z "$ANSWER" ]; then
  echo "There is no answer." >&2
  exit 1
fi
if [ "$ANSWER" = "yes" ]; then
  echo "The answer is YES."
elif [ "$ANSWER" = "no" ]; then
  echo "The answer is NO."
elif [ "$ANSWER" = "maybe" ]; then
  echo "The answer is MAYBE."
else
  echo "The answer is UNKNOWN."
fi
```
上面代码中，首先确定`$ANSWER`字符串是否为空。如果为空，就终止脚本，并把退出状态设为 1。注意，这里的`echo`命令把错误信息`There is no answer.`重定向到标准错误，这是处理错误信息的常用方法。如果`$ANSWER`字符串不为空，就判断它的值是否等于`yes、no`或者`maybe`。

注意，字符串判断时，变量要放在双引号之中，比如`[ -n "$COUNT" ]`，否则变量替换成字符串以后，`test`命令可能会报错，提示参数过多。另外，如果不放在双引号之中，变量为空时，命令会变成`[ -n ]`，这时会判断为真。如果放在双引号之中，`[ -n "" ]`就判断为伪。
#### 整数判断
下面的表达式用于判断整数。

|             表达式             | 说明                                   |
|:---------------------------:|:-------------------------------------|
| `[ integer1 -eq integer2 ]` | 如果`integer1`等于`integer2`，则为`true`    |
| `[ integer1 -ne integer2 ]` | 如果`integer1`不等于`integer2`，则为`true`   |
| `[ integer1 -le integer2 ]` | 如果`integer1`小于或等于`integer2`，则为`true` |
| `[ integer1 -lt integer2 ]` | 如果`integer1`小于`integer2`，则为`true`    |
| `[ integer1 -ge integer2 ]` | 如果`integer1`大于或等于`integer2`，则为`true` |
| `[ integer1 -gt integer2 ]` | 如果`integer1`大于`integer2`，则为`true`    |


```bash
#!/bin/bash

INT=-5

if [ -z "$INT" ]; then
  echo "INT is empty." >&2
  exit 1
fi
if [ $INT -eq 0 ]; then
  echo "INT is zero."
else
  if [ $INT -lt 0 ]; then
    echo "INT is negative."
  else
    echo "INT is positive."
  fi
  if [ $((INT % 2)) -eq 0 ]; then
    echo "INT is even."
  else
    echo "INT is odd."
  fi
fi
```
上面例子中，先判断变量`$INT`是否为空，然后判断是否为 0，接着判断正负，最后通过求余数判断奇偶。
#### 正则判断
`[[ expression ]]`这种判断形式，支持正则表达式。
```bash
[[ string1 =~ regex ]]
```
上面的语法中，`regex`是一个正则表示式，`=~`是正则比较运算符。
```bash
#!/bin/bash

INT=-5

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  echo "INT is an integer."
  exit 0
else
  echo "INT is not an integer." >&2
  exit 1
fi
```
上面代码中，先判断变量`INT`的字符串形式，是否满足`^-?[0-9]+$`的正则模式，如果满足就表明它是一个整数。
#### test 判断的逻辑运算
通过逻辑运算，可以把多个`test`判断表达式结合起来，创造更复杂的判断。三种逻辑运算`AND，OR`和`NOT`，都有自己的专用符号。
* `AND`运算：符号`&&`，也可使用参数`-a`。
* `OR`运算：符号`||`，也可使用参数`-o`。
* `NOT`运算：符号`!`。

```bash
#!/bin/bash

MIN_VAL=1
MAX_VAL=100

INT=50

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  if [[ $INT -ge $MIN_VAL && $INT -le $MAX_VAL ]]; then
    echo "$INT is within $MIN_VAL to $MAX_VAL."
  else
    echo "$INT is out of range."
  fi
else
  echo "INT is not an integer." >&2
  exit 1
fi
```
上面例子中，`&&`用来连接两个判断条件：大于等于`$MIN_VAL`，并且小于等于`$MAX_VAL`。

使用否定操作符`!`时，最好用圆括号确定转义的范围。
```bash
if [ ! \( $INT -ge $MIN_VAL -a $INT -le $MAX_VAL \) ]; then
    echo "$INT is outside $MIN_VAL to $MAX_VAL."
else
    echo "$INT is in range."
fi
```
上面例子中，`test`命令内部使用的圆括号，必须使用引号或者转义，否则会被 Bash 解释。
#### 算术判断
Bash 还提供了`((...))`作为算术条件，进行算术运算的判断。
```bash
if ((3 > 2)); then
  echo "true"
fi
```
上面代码执行后，会打印出`true`。

注意，算术判断不需要使用`test`命令，而是直接使用`((...))`结构。这个结构的返回值，决定了判断的真伪。

如果算术计算的结果是非零值，则表示判断成立。这一点跟命令的返回值正好相反，需要小心。
```bash
$ if ((1)); then echo "It is true."; fi
It is true.
$ if ((0)); then echo "It is true."; else echo "it is false."; fi
It is false.
```
上面例子中，`((1))`表示判断成立，`((0))`表示判断不成立。

算术条件`((...))`也可以用于变量赋值。
```bash
$ if (( foo = 5 ));then echo "foo is $foo"; fi
foo is 5
```
上面例子中，`(( foo = 5 ))`完成了两件事情。首先把5赋值给变量`foo`，然后根据返回值 5，判断条件为真。

注意，赋值语句返回等号右边的值，如果返回的是 0，则判断为假。
```bash
$ if (( foo = 0 ));then echo "It is true.";else echo "It is false."; fi
It is false.
```
下面是用算术条件改写的数值判断脚本。
```bash
#!/bin/bash

INT=-5

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  if ((INT == 0)); then
    echo "INT is zero."
  else
    if ((INT < 0)); then
      echo "INT is negative."
    else
      echo "INT is positive."
    fi
    if (( ((INT % 2)) == 0)); then
      echo "INT is even."
    else
      echo "INT is odd."
    fi
  fi
else
  echo "INT is not an integer." >&2
  exit 1
fi
```
只要是算术表达式，都能用于`((...))`语法。
#### 普通命令的逻辑运算
如果`if`结构使用的不是`test`命令，而是普通命令，比如`((...))`算术运算，或者`test`命令与普通命令混用，那么可以使用 Bash 的命令控制操作符`&&（AND）`和`||（OR）`，进行多个命令的逻辑运算。
```bash
$ command1 && command2
$ command1 || command2
```
对于`&&`操作符，先执行`command1`，只有`command1`执行成功后，才会执行`command2`。对于||操作符，先执行`command1`，只有`command1`执行失败后， 才会执行`command2`。
```bash
$ mkdir temp && cd temp
```
上面的命令会创建一个名为`temp`的目录，执行成功后，才会执行第二个命令，进入这个目录。
```bash
$ [ -d temp ] || mkdir temp
```
上面的命令会测试目录`temp`是否存在，如果不存在，就会执行第二个命令，创建这个目录。这种写法非常有助于在脚本中处理错误。
```bash
[ ! -d temp ] && exit 1
```
上面的命令中，如果`temp`子目录不存在，脚本会终止，并且返回值为 1。

下面就是`if`与`&&`结合使用的写法。
```bash
if [ condition ] && [ condition ]; then
  command
fi
```
下面是一个示例。
```bash
#! /bin/bash

filename=$1
word1=$2
word2=$3

if grep $word1 $filename && grep $word2 $filename
then
  echo "$word1 and $word2 are both in $filename."
fi
```
上面的例子只有在指定文件里面，同时存在搜索词`word1`和`word2`，就会执行`if`的命令部分。

下面的示例演示如何将一个`&&`判断表达式，改写成对应的`if`结构。
```bash
[[ -d "$dir_name" ]] && cd "$dir_name" && rm *

# 等同于
if [[ ! -d "$dir_name" ]]; then
  echo "No such directory: '$dir_name'" >&2
  exit 1
fi
if ! cd "$dir_name"; then
  echo "Cannot cd to '$dir_name'" >&2
  exit 1
fi
if ! rm *; then
  echo "File deletion failed. Check results" >&2
  exit 1
fi
```
### case 结构
`case`结构用于多值判断，可以为每个值指定对应的命令，跟包含多个`elif`的`if`结构等价，但是语义更好。它的语法如下。
```bash
case expression in
  pattern )
    commands ;;
  pattern )
    commands ;;
  ...
esac
```
上面代码中，`expression`是一个表达式，`pattern`是表达式的值或者一个模式，可以有多条，用来匹配多个值，每条以两个分号（;）结尾。
```bash
#!/bin/bash

echo -n "输入一个1到3之间的数字（包含两端）> "
read character
case $character in
  1 ) echo 1
    ;;
  2 ) echo 2
    ;;
  3 ) echo 3
    ;;
  * ) echo 输入不符合要求
esac
```
上面例子中，最后一条匹配语句的模式是`*`，这个通配符可以匹配其他字符和没有输入字符的情况，类似`if`的`else`部分。

下面是另一个例子。
```bash
#!/bin/bash

OS=$(uname -s)

case "$OS" in
  FreeBSD) echo "This is FreeBSD" ;;
  Darwin) echo "This is Mac OSX" ;;
  AIX) echo "This is AIX" ;;
  Minix) echo "This is Minix" ;;
  Linux) echo "This is Linux" ;;
  *) echo "Failed to identify this OS" ;;
esac
```
上面的例子判断当前是什么操作系统。

`case`的匹配模式可以使用各种通配符，下面是一些例子。
* `a)`：匹配`a`。
* `a|b)`：匹配`a`或`b`。
* `[[:alpha:]])`：匹配单个字母。
* `???)`：匹配 3 个字符的单词。
* `*.txt)`：匹配`.txt`结尾。
* `*)`：匹配任意输入，通过作为`case`结构的最后一个模式。

```bash
#!/bin/bash

echo -n "输入一个字母或数字 > "
read character
case $character in
  [[:lower:]] | [[:upper:]] ) echo "输入了字母 $character"
                              ;;
  [0-9] )                     echo "输入了数字 $character"
                              ;;
  * )                         echo "输入不符合要求"
esac
```
上面例子中，使用通配符`[[:lower:]] | [[:upper:]]`匹配字母，`[0-9]`匹配数字。

Bash 4.0 之前，`case`结构只能匹配一个条件，然后就会退出`case`结构。Bash 4.0 之后，允许匹配多个条件，这时可以用`;;&`终止每个条件块。
```bash
#!/bin/bash
# test.sh

read -n 1 -p "Type a character > "
echo
case $REPLY in
  [[:upper:]])    echo "'$REPLY' is upper case." ;;&
  [[:lower:]])    echo "'$REPLY' is lower case." ;;&
  [[:alpha:]])    echo "'$REPLY' is alphabetic." ;;&
  [[:digit:]])    echo "'$REPLY' is a digit." ;;&
  [[:graph:]])    echo "'$REPLY' is a visible character." ;;&
  [[:punct:]])    echo "'$REPLY' is a punctuation symbol." ;;&
  [[:space:]])    echo "'$REPLY' is a whitespace character." ;;&
  [[:xdigit:]])   echo "'$REPLY' is a hexadecimal digit." ;;&
esac
```
执行上面的脚本，会得到下面的结果。
```bash
$ test.sh
Type a character > a
'a' is lower case.
'a' is alphabetic.
'a' is a visible character.
'a' is a hexadecimal digit.
```
可以看到条件语句结尾添加了`;;&`以后，在匹配一个条件之后，并没有退出`case`结构，而是继续判断下一个条件。
## 循环
Bash 提供三种循环语法`for`、`while`和`until`。
### while 循环
`while`循环有一个判断条件，只要符合条件，就不断循环执行指定的语句。
```bash
while condition; do
  commands
done
```
上面代码中，只要满足条件`condition`，就会执行命令`commands`。然后，再次判断是否满足条件`condition`，只要满足，就会一直执行下去。只有不满足条件，才会退出循环。

循环条件`condition`可以使用`test`命令，跟`if`结构的判断条件写法一致。
```bash
#!/bin/bash

number=0
while [ "$number" -lt 10 ]; do
  echo "Number = $number"
  number=$((number + 1))
done
```
上面例子中，只要变量`$number`小于 10，就会不断加 1，直到`$number`等于 10，然后退出循环。

关键字`do`可以跟`while`不在同一行，这时两者之间不需要使用分号分隔。
```bash
while true
do
  echo 'Hi, while looping ...';
done
```
上面的例子会无限循环，可以按下`Ctrl + c`停止。

`while`循环写成一行，也是可以的。
```bash
$ while true; do echo 'Hi, while looping ...'; done
```
`while`的条件部分也可以是执行一个命令。
```bash
$ while echo 'ECHO'; do echo 'Hi, while looping ...'; done
```
上面例子中，判断条件是`echo 'ECHO'`。由于这个命令总是执行成功，所以上面命令会产生无限循环。

`while`的条件部分可以执行任意数量的命令，但是执行结果的真伪只看最后一个命令的执行结果。
```bash
$ while true; false; do echo 'Hi, looping ...'; done
```
上面代码运行后，不会有任何输出，因为`while`的最后一个命令是`false`。
### until 循环
`until`循环与`while`循环恰好相反，只要不符合判断条件（判断条件失败），就不断循环执行指定的语句。一旦符合判断条件，就退出循环。
```bash
until condition; do
  commands
done
```
关键字`do`可以与`until`不写在同一行，这时两者之间不需要分号分隔。
```bash
until condition
do
  commands
done
```
```bash
$ until false; do echo 'Hi, until looping ...'; done
Hi, until looping ...
Hi, until looping ...
Hi, until looping ...
^C
```
上面代码中，`until`的部分一直为`false`，导致命令无限运行，必须按下`Ctrl + c`终止。
```bash
#!/bin/bash

number=0
until [ "$number" -ge 10 ]; do
  echo "Number = $number"
  number=$((number + 1))
done
```
上面例子中，只要变量`number`小于 10，就会不断加 1，直到`number`大于等于 10，就退出循环。

`until`的条件部分也可以是一个命令，表示在这个命令执行成功之前，不断重复尝试。
```bash
until cp $1 $2; do
  echo 'Attempt to copy failed. waiting...'
  sleep 5
done
```
上面例子表示，只要`cp $1 $2`这个命令执行不成功，就5秒钟后再尝试一次，直到成功为止。

`until`循环都可以转为`while`循环，只要把条件设为否定即可。上面这个例子可以改写如下。
```bash
while ! cp $1 $2; do
  echo 'Attempt to copy failed. waiting...'
  sleep 5
done
```
一般来说，`until`用得比较少，完全可以统一都使用`while`。
### for...in 循环
`for...in`循环用于遍历列表的每一项。
```bash
for variable in list
do
  commands
done
# 关键词`do`可以跟`for`写在同一行，两者使用分号分隔
for variable in list; do
  commands
done
```
上面语法中，`for`循环会依次从`list`列表中取出一项，作为变量`variable`，然后在循环体中进行处理。
```bash
#!/bin/bash

for i in word1 word2 word3; do
  echo $i
done
```
上面例子中，`word1 word2 word3`是一个包含三个单词的列表，变量`i`依次等于`word1、word2、word3`，命令`echo $i`则会相应地执行三次。

列表可以由通配符产生。
```bash
for i in *.png; do
  ls -l $i
done
```
上面例子中，`*.png`会替换成当前目录中所有 PNG 图片文件，变量`i`会依次等于每一个文件。

列表也可以通过子命令产生。
```bash
#!/bin/bash

count=0
for i in $(cat ~/.bash_profile); do
  count=$((count + 1))
  echo "Word $count ($i) contains $(echo -n $i | wc -c) characters"
done
```
上面例子中，`cat ~/.bash_profile`命令会输出`~/.bash_profile`文件的内容，然后通过遍历每一个词，计算该文件一共包含多少个词，以及每个词有多少个字符。

`in list`的部分可以省略，这时`list`默认等于脚本的所有参数`$@`。但是，为了可读性，最好还是不要省略。
```bash
for filename; do
  echo "$filename"
done

# 等同于
for filename in "$@" ; do
  echo "$filename"
done
```
在函数体中也是一样的，`for...in`循环省略`in list`的部分，则`list`默认等于函数的所有参数。
### for 循环
`for`循环还支持 C 语言的循环语法。
```bash
for (( expression1; expression2; expression3 )); do
  commands
done
```
上面代码中，`expression1`用来初始化循环条件，`expression2`用来决定循环结束的条件，`expression3`在每次循环迭代的末尾执行，用于更新值。

> 注意，循环条件放在双重圆括号之中。另外，圆括号之中使用变量，不必加上美元符号`$`。

它等同于下面的`while`循环。
```bash
(( expression1 ))
while (( expression2 )); do
  commands
  (( expression3 ))
done
```
下面是一个例子。
```bash
for (( i=0; i<5; i=i+1 )); do
  echo $i
done
```
`for`条件部分的三个语句，都可以省略。
```bash
for ((;;))
do
  read var
  if [ "$var" = "." ]; then
    break
  fi
done
```
上面脚本会反复读取命令行输入，直到用户输入了一个点（`.`）为止，才会跳出循环。
### break，continue
Bash 提供了两个内部命令`break`和`continue`，用来在循环内部跳出循环。

`break`命令立即终止循环，程序继续执行循环块之后的语句，即不再执行剩下的循环。
```bash
#!/bin/bash

for number in 1 2 3 4 5 6
do
  echo "number is $number"
  if [ "$number" = "3" ]; then
    break
  fi
done
```
`continue`命令立即终止本轮循环，开始执行下一轮循环。
```bash
#!/bin/bash

while read -p "What file do you want to test?" filename
do
  if [ ! -e "$filename" ]; then
    echo "The file does not exist."
    continue
  fi

  echo "You entered a valid file.."
done
```
上面例子中，只要用户输入的文件不存在，`continue`命令就会生效，直接进入下一轮循环（让用户重新输入文件名），不再执行后面的打印语句。
### select 结构
`select`结构主要用来生成简单的菜单。它的语法与`for...in`循环基本一致。
```bash
select name
[in list]
do
  commands
done
```
Bash 会对`select`依次进行下面的处理。
1. `select`生成一个菜单，内容是列表`list`的每一项，并且每一项前面还有一个数字编号。
2. Bash 提示用户选择一项，输入它的编号。
3. 用户输入以后，Bash 会将该项的内容存在变量`name`，该项的编号存入环境变量`REPLY`。如果用户没有输入，就按回车键，Bash 会重新输出菜单，让用户选择。
4. 执行命令体`commands`。
5. 执行结束后，回到第一步，重复这个过程。

```bash
#!/bin/bash
# select.sh

select brand in Samsung Sony iphone symphony Walton
do
  echo "You have chosen $brand"
done
```
执行上面的脚本，Bash 会输出一个品牌的列表，让用户选择。
```bash
$ ./select.sh
1) Samsung
2) Sony
3) iphone
4) symphony
5) Walton
#?
```
如果用户没有输入编号，直接按回车键。Bash 就会重新输出一遍这个菜单，直到用户按下`Ctrl + c`，退出执行。

`select`可以与`case`结合，针对不同项，执行不同的命令。
```bash
#!/bin/bash

echo "Which Operating System do you like?"

select os in Ubuntu LinuxMint Windows8 Windows10 WindowsXP
do
  case $os in
    "Ubuntu"|"LinuxMint")
      echo "I also use $os."
    ;;
    "Windows8" | "Windows10" | "WindowsXP")
      echo "Why don't you try Linux?"
    ;;
    *)
      echo "Invalid entry."
      break
    ;;
  esac
done
```
上面例子中，`case`针对用户选择的不同项，执行不同的命令。
