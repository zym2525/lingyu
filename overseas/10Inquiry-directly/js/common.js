(function(){
	getCustomCompanys(function(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i]['companyName']!='system公司'){
				data[4].push({
					'id': arr[i]['companyCode'], 
					'value': arr[i]['companyName']
				})
			}
		}
	})
	$('#arrow').on('touchstart',function(){
		sessionStorage.removeItem('str2');
		open('../02interface/interface.html');
	});
	
	if(sessionStorage.getItem('str2')){
		var str=sessionStorage.getItem('str2');
		var arr=str.split('&');
		$('#pol').html(arr[0].split('=')[0]);
		$('#pol').attr('code',arr[0].split('=')[1]);
		$('#pod').html(getCookie('port')||'DUBAI');
		$('#pod').attr('code',getCookie('code')||'AEDUB');
		if(arr[2].split('=')[1]=='0'){
			$('#carry').html('全部');
		}else{
			$('#carry').html(arr[2].split('=')[0]);
		}
		$('#carry').attr('code',arr[2].split('=')[1]);
	}else{
		$('#pol').html('NINGBO');
		$('#pol').attr('CNNGB');
		$('#pod').html('DUBAI');
		$('#pod').attr('AEDUB');
		$('#carry').html('全部');
		$('#carry').attr('code','0');
	}
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
			if(lng=='CN'){
				var index=2;
			}else{
				var index=3;
			}
			if(getCookie('lng')=='CN'){
				f1='取消';
				f2='完成';
			}else{
				f1='Cancel';
				f2='Complete';
			}
			var Select = new IosSelect(1, 
			    [data[index]],
			    {
			        itemShowCount:5,		
			        itemHeight: 0.7,
			        headerHeight: 0.88,
			        cssUnit: 'rem',
			        callback: function (selectOneObj) {
			        	var t=new Date().getTime();
			        	if($('#carry').attr('code')!='0'){
			        		$.ajax({
								type:'POST',
								async:false,
								url:'http://106.14.251.28:8085/bizCenter/enquiryService/pubEnquiryWithoutCustom',
								data:{
									'accessToken':getCookie('accessToken'),
									'msgId':t+'',
									'polCode':$('#pol').attr('code'),
									'podCode':$('#pod').attr('code'),
									'carryCode':$('#carry').attr('code'),
									'customCompanyCode':$('#custom').attr('code'),
									'destCompanyCode':selectOneObj.id,
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
											setCookie('nav1Count',1,1)
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
			        	}else{
			        		$.ajax({
								type:'POST',
								async:false,
								url:'http://106.14.251.28:8085/bizCenter/enquiryService/pubEnquiryWithoutCustom',
								data:{
									'accessToken':getCookie('accessToken'),
									'msgId':t+'',
									'polCode':$('#pol').attr('code'),
									'podCode':$('#pod').attr('code'),
									'customCompanyCode':$('#custom').attr('code'),
									'destCompanyCode':selectOneObj.id,
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
											sessionStorage.removeItem('currentData')
											sessionStorage.removeItem('currentScrollT')
											$('#hintBox').hide();
											setCookie('nav1Count',1,1)
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
			
		}
	});
	$('#pod').on('touchstart',function(){
		setCookie('local',window.location.href,28)
		open("../04POT/04-1.html");
	})
	$('#carryBox').on('touchstart',function(){
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
	$('.btn').click(function(){
		$('.btn').removeClass('active');
		$(this).addClass('active');
	});
	//模糊查客户
//	var timer=null;
//	$('.fuzzy input').on('keyup',function(){
//		if($('.fuzzy input').val()!=''){
//			clearTimeout(timer);
//			timer=setTimeout(function(){
//				fzCustomCompany($('.fuzzy input').val(),function(companys){
//					$('.fuzzy .view').empty();
//					if(companys){
//						for(var i=0;i<companys.length;i++){
//							var oLi=$('<li class="item"><span></span></li>');
//							oLi.find('span').text(companys[i]['companyName']).attr('companyCode',companys[i]['companyCode']);
//							$('.fuzzy .view').append(oLi);
//						}
//					}
//					$('.fuzzy .view span').on('touchstart',function(){
//						$('#text2 .s1').hide();
//						$('#text2 input').val($(this).text()).attr('companyCode',$(this).attr('companyCode'));
//						$('.fuzzy').css('display','none');
//						$('.fuzzy input').val('');
//						$('.fuzzy .view').empty();
//						return false;
//					});
//				})
//			},500);
//		}
//		
//	});
//	$('.fuzzy .cancel').on('touchstart',function(){
//		$('.fuzzy').css('display','none');
//		$('.fuzzy input').val('');
//		$('.fuzzy .view').empty();
//		if(!$('#text2 input').val()){
//			$('#text2 .s1').show();
//		}
//	})
	$('#text2 input,#text2 .s1').on('touchstart',function(){
		var Select = new IosSelect(1, 
		    [data[4]],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$('#text2 input').val(selectOneObj.value).attr('code',selectOneObj.id);
		        	if($('#text2 input').val()){
		        		$('#text2 .s1').hide();
		        	}
		        }
		});
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
	function getCustomCompanys(fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8081/userCenter/companyService/getCustomCompanys',
			data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+'',
			},
			success:function(json){
				console.log(json)
				if(json.retCode==0000){
					fn&&fn(json.companys);
				}
			},
		})
	}
})()