$(function() {
//banner左侧
function bannerLeft() {
	$(".hgc_bannerleftfixnav li").each(function(index) {
		$(".hgc_bannerleftfixnav li").eq(index).hover(function() {
			$(".hgc_bannerleftfixnav li h3").eq(index).children().css({color: "#333"})
			$(".hgc_banner_leftbox").eq(index).css({"display": "block"})
		}, function() {
			$(".hgc_bannerleftfixnav li h3").eq(index).children().css({color: ""})
			$(".hgc_banner_leftbox").eq(index).css({"display": "none"})
		})
	})
	$(".hgc_banner_leftbox").each(function(index) {
		$(".hgc_banner_leftbox").eq(index).hover(function() {
			$(".hgc_bannerleftfixnav li h3").eq(index).children().css({
				color: "#333"
			})
			$(".hgc_bannerleftfixnav li").eq(index).css({
				"background": "#fff"
			})
			$(".hgc_banner_leftbox").eq(index).css({
				display: "block"
			})
		}, function() {
			$(".hgc_bannerleftfixnav li h3").eq(index).children().css({
				color: ""
			})
			$(".hgc_bannerleftfixnav li").eq(index).css({
				"background": ""
			})
			$(".hgc_banner_leftbox").eq(index).css({
				"display": "none"
			})
		})
	})
	$(".hgc_bannerleftfixnav h3 a").each(function(n) {
		$(".hgc_bannerleftfixnav h3 a").eq(n).hover(function() {
			$(".hgc_bannerleftfixnav h3 a").eq(n).css({
				color: "#E60000"
			})
		}, function() {
			$(".hgc_bannerleftfixnav h3 a").eq(n).css({
				color: "#333"
			})
		})
	})
}
bannerLeft() 
// body页面顶部导航
$(".hgc_headinput").clone(true).prependTo(".hgc_bodytop").css({position:"absolute",left:"460px",top:"8px"});
$(window).scroll(function(){
	// 顶部搜索框
	if($(window).scrollTop()>800){
		$(".hgc_bannertopleft>.hgc_bannerleftfixbox").css({"display":"none"});
		$(".hgc_bannertopleft").hover(function(){
			$(".hgc_bannertopleftguding>.hgc_bannerleftfixbox").css({"display":"block"});
		},function(){
		    $(".hgc_bannertopleftguding>.hgc_bannerleftfixbox").css({"display":"none"});
		})
		$(".hgc_bodytopbox").css({"display":"block"});
		$(".hgc_bannertopleft").eq(0).addClass("hgc_bannertopleftguding");        
	}else{
		$(".hgc_bodytopbox").css({"display":"none"});
		$(".hgc_bannertopleft").eq(0).removeClass("hgc_bannertopleftguding");	
		$(".hgc_bannertopleft>.hgc_bannerleftfixbox").css({"display":"block"});				
	}
})
// 头部
//头部导航下拉框
$(".hgc_drop").each(function(index) {
		$(".hgc_drop").eq(index).hover(function() {
			$(".hgc_nav b i").eq(index).css({
				"background-position": "-55px -433px"
			})
			$(".hgc_nav b").eq(index).next("div").css({
				"display": "block"
			})
			$(".hgc_nav b").eq(index).children("a").css({
				"color": "#c00"
			})
			$(".hgc_nav b").eq(index).css({
				"border-color": "#e6e6e6",
				"background": "#fff",
				"color": "#c00",
				"cursor": "default",
				"z-index": "10"
			})
		}, function() {
			$(".hgc_nav b i").eq(index).css({
				"background-position": "-62px -433px"
			})
			$(".hgc_nav b").eq(index).next("div").css({
				"display": "none"
			})
			$(".hgc_nav b").eq(index).children("a").css({
				"color": "#888"
			})
			$(".hgc_nav b").eq(index).css({
				"border-color": "",
				"background": "",
				"color": "",
				"z-index": ""
			})
		})
	})
//头部导航下边美豆点击效果
var zhuan = 0;
$(".hgc_navgudingiconright").click(function() {
	zhuan -= 240;
	if(zhuan <= -720) {
		zhuan = -480
	}
	$(".hgc_navgudingicon ul").animate({
		"left": zhuan + "px"
	})
})
$(".hgc_navgudingiconleft").click(function() {
		zhuan += 240;
		if(zhuan > 0) {
			zhuan = 0
		}
		$(".hgc_navgudingicon ul").animate({
			"left": zhuan + "px"
		})
	})
// 购物车
$(".hgc_rightside").hover(function() {
		$(".hgc_shopcarguding").css({
			"display": "block"
		})
	}, function() {
		$(".hgc_shopcarguding").css({
			"display": "none"
		})
	})
// 广告位消失
$(".hgc_guanggaoclose").on("click", function() {
		$(".hgc_guanggaowei").css({
			"display": "none"
		})
	})
// banner轮波效果	
function banner() {
	var bannerbg = ["rgb(153, 4, 10) none repeat scroll 0% 0%", "rgb(239, 1, 87) none repeat scroll 0% 0%", "rgb(250, 207, 154) none repeat scroll 0% 0%", " rgb(231, 0, 18) none repeat scroll 0% 0%", "rgb(250, 246, 237) none repeat scroll 0% 0%", "rgb(200, 21, 42) none repeat scroll 0% 0%", "rgb(205, 28, 20) none repeat scroll 0% 0%", "rgb(227, 72, 76) none repeat scroll 0% 0%"];
	var num = 0;
	function move(type) {
		type = type || "right";
		if(type == "right") {
			num++;
			if(num >= $(".hgc_bannerimg li").length) {
				num = 0;
			}
		} else if(type == "left") {
			num--;
			if(num < 0) {
				num = $(".hgc_bannerimg li").length - 1;
			}
		}
		$(".hgc_bannerimg li").css({
			"opacity": "0"
		}).removeClass().eq(num).addClass("first").animate({
			opacity: 1
		});
		$(".hgc_bannercircle li").removeClass().eq(num).addClass("first");
		$(".hgc_banner").css({
			"background": bannerbg[num]
		});
	}
	var t = setInterval(move, 1000);
	// banner悬停
	$(".hgc_banner").hover(function() {
			clearInterval(t);
		}, function() {
			t = setInterval(move, 1000);
		})
		// 划入按钮效果
	$(".hgc_bannercircle li").hover(function() {
		$(".hgc_bannerimg li").css({
			"opacity": "0"
		}).removeClass().eq($(this).index()).addClass("first").animate({
			opacity: 1
		});
		$(".hgc_bannercircle li").removeClass().eq($(this).index()).addClass("first");
		$(".hgc_banner").css({
			"background": bannerbg[num]
		});
		num;
	}, function() {});
	// banner左右俩边按钮 
	$(".hgc_bannerbtnl").on("click", function() {
		move("left");
	})
	$(".hgc_bannerbtnr").on("click", function() {
		move("right");
	})
	$(".hgc_bannerbtnl").hover(function() {
		$(".hgc_bannerbtnl span").eq(0).animate({
			opacity: 0.6
		})
	}, function() {
		$(".hgc_bannerbtnl span").eq(0).animate({
			opacity: 0.2
		})
	})
	$(".hgc_bannerbtnr").hover(function() {
		$(".hgc_bannerbtnr span").eq(0).animate({
			opacity: 0.6
		})
	}, function() {
		$(".hgc_bannerbtnr span").eq(0).animate({
			opacity: 0.2
		})
	})
}
banner();
//banner右侧上下轮波
function bannerRightlunbo() {
	var n = 0;
	var t = setInterval(move, 7000);
	var height = $(".hgc_bannertopright").height();

	function move(type) {
		type = type || "top";
		if(type == "top") {
			n++;
			if(n >= $(".hgc_bannertopright ul li").length) {
				n = 0;
			}
			$(".hgc_bannertopright ul").animate({
				top: -height * n
			}, 1000);
		} else if(type == "bottom") {
			n--;
			if(n < 0) {
				n = $(".hgc_bannertopright ul li").length - 1;
			}
			$(".hgc_bannertopright ul").animate({
				top: -height * n
			}, 1000);
		}
	};
	$(".hgc_bannertoprightbox").hover(function() {
		clearInterval(t);
	}, function() {
		t = setInterval(move, 7000);
	});
	$(".hgc_bannertoprightbtnup").on("click", function() {
		move("top");
	})
	$(".hgc_bannertoprightbtndown").on("click", function() {
		move("bottom");
	})
}
bannerRightlunbo();
//banner右侧选项卡
function bannerRight(){
    // 整体呈现
    $(".hgc_bannerseverbotboxtop").mouseover(function(){
        $(".hgc_bannerseverbotwrap").css({"display":"block"})
        $(".hgc_bannerseverbotwrap").animate({"top":"70px"},500)
    })
    //整体消失
    $(".hgc_bannerseverbotwrap_close").click(function(){
        $(".hgc_bannerseverbotwrap").css({"display":"none"})
        $(".hgc_bannerseverbotboxtop li").children("a").children(".hgc_bansbottitle").css({"color":"#373737"}).end().children(".iconfont").css({"color":"#373737"})
    })
    // 下面小图标移入效果
      $(".hgc_bannerseverbotbox li").each(function(index){ 
        $(".hgc_bannerseverbotbox li").eq(index).hover(function(){
         $(".hgc_bannerseverbotbox li").eq(index).children("a").children(".hgc_bansbottitle").css({"color":"#e3101e"}).end().children(".iconfont").css({"color":"#e3101e"}) 
        },function(){
         $(".hgc_bannerseverbotbox li").eq(index).children("a").children(".hgc_bansbottitle").css({"color":"#373737"}).end().children(".iconfont").css({"color":"#373737"})  
        })
      })
    // 总体选项卡
    $(".hgc_bannerseverbotboxtop li").each(function(index){
        $(".hgc_bannerseverbotboxtop li").eq(index).hover(function(){
            $(".hgc_bannerseverbotboxtop li").children("a").children(".hgc_bansbottitle").css({"color":"#373737"}).end().children(".iconfont").css({"color":"#373737"})
            $(".hgc_bannerseverbotboxtop li").eq(index).children("a").children(".hgc_bansbottitle").css({"color":"#e3101e"}).end().children(".iconfont").css({"color":"#e3101e"})               
            $(".hgc_bannerseverbotwrap_li").css({"display":"none"}).eq(index).css({"display":"block"})
        },function(){
            
        })
    })        
    // 充值选项卡
    $(".hgc_banner_cz_top span").click(function(){
        $(".hgc_banner_cz_top span").removeClass("one").eq($(this).index()).addClass("one")
        $(".hgc_banner_cz_bottom").removeClass("one").eq($(this).index()).addClass("one")
    })
    // 票务选项卡
    $(".hgc_banner_pw_top span").click(function(){
        $(".hgc_banner_pw_top span").removeClass("one").eq($(this).index()).addClass("one")
        $(".hgc_banner_pw_bottom").removeClass("one").eq($(this).index()).addClass("one")
    })
    // 旅行选项卡
    $(".hgc_banner_lx_top span").click(function(){
        $(".hgc_banner_lx_top span").removeClass("one").eq($(this).index()).addClass("one")
        $(".hgc_banner_lx_bottom").removeClass("one").eq($(this).index()).addClass("one")
    })
}
bannerRight()
// 楼层项目一 banner轮波效果
$(".hgc_floorbox").each(function(floornum1) {
		function floorbanner(floornum1) {
			var num = 0;
			function move(type) {
				type = type || "right";
				if(type == "right") {
					num++;
					if(num >= 3) {
						num = 0;
					}
				} else if(type == "left") {
					num--;
					if(num < 0) {
						num = 2;
					}
				}
				$(".hgc_floorcontrbanimg").eq(floornum1).children().removeClass().css({
					"opacity": "0"
				}).eq(num).addClass("first").animate({
					opacity: 1
				});
				$(".hgc_floorcontrbancir").eq(floornum1).children().removeClass().eq(num).addClass("first");
			}
			var t = setInterval(move, 3000);
			// banner悬停
			$(".hgc_floorcontrbanner").eq(floornum1).hover(function() {
					clearInterval(t);
				}, function() {
					t = setInterval(move, 3000);
				})
				// 划入下边小按钮效果
			$(".hgc_floorcontrbancir").eq(floornum1).children().each(function(cir) {
					$(this).hover(function() {
						$(".hgc_floorcontrbanimg").eq(floornum1).children().removeClass().css({
							"opacity": "0"
						}).eq(cir).addClass("first").animate({
							opacity: 1
						});
						$(".hgc_floorcontrbancir").eq(floornum1).children().removeClass().eq(cir).addClass("first");
					}, function() {})
				})
				// banner左右俩边按钮 
			$(".hgc_floorcontrbanbtnl").eq(floornum1).on("click", function() {
				move("left");
			})
			$(".hgc_floorcontrbanbtnr").eq(floornum1).on("click", function() {
					move("right");
				})
				// 楼层选项卡效果
			$(".hgc_floortitle ul").eq(floornum1).children().hover(function() {
					$(".hgc_floortitle ul").eq(floornum1).children().removeClass("first").eq($(this).index()).addClass("first");
					$(".hgc_floorcontrbox").eq(floornum1).children(".hgc_floorcontr").css({
						"display": "none"
					}).eq($(this).index()).css({
						"display": "block"
					});
				}, function() {})
				// 最右边按钮点击效果  
			var nub = 0;
			$(".hgc_floorcontrbox").eq(floornum1).children(".hgc_floorcontrightbtn").children(".hgc_floorcontrightbtns").click(function() {
					nub++;
					if(nub >= 7) {
						nub = 0;
					};
					$(".hgc_floortitler").eq(floornum1).children().removeClass("first").eq(nub).addClass("first");
					$(".hgc_floorcontrbox").eq(floornum1).children(".hgc_floorcontr").css({
						"display": "none"
					}).eq(nub).css({
						"display": "block"
					});
				})
				// 选项卡内按钮效果 左右按钮
			$(".hgc_floorcontrbox").eq(floornum1).hover(function() {
				$(".hgc_floorcontrightbtn .hgc_floorcontrightbtns").eq(floornum1).css({
					"display": "block"
				});
			}, function() {
				$(".hgc_floorcontrightbtn .hgc_floorcontrightbtns").eq(floornum1).css({
					"display": "none"
				});
			})
			$(".hgc_floorcontrbanner").eq(floornum1).hover(function() {
					$(".hgc_floorcontrbanbtn").eq(floornum1).css({
						"display": "block"
					});
				}, function() {
					$(".hgc_floorcontrbanbtn").eq(floornum1).css({
						"display": "none"
					});
				})
				// 左边按钮
			$(".hgc_floorcontrbanbtnl").eq(floornum1).hover(function() {
					$(".hgc_floorcontrbanbtnl a").css({
						"opacity": "0.5"
					})
				}, function() {
					$(".hgc_floorcontrbanbtnl a").css({
						opacity: 0.25
					})
				})
				// 右边按钮
			$(".hgc_floorcontrbanbtnr").eq(floornum1).hover(function() {
					$(".hgc_floorcontrbanbtnr a").css({
						"opacity": "0.5"
					})
				}, function() {
					$(".hgc_floorcontrbanbtnr a").css({
						opacity: 0.25
					})
				})
				// 最右边按钮
			$(".hgc_floorcontrightbtns").eq(floornum1).hover(function() {
				$(".hgc_floorcontrightbtns a").css({
					"opacity": "0.5"
				})
			}, function() {
				$(".hgc_floorcontrightbtns a").css({
					opacity: 0.25
				})
			})
		}
		floorbanner(floornum1);
	})
// 楼层项目二 banner轮波效果
$(".hgc_floorbox2").each(function(floornum2) {
		function floorbanner(floornum2) {
			var num = 0;

			function move(type) {
				type = type || "right";
				if(type == "right") {
					num++;
					if(num >= 3) {
						num = 0;
					}
				} else if(type == "left") {
					num--;
					if(num < 0) {
						num = 2;
					}
				}
				$(".hgc_floorcont2rightbannerimgs").eq(floornum2).children().removeClass().css({
					"opacity": "0"
				}).eq(num).addClass("first").animate({
					opacity: 1
				});
				$(".hgc_floorcont2rightbannercircle").eq(floornum2).children().removeClass().eq(num).addClass("first");
			}
			var t = setInterval(move, 3000);
			// banner悬停
			$(".hgc_floorcont2rightbanner").eq(floornum2).hover(function() {
					clearInterval(t);
				}, function() {
					t = setInterval(move, 3000);
				})
				// 划入下边小按钮效果
			$(".hgc_floorcont2rightbannercircle").eq(floornum2).children().each(function(cir) {
					$(this).hover(function() {
						$(".hgc_floorcont2rightbannerimgs").eq(floornum2).children().removeClass().css({
							"opacity": "0"
						}).eq(cir).addClass("first").animate({
							opacity: 1
						});
						$(".hgc_floorcont2rightbannercircle").eq(floornum2).children().removeClass().eq(cir).addClass("first");
					}, function() {})
				})
				// banner左右俩边按钮 
			$(".hgc_floorcont2rightbanner_left").eq(floornum2).on("click", function() {
				move("left");
			})
			$(".hgc_floorcont2rightbanner_right").eq(floornum2).on("click", function() {
					move("right");
				})
				// 楼层选项卡效果
			$(".hgc_floortitle2 ul").eq(floornum2).children().hover(function() {
					$(".hgc_floortitle2 ul").eq(floornum2).children().removeClass("first").eq($(this).index()).addClass("first");
					$(".hgc_floorcont2").eq(floornum2).children(".hgc_floorcont2right").removeClass("first").eq($(this).index()).addClass("first");
				}, function() {})
				// 最右边按钮点击效果  
			var nub = 0;
			$(".hgc_floorcont2").eq(floornum2).children(".hgc_floorcont2rightbtn").click(function() {
					nub++;
					if(nub >= 7) {
						nub = 0;
					};
					$(".hgc_floortitle2 .hgc_floortitler").eq(floornum2).children().removeClass("first").eq(nub).addClass("first");
					$(".hgc_floorcont2").eq(floornum2).children(".hgc_floorcont2right").removeClass("first").eq(nub).addClass("first");
				})
				// 选项卡内按钮效果 左右按钮
			$(".hgc_floorcont2").eq(floornum2).hover(function() {
				$(".hgc_floorcont2rightbtn").eq(floornum2).css({
					"display": "block"
				});
			}, function() {
				$(".hgc_floorcont2rightbtn").eq(floornum2).css({
					"display": "none"
				});
			})
			$(".hgc_floorcont2rightbanner").eq(floornum2).hover(function() {
				$(".hgc_floorcont2rightbanner_left").eq(floornum2).css({
					"display": "block"
				});
				$(".hgc_floorcont2rightbanner_right").eq(floornum2).css({
					"display": "block"
				});
			}, function() {
				$(".hgc_floorcont2rightbanner_left").eq(floornum2).css({
					"display": "none"
				});
				$(".hgc_floorcont2rightbanner_right").eq(floornum2).css({
					"display": "none"
				});
			})
		}
		floorbanner(floornum2);
	})
// 猜你喜欢点击效果
function duyoulike() {
	var num = 0
	$(".hgc_youliketitle .hgc_likebtnright").click(function() {
		num++;
		if(num >= 3) {
			num = 0;
		};
		$(".hgc_youlikecont ul").removeClass("first").eq(num).addClass("first");
	})
	$(".hgc_youliketitle .hgc_likebtnleft").click(function() {
		num--;
		if(num < 0) {
			num = 2;
		};
		$(".hgc_youlikecont ul").removeClass("first").eq(num).addClass("first");
	})
}
duyoulike();
// 热销榜选项卡
function hotebox() {
	var num = 0
	$(".hgc_hotboxltitle .hgc_likebtnleft").click(function() {
		num++;
		if(num >= 3) {
			num = 0;
		};
		$(".hgc_hotboxrcont ul").removeClass("first").eq(num).addClass("first");
	})
	$(".hgc_hotboxltitle .hgc_likebtnright").click(function() {
		num--;
		if(num < 0) {
			num = 2;
		};
		$(".hgc_hotboxrcont ul").removeClass("first").eq(num).addClass("first");
	})
}
hotebox();
// 右侧固定
function rightGuding() {
	$(".hgc_rightGudingdrop").each(function(index) {
		$(".hgc_rightGudingdrop").eq(index).hover(function() {
			$(".hgc_rightGudingdrop").eq(index).children("h3").css({"display":"block"})
			$(".hgc_rightGudingword").eq(index).animate({"left": "-82"}, 300).css({"display":"block"})								
		}, function() {
			$(".hgc_rightGudingdrop").eq(index).children("h3").css({"display":"none"})
			$(".hgc_rightGudingword").eq(index).animate({"left": "0"}, 300).css({"display":"none"})									
		})
	})
	$(".hgc_rightGudingdrop2").eq(0).hover(function() {
		$(".hgc_rightGudingdrop2").eq(0).children("h3").css({"display":"block"})
		$(".hgc_rightGudingword2").eq(0).animate({"left": "-140","width":"140"}, 300).css({"display":"block"})							
	}, function() {
		$(".hgc_rightGudingdrop2").eq(0).children("h3").css({"display":"none"})
		$(".hgc_rightGudingword2").eq(0).animate({"left": "0","width":"0"}, 300).css({"display":"none"})							
	})
}
rightGuding();

// 楼层跳转 楼层导航 开始
var now=0;
$(".hgc_floors").each(function(num){
	function lcdh(num){	
			$(window).scroll(function(){
				if($(this).scrollTop()>=$(".hgc_floors").eq(0).offset().top-550&&$(this).scrollTop()<=8000){
					$(".hgc_floornavbox").css("display","block")
				}else{
					$(".hgc_floornavbox").css("display","none")	
				} 
				if($(this).scrollTop()>=$(".hgc_floors").eq(num).offset().top-300&&$(this).scrollTop()<=$(".hgc_floors").eq(num).next().offset().top-300){			
					$(".hgc_floornavbox li").eq(num).children("a").css({"color":"#e3101e"}).children("span").css({"color":"#e3101e"})
					$(".hgc_floornavbox li").eq(num).children("b").css({"display": "block"})
				   	now=num;
				}else{
				  $(".hgc_floornavbox li").eq(num).children("a").css({"color":"#5e5e5e"}).children("span").css({"color":"#5e5e5e"})
				  $(".hgc_floornavbox li").eq(num).children("b").css({"display": "none"})
				} 
			})		  
	}
	lcdh(num);
})
//鼠标移入变色
$(".hgc_floornavbox li").hover(function(){
	    $(".hgc_floornavbox li").eq($(this).index()).children("a").css({"color":"#e3101e"}).children("span").css({"color":"#e3101e"})
	},function(){
	    if($(this).index()!=now){
	        $(".hgc_floornavbox li").eq($(this).index()).children("a").css({"color":"#5e5e5e"}).children("span").css({"color":"#5e5e5e"})
	    }
	})
// 点击跳到指定位置
$(".hgc_floornavbox .hgc_cur").click(function(){
    var h=$(".hgc_floors").eq($(this).index()).offset().top;
    $("html,body").animate({scrollTop:h},500)
    $(".hgc_floornavbox .hgc_cur").eq($(this).index()).children("a").css({"color":"#e3101e"}).children("span").css({"color":"#e3101e"})           
})
$(".hgc_floornavtop").click(function(){
	  $("html,body").animate({scrollTop:2500},500)
})
$(".hgc_floornavbotm").click(function(){
	  $("html,body").animate({scrollTop:7700},500)
})

// 楼层跳转 楼层导航 结束



})
