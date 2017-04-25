(function(){
	var port=getCookie('port')||'';
	$('#pot').html(port);
	$('#pot').attr('code',getCookie('code')||'');
	removeCookie('port')
	removeCookie('code')
	getEnquiryInfo(setSchemeInfo);
	getCurrencys(function(arr){
		for(var i=0;i<arr.length;i++){
			currencys.push({
				'id':arr[i]['currency'],
				'value':arrCurrency[arr[i]['currency']],
			});
		}
	});
	getSupplierCompanys(function(arr){
		for(var i=0;i<arr.length;i++){
			arrSupplierCompanys.push({
				'id': arr[i]['companyCode']+'&'+arr[i]['contector']+'&'+arr[i]['mobileNo'], 
				'value': arr[i]['companyName']
			})
		}
	})
	$('.arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
	
//	$('#vesselName,#voyageName').on('touchstart',function(){
//		$(this).siblings('.val').focus();
//		return false;
//	})
	
	//选择船公司
	$('#carrys').on('touchstart',function(){
		getCarrys(setCarrys);
	});
	function setCarrys(arr){
		arrCarrys=[{'id': '0', 'value': ''}];
		for(var i=0;i<arr.length;i++){
			arrCarrys.push({
				'id': arr[i]['carryCode'],
				'value': arr[i]['carryName'],
			})
		}
	}
	
	function createLi(id,str,num){
		var oTmp=document.getElementById(id);
	    var oLi=oTmp.cloneNode(true);
	    oLi.removeAttribute('id');
	    switch (str){
	    	case 'num20gp':
	    		$(oLi).children('.kind').attr('id','num20GP').text('20GP*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost20gp');
	    		$(oLi).children('.bj').children('input').attr('id','cost20gp2');
	    		break;
	    	case 'num40gp':
	    		$(oLi).children('.kind').attr('id','num40GP').text('40GP*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost40gp');
	    		$(oLi).children('.bj').children('input').attr('id','cost40gp2');
	    		break;
	    	case 'num40hq':
	    		$(oLi).children('.kind').attr('id','num40HQ').text('40HQ*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost40hq');
	    		$(oLi).children('.bj').children('input').attr('id','cost40hq2');
	    		break;
	    	case 'num45hc':
	    		$(oLi).children('.kind').attr('id','num45HC').text('45HC*'+num);
	    		$(oLi).children('.price').children('input').attr('id','cost45hc');
	    		$(oLi).children('.bj').children('input').attr('id','cost45hc2');
	    		break;
	    }
	    return oLi;
	}
	
	function setSchemeInfo(data){
		var json=data;
		for(var key in data['elements']){
			if(key.charAt(0)=='n'&&data['elements'][key]!='0'){
				var oLi=createLi('tplLi',key,data['elements'][key]);
				$('#hyf').append($(oLi));
			}
		}
		$('#hyf li:last-child').addClass('cr')
		$('#carrys').siblings('.val').attr('code',data['carryCode']||'0')
//		$('#unit').html(arrHyfCurrency[data['feesList'][0]['currency']]);
//		$('#num20GP').text('20GP*'+data['elements']['num20gp'])
//		$('#num40GP').text('40GP*'+data['elements']['num40gp'])
		$('.wrap').html($('.wrap').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        if(data[s]){
	        	return data[s];
	        }else{
	        	if(s=='carryCode'){
	        		return '全部';
	        	}else{
	        		return '';
	        	}
	        }
	    }));
	    if(data['sailingDay']){
	    	$('#tDay').show();
			$('#sailingDay').val(data['sailingDay'].substring(0,data['sailingDay'].length-1))
		}
	    isClick($('#sailingDayBox'),function(){
	    	$('#sailingDay')[0].focus();
	    })
	    $('#sailingDay').on('blur',function(){
	    	if($('#sailingDay').val()&&$('#sailingDay').val()!='0'){
	    		$('#tDay').show();
	    	}
	    })
	    //发布
	    $('#btn').on('touchstart',function(){
			$('#shadow').show();
		})
	    $('#cancel').on('touchstart',function(){
			$('#shadow').hide();
		});
		$('#confirm').on('touchstart',function(){
			$('#shadow').hide();
			if($('.companyBox input').val()==''){
				$('#hintBox').html('请选择报价公司！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#carrys').find('.val').text()==''||$('#carrys').find('.val').text()=='全部'){
				$('#hintBox').html('请填写carrys！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#sailingDay').val()=='0'){
				$('#hintBox').html('请填写sailingDay！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#cost20gp').val()=='0'&&$('#cost40gp').val()=='0'){
				$('#hintBox').html('请填写运费！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else{
				var t=new Date().getTime();
				var arrPrimeFees=createPrimeFees($('.PrimeFees'),{'Cost20gp':$('#cost20gp'),'Cost40gp':$('#cost40gp'),'Cost40hq':$('#cost40hq'),'Cost45hc':$('#cost45hc'),});
				var arrFees=createPrimeFees($('.Fees'),{'Cost20gp':$('#cost20gp2'),'Cost40gp':$('#cost40gp2'),'Cost40hq':$('#cost40hq2'),'Cost45hc':$('#cost45hc2'),});
				$.ajax({
					type:'POST',
					async:false,
					url:'http://106.14.251.28:8085/bizCenter/schemeService/pubSchemeWithoutSp',
					data:{
						'accessToken':getCookie('accessToken'),
						'msgId':t+'',
						'enquiryCode':json['enquiryCode'],
						'supplierCode':$('.companyBox input').attr('companyCode'),
						'polCode':json['polCode'],
						'podCode':json['podCode'],
						'potCode':$('#pot').attr('code'),
						'carryCode':$('#carrys').find('.val').attr('code'),
						'sailingDay':$('#sailingDay').val()+'天',
						'etd':$('#etd').text(),
						'customsClearance':$('#customsClearance').text(),
						'expireDate':$('#expireDate').text(),
						'primeFees':JSON.stringify(arrPrimeFees),
						'fees':JSON.stringify(arrFees),
						'vessel':'',
						'voyage':'',
					},
					success:function(json){
						console.log(json)
						if(json.retCode==0000){
							$('#hintBox').html('确认报价成功！').show();
							setTimeout(function(){
								$('#hintBox').hide();
								open('../02interface/interface.html');
							},700)
						}else{
							$('#hintBox').html('确认报价失败！').show();
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
	
	var fzType='';
	
	
	//模糊搜费项
	isClick($('#addFeeBox'),function(){
		$('.feeList').css('display','flex');
		$('.feeList .view').scrollTop(0);
		getFeeTypes(function(data){
			$('.feeList .view').empty();
			for(var i=0;i<data.length;i++){
				var oLi=$('<li class="item"><span></span></li>');
				oLi.find('span').text(data[i]['feeTypeEname']);
				oLi.find('span').attr('index',i);
				oLi.attr('byOrder',data[i]['byOrder']);
				oLi.attr('feeTypeNum',data[i]['feeTypeNum']);
				oLi.attr('currency',data[i]['currency']);
				if(!data[i]['byOrder']){
					oLi.attr('cost20gp',data[i]['cost20gp']||'0');
					oLi.attr('cost40gp',data[i]['cost40gp']||'0');
				}
				$('.feeList .view').append(oLi);
			}
			$('.feeList .view li').on('touchstart',function(){
				var _this=this;
				if($(this).hasClass('active')){
					$(this)[0].timer=setTimeout(function(){
						$(_this).removeClass('active item1')
					},300)
					$(this)[0].addEventListener('touchmove',function(){
			    		clearTimeout($(_this)[0].timer);
			    	},false);
				}else{
					$(this)[0].timer=setTimeout(function(){
						$(_this).addClass('active item1')
					},300)
					$(this)[0].addEventListener('touchmove',function(){
			    		clearTimeout($(_this)[0].timer);
			    	},false);
				}
				
			});
		});
	})
	$('.feeList .confirm').on('touchstart',function(){
		$('#append dd').remove();
		if($('.feeList .view li.active').length){
//			for(var j=0;j<$('.feeList .view li.active').length;j++){
			$('.feeList .view li.active').each(function(index,ele){
				for(var i=0;i<2;i++){
					if($(this).attr('byOrder')=='1'){
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value='0'/></span></dd>");
					}else{
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(this).attr('cost20gp')+" class='v1'/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><input type='number' value="+$(this).attr('cost40gp')+" class='v2'>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[$(this).attr('currency')]+"</span><span class='total2'>200</span></span></dd>");
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
					oDd.attr('currenys',$(this).attr('currency'));
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
						        	toTotalFeesAll();
						        	toProfit();
						        }
						});
					})
					if(!$('#append dd')['length']){
						oDd.addClass('cb');
					}
					if(i){
						oDd.addClass('PrimeFees');
						oDd.find('.byOrder').text('(成本)')
					}else{
						oDd.addClass('Fees');
						oDd.find('.byOrder').text('(报价)')
					}
					$('#append dt').after(oDd);
				}
				
				toFocus();
				toTotalAll();
				toTotalFeesAll();
				toProfit();
			})
		}
		$('.feeList').css('display','none');
		$('.feeList .view').empty();
	})
	$('.feeList .cancel').on('touchstart',function(){
		$('.feeList').css('display','none');
		$('.feeList input').val('');
		$('.feeList .view').empty();
	})
	
	
//	$('#addFee').on('touchstart',function(){
//		$('#shadow2').show();
//		$('#text3').val('');
//		$('#text3').attr('placeholder','请在此输入');
//	})
//	$('#cancel1').on('touchstart',function(){
//		$('#shadow2').hide();
//		$('#text2').attr('placeholder','请在此输入');
//	});
//	$('#text3').on('focus',function(){
//		$('#text3').attr('placeholder','');
//	});
//	$('#confirm1').on('touchstart',function(){
////		$('#email').html($('#text2').val());
//		$('#shadow2').hide();
//	});
//	var timer=null;
//	$('#text3').on('keyup',function(){
//		clearTimeout(timer);
//		timer=setTimeout(function(){
//			fzFeeTypes($('#text3').val(),function(data){
//				$('.feeContent').each(function(index,ele){
//					$(ele).text(data['types'][index]['feeTypeEname']);
//					$(ele).attr('byOrder',data['types'][index]['byOrder']);
//					$(ele).attr('feeTypeNum',data['types'][index]['feeTypeNum']);
//				})
//			});
//		},400)
//	})
	//船名航次
//	var original1='';
//	$('#voyage,#vessel').on('focus',function(){
//		fzType=$(this).attr('id');
//		$('.fuzzy').css('display','flex');
//		$('.fuzzy .view').scrollTop(0);
//		$('.fuzzy input')[0].focus();
//		if($('.fuzzy input')[0].getAttribute('disabled')){
//			$('.fuzzy input')[0].removeAttribute('disabled')
//		}
//		original1=$(this).val();
//	})
//	$('#voyage,#vessel').on('blur',function(){
//		if(!$(this).val()) $(this).val(original1);
//	})
//	
//	function searchVessel(){
//		fsVessel($('.fuzzy input').val(),function(vessels){
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
	
	//查供应商
	isClick($('.companyBox input,.companyBox .s1'),function(){
		var Select = new IosSelect(1, 
		    [arrSupplierCompanys],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$('.companyBox input').val(selectOneObj.value).attr('companyCode',selectOneObj.id.split('&')[0]);
		        	$('#contector').text(selectOneObj.id.split('&')[1])
		        	$('#contectorMobileNo').text(selectOneObj.id.split('&')[2])
		        	if($('.companyBox input')){
		        		$('.companyBox .s1').hide();
		        	}
		        }
		});
	})
//	$('.companyBox input').focus(function(){
//		fzType='gys';
//		$('.fuzzy').css('display','flex');
//		$('.fuzzy .view').scrollTop(0);
//		$('.fuzzy input')[0].focus();
//		if($('.fuzzy input')[0].getAttribute('disabled')){
//			$('.fuzzy input')[0].removeAttribute('disabled')
//		}
//	})
//	function searchSupplier(){
//		fzCustomCompany($('.fuzzy input').val(),function(companys){
//			$('.fuzzy .view').empty();
//			if(companys){
//				for(var i=0;i<companys.length;i++){
//					var oLi=$('<li class="item"><span></span></li>');
//					oLi.find('span').text(companys[i]['companyName']);
//					oLi.find('span').attr({'index':i,'companyCode':companys[i]['companyCode']});
//					$('.fuzzy .view').append(oLi);
//				}
//			}
//			$('.fuzzy .view span').on('touchstart',function(){
//				$('.companyBox .s1').hide();
//				$('.companyBox input').val($(this).text()).attr('companyCode',$(this).attr('companyCode'));
//				$('#contectorMobileNo').text(companys[$(this).attr('index')]['mobileNo'])
//				$('#contector').text(companys[$(this).attr('index')]['contector']);
//				$('.fuzzy').css('display','none');
//				$('.fuzzy input').val('');
//				$('.fuzzy .view').empty();
//				return false;
//			});
//		})
//	}
//	var timer=null;
//	$('.fuzzy input').on('keyup',function(){
//		if($('.fuzzy input').val()!=''){
//			clearTimeout(timer);
//			timer=setTimeout(function(){
//				switch (fzType){
//					case 'gys':
//						searchSupplier();
//						break;
//					case 'vessel':
//						searchVessel();
//						break;
//					case 'voyage':
//						searchVoyage();
//						break;
//				}
//			},500);
//		}
//		
//	});
//	$('.fuzzy .cancel').on('touchstart',function(){
//		$('.fuzzy').css('display','none');
//		$('.fuzzy input').val('');
//		$('.fuzzy .view').empty();
//		switch (fzType){
//			case 'gys':
//				if(!$('.companyBox input').val()){
//					$('.companyBox .s1').show();
//				}
//				break;
//		}
//	})
//	$('.companyBox input').on('keyup',function(){
//		clearTimeout(timer);
//		timer=setTimeout(function(){
//			fzSupplierCompany($('.companyBox input').val(),function(data){
//				dataCompany=[];
//				if(data){
//					for(var i=0;i<data.length;i++){
//						dataCompany.push(data[i]);
//					}
//					$('.companyBox .s2').text(dataCompany[0]['companyName'])
//				}
//				
//				
//
//			});
//		},400)
//	})
//	$('.companyBox .s2').on('touchstart',function(){
//		$('.companyBox input').val($('.companyBox .s2').text());
//		$('.companyBox .s2').text('');
//		$('#contectorMobileNo').text(dataCompany[0]['mobileNo'])
//		$('#contector').text(dataCompany[0]['contector']);
//		$('.companyBox input')[0].blur();
//		return false;
//	})
//	$('.feeContent').on('touchstart',function(){
//		if($(this).text()!=''){
//			$('#shadow2').hide();
//			for(var i=0;i<2;i++){
//				if($(this).attr('byOrder')=='1'){
//					var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>￥</span><input type='number' value='100'/></span></dd>");
//				}else{
//					var oDd=$("<dd class='clearfix'><span class='name fl'>"+$(this).text()+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>￥</span><input type='number' value='100' class='v1'/>*<span class='num1'>1</span>+<span class='currencys'>￥</span><input type='number' value='100' class='v2'>*<span class='num2'>1</span>=<span class='currencys2 currencys'>￥</span><span class='total2'>200</span></span></dd>");
//					if($('#num20GP').length){
//						oDd.find('.num1').text($('#num20GP').text().substring(5));
//					}else{
//						oDd.find('.num1').text('0');
//					}
//					if($('#num40GP').length){
//						oDd.find('.num2').text($('#num40GP').text().substring(5));
//					}else{
//						oDd.find('.num2').text('0');
//					}
//					toTotal(oDd);
//				}
//				oDd.attr('currenys','0');
//				oDd.attr('byOrder',$(this).attr('byOrder'));
//				oDd.attr('feeTypeNum',$(this).attr('feeTypeNum'));
//				oDd.find('.currencys').on('touchstart',function(){
//					var _this=this;
//					var Select = new IosSelect(1, 
//					    [currencys],
//					    {
//					        itemShowCount:9,		
//					        itemHeight: 0.7,
//					        headerHeight: 0.88,
//					        cssUnit: 'rem',
//					        callback: function (selectOneObj) {
//					        	$(_this).text(selectOneObj.value);
//					        	$(_this).siblings('.currencys').text(selectOneObj.value);
//					        	$(_this).parent().parent().attr('currenys',selectOneObj.id);
//					        	toTotalAll();
//					        	toTotalFeesAll();
//					        	toProfit();
//					        }
//					});
//				})
//				if(!$('#append dd')['length']){
//					oDd.addClass('cb');
//				}
//				if(i){
//					oDd.addClass('PrimeFees');
//					oDd.find('.byOrder').text('(成本)')
//				}else{
//					oDd.addClass('Fees');
//					oDd.find('.byOrder').text('(报价)')
//				}
//				$('#append dt').after(oDd);
//			}
//			
//			toFocus();
//			toTotalAll();
//			toTotalFeesAll();
//			toProfit();
//		}
//		$('.feeContent').text('');
//	});
	
	
	toFocus();
	function toFocus(){
		var original=0;
		$('input[type=number]').focus(function(){
			original=$(this).val();
			$(this).val('');
		});
		$('input[type=number]').blur(function(){
			if(!$(this).val()) $(this).val(original);
			if($('#sailingDay').val()=='0') $('#sailingDay').val('');
			$(this).siblings('.total2').text();
			toTotal($(this).parent().parent());
			toTotalAll();
			toTotalFeesAll();
			toProfit();
		});
	}
	function toTotal(oParent){
		var total=Number(oParent.find('.v1').val())*Number(oParent.find('.num1').text())+Number(oParent.find('.v2').val())*Number(oParent.find('.num2').text());
		oParent.find('.total2').text(total);
	}
	
	function toTotalAll(){
		$('#allCostTotal')[0].innerHTML='';
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
		$('#append .PrimeFees').each(function(index,ele){
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
			$('#allCostTotal')[0].innerHTML+='<b></b><em>￥</em><span class="val tol1">'+total1+'</span>';
		} 
		if(total2!=0){
			$('#allCostTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol2">'+total2+'</span>';
		}
		if(total3!=0){
			$('#allCostTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol3">'+total3+'</span>';
		}
	}
	//fees
	function toTotalFeesAll(){
		$('#allQuoteTotal')[0].innerHTML='';
		var total1=0;
		var total2=0;
		var total3=0;
		function sumHyf(){
			var sum=0;
			if($('#num20GP').length){
				sum+=Number($('#num20GP').text().substring(5))*Number($('#cost20gp2').val());
			}
			if($('#num40GP').length){
				sum+=Number($('#num40GP').text().substring(5))*Number($('#cost40gp2').val());
			}
			if($('#num40HQ').length){
				sum+=Number($('#num40HQ').text().substring(5))*Number($('#cost40hq2').val());
			}
			if($('#num45HC').length){
				sum+=Number($('#num45HC').text().substring(5))*Number($('#cost45hc2').val());
			}
			return sum;
		}
		if($('#unit').attr('currency')=='0'){
			total1=sumHyf();
		}else if($('#unit').attr('currency')=='1'){
			total2=sumHyf();
		}else if($('#unit').attr('currency')=='2'){
			total3=sumHyf();
		}2
		$('#append .Fees').each(function(index,ele){
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
			$('#allQuoteTotal')[0].innerHTML+='<b></b><em>￥</em><span class="val tol1">'+total1+'</span>';
		} 
		if(total2!=0){
			$('#allQuoteTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol2">'+total2+'</span>';
		}
		if(total3!=0){
			$('#allQuoteTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol3">'+total3+'</span>';
		}
	}
	
	function toProfit(){
		$('#allProfitTotal')[0].innerHTML='';
		var total1=0;
		var total2=0;
		var total3=0;
		var TotalAll1=0;
		var TotalAll2=0;
		var TotalAll3=0;
		var TotalFeesAll1=0;
		var TotalFeesAll2=0;
		var TotalFeesAll3=0;
		
		if($('#allCostTotal .tol1')){
			TotalAll1=$('#allCostTotal .tol1').text();
		}
		if($('#allCostTotal .tol2')){
			TotalAll2=$('#allCostTotal .tol2').text();
		}
		if($('#allCostTotal .tol3')){
			TotalAll3=$('#allCostTotal .tol3').text();
		}
		if($('#allQuoteTotal .tol1')){
			TotalFeesAll1=$('#allQuoteTotal .tol1').text();
		}
		if($('#allQuoteTotal .tol2')){
			TotalFeesAll2=$('#allQuoteTotal .tol2').text();
		}
		if($('#allQuoteTotal .tol3')){
			TotalFeesAll3=$('#allQuoteTotal .tol3').text();
		}
		
		total1=Number(TotalFeesAll1)-Number(TotalAll1);
		total2=Number(TotalFeesAll2)-Number(TotalAll2);
		total3=Number(TotalFeesAll3)-Number(TotalAll3);
		if(total1!=0){
			$('#allProfitTotal')[0].innerHTML+='<b></b><em>￥</em><span class="val tol1">'+total1+'</span>';
		} 
		if(total2!=0){
			$('#allProfitTotal')[0].innerHTML+='<b></b><em>$</em><span class="val tol2">'+total2+'</span>';
		}
		if(total3!=0){
			$('#allProfitTotal')[0].innerHTML+='<b></b><em>฿</em><span class="val tol3">'+total3+'</span>';
		}
	}
	
	//费用arr
	function createPrimeFees(feesObj,json){
		var arr=[
			{
				'feeTypeNum':0,
				'currency':$('#unit').attr('currency'),
				'byOrder':0,
//				'Cost20gp':$('#cost20gp').val(),
//				'Cost40gp':$('#cost40gp').val(),
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
	var oUser=document.querySelector('.companyBox');
//	userLoad(oUser);
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
})()
