


Redis 是一种键值（`key-value`）型的缓存型数据库，它将数据全部以键值对的形式存储在内存中，并且`key`与`value`一一对应。这里的`key`被形象的称之为密钥，Redis 提供了诸多操作这把“密钥”的命令，从而实现了对存储数据的管理。

可以把`key`看成`value`的变量，通过检索`key`就可以找到对应的`value`值。
## key的类型
`key`的类型对应着`value`的类型，同样也有五种（`string、list、hash、set、zset`）。如果`key`指向的是一个字符串类型的值，那么`key`的类型就是字符串。我们可以通过`TYPE`命令来查看`key`的类型：
```shell
# 字符串
redis> SET weather "sunny"
OK
redis> TYPE weather
string

# 列表
redis> LPUSH book_list "programming in scala"
(integer) 1
redis> TYPE book_list
list

# 集合
redis> SADD pat "dog"
(integer) 1
redis> TYPE pat
set
```
## key的命名规范
`key`的命名需要遵循以下规则：
* `key`取值不可以太长，否则会影响`value`的查找效率，并且浪费内存空间。
* `key`取值也不能过短，否则会使得`key`可读性变差。

在`key`的取值上， Redis 官方建议使用“见名知意”的字符串格式。比如要现在存放一个用户的姓名：
```shell
127.0.0.1:6379> set user:id:01:username XiaoHong
OK
```
上述示例，自定义了`uesr:id:01:username`这个`key`，通过`key`不仅可以知道用户的`id`，还可以知道这个`key`是用来存储用户名字的。注意，这里的`:`只是起到分割符的作用，并不是固定的语法格式。

对于相同数据类型而言，如果对已经存在的`key`重新设置了新的`value`，那么原来的`value`就会被覆盖掉。因此，您可以用这种方法来修改`key`存储的值。
## key过期时间
Redis 允许你为`key`设置一个过期时间（使用`EXPIRE`等命令），也就是“到点自动删除”，这在实际业务中是非常有用的，一是它可以避免使用频率不高的`key`长期存在，从而占用内存资源；二是控制缓存的失效时间。

Redis 会把每个设置了过期时间的`key`存放到一个独立的字典中，并且会定时遍历这个字典来删除到期的`key`。除了定时遍历之外，它还会使用“惰性策略”来删除过期的`key`。所谓“惰性策略”指的是当客户端访问这个`key`的时候，Redis 对`key`的过期时间进行检查，如果过期了就立即删除。Redis 使用两种方式相结合的方法来处理过去的`key`。
## 键命令汇总

| 命令                  | 说明                                               |
|---------------------|--------------------------------------------------|
| DEL key             | 若键存在的情况下，该命令用于删除键                                |
| DUMP key            | 序列化给定 key ，并返回被序列化的值                             |
| EXISTS key          | 检查键是否存在，若存在则返回 1，否则返回 0                          |
| EXPIRE key          | 设置 key 的过期时间，以秒为单位                               |
| EXPIREAT key        | 与 EXPIRE 相似，用于为 key 设置过期时间，不同在于，它的时间参数值采用的是时间戳格式 |
| PEXPIRE key         | 设置 key 的过期，以毫秒为单位                                |
| PEXPIREAT key       | 与 PEXPIRE 相似，用于为 key 设置过期时间，采用以毫秒为单位的时间戳格式       |
| KEYS pattern        | 查找与指定 pattern 匹配的 key                            |
| MOVE key db         | 将当前数据库中的 key 移动至指定的数据库中（默认存储为 0 库，可选 1-15中的任意库）  |
| PERSIST key         | 删除 key 的过期时间，然后 key 将一直存在，不会过期                   |
| PTTL key            | 检查 key 还剩多长时间过期，以毫秒为单位                           |
| TTL key             | 检查 key 还剩多长时间过期，以秒为单位                            |
| RANDOMKEY           | 从当前数据库中随机返回一个 key                                |
| RENAME key newkey   | 修改 key 的名称                                       |
| RENAMENX key newkey | 如果新键名不重复，则将 key 修改为 newkey                       |
| SCAN cursor         | 基于游标的迭代器，用于迭代数据库中存在的所有键，cursor 指的是迭代游标           |
| TYPE key            | 获取 value 的数据类型                                   |

```shell
# DUMP序列化
# 如果 key 不存在时，则返回 nil
127.0.0.1:6379> SET num 12
OK
127.0.0.1:6379> DUMP num
"\x00\xc0\x0c\t\x00\xec\xd8\xa9\x9d\b\x82\xdfd"

# EXPIRE设置过期时间
# key 过期后将自动被删除
127.0.0.1:6379> set www.biancheng.net Python
OK
127.0.0.1:6379> set www.biancheng.net Python EX 60
OK
127.0.0.1:6379> EXPIRE www.biancheng.net 120
(integer) 1

# PEXPIREAT设置过期时间
# 置成功返回 1，若 key 不存在或者不能为其设置过期时间，则返回 0
127.0.0.1:6379> set www.biancheng.net Python
OK
127.0.0.1:6379> PEXPIREAT www.biancheng.net 12000000000
(integer) 1

# KEYS命令查找键
redis 127.0.0.1:6379> SET course1 redis
OK
redis 127.0.0.1:6379> SET course2 php
OK
redis 127.0.0.1:6379> SET course3 python
OK
127.0.0.1:6379> keys course*
1) "course1"
2) "course2"
3) "course3"
#获取所有key
127.0.0.1:6379> keys *
1) "course1"
2) "course2"
3) "course3"
4) "num"

# TTL命令
# 当键没有设置过期时间，表示是永久有效时，TTL 命令返回 -1；当键过期或者被删除时，TTL 命令返回 -2
127.0.0.1:6379> SET www.biancheng.net hello
OK
127.0.0.1:6379> ttl www.biancheng.net
(integer) -1
127.0.0.1:6379> SET user:1 Jack EX 120
OK
127.0.0.1:6379> TTL user:1
(integer) 108
127.0.0.1:6379> DEL user:1
(integer) 1
127.0.0.1:6379> TTL user:1
(integer) -2
```
