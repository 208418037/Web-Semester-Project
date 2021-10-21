$(function(){
    // 做一個cookies
    localStorage.setItem("DGPA_RWD",0)
    if(document.body.clientWidth>992){
        localStorage.setItem("DGPA_RWD",1)
    }
     //mobile
     var $logo = $(".header-box h1").html(),
        $headerMenu = $(".header-menu").html(),
        $menu = $(".menu-tabs ul").html();
    var mobileHtml = '<div class="mobile-header flex-wrap flex-between flex-items-center"><div class="mobile-logo">'+$logo+'</div><a id="mobile-toggle">行動版選單開關<hr></a>'+
                    '<div id="mobile"><ul class="mobile-nav-lists">' + $menu  + '</ul>'+'<div class="mobile-header-menu">'+$headerMenu+'</div>'
                    '</div></div>'
        $('body').append(mobileHtml);
        $('#mobile-toggle').on('click', function () {
            $(this).toggleClass('active');
            $('#mobile').fadeToggle().toggleClass('active');
        })
    $(".mobile-nav-lists >li.has-menu> a").attr("href","javascript:;")
    $(".mobile-nav-lists >li.has-menu >a").click(function(){
        $(this).toggleClass("isOpen")
        $(this).siblings(".menu-down").slideToggle()
    })  

    // 判斷是否是手機端
    window.onresize = function(){
        var windowWidth = document.body.clientWidth;
           if(windowWidth<760&&window.location.href.indexOf("Mobile") < 0&&window.location.href.indexOf("index") >= 0){
            localStorage.setItem("DGPA_RWD",0)
               window.location = 'phone'
           }
           if(windowWidth>992&&window.location.href.indexOf("Mobile") >= 0&&window.location.href.indexOf("index") >= 0){
            localStorage.setItem("DGPA_RWD",1)
            window.location = 'phone'
           }
    };

    function goCount(id, name) {
        $.get("SetInfoReadCount?pid=" + id + "&name=" + name + "&rnd=" + Math.random());
    }
    
    String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    $(".case-lists>li").on("click",function(){
        $(this).toggleClass("open")
        $(this).siblings("li").removeClass("open")
    })
    
    
    window.onscroll = function () {
        if($(document).scrollTop()>70){
            $('.top-wrap').fadeIn(300);
            // $(".case-left2").addClass("IsTop")
            $("div.header").addClass("headerFixed")
            // if(footerTop>0){
            //     $(".case-left").addClass("isHide")
            // }else{
               
            //     $(".case-left").removeClass("isHide")
            // }
        }else{
            // $(".case-left2").removeClass("IsTop")
            $('.top-wrap').hide();
            $("div.header").removeClass("headerFixed")
        }
    }
    $('#goTop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 800);
    })
    // header menu hover
    $(".middle-menu >li").hover(
        function(){
            $(this).find(".menu-down.section-menu").css("max-height","800px")
        },function(){
            $(this).find(".menu-down.section-menu").css("max-height","0")
            $(this).find(".menu-down.three-menu").css("max-height","0")
        }) 
        $(".middle-menu >li>a").focus(function(){
            $(this).siblings(".menu-down.section-menu").css("max-height","800px")
        })
        $(".middle-menu >li .menu-down.section-menu").find("li:last a").blur(function(){
            $(this).parents(".menu-down.section-menu").css("max-height","0")
        })
    $(".middle-menu .menu-down li.has-menu").click(function(){
        $(this).find(".menu-down").css("max-height","800px")
    }) 
    $(".middle-menu .menu-down li.has-menu a").hover(function(){
        $(this).siblings(".menu-down").css("max-height","800px")
    },function(){
        // $(this).siblings(".menu-down").css("max-height","0")
    })
   

    // font size set
    $(".font-s").on("click",function(){
        $(this).addClass("active").parents("li").siblings("li").find("a").removeClass("active");
        $(this).parents("body").find(".content-wrapper").css("font-size","0.8125em")
    })
    $(".font-m").on("click",function(){
        $(this).addClass("active").parents("li").siblings("li").find("a").removeClass("active");
        $(this).parents("body").find(".content-wrapper").css("font-size","1em")
    })
    $(".font-l").on("click",function(){
        $(this).addClass("active").parents("li").siblings("li").find("a").removeClass("active");
        $(this).parents("body").find(".content-wrapper").css("font-size","1.25em");
    })

    $(".share-lists li.share2 >a").focus(function(){
        $(this).siblings(".share2-lists").css("max-height","200px")
    })
    $(".share2-lists").find("a:last").blur(function(){
        $(this).parents(".share2-lists").css("max-height","0")
    })
    $(".share-lists li.share3 a").focus(function(){
        var imgsrc = "barcodeimage?url=" + $("#qrurl").val();
        $("#imgqr").attr("src", imgsrc);
        $(this).siblings(".qrcode-wrap").css("display","inline-block")
    })
    $(".share-lists li.share3").hover(function(){
        var imgsrc = "barcodeimage?url=" + $("#qrurl").val();
        $("#imgqr").attr("src", imgsrc);
        $(this).find(".qrcode-wrap").css("display","inline-block")
    },function(){
        $(this).find(".qrcode-wrap").css("display","none")
    })
    $(".share-lists li.share3 a").blur(function(){
        $(this).siblings(".qrcode-wrap").css("display","none")
    })

    $(document).on("keydown", function (e) {
        if (e.altKey && e.keyCode == 83) {
            $(".input-wrap")
                .find('input[type="text"]')
                .focus();
        }
    });
    function goCount(id, name) {
        $.get("/SetInfoReadCount?pid=" + id + "&name=" + name + "&rnd=" + Math.random());
    }
    
   
    $(document).click(function (e) {
        var e = e || window.event; //瀏覽器兼容性   
        var elem = e.target || e.srcElement;
        while (elem) { //循環判斷至跟節點，防止點選的是div子元素   
            if (elem.id && elem.id == 'search-top-box') {
                return;
            }
            elem = elem.parentNode;
        }
        $(".search-form").css("max-height","0")
    });  
    
    $(document).on("keydown", function(e) {
        if (e.altKey && e.keyCode == 83) {
            $(".search-form")
            .css("max-height","400px");
            $(".search-form")
            .find('input[type="text"]')
            .focus();
        }
    });
    

})