// 1、兼容的通过类名获取元素（为了兼容）
function getClass(classname,obj){
	var obj = obj || document;
	if (obj.getElementsByClassName) {
		return obj.getElementsByClassName(classname);
	}else{
		var all = obj.getElementsByTagName('*');
		var newarr = [];
		for(var i=0; i<all.length ;i++){

					// "aa bb" "aa" "aabb" 	'aa'
			if( check(all[i].className==classname) ){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
				// "cc bb"  "aa"
function check(class1,class2){
	var arr = class1.split(" "); // ['cc','bb']
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == class2) {
			return true;
		}
	}
	return false;
}

// 2、兼容的获取元素的内容
		// 一个参数：获取元素的内容
		// 两个参数：设置元素的内容
function getText(obj,val){
	if(val==undefined){
		if(obj.innerText){
		return obj.innerText;
	}else{
		return obj.textContent;
	}
}else{
	if(obj.innerText){
		obj.innerText=val;
	}else{
		obj.textContent=val;
	}
	}
}

function getStyle(obj,attr){
	if(obj.currentStyle){ //判断这个对象的属性是否能用
		return obj.currentStyle[attr];//IE 返回属性的样式
	}else{
		return getComputedStyle(obj,null)[attr];//w3c
	}

}


function $(selector,obj){
	var obj =obj || document;
	if(typeof selector =="string"){
		selector=selector.replace(/^\s*|\s*$/g,"");
		if(selector.charAt(0)=="."){
		return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.slice(1));
		}else{
			return obj.getElementsByTagName(selector);
		}
	}else if(typeof selector=="function"){
		window.onload= function(){
			selector();
	}
	
	}
}
			
			// 滚动


			function mousewheel(obj,upFun,downFun){
				if(obj.attachEvent){
        			obj.attachEvent("onmousewheel",fun);
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


// function getChilds(obj,type){
// 	var arr=[];
// 	var childs=obj.childNodes;
// 	var type=type||"no";
// 	for (var i = 0; i < childs.length; i++){
// 		if(type=="no"){
// 			if(childs[i].nodeType==1){
// 			arr.push(childs[i]);
// 			}
		
// 		}else if(type=="yes"){

// 			if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
// 				arr.push(childs[i]);
// 			}
// 		}
// 	}

// 	return arr;
// }


// function getnFirst(obj,type){
// 	var type=type||"no";
// 	if(type=="no"){
// 		return getChilds(obj,"no")[0];
// 	}else if(type=="yes"){
// 		return getChilds(obj,"yes")[0];
// 	}

// }


// function getnLast(obj,type){
// 	var type=type||"no";
// 	if(type=="no"){
// 		return getChilds(obj,"no")[getChilds(obj,"no").length-1];
// 	}else if(type=="yes"){
// 		return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
// 	}

// }


// function getnNum(obj,num,type){
// 	var type=type||"no";
// 	if(type=="no"){
// 		return getChilds(obj,"no")[num-1];
// 	}else if(type=="yes"){
// 		return getChilds(obj,"yes")[num-1];
// 	}

// }

// function getNext(obj,type){
// 	var type=type||"no";
// 	var next=obj.nextSibling;
// 	if(next==null){
// 		return false;
// 	}
// 	if(type=="no"){
// 		while(next.nodeType==3||next.nodeType==8){
// 			next=next.nextSibling;
// 			if(next==null){
// 				return false;
// 			}
// 		}
// 	}else if(type=="yes"){
// 		while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|s*\$/g,"")||next.nodeType==8){
// 			next=next.nextSibling;
// 			if(next==null){
// 				return false;
// 			}
// 		}
// 	}
// 	return next;
// }	




// function getPrevious(obj,type){
// 	var type=type||"no";
// 	var previous=obj.previousSibling;
// 	if(previous==null){
// 		return false;
// 	}
// 	if(type=="no"){
// 		while(previous.nodeType==3||previous.nodeType==8){
// 			previous=previous.previousSibling;
// 			return previous;
// 			if(previous==null){
// 				return false;
// 			}
// 		}
// 	}else if(type=="yes"){
// 		while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|s*\$/g,"")||previous.nodeType==8){
// 			previous=previous.previousSibling;
// 			return previous;
// 			if(previous==null){
// 				return false;
// 			}
// 		}
// 	}
// 	return previous;
// }




// // 封装insertBefore

// function insertBefore(newObj,beforeObj){
// 	var parent=beforeObj.parentNode;
// 	parent.insertBefore(newObj,beforeObj);
// }

// function insertAfter(newObj,beforeObj){
// 	var next=getNext(beforeObj,"yes");
// 	var parent=beforeObj.parentNode;

// 	if(next){
// 		parent.insertBefore(newObj,next);
// 	}else{
// 		parent.appendChild(newObj);
// 	}

// }