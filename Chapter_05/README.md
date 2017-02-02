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
ES3的正则表达式的字面量，是公用一个实例的，所以在循环匹配的时候，会出现lastIndex没有变化的问题。

 实例属性
 - global
 - ignorecase
 - lastIndex
 - mutltiline
 - source

##### 5.4.2 实例方法
exec(): 专为捕获组为实现的方法，有index，input，match数组

