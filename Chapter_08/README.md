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


##### 8.1.6 间歇调用和超时调用

setTimeout 和 setInterval，超时调用和间歇调用，第一个参数可以是一个字符串或者是一个函数，若是一个字符串，则会发送二次解析，效率降低，不建议用；第二个参数是毫秒数，表示间歇的时间或者超时的时间。而二者都会返回一个数值id，可以利用这个数值id进行清除这个调用。
```
    // 设置调用
    var timeoutId = setTimeout(function(){
        console.log("time out!");
    },3000);
    clearTimeout(timeoutId);
```

注意，超时调用都是在全局作用域下调用的。

##### 8.1.7 系统对话框
window下的对话框有，alert，confirm，prompt(),这些的对话框的样式，是由浏览器决定的，而不是由css，决定的。

alert：提示对话框
confirm： 确认对话框。可以根据用户点击的按钮，返回不同的bool值
prompt: 输入对话框，输入值后点击确认可以返回输入的结果。

### 8.2 location 对象
window.location 和 document.location 上引用的同一个的对象
window.location 上提供的属性，是对当前浏览器的一些状态的记录

hash :  #contents    url后#后面的部分
host :  www.baidu.com:80  域名和端口的部分
hostname： www.baidu.com   域名
href ： 当前url的链接，或者将要设置的url的链接
pathname： /wileyCDA/  返回url中的文件夹名或者目录
port： 当前的url的端口
protocol： 协议名
search：  ?a=javascript    get参数部分

```
// 获取url的查询参数
function getQueryStringArgs(){
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {};
    items = qs.length ? qs.split("&"):[];
    item = null,
    name = null,
    value = null,
    i = 0,
    length = items.length;
    // 逐渐将每项添加到args对象中去
    for(i = 0, i < length; i++){
        item = item[i].split("=");
        name = decodeURIComponent(item[0]);
        vlaue = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}
```

##### 8.2.2 位置操作
每次修改location的属性，hash除外，都会导致页面的重载,并且在浏览器的历史中新增一条历史记录，若要禁用这种方法，这用replace(url), 当前的历史记录，替换成新的url，不可以后退会原来的url
``` 
    
    location.protocol = "https"    // https://www.baidu.com:80
    location.hash = "#contents";  // https://www.baidu.com:80#contents
    location.host = "www.baidu.com:80";
    location.hostname = "www.baidu.com";
    loaction.search = "?b=1";  // https://www.baidu.com:80#contents?b=1
    location.pathname = "/search/";// https://www.baidu.com:80/search#contents?b=1

```

location.reload(); // 可能从缓存中重载
location.reload(true);  //强制重服务器重载


### 8.3 navigator对象

onLine: 当前浏览器是否联网，不可行，不是即时同步机器的联网状态
cookieEnabled:
appName:
platform: 平台
userAgent: 浏览器的代理字符串
vendor: 浏览器的品牌

##### 8.3.1 检测插件
一般用navigator.plugins数组参数，来检测浏览器是否安装了插件，
plugins中的每个元素都有
name:插件名
description:插件的描述
length:MiME类型的数量
filename:插件的文件名

```
hasPlugin:function(name){
    for(var i = 0 , length = navigator.plugins.length; i < length ; i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name) == -1){
            return  true;
        }
    }
    return false;
}
hasIEPlugin:function(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(ex){
        return false;
    }
}
```
##### 8.3.2 注册处理程序


### 8.4 screen 对象
用来记录外部的显示器的信息，用法在检测和站点跟踪工具中常用，此外还有用于
window.resize(screen.availWidth,screen.availHeight);
但是，窗口调节可能被禁用

### 8.5 history对象

history,记录着页面的历史记录，上述的replace(url) 方法可能对history有影响之外

此外还有 
history.back();
history.forward();
history.length==0 : 表示当前是首次打开页面


### 小结

- frame的运用，每个frame都产生一个window的构造函数，不同的frame的实例和构造函数，不用instanceOf 来检测
- top指定为最顶层的frame，parent为上一级的frame
- location可用来设置浏览器的浏览属性和导航信息
- replace() 跳转到一个新的url，会替代history 上一个的history
- navigator对象 也提供了浏览器的信息
- hisotry 可以用来判断是否第一个打开浏览器,screen常用为站点分析


