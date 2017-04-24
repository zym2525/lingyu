(function(){
	var data=JSON.parse(sessionStorage.getItem('schemes'));
	getCustomCompanys(function(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i]['companyName']!='system公司'){
				data2[2].push({
					'id': arr[i]['companyCode'], 
					'value': arr[i]['companyName']
				})
			}
		}
		
	})
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
			if(lng=='CN'){
				var index=0;
			}else{
				var index=1;
			}
			var Select = new IosSelect(1, 
			    [data2[index]],
			    {
			        itemShowCount:5,		
			        itemHeight: 0.7,
			        headerHeight: 0.88,
			        cssUnit: 'rem',
			        callback: function (selectOneObj) {
			        	var t=new Date().getTime();
		        		$.ajax({
							type:'POST',
							async:false,
							url:'http://106.14.251.28:8085/bizCenter/enquiryService/pubEnquiryWithoutCustom',
							data:{
								'accessToken':getCookie('accessToken'),
								'msgId':t+'',
								'polCode':data['polCode'],
								'podCode':data['podCode'],
								'carryCode':data['carryCode'],
								'customCompanyCode':$('#custom').attr('code'),
								'destCompanyCode':selectOneObj.id,
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
								if(json.retCode==0000){
									if(getCookie('lng')=='CN'){
										$('#hintBox').html('询价成功！').show();
									}else{
										$('#hintBox').html('Inquiry success！').show();
									}
									setTimeout(function(){
										$('#hintBox').hide();
										setCookie('currentCount',1,28);
										setCookie('nav1Count',1,1)
										sessionStorage.removeItem('currentData')
										sessionStorage.removeItem('currentScrollT')
										removeCookie('schemeCode');
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
//	$('#text2 input').on('focus',function(){
//		$('.fuzzy').css('display','flex');
//		$('.fuzzy .view').scrollTop(0);
//		$('.fuzzy input')[0].focus();
//	})
	$('#text2 input,#text2 .s1').on('touchstart',function(){
		var Select = new IosSelect(1, 
		    [data2[2]],
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
	function fzCustomCompany(str,fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8081/userCenter/companyService/fzCustomCompany',
			data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+'',
				'companyCode':str,
			},
			success:function(json){
				console.log(json)
				if(json.retCode==0000){
					fn&&fn(json.companys);
				}else{
					$('.fuzzy .view').empty();
					var oLi=$('<li class="item"><span></span></li>');
					oLi.find('span').text('无此客户');
					$('.fuzzy .view').append(oLi);
					setTimeout(function(){
						$('.fuzzy .view').empty();
					},1000)
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