

## Windows安装Python
在 Windows 上安装 Python 和安装普通软件一样简单，下载安装包以后猛击“下一步”即可。

Python 安装包下载地址：`https://www.python.org/downloads/`

打开该链接，可以看到有两个版本的 Python，分别是 Python3.x 和 Python2.x：

![](1.png)

点击上图中的版本号或者`Download`按钮进入对应版本的下载页面，滚动到最后即可看到各个平台的 Python 安装包。

![](2.png)

点击`Windows installer (64-bit)`进行下载。双击下载得到的`exe`，就可以正式开始安装 Python 了。





## Linux（Ubuntu）系统安装Python
绝大多数的 Linux 发行版（Ubuntu、CentOS 等）都默认自带了 Python。有的 Linux 发行版甚至还会自带两个版本的 Python，例如最新版的 Ubuntu 会自带 Python2.x 和 Python3.x。

打开 Linux 发行版内置的终端，输入`python`命令就可以检测是否安装了 Python，以及安装了哪个版本：
```python
[root@localhost ~]# python
Python 2.7.16 (default, Jul  9 2020, 06:35:45) 
[GCC 7.3.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```
可以看到，`python`命令能够正常运行，并输出了 Python 的版本信息，这表明当前的 Linux 发行版已经自带了 Python2.7.16。

另外，执行结果最后出现了 Python 命令提示符`>>>`，这意味着我们进入了 Python 交互式编程环境，可以在这里直接输入代码并查看运行结果。
```python
[root@localhost ~]# python
Python 2.7.16 (default, Jul  9 2020, 06:35:45) 
[GCC 7.3.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> a=100
>>> b=4
>>> a*b
400
>>> exit()
```
`exit()`用来退出 Python 编程环境，回到 Linux 命令行。

大部分的 Linux 发行版会自带 Python2.x，但是不一定自带 Python3.x，要想检测当前 Linux 发行版是否安装了 Python3.x，可以在终端输入`python3`命令：
```python
[root@localhost ~]# python3
Python 3.7.4 (default, Mar 24 2020, 19:20:18) 
[GCC 8.3.1 20190507 (Red Hat 8.3.1-4)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```
如果`python3`命令运行成功，并出现 Python 提示符`>>>`，则表明当前 Linux 发行版已经安装了 Python3 开发环境，只需执行`python3`命令就可以启动 Python3 开发环境。

如果当前 Linux 发行版没有安装 Python3，或者你觉得现有的 Python3 版本不够新，那么就需要更新 Python 版本。
### 更新 Python 版本
在 Ubuntu 终端执行以下两条命令即可更新 Python 版本：
```shell
$apt-get update
$apt-get install python3.13
```
对命令的说明：
* 第一条命令用来指定更新`/etc/apt/sources.list`和`/etc/apt/sources.list.d`所列出的源地址，这样能够保证获得最新的安装包。
* 第二条命令用来指定安装 Python3.13。

等待以上两条命令执行完成，再次在终端输入`python3`命令，就可以看到 Python 交互式编程环境已经更新到 Python3.13。
### 重新安装 Python
在`Gzipped source tarball`处单击鼠标右键，从弹出菜单中选择“复制链接地址”，即可得到`.tgz`格式的源码压缩包地址。
```shell
wget https://www.python.org/ftp/python/3.13.1/Python-3.13.1.tgz
tar -zxvf Python-3.13.1.tgz
cd 
./configure --prefix=/usr/local
make&&make install
```
这里的`--prefix=/usr/local`用于指定安装目录（建议指定）。如果不指定，就会使用默认的安装目录。

经过以上几个命令，我们就安装好了 Python，这时就可以进入终端，输入 Python 指令，验证是否已安装成功。
### 小技巧
`python`命令默认调用的是 Python2.x 开发环境，如果你习惯使用 Python3.x，感觉每次输入`python3`命令有点麻烦，那么你可以修改配置，让`python`命令转而调用 Python3.x 开发环境。
```shell
$ unlink /usr/bin/python
$ ln -s /usr/bin/python3.13 /usr/bin/python
```
注意，第二条命令中 Python3.x 的路径和版本一定要正确。

上述命令执行完成以后，再次在终端输入`python`命令，进入的就是 Python3.13 的交互式开发环境了。
## 如何运行Python程序
Python 是一种解释型的脚本编程语言，这样的编程语言一般支持两种代码运行方式：
1. 交互式编程
   在命令行窗口中直接输入代码，按下回车键就可以运行代码，并立即看到输出结果；执行完一行代码，你还可以继续输入下一行代码，再次回车并查看结果……整个过程就好像我们在和计算机对话，所以称为交互式编程。
2. 编写源文件
   创建一个源文件，将所有代码放在源文件中，让解释器逐行读取并执行源文件中的代码，直到文件末尾，也就是批量执行代码。

### 交互式编程
在命令行工具或者终端窗口中输入`python`命令，看到`>>>`提示符就可以开始输入代码了。
```shell
PS C:\Users\ThinkPad> python
Python 3.8.6 (tags/v3.8.6:db45529, Sep 23 2020, 15:52:53) [MSC v.1927 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> a=100
>>> b=4
>>> a*b
400
>>> 
```
### 编写 Python 源文件
交互式编程只是用来玩玩而已，真正的项目开发还是需要编写源文件的。

Python 源文件是一种纯文本文件，内部没有任何特殊格式，你可以使用任何文本编辑器打开它。Python 源文件的后缀为`.py`。

Python3.x 已经将 UTF-8 作为默认的源文件编码格式。
### 运行源文件
在命令行工具或者终端中运行源文件。
```shell
python xxx.py
```
## Python3和Python2区别
Python 版本分为两大流派，一个是 Python2.x 版本，另外一个是 Python3.x 版本，Python 官方同时提供了对这两个版本的支持和维护。

2020 年 1 月 1 日，Python 官方终止了对 Python2.7 版本（最后一个 Python2.x 版本） 的支持，这意味着开发者不会在接收到任何来自 Python2.7 的错误修复或安全更新。自此 Python2 完全退休，Python3 时代正式来临。

尽管 Python2 已退出历史舞台 ，但国内外一些互联网公司仍在使用 Python2.7 开发程序，同时为了让大家更好地了解 Python3，我们非常有必要知道这两个版本间存在区别。

和 Python2.x 版本相比，Python3.x 版本在语句输出、编码、运算和异常等方面做出了一些调整。
### Python 3.x print()函数代替了print语句
在 Python2.x 中，输出数据使用的是`print`语句：
```shell
>>> print "3,4"
3,4
或者
>>> print(3,4)
(3,4)
```
但是在 Python3.x 中，`print`语句没有了，取而代之的是`print()`函数：
```shell
>>> print(3,4)
3 4
```
如果还像 Python2.x 中那样使用`print`语句，Python 编译器就会报错：
```shell
>>> print "3,4"
File "<stdin>", line 1
print "3,4"
^
SyntaxError: Missing parentheses in call to 'print'
```
### Python3.x 默认使用 UTF-8 编码
Python2.x 默认采用的 ASCII 编码，而 Python3.x 默认使用 UTF-8 编码，相比来说，UTF-8 编码可以很好地支持中文或其它非英文字符。

例如，输出一句中文，使用 Python2.x 和 Python3.x 的区别如下：
```shell
#Python 2.x
>>>str ="你好"
>>>str
'\xe4\xbd\xa0\xe5\xa5\xbd'

#Python 3.x
>>>str ="你好"
>>>str
'你好'
```
不仅如此，在 Python3.x 中，下面的代码也是合法的：
```shell
>>>中国="China"
>>>print(中国)
China
```
### Python 3.x 除法运算
Python 的除法运算包含 2 个运算符，分别是 / 和 //，这 2 个运算符在 Python2.x 和 Python3.x 的使用方法如下：
#### / 运算符
在 Python2.x 中，使用运算符`/`进行除法运算的方式和 Java、C 语言类似，整数相除的结果仍是一个整数，浮点数除法会保留小数点部分：
```shell
>>>1/2
0
>>>1.0/2
0.5
```
但是在 Python3.x 中使用`/`运算符，整数之间做除法运算，结果也会是浮点数。
```shell
>>>1/2
0.5
```
#### 运算符 //
使用运算符`//`进行的除法运算叫做`floor`除法（“地板除”），也就是输出不大于结果值的一个最大的整数（向下取整）。此运算符的用法在 Python2.x 和 Python3.x 中是一样的：
```shell
#Python 2.x
>>> -1//2
-1

#Python 3.x
>>> -1//2
-1
```
### Python 3.x 异常
* 在 Python3.x 版本中，异常处理改变的地方主要在以下几个方面：
* 在 Python2.x 版本中，所有类型的对象都是直接被抛出的，但是在 Python3.x 版本中，只有继承`BaseException`的对象才可以被抛出。
* 在 Python2.x 版本中，捕获异常的语法是`except Exception，var:`；但在 Python3.x 版本中，引入了`as`关键字，捕获异常的语法变更为`except Exception as var:`。
* 在 Python3.x 版本中，处理异常用`raise Exception(args)`代替了`raise Exception，args`。
* 在 Python3.x 版本中，取消了异常类的序列行为和`.message`属性。

```shell
#Python 2.x
>>> try:
...  raise TypeError,"类型错误"
... except TypeError,err:
...  print err.message
...
类型错误

#Python 3.x
>>> try:
...     raise TypeError("类型错误")
... except TypeError as err:
...     print(err)
...
类型错误
```
### Python 3.x 八进制字面量表示
在 Python3.x 中，表示八进制字面量的方式只有一种，并且必须写成“0o1000”这样的方式，原来“01000”的方式不能使用了。
```shell
#Python 2.x
>>> 0o1000
512
>>> 01000
512

#Python 3.x
>>> 01000
  File "<stdin>", line 1
    01000
        ^
SyntaxError: invalid token
>>> 0o1000
512
```
### Python 3.x 不等于运算符
Python2.x 中的不等于运算符有 2 种写法，分别为`!=`和`<>`，但在 Python3.x 中去掉了 `<>`，只有`!=`这一种写法：
```shell
#Python 2.x
>>> 1!=2
True
>>> 1<>2
True

#Python 3.x
>>> 1!=2
True
>>> 1<>2
  File "<stdin>", line 1
    1<>2
      ^
SyntaxError: invalid syntax
```
### Python 3.x 输入差异
Python2.x 中提供两种类型输入函数，分别是`input()`和`raw_input()`，前者默认返回的`int`（整数类型） 类型，而后者总是返回`str`（字符串类型）；Python3.x 中只提供了一个输入函数`input()`，该函数的使用方法与`raw_input()`相似，总是返回`str`类型。
```shell
# Python 2.x
a=input("请输出：")
请输出：123
>>> type(a)
<type 'int'>
b=input("请输入")
请输出："C语言中文网"
>>> type(b)
<type 'str'>

c=raw_input("请输入：")
请输入：123
>>>type(c)
<type 'str'>


# Python3.x
>>> d=input("请输入：")
请输入：123
>>> d
'123'
>>> type(d)
<class 'str'>
```
### Python 3.x 数据类型
Python3.x 中对数据类型也做了改动，比如说：
Python3.x 去除了`long`类型，现在只有一种整形`int`，但它的行为就像是 Python2.x 版本中的`long`。

Python3.x 新增了`bytes`类型，对应 Python2.x 版本的八位串，定义`bytes`字面量的方法如下所示：
```shell
>>>b=b'China'
>>>type(b)
<type 'bytes'>
```
字符串对象和 `bytes` 对象可以使用`.encode()`或者`.decode()`方法相互转化：
```shell
>>>s=b.decode()
>>>s
'China'
>>>b1=s.encode()
>>>b1
b'China'
```
Python3.x 中，字典的`keys()、items()`和`values()`方法用返回迭代器，且之前的`iterkeys()`等函数都被废弃，同时去掉的还有`dict.has_key()`，改为用`in`替代。
## 2to3：自动将Python2.x代码转换成Python3.x代码
Python3 和 Python2 不兼容，导致大多数 Python2.x 程序都无法在 Python3.x 环境中运行。针对这一问题，Python 官方提供了一个将 Python2.x 代码自动转换为 Python3.x 代码的小工具，起名为 2to3，可以将绝大部分的 Python2.x 代码自动转换成 Python3.x 代码。

在 Windows 环境中，2to3 工具位于 Python 的安装包内，是一个后缀名为`.py`的源程序文件；在 Linux 环境中，2to3 工具通常需要单独安装。
### Windows环境下的转换
在 Python 安装路径下的`Tools\scripts`文件夹里，可以找到`2to3.py`文件。

将`2to3.py`文件复制到 Python2.x 程序所在的文件夹里。

执行如下指令，就可以将`demo.py`文件中的 Python2.x 代码转换为符合 Python3.x 语法要求的代码。
```shell
python 2to3.py -w demo.py
```
执行完后，文件夹中会生成一个`demo.py`文件的备份文件，名称为`demo.py.bak`，里边存储的是 Python2.x 版本的程序。同时，原`demo.py`文件的代码就转换成了符合 Python3.x 语法要求的代码。

  注意，在使用`2to3.py`转换 python2.x 代码前，尽量不要把要转换的代码保存在 C 盘中，因此如果保存在 C 盘，可能会因权限问题导致转换不能正常完成。
### Linux 环境下的转换
Linux 环境中，`2to3`工具通常不位于 Python 安装包里，需要单独安装。

以 Ubuntu 系统为例，打开命令行窗口，输入`2to3 -h`命令：
```shell
[root@localhost ~]# 2to3 -h
Usage: 2to3 [options] file|dir ...

Options:
  -h, --help            show this help message and exit
  -d, --doctests_only   Fix up doctests only
  -f FIX, --fix=FIX     Each FIX specifies a transformation; default: all
  -j PROCESSES, --processes=PROCESSES
                        Run 2to3 concurrently
  -x NOFIX, --nofix=NOFIX
                        Prevent a transformation from being run
  -l, --list-fixes      List available transformations
  -p, --print-function  Modify the grammar so that print() is a function
  -v, --verbose         More verbose logging
  --no-diffs            Don't show diffs of the refactoring
  -w, --write           Write back modified files
  -n, --nobackups       Don't write backups for modified files
  -o OUTPUT_DIR, --output-dir=OUTPUT_DIR
                        Put output files in this directory instead of
                        overwriting the input files.  Requires -n.
  -W, --write-unchanged-files
                        Also write files even if no changes were required
                        (useful with --output-dir); implies -w.
  --add-suffix=ADD_SUFFIX
                        Append this string to all output filenames. Requires
                        -n if non-empty.  ex: --add-suffix='3' will generate
                        .py3 files.
[root@localhost ~]# 
```
出现以上信息，证明当前环境已经安装了 `2to3` 工具，否则就需要手动安装。

安装 2to3 的方法很简单，执行`apt install 2to3`命令。

假设 Python 2.x 代码存储在`/home/cyuyan/demo.py`文件中，依次执行如下命令：
```shell
$ cd /home/cyuyan/
$ 2to3 -w demo.py
```
执行完成后，在`/home/cyuyan/`目录下也会生成一个名为`demo.py.bak`的备份文件，`demo.py`文件中就变成了符合 Python3.x 语法要求的程序。
## 注释
Python 支持两种类型的注释，分别是单行注释和多行注释。
### 单行注释
Python 使用井号`#`作为单行注释的符号：
```python
# 注释内容
```
从井号`#`开始，直到这行结束为止的所有内容都是注释。Python 解释器遇到`#`时，会忽略它后面的整行内容。

说明多行代码的功能时一般将注释放在代码的上一行：
```python
#使用 print输出数字
print(100)
print( 3 + 100 * 2)
print( (3 + 100) * 2)
```
说明单行代码的功能时一般将注释放在代码的右侧：
```python
print( 36.7 * 14.5 )  #输出乘积
print( 100 % 7 )  #输出余数
```
### 多行注释
多行注释指的是一次性注释程序中多行的内容（包含一行）。

Python 使用三个连续的单引号`'''`或者三个连续的双引号`"""`注释多行内容：
```python
'''
使用 3 个单引号分别作为注释的开头和结尾
可以一次性注释多行内容
这里面的内容全部是注释内容
'''
或者
"""
使用 3 个双引号分别作为注释的开头和结尾
可以一次性注释多行内容
这里面的内容全部是注释内容
"""
```
多行注释通常用来为 Python 文件、模块、类或者函数等添加版权或者功能描述信息。
#### 注意事项
Python 多行注释不支持嵌套，所以下面的写法是错误的：
```python
'''
外层注释
    '''
    内层注释
    '''
'''
```
不管是多行注释还是单行注释，当注释符作为字符串的一部分出现时，就不能再将它们视为注释标记，而应该看做正常代码的一部分：
```python
print('''Hello,World!''')
print("#是单行注释的开始")
```
运行结果：
```
Hello,World!
#是单行注释的开始
```
## 缩进规则
和其它程序设计语言采用大括号`{}`分隔代码块不同，Python 采用代码缩进和冒号（`:`）来区分代码块之间的层次。

在 Python 中，对于类定义、函数定义、流程控制语句、异常处理语句等，行尾的冒号和下一行的缩进，表示下一个代码块的开始，而缩进的结束则表示此代码块的结束。

注意，Python 中实现对代码的缩进，可以使用空格或者 Tab 键实现。但无论是手动敲空格，还是使用 Tab 键，通常情况下都是采用 4 个空格长度作为一个缩进量（默认情况下，一个 Tab 键就表示 4 个空格）。
```python
height=float(input("输入身高：")) #输入身高
weight=float(input("输入体重：")) #输入体重
bmi=weight/(height*height)       #计算BMI指数
#判断身材是否合理
if bmi<18.5:
    #下面 2 行同属于 if 分支语句中包含的代码，因此属于同一作用域
    print("BMI指数为："+str(bmi)) #输出BMI指数
    print("体重过轻")
if bmi>=18.5 and bmi<24.9:
    print("BMI指数为："+str(bmi)) #输出BMI指数
    print("正常范围，注意保持")
if bmi>=24.9 and bmi<29.9:
    print("BMI指数为："+str(bmi)) #输出BMI指数
    print("体重过重")
if bmi>=29.9:
    print(BMI指数为："+str(bmi)) #输出BMI指数
    print("肥胖")
```
Python 对代码的缩进要求非常严格，同一个级别代码块的缩进量必须一样，否则解释器会报`SyntaxError`异常错误。例如，对上面代码做错误改动，将位于同一作用域中的 2 行代码，它们的缩进量分别设置为 4 个空格和 3 个空格：
```python
if bmi<18.5:
    print("BMI指数为："+str(bmi)) #输出BMI指数
   print("体重过轻")
```
可以看到，第二行代码和第三航代码本来属于同一作用域，但我们手动修改了各自的缩进量，这会导致`SyntaxError`异常错误。
## 标识符命名规范
Python 中标识符的命名不是随意的，而是要遵守一定的命令规则，比如说：
1. 标识符是由字符（`A~Z`和`a~z`）、下划线和数字组成，但第一个字符不能是数字。
2. 标识符不能和 Python 中的保留字相同。
3. Python 中的标识符中，不能包含空格、`@、%`以及`$`等特殊字符。
4. 标识符中的字母是严格区分大小写的，也就是说，两个同样的单词，如果大小格式不一样，多代表的意义也是完全不同的。
5. Python 语言中，以下划线开头的标识符有特殊含义，例如:
 * 以单下划线开头的标识符（如`_width`），表示不能直接访问的类属性，其无法通过`from...import*`的方式导入；
 * 以双下划线开头的标识符（如`__add`）表示类的私有成员；
 * 以双下划线作为开头和结尾的标识符（如`__init__`），是专用标识符。
  因此，除非特定场景需要，应避免使用以下划线开头的标识符。

另外需要注意的是，Python 允许使用汉字作为标识符，但我们应尽量避免使用汉字作为标识符，这会避免遇到很多奇葩的错误。

标识符的命名，除了要遵守以上这几条规则外，不同场景中的标识符，其名称也有一定的规范可循，例如：
* 当标识符用作模块名时，应尽量短小，并且全部使用小写字母，可以使用下划线分割多个字母，例如`game_mian、game_register`等。
* 当标识符用作包的名称时，应尽量短小，也全部使用小写字母，不推荐使用下划线，例如`com.mr、com.mr.book`等。
* 当标识符用作类名时，应采用单词首字母大写的形式。例如，定义一个图书类，可以命名为`Book`。
* 模块内部的类名，可以采用 "下划线+首字母大写" 的形式，如`_Book`;
* 函数名、类中的属性名和方法名，应全部使用小写字母，多个单词之间可以用下划线分割；
* 常量命名应全部使用大写字母，单词之间可以用下划线分割；

## 关键字（保留字）
Python 包含的保留字可以执行如下命令进行查看：
```python
>>> import keyword
>>> keyword.kwlist
['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```
所有的保留字，如下表所示：

|          |        |        |        |         |          |        |
|----------|--------|--------|--------|---------|----------|--------|
| and      | as     | assert | break  | class   | continue | def    |
| del      | elif   | else   | except | finally | for      | from   |
| False    | global | if     | import | in      | is       | lambda |
| nonlocal | not    | None   | or     | pass    | raise    | return |
| try      | True   | while  | with   | yield   |          |        |

需要注意的是，由于 Python 是严格区分大小写的，保留字也不例外。所以，我们可以说`if`是保留字，但`IF`就不是保留字。

在实际开发中，如果使用 Python 中的保留字作为标识符，则解释器会提示`invalid syntax`的错误信息。
## 内置函数
Python 解释器自带的函数叫做内置函数，这些函数可以直接使用，不需要导入某个模块。

内置函数和标准库函数是不一样的。

Python 解释器也是一个程序，它给用户提供了一些常用功能，并给它们起了独一无二的名字，这些常用功能就是内置函数。Python 解释器启动以后，内置函数也生效了，可以直接拿来使用。

Python 标准库相当于解释器的外部扩展，它并不会随着解释器的启动而启动，要想使用这些外部扩展，必须提前导入。Python 标准库非常庞大，包含了很多模块，要想使用某个函数，必须提前导入对应的模块，否则函数是无效的。

内置函数是解释器的一部分，它随着解释器的启动而生效；标准库函数是解释器的外部扩展，导入模块以后才能生效。一般来说，内置函数的执行效率要高于标准库函数。

Python 解释器一旦启动，所有的内置函数都生效了；而导入标准库的某个模块，只是该模块下的函数生效，并不是所有的标准库函数都生效。

内置函数的数量必须被严格控制，否则 Python 解释器会变得庞大和臃肿。一般来说，只有那些使用频繁或者和语言本身绑定比较紧密的函数，才会被提升为内置函数。

例如，在屏幕上输出文本就是使用最频繁的功能之一，所以`print()`是 Python 的内置函数。

在 Python2.x 中，`print`是一个关键字；到了 Python3.x 中，`print`变成了内置函数。

除了`print()`函数，Python 解释器还提供了更多内置函数，下表列出了 Python3.x 中的所有内置函数。

|             |              |              |                |              |           |               |
|-------------|--------------|--------------|----------------|--------------|-----------|---------------|
| abs()       | delattr()    | hash()       | memoryview()   | set()        | all()     | dict()        |
| help()      | min()        | setattr()    | any()          | dir()        | hex()     | next()        |
| slicea()    | ascii()      | divmod()     | id()           | object()     | sorted()  | bin()         |
| enumerate() | input()      | oct()        | staticmethod() | bool()       | eval()    | int()         |
| open()      | str()        | breakpoint() | exec()         | isinstance() | ord()     | sum()         |
| bytearray() | filter()     | issubclass() | pow()          | super()      | bytes()   | float()       |
| iter()      | print()      | tuple()      | callable()     | format()     | len()     | property()    |
| type()      | chr()        | frozenset()  | list()         | range()      | vars()    | classmethod() |
| getattr()   | locals()     | repr()       | zip()          | compile()    | globals() | map()         |
| reversed()  | __import__() | complex()    | hasattr()      | max()        | round()   |               |

各个内置函数的具体功能和用法，可通过访问`https://docs.python.org/zh-cn/3/library/functions.html`进行查看。

注意，不要使用内置函数的名字作为标识符使用（例如变量名、函数名、类名、模板名、对象名等），虽然这样做 Python 解释器不会报错，但这会导致同名的内置函数被覆盖，从而无法使用。
```python
>>> print = "zhangsan"  #将print作为变量名
>>> print("Hello World!")  #print函数被覆盖，失效
Traceback (most recent call last):
File "<pyshell#1>", line 1, in <module>
print("Hello World!")
TypeError: 'str' object is not callable
```
