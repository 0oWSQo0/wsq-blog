



# 对象的概念
Java 是面向对象的编程语言，对象就是面向对象程序设计的核心。所谓对象就是真实世界中的实体，对象与实体是一一对应的，也就是说现实世界中每一个实体都是一个对象，它是一种具体的概念。对象有以下特点：
* 对象具有属性和行为。
* 对象具有变化的状态。
* 对象具有唯一性。
* 对象都是某个类别的实例。
* 一切皆为对象，真实世界中的所有事物都可以视为对象。

例如，在真实世界的学校里，会有学生和老师等实体，学生有学号、姓名、所在班级等属性（数据），学生还有学习、提问、吃饭和走路等操作。学生只是抽象的描述，这个抽象的描述称为“类”。在学校里活动的是学生个体，即张同学、李同学等，这些具体的个体称为“对象”，“对象”也称为“实例”。
# 面向对象的三大核心特性
面向对象程序设计有以下优点。
* 可重用性：代码重复使用，减少代码量，提高开发效率。大核心特性（继承、封装和多态）都围绕这个核心。
* 可扩展性：指新的功能可以很容易地加入到系统中来，便于软件的修改。
* 可管理性：能够将功能与数据结合，方便管理。

该开发模式之所以使程序设计更加完善和强大，主要是因为面向对象具有继承、封装和多态 3 个核心特性。
### 继承性
程序中的继承性是指子类拥有父类的全部特征和行为，这是类之间的一种关系。Java 只支持单继承。

使用这种层次形的分类方式，是为了将多个类的通用属性和方法提取出来，放在它们的父类中，然后只需要在子类中各自定义自己独有的属性和方法，并以继承的形式在父类中获取它们的通用属性和方法即可。

Java 语言是单继承的，即只能有一个父类，但 Java 可以实现多个接口，可以防止多继承所引起的冲突问题。
### 封装性
封装是将代码及其处理的数据绑定在一起的一种编程机制，该机制保证了程序和数据都不受外部干扰且不被误用。封装的目的在于保护信息，使用它的主要优点如下。
* 保护类中的信息，它可以阻止在外部定义的代码随意访问内部代码和数据。
* 隐藏细节信息，一些不需要程序员修改和使用的信息，比如取款机中的键盘，用户只需要知道按哪个键实现什么操作就可以，至于它内部是如何运行的，用户不需要知道。
* 有助于建立各个系统之间的松耦合关系，提高系统的独立性。当一个系统的实现方式发生变化时，只要它的接口不变，就不会影响其他系统的使用。
* 提高软件的复用率，降低成本。每个系统都是一个相对独立的整体，可以在不同的环境中得到使用。

Java 语言的基本封装单位是类。由于类的用途是封装复杂性，所以类的内部有隐藏实现复杂性的机制。Java 提供了私有和公有的访问模式，类的公有接口代表外部的用户应该知道或可以知道的每件东西，私有的方法数据只能通过该类的成员代码来访问，这就可以确保不会发生不希望的事情。
### 多态性
面向对象的多态性，即“一个接口，多个方法”。多态性体现在父类中定义的属性和方法被子类继承后，可以具有不同的属性或表现方式。多态性允许一个接口被多个同类使用，弥补了单继承的不足。
# 类的定义
定义一个类，需要使用`class`关键字、一个自定义的类名和一对表示程序体的大括号。
```java
[public][abstract|final]class<class_name>[extends<class_name>][implements<interface_name>] {
    // 定义属性部分
    <property_type><property1>;
    <property_type><property2>;
    <property_type><property3>;
    …
    // 定义方法部分
    function1();
    function2();
    function3();
    …
}
```
提示：上述语法中，中括号`[]`中的部分表示可以省略，竖线`|`表示“或关系”，但是两个关键字不能同时出现。

上述语法中各关键字的描述如下。
* `public`：表示“共有”的意思。如果使用`public`修饰，则可以被其他类和程序访问。每个 Java 程序的主类都必须是`public`类，作为公共工具供其他类和程序使用的类应定义为`public`类。
* `abstract`：如果类被`abstract`修饰，则该类为抽象类，抽象类不能被实例化，但抽象类中可以有抽象方法（使用`abstract`修饰的方法）和具体方法（没有使用`abstract`修饰的方法）。继承该抽象类的所有子类都必须实现该抽象类中的所有抽象方法（除非子类也是抽象类）。
* `final`：如果类被`final`修饰，则不允许被继承。
* `class`：声明类的关键字。
* `class_name`：类的名称。
* `extends`：表示继承其他类。
* `implements`：表示实现某些接口。
* `property_type`：表示成员变量的类型。
* `property`：表示成员变量名称。
* `function()`：表示成员方法名称。

Java 类名的命名规则：
* 类名应该以下划线（`_`）或字母开头，最好以字母开头。
* 第一个字母最好大写，如果类名由多个单词组成，则每个单词的首字母最好都大写。
* 类名不能为 Java 中的关键字，例如`boolean、this、int`等。
* 类名不能包含任何嵌入的空格或点号以及除了下划线（`_`）和美元符号（`$`）字符之外的特殊字符。

创建一个新的类，就是创建一个新的数据类型。实例化一个类，就是得到类的一个对象。因此，对象就是一组变量和相关方法的集合，其中变量表明对象的状态和属性，方法表明对象所具有的行为。定义一个类的步骤如下所述。
1. 声明类。编写类的最外层框架，声明一个名称为`Person`的类。
```java
public class Person {
    // 类的主体
}
```
2. 编写类的属性。类中的数据和方法统称为类成员。其中，类的属性就是类的数据成员。通过在类的主体中定义变量来描述类所具有的特征（属性），这里声明的变量称为类的成员变量。
3. 编写类的方法。类的方法描述了类所具有的行为，是类的方法成员。可以简单地把方法理解为独立完成某个功能的单元模块。

```java
public class Person {
  private String name;    // 姓名
  private int age;    // 年龄
  public void tell() {   
    // 定义说话的方法
    System.out.println(name+"今年"+age+"岁！");
  }
}
```
# 类的属性
在 Java 中类的成员变量定义了类的属性。声明成员变量的语法如下：
```
[public|protected|private][static][final] <type> <variable_name>
```
各参数的含义如下。
* `public、protected、private`：用于表示成员变量的访问权限。
* `static`：表示该成员变量为类变量，也称为静态变量。
* `final`：表示将该成员变量声明为常量，其值无法更改。
* `type`：表示变量的类型。
* `variable_name`：表示变量名称。

可以在声明成员变量的同时对其进行初始化，如果声明成员变量时没有对其初始化，则系统会使用默认值初始化成员变量。

初始化的默认值如下：
* 整数型（`byte、short、int`和`long`）的基本类型变量的默认值为 0。
* 单精度浮点型（`float`）的基本类型变量的默认值为`0.0f`。
* 双精度浮点型（`double`）的基本类型变量的默认值为`0.0d`。
* 字符型（`char`）的基本类型变量的默认值为`\u0000`。
* 布尔型的基本类型变量的默认值为`false`。
* 数组引用类型的变量的默认值为`null`。如果创建了数组变量的实例，但没有显式地为每个元素赋值，则数组中的元素初始化值采用数组数据类型对应的默认值。

定义类的成员变量的示例如下：
```java
public class Student {
  public String name;    // 姓名
  final int sex = 0;    // 性别：0表示女孩，1表示男孩
  private int age;    // 年龄
}
```
# 成员方法
声明成员方法可以定义类的行为，行为表示一个对象能够做的事情或者能够从一个对象取得的信息。类的各种功能操作都是用方法来实现的，属性只不过提供了相应的数据。一个完整的方法通常包括方法名称、方法主体、方法参数和方法返回值类型。

成员方法一旦被定义，便可以在程序中多次调用。声明成员方法的语法格式如下：
```java
public class Test {
  [public|private|protected][static] <void|return_type> <method_name> ([paramList]) {
    // 方法体
  }
}
```
上述代码中一个方法包含 4 部分：方法的返回值、方法名称、方法的参数和方法体。其中`return_type`是方法返回值的数据类型，数据类型可以是原始的数据类型，即常用的 8 种数据类型，也可以是一个引用数据类型，如一个类、接口和数组等。

除了这些，一个方法还可以没有返回值，即返回类型为`void`，像`main()`方法。`method_name`表示自定义的方法名称，方法的名称首先要遵循标识符的命名约定，除此之外，方法的名称第一个单词的第一个字母是小写，第二单词的第一个字母是大写，依此类推。

`paramList`表示参数列表，这些变量都要有自己的数据类型，可以是原始数据类型，也可以是复杂数据类型，一个方法主要依靠参数来传递消息。方法主体是方法中执行功能操作的语句。其他各修饰符的含义如下。
* `public、private、protected`：表示成员方法的访问权限。
* `static`：表示限定该成员方法为静态方法。
* `final`：表示限定该成员方法不能被重写或重载。
* `abstract`：表示限定该成员方法为抽象方法。抽象方法不提供具体的实现，并且所属类型必须为抽象类。

```java
public class Student {
  public StringBuffer printInfo(Student st) {
    StringBuffer sb = new StringBuffer();
    sb.append("学生姓名："+st.Name+"\n 学生年龄："+st.Age+"\n 学生性别："+st.isSex());
    return sb;
  }
}
```
上述代码创建了一个名称为`printInfo`的方法，其返回值类型为`StringBuffer`（引用数据类型）。该方法需要传递一个`Student`类型的参数，最后需要将一个`StringBuffer`类型的数据返回。
### 1. 成员方法的返回值
若方法有返回值，则在方法体中用`return`语句指明要返回的值。
```
return 表达式
// 或者
return (表达式)
```
其中，表达式可以是常量、变量、对象等。表达式的数据类型必须与声明成员方法时给出的返回值类型一致。
### 2. 形参、实参及成员方法的调用
可以通过以下方式来调用成员方法：
```
methodName({paramList})
```
关于方法的参数，经常会提到形参与实参，形参是定义方法时参数列表中出现的参数，实参是调用方法时为方法传递的参数。

下面`retumMin()`方法中的`m`和`n`是形参，调用`retumMin()`方法时的`x`和`y`是实参。
```java
public int returnMin(int m,int n) {
  return Math.min(m,n);    // m和n是形参
}
public static void main(String[] args) {
  int x = 50;
  int y = 100;
  Test t = new Test();
  int i = t.returnMin(x,y);    // x和y是实参
  System.out.println(i);
}
```
方法的形参和实参具有以下特点：
* 形参变量只有在被调用时才分配内存单元，在调用结束时，即刻释放所分配的内存单元。因此，形参只有在方法内部有效，方法调用结束返回主调方法后则不能再使用该形参变量。
* 实参可以是常量、变量、表达式、方法等，无论实参是何种类型的量，在进行方法调用时，它们都必须具有确定的值，以便把这些值传送给形参。因此应预先用赋值、输入等办法使实参获得确定值。
* 实参和形参在数量、类型和顺序上应严格一致，否则会发生“类型不匹配” 的错误。
* 方法调用中发生的数据传送是单向的，即只能把实参的值传送绐形参，而不能把形参的值反向地传送给实参。因此在方法调用过程中，形参的值发生改变，而实参中的值不会变化。

```java
public int add(int x) {
  x += 30;
  System.out.println("形参 x 的值："+x);
  return x;
}
public static void main(String[] args) {
  int x = 150;
  System.out.println("调用 add() 方法之前 x 的值："+x);
  Test t = new Test();
  int i = t.add(x);
  System.out.println("实参 x 的值："+x);
  System.out.println("调用 add() 方法的返回值："+i);
}
```
运行上述程序，输出结果如下：
```
调用 add() 方法之前 x 的值：150
形参 x 的值：180
实参 x 的值：150
调用 add() 方法的返回值：180
```
从输出结果可以看出，形参`x`值的改变，并没有影响实参`x`。

在调用成员方法时应注意以下 4 点：
* 对无参成员方法来说，是没有实际参数列表的（即没有`paramList`），但方法名后的括号不能省略。
* 对带参数的成员方法来说，实参的个数、顺序以及它们的数据类型必须与形式参数的个数、顺序以及它们的数据类型保持一致，各个实参间用逗号分隔。实参名与形参名可以相同，也可以不同。
* 实参也可以是表达式，此时一定要注意使表达式的数据类型与形参的数据类型相同，或者使表达式的类型按 Java 类型转换规则达到形参指明的数据类型。
* 实参变量对形参变量的数据传递是“值传递”，即只能由实参传递给形参，而不能由形参传递给实参。程序中执行到调用成员方法时，Java 把实参值复制到一个临时的存储区（栈）中，形参的任何修改都在栈中进行，当退出该成员方法时，Java 自动清除栈中的内容。

### 3. 方法体中的局部变量
在方法体内可以定义本方法所使用的变量，这种变量是局部变量。它的生存期与作用域是在本方法内，也就是说，局部变量只能在本方法内有效或可见，离开本方法则这些变量将被自动释放。

在方法体内定义变量时，变量前不能加修饰符。局部变量在使用前必须明确赋值，否则编译时会出错。另外，在一个方法内部，可以在复合语句（把多个语句用括号`{}`括起来组成的一个语句称复合语句）中定义变量，这些变量只在复合语句中有效。
# this关键字
`this`关键字可用于任何实例方法内指向当前对象，也可指向对其调用当前方法的对象，或者在需要当前类型对象引用时使用。
## this.属性名
大部分时候，普通方法访问其他方法、成员变量时无须使用`this`前缀，但如果方法里有个局部变量和成员变量同名，但程序又需要在该方法里访问这个被覆盖的成员变量，则必须使用`this`前缀。
```java
public class Teacher {
  private String name;    // 教师名称
  private double salary;    // 工资
  private int age;    // 年龄
}
```
在上述代码中`name、salary`和`age`的作用域是`private`，因此在类外部无法对它们的值进行设置。为了解决这个问题，可以为`Teacher`类添加一个构造方法，然后在构造方法中传递参数进行修改。
```java
// 创建构造方法，为上面的3个属性赋初始值
public Teacher(String name,double salary,int age) {
  this.name = name;    // 设置教师名称
  this.salary = salary;    // 设置教师工资
  this.age = age;    // 设置教师年龄
}
```
在`Teacher`类的构造方法中使用了`this`关键字对属性`name、salary`和`age`赋值，`this`表示当前对象。`this.name=name`语句表示一个赋值语句，等号左边的`this.name`是指当前对象具有的变量`name`，等号右边的`name`表示参数传递过来的数值。

创建一个`main()`方法对`Teacher`类进行测试：
```java
public static void main(String[] args) {
  Teacher teacher = new Teacher("王刚",5000.0,45);
  System.out.println("教师信息如下：");
  System.out.println("教师名称："+teacher.name+"\n教师工资："+teacher.salary+"\n教师年龄："+teacher.age);
}
```
输出结果如下所示。
```
教师信息如下：
教师名称：王刚
教师工资：5000.0
教师年龄：45
```
提示：当一个类的属性（成员变量）名与访问该属性的方法参数名相同时，则需要使用 this 关键字来访问类中的属性，以区分类的属性和方法中的参数。
## this.方法名
`this`关键字最大的作用就是让类中一个方法，访问该类里的另一个方法或实例变量。

假设定义了一个`Dog`类，这个`Dog`对象的`run()`方法需要调用它的`jump()`方法：
```java
/**
 * 第一种定义Dog类方法
 **/
public class Dog {
  // 定义一个jump()方法
  public void jump() {
    System.out.println("正在执行jump方法");
  }
  // 定义一个run()方法，run()方法需要借助jump()方法
  public void run() {
    Dog d = new Dog();
    d.jump();
    System.out.println("正在执行 run 方法");
  }
}
```
使用这种方式来定义这个`Dog`类，确实可以实现在`run()`方法中调用`jump()`方法。下面再提供一个程序来创建`Dog`对象，并调用该对象的`run()`方法。
```java
public class DogTest {
  public static void main(String[] args) {
    // 创建Dog对象
    Dog dog = new Dog();
    // 调用Dog对象的run()方法
    dog.run();
  }
}
```
在上面的程序中，一共产生了两个`Dog`对象，在`Dog`类的`run()`方法中，程序创建了一个`Dog`对象，并使用名为`d`的引用变量来指向该`Dog`对象。在`DogTest`的`main()`方法中，程序再次创建了一个`Dog`对象，并使用名为`dog`的引用变量来指向该`Dog`对象。

下面我们思考两个问题。
1. 在`run()`方法中调用`jump()`方法时是否一定需要一个`Dog`对象？
	 答案是肯定的，因为没有使用`static`修饰的成员变量和方法都必须使用对象来调用。
2. 是否一定需要重新创建一个`Dog`对象？
	 不一定，因为当程序调用`run()`方法时，一定会提供一个`Dog`对象，这样就可以直接使用这个已经存在的`Dog`对象，而无须重新创建新的`Dog`对象了。因此需要在`run()`方法中获得调用该方法的对象，通过`this`关键字就可以满足这个要求。

`this`可以代表任何对象，当`this`出现在某个方法体中时，它所代表的对象是不确定的，但它的类型是确定的，它所代表的只能是当前类的实例。只有当这个方法被调用时，它所代表的对象才被确定下来，谁在调用这个方法，`this`就代表谁。

将前面的`Dog`类的`run()`方法改为如下形式会更加合适。
```java
/**
 * 第二种定义Dog类方法
 **/
// 定义一个run()方法，run()方法需要借助jump()方法
public void run() {
  // 使用this引用调用run()方法的对象
  this.jump();
  System.out.println("正在执行run方法");
}
```
Java 允许对象的一个成员直接调用另一个成员，可以省略`this`前缀。也就是说，将上面的`run()`方法改为如下形式也完全正确。
```java
public void run() {
  jump();
  System.out.println("正在执行run方法");
}
```
大部分时候，一个方法访问该类中定义的其他方法、成员变量时加不加`this`前缀的效果是完全一样的。

注意：对于`static`修饰的方法而言，可以使用类来直接调用该方法，如果在`static`修饰的方法中使用`this`关键字，则这个关键字就无法指向合适的对象。所以，`static`修饰的方法中不能使用`this`引用。并且 Java 语法规定，静态成员不能直接访问非静态成员。

省略`this`前缀只是一种假象，虽然程序员省略了调用`jump()`方法之前的`this`，但实际上这个`this`依然是存在的。
## this()访问构造方法
`this()`用来访问本类的构造方法（构造方法是类的一种特殊方法，方法名称和类名相同，没有返回值）括号中可以有参数，如果有参数就是调用指定的有参构造方法。
```java
public class Student {
  String name;
  // 无参构造方法（没有参数的构造方法）
  public Student() {
    this("张三");
  }
  // 有参构造方法
  public Student(String name) {
    this.name = name;
  }
  // 输出name和age
  public void print() {
    System.out.println("姓名：" + name);
  }
  public static void main(String[] args) {
    Student stu = new Student();
    stu.print();
  }
}

// 输出结果为：
// 姓名：张三
```
> 注意：`this()`不能在普通方法中使用，只能写在构造方法中。在构造方法中使用时，必须是第一条语句。

# 对象的创建
对象是对类的实例化。对象具有状态和行为，变量用来表明对象的状态，方法表明对象所具有的行为。Java 对象的生命周期包括创建、使用和清除，创建对象分显式创建与隐含创建两种情况。
## 显式创建对象
对象的显式创建方式有 4 种。
1. 使用`new`关键字创建对象
```
类名 对象名 = new 类名();
```
2. 调用`java.lang.Class`或者`java.lang.reflect.Constuctor`类的`newlnstance()`实例方法
```
java.lang.Class Class 类对象名称 = java.lang.Class.forName(要实例化的类全称);
类名 对象名 = (类名)Class类对象名称.newInstance();
```
调用`java.lang.Class`类中的`forName()`方法时，需要将要实例化的类的全称（比如`com.mxl.package.Student`）作为参数传递过去，然后再调用`java.lang.Class`类对象的`newInstance()`方法创建对象。
3. 调用对象的`clone()`方法
	 该方法不常用，使用该方法创建对象时，要实例化的类必须继承`java.lang.Cloneable`接口。
```
类名对象名 = (类名)已创建好的类对象名.clone();
```
4. 调用`java.io.ObjectlnputStream`对象的`readObject()`方法

```java
public class Student implements Cloneable {   
  // 实现 Cloneable 接口
  private String Name;    // 学生名字
  private int age;    // 学生年龄
  public Student(String name,int age) {    
    // 构造方法
    this.Name = name;
    this.age = age;
  }
  public Student() {
    this.Name = "name";
    this.age = 0;
  }
  public String toString() {
    return "学生名字："+Name+"，年龄："+age;
  }
  public static void main(String[] args)throws Exception {
    System.out.println("---------使用 new 关键字创建对象---------");
    
    // 使用new关键字创建对象
    Student student1 = new Student("小刘",22);
    System.out.println(student1);
    System.out.println("-----------调用 java.lang.Class 的 newInstance() 方法创建对象-----------");
    
    // 调用 java.lang.Class 的 newInstance() 方法创建对象
    Class c1 = Class.forName("Student");
    Student student2 = (Student)c1.newInstance();
    System.out.println(student2);
    System.out.println("-------------------调用对象的 clone() 方法创建对象----------");
    // 调用对象的 clone() 方法创建对象
    Student student3 = (Student)student2.clone();
    System.out.println(student3);
  }
}
```
对上述示例的说明如下：
* 使用`new`关键字或`Class`对象的`newInstance()`方法创建对象时，都会调用类的构造方法。
* 使用`Class`类的`newInstance()`方法创建对象时，会调用类的默认构造方法，即无参构造方法。
* 使用`Object`类的`clone()`方法创建对象时，不会调用类的构造方法，它会创建一个复制的对象，这个对象和原来的对象具有不同的内存地址，但它们的属性值相同。
* 如果类没有实现`Cloneable`接口，则`clone`。方法会抛出`java.lang.CloneNotSupportedException`异常，所以应该让类实现`Cloneable`接口。

程序执行结果如下：
```
---------使用 new 关键字创建对象---------
学生名字：小刘，年龄：22
-----------调用 java.lang.Class 的 newInstance() 方法创建对象-----------
学生名字：name，年龄：0
-------------------调用对象的done()方法创建对象----------
学生名字：name，年龄：0
```
## 隐含创建对象
除了显式创建对象以外，在 Java 程序中还可以隐含地创建对象，例如下面几种情况。
1. `String strName = "strValue"`，其中的`strValue`就是一个`String`对象，由 Java 虚拟机隐含地创建。
2. 字符串的“+”运算符运算的结果为一个新的`String`对象。
```java
String str1 = "Hello";
String str2 = "Java";
String str3 = str1+str2;  // str3引用一个新的String对象
```
3. 当 Java 虚拟机加载一个类时，会隐含地创建描述这个类的`Class`实例。

提示：类的加载是指把类的`.class`文件中的二进制数据读入内存中，把它存放在运行时数据区的方法区内，然后在堆区创建一个`java.lang.Class`对象，用来封装类在方法区内的数据结构。

无论釆用哪种方式创建对象，Java 虚拟机在创建一个对象时都包含以下步骤：
* 给对象分配内存。
* 将对象的实例变量自动初始化为其变量类型的默认值。
* 初始化对象，给实例变量赋予正确的初始值。

> 注意：每个对象都是相互独立的，在内存中占有独立的内存地址，并且每个对象都具有自己的生命周期，当一个对象的生命周期结束时，对象就变成了垃圾，由 Java 虚拟机自带的垃圾回收机制处理。

# 匿名对象
每次`new`都相当于开辟了一个新的对象，并开辟了一个新的物理内存空间。如果一个对象只需要使用唯一的一次，就可以使用匿名对象，匿名对象还可以作为实际参数传递。

匿名对象就是没有明确的给出名字的对象，是对象的一种简写形式。一般匿名对象只使用一次，而且匿名对象只在堆内存中开辟空间，而不存在栈内存的引用。
```java
public class Person {
  public String name; // 姓名
  public int age; // 年龄
  // 定义构造方法，为属性初始化
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
  // 获取信息的方法
  public void tell() {
    System.out.println("姓名：" + name + "，年龄：" + age);
  }
  public static void main(String[] args) {
    new Person("张三", 30).tell(); // 匿名对象
  }
}

// 程序运行结果为：
// 姓名：张三，年龄：30
```
在以上程序的主方法中可以发现，直接使用了`new Person("张三",30)`语句，这实际上就是一个匿名对象，与之前声明的对象不同，此处没有任何栈内存引用它，所以此对象使用一次之后就等待被 GC（垃圾收集机制）回收。

匿名对象实际上就是个堆内存空间，对象不管是匿名的还是非匿名的，都必须在开辟堆空间之后才可以使用。
# 访问对象的属性和行为
每个对象都有自己的属性和行为，这些属性和行为在类中体现为成员变量和成员方法，其中成员变量对应对象的属性，成员方法对应对象的行为。

在 Java 中，要引用对象的属性和行为，需要使用点（.）操作符来访问。对象名在圆点左边，而成员变量或成员方法的名称在圆点的右边。
```
对象名.属性(成员变量)    // 访问对象的属性
对象名.成员方法名()    // 访问对象的方法
```
```java
Student stu = new Student();    // 创建 Student 类的对象 stu
stu.Name = "李子文";    // 调用stu对象的Name属性并赋值
stu.Sex = true;    // 调用stu对象的Sex属性并赋值
stu.Age = 15;    // 调用stu对象的Age属性并赋值
```
如果一个对象要被使用，则对象必须被实例化，如果一个对象没有被实例化而直接调用了对象中的属性或方法：
```java
Student stu = null;
stu.Name = "李子文";
stu.Sex = true;
stu.Age = 15;
```
则程序运行时会出现以下异常：
```
Exception in thread "main" java.lang.NullPointerException
```
此异常是使用了未实例化的对象则肯定会出现此异常。
# 对象的销毁
对象使用完之后需要对其进行清除。对象的清除是指释放对象占用的内存。在创建对象时，用户必须使用`new`操作符为对象分配内存。不过，在清除对象时，由系统自动进行内存回收，不需要用户额外处理。

Java 语言的内存自动回收称为垃圾回收机制，简称 GC。垃圾回收机制是指 JVM 用于释放那些不再使用的对象所占用的内存。

Java 并不要求 JVM 有 GC，也没有规定 GC 如何工作。不过常用的 JVM 都有 GC，而且大多数 GC 都使用类似的算法管理内存和执行回收操作。

如果回收内存的任务由程序负责，也就是说必须在程序中显式地进行内存回收，这无疑会增加程序员的负担，而且存在很多弊端。Java 语言对象是由垃圾回收器收集然后释放，程序员不用关系释放的细节。

一个对象被当作垃圾回收的情况主要如下两种。
1. 对象的引用超过其作用范围。
```java
{
  Object o = new Object();    // 对象o的作用范围，超过这个范围对象将被视为垃圾
}
```
2. 对象被赋值为`null`。
```java
{
  Object o = new Object();
  o = null;    // 对象被赋值为null将被视为垃圾
}
```
在 Java 的`Object`类中还提供了一个`protected`类型的`finalize()`方法，因此任何 Java 类都可以覆盖这个方法，在这个方法中进行释放对象所占有的相关资源的操作。

在 Java 虚拟机的堆区，每个对象都可能处于以下三种状态之一。
1. 可触及状态：当一个对象被创建后，只要程序中还有引用变量引用它，那么它就始终处于可触及状态。
2. 可复活状态：当程序不再有任何引用变量引用该对象时，该对象就进入可复活状态。在这个状态下，垃圾回收器会准备释放它所占用的内存，在释放之前，会调用它及其他处于可复活状态的对象的`finalize()`方法，这些`finalize()`方法有可能使该对象重新转到可触及状态。
3. 不可触及状态：当 Java 虚拟机执行完所有可复活对象的`finalize()`方法后，如果这些方法都没有使该对象转到可触及状态，垃圾回收器才会真正回收它占用的内存。

注意：调用`System.gc()`或者`Runtime.gc()`方法也不能保证回收操作一定执行，它只是提高了 Java 垃圾回收器尽快回收垃圾的可能性。

# main()方法
`main()`方法是 Java 应用程序的入口方法，程序在运行的时候，第一个执行的方法就是`main()`方法。`main()`方法和其他的方法有很大的不同。

```java
public class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello World!");
  }
}
```
使用`main()`方法时应该注意如下几点：
* 访问控制权限是公有的（`public`）。
* `main()`方法是静态的。如果要在`main()`方法中调用本类中的其他方法，则该方法也必须是静态的，否则需要先创建本类的实例对象，然后再通过对象调用成员方法。
* `main()`方法没有返回值，只能使用`void`。
* `main()`方法具有一个字符串数组参数，用来接收执行 Java 程序的命令行参数。命令行参数作为字符串，按照顺序依次对应字符串数组中的元素。
* 字符串中数组的名字（代码中的`args`）可以任意设置，但是根据习惯，这个字符串数组的名字一般和 Java 规范范例中`main()`参数名保持一致，命名为`args`，而方法中的其他内容都是固定不变的。
* `main()`方法定义必须是`public static void main(String[] 字符串数组参数名)`。
* 一个类只能有一个`main()`方法。

```java
public class Student {
  public void Speak1() {
    System.out.println("你好!");
  }
  public static void Speak2() {
    System.out.println("Java!");
  }
  public static void main(String[] args) {
    // Speak1();    // 错误调用
    Speak2();    // 可以直接调用静态方法Speak2()
    Student t = new Student();
    t.Speak1();    // 调用非静态方法，需要通过类的对象来调用
  }
}
```
由上面代码可以看出，在`main()`方法中只能直接调用静态方法，如果想调用非静态方法，需要将当前类实例化，然后通过类的对象来调用。
```java
public class TestMain {
  public static void main(String[] args) {
    int n = args.length;    // 获取参数数量
    System.out.println("一共有 "+n+" 个参数");
    if(n > 0) {   
      // 判断参数个数是否大于0
      for(int i = 0;i < n;i++) {
        System.out.println(args[i]);
      }
    }
  }
}
```
```
javac TestMain.java
java TestMain
一共有 0 个参数

java TestMain apple banana
一共有 2 个参数
apple
banana

java TestMain one two three four five six
一共有 6 个参数
one
two
three
four
five
six
```
由此可见，`main()`方法可以以字符串的形式接收命令行参数，然后在方法体内进行处理。
# 方法的可变参数
在具体实际开发过程中，有时方法中参数的个数是不确定的。为了解决这个问题，引入了可变参数的概念。声明可变参数的语法格式如下：
```java
methodName({paramList},paramType…paramName)
```
其中，`methodName`表示方法名称；`paramList`表示方法的固定参数列表；`paramType`表示可变参数的类型；`…`是声明可变参数的标识；`paramName`表示可变参数名称。

注意：可变参数必须定义在参数列表的最后。
例 1
每次参加考试的人数是不固定的，但是每次考试完之后都需要打印出本次考试的总人数以及参加考试的学生名单。下面编写程序，使用方法的可变参数实现该功能，具体的代码如下：
```java
public class StudentTestMethod {
    // 定义输出考试学生的人数及姓名的方法
    public void print(String ...names) {
        int count = names.length;    // 获取总个数
        System.out.println("本次参加考试的有"+count+"人，名单如下：");
        for(int i = 0;i < names.length;i++) {
            System.out.println(names[i]);
        }
    }
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        StudentTestMethod student = new StudentTestMethod();
        student.print("张强","李成","王勇");    // 传入3个值
        student.print("马丽","陈玲");
    }
}
```
# 构造方法
构造方法是类的一种特殊方法，用来初始化类的一个新的对象，在创建对象（`new`运算符）之后自动调用。Java 中的每个类都有一个默认的构造方法，并且可以有一个以上的构造方法。

Java 构造方法有以下特点：
* 方法名必须与类名相同
* 可以有 0 个、1 个或多个参数
* 没有任何返回值，包括`void`
* 默认返回类型就是对象类型本身
* 只能与`new`运算符结合使用

值得注意的是，如果为构造方法定义了返回值类型或使用 void 声明构造方法没有返回值，编译时不会出错，但 Java 会把这个所谓的构造方法当成普通方法来处理。

构造方法不是没有返回值吗？为什么不能用 void 声明呢？

简单的说，这是 Java 的语法规定。实际上，类的构造方法是有返回值的，当使用 new 关键字来调用构造方法时，构造方法返回该类的实例，可以把这个类的实例当成构造器的返回值，因此构造器的返回值类型总是当前类，无须定义返回值类型。但必须注意不要在构造方法里使用`return`来返回当前类的对象，因为构造方法的返回值是隐式的。

注意：构造方法不能被`static、final、synchronized、abstract`和`native`（类似于`abstract`）修饰。构造方法用于初始化一个新对象，所以用`static`修饰没有意义。构造方法不能被子类继承，所以用`final`和`abstract`修饰没有意义。多个线程不会同时创建内存地址相同的同一个对象，所以用`synchronized`修饰没有必要。

构造方法的语法格式如下：
```java
class class_name {
  public class_name(){}    // 默认无参构造方法
  public ciass_name([paramList]){}    // 定义构造方法
  …
  // 类主体
}
```
在一个类中，与类名相同的方法就是构造方法。每个类可以具有多个构造方法，但要求它们各自包含不同的方法参数。

构造方法主要有无参构造方法和有参构造方法两种：
```java
public class MyClass {
  private int m;  // 定义私有变量
  MyClass() {
    // 定义无参的构造方法
    m = 0;
  }
  MyClass(int m) {
    // 定义有参的构造方法
    this.m = m;
  }
}
```
在一个类中定义多个具有不同参数的同名方法，这就是方法的重载。这两个构造方法的名称都与类名相同，均为`MyClass`。在实例化该类时可以调用不同的构造方法进行初始化。

注意：类的构造方法不是要求必须定义的。如果在类中没有定义任何一个构造方法，则 Java 会自动为该类生成一个默认的构造方法。默认的构造方法不包含任何参数，并且方法体为空。如果类中显式地定义了一个或多个构造方法，则 Java 不再提供默认构造方法。

> 提示：无参数的构造方法也被称为`Nullary`构造方法。只有编译程序自动加入的构造方法，才称为默认构造函数。如果自行编写无参数、没有内容的构造函数，就不称为默认构造函数了（只是`Nullary`构造函数）。虽然只是名词定义，不过认证考试时要区别一下两者的不同。

要在不同的条件下使用不同的初始化行为创建类的对象，这时候就需要在一个类中创建多个构造方法。
```java
public class Worker {
  public String name;    // 姓名
  private int age;    // 年龄
  // 定义带有一个参数的构造方法
  public Worker(String name) {
    this.name = name;
  }
  // 定义带有两个参数的构造方法
  public Worker(String name,int age) {
    this.name = name;
    this.age = age;
  }
  public String toString() {
    return "大家好！我是新来的员工，我叫"+name+"，今年"+age+"岁。";
  }
}
```
```java
public class TestWorker {
  public static void main(String[] args) {
    System.out.println("-----------带有一个参数的构造方法-----------");
    // 调用带有一个参数的构造方法
    Worker worker1 = new Worker("张强");
    System.out.println(worker1);
    System.out.println("-----------带有两个参数的构造方法------------");
    // 调用带有两个参数的构造方法
    Worker worker2 = new Worker("李丽",25);
    System.out.println(worker2);
  }
}
```
所有的 Java 对象都是在堆中构造的，构造器总是伴随着`new`操作符一起使用。

输出的结果如下：
```
-----------带有一个参数的构造方法-----------
大家好！我是新来的员工，我叫张强，今年0岁。
-----------带有两个参数的构造方法------------
大家好！我是新来的员工，我叫李丽，今年25岁。
```
通过调用带参数的构造方法，在创建对象时，一并完成了对象成员的初始化工作，简化了对象初始化的代码。
# 析构方法
析构方法与构造方法相反，当对象脱离其作用域时（例如对象所在的方法已调用完毕），系统自动执行析构方法。析构方法往往用来做清理垃圾碎片的工作，例如在建立对象时用`new`开辟了一片内存空间，应退出前在析构方法中将其释放。

在 Java 的`Object`类中还提供了一个`protected`类型的`finalize()`方法，因此任何 Java 类都可以覆盖这个方法，在这个方法中进行释放对象所占有的相关资源的操作。

对象的`finalize()`方法具有如下特点：
* 垃圾回收器是否会执行该方法以及何时执行该方法，都是不确定的。
* `finalize()`方法有可能使用对象复活，使对象恢复到可触及状态。
* 垃圾回收器在执行`finalize()`方法时，如果出现异常，垃圾回收器不会报告异常，程序继续正常运行。

```java
protected void finalize() {
  // 对象的清理工作
}
```
下面通过一个例子来讲解析构方法的使用。该例子计算从类中实例化对象的个数。
```java
public class Counter {
  private static int count = 0;    // 计数器变量
  public Counter() {
    // 构造方法
    this.count++;    // 创建实例时增加值
  }
  public int getCount() {
    // 获取计数器的值
    return this.count;
  }
  protected void finalize() {
    // 析构方法
    this.count--;    // 实例销毁时减少值
    System.out.println("对象销毁");
  }
}
```
```java
public class TestCounter {
  public static void main(String[] args) {
    Counter cnt1 = new Counter();    // 建立第一个实例
    System.out.println("数量："+ cnt1.getCount());    // 输出1
    Counter cnt2 = new Counter();    // 建立第二个实例
    System.out.println("数量："+ cnt2.getCount());    // 输出2
    cnt2 = null;    // 销毁实例2
    try {
      System.gc();    // 清理内存
      Thread.currentThread().sleep(1000);    // 延时1000毫秒
      System.out.println("数量："+cnt1.getCount());    // 输出1
    } catch(InterruptedException e) {
      e.printStackTrace();
    }
  }
}
```
执行后输出结果：
```
数量：1
数量：2
对象销毁
数量：1
```
技巧：由于`finalize()`方法的不确定性，所以在程序中可以调用`System.gc()`或者`Runtime.gc()`方法提示垃圾回收器尽快执行垃圾回收操作。
