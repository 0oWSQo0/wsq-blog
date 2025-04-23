


SpringBoot Actuator 提供了对 SpringBoot 应用程序（可以是生产环境）监视和管理的能力，可以选择通过使用`HTTP Endpoint`或使用 JMX 来管理和监控 SpringBoot 应用程序。
## Actuator Endpoints
SpringBoot Actuator 允许你通过`Endpoints`对 SpringBoot 进行监控和交互。SpringBoot 内置的`Endpoint`包括两种`Endpoint`：WEB 和 JMX，web 方式考虑到安全性默认只开启了`/health`：

| ID               | JMX  | Web   | Endpoint功能描述                                                                          |
|------------------|------|-------|---------------------------------------------------------------------------------------|
| auditevents      | Yes  | No    | 暴露当前应用的audit events （依赖AuditEventRepository）                                          |
| beans            | Yes  | No    | Spring中所有Beans                                                                        |
| caches           | Yes  | No    | 暴露可用的缓存                                                                               |
| conditions       | Yes  | No    | 展示configuration 和auto-configuration类中解析的condition，并展示是否匹配的信息                          |
| configprops      | Yes  | No    | 展示所有的@ConfigurationProperties                                                         |
| env              | Yes  | No    | 	展示环境变量，来源于ConfigurableEnvironment                                                    |
| flyway           | Yes  | No    | 	flyway数据迁移信息（依赖Flyway）                                                               |
| health           | Yes  | Yes   | 展示应用的健康信息                                                                             |
| heapdump         | N/A  | No    | （web应用时）hprof 堆的dump文件（依赖HotSpot JVM）                                                 |
| httptrace        | Yes  | No    | 展示HTTP trace信息, 默认展示前100个（依赖HttpTraceRepository）                                      |
| info             | Yes  | No    | 	应用信息                                                                                 |
| integrationgraph | Yes  | No    | 展示spring集成信息（依赖spring-integration-core）                                               |
| jolokia          | N/A  | No    | （web应用时）通过HTTP暴露JMX beans（依赖jolokia-core）                                             |
| logfile          | N/A  | No    | （web应用时）如果配置了logging.file.name 或者 logging.file.path，展示logfile内容                       |
| loggers          | Yes  | No    | 展示或者配置loggers，比如修改日志的等级                                                               |
| liquibase        | Yes  | No    | Liquibase 数据迁移信息（依赖Liquibase）                                                         |
| metrics          | Yes  | No    | 指标信息                                                                                  |
| mappings         | Yes  | No    | @RequestMapping映射路径                                                                   |
| prometheus       | 	N/A | No    | （web应用时）向prometheus暴露监控信息（依赖micrometer-registry-prometheus）                           |
| quartz           | Yes  | No    | 展示 quartz任务信息                                                                         |
| scheduledtasks   | Yes  | No    | 展示Spring Scheduled 任务信息                                                               |
| sessions         | Yes  | No    | session信息                                                                             |
| shutdown         | Yes  | No    | 关闭应用                                                                                  |
| startup          | Yes  | No    | 展示ApplicationStartup的startup步骤的数据（依赖通在SpringApplication配置BufferingApplicationStartup） |
| threaddump       | Yes  | No    | 线程dump                                                                                |

当然你也可以自己定义暴露哪些`endpoint`。
```yaml
management:
  endpoints:
    jmx:
      exposure:
        include: "health,info"
```
```yaml
# web 时(`*`代表所有）
management:
  endpoints:
    web:
      exposure:
        include: "*"
        exclude: "env,beans"
```
## 简单示例
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
自定义暴露哪些`endpoint`，比如如下`yml`配置。
```yaml
server:
  port: 8080

management:
  endpoints:
    enabled-by-default: false
    web:
      base-path: /actuator
      exposure:
        include: 'info,health,env,beans'
  endpoint:
    info:
      enabled: true
    health:
      enabled: true
    env:
      enabled: true
    beans:
      enabled: true
```
上述配置只暴露`info,health,env,beans`四个`endpoints`，web 通过可以`http://localhost:8080/actuator`访问。

## Endpoints的进一步拓展配置
### 与SpringSecurity集成保障安全
正是由于`endpoint`可能潜在暴露应用的安全性，web 方式的`endpoint`才在默认情况下只暴露了一个`/health`。如果你需要暴露更多，并保证`endpoint`接口安全，可以与 Spring Security 集成：
```java
@Configuration(proxyBeanMethods = false)
public class MySecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.requestMatcher(EndpointRequest.toAnyEndpoint())
                .authorizeRequests((requests) -> requests.anyRequest().hasRole("ENDPOINT_ADMIN"));
        http.httpBasic();
        return http.build();
    }
}
```
### Endpoint跨域访问
跨域访问，可以通过如下配置：
```yaml
management:
  endpoints:
    web:
      cors:
        allowed-origins: "https://example.com"
        allowed-methods: "GET,POST"
```
### 实现自己的Endpoint
我们可以通过`@JmxEndpoint or @WebEndpoint`注解来定义自己的`endpoint`，然后通过`@ReadOperation`，`@WriteOperation`或者`@DeleteOperation`来暴露操作，比如添加系统时间`date`的`endpoint`
```java
import java.time.LocalDateTime;

import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.boot.actuate.endpoint.web.annotation.WebEndpoint;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController("custom")
@WebEndpoint(id = "date")
public class CustomEndpointController {

    @ReadOperation
    public ResponseEntity<String> currentDate() {
        return ResponseEntity.ok(LocalDateTime.now().toString());
    }
}
```
`enable`自定义的`date`
```yaml
management:
  endpoints:
    enabled-by-default: false
    web:
      base-path: /actuator
      exposure:
        include: 'info,health,env,beans,date'
  endpoint:
    info:
      enabled: true
    health:
      enabled: true
    env:
      enabled: true
    beans:
      enabled: true
    date:
      enabled: true
```
访问`http://localhost8080/actuator`可以看到所有开放的接口中增加了`date`。访问`http://localhost8080/actuator/date`查看时间。




### 组件的health状况
SpringBoot默认集成了如下常见中间件的health监控




当然你也可以自定义HealthIndicator
```java
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        int errorCode = check();
        if (errorCode!=0) {
            return Health.down().withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

    private int check() {
        // perform some specific health check
        return 0;
    }

}
```
