---
index: false
---

## 本地命令行登录时报错
```shell
[root@localhost ~]# mysql -uroot -p
Enter password:
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)
```
查看`/etc/my.cnf`配置文件
```shell
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

...
```
看到`sock`文件所在路径，然后在此路径下新建文件：
```shell
[root@localhost ~]# cd /var/lib/mysql
[root@localhost mysql]# touch mysql.sock
[root@localhost mysql]# chmod 777 /var/lib/mysql/mysql.sock
[root@localhost mysql]# systemctl restart mysqld
```
