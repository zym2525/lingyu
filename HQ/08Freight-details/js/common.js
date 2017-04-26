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
    
    $('#btn').on('touchstart',function(){
//  	$('#btn').css('pointer-events','none');
//  	setTimeout(function(){$('#btn').css('pointer-events','all')},350);
//  	getSupplierCompanys(setSupplierCompanys);
		open('../02interface/interface.html');
		return false;
	});
	$('.arrow').on('touchstart',function(){
		$('.arrow').css('pointer-events','none');
    	setTimeout(function(){$('.arrow').css('pointer-events','all')},350);
		window.history.back();
	})
})
//客户公司
function getSupplierCompanys(fn){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8081/userCenter/companyService/getSupplierCompanys",
		async:true,
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
	});
}
//客户公司电话
function getCompanyInfo(companyCode,fn){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8081/userCenter/companyService/getCompanyInfo",
		async:true,
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'companyCode':companyCode,
		},
		success:function(json){
			console.log(json['mobileNo'])
			if(json.retCode==0000){
				fn&&fn(json['mobileNo']);
			}
		},
	});
}
function setSupplierCompanys(arrSupplierCompanys){
	dataPhone=[];
	for(var i=0;i<arrSupplierCompanys.length;i++){
		dataPhone.push({
			'id': arrSupplierCompanys[i]['companyCode'],
			'value': arrSupplierCompanys[i]['companyName'],
		})
	}
	if(getCookie('lng')=='CN'){
		f1='取消';
		f2='完成';
	}else{
		f1='Cancel';
		f2='Complete';
	}
	var Select = new IosSelect(1,
	    [dataPhone],
	    {
	        itemShowCount:9,		
	        itemHeight: 0.7,
	        headerHeight: 0.88,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	        	getCompanyInfo(selectOneObj.id,function(telNumber){
	        		telPhone(telNumber);
	        	})
	        }
	});
	
}