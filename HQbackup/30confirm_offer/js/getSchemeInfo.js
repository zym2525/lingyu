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
				var oSchemes=eval('('+json.schemes+')');
				localStorage.setItem('oSchemes',json.schemes);
				console.log(oSchemes)
				fn&&fn(oSchemes);
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}
//询盘详细信息
//function getEnquiryInfo(fn){
//	var t=new Date().getTime();
//	$.ajax({
//		type:'POST',
//		async:false,
//		url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquiryInfo',
//		data:{
//			'accessToken':getCookie('accessToken'),
//			'msgId':t+'',
//			'enquiryCode':sessionStorage.getItem('enquiryCode'),
//		},
//		success:function(json){
//			if(json.retCode==0000){
////				alert('拿到询盘详细信息')
////				var oSchemes=eval('('+json.schemes+')');
////				console.log(json)
//				localStorage.setItem('EnquiryInfo',json);
//				fn&&fn(json);
//			}else{
//				alert('没拿到')
//				console.log(json)
//			}
//		},
//	})
//}