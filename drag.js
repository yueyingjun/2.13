/**
 * Created by lenovo on 2017/2/13.
 */
//��ק���������ķ�ʽ���߽���ƣ�������ƣ��������ƣ��϶��ٶȿ�Ļ��ж���Ч����
//    �߽���ƣ�range   true:�б߽����  false���������������
//    ������ƣ�direction  "level"  "vertival" "all"
//    �������ƣ�animation  "yes"  "no"
    class Drag{
        constructor(obj,range,direction,animation){
        //  Ҫ������Ԫ��
            this.obj=obj;
            this.obj.width=obj.offsetWidth;
            this.obj.height=obj.offsetHeight;
            this.obj.left=0;
            this.obj.top=0;

        //  �����ĳ�ʼ��
            this.range=range==true?true:false;
            this.direciton=direction||"all";
            this.animation=animation||"yes";

        //  ��Ԫ��
            this.obj.fbox=document;
            this.sw=this.obj.fbox.documentElement.clientWidth;
            this.sh=this.obj.fbox.documentElement.clientHeight;

        //    ��������
            this.xishu=0.8;
            this.objlen={x:0,y:0};
            this.objstart={x:this.obj.left,y:this.obj.top};
            this.objend={x:0,y:0};
        }

        // ��ʼ��������Ҫ����
        start(){
            this.fbox();
        }
        // ��갴��
        down(){
            var that=this;
            this.obj.onmousedown=function(){
                that.move();
                that.up();
            }
        }
        // ����ƶ�
        move(){
            var that=this;
            window.onmousemove=function(e){
                var e=event||window.event;
                var ex= e.clientX;
                var ey= e.clientY;
                that.obj.left=ex-that.obj.width/2;
                that.obj.top=ey-that.obj.height/2;

                that.rangefun();

                that.objend.x=that.obj.left;
                that.objend.y=that.obj.top;
                that.objlen.x=that.objend.x-that.objstart.x;
                that.objlen.y=that.objend.y-that.objstart.y;
                that.objstart.x=that.obj.left;
                that.objstart.y=that.obj.top;

                if(that.direciton=="all"){
                    that.obj.style.left=that.obj.left+"px";
                    that.obj.style.top=that.obj.top+"px";
                }else if(that.direciton=="level"){
                    that.obj.style.left=that.obj.left+"px";
                }else if(that.direciton=="vertical"){
                    that.obj.style.top=that.obj.top+"px";
                }
            }
        }
        // ���̧��
        up(){
            var that=this;
            window.onmouseup=function(){
                window.onmousemove=null;
                window.onmouseup=null;
                //console.log(this.onmousemove);
            }
            if(this.animation=="yes"){
                var t;

                t=setInterval(function(){
                    if(that.objlen.y<1 || that.objlen.y<-1){
                        clearInterval(t);
                    }
                    that.obj.left+=that.objlen.x*that.xishu;
                    that.obj.top+=that.objlen.y*that.xishu;
                    that.rangefun();
                    that.objlen.x*=that.xishu;
                    that.objlen.y*=that.xishu;
                    that.directionfun();
                },100);

            }

        }

        directionfun(){
            if(this.direciton=="all"){
                this.obj.style.left=this.obj.left+"px";
                this.obj.style.top=this.obj.top+"px";
            }else if(this.direciton=="level"){
                this.obj.style.left=this.obj.left+"px";
            }else if(that.direciton=="vertical"){
                this.obj.style.top=this.obj.top+"px";
            }
        }

        rangefun(){
            if(this.obj.left<0){
                this.obj.left=0;
            }
            if(this.obj.top<0){
                this.obj.top=0;
            }
            if(this.obj.left>(this.sw-this.obj.width)){
                this.obj.left=this.sw-this.obj.width;
            }
            if(this.obj.top>(this.sh-this.obj.height)){
                this.obj.top=this.sh-this.obj.height;
            }
        }

        screensize(){
            var that=this;
            window.onresize=function(){
                that.sw=document.documentElement.clientWidth;
                that.sh=document.documentElement.clientHeight;
            }
        }

        fbox(){
            if(this.range==false){
                this.obj.fbox=document;
                this.screensize();
            }else if(this.range==true){
                this.obj.fbox=this.obj.parentNode;
                if(this.obj.fbox.currentStyle){
                    this.sw=parseInt(this.obj.fbox.currentStyle.width);
                    this.sh=parseInt(this.obj.fbox.currentStyle.height);
                }else{
                    this.sw=parseInt(getComputedStyle(this.obj.fbox,null).width);
                    this.sh=parseInt(getComputedStyle(this.obj.fbox,null).height);
                }
            }
            this.down();
        }

    }



    var box=document.querySelector(".box");
    var drag=new Drag(box,false,"all","yes");
    drag.start();


