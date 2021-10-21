$(function () {

    // left	
    $('#left').prepend('<a id="mobi-btn">瀏覽選單</a>');

    $('#mobi-btn').click(function (e) {
        $(this).toggleClass('active');
        $('#left > ul').fadeToggle();
        $('#left > ul > li').click(function (e) {
            $(this).toggleClass('active');
            $(this).siblings('li').removeClass('active');
        });
    });
    //mail
    $('.share .mail').click(function (e) {
        $('#popup-mask').fadeIn();
        $('#send').fadeIn();
    });
    $('.popup-con .close').click(function (e) {
        $('#popup-mask').fadeOut();
        $('.popup-con').fadeOut();
    });
    $('#popup-mask').click(function (e) {
        $('#popup-mask').fadeOut();
        $('#send').fadeOut();
    });

    //gotop	
    $('#gotop').click(function (e) {
        $("#top .sr-only-focusable").focus();
        $('html , body').animate({ scrollTop: $('body').offset().top }, 900);
    });

    //gotopmp
    $('#gotomp').click(function (e) {
        $("#header .sr-only-focusable").focus();
        $('html , body').animate({ scrollTop: $('body').offset().top }, 900);
    });

});
