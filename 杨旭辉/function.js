//2016.8.4
//1.解决获取类名的兼容问题
//classname:类名
//father:父容器
function getClass(classname,father){
	father=father||document;
	if (father.getElementsByClassName) {
		return father.getElementsByClassName(classname);
	}else{
		var all=father.getElementsByTagName("*");
		var newarr=[];
		for (var i = 0; i < all.length; i++) {
			if (checkPre(all[i].className,classname)){
				newarr.push(all[i]);

			}
		};
		return newarr;
	}
}
function checkPre(str,classname){
    var arr=str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]==classname){
            return true;
        }
    }
    return false;
}
// ************************************************************************************************************

//2016.8.5 
//2.获取样式的兼容函数
//obj：对象
//attr：属性
function getStyle(obj,attr){        //attr:属性的意思
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}

// ************************************************************************************************************
// 2016.8.8
//3.获取元素的兼容函数
//"#box" id  ".box" 类名  "a"
//selecter:当它为字符串，获取元素
//         当它为函数，实现页面加载完成
function $(selecter,father){
	if (typeof selecter=="string") {
		father=father||document;
		selecter=selecter.replace(/^\s*|\s*$/g,"")
	    if (selecter.charAt(0)==".") {
	    	return getClass(selecter.slice(1),father);
	    }else if (selecter.charAt(0)=="#") {
	    	return document.getElementById(selecter.slice(1));
	    }else if (/^[a-z]+\d*$/g.test(selecter)) {
	    	return father.getElementsByTagName(selecter);
	    }
	}else if (typeof selecter=="function") {
		window.onload=function(){
			selecter()
		}
	}
}


// **********************************************************************************
// 2016.8.10
// 4.获取节点中的子节点
// father:父节点
// type: "a"子节点只有元素节点    "b"子节点有元素节点和非空的文本节点
function getChilds(father,type){
	type=type||"a";
    var all=father.childNodes;
    var newarr=[];
    for (var i = 0; i < all.length; i++) {
    	if (type=="a") {
    	  if (all[i].nodeType==1) {
            newarr.push(all[i]);
    	  }
    	}else if (type=="b") {
          if (all[i].nodeType==1 || all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="") {
    		newarr.push(all[i]);
    	  }
    	}   	
    }
    return newarr;
}

//5.获取第一个子节点
function getFirst(father){
	return getChilds(father)[0];
}

//6.获取最后一个子节点
function getLast(father){
	var last=getChilds(father).length-1;
	return getChilds(father)[last];
}

// 7.获取指定的子节点
function getNum(father,num){
	return getChilds(father)[num];
}

// 8.获取下一个兄弟节点
function getNext(obj){
    var next=obj.nextSibling;
    if (!next) {
		return false;
	}
    while (next.nodeType==3 || next.nodeType==8) {
    	next=next.nextSibling;
    	if (!next) {
    		return false;
    	}
    }
    return next;
}

//9.获取上一个兄弟节点
function getPre(obj){
    var pre=obj.previousSibling;
    if (!pre) {
		return false;
	}
    while (pre.nodeType==3 || pre.nodeType==8) {
    	pre=pre.previousSibling;
    	if (!pre) {
    		return false;
    	}
    }
    return pre;
}

// 10.把一个元素插入到某一个元素之后
// 2016.8.11
function insertAfter(father,newobj,oldobj){
    var next=getNext(oldobj);
    if (next) {
    	father.insertBefore(newobj,next);
    }else{
    	father.appendChild(newobj);
    }
}

// 11.绑定事件的兼容函数
function addEvent(obj,event,fun){
    if (obj.attachEvent) {
        obj.attachEvent("on"+event,function(){
            fun.call(obj);
        });
    }else{
        obj.addEventListioner(event,fun,false);
    }
}


// 2016.8.16
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





// cookie
function setCookie(attr,value,time){
  if (true) {
    var nowtime=new Date();
    nowtime.setTime(nowtime.getTime()+time*100);
    document.cookie=attr+"="+value+";expires"+nowtime.toGMTString();  //过期时间点
  }else{
    document.cookie=attr+"="+value;
  }
}

function getCookie(attr){
  var cookie=document.cookie;
  var arr=cookie.split(";");
  for (var i = 0; i < arr.length; i++) {
    var brr=arr[i].split("=");
    if (brr[0]==attr) {
      return brr[i];
    }
  }
  return false;
}
