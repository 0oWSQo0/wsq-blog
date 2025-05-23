import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,d as e,o as l}from"./app-BAoNGAQX.js";const p={};function t(o,s){return l(),n("div",null,s[0]||(s[0]=[e(`<p>在 Redis 的安装目录中有一个名为<code>redis.windows.conf</code>的配置文件，若在 Linux 中则为<code>redis.conf</code>，以 Windows 系统为例。</p><h2 id="查看配置项" tabindex="-1"><a class="header-anchor" href="#查看配置项"><span>查看配置项</span></a></h2><p>可以使用<code>CONFIG</code>命令来查看或者更改 Redis 的配置信息。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">redis</span><span style="color:#ADDCFF;"> 127.0.0.1:637</span><span style="color:#FF9492;">9&gt;</span><span style="color:#ADDCFF;"> CONFIG</span><span style="color:#ADDCFF;"> GET</span><span style="color:#ADDCFF;"> 配置名称</span></span></code></pre></div><p>获取日志等级的配置项：</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">redis</span><span style="color:#ADDCFF;"> 127.0.0.1:637</span><span style="color:#FF9492;">9&gt;</span><span style="color:#ADDCFF;"> CONFIG</span><span style="color:#ADDCFF;"> GET</span><span style="color:#ADDCFF;"> loglevel</span></span></code></pre></div><p>输出结果：</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">1</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;loglevel&quot;</span></span>
<span class="line"><span style="color:#FFB757;">2</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;notice&quot;</span></span></code></pre></div><p>使用<code>*</code>可以查看所有配置项：</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">redis</span><span style="color:#ADDCFF;"> 127.0.0.1:637</span><span style="color:#FF9492;">9&gt;</span><span style="color:#ADDCFF;"> CONFIG</span><span style="color:#ADDCFF;"> GET</span><span style="color:#91CBFF;"> *</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">1</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;dbfilename&quot;</span></span>
<span class="line"><span style="color:#FFB757;">2</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;dump.rdb&quot;</span></span>
<span class="line"><span style="color:#FFB757;">3</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;requirepass&quot;</span></span>
<span class="line"><span style="color:#FFB757;">4</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#FFB757;">5</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;masterauth&quot;</span></span>
<span class="line"><span style="color:#FFB757;">6</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#FFB757;">7</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;cluster-announce-ip&quot;</span></span>
<span class="line"><span style="color:#FFB757;">8</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#FFB757;">9</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;unixsocket&quot;</span></span>
<span class="line"><span style="color:#FFB757;">10</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#FFB757;">11</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;logfile&quot;</span></span>
<span class="line"><span style="color:#FFB757;">12</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#FFB757;">13</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;pidfile&quot;</span></span>
<span class="line"><span style="color:#91CBFF;">...</span></span></code></pre></div><h2 id="更改配置项" tabindex="-1"><a class="header-anchor" href="#更改配置项"><span>更改配置项</span></a></h2><p>如果想要重新设置配置项，需要使用以下命令：</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">redis</span><span style="color:#ADDCFF;"> 127.0.0.1:637</span><span style="color:#FF9492;">9&gt;</span><span style="color:#ADDCFF;"> CONFIG</span><span style="color:#ADDCFF;"> SET</span><span style="color:#ADDCFF;"> 配置项名称</span><span style="color:#ADDCFF;"> 配置项参数值</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">127.0.0.1:6379</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#ADDCFF;">CONFIG</span><span style="color:#ADDCFF;"> SET</span><span style="color:#ADDCFF;"> loglevel</span><span style="color:#ADDCFF;"> &quot;verbose&quot;</span></span>
<span class="line"><span style="color:#FFB757;">OK</span></span>
<span class="line"><span style="color:#FFB757;">127.0.0.1:6379</span><span style="color:#F0F3F6;">&gt; </span><span style="color:#ADDCFF;">CONFIG</span><span style="color:#ADDCFF;"> GET</span><span style="color:#ADDCFF;"> loglevel</span></span>
<span class="line"><span style="color:#FFB757;">1</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;loglevel&quot;</span></span>
<span class="line"><span style="color:#FFB757;">2</span><span style="color:#F0F3F6;">) </span><span style="color:#ADDCFF;">&quot;verbose&quot;</span></span></code></pre></div><p>Redis 的日志级别有以下四种：</p><ul><li><code>debug</code>：会打印出很多信息，适用于开发和测试阶段。</li><li><code>verbose</code>（冗长的）：包含很多不太有用的信息，但比<code>debug</code>简化一些。</li><li><code>notice</code>：适用于生产模式。</li><li><code>warning</code>：警告信息。</li></ul><p>Redis 默认设置为<code>verbose</code>，开发测试阶段可以用<code>debug</code>，生产模式一般选用<code>notice</code>。</p><h2 id="更改配置文件" tabindex="-1"><a class="header-anchor" href="#更改配置文件"><span>更改配置文件</span></a></h2><p>Redis 某些配置信息无法直接通过命令修改，此时就需要修改配置文，比如设置 Redis 允许远程连接的功能。配置文件修改如下：</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>1.注释掉本地IP地址,绑定要访问的外部IP</span></span>
<span class="line"><span>#bind 127.0.0.1 ::1</span></span>
<span class="line"><span>bind 192.168.1.1</span></span>
<span class="line"><span>2.关闭保护模式(把yes改为no)</span></span>
<span class="line"><span>protected-mode no</span></span>
<span class="line"><span>3.重启服务器,windows重启</span></span>
<span class="line"><span>redis-server --service-stop</span></span>
<span class="line"><span>redis-server --service-start</span></span>
<span class="line"><span>Linux重启</span></span>
<span class="line"><span>sudo /etc/init.d/redis-server restart</span></span></code></pre></div><h2 id="配置项说明" tabindex="-1"><a class="header-anchor" href="#配置项说明"><span>配置项说明</span></a></h2><table><thead><tr><th>配置项</th><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>daemonize</td><td>no/yes</td><td>默认为 no，表示 Redis 不是以守护进程的方式运行，通过修改为 yes 启用守护进程</td></tr><tr><td>pidfile</td><td>文件路径</td><td>当 Redis 以守护进程方式运行时，会把进程 pid 写入自定义的文件中</td></tr><tr><td>port</td><td>6379</td><td>指定 Redis 监听端口，默认端口为 6379</td></tr><tr><td>bind</td><td>127.0.0.1</td><td>绑定的主机地址</td></tr><tr><td>timeout</td><td>0</td><td>客户端闲置多长秒后关闭连接，若指定为 0，表示不启用该功能</td></tr><tr><td>loglevel</td><td>notice</td><td>指定日志记录级别，支持四个级别：debug、verbose、notice、warning，默认为 notice</td></tr><tr><td>logfile</td><td>stdout</td><td>日志记录方式，默认为标准输出</td></tr><tr><td>databases</td><td>16</td><td>设置数据库的数量（0-15个）共16个，Redis 默认选择的是 0 库，可以使用 SELECT 命令来选择使用哪个数据库储存数据</td></tr><tr><td>save [seconds] [changes]</td><td>可以同时配置三种模式：<br>save 900 1<br>save 300 10<br>save 60 10000</td><td>表示在规定的时间内，执行了规定次数的写入或修改操作，Redis 就会将数据同步到指定的磁盘文件中。比如 900s 内做了一次更改，Redis 就会自动执行数据同步</td></tr><tr><td>rdbcompression</td><td>yes/no</td><td>当数据存储至本地数据库时是否要压缩数据，默认为 yes</td></tr><tr><td>dbfilename</td><td>dump.rdb</td><td>指定本地存储数据库的文件名，默认为 dump.rdb</td></tr><tr><td>dir</td><td>./</td><td>指定本地数据库存放目录</td></tr><tr><td>slaveof &lt;masterip&gt; &lt;masterport&gt;</td><td>主从复制配置选项</td><td>当本机为 slave 服务时，设置 master 服务的 IP 地址及端口，在 Redis 启动时，它会自动与 master 主机进行数据同步</td></tr><tr><td>requirepass</td><td>foobared 默认关闭</td><td>密码配置项，默认关闭，用于设置 Redis 连接密码。如果配置了连接密码，客户端连接 Redis 时需要通过<code>&lt;password&gt;</code> 密码认证</td></tr><tr><td>maxmemory &lt;bytes&gt;</td><td>最大内存限制配置项</td><td>指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会尝试清除已到期或即将到期的 Key，当此方法处理 后，若仍然到达最大内存设置，将无法再进行写入操作，但可以进行读取操作</td></tr><tr><td>appendfilename</td><td>appendonly.aof</td><td>指定 AOF 持久化时保存数据的文件名，默认为 appendonly.aof</td></tr><tr><td>glueoutputbuf</td><td>yes</td><td>设置向客户端应答时，是否把较小的包合并为一个包发送，默认开启状态</td></tr></tbody></table><h2 id="配置项汇总" tabindex="-1"><a class="header-anchor" href="#配置项汇总"><span>配置项汇总</span></a></h2><h3 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>port 6379  # 监听端口号，默认为6379，如果你设为 0 ，redis 将不在 socket 上监听任何客户端连接。</span></span>
<span class="line"><span>daemonize no #指定redis是否以守护线程的方式启动</span></span>
<span class="line"><span>databases 16 #创建database的数量，默认为0库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>save 900 1 #刷新快照到硬盘中。必须满足下列三个要求之一才会触发，即900秒内至少有1个key发生变化。</span></span>
<span class="line"><span>save 300 10 #在300秒内至少10个key发生变化。</span></span>
<span class="line"><span>save 60 10000 #在60秒之内至少有10000个可以发生变化。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stop-writes-on-bgsave-error yes #后台存储错误并停止写入命令。</span></span>
<span class="line"><span>rdbcompression yes #使用LZF方式压缩rdb文件。如果你想节省一些CPU可设置成&#39;no&#39;</span></span>
<span class="line"><span>rdbchecksum yes #在存储、加载rdb文件时进行校验。</span></span>
<span class="line"><span>dbfilename dump.rdb #设置rdb文件名。</span></span>
<span class="line"><span>dir ./ #设置工作目录，rdb文件会自动存放在该目录。</span></span></code></pre></div><h3 id="主从服务配置" tabindex="-1"><a class="header-anchor" href="#主从服务配置"><span>主从服务配置</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>slaveof &lt;masterip&gt; &lt;masterport&gt; #将本机设为某台机器的从服务器</span></span>
<span class="line"><span>masterauth &lt;master-password&gt; #连接主服务器的密码</span></span>
<span class="line"><span>slave-serve-stale-data yes # 当主机和从机断开时或这正处于在复制过程中，是否让从服务器是应答请求</span></span>
<span class="line"><span>slave-read-only yes #设置从服务器为只读模式</span></span>
<span class="line"><span>repl-diskless-sync no  #是否同时向多个从服务器节点同时发数据</span></span>
<span class="line"><span>repl-diskless-sync-delay 5 #发送数据的延迟时间</span></span>
<span class="line"><span>repl-ping-slave-period 10 #主节点默认每隔 10 秒对从节点发送 ping 命令</span></span>
<span class="line"><span>repl-timeout 60 #主从服务器超时时间(超时认为断线了),要比period设置的时间大</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#如果master不能再正常工作，那么会在多个slave中，选择优先值最小的一个slave提升为master，</span></span>
<span class="line"><span>#优先值为0表示不能提升为master，一般在哨兵sentinel环境中使用。</span></span>
<span class="line"><span>slave-priority 100 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#在slave和master同步后，后续的同步是否设置成TCP_NODELAY，设置成no，则redis master会立即发送同步数据，没有延迟</span></span>
<span class="line"><span>repl-disable-tcp-nodelay no </span></span>
<span class="line"><span>min-slaves-to-write 3 #主节点仅允许当能够通信的从节点数量大于等于此处的值时，才允许接受写操作；</span></span>
<span class="line"><span>min-slaves-max-lag 10 #从节点延迟时长超出此处指定的时间时，主节点会拒绝写入操作；</span></span></code></pre></div><h3 id="安全配置" tabindex="-1"><a class="header-anchor" href="#安全配置"><span>安全配置</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>requirepass foobared # 用来配置密码</span></span>
<span class="line"><span>rename-command CONFIG b84 #在公共环境下重命名部分敏感命令 如config、flushall等</span></span></code></pre></div><h3 id="限制配置" tabindex="-1"><a class="header-anchor" href="#限制配置"><span>限制配置</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>maxclients 10000 #最大连接数</span></span>
<span class="line"><span>maxmemory &lt;bytes&gt; #最大使用内存</span></span>
<span class="line"><span>maxmemory-policy volatile-lru #内存到极限后的处理策略</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#内存处理策略，用于在超出内存限制时，删除一些key</span></span>
<span class="line"><span>volatile-lru # LRU算法删除过期key</span></span>
<span class="line"><span>allkeys-lru # LRU算法删除key(不区分过不过期)</span></span>
<span class="line"><span>volatile-random # 随机删除过期key</span></span>
<span class="line"><span>allkeys-random # 随机删除key(不区分过不过期)</span></span>
<span class="line"><span>volatile-ttl # 删除快过期的key</span></span>
<span class="line"><span>noeviction # 禁止删除key,这如果内存不足，会直接返回错误。默认配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#用于提高LRU/TTL算法的精准度，在自动清理内存时，指定的数字越大，CPU消耗就越多，默认为5。</span></span>
<span class="line"><span>maxmemory-samples 5</span></span></code></pre></div><h3 id="aof日志模式" tabindex="-1"><a class="header-anchor" href="#aof日志模式"><span>AOF日志模式</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>appendonly no #是否启用日志模式</span></span>
<span class="line"><span>appendfsync no # 有系统决定何时写,统一写,速度快</span></span>
<span class="line"><span>appendfsync always # 系统不缓冲,一直写,但是慢,这种方式几乎不丢失数据</span></span>
<span class="line"><span>appendfsync everysec #每秒写1次</span></span>
<span class="line"><span></span></span>
<span class="line"><span>no-appendfsync-on-rewrite no #相当于将appendfsync设置为no，不存在磁盘操作，只是将数据写入了缓冲区，写入速度非常快</span></span>
<span class="line"><span>auto-AOF-rewrite-percentage 100 #触发aof重写操作，要求本次文件大小比上次重写时要增加1（100%）倍</span></span>
<span class="line"><span>auto-AOF-rewrite-min-size 64mb #触发aof重写操作，至少要达到的aof文件大小</span></span></code></pre></div><h3 id="慢查询配置" tabindex="-1"><a class="header-anchor" href="#慢查询配置"><span>慢查询配置</span></a></h3><p>Redis slowlog 是一个记录 Redis 执行查询命令时所耗费时间的日志系统，它仅记录执行一个查询命令所耗费的时间，不记录其他内容。</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>slowlog-log-slower-than 10000 #记录响应时间大于10000微秒的慢查询</span></span>
<span class="line"><span>slowlog-max-len 128 # 最多记录128条</span></span></code></pre></div><h3 id="服务端命令" tabindex="-1"><a class="header-anchor" href="#服务端命令"><span>服务端命令</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>time #返回时间戳+微秒</span></span>
<span class="line"><span>dbsize #返回key的数量</span></span>
<span class="line"><span>bgrewriteaof #重写aof</span></span>
<span class="line"><span>bgsave #后台开启子进程来执行数据持久化</span></span>
<span class="line"><span>save #以阻塞的方式对数据进行持久化</span></span>
<span class="line"><span>lastsave #返回最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>slaveof host port #设置为host:port的从服务器(数据清空,复制新的主服务器内容)</span></span>
<span class="line"><span>slaveof no one   #变成主服务器(原数据不丢失,一般用于主服失败后)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>flushdb 清空当前数据库的所有数据</span></span>
<span class="line"><span>flushall 清空所有数据库的所有数据</span></span>
<span class="line"><span></span></span>
<span class="line"><span>shutdown [save/nosave] 关闭服务器,保存数据,修改AOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>slowlog get 获取慢查询日志</span></span>
<span class="line"><span>slowlog len 获取慢查询日志条数</span></span>
<span class="line"><span>slowlog reset 清空慢查询</span></span></code></pre></div><h3 id="客户端命令" tabindex="-1"><a class="header-anchor" href="#客户端命令"><span>客户端命令</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>#以易于理解和阅读的方式返回Redis服务器的各种信息、统计数值</span></span>
<span class="line"><span>info [server|clients|memory|stats|]</span></span>
<span class="line"><span>config get [配置项]    #获取配置文件选项</span></span>
<span class="line"><span>config set [配置项] [参数值] #重新设置配置文件选项和对应参数</span></span>
<span class="line"><span>config rewrite  #对启动Redis服务器时所指定的配置文件进行改写</span></span>
<span class="line"><span>config resetstat #重置info命令中的某些统计信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>debug object key #调试选项,看一个key的情况</span></span>
<span class="line"><span>debug segfault #该命令能够让服务器崩溃</span></span>
<span class="line"><span>object key (refcount|encoding|idletime)</span></span>
<span class="line"><span>monitor #调试用，打开控制台,观察命令</span></span>
<span class="line"><span>client list #列出所有连接</span></span>
<span class="line"><span>client kill #杀死某个连接 CLIENT KILL 127.0.0.1:6379</span></span>
<span class="line"><span>client getname #获取连接的名称 默认nil</span></span>
<span class="line"><span>client setname  #设置连接名称,便于调试</span></span></code></pre></div><h3 id="连接命令" tabindex="-1"><a class="header-anchor" href="#连接命令"><span>连接命令</span></a></h3><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>auth 密码  #验证登录密码(如果设置了密码)</span></span>
<span class="line"><span>ping      #测试服务器是否可用</span></span>
<span class="line"><span>echo &quot;hello www.biancheng.net&quot; #测试服务器是否正常交互</span></span>
<span class="line"><span>select 0/1/2/3/4...  #选择数据库0-15</span></span>
<span class="line"><span>quit  #退出连接</span></span></code></pre></div>`,42)]))}const d=a(p,[["render",t],["__file","Redis配置文件.html.vue"]]),r=JSON.parse('{"path":"/sql/redis/Redis%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.html","title":"","lang":"zh-CN","frontmatter":{"description":"在 Redis 的安装目录中有一个名为redis.windows.conf的配置文件，若在 Linux 中则为redis.conf，以 Windows 系统为例。 查看配置项 可以使用CONFIG命令来查看或者更改 Redis 的配置信息。 获取日志等级的配置项： 输出结果： 使用*可以查看所有配置项： 更改配置项 如果想要重新设置配置项，需要使用以下...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/sql/redis/Redis%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.html"}],["meta",{"property":"og:description","content":"在 Redis 的安装目录中有一个名为redis.windows.conf的配置文件，若在 Linux 中则为redis.conf，以 Windows 系统为例。 查看配置项 可以使用CONFIG命令来查看或者更改 Redis 的配置信息。 获取日志等级的配置项： 输出结果： 使用*可以查看所有配置项： 更改配置项 如果想要重新设置配置项，需要使用以下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-27T02:39:10.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-27T02:39:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-27T02:39:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"查看配置项","slug":"查看配置项","link":"#查看配置项","children":[]},{"level":2,"title":"更改配置项","slug":"更改配置项","link":"#更改配置项","children":[]},{"level":2,"title":"更改配置文件","slug":"更改配置文件","link":"#更改配置文件","children":[]},{"level":2,"title":"配置项说明","slug":"配置项说明","link":"#配置项说明","children":[]},{"level":2,"title":"配置项汇总","slug":"配置项汇总","link":"#配置项汇总","children":[{"level":3,"title":"基本配置","slug":"基本配置","link":"#基本配置","children":[]},{"level":3,"title":"主从服务配置","slug":"主从服务配置","link":"#主从服务配置","children":[]},{"level":3,"title":"安全配置","slug":"安全配置","link":"#安全配置","children":[]},{"level":3,"title":"限制配置","slug":"限制配置","link":"#限制配置","children":[]},{"level":3,"title":"AOF日志模式","slug":"aof日志模式","link":"#aof日志模式","children":[]},{"level":3,"title":"慢查询配置","slug":"慢查询配置","link":"#慢查询配置","children":[]},{"level":3,"title":"服务端命令","slug":"服务端命令","link":"#服务端命令","children":[]},{"level":3,"title":"客户端命令","slug":"客户端命令","link":"#客户端命令","children":[]},{"level":3,"title":"连接命令","slug":"连接命令","link":"#连接命令","children":[]}]}],"git":{"createdTime":1745401751000,"updatedTime":1745721550000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":8.36,"words":2509},"filePathRelative":"sql/redis/Redis配置文件.md","localizedDate":"2025年4月23日","autoDesc":true}');export{d as comp,r as data};
