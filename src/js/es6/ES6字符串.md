---
title: ES6字符串
date: 2023-01-15
tags: es6
categories: 前端
order: 3
---

## 字符串的遍历器接口
ES6 为字符串添加了遍历器接口，使字符串可以被`for...of`循环遍历。
```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
## JSON.stringify() 的改造
根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的`JSON.stringify()`方法有可能返回不符合 UTF-8 标准的字符串。

具体来说，UTF-8 标准规定，`0xD800`到`0xDFFF`之间的码点，不能单独使用，必须配对使用。比如，`\uD834\uDF06`是两个码点，但是必须放在一起配对使用，代表字符`𝌆`。这是为了表示码点大于`0xFFFF`的字符的一种变通方法。单独使用`\uD834`和`\uDF06`这两个码点是不合法的，或者颠倒顺序也不行，因为`\uDF06\uD834`并没有对应的字符。

`JSON.stringify()`的问题在于，它可能返回`0xD800`到`0xDFFF`之间的单个码点。
```js
JSON.stringify('\u{D834}') // "\u{D834}"
```
为了确保返回的是合法的 UTF-8 字符，ES2019 改变了`JSON.stringify()`的行为。如果遇到`0xD800`到`0xDFFF`之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
```js
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 模板字符串
模板字符串是增强版的字符串，用反引号(`)标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```js
// 普通字符串
`In JavaScript '\n' is a line-feed.`
// 多行字符串
`In JavaScript this is
 not legal.`
console.log(`string text line 1
string text line 2`);
// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
```js
let greeting = `\`Yo\` World!`;
```
如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
```
如果不想要这个换行，可以使用`trim`方法消除它。
```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```
模板字符串中嵌入变量，需要将变量名写在`${}`之中。
```js
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '+user.name+' is not authorized to do '+action+'.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
```
大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
```js
let x = 1;
let y = 2;
`${x}+${y}=${x+y}` // "1+2=3"
`${x}+${y*2}=${x+y*2}` // "1+4=5"
let obj = {x: 1, y: 2};
`${obj.x + obj.y}` // "3"
```
模板字符串之中还能调用函数。
```js
function fn() {
  return "Hello World";
}
`foo ${fn()} bar` // foo Hello World bar
```
如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的`toString`方法。
如果模板字符串中的变量没有声明，将报错。
```js
// 变量place没有声明
let msg=`Hello, ${place}`; // 报错
```
由于模板字符串的大括号内部，就是执行JavaScript代码，因此如果大括号内部是一个字符串，将会原样输出。
```js
`Hello ${'World'}` // "Hello World"
```
模板字符串甚至还能嵌套。
```js
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```
上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。
```js
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));
// <table>
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
// </table>
```
如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。
```js
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"
// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"
```
## 实例：模板编译
下面，我们来看一个通过模板字符串，生成正式模板的实例。
```js
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
```
上面代码在模板字符串之中，放置了一个常规模板。该模板使用`<%...%>`放置JavaScript代码，使用`<%= ... %>`输出JavaScript表达式。

怎么编译这个模板字符串呢？
一种思路是将其转换为JavaScript表达式字符串。
```js
echo('<ul>');
for(let i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');
```
这个转换使用正则表达式就行了。
```js
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;
template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');
template = 'echo(`' + template + '`);';
```
然后，将`template`封装在一个函数里面返回，就可以了。
```js
let script =
`(function parse(data){
  let output = "";
  function echo(html){
    output += html;
  }
  ${ template }
  return output;
})`;
return script;
```
将上面的内容拼装成一个模板编译函数`compile`。
```js
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;
  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');
  template = 'echo(`' + template + '`);';
  let script =
  `(function parse(data){
    let output = "";
    function echo(html){
      output += html;
    }
    ${ template }
    return output;
  })`;
  return script;
}
```
`compile`函数的用法如下。
```js
let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```
###  标签模板
模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能。
```js
alert`123`
// 等同于
alert(123)
```
标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
```js
let a = 5;
let b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```
上面代码中，模板字符串前面有一个标识名`tag`，它是一个函数。整个表达式的返回值，就是`tag`函数处理模板字符串后的返回值。
函数`tag`依次会接收到多个参数。
```js
function tag(stringArr, value1, value2){
  // ...
}
// 等同于
function tag(stringArr, ...values){
  // ...
}
```
`tag`函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。
`tag`函数的其他参数，都是模板字符串各个变量被替换后的值。由于本例中，模板字符串含有两个变量，因此`tag`会接受到`value1`和`value2`两个参数。
`tag`函数所有参数的实际值如下。
*   第一个参数：`['Hello ', ' world ', '']`
*   第二个参数: 15
*   第三个参数：50

也就是说，`tag`函数实际上以下面的形式调用。
```js
tag(['Hello ', ' world ', ''], 15, 50)
```
下面是`tag`函数的一种写法，以及运行结果。
```js
let a = 5;
let b = 10;
function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);
  return "OK";
}
tag`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"
```
下面是一个更复杂的例子。
```js
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;
function passthru(literals) {
  let result = '';
  let i = 0;
  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }
  return result;
}
msg // "The total is 30 (31.5 with tax)"
```
上面这个例子展示了，如何将各个参数按照原来的位置拼合回去。
`passthru`函数采用`rest`参数的写法如下。
```js
function passthru(literals, ...values) {
  let output = "";
  let index;
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }
  output += literals[index]
  return output;
}
```
“标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。
```js
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;
function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);
    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```
上面代码中，`sender`变量往往是用户提供的，经过`SaferHTML`函数处理，里面的特殊字符都会被转义。
```js
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
```
标签模板的另一个应用，就是多语言转换（国际化处理）。
```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"
```
模板字符串本身并不能取代Mustache之类的模板库，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。
```js
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
let libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
```
除此之外，你甚至可以使用标签模板，在JavaScript语言之中嵌入其他语言。
```js
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`
```
上面的代码通过`jsx`函数，将一个DOM字符串转为React对象。

下面则是一个假想的例子，通过`java`函数，在JavaScript代码之中运行Java代码。
```js
java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println(“Hello World!”); // Display the string.
  }
}
`
HelloWorldApp.main();
```
模板处理函数的第一个参数（模板字符串数组），还有一个`raw`属性。
```js
console.log`123` // ["123", raw: Array[1]]
```
上面代码中，`console.log`接受的参数，实际上是一个数组。该数组有一个`raw`属性，保存的是转义后的原字符串。
```js
tag`First line\nSecond line`
function tag(strings) {
  console.log(strings.raw[0]);
  // strings.raw[0] 为 "First line\\nSecond line"
  // 打印输出 "First line\nSecond line"
}
```
上面代码中，`tag`函数的第一个参数`strings`，有一个`raw`属性，也指向一个数组。该数组的成员与`strings`数组完全一致。比如，`strings`数组是`["First line\nSecond line"]`，那么`strings.raw`数组就是`["First line\\nSecond line"]`。两者唯一的区别，就是字符串里面的斜杠都被转义了。比如，`strings.raw`数组会将`\n`视为`\\`和`n`两个字符，而不是换行符。这是为了方便取得转义之前的原始模板而设计的。
## String.raw()
`String.raw`方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义(即斜杠前面再加一个斜杠)的字符串，对应于替换变量后的模板字符串。
```js
String.raw`Hi\n${2+3}!`; // 返回 "Hi\\n5!"
String.raw`Hi\u000A!`; // 返回 "Hi\\u000A!"
```
如果原字符串的斜杠已经转义，那么`String.raw`会进行再次转义。
```js
String.raw`Hi\\n` // 返回 "Hi\\\\n"
```
`String.raw`方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。
`String.raw`方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有`raw`属性的对象，且`raw`属性的值应该是一个数组。
```js
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```
作为函数，`String.raw`的代码实现基本如下。
```js
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }
  output += strings.raw[index]
  return output;
}
```
## 模板字符串的限制
标签模板里面可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。
举例来说，标签模板里面可以嵌入LaTEX语言。
```js
function latex(strings) {
  // ...
}
let document = latex`
\newcommand{\fun}{\textbf{Fun!}}  // 正常工作
\newcommand{\unicode}{\textbf{Unicode!}} // 报错
\newcommand{\xerxes}{\textbf{King!}} // 报错
Breve over the h goes \u{h}ere // 报错
`
```
上面代码中，变量`document`内嵌的模板字符串，对于LaTEX语言来说完全是合法的，但是JavaScript引擎会报错。原因就在于字符串的转义。

模板字符串会将`\u00FF`和`\u{42}`当作`Unicode`字符进行转义，所以`\unicode`解析时报错；而`\x56`会被当作十六进制字符串转义，所以`\xerxes`会报错。也就是说，`\u`和`\x`在LaTEX里面有特殊含义，但是JavaScript将它们转义了。

为了解决这个问题，ES2018放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回`undefined`，而不是报错，并且从`raw`属性上面可以得到原始字符串。
```js
function tag(strs) {
  strs[0] === undefined
  strs.raw[0] === "\\unicode and \\u{55}";
}
tag`\unicode and \u{55}`
```
上面代码中，模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了JavaScript引擎将第一个字符设置为`undefined`，但是`raw`属性依然可以得到原始字符串，因此`tag`函数还是可以对原字符串进行处理。

注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。
```js
let bad = `bad escape sequence: \unicode`; // 报错
```
## 实例方法：codePointAt()
JS 内部，字符以 UTF-16 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JS 会认为它们是两个字符。
```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```
上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是`0x20BB7`，UTF-16 编码为`0xD842 0xDFB7`（十进制为`55362 57271`），需要 4 个字节储存。对于这种 4 个字节的字符，JS 不能正确处理，字符串长度会误判为 2，而且`charAt()`方法无法读取整个字符，`charCodeAt()`方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了`codePointAt()`方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
```js
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
```
`codePointAt()`方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将`𠮷a`视为三个字符，`codePointAt`方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的`20BB7`）。在第二个字符（即“𠮷”的后两个字节）和第三个字符`a`上，`codePointAt()`方法的结果与`charCodeAt()`方法相同。

总之，`codePointAt()`方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与`charCodeAt()`方法相同。

`codePointAt()`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用`toString()`方法转换一下。
```js
let s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
```
你可能注意到了，`codePointAt()`方法的参数，仍然是不正确的。比如，上面代码中，字符`a`在字符串`s`的正确位置序号应该是 1，但是必须向`codePointAt()`方法传入 2。解决这个问题的一个办法是使用`for...of`循环，因为它会正确识别 32 位的 UTF-16 字符。
```js
let s = '𠮷a';
for (let ch of s) {
console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```
另一种方法也可以，使用扩展运算符（`...`）进行展开运算。
```js
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61
```
`codePointAt()`方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
```js
function is32Bit(c) {
return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```
## 实例方法：includes(), startsWith(), endsWith()
传统上，JS 只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
* `includes()`：返回布尔值，表示是否找到了参数字符串
* `startsWith()`：返回布尔值，表示参数字符串是否在源字符串的头部
* `endsWith()`：返回布尔值，表示参数字符串是否在源字符串的尾部

```js
var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
这三个方法都支持第二个参数，表示开始搜索的位置。
```js
var s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```
使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。
## 实例方法：repeat()
`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。
```js
'x'.repeat(3) // "xxx"
'na'.repeat(0) // ""
```
参数如果是小数，会被取整。
```js
'na'.repeat(2.9) // "nana"
```
如果`repeat`的参数是负数或者`Infinity`，会报错。
```js
'na'.repeat(Infinity)  // RangeError
'na'.repeat(-1)  // RangeError
```
但是，如果参数是 0 到 -1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到 -1 之间的小数，取整以后等于 -0，`repeat`视同为 0。
```js
'na'.repeat(-0.9) // ""
```
参数`NaN`等同于 0。
```js
'na'.repeat(NaN) // ""
```
如果`repeat`的参数是字符串，则会先转换成数字。
```js
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```
## 实例方法：padStart()，padEnd()
如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
`padStart`和`padEnd`一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
```js
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
````
如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
```js
'abc'.padStart(10,'0123456789')  // '0123456abc'
```
如果省略第二个参数，默认使用空格补全长度。
```js
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```
`padStart`的常见用途是为数值补全指定位数。
```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```
另一个用途是提示字符串格式。
```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```
## 实例方法：trimStart()，trimEnd()
`trimStart()`和`trimEnd()`这两个方法的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```
除了空格键，这两个方法对字符串头部（或尾部）的`tab`键、换行符等不可见的空白符号也有效。

浏览器还部署了额外的两个方法，`trimLeft()`是`trimStart()`的别名，`trimRight()`是`trimEnd()`的别名。
## 实例方法：matchAll()
`matchAll`方法返回一个正则表达式在当前字符串的所有匹配。
## 实例方法：replaceAll()
历史上，字符串的实例方法`replace()`只能替换第一个匹配。
```js
'aabbcc'.replace('b', '_')
// 'aa_bcc'
```
上面例子中，`replace()`只将第一个`b`替换成了下划线。

如果要替换所有的匹配，不得不使用正则表达式的`g`修饰符。
```js
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```
正则表达式毕竟不是那么方便和直观，ES2021 引入了`replaceAll()`方法，可以一次性替换所有匹配。
```js
'aabbcc'.replaceAll('b', '_')
// 'aa__cc'
```
它的用法与`replace()`相同，返回一个新字符串，不会改变原字符串。
```js
String.prototype.replaceAll(searchValue, replacement)
```
上面代码中，`searchValue`是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有`g`修饰符）。

如果`searchValue`是一个不带有`g`修饰符的正则表达式，`replaceAll()`会报错。这一点跟`replace()`不同。
```js
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错
'aabbcc'.replaceAll(/b/, '_')
```
`replaceAll()`的第二个参数`replacement`是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。
* `$&`：匹配的字符串。
* `$` ：匹配结果前面的文本。
* `$`'：匹配结果后面的文本。
* `$n`：匹配成功的第`n`组内容，`n`是从 1 开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
* `$$`：指代美元符号`$`。

```js
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
```
`replaceAll()`的第二个参数`replacement`除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数`searchValue`匹配的文本。
```js
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'
```
上面例子中，`replaceAll()`的第二个参数是一个函数，该函数的返回值会替换掉所有`b`的匹配。

这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。
```js
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456
```
上面例子中，正则表达式有三个组匹配，所以`replacer()`函数的第一个参数`match`是捕捉到的匹配内容（即字符串`123abc456`），后面三个参数`p1、p2、p3`则依次为三个组匹配。
## 实例方法：at()
`at()`方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。
```js
const str = 'hello';
str.at(1) // "e"
str.at(-1) // "o"
```
如果参数位置超出了字符串范围，`at()`返回`undefined`。
