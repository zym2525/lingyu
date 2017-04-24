(function(){
	$('#arrow').on('touchstart',function(){
		sessionStorage.removeItem('str2');
		open('../02interface/interface.html');
	});
	var str=sessionStorage.getItem('str2');
	var arr=str.split('&');
	$('#pol').html(arr[0].split('=')[0]);
	$('#pol').attr('code',arr[0].split('=')[1]);
	$('#pod').text(getCookie('port')||'DUBAI');
	$('#pod').attr('code',getCookie('code')||'AEDUB');
	if(arr[2].split('=')[1]==0){
		$('#carry').html('全部');
	}else{
		$('#carry').html(arr[2].split('=')[0]);
	}
	$('#carry').attr('code',arr[2].split('=')[1]);
	removeCookie('port');
	removeCookie('code');
	$('#btn').on('touchstart',function(){
		if($('#Num20gp').val()==0&&$('#Num40gp').val()==0&&$('#Num40hq').val()==0&&$('#Num45hc').val()==0){
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
			if($('#carry').attr('code')!='0'){
				$.ajax({
					type:'POST',
					async:false,
					url:'http://106.14.251.28:8085/bizCenter/enquiryService/pubDirectEnquiry',
					data:{
						'accessToken':getCookie('accessToken'),
						'msgId':t+'',
						'polCode':$('#pol').attr('code'),
						'podCode':$('#pod').attr('code'),
						'carryCode':$('#carry').attr('code'),
						'elements':JSON.stringify({
							'num20gp':$('#Num20gp').val(),
							'num40gp':$('#Num40gp').val(),
							'num40hq':$('#Num40hq').val(),
							'num45hc':$('#Num45hc').val(),
							'expectDate':$('#expectDate').html(),
							'remark':$('#remark').val(),
						}),
					},
					success:function(json){
						console.log(json)
						if(json.retCode==0000){
							if(getCookie('lng')=='CN'){
								$('#hintBox').html('询价成功！').show();
							}else{
								$('#hintBox').html('Inquiry success！').show();
							}
							setTimeout(function(){
								setCookie('currentCount',1,28);
								sessionStorage.removeItem('str2');
								$('#hintBox').hide();
								sessionStorage.removeItem('currentData')
								sessionStorage.removeItem('currentScrollT')
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
			}else{
				$.ajax({
					type:'POST',
					async:false,
					url:'http://106.14.251.28:8085/bizCenter/enquiryService/pubDirectEnquiry',
					data:{
						'accessToken':getCookie('accessToken'),
						'msgId':t+'',
						'polCode':$('#pol').attr('code'),
						'podCode':$('#pod').attr('code'),
						'elements':JSON.stringify({
							'num20gp':$('#Num20gp').val(),
							'num40gp':$('#Num40gp').val(),
							'num40hq':$('#Num40hq').val(),
							'num45hc':$('#Num45hc').val(),
							'expectDate':$('#expectDate').html(),
							'remark':$('#remark').val(),
						}),
					},
					success:function(json){
						if(json.retCode==0000){
							if(getCookie('lng')=='CN'){
								$('#hintBox').html('询价成功！').show();
							}else{
								$('#hintBox').html('Inquiry success！').show();
							}
							setTimeout(function(){
								setCookie('currentCount',1,28);
								sessionStorage.removeItem('currentData')
								sessionStorage.removeItem('currentScrollT')
								sessionStorage.removeItem('str2');
								$('#hintBox').hide();
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
			
			
		}
	});
	
	$('#carry').on('touchstart',function(){
		getCarrys(setCarrys);
	})
	$('input[type=number]').focus(function(){
		$(this).val('');
	});
	$('input[type=number]').blur(function(){
		if($(this).val()==''){
			$(this).val('0');
		}
	});
	$('input').on('keyup',function(){
		if($(this).val().length>15){
			$(this).val($(this).val().substring(0,15));
		}
	});
	$('#pod').parent().on('touchstart',function(){
		setCookie('local',window.location.href,28)
		open("../04POT/04-1.html");
	})
	//拿船公司
	function setCarrys(arrCarrys){
		data[1]=[{'id': '0', 'value': '全部'}];
		for(var i=0;i<arrCarrys.length;i++){
			data[1].push({
				'id': arrCarrys[i]['carryCode'],
				'value': arrCarrys[i]['carryCode'],
			})
		}
	}
	function getCarrys(fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8085/bizCenter/carryService/getCarrys',
			data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+'',
			},
			success:function(json){
				if(json.retCode==0000){
					var arrCarrys=eval(json.carrys);
					fn&&fn(arrCarrys)
				}
			},
		})
	}
})()