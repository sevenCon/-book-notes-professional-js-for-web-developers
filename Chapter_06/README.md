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
