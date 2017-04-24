(function(){
	var port=getCookie('port')||'DUBAI';
	var startDate='';
	var endDate='';
	$('#pod').html(port);
	$('#pod').attr('code',getCookie('code')||'AEDUB');
	$('.btn').click(function(){
//		if($('.cell.lt.btn2').hasClass('active')){
			$('.btn').removeClass('active');
			$(this).addClass('active');
//		}
	});
	$('.btn2').click(function(){
//		$('.btn').removeClass('active');
		$('.btn2').removeClass('active');
		$(this).addClass('active');
//		if($(this).hasClass('btn4')){
//			$('.btn').eq(0).addClass('active');
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
	$('input[type=number]').focus(function(){
		$(this).val('');
	});
	$('input[type=number]').eq(0).blur(function(){
		if($(this).val()==''){
			$(this).val('1');
		}
	});
	$('input[type=number]').eq(1).blur(function(){
		if($(this).val()==''){
			$(this).val('100');
		}
	});
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
			
			if($('.btn3').hasClass('active')){
				Status='5';
			}else{
				Status=$('.btn.active').children('span').attr('schemeStatus');
			}
			switch (getCookie('nav1Count')){
				case '0':
					var enquiryBizStatus=0;
					break;
				case '1':
					var enquiryBizStatus=1;
					break;
				case '2':
					var enquiryBizStatus='';
					break;
			}
			if($('.btn3').hasClass('active')&&$('.btn5').hasClass('active')){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('搜索失败！').show();
				}else{
					$('#hintBox').html('failure！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else{
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
						'schemeStatus':Status,
						'enquiryTimeStart':startDate,
						'enquiryTimeEnd':endDate,
						'polCode':$('#pol').attr('code'),
						'podCode':$('#pod').attr('code'),
						'enquirybizStatus':enquiryBizStatus,
					},
					success:function(json){
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
								}
								sessionStorage.removeItem('currentData')
								sessionStorage.removeItem('currentScrollT')
	//							open('../02interface/interface.html');
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
			}
			
//		}
	})
})()
