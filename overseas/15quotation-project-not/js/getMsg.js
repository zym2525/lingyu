(function(){
	getSchemeInfo(setSchemeInfo);
	$('.arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
	
	isClick($('#mobileNo'),function(){
		if($('#mobileNo')){
			telPhone($('#mobileNo').text())
		}
	})
	
	
	function setSchemeInfo(data){
		var json2={
				'cost20gp':'num20gp',
				'cost40gp':'num40gp',
				'cost40hq':'num40hq',
				'cost45hc':'num45hc',
			};
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
		var oAppend=document.getElementById('append');
			
		
		for(var i=0;i<data['feesList'].length;i++){
			//运费
			if(data['feesList'][i]['feeTypeNum']=='0'){
				$('#unit').html(arrHyfCurrency[data['feesList'][i]['currency']]).attr({'currency':data['feesList'][i]['currency'],'feeCode':data['feesList'][i]['feeCode']});
				$('.units').html(arrCurrency[data['feesList'][i]['currency']]);
				for(var key in data['feesList'][i]){
					if(key.substring(0,4)=='cost'&&data['feesList'][i][key]!='0'){
						var oLi=createLi('tplLi',json2[key],data[json2[key]]);
						$(oLi).find('input').val(data['feesList'][i][key]);
						$('#hyf').append($(oLi));
					}
				}
				$('#hyf li:last-child').addClass('cr')
			}else{
				if(data['feesList'][i]['byOrder']=='1'){
					var oDd=$("<dd class='clearfix Fees'><span class='name fl'>"+data['feesList'][i]['feeTypeEname']+"</span><span class='val fr'><span class='currencys'>"+arrCurrency[data['feesList'][i]['currency']]+"</span><input type='number' value='100' disabled/></span></dd>");
					oDd.find('input').val(data['feesList'][i]['orderPrice']);
				}else{
					var oDd=$("<dd class='clearfix Fees'><span class='name fl'>"+data['feesList'][i]['feeTypeEname']+"</span><span class='val fr'><span class='currencys'>"+arrCurrency[data['feesList'][i]['currency']]+"</span><input type='number' value='100' class='v1' disabled/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[data['feesList'][i]['currency']]+"</span><input type='number' value='100' class='v2' disabled/>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[data['feesList'][i]['currency']]+"</span><span class='total2'>200</span></span></dd>");
					if($('#num20GP').length){
						oDd.find('.num1').text($('#num20GP').text().substring(5));
					}else{
						oDd.find('.num1').text('0');
					}
					oDd.find('.v1').val(data['feesList'][i]['cost20gp'])
					if($('#num40GP').length){
						
						oDd.find('.num2').text($('#num40GP').text().substring(5));
					}else{
						oDd.find('.num2').text('0');
					}
					oDd.find('.v2').val(data['feesList'][i]['cost40gp'])
					toTotal(oDd);
				}
				oDd.find('input').css('background-color','#fff')
				oDd.attr('currenys',data['feesList'][i]['currency']);
				oDd.attr('byOrder',data['feesList'][i]['byOrder']);
				oDd.attr('feeCode',data['feesList'][i]['feeCode']);
				$('#append dt').after(oDd);
//				toTotalAll();
			}
		}
		$('#append dd').eq(length-1).addClass('cb');
		toTotalAll();
	}
	$('#btn').on('touchstart',function(){
		$('#shadow').show();
	})
	$('#cancel').on('touchstart',function(){
		$('#shadow').hide();
	});
	$('#confirm').on('touchstart',function(){
		$('#shadow').hide();
		var arrFees=createPrimeFees($('#append .Fees'),{'cost20gp':$('#cost20gp'),'cost40gp':$('#cost40gp'),'cost40hq':$('#cost40hq'),'cost45hc':$('#cost45hc'),})
		updateFees(JSON.stringify(arrFees),forwardScheme);
	})
	
	//修改费用
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
//		if(!bOk) return;
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
		if($('#ipt1').val()){
			$('#append .Fees.active').find('.v1').val($('#ipt1').val())
		}
		if($('#ipt2').val()){
			$('#append .Fees.active').find('.v2').val($('#ipt2').val())
		}
		
		toTotal($('#append .Fees.active'))
		toTotalAll();
		setTimeout(function(){
			$('#ipt1').val('')
			$('#ipt1').siblings('span').show();
			$('#ipt2').siblings('span').show();
			$('#ipt2').val('')
			$('.updateFee1').hide();
		},500)
	})
	$('#updateFeeBtn2').on('touchstart',function(){
		if($('#ipt4').val()){
			$('#append .Fees.active').find('input').val($('#ipt4').val())
		}
		
		toTotalAll();
		setTimeout(function(){
			$('#ipt4').val('')
			$('#ipt4').siblings('span').show();
			$('#ipt5').val('')
			$('.updateFee2').hide();
		},500)
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
		});
	}
	$('.shuaxin').on('touchstart',function(){
		open('../15quotation-project-not/15.html');
	})
	
	//算费用
	function toTotal(oParent){
		var total=Number(oParent.find('.v1').val())*Number(oParent.find('.num1').text())+Number(oParent.find('.v2').val())*Number(oParent.find('.num2').text());
		oParent.find('.total2').text(total);
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
				arr[0][key]=json[key].val();
			}
		}
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
	
})()
