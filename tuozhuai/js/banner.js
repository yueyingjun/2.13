	// 		轮播
	// banner
$(function(){
		var bannerzhu=$(".bannerzhu")[0];
		var tutu=$(".tutu",bannerzhu)[0];
		var tutuli=$("li",tutu);
		var diandian=$(".diandian",bannerzhu)[0];
		var diandianli=$("li",diandian);
		// var jiantou=$(".jiantou",bannerzhu)[0];
		var leftjian=$(".bannerzhuLef",bannerzhu)[0];
		var rightjian=$(".bannerzhuReg",bannerzhu)[0];
		var aa=0;
		var width=parseInt(getStyle(tutuli[0],"width"));
		tutu.style.width=width*tutuli.length+"px";
		var t =setInterval(move,1500);
		function move(){
			aa++;
			if(aa>=tutuli.length){
				aa=0;
			}
			animate(tutu,{left:-width*aa});
			for(var i=0;i<diandianli.length;i++){
				diandianli[i].className="";
			}
			diandianli[aa].className="diyi";
		}
		bannerzhu.onmouseover=function(){
			clearInterval(t);
		}
		bannerzhu.onmouseout=function(){
			t =setInterval(move,1500);
		}
		for(var i=0;i<diandianli.length;i++){
			diandianli[i].index=i;
			diandianli[i].onmouseover=function(){
				animate(tutu,{left:-width*this.index});
				for(var i=0;i<diandianli.length;i++){
					diandianli[i].className="";
				}
				this.className="diyi";
				aa=this.index;
			}
		}
		rightjian.onclick=function(){
			move();
		}
 		leftjian.onclick=function(){
			aa--;
			if(aa<0){
				aa=tutuli.length-1;
			}
			animate(tutu,{left:-width*aa});
			for(var i=0;i<diandianli.length;i++){
				diandianli[i].className="";
			}
			diandianli[aa].className="diyi";
		}
	})