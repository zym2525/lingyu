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
			console.log(json)
			if(json.retCode==0000){
				fn&&fn(json.schemes);
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
				$('#hintBox').html('修改费用成功！').show();
				setTimeout(function(){
					$('#hintBox').hide();
					open('../02interface/interface.html');
				},700)
				fn&&fn();
			}else{
				$('#hintBox').html('修改费用失败！').show();
				setTimeout(function(){
					$('#hintBox').hide();
				},700)
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