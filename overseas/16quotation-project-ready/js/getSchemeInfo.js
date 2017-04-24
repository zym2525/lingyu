//拿运价方案
function getSchemeInfo(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/schemeService/getSchemeInfo',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'schemeCode':sessionStorage.getItem('schemeCode'),
		},
		success:function(json){
			if(json.retCode==0000){
//				alert('拿到运价方案')
//				var oSchemes=eval('('+json.schemes+')');
//				localStorage.setItem('oSchemes',json.schemes);
				console.log(json)
				fn&&fn(json.schemes);
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}
//修改费用
function updateFees(fees,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/feeService/batchUpdateFee',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'schemeCode':sessionStorage.getItem('schemeCode'),
			'fees':fees,
		},
		success:function(json){
			if(json.retCode==0000){
				console.log(json)
				fn&&fn();
			}
		},
	})	
}
//确认运价方案
function forwardScheme(){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/schemeService/forwardScheme',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'schemeCode':sessionStorage.getItem('schemeCode'),
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				$('#hintBox').html('确认方案成功！').show();
				setTimeout(function(){
					$('#hintBox').hide();
					open('../02interface/interface.html');
				},700)
			}else{
				$('#hintBox').html('确认方案失败！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
			}
		},
	})	
}