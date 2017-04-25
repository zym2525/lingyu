//拿运价方案
function getSchemeInfo(fn){
	var t=new Date().getTime();
	//sessionStorage.getItem('schemeCode')
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/schemeService/getSchemeInfo',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'schemeCode':'schemeUUID2',
		},
		success:function(json){
			if(json.retCode==0000){
				console.log(json)
				fn&&fn(json.schemes);
			}
		},
	})
}
