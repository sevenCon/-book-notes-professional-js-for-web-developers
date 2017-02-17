# DOM 拓展

### 11.1 选择器API

document.querySelector ： 返回一个元素
document.querySelectorAll: 返回一个NodeList
element.mathesSelector: 这个元素是否匹配这个选择器


### 11.2 元素遍历
不同浏览器返回的空白文本节点不一致的问题，比如ie9以前的浏览器返回的节点不包括文件节点，而其他的浏览器返回的节点都包括文本节点

因此，w3c定义了新的接口获取保证childNodes，和firstChild的一致性
- childElementCount: 子节点的个数 ，不包括文本节点和注释
- firstElementChild: 第一个子节点 firstChild 的元素版
- lastElementChild: 最后一个子节点 lastChild 的元素版
- previousElementSibling: 前一个同辈元素 previousSibling的元素版
- nextElementSibling: 后一个同辈元素 nextSibling的元素版

> 以上属性在ie9以上的浏览器中才支持

### 11.3
##### getElementByClassName
document.getElementByClassName(): 通过className 的值来获取，className的值无分先后，支持的浏览器为 ie9+

##### classList 
修改className的方式，必须整个删除或者，整个修改。
html5新增了一个新的特性，进行操作元素的类名

- add(value) : 添加指定的值，如果存在，就不添加了
- contains(value)： 表示列表中是否存在给定的值
- remove(value): 删除给定的字符串
- toggle(value):  如果已经存在给定值，删除它；否则添加

```
div.classList.remove(value);
div.classList.toggle(value);
div.classList.add(value);
div.classList.contains(value);
```

##### 11.3.2 焦点管理

document.activeElement : 始终指向当前获取焦点focus的元素，
默认情况下，document.activeElement 指向的值是document.body
document.hasFocus() : 文档是否获得焦点


### HTMLDocument 的变化

##### readyState
readyState 有2中状态 ，complete 或者 loading ，实现一个指示器的方法,有
- document.onload
- document.readyState
```
if(document.readyState == "complete"){
    // loaded
}
```

##### 兼容模式
IE 6 开始的浏览器渲染是分为混杂模式还是标准模式的
iE因此添加了一个compatMode 去区分该浏览器的渲染模式,
- compatMde == "CSS1Compat"
- compatMode == "BackCompat" 
```
if(document.compatMode == "CSS1Compat" ){
    
}
```
HTML5 纳入标准

#####  head属性
H5新增了document.head 属性引用文档的head 标签
```
if(document.head || document.getElementByTagName("head")[0]){
    
}
```

实现document.head的属性有Chrome 和 Safari5

##### 11.3.4 字符集属性
设置字符集的方式有 
1. meta标签
2. document.chatset = "utf-8"

#####　自定义的属性
data- 开头的属性，即可保存为元素的dataset的键值的对象中
```
<div data-name="quan"></div>

div.dataset.name => "quan"
```

##### 11.3.6  innerHTML
利用innerHTML来插入script标签，存在脚本不会执行的情况，ie9以前的版本是唯一个会执行的浏览器，但是必须满足，1.有defer属性， 2. 属性必须在有作用域的元素之后，所以必须用hack的方法 
```
div.innerHTML = "_<script defer> alert('HI');</script>";
```

一些不支持innterHTML的元素
col,colgroup,frameset,head,html,style,table,tbody,thead,tfoot,tr , 在IE8 title元素也没有innerHTML

##### 11.3.6  outerHTML

##### 11.3.6  insertAdjacentHTML()
insertAdjacentHTML (): 插入的位置 和将要插入的文本
插入的位置有4中可选参数：
- beforebegin:
- afterbegin:
- beforeend:
- afterend: 
```
// 在元素之前
element.insertAdjacentHTML("beforebegin","<p> i am paragraph!</p>");
// 插入第一个子元素之前
element.insertAdjacentHTML("afterbegin","<p> i am paragraph!</p>");
// 插入为最后一个子元素
element.insertAdjacentHTML("beforeend","<p> i am paragraph!</p>");
// 插入在元素之后
element.insertAdjacentHTML("afterend","<p> i am paragraph!</p>");
```
##### 11.3.6  内存和管理问题

操作innerHTML, outerHTML,insertAdjacentHTML(),等方法，每次的操作会创建一个解析器，相比js来说createElement() 会快许多的。但是循环的滥用会导致内存 ，性能损耗。

##### 11.3.7 scrollIntoView 方法
让浏览器滚动到指定的位置，传入true，或者不传，则会让元素和窗口平齐，传入false则会让调用元素全部出现在视口中。

```
document.forms[0].scrollIntoView();
```

### 11.4 专有拓展
##### 文档模式
- IE 5 : 默认混杂模式 ，ie8及以上的功能不可用
- IE7 : 用IE7 标准模式渲染网页，IE8功能不可用
- IE8 : IE8标准模式渲染网页，可以使用Selector API, 更多CSS2,部分CSS3功能.
- IE 9 : 可以使用ES5 ,CSS3

强制浏览器以某种模式渲染，可以使用X-UA-Compatible,或通过
```
// IEVersion = Edge || EmulateIE{7,8,9} || {5,7,8,9} 等值
<meta http-equiv="X-UA-Compatible" content="IE=IEVersion"/>
```
Edge 则使用该浏览器的默认模式渲染
document.documentMode 返回文档模式的版本号，

##### 11.4.2 children 属性
IE9 浏览器在理解空白文本节点的问题上，以其他浏览器存在差异，IE9只返回元素节点，IE8及以前的的浏览器会返回注释节点。此外和childNodes 并无不同。

document.documentElemetn.contains(document.body); // true

在DOM3级也能确定元素间的关系
1 = 无关
2 = 之前
4 = 之后
8 = 包含
16 = 被包含

##### 11.4.4 插入文本

innerText : ff下为textContent ，没有innerText,

ele.innerText = div.innerText; 可以转为纯文本字符串

outerText : 读属性时，和innerText一样，在写属性时，则包括会替换父元素

##### 11.4.5 滚动
对于srollIntoViewIfNeeded : 如果元素在视口不可见，才滚动元素
scrollByLines(lineCoutn): 将元素滚动制定的高度，
scrollbyPages(pageCount): 将元素的内容滚动制定的也没高度，具体的高度由元素的高度决定


 