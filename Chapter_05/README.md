# Chapter_05 引用类型
### 5.2 Array 类型
Array 引用类型的变量，可以对其length进行操作,会自动的根据数组的操作，进行对length相应的操作，保持length和元素个数的一致，同时对length属性的设置，也可添加属性，添加的默认值为undefined。

```
    var  arr = [2,3,4];
    console.log(arr.length);//3
    arr.length = 2;
    console.log(arr[2]);// undefined
    
```

##### 5.2.1 数组类型检测
在es3中，对于数组的检测可以通过instanceof 操作符来检测，而检测的方法
```
    if(value instanceof Array){
        // 对数组元素的操作
    }

```
而在多个的全局执行环境中创建的数组，比如从一个框架向另一个框架传入数组，这种检测的方法是存在弊端的，所翼ES5中新增了一个数组检测的方法,在IE9+,chrome,FF4+, safari 5+, op10+等浏览器中，可以通用，
```
    if(Array.isArray(value)){
        //对数组的操作
    }
```

##### 5.2.2 转化方法
所有的对象都具有toLocaleString(),toString(),valueOf(),方法，其中数组的转化为字符串的方法，toString是通过用逗号，连接每个元素的方法，调用每个元素的toString方法，而valueOf则返回的还是数组。toLocaleString()方法，调用的是每一个元素的toLocaleString，然后通过逗号连接，最后再返回连接的字符串。

```
    var person1 = {
        toString:function(){
            return "Nikolaos"
        },
        toLocaleString:function(){
            return "Nikolaos"
        }
    }
    var person2 = {
        toLocaleString:function(){
            return "Grigories"
        },
        toString:function(){
            return "Grep"
        }
    }

    var person = [person1,person2];
    console.log(person);
    console.log(person.toString());
    console.log(person.toLocaleString());
```

- Array.join
arr.join(separator),数组的join可以实现,用连接符连接数组的每个元素，返回连接的那个字符串。
```
    var res = [1,2,3].join("||");
    console.log(res);// 1||2||3
```

- Array.reverse,Array.sort
reverse(),sort(),都会改变原来的函数元素位置
reverse(),将函数反序，
sort(),则是传入一个比较函数，然后用这个函数进行比较,
此外还有 unshift，shift，push，pop，concat

-slice方法，这个方法有2个参数，其中一个是必须的参数，用来标志一个数组的开始和结束的位置，返回一个新的数组，若是其中的参数为负数，则将负数+数组的额长度，确定数组的下标
```
    var arr2 = [1,2,3,4].slice(-2,-1);
    console.log(arr2);// [3]
```

##### 位置函数
关于确定元素位置的函数，ES5新增了2个，分别是indexOf，lastIndexOf，在判断元素的时候会用全等 ===，但是，2个元素的差别是lastIndexOf是从后往前查找。找到则返回元素的下标，否则返回-1
- indexOf
- lastIndexOf

##### 迭代方法
- every(): 用给定函数遍历数组中的每个元素，如过每一项都返回true，则返回true
- some(): 用给定函数遍历数组中的每个元素，如果有一项返回true，则返回true
- filter(): 用给定函数遍历数组中的每个元素，如果返回true，则保留此元素，最后返回一个新的数组
- map(): 用给定函数遍历数组中的每个元素，返回一个元素，最后返回一个新的数组
- forEach：用给定函数遍历数组中的每个元素，不返回值

```
    var arr = [1,0];
    var if_true = arr.some(function(item){
        return item>0;
    });
    console.log(if_true);// true; 有一个元素大于0；
```

##### 缩小方法
ES5中定义了2个元素缩小到额方法，分别reduce，reduceRight，迭代所有的元素，返回一个值，不同的是reduce是从第一个元素开始迭代，而reduceRight从最后一个元素往前迭代，都接受2个参数，一个是迭代函数，另一个可选的迭代的初始值。
而传入的迭代函数则接受4个值，分别是上一个值，当前值，项的索引和索引对象。
```
    var values = [1,2,3,4];
    var sum = values.reduce(function(pre,next,index,arr){
        return pre+next;
    },0);

    console.log(sum);//10
```

支持的浏览器 ie9+,chrome,ff3+,safari4+ 

### Date 对象
Date对象，用来新建一个日期对象的方法有new Date(timestamp)，或者Date.parse(dateString),Date.UTC(); 而Date.parse(dateString),其中dateString的格式通常是一下所示，

Date.UTC(), Date.parse() 方式返回的是时间戳。
```
    // new Date(timestamp) demo ，当地时间
    console.log("new Date(timestamp) demo ",new Date(1485705600000));

    // Date.parse demo
    console.log("Date.parse demo ",Date.parse("Jan 30,2017"));
    console.log(Date.parse("1/30/2017"));
    console.log(Date.parse("Tue May 25 2017 00:00:00 GMT-0700"));
    console.log(Date.parse("2005-04-04T00:00:00")) //ISO 8601拓展格式，兼容ES5 才可以

    //Date.UTC() demo
    console.log("Date.UTC() demo ",Date.UTC(2017,01,23,13,44,44)); // UTC时间参数中年，月都是必须的，其他可省略，默认日期为1，其他为0
    
```

> 实际上，调用new Date的方式，直接传入dateString格式的，也可以新建一个数据对象，在后代会自动调用Date.parse方法。
> Date.now() 可以用于输出当前的时间戳

##### 5.3.1
Date 对象的toString(),toLocaleString(),valueOf() 方法的返回值，
```
    console.log("Date toString 的返回值 ", new Date().toString());
    console.log("Date toLocaleString() 的返回值 ",new Date().toLocaleString());
    console.log("Date valueOf 返回值 ", new Date().valueOf());
```

- valueOf() :返回的是时间戳
- toString(): 返回的是国际通用格式的时间字符串
- toLocaleString(): 返回的本地格式的时间字符串

##### 5.4.1
ES3的正则表达式的字面量，是公用一个实例的，所以在循环匹配的时候，会出现lastIndex没有变化的问题。即同一个匹配的字符串，多次用正则字面量匹配会继续匹配后面的部分。
 实例属性
 - global  全局匹配
 - ignorecase 忽略大小写
 - lastIndex 上次匹配的地方，exec常用
 - mutltiline   多行匹配
 - source  正则表达式的字面量表达式，不是对象字符串

##### 5.4.2 实例方法
exec(): 专为捕获组为实现的方法，有index，input，match数组，一个正则对象多次匹配，lastIndex会变化，而在IE浏览器下面，实现的lastIndex存在偏差，在非全局情况下，lastIndex也会变化。
test()：如果只是匹配字符串是否符合正则，而不用获取匹配的部分的常用方法。
```
    var text = "000-00-0000";
    var partten = /\d{3}-\d{2}-\d{4};
    if(partern.test(text)){
        console.log("/\d{3}-\d{2}-\d{4}"+".test "'000-00-0000'",tre)
    }
    
```

##### 5.4.3 正则表达式的构造函数属性
正则表达式有以下6个属性，其中有长属性，段属性的表示方式
input: $_ ,  最近一次要匹配的字符串
lastMatch: $&, 最近一个的匹配项
lastParen: $+, 最近一次匹配的捕获组，
leftontext: $`,  input字符串中lastMatch匹配的文本。
multiline:  $*, 布尔值，表示是否所有表达式都使用多行模式。
rightContext： $', input字符串中lastMatch未匹配的文本。

此外，构造函数的属性还有9个用于储存捕获组的属性，分别是$1,$2,$3,..$9


##### 5.4.4 模式的局限性
尽管js的正则还是比较完备的，但是缺少perl语言的高级特性，下面是一些不具备的特性
- 条件匹配
- 捕获的命名分组
- 向后查找
- 交集并集
- 原子组
- 正则注释
- s （single 单行匹配） 和x（无间隔匹配） 匹配模式
- unicode支持

### 5.5 Function类型

##### 5.5.4 caller 属性

caller是构造函数的一个属性，储存着调用这个函数的函数引用，若是全局下调用， 则为null，
```
    function inner(){
        console.log("i am called ，inner",inner.caller);
        console.log(inner.caller);
        console.log(auguments.callee.caller);
    }
    function outer(){
        console.log("outer,i call inner");
        inner();
    }
    outer();
```

严格模式下，arguments.callee 调用会抛错，同时es5中也定义了 arguments.caller ，但是，严格模式中会抛错，防止第三方代码窥视其他代码。同时，严格模式下，函数的caller赋值，也会抛错。



### 基本包装类型
基本类型的对象有String，Number，Boolean，三种
在定义基本类型的时候，基本类型的变量可以访问方法和属性，
```
    var str = "123";
    str.substring(1);
```
理由是在后台定义基本类型的时候已经为我们新建了一个对象，这个新建的实例，可以访问其原型链的所有的属性和方法。在定义变量和调用过程中可以被定义为
- 定义变量，创建一个对象实例
- 调用指定方法
- 销毁对象

而引用类型和基本类型的一个最主要的区别是变量的生存周期，基本类型的生存期只在指定代码的一瞬间，（如果没有其他引用这个变量的话），而引用类型的变量，则会在退出这个函数作用域都存在。

```
    var value = "25";
    var number = Number(value);
    console.log(typeof number) ;// number

    var obj = new Number(value);
    console.log(typeof obj);//obj

```
new 定义的对象和 普通的函数调用方式的定义的，返回的类型是不一样的。



##### 5.6.1

```
    var falseObject = new Boolean(false);
    var result = falseObject && true;
    console.log(result);// true;

    var falseValue = false;
    result = falseValue && true;
    console.log(result); //false
```

虽说Boolean 对valueOf,toString() 等方法，都重写了，但是在检查和这个对象是否为true，不是对其valueOf(),toString()进行求值，对象永远为true

> 此外基本类型和引用类型，还有2个区别，对typeof 进行求值得时候，基本类型会返回boolean，而引用类型会返回object，function，还有instanceOf ，基本类型会返回false，引用类型返回true


##### 5.6.2   Number

同理，Number包装对象，也重写了toLocaleStrign，valueOf()，toString(),此外还有，一些数字格式化的方法，比如
toFixed(): 用来格式小数点后几位的字符串表示

```
    var value = 1;
    console.log(value.toFixed(2));//'1.00'
```
toString(): 传入基数的参数，用来表示几进制的数据

> note: ie9以前版本的浏览器的toFixed，不能有效的四舍五入，在{(-0.94,-0.5],[0.5,0.94)},这个范围的值。

toExponential(): 以科学计数法来表示数，传入一个参数，指定输出结果的小数位数
toProcision(): 根据数值，去自动判断，用toFixed还是用toExponential()，来格式化数字。同样传入一个参数，指定小数位数。

##### 5.6.3 String
在字符串，计算length的时候，双字节字符算为一个字符长度
1.字符方法
- charAt():  访问指定字符
- charCodeAt: 访问字符码

2. slice ，substr，substring 参数传递负值的情况
    substring 的第一个参数传入负值，回默认从0开始取，slice，substr会根据字符串长度变化而定，
    而第二个参数，传入负值，slice会把负值变化为该字符串的长度，substring会变为0，substr也会把字符串变化为0。
3. indexOf , lastIndexOf : 插找字符串
4. trim(): ES5新增，删除前置和后置的空格，返回结果。 IE9+
5. toLowerCase，toUpperCase（）:字符串转大小写
6. match() ： 返回一个数组，第一个是匹配到的字符串，之后是捕获到的分组，
7. search： 若查找到，返回一个索引，否则返回-1，
8. replace(): replace 若是第二个参数是字符串的话，可以用
- $$ :  $
- $& :  匹配整个模式的字符串，lastMatch
- $' : 匹配子字符串之前的子字符串，leftContext
- $` : 匹配子字符串之后的子字符串，rightContext
- $n : 匹配第n个捕获分组
- $nn: 匹配 01-99 分组
若是第二个参数是函数,则会有3个参数，match，index（匹配在字符串中的位置），originalText(原始字符串)
9. localeCompare()： 
```
    var stringValue = "yellow";
    console.log(stringValue.localeCompare("brick"));// 1
    console.log(stringValue.localeCompare("yellow"));// 0
    console.log(stringValue.localeCompare("zoo"));// -1
```
10.fromCharCode: charCodeAt() 进行的相反的操作，
```
    console.log(String.fromCharCode(104,101,108));//hel
```


##### 5.7 单体内置对象
Global，Math
1. uri方法
- encodeURI(),encodeURIComponent()可以对URI进行编码，encodeURI主要对整个URI，encodeURIComponent主要对uri中的某一段，比如 http://www.a.com/a b.html,中的a b.html,encodeURI本身不会对特殊字符进行编码，比如正斜杠，某号等。
2.eval
严格模式下，外部访问不了eval内定义的任何变量。
3.ES5 禁止给undefined,NaN,Infinity负值，在非严格模式下，也会抛错。
4.window： 浏览器的window对象，是作为扩展global对象来定义的，es也没有指出任何去直接访问global，
```
    var global = function(){
        return this;
    }();
```

在全局环境下，直接返回this，为global，在任何环境下都可行。

##### 5.7.2 Math
Math.min ,Math.max
```
    var max = Math.max;
    console.log(max(1,2,3,4,5,6));
    
```
- Math.floor ： 向下舍
- Math.ceil : 向上舍
- Math.round  : 四舍五入
- Math.random : 获得一个 0-1之间的随机值
