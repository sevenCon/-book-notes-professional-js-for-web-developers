#　chapter_07
### 7.1
函数表达式
因为函数声明提升的问题，注意不要用以下的方式去定义函数。
```
if(condition){
    function sayHi(){
        console.log("hello");
    }   
}else{
    function sayHi(){
        cosole.log("hi");
    }
}
```


### 7.2 闭包与变量
闭包： 是指有访问另一个函数作用域的函数
```
function createFunction(){
    var result = new Array();
    for(var i = 0; i < 10; i++){
        result[i] = function(){
            return i;
        }
    }   
    return result;
}
createFunction()[9](); // 10


```
### 7.3 模仿块级作用域
在变量的声明中，初始化之后的变量，重复声明无效,会自动忽略声明的代码
```
    var a = 10;
    var i;
    console.log(10);//10
```

### 7.4 模拟私有变量
js其实没有私有变量的概念，利用js的作用域链的特点，在子作用域内的属性在父作用域不能访问的特点，可以实现。

```
    function MyObject(){
        var privateVarible = 10;
        function privateFunction(){
            return false;
        };
        this.publicMethod = function(){  // 特权方法
            privateVarible ++;
            return privateFunction;
        };
    }

```
典型demo:
```
(function(){
    var name = "";
    Person = new Object(value){
        name = value;
    };
    Person.prototype.getName = function(){
        return name;
    }
    Person.prototype.setName = function(value){
        name = value;
    }
}){}

var person1 = new Person("Qun");
console.log(person1.getName());
person1.setName("Quan");
console.log(person1.getName());
```


##### 模块模式
```
    var singleton = function(){
        var privateVarible = "";
        function privateFunction(){
            return false;
        }
        var object = new CustomeType();
        object.publicMethod = function(){
            privateVarible++;
            privateFunction();
        }
        return object;
    }();
```

### 小结
- 闭包就是有另一个函数作用域访问权限的函数
- 闭包的缺点是比较占用内存
- 使用立即执行函数，可以在执行完成之后立即回收本作用域内的变量，而立即执行函数在整个js指定过程中不会一直占用内存。
- 单例模式创建一个私有变量的
