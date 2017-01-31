# Chapter_05 引用类型
### 5.2 Array 类型
Array 引用类型的变量，可以对其length进行操作,会自动的根据数组的操作，进行对length相应的操作，保持length和元素个数的一致。

```
    var  arr = [2,3,4];
    console.log(arr.length);//3
    arr.length = 2;
    console.log(arr[2]);// undefined
    
```
