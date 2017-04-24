function getNodesByOrder(fn){
	var t=new Date().getTime();
	sessionStorage.getItem('orderCode');
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/logisticalInfoService/getNodesByOrder',
		data:{
			'orderCode':sessionStorage.getItem('orderCode'),
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				sessionStorage.setItem('nodes',json.nodes);
				fn&&fn(json)
			}
		},
	})
}

