(function(){
	var port=getCookie('port')||'无';
	$('#pot').html(port);
	$('#pot').attr('code',getCookie('code')||'');
	removeCookie('port');
	removeCookie('code');
	getSchemeInfo(setSchemeInfo);
	toTotalAll();
	toTotalFeesAll();
	toProfit();
	getCurrencys(function(arr){
		for(var i=0;i<arr.length;i++){
			currencys.push({
				'id':arr[i]['currency'],
				'value':arrCurrency[arr[i]['currency']],
			});
		}
	});
	$('.arrow').on('touchstart',function(){
		window.history.back();
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
		for(var key in data){
			if(key.charAt(0)=='n'&&data[key]!='0'){
				var oLi=createLi('tplLi',key,data[key]);
				$('#hyf').append($(oLi));
			}
		}
		$('#hyf li:last-child').addClass('cr')
		$('#carrys').siblings('.val').attr('code',data['carryCode'])
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
	    for(var j=0;j<data['feesList'].length;j++){
	    	if(data['feesList'][j]['feeTypeNum']=='0'){
				$('#unit').attr('feeCode',data['feesList'][j]['feeCode'])
			}
	    }
	    for(var i=0;i<data['primeFeesLists'].length;i++){
			if(data['primeFeesLists'][i]['feeTypeNum']=='0'){
				$('#unit').text(arrHyfCurrency[data['primeFeesLists'][i]['currency']]).attr('currency',data['primeFeesLists'][i]['currency'])
				$('#hyf li em').text(arrCurrency[data['primeFeesLists'][i]['currency']])
				if(data['primeFeesLists'][i]['cost20gp']){
					$('#cost20gp').val(data['primeFeesLists'][i]['cost20gp'])
				}
				if(data['primeFeesLists'][i]['cost40gp']){
					$('#cost40gp').val(data['primeFeesLists'][i]['cost40gp'])
				}
				if(data['primeFeesLists'][i]['cost40hq']){
					$('#cost40hq').val(data['primeFeesLists'][i]['cost40hq'])
				}
				if(data['primeFeesLists'][i]['cost45hc']){
					$('#cost45hc').val(data['primeFeesLists'][i]['cost45hc'])
				}
			}else{
				var oDd=createDd(data['primeFeesLists']);
				oDd.addClass('PrimeFees');
				oDd.find('input').attr('disabled',true).css('background-color','#fff')
				oDd.find('.byOrder').text('(成本)')
				$('#append').append(oDd);
				for(var j=0;j<data['feesList'].length;j++){
					if(data['feesList'][j]['feeTypeCode']==data['primeFeesLists'][i]['feeTypeCode']){
						var oDd=createDd(data['feesList']);
						oDd.addClass('Fees');
						oDd.find('.byOrder').text('(报价)')
						$('#append').append(oDd);
					}
				}
			}
			function createDd(arr){
		    	if(arr[i]['byOrder']=='1'){
					var oDd=$("<dd class='clearfix'><span class='name fl'>"+arr[i]['feeTypeEname']+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[arr[i]['currency']]+"</span><input type='number' value="+arr[i]['orderPrice']+" disabled/></span></dd>");
				}else{
					var oDd=$("<dd class='clearfix'><span class='name fl'>"+arr[i]['feeTypeEname']+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[arr[i]['currency']]+"</span><input type='number' value="+arr[i]['cost20gp']+" class='v1' disabled/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[arr[i]['currency']]+"</span><input type='number' value="+arr[i]['cost40gp']+" class='v2' disabled/>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[arr[i]['currency']]+"</span><span class='total2'>200</span></span></dd>");
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
				oDd.find('input').css('background-color','#FFF');
				oDd.attr('currenys',arr[i]['currency']);
				oDd.attr('byOrder',arr[i]['byOrder']);
				oDd.attr('feeCode',arr[i]['feeCode']);
				return oDd
			}	
			
			
			
		}
	    
	    
	    $('#append dd:last-child').addClass('cb');
	    for(var i=0;i<data['feesList'].length;i++){
			if(data['feesList'][i]['feeTypeNum']=='0'){
				if(data['feesList'][i]['cost20gp']){
					$('#cost20gp2').val(data['feesList'][i]['cost20gp'])
				}
				if(data['feesList'][i]['cost40gp']){
					$('#cost40gp2').val(data['feesList'][i]['cost40gp'])
				}
				if(data['feesList'][i]['cost40hq']){
					$('#cost40hq2').val(data['feesList'][i]['cost40hq'])
				}
				if(data['feesList'][i]['cost45hc']){
					$('#cost45hc2').val(data['feesList'][i]['cost45hc'])
				}
			}
		}
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
			if($('#carrys').val()==''||$('#carrys').val()=='全部'){
				$('#hintBox').html('请填写carrys！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else if($('#cost20gp').val()=='0'&&$('#cost40gp').val()=='0'){
				$('#hintBox').html('请填写运费！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}else{
				//采纳方案
				var t=new Date().getTime();
				var arrPrimeFees=createPrimeFees($('.PrimeFees'),{'Cost20gp':$('#cost20gp'),'Cost40gp':$('#cost40gp'),'Cost40hq':$('#cost40hq'),'Cost45hc':$('#cost45hc'),});
				var arrFees=createPrimeFees($('.Fees'),{'Cost20gp':$('#cost20gp2'),'Cost40gp':$('#cost40gp2'),'Cost40hq':$('#cost40hq2'),'Cost45hc':$('#cost45hc2'),});
				$.ajax({
					type:'POST',
					async:false,
					url:'http://106.14.251.28:8085/bizCenter/schemeService/acceptScheme',
					data:{
						'accessToken':getCookie('accessToken'),
						'msgId':t+'',
						'schemeCode':json['schemeCode'],
						'supplierCompanyCode':json['supplierCompanyCode'],
					},
					success:function(json){
						//修改费用
						var t=new Date().getTime();
						$.ajax({
							type:'POST',
							async:false,
							url:'http://106.14.251.28:8085/bizCenter/feeService/batchUpdateFee',
							data:{
								'accessToken':getCookie('accessToken'),
								'msgId':t+'',
								'schemeCode':json['schemeCode'],
								'fees':JSON.stringify(arrFees),
							},
							success:function(data){
								console.log(data)
								var t=new Date().getTime();
								$.ajax({
									type:'POST',
									async:false,
									url:'http://106.14.251.28:8085/bizCenter/schemeService/forwardScheme',
									data:{
										'accessToken':getCookie('accessToken'),
										'msgId':t+'',
										'schemeCode':json['schemeCode'],
									},
									success:function(json){
										if(json.retCode==0000){
											$('#hintBox').html('确认报价成功！').show();
											setTimeout(function(){
												$('#hintBox').hide();
												sessionStorage.removeItem('currentData2')
												sessionStorage.removeItem('currentScrollT2')
												sessionStorage.removeItem('lengths21')
												sessionStorage.removeItem('lengths22')
												sessionStorage.removeItem('lengths23')
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
							},
						})
					},
					
				})
			}
			
		})
	}
	
	$('.comb').on('touchstart',function(){
		$('.updateFee').hide();
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
			console.log($(this).attr('byorder'))
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
		toTotalFeesAll();
		toProfit();
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
		toTotalFeesAll();
		toProfit();
	})
	
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
				'feeCode':$('#unit').attr('feeCode'),
				'currency':Number($('#unit').attr('currency')),
//				'byOrder':0,
			}
		];
		for(var key in json){
			if(json[key]){
				arr[0][key.toLowerCase()]=json[key].val();
			}
		}
		console.log(arr)
		feesObj.each(function(index,ele){
			if($(ele).attr('byorder')=='1'){
				arr.push({
					'feeCode':$(ele).attr('feeCode'),
					'currency':Number($(ele).attr('currenys')),
//					'byOrder':1,
					'orderPrice':$(ele).find('input').val(),
				});
			}else{
				arr.push({
					'feeCode':$(ele).attr('feeCode'),
					'currency':Number($(ele).attr('currenys')),
//					'byOrder':0,
					'cost20gp':$(ele).find('.v1').val(),
					'cost40gp':$(ele).find('.v2').val(),
				});
			}
		});
		return arr;
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
	
})()
