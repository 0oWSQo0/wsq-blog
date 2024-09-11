



检测数组是否包含任何重复项
```js
const hasDuplicates = (array) => new Set(array).size !== array.length
```
快速确定数组是否包含特定值
```js
const hasValue = arr.includes(value)
```
将字符串的首字母转换为大写
```js
const capitalized = str.charAt(0).toUpperCase() + str.slice(1)
```
交换两个变量的值
```js
let a = 1, b = 2
[b, a] = [a, b]
```
将任何字符串转换为驼峰式大小写格式
```js
const str = 'hello world'
const camelCase = str.replace(/\s(.)/g, ($1) => $1.toUpperCase()).replace(/\s/g, '').replace(/^(.)/, ($1) => $1.toLowerCase())
console.log(camelCase); // "helloWorld"
```
查找数组中的最大值
```js
const maxNumber = (arr) => Math.max(...arr)
```
检查字符串是否为回文
```js
const isPalindrome = (str) => str === str.split('').reverse().join('')
```
从数组中删除重复项
```js
const uniqueArray = (arr) => [...new Set(arr)]
```
生成随机十六进制颜色
```js
const randomHexColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`
```
展平数组
```js
const flattenArray = (arr) => arr.flat()
```
将字符串中每个单词的首字母大写
```js
const capitalizeWords = (str) => str.replace(/\b\w/g, char => char.toUpperCase())
```
查找两个数组的交集
```js
const arrayIntersection = (arr1, arr2) => arr1.filter(value => arr2.includes(value))
```
获取数组中的最后一项
```js
const getLastItem = (arr) => arr.slice(-1)[0]
```
计算数组中某个值的出现次数
```js
const countOccurrences = (arr, value) => arr.reduce((acc, cur) => (cur === value ? acc + 1 : acc), 0)
```
反转字符串
```js
const reverseString = (str) => str.split('').reverse().join('')
```
从数组中删除假值
```js
const removeFalsyValues = (arr) => arr.filter(Boolean)
```
计算数字的阶乘
```js
const factorial = (num) => num <= 1 ? 1 : num * factorial(num - 1)
```
检查对象是否为空
```js
const isObjectEmpty = (obj) => Object.keys(obj).length === 0
```
深度克隆对象
```js
const deepClone = (obj) => JSON.parse(JSON.stringify(obj))
```
将 rgba 转换为十六进制
```js
const rgbaToHex = (r, g, b) => "#" + [r, g, b].map(num => parseInt(num).toString(16).padStart(2, '0')).join('')
rgbaToHex(0, 0 ,0) // #000000
rgbaToHex(255, 0, 127) //#ff007f
```
将十六进制转换为 rgba
```js
const hexToRgba = hex => {
    const [r, g, b] = hex.match(/\w\w/g).map(val => parseInt(val, 16))
		return `rgba(${r}, ${g}, ${b}, 1)`;
}
hexToRgba('#000000') // rgba(0, 0, 0, 1)
hexToRgba('#ff007f') // rgba(255, 0, 127, 1)
```
获取多个数字的平均值
```js
const average = (...args) => args.reduce((a, b) => a + b, 0) / args.length
average(0, 1, 2, -1, 9, 10) // 3.5
```
获取两个整数之间的随机整数
```js
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
random(1, 100) // 27
random(1, 100) // 84
random(1, 100) // 55
```
清除所有 cookie
```js
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
```
滚动到页面顶部
```js
const goToTop = () => window.scrollTo(0, 0)
goToTop()
```
随机 IP
```js
const generateRandomIP = () => {
    return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
}

generateRandomIP() // 220.187.184.113
generateRandomIP() // 254.24.179.151
```
