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