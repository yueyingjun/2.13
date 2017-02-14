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
				height:300px;
				background:pink;
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
		class move{
		constructor(){
		    this.obj=document.querySelector("div")
            this.ox=0;
            this.oy=0;
            this.cx=0;
            this.cy=0;
            this.startx=0;
            this.starty=0;
            this.endx=0;
            this.endy=0;
            this.lengx=0;
            this.lengy=0;
            this.xishu=0;
		}
		down(){
			 var that=this
			 that.obj.onmousedown=function(e){
		     var eve=e||window.event;
		     if(eve.preventDefault){//阻止浏览器默认事件
		     	eve.preventDefault();
		     }else{
		     		eve.returnValue=false;
		     }  
		     	var eve=e||window.event
		     	that.ox=eve.offsetX;
		     	that.oy=eve.offsetY;
		        that.startx=that.ox;
		        that.starty=that.oy;
		        that.move1()
			    that.up()
		      }	
		}
		move1(){
			    var that=this
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
		        if(x<=0){x=0;}
		        if (y<=0){y=0;}
		        if (x>=w){x=w}
		        if(y>=h){y=h}
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
			    var that=this
				document.onmouseup=function(){
	     		that.xishu=0.9;
	     		var t=setInterval(function(){
	     			that.lenx*=that.xishu;
	     			that.leny*=that.xishu;
	     			if(Math.abs(that.lenx)>=Math.abs(that.leny)){
	                    if(Math.abs(that.lenx)<=1){
	                    	clearInterval(t)
	                    }
	     			}else if(Math.abs(that.leny)<=1){
	     				clearInterval(t)
	     			}
	     			that.obj.style.left=that.lenx+that.obj.offsetLeft+"px";
	     			that.obj.style.top=that.leny+that.obj.offsetTop+"px";
	     		},60)
	     		document.onmousemove=null;
	     		document.onmouseup=null;
	     	}
		}	
	}
    new move().down()
	</script>
</html>
