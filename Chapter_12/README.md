# DOM2和DOM3
### 12.1.1 xml 的命名空间变化
DOM2 级添加了命名空间的参数 xmlns,通过在同一个文档中，定义不同的参数，为其子元素以区分不同的标签
1.node 类型的变化
- localName: 不带命名空间的前缀的节点名称
- namespaceURI: 命名空间URI或者null
- prefix：命名空间前缀或者未指定情况下是null
```
<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
    <title></title>
</head>
<body>
<s:svg xmlns:s="http://www.w3c.org/2000/svg" version="1.1" viewBox="0 0 100 100" style="width:100%; height:100%">
<s:rect x="0" y="0" width="100" height="100" sytle="fill:red"/>
</s:svg>
</body>
</html>
```

对于以上demo来说，html的元素的localName和tagName是"html",namespaceURI是http://www.w3.org/1999/xhtml, prefix=null，

对于svg元素来说，localName=svg ,tagName=s:svg, namespaceURI=http://www.w3c.org/2000/svg， prefix = s


DOM3级更引入了方法：
isDefaultNameSpace(uri)： 该uri是否默认命名空间的uri
lookupNamespaceURI(uri): 返回指定namespaceURI 的前缀
lookupPrefix(namespaceUri): 返回制定uri的前缀

2.Document 类型的变化
createElementNS(namespaceURI,ele):
createAttributeNS(namespaceURI,ele):
getElementByTagNameNS(namespaceURI, tagName):

使用这些方法，需要传入namespaceURI，

3.Element的变化
getAttributeNS(namespaceURI,localName):
getAttributeNodeNS(namespaceURI,localName):
getElementByTagNameNS(namespaceURI,tagName):
hasAttributeNS(namespaceURI,localName):
removeAttributeNS(namespace,localName):
setAttributeNS(namespaceURI,localName):
setAttributeNodeNS(attNode):

4 NamedNodeMap 类型变化

getNameItemNS(namespaceURI,localName):
removeNamedItemNS(namespaceURI, localName):
setNamedItemNS(namespaceURI, localName): 

### 12.1.2 其他方面的变化

DocumentType 的变化，新增了3个属性 publicId,systemId 和internalSubject,

1. document 的变化，每个节点都有ownerDocument的属性，表示这个节点是属于哪个文档，如果调用appendChild() ,传入不同的文档的节点，则会抛错. 而调用importNode(),则不会，类似cloneNode(node,bool),一个表示复制的节点，和一个bool值，是否复制子节点。



### 12.2 样式的变化

DOM2 级样式提供一套api，可以进行link引入文件，style定义行内样式
```
var supportDOM2CSS = document.implementation.hasFeature("CSS","2.0");
var supportDOM2CSS2 = document.implementation.hasFeature("CSS2","2.0");
```
检测是否支持CSS2

1.DOM 样式的属性和方法
- cssText :能够访问style特性的所有css代码
- length： 应用元素的CSS属性的数量
- parentRule: 表示CSS信息的CSSRule对象
- getPropertyCSSValue（propertyName）：返回包含给定的属性值的CSSRule对象
- item(index)：返回给定位置CSS属性的名称
- removeProperty(propertyName): 从样式中删除给定属性
- setProperty(proptertyName,value,priority) : 将给定属性设置为乡音的值，并加上优先级权标志（“important"或者一个空的字符串）

> note: CssText 属性的设置删除掉style的上次写入，此外，通过style.item(),或者style[i],获取属性名，然后getPropertyValue()进行获取属性名的值，或者setProperty(name,value,priority)

getPropertyValue() 方法取得的始终是CSS属性值的字符串表示，如果需要更多的信息，可以使用getPropertyCSSValue()方法，返回一个包含两个属性的CSSValue对象，这个对象分为：CssText 和 cssValueType,其中 cssText属性的值与getPropertyValue(), 返回的值相同，而cssValueType则是一个数值常量，表示值的类型，0表示继承，1表示基本值，2表示值列表，3表示自定义的值，
removeProperty("border"), 方法则是移除style属性，这些方法都在IE9+上得到支持。

2 获取计算属性 getComputedStyle()
可以获取从样式表文件计算而来的样式。 getComputedStyle(name, type),第一个参数是属性名，第二个是伪类元素名。
ie浏览器没有getComputedStyle(),但是在style对象里面还有一个currentStyle，可以获取CSSStyleDecalaration,

> 所有浏览器中的计算属性都是只读的，而在不同的浏览器中，计算属性可能是不一样的，因为默认值不一样

### 12.2.2 操作样式表
```
var supportsDOM2StyleSheets = document.implementation.hasFeature("StyleSheets","2.0");
```

检测是否支持StyleSheets 2.0 css 2.0
从SytleSheet接口继承的属性有以下：
disabled： 可重写，是否禁用样式表
media： 支持所有媒体查询的集合，若是null，则支持所有媒体查询
ownerNode: 指向拥有当前样式表的节点
parentStyleSheet: 通过@import的样式表
title: ownerNode的title
type: ownerNode的type，"type/css"
cssRules: 包含所有样式的集合，操作样式表也是通过这个属性
ownerRule: 若是@import导入的，则是一个指针，指向导入的规则
deleteRule(index): 删除指定位置的规则，IE中对应的方法是removeRule(index)
insertaRule(rule,index): 向集合指定的地方插入rule字符串。IE中为addRule

所有的样式表都可通过document.styleSheets 来访问，修改样式表文件，会影响所有引用这个选择器的节点。
常用的修改样式表属性，cssText,style,selectorText   

- 操作css样式属性
```
function insertRule(sheet,selectorText,cssText,position){
    if(sheet.insertRule){
        sheet.insertRule(selectorText+"{"+cssText+"}",position);
    }else if(sheet.addRule){
        sheet.addRule(selectorText,cssText,position);
    }
}
insertRule(document.sheetStyle[0]."body","background-color:silver",0);
```

- 删除css样式规则
```
function deleteRule(sheet,index){
    if(sheet.deleteRule){
        sheet.deleteRule(index);
    }else if(sheet.removeRule){
        sheet.removeRule(index);
    }
}
```


### 12.2.3 元素大小
1.偏移量

offsetWidth: 元素的可见宽度，垂直滚动条的宽度，边框的宽度
offsetHeight: 元素的可见高度，内边距，水平滚动条的宽度，边框的宽度
offsetLeft: 元素的左边框至包含元素的左边框的距离
offsetTop: 元素的上边框至包含元素的上边框的距离

2. 客户端大小
clientWidth: 内容区域，左右内边距距离
clientHeight:  内容区域，上下内边距距离
```
function getViewport(){
    if(document.compatMode== 'BackCompat'){
        return {
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }else{
        return{
            width:document.documentElement..clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}
```  
通过document.compactMode=='BackCompat', 查看当前是否在混杂模式下运行

3. 滚动大小 
scrollWidth: 没滚动的情况下，元素的宽度
scrollHeight: 没滚动情况下，元素的高度
scrollTop: 滚动被隐藏区域的高度
scrollLeft: 滚动被隐藏区域的宽度

scrollLeft,scrollTop, 可以通过这2个元素的值来设置滚动的位置
```
var docHeight = Math.max(document.documentElement.clientHeight,document.documentElement.scrollHeight);
var docWidth = Math.max(document.documentElement.clientWidth,document.documentElement.scrollWidth);
```
对于在IE的混杂模式下，需要用document.body代替document.documentElement 

4. 确定元素的大小
IE8 及更早的版本中，认为文档的左上角坐标是（2,2），IE9开始则是（0,0）开始
各个浏览器提供了一个getBoundingClientRect()的方法，返回个一个矩形对象，包括left,top，right和bottom


### 12.3 遍历

NodeIterator 和TreeWalker 

### NodeIterator

### TreeWalker