<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
		body{
			padding: 0;
			margin: 0;
		}
		div{
			width: 200px;
			height:200px;
			background:red;
			position:relative;
			left: 0;
			top:0
		}
		</style>
	</head>
	<body>
		<div></div>
	</body>
	<script type="text/javascript">
		var obj=document.querySelector("div")
		class move{
		constructor(obj){
			this.obj=obj;
		}
		down(){
			var that=this;
			that.obj.onmousedown=function(e){
	     	var eve=e||window.event;
	     	if(eve.preventDefault){
	     		eve.preventDefault();
		    }else{
		    	eve.returnValue=false;
		    }  
	     	that.ox=eve.offsetX;  
	     	that.oy=eve.offsetY;
	        that.startx=that.ox;
	        that.starty=that.oy;
	        that.move()
		    that.up()
		    }	
		}
		move(){
		    var that=this;
			document.onmousemove=function(e){
		     	var eve=e||window.event
		     	if(eve.preventDefault){
		     		eve.preventDefault();
		     	}else{
		     		eve.returnValue=false;
		     	}
		        that.cx=eve.clientX;
		        that.cy=eve.clientY;
		        var x=that.cx-that.ox;
		        var y=that.cy-that.oy;
		        var w=document.documentElement.clientWidth-that.obj.offsetWidth;
		        var h=document.documentElement.clientHeight-that.obj.offsetHeight;
		        if (x<=0){x=0}
		        if (y<=0){y=0}
		        if (x>=w){x=w}
		        if (y>=h){y=h}
		        that.obj.style.left=x+"px";
		        that.obj.style.top=y+"px";
		        that.endx=x;
		        that.endy=y;
		        that.lenx=that.endx-that.startx;
		        that.leny=that.endy-that.starty;
		        that.startx=that.endx;
		        that.starty=that.endy;
		        that.up()
	     	}
		}
		up(){
			var that=this;
			document.onmouseup=function(){
	     		that.xishu=0.9;
	     		var t=setInterval(function(){
	     			that.lenx*=that.xishu;
	     			that.leny*=that.xishu;
	     			that.obj.style.left=that.lenx+that.obj.offsetLeft+"px";
	     			that.obj.style.top=that.leny+that.obj.offsetTop+"px";
	     		},60)
	     		if(Math.abs(that.lenx)>=Math.abs(that.leny)){
                    if(Math.abs(that.lenx)<=1){
                    	clearInterval(t)
                    }
     			}else if(Math.abs(that.leny)<=1){
     				clearInterval(t)
     			}
	     		document.onmousemove=null;
	     		document.onmouseup=null;
	     	}
		}	
	}
    new move(obj).down()
	</script>
</html>
