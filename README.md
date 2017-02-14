<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<script src="function.js"></script>
	<script src="animate.js"></script>
</head>
<style>
.box{
	width:200px;
	height:200px;
	background:red;
	position:absolute;
	top:0;
	left:0;
}
</style>
<body>
	<div class="box"></div>
</body>
<script>
class drag{
	constructor(){
	    this.obj=document.querySelector(".box");
		this.ox=0;
	    this.oy=0;
	    this.cx=0;
	    this.cy=0;
	    this.startx=0;
	    this.starty=0;
	    this.endx=0;
	    this.endy=0;
	    this.lenx=0;
	    this.leny=0;
	    this.xishu=0.8;
	    this.cw=document.documentElement.clientWidth;  
		this.ch=document.documentElement.clientHeight;
		this.ow=this.obj.offsetWidth;
	    this.oh=this.obj.offsetHeight;
	}
    down(){
    	var that=this;
		this.obj.onmousedown=function(e){
			var eve=e||window.event;
			
			that.ox=eve.offsetX;
			that.oy=eve.offsetY;
			that.startx=that.ox;
		    that.starty=that.oy;
		    that.move();
			that.up();
		}
    }
    move(){
    	var that=this;
		document.onmousemove=function(e){
			var eve=e||window.event;
			that.cx=eve.clientX;
			that.cy=eve.clientY;
			var x=that.cx-that.ox;
			var y=that.cy-that.oy;
			if(x<=0){x=0};
			if(x>=(that.cw-that.ow)){x=that.cw-that.ow};
			if(y<=0){y=0};
			if(y>=(that.ch-that.oh)){y=that.ch-that.oh};

			that.obj.style.left=x+"px";
			that.obj.style.top=y+"px";
			that.endx=x;
			that.endy=y;
			that.lenx=that.endx-that.startx;
			that.leny=that.endy-that.starty;
			that.startx=that.endx;
			that.starty=that.endy;
		}
    }
    up(){
    	var that=this;
		document.onmouseup=function(){
				var t=setInterval(function(){
					that.lenx*=that.xishu;
					that.leny*=that.xishu;
					var x=that.lenx+that.obj.offsetLeft;
					var y=that.leny+that.obj.offsetTop;

					if(x<=0){x=0};
					if(x>=(that.cw-that.ow)){x=that.cw-that.ow};
					if(y<=0){y=0};
					if(y>=(that.ch-that.oh)){y=that.ch-that.oh};

					if(Math.abs(that.lenx)>=Math.abs(that.leny)){
						if(Math.abs(that.lenx)<=1){
							clearInterval(t);
						}
					}else if(Math.abs(that.leny)<=1){
							clearInterval(t);	
					}
					that.obj.style.left=x+"px";
					that.obj.style.top=y+"px";
				},80)
			document.onmousemove=null;
			document.onmouseup=null;
		}
    }
}
  new drag().down();
</script>
</html>
