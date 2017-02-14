// 获取类名
	// window.onload=function (){
		function getClass(classname,obj){
			var obj=obj||document;
			if(obj.getElementsByClassName){
				// 判断浏览器是否识别
				return obj.getElementsByClassName(classname);
			}else{
				var newarr=[];
				var arr=obj.getElementsByTagName('*');
				// 获取全部标签名
				for(var i=0;arr.length;i++){
					if(check(arr[i].className,classname)){
						newarr.push(arr(i));
					}
					return 
				}
			}
		}
		function check(class1,class2){
			var arr1=class1.split(" ");
			for(var i=0;i<arr.length;i++){
				if(arr[i]==class2){
					return true;
				}
			}
			return false;
		}
	
// 获取元素属性
// attr 样式
	function  getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,null)[attr];
		}
	}
// $函数  目的：传去字符串，获取元素，传入函数，执行加载完成;
	function $(seletor,obj){
		var obj=obj||document;
		if(typeof seletor=="string"){
			seletor=seletor.replace(/^\s*|\s*$/g,"")
			// 正则 替换传去参数前后的空格 ^开头，\s空格 *所有 $结尾
			if(seletor.charAt(0)==="."){
				return getClass(seletor.slice(1),obj);
			}else if(seletor.charAt(0)==="#"){
				return document.getElementById(seletor.slice(1));
			}else if(/^[a-zA-Z][a-z0-6A-Z]{0,8}$/.test(seletor)){
				// 判断传入参数是否是标签
				return obj.getElementsByTagName(seletor)
			}

		}else if(typeof seletor=="function"){
				window.onload=function(){
					seletor();
				}
			}
	}
// type输入no或者不传挑选元素里的子元素节点  type输入yes挑选元素里的子元素节点和文本节点   
	function getChilds(obj,type){
		var arr=[];
		var type=type||"no"
		// 初始化
		var childs = obj.childNodes;
		// 获取每一个子节点
		for(var i=0;i<childs.length;i++){
			if(type=="no"){
				if(childs[i].nodeType==1){
					//判断 获取子元素节点
				arr.push(childs[i]);
				}
			}else if(type=="yes"){
				if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
					// 判断 获取子元素节点和去空后的文本子节点
					arr.push(childs[i]);
				}
			}
		}
		return arr;
	}
// 获取第一个子节点
	function getFirst(obj,type){
		type=type||"no";
		if(type=="no"){
			return getChilds(obj,"no")[0];
		}else if(type=="yes"){
			return getChilds(obj,"yes")[0];
		}
	}
// 获取最后一个子节点
	function getLast(obj,type){
		type=type||"no";
		if(type=="no"){
			return getChilds(obj,"no")[getChilds(obj,"no").length-1];
		}else if(type=="yes"){
			return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
		}
	}
// 获取第n节点
	function getNum(obj,num,type){
		type=type||"no";
		if(type=="no"){
			return getChilds(obj,"no")[num-1];
		}else if(type=="yes"){
			return getChilds(obj,"yes")[num-1];
		}
	}
// 获取下一个兄弟节点
	function getNext(obj,type){
		type=type||"no";
		// 初始化
		if(type=="no"){
			var next=obj.nextSibling;
			// obj的下一个兄弟元素字节
			if(next==null){
			return false;
			}
			while(next.nodeType==3||next.nodeType==8){
				// 判断next是文本节点或者注释节点
				next=next.nextSibling;
				// 赋值本元素节点的下一个兄弟元素
				if(next==null){
					return false;
				}
			}
			return next;
		}else if(type=="yes"){
			var next=obj.nextSibling;
			if(next==null){
			return false;
			}
			while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
				// 	next的值用正则去空		next.nodeValue.replace(/^\s*|\s*$/g,"") 表示false,想要用加！
				next=next.nextSibling;
				if(next==null){
					return false;
				}
			}
			return next;
		}
		
	}
// 获取第一个子节点
	function getFirst(obj,type){
		type=type||"no";
		if(type=="no"){
			return getChilds(obj,"no")[0];
		}else if(type=="yes"){
			return getChilds(obj,"yes")[0];
		}
	}
// 获取最后一个子节点
	function getLast(obj,type){
		type=type||"no";
		if(type=="no"){
			return getChilds(obj,"no")[getChilds(obj,"no").length-1];
		}else if(type=="yes"){
			return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
		}
	}
// 获取第n节点
	function getNum(obj,num,type){
		type=type||"no";
		if(type=="no"){
			return getChilds(obj,"no")[num-1];
		}else if(type=="yes"){
			return getChilds(obj,"yes")[num-1];
		}
	}
// 获取上一个兄弟节点
	function getPrev(obj,type){
		type=type||"no";
		// 初始化
		if(type=="no"){
			var prev=obj.previousSibling;
			// obj的下一个兄弟元素字节
			if(prev==null){
			return false;
			}
			while(prev.nodeType==3||prev.nodeType==8){
				// 判断next是文本节点或者注释节点
				prev=prev.previousSibling;
				// 赋值本元素节点的下一个兄弟元素
				if(prev==null){
					return false;
				}
			}
			return prev;
		}else if(type=="yes"){
			var prev=obj.previousSibling;
			if(prev==null){
			return false;
			}
			while(prev.nodeType==3&&!prev.nodeValue.replace(/^\s*|\s*$/g,"")||prev.nodeType==8){
				// 	prev的值用正则去空		prev.nodeValue.replace(/^\s*|\s*$/g,"") 表示false,想要用加！
				prev=prev.previousSibling;
				if(prev==null){
					return false;
				}
			}
			return prev;
		}
		
	}
// 封装inserBefore	插入到某个元素之前，获取到被插入元素的父元素
	function insertBefore(newobj,beforeObj){
		var parent=beforeObj.parentNode;
		// 获取被插入元素的父元素
		parent.insertBefore(newobj,beforeObj);
	}

// 封装inserAfter	插入到某个元素之后
	function insertAfter(newobj,beforeObj){
		var next=getNext(beforeObj,"yes");
		// 获取被插入元素的下一个兄弟元素
		var parent=beforeObj.parentNode;
		// 获取被插入元素的父元素
		if(next){
			// 判断被next是否为空格
			insertBefore(newobj,next);
			// 执行插入到next(要插入要素的下一个)之前
		}else{
			parent.appendChild(newobj);
			// 执行插入到父元素里最后一个
		}
	}

	// 鼠标滚轮事件
	function mousewheel(obj,upFun,downFun){
		if(obj.attachEvent){
			// 低版本IE
			obj.attachEvent("onmousewheel",fun);
		}else{
			obj.addEventListener("mousewheel",fun,false);
			// 谷歌和高版本IE
			obj.addEventListener("DOMMouseScroll",fun,false);
			// 火狐
		}
		function fun(e){
			var ev = e || window.event;
			var num = ev.wheelDelta||ev.detail;
			console.log(num)
			if(num==120||num==-3){
				upFun.call(obj);
			}else if(num==-120||num==3){
				downFun.call(obj);
			}
		}
	}

// }