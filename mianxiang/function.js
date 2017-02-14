//getClass 	类名的兼容性 在ie的低版本中没有这个属性；在火狐和谷歌中有这个属性。如果有这个属性，那么会返回这个对象的方法，如果没有，就会返回undefined;
function getClass(classname,obj){//传入俩个参数 要考虑参数的顺序 类名是必须传的所以必须放在第一个 第二个参数传入一个对象 这样可以查询到子对象
	obj=obj||document;//利用或的短路原理，前面的是真，那么就不看后面的
	if(obj.getElementsByClassName){
		//这个里面就不传空对象
		return obj.getElementsByClassName(classname);//获取出来的是一个集合，但是可以用数组的方式来获取和查询
		//如果有，那么就使用这个方法
	}else{//没有的话，就利用标签名的方法来实现类名的方法
		var all=obj.getElementsByTagName("*");
		// 这个地方需要的是obj，如果是document的话，就会取不到子对象上的标签
		//*是获取所有的标签名  还可以用document的属性document.all 但是不用
		//为了能模仿获取类名的方法，所以要将获取到的标签加入一个数组中
		var arr=[];//声明一个新数组
		//all是一个集合
		//遍历all集合，得到all中的每一个标签名
		for(var i=0;i<all.length;i++){
			// 类名是一个对象上的属性，判断每一个对象上的类名
			if(check(all[i].className,classname)){//可以全等，也可以相等
			// 在实际获取类名的过程中会出现"aa bb cc"这样的类名，为了解决这样的问题，需要进行判断，所以在if中引入一个回调函数，参数就是all[i].className和classname.这个函数叫check，返回一个true或者一个false	
				arr.push(all[i]);
			}
		}
		return arr;//返回一个数组；
	}
}

function check(classname1,classname2){
	// classname1接受的是arr[i].className;
	// classname2接受的是classname;
	// 将arr[i]的类名分割，返回一个数组，并且遍历，然后一个一个的去和classname去比较 因为类名的写法是中间有空格，所以分割的时候用空格；
	var newarr=classname1.split(" ");
	for(var i=0;i<newarr.length;i++){
		if(newarr[i]==classname2){
			return true;
		}
	}
	return false;
	//让newarr的每一个去和classname比较，如果有的话返回true；如果没有，在最后返回一个false
	//这里不能使用if else语句，因为如果第一个不是的话，那么它就会返回一个false，并且跳出函数
}




// <---------------------getClass函数封装结束----------------------------->




// getStyle函数的封装
// 封装的原因是：在DOM中，获取元素的样式的时候，会有兼容性的问题。
// 在高版本的ie中，火狐，谷歌浏览器中可以通过|getComputedStyle(obj,null).css属性|来获取对象的样式，在低版本的ie中，是没有这个属性的，需要使用ie特有的|obj.currentStyle.css属性|
function getStyle(obj,attr){//传入俩个参数，第一个参数是对象，第二个参数是需要查询样式的属性
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}//因为传入的属性是字符串，所以在调用属性的时候要用[];
}





// <-------------getStyle函数的封装结束----------->

// <-------------------$函数的封装--------------------->
//$函数的目的：1、简便的获取元素， 标签 $("div",obj) 类名$(".one",obj) id("#one",obj)
// 2、window.onload   $(function(){})
function $(selector,obj){
	var obj=obj||document;
	if(typeof selector==="string"){
		//类名
		selector=selector.replace(/^\s*|\s*$/g,"");
		if(selector.charAt(0)==="."){
			return getClass(selector.slice(1),obj);
		}
		//id
		if(selector.charAt(0)==="#"){
			return document.getElementById(selector.slice(1));
		}
		//标签 
		if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
			return obj.getElementsByTagName(selector);
		}
	}else if(typeof selector==="function"){
		window.onload=function(){
			selector();//selector就是函数名，在加载事件执行的时候
		}
	}
}

// <-----------------$函数封装结束------------------------>


//<----------------------节点函数封装---------------------->
// 多个与和多个或进行判断时，与的优先级比或高
//type 的参数是"yes"，是需要文本节点。 "no"或者不传是只要元素节点；

//用途 获取该对象下面的子节点
//传type 是为了获取子节点中的文本节点
function getChilds(obj,type){
	var type=type||"no";//在传入no或者不传的情况下，只要元素节点
	var arr=[];
	var childs=obj.childNodes;//获取得到的是一个集合；
	for(var i=0;i<childs.length;i++){
		if(type=="yes"){
			if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))//这个地方不用通过！来调用boolean函数 正则是用来得到不全是空格的文本。全是空格就是false
			{
				arr.push(childs[i]);
			}
	//childs[i].nodeValue是该文本节点的内容
		}else if(type=="no"){
			if(childs[i].nodeType==1){
				arr.push(childs[i]);
			}
		}
	}
	return arr;
}

// 获取第一个子节点
function getFirst(obj,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[0];
	}else if(type="yes"){
		return getChilds(obj,"yes")[0];
	}
}

// 获取最后一个子节点
function getLast(obj,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[getChilds(obj,"no").length-1];
	}else if(type=="yes"){
		return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
	}
}

// 获取第num个子节点
function getNum(obj,num,type){
	var type=type||"no";
	if(type=="no"){//在判断时type就已经被限制，所以在{}中执行的也应该和判断条件一致
		return getChilds(obj,"no")[num-1];
	}else if(type=="yes"){
		return getChilds(obj,"yes")[num-1];
	}
}	




// 获取下一个兄弟节点   
//需要判断
//不考虑文本 也分几种情况
// 1、一开始就没有，var next=obj.nextSibling 
// 没有下个兄弟节点的 得到的是null  让它返回一个false
// 2、有的话
//考虑文本 也分几种情况
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;//obj的下一个兄弟节点
	if(type=="no"){
		if(next==null){
			return false;
		}
		while(next.nodeType==3||next.nodeType==8){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		//循环的目的是为了将next传递到下面，最后将想要的返回出来
		return next;

	}else if(type=="yes"){
		if(next==null){
			return false;
		}
		while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}

// 取对象的上一个节点
function getpreV(obj,type){
	var type=type||"no";
	var prev=obj.previousSibling;//obj的下一个兄弟节点
	if(type=="no"){
		if(prev==null){
			return false;
		}
		while(prev.nodeType==3||prev.nodeType==8){
			prev=prev.previousSibling;
			if(prev==null){
				return false;
			}
		}
		return prev;

	}else if(type=="yes"){
		if(prev==null){
			return false;
		}
		while(prev.nodeType==3&&!prev.nodeValue.replace(/^\s*|\s*$/g,"")||prev.nodeType==8){
			prev=prev.previousSibling;
			if(prev==null){
				return false;
			}
		}
		return prev;
	}
}

//封装insertBefore  将某个对象插入一个对象之前
function insertBefore(newObj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(newObj,beforeObj);
}

// 封装insertAfter		将某个对象插入一个对象之后
function insertAfter(newObj,beforeObj){
// 原理：1、首先考虑要放在这个对象之后，这个对象的下一个文本节点之前
		// 2、他的下一个对象是否为null，也就是false
		// 如果是null，就用parent.appendChild(newObj)；
	var parent=beforeObj.parentNode;
	var next=getNext(beforeObj,"yes");
	if(next){
		return insertBefore(newObj,next)
	}else{
		return parent.appendChild(newObj);
	}	
}


// 滚动条的兼容
// 在谷歌中，用document.body.scrollTop
// 在火狐，ie中，用document.documentElement.scrollTop
// 第一种，三元表达式	但是当一开始是0的时候，不会选正确的对象
// obj=document.body.scrollTop?document.body:document.documentElement;
// 第二种，可以直接
// animate(document.body,{scrollTop:0},500)
// animate(document.documentElement,{scrollTop:0},500)
