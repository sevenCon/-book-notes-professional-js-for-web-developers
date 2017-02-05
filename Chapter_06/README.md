# Chapter_06 面向对象设计（略）
### 6.1
ECMAJavascript 中，有2中属性 ，数据属性和访问器属性
##### 6.1.1 数据属性
- [[ configurable]] :可配置属性类型，设置为false，不可delete，严格模式下回抛错，
- [[Enumerable]] ：可枚举，for-in循环可获取，
- [[Writable]]:可以赋值，
- [[Value]] ：默认undefined,保存数据的值 4中数据属性，必须用 defineProperty(propObj，propName,dataParam)
IE8 是第一个实现了数据属性的浏览器，但是存在许多限制和弊端。
- [[ get]] 只定义get，该属性不能赋值
- [[ set]] 只定义set，该属性不能读
[[get]] [[set]] 是vue实现的基础，所以vue只支持IE9+。


##### 6.1.2 定义多个属性
defineProperties
```
    var book ={};
    Object.defineProperties(book,{
        _year:{
            value:19
            enumerable:false
        },
        edition:{
            value:1
        }
    })
```

### 6.2创建对象
创建对象，可以使用构造函数或者字面量的方法，但是有个缺点，使用同一个接口定义对象，代码重复较多。因此有了一种工厂模式的变种
##### 6.2.1 工厂模式
```
    function createObject(name, age, job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            alert(this.name);
        }
        return o;
    }
```

工厂模式解决了对象的创建的冗余问题，但是，另一个问题随之而来了，一个实例并不知道，他的构造函数是谁？

##### 6.2.2 构造函数模式
```
    function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            console.log(this.name);
        }
    }

    var person1 = new Person("quan",19,"Web");
```
- 创建一个对象
- this指向该新建的对象
- 执行指定代码
- 返回这个对象

一个函数是否是构造函数，只是在调用的时候是否带 new 

对于以上的方法，同一个sayName 属于不同的实例，但是却重复定义了2次。
因此可以把sayName单独出来
```
    function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = sayName;
    }
    function sayName(){
            console.log(this.name);
    }
    var person1 = new Person("quan",19,"Web");
    var person2 = new Person("quan",19,"Web");
```


但是，这样就强制的定义了一个全局函数，如果全局函数里面又有调用其它地方的函数，那么这些函数也必须是全局的。所以，有了原型函数的定义方法。

##### 6.2.3 原型模式(略)

- ES5新增Object.getPrototypeOf()： 用来获取一个对象的__proto__的值，即是原型对象
- obj.hasOwnProperty(param): 用来判断一个属性是否是实例属性(返回true)，还是原型属性
- in 操作符：
    + for-in循环中
    + 普通的检查一个对象是否可以访问该属性（会查询到原型链）
- Object.keys(obj) : 返回一个数组，包含所有可以枚举的属性名
- 判断一个对象是否是另个一对象的实例，a instanceOf A， 沿着a.__proto__往下，沿着A.prototype往上，看是否在同一个节点相会，若是，则返回true

### 6.2.5 动态原型链
独立的构造函数和原型  
```
    function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        if(typeof this.sayName ==='function'){
            Person.prototype.sayName = function(){
                console.log(this.name);
            }
        }
    }

```

> 在函数中改变原型，能够立即得到反映。


### 6.2.6寄生构造函数模式
创建一个函数，返回新建的对象，函数的作用仅仅是包装对象
```
function Person(){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    }
    return o;
}

var person1 = new Object("quan", 19, "web engineer");
```

return返回这个对象，重写了this
```
function SpecialArray(){
    var values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function(){
        return this.join("|");
    }
    return values;
}
var colors = new SpecialArray("red","blue","green");
```

因此，便是存在instanceOf 检测不到实例的构造函数的问题。因为返回的对象是匿名不可见的。

##### 6.2.7 稳妥的构造函数方式
```
function Person(name, age, job){
    var o = new Object();
    var name = name;
    var age = age;
    var job = job;
    o.sayName = function(){
        console.log(name);
    }
    return o;
}
```

如上，即是在以上的sayName的方法中，才能访问到这个对象的内部私有属性，以外，都不能访问。注意的是，有2个条件，不引用this，不用new进行构造。


### 6.3 继承

确定原型和实例之间的方法
- instanceOf
- isPrototypeOf

##### 6.3.1 原型链继承中的引用问题
```
function SuperType(){
    this.colors = ["red"，"blue","green"];
}
function SubType(){
    
}
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.push("Black");
var instance2 = new SubType();
console.log(instance2);//  ["red"，"blue","green","Black"]
```

因为继承重写了SubType的原型，而SuperType的实例属性colors变为原型属性，所以这个引用类型的变量为原型公用了。即是每一个SubType的实例都会公用这个数组。


### 6.3.2借用构造函数
所以由于上述的问题，有了call，apply方法改变this，去调用父方法的实现。而call,apply也仅仅是调用函数，而不会new，并执行初始化原型方法和属性
```
function SuperType(){
    this.colors = ["red"，"blue","green"];
}
function SubType(){
    SuperType.call(this);  
}
var instance1 = new SubType();
instance1.push("Black");
var instance2 = new SubType();
console.log(instance2);//  ["red"，"blue","green"]
```

### 6.3.3 组合继承
集合继承的方式，是用call 进行继承父方法的对象属性，重写子方法的原型继承，是一种比较常用的继承方法。
```
function SuperType(){
    this.colors = ["red"，"blue","green"];
}
function SubType(){
    SuperType.call(this);  
}
var instance1 = new SubType();
instance1.push("Black");
var instance2 = new SubType();
console.log(instance2);//  ["red"，"blue","green"]
```

ES5中新增 Object.create(obj,properties): 规范了原型式的继承，在只传入第一个参数的情况下，只是进行对象的浅复制,在这种情况下，没有必要进行构造函数的定义和复制。
```
    var cp = {name:1}
    var obj = Object.create(cp,{
        value:{
            value:12
        }
    });
    console.log(obj.value); //12
```


##### 6.3.5 寄生式继承
在上述的构造函数的原型继承中，有个问题，
```
function SuperType(){
    this.colors = ["red"，"blue","green"];
}
function SubType(){
    
}
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.push("Black");
var instance2 = new SubType();
console.log(instance2);//  ["red"，"blue","green","Black"]
```

colors的属性会在SubType 的实例及其原型上存在，但是实例上的属性屏蔽了原型上的属性。但是调用寄生式的浅复制的方法获取原型的一个副本，再讲这个副本赋值给子方法的原型上，即可实现函数的服用。

```
function SuperType(){
    this.colors = ["red"，"blue","green"];
}
function SubType(){
    
}
SubType.prototype = Object.create(SuperType.prototype); // 浅复制父原型
var instance1 = new SubType();
instance1.push("Black");
var instance2 = new SubType();
console.log(instance2);//  ["red"，"blue","green","Black"]
```

这样colors属性只在子方法中存在，而原型就只是一个父原型的副本，但是也可拓展新属性和方法。

### 小结
- 工厂模式 简单的利用函数的方式创建对象，返回创建的函数
- 构造函数模式 用new新建一个对象，属性之间不能复用
- 原型模式 可以继承，复用

继承的模式
- 原型式的继承 : 继承的方法，没有公用属性 ，子原型中引用变量问题，多个子实例公用一个引用变量
- 寄生式的继承 : 对象的浅复制，可以服用，公用一个引用类型变量
- 寄生组合模式 ： 组合2种的优点


