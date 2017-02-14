<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>drav</title>
</head>
<script src="jquery.js"></script>
<style>
	*{
		padding: 0;
		margin: 0;
	}
	.bord{
		width: 100%;
		height: 500px;
		border: 2px solid #888;

	}
	.box{
		width: 150px;
		height: 150px;
		background: red;
		/*background-size: cover;*/
		position: absolute;
	}
</style>
<body>
	<div class="bord">
		<div class="box"></div>
	</div>
		

</body>
<script>
	var bord = $(".bord");
	var box = $(".box");
	var flag=true;
	class dray{
		constructor(){
			this.opend=function(){
				this.move();
				this.change(800,500,"green")
			},
			this.move=function(){
				$(".box").click(function(e){
					var ev=e||window.event;
					var inx=ev.offsetX;
					var iny=ev.offsetY;
					document.onmousemove=function(e){
						var ev=e||window.event;
						var cx=$(".bord")[0].offsetWidth;
						var cy=$(".bord")[0].offsetHeight;
						var outx=ev.clientX;
						var outy=ev.clientY;
						if (0<outx-inx&&outx-inx<parseInt(cx)-150&&0<outy-iny&&outy-iny<parseInt(cy)-150) {
							flag=true;
						};
						if (flag) {
							$(".box").css({left:outx-inx+"px",top:outy-iny+"px"});
							if (parseInt($(".box")[0].style.left)+150>parseInt(cx)) {
								$(".box").css({
									left:parseInt(cx-152)+"px"
								})
								flag=false;
							}
							console.log(flag,parseInt($(".box")[0].style.left)+150,parseInt(cx))
							if (parseInt($(".box")[0].style.top)+150>parseInt(cy)) {
								$(".box").css({
									top:(parseInt(cy)-150)+"px"
								})
								flag=false;
							}
							if (parseInt($(".box")[0].style.top)<0) {
								$(".box").css({
									top:0
								})
								flag=false;
							}
							if (parseInt($(".box")[0].style.left)<0) {
								$(".box").css({
									left:0
								})
								flag=false;
							}
						}
						
					}
				})
			},
			this.change=function(a,b,c){
				$(".bord").css({
					width:a+"px",
					height:b+"px",
					background:c
				})
			}
		}
	}
	
	new dray().opend()
</script>
</html>