import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,f as e}from"./app-DSIDyALA.js";const n={},l=e(`<h2 id="harbor" tabindex="-1"><a class="header-anchor" href="#harbor"><span>harbor</span></a></h2><p>下载地址：<a href="https://github.com/goharbor/harbor/releases" target="_blank" rel="noopener noreferrer">github</a>。</p><h3 id="下载安装包" tabindex="-1"><a class="header-anchor" href="#下载安装包"><span>下载安装包</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">cd</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> /usr/local</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">wget</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> https://github.com/goharbor/harbor/releases/download/v2.10.3/harbor-offline-installer-v2.10.3.tgz</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">tar</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -zxvf</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> harbor-offline-installer-v2.10.3.tgz</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编辑配置文件" tabindex="-1"><a class="header-anchor" href="#编辑配置文件"><span>编辑配置文件</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">cd</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> harbor</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">cp</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> harbor.yml.tmp</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> harbor.yml</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">vim</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> harbor.yml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先要修改<code>hostname</code>为机器地址，使用的是<code>http</code>，所以<code>https</code>部分需要注掉，端口自定义。</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#85E89D;--shiki-dark:#22863A;">hostname</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">: </span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">101.42.8.4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># http related config</span></span>
<span class="line"><span style="--shiki-light:#85E89D;--shiki-dark:#22863A;">http</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # port for http, default is 80. If https enabled, this port will redirect to https port</span></span>
<span class="line"><span style="--shiki-light:#85E89D;--shiki-dark:#22863A;">  port</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">: </span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">5001</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># https related config</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># https:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # https port for harbor, default is 443</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # port: 443</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # The path of cert and key files for nginx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # certificate: /your/certificate/path</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # private_key: /your/private/key/path</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # enable strong ssl ciphers (default: false)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # strong_ssl_ciphers: false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # # Uncomment following will enable tls communication between all harbor components</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># internal_tls:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   # set enabled to true means internal tls is enabled</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   enabled: true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   # put your cert and key files on dir</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   dir: /etc/harbor/tls/internal</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Uncomment external_url if you want to enable external proxy</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># And when it enabled the hostname will no longer used</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># external_url: https://reg.mydomain.com:8433</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># The initial password of Harbor admin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># It only works in first time to install harbor</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Remember Change the admin password from UI after launching Harbor.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可以修改登录密码</span></span>
<span class="line"><span style="--shiki-light:#85E89D;--shiki-dark:#22863A;">harbor_admin_password</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">: </span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;">Harbor12345</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Harbor安装环境预处理</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">./prepare</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装并启动Harbor</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">./install.sh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查是否安装成功（应该是启动9个容器）要在harbor目录下操作，否则docker-compose会又问题；</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker-compose</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> ps</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问<code>http://101.42.8.4:5001</code>。默认用户名和密码(admin Harbor12345)，也可以从<code>harbor.yml</code>中找到。</p><h3 id="修改-docker-配置" tabindex="-1"><a class="header-anchor" href="#修改-docker-配置"><span>修改 Docker 配置</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">vim</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> /etc/docker/daemon.json</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">{</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  &quot;insecure-registries&quot;</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">: [</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;">&quot;101.42.8.4:5001&quot;</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">],</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  &quot;registry-mirrors&quot;</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">: [</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;">&quot;https://mirror.css.tencentyun.com&quot;</span><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">]</span></span>
<span class="line"><span style="--shiki-light:#E1E4E8;--shiki-dark:#24292E;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启 Docker 服务</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">systemctl</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> restart</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> docker</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">cd</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> /usr/local/harbor</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> compose</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> up</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -d</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录 harbor 服务：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> login</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -u</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> admin</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -p</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> Harbor12345</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> 101.42.8.4:5001</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="上传镜像" tabindex="-1"><a class="header-anchor" href="#上传镜像"><span>上传镜像</span></a></h3><p>找到你要上传的镜像，给要上传的镜像打个标签，然后推送。</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># wsq 是在 harbor 管理界面中新建的项目名</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># docker tag SOURCE_IMAGE[:TAG] 101.42.8.4:5001/wsq/REPOSITORY[:TAG]</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> tag</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> nginx:latest</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> 101.42.8.4:5001/wsq/nginx:latest</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># docker push 101.42.8.4:5001/wsq/REPOSITORY[:TAG]</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> push</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> 101.42.8.4:5001/wsq/nginx:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推送成功后可在harbor界面上看到我们推送的镜像。</p><h3 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像"><span>拉取镜像</span></a></h3><p>方法一：在 harbor 管理界面上可以查看拉取命令。</p><p>方法二：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 镜像名your-ip:端口/项目名称/新的镜像名:版本</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> pull</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> 101.42.8.4:5001/wsq/nginx:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除镜像" tabindex="-1"><a class="header-anchor" href="#删除镜像"><span>删除镜像</span></a></h3><p>可以在 harbor 管理界面上删除仓库镜像。</p><h2 id="jenkins" tabindex="-1"><a class="header-anchor" href="#jenkins"><span>Jenkins</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#e1e4e8;--shiki-dark:#24292e;--shiki-light-bg:#24292e;--shiki-dark-bg:#fff;"><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> pull</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> jenkins/jenkins</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">mkdir</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -p</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> /data/jenkins/jenkins_home</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">chmod</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  777</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -R</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;">  /data/jenkins/jenkins_home</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">docker</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> run</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -d</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> --name</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> jenkins</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> \\</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  -p</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> 5001:8080</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> -p</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> 5002:50000</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> \\</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  -e</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> JAVA_OPTS=-Duser.timezone=Asia/Shanghai</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> \\</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  -v</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> /data/jenkins/jenkins_home:/var/jenkins_home</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> \\</span></span>
<span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;">  --privileged=true</span><span style="--shiki-light:#79B8FF;--shiki-dark:#005CC5;"> \\</span></span>
<span class="line"><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;">  jenkins/jenkins</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#注意这里挂载目录的 /var/jenkins是docker启动的目录  rpm为 /var/lib/jenkins</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看管理员登录密码</span></span>
<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#6F42C1;">cat</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#032F62;"> /data/jenkins/jenkins_home/secrets/initialAdminPassword</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30),h=[l];function t(r,d){return a(),i("div",null,h)}const c=s(n,[["render",t],["__file","热门镜像安装.html.vue"]]),g=JSON.parse('{"path":"/linux/docker/%E7%83%AD%E9%97%A8%E9%95%9C%E5%83%8F%E5%AE%89%E8%A3%85.html","title":"","lang":"zh-CN","frontmatter":{"index":false,"description":"harbor 下载地址：github。 下载安装包 编辑配置文件 首先要修改hostname为机器地址，使用的是http，所以https部分需要注掉，端口自定义。 安装 访问http://101.42.8.4:5001。默认用户名和密码(admin Harbor12345)，也可以从harbor.yml中找到。 修改 Docker 配置 重启 Dock...","head":[["meta",{"property":"og:url","content":"https://wsq01.github.io/linux/docker/%E7%83%AD%E9%97%A8%E9%95%9C%E5%83%8F%E5%AE%89%E8%A3%85.html"}],["meta",{"property":"og:description","content":"harbor 下载地址：github。 下载安装包 编辑配置文件 首先要修改hostname为机器地址，使用的是http，所以https部分需要注掉，端口自定义。 安装 访问http://101.42.8.4:5001。默认用户名和密码(admin Harbor12345)，也可以从harbor.yml中找到。 修改 Docker 配置 重启 Dock..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-14T07:08:17.000Z"}],["meta",{"property":"article:author","content":"WSQ"}],["meta",{"property":"article:modified_time","content":"2024-08-14T07:08:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-14T07:08:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"WSQ\\",\\"url\\":\\"https://wsq01.github.com\\"}]}"]]},"headers":[{"level":2,"title":"harbor","slug":"harbor","link":"#harbor","children":[{"level":3,"title":"下载安装包","slug":"下载安装包","link":"#下载安装包","children":[]},{"level":3,"title":"编辑配置文件","slug":"编辑配置文件","link":"#编辑配置文件","children":[]},{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":3,"title":"修改 Docker 配置","slug":"修改-docker-配置","link":"#修改-docker-配置","children":[]},{"level":3,"title":"上传镜像","slug":"上传镜像","link":"#上传镜像","children":[]},{"level":3,"title":"拉取镜像","slug":"拉取镜像","link":"#拉取镜像","children":[]},{"level":3,"title":"删除镜像","slug":"删除镜像","link":"#删除镜像","children":[]}]},{"level":2,"title":"Jenkins","slug":"jenkins","link":"#jenkins","children":[]}],"git":{"createdTime":1723619297000,"updatedTime":1723619297000,"contributors":[{"name":"WSQ","email":"592786982@qq.com","commits":1}]},"readingTime":{"minutes":1.9,"words":570},"filePathRelative":"linux/docker/热门镜像安装.md","localizedDate":"2024年8月14日","autoDesc":true}');export{c as comp,g as data};
