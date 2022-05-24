# juejin-count
[![NPM Version](http://img.shields.io/npm/v/juejin-count.svg?style=flat)](https://www.npmjs.org/package/juejin-count)
[![NPM Downloads](https://img.shields.io/npm/dm/juejin-count.svg?style=flat)](https://npmcharts.com/compare/juejin-count?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=juejin-count)](https://packagephobia.now.sh/result?p=juejin-count)

# 使用
![image](image/01.png)
```javascript
// count.js
import {count} from 'juejin-count'

count([1, 1, 1, 2, 2, 3], ['+', '+', '*', '*', '/'], 11)
```

```
$ node count.js
最终表达式：
[
  1,   '+', 1,   '/', 1,
  '*', 2,   '*', 2,   '+',
  3
]
最终表达式从左至右计算即可得到结果
```
检验：((((1+1)/1)*2)*2)+3=11
