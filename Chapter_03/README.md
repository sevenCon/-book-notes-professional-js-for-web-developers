# Chapter 03
### 3.4 数据类型
#### 浮点数的相加相等问题
js 中浮点数的相加 遵循 IEEE754 的标准的通病，es 并非就此一家，其他使用相同数值的语言也都有。
比如： 0.15+0.25 = 0.4  这个的相加就无此问题。
```
<!-- 浮点数的相加相等 -->
    var nmb_a = 0.15;
    var nmb_b = 0.25;
    var all = 0.4;
    if(nmb_a + nmb_b == all){
        console.log("浮点数的相加 "+nmb_a+" + "+ nmb_b + " == "+all+"?", "相等！");
    }else{
        console.log("浮点数的相加 "+nmb_a+" + "+ nmb_b + " == "+all+"?", "不相等！");
    }
    <!-- 就是这么玄乎 -->
    // ==>  0.1+0.2 = 0.30000000000000004 
    // ==>  0.15+0.25 = 0.4   
```
#### NaN类型的判断
```
isNaN，对于Object的对象而言，则会先调用valueOf(),判断是否可以转化为数字，如果是NaN，如果不能则再根据valueOf()的数，调用toString(),再测试返回值。这个过程也ECMASCRIPT操作符操作的过程。

var number_c = NaN;
if(isNaN(NaN)){
    console.log("NaN 类型的判断, isNaN有用吗？",isNaN(NaN));
}else{
    console.log("NaN 类型的判断, isNaN有用吗？",isNaN(NaN))
}   
           
    console.log("NaN == NaN ? ", NaN == NaN);
    console.log("NaN/2 ? ", NaN/2);
    console.log("任何数/0，返回都是NaN",1/0);

```

#### 数值转化
- Number()
- parseInt() 
- parseFloat()

##### Number() 的转化规则
- 如果是boolean格式的规则，true转为1，false转为0
- 如果是数字，则是简单的传入和返回
- null，转为0
- undefined转为NaN
- 如果是字符串，则遵循以下规则，、
    + 如果字符串中包含数字，则将其转化为十进制的数值，“1“ =》 1，“0123” =》 123，默认去掉无效的0
    + 如果包含浮点数值，则包含，忽略前导的0
    + 16进制的数值会转为10进制
    + 字符串为空，转为0
    + 若是包含以上以外的字符串，转化为NaN
- 若是参数为Object类型，则调用valueOf()方法，依照前面的规则转化返回的值，如果转化的对象是NaN,则调用toString(),再依照前面的规则，进行转化。
```
    //类型的转化
    console.log("Number("Hello,world!") ",Number("Hello,world!"));
    console.log("Number("") ", Number(""));
    console.log("Number("0123") ", Number("0123"));
    console.log("true ", true);
```

> note: 一元+ 操作符，和Number()的转化相同

##### parseInt()转化数字类型
parseInt()在转化数字类型的时候，和Number()不同的是，
- 会忽略浮点数后的小数
- 在转化时，会忽略前面的空格字符串，直遇到的第一个有效字符串"+","-"或数字，若是后面没有，则会返回NaN，而与Number("")不同的是，Number("")返回的是"0";

```
    // parseInt数字类型转化
    console.log("parseInt(\"01234blue\")",parseInt("01234blue"));
    console.log("parseInt(\"\") ",parseInt(""));
    console.log("parseInt(\"blue\") ",parseInt("blue");
    console.log("parseInt(\"1.12\") ",parseInt("1.12"));
```

> note:在ECMAScript 3 和ECMAScript 5 处理parseInt("070"),ES 3 认为应该是8进制，ES 5认为是10进制 
```
    console.log("070");
```
所以，为了消除以上的困惑，parseInt() ,具有第二个可选的参数，同时是16进制数，可以不写前导“0x” 字符串
```
    console.log("parseInt(\"oxAF\",16)",parseInt("0xAF",16));
    console.log("parseInt(\"oxAF\")",parseInt("0xAF"))
```

#### String类型的字符字面量
- \n 换行
- \t 制表
- \b 空格
- \r 回车
- \f 换页
- \\ 斜杠
- \' 单引号
- \" 双引号
- \nn 以16进制nn表示一个字符 n: [0-F] , 例如：  \x41 =>"A" 
- \unnnn unicode 字符

以上所有的字符串可以出现在字符串的任何位置，被当作一个单位字符别解析
比如：
```
    var text = "this is a the letter sigma： \u03a3";
    console.log(text.length); //==28
```

##### js 字符串不可改变，只能删除
> ECMAScript 的字符串不可改变，字符串一旦创建，他们的至就不可改变，要改变只能是新建一个新的字符串，然后销毁原来的字符串。

```
    var lang = "Java";
        lang = lang + "Script";
```

对于以上的操作，计算机首先创建一个容纳10个字符串的变量，然后把Java 和 Script 填充到这个变量，然后销毁原来的Java变量。

##### toString() , 转化为字符串
将一个变量转化为一个字符串有2中方法，若是该变量我null或者undefined,则会返回原来的类型,null或undefined

- 利用加晕算法，+ "" ，进行转化
- toString(),接受一个参数，判断字符串的进制数[基数]
```
    var num = 10;
    console.log(num.toString());//=>"10"
    console.log(num.toString(2));//=>"1010"
    console.log( num.toString(8));//=>"12"
    console.log(num.toString(10)); //=>"10"
    console.log(num.toString(16));//=>"a"
```

##### Object 类型

ECMAScript中，定义一个对象，
```
    var a = new Object();
    // 下面也行，但是并不推荐
    var a = new Object;
```
每个Object的实例都有以下的属性
- Contructor :用与保存创建当前的实例的函数，比如：以上的a的实力，Contructor就是Object(),这个函数，而不是他的原型对象
- hasOwnProperty(propertyName), 用于判断一个属性是否是当前对象的实例中，不是原型的属性
- isPrototypeOf(objectName) 判断一个对象是否是另一个对象的原型
- propertyIsEnumerable(propertyName): 用于检查给定的属性是否可以用for-in循环得到
- toLocalString(): 返回对象的字符串表示，该字符串与执行环境的地区对应
- valueOf()： 返回对象的字符串，布尔，数值表示，通常与toString()方法的返回值。
- toString(): 返回字符串的表示


### 3.5 操作符

##### 一元操作符
++，-- 等，一元操作，都是发生在赋值运算前。在计算机科学领域，称之为副效应。
```
    var age = 30;
    var anotherage = --age + 2;
    console.log(age,anotherage);
```

##### 位操作符
js 所有的数值都是采用，IEEE754-64 位储存，而位操作符并不直接操作64位的数据，而是将64位的值转化为32位的整数，然后直接操作，对于开发的人员，64位的数据是透明的。
负数的储存，是用补码储存的，补码的求法，是先求反码，再用反码加1的方式。

- & ：按位与 操作符，所有的数据，左操作符和右操作的值都为1的情况下，结果为1.
- ~ : 按位非 运算符，返回的结果就是，操作值得反码。

``` 
    var num1 = 25;    // 00000000000000000000000000011001
    var num2 = ~num1; // 11111111111111111111111111100110
    console.log(num2);
```

- | ：按位或 操作符，左操作符，右操作符，2者其中一个为1的情况，结果都为1.
- ^ : 按位异或 操作符， 左操作符和右操作符，相同的则结果为0，不同的则结果为1.
- 左移 <<  : 左移运算符
```
    var oldvalue = 2;  //二进制 10
    var newvalue = oldvalue << 5; //二进制 1000000 ，十进制的64
```
- >> :有符号位的右移, 操作符向右移动，空位用符号为补全。
- >>> : 无符号位的右移，对于正数，有符号位右移和无符号位右移，结果相同，但是负数就不同，负数是用补码的形式储存的，负数的无符号位的右移会导致结果很大。

```
    var oldvalue = -64;            //二进制的 11111111111111111111111111000000 
    var newvalue = oldvalue >>> 5; //10进制的134217726
```

##### 布尔操作符

- 逻辑非 ！

```
    console.log('!""',!"");     // true
    console.log('!NaN',!NaN);   // true
    console.log('!undefined',!undefined);   //true
    console.log('!1234',!1234); // false
    console.log('!0',!0);       //false
    console.log("!'false'",!'false'); // false
```

- 逻辑与 && ，短路操作
    + 如果第一个操作符是对象，则返回第二个操作符
    + 如果两个操作符都是对象，则返回第二个操作符
    + 如果第二个操作符是对象，则只有第一个为true的情况下，才会返回对象
    + 如果有一个操作符是null,NaN,undefined,则会返回他们本身

```
    var found = false;
    var result = (found && someUndefinedVariable); //这里发生错误
    console.log(result); //这里不会执行
```

- 逻辑或 || 
    + 如果两个操作符都是对象，则返回第一个操作符
    + 如果第一个操作符是对象，则返回第一个操作符
    + 如果第一个操作符是false，则返回第二个操作符
    + 如果两个操作符都是NaN，null，undefined，则返回NaN，null,undefined
如果第一个操作符的运算结果是true，则不会计算第二个值了。

```
    // 运用
    var myobject = preferredObject || backObject;
    
```

##### 加法操作符
- + 运算符的运算规则
    + 如果有一个运算符是 NaN，则结果是NaN
    +  infinity + infinity = infinity
    +  -infinity + infinity = NaN
    +  -infinity + -infinity = -Infinity
    +  +0 + +0 = +0;
    +  -0 + -0 = -0;
    +  -0 + +0 = +0;
    +  如果至少有一个操作符是字符串
        *  2个字符串相加，简单的字符串连接
        *  如果有一个操作符是字符串，则将另一个操作符转化为字符串，再连接字符串
        
##### 减法操作符
- 如果都是数值，这进行数值的比较
- 如果都是字符串,比较2个字符编码值
- 如果有一个是数值，则将另一个转化为数值比较
- 如果是bool,则转化为数值在进行比较
- 如果一个是对象，则会调用valueOf()，没有则调用toString方法，根据得到的结果再进行比较

```
    var result1 = "Brick" < "alphabet"; // true;
    var result2 = "Brick".toLowerCase() < "alphabet".toLowerCase(); // false


    var result3 = "23" < "3";  //true, 比较字符串编码大小
    var result4 = "23" < 3;  //false ，转化为数值进行比较

    var result5 = "a" < 3; //false, a 被转化为 NaN
    // 任何数和NaN 比较都是false
    var result6 = NaN < 3; //false
    var result7 = NaN >=3; //false

```

##### 相等操作符
- 相等 和 不相等
    + ==  和 != ，在进行判断的时候，会进行强制的类型转化，遵循以下规则：
        * 如果有一个参数是布尔值，则在比较的时候，先将其转化为数值---false转化为0，而true转化为1
        * 如果一个操作值得字符串，一个是数值，则在比较之前，将字符串转化位数值
        * 如果其中一个是对象，则调用valueOf()方法，转化为基本对象后，再根据以上规则进行判断。
        
        在进行判断的时候，要遵循以下规则
        1. null 和 undefined 是相等的
        2. 在比较之前，不能将 null 和 undefined转化为其他任何值。 
        3. 在比较NaN，之前，遵循 NaN != NaN 的规则。所以任何数和NaN判断，都是false
        4. 如果2个操作数都是对象，则是比较他们是不是同一个对象。
        
        以下是一些特殊的值
        ```
            console.log("null == undefined ", null == undefined); //true
            console.log('"NaN" == NaN ', "NaN" == NaN); //false
            console.log('5 == NaN ', 5 == NaN); //false
            console.log('NaN == NaN ', NaN == NaN); // false
            console.log('NaN != NaN ', NaN != NaN); // true
            console.log('false==0 ', false == 0); // true
            console.log('true == 1 ', true == 1);    //true
            console.log('true == 2 ', true == 2);    //false
            console.log('undefined == 0', undefined == 0); //false
            console.log("null == 0", null == 0); //false
            console.log("'5' == 5 ", '5' == 5); // true
        ```
- 全等 和 不全等
    全等和不全等，在进行比较的时候，不会进行类型的强制转化，比如，
    ```
        var a = 1;
        console.log("a === '1'",a === '1'); //false
    ```
    
