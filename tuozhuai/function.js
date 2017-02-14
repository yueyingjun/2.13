// getStyle获取对象属性
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}else{
		return window.getComputedStyle(obj,null)[attr]
	}
}



// getClass获取对象
// 在IE6-8中不能使用类名的方式去获取元素
// document.getElementsByClassName所以我们用一个函数去解决这个问题
// 如果在函数中有document.getElementsByClassName,那么alert(),以后就会弹出一个函数，说明浏览器中有这个方法，放在ie6-8中，就会出现undefined； 
function getClass(classname,range){
	if(document.getElementsByClassName){
    // 隐试的转化成boolean值
    // alert("支持")
    // [div,div,div]
   return range.getElementsByClassName(classname);
   }else{
   	// alert("不支持")
   	// 把html中的所有标签拿出来
   	 var all=range.getElementsByTagName("*");
   	 // 进行遍历
   	 var arr=[];
   	 for(var i=0;i<all.length;i++){
   	 	// 利用对象的className
   	 	if(getCheck(all[i].className,classname)){
   	 // 在js中，我们可以限制查询的范围，所以我们设置一个范围，引入一个参数range
   	 		// 因为在上面的结果是数组的样子（也就是一个集合的样子）所以需要设置一个数组，并把对象放入数组
   	 		arr.push(all[i])
   	 	}
   	 }
      return aar
   }

}
// 在div标签中添加类名时，会出现"inner aa bb cc"这种情况，那么会因为className不同而无法显示。所以我们又构造了一个函数来检查
function getCheck(tagName,aclass){
	// 因为字符串在被分割之后，输出的就是数组，所以不必再新建数组。
	var arr=tagName.split(" ")
	// 遍历数组
	for(var i=0;i<arr.length;i++){
		if(aar[i]==aclass){
			return true;
		}else{
			return false;
		}
	}

}
// 在条件中需要一个true或者false

// $的用法很多  用来代替getClass
// 通过id 类名 标签名的特性来进行判断
// id #  类名 .  标签名 div
function $(selector,range){
	// 将document作为默认值
	var range=range||document;
	// 获取
	if(typeof selector=="string"){
		// 检测Id的使用
		if(selector.charAt(0)=="#"){
			return document.getElementById(selector.slice(1));
		}
		// 检测类名的使用
		if(selector.charAt(0)=="."){
			return getClass(selector.substr(1),range);	
		}
		// 检测标签名的使用
		if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
			return range.getElementsByTagName(selector);
		}
		// 创建标签对象 其实是'div',但是在实际输入的时候是<div>，所以需要slice;
		if(/^<[a-zA-Z][a-zA-Z1-6]{0,9}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));
		}
	}
	// 加载
	// 因为加载事件本来就没有调用  window.onload=function(){}
	// 所以window.onload=selector;所以也不需要return;
	if(typeof selector=="function"){
		// 这个地方不需要return 
		window.onload=selector
	}
}

// 获取子节点的处理问题
function getChilds(obj){
   var childs=obj.childNodes
   var newarr=[]
   for(var i=0;i<childs.length;i++){
   	if(!(childs[i].nodeType==8||(childs[i].nodeType==3&&trim(childs[i].nodeValue)==""))){
   		newarr.push(childs[i])
   	}
   }
   return newarr;
}

// 判断回车的函数
function trim(str){
	return str.replace(/^\s+|\s+$/g,"")
}

// 获取第一个子节点
function getFirst(parent){
	var first=getChilds(parent)[0]
	return first;
}

// 获取最后一个子节点
function getLast(parent){
	var childs=getChilds(parent)
	return childs[childs.length-1]
}

// 获取任意一个子节点
// i是具体子节点的下标
function getIndex(parent,i){
  return getChilds(parent)[i];
}

// 获取下一个兄弟节点
// obj为当前的子节点
function getNext(obj){
    var next=obj.nextSibling;
		    if(!next){
		    	return false;
		    }
    while((next.nodeType==8)||(next.nodeType==3&&trim(next.nodeValue)=="")){
    	next=next.nextSibling;
	       if(!next){
	    	return false;
	      }
     }
    return next;
}

// 获取上一个兄弟节点
function getup(obj){
    var next=obj.previousSibling;
		    if(!next){
		    	return false;
		    }
    while((next.nodeType==8)||(next.nodeType==3&&trim(next.nodeValue)=="")){
    	next=next.previousSibling;
	       if(!next){
	    	return false;
	      }
     }
    return next;
}
// 插入某个对象之前
function insertBefore(obj1,obj2){
    var parent=obj2.parentNode
    return parent.insertBefore(obj1,obj2);
}
// 插入某个对象之后
function insertAfter(yobj,endobj){
	var parent=endobj.parentNode;
	var next=getNext(endobj)
    if(next){
    	return parent.insertBefore(yobj,next)
    }else{
    	return parent.appendChild(yobj)
    }

}


// 轮播图
function wheel(box){
        var imgBox=$('.img-box',box)[0];
        var imgs=$('img',imgBox)
        var kd=parseInt(getStyle(imgs[0],'width'))
        var uls=$('ul',box)[0];
        var lis=$('li',uls);
        var btn=$('.btn',box)[0];
        var left=$('.left',btn)[0];
        var right=$('.right',btn)[0];
        lis[0].style.background="red";
        // alert(lis.length)
        imgBox.style.width=kd*imgs.length+"px"; 
        var index=0;
        var t=setInterval(move,2000)
            function move(){
            index++;
            if(index==imgs.length){index=0};
              animate(imgBox,{left:-kd*index})
              for(var i=0;i<imgs.length;i++){
                lis[i].style.background='';
              }
              lis[index].style.background='red';
            }
            
        
            box.onmouseover=function(){
                clearInterval(t);
            }
            box.onmouseout=function(){
                t=setInterval(move,2000);
            }   
            // 点击效果
           
            for(var i=0;i<imgs.length;i++){
                lis[i].index=i;
            lis[i].onclick=function(){
            animate(imgBox,{left:-kd*this.index})
            for(var i=0;i<imgs.length;i++){
                lis[i].style.background="";
               }
                this.style.background='red';
                index=this.index; 
            }
        }
        // 箭头点击效果
        right.onclick=function(){
            move();
            
        }
        left.onclick=function(){
            index--;
            if(index<0){index=imgs.length-1}
            animate(imgBox,{left:-kd*index})
              for(var i=0;i<imgs.length;i++){
                lis[i].style.background='';
              }
              lis[index].style.background='red';    
        }
   
   }

   // 给一个事件绑定事件
   function on(obj,ev,callback){
  if(obj.addEventListener){
    obj.addEventListener(ev,callback)
  }else{
    obj.fffNNN=function(){
      callback.call(obj)
    }
    obj.attachEvent("on"+ev,obj.fffNNN)
  }
}

 // 将绑定的事件删除
function off(obj,ev,callback){
  if(obj.removeEventListener){
    obj.removeEventListener(ev,callback)
  }else{
    obj.detachEvent("on"+ev,obj.fffNNN)
  }
}
