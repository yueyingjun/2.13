<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.box{
			width: 100px;
			height: 100px;
			background: red;
			position: absolute;
			left: 0;
			top: 0;
		}

	</style>
</head>

<body>
	<div class="box"></div>
</body>
<script>
	class Drag{
		constructor (obj){
			this.obj=obj;
			var box=document.getElementsByTagName("div")[0];
			this.cw=document.documentElement.clientWidth;
			this.ch=document.documentElement.clientHeight;
			this.ow=this.obj.offsetWidth;
			this.oh=this.obj.offsetHeight;
			this.ox=0;
			this.oy=0;
			this.cx=0;
			this.cy=0;
			this.left=0;
			this.top=0;
			this.drag=function(){
			this.down();
			},
			this.down=function(){
				var that=this;
				this.obj.onmousedown=function(e){
					var ev=e||window.event;
					var ox=ev.offsetX;
					var oy=ev.offsetY;
					that.move();
					that.up();
				}
			},
			this.move=function(){
				var that=this;
				document.onmousemove=function(e){
					var eve=e||window.event;
					that.cx=eve.clientX;
					that.cy=eve.clientY;
					that.left=that.cx-that.ox;
					that.top=that.cy-that.oy;
					if(that.left<=0){
						that.left=0;
					}
					if(that.top<=0){
						that.top=0;
					}
					if(that.left>=that.cw-that.ow){
						that.left=that.cw-that.ow;
					}
					if(that.top>=that.ch-that.oh){
						that.top=that.ch-that.oh;
					}
					that.obj.style.left=that.left+"px";
					that.obj.style.top=that.top+"px";
				}
			},
			this.up=function(){
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
				
			}
		}
	}
	var b=document.getElementsByTagName('div')[0];
	var newobj=new Drag(b);
	newobj.drag();
</script>
</html>
