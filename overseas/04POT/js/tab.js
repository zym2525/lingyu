(function(){
	var aHeader1=$('.header_box>.header')
	var aContent1=$('.enterances')
	aHeader1.on('touchstart',function(){
		aHeader1.removeClass('active');
		aContent1.hide();
		$(this).addClass('active');
		aContent1.eq($(this).index()).show();
	})
})()
