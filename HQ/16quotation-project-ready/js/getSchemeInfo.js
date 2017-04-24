//拿运价方案
function getSchemesByEnquiryCode(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/schemeService/getSchemesByEnquiryCode',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'enquiryCode':sessionStorage.getItem('enquiryCode'),
		},
		success:function(json){
			if(json.retCode==0000){
				console.log(json)
				fn&&fn(json.schemes);
			}
		},
	})
}
