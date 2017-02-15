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


### 10.1.1 nodeName 和nodeValue 属性

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

### 10.1.2 Document 类型

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

##### document.write()和document.writeln()方法的载入script标签的问题
```
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<script type="text/javascript">
    document.write("<script src=\"file.js\""></script>"); // </script> 字符串的'<' 不加转义'\<', 会让浏览器认为这里是script的结束了，进而不执行下面的内容。
</script>
</body>
</html>

```


### 10.1.3 Element 类型

Element的节点
nodeType: 1
nodeName: 元素的标签
nodeValue:  null
parentNode: document 或 Element
子节点可能是： Element，text，Comment，ProcessingInstruction，CDATASection 或EntityReference

```
if(node.tagName.toLowerCase() == "div"){
    //some operation
}
```
tagName 的属性都是大写的，并且在xml或者xhtml中表现的是代码的原值，移植性不是很好，所以建议都转为小写进行检测

##### html
所有的html的标签都是通过HTMLElement或者其继承的对象，进行实现的。以下的属性，可以直接修改，而不用利用其setAttribute()接口
- id:  document.getElementById("mydiv").id ="2"
- name: document.getElementById("mydiv").name ="2"
- dir: document.getElementById("mydiv").dir ="rtl"
- lang: document.getElementById("mydiv").lang ="en"
- title: document.getElementById("mydiv").title ="2"
- className: document.getElementById("mydiv").className ="2"

属性操作方法
- document.getElementById("mydiv").getAttribute("name"):
- document.getElementById("mydiv").setAttribute("name","quan"):
- document.getElementById("mydiv").removeAttribute("name"), ie6不支持这个属性

> note: getAttribute方法，在ie8之前的，getAttribute("style")返回的是一个对象，getAttribute("onclick")返回的是一个函数,ie7以前的setAttribute,进行设置class，sytle，没有任何效果。

##### attribute 属性
Element类型是使用Attribute属性的唯一一个DOM节点类型。attribute中包括一个NamedNodeMap，是一个动态的集合。NamedNodeMap具有一下方法：
- getNamedItem(name): 返回nodeName 等于name的属性
- removeNameItem(name):移除name的属性的节点
- setNameItem(node): 向列表中添加节点，以nodeName属性为索引
- item(pos): 返回位于数字的pos位置处的节点
attribute 属性中nodeName 则为特性的名称，nodeValue是特性的值

遍历attributes的属性
```
function outputAttributes(element){
    var pairs = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for(i = 0, len = element.attributes.length; i < len; i++){
        attrName = element.attribute[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        // 对于每个属性是否已经设置了属性值，可以通过specified 的值进行检测，若是true，则是已经设置过的。
        if(element.attributes[i].specified){
            pairs.push(attrName + "=\"" + attrValue +"\"");
        }
    }
    return pairs.join(" ");
}
```

##### 创建元素
```
var div = document.createElement("div");
div.className = "divclassName";
div.name = "divname";
div.innerHTML = "i am a text";
document.body.appendChild(div);
```
同时也可以
```
var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div>");
```

在ie8 以下的浏览器中存在的问题
- iframe 的name属性不能设置的问题
- 不能通过reset()方法，重置表单的input表单值
- 动态添加的reset的button不能重置表单值
- 动态添加一批name相同的redio，之间毫无关系

>以上的所有问题都可以通过createElement的方法传入一个html的标签进行设置属性
来解决

### 10.1.4 Text 类型

nodeType ： 3
nodeName："#text"
nodeValue: 值为节点包含的文本
parentNode: 是一个Element
不支持没有节点

可以通过修改nodeValue 或者data属性的访问Text节点的文本，
- appendData(text) : 追加文本
- deleteOffset(offset,count): 从offset下标开始删除count个字符
- insetData(offset,text): 从offset中插入text
- replaceData(offset,count,text): 用text替换下标为offset到offset+count的文本
- splitText(offset):从offset的位置，分隔文本成2部分
- substringData(offset,count): 提取下标从offset到offset+count的文本

note: 一个标签添加多个文本节点，之间不会有空格

##### 规范化文本节点
normalize(): 可以将多个文本节点合并成一个文本节点，合并的值等同于所有文本的字符串链接起来的值。
```
var element  = document.createElement("a");
element.appendChild(document.createTextNode("quan"));
element.appendChild(document.createTextNode(" lincong"));
element.normalize();
```

splitText(offset): 与normalize()的作用相反，
```
element.firstChild.splitText(5);
```

### 10.1.5 Comment 类型
nodeType: 8
nodeName: "#comment"
nodeValue: 注释内容

```
document.createComment("a comment");
```

### 10.1.8 DocumentFragment 类型
nodeType：11
nodeName:"#document-fragment"

```
var fragment = document.createDocumentFragment();
var ul = document.getElementById("muList");
var li = null;
for(var i = 0; i<3 ; i++){
    li = document.createElement("li");
    li.appendChild(document.createTextNode("a list "+ new Date().valueOf()));
    fragment.appendChild(li);
}
ul.appendChild(fragment);
```

### 10.1.9 Attr 类型

nodeType： 11
Attr的标签有3个值，分别是name,value,specified,
- name ： 是属性的名称
- value: 属性的值
- specified : 这个属性是指定还是默认

```
var attr = document.createAttribute("align");
attr.value = "left";
var ele = document.createElement("div");
ele.setAttribute(attr);

``` 

# 10.2 Dom 操作技术
###  10.2.1 动态脚本

```
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try{
        script.appendChild(document.createTextNode(code));
    }catch(e){
        script.text = code;
    }
    document.body.appendChild(script);
}
```


### 10.2.2 动态样式

```
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementByTagsName("head")[0];
    head.appendChild(link);
}

```

IE的浏览器中，不允许访问style标签的子节点

所以有了兼容性的写法
```
function loadStylesString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    }catch(e){
        style.stylesheet.cssText = css    
    }
    var head = docuement.getElementByTagName("head")[0];
    head.appendChidl(sytle);
}
```

### 10.2.4 操作表格
 使用NodeList,最好将NodeList.length ,进行暂存，然后在再遍历，否则容易造成五险循环。




 