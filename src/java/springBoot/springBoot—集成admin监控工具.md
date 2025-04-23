




Spring Boot Admin 能够将 Actuator 中的信息进行界面化的展示，也可以监控所有 Spring Boot 应用的健康状况，提供实时警报功能。

Spring Boot Admin 提供的主要功能：
* 显示健康状况
* 显示详细信息，例如 JVM 和内存指标、`micrometer.io`指标、数据源指标、缓存指标
* 显示构建信息编号
* 关注并下载日志文件
* 查看 jvm 系统和环境属性
* 查看 Spring Boot 配置属性
* 支持 Spring Cloud 的 postable/env-和/refresh-endpoint
* 轻松的日志级管理
* 与 JMX-beans 交互
* 查看线程转储
* 查看 http 跟踪
* 查看 auditevents
* 查看 http-endpoints
* 查看计划任务
* 查看和删除活动会话（使用 spring-session）
* 查看F lyway/Liquibase 数据库迁移
* 下载 heapdump
* 状态变更通知（通过电子邮件，Slack，Hipchat，…）
* 状态更改的事件日志（非持久性）

## Spring Boot Admin不是Spring团队提供的模块？
它是由 Codecentric 公司创建的，代码在[Github： spring-boot-admin](https://github.com/codecentric/spring-boot-admin)上。
## Spring Boot Admin和actuator是什么关系？
Spring Boot Admin 本质上集成了 actuator，此外添加一些实时警报功能等。
## SpringBoot Admin的Client和Server
Spring Boot Admin（简称SBA）由两部分组成：SBA Server和SBA Client。

SBA Server：包括Admin用户界面并独立运行于被监控应用
SBA Client：提供一种方式将被监控应用注册到 SBA Server

### 为什么Spring Boot Admin设计上会分为Server和Client两个部分？
* 首先，Spring Boot Admin 做的是集中化的监控（比如应用的集群，多个服务或者微服务等），而不是每个应用都需要有一个 UI。
* 其次，被监控的应用应该是和监控平台是分离的，比如 Client 应用会挂掉，这时候 Server 监控依然正常运行并发现和报警 Client 的异常状态。
* 再者，还要考虑和其它语言应用，其它平台等的集成等。

### 只能通过 SBA Client 注册到 SBA Server 吗？
并不是，除了 SBA Client，SBA 还支持：
* Spring Cloud Discovery：为了支持一些微服务框架如 SpringCloud 等（因为微服务框架中已经包含了服务发现和注册模块）
* Python Applications Using Pyctuator：为了支持其它语言开发的应用，比如 Python

## 简单示例
本例子主要展示SBA Server + SBA Client注册的方式。
### 启用SBA Server
```xml
<dependency>
		<groupId>de.codecentric</groupId>
		<artifactId>spring-boot-admin-starter-server</artifactId>
		<!--	版本号与springboot版本号保持一致	-->
		<version>3.4.0</version>
</dependency>
```
通过`@EnableAdminServer`注解启用 SBA Server
```java
@EnableAdminServer
@SpringBootApplication
public class SpringBootHelloWorldApplication {

    /**
     * main interface.
     *
     * @param args args
     */
    public static void main(String[] args) {
        SpringApplication.run(SpringBootHelloWorldApplication.class, args);
    }
}
```
这样就可以打开`http://localhost:8080/applications`查看 Server UI，目前没有客户端注册上来。
### 注册Client
```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>3.4.0</version>
</dependency>
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
```yaml
server:
  port: 9000
spring:
  boot:
    admin:
      client:
        url: 'http://localhost:9000'
management:
  endpoints:
    enabled-by-default: true
    web:
      base-path: /actuator
      exposure:
        include: '*'
```
## 如何继承Spring Security
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
添加`HttpSecurity`配置
```java
@Configuration
public static class SecurityPermitAllConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().permitAll()  
            .and().csrf().disable();
    }
}
```
## 如何显示日志内容？
默认下没有显示 Log File 的内容，如果需要显示SpringBoot应用日志需要进行如下配置（配置`logging.file.path`或者`logging.file.name`）。
```yaml
logging:
  file:
    name: 'spring-boot-application.log'
  pattern:
    file: '%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(%5p) %clr(${PID}){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n%wEx'
```
刷新SBA UI就可以看到增加了日志文件相关的链接。
