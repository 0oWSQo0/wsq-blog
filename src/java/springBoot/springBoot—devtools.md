


## 什么是热部署和热加载
热部署和热加载是在应用正在运行的时候，自动更新（重新加载或者替换`class`等）应用的一种能力。

`spring-boot-devtools`提供的方案也是要重启的，只是无需手动重启能实现自动加载而已。

热部署：
* 在服务器运行时重新部署项目
* 它是直接重新加载整个应用，这种方式会释放内存，比热加载更加干净彻底，但同时也更费时间

热加载：
* 在运行时重新加载`class`，从而升级应用
* 热加载的实现原理主要依赖 java 的类加载机制，在实现方式可以概括为在容器启动的时候起一条后台线程，定时的检测类文件的时间戳变化，如果类的时间戳变掉了，则将类重新载入
* 对比反射机制，反射是在运行时获取类信息，通过动态的调用来改变程序行为；热加载则是在运行时通过重新加载改变类信息，直接改变程序行为

## 配置devtools实现热部署
我们通过如下配置来实现自动重启方式的热部署。
### POM配置
添加`spring-boot-devtools`的依赖
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional> <!-- 可以防止将devtools依赖传递到其他模块中 -->
    </dependency>
</dependencies>
```
### IDEA配置
如果你使用IDEA开发工具，通常有如下两种方式：

* 方式一：无任何配置时，手动触发重启更新（`Ctrl+F9`）。也可以用`mvn compile`编译触发重启更新。
* 方式二：IDEA 需开启运行时编译，自动重启更新
```text
// 方式1
文件(File)->设置(Setting)->构建、执行、部署(Build,Execution,Deployment)->编译器(Compile) 
勾选：自动构建项目(Make project automatically)
// 方式2
新版本的IDEA可以在文件(File)->设置(Setting)->高级设置(Advanced Setttings)
勾选：编译器->即使开发的应用程序当前正在运行，也允许自动make启动
```
### application.yml
```yaml
spring:
  devtools:
    restart:
      enabled: true  #设置开启热部署
      additional-paths: src/main/java #重启目录,可选
      exclude: WEB-INF/** # 可选
```
## devtools原理
为什么同样是重启应用，为什么不手动重启，而是建议使用`spring-boot-devtools`进行热部署重启？

`spring-boot-devtools`使用了两个类加载器`ClassLoader`，一个`ClassLoader`加载不会发生更改的类（第三方`jar`包），另一个`ClassLoader(restart ClassLoader)`加载会更改的类（自定义的类）。

后台启动一个文件监听线程，监测的目录中的文件发生变动时， 原来的`restart ClassLoader`被丢弃，将会重新加载新的`restart ClassLoader`。因为文件变动后，第三方`jar`包不再重新加载，只加载自定义的类，加载的类比较少，所以重启比较快。这也是为什么，同样是重启应用，为什么不手动重启，建议使用`spring-boot-devtools`进行热部署重启。

在自动重启中有几点需要注意：
* 自动重启会记录日志的（记录在什么情况下重启的日志），可以通过如下关闭：
```yaml
spring:
  devtools:
    restart:
      log-condition-evaluation-delta: false
```
* 排除一些不需要自动重启的资源
某些资源在更改时不一定需要触发重新启动。默认情况下，改变资源`/META-INF/maven、/META-INF/resources、/resources、/static、/public`，或`/templates`不触发重新启动，但确会触发现场重装。如果要自定义这些排除项，可以使用该`spring.devtools.restart.exclude`属性。例如，要仅排除`/static，/public`，将设置以下属性：
```yaml
spring:
  devtools:
    restart:
      exclude: "static/**,public/**"
```
如果要保留这些默认值并添加其他排除项，请改用`spring.devtools.restart.additional-exclude`属性。
* 自定义重启类加载器重启功能是通过使用两个类加载器来实现的。对于大多数应用程序，这种方法效果很好。但是，它有时会导致类加载问题。
默认情况下，IDE 中的任何打开项目都使用“重启”类加载器加载，任何常规`.jar`文件都使用“基本”类加载器加载。如果你处理一个多模块项目，并且不是每个模块都导入到你的 IDE 中，你可能需要自定义一些东西。为此，你可以创建一个`META-INF/spring-devtools.properties`文件。
该`spring-devtools.properties`文件可以包含以`restart.exclude`和`restart.include`为前缀的属性。该`include`元素是应该被拉高到“重启”的类加载器的项目，以及`exclude`要素是应该向下推入“`Base`”类加载器的项目。该属性的值是应用于类路径的正则表达式模式，如以下示例所示：
```yaml
restart:
  exclude:
    companycommonlibs: "/mycorp-common-[\\w\\d-\\.]+\\.jar"
  include:
    projectcommon: "/mycorp-myproj-[\\w\\d-\\.]+\\.jar"
```
## devtool为何会默认禁用缓存选项？
SpringBoot 支持的一些库使用缓存来提高性能。例如，模板引擎缓存已编译的模板以避免重复解析模板文件。此外，SpringMVC 可以在提供静态资源时向响应添加 HTTP 缓存标头。

虽然缓存在生产中非常有益，但在开发过程中可能会适得其反，使你无法看到刚刚在应用程序中所做的更改。出于这个原因，`spring-boot-devtools`默认禁用缓存选项。比如 Thymeleaf 提供了`spring.thymeleaf.cache`来设置模板引擎的缓存，使用`spring-boot-devtools`模块时是不需要手动设置这些属性的，因为`spring-boot-devtools`会自动进行设置。

可以在`DevToolsPropertyDefaultsPostProcessor`类找到对应的默认配置。
```java
public class DevToolsPropertyDefaultsPostProcessor implements EnvironmentPostProcessor {

	static {
		Map<String, Object> properties = new HashMap<>();
		properties.put("spring.thymeleaf.cache", "false");
		properties.put("spring.freemarker.cache", "false");
		properties.put("spring.groovy.template.cache", "false");
		properties.put("spring.mustache.cache", "false");
		properties.put("server.servlet.session.persistent", "true");
		properties.put("spring.h2.console.enabled", "true");
		properties.put("spring.web.resources.cache.period", "0");
		properties.put("spring.web.resources.chain.cache", "false");
		properties.put("spring.template.provider.cache", "false");
		properties.put("spring.mvc.log-resolved-exception", "true");
		properties.put("server.error.include-binding-errors", "ALWAYS");
		properties.put("server.error.include-message", "ALWAYS");
		properties.put("server.error.include-stacktrace", "ALWAYS");
		properties.put("server.servlet.jsp.init-parameters.development", "true");
		properties.put("spring.reactor.debug", "true");
		PROPERTIES = Collections.unmodifiableMap(properties);
	}
}
```
当然如果你不想被应用属性被`spring-boot-devtools`默认设置，可以通过`spring.devtools.add-properties: false`到`application.yml`中。

