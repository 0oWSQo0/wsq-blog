






在ES6之前，模块加载方案最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 实现了模块功能，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从`fs`模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。当然，这也导致了没法引用ES6模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（`macro`）和类型检验（`type system`）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6模块还有以下好处。
* 不再需要UMD模块格式了，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一点。
* 将来浏览器的新API就能用模块格式提供，不再必须做成全局变量或者`navigator`对象的属性。
* 不再需要对象作为命名空间（比如`Math`对象），未来这些功能可以通过模块提供。


## export
模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口。`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。
```js
//profile.js
export var firstName='zhang';
export var year=2000;
//另一种写法
var firstName='zhang';
var year=2000;
export {firstName,year};
```
上面代码在`export`命令后面，使用大括号指定所要输出的一组变量。

`export`命令除了可以输出变量，还可以输出函数或类。
```js
export function multiply(x,y) {
  return x * y;
};
```
通常情况下，`export`输出的变量就是本来的名字，但是可以使用`as`关键字重命名。
```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
重命名后，`v2`可以用不同的名字输出两次。

需要特别注意的是，`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
```js
// 报错
export 1;
// 报错
var m = 1;
export m;
```
上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量`m`，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样。
```js
// 写法一
export var m = 1;
// 写法二
var m = 1;
export {m};
// 写法三
var n = 1;
export {n as m};
```
上面三种写法都是正确的，规定了对外的接口`m`。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

同样的，`function`和`class`的输出，也必须遵守这样的写法。
```js
// 报错
function f() {}
export f;
// 正确
export function f() {};
// 正确
function f() {}
export {f};
```
另外，`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新。
```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```
最后，`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，`import`命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6 模块的设计初衷。
```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```
## import
使用`export`命令定义了模块的对外接口以后，其他JS文件就可以通过`import`命令加载这个模块。
```js
// main.js
import {firstName,year} from './profile.js';
function setName(element) {
  element.textContent=firstName+' '+year;
}
```
`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。
如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。
```js
import { lastName as surname } from './profile.js';
```
`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
```js
import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
```
上面代码中，脚本加载了变量`a`，对其重新赋值就会报错，因为`a`是一个只读的接口。但是，如果`a`是一个对象，改写`a`的属性是允许的。
```js
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
```
`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js`后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉JS引擎该模块的位置。
```js
import {myMethod} from 'util';
```
注意，`import`命令具有提升效果，会提升到整个模块的头部，首先执行。
```js
foo();
import { foo } from 'my_module';
```
上面的代码不会报错，因为`import`的执行早于`foo`的调用。这种行为的本质是，`import`命令是编译阶段执行的，在代码运行之前。

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
```js
// 报错
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;
// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```
最后，`import`语句会执行所加载的模块，因此可以有下面的写法。
```js
import 'lodash';
```
上面代码仅仅执行`lodash`模块，但是不输入任何值。
如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。
```js
import 'lodash';
import 'lodash';

import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
```
目前阶段，通过Babel转码，CommonJS模块的`require`命令和ES6模块的`import`命令，可以写在同一个模块里面，但是最好不要这样做。因为`import`在静态解析阶段执行，所以它是一个模块之中最早执行的。
## 模块的整体加载
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
```js
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
现在，加载这个模块。
```js
// main.js
import { area, circumference } from './circle';
console.log('圆面积：'+area(4));
console.log('圆周长：'+circumference(14));
```
上面写法是逐一指定要加载的方法，整体加载的写法如下。
```js
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```
注意，模块整体加载所在的那个对象（上例是`circle`），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
```js
import * as circle from './circle';
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```
## export default命令
使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，就要用到`export default`命令，为模块指定默认输出。
```js
// export-default.js
export default function () {
  console.log('foo');
}
```
上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。
其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。
```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
上面代码的`import`命令，可以用任意名称指向`export-default.js`输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时`import`命令后面，不使用大括号。
`export default`命令用在非匿名函数前，也是可以的。
```js
// export-default.js
export default function foo() {
  console.log('foo');
}
// 或者写成
function foo() {
  console.log('foo');
}
export default foo;
```
上面代码中，`foo`函数的函数名`foo`，在模块外部是无效的。加载的时候，视同匿名函数加载。

下面比较一下默认输出和正常输出。
```js
// 第一组
export default function crc32() { // 输出
  // ...
}
import crc32 from 'crc32'; // 输入
// 第二组
export function crc32() { // 输出
  // ...
};
import {crc32} from 'crc32'; // 输入
```
上面代码的两组写法，第一组是使用`export default`时，对应的`import`语句不需要使用大括号；第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，`import`命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```
正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。
```js
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
export default var a = 1;
```
上面代码中，`export default a`的含义是将变量`a`的值赋给变量`default`。所以，最后一种写法会报错。

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。
```js
// 正确
export default 42;
// 报错
export 42;
```
有了`export default`命令，输入模块时就非常直观了，以输入`lodash`模块为例。
```js
import _ from 'lodash';
```
如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。
```js
import _,{each,each as forEach} from 'lodash';
```
对应上面代码的`export`语句如下。
```js
export default function (obj) {
  // ···
}
export function each(obj, iterator, context) {
  // ···
}
export { each as forEach };
```
`export default`也可以用来输出类。
```js
// MyClass.js
export default class { ... }
// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```
## export与import的复合写法
如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。
```js
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
上面代码中，`export`和`import`语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

模块的接口改名和整体输出，也可以采用这种写法。
```js
// 接口改名
export { foo as myFoo } from 'my_module';
// 整体输出
export * from 'my_module';
默认接口的写法如下。
export { default } from 'foo';
```
具名接口改为默认接口的写法如下。
```js
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;
```
同样地，默认接口也可以改名为具名接口。
```js
export { default as es6 } from './someModule';
```
下面三种`import`语句，没有对应的复合写法。
```js
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";
```
为了做到形式的对称，现在有提案，提出补上这三种复合写法。
```js
export * as someIdentifier from "someModule";
export someIdentifier from "someModule";
export someIdentifier, { namedIdentifier } from "someModule";

```
## 模块的继承
模块之间也可以继承。
假设有一个`circleplus`模块，继承了`circle`模块。
```js
// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```
上面代码中的`export *`，表示再输出`circle`模块的所有属性和方法。注意，`export *`命令会忽略`circle`模块的`default`方法。然后，上面代码又输出了自定义的`e`变量和默认方法。

这时，也可以将`circle`的属性或方法，改名后再输出。
```js
// circleplus.js
export { area as circleArea } from 'circle';
```
上面代码表示，只输出`circle`模块的`area`方法，且将其改名为`circleArea`。
加载上面模块的写法如下。
```js
// main.js
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```
上面代码中的`import exp`表示，将`circleplus`模块的默认方法加载为`exp`方法。
## 跨模块常量
`const`声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。
```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;
// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3
// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```
如果要使用的常量非常多，可以建一个专门的`constants`目录，将各种常量写在不同的文件里面，保存在该目录下。
```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};
// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```
然后，将这些文件输出的常量，合并在`index.js`里面。
```js
// constants/index.js
export {db} from './db';
export {users} from './users';
```
使用的时候，直接加载`index.js`就可以了。
```
// script.js
import {db, users} from './index';
```
## import()
`import`命令会被JS引擎静态分析，先于模块内的其他语句执行。所以，下面的代码会报错。
```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```
上面代码中，引擎处理`import`语句是在编译时，这时不会去分析或执行`if`语句，所以`import`语句放在`if`代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，`import`和`export`命令只能在模块的顶层，不能在代码块之中。
这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果`import`命令要取代Node的`require`方法，这就形成了一个障碍。因为`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能。
```js
const path = './' + fileName;
const myModual = require(path);
```
上面的语句就是动态加载，`require`到底加载哪一个模块，只有运行时才知道。`import`命令做不到这一点。
因此，有一个提案，建议引入`import()`函数，完成动态加载。
```js
import(specifier)
```
上面代码中，`import`函数的参数`specifier`，指定所要加载的模块的位置。`import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载。
`import()`返回一个`Promise`对象。下面是一个例子。
```js
const main = document.querySelector('main');
import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```
`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，`import()`函数与所加载的模块没有静态连接关系，这点也是与`import`语句不相同。`import()`类似于 Node 的`require`方法，区别主要是前者是异步加载，后者是同步加载。
### 适用场合
下面是`import()`的一些适用场合。
#### 1.按需加载。
`import()`可以在需要的时候，再加载某个模块。
```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```
上面代码中，`import()`方法放在`click`事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
#### 2.条件加载
`import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。
```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```
#### 3.动态的模块路径
`import()`允许模块路径动态生成。
```js
import(f()).then(...);
```
上面代码中，根据函数`f`的返回结果，加载不同的模块。
#### 注意点
`import()`加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```
上面代码中，`export1`和`export2`都是`myModule.js`的输出接口，可以解构获得。
如果模块有`default`输出接口，可以用参数直接获得。
```js
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```
上面的代码也可以使用具名输入的形式。
```js
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```
如果想同时加载多个模块，可以采用下面的写法。
```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```
`import()`也可以用在`async`函数之中。
```js
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```
## import.meta
开发者使用一个模块时，有时需要知道模板本身的一些信息（比如模块的路径）。ES2020 为`import`命令添加了一个元属性`import.meta`，返回当前模块的元信息。

`import.meta`只能在模块内部使用，如果在模块外部使用会报错。

这个属性返回一个对象，该对象的各种属性就是当前运行的脚本的元信息。具体包含哪些属性，标准没有规定，由各个运行环境自行决定。一般来说，`import.meta`至少会有下面两个属性。
### `import.meta.url`
`import.meta.url`返回当前模块的 URL 路径。举例来说，当前模块主文件的路径是`https://foo.com/main.js`，`import.meta.url`就返回这个路径。如果模块里面还有一个数据文件`data.txt`，那么就可以用下面的代码，获取这个数据文件的路径。
```js
new URL('data.txt', import.meta.url)
```

注意，Node.js 环境中，`import.meta.url`返回的总是本地路径，即`file:URL`协议的字符串，比如`file:///home/user/foo.js`。
### import.meta.scriptElement
`import.meta.scriptElement`是浏览器特有的元属性，返回加载模块的那个`<script>`元素，相当于`document.currentScript`属性。
```js
// HTML 代码为
// <script type="module" src="my-module.js" data-foo="abc"></script>

// my-module.js 内部执行下面的代码
import.meta.scriptElement.dataset.foo
// "abc"
```
### 其他
Deno 现在还支持`import.meta.filename`和`import.meta.dirname`属性，对应 CommonJS 模块系统的`__filename`和`__dirname`属性。
* `import.meta.filename`：当前模块文件的绝对路径。
* `import.meta.dirname`：当前模块文件的目录的绝对路径。

这两个属性都提供当前平台的正确的路径分隔符，比如 Linux 系统返回`/dev/my_module.ts`，Windows 系统返回`C:\dev\my_module.ts`。

本地模块可以使用这两个属性，远程模块也可以使用。
