


## socket是什么
`socket`的原意是“插座”，在计算机通信领域，`socket`被翻译为“套接字”，它是计算机之间进行通信的一种约定或一种方式。通过`socket`这种约定，一台计算机可以接收其他计算机的数据，也可以向其他计算机发送数据。

我们把插头插到插座上就能从电网获得电力供应，同样，为了与远程计算机进行数据传输，需要连接到因特网，而`socket`就是用来连接到因特网的工具。

在 UNIX/Linux 系统中，为了统一对各种硬件的操作，简化接口，不同的硬件设备也都被看成一个文件。对这些文件的操作，等同于对磁盘上普通文件的操作。

为了表示和区分已经打开的文件，UNIX/Linux 会给每个文件分配一个 ID，这个 ID 就是一个整数，被称为文件描述符（File Descriptor）。例如：
* 通常用 0 来表示标准输入文件（stdin），它对应的硬件设备就是键盘；
* 通常用 1 来表示标准输出文件（stdout），它对应的硬件设备就是显示器。

UNIX/Linux 程序在执行任何形式的 I/O 操作时，都是在读取或者写入一个文件描述符。一个文件描述符只是一个和打开的文件相关联的整数，它的背后可能是一个硬盘上的普通文件、FIFO、管道、终端、键盘、显示器，甚至是一个网络连接。

请注意，网络连接也是一个文件，它也有文件描述符！你必须理解这句话。

我们可以通过`socket()`函数来创建一个网络连接，或者说打开一个网络文件，`socket()`的返回值就是文件描述符。有了文件描述符，我们就可以使用普通的文件操作函数来传输数据了，例如：
用`read()`读取从远程计算机传来的数据；
用`write()`向远程计算机写入数据。

只要用`socket()`创建了连接，剩下的就是文件操作了，网络编程原来就是如此简单！
## socket有哪些类型
根据数据的传输方式，可以将 Internet 套接字分成两种类型。通过`socket()`函数创建连接时，必须告诉它使用哪种数据传输方式。
### 流格式套接字（SOCK_STREAM）
流格式套接字（`Stream Sockets`）也叫“面向连接的套接字”，在代码中使用`SOCK_STREAM`表示。

`SOCK_STREAM`是一种可靠的、双向的通信数据流，数据可以准确无误地到达另一台计算机，如果损坏或丢失，可以重新发送。

`SOCK_STREAM`有以下几个特征：
* 数据在传输过程中不会消失
* 数据是按照顺序传输的
* 数据的发送和接收不是同步的

可以将`SOCK_STREAM`比喻成一条传送带，只要传送带本身没有问题（不会断网），就能保证数据不丢失；同时，较晚传送的数据不会先到达，较早传送的数据不会晚到达，这就保证了数据是按照顺序传递的。

为什么流格式套接字可以达到高质量的数据传输呢？这是因为它使用了 TCP 协议，TCP 协议会控制你的数据按照顺序到达并且没有错误。

那么，“数据的发送和接收不同步”该如何理解呢？

假设传送带传送的是水果，接收者需要凑齐 100 个后才能装袋，但是传送带可能把这 100 个水果分批传送，比如第一批传送 20 个，第二批传送 50 个，第三批传送 30 个。接收者不需要和传送带保持同步，只要根据自己的节奏来装袋即可，不用管传送带传送了几批，也不用每到一批就装袋一次，可以等到凑够了 100 个水果再装袋。

流格式套接字的内部有一个缓冲区（也就是字符数组），通过`socket`传输的数据将保存到这个缓冲区。接收端在收到数据后并不一定立即读取，只要数据不超过缓冲区的容量，接收端有可能在缓冲区被填满以后一次性地读取，也可能分成好几次读取。

也就是说，不管数据分几次传送过来，接收端只需要根据自己的要求读取，不用非得在数据到达时立即读取。传送端有自己的节奏，接收端也有自己的节奏，它们是不一致的。

流格式套接字有什么实际的应用场景吗？浏览器所使用的 http 协议就基于面向连接的套接字，因为必须要确保数据准确无误，否则加载的 HTML 将无法解析。
### 数据报格式套接字（SOCK_DGRAM）
数据报格式套接字（`Datagram Sockets`）也叫“无连接的套接字”，在代码中使用`SOCK_DGRAM`表示。

计算机只管传输数据，不作数据校验，如果数据在传输中损坏，或者没有到达另一台计算机，是没有办法补救的。也就是说，数据错了就错了，无法重传。

因为数据报套接字所做的校验工作少，所以在传输效率方面比流格式套接字要高。

`SOCK_DGRAM`有以下特征：
* 强调快速传输而非传输顺序
* 传输的数据可能丢失也可能损毁
* 限制每次传输的数据大小
* 数据的发送和接收是同步的

总之，数据报套接字是一种不可靠的、不按顺序传递的、以追求速度为目的的套接字。

数据报套接字也使用 IP 协议作路由，但是它不使用 TCP 协议，而是使用 UDP 协议。
## Linux下的socket演示程序
我们从一个简单的程序切入 socket 编程。
`server.cpp`是服务器端代码，`client.cpp`是客户端代码，要实现的功能是：客户端从服务器读取一个字符串并打印出来。

服务器端代码`server.cpp`：
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(){
    //创建套接字
    int serv_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

    //将套接字和IP、端口绑定
    struct sockaddr_in serv_addr;
    memset(&serv_addr, 0, sizeof(serv_addr));  //每个字节都用0填充
    serv_addr.sin_family = AF_INET;  //使用IPv4地址
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");  //具体的IP地址
    serv_addr.sin_port = htons(1234);  //端口
    bind(serv_sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));

    //进入监听状态，等待用户发起请求
    listen(serv_sock, 20);

    //接收客户端请求
    struct sockaddr_in clnt_addr;
    socklen_t clnt_addr_size = sizeof(clnt_addr);
    int clnt_sock = accept(serv_sock, (struct sockaddr*)&clnt_addr, &clnt_addr_size);

    //向客户端发送数据
    char str[] = "hello world";
    write(clnt_sock, str, sizeof(str));
   
    //关闭套接字
    close(clnt_sock);
    close(serv_sock);

    return 0;
}
```
客户端代码`client.cpp`：
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

int main(){
    //创建套接字
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    //向服务器（特定的IP和端口）发起请求
    struct sockaddr_in serv_addr;
    memset(&serv_addr, 0, sizeof(serv_addr));  //每个字节都用0填充
    serv_addr.sin_family = AF_INET;  //使用IPv4地址
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");  //具体的IP地址
    serv_addr.sin_port = htons(1234);  //端口
    connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));
   
    //读取服务器传回的数据
    char buffer[40];
    read(sock, buffer, sizeof(buffer)-1);
   
    printf("Message form server: %s\n", buffer);
   
    //关闭套接字
    close(sock);

    return 0;
}
```
启动一个终端，编译`server.cpp`并运行：
```shell
[admin@localhost ~]$ g++ server.cpp -o server
[admin@localhost ~]$ ./server
#等待请求的到来
```
正常情况下，程序运行到`accept()`函数就会被阻塞，等待客户端发起请求。

接下再启动一个终端，编译`client.cpp`并运行：
```shell
[admin@localhost ~]$ g++ client.cpp -o client
[admin@localhost ~]$ ./client
Message form server: hello world
```
`client`接收到从`server`发送过来的字符串就运行结束了，同时，`server`完成发送字符串的任务也运行结束了。

`client`运行后，通过`connect()`函数向`server`发起请求，处于监听状态的`server`被激活，执行`accept()`函数，接受客户端的请求，然后执行`write()`函数向`client`传回数据。`client`接收到传回的数据后，`connect()`就运行结束了，然后使用`read()`将数据读取出来。

`server`只接受一次`client`请求，当`server`向`client`传回数据后，程序就运行结束了。如果想再次接收到服务器的数据，必须再次运行`server`，所以这是一个非常简陋的`socket`程序，不能够一直接受客户端的请求。
### 源码解析
先说一下`server.cpp`中的代码：
* 第 11 行通过`socket()`函数创建了一个套接字，参数`AF_INET`表示使用 IPv4 地址，`SOCK_STREAM`表示使用面向连接的套接字，`IPPROTO_TCP`表示使用 TCP 协议。在 Linux 中，`socket`也是一种文件，有文件描述符，可以使用`write()/read()`函数进行 I/O 操作。
* 第 19 行通过`bind()`函数将套接字`serv_sock`与特定的 IP 地址和端口绑定，IP 地址和端口都保存在`sockaddr_in`结构体中。
`socket()`函数确定了套接字的各种属性，`bind()`函数让套接字与特定的IP地址和端口对应起来，这样客户端才能连接到该套接字。
* 第 22 行让套接字处于被动监听状态。所谓被动监听，是指套接字一直处于“睡眠”中，直到客户端发起请求才会被“唤醒”。
* 第 27 行的`accept()`函数用来接收客户端的请求。程序一旦执行到`accept()`就会被阻塞（暂停运行），直到客户端发起请求。
* 第 31 行的`write()`函数用来向套接字文件中写入数据，也就是向客户端发送数据。

和普通文件一样，`socket`在使用完毕后也要用`close()`关闭。

再说一下`client.cpp`中的代码：
* 第 19 行代码通过`connect()`向服务器发起请求，服务器的 IP 地址和端口号保存在`sockaddr_in`结构体中。直到服务器传回数据后，`connect()`才运行结束。
* 第 23 行代码通过`read()`从套接字文件中读取数据。

## Windows下的socket演示程序
服务器端代码`server.cpp`：
```c
#include <stdio.h>
#include <winsock2.h>
#pragma comment (lib, "ws2_32.lib")  //加载 ws2_32.dll

int main(){
    //初始化 DLL
    WSADATA wsaData;
    WSAStartup( MAKEWORD(2, 2), &wsaData);

    //创建套接字
    SOCKET servSock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);

    //绑定套接字
    struct sockaddr_in sockAddr;
    memset(&sockAddr, 0, sizeof(sockAddr));  //每个字节都用0填充
    sockAddr.sin_family = PF_INET;  //使用IPv4地址
    sockAddr.sin_addr.s_addr = inet_addr("127.0.0.1");  //具体的IP地址
    sockAddr.sin_port = htons(1234);  //端口
    bind(servSock, (SOCKADDR*)&sockAddr, sizeof(SOCKADDR));

    //进入监听状态
    listen(servSock, 20);

    //接收客户端请求
    SOCKADDR clntAddr;
    int nSize = sizeof(SOCKADDR);
    SOCKET clntSock = accept(servSock, (SOCKADDR*)&clntAddr, &nSize);

    //向客户端发送数据
    char *str = "Hello World!";
    send(clntSock, str, strlen(str)+sizeof(char), NULL);

    //关闭套接字
    closesocket(clntSock);
    closesocket(servSock);

    //终止 DLL 的使用
    WSACleanup();

    return 0;
}
```
客户端代码`client.cpp`：
```c
#include <stdio.h>
#include <stdlib.h>
#include <WinSock2.h>
#pragma comment(lib, "ws2_32.lib")  //加载 ws2_32.dll

int main(){
    //初始化DLL
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);

    //创建套接字
    SOCKET sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);

    //向服务器发起请求
    struct sockaddr_in sockAddr;
    memset(&sockAddr, 0, sizeof(sockAddr));  //每个字节都用0填充
    sockAddr.sin_family = PF_INET;
    sockAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    sockAddr.sin_port = htons(1234);
    connect(sock, (SOCKADDR*)&sockAddr, sizeof(SOCKADDR));

    //接收服务器传回的数据
    char szBuffer[MAXBYTE] = {0};
    recv(sock, szBuffer, MAXBYTE, NULL);

    //输出接收到的数据
    printf("Message form server: %s\n", szBuffer);

    //关闭套接字
    closesocket(sock);

    //终止使用 DLL
    WSACleanup();

    system("pause");
    return 0;
}
```
将`server.cpp`和`client.cpp`分别编译为`server.exe`和`client.exe`，先运行`server.exe`，再运行`client.exe`，输出结果为：
```text
Message form server: Hello World!
```
Windows 下的`socket`程序和 Linux 思路相同，但细节有所差别：
* Windows 下的`socket`程序依赖`Winsock.dll`或`ws2_32.dll`，必须提前加载。
* Linux 使用“文件描述符”的概念，而 Windows 使用“文件句柄”的概念；Linux 不区分`socket`文件和普通文件，而 Windows 区分；Linux 下`socket()`函数的返回值为`int`类型，而 Windows 下为`SOCKET`类型，也就是句柄。
* Linux 下使用`read()/write()`函数读写，而 Windows 下使用`recv()/send()`函数发送和接收。
* 关闭`socket`时，Linux 使用`close()`函数，而 Windows 使用`closesocket()`函数。

## socket()函数：创建套接字
Linux 中的一切都是文件，每个文件都有一个整数类型的文件描述符；`socket`也是一个文件，也有文件描述符。使用`socket()`函数创建套接字以后，返回值就是一个`int`类型的文件描述符。

Windows 会区分`socket`和普通文件，它把`socket`当做一个网络连接来对待，调用`socket()`以后，返回值是`SOCKET`类型，用来表示一个套接字。
### Linux 下的 socket() 函数
在 Linux 下使用`<sys/socket.h>`头文件中`socket()`函数来创建套接字，原型为：
```c
int socket(int af, int type, int protocol);
```
1. `af`为地址族，也就是 IP 地址类型，常用的有`AF_INET`和`AF_INET6`。`AF`是`Address Family`的简写，`INET`是`Inetnet`的简写。`AF_INET`表示 IPv4 地址；`AF_INET6`表示 IPv6 地址。
也可以使用 PF 前缀，PF 是`Protocol Family`的简写，它和 AF 是一样的。`PF_INET`等价于`AF_INET`，`PF_INET6`等价于`AF_INET6`。
2. `type`为数据传输方式/套接字类型，常用的有`SOCK_STREAM`（流格式套接字/面向连接的套接字） 和`SOCK_DGRAM`（数据报套接字/无连接的套接字）。
3. `protocol`表示传输协议，常用的有`IPPROTO_TCP`和`IPPTOTO_UDP`，分别表示 TCP 传输协议和 UDP 传输协议。

一般情况下有了`af`和`type`两个参数就可以创建套接字了，操作系统会自动推演出协议类型，除非遇到这样的情况：有两种不同的协议支持同一种地址类型和数据传输类型。如果我们不指明使用哪种协议，操作系统是没办法自动推演的。

使用 IPv4 地址，参数`af`的值为`AF_INET`。如果使用`SOCK_STREAM`传输数据，那么满足这两个条件的协议只有 TCP，因此可以这样来调用`socket()`函数：
```c
int tcp_socket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);  //IPPROTO_TCP表示TCP协议
```
这种套接字称为 TCP 套接字。

如果使用`SOCK_DGRAM`传输方式，那么满足这两个条件的协议只有 UDP，因此可以这样来调用`socket()`函数：
```c
int udp_socket = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);  //IPPROTO_UDP表示UDP协议
```
这种套接字称为 UDP 套接字。

上面两种情况都只有一种协议满足条件，可以将`protocol`的值设为 0，系统会自动推演出应该使用什么协议：
```c
int tcp_socket = socket(AF_INET, SOCK_STREAM, 0);  //创建TCP套接字
int udp_socket = socket(AF_INET, SOCK_DGRAM, 0);  //创建UDP套接字
```
### 在Windows下创建socket
Windows 下也使用`socket()`函数来创建套接字，原型为：
```c
SOCKET socket(int af, int type, int protocol);
```
除了返回值类型不同，其他都是相同的。Windows 不把套接字作为普通文件对待，而是返回`SOCKET`类型的句柄。
```c
SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);  //创建TCP套接字
```
## bind()函数：绑定套接字
`socket()`函数用来创建套接字，确定套接字的各种属性，然后服务器端要用`bind()`函数将套接字与特定的 IP 地址和端口绑定起来，只有这样，流经该 IP 地址和端口的数据才能交给套接字处理。

`bind()`函数的原型为：
```c
int bind(int sock, struct sockaddr *addr, socklen_t addrlen);  //Linux
int bind(SOCKET sock, const struct sockaddr *addr, int addrlen);  //Windows
```
`sock`为`socket`文件描述符，`addr`为`sockaddr`结构体变量的指针，`addrlen`为`addr`变量的大小，可由`sizeof()`计算得出。
