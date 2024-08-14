---
index: false
---

## 自动补全插件
```shell
yum install -y bash-completion
```
## gitlab 安装
### rpm安装方式
安装包下载：`https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/?C=M&O=A`
```shell
# 按需安装依赖
[root@localhost gitlab]# yum install -y policycoreutils-python
[root@localhost gitlab]# wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-17.0.1-ce.0.el7.x86_64.rpm
[root@localhost gitlab]# rpm -ivh gitlab-ce-17.0.1-ce.0.el7.x86_64.rpm
warning: gitlab-ce-17.0.1-ce.0.el7.x86_64.rpm: Header V4 RSA/SHA1 Signature, key ID f27eab47: NOKEY
Preparing...                          ################################# [100%]
Updating / installing...
   1:gitlab-ce-17.0.1-ce.0.el7        ################################# [100%]
It looks like GitLab has not been configured yet; skipping the upgrade script.

       *.                  *.
      ***                 ***
     *****               *****
    .******             *******
    ********            ********
   ,,,,,,,,,***********,,,,,,,,,
  ,,,,,,,,,,,*********,,,,,,,,,,,
  .,,,,,,,,,,,*******,,,,,,,,,,,,
      ,,,,,,,,,*****,,,,,,,,,.
         ,,,,,,,****,,,,,,
            .,,,***,,,,
                ,*,.
  


     _______ __  __          __
    / ____(_) /_/ /   ____ _/ /_
   / / __/ / __/ /   / __ `/ __ \
  / /_/ / / /_/ /___/ /_/ / /_/ /
  \____/_/\__/_____/\__,_/_.___/
  

Thank you for installing GitLab!
GitLab was unable to detect a valid hostname for your instance.
Please configure a URL for your GitLab instance by setting `external_url`
configuration in /etc/gitlab/gitlab.rb file.
Then, you can start your GitLab instance by running the following command:
  sudo gitlab-ctl reconfigure

For a comprehensive list of configuration options please see the Omnibus GitLab readme
https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md

Help us improve the installation experience, let us know how we did with a 1 minute survey:
https://gitlab.fra1.qualtrics.com/jfe/form/SV_6kVqZANThUQ1bZb?installation=omnibus&release=17-0
```
gitla b默认安装目录：
* 组件日志路径：`/var/log/gitlab`
* 配置文件路径：`/etc/gitlab/`路径下有`gitlab.rb`配置文件
* 应用代码和组件依赖程序：`/opt/gitlab`
* 各个组件存储路径：`/var/opt/gitlab/`
* 仓库默认存储路径：`/var/opt/gitlab/git-data/repositories`
* 版本文件备份路径：`/var/opt/gitlab/backups/`
* nginx安装路径：`/var/opt/gitlab/nginx/`
* redis安装路径：`/var/opt/gitlab/redis`

修改配置文件：
```shell
[root@localhost gitlab]# vim  /etc/gitlab/gitlab.rb

#修改访问URL
#格式：external_url 'http://ip:端口'
external_url 'http://101.42.8.4:5002'
#配置时区
gitlab_rails['time_zone'] = 'Asia/Shanghai'
```
```shell
[root@localhost gitlab]# gitlab-ctl reconfigure
```
```
# 成功标志
Notes:
Default admin account has been configured with following details:
Username: root
Password: You didn't opt-in to print initial root password to STDOUT.
Password stored to /etc/gitlab/initial_root_password. This file will be cleaned up in first reconfigure run after 24 hours.

NOTE: Because these credentials might be present in your log files in plain text, it is highly recommended to reset the password following https://docs.gitlab.com/ee/security/reset_user_password.html#reset-your-root-password.

[2024-08-13T17:05:46+08:00] WARN: This release of Cinc Client became end of life (EOL) on May 1st 2024. Please update to a supported release to receive new features, bug fixes, and security updates.
gitlab Reconfigured!
```
```shell
[root@localhost gitlab]# gitlab-ctl restart
```
默认账号为`root`，密码在`/etc/gitlab/initial_root_password`中。
:::tip
如果 reconfigure 失败，则需要 systemctl enable gitlab-runsvdir && systemctl restart gitlab-runsvdir 重启一下 gitlab-runsvdir 服务
:::
