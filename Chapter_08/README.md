# Chapter_08 BOM

### 8.1 window对象
ES在web浏览器中的担任global的角色，即全局变量this，因此，parseInt，escape，encodeURI等global的函数，都可以在window上获取得到，而全局作用域下定义的变量，则会包含在window的对象内。
其次，在浏览器的全局变量，是可以delete的，这就表示，全局变量在web浏览器上只是一个属性，而不是真正的变量。真正的变量是不可delete；


##### 8.1.1 全局作用域
```
    var newValue = oldValue; //error
    var secondValue = window.oldValue; //undefine ,no Error throw
```
直接访问对象的属性不会抛错，而变量的直接访问会抛错。

##### 8.1.2 窗口关系和框架

```
    <!DOCTYPE html>
    <html>
    <head>
        <title>Frameet example</title>
    </head>
    <body>
        <frameset>
            <frame src="frame.htm" name="topFrame"></frame>
            <frameset>
                <frame src="left.htm" name="leftFrame"></frame>
                <frame src="right.htm" name="rightFrame"></frame>
            </frameset>
        </frameset>
    </body>
    </html>


```

对于上面的frame来说：
- window.frame[0]
- window.frames["topFrame"]
- top.frames[0]
- top.frames['topFrame']
- frames[0]
- frames["topFrame"]

对于下面的frames,则以此类推，不过，最好通过top，而不是window来引用这些frames，top的指向，始终是指向最高（最外）层的frame

与top相对的是parent，指向当前frame的直接父级frame，此外还有一个self的属性，self始终指向window
> 注意的是，frame和freme之间的引用类型和构造函数，不能用instanceOf 来判断是否是一个对象的实例，框架和框架之间的构造不互通。

##### 8.1.3 窗口位置
screenTop,screenTop: 都支持，FF不支持，但是在opera中，screenX和screenLeft表现不一致
screenX,screenY:   safari ,ff,chrome
所以获取元素相对于窗口左边，上面的距离的方法：
```
var leftPos = (typeof window.screenLeft === 'number') ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop === 'number') ? window.screenTop : window.screenY;
```
   
window.screenLeft,window.screenX,保存的是整个浏览器的窗口相对于屏幕的坐标。   
而在ff浏览器下，表现不一样的时候

### 8.1.4 窗口大小
IE9+ ，chrome，FF，safari 的window对象都有4个属性，innerWidth,innerHeight,outerHeight,outerWidth,4个属性，
Chrome：提供的outerWidth，outerHeight，innerHeigh，innerWidth，是视口（viewport）的大小。返回相同的值

IE9+，FF，safari的 innerWidth返回的容器页面的视图区域减去边框的大小，而outerWidth返回浏览器整个框口的尺寸。

IE9以下的浏览器，没有提供窗口大小的接口，但是通过DOM提供了页面可见区域的信息，
IE，FF，op ，safa，chrome 中 document.documentElement.clientWidth,document.documentElement.clientHeight,保存了页面视口的信息，IE6的必须在标准模式写才有效，混杂模式，则在document.body.clientWidth中获取，混杂模式下的chrome，2种方法都可以获取。

```
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if(typeof pageWidth !=='number' ){
    if(document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    }else{
        pageWidth = document.body.clientWidth;
        pageHeigh = document.body.clientHeight;
    }
}
```

对于移动设备而言：
window.innerWidth,window.innerHeight,保存着视口的，也就是可见区域的大小，但是ie浏览器不提供这些接口，但是可以通关document.documentElement.clientHeight来获取，在页面缩放，也会随着变化。

同时在页面窗口的跳转有2个api
resizeTo（newWidth,newHeight）; //新的窗口的宽高
resizeBy(offsetWidth,offsetHeight); // 新的窗口和原来的差
这个2个可能被禁用，用于frame不太合适

##### 8.1.5 导航和打开窗口
window.open(url,窗口目标，一个特性字符串，是否覆盖当前页面的历史记录);

窗口目标是一个frame的name字符串，表示在哪个frame中加载这个url
```
    //等同<a href="http://www.wrox.com" target="topFrame"></a>
    window.open("http://www.wrox.com","topFrame");
```
open的第三个参数，代表的窗口的特性，以“，”隔开 多个选项，
有fullscreen,height,left,location, menubar,resizable,scrollbars,status,toolbar,top,width, [值为yes，no， 或者具体的数值]




