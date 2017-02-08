/*
 * author: quanlicong
 * date: 2007-02-08
 * desc: common lib for every date
 */
var COMMON = {
		// 获取url的查询参数
		getQueryString:function (){
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
		},
		// class 操作函数
		hasClass:function(selector,cName){
			return new RegExp("(\\s+)?"+cName+"(\\s+)?").test(document.querySelector(selector).className);
		},
		addClass:function(selector,cName){
			if(!this.hasClass(selector,cName)){
				document.querySelector(selector).className += " "+cname;
			}
		},
		rmClass:function(selector, cName){
			if(this.hasClass(selector,cName)){
				document.querySelector(selector).className.replace(new RegExp("(\\s+)?"+cName+"(\\s+)?"," ").trim();
			}
		}
	}