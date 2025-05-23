import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,d as l,o as p}from"./app-CRBxQhNH.js";const o="/wsq-blog/assets/1-4NRyJg4p.png",e="/wsq-blog/assets/2-DHuT0XjU.png",t={};function c(F,s){return p(),n("div",null,s[0]||(s[0]=[l('<p><a href="https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#playbook-keywords" target="_blank" rel="noopener noreferrer">PlayBook</a> 剧本是由一个或多个&quot;Play&quot;组成的列表。Play 的主要功能在于将预定义的一组主机，装扮成事先通过 Ansible 中的 Task 定义好的角色。</p><p>从根本上来讲，所谓的 Task 无非是调用 Ansible 的一个<code>module</code>。将多个 Play 组织在一个 PlayBook 中，即可以让它们联合起来按事先编排的机制完成某一任务。</p><p><code>playbook</code>文件是采用 YAML 语言 编写的。通过<code>ansible-playbook</code>命令进行解析，<code>ansbile-playbook</code>命令会根据自上而下的顺序依次执行<code>playbook</code>文件中的内容。</p><h2 id="核心元素" tabindex="-1"><a class="header-anchor" href="#核心元素"><span>核心元素</span></a></h2><table><thead><tr><th>元素</th><th>说明</th></tr></thead><tbody><tr><td>Hosts</td><td>主机组</td></tr><tr><td>Tasks</td><td>任务列表</td></tr><tr><td>Variables</td><td>内置变量或自定义变量在 PlayBook 中调用</td></tr><tr><td>Templates</td><td>模板文件，即使用模板语法的文件，比如配置文件等</td></tr><tr><td>Handlers</td><td>和 notity 结合使用，由特定条件触发的操作，满足条件方才执行，否则不执行</td></tr><tr><td>Tags</td><td>标签，指定某条任务执行，用于选择运行 PlayBook中的部分代码</td></tr></tbody></table><p>PlayBook 翻译过来就是剧本，可以简单理解为使用不同的模块完成一件事情， 具体 PlayBook 组成如下：</p><ul><li>Play：定义的是主机的角色</li><li>Task：定义的是具体执行的任务</li><li>PlayBook：由一个或多个 Play 组成，一个 Play 可以包含多个 Task 任务</li></ul><figure><img src="'+o+`" alt="PlayBook 组成" tabindex="0" loading="lazy"><figcaption>PlayBook 组成</figcaption></figure><h2 id="优势" tabindex="-1"><a class="header-anchor" href="#优势"><span>优势</span></a></h2><ul><li>功能比 ad-hoc 更全</li><li>能很好的控制先后执行顺序，以及依赖关系</li><li>语法展现更加的直观</li><li>ad-hoc 无法持久使用，PlayBook 可以持久使用</li></ul><h2 id="核心组件" tabindex="-1"><a class="header-anchor" href="#核心组件"><span>核心组件</span></a></h2><p>一个 PlayBook 中由多个组件组成，其中所用到的常见组件类型如下：</p><table><thead><tr><th>元素</th><th>说明</th></tr></thead><tbody><tr><td>Hosts</td><td>运行指定任务的目标主机</td></tr><tr><td>Tasks</td><td>任务集，由多个 task 的元素组成的列表实现，每个 task 是一个字典，一个完整的代码块功能需最少元素需包括 name 和 task，一个 name 只能包括一个 task</td></tr><tr><td>Variables</td><td>内置变量或自定义变量 在 PlayBook 中调用</td></tr><tr><td>Templates</td><td>模板，可替换模板文件中的变量并实现一些简单逻辑的文件</td></tr><tr><td>Handlers</td><td>和 notify 结合使用，由特定条件触发的操作，满足条件方才执行，否则不执行</td></tr><tr><td>Tags</td><td>标签 指定某条任务执行，用于选择运行 playbook 中的部分代码</td></tr></tbody></table><h3 id="hosts-组件" tabindex="-1"><a class="header-anchor" href="#hosts-组件"><span>hosts 组件</span></a></h3><p>PlayBook 中的每一个 Play 的目的都是为了让特定主机以某个指定的用户身份执行任务。<code>hosts</code>用于指定要执行指定任务的主机，须事先定义在主机清单中。</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs:appsrvs</span></span></code></pre></div><h3 id="remote-user-组件" tabindex="-1"><a class="header-anchor" href="#remote-user-组件"><span>remote_user 组件</span></a></h3><p>可用于 Host 和 task 中。也可以通过指定其通过<code>sudo</code>的方式在远程主机上执行任务，其可用于<code>play</code>全局或某任务；此外，甚至可以在<code>sudo</code>时使用<code>sudo_user</code>指定<code>sudo</code>时切换的用户。</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#72F088;">remote_user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span><span style="color:#BDC4CC;">            # 方式一</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#72F088;">tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">   - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">test connection</span></span>
<span class="line"><span style="color:#72F088;">     ping</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">       remote_user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">magedu</span><span style="color:#BDC4CC;">    # 方式二</span></span>
<span class="line"><span style="color:#72F088;">       sudo</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">yes</span><span style="color:#BDC4CC;">         		  # 默认 sudo 为 root</span></span>
<span class="line"><span style="color:#72F088;">       sudo_user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">wang</span><span style="color:#BDC4CC;">    			# sudo 为 wang</span></span></code></pre></div><h3 id="task-列表和-action-组件" tabindex="-1"><a class="header-anchor" href="#task-列表和-action-组件"><span>task 列表和 action 组件</span></a></h3><p>Play 的主体部分是<code>task list</code>，<code>task list</code>中有一个或多个<code>task</code>，各个<code>task</code>按次序逐个在<code>hosts</code>中指定的所有主机上执行，即在所有主机上完成第一个<code>task</code>后，再开始第二个<code>task</code>。</p><p><code>task</code>的目的是使用指定的参数执行模块，而在模块参数中可以使用变量。模块执行是幂等的，这意味着多次执行是安全的，因为其结果均一致。</p><p>每个<code>task</code>都应该有其<code>name</code>，用于 PlayBook 的执行结果输出，建议其内容能清晰地描述任务执行步骤。如果未提供<code>name</code>，则<code>action</code>的结果将用于输出。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">action:</span><span style="color:#ADDCFF;"> module</span><span style="color:#ADDCFF;"> arguments</span><span style="color:#BDC4CC;">  # 示例: action: shell wall hello </span></span>
<span class="line"><span style="color:#FFB757;">module:</span><span style="color:#ADDCFF;"> arguments</span><span style="color:#BDC4CC;">         # 建议使用 # 示例: shell: wall hello</span></span></code></pre></div><p>注意： Shell 和 Command 模块后面跟命令，而非 key=value</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] cat hello.yaml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># first yaml file </span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span><span style="color:#BDC4CC;">   # 不收集系统信息, 提高执行效率</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> test</span><span style="color:#ADDCFF;"> network</span><span style="color:#ADDCFF;"> connection</span></span>
<span class="line"><span style="color:#FFB757;">      ping:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> wall</span></span>
<span class="line"><span style="color:#FFB757;">      shell:</span><span style="color:#ADDCFF;"> wall</span><span style="color:#ADDCFF;"> &quot;hello world!&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#BDC4CC;"># 检查语法</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook --syntax-check hello.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 验证脚本 ( 不真实执行 )</span></span>
<span class="line"><span style="color:#BDC4CC;"># 模拟执行 hello.yaml 文件中定义的 playbook, 不会在被控节点上应用任何更改</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook -C hello.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 真实执行</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook hello.yaml</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] vim test.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># 初识 Ansible</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> yes</span><span style="color:#BDC4CC;">     # 需开启,否则无法收集到主机信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;存活性检测&#39;</span></span>
<span class="line"><span style="color:#FFB757;">      ping:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;查看主机名信息&#39;</span></span>
<span class="line"><span style="color:#FFB757;">      setup:</span><span style="color:#ADDCFF;"> filter=ansible_nodename</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;查看操作系统版本&#39;</span></span>
<span class="line"><span style="color:#FFB757;">      setup:</span><span style="color:#ADDCFF;"> filter=ansible_distribution_major_version</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;查看内核版本&#39;</span></span>
<span class="line"><span style="color:#FFB757;">      setup:</span><span style="color:#ADDCFF;"> filter=ansible_kernel</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;查看时间&#39;</span></span>
<span class="line"><span style="color:#FFB757;">      shell:</span><span style="color:#ADDCFF;"> date</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;安装 HTTPD&#39;</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name=httpd</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &#39;启动 HTTPD&#39;</span><span style="color:#F0F3F6;">                                                                   </span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=httpd</span><span style="color:#ADDCFF;"> state=started</span><span style="color:#ADDCFF;"> enabled=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#BDC4CC;"># 检查语法</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook --syntax-check test.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 执行脚本</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook test.yml</span></span></code></pre></div><h3 id="其它组件" tabindex="-1"><a class="header-anchor" href="#其它组件"><span>其它组件</span></a></h3><p>某任务的状态在运行后为<code>changed</code>时，可通过<code>notify</code>通知给相应的<code>handlers</code>任务。</p><p>还可以通过<code>tags</code>给<code>task</code>打标签，可在<code>ansible-playbook</code>命令上使用<code>-t</code>指定进行调用。</p><h2 id="playbook-命令" tabindex="-1"><a class="header-anchor" href="#playbook-命令"><span>playbook 命令</span></a></h2><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>// 格式</span></span>
<span class="line"><span>ansible-playbook &lt;filename.yml&gt; [options]</span></span></code></pre></div><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>--syntax-check</td><td>语法检查</td></tr><tr><td>--check, -C</td><td>模拟执行，只检测可能会发生的改变，但不真正执行操作</td></tr><tr><td>--list-hosts</td><td>列出运行任务的主机</td></tr><tr><td>--list-tags</td><td>列出 tag</td></tr><tr><td>--list-tasks</td><td>列出 task</td></tr><tr><td>--limit 主机</td><td>针对主机列表中的特定主机执行</td></tr><tr><td>-i INVENTORY</td><td>指定主机清单文件</td></tr><tr><td>-v -vv -vvvv</td><td>显示过程</td></tr><tr><td>--start-at-task taskname</td><td>从指定 task 开始执行, 而非从头开始</td></tr><tr><td>-e EXTRA_VARS, --extra-vars EXTRA_VARS</td><td>设置命令行变量传递给yaml配置文件</td></tr></tbody></table><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">ansible-playbook</span><span style="color:#ADDCFF;"> hello.yaml</span><span style="color:#91CBFF;"> --list-hosts</span></span>
<span class="line"><span style="color:#FFB757;">ansible-playbook</span><span style="color:#ADDCFF;"> hello.yaml</span><span style="color:#91CBFF;"> --list-tasks</span></span>
<span class="line"><span style="color:#FFB757;">ansible-playbook</span><span style="color:#ADDCFF;"> hello.yaml</span><span style="color:#91CBFF;"> --limit</span><span style="color:#91CBFF;"> 192.168.80.28</span></span>
<span class="line"><span style="color:#FFB757;">ansible-playbook</span><span style="color:#ADDCFF;"> hello.yaml</span><span style="color:#91CBFF;"> -i</span><span style="color:#ADDCFF;"> /root/hosts</span></span>
<span class="line"><span style="color:#FFB757;">ansible-playbook</span><span style="color:#ADDCFF;"> hello.yml</span><span style="color:#91CBFF;"> --start-at-task=</span><span style="color:#ADDCFF;">&quot;start httpd&quot;</span></span></code></pre></div><h2 id="ignore-errors-忽略错误" tabindex="-1"><a class="header-anchor" href="#ignore-errors-忽略错误"><span>ignore_errors 忽略错误</span></a></h2><p>如果一个<code>Task</code>出错，默认将不会继续执行后续的其它<code>Task</code>。</p><p>我们可以利用<code>ignore_errors:yes</code>忽略此<code>Task</code>的错误，继续向下执行 PlayBook 其它<code>Task</code>。</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">error test</span></span>
<span class="line"><span style="color:#72F088;">      command</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">/bin/false</span><span style="color:#BDC4CC;">    # 返回失败结果的命令</span></span>
<span class="line"><span style="color:#72F088;">      ignore_errors</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">yes</span><span style="color:#BDC4CC;">     # 忽略错误, 继续执行</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">continue</span></span>
<span class="line"><span style="color:#72F088;">      command</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">wall continue</span></span></code></pre></div><h2 id="handlers-和-notify" tabindex="-1"><a class="header-anchor" href="#handlers-和-notify"><span>handlers 和 notify</span></a></h2><p><code>handlers</code>本质是<code>task list</code>，类似于 MySQL 中的触发器触发的行为，其中的<code>task</code>与前述的<code>task</code>并没有本质上的不同，主要用于当关注的资源发生变化时，才会采取一定的操作。</p><p>而<code>notify</code>对应的<code>action</code>可用于在每个<code>play</code>的最后被触发，这样可避免多次有改变发生时每次都执行指定的操作，仅在所有的变化发生完成后一次性地执行指定操作。在<code>notify</code>中列出的操作称为<code>handler</code>，也即<code>notify</code>中调用<code>handler</code>中定义的操作。</p><p>注意：</p><ul><li>如果多个<code>Task</code>通知了相同的<code>handlers</code>，此<code>handlers</code>仅会在所有<code>Tasks</code>结束后运行一次。</li><li>只有<code>notify</code>对应的<code>task</code>发生改变了才会通知<code>handlers</code>，没有改变则不会触发<code>handlers</code>。</li><li><code>handlers</code>是在所有前面的<code>tasks</code>都成功执行才会执行，如果前面任何一个<code>task</code>失败，会导致<code>handler</code>跳过执行，可以使用<code>force_handlers:yes</code>强制执行<code>handler</code>。</li></ul><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name</span><span style="color:#ADDCFF;"> :</span><span style="color:#ADDCFF;"> Install</span><span style="color:#ADDCFF;"> httpd</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name=httpd</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name</span><span style="color:#ADDCFF;"> :</span><span style="color:#ADDCFF;"> Install</span><span style="color:#ADDCFF;"> configure</span><span style="color:#ADDCFF;"> file</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> src=files/httpd.conf</span><span style="color:#ADDCFF;"> dest=/etc/httpd/conf/</span></span>
<span class="line"><span style="color:#BDC4CC;">    # 修改 http 服务的端口号</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> config</span><span style="color:#ADDCFF;"> httpd</span><span style="color:#ADDCFF;"> conf</span></span>
<span class="line"><span style="color:#FFB757;">      lineinfile:</span><span style="color:#ADDCFF;"> &quot;path=/etc/httpd/conf/httpd.conf regexp=&#39;^Listen&#39; line=&#39;Listen 8080&#39;&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      notify:</span></span>
<span class="line"><span style="color:#FFB757;">        -</span><span style="color:#ADDCFF;"> restart</span><span style="color:#ADDCFF;"> httpd</span><span style="color:#F0F3F6;"> </span></span>
<span class="line"><span style="color:#FFB757;">        -</span><span style="color:#ADDCFF;"> wall</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> ensure</span><span style="color:#ADDCFF;"> apache</span><span style="color:#ADDCFF;"> is</span><span style="color:#ADDCFF;"> running</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=httpd</span><span style="color:#ADDCFF;"> state=started</span><span style="color:#ADDCFF;"> enabled=yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  handlers:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> restart</span><span style="color:#ADDCFF;"> httpd</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=httpd</span><span style="color:#ADDCFF;"> state=restarted</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> wall</span></span>
<span class="line"><span style="color:#91CBFF;">      command</span><span style="color:#ADDCFF;">:</span><span style="color:#ADDCFF;"> wall</span><span style="color:#ADDCFF;"> &quot;The config file is changed&quot;</span></span></code></pre></div><p>在 Ansible 中，<code>handlers</code>部分 用于定义当某些条件满足时应该执行的任务。</p><p>这些任务通常是由<code>notify</code>指令触发的，这些<code>notify</code>指令可以放在其他任务中。</p><p>当任务完成并且其状态发生变化时，与任务相关联的<code>notify</code>指令会触发相应的<code>handler</code>。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] vim files/nginx.conf</span></span>
<span class="line"><span style="color:#FFB757;">    server</span><span style="color:#ADDCFF;"> {</span></span>
<span class="line"><span style="color:#FFB757;">        listen</span><span style="color:#91CBFF;">       80</span><span style="color:#F0F3F6;">;                </span><span style="color:#BDC4CC;"># 修改该行</span></span>
<span class="line"><span style="color:#FFB757;">        listen</span><span style="color:#F0F3F6;">       [::]:80;</span></span>
<span class="line"><span style="color:#FFB757;">        server_name</span><span style="color:#ADDCFF;">  _</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"><span style="color:#FFB757;">        root</span><span style="color:#ADDCFF;">         /usr/share/nginx/html</span><span style="color:#F0F3F6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] </span><span style="color:#FFB757;">vim</span><span style="color:#ADDCFF;"> install_nginx.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># install nginx</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Add Nginx Group&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      group:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Add Nginx User&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      user:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=present</span><span style="color:#ADDCFF;"> group=nginx</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Install Nginx&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Copy Nginx Config File&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> src=files/nginx.conf</span><span style="color:#ADDCFF;"> dest=/etc/nginx/nginx.conf</span></span>
<span class="line"><span style="color:#FFB757;">      notify:</span><span style="color:#ADDCFF;"> Restart</span><span style="color:#ADDCFF;"> Nginx</span><span style="color:#ADDCFF;"> Service</span><span style="color:#BDC4CC;">    # 定义 notify 触发器</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Copy Web Page File&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> src=files/index.html</span><span style="color:#ADDCFF;"> dest=/usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Start Nginx Service&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=started</span><span style="color:#ADDCFF;"> enabled=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">        </span></span>
<span class="line"><span style="color:#F0F3F6;">   </span></span>
<span class="line"><span style="color:#FFB757;">  handlers:</span><span style="color:#BDC4CC;">    # 触发如下操作</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Restart Nginx Service&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=restarted</span><span style="color:#ADDCFF;"> enabled=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook install_nginx.yml</span></span></code></pre></div><figure><img src="`+e+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>强制执行<code>handlers</code></p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#72F088;">  force_handlers</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">yes</span><span style="color:#BDC4CC;"> # 无论 task 中的任何一个 task 失败, 仍强制执行 handlers</span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">config file</span></span>
<span class="line"><span style="color:#72F088;">      copy</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">src=nginx.conf dest=/etc/nginx/nginx.conf</span></span>
<span class="line"><span style="color:#72F088;">      notify</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">restart nginx</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">install package</span></span>
<span class="line"><span style="color:#72F088;">      yum</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name=no_exist_package</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#72F088;">  handlers</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;restart nginx&quot;</span></span>
<span class="line"><span style="color:#72F088;">      service</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name=nginx state=restarted</span></span></code></pre></div><h2 id="tags-组件" tabindex="-1"><a class="header-anchor" href="#tags-组件"><span>tags 组件</span></a></h2><p>如果写了一个很长的 PlayBook，其中有很多的任务，这并没有什么问题，不过在实际使用这个剧本时，可能只是想要执行其中的一部分任务。或者，你只想要执行其中一类任务而已，而并非想要执行整个剧本中的全部任务，这个时候我们就可以借助<code>tags</code>标签实现这个需求。</p><p><code>tags</code>可以帮助我们对任务进行打标签的操作，与模块名同级，当任务存在标签以后，我们就可以在执行 PlayBook 时，借助标签，指定执行哪些任务，或者指定不执行哪些任务了。</p><p>在 PlayBook 文件中，利用<code>tags</code>组件，为特定<code>task</code>指定标签。 当在执行 PlayBook 时，可以只执行特定<code>tags</code>的<code>task</code>，而非整个 PlayBook 文件。可以一个<code>task</code>对应多个<code>tag</code>，也可以多个<code>task</code>对应一个<code>tag</code>。</p><p>还有另外 3 个特殊关键字用于标签，<code>tagged，untagged</code>和<code>all</code>，它们分别是仅运行已标记，只有未标记和所有任务。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim httpd.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># tags example</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#FFB757;">tasks:</span></span>
<span class="line"><span style="color:#FFB757;">  -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Install httpd&quot;</span></span>
<span class="line"><span style="color:#FFB757;">    yum:</span><span style="color:#ADDCFF;"> name=httpd</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">  -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Install configure file&quot;</span></span>
<span class="line"><span style="color:#FFB757;">    copy:</span><span style="color:#ADDCFF;"> src=files/httpd.conf</span><span style="color:#ADDCFF;"> dest=/etc/httpd/conf/</span></span>
<span class="line"><span style="color:#FFB757;">    tags:</span><span style="color:#F0F3F6;"> [ </span><span style="color:#ADDCFF;">conf,file</span><span style="color:#ADDCFF;"> ]</span><span style="color:#BDC4CC;">    # 写在一行</span></span>
<span class="line"><span style="color:#FFB757;">      -</span><span style="color:#ADDCFF;"> conf</span><span style="color:#BDC4CC;">               # 写成多行</span></span>
<span class="line"><span style="color:#FFB757;">      -</span><span style="color:#ADDCFF;"> file</span></span>
<span class="line"><span style="color:#FFB757;">  -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;start httpd service&quot;</span></span>
<span class="line"><span style="color:#FFB757;">    tags:</span><span style="color:#ADDCFF;"> service</span><span style="color:#BDC4CC;">          # 写在一行</span></span>
<span class="line"><span style="color:#FFB757;">    service:</span><span style="color:#ADDCFF;"> name=httpd</span><span style="color:#ADDCFF;"> state=started</span><span style="color:#ADDCFF;"> enabled=yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 查看标签</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook --list-tags httpd.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 仅执行标签动作</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook -t conf,service httpd.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 跳过标签动作 </span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook --skip-tags conf httpd.yml</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook httpd.yml --skip-tags untagged</span></span></code></pre></div><h2 id="使用变量" tabindex="-1"><a class="header-anchor" href="#使用变量"><span>使用变量</span></a></h2><p>Playbook 中同样也支持变量， 变量名仅能由字母、数字和下划线组成，且只能以字母开头。</p><p>变量调用方式：</p><ul><li>通过<code>{{ variable_name }}</code>调用变量，且变量名前后建议加空格</li><li>有时用<code>&quot;{{ variable_name }}&quot;</code>才生效</li></ul><h3 id="变量来源" tabindex="-1"><a class="header-anchor" href="#变量来源"><span>变量来源</span></a></h3><ol><li>Ansible 的<code>setup facts</code>远程主机的所有变量都可直接调用。</li><li>通过命令行指定变量，优先级最高。</li></ol><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">ansible-playbook</span><span style="color:#91CBFF;"> -e</span><span style="color:#ADDCFF;"> varname=value</span><span style="color:#ADDCFF;"> test.yml</span></span></code></pre></div><ol start="3"><li>在 PlayBook 文件中定义。</li></ol><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">webservers</span></span>
<span class="line"><span style="color:#72F088;">  vars</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">  	var1</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">value1</span></span>
<span class="line"><span style="color:#72F088;">  	var2</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">value2</span></span></code></pre></div><ol start="4"><li>在独立的变量 YAML 文件中定义。</li></ol><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">all</span></span>
<span class="line"><span style="color:#72F088;">  vars_files</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#ADDCFF;">vars.yml</span></span></code></pre></div><ol start="5"><li>在主机清单文件中定义：</li></ol><ul><li>主机（普通）变量：主机组中主机单独定义，优先级高于公共变量</li><li>组（公共）变量：针对主机组中所有主机定义统一变量</li></ul><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>[test]</span></span>
<span class="line"><span>host1 var1=value1</span></span>
<span class="line"><span>host2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[test:vars]</span></span>
<span class="line"><span>ntp_server=ntp.example.com</span></span>
<span class="line"><span>proxy=proxy.example.com</span></span></code></pre></div><ol start="6"><li>在项目中针对主机和主机组定义<br> 在项目目录中创建<code>host_vars</code>和<code>group_vars</code>目录</li><li>在<code>role</code>中定义</li></ol><p>变量的优先级从高到低如下：</p><ul><li><code>-e</code>选项定义变量</li><li>playbook 中<code>vars_files</code></li><li>playbook 中<code>vars</code>变量定义</li><li><code>host_vars</code>/主机名 文件</li><li>主机清单中主机变量</li><li><code>group_vars</code>/主机组名文件</li><li><code>group_vars/all</code>文件</li><li>主机清单组变量</li></ul><h3 id="使用-setup-模块中变量" tabindex="-1"><a class="header-anchor" href="#使用-setup-模块中变量"><span>使用 setup 模块中变量</span></a></h3><p>本模块自动在 PlayBook 调用，不要用 Ansible 命令调用，生成的系统状态信息，并存放在<code>facts</code>变量中。</p><p><code>facts</code>包括的信息很多，**如: **主机名，IP，CPU，内存，网卡等。<code>facts</code>变量的实际使用场景案例：</p><ul><li>通过<code>fact</code>变量获取被控端 CPU 的个数信息，从而生成不同的 Nginx 配置文件</li><li>通过<code>fact</code>变量获取被控端内存大小信息，从而生成不同的 memcached 的配置文件</li><li>通过<code>fact</code>变量获取被控端主机名称信息，从而生成不同的 Zabbix 配置文件</li><li>......</li></ul><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@centos8 </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible 192.168.80.18 -m setup -a </span><span style="color:#ADDCFF;">&quot;filter=ansible_nodename&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@centos8 </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible 192.168.80.18 -m setup -a </span><span style="color:#ADDCFF;">&#39;filter=&quot;ansible_default_ipv4&quot;&#39;</span></span></code></pre></div><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># var1.yml</span></span>
<span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#72F088;">  remote_user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span></span>
<span class="line"><span style="color:#72F088;">  gather_facts</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">yes</span><span style="color:#BDC4CC;">    # 注意: 这个需要 yes 启用</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;create log file&quot;</span></span>
<span class="line"><span style="color:#72F088;">      file</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name=/root/{{ ansible_nodename }}.log state=touch owner=wangj mode=600</span></span></code></pre></div><p>显示 ens33 网卡的 IP 地址</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">show eth0 ip address {{ ansible_facts[&quot;ens33&quot;][&quot;ipv4&quot;][&quot;address&quot;] }}</span><span style="color:#BDC4CC;">    # name 中也可以调用变量</span></span>
<span class="line"><span style="color:#72F088;">      debug</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        msg</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">IP address {{ ansible_ens33.ipv4.address }}</span><span style="color:#BDC4CC;">    # 注意: 网卡名称</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: IP address {{ ansible_facts[&quot;eth0&quot;][&quot;ipv4&quot;][&quot;address&quot;] }}</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: IP address {{ ansible_facts.eth0.ipv4.address }}</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: IP address {{ ansible_default_ipv4.address }}</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: IP address {{ ansible_eth0.ipv4.address }}</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: IP address {{ ansible_eth0.ipv4.address.split(&#39;.&#39;)[-1] }} # 取 IP 中的最后一个数字</span></span></code></pre></div><h3 id="命令行中定义变量" tabindex="-1"><a class="header-anchor" href="#命令行中定义变量"><span>命令行中定义变量</span></a></h3><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim var2.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;install package&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name={{ pkname }}</span><span style="color:#ADDCFF;"> state=present</span><span style="color:#BDC4CC;">    # 调用变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 在 PlayBook 命令行中定义变量</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook -e pkname</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">vsftpd</span><span style="color:#FFB757;"> var2.yml</span></span></code></pre></div><p>也可以将多个变量放在一个文件中</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 也可以将多个变量放在一个文件中</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] cat vars</span></span>
<span class="line"><span style="color:#FFB757;">pkname1:</span><span style="color:#ADDCFF;"> memcached</span></span>
<span class="line"><span style="color:#FFB757;">pkname2:</span><span style="color:#ADDCFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim var2.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> install</span><span style="color:#ADDCFF;"> package</span><span style="color:#ADDCFF;"> {{ pkname1 }}</span><span style="color:#BDC4CC;">    # 名称也调用变量 ( 利于我们清楚正在安装什么软件包 )</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name={{ pkname1 }}</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> install</span><span style="color:#ADDCFF;"> package</span><span style="color:#ADDCFF;"> {{ pkname2 }}</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name={{ pkname2 }}</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 方式一</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook -e pkname1</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">memcached</span><span style="color:#FFB757;"> -e</span><span style="color:#ADDCFF;"> pkname2=redis</span><span style="color:#ADDCFF;"> var2.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 方式二 ( 指定存放着变量的文件 )</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook -e </span><span style="color:#ADDCFF;">&#39;@vars&#39;</span><span style="color:#F0F3F6;"> var2.yml</span></span></code></pre></div><h3 id="在-playbook-文件中定义变量" tabindex="-1"><a class="header-anchor" href="#在-playbook-文件中定义变量"><span>在 PlayBook 文件中定义变量</span></a></h3><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#72F088;">  remote_user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span></span>
<span class="line"><span style="color:#72F088;">  vars</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">    username</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">user1</span><span style="color:#BDC4CC;">        # 定义变量</span></span>
<span class="line"><span style="color:#72F088;">    groupname</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">group1</span><span style="color:#BDC4CC;">      # 定义变量</span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;create group {{ groupname }}&quot;</span></span>
<span class="line"><span style="color:#72F088;">      group</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ groupname }} state=present</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;create user {{ username }}&quot;</span></span>
<span class="line"><span style="color:#72F088;">      user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ username }} group={{ groupname }} state=present</span></span></code></pre></div><p>变量之间的相互调用</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim var4.yaml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  vars:</span></span>
<span class="line"><span style="color:#FFB757;">    collect_info:</span><span style="color:#ADDCFF;"> &quot;/data/test/{{ansible_default_ipv4[&#39;address&#39;]}}/&quot;</span><span style="color:#BDC4CC;">	# 基于默认变量定义了一个新的变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;Create IP directory&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      file:</span><span style="color:#ADDCFF;"> name=&quot;{{collect_info}}&quot;</span><span style="color:#ADDCFF;"> state=directory</span><span style="color:#BDC4CC;">		# 引用变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 执行结果</span></span>
<span class="line"><span style="color:#FFB757;">tree</span><span style="color:#ADDCFF;"> /data/test/</span></span>
<span class="line"><span style="color:#FFB757;">/data/test/</span></span>
<span class="line"><span style="color:#FFB757;">└──</span><span style="color:#91CBFF;"> 192.168.80.18</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">1</span><span style="color:#ADDCFF;"> directory,</span><span style="color:#91CBFF;"> 0</span><span style="color:#ADDCFF;"> files</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] cat var2.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  vars:</span></span>
<span class="line"><span style="color:#FFB757;">    suffix:</span><span style="color:#ADDCFF;"> &quot;txt&quot;</span></span>
<span class="line"><span style="color:#FFB757;">    file:</span><span style="color:#ADDCFF;"> &quot;{{ ansible_nodename }}.{{suffix}}&quot;</span><span style="color:#BDC4CC;">		# 基于默认变量定义了一个新的变量</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> test</span><span style="color:#ADDCFF;"> var</span></span>
<span class="line"><span style="color:#FFB757;">      file:</span><span style="color:#ADDCFF;"> path=&quot;/data/{{file}}&quot;</span><span style="color:#ADDCFF;"> state=touch</span><span style="color:#BDC4CC;">		# 引用变量</span></span></code></pre></div><p>安装多个包</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 实例一</span></span>
<span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#72F088;">  vars</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">    web</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">httpd</span></span>
<span class="line"><span style="color:#72F088;">    db</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">mariadb-server</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">install {{ web }} {{ db }}</span></span>
<span class="line"><span style="color:#72F088;">      yum</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        name</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">          - </span><span style="color:#ADDCFF;">&quot;{{ web }}&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">          - </span><span style="color:#ADDCFF;">&quot;{{ db }}&quot;</span></span>
<span class="line"><span style="color:#72F088;">        state</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">latest</span></span>
<span class="line"><span style="color:#BDC4CC;"># 实例二      </span></span>
<span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs2</span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">install packages</span></span>
<span class="line"><span style="color:#72F088;">      yum</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ pack }}</span></span>
<span class="line"><span style="color:#72F088;">      vars</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        pack</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">          - </span><span style="color:#ADDCFF;">httpd</span></span>
<span class="line"><span style="color:#F0F3F6;">          - </span><span style="color:#ADDCFF;">memcached</span></span></code></pre></div><h3 id="使用变量文件" tabindex="-1"><a class="header-anchor" href="#使用变量文件"><span>使用变量文件</span></a></h3><p>可以在一个 独立的 PlayBook 文件 中定义变量，在另一个 PlayBook 文件中引用变量文件中的变量，比 PlayBook 中定义的变量优化级高。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 编写变量文件</span></span>
<span class="line"><span style="color:#FFB757;">vim</span><span style="color:#ADDCFF;"> vars.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># variables file</span></span>
<span class="line"><span style="color:#FFB757;">  package_name:</span><span style="color:#ADDCFF;"> mariadb-server</span></span>
<span class="line"><span style="color:#FFB757;">  service_name:</span><span style="color:#ADDCFF;"> mariadb</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 在 PlayBook 调用变量文件</span></span>
<span class="line"><span style="color:#FFB757;">vim</span><span style="color:#ADDCFF;"> var5.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># install package and start service</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> dbsrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  vars_files:</span><span style="color:#BDC4CC;">            # 在 PlayBook 调用变量文件</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> vars.yml</span></span>
<span class="line"><span style="color:#F0F3F6;">    </span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;install package&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name={{ package_name }}</span></span>
<span class="line"><span style="color:#FFB757;">      tags:</span><span style="color:#ADDCFF;"> install</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;start service&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name={{ service_name }}</span><span style="color:#ADDCFF;"> state=started</span><span style="color:#ADDCFF;"> enabled=yes</span></span></code></pre></div><h3 id="针对主机和主机组定义变量" tabindex="-1"><a class="header-anchor" href="#针对主机和主机组定义变量"><span>针对主机和主机组定义变量</span></a></h3><h4 id="在主机清单中针对所有项目的主机和主机分组对应变量" tabindex="-1"><a class="header-anchor" href="#在主机清单中针对所有项目的主机和主机分组对应变量"><span>在主机清单中针对所有项目的主机和主机分组对应变量</span></a></h4><p>所有项目的主机变量<br> 在主机清单文件中为指定的主机定义变量 以便于在 PlayBook 中使用</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>// 范例: 定义主机变量</span></span>
<span class="line"><span>[websrvs]</span></span>
<span class="line"><span>www1.magedu.com http_port=80 maxRequestsPerChild=808</span></span>
<span class="line"><span>www2.magedu.com http_port=8080 maxRequestsPerChild=909</span></span></code></pre></div><p>所有项目的组（公共）变量<br> 在主机清单文件中赋予给指定组内所有主机上<br> 在 PlayBook 中可用的变量，如果和主机变量是同名，优先级低于主机变量</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>// 范例: 公共变量</span></span>
<span class="line"><span>[websrvs:vars]</span></span>
<span class="line"><span>http_port=80</span></span>
<span class="line"><span>ntp_server=ntp.magedu.com</span></span>
<span class="line"><span>nfs_server=nfs.magedu.com</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim /etc/ansible/hosts</span></span>
<span class="line"><span style="color:#F0F3F6;">[websrvs]</span></span>
<span class="line"><span style="color:#FFB757;">192.168.80.18</span><span style="color:#ADDCFF;"> hname=www1</span><span style="color:#ADDCFF;"> domain=magedu.io</span><span style="color:#BDC4CC;">    # 定义主机变量 ( 主机变量 优先级高 )</span></span>
<span class="line"><span style="color:#FFB757;">192.168.80.28</span><span style="color:#ADDCFF;"> hname=www2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">[websrvs:vars]        </span><span style="color:#BDC4CC;"># 定义分组变量</span></span>
<span class="line"><span style="color:#F0F3F6;">mark</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">&quot;-&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">[all:vars]            </span><span style="color:#BDC4CC;"># 定义公共变量 ( 公共变量优先级低 )</span></span>
<span class="line"><span style="color:#F0F3F6;">domain</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">magedu.org</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 调用变量 ( 修改主机名 )</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible websrvs -m hostname -a </span><span style="color:#ADDCFF;">&#39;name={{ hname }}{{ mark }}{{ domain }}&#39;</span></span>
<span class="line"><span style="color:#BDC4CC;"># 命令行指定变量:</span></span>
<span class="line"><span style="color:#BDC4CC;"># -e 定义变量的优先级更高</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible websrvs -e domain</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">magedu.cn</span><span style="color:#FFB757;"> -m</span><span style="color:#ADDCFF;"> hostname</span><span style="color:#91CBFF;"> -a</span><span style="color:#ADDCFF;"> &#39;name={{ hname }}{{ mark }}{{ domain }}&#39;</span></span></code></pre></div><h4 id="针对当前项目的主机和主机组的变量" tabindex="-1"><a class="header-anchor" href="#针对当前项目的主机和主机组的变量"><span>针对当前项目的主机和主机组的变量</span></a></h4><p>上面的方式是针对所有项目都有效，而官方更建议的方式是使用 Ansible 特定项目的主机变量和组变量。生产建议在项目目录中创建额外的两个变量目录，分别是<code>host_vars</code> 和<code>group_vars</code>。</p><ul><li><code>host_vars</code>：下面的文件名和主机清单主机名一致，针对单个主机进行变量定义，格式：<code>host_vars/hostname</code>（ 主机变量 ）</li><li><code>group_vars</code>：下面的文件名和主机清单中组名一致，针对单个组进行变量定义，格式：<code>gorup_vars/groupname</code>（ 分组变量 ）</li><li><code>group_vars/all</code>：文件内定义的变量对所有组都有效（ 公共变量 ）</li></ul><p>建议：主机清单不定义变量（仅存放主机分组信息），变量统一定义在项目目录下的变量目录中（条理非常清晰）。</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 创建项目目录</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] mkdir /data/ansible/test_project -p</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] cd /data/ansible/test_project</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 编写项目主机清单文件 ( 仅存放主机分组信息 )</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] vim hosts</span></span>
<span class="line"><span style="color:#F0F3F6;">[websrvs]</span></span>
<span class="line"><span style="color:#FFB757;">192.168.80.18</span></span>
<span class="line"><span style="color:#FFB757;">192.168.80.28</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 创建项目主机变量目录</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] mkdir host_vars</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 创建项目分组变量目录</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] mkdir group_vars</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 定义项目主机变量信息</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] vim host_vars/192.168.80.18</span></span>
<span class="line"><span style="color:#FFB757;">id:</span><span style="color:#91CBFF;"> 1</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] vim host_vars/192.168.80.28</span></span>
<span class="line"><span style="color:#FFB757;">id:</span><span style="color:#91CBFF;"> 2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 定义项目分组变量信息</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] vim group_vars/websrvs </span></span>
<span class="line"><span style="color:#FFB757;">name:</span><span style="color:#ADDCFF;"> web</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] vim group_vars/all</span></span>
<span class="line"><span style="color:#FFB757;">domain:</span><span style="color:#ADDCFF;"> magedu.org</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 验证项目变量文件</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] tree host_vars/ group_vars/</span></span>
<span class="line"><span style="color:#FFB757;">host_vars/</span></span>
<span class="line"><span style="color:#FFB757;">├──</span><span style="color:#91CBFF;"> 192.168.80.18</span></span>
<span class="line"><span style="color:#FFB757;">└──</span><span style="color:#91CBFF;"> 192.168.80.28</span></span>
<span class="line"><span style="color:#FFB757;">group_vars/</span></span>
<span class="line"><span style="color:#FFB757;">├──</span><span style="color:#ADDCFF;"> all</span></span>
<span class="line"><span style="color:#FFB757;">└──</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">0</span><span style="color:#ADDCFF;"> directories,</span><span style="color:#91CBFF;"> 4</span><span style="color:#ADDCFF;"> files</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 定义 PlayBook 文件</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] vim test.yml</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> get</span><span style="color:#ADDCFF;"> variable</span></span>
<span class="line"><span style="color:#91CBFF;">      command</span><span style="color:#ADDCFF;">:</span><span style="color:#ADDCFF;"> echo</span><span style="color:#ADDCFF;"> &quot;{{name}}{{id}}.{{domain}}&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      register:</span><span style="color:#ADDCFF;"> result</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> print</span><span style="color:#ADDCFF;"> variable</span></span>
<span class="line"><span style="color:#FFB757;">      debug:</span></span>
<span class="line"><span style="color:#FFB757;">        msg:</span><span style="color:#ADDCFF;"> &quot;{{result.stdout}}&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">        </span></span>
<span class="line"><span style="color:#BDC4CC;"># 执行</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible test_project] ansible-playbook test.yml</span></span></code></pre></div><h3 id="register-注册变量" tabindex="-1"><a class="header-anchor" href="#register-注册变量"><span>register 注册变量</span></a></h3><p>在 PlayBook 中可以使用<code>register</code>将捕获命令的输出保存在临时变量中，然后使用<code>debug</code>模块进行显示输出。</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>Ansible 执行结果一般都会返回一个字典类型的数据，你会看到很多你不关心的字段，可以通过指定字典的<code>key</code>，例如<code>stdout</code>或<code>stdout_lines</code>，只看到你关心的数据。</p></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim register1.yml</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#91CBFF;"> 192.168.80.18</span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;get variable&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      shell:</span><span style="color:#ADDCFF;"> hostname</span></span>
<span class="line"><span style="color:#FFB757;">      register:</span><span style="color:#ADDCFF;"> name</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;print variable&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      debug:</span></span>
<span class="line"><span style="color:#FFB757;">        msg:</span><span style="color:#ADDCFF;"> &quot;{{ name }}&quot;</span><span style="color:#BDC4CC;">                   # 输出 register 注册的 name 变量的全部信息, 注意: 变量要加 &quot;&quot; 引起来</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: &quot;{{ name.cmd }}&quot;             # 显示命令</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: &quot;{{ name.rc }}&quot;              # 显示命令成功与否</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: &quot;{{ name.stdout }}&quot;          # 显示命令的输出结果为字符串形式</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: &quot;{{ name.stdout_lines }}&quot;    # 显示命令的输出结果为列表形式</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: &quot;{{ name.stdout_lines[0] }}&quot; # 显示命令的输出结果的列表中的第一个元素</span></span>
<span class="line"><span style="color:#BDC4CC;">        # msg: &quot;{{ name[&#39;stdout_lines&#39;] }}&quot; # 显示命令的执行结果为列表形式</span></span>
<span class="line"><span style="color:#F0F3F6;">        </span></span>
<span class="line"><span style="color:#BDC4CC;"># 说明</span></span>
<span class="line"><span style="color:#BDC4CC;">#在第一个 task 中, 使用了 register 注册变量名为 name;</span></span>
<span class="line"><span style="color:#BDC4CC;">#当 Shell 模块执行完毕后, 会将数据放到该变量中.</span></span>
<span class="line"><span style="color:#BDC4CC;">#在第二个 task 中, 使用了 debug 模块, 并从变量 name 中获取数据.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 注意:</span></span>
<span class="line"><span style="color:#BDC4CC;"># 输出的 name 实际上相当于是一个字典</span></span>
<span class="line"><span style="color:#BDC4CC;"># 里面包含很多个键值对信息 ( 我们需要哪个键值对信息,需要指定性选择该键值 )</span></span>
<span class="line"><span style="color:#BDC4CC;"># 比如: name.stdout ( 在 name 变量后调用键信息 )</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@centos8 </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook register1.yml</span></span></code></pre></div><p>Ansible 执行结果一般都会返回一个字典类型的数据，以此你会看到很多你不关心的字段，我们可以通过指定字典的<code>key</code>，例如<code>stdout</code>或<code>stdout_lines</code>，只看到你关心的数据。</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">192.168.80.18</span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;get variable&quot;</span></span>
<span class="line"><span style="color:#72F088;">      shell</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">hostname</span></span>
<span class="line"><span style="color:#72F088;">      register</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;print variable&quot;</span></span>
<span class="line"><span style="color:#72F088;">      debug</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        msg</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;{{ name.stdout }}&quot;</span><span style="color:#BDC4CC;">            # 取 name 变量的 stdout 键值</span></span></code></pre></div><p>使用<code>register</code>注册变量创建文件</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;get variable&quot;</span></span>
<span class="line"><span style="color:#72F088;">      shell</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">hostname</span></span>
<span class="line"><span style="color:#72F088;">      register</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;create file&quot;</span></span>
<span class="line"><span style="color:#72F088;">      file</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">dest=/root/{{ name.stdout }}.log state=touch</span></span></code></pre></div><p>安装启动服务并检查</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#91CBFF;">---</span></span>
<span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#72F088;">  vars</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">    package_name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">nginx</span></span>
<span class="line"><span style="color:#72F088;">    service_name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;install {{ package_name }}&quot;</span></span>
<span class="line"><span style="color:#72F088;">      yum</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ package_name }}</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;start {{ service_name }}&quot;</span></span>
<span class="line"><span style="color:#72F088;">      service</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ service_name }} state=started enabled=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;check service status&quot;</span></span>
<span class="line"><span style="color:#72F088;">      shell</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">ps aux | grep {{ service_name }}</span></span>
<span class="line"><span style="color:#72F088;">      register</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">check_service</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">debug</span></span>
<span class="line"><span style="color:#72F088;">      debug</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        msg</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;{{ check_service.stdout_lines }}&quot;</span></span></code></pre></div><p>批量修改主机名</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">websrvs</span></span>
<span class="line"><span style="color:#72F088;">  vars</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">    host</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">web</span></span>
<span class="line"><span style="color:#72F088;">    domain</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">wuhanjiayou.cn</span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;get variable&quot;</span></span>
<span class="line"><span style="color:#72F088;">      shell</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">echo $RANDOM | md5sum | cut -c 1-8</span></span>
<span class="line"><span style="color:#72F088;">      register</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">get_random</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;print variable&quot;</span></span>
<span class="line"><span style="color:#72F088;">      debug</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#72F088;">        msg</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;{{ get_random.stdout }}&quot;</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&quot;set hostname&quot;</span></span>
<span class="line"><span style="color:#72F088;">      hostname</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ host }}-{{ get_random.stdout }}.{{ domain }}</span></span></code></pre></div><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战"><span>实战</span></a></h2><h3 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx"><span>安装nginx</span></a></h3><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 编写 PlayBook 文件</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] vim install_nginx.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># install nginx</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;创建 nginx 用户组&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      group:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;创建 nginx 用户&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      user:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=present</span><span style="color:#ADDCFF;"> group=nginx</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;安装 nginx&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=present</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;拷贝 nginx 配置文件&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> src=files/nginx.conf</span><span style="color:#ADDCFF;"> dest=/etc/nginx/nginx.conf</span><span style="color:#F0F3F6;">                                 </span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;拷贝 nginx 网页文件&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> src=files/index.html</span><span style="color:#ADDCFF;"> dest=/usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;启动 nginx 服务&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=started</span><span style="color:#ADDCFF;"> enabled=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#BDC4CC;"># 验证 PlayBook 脚本 ( 重要 )</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook -C install_nginx.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 执行 PalyBook 脚本</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible-playbook install_nginx.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 验证控制节点端口启用情况</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible ansible] ansible websrvs -m shell -a </span><span style="color:#ADDCFF;">&#39;netstat -nltp | grep 8080&#39;</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#FFB757;">$</span><span style="color:#ADDCFF;"> vim</span><span style="color:#ADDCFF;"> remove-nginx.yaml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> websrvs</span></span>
<span class="line"><span style="color:#FFB757;">  name:</span><span style="color:#ADDCFF;"> 移除</span><span style="color:#ADDCFF;"> nginx</span><span style="color:#ADDCFF;"> 软件</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> 停止nginx服务</span></span>
<span class="line"><span style="color:#FFB757;">      service:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=stopped</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> 移除nginx软件</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=absent</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> 删除nginx用户</span></span>
<span class="line"><span style="color:#FFB757;">      user:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=absent</span><span style="color:#ADDCFF;"> remove=yes</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> 删除nginx用户组</span></span>
<span class="line"><span style="color:#FFB757;">      group:</span><span style="color:#ADDCFF;"> name=nginx</span><span style="color:#ADDCFF;"> state=absent</span></span></code></pre></div><h3 id="安装mariadb" tabindex="-1"><a class="header-anchor" href="#安装mariadb"><span>安装mariadb</span></a></h3><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#91CBFF;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># Installing MariaDB Binary Tarballs</span></span>
<span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">hosts</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">dbsrvs</span></span>
<span class="line"><span style="color:#72F088;">  remote_user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">root</span></span>
<span class="line"><span style="color:#72F088;">  gather_facts</span><span style="color:#F0F3F6;">: </span><span style="color:#91CBFF;">no</span></span>
<span class="line"><span style="color:#72F088;">  tasks</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">create group</span></span>
<span class="line"><span style="color:#72F088;">      group</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name=mysql gid=27 system=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">create user</span></span>
<span class="line"><span style="color:#72F088;">      user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name=mysql uid=27 system=yes group=mysql shell=/sbin/nologin home=/data/mysql create_home=no</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">mkdir datadir</span></span>
<span class="line"><span style="color:#72F088;">      file</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">path=/data/mysql owner=mysql group=mysql state=directory</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">unarchive package</span></span>
<span class="line"><span style="color:#72F088;">      unarchive</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">src=/data/ansible/files/mariadb-10.2.27-linux-x86_64.tar.gz dest=/usr/local/ owner=root group=root</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">link</span></span>
<span class="line"><span style="color:#72F088;">      file</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">src=/usr/local/mariadb-10.2.27-linux-x86_64 path=/usr/local/mysql state=link</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">install database</span></span>
<span class="line"><span style="color:#72F088;">      shell</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">chdir=/usr/local/mysql  ./scripts/mysql_install_db --datadir=/data/mysql --user=mysql</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">config file</span></span>
<span class="line"><span style="color:#72F088;">      copy</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">src=/data/ansible/files/my.cnf  dest=/etc/ backup=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">service script</span></span>
<span class="line"><span style="color:#72F088;">      shell</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">/bin/cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">start service</span></span>
<span class="line"><span style="color:#72F088;">      service</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name=mysqld state=started enabled=yes</span></span>
<span class="line"><span style="color:#F0F3F6;">    - </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">PATH variable</span></span>
<span class="line"><span style="color:#72F088;">      copy</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">content=&#39;PATH=/usr/local/mysql/bin:$PATH&#39; dest=/etc/profile.d/mysql.sh</span></span></code></pre></div><h3 id="安装-mysql-5-6" tabindex="-1"><a class="header-anchor" href="#安装-mysql-5-6"><span>安装 MySQL 5.6</span></a></h3><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 下载 MySQL 软件包</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] mkdir /data/ansible/files -p &amp;&amp; </span><span style="color:#91CBFF;">cd</span><span style="color:#ADDCFF;"> /data/ansible/files</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] wget https://ftp.iij.ad.jp/pub/db/mysql/Downloads/MySQL-5.6/mysql-5.6.46-linux-glibc2.12-x86_64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># MySQL 配置文件</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim /data/ansible/files/my.cnf</span></span>
<span class="line"><span style="color:#F0F3F6;">[mysqld]</span></span>
<span class="line"><span style="color:#F0F3F6;">socket</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">/tmp/mysql.sock</span></span>
<span class="line"><span style="color:#F0F3F6;">user</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">mysql</span></span>
<span class="line"><span style="color:#F0F3F6;">symbolic-links</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">0</span></span>
<span class="line"><span style="color:#F0F3F6;">datadir</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">/data/mysql</span></span>
<span class="line"><span style="color:#F0F3F6;">innodb_file_per_table</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">1</span></span>
<span class="line"><span style="color:#FFB757;">log-bin</span></span>
<span class="line"><span style="color:#F0F3F6;">pid-file</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">/data/mysql/mysqld.pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">[client]</span></span>
<span class="line"><span style="color:#F0F3F6;">port</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">3306</span></span>
<span class="line"><span style="color:#F0F3F6;">socket</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">/tmp/mysql.sock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F0F3F6;">[mysqld_safe]</span></span>
<span class="line"><span style="color:#F0F3F6;">log-error</span><span style="color:#FF9492;">=</span><span style="color:#ADDCFF;">/var/log/mysqld.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 编写 MySQL 初始脚本</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim /data/ansible/files/secure_mysql.sh</span></span>
<span class="line"><span style="color:#BDC4CC;">#!/bin/bash</span></span>
<span class="line"><span style="color:#FFB757;">/usr/local/mysql/bin/mysql_secure_installation</span><span style="color:#FF9492;"> &lt;&lt;</span><span style="color:#F0F3F6;">EOF</span></span>
<span class="line"><span style="color:#ADDCFF;">y</span></span>
<span class="line"><span style="color:#ADDCFF;">123456</span></span>
<span class="line"><span style="color:#ADDCFF;">123456</span></span>
<span class="line"><span style="color:#ADDCFF;">y</span></span>
<span class="line"><span style="color:#ADDCFF;">y</span></span>
<span class="line"><span style="color:#ADDCFF;">y</span></span>
<span class="line"><span style="color:#ADDCFF;">y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADDCFF;">[root@ansible files] chmod +x secure_mysql.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADDCFF;">[root@ansible files]# tree /data/ansible/files/</span></span>
<span class="line"><span style="color:#ADDCFF;">/data/ansible/files/</span></span>
<span class="line"><span style="color:#ADDCFF;">├── my.cnf</span></span>
<span class="line"><span style="color:#ADDCFF;">├── mysql-5.6.46-linux-glibc2.12-x86_64.tar.gz</span></span>
<span class="line"><span style="color:#ADDCFF;">└── secure_mysql.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADDCFF;">0 directories, 3 files</span></span></code></pre></div><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#BDC4CC;"># 编写 PlayBook</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] vim /data/ansible/install_mysql.yml</span></span>
<span class="line"><span style="color:#FFB757;">---</span></span>
<span class="line"><span style="color:#BDC4CC;"># install mysql-5.6.46-linux-glibc2.12-x86_64.tar.gz</span></span>
<span class="line"><span style="color:#FFB757;">-</span><span style="color:#ADDCFF;"> hosts:</span><span style="color:#ADDCFF;"> dbsrvs</span></span>
<span class="line"><span style="color:#FFB757;">  remote_user:</span><span style="color:#ADDCFF;"> root</span></span>
<span class="line"><span style="color:#FFB757;">  gather_facts:</span><span style="color:#ADDCFF;"> no</span></span>
<span class="line"><span style="color:#F0F3F6;">  </span></span>
<span class="line"><span style="color:#FFB757;">  tasks:</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;install packages&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      yum:</span><span style="color:#ADDCFF;"> name=libaio,perl-Data-Dumper,perl-Getopt-Long</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;create mysql group&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      group:</span><span style="color:#ADDCFF;"> name=mysql</span><span style="color:#ADDCFF;"> gid=</span><span style="color:#91CBFF;">306</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;create mysql user&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      user:</span><span style="color:#ADDCFF;"> name=mysql</span><span style="color:#ADDCFF;"> uid=</span><span style="color:#91CBFF;">306</span><span style="color:#ADDCFF;"> group=mysql</span><span style="color:#ADDCFF;"> shell=/sbin/nologin</span><span style="color:#ADDCFF;"> system=yes</span><span style="color:#ADDCFF;"> create_home=no</span><span style="color:#ADDCFF;"> home=/data/mysql</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;copy tar to remote host and file mode&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      unarchive:</span><span style="color:#ADDCFF;"> src=/data/ansible/files/mysql-5.6.46-linux-glibc2.12-x86_64.tar.gz</span><span style="color:#ADDCFF;"> dest=/usr/local/</span><span style="color:#ADDCFF;"> owner=root</span><span style="color:#ADDCFF;"> group=root</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;create linkfile /usr/local/mysql&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      file:</span><span style="color:#ADDCFF;"> src=/usr/local/mysql-5.6.46-linux-glibc2.12-x86_64</span><span style="color:#ADDCFF;"> dest=/usr/local/mysql</span><span style="color:#ADDCFF;"> state=link</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;create dir /data/mysql&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      file:</span><span style="color:#ADDCFF;"> path=/data/mysql</span><span style="color:#ADDCFF;"> state=directory</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;data dir&quot;</span><span style="color:#BDC4CC;">	# 该步骤貌似有点问题</span></span>
<span class="line"><span style="color:#FFB757;">      shell:</span><span style="color:#ADDCFF;"> chdir=/usr/local/mysql</span><span style="color:#ADDCFF;"> ./scripts/mysql_install_db</span><span style="color:#91CBFF;"> --datadir=/data/mysql</span><span style="color:#91CBFF;"> --user=mysql</span></span>
<span class="line"><span style="color:#FFB757;">      tags:</span><span style="color:#ADDCFF;"> data</span></span>
<span class="line"><span style="color:#FFB757;">      ignore_errors:</span><span style="color:#ADDCFF;"> yes</span><span style="color:#BDC4CC;">	# 忽略错误,继续执行</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;config my.cnf&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> src=/data/ansible/files/my.cnf</span><span style="color:#ADDCFF;"> dest=/etc/my.cnf</span><span style="color:#F0F3F6;"> </span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;service script&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      shell:</span><span style="color:#ADDCFF;"> /bin/cp</span><span style="color:#ADDCFF;"> /usr/local/mysql/support-files/mysql.server</span><span style="color:#ADDCFF;"> /etc/init.d/mysqld</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;enable service&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      shell:</span><span style="color:#ADDCFF;"> /etc/init.d/mysqld</span><span style="color:#ADDCFF;"> start</span><span style="color:#F0F3F6;">;</span><span style="color:#FFB757;">chkconfig</span><span style="color:#91CBFF;"> --add</span><span style="color:#ADDCFF;"> mysqld</span><span style="color:#F0F3F6;">;</span><span style="color:#FFB757;">chkconfig</span><span style="color:#ADDCFF;"> mysqld</span><span style="color:#ADDCFF;"> on</span></span>
<span class="line"><span style="color:#F0F3F6;">      </span></span>
<span class="line"><span style="color:#FFB757;">      tags:</span><span style="color:#ADDCFF;"> service</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;PATH variable&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      copy:</span><span style="color:#ADDCFF;"> content=&#39;PATH=/usr/local/mysql/bin:$PATH&#39;</span><span style="color:#ADDCFF;"> dest=/etc/profile.d/mysql.sh</span></span>
<span class="line"><span style="color:#FFB757;">    -</span><span style="color:#ADDCFF;"> name:</span><span style="color:#ADDCFF;"> &quot;secure script&quot;</span></span>
<span class="line"><span style="color:#FFB757;">      script:</span><span style="color:#ADDCFF;"> src=/data/ansible/files/secure_mysql.sh</span></span>
<span class="line"><span style="color:#FFB757;">      tags:</span><span style="color:#ADDCFF;"> script</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BDC4CC;"># 执行 PlayBook 脚本</span></span>
<span class="line"><span style="color:#F0F3F6;">[root@ansible </span><span style="color:#FF9492;">~</span><span style="color:#F0F3F6;">] ansible-playbook install_mysql.yml</span></span></code></pre></div><h2 id="循环" tabindex="-1"><a class="header-anchor" href="#循环"><span>循环</span></a></h2><p>重复的任务可以用以下简写的方式：</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">add several users</span></span>
<span class="line"><span style="color:#72F088;">  user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ item }} state=present groups=wheel</span></span>
<span class="line"><span style="color:#72F088;">  with_items</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">     - </span><span style="color:#ADDCFF;">testuser1</span></span>
<span class="line"><span style="color:#F0F3F6;">     - </span><span style="color:#ADDCFF;">testuser2</span></span></code></pre></div><p>如果你在变量文件中或者<code>vars</code>区域定义了一组 YAML 列表，你也可以这样做：</p><div class="language-text" data-highlighter="shiki" data-ext="text" data-title="text" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span>with_items: &quot;{{somelist}}&quot;</span></span></code></pre></div><p>还可以对对象列表使用循环。</p><div class="language-yaml" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="background-color:#0a0c10;color:#f0f3f6;"><pre class="shiki github-dark-high-contrast vp-code"><code><span class="line"><span style="color:#F0F3F6;">- </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">add several users</span></span>
<span class="line"><span style="color:#72F088;">  user</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">name={{ item.name }} state=present groups={{ item.groups }}</span></span>
<span class="line"><span style="color:#72F088;">  with_items</span><span style="color:#F0F3F6;">:</span></span>
<span class="line"><span style="color:#F0F3F6;">    - { </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&#39;testuser1&#39;</span><span style="color:#F0F3F6;">, </span><span style="color:#72F088;">groups</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&#39;wheel&#39;</span><span style="color:#F0F3F6;"> }</span></span>
<span class="line"><span style="color:#F0F3F6;">    - { </span><span style="color:#72F088;">name</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&#39;testuser2&#39;</span><span style="color:#F0F3F6;">, </span><span style="color:#72F088;">groups</span><span style="color:#F0F3F6;">: </span><span style="color:#ADDCFF;">&#39;root&#39;</span><span style="color:#F0F3F6;"> }</span></span></code></pre></div>`,137)]))}const y=a(t,[["render",c],["__file","ansible-playbook.html.vue"]]),d=JSON.parse('{"path":"/linux/tools/ansible-playbook.html","title":"ansible-playbook","lang":"zh-CN","frontmatter":{"title":"ansible-playbook","date":"2024-06-25T00:00:00.000Z","tags":"Bash","categories":"Linux","order":29,"description":"PlayBook 剧本是由一个或多个\\"Play\\"组成的列表。Play 的主要功能在于将预定义的一组主机，装扮成事先通过 Ansible 中的 Task 定义好的角色。 从根本上来讲，所谓的 Task 无非是调用 Ansible 的一个module。将多个 Play 组织在一个 PlayBook 中，即可以让它们联合起来按事先编排的机制完成某一任务。 p...","head":[["meta",{"property":"og:url","content":"https://0oWSQo0.github.io/wsq-blog/linux/tools/ansible-playbook.html"}],["meta",{"property":"og:title","content":"ansible-playbook"}],["meta",{"property":"og:description","content":"PlayBook 剧本是由一个或多个\\"Play\\"组成的列表。Play 的主要功能在于将预定义的一组主机，装扮成事先通过 Ansible 中的 Task 定义好的角色。 从根本上来讲，所谓的 Task 无非是调用 Ansible 的一个module。将多个 Play 组织在一个 PlayBook 中，即可以让它们联合起来按事先编排的机制完成某一任务。 p..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-23T09:49:11.000Z"}],["meta",{"property":"article:published_time","content":"2024-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-23T09:49:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ansible-playbook\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2025-04-23T09:49:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://0oWSQo0.github.com\\"}]}"]]},"headers":[{"level":2,"title":"核心元素","slug":"核心元素","link":"#核心元素","children":[]},{"level":2,"title":"优势","slug":"优势","link":"#优势","children":[]},{"level":2,"title":"核心组件","slug":"核心组件","link":"#核心组件","children":[{"level":3,"title":"hosts 组件","slug":"hosts-组件","link":"#hosts-组件","children":[]},{"level":3,"title":"remote_user 组件","slug":"remote-user-组件","link":"#remote-user-组件","children":[]},{"level":3,"title":"task 列表和 action 组件","slug":"task-列表和-action-组件","link":"#task-列表和-action-组件","children":[]},{"level":3,"title":"其它组件","slug":"其它组件","link":"#其它组件","children":[]}]},{"level":2,"title":"playbook 命令","slug":"playbook-命令","link":"#playbook-命令","children":[]},{"level":2,"title":"ignore_errors 忽略错误","slug":"ignore-errors-忽略错误","link":"#ignore-errors-忽略错误","children":[]},{"level":2,"title":"handlers 和 notify","slug":"handlers-和-notify","link":"#handlers-和-notify","children":[]},{"level":2,"title":"tags 组件","slug":"tags-组件","link":"#tags-组件","children":[]},{"level":2,"title":"使用变量","slug":"使用变量","link":"#使用变量","children":[{"level":3,"title":"变量来源","slug":"变量来源","link":"#变量来源","children":[]},{"level":3,"title":"使用 setup 模块中变量","slug":"使用-setup-模块中变量","link":"#使用-setup-模块中变量","children":[]},{"level":3,"title":"命令行中定义变量","slug":"命令行中定义变量","link":"#命令行中定义变量","children":[]},{"level":3,"title":"在 PlayBook 文件中定义变量","slug":"在-playbook-文件中定义变量","link":"#在-playbook-文件中定义变量","children":[]},{"level":3,"title":"使用变量文件","slug":"使用变量文件","link":"#使用变量文件","children":[]},{"level":3,"title":"针对主机和主机组定义变量","slug":"针对主机和主机组定义变量","link":"#针对主机和主机组定义变量","children":[]},{"level":3,"title":"register 注册变量","slug":"register-注册变量","link":"#register-注册变量","children":[]}]},{"level":2,"title":"实战","slug":"实战","link":"#实战","children":[{"level":3,"title":"安装nginx","slug":"安装nginx","link":"#安装nginx","children":[]},{"level":3,"title":"安装mariadb","slug":"安装mariadb","link":"#安装mariadb","children":[]},{"level":3,"title":"安装 MySQL 5.6","slug":"安装-mysql-5-6","link":"#安装-mysql-5-6","children":[]}]},{"level":2,"title":"循环","slug":"循环","link":"#循环","children":[]}],"git":{"createdTime":1745401751000,"updatedTime":1745401751000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":1}]},"readingTime":{"minutes":18.47,"words":5540},"filePathRelative":"linux/tools/ansible-playbook.md","localizedDate":"2024年6月25日","autoDesc":true}');export{y as comp,d as data};
