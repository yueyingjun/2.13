// 1.解决获取类名的兼容问题
//   classname：那个类名找元素
//   father：父容器，获取的范围
  function getClass(classname,father){
       	   var father=father||document;
       	   //当father没有传参数时，father默认为document；如果传参数了，father按传参的走
       	   if(father.getElementsByClassName){
       	   	  return father.getElementsByClassName(classname);
       	   }else{
       	   	   var arr=[];
       	   	   var all=father.getElementsByTagName("*");
       	   	   for(i=0;i<all.length;i++){
       	   	   	  if(checkclass(all[i].className,classname)){
                         arr.push(all[i]);
       	   	   	  }
       	   	   }
       	   	   return arr;
       	   }
       }

       function checkclass(classname,obj){
       	  var arr=classname.spilt(" ");
       	  for(i=0;i<arr.length;i++){
       	  	if(arr[i]===obj){
       	  		return true;
       	  	}
       	  }
       	  return false;
       }
//2.获取样式的兼容函数
//return 具体的属性值
//obj  对象   "attr" 具体的css属性
   function getStyle(obj,attr){
    if(obj.currentStyle){
      return obj.currentStyle[attr];
    }else{
      return getComputedStyle(obj,null)[attr];
    }
   }
//3.获取元素的兼容函数
//"#"-id    "."-类名    "a"-标签名
//selecter（选择器） :1)当它为字符串时，获取元素;
//                    2)当它为函数时，实现页面加载完成;  变相使用了window.onload $(function(){})
function $(selecter,obj){
	var obj=obj||document; //参数初始化
	if(typeof selecter=="string"){
		selecter=selecter.replace(/^\s*|\s*$/g,"");
        if(selecter.charAt(0)=="."){ //获取出类
           return getClass(selecter.slice(1),obj);//截取 识别（./#）
        }else if(selecter.charAt(0)=="#"){//获取出ID
           return document.getElementById(selecter.slice(1));
        }else if(/^[a-zA-Z][a-z0-6]{0,8}$/.test(selecter)){//正则 怎么去设置标准的标签
           return obj.getElementsByTagName(selecter);
        }else if(/^<[a-zA-Z][a-z0-6]{0,8}>$/.test(selecter)){
           return document.createElement(selecter.slice(1,-1));
        }
	}else if(typeof selecter=="function"){
		window.onload=function(){
			selecter();
		}
	}
}
// $("div a p h img ul li table textarea....")
   //正则：一个定规则的表达式对象
   

   //4.获取节点中的子节点
   //obj：父节点
   //type："no"  子节点只有元素的节点
   //      "yes"  子节点有元素节点与非空的文本节点//获取节点中的子节点
function getChilds(obj,type){
        	var type=type||"no";
        	var arr=[];
        	var childs=obj.childNodes;

            for(i=0;i<childs.length;i++){
            	if(type=="no"){
            		if(childs[i].nodeType==1){
            		arr.push(childs[i]);
            	    }
            		
	            }else if(type=="yes"){
	            	if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
	            		arr.push(childs[i]);
	            	}
                }
            }
        	return arr;
        }

//5获取第一个子节点
  function getFirst(obj,type){
      type=type||"no";
      if(type=="no"){
        return getChilds(obj,"no")[0];
      }else if(type=="yes"){
        return getChilds(obj,"yes")[1];
      }
  }

 //6获取最后一个子节点
   function getLast(obj,type){
      type=type||"no";
      if(type=="no"){
        return getChilds(obj,"no")[getChilds(obj,"no").length-1];
      }else if(type=="yes"){
        return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
      }
   }

   //7获取num子节点
    function getNum(obj,num,type){
       type=type||"no";
       if(type=="no"){
            return getChilds(obj,"no")[num-1];
       }else if(type=="yes"){
            return getChilds(obj,"yes")[num-1];
       }
    }
//8获取下一个兄弟节点
function  getNext(obj,type){
      var type=type||"no";
      var next=obj.nextSibling;
      if(next==null){
            return false;
      }
      if(type=="no"){
            while(next.nodeType==3||next.nodeType==8){
                  next=next.nextSibling;
                        if(next==null){
                              return false
                  }
            }
      }else if(type=="yes"){
            while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
                  next=next.nextSibling;
                  if(next==null){
                        return false;
                  }
            }
      }
      return next;
}
//9获取上一个兄弟节点
function  getPre(obj,type){
      var type=type||"no";
      var previous=obj.previousSibling;
      if(previous==null){
            return false;
      }
      if(type=="no"){
            while(previous.nodeType==3||previous.nodeType==8){
                  previous=previous.previousSibling;
                        if(previous==null){
                              return false
                  }
            }
      }else if(type=="yes"){
            while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType==8){
                  previous=previous.previousSibling;
                  if(previous==null){
                        return false;
                  }
            }
      }
      return previous;
}

//10封装insertBefore
 
 function insertBefore(newObj,beforeObj){
    var parent=beforeObj.parentNode;
    parent.insertBefore(newObj,beforeObj);
 }

//11封装insertAfter
 
 function insertAfter(newObj,beforeObj){
    var next=getNext(beforeObj,"yes");
    var parent=beforeObj.parentNode; 
    if(next){
       insertBefore(newObj,next);
    }else{
        parent.appendChild(newObj);
    }
 }
 // 12 绑定事件的兼容函数
//添加事件   obj事件源对象  e事件对象
function addEvent(obj,event,fun){
   if(obj.attachEvent){  // 绑定在obj身上的是funEvent
       obj.attachEvent("on"+event,funEvent);
   }else{                 // 绑定在obj身上的是funEvent
       obj.addEventListener(event,funEvent,false)
   }
   return funEvent;
   function funEvent(e){
      //兼容事件对象
      var ev=e||window.event;
      //改变this指针，并且传递事件对象
        fun.call(obj,ev);
   }
}
//13.删除事件
function removeEvent(obj,event,fun){
   if(obj.attachEvent){   //删除的事件也应该是funEvent
       obj.detachEvent("on"+event,fun);
   }else{
       obj.removeEventListener(event,fun,false)
   }
}

//14.滚动事件
function mousewheel(obj,upfun,downfun){
  if(obj.attachEvent){
     obj.attachEvent("onmousewheel",fun);
  }else{
     obj.addEventListener("mousewheel",fun,false);
     obj.addEventListener("DOMMouseScroll",fun,false);
  }
  function fun(e){
    var ev=e||window.event;
    var num=ev.wheelDelta||ev.detail;
    if(num===120||num===-3){
        upfun.call(obj);
    }
    if(num===-120||num===3){
        downfun.call(obj);
    }
}
}


//15.hover
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

 //16.设置cookie
function setCookie(attr,value,time){
  if(time){
     var nowtime=new Date();
     nowtime.setTime(nowtime.getTime()+time*1000);
     document.cookie=attr+"="+value+";expires="+nowtime.toGMTString();
  }else{
     document.cookie=attr+"="+value;
  }
}
/********************************/
//获取cookie
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
/********************************/
//删除cookie
function delCookie(attr){
     var nowtime=new Date();
     nowtime.setTime(nowtime.getTime()-1);    //把事件改成之前的 就删除了 
     document.cookie=attr+"=kong"+";expires="+nowtime.toGMTString();// kong那里随便写 不等于value的值就好
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
/********************************/
