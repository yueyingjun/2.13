
	
$(function(){
// 		banner轮播
		var bannerzhu=$(".bannerzhu")[0];
		var tutu=$(".tutu",bannerzhu)[0];
		var tutuli=$("li",tutu);
		var diandian=$(".diandian",bannerzhu)[0];
		var diandianli=$("li",diandian);
		var leftjian=$(".bannerzhuLef",bannerzhu)[0];
		var rightjian=$(".bannerzhuReg",bannerzhu)[0];
		var ab=0;
		var width=parseInt(getStyle(tutuli[0],"width"));
		tutu.style.width=width*tutuli.length+"px";
		var t =setInterval(move,1500);
		function move(){
			ab++;
			if(ab>=tutuli.length){
				ab=0;
			}
			animate(tutu,{left:-width*ab});
			for(var i=0;i<diandianli.length;i++){
				diandianli[i].className="";
			}
			diandianli[ab].className="diyi";
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
				ab=this.index;
			}
		}
		rightjian.onclick=function(){
			move();
		}
 		leftjian.onclick=function(){
			ab--;
			if(ab<0){
				ab=tutuli.length-1;
			}
			animate(tutu,{left:-width*ab});
			for(var i=0;i<diandianli.length;i++){
				diandianli[i].className="";
			}
			diandianli[ab].className="diyi";
		}
		// 输入框
		var aa = document.getElementById('aa')
		var text = document.getElementById('text');
		text.onfocus=function(){
			if (text.value=="零钱充值抢红包 领卷最高立减1000元"){
				text.value="";
			}
		}
		text.onblur=function(){
			if(text.value){
				return;
			}
			else{
				text.value="零钱充值抢红包 领卷最高立减1000元"
			}
		}

// 选项卡
// 	公告选型卡
		var bannerRigTop1= getClass('bannerRigTop1');
		var bannerRigTop2= getClass('bannerRigTop2');
		var gonggaodingwei = getClass('gonggaodingwei');
		gonggaodingwei[0].style.display="block";
		gonggaodingwei[1].style.display="none";
		
		bannerRigTop2[0].onmouseover=function(){
			gonggaodingwei[0].style.display="none";
			gonggaodingwei[1].style.display="block";
		}
		bannerRigTop1[0].onmouseover=function(){
			gonggaodingwei[1].style.display="none";
			gonggaodingwei[0].style.display="block";
		}
		// 网站导航
		var dingbuLeft_1= getClass('dingbuLeft_1');
		var dingbuLeft_1xuan= getClass('dingbuLeft_1xuan');
		dingbuLeft_1xuan[0].style.display="none"
		dingbuLeft_1[0].onmouseover=function(){
			dingbuLeft_1xuan[0].style.display="block"
		}
		dingbuLeft_1[0].onmouseout=function(){
			dingbuLeft_1xuan[0].style.display="none"
		}
		// 商家入驻
		var dingbuLeft_2= getClass('dingbuLeft_2');
		var dingbuLeft_2xuan= getClass('dingbuLeft_2xuan');
		dingbuLeft_2xuan[0].style.display="none"
		dingbuLeft_2[0].onmouseover=function(){
			dingbuLeft_2xuan[0].style.display="block"
		}
		dingbuLeft_2[0].onmouseout=function(){
			dingbuLeft_2xuan[0].style.display="none"
		}
		// 我的订单
		var dingbuRight_5= getClass('dingbuRight_5');
		var dingbuRight_5xuan= getClass('dingbuRight_5xuan');
		dingbuRight_5xuan[0].style.display="none"
		dingbuRight_5[0].onmouseover=function(){
			dingbuRight_5xuan[0].style.display="block"
		}
		dingbuRight_5[0].onmouseout=function(){
			dingbuRight_5xuan[0].style.display="none"
		}
		// 我的易购
		var dingbuRight_6= getClass('dingbuRight_6');
		var dingbuRight_6xuan= getClass('dingbuRight_6xuan');
		dingbuRight_6xuan[0].style.display="none"
		dingbuRight_6[0].onmouseover=function(){
			dingbuRight_6xuan[0].style.display="block"
		}
		dingbuRight_6[0].onmouseout=function(){
			dingbuRight_6xuan[0].style.display="none"
		}
		// 手机苏宁
		var dingbuRight_4= getClass('dingbuRight_4');
		var dingbuRight_4xuan= getClass('dingbuRight_4xuan');
		dingbuRight_4xuan[0].style.display="none"
		dingbuRight_4[0].onmouseover=function(){
			dingbuRight_4xuan[0].style.display="block"
		}
		dingbuRight_4[0].onmouseout=function(){
			dingbuRight_4xuan[0].style.display="none"
		}
		// 客户服务
		var dingbuRight_3= getClass('dingbuRight_3');
		var dingbuRight_3xuan= getClass('dingbuRight_3xuan');
		dingbuRight_3xuan[0].style.display="none"
		dingbuRight_3[0].onmouseover=function(){
			dingbuRight_3xuan[0].style.display="block"
		}
		dingbuRight_3[0].onmouseout=function(){
			dingbuRight_3xuan[0].style.display="none"
		}
		// banner
		var sidebar=getClass('sidebar');
		var bannerxuan=getClass('bannerxuan');
		for(var i=0;i<bannerxuan.length;i++){
			bannerxuan[i].style.display="none";
		}
		for(var i=0;i<sidebar.length;i++){
			sidebar[i].index=i;
			sidebar[i].onmouseover=function(){
				for(var i=0;i<bannerxuan.length;i++){
					bannerxuan[i].style.display="none";
				}
				bannerxuan[this.index].style.display="block";	
			}
			sidebar[i].onmouseout=function(){
				for(var i=0;i<bannerxuan.length;i++){
					bannerxuan[i].style.display="none";
				}	
			}
		}
		// f1
		var fzbhTop_1=getClass('fzbhTop_1') ;
		var fzbhzi1=getClass('fzbhzi1',fzbhTop_1[0]);
		var fzbhzi2=getClass('fzbhzi2',fzbhTop_1[0]);
		var fzbhBorRig=getClass('fzbhBorRig');
		var fzbhBorRigxuan=getClass('fzbhBorRigxuan',fzbhBorRig[0]);
		var fzbhBorRigxuan1=getClass('fzbhBorRigxuan1',fzbhBorRig[0]);
		for(var i=0;i<fzbhzi2.length;i++){
			fzbhzi2[i].index=i;
			fzbhzi2[i].onmouseover=function(){
				for(var i=0;i<fzbhzi2.length;i++){
					fzbhzi2[i].style.color="#666666";
					fzbhzi1[0].style.color="#666666";
				}
				this.style.color="#783E18";
				for(var i=0;i<fzbhBorRigxuan.length;i++){
					fzbhBorRigxuan[i].style.display="none";
					fzbhBorRigxuan1[0].style.display="none";
				}
				fzbhBorRigxuan[this.index].style.display="block";
			}
		}
			fzbhzi1[0].onmouseover=function(){
				for(var i=0;i<fzbhzi2.length;i++){
					fzbhzi2[i].style.color="#666666";
				}
				fzbhzi1[0].style.color="#783E18";
				for(var i=0;i<fzbhBorRigxuan.length;i++){
					fzbhBorRigxuan[i].style.display="none";
				}
				fzbhBorRigxuan1[0].style.display="block";
			}
		// f2
		var fzbhzi3=getClass('fzbhzi3',fzbhTop_1[1]);
		var fzbhzi4=getClass('fzbhzi4',fzbhTop_1[1]);
		var fzbhBorRigxuan2=getClass('fzbhBorRigxuan2',fzbhBorRig[1]);
		fzbhBorRigxuan2[4].style.display="block";
		for(var i=0;i<fzbhzi4.length;i++){
			fzbhzi4[i].index=i;
			fzbhzi4[i].onmouseover=function(){
				for(var i=0;i<fzbhzi4.length;i++){
					fzbhzi4[i].style.color="#666666";
					fzbhzi3[0].style.color="#666666";
				}
				this.style.color="#783E18";
				for(var i=0;i<fzbhBorRigxuan2.length;i++){
					fzbhBorRigxuan2[i].style.display="none";
				}
				fzbhBorRigxuan2[this.index].style.display="block";
			}
		}
			fzbhzi3[0].onmouseover=function(){
				for(var i=0;i<fzbhzi4.length;i++){
					fzbhzi4[i].style.color="#666666";
				}
				fzbhzi3[0].style.color="#783E18";
				for(var i=0;i<fzbhBorRigxuan.length;i++){
					fzbhBorRigxuan2[i].style.display="none";
				}
				fzbhBorRigxuan2[4].style.display="block";
			}



	})