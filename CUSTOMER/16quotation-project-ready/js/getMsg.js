(function(){
	getSchemeInfo(setSchemeInfo);
	$('.arrow').on('touchstart',function(){
		window.history.back();
	})
	function setSchemeInfo(data){
		var oAppend=document.getElementById('append');
		sessionStorage.setItem('orderCode',data['orderCode'])
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
		setCookie('currentCount',2,28);
		open('../18Logistics-visualization-detail/18.html');
		return false;
	})
})()
