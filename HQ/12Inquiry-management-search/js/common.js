(function(){
	var port=getCookie('port')||'DUBAI';
	var isBackward=1;
	var enquiryStatus=0;
	var startDate='';
	var endDate='';
	$('#pod').html(port);
	$('#pod').attr('code',getCookie('code')||'AEDUB');
	removeCookie('port');
	removeCookie('code');
	$('.btn').click(function(){
		$('.btn').removeClass('active');
		$(this).addClass('active');
	});
	if(getCookie('whichone')=='enquiry'){
		$('.btn2 span').attr('schemeStatus','0,1,2,5');
		$('.btn5 span').attr('schemeStatus','3,4');
		isBackward=1;
		switch (getCookie('nav1Count')){
			case '0':
				enquiryStatus=0;
				break;
			case '1': 
				enquiryStatus=1;
				break;
			case '2':
				enquiryStatus=2;
				break;
		}
	}else{
		$('.btn2 span').attr('schemeStatus','5');
		$('.btn5 span').attr('schemeStatus','0,1,2,3,4');
		isBackward=0;
		switch (getCookie('nav2Count')){
			case '0':
				enquiryStatus=0;
				break;
			case '1': 
				enquiryStatus=1;
				break;
			case '2':
				enquiryStatus=2;
				break;
		}
	}
	removeCookie('whichone');
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
//		if($('#startDate').html()=='起始时间'){
//			$('#hintBox').html('请填写起始时间！').show();
//			setTimeout(function(){
//				$('#hintBox').hide();
//			},700)
//		}else if($('#endDate').html()=='结束时间'){
//			$('#hintBox').html('请填写结束时间！').show();
//			setTimeout(function(){
//				$('#hintBox').hide();
//			},700)
//		}else{
			var t=new Date().getTime();
			$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys',
				data:{
					'accessToken':getCookie('accessToken'),
					'msgId':t+'',
					'enquiryStatus':enquiryStatus,
					'isBackward':isBackward,
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
								sessionStorage.setItem('datas',JSON.stringify(json.enquirys));
								if(getCookie('whichone')=='enquiry'){
									sessionStorage.removeItem('currentData')
									sessionStorage.removeItem('currentScrollT')
									sessionStorage.removeItem('lengths1')
									sessionStorage.removeItem('lengths2')
									sessionStorage.removeItem('lengths3')
								}else{
									sessionStorage.removeItem('currentData2')
									sessionStorage.removeItem('currentScrollT2')
									sessionStorage.removeItem('lengths21')
									sessionStorage.removeItem('lengths22')
									sessionStorage.removeItem('lengths23')
								}
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
//		}
	})
})()
