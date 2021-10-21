// JavaScript Document


// nav
$(function(){	
   // btn toggle
   $('#nav .toggle').click(function(e) {
	   $(this).toggleClass('active');
	   $('#nav .nav-block').slideToggle();
   });
   // close
   $('#nav .close').click(function(e) {
   $('#nav .nav-block').slideUp();
   $('#nav .toggle').removeClass('active');
 });
});

// index block
$('#people .under').click(function() {
	var $dirFocus = $(this).index();
	if($dirFocus == 0){
		$('html , body').animate({scrollTop:$('#people').offset().top},500);
	}
});
$('#official .under').click(function() {
	var $dirFocus = $(this).index();
	if($dirFocus == 0){
		$('html , body').animate({scrollTop:$('#official').offset().top},500);
	}
});
$('#personnel .under').click(function() {
	var $dirFocus = $(this).index();
	if($dirFocus == 0){
		$('html , body').animate({scrollTop:$('#personnel').offset().top},500);
	}
});

// official sub menu
$(window).bind('load , resize',function(){
	if($(this).width() > 768){
		$('#official dl').hover(function() {	
			$(this).find('ul').addClass('hover').end().children('ul').css({
				visibility: 'visible'
			}).show();
		}, function() {
			$(this).find('ul').removeClass('hover').end().children('ul').hide();
	});
		
	}else{
		$('#official dl').hover(function() {	
			$('#official ul').hide();
		})
	}
}).load();

// ft-nav
$('#ft-nav > a').click(function(e) {
	$(this).toggleClass('active').siblings('.wrap').find('li > ul').slideToggle();
});
