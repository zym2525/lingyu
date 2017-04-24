(function(){
	var bSin=false;
	var port=getCookie('port')||'';
	$('#pot').html(port);
	$('#pot').attr('code',getCookie('code')||'');
	removeCookie('port');
	removeCookie('code');
	getEnquiryInfo(setSchemeInfo);
	getCurrencys(function(arr){
		for(var i=0;i<arr.length;i++){
			currencys.push({
				'id':arr[i]['currency'],
				'value':arrCurrency[arr[i]['currency']],
			});
		}
	});
	$('.arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
	
	$('#vesselName,#voyageName').on('touchstart',function(){
		$(this).siblings('.val').focus();
		return false;
	})
	$('.telPhoneNum').each(function(index,ele){
		$(ele).on('touchstart',function(){
			if($(ele).text()){
				telPhone($(ele).text());
			}
		})
		
	})
	
	//选择船公司
	$('#carrys').on('touchstart',function(){
		getCarrys(setCarrys);
	});
	function setCarrys(arr){
		arrCarrys=[{'id': '0', 'value': ''}];
		for(var i=0;i<arr.length;i++){
			arrCarrys.push({
				'id': arr[i]['carryCode'],
				'value': arr[i]['carryCode'],
			})
		}
	}
	
//	var fzType='';
//	var original1='';
//	$('#voyage,#vessel').on('focus',function(){
//		fzType=$(this).attr('id');
//		$('.fuzzy').css('display','flex');
//		$('.fuzzy .view').scrollTop(0);
//		$('.fuzzy input')[0].focus();
//		original1=$(this).val();
//	})
//	$('#voyage,#vessel').on('blur',function(){
//		if(!$(this).val()) $(this).val(original1);
//	})
//	
//	function searchVessel(){
//		fsVessel($('.fuzzy input').val(),function(vessels){
//			console.log(vessels)
//			$('.fuzzy .view').empty();
//			if(vessels[0]!=''){
//				for(var i=0;i<vessels.length;i++){
//					var oLi=$('<li class="item"><span></span></li>');
//					oLi.find('span').text(vessels[i]['vessel']);
//					oLi.find('span').attr('index',i);
//					$('.fuzzy .view').append(oLi);
//				}
//			}
//			$('.fuzzy .view span').on('touchstart',function(){
//				$('#vessel').val($(this).text());
//				$('#voyage').val(vessels[$(this).attr('index')]['voyage']);
//				$('.fuzzy').css('display','none');
//				$('.fuzzy input').val('');
//				$('.fuzzy .view').empty();
//				return false;
//			});
//		})
//	}
//	function searchVoyage(){
//		fsVessel($('.fuzzy input').val(),function(voyage){
//			console.log(voyage)
//			$('.fuzzy .view').empty();
//			if(voyage[0]!=''){
//				for(var i=0;i<voyage.length;i++){
//					var oLi=$('<li class="item"><span></span></li>');
//					oLi.find('span').text(voyage[i]['voyage']);
//					oLi.find('span').attr('index',i);
//					$('.fuzzy .view').append(oLi);
//				}
//			}
//			$('.fuzzy .view span').on('touchstart',function(){
//				$('#voyage').val($(this).text());
//				$('#vessel').val(voyage[$(this).attr('index')]['vessel']);
//				$('.fuzzy').css('display','none');
//				$('.fuzzy input').val('');
//				$('.fuzzy .view').empty();
//				return false;
//			});
//		})
//	}
	var timer=null;
	$('.fuzzy input').on('keyup',function(){
		if($('.fuzzy input').val()!=''){
			clearTimeout(timer);
			timer=setTimeout(function(){
				switch (fzType){
					case 'vessel':
						searchVessel();
						break;
					case 'voyage':
						searchVoyage();
						break;
				}
			},500);
		}
		
	});
	$('.fuzzy .cancel').on('touchstart',function(){
		$('.fuzzy').css('display','none');
		$('.fuzzy input').val('');
		$('.fuzzy .view').empty();
	})
	
	
	
	function createLi(id,str,num){
		var oTmp=document.getElementById(id);
	    var oLi=oTmp.cloneNode(true);
	    oLi.removeAttribute('id');
	    switch (str){
	    	case 'num20gp':
	    		$(oLi).children('.kind').attr('id','num20GP').text('20GP*'+num);
	    		$(oLi).children('.bj').children('input').attr('id','cost20gp');
	    		break;
	    	case 'num40gp':
	    		$(oLi).children('.kind').attr('id','num40GP').text('40GP*'+num);
	    		$(oLi).children('.bj').children('input').attr('id','cost40gp');
	    		break;
	    	case 'num40hq':
	    		$(oLi).children('.kind').attr('id','num40HQ').text('40HQ*'+num);
	    		$(oLi).children('.bj').children('input').attr('id','cost40hq');
	    		break;
	    	case 'num45hc':
	    		$(oLi).children('.kind').attr('id','num45HC').text('45HC*'+num);
	    		$(oLi).children('.bj').children('input').attr('id','cost45hc');
	    		break;
	    }
	    return oLi;
	}
	
	
	
	function setSchemeInfo(data){
		var json=data;
//		$('#unit').html(arrHyfCurrency[data['feesList'][0]['currency']]);
		for(var key in data['elements']){
			if(key.charAt(0)=='n'&&data['elements'][key]!='0'){
				var oLi=createLi('tplLi',key,data['elements'][key]);
				$('#hyf').append($(oLi));
			}
		}
		$('#hyf li:last-child').addClass('cr')
		
		$('.wrap').html($('.wrap').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	      	if(data[s]){
	        	return data[s];
	        }else{
	        	if(s=='carryCode'){
	        		return '';
	        	}else{
	        		return '';
	        	}
	        }
	    }));
	    if(data['sailingDay']){
			$('#sailingDay').val(data['sailingDay'].substring(0,data['sailingDay'].length-1))
		}
	    
	    
	    //发布
	    $('#btn').on('touchstart',function(){
			$('#shadow').show();
		})
	    $('#cancel').on('touchstart',function(){
			$('#shadow').hide();
		});
		$('#confirm').on('touchstart',function(){
			$('#shadow').hide();
			if($('#carrys').find('.val').text()==''||$('#carrys').find('.val').text()=='全部'){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请选择船公司！').show();
				}else{
					$('#hintBox').html('NO Carrys！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#expireDate').text()==''){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请填写有效期！').show();
				}else{
					$('#hintBox').html('NO expireDate！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#cost20gp').val()=='0'&&$('#cost40gp').val()=='0'){
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('请填写运费！').show();
				}else{
					$('#hintBox').html('NO Fees！').show();
				}
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else{
				var t=new Date().getTime();
				var arr=createPrimeFees($('.Fees'),{'Cost20gp':$('#cost20gp'),'Cost40gp':$('#cost40gp'),'Cost40hq':$('#cost40hq'),'Cost45hc':$('#cost45hc'),});
				$.ajax({
					type:'POST',
					async:false,
					url:'http://106.14.251.28:8085/bizCenter/schemeService/pubScheme',
					data:{
						'accessToken':getCookie('accessToken'),
						'msgId':t+'',
						'enquiryCode':json['enquiryCode'],
						'polCode':json['polCode'],
						'podCode':json['podCode'],
						'potCode':$('#pot').attr('code'),
						'carryCode':$('#carrys').find('.val').attr('code'),
						'sailingDay':$('#sailingDay').val()+'天',
						'etd':$('#etd').text(),
						'customsClearance':$('#customsClearance').text(),
						'expireDate':$('#expireDate').text(),
						'primeFees':JSON.stringify(arr),
						'vessel':'',
						'voyage':'',
					},
					success:function(json){
						console.log(json)
						if(json.retCode==0000){
							$('#hintBox').html('发布方案成功！').show();
							setTimeout(function(){
								sessionStorage.removeItem('currentData')
								sessionStorage.removeItem('currentScrollT')
								sessionStorage.removeItem('lengths1')
								sessionStorage.removeItem('lengths2')
								sessionStorage.removeItem('lengths3')
								$('#hintBox').hide();
								setCookie('nav1Count',1,28);
								open('../02interface/interface.html');
							},700)
						}else{
							$('#hintBox').html('发布方案失败！').show();
							setTimeout(function(){
								$('#hintBox').hide();
							},700)
						}
					},
					
				})
			}
			return false;
		})
	}
	//搜费项
	
	$('.comb').on('touchstart',function(){
		$('.updateFee').hide();
		$('.addfees').hide();
	})
	isClick($('#addFeeBox'),function(){
		$('.addfees').css('display','flex');
		if(bSin) return
		bSin=true;
		getFeeTypes(function(data){
			for(var i=0;i<data.length;i++){
				var oDd=$('<dd><i></i><div class="tl1 feeName"></div><div class="tl2 cost20gp"></div><div class="tl3 cost40gp"></div><div class="tl4 byOrder"></div><div class="tl5 cb currery"></div></dd>');
				oDd.find('.feeName').text(data[i]['feeTypeEname']);
				oDd.attr('feeTypeNum',data[i]['feeTypeNum']);
				oDd.attr('byOrder',data[i]['byOrder']);
				oDd.attr('currency',data[i]['currency']);
				if(data[i]['byOrder']==1){
					oDd.find('.byOrder').text('0');
				}else{
					oDd.find('.cost20gp').text(data[i]['cost20gp']||0);
					oDd.find('.cost40gp').text(data[i]['cost40gp']||0);
				}
				oDd.find('.currery').text(arrCurrency[data[i]['currency']]);
				if(data['isDefault']){
					oDd.addClass('active')
				}
				isClick(oDd,function(oDd){
					oDd.toggleClass('active')
				})
				$('.addfees .former').append(oDd);
			}
		})
	})
	$('#addfeesBtn').on('touchstart',function(){
		$('#append dd').remove();
		if($('.addfees .former dd.active').length){
			$('.addfees .former dd.active').each(function(index,ele){
//				for(var i=0;i<2;i++){
					if($(ele).attr('byOrder')=='1'){
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(ele).find('.feeName').text()+"<span class='byOrder'> </span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(ele).attr('currency')]+"</span><input type='number' value='0' disabled/></span></dd>");
					}else{
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(ele).find('.feeName').text()+"<span class='byOrder'> </span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(ele).find('.cost20gp').text()+" class='v1' disabled/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(ele).find('.cost40gp').text()+" class='v2' disabled/>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><span class='total2'>200</span></span></dd>");
						if($('#num20GP').length){
							oDd.find('.num1').text($('#num20GP').text().substring(5));
						}else{
							oDd.find('.num1').text('0');
						}
						if($('#num40GP').length){
							oDd.find('.num2').text($('#num40GP').text().substring(5));
						}else{
							oDd.find('.num2').text('0');
						}
						toTotal(oDd);
					}
					oDd.find('input').css('background-color','#fff')
					oDd.attr('currenys',$(this).attr('currency'));
					oDd.attr('byOrder',$(this).attr('byOrder'));
					oDd.attr('feeTypeNum',$(this).attr('feeTypeNum'));
					if(!$('#append dd')['length']){
						oDd.addClass('cb');
					}
//					if(i){
//						oDd.addClass('PrimeFees');
//						oDd.find('.byOrder').text('(成本)')
//					}else{
						oDd.addClass('Fees');
//						oDd.find('.byOrder').text('(报价)')
//					}
					$('#append dt').after(oDd);
//				}
				toFocus();
				toTotalAll();
			})
		}
//		$('.addfees .former dd').removeClass('active')
		$('.addfees').hide();
		
	})
	var isclick=false;
	$(document).on('touchstart','#append .Fees',function(){
		isclick=true;
	})
	$(document).on('touchmove','#append .Fees',function(){
		isclick=false;
	})
	$(document).on('touchend','#append .Fees',function(){
		if(isclick){
			$('#append .Fees').removeClass('active')
			$(this).addClass('active');
			if($(this).attr('byorder')=='1'){
				$('#ipt5').val($(this).find('.currencys:first-child').text());
				$('#ipt5').attr('currenys',$(this).attr('currenys'));
				$('#ipt5').siblings('span').hide()
				$('.updateFee2 h2').text($(this).find('.name').text().split('(')[0])
				$('.updateFee2').css('display','flex');
			}else{
				
				$('#ipt3').val($(this).find('.currencys:first-child').text());
				$('#ipt3').attr('currenys',$(this).attr('currenys'));
				$('#ipt3').siblings('span').hide()
				$('.updateFee1 h2').text($(this).find('.name').text().split('(')[0])
				$('.updateFee1').css('display','flex');
			}
			
		}
	})
	$('#ipt3,#ipt5').parent().on('touchstart',function(){
		var _this=this;
		var Select = new IosSelect(1, 
		    [currencys],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$(_this).find('input').val(selectOneObj.value);
		        	$(_this).find('input').attr('currenys',selectOneObj.id);
		        	if($(_this).find('input').val()){
		        		$(_this).find('input').siblings('span').hide()
		        	}
		        }
		});
	})
	$('#updateFeeBtn1').on('touchstart',function(){
		$('#append .Fees.active').find('.currencys').text(arrCurrency[$('#ipt3').attr('currenys')])
		$('#append .Fees.active').attr('currenys',$('#ipt3').attr('currenys'))
		if($('#ipt1').val()){
			$('#append .Fees.active').find('.v1').val($('#ipt1').val())
		}
		if($('#ipt2').val()){
			$('#append .Fees.active').find('.v2').val($('#ipt2').val())
		}
		$('#ipt1').val('')
		$('#ipt1').siblings('span').show();
		$('#ipt2').siblings('span').show();
		$('#ipt2').val('')
		$('#ipt3').val('')
		$('.updateFee1').hide();
		toTotal($('#append .Fees.active'))
		toTotalAll();
	})
	$('#updateFeeBtn2').on('touchstart',function(){
		$('#append .Fees.active').find('.currencys').text(arrCurrency[$('#ipt5').attr('currenys')])
		$('#append .Fees.active').attr('currenys',$('#ipt5').attr('currenys'))
		if($('#ipt4').val()){
			$('#append .Fees.active').find('input').val($('#ipt4').val())
		}
		$('#ipt4').val('')
		$('#ipt4').siblings('span').show();
		$('#ipt5').val('')
		$('.updateFee2').hide();
		toTotalAll();
	})
	
//	$('#addFee').on('touchstart',function(){
//		$('.feeList').css('display','flex');
//		$('.feeList .view').scrollTop(0);
//		getFeeTypes(function(data){
//			$('.feeList .view').empty();
//			for(var i=0;i<data.length;i++){
//				var oLi=$('<li class="item"><span></span></li>');
//				oLi.find('span').text(data[i]['feeTypeEname']);
//				oLi.find('span').attr('index',i);
//				oLi.attr('byOrder',data[i]['byOrder']);
//				oLi.attr('feeTypeNum',data[i]['feeTypeNum']);
//				oLi.attr('currency',data[i]['currency']);
//				if(!data[i]['byOrder']){
//					oLi.attr('cost20gp',data[i]['cost20gp']||'0');
//					oLi.attr('cost40gp',data[i]['cost40gp']||'0');
//				}
//				$('.feeList .view').append(oLi);
//			}
//			$('.feeList .view li').on('touchstart',function(){
//				var _this=this;
//				if($(this).hasClass('active')){
//					$(this)[0].timer=setTimeout(function(){
//						$(_this).removeClass('active item1')
//					},300)
//					$(this)[0].addEventListener('touchmove',function(){
//			    		clearTimeout($(_this)[0].timer);
//			    	},false);
//				}else{
//					$(this)[0].timer=setTimeout(function(){
//						$(_this).addClass('active item1')
//					},300)
//					$(this)[0].addEventListener('touchmove',function(){
//			    		clearTimeout($(_this)[0].timer);
//			    	},false);
//				}
//				
//			});
//		});
//	})
//	$('.feeList .confirm').on('touchstart',function(){
//		$('#append dd').remove();
//		if($('.feeList .view li.active').length){
////			for(var j=0;j<$('.feeList .view li.active').length;j++){
//			$('.feeList .view li.active').each(function(index,ele){
//					if($(this).attr('byOrder')=='1'){
//						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value='0'/></span></dd>");
//					}else{
//						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(this).attr('cost20gp')+" class='v1'/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(this).attr('cost40gp')+" class='v2'>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><span class='total2'>200</span></span></dd>");
//						if($('#num20GP').length){
//							oDd.find('.num1').text($('#num20GP').text().substring(5));
//						}else{
//							oDd.find('.num1').text('0');
//						}
//						if($('#num40GP').length){
//							oDd.find('.num2').text($('#num40GP').text().substring(5));
//						}else{
//							oDd.find('.num2').text('0');
//						}
//						toTotal(oDd);
//					}
//					oDd.attr('currenys',$(this).attr('currency'));
//					oDd.attr('byOrder',$(this).attr('byOrder'));
//					oDd.attr('feeTypeNum',$(this).attr('feeTypeNum'));
//					oDd.find('.currencys').on('touchstart',function(){
//						var _this=this;
//						var Select = new IosSelect(1, 
//						    [currencys],
//						    {
//						        itemShowCount:9,		
//						        itemHeight: 0.7,
//						        headerHeight: 0.88,
//						        cssUnit: 'rem',
//						        callback: function (selectOneObj) {
//						        	$(_this).text(selectOneObj.value);
//						        	$(_this).siblings('.currencys').text(selectOneObj.value);
//						        	$(_this).parent().parent().attr('currenys',selectOneObj.id);
//						        	toTotalAll();
//						        }
//						});
//					})
//					if(!$('#append dd')['length']){
//						oDd.addClass('cb');
//					}
//					$('#append dt').after(oDd);
//				
//				toFocus();
//				toTotalAll();
//			})
//		}
//		$('.feeList').css('display','none');
//		$('.feeList .view').empty();
//	})
//	$('.feeList .cancel').on('touchstart',function(){
//		$('.feeList').css('display','none');
//		$('.feeList input').val('');
//		$('.feeList .view').empty();
//	})
	
	
//	
	$('.feeContent').on('touchstart',function(){
		if($(this).text()!=''){
			$('#shadow2').hide();
			if($(this).attr('byOrder')=='1'){
				var oDd=$("<dd class='clearfix PrimeFees'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>￥</span><input type='number' value='100' /></span></dd>");
			}else{
				var oDd=$("<dd class='clearfix PrimeFees'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>￥</span><input type='number' value='100' class='v1'/>*<span class='num1'>1</span>+<span class='currencys'>￥</span><input type='number' value='100' class='v2'>*<span class='num2'>1</span>=<span class='currencys2 currencys'>￥</span><span class='total2'>200</span></span></dd>");
				if($('#num20GP').length){
					oDd.find('.num1').text($('#num20GP').text().substring(5));
				}else{
					oDd.find('.num1').text('0');
				}
				if($('#num40GP').length){
					oDd.find('.num2').text($('#num40GP').text().substring(5));
				}else{
					oDd.find('.num2').text('0');
				}
				toTotal(oDd);
			}
			oDd.attr('currenys','0');
			oDd.attr('byOrder',$(this).attr('byOrder'));
			oDd.attr('feeTypeNum',$(this).attr('feeTypeNum'));
			oDd.find('.currencys').on('touchstart',function(){
				var _this=this;
				var Select = new IosSelect(1, 
				    [currencys],
				    {
				        itemShowCount:9,		
				        itemHeight: 0.7,
				        headerHeight: 0.88,
				        cssUnit: 'rem',
				        callback: function (selectOneObj) {
				        	$(_this).text(selectOneObj.value);
				        	$(_this).siblings('.currencys').text(selectOneObj.value);
				        	$(_this).parent().parent().attr('currenys',selectOneObj.id);
				        	toTotalAll();
				        }
				});
			})
			if(!$('#append dd')['length']){
				oDd.addClass('cb');
			}
			$('#append dt').after(oDd);
			toFocus();
			toTotalAll();
		}
		$('.feeContent').text('');
		return false;
	});
	
	toFocus();
	function toFocus(){
		var original=0;
		$('input[type=number]').focus(function(){
			original=$(this).val();
			$(this).val('');
		});
		$('input[type=number]').blur(function(){
			if(!$(this).val()) $(this).val(original);
			$(this).siblings('.total2').text();
			toTotal($(this).parent().parent());
			toTotalAll();
		});
	}
	function toTotal(oParent){
		var total=Number(oParent.find('.v1').val())*Number(oParent.find('.num1').text())+Number(oParent.find('.v2').val())*Number(oParent.find('.num2').text());
		oParent.find('.total2').text(total);
	}
	//费用arr
	function createPrimeFees(feesObj,json){
		var arr=[
			{
				'feeTypeNum':0,
				'currency':$('#unit').attr('currency'),
				'byOrder':0,
			}
		];
		for(var key in json){
			if(json[key]){
				arr[0][key]=json[key].val();
			}
		}
		feesObj.each(function(index,ele){
			if($(ele).attr('byorder')=='1'){
				arr.push({
					'feeTypeNum':$(ele).attr('feeTypeNum'),
					'currency':$(ele).attr('currenys'),
					'byOrder':1,
					'orderPrice':$(ele).find('input').val(),
				});
			}else{
				arr.push({
					'feeTypeNum':$(ele).attr('feeTypeNum'),
					'currency':$(ele).attr('currenys'),
					'byOrder':0,
					'Cost20gp':$(ele).find('.v1').val(),
					'Cost40gp':$(ele).find('.v2').val(),
				});
			}
		});
		return arr;
	}
})()
function toTotalAll(){
	$('#allQuoteTotal')[0].innerHTML='';
	var total1=0;
	var total2=0;
	var total3=0;
	function sumHyf(){
		var sum=0;
		if($('#num20GP').length){
			sum+=Number($('#num20GP').text().substring(5))*Number($('#cost20gp').val());
		}
		if($('#num40GP').length){
			sum+=Number($('#num40GP').text().substring(5))*Number($('#cost40gp').val());
		}
		if($('#num40HQ').length){
			sum+=Number($('#num40HQ').text().substring(5))*Number($('#cost40hq').val());
		}
		if($('#num45HC').length){
			sum+=Number($('#num45HC').text().substring(5))*Number($('#cost45hc').val());
		}
		return sum;
	}
	
	if($('#unit').attr('currency')=='0'){
		total1=sumHyf();
	}else if($('#unit').attr('currency')=='1'){
		total2=sumHyf();
	}else if($('#unit').attr('currency')=='2'){
		total3=sumHyf();
	}
	$('#append dd').each(function(index,ele){
		if($(ele).attr('currenys')=='0'){
			if($(ele).attr('byOrder')=='1'){
				total1+=Number($(ele).find('input').val());
			}else{
				total1+=Number($(ele).find('.total2').text());
			}
		}else if($(ele).attr('currenys')=='1'){
			if($(ele).attr('byOrder')=='1'){
				total2+=Number($(ele).find('input').val());
			}else{
				total2+=Number($(ele).find('.total2').text());
			}
		}else if($(ele).attr('currenys')=='2'){
			if($(ele).attr('byOrder')=='1'){
				total3+=Number($(ele).find('input').val());
			}else{
				total3+=Number($(ele).find('.total2').text());
			}
		}
	});
	if(total1!=0){
		$('#allQuoteTotal')[0].innerHTML+='<b></b><em>￥</em>'+total1;
	} 
	if(total2!=0){
		$('#allQuoteTotal')[0].innerHTML+='<b></b><em>$</em>'+total2;
	}
	if(total3!=0){
		$('#allQuoteTotal')[0].innerHTML+='<b></b><em>฿</em>'+total3;
	}
}
$('.focus').each(function(index,ele){
		userLoad(ele);
	})
	function userLoad(ele){
		var oInput=ele.querySelector('input');
		var oSpan=ele.querySelector('span');
		oInput.onfocus=function(){
			hide(oSpan);
			return false;
		};
		oSpan.addEventListener('touchstart',function(){
			oInput.focus();
			return false;
		},false);
		oInput.onblur=function(){
			if(oInput.value==''){
				show(oSpan);
			}
		}
	}
	function hide(ele){
		ele.style.display='none';
	}
	function show(ele){
		ele.style.display='block';
	}
