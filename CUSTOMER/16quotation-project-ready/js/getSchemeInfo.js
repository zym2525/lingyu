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
				fn&&fn(json.schemes);
			}
		},
	})
}
