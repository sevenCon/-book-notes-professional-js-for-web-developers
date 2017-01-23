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

> 对于以上的操作，计算机首先创建一个容纳10个字符串的变量，然后把Java 和 Script 填充到这个变量，然后销毁原来的Java变量。


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

#### Object 类型

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


###3.5 操作符

#### 一元操作符
++，-- 等，一元操作，都是发生在赋值运算前。在计算机科学领域，称之为副效应。
```
    var age = 30;
    var anotherage = --age + 2;

    console.log(age,anotherage);

```
