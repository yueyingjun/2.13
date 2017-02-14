// 通过类名获取属性的兼容性处理
function getClass(classname,obj){
	var obj=obj||document; 
	    // 变量的初始化
	if(obj.getElementsByClassName){
		// 判断兼容性
		return obj.getElementsByClassName(classname);
		// 兼容就返回所找元素集合
	}else{
			var all=obj.getElementsByTagName("*");
			// 得到所有元素
			var arr=[];
			// 新建一个数组来装符合所找类名的元素
			for(var i=0;i<all.length;i++){
				// 遍历所有元素
			if(checkClass(all[i].className,classname)){
				// 调用下面函数
					arr.push(obj[i])
				// 将符合要求的元素存放在新建数组里
			   	}
		}
		return arr;
		// 返回找到的所有符合要求的元素组成的数组
	}
}

// 判断想要two时类名为box one two也为我们想要的值    
function checkClass(className,classname){
	// 传入上面函数中for循环便利后的第i个元素的类名和想要获取的元素的类名
	var arr=className.split(" ");
	// 将className分隔开成为数组，从而选取数组中的每个对象进行判断
	for(i=0;i<arr.length;i++){
		// 遍历数组中的每个对象
		if(arr[i]===classname){
			// 判断每个对象是否和classname相等
			return true;
			// 存在相等返回true
		}
	}
	return false;
	// 不存在返回false
}


// 对样式做兼容性处理
function getStyle(obj,attr){
	// obj是对象  attr是具体的css属性
	if(obj.currentStyle){
		return obj.currentStyle[attr];
		// attr是变量名，通过变量名获取属性用[]且不加引号
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}


// 获取元素
// 目的：1.获取元素 2. 变相使用window.onload
// 四种情况：<".classname"> <"#id"> <"标签">  ("<添加标签名>")
function $(selector,obj){
	obj=obj||document;
	if(typeof selector==="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")
		if(selector.charAt(0)=="."){
			return getClass(selector.slice(1),obj);
		}
		else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.slice(1));
		}
		else if(/^[a-zA-Z][a-zA-Z0-6]{0,8}$/.test(selector)){
			return obj.getElementsByTagName(selector);
		}else if(/^<[a-zA-Z][a-zA-Z0-6]{0,8}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1))
		}
	}else if(typeof selector==="function"){
		window.onload=function(){
			selector() ;
		}
	}
}


// 在子节点中选择需要的元素节点和不全为空格的文本节点
function getChilds(obj,type){
	var type=type||"no";
	// 判断是否需要获取文本，默认是"no"不需要 ，需要用"yes"来走另一条路
	var child=obj.childNodes;
	var arr=[];
	if(type=="no"){
		for(i=0;i<child.length;i++){
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}
		}
	}else if(type=="yes"){
		for(i=0;i<child.length;i++){
			if(child[i].nodeType==1||child[i].nodeType==3&&child[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				// 取元素节点或者文本节点且文本节点不全为空格的时候才取
				arr.push(child[i]);
			}
		}
	}
	return arr
}

// 取所有取出的元素节点和文本节点中的第一个节点
function getFirst(obj,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[0];
	}else if(type=="yes"){
		return getChilds(obj,"yes")[0];
	}

}

// 取所有取出的元素节点和文本节点中的最后一个节点
function getLast(obj,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[getChilds(obj,"no").length-1]
	}else if(type=="yes"){
		return getChilds(obj,"yes")[getChilds(obj,"yes").length-1]
	}
}

// 取所有取出的元素节点和文本节点中的第num个节点
function getNum(obj,num,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[num-1];
	}else if(type=="yes"){
		return getChilds(obj,"yes")[num-1];
	}
}

// 获取下一个兄弟节点
function getNext(obj,type){
	var type=type||"no";
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

// 获取上一个兄弟节点
function getPrevious(obj,type){
	var type=type||"no";
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	if(type=="no"){
		 while(previous.nodeType==3||previous.nodeType==8){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
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


// 封装insertBefore
function insertBefore(newObj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(newObj,beforeObj);
}

// 放入某元素之后的函数
function insertAfter(newObj,beforeObj){
	var next=getNext(beforeObj,"yes");
	var parent=beforeObj.parentNode;
	if(next){
		insertBefore(newObj,next);
	}else{
		parent.appendChild(newObj);
	}
}

// 事件绑定
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		obj.addEventListener(event,funEvent,false)
		// 绑定在obj身上的是funEvent
	}else {
		obj.attachEvent("on"+event,funEvent)
	}
	function funEvent(e){
		// 兼容事件对象
			var ev=e||window.event;
			// 改变this指针，并且传递事件对象
			fun.call(obj,ev);
		}
	return funEvent;
}

// 事件移除
function removeEvent(obj,event,fun){
	if(obj.addEventListener){
		// 删除的事件应该是funEvent
		// funEvent才是真正添加在obj身上的事件
		obj.removeEventListener(event,fun,false)
	}else{
		obj.detachEvent("on"+event,fun)
	}

}

// 滚轮事件
function mousewheel(obj,upFun,downFun){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",fun)
	}else{
		obj.addEventListener("mousewheel",fun,false);
		obj.addEventListener("DOMMouseScroll",fun,false);
	}
	function fun(e){
		var ev=e||window.event;
		var num=ev.wheelDelta||ev.detail;
		if(num==120||num==-3){
			upFun.call(obj);
		}else if(num==-120||num==3){
			downFun.call(obj);
		}
	}
}