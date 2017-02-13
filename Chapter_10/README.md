# Chapter_10  DOM节点

NODE 的类型
- Node.ELEMENT_NODE(1)
- Node.ATTRIBUTE_NODE(2)
- Node.TEXT_NODE(3)
- Node.CDATA_SECTION_NODE(4)
- Node.ENTITY_REFERENCE_NODE(5)
- Node.ENTITY_NODE(6)
- Node.PROCESSING_INSTRUCTURE_NODE(7)
- Node.COMMENT_NODE(8)
- Node.DOCUMENT_NODE(9)
- Node.DOCUMENT_TYPE_NODE(10)
- Node.DOCUMENT_FRAGEMENT_NODE(11)
- Node.NOTATION_NODE(12)


### 10.1 nodeName 和nodeValue 属性

nodeName和nodeValue列出节点的具体信息，但是要通过nodeType判断一下
```
    if(someNode.nodeType == 1){
        value = someNode.nodeName; // nodeName的值是元素的标签名
    }
```

##### 节点的关系
每个节点都有一个childNodes 属性，其中保存着一个类数组对象，有length，但是type 确实一个object，可以通过访问数值索引，获取子节点，此外，childNodes还有一个item(index||name) 方法,可以获取子节点，参数可以是数值索引，或者节点的name值。

类数组对象转化为数组
```
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
//ie8之前的版本中无效

function convertToArray(nodes){
    try{
        var array = Array.prototype.slice.call(nodes.0); 
        // ie 8 以下会抛错，跳转到兼容性的写法，怪癖性的形式
    }catct(e){
        array = new Array();
        for(var i = 0,length = nodes.length; i < length; i++){
            array.push(nodes[i]);
        }
    }
    return array;
}
```

previousSibling ： 前一个节点
nextSibling : 后一个节点
firstChild: 第二个子节点
lastChild: 第一子节点
parentNode: 直接父节点

#####  操作节点
appendChild(childNode):  在结尾添加节点，appendChild 已有的节点，会移动已有节点的位置
insertBefore(newNode,someNodes.lastNode): 往特定的node前插入node节点
replaceChild(newNode,someNode.lastChild): 替换节点
removeChild(childNode): 删除节点

cloneNode(Bool) : 是否深度复制节点

### Document 类型

##### 文档的子节点
Document的子节点可以是DocumentType，Element，ProcessInstructor,Comment. 还有2个内置的访问其子节点的快捷方式，第一个：documentElement,它始终指向document下的html节点，此外还可以通过，document.firstChild,或者document.childNodes[0]
```
var body = document.body;
```
不同的浏览器对doctype的支持不同，
```
var doctype = document.doctype;
```
- ie8 之前的版本如果有doctype声明，会把它解释为一个comment，而document.doctype 为null，
- ie9+,ff: 如果存在文档声明，解析但不作为子节点，documentType节点，也可用通过document.firstChild，或者document.childNodes[0]，进行访问
- safari,chrome,opera: document.doctype 是一个documentType 节点，但是节点不在document.childNodes中

###### document.title 的标题

document.title 获得标题和设置标题，都可以通过这几个属性。但是不会改变dom的title值，在浏览器的标题栏会改变

document.URL: 网页的完整url
document.referrer:  来源网页的url
document.domain: cookie 在主域名和子域名之间的通信设置

以上3个属性，只有domain可以设置，并且，只能有紧绷性的domain，向松散型的domain上变。
比如: m.taobao.com => taobao.com

##### 查找元素
ie8 及以下的版本的getElementById(id); 不区分大小写，比如 
```
<div id="myDiv"></div>
var ele = document.getElementById("mydiv"); // ie8 及更低的版本中可以获取
``` 

此外还有
```
<input type="text" name="myElement" value="text" field>
<div id="myElement"> A div </div>

document.getElementById("myElement "); // 会返回input
```

HTMLCollection 还有个方法，叫nameedItem(),这个方法可以通过name属性获取特定的节点

getElementsByTagName("*"):
getElementByName("color"):

##### 特殊集合
document.anchors
document.forms
document.images
document.links
document.applets

##### dom 一致性检测
```
var hasXmlDom = document.implementation.hasFeagure("XML","1.0");

```
hasFeagure 也有弊端，safari 2x 版本不精准
