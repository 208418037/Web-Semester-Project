// LiftEffect({
//  "control1": ".lift2",                         //渚ф爮鐢垫鐨勫鍣�
//  "control2": "#ccc",                           //闇€瑕侀亶鍘嗙殑鐢垫鐨勭埗鍏冪礌
//  "target": [".dianti1",".dianti2",".dianti3"], //鐩戝惉鐨勫唴瀹癸紝娉ㄦ剰涓€瀹氳浠庡皬鍒板ぇ杈撳叆
//  "current": "xuanzhong"                        //閫変腑鐨勬牱寮�
// });

function LiftEffect(json){

    var array=[];
    
    for(var i =0; i<json.target.length;i++){
        var t = $(json.target[i]).offset().top;
        array.push(t);
    
    }
    
    function Selected(index){
        $(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current);
    }
    
    
    $(window).on("scroll",Check);
    
    function Check(){
    
        var wst = $(window).scrollTop();
        if(wst >= 500){
            $(json.control1).fadeIn(300);
        }else{
            $(json.control1).hide();
        }
        // if(wst >= $(json.target[0]).offset().top-630){
        //     $(json.control1).fadeIn(500);
        // }else{
        //     $(json.control1).fadeOut(500);
        // }
    
        var key =0;
        var flag = true;
        for(var i =0; i<array.length; i++){
            key++;
            if(flag){
    
                if(wst >= array[array.length-key]-300){
                    var index = array.length-key;
                    flag = false;
                }else{
                    flag=true;
                }
    
            }
        }
        Selected(index);
    }
    
    $(json.control2).children().on("click",function(){
            $(window).off("scroll");
            var index = $(this).index();
            Selected(index);
    
    
            var flag = true;
            for(var i =0; i<array.length; i++){
    
                if(flag){
                    if(index == i){
                        $("html,body").stop().animate({
                            "scrollTop": array[i]-50
                        },500,function(){
                            $(window).on("scroll",Check);
                        });
                        flag = false;
                    }else{
                        flag=true;
                    }
    
                }
            }
    
    });
    
    
    
    }