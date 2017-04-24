(function(){
	var port=getCookie('port')||'DUBAI';
	var startDate='';
	var endDate='';
	$('#pod').html(port);
	$('#pod').attr('code',getCookie('code')||'AEDUB');
	removeCookie('port');
	removeCookie('code');
	$('.btn').click(function(){
		$('.btn').removeClass('active');
		$(this).addClass('active');
//		if($(this).hasClass('active')){
//			var s=$(this).children('span').attr('localeString');
//			$(this).children('span').attr('localeString',s+'_1');
//			setLng();
//		}else{
//			var s=$(this).children('span').attr('localeString');
//			$(this).children('span').attr('localeString',s.substring(0,s.length-2));
//			setLng();
//		}
	});
	$('#podBox').on('touchstart',function(){
		setCookie('local',window.location.href,28);
		open("../04POT/04-1.html");
	})
	$('#arrow').on('touchstart',function(){
//		window.history.back();
		open('../02interface/interface.html');
	})
	$('#search').on('touchstart',function(){
		if($('#startDate').html()!='起始时间'&&$('#startDate').html()!='Begin Time'){
			startDate=$('#startDate').html();
		}
		if($('#endDate').html()!='结束时间'&&$('#endDate').html()!='End Time'){
			endDate=$('#endDate').html();
		}
			var t=new Date().getTime();
			$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys',
				data:{
					'accessToken':getCookie('accessToken'),
					'msgId':t+'',
					'enquiryStatus':0,
					'isBackward':1,
					'schemeStatus':$('.btn.active').children('span').attr('schemeStatus'),
					'enquiryTimeStart':startDate,
					'enquiryTimeEnd':endDate,
					'polCode':$('#pol').attr('code'),
					'podCode':$('#pod').attr('code'),
				},
				success:function(json){
					console.log(json)
					if(json.retCode==0000){
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('搜索成功！').show();
						}else{
							$('#hintBox').html('successful！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
							if(json.enquirys){
								sessionStorage.removeItem('currentData')
								sessionStorage.removeItem('currentScrollT')
								sessionStorage.setItem('datas',JSON.stringify(json.enquirys));
							}
							if($('.btn.active').children('span').attr('schemeStatus')=='5'){
								setCookie('nav1Count',0,28);
							}else{
								setCookie('nav1Count',1,28);
							}
							open('../02interface/interface.html');
						},700)
					}else{
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('搜索失败！').show();
						}else{
							$('#hintBox').html('failure！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
						},700)
					}
				},
			})
	})
})()
