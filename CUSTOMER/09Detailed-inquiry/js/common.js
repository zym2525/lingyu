(function(){
	var data=JSON.parse(sessionStorage.getItem('schemes'));
	console.log(data)
	$('.wrap').html($('.wrap').html().replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        if(s=='potName'){
        	if(data[s]){
        		return data[s];
        	}else{
        		return '无';
        	}
        }else{
        	return data[s];
        }
        
    }));
    $('input[type=number]').focus(function(){
		$(this).val('');
	});
	$('input[type=number]').blur(function(){
		if($(this).val()==''){
			$(this).val('0');
		}
	});
	$('#btn').on('touchstart',function(){
		if($('#20GPNum').val()==0&&$('#40GPNum').val()==0&&$('#40HQNum').val()==0&&$('#45HCNum').val()==0){
			if(getCookie('lng')=='CN'){
				$('#hintBox').html('请填写箱量！').show();
			}else{
				$('#hintBox').html('fill in elements！').show();
			}
			setTimeout(function(){
				$('#hintBox').hide();
			},700)
		}else if($('#expectDate').html()=='2017-01-30'){
			if(getCookie('lng')=='CN'){
				$('#hintBox').html('请选择时间！').show();
			}else{
				$('#hintBox').html('select time！').show();
			}
			setTimeout(function(){
				$('#hintBox').hide();
			},700)
		}else{
			var t=new Date().getTime();
			$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8085/bizCenter/enquiryService/pubBasicEnquiry',
				data:{
					'accessToken':getCookie('accessToken'),
					'msgId':t+'',
					'schemeCode':getCookie('schemeCode'),
					'elements':JSON.stringify({
						'num20gp':$('#20GPNum').val(),
						'num40gp':$('#40GPNum').val(),
						'num40hq':$('#40HQNum').val(),
						'num45hc':$('#45HCNum').val(),
						'expectDate':$('#expectDate').html(),
						'remark':$('#remark').val(),
					}),
				},
				success:function(json){
					console.log(json)
					if(json.retCode==0000){
						sessionStorage.removeItem('currentData');
						sessionStorage.removeItem('scrollT');
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('询价成功！').show();
						}else{
							$('#hintBox').html('Inquiry success！').show();
						}
						$('#hintBox').html('询价成功！').show();
						setTimeout(function(){
							$('#hintBox').hide();
							sessionStorage.removeItem('currentData')
							sessionStorage.removeItem('currentScrollT')
							removeCookie('schemeCode');
							setCookie('currentCount',1,28);
							open('../02interface/interface.html');
						},700)
					}else{
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('询价失败！').show();
						}else{
							$('#hintBox').html('Inquiry failed！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
						},700)
					}
				},
			})
		}
		
	});
	$('input,textarea').on('keyup',function(){
		if($(this).val().length>15){
			$(this).val($(this).val().substring(0,15));
		}
	});
	$('.arrow').on('touchstart',function(){
		window.history.back();
	})
})()