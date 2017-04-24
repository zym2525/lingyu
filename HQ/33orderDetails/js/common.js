(function(){
	getOrder(setOrder)
	if(sessionStorage.getItem('scrollT3')){
		$('.content').scrollTop(sessionStorage.getItem('scrollT3'));
	}
	$('.content').on('scroll',function(){
		sessionStorage.setItem('scrollT3',$('.content').scrollTop())
	})
	$('.arrow').on('touchstart',function(){
		sessionStorage.removeItem('scrollT2');
		sessionStorage.removeItem('scrollT3')
    	open('../02interface/interface.html');
	});
	$('#btn').on('touchstart',function(){
    	open('../18Logistics-visualization-detail/18.html');
	});
	function setOrder(data){
		getSchemeInfo(data['schemeCode'],function(json){
			for(var i=0;i<json['feesList'].length;i++){
				if(json['feesList'][i]['feeTypeNum']=='0'){
					$('.cost2').html($('.cost2').html().replace(/\{\{\w+\}\}/g,function(s){
						s = s.substring(2, s.length-2);
						if(json['feesList'][i][s]){
				        	return json['feesList'][i][s];
				        }else{
				        	return '--';
				        } 
					}));
				}
			}
			for(var i=0;i<json['primeFeesLists'].length;i++){
				if(json['primeFeesLists'][i]['feeTypeNum']=='0'){
					$('#unit').text(arrHyfCurrency[json['primeFeesLists'][i]['currency']])
					$('.cost1').html($('.cost1').html().replace(/\{\{\w+\}\}/g,function(s){
						s = s.substring(2, s.length-2);
						if(json['primeFeesLists'][i][s]){
				        	return json['primeFeesLists'][i][s];
				        }else{
				        	return '--';
				        } 
					}));
				}else{
					var oDd=createDd(json['primeFeesLists']);
					oDd.addClass('PrimeFees');
					oDd.find('input').attr('disabled',true).css('background-color','#fff')
					oDd.find('.byOrder').text('(成本)')
					$('#append').append(oDd);
					for(var j=0;j<json['feesList'].length;j++){
						if(json['feesList'][j]['feeTypeCode']==json['primeFeesLists'][i]['feeTypeCode']){
							var oDd=createDd(json['feesList']);
							oDd.find('input').attr('disabled',true).css('background-color','#fff')
							oDd.addClass('Fees');
							oDd.find('.byOrder').text('(报价)')
							$('#append').append(oDd);
						}
					}
				}
				
				function createDd(arr){
					if(arr[i]['byOrder']=='1'){
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+arr[i]['feeTypeEname']+"<span class='byOrder'> (byOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[arr[i]['currency']]+"</span><input type='number' value="+arr[i]['orderPrice']+" /></span></dd>");
					}else{
						var oDd=$("<dd class='clearfix'><span class='name fl'>"+arr[i]['feeTypeEname']+"<span class='byOrder'> (nobyOrder)</span></span><span class='val fr'><span class='currencys'>"+arrCurrency[arr[i]['currency']]+"</span><input type='number' value="+arr[i]['cost20gp']+" class='v1'/>*<span class='num1'>1</span>+<span class='currencys'>"+arrCurrency[arr[i]['currency']]+"</span><input type='number' value="+arr[i]['cost40gp']+" class='v2'>*<span class='num2'>1</span>=<span class='currencys2 currencys'>"+arrCurrency[arr[i]['currency']]+"</span><span class='total2'>200</span></span></dd>");
							oDd.find('.num1').text(data['gp20']);
							oDd.find('.num2').text(data['gp40']);
						toTotal(oDd);
					}
					oDd.attr('currenys',arr[i]['currency']);
					oDd.attr('byOrder',arr[i]['byOrder']);
					return oDd
				}
			
			}
			$('#append dd:last-child').addClass('cb')
			createTotal(json['primeTotal'],$('#allCostTotal'))
			createTotal(json['total'],$('#allQuoteTotal'))
			toProfit()
			function createTotal(str,oParent){
				var jsonTotal=eval('('+str+')')
				if(jsonTotal[0]){
					oParent[0].innerHTML+='<b></b><em>'+arrCurrency[0]+'</em><span class="val tol1">'+jsonTotal[0]+'</span>'
				}
				if(jsonTotal[1]){
					oParent[0].innerHTML+='<b></b><em>'+arrCurrency[1]+'</em><span class="val tol2">'+jsonTotal[1]+'</span>'
				}
				if(jsonTotal[2]){
					oParent[0].innerHTML+='<b></b><em>'+arrCurrency[2]+'</em><span class="val tol3">'+jsonTotal[2]+'</span>'
				}
					
			}
			
			
		});
		
		function toTotal(oParent){
			var total=Number(oParent.find('.v1').val())*Number(oParent.find('.num1').text())+Number(oParent.find('.v2').val())*Number(oParent.find('.num2').text());
			oParent.find('.total2').text(total);
		}
		
		$('.wrap').html($('.wrap').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        if(data[s]){
	        	return data[s];
	        }else{
	        	return '';
	        }
	    }));
	    $('#CTime').text(toData(data['createTime']))
	    if(data['gp20']){
	    	$('#num20GP').val(data['gp20'])
	    }
	    if(data['gp40']){
	    	$('#num40GP').val(data['gp40'])
	    }
	    if(data['hq40']){
	    	$('#num40HQ').val(data['hq40'])
	    }
	    if(data['hc45']){
	    	$('#num45HC').val(data['hc45'])
	    }
	    if(data['prepaid']){
	    	if(getCookie('lng')=='US'){
	    		$('#prepaid1').text('(PREPAID)')
	    	}else{
	    		$('#prepaid1').text('(预付)')
	    	}
	    }else{
	    	if(getCookie('lng')=='US'){
	    		$('#prepaid1').text('(COLLECT)')
	    	}else{
	    		$('#prepaid1').text('(到付)')
	    	}
	    }
	    if(data['hblPrepaid']){
	    	if(getCookie('lng')=='US'){
	    		$('#prepaid2').text('(PREPAID)')
	    	}else{
	    		$('#prepaid2').text('(预付)')
	    	}
	    }else{
	    	if(getCookie('lng')=='US'){
	    		$('#prepaid2').text('(COLLECT)')
	    	}else{
	    		$('#prepaid2').text('(到付)')
	    	}
	    }
	    if(data['tester']){
	    	$('#shipper').text(JSON.parse(data['tester'])['shipper'])
	    	 $('#tester').text(JSON.parse(data['tester'])['tester'])
	    }
		
	    $('#transport').text(arrTransportation[data['transportation']])
	   
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
	
	//拿运价方案
	function getSchemeInfo(schemeCode,fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8085/bizCenter/schemeService/getSchemeTotalInfo',
			data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+'',
				'schemeCode':schemeCode,
			},
			success:function(json){
				if(json.retCode==0000){
					console.log(json)
					fn&&fn(json.schemes);
				}
			},
		})
	}
	function getOrder(fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:"http://106.14.251.28:8085/bizCenter/order/getOrder?accessToken="+getCookie('accessToken')+"&orderCode="+sessionStorage.getItem('orderCode'),
			contentType: "application/json; charset=utf-8",
			success:function(json){
				console.log(json)
				if(json.code==0000){
					fn&&fn(json.data)
				}
			},
		})
	}
	function toData(str){
		var date=new Date();
		date.setTime(1491877458000)
		var year=date.getFullYear();
		var mouth=date.getMonth()+1;
		var day=date.getDate();
		var hour=date.getHours();
		var min=date.getMinutes();
		var sec=date.getSeconds();
		return `${year}-${toDou(mouth)}-${toDou(day)} ${toDou(hour)}:${toDou(min)}:${toDou(sec)}`
	}
	function toDou(s){
		return s<10? '0'+s:s+'';
	}
})()
