$(function(){
//	var oBtn=document.getElementById('btn');
//	
//	oBtn.addEventListener('touchstart',function(){
//		
//	},false)
	var data=JSON.parse(sessionStorage.getItem('schemes'));
	console.log(data)
	setCookie('schemeCode',data.schemeCode);
	$('#hyfCurrency').html(arrHyfCurrency[data['feesList'][0]['currency']]);
	var oAppend=document.getElementById('append');
	for(var i=0;i<data['feesList'].length;i++){
		if(data['feesList'][i]['feeTypeNum']=='0'){
			$('.price').each(function(index,ele){
		    	$(ele).html($(ele).html().replace(/\{\{\w+\}\}/g,function(s){
			        s = s.substring(2, s.length-2);
			       	if(data['feesList'][i][s]){
			        	return data['feesList'][i][s];
			        }else{
			        	return '--';
			        }
			    }));
		    })
		}else{
			var oDd=document.createElement('dd');
			if(i==data['feesList'].length-1){
	    		oDd.className='clearfix cb';
	    	}else{
	    		oDd.className='clearfix';
	    	}
	    	if(data['feesList'][i]['byOrder']=='1'){
	    		oDd.innerHTML=`<span class="name fl">${data['feesList'][i]['feeTypeEname']}</span>
					<span class="val fr">${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['orderPrice']}</span>
				`;
	    	}else{
	    		oDd.innerHTML=`<span class="name fl">${data['feesList'][i]['feeTypeEname']}</span>
	    		<span class="val fr">+${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost40gp']}*<span class='num2'>0</span></span>
	    		<span class="val fr">${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost20gp']}*<span class='num1'>0</span></span>
	    		`;
	    		if(data['feesList'][i]['cost20gp']){
	    			$(oDd).find('.num1').text('1')
	    		}
	    		if(data['feesList'][i]['cost40gp']){
	    			$(oDd).find('.num2').text('1')
	    		}
	    	}
			oAppend.appendChild(oDd);
		}
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
    $('#tel').on('touchstart',function(){
		telPhone($('#tel').html());
	});
    $('#btn').on('touchstart',function(){
    	$('#btn').css('pointer-events','none');
    	setTimeout(function(){$('#btn').css('pointer-events','all')},350);
		open('../09Detailed-inquiry/09.html');
	});
	$('.arrow').on('touchstart',function(){
		$('.arrow').css('pointer-events','none');
    	setTimeout(function(){$('.arrow').css('pointer-events','all')},350);
		window.history.back();
	})
})