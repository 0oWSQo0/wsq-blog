


事务具有 4 个特性：原子性、一致性、隔离性和持久性，简称为 ACID 特性。
原子性（Atomicity）：一个事务是一个不可分割的工作单位，事务中包括的动作要么都做要么都不做。
一致性（Consistency）：事务必须保证数据库从一个一致性状态变到另一个一致性状态，一致性和原子性是密切相关的。
隔离性（Isolation）：一个事务的执行不能被其它事务干扰，即一个事务内部的操作及使用的数据对并发的其它事务是隔离的，并发执行的各个事务之间不能互相打扰。
持久性（Durability）：持久性也称为永久性，指一个事务一旦提交，它对数据库中数据的改变就是永久性的，后面的其它操作和故障都不应该对其有任何影响。

事务允许我们将几个或一组操作组合成一个要么全部成功、要么全部失败的工作单元。如果事务中的所有的操作都执行成功，那自然万事大吉。但如果事务中的任何一个操作失败，那么事务中所有的操作都会被回滚，已经执行成功操作也会被完全清除干净，就好像什么事都没有发生一样。
## 事务管理方式
Spring 支持以下 2 种事务管理方式。

事务管理方式	说明
编程式事务管理	编程式事务管理是通过编写代码实现的事务管理。

这种方式能够在代码中精确地定义事务的边界，我们可以根据需求规定事务从哪里开始，到哪里结束。
声明式事务管理	Spring 声明式事务管理在底层采用了 AOP 技术，其最大的优点在于无须通过编程的方式管理事务，只需要在配置文件中进行相关的规则声明，就可以将事务规则应用到业务逻辑中。

选择编程式事务还是声明式事务，很大程度上就是在控制权细粒度和易用性之间进行权衡。
编程式对事物控制的细粒度更高，我们能够精确的控制事务的边界，事务的开始和结束完全取决于我们的需求，但这种方式存在一个致命的缺点，那就是事务规则与业务代码耦合度高，难以维护，因此我们很少使用这种方式对事务进行管理。
声明式事务易用性更高，对业务代码没有侵入性，耦合度低，易于维护，因此这种方式也是我们最常用的事务管理方式。

Spring 的声明式事务管理主要通过以下 2 种方式实现：
基于 XML 方式的声明式事务管理
基于注解方式的声明式事务管理

## 事务管理器
Spring 并不会直接管理事务，而是通过事务管理器对事务进行管理的。

在 Spring 中提供了一个 org.springframework.transaction.PlatformTransactionManager 接口，这个接口被称为 Spring 的事务管理器，其源码如下。
public interface PlatformTransactionManager extends TransactionManager {
TransactionStatus getTransaction(@Nullable TransactionDefinition definition) throws TransactionException;
void commit(TransactionStatus status) throws TransactionException;
void rollback(TransactionStatus status) throws TransactionException;
}

该接口中各方法说明如下：

名称	说明
TransactionStatus getTransaction(TransactionDefinition definition)	用于获取事务的状态信息
void commit(TransactionStatus status)	用于提交事务
void rollback(TransactionStatus status)	用于回滚事务

Spring 为不同的持久化框架或平台（例如 JDBC、Hibernate、JPA 以及 JTA 等）提供了不同的 PlatformTransactionManager 接口实现，这些实现类被称为事务管理器实现。

实现类	说明
org.springframework.jdbc.datasource.DataSourceTransactionManager	使用 Spring JDBC 或 iBatis 进行持久化数据时使用。
org.springframework.orm.hibernate3.HibernateTransactionManager	使用 Hibernate 3.0 及以上版本进行持久化数据时使用。
org.springframework.orm.jpa.JpaTransactionManager	使用 JPA 进行持久化时使用。
org.springframework.jdo.JdoTransactionManager	当持久化机制是 Jdo 时使用。
org.springframework.transaction.jta.JtaTransactionManager	使用 JTA 来实现事务管理，在一个事务跨越多个不同的资源（即分布式事务）使用该实现。

这些事务管理器的使用方式十分简单，我们只要根据持久化框架（或平台）选用相应的事务管理器实现，即可实现对事物的管理，而不必关心实际事务实现到底是什么。
## TransactionDefinition 接口
Spring 将 XML 配置中的事务信息封装到对象 TransactionDefinition 中，然后通过事务管理器的 getTransaction() 方法获得事务的状态（TransactionStatus），并对事务进行下一步的操作。

TransactionDefinition 接口提供了获取事务相关信息的方法，接口定义如下。
public interface TransactionDefinition {
int getPropagationBehavior();
int getIsolationLevel();
String getName();
int getTimeout();
boolean isReadOnly();
}

该接口中方法说明如下。

方法	说明
String getName()	获取事务的名称
int getIsolationLevel()	获取事务的隔离级别
int getPropagationBehavior()	获取事务的传播行为
int getTimeout()	获取事务的超时时间
boolean isReadOnly()	获取事务是否只读
事务的隔离级别
事务的隔离级别定义了一个事务可能受其他并发事务影响的程度。

在实际应用中，经常会出现多个事务同时对同一数据执行不同操作，来实现各自的任务的情况。此时就有可能导致脏读、幻读以及不可重复读等问题的出现。

在理想情况下，事务之间是完全隔离的，这自然不会出现上述问题。但完全的事务隔离会导致性能问题，而且并不是所有的应用都需要事务的完全隔离，因此有时应用程序在事务隔离上也有一定的灵活性。

Spring 中提供了以下隔离级别，我们可以根据自身的需求自行选择合适的隔离级别。

方法	说明
ISOLATION_DEFAULT	使用后端数据库默认的隔离级别
ISOLATION_READ_UNCOMMITTED	允许读取尚未提交的更改，可能导致脏读、幻读和不可重复读
ISOLATION_READ_COMMITTED	Oracle 默认级别，允许读取已提交的并发事务，防止脏读，可能出现幻读和不可重复读
ISOLATION_REPEATABLE_READ	MySQL 默认级别，多次读取相同字段的结果是一致的，防止脏读和不可重复读，可能出现幻读
ISOLATION_SERIALIZABLE	完全服从 ACID 的隔离级别，防止脏读、不可重复读和幻读
关于事务隔离级别、脏读、幻读、不可重复度等概念的详细介绍，请阅读《数据库事务隔离级别》一节。

事务的传播行为
事务传播行为（propagation behavior）指的是，当一个事务方法被另一个事务方法调用时，这个事务方法应该如何运行。例如，事务方法 A 在调用事务方法 B 时，B 方法是继续在调用者 A 方法的事务中运行呢，还是为自己开启一个新事务运行，这就是由事务方法 B 的事务传播行为决定的。
事务方法指的是能让数据库表数据发生改变的方法，例如新增数据、删除数据、修改数据的方法。

Spring 提供了以下 7 种不同的事务传播行为。

名称	说明
PROPAGATION_MANDATORY	支持当前事务，如果不存在当前事务，则引发异常。
PROPAGATION_NESTED	如果当前事务存在，则在嵌套事务中执行。
PROPAGATION_NEVER	不支持当前事务，如果当前事务存在，则引发异常。
PROPAGATION_NOT_SUPPORTED	不支持当前事务，始终以非事务方式执行。
PROPAGATION_REQUIRED	默认传播行为，如果存在当前事务，则当前方法就在当前事务中运行，如果不存在，则创建一个新的事务，并在这个新建的事务中运行。
PROPAGATION_REQUIRES_NEW	创建新事务，如果已经存在事务则暂停当前事务。
PROPAGATION_SUPPORTS	支持当前事务，如果不存在事务，则以非事务方式执行。

## TransactionStatus 接口
TransactionStatus 接口提供了一些简单的方法，来控制事务的执行、查询事务的状态，接口定义如下。
public interface TransactionStatus extends SavepointManager {
boolean isNewTransaction();
boolean hasSavepoint();
void setRollbackOnly();
boolean isRollbackOnly();
boolean isCompleted();
}

该接口中各方法说明如下。

名称	说明
boolean hasSavepoint()	获取是否存在保存点
boolean isCompleted()	获取事务是否完成
boolean isNewTransaction()	获取是否是新事务
boolean isRollbackOnly()	获取事务是否回滚
void setRollbackOnly()	设置事务回滚
 
