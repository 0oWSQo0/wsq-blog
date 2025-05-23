import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as l}from"./app-BAoNGAQX.js";const t="/wsq-blog/assets/eth-trunk-1-DrLn-_Vp.png",p="/wsq-blog/assets/eth-trunk-2-BW4mBJgF.png",o="/wsq-blog/assets/eth-trunk-3-B3gVjWWu.png",c="/wsq-blog/assets/eth-trunk-4-BWmB6xKS.png",r={};function i(F,s){return l(),a("div",null,s[0]||(s[0]=[e('<p>在一个网络中，某些关键链路承载的流量可能非常大，链路的负载可能会很高，带宽就会成为数据传输的瓶颈。如果增加带宽，那就需要增加硬件投入，例如将链路从千兆电口换成万兆光纤接口，这就不得不增加成本。另一个问题是单点故障的问题，一旦这根链路发生故障，那么不可避免的将影响到网络的可达性。</p><p>以太网链路聚合技术（<code>Link Aggregation</code>）是一种通用的以太网技术。通过该技术，我们能够将多条以太网链路进行“捆绑”，捆绑之后的这些物理链路就形成了逻辑上的一条新的链路（<code>Eth-Trunk</code>），这条聚合链路不仅仅在带宽上成倍的增加，还同时提供了负载均衡及链路冗余。</p><p>有人可能会问，为啥要那么麻烦，交换机之间多连几根线不就完了么？多连几根线实际上就多创造了几个环路，这时由于生成树的作用，必然会阻塞掉几个端口，如此一来仍然只有一条链路在转发数据，还是达不到我们的预期。但是使用链路聚合功能，则可将这几根链路捆绑成逻辑上的一条，交换机会将捆绑后的这根聚合链路当做一条链路来对待，自然也就不存在环路的问题了。</p><figure><img src="'+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图中，两台交换机的<code>GE0/0/1</code>到<code>GE0/0/2</code>接口两两对接，如果在 SW1 及 SW2 上分别将自己的<code>GE0/0/1</code>到<code>GE0/0/2</code>接口进行捆绑，则会产生出一个聚合接口，也就是<code>Eth-trunk</code>接口。</p><p>链路聚合技术能够部署在交换机之间、防火墙之间、交换机与防火墙之间、交换机与特定的服务器之间等等。</p><p>华为交换机上的<code>Eth-trunk</code>支持两种工作方式：手工负载分担（<code>Manual load-balance</code>）及 LACP（<code>link Aggregation Control Protocol</code>）。</p><h2 id="手工负载分担" tabindex="-1"><a class="header-anchor" href="#手工负载分担"><span>手工负载分担</span></a></h2><p>手工负载分担方式允许在聚合组中手工加入多个成员接口，并且所有的接口均处于转发状态，分担负载的流量。在这种模式下，<code>Eth-Trunk</code>的创建、成员接口的加入都需要手工配置完成，没有 LACP 协议报文的参与。手工负载分担模式通常用在对端设备不支持 LACP 协议的情况下。</p><h3 id="基础配置命令" tabindex="-1"><a class="header-anchor" href="#基础配置命令"><span>基础配置命令</span></a></h3><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 创建一个聚合接口Eth-Trunk</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW]interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#BDC4CC;"># 将聚合接口的工作方式设置为手工负载分担方式</span></span>
<span class="line"><span style="color:#BDC4CC;"># 聚合链路两端的设备需使用相同的工作方式</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW-Eth-Trunk1]mode manual load-balance</span></span>
<span class="line"><span style="color:#BDC4CC;"># 添加物理成员接口GE0/0/1、GE0/0/2及GE0/0/3添加到Eth-Trunk 1中</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW]interface GigabitEthernet0/0/1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW-GigabitEthernet0/0/1]eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW]interface GigabitEthernet0/0/2</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW-GigabitEthernet0/0/2]eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW]interface GigabitEthernet0/0/3</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW-GigabitEthernet0/0/3]eth-trunk 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># （可选）配置Eth-trunk成员链路的负载分担模式</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW-Eth-Trunk1]load-balance </span><span style="color:#FF9492;">?</span></span>
<span class="line"><span style="color:#FFB757;">  dst-ip</span><span style="color:#ADDCFF;">       According</span><span style="color:#ADDCFF;"> to</span><span style="color:#ADDCFF;"> destination</span><span style="color:#ADDCFF;"> IP</span><span style="color:#ADDCFF;"> hash</span><span style="color:#ADDCFF;"> arithmetic</span></span>
<span class="line"><span style="color:#FFB757;">  dst-mac</span><span style="color:#ADDCFF;">      According</span><span style="color:#ADDCFF;"> to</span><span style="color:#ADDCFF;"> destination</span><span style="color:#ADDCFF;"> MAC</span><span style="color:#ADDCFF;"> hash</span><span style="color:#ADDCFF;"> arithmetic</span></span>
<span class="line"><span style="color:#FFB757;">  src-dst-ip</span><span style="color:#ADDCFF;">   According</span><span style="color:#ADDCFF;"> to</span><span style="color:#ADDCFF;"> source/destination</span><span style="color:#ADDCFF;"> IP</span><span style="color:#ADDCFF;"> hash</span><span style="color:#ADDCFF;"> arithmetic</span></span>
<span class="line"><span style="color:#FFB757;">  src-dst-mac</span><span style="color:#ADDCFF;">  According</span><span style="color:#ADDCFF;"> to</span><span style="color:#ADDCFF;"> source/destination</span><span style="color:#ADDCFF;"> MAC</span><span style="color:#ADDCFF;"> hash</span><span style="color:#ADDCFF;"> arithmetic</span></span>
<span class="line"><span style="color:#FFB757;">  src-ip</span><span style="color:#ADDCFF;">       According</span><span style="color:#ADDCFF;"> to</span><span style="color:#ADDCFF;"> source</span><span style="color:#ADDCFF;"> IP</span><span style="color:#ADDCFF;"> hash</span><span style="color:#ADDCFF;"> arithmetic</span></span>
<span class="line"><span style="color:#FFB757;">  src-mac</span><span style="color:#ADDCFF;">      According</span><span style="color:#ADDCFF;"> to</span><span style="color:#ADDCFF;"> source</span><span style="color:#ADDCFF;"> MAC</span><span style="color:#ADDCFF;"> hash</span><span style="color:#ADDCFF;"> arithmetic</span></span>
<span class="line"><span style="color:#BDC4CC;"># （可选）为保证Eth-Trunk接口的状态和带宽，可以设置活动接口数的阈值（缺省为1），以减小成员链路的状态变化带来的影响。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 设置活动接口数下限阈值是为了保证最小带宽，当前活动链路数目小于下限阈值时，Eth-Trunk接口的状态转为Down：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW-Eth-Trunk1]least active-linknumber </span><span style="color:#FF9492;">?</span></span>
<span class="line"><span style="color:#FFB757;">  INTEGER</span><span style="color:#F0F3F6;">&lt;1-8&gt;  </span><span style="color:#ADDCFF;">The</span><span style="color:#ADDCFF;"> data</span><span style="color:#ADDCFF;"> of</span><span style="color:#ADDCFF;"> least</span><span style="color:#ADDCFF;"> active-linknumber</span></span></code></pre></div><h2 id="lacp" tabindex="-1"><a class="header-anchor" href="#lacp"><span>LACP</span></a></h2><p>LACP 方式是一种利用 LACP 协议进行聚合参数协商、确定活动接口和非活动接口的链路聚合方式。该模式下，需手工创建<code>Eth-Trunk</code>，手工加入<code>Eth-Trunk</code>成员接口，但是，由 LACP 协议协商确定活动接口和非活动接口。</p><p>LACP 模式也称为 M∶N 模式。这种方式同时可以实现链路负载分担和链路冗余备份的双重功能。在链路聚合组中 M 条链路处于活动状态，这些链路负责转发数据并进行负载分担，另外 N 条链路处于非活动状态作为备份链路，不转发数据。当 M 条链路中有链路出现故障时，系统会从 N 条备份链路中选择优先级最高的接替出现故障的链路，同时这条替换故障链路的备份链路状态变为活动状态开始转发数据。</p><p>LACP 模式与手工负载分担模式的主要区别为：LACP 模式有备份链路，而手工负载分担模式所有成员接口均处于转发状态，分担负载流量。此外，LACP 模式下，交换机之间会交互 LACP 报文。</p><p>LACP 模式中有一个主动、被动端的概念。设备 LACP 优先级较高（值越小越优）的一端为主动端，设备 LACP 优先级较低的一端为被动端。如果两端设备的 LACP 优先级一样时，则 MAC 地址小的胜出。</p><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图中，SwitchA 及 SwitchB 之间部署了<code>Eth-Trunk</code>，该<code>Eth-Trunk</code>中包含三条直连链路，并且采用的是 LACP 方式。两者会交互 LACP 报文使得聚合链路能够协商建立。A 和 B 会比较两者的设备 LACP 优先级，值最小的胜出成为主动端，这里假设 A 胜出。从图中我们看到 A 选择了上面两条链路作为活动链路，而 B 选择了下面两条链路，由于 A 是主动端，因此最终 AB 之间建立起来的聚合链路中的活动链路由 A 来确定，也就是上面两条链路成为活动链路。</p><h3 id="基础配置命令-1" tabindex="-1"><a class="header-anchor" href="#基础配置命令-1"><span>基础配置命令</span></a></h3><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 创建Eth-Trunk，并将工作方式修改为LACP</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei]interface eth-trunk 1</span></span>
<span class="line"><span style="color:#BDC4CC;"># 缺省情况下，Eth-Trunk的工作模式为手工负载分担方式</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei]mode lacp-static</span></span>
<span class="line"><span style="color:#BDC4CC;"># 添加成员接口到Eth-Trunk中（根据实际情况添加）</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei]interface GigabitEthernet0/0/1</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-GigabitEthernet0/0/1]eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei]interface GigabitEthernet0/0/2</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-GigabitEthernet0/0/2]eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei]interface GigabitEthernet0/0/3</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-GigabitEthernet0/0/3]eth-trunk 1</span></span>
<span class="line"><span style="color:#BDC4CC;">#（可选）配置Eth-trunk成员链路的负载分担模式</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-Eth-Trunk1]load-balance </span><span style="color:#FF9492;">?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">#（可选）配置设备LACP优先级</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei]lacp priority </span><span style="color:#FF9492;">?</span></span>
<span class="line"><span style="color:#BDC4CC;"># 系统LACP优先级值越小优先级越高，缺省情况下，系统LACP优先级为 32768。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 在两端设备中选择系统 LACP 优先级较小一端作为主动端，如果系统 LACP 优先级相同则选择MAC地址较小的一端作为主动端。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">#（可选）配置接口LACP优先级</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-GigabitEthernet0/0/1]lacp priority </span><span style="color:#FF9492;">?</span></span>
<span class="line"><span style="color:#BDC4CC;"># 缺省情况下，接口的LACP优先级是 32768。取值越小，表明接口的LACP优先级越高。优先级越高的接口越有可能成为活动的成员接口。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">#（可选）配置活动接口数上限阈值</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-Eth-Trunk1]max active-linknumber ？</span></span>
<span class="line"><span style="color:#BDC4CC;"># 配置链路聚合活动接口数上限阈值，缺省情况下，活动接口数上限阈值为8。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 配置LACP模式活动接口数目上限阈值可以控制Eth-Trunk中活动接口的最大数M，剩余的成员接口处于备份状态。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">#（可选）配置活动接口数下限阈值</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-Eth-Trunk1]least active-linknumber ？</span></span>
<span class="line"><span style="color:#BDC4CC;"># 配置链路聚合活动接口数下限阈值，缺省情况下，活动接口数下限阈值为1。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 配置LACP模式活动接口数目下限阈值可以决定Eth-Trunk中活动接口数的最小值，如果静态模式下活动接口数目小于该值，</span></span>
<span class="line"><span style="color:#BDC4CC;"># Eth-Trunk的接口状态将变为DOWN的状态。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;">#（可选）使能LACP抢占并配置抢占等待时间</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-Eth-Trunk1]lacp preempt enable</span></span>
<span class="line"><span style="color:#F0F3F6;">[Huawei-Eth-Trunk1]lacp preempt delay ？</span></span>
<span class="line"><span style="color:#BDC4CC;"># 缺省情况下，LACP抢占功能处于禁止状态。缺省情况下，LACP抢占等待时间为30秒。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 使能LACP抢占功能可以保持接口LACP优先级最高的接口为活动接口。例如：当一条高优先级的接口因故障切换为非活动状</span></span>
<span class="line"><span style="color:#BDC4CC;"># 态而后又恢复时，如果使能了抢占，则高优先级接口将重新成为活动接口；如果未使能抢占，该接口不能重新成为活动接口。</span></span></code></pre></div><h2 id="基础实验" tabindex="-1"><a class="header-anchor" href="#基础实验"><span>基础实验</span></a></h2><h3 id="手工负载分担模式" tabindex="-1"><a class="header-anchor" href="#手工负载分担模式"><span>手工负载分担模式</span></a></h3><p><img src="`+o+`" alt="" loading="lazy"><br> SW1 及 SW2 通过<code>GE0/0/23</code>及 24 口互联，配置<code>Eth-trunk</code>将这两条链路进行捆绑。捆绑后的链路配置为<code>Trunk</code>模式，使得两台交换机下相同 VLAN 内的用户能够互访，也就是 PC1 与 PC3 能够互访；PC2 与 PC4 也能够互访。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[SW1] vlan batch 10 20</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface GigabitEthernet 0/0/1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/1] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/1] port default vlan 10</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface GigabitEthernet 0/0/2</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/2] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/2] port default vlan 20</span></span>
<span class="line"><span style="color:#BDC4CC;"># 创建聚合接口eth-trunk1，将eth-trunk设置为手工负载均衡方式，在该模式中被聚合的链路都将会转发数据：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] mode manual load-balance</span></span>
<span class="line"><span style="color:#BDC4CC;"># 将接口GE0/0/23及GE0/0/24添加到Eth-trunk1中：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface GigabitEthernet 0/0/23</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/23] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface GigabitEthernet 0/0/24</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/24] eth-trunk 1</span></span>
<span class="line"><span style="color:#BDC4CC;"># 由于eth-trunk1聚合接口需要承载多个VLAN的二层流量，因此需配置为trunk类型。</span></span>
<span class="line"><span style="color:#BDC4CC;"># 注意一旦聚合接口配置完成后，我们的针对该逻辑接口的相关配置就在interface eth-trunk中进行，</span></span>
<span class="line"><span style="color:#BDC4CC;"># 也就是在产生的聚合接口中完成，而不是在GE0/0/23或GE0/0/24口的接口中进行：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] port link-type trunk</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] port trunk allow-pass vlan 10 20</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[SW2] vlan batch 10 20</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface GigabitEthernet 0/0/1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/1] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/1] port default vlan 10</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface GigabitEthernet 0/0/2</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/2] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/2] port default vlan 20</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/2] quit</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] mode manual load-balance</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] quit</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface GigabitEthernet 0/0/23</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/23] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface GigabitEthernet 0/0/24</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/24] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/24] quit</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] port link-type trunk</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] port trunk allow-pass vlan 10 20</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[SW1]display eth-trunk 1</span></span>
<span class="line"><span style="color:#FFB757;">Eth-Trunk1</span><span style="color:#FFB757;">&#39;s state information is:</span></span>
<span class="line"><span style="color:#FFB757;">WorkingMode: NORMAL         Hash arithmetic: According to SIP-XOR-DIP         </span></span>
<span class="line"><span style="color:#FFB757;">Least Active-linknumber: 1  Max Bandwidth-affected-linknumber: 8              </span></span>
<span class="line"><span style="color:#FFB757;">Operate status: up          Number Of Up Port In Trunk: 2                     </span></span>
<span class="line"><span style="color:#FFB757;">--------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#FFB757;">PortName                      Status      Weight </span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/23         Up          1      </span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/24         Up          1</span></span></code></pre></div><h3 id="lacp方式" tabindex="-1"><a class="header-anchor" href="#lacp方式"><span>LACP方式</span></a></h3><figure><img src="`+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>SW1 及 SW2 的<code>GE0/0/22</code>到<code>GE0/0/24</code>口分别互联，将这三条链路捆绑为<code>Eth-Trunk</code>，使用 LACP 方式，SW1 为主动端，在该聚合链路中，两条链路为活动链路，其余一条做备份。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[SW1] vlan batch 10 20</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface gigabitEthernet 0/0/1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/1] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/1] port default vlan 10</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface gigabitEthernet 0/0/2</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/2] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/2] port default vlan 20</span></span>
<span class="line"><span style="color:#BDC4CC;">#创建聚合链路eth-trunk1，将eth-trunk设置为LACP模式，将最大活跃链路数量设置为2：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] mode lacp-static</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] max active-linknumber 2</span></span>
<span class="line"><span style="color:#BDC4CC;">#将接口GE0/0/22、GE0/0/23及GE0/0/24添加到Eth-trunk1中：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface gigabitEthernet 0/0/22</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/22] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface gigabitEthernet 0/0/23</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/23] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface gigabitEthernet 0/0/24</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-GigabitEthernet0/0/24] eth-trunk 1</span></span>
<span class="line"><span style="color:#BDC4CC;">#将SW1的设备LACP优先级设置为1，使得其成为主动端：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] lacp priority 1</span></span>
<span class="line"><span style="color:#BDC4CC;">#将聚合接口Eth-trunk1配置为trunk类型，并且放通VLAN10及VLAN20：</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] port link-type trunk</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW1-Eth-Trunk1] port trunk allow-pass vlan 10 20</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[SW2] vlan batch 10 20</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface gigabitEthernet 0/0/1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/1] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/1] port default vlan 10</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface gigabitEthernet 0/0/2</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/2] port link-type access</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/2] port default vlan 20</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/2] quit</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] mode manual lacp-static</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] quit</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface gigabitEthernet 0/0/22</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/22] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface gigabitEthernet 0/0/23</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/23] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface gigabitEthernet 0/0/24</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/24] eth-trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-GigabitEthernet0/0/24] quit</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2] interface Eth-Trunk 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] port link-type trunk</span></span>
<span class="line"><span style="color:#F0F3F6;">[SW2-Eth-Trunk1] port trunk allow-pass vlan 10 20</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[SW1]display eth-trunk 1</span></span>
<span class="line"><span style="color:#FFB757;">Eth-Trunk1</span><span style="color:#FFB757;">&#39;s state information is:</span></span>
<span class="line"><span style="color:#FFB757;">Local:</span></span>
<span class="line"><span style="color:#FFB757;">LAG ID: 1                   WorkingMode: STATIC                               </span></span>
<span class="line"><span style="color:#FFB757;">Preempt Delay: Disabled     Hash arithmetic: According to SIP-XOR-DIP         </span></span>
<span class="line"><span style="color:#FFB757;">System Priority: 1          System ID: 4c1f-cc45-5ec0                         </span></span>
<span class="line"><span style="color:#FFB757;">Least Active-linknumber: 1  Max Active-linknumber: 2                          </span></span>
<span class="line"><span style="color:#FFB757;">Operate status: up          Number Of Up Port In Trunk: 2                     </span></span>
<span class="line"><span style="color:#FFB757;">--------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#FFB757;">ActorPortName          Status   PortType PortPri PortNo PortKey PortState Weight</span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/22  Selected 1GE      32768   23     305     10111100  1     </span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/23  Selected 1GE      32768   24     305     10111100  1     </span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/24  Unselect 1GE      32768   25     305     10100000  1     </span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">Partner:</span></span>
<span class="line"><span style="color:#FFB757;">--------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#FFB757;">ActorPortName          SysPri   SystemID        PortPri PortNo PortKey PortState</span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/22  32768    4c1f-cc2d-77d4  32768   23     305     10111100</span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/23  32768    4c1f-cc2d-77d4  32768   24     305     10111100</span></span>
<span class="line"><span style="color:#FFB757;">GigabitEthernet0/0/24  32768    4c1f-cc2d-77d4  32768   25     305     10100000</span></span></code></pre></div><p>在上述输出中，我们可以看到 SW1 的<code>eth-trunk1</code>聚合接口的状态。<code>Operate status</code>显示整个聚合接口的状态为 UP。而由于我们设置了<code>max active-linknumber 2</code>，因此三个成员接口中，仅有两个接口（两条链路）是活跃的，它们会转发数据，而剩下的接口则作为备份。我们看到<code>GE0/0/22</code>及<code>GE0/0/23</code>是<code>Select</code>状态，因此它们是活跃接口，而<code>GE0/0/24</code>是<code>Unselect</code>状态，则它们是非活跃的备份接口。因为 SW1 是主动端设备，因此由它决定哪些接口是活跃，哪些是非活跃的。</p>`,33)]))}const d=n(r,[["render",i],["__file","链路聚合技术.html.vue"]]),u=JSON.parse('{"path":"/network/%E9%93%BE%E8%B7%AF%E8%81%9A%E5%90%88%E6%8A%80%E6%9C%AF.html","title":"链路聚合技术","lang":"zh-CN","frontmatter":{"title":"链路聚合技术","date":"2025-06-10T00:00:00.000Z","tags":"network","categories":"计算机网络","order":33,"description":"在一个网络中，某些关键链路承载的流量可能非常大，链路的负载可能会很高，带宽就会成为数据传输的瓶颈。如果增加带宽，那就需要增加硬件投入，例如将链路从千兆电口换成万兆光纤接口，这就不得不增加成本。另一个问题是单点故障的问题，一旦这根链路发生故障，那么不可避免的将影响到网络的可达性。 以太网链路聚合技术（Link Aggregation）是一种通用的以太网技...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/network/%E9%93%BE%E8%B7%AF%E8%81%9A%E5%90%88%E6%8A%80%E6%9C%AF.html"}],["meta",{"property":"og:title","content":"链路聚合技术"}],["meta",{"property":"og:description","content":"在一个网络中，某些关键链路承载的流量可能非常大，链路的负载可能会很高，带宽就会成为数据传输的瓶颈。如果增加带宽，那就需要增加硬件投入，例如将链路从千兆电口换成万兆光纤接口，这就不得不增加成本。另一个问题是单点故障的问题，一旦这根链路发生故障，那么不可避免的将影响到网络的可达性。 以太网链路聚合技术（Link Aggregation）是一种通用的以太网技..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-05-23T01:37:34.000Z"}],["meta",{"property":"article:published_time","content":"2025-06-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-05-23T01:37:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"链路聚合技术\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-06-10T00:00:00.000Z\\",\\"dateModified\\":\\"2025-05-23T01:37:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"手工负载分担","slug":"手工负载分担","link":"#手工负载分担","children":[{"level":3,"title":"基础配置命令","slug":"基础配置命令","link":"#基础配置命令","children":[]}]},{"level":2,"title":"LACP","slug":"lacp","link":"#lacp","children":[{"level":3,"title":"基础配置命令","slug":"基础配置命令-1","link":"#基础配置命令-1","children":[]}]},{"level":2,"title":"基础实验","slug":"基础实验","link":"#基础实验","children":[{"level":3,"title":"手工负载分担模式","slug":"手工负载分担模式","link":"#手工负载分担模式","children":[]},{"level":3,"title":"LACP方式","slug":"lacp方式","link":"#lacp方式","children":[]}]}],"git":{"createdTime":1747218945000,"updatedTime":1747964254000,"contributors":[{"name":"WSQ-LK","email":"592786982@qq.com","commits":2}]},"readingTime":{"minutes":10.96,"words":3287},"filePathRelative":"network/链路聚合技术.md","localizedDate":"2025年6月10日","autoDesc":true}');export{d as comp,u as data};
