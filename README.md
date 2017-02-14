<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="jquery.min.js"></script>
	<style>
	*{
		margin: 0;
		padding: 0;
	}
	.box{
		width: 200px;
		height: 200px;
		background: red;
		position: relative;
	}
	</style>
</head>
<body>
	<div class="box"></div>
</body>
<script>
	 class Drag(obj){
  	    this.obj=obj;
		this.cw=document.documentElement.clientWidth;
		this.ch=document.documentElement.clientHeight;
		this.ow=this.obj.offsetWidth;
		this.oh=this.obj.offsetHeight;
		this.ox=0;
		this.oy=0;
		this.cx=0;
		this.cy=0;
		this.obj.left=0;
		this.obj.top=0;
        constructor(){
        	drag(){
             	this.down();
            }
     	    down(){
     	    	var that=this;
	            this.obj.onmousedown=function(e){
	            var ev=e||window.event
	             that.ox=ev.offsetX
	     		 that.oy=ev.offsetY
	     		 that.move()
	     		 that.up()
     	        }
     	    }
     		
            
     	    move(){
	     		var that=this
	     		document.onmousemove=function(e){
	               var eve=e||window.event
	               that.cx=eve.clientX
	               that.cy=eve.clientY
	               that.left=that.cx-that.ox
	               that.tops=that.cy-that.oy
	               if(that.left<0){
	               	 that.left=0
	               }
	               if( that.left>that.cw-that.ow){
	               	that.left=that.cw-that.ow
	               }
	               if(that.tops<0){
	               	that.tops=0
	               }
	               if(that.tops>that.ch-that.oh){
	               	that.tops=that.ch-that.oh
	               }
	               that.obj.style.left=that.left+"px"
	               that.obj.style.top=that.tops+"px"


	     		}
     	    }
     		
     	    up(){
	     		document.onmouseup=function(){
	     			document.onmousemove=null;
	     			document.onmouseup=null;
	     	   }
     	    }
	          

        }
    }
    var obj=$(".box");
    console.log(new Drag(obj).drag());
</script>
</html>
