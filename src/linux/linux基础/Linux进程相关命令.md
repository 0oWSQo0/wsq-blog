---
title: Linux进程相关命令
date: 2024-03-20
tags: linux基础
categories: linux
order: 10
---


## 进程启动的方式
在 Linux 系统中，每个进程都有一个唯一的进程号（PID），方便系统识别和调度进程。

启动一个进程主要有 2 种途径，分别是通过手工启动和通过调度启动（事先进行设置，根据用户要求，进程可以自行启动）。
### 手工启动进程
手工启动进程指的是由用户输入命令直接启动一个进程，根据所启动的进程类型和性质的不同，其又可以细分为前台启动和后台启动 2 种方式。
#### 前台启动进程
这是手工启动进程最常用的方式，因为当用户输入一个命令并运行，就已经启动了一个进程，而且是一个前台的进程，此时系统其实已经处于一个多进程的状态（一个是 Shell 进程，另一个是新启动的进程）。

假如启动一个比较耗时的进程，然后再把该进程挂起，并使用`ps`命令查看，就会看到该进程在`ps`显示列表中，例如：
```bash
[root@localhost ~]# find / -name demo.jpg  # 在根目录下查找 demo.jpg 文件，比较耗时
# 此处省略了该命令的部分输出信息
# 按“CTRL+Z”组合键，即可将该进程挂起
[root@localhost ~]# ps  # 查看正在运行的进程
PID  TTY      TIME   CMD
2573 pts/0  00:00:00 bash
2587 pts/0  00:00:01 find
2588 pts/0  00:00:00 ps
```
将进程挂起，指的是将前台运行的进程放到后台，并且暂停其运行。

通过运行`ps`命令查看进程信息，可以看到，刚刚执行的`find`命令的进程号为 2587，同时`ps`进程的进程号为 2588。
#### 后台启动进程
进程直接从后台运行。从后台启动进程，其实就是在命令结尾处添加一个` &`符号（注意，`&`前面有空格）。输入命令并运行之后，Shell 会提供给我们一个数字，此数字就是该进程的进程号。然后直接就会出现提示符，用户就可以继续完成其他工作：
```bash
[root@localhost ~]# find / -name install.log &
[1] 1920
# [1]是工作号，1920是进程号
```
手工启动进程的 2 种方式有个共同的特点，就是新进程都是由当前 Shell 这个进程产生的，换句话说，是 Shell 创建了新进程，于是称这种关系为进程间的父子关系，其中 Shell 是父进程，新进程是子进程。

一个父进程可以有多个子进程，通常子进程结束后才能继续父进程；当然，如果是从后台启动，父进程就不用等待子进程了。
### Linux调度启动进程
任务可以被配置在指定的时间、日期或者系统平均负载量低于指定值时自动启动。

例如，Linux 预配置了重要系统任务的运行，以便可以使系统能够实时被更新，系统管理员也可以使用自动化的任务来定期对重要数据进行备份。

实现调度启动进程的方法有很多，例如通过`crontab、at`等命令。
## ps：查看正在运行的进程
`ps`命令可以查看系统中所有运行进程的详细信息。
```shell
ps [选项]
```

| 选项 | 说明                 |
|:--:|:-------------------|
| a  | 显示一个终端的所有进程，除会话引线外 |
| u  | 显示进程的归属用户及内存的使用情况  |
| x  | 显示没有控制终端的进程        |
| -l | 长格式显示更加详细的信息       |
| -e | 显示所有进程             |
| -f | 显示所有列              |

可以看到，`ps`命令有些与众不同，它的部分选项不能加入`-`，比如命令`ps aux`，其中`aux`是选项，但是前面不能带`-`。

大家如果执行`man ps`命令，则会发现`ps`命令的帮助为了适应不同的类 UNIX 系统，可用格式非常多，不方便记忆。所以，记忆几个固定选项即可：
* `ps aux`可以查看系统中所有的进程
* `ps -le`可以查看系统中所有的进程，而且还能看到进程的父进程的 PID 和进程优先级
* `ps -l`只能看到当前 Shell 产生的进程
* `ps -ef`显示所有进程包括所有列

有这 4 个命令就足够了。
```bash
[root@localhost ~]# ps aux
#查看系统中所有的进程
USER PID %CPU %MEM  VSZ  RSS   TTY STAT START TIME COMMAND
root   1  0.0  0.2 2872 1416   ?   Ss   Jun04 0:02 /sbin/init
root   2  0.0  0.0    0    0   ?    S   Jun04 0:00 [kthreadd]
root   3  0.0  0.0    0    0   ?    S   Jun04 0:00 [migration/0]
root   4  0.0  0.0    0    0   ?    S   Jun04 0:00 [ksoftirqd/0]
…省略部分输出…
```
`ps`命令输出信息含义：

|   表头    | 含义                                                                                                                                     |
|:-------:|:---------------------------------------------------------------------------------------------------------------------------------------|
|  USER   | 该进程是由哪个用户产生的                                                                                                                           |
|   PID   | 进程的 ID                                                                                                                                 |
|  %CPU   | 该进程占用 CPU 资源的百分比，占用的百分比越高，进程越耗费资源                                                                                                      |
|  %MEM   | 该进程占用物理内存的百分比，占用的百分比越高，进程越耗费资源                                                                                                         |
|   VSZ   | 该进程占用虚拟内存的大小，单位为 KB                                                                                                                    |
|   RSS   | 该进程占用实际物理内存的大小，单位为 KB                                                                                                                  |
|   TTY   | 该进程是在哪个终端运行的。tty1~tty7 代表本地控制台终端，tty1~tty6 是本地的字符界面终端，tty7 是图形终端。pts/0~255 代表虚拟终端，一般是远程连接的终端，第一个远程连接占用 pts/0，第二个远程连接占用 pts/1，依次増长。     |
|  STAT   | 进程状态。常见的状态：<br>-D：不可被唤醒的睡眠状态，通常用于 I/O 情况<br>-R：该进程正在运行<br>-S：该进程处于睡眠状态，可被唤醒<br>-T：停止状态，可能是在后台暂停或进程处于除错状态<br>-Z：僵尸进程。进程已经中止，但是部分程序还在内存当中<br>-<：高优先级<br>-N：低优先级<br>-L：被锁入内存<br>-s：包含子进程<br>-l：多线程（小写 L）<br>-+：位于后台 |
|  START  | 该进程的启动时间                                                                                                                               |
|  TIME   | 该进程占用 CPU 的运算时间，注意不是系统时间                                                                                                               |
| COMMAND | 产生此进程的命令名                                                                                                                              |

`ps aux`命令可以看到系统中所有的进程，`ps -le`命令也能看到系统中所有的进程。由于`-l`选项的作用，所以`ps -le`命令能够看到更加详细的信息，比如父进程的 PID、优先级等。但是这两个命令的基本作用是一致的，掌握其中一个就足够了。
```bash
[root@localhost ~]# ps -le
F S UID PID PPID C  PRI Nl ADDR  SZ WCHAN TTY      TIME  CMD
4 S   0   1    0 0  80   0 -    718 -     ?    00:00:02  init
1 S   0   2    0 0  80   0 -      0 -     ?    00:00:00  kthreadd
1 S   0   3    2 0 -40   - -      0 -     ?    00:00:00  migration/0
1 S   0   4    2 0  80   0 -      0 -     ?    00:00:00  ksoflirqd/0
1 S   0   5    2 0 -40   - -      0 -     ?    00:00:00  migration/0
…省略部分输出…
```
`ps -le`命令输出信息中各列的含义：

|  表头   | 含义                                                           |
|:-----:|:-------------------------------------------------------------|
|  F    | 进程标志，说明进程的权限，常见的标志有两个:<br>1：进程可以被复制，但是不能被执行；<br>4：进程使用超级用户权限 |
|   S   | 进程状态。具体的状态和"psaux"命令中的 STAT 状态一致                             |
|  UID  | 运行此进程的用户的 ID                                                 |
|  PID  | 进程的 ID                                                       |
| PPID  | 父进程的 ID                                                      |
|   C   | 该进程的 CPU 使用率，单位是百分比                                          |
|  PRI  | 进程的优先级，数值越小，该进程的优先级越高，越早被 CPU 执行                             |
|  NI   | 进程的优先级，数值越小，该进程越早被执行                                         |
| ADDR  | 该进程在内存的哪个位置                                                  |
|  SZ   | 该进程占用多大内存                                                    |
| WCHAN | 该进程是否运行。"-"代表正在运行                                            |
|  TTY  | 该进程由哪个终端产生                                                   |
| TIME  | 该进程占用 CPU 的运算时间，注意不是系统时间                                     |
|  CMD  | 产生此进程的命令名                                                    |

如果不想看到所有的进程，只想查看一下当前登录产生了哪些进程，那只需使用`ps`命令：
```bash
[root@localhost ~]# ps
#查看当前登录产生的进程
F S UID   PID  PPID C PRI NI ADDR SZ WCHAN TTY       TIME CMD
4 S 0   18618 18614 0  80  0 - 1681  -     pts/1 00:00:00 bash
4 R 0   18683 18618 4  80  0 - 1619  -     pts/1 00:00:00 ps
```
可以看到，这次从`pts/1`虚拟终端登录，只产生了两个进程：一个是登录之后生成的 Shell，也就是`bash`；另一个是正在执行的`ps`命令。

查看占用CPU资源最多的10个进程：
```shell
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head
```
占用内存资源最多的10个进程：
```shell
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head
```

## top：持续监听进程运行状态
`ps`命令可以一次性给出当前系统中进程状态，但使用此方式得到的信息缺乏时效性，并且，如果管理员需要实时监控进程运行情况，就必须不停地执行`ps`命令，这显然是缺乏效率的。

为此，Linux 提供了`top`命令。`top`命令可以动态地持续监听进程地运行状态，与此同时，该命令还提供了一个交互界面，用户可以根据需要，人性化地定制自己的输出，进而更清楚地了进程的运行状态。
```
top [选项]
```
| 选项       | 含义 |
| :--: | :-- |
| -d 秒数    | 指定 top 命令每隔几秒更新。默认是 3 秒； |
| -b         | 使用批处理模式输出。一般和"-n"选项合用，用于把 top 命令重定向到文件中； |
| -n 次数    | 指定 top 命令执行的次数。一般和"-"选项合用； |
| -p 进程PID | 仅查看指定 ID 的进程； |
| -s         | 使 top 命令在安全模式中运行，避免在交互模式中出现错误； |
| -u 用户名  | 只监听某个用户的进程； |

在`top`命令的显示窗口中，还可以使用如下按键，进行一下交互操作：
* `?`或`h`：显示交互模式的帮助；
* `P`：按照 CPU 的使用率排序，默认就是此选项；
* `M`：按照内存的使用率排序；
* `N`：按照 PID 排序；
* `T`：按照 CPU 的累积运算时间排序，也就是按照 TIME+ 项排序；
* `k`：按照 PID 给予某个进程一个信号。一般用于中止某个进程，信号 9 是强制中止的信号；
* `r`：按照 PID 给某个进程重设优先级值；
* `q`：退出`top`命令；

```bash
[root@localhost ~]# top
top - 12:26:46 up 1 day, 13:32, 2 users, load average: 0.00, 0.00, 0.00
Tasks: 95 total, 1 running, 94 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.1%us, 0.1%sy, 0.0%ni, 99.7%id, 0.1%wa, 0.0%hi, 0.1%si, 0.0%st
Mem: 625344k total, 571504k used, 53840k free, 65800k buffers
Swap: 524280k total, 0k used, 524280k free, 409280k cached
PID   USER PR NI VIRT  RES  SHR S %CPU %MEM   TIME+ COMMAND
19002 root 20  0 2656 1068  856 R  0.3  0.2 0:01.87 top
1     root 20  0 2872 1416 1200 S  0.0  0.2 0:02.55 init
2     root 20  0    0    0    0 S  0.0  0.0 0:00.03 kthreadd
3     root RT  0    0    0    0 S  0.0  0.0 0:00.00 migration/0
4     root 20  0    0    0    0 S  0.0  0.0 0:00.15 ksoftirqd/0
5     root RT  0    0    0    0 S  0.0  0.0 0:00.00 migration/0
6     root RT  0    0    0    0 S  0.0  0.0 0:10.01 watchdog/0
7     root 20  0    0    0    0 S  0.0  0.0 0:05.01 events/0
8     root 20  0    0    0    0 S  0.0  0.0 0:00.00 cgroup
9     root 20  0    0    0    0 S  0.0  0.0 0:00.00 khelper
10    root 20  0    0    0    0 S  0.0  0.0 0:00.00 netns
11    root 20  0    0    0    0 S  0.0  0.0 0:00.00 async/mgr
12    root 20  0    0    0    0 S  0.0  0.0 0:00.00 pm
13    root 20  0    0    0    0 S  0.0  0.0 0:01.70 sync_supers
14    root 20  0    0    0    0 S  0.0  0.0 0:00.63 bdi-default
15    root 20  0    0    0    0 S  0.0  0.0 0:00.00 kintegrityd/0
16    root 20  0    0    0    0 S  0.0  0.0 0:02.52 kblockd/0
17    root 20  0    0    0    0 S  0.0  0.0 0:00.00 kacpid
18    root 20  0    0    0    0 S  0.0  0.0 0:00.00 kacpi_notify
```
`top`命令的输出内容是动态的，默认每隔 3 秒刷新一次。命令的输出主要分为两部分：
* 第一部分是前五行，显示的是整个系统的资源使用状况，我们就是通过这些输出来判断服务器的资源使用状态的；
* 第二部分从第六行开始，显示的是系统中进程的信息；

我们先来说明第一部分的作用。
第一行为任务队列信息：
| 内 容           | 说 明 |
| :--: | :-- |
| 12:26:46        | 系统当前时间 |
| up 1 day, 13:32 | 系统的运行时间.本机己经运行 1 天 13 小时 32 分钟 |
| 2 users         | 当前登录了两个用户 |
| load average: 0.00,0.00, 0.00    | 系统在之前 1 分钟、5 分钟、15 分钟的平均负载。如果 CPU 是单核的，则这个数值超过 1 就是高负载：如果 CPU 是四核的，则这个数值超过 4 就是高负载 （这个平均负载完全是依据个人经验来进行判断的，一般认为不应该超过服务器 CPU 的核数）|

第二行为进程信息。
| 内 容           | 说 明 |
| :--: | :-- |
| Tasks: 95 total | 系统中的进程总数 |
| 1 running       | 正在运行的进程数 |
| 94 sleeping     | 睡眠的进程数 |
| 0 stopped       | 正在停止的进程数 |
| 0 zombie        | 僵尸进程数。如果不是 0，则需要手工检查僵尸进程 |

第三行为 CPU 信息。
| 内 容           | 说 明 |
| :--: | :-- |
| Cpu(s): 0.1 %us | 用户模式占用的 CPU 百分比 |
| 0.1%sy          | 系统模式占用的 CPU 百分比 |
| 0.0%ni          | 改变过优先级的用户进程占用的 CPU 百分比 |
| 99.7%id         | 空闲 CPU 占用的 CPU 百分比 |
| 0.1%wa          | 等待输入/输出的进程占用的 CPU 百分比 |
| 0.0%hi          | 硬中断请求服务占用的 CPU 百分比 |
| 0.1%si          | 软中断请求服务占用的 CPU 百分比 |
| 0.0%st          | st（steal time）意为虚拟时间百分比，就是当有虚拟机时，虚拟 CPU 等待实际 CPU 的时间百分比 |

第四行为物理内存信息。
| 内 容               | 说 明 |
| :--: | :-- |
| Mem: 625344k total  | 物理内存的总量，单位为KB |
| 571504k used        | 己经使用的物理内存数量 |
| 53840k free         | 空闲的物理内存数量。我们使用的是虚拟机，共分配了 628MB内存，所以只有53MB的空闲内存 |
| 65800k buffers      | 作为缓冲的内存数量 |

第五行为交换分区（`swap`）信息。
| 内 容               | 说 明 |
| :--: | :-- |
| Swap: 524280k total	| 交换分区（虚拟内存）的总大小 |
| 0k used             | 已经使用的交换分区的大小 |
| 524280k free        | 空闲交换分区的大小 |
| 409280k cached      | 作为缓存的交换分区的大小 |

我们通过`top `命令的第一部分就可以判断服务器的健康状态。如果 1 分钟、5 分钟、15 分钟的平均负载高于 1，则证明系统压力较大。如果 CPU 的使用率过高或空闲率过低，则证明系统压力较大。如果物理内存的空闲内存过小，则也证明系统压力较大。

这时，我们就应该判断是什么进程占用了系统资源。如果是不必要的进程，就应该结束这些进程；如果是必需进程，那么我们该増加服务器资源（比如増加虚拟机内存），或者建立集群服务器。

我们还要解释一下缓冲（`buffer`）和缓存（`cache`）的区别：
* 缓存（`cache`）是在读取硬盘中的数据时，把最常用的数据保存在内存的缓存区中，再次读取该数据时，就不去硬盘中读取了，而在缓存中读取。
* 缓冲（`buffer`）是在向硬盘写入数据时，先把数据放入缓冲区,然后再一起向硬盘写入，把分散的写操作集中进行，减少磁盘碎片和硬盘的反复寻道，从而提高系统性能。

简单来说，缓存（`cache`）是用来加速数据从硬盘中"读取"的，而缓冲（`buffer`）是用来加速数据"写入"硬盘的。

再来看`top`命令的第二部分输出，主要是系统进程信息，各个字段的含义如下：

| 字段    | 含义 |
| :--: | :-- |
| PID     | 进程的 ID。 |
| USER    | 该进程所属的用户。 |
| PR      | 优先级，数值越小优先级越高。 |
| NI      | 优先级，数值越小、优先级越高。 |
| VIRT    | 该进程使用的虚拟内存的大小，单位为 KB。 |
| RES     | 该进程使用的物理内存的大小，单位为 KB。 |
| SHR     | 共享内存大小，单位为 KB。 |
| S       | 进程状态。 |
| %CPU    | 该进程占用 CPU 的百分比。 |
| %MEM    | 该进程占用内存的百分比。 |
| TIME+   | 该进程共占用的 CPU 时间。 |
| COMMAND | 进程的命令名。 |

这部分和`ps`命令的输出比较类似，只是如果在终端执行`top`命令，则不能看到所有的进程，而只能看到占比靠前的进程。

如果只想让`top`命令查看某个进程，就可以使用 "-p 选项"。
```bash
[root@localhost ~]# top -p 15273
#只查看 PID为 15273的apache进程
top - 14:28:47 up 1 day, 15:34, 3 users, load average: 0.00,0.00,0.00
Tasks: 1 total, 0 running, 1 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.0%us, 0.0%sy, 0.0%ni,100.0%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 625344k total, 574124k used, 51220k free, 67024k buffers
Swap: 524280k total, Ok used, 524280k free, 409344k cached
PID     USER PR NI VIRT  RES SHR S %CPU %MEM  TIME+  COMMAND
15273 daemon 20 0  4520 1192 580 S  0.0  0.2 0:00.00   httpd
```
`top`命令如果不正确退出，则会持续运行。在`top`命令的交互界面中按`q`键会退出`top`命令；也可以按`?`或`h`键得到`top`命令交互界面的帮助信息；还可以按键中止某个进程。
```bash
[root@localhost ~]# top
top - 14:10:15 up 1 day, 15:15， 3 users, load average: 0.00，0.00, 0.00
Tasks: 97 total, 1 running, 96 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.0%us, 0.0%sy, 0.0%ni,100.0%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 625344k total, 574248k used, 51096k free, 66840k buffers
Swap: 524280k total, Ok used, 524280k free, 409324k cached
PID to kill:15273
#按"k"键，会提示输入要杀死进程的PID
PID     USER PR NI VIRT  RES SHR S %CPU %MEM   TIME+ COMMAND
15273 daemon 20  0 4520 1192 580 S  0.0 0.2  0:00.00 httpd
..省略部分输出...
```
输入要中止进程的 PID，比如要中止 15273 这个`apache`进程：
```bash
top - 14:11:42 up 1 day, 15:17， 3 users, load average: 0.00，0.00, 0.00
Tasks: 97 total, 1 running, 96 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.0%us, 0.3%sy, 0.0%ni, 99.7%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 625344k total, 574248k used, 51096k free, 66856k buffers
Swap: 524280k total, 0k used, 524280k free, 409324k cached
Kill PID 15273 with signal [15]:9
#提示输入信号，信号9代表强制中止
PID     USER PR NI VIRT  RES SHR S %CPU %MEM   TIME+ COMMAND
15273 daemon 20  0 4520 1192 580 S 0.0   0.2 0:00.00 httpd
…省略部分输出…
```
接下来`top`命令提示我们输入信号，信号 9 代表强制中止，这时就能够强制中止 15273 进程了。

如果要改变某个进程的优先级，就要利用`r`交互命令。需要注意的是，我们能够修改的只有`Nice`的优先级，而不能修改`Priority`的优先级。具体修改命令如下：
```bash
[root@localhost ~]# top -p 18977
top - 14:17:09 up 1 day, 15:22, 3 users, load average: 0.00，0.00, 0.00
Tasks: 97 total, 1 running, 96 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.3%us, 0.0%sy, 0.0%ni, 99.7%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 625344k total, 574124k used, 51220k free, 66896k buffers
Swap: 524280k total, 0k used, 524280k free, 409324k cached
PID to renice:
#输入"r"交互命令之后，提示输入要修改优先级的进程的PID
PID   USER PR NI  VIRT  RES SHR  S %CPU %MEM   TIME+ COMMAND
18977 root 20 0  11592 3304 2572 S  0.0 0.5  0:04.37 sshd
```
输入`r`交互命令，会提示输入需要修改优先级的进程的 PID。例如，我们想要修改 18977 这个`sshd`远程连接进程的优先级，就输入该进程的 PID。
```bash
Renice PID 18977 to value: 10
#输入PID后，需要输入Nice的优先级号
#我们把18977进程的优先级调整为10,回车后就能看到
PID   USER PR NI  VIRT  RES SHR  S %CPU %MEM   TIME+ COMMAND
18977 root 30 10 11592 3304 2572 R  0.0 0.5  0:04.38 sshd
#18977进程的优先级已经被修改了
```
如果在操作终端执行`top`命令，则并不能看到系统中所有的进程，默认看到的只是 CPU 占比靠前的进程。如果我们想要看到所有的进程，则可以把`top`命令的执行结果重定向到文件中。不过`top`命令是持续运行的，这时就需要使用`-b`和`-n`选项了。
```bash
[root@localhost ~]# top -b -n 1 > /root/top.log
#让top命令只执行一次，然后把执行结果保存到top.log文件中，这样就能看到所有的进程了
```
## pstree：查看进程树
`pstree`命令是以树形结构显示程序和进程之间的关系：
```shell
[root@localhost ~]# pstree [选项] [PID或用户名]
```

| 选项 | 说明 |
|----|----|
| -a   | 显示启动每个进程对应的完整指令，包括启动进程的路径、参数等   |
| -c   | 不使用精简法显示进程信息，即显示的进程中包含子进程和父进程   |
| -n   | 根据进程 PID 号来排序输出，默认是以程序名排序输出的   |
| -p   | 显示进程的 PID   |
| -u   | 显示进程对应的用户名称   |

需要注意的是，在使用`pstree`命令时，如果不指定进程的 PID 号，也不指定用户名称，则会以`init`进程为根进程，显示系统中所有程序和进程的信息；反之，若指定 PID 号或用户名，则将以 PID 或指定命令为根进程，显示 PID 或用户对应的所有程序和进程。

`init`进程是系统启动的第一个进程，进程的 PID 是 1，也是系统中所有进程的父进程。
```shell
[root@1ocalhost ~]# pstree
init──┬──abrc-dump-oopa
├──abrtd
├──acpid
...省略部分输出...
├──rayslogd───3*[{rsyslogrd}]
#有3个rsyslogd进程存在
├──sshd───sshd───bash───pstree
#Pstree命令进程是在远程连接中被执行的
├──udevd───2*[udevd]
└──xinecd
```
如果想知道某个用户都启动了哪些进程，使用`pstree`命令可以很容易实现，以`mysql`用户为例：
```shell
[root@1ocalhost ~]# pstree mysql
mysqid---6*[{mysqid}]
```

此输出结果显示了`mysql`用户对应的进程为`mysqid`，并且`mysqid`进程拥有 5 个子进程（外加 1 个父进程，共计 6 个进程）。
## lsof命令：列出进程调用或打开的文件信息
`lsof(list opened files)`，直译过来，就是列举系统中已经被打开的文件。通过`lsof`命令，我们就可以根据文件找到对应的进程信息，也可以根据进程信息找到进程打开的文件。
```shell
[root@localhost ~]# lsof [选项]
```

| 选项 | 说明 |
|----|----|
| -c 字符串   | 只列出以字符串开头的进程打开的文件   |
| +d 目录名   | 列出某个目录中所有被进程调用的文件   |
| -u 用户名   | 只列出某个用户的进程打开的文件   |
| -p pid   | 列出某个 PID 进程打开的文件   |

```shell
[root@localhost ~]# lsof | more
#查询系统中所有进程调用的文件
COMMAND PID  USER  FD    TYPE  DEVICE  SIZE/OFF  NODE  NAME
init               1      root    cwd  DIR    8，3       4096        2           /
init               1      root    rtd    DIR    8，3       4096        2           /
init               1      root    txt     REG   8，3       145180    130874 /sbin/init
init               1      root    mem REG   8，3       142472    665291 /lib/ld-2.12.so
init               1      root    mem REG   8，3       58704      655087 /lib/libnss_files-2.12.so
…省略部分输出…
```
这个命令的输出非常多。它会按照 PID，从 1 号进程开始列出系统中所有的进程正在调用的文件名。
```shell
[root@localhost ~]# lsof /sbin/init
#查询某个文件被哪个进程调用
COMMAND PID USER  FD  TYPE  DEVICE  SIZE/OFF  NODE    NAME
init               1     root    txt  REG   8，3      145180     130874   /sbin/init
```
`lsof`命令也可以反过来查询某个文件被哪个进程调用。这个例子就查询到`/sbin/init`文件是被`init`进程调用的。
```shell
[root@localhost ~]# lsof +d /usr/lib
#查询某个目录下所有的文件是被哪些进程调用的
COMMAND  PID    USER   FD     TYPE DEVICE  SIZE/OFF   NODE    NAME
rpc.idmap     1196  root     mem REG  8，3       26400       279930   /usr/lib/libnfsidmap.so.0.3.0
rpc.idmap     1196  root     mem REG  8，3       108948     276696   /usr/lib/libevent-1.4.so.2.1.3
avahi-dae     1240  avahi    mem REG  8，3       49124       271310   /usr/lib/libavahi-common.so.3.5.1
avahi-dae     1240  avahi    mem REG  8，3       23904       283188   /usr/lib/libdaemon.so.0.5.0
avahi-dae     1240  avahi    mem REG  8，3       227212     268396   /usr/lib/libavahi-core.so.6.0.1
avahi-dae     1241  avahi    mem REG  8，3       49124       271310   /usr/lib/libavahi-common.so.3.5.1
avahi-dae     1241  avahi    mem REG  8，3       23904       283188   /usr/lib/libdaemon.so.0.5.0
avahi-dae     1241  avahi    mem REG  8，3       227212     268396   /usr/lib/libavahi-core.so.6.0.1
cupsd           1251  root      mem REG  8，3       69564       270210   /usr/lib/libtasn1.so.3.1.6
```
使用`+d`选项可以搜索某个目录下所有的文件，查看到底哪个文件被哪个进程调用了。
```shell
[root@localhost ~]# lsof -c httpd
#查看以httpd开头的进程调用了哪些文件
COMMAND PID   USER   FD    TYPE   DEVICE  SIZE/OFF  NODE   NAME
httpd           4689 root     cwd  DIR     8，3       4096        2           /
httpd           4689 root     rtd    DIR     8，3       4096        2           /
httpd           4689 root     txt     REG    8，3       1797559  2855     /usr/local/apache2/bin/httpd
httpd           4689 root     mem REG    8，3       302300    665303 /lib/libfreebl3.so
httpd           4689 root     mem REG    8，3       58704      655087 /lib/libnss_files-2.12.s
httpd           4689 root     mem REG    8，3       142472    665291 /lib/ld-2.12.so
httpd           4689 root     mem REG    8，3       1889704  665292 /lib/libc-2.12.so
…省略部分输出…
```
使用`-c`选项可以查询以某个字符串开头的进程调用的所有文件，比如执行`lsof-c httpd`命令就会查询出以`httpd`开头的进程调用的所有文件。
```shell
[root@localhost ~]# lsof -p 1
#查询PID是1的进程调用的文件
COMMAND PID USER FD   TYPE  DEVICE  SIZE/OFF NODE  NAME
init               1     root  cwd  DIR    8，3      4096        2           /
init               1     root rtd     DIR    8，3      4096        2           /
init               1     root  txt     REG   8，3      145180    130874 /sbin/init
init               1     root  mem REG   8，3      142472    665291 /lib/ld-2.12.so
init               1     root  mem REG   8，3      58704      655087 /lib/libnss_files-2.12.so
```
当然，我们也可以按照 PID 查询进程调用的文件，比如执行`lsof -p 1`命令就可以查看 PID 为 1 的进程调用的所有文件。
```shell
[root@localhost ~]# lsof -u root
#按照用户名查询某个用户的进程调用的文件
COMMAND PID USER  FD      TYPE   DEVICE   SIZE/OFF   NODE  NAME
init               1     root    cwd    DIR     8，3       4096          2           /
init               1     root    rtd      DIR     8，3       4096          2           /
init               1     root    txt      REG     8，3       145180     130874  /sbin/init
init               1     root    mem  REG     8，3       142472     665291  /lib/ld-2.12.so
init               1     root    mem  REG     8，3       58704       655087  /lib/libnss_files-2.12.s
init               1     root    mem  REG     8，3       38768       655310  /lib/libnih-dbus.so.1.0.
…省略部分输出…
```
我们还可以查看某个用户的进程调用了哪些文件。
## 进程优先级
Linux 是一个多用户、多任务的操作系统，系统中通常运行着非常多的进程。但是 CPU 在一个时钟周期内只能运算一条指令（现在的 CPU 采用了多线程、多核心技术，所以在一个时钟周期内可以运算多条指令。但是同时运算的指令数也远远小于系统中的进程总数），那问题来了：谁应该先运算，谁应该后运算呢？这就需要由进程的优先级来决定了。

另外，CPU 在运算数据时，不是把一个集成算完成，再进行下一个进程的运算，而是先运算进程 1，再运算进程 2，接下来运算进程 3，然后再运算进程 1，直到进程任务结束。不仅如此，由于进程优先级的存在，进程并不是依次运算的，而是哪个进程的优先级高，哪个进程会在一次运算循环中被更多次地运算。

这样说很难理解，我们换一种说法。假设我现在有 4 个孩子（进程）需要喂饭（运算），我更喜欢孩子 1（进程 1 优先级更高），孩子 2、孩子 3 和孩子 4 一视同仁（进程 2、进程 3 和进程 4 的优先级一致）。现在我开始喂饭了，我不能先把孩子 1 喂饱，再喂其他的孩子，而是需要循环喂饭（CPU 运算时所有进程循环运算）。那么，我在喂饭时（运算），会先喂孩子 1 一口饭，然后再去喂其他孩子。而且在一次循环中，先喂孩子 1 两口饭，因为我更喜欢孩子 1（优先级高），而喂其他的孩子一口饭。这样，孩子 1 会先吃饱（进程 1 运算得更快），因为我更喜欢孩子 1。

在 Linux 系统中，表示进程优先级的有两个参数：`Priority`和`Nice`。
```shell
[root@localhost ~]# ps -le
F S UID PID PPID C PRI NI ADDR  SZ WCHAN TTY    TIME  CMD
4 S   0   1    0 0  80  0    - 718     -   ? 00:00:01 init
1 S   0   2    0 0  80  0    -   0     -   ? 00:00:00 kthreadd
...省略部分输出...
```
其中，`PRI`代表`Priority`，`NI`代表`Nice`。这两个值都表示优先级，数值越小代表该进程越优先被 CPU 处理。不过，`PRI`值是由内核动态调整的，用户不能直接修改。所以我们只能通过修改`NI`值来影响`PRI`值，间接地调整进程优先级。

`PRI`和`NI`的关系如下：
```shell
PRI (最终值) = PRI (原始值) + NI
```
其实，大家只需要记得，我们修改`NI`的值就可以改变进程的优先级即可。`NI`值越小，进程的`PRI`就会降低，该进程就越优先被 CPU 处理；反之，`NI`值越大，进程的`PRI`值就会増加，该进程就越靠后被 CPU 处理。

修改 NI 值时有几个注意事项：
* `NI`范围是 -20~19。
* 普通用户调整`NI`值的范围是 0~19，而且只能调整自己的进程。
* 普通用户只能调高`NI`值，而不能降低。如原本`NI`值为 0，则只能调整为大于 0。
* 只有`root`用户才能设定进程`NI`值为负值，而且可以调整任何用户的进程。

## nice和renice：改变进程优先级
当 Linux 内核尝试决定哪些运行中的进程可以访问 CPU 时，其中一个需要考虑的因素就是进程优先级的值（也称为`nice`值）。每个进程都有一个介于 -20 到 19 之间的`nice`值。默认情况下，进程的`nice`值为 0。

进程的`nice`值，可以通过`nice`命令和`renice`命令修改，进而调整进程的运行顺序。
### nice
`nice`命令可以给要启动的进程赋予`NI`值，但是不能修改已运行进程的`NI`值。
```shell
[root@localhost ~] # nice [-n NI值] 命令
```
`-n NI`值：给命令赋予`NI`值，该值的范围为 -20~19。
```shell
[root@localhost ~]# service httpd start
[root@localhost ~]# ps -le 丨 grep "httd" | grep -v grep
F S UID  PID PPID C PRI NI ADDR   SZ   WCHAN TTY      TIME   CMD
1 S   0 2084    1 0 80   0    - 1130     -     ?  00:00:00 httpd
5 S   2 2085 2084 0 80   0    - 1130     -     ?  00:00:00 httpd
5 S   2 2086 2084 0 80   0    - 1130     -     ?  00:00:00 httpd
5 S   2 2087 2084 0 80   0    - 1130     -     ?  00:00:00 httpd
5 S   2 2088 2084 0 80   0    - 1130     -     ?  00:00:00 httpd
5 S   2 2089 2084 0 80   0    - 1130     -     ?  00:00:00 httpd
#用默认优先级自动apache服务，PRI值是80，而NI值是0
[root@localhost ~]# service httpd stop
#停止apache服务
[root@localhost ~]# nice -n -5 service httpd start
#启动apache服务，同时修改apache服务进程的NI值为-5
[rooteiocdlhost ~]# ps -le | grep "httpd" | grep -v grep
F S UID  PID PPID C FRI NI ADDR    SZ WCHAN TTY      TIME   CMD
1 S   0 2122    1 0 75   5    -  1130    -    ?  00:00:00 httpd
5 S   2 2123 2122 0 75   5    -  1130    -    ?  00:00:00 httpd
5 S   2 2124 2122 0 75   5    -  1130    -    ?  00:00:00 httpd
5 S   2 2125 2122 0 75   5    -  1130    -    ?  00:00:00 httpd
5 S   2 2126 2122 0 75   5    -  1130    -    ?  00:00:00 httpd
5 S   2 2127 2122 0 75   5    -  1130    -    ?  00:00:00 httpd
#httpd进程的PRI值变为了75，而NI值为-5
```
### renice
同`nice`命令恰恰相反，`renice`可以在进程运行时修改其`NI`值，从而调整优先级。
```shell
[root@localhost ~] # renice [优先级] PID
```
注意，此命令中使用的是进程的 PID 号，因此常与`ps`等命令配合使用。
```shell
[root@localhost ~]# renice -10 2125
2125: old priority -5, new priority -10
[root@localhost ~]# ps -le | grep "httpd" | grep -v grep
1 S 0 2122 1 0 75 -5 - 113.0 - ? 00:00:00 httpd
5 S 2 2123 2122 0 75 -5 - 1130 - ? 00:00:00 httpd
5 S 2 2124 2122 0 75 -5 - 1130 - ? 00:00:00 httpd
5 S 2 2125 2122 0 70 -10 - 1130 - ? 00:00:00 httpd
5 S 2 2126 2122 0 75 -5 - 1130 - ? 00:00:00 httpd
5 S 2 2.127 2122 0 75 -5 - 1130 - ? 00:00:00 httpd
#PID为2125的进程的PRI值为70，而NI值为-10
```
## 常用信号（进程间通信）
进程的管理主要是指进程的关闭与重启。我们一般关闭或重启软件，都是关闭或重启它的程序，而不是直接操作进程的。比如，要重启`apache`服务，一般使用命令`service httpd restart`重启`apache`的程序。

还可以通过直接管理进程来关闭或重启程序。

系统中可以识别的信号较多，我们可以使用命令`kill -l`或`man 7 signal`来查询。
```shell
[root@localhost ~]#kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
```
常见的进程信号：

| 信号代号 |  信号名称   | 说 明                                                                              |
|:----:|:-------:|:---------------------------------------------------------------------------------|
|  1   | SIGHUP  | 该信号让进程立即关闭.然后重新读取配置文件之后重启                                                        |
|  2   | SIGINT  | 程序中止信号，用于中止前台进程。相当于输出 Ctrl+C 快捷键                                                 |
|  8   | SIGFPE  | 在发生致命的算术运算错误时发出。不仅包括浮点运算错误，还包括溢出及除数为 0 等其他所有的算术运算错误                              |
|  9   | SIGKILL | 用来立即结束程序的运行。本信号不能被阻塞、处理和忽略。般用于强制中止进程                                             |
|  14  | SIGALRM | 时钟定时信号，计算的是实际的时间或时钟时间。alarm 函数使用该信号                                              |
|  15  | SIGTERM | 正常结束进程的信号，kill 命令的默认信号。如果进程已经发生了问题，那么这 个信号是无法正常中止进程的，这时我们才会尝试 SIGKILL 信号，也就是信号 9 |
|  18  | SIGCONT | 该信号可以让暂停的进程恢复执行。本信号不能被阻断                                                         |
|  19  | SIGSTOP | 该信号可以暂停前台进程，相当于输入 Ctrl+Z 快捷键。本信号不能被阻断                                            |

其中最重要的就是 1、9、15 这三个信号，我们只需要记住这三个信号即可。
## kill：终止进程
`kill`命令只是用来向进程发送一个信号，至于这个信号是什么，是用户指定的。

也就是说，`kill`命令的执行原理是这样的，`kill`命令会向操作系统内核发送一个信号（多是终止信号）和目标进程的`PID`，然后系统内核根据收到的信号类型，对指定进程进行相应的操作。
```
[root@localhost ~]# kill [信号] PID
```
`kill`命令是按照`PID`来确定进程的，所以`kill`命令只能识别`PID`，而不能识别进程名。Linux 定义了几十种不同类型的信号，可以使用`kill -l`命令查看所有信号及其编号。

`kill`命令常用信号及其含义：

| 信号编号 |  信号名 |  含义 |
| :--: | :--: | :--: |
| 0        | EXIT    | 程序退出时收到该信息。 |
| 1        | HUP     | 挂掉电话线或终端连接的挂起信号，这个信号也会造成某些进程在没有终止的情况下重新初始化。 |
| 2        | INT     | 表示结束进程，但并不是强制性的，常用的 "Ctrl+C" 组合键发出就是一个 kill -2 的信号。 |
| 3        | QUIT    | 退出。 |
| 9        | KILL    | 杀死进程，即强制结束进程。 |
| 11       | SEGV    | 段错误。 |
| 15       | TERM    | 正常结束进程，是 kill 命令的默认信号。 |

需要注意的是，表中省略了各个信号名称的前缀`SIG`，也就是说，`SIGTERM`和`TERM`这两种写法都对，`kill`命令都可以理解。
```shell
[root@localhost ~]# service httpd start
#启动RPM包默认安装的apache服务
[root@localhost ~]# pstree -p 丨 grep httpd | grep -v "grep"
# 查看 httpd 的进程树及 PID。grep 命令査看 httpd 也会生成包含"httpd"关键字的进程，
# 所以使用“-v”反向选择包含“grep”关键字的进程，
# 这里使用 pstree 命令来查询进程，当然也可以使用 ps 和 top 命令
|-httpd(2246)-+-httpd(2247)
|    |-httpd(2248)
|    |-httpd(2249)
|    |-httpd(2250)
|    |-httpd(2251)
[root@localhost ~]# kill 2248
#杀死PID是2248的httpd进程，默认信号是15，正常停止
#如果默认信号15不能杀死进程，则可以尝试-9信号，强制杀死进程
[root@localhost ~]# pstree -p | grep httpd | grep -v "grep"
|-httpd(2246>-+-httpd(2247)
|    |-httpd(2249)
|    |-httpd(2250)
|    |-httpd(2251)
#PID是2248的httpd进程消失了
```
```shell
[root@localhost ~]# kill -1 2246
# 使用“-1 (数字1)”信号，让httpd的主进程重新启动
[root@localhost ~]# pstree -p | grep httpd | grep -v "grep"
|-httpd(2246)-+-httpd(2270)
|    |-httpd(2271)
|    |-httpd(2272)
|    |-httpd(2273)
|    |-httpd(2274)
#子httpd进程的PID都更换了，说明httpd进程已经重启了一次
```
```shell
[root@localhost ~]# vi test.sh #使用vi命令编辑一个文件，不要退出
[root@localhost ~]# ps aux | grep "vi" | grep -v "grep"
root 2313 0.0 0.2 7116 1544 pts/1 S+ 19:2.0 0:00 vi test.sh
#换一个不同的终端，查看一下这个进程的状态。进程状态是S（休眠）和+（位于后台），因为是在另一个终端运行的命令
[root@localhost ~]# kill -19 2313
#使用-19信号，让PID为2313的进程暂停。相当于在vi界面按 Ctrl+Z 快捷键
[root@localhost ~]# ps aux | grep "vi" | grep -v "grep"
root 2313 0.0 0.2 7116 1580 pts/1 T 19:20 0:00 vi test.sh
#注意2313进程的状态，变成了 T（暂停）状态。
# 这时切换回vi的终端,发现vi命令已经暂停，又回到了命令提示符，不过2313进程就会卡在后台。
# 如果想要恢复，可以使用"kill -9 2313”命令强制中止进程，
```

:::tip
使用`kill`命令不一定可以终止一个进程。`kill`命令只是“发送”一个信号，因此，只有当信号被程序成功“捕获”，系统才会执行`kill`命令指定的操作；反之，如果信号被“封锁”或者“忽略”，则`kill`命令将会失效。
:::

## killall：终止特定的一类进程
`killall`也是用于关闭进程的一个命令，但和`kill`不同的是，`killall`命令不再依靠 PID 来杀死单个进程，而是通过程序的进程名来杀死一类进程，也正是由于这一点，该命令常与`ps、pstree`等命令配合使用。
```shell
[root@localhost ~]# killall [选项] [信号] 进程名
```
注意，此命令的信号类型同`kill`命令一样，因此这里不再赘述，此命令常用的选项有 2 个：
* `-i`：交互式，询问是否要杀死某个进程
* `-I`：忽略进程名的大小写

```shell
[root@localhost ~]# service httpd start
#启动RPM包默认安装的apache服务
[root@localhost ~]# ps aux | grep "httpd" | grep -v "grep"
root 1600 0.0 0.2 4520 1696? Ss 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1601 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1602 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1603 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1604 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1605 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
#查看httpd进程
[root@localhost ~]# killall httpd
#杀死所有进程名是httpd的进程
[root@localhost ~]# ps aux | grep "httpd" | grep -v "grep"
#查询发现所有的httpd进程都消失了
```
```shell
[root@localhost ~]# ps aux | grep "sshd" | grep -v "grep"
root 1733 0.0 0.1 8508 1008? Ss 19:47 0:00/usr/sbin/sshd
root 1735 0.1 0.5 11452 3296? Ss 19:47 0:00 sshd: root@pts/0
root 1758 0.1 0.5 11452 3296? Ss 19:47 0:00 sshd: root@pts/1
#查询系统中有3个sshd进程。1733是sshd服务的进程，1735和1758是两个远程连接的进程
[root@localhost ~]# killall -i sshd
#交互式杀死sshd进程
杀死sshd(1733)?(y/N)n
#这个进程是sshd的服务进程，如果杀死，那么所有的sshd连接都不能登陆
杀死 sshd(1735)?(y/N)n
#这是当前登录终端，不能杀死我自己吧
杀死 sshd(1758)?(y/N)y
#杀死另一个sshd登陆终端
```
