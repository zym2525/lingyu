(function(){
	getSchemeInfo(setSchemeInfo);
//	getEnquiryInfo(setEnquiryInfo);
	$('.arrow').on('touchstart',function(){
		open('../02interface/interface.html');
	})
//	function setEnquiryInfo(data){
//		$('#enquiryCode').html(sessionStorage.getItem('enquiryCode'));
//		$('body').html($('body').html().replace(/\$\$\w+\$\$/g,function(s){
//	        s = s.substring(2, s.length-2);
//	        return data[s];
//	    }));
//	}
	function setSchemeInfo(data){
		$('#enquiryCode').html(sessionStorage.getItem('enquiryCode'));
		$('#unit').html(arrHyfCurrency[data['feesList'][0]['currency']]);
		$('#hyf li').each(function(index,ele){
	    	$(ele).html($(ele).html().replace(/\{\{\w+\}\}/g,function(s){
		        s = s.substring(2, s.length-2);
		       	if(data['feesList'][0][s]){
		        	return data['feesList'][0][s];
		        }else{
		        	return '--';
		        }
		    }));
	    })
		var oAppend=document.getElementById('append');
	    for(var i=1;i<data['feesList'].length;i++){
	    	var oDd=document.createElement('dd');
	    	if(i==data['feesList'].length-1){
	    		oDd.className='clearfix cb';
	    	}else{
	    		oDd.className='clearfix';
	    	}
	    	oDd.innerHTML=`<span class="name fl" localeString='field11'>${data['feesList'][i]['feeTypeEname']}</span>
							<span class="val fr">${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['orderPrice']}</span>
						`;
			oAppend.appendChild(oDd);
	    }
	    var str='';
	    for(var key in data['total']){
	    	str+=`<b></b><em>${arrCurrency[key]}</em><span>${data['total'][key]}</span>`;
	    }
		$('body').html($('body').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        return data[s];
	    }));
	    $('#val').html(str);
	}
	$('#btn').on('touchstart',function(){
		$('#shadow').show();
		$('#cancel').on('touchstart',function(){
			$('#shadow').hide();
		});
		$('#confirm').on('touchstart',function(){
			$('#shadow').hide();
			
		})
	})
	$('.shuaxin').on('touchstart',function(){
		open('../15quotation-project-not/15.html');
	})
})()
