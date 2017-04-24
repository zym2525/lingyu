(function(){
	getSchemeInfo(setSchemeInfo);
	$('.arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
	function setSchemeInfo(data){
		
		var oAppend=document.getElementById('append');
		var json2={
				'cost20gp':'num20gp',
				'cost40gp':'num40gp',
			};
		for(var i=0;i<data['feesList'].length;i++){
			//运费
			if(data['feesList'][i]['feeTypeNum']=='0'){
				$('#unit').html(arrHyfCurrency[data['feesList'][i]['currency']]);
				$('#k1').text('20GP*'+data['num20gp'])
				$('#k2').text('40GP*'+data['num40gp'])
				$('#hyf li').each(function(index,ele){
			    	$(ele).html($(ele).html().replace(/\{\{\w+\}\}/g,function(s){
				        s = s.substring(2, s.length-2);
				       	if(data['feesList'][i][s]){
				        	return Number(data['feesList'][i][s]);
				        }else{
				        	return '--';
				        }
				    }));
			    })
			}else{
				//附加费
				var oDd=document.createElement('dd');
				oDd.className='clearfix';
		    	if(data['feesList'][i]['byOrder']=='1'){
		    		var fee=`${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['orderPrice']}`;
		    	}else{
		    		var total=Number(data['feesList'][i]['cost20gp'])*Number(data[json2['cost20gp']])+Number(data['feesList'][i]['cost40gp'])*Number(data[json2['cost40gp']])
		    		var fee=`${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost20gp']}*${data[json2['cost20gp']]}+${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost40gp']}*${data[json2['cost40gp']]}=${arrCurrency[data['feesList'][i]['currency']]}${total}`;
		    	}
		    	oDd.innerHTML=`<span class="name fl" localeString='field11'>${data['feesList'][i]['feeTypeEname']}</span>
								<span class="val fr">${fee}</span>
							`;
				oAppend.appendChild(oDd);
			}
		}
		$('#append dd').eq(length-1).addClass('cb');
	    var str='';
	    var total=eval('('+data['total']+')')
	    for(var key in total){
	    	str+=`<b></b><em>${arrCurrency[key]} </em><span>${total[key]}</span>`;
	    }
		$('body').html($('body').html().replace(/\{\{\w+\}\}/g,function(s){
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
	    $('#val').html(str);
	}
	$('#btn').on('touchstart',function(){
		$('#shadow').show();
		return false;
	})
	$('#cancel').on('touchstart',function(){
		$('#shadow').hide();
	});
	$('#confirm').on('touchstart',function(){
		$('#shadow').hide();
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8085/bizCenter/enquiryService/confirmBooking',
			data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+'',
				'enquiryCode':sessionStorage.getItem('enquiryCode'),
				'schemeCode':sessionStorage.getItem('schemeCode'),
			},
			success:function(json){
				console.log(json)
				if(json.retCode==0000){
					if(getCookie('lng')=='CN'){
						$('#hintBox').html('确认方案成功！').show();
					}else{
						$('#hintBox').html('Successful！').show();
					}
					setTimeout(function(){
						$('#hintBox').hide();
						sessionStorage.removeItem('currentData')
						sessionStorage.removeItem('currentScrollT')
						setCookie('nav1Count',1,28);
						open('../02interface/interface.html');
					},700)
				}else{
					if(getCookie('lng')=='CN'){
						$('#hintBox').html('确认方案失败！').show();
					}else{
						$('#hintBox').html('Failure！').show();
					}
					setTimeout(function(){
						$('#hintBox').hide();
					},700)
				}
			},
		})
	})
	$('.shuaxin').on('touchstart',function(){
//		open('../15quotation-project-not/15.html');
 		window.location.reload();
	})
})()
