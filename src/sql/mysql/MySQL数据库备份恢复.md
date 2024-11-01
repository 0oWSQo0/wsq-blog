



## 备份类型
备份可以分为以下几个类型。

根据备份的方法（是否需要数据库离线）可以将备份分为：

|       备份方式        | 说明 |
|:-----------------:|:---|
| 热备（`Hot Backup`）  | 热备份可以在数据库运行中直接备份，对正在运行的数据库操作没有任何的影响，数据库的读写操作可以正常执行。也称为在线备份 |
| 冷备（`Cold Backup`） | 冷备份必须在数据库停止的情况下进行备份，数据库的读写操作不能执行。这种备份最为简单，一般只需要复制相关的数据库物理文件即可。也称为离线备份  |
| 温备（`Warm Backup`） | 温备份同样是在数据库运行中进行的，但是会对当前数据库的操作有所影响，备份时仅支持读操作，不支持写操作   |

按照备份后文件的内容，热备份又可以分为：逻辑备份、裸文件备份。

逻辑备份是指备份出的文件内容是可读的，一般是文本内容。内容一般是由一条条 SQL 语句，或者是表内实际数据组成。如`mysqldump`和`SELECT * INTO OUTFILE`的方法。这类方法的好处是可以观察导出文件的内容，一般适用于数据库的升级、迁移等工作。但其缺点是恢复的时间较长。

裸文件备份是指复制数据库的物理文件，既可以在数据库运行中进行复制（如`ibbackup、xtrabackup`这类工具），也可以在数据库停止运行时直接复制数据文件。这类备份的恢复时间往往比逻辑备份短很多。

按照备份数据库的内容来分，备份又可以分为：
* 完全备份：对数据库进行一个完整的备份，即备份整个数据库，如果数据较多会占用较大的时间和空间
* 部分备份：备份部分数据库（例如，只备份一个表）

部分备份又分为：增量备份、差异备份。

增量备份需要使用专业的备份工具。指的是在上次完全备份的基础上，对更改的数据进行备份。也就是说每次备份只会备份自上次备份之后到备份时间之内产生的数据。因此每次备份都比差异备份节约空间，但是恢复数据麻烦。

差异备份指的是自上一次完全备份以来变化的数据。和增量备份相比，浪费空间，但恢复数据比增量备份简单。

MySQL 中进行不同方式的备份还要考虑存储引擎是否支持，如 MyISAM 不支持热备，支持温备和冷备。而 InnoDB 支持热备、温备和冷备。

一般情况下，我们需要备份的数据分为以下几种：
* 表数据
* 二进制日志、InnoDB 事务日志
* 代码（存储过程、存储函数、触发器、事件调度器）
* 服务器配置文件

下面是几种常用的备份工具：

|          工具          | 说明                                                  |
|:--------------------:|:----------------------------------------------------|
|     `mysqldump`      | 逻辑备份工具，适用于所有的存储引擎，支持温备、完全备份、部分备份、对于 InnoDB 存储引擎支持热备 |
| `cp、tar`等归档复制工具      | 物理备份工具，适用于所有的存储引擎、冷备、完全备份、部分备份                      |
|   `lvm2 snapshot`    | 借助文件系统管理工具进行备份                                      |
|    `mysqlhotcopy`    | 名不副实的一个工具，仅支持 MyISAM 存储引擎                           |
|     `xtrabackup`     | 一款由 percona 提供的非常强大的 InnoDB/XtraDB 热备工具，支持完全备份、增量备份 |

## 冷备份
冷备份可以称为`Offline Backup`（离线备份）。这种备份最为简单，一般只需要复制相关的数据库物理文件到另外的位置即可。

由于 MySQL 服务器中的数据文件是基于磁盘的文本文件，所以最简单、最直接的备份操作，就是将数据文件直接复制出来。但是由于 MySQL 服务器的数据文件在运行时期，总是处于打开和使用状态，因此备份文件不一定有效。为了解决该问题，在复制数据文件时，需要先停止 MySQL 服务器。

这样做的好处是可以保证数据库的完整性，备份过程简单且恢复速度相对快一些，但是关闭数据库会影响现有业务的进行。服务器停止运行期间，用户不能再继续访问网站。冷备一般用于不是很重要、非核心的业务上面。

冷备份的优点：
* 备份简单、快速，只要复制相关文件即可
* 备份文件易于在不同操作系统，不同 MySQL 版本上进行恢复
* 恢复相当简单，只需要把文件恢复到指定位置即可
* 恢复速度快，不需要执行任何 SQL 语句，也不需要重建索引
* 低度维护，高度安全

冷备份的缺点：
* 备份过程中，数据库不能做其它的工作，且必须是关闭状态。
* InnoDB 存储引擎冷备的文件通常比逻辑文件大很多，因为表空间存放着很多其它的数据，如`undo`段，插入缓冲等信息。
* 若磁盘空间有限，只能拷贝到磁带等其它外部存储设备上，速度会很慢。
* 冷备也不总是可以轻易的跨平台。操作系统、MySQL 的版本、文件大小写敏感和浮点数格式都会成为问题。

数据库的物理文件主要由数据库的数据文件、日志文件以及配置文件等组成。MySQL 系统有一些共有的日志文件和系统表的数据文件。每种存储引擎的物理文件也不一样。

冷备的备份与恢复过程也很简单。仅仅需要如下几步：
1. 为了保证所备份数据的完整性，在停止 MySQL 数据库服务器之前，需要先执行 FLUSH TABLES 语句将所有数据写入到数据文件的文本文件里。
2. 停掉 MySQL 服务，命令（2种方式）如下：
```sql
mysqladmin -uroot -proot shutdown
NET START mysql
```
3. 备份过程就是复制整个数据目录到远程备份机或者本地磁盘上，Linux 和 Windows 命令如下：
```
Scp -r /data/mysql/ root@远程备份机ip:/新的目录
Copy -r /data/mysql/ 本地新目录
```
备份到本次磁盘也可以手动复制上述相关目录里的数据文件。
4. 恢复过程就更简单了，仅仅需要把已备份的数据目录替换原有的目录就可以了，最后重启 MySQL 服务。

需要注意的是，通过复制数据文件这种方式实现数据恢复时，必须保证两个 MySQL 数据库的主版本号一致。只有两个 MySQL 数据库主版本号相同时，才能保证它们的数据文件类型是相同的。
### 冷备份所需物理文件
### MyISAM存储引擎
MyISAM 存储引擎的所有数据默认存放在`C:/ProgramData/MySQL/MySQL Server 5.7/Data`路径下，即配置文件（`my.ini`或`my.cnf`）中`datadir`参数的值。

实际上不管我们使用的是 MyISAM 存储引擎还是其他存储引擎，每一个数据库都会在`datadir`目录下有一个文件夹（包括系统信息的数据库`mysql`也是一样）。

在各个数据库中每一个 MyISAM 存储引擎的表都会有 3 个文件存在，即记录表结构元数据的`.frm`文件，存储表数据的`.MYD`文件，存储索引数据的`.MYI`文件。

MyISAM 属于非事务性存储引擎，它没有自己的日志文件。所以 MyISAM 存储引擎的物理备份除了需要备份 MySQL 系统共有的物理文件之外，还需要备份上面的 3 种文件。
### Innodb 存储引擎
Innodb 存储引擎属于事务性存储引擎，存放数据的位置也可能与 MyISAM 存储引擎有所不同，这主要取决于 Innodb 的相关配置。

指定 Innodb 存放数据和日志文件的位置参数为`innodb_data_home_dir、innodb_data_file_path`和`innodb_log_group_home_dir`。以及决定 Innodb 的表空间存储方式参数`innodb_file_per_table`，它决定 Innodb 是以共享表空间存放数据还是以独享表空间方式存储数据。

如果使用的是共享表空间的存储方式，那么需要备份`innodb_data_home_dir`和`innodb_data_file_path`参数设定的所有数据文件，以及`datadir`中相应数据库目录下的所有 Innodb 存储引擎表的 `frm`文件。

而如果使用的是独享表空间，那么除了需要备份上面共享表空间方式所需要备份的所有文件之外，我们还需要备份`datadir`中相应数据库目录下的所有`.idb`文件，该文件中存放的才是独享表空间方式下 Innodb 存储引擎表的数据。

那么既然是使用独享表空间，为什么还要备份共享表空间“才使用到”的数据文件呢？其实这是很多人的一个共性误区，以为使用独享表空间的时候 Innodb 的所有信息就都存放在“datadir”所设定数据库目录下的“.ibd”文件中。实际上并不是这样的，“.ibd”文件中所存放的仅仅只是我们的表数据而已。

大家都很清楚，Innodb 是事务性存储引擎，它需要`undo`和`redo`信息，而不管 Innodb 使用的是共享还是独享表空间的方式来存储数据。与事务相关的`undo`信息以及其他的一些元数据信息，都是存放在`innodb_data_home_dir`和`innodb_data_file_path`这两个参数所设定的数据文件中的。所以要想 Innodb 的物理备份有效，就必须备份`innodb_data_home_dir`和`innodb_data_file_path`参数所设定的数据文件。

此外，除了上面所说的数据文件之外，Innodb 还有存放自己的`redo`信息和相关事务信息的日志文件在`innodb_log_group_home_dir`参数所设定的位置。所以要想 Innodb 物理备份能够有效使用，我们还必须要备份`innodb_log_group_home_dir`参数所设定的位置的所有日志文件。
## 热备份及恢复
与冷备份正好相反，热备份是在数据库处于运行状态时直接备份，不影响现有业务的正常进行。热备份又细分为逻辑备份和裸文件备份。
### 逻辑备份
逻辑备份的最大优点就是对于各种存储引擎，都可以用同样的方法来备份。而冷备份则不同，不同的存储引擎的备份方法也各不相同。因此，对于不同存储引擎混合的数据库，用逻辑备份会更简单一些。

逻辑备份可以说是最简单，也是目前中小型系统最常用的备份方法。逻辑备份主要有以下几种方法：
1. `mysqldump`
	 `mysqldump`是 MySQL 自带的逻辑备份工具。它的备份原理是通过协议连接到 MySQL 数据库，将需要备份的数据查询出来，然后将查询出的数据转换成对应的`INSERT`语句。当我们需要还原恢复这些数据时，只要执行这些`INSERT`语句，就能将对应的数据还原。所以有的资料也将这种备份方式称为`INSERT`备份。

恢复数据时可以使用`mysql -uroot -p <backup.sql`直接调用备份文件执行所有命令，将数据完全恢复到备份时候的状态。如果已经连接上了 MySQL 服务器，那么可以通过`source /path/backup.sql`来进行恢复。
2. `SELECT INTO…OUTFILE`
	 `SELECT INTO…OUTFILE`语句可以把表数据导出到一个文本文件中，且能将数据库中的表数据以特定分隔符进行分隔后记录在文本文件中，以达到逻辑备份的效果。

这种备份方式与`mysqldump`方法相比，使用的存储空间更小，数据格式更加清晰明确，编辑方便。但是这种方法只能导出或导入数据的内容，不包括表的结构，如果表的结构文件损坏，则必须先恢复原来的表的结构。而且这种方法不能在同一个备份文件中存在多个表的备份数据，增加了文件维护和恢复的成本。

这种备份方法恢复起来会稍微麻烦一点，需要一个表一个表通过相关命令来进行恢复。当然如果是通过脚本来实现自动多表恢复也是比较方便的。恢复方法有 2 个，一个是通过 MySQL 的`LOAD DATA INFILE`命令来恢复数据，另一种方法就是通过 MySQL 提供的使用工具`mysqlimport 来进行恢复。
3. `mydumper`
	 `mydumper`是针对 MySQL 数据库备份的一个轻量级第三方的开源工具，备份方式为逻辑备份。它支持多线程，备份速度远高于原生态的`mysqldump`以及其它众多优异特性。与其配套的相应恢复数据为`myloader`工具。

我们可以看出所谓的逻辑备份就是备份 SQL 语句，然后恢复数据时执行备份 SQL，从而实现数据库数据的重现。逻辑备份完成后所形成的文件都可以直接编辑。

逻辑备份的作用：
* 通过逻辑备份，我们可以仅仅恢复备份中的部分数据而不需要全部恢复。不会影响不相关的数据；
* 通过全库的逻辑备份，我们可以在新的 MySQL 环境下完全重建出一个与备份时完全一样的数据库，并且不受平台类型限制；
* 通过特定条件的逻辑备份，我们可以将某些特定数据轻松迁移（或者同步）到其它的 MySQL 或另外的数据库环境。

## mysqldump备份数据库
`mysqldump`命令执行时，可以将数据库中的数据备份成一个文本文件。数据表的结构和数据将存储在生成的文本文件中。
### 备份一个数据库
```shell
mysqldump -u username -p dbname [tbname ...]> filename.sql
```
语法参数说明：
* `username`：表示用户名称；
* `dbname`：表示需要备份的数据库名称；
* `tbname`：表示数据库中需要备份的数据表，可以指定多个数据表。省略该参数时，会备份整个数据库；
* 右箭头“>”：用来告诉`mysqldump`将备份数据表的定义和数据写入备份文件；
* `filename.sql`：表示备份文件的名称，文件名前面可以加绝对路径。通常将数据库备份成一个后缀名为`.sql`的文件。

注意：`mysqldump`命令备份的文件并非一定要求后缀名为`.sql`，备份成其他格式的文件也是可以的。例如，后缀名为`.txt`的文件。通常情况下，建议备份成后缀名为`.sql`的文件。因为，后缀名为`.sql`的文件给人第一感觉就是与数据库有关的文件。

下面使用 root 用户备份 test 数据库下的 student 表。打开命令行（cmd）窗口，输入备份命令和密码，运行过程如下：
```shell
C:\Windows\system32>mysqldump -uroot -p test student>C:\student.sql
Enter password: ****
```
注意：`mysqldump`命令必须在 cmd 窗口下执行，不能登录到 MySQL 服务中执行。

输入密码后，MySQL 会对`test`数据库下的`student`数据表进行备份。之后就可以在指定路径下查看刚才备份过的文件了。`student.sql`文件中的部分内容如下：
```sql
-- MySQL dump 10.13  Distrib 5.7.29, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version 5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
--此处删除了部分内容
--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
`id` int(4) NOT NULL,
`name` varchar(20) DEFAULT NULL,
`stuno` int(11) DEFAULT NULL,
`age` int(4) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'zhangsan',23,18),(2,'lisi',24,19),(3,'wangwu',25,18),(4,'zhaoliu',26,18);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
......
-- Dump completed on 2019-03-09 13:03:15
```
`student.sql`文件开头记录了 MySQL 的版本、备份的主机名和数据库名。

文件中，以“--”开头的都是 SQL 语言的注释。以`“/*!40101”`等形式开头的是与 MySQL 有关的注释。40101 是 MySQL 数据库的版本号，这里就表示 MySQL 4.1.1。如果恢复数据时，MySQL 的版本比 4.1.1 高，`“/*!40101”`和`“*/”`之间的内容被当作 SQL 命令来执行。如果比 4.1.1 低，`“/*!40101”`和`“*/”`之间的内容被当作注释。`“/*!”`和`“*/”`中的内容在其它数据库中将被作为注释忽略，这可以提高数据库的可移植性。

`DROP`语句、`CREATE`语句和`INSERT`语句都是数据库恢复时使用的；`“DROP TABLE IF EXISTS 'student' ”`语句用来判断数据库中是否还有名为`student`的表，如果存在，就删除这个表；`CREATE`语句用来创建 `student`表；`INSERT`语句用来恢复所有数据。文件的最后记录了备份的时间。

注意：上面`student.sql`文件中没有创建数据库的语句，因此，`student.sql`文件中的所有表和记录必须恢复到一个已经存在的数据库中。恢复数据时，`CREATE TABLE`语句会在数据库中创建表，然后执行`INSERT`语句向表中插入记录。
### 备份多个数据库
如果要使用`mysqldump`命令备份多个数据库，需要使用`--databases`参数。
```shell
mysqldump -u username -P --databases dbname1 dbname2 ... > filename.sql
```
加上`--databases`参数后，必须指定至少一个数据库名称，多个数据库名称之间用空格隔开。

下面使用`root`用户备份`test`数据库和`mysql`数据库。
```shell
mysqldump -u root -p --databases test mysql>C:\testandmysql.sql
```
执行完后，可以在`C:\`下面看到名为`testandmysql.sql`的文件，这个文件中存储着这两个数据库的信息。
### 备份所有数据库
```shell
mysqldump -u username -P --all-databases>filename.sql
```
使用`--all-databases`参数时，不需要指定数据库名称。
```shell
mysqldump -u root -p --all-databases > C:\all.sql
```
执行完后，可以在`C:\`下面看到名为`all.sql`的文件，这个文件中存储着所有数据库的信息。
## 恢复数据库（mysql命令）
在 MySQL 中，可以使用`mysql`命令来恢复备份的数据。`mysql`命令可以执行备份文件中的`CREATE`语句和`INSERT`语句，也就是说，`mysql`命令可以通过`CREATE`语句来创建数据库和表，通过`INSERT`语句来插入备份的数据。
```shell
mysql -u username -P [dbname] < filename.sql
```
其中：
* `username`表示用户名称；
* `dbname`表示数据库名称，该参数是可选参数。如果`filename.sql`文件为`mysqldump`命令创建的包含创建数据库语句的文件，则执行时不需要指定数据库名。如果指定的数据库名不存在将会报错；
* `filename.sql`表示备份文件的名称。

注意：`mysql`命令和`mysqldump`命令一样，都直接在命令行（`cmd`）窗口下执行。
```shell
mysql -u root -p < C:\all.sql
```
执行完后，MySQL 数据库就已经恢复了`all.sql`文件中的所有数据库。

注意：如果使用`--all-databases`参数备份了所有的数据库，那么恢复时不需要指定数据库。因为，其对应的`sql`文件中含有`CREATE DATABASE`语句，可以通过该语句创建数据库。创建数据库之后，可以执行`sql`文件中的`USE`语句选择数据库，然后在数据库中创建表并且插入记录。
## 使用SELECTI...INTO OUTFILE导出表数据
在 MySQL 中，可以使用`SELECTI...INTO OUTFILE`语句将表的内容导出成一个文本文件。
```shell
SELECT 列名 FROM table [WHERE 语句] INTO OUTFILE '目标文件'[OPTIONS]
```
该语句用`SELECT`来查询所需要的数据，用`INTO OUTFILE`来导出数据。其中，目标文件用来指定将查询的记录导出到哪个文件。这里需要注意的是，目标文件不能是一个已经存在的文件。

`[OPTIONS]`为可选参数选项，`OPTIONS`部分的语法包括`FIELDS`和`LINES`子句，其常用的取值有：
* `FIELDS TERMINATED BY '字符串'`：设置字符串为字段之间的分隔符，可以为单个或多个字符，默认情况下为制表符`\t`。
* `FIELDS [OPTIONALLY] ENCLOSED BY '字符'`：设置字符来括上`CHAR、VARCHAR`和`TEXT`等字符型字段。如果使用了`OPTIONALLY`则只能用来括上`CHAR`和`VARCHAR`等字符型字段。
* `FIELDS ESCAPED BY '字符'`：设置如何写入或读取特殊字符，只能为单个字符，即设置转义字符，默认值为‘\’。
* `LINES STARTING BY '字符串'`：设置每行开头的字符，可以为单个或多个字符，默认情况下不使用任何字符。
* `LINES TERMINATED BY '字符串'`：设置每行结尾的字符，可以为单个或多个字符，默认值为`\n`。

注意：`FIELDS`和`LINES`两个子句都是自选的，但是如果两个都被指定了，`FIELDS`必须位于`LINES`的前面。

下面使用 SELECT...INTO OUTFILE 语句来导出 test 数据库中的 person 表中的记录。SQL 语句和运行结果如下：
```shell
mysql> SELECT * FROM test.person INTO OUTFILE 'C://ProgramData/MySQL/MySQL Server 5.7/Uploads/person.txt';
Query OK, 5 rows affected (0.05 sec)
```
然后根据导出的路径找到`person.txt`文件，文件内容如下：
```
1    Java 12
2    MySQL     13
3    C      15
4    C++  22
5    Python     18
```
导出`person`表数据成功。

注意：导出时可能会出现下面的错误：
```
The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
```
这是因为 MySQL 限制了数据的导出路径。MySQL 导入导出文件只能在`secure-file-priv`变量的指定路径下的文件才可以导入导出。

有以下 2 种解决办法：
1. 首先使用`show variables like '%secure%';`语句查看`secure-file-priv`变量配置。
```shell
mysql> show variables like '%secure%' \G
	 *************************** 1. row ***************************
	 Variable_name: require_secure_transport
	 Value: OFF
	 *************************** 2. row ***************************
	 Variable_name: secure_auth
	 Value: ON
	 *************************** 3. row ***************************
	 Variable_name: secure_file_priv
	 Value: C:\ProgramData\MySQL\MySQL Server 5.7\Uploads\
	 3 rows in set, 1 warning (0.04 sec)
```
`secure_file_priv`的值指定的是 MySQL 导入导出文件的路径。将 SQL 语句中的导出文件路径修改为该变量的指定路径，再执行导入导出操作即可。也可以在`my.ini`配置文件中修改`secure-file-priv`的值，然后重启服务即可。
2. 如果`secure_file_priv`值为`NULL`，则为禁止导出，可以在 MySQL 安装路径下的`my.ini`文件中添加`secure_file_priv=`设置路径语句，然后重启服务即可。 

使用`SELECT...INTO OUTFILE`语句将`test`数据库中的`person`表中的记录导出到文本文件，使用`FIELDS`选项和`LINES`选项，要求字段之间用、隔开，字符型数据用双引号括起来。每条记录以-开头。SQL 语句如下：
```shell
SELECT * FROM test.person INTO OUTFILE 'C:/person.txt'
	 FIELDS TERMINATED BY '\、' OPTIONALLY ENCLOSED BY '\"' LINES STARTING BY '\-'
TERMINATED BY '\r\n';
```
其中：
* `FIELDS TERMINATED BY '、’`：表示字段之间用、分隔；
* `ENCLOSED BY '\"'`：表示每个字段都用双引号括起来；
* `LINES STARTING BY '\-'`：表示每行以-开头；
* `TERMINATED BY '\r\n'`表示每行以回车换行符结尾，保证每一条记录占一行。

`person.txt` 文件内容如下：
```text
-1、"Java"、12
-2、"MySQL"、13
-3、"C"、15
-4、"C++"、22
-5、"Python"、18
```
可以看到，每条记录都以-开头，每个数据之间以都以、隔开，所有的字段值都被双引号包括。
## 数据库恢复（LOAD DATA）
可使用`LOAD DATA…INFILE`语句来恢复先前备份的数据。

将之前导出的数据备份文件`file.txt`导入数据库`test_db`的表`tb_students_copy`中，其中`tb_students_copy`的表结构和`tb_students_info`相同。

首先创建表`tb_students_copy`，输入的 SQL 语句和执行结果如下所示。
```shell
mysql> CREATE TABLE tb_students_copy
-> LIKE tb_students_info;
Query OK, 0 rows affected (0.52 sec)
mysql> SELECT * FROM tb_students_copy;
Empty set (0.00 sec)
```
导入数据与查询表`tb_students_copy`的过程如下所示。
```shell
mysql> LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 5.7/
Uploads/file.txt'
-> INTO TABLE test_db.tb_students_copy
-> FIELDS TERMINATED BY ','
-> OPTIONALLY ENCLOSED BY '"'
-> LINES TERMINATED BY '?';
Query OK, 10 rows affected (0.14 sec)
Records: 10  Deleted: 0  Skipped: 0  Warnings: 0

mysql> SELECT * FROM test_db.tb_students_copy;
+----+--------+---------+------+------+--------+------------+
| id | name   | dept_id | age  | sex  | height | login_date |
+----+--------+---------+------+------+--------+------------+
|  1 | Dany   |       1 |   25 | F    |    160 | 2015-09-10 |
|  2 | Green  |       3 |   23 | F    |    158 | 2016-10-22 |
|  3 | Henry  |       2 |   23 | M    |    185 | 2015-05-31 |
|  4 | Jane   |       1 |   22 | F    |    162 | 2016-12-20 |
|  5 | Jim    |       1 |   24 | M    |    175 | 2016-01-15 |
|  6 | John   |       2 |   21 | M    |    172 | 2015-11-11 |
|  7 | Lily   |       6 |   22 | F    |    165 | 2016-02-26 |
|  8 | Susan  |       4 |   23 | F    |    170 | 2015-10-01 |
|  9 | Thomas |       3 |   22 | M    |    178 | 2016-06-07 |
| 10 | Tom    |       4 |   23 | M    |    165 | 2016-08-05 |
+----+--------+---------+------+------+--------+------------+
10 rows in set (0.00 sec)
```
