/**
 * Created by Administrator on 2017/2/13.
 */
/*
 drag(obj,{slideX:[0,500],slideY:[0,500],dragX:true,dragY:true,animate:true})
 obj  要拖拽对象

 option 配置项
 slideX  在x轴方向拖拽的范围 默认无限制
 slideY  在y轴方向拖拽的范围 默认无限制
 dragX   是否允许在x轴方向进行拖拽  默认允许ture
 dragY   是否允许在y轴方向进行拖拽  默认允许true
 animate 是否有动画   默认有true
 */
class drag(obj,option){
    this.obj=obj;
    var option=option||{};
    this.slideX=option.slideX==undefined?true:option.slideX;
    this.slideY=option.slideY==undefined?true:option.slideY;
    this.dragX=option.dragX==undefined?true:option.dragX;
    this.dragY=option.dragY==undefined?true:option.dragY;
    this.animate=option.animate==undefined?true:option.animate;
    this.speed=0.8;
    this.play();

}
drag.prototype={
    play:function(){
        this.down()
    },

    down:function(){
        var that=this;
        that.obj.onmousedown=function(e){
            var ev=e||window.event;
            that.ox=ev.offsetX;
            that.oy=ev.offsetY;
            that.startX=that.ox;
            that.startY=that.oy;
            that.move();
            that.up();
        }
    },
    move:function(){
        var that=this;
        document.onmousemove=function(e){
            var ev=e||window.event;
            that.cx=ev.clientX;
            that.cy=ev.clientY;
            that.endX=that.cx;
            that.endY=that.cy;
            var lefts=that.cx-that.ox-(offset(that.obj).left-that.obj.offsetLeft);
            var tops=that.cy-that.oy-(offset(that.obj).top-that.obj.offsetTop);

            if(that.slideX){
                if(lefts>=that.slideX[1]){
                    lefts=that.slideX[1];
                }
            }
            if(that.slideX){
                if(lefts<=that.slideX[0]){
                    lefts=that.slideX[0];
                }
            }

            if(that.slideY){
                if(tops>=that.slideY[1]){
                    tops=that.slideY[1];
                }
            }
            if(that.slideY){
                if(tops<=that.slideY[0]){
                    tops=that.slideY[0];
                }
            }
            if(that.dragX){
                that.obj.style.left=lefts+"px";
            }
            if(that.dragY){
                that.obj.style.top=tops+"px";
            }

            that.moveX=that.endX-that.startX;
            that.moveY=that.endY-that.startY;
            that.startX=that.endX;
            that.startY=that.endY;
        }
    },
    up:function(){
        var that=this;
        if(that.animate){
            that.donghua();
        }
        that.obj.onmouseup=function(){
            document.onmousemove=null;
            that.obj.onmouseup=null;
        }
    },
    donghua:function(){
        var that=this;
        var flag=true;
        if(Math.abs(that.moveX)>Math.abs(that.moveY)){
            flag=true;
        }else{
            flag=false;
        }

        var t=setInterval(function(){

            if(flag){
                if(Math.abs(that.moveX)<=1){
                    clearInterval(t);
                }
            }else{
                if(Math.abs(that.moveY)<=1){
                    clearInterval(t);
                }
            }

            that.moveX*=0.8;
            that.moveY*=0.8;
            // console.log(that.moveX)
            var lefts=that.obj.offsetLeft+that.moveX;
            var tops=that.obj.offsetTop+that.moveY;
            if(that.slideX){
                if(lefts>=that.slideX[1]){
                    lefts=that.slideX[1];
                }
            }
            if(that.slideX){
                if(lefts<=that.slideX[0]){
                    lefts=that.slideX[0];
                }
            }

            if(that.slideY){
                if(tops>=that.slideY[1]){
                    tops=that.slideY[1];
                }
            }
            if(that.slideY){
                if(tops<=that.slideY[0]){
                    tops=that.slideY[0];
                }
            }
            that.obj.style.left=lefts+"px";
            that.obj.style.top=tops+"px";


        },60)

    }
}