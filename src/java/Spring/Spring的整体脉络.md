


## Bean 解析流程
如图所示，就是通过 解析器，对我们的 XML 文件或者注解进行解析，最后将这些信息封装在 BeanDefinition 类中，并通过 BeanDefinitionRegistry 接口将这些信息 注册 起来，放在 beanDefinitionMap 变量中, key : beanName , value ：BeanDefinition 。
