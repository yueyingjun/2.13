//获取类
function getClass(classname,obj){
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname)
	}
	else{
		var arr=[];
		var all=obj.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
			if(checkClass(all[i].className,classname)){
				arr.push(all[i])
			}
		}
		return arr;
	}
}

function checkClass(str,classname){
	var arr=str.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==classname){
			return 1;
		}
	}
	return 0;
}
//获取元素
function getStyle(obj,ss){
	if(obj.currentStyle){
		return obj.currentStyle[ss];
	}	
	else{
		return getComputedStyle(obj,null)[ss];
	}
}
//获取$
function $(mm,father){
    var father=father||document;//有无父对象；  
    if(typeof mm==="string"){//判断为函数或者字符串
 	   mm=mm.replace(/^\s*|\s*$/g,"");//去除输入时不小心的前面的后面的空格
       if(mm.charAt(0)=="."){//判断为类是
        return getClass(mm.slice(1),father);
       }
       else if(mm.charAt(0)=="#"){//为id时
        return document.getElementById(mm.slice(1));
       }
       else if(/^[a-z]+\d*$/g.test(mm)){//为标签名时
    	return father.getElementsByTagName(mm);
       }
       else if(/^<[a-z]+\d*>$/g.test(mm)){//创建一个元素
        return document.createElement(mm.slice(1,-1))
       }   	
   }
    if(typeof mm==="function"){//输入的为函数时
    	window.onload=function(){
    		mm();
    	}
    }
}
//获取子节点
function getChilds(obj,type){
	var arr=[];
	type=type||"no";//是否要获取文字，默认不获取
	var child=obj.childNodes;//获取元素的所有子节点
	for (var i = 0; i < child.length; i++){
		if(type=="no"){//
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}			
		}
		else if(type=="yes"){
			if(child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s*|\s*$/g,""))){
				arr.push(child[i]);
		    }			
		}	
	}
	return arr;	
}
//获取第一个子节点
function getFirst(obj,type){
    type=type||"no";
    if(type=="no"){
    	return getChilds(obj,"no")[0];
    }
    if(type=="yes"){
    	return getChilds(obj,"yes")[0];
    }
}
//获取最后一个子节点
function getLast(obj,type){
    type=type||"no";
    if(type=="no"){
    	return getChilds(obj,"no")[getChilds(obj,"no").length-1];
    }
    if(type=="yes"){
    	return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
    }
}
//获取num子节点
function getNum(obj,num,type){
    type=type||"no";
    if(type=="no"){
    	return getChilds(obj,"no")[num-1];
    }
    if(type=="yes"){
    	return getChilds(obj,"yes")[num-1];
    }
}
//获取下一个兄弟节点
function getNext(obj,type){
	type=type||"no";
	var next=obj.nextSibling;
	if(next==null){
    			return false;
    		}
	if(type=="no"){
    	while(next.nodeType==3||next.nodeType==8){
    		next=next.nextSibling;
    		if(next==null){
    			return false;
    		}
    	}
	}
	else if(type=="yes"){
        while(next.nodeType==8||next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")){
        	next=next.nextSibling;
        	if(next==null){
    			return false;
    		}
        }
	}
	
    return next;
}
//获取上一个兄弟节点
function getPre(obj,type){
	type=type||"no";
	var pre=obj.previousSibling;
	if(next==null){
    			return false;
    		}
	if(type=="no"){
    	while(pre.nodeType==3||pre.nodeType==8){
    		pre=pre.previousSibling;
    		if(next==null){
    			return false;
    		}
    	}
	}
	else if(type=="yes"){
        while(pre.nodeType==8||pre.nodeType==3&&!pre.nodeValue.replace(/^\s*|\s*$/g,"")){
        	pre=pre.previousSibling;
        	if(next==null){
    			return false;
    		}
        }
	}
    return pre;
}
//封装insertbefore
function insertBefore(insert,before){
   var parent=before.parentNode;
   parent.insertBefore(insert,before)
}
//insertAfter
function insertAfter(insert,after){
	var parent=after.parentNode;
	var next=getNext(after,"yes");
	if(next){
		parent.insertBefore(insert,next)
	}
	else{
		parent.appendChild(insert)
	}
};

//添加事件
function addEvent(obj,event,fun){
    if(obj.addEventListener){
        obj.addEventListener(event,funevent,false)//绑定到obj身上的是funevent
    }
    else{
        obj.attachEvent("on"+event,funevent)//绑定到obj身上的是funevent
    }
    return funevent;//把最后的结果返回
    function funevent(e){
        var e=e||window.event;
        fun.call(obj,e)//把指针指向obj
    }
}
//删除
function removeEvent(obj,event,fun){
    if(obj.addEventListener){
        obj.removeEventListener(event,fun,false)
    }
    else{
        obj.detachEvent("on"+event,fun)
    }
}
//鼠标滚轮事件
function mousewheel(obj,upFun,downFun){
    if(document.attachEvent){//判断浏览器是否为ie8
        obj.attachEvent("onmousewheel",fun)//ie的添加方法
    }
    else{
        obj.addEventListener("mousewheel",fun,false);//大部分浏览器的添加方法
        obj.addEventListener("DOMMouseScroll",fun,false);//火狐浏览器的添加方法
    }
    function fun(e){
        var ev=e||window.event;
        var num=ev.wheelDelta||ev.detail;//获取鼠标滚轮滚动时候的值
        if(num==-120||num==3){
            downFun.call(obj); 
        }
        if(num==120||num==-3){
            upFun.call(obj);
         }
    }
}
//13.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//设置cookie
function setCookie(attr,value,time){
	if(time){
		var nowtime=new Date();
		nowtime.setTime(nowtime.getTime()+time*1000)
		document.cookie=attr+"="+value+";expires="+nowtime.toGMTString();
	}else{
		document.cookie=attr+"="+value;
	}
}
//获取cookie的值
function getCookie(attr){
	var cookies=document.cookie;
	var arr=cookies.split("; ");
	for(var i=0;i<arr.length;i++){
		var brr=arr[i].split("=");
		if(brr[0]==attr){
			return brr[1];
		}
	}
	return false;
}
//删除cookie
function delCookie(attr){
	var now=new Date();
	now.setTime(now.getTime()-1)//时间改到之前，这个cookie就过期了
	document.cookie=attr+"=a"+";expires="+now.toGMTString();//=后面随便附一个值
}
//ajax
function ajax(obj){
	var method=obj.method||"get";
	var url=obj.url;
	var dataType=obj.dataType||"text";
	var asynch=obj.asynch==undefined?true:obj.asynch;
	var data="";
	switch(typeof(obj.data)){
		case "undefined":		
		break;
		case "object":
			for(var i in obj.data){
				data+=i+"="+obj.data[i]+"&";
			}
			data=data.slice(0,-1);
		break;
		case "string":
			data=obj.data;
		break;
	}
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(method=="get"){
		ajax.open("get",url+"?"+data,asynch);
		ajax.send(null);
	}
	else if(method=="post"){
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.open("post",url,asynch);
		ajax.send(data);
	}
	ajax.onreadystatechange=function(){
	if(ajax.readyState==4){
			if(ajax.status==200){
				var result;
				switch(dataType){
					case "text":
						result=ajax.responseText;
					break;
					case "xml":
					 	result=ajax.responseXML;
					break;
					case "json":
						result=eval("("+ajax.response+")");
					break;			
				}
				if(obj.success){
					obj.success(result);
				}
			}
			else if(ajax.status==404){
				alert("页面未找到");
			}
			else{
				alert("请求错误");
			}
		}
	}
}
