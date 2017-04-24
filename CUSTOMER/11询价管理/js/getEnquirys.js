function getEnquirys(token,enquiryState,fn,isBackward){
	isBackward=isBackward||1;
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys',
		data:{
			'accessToken':token,
			'enquiryState':enquiryState,
			'msgId':t+'',
			'isBackward':isBackward,
		},
		success:function(json){
			if(json.retCode==0000){
				alert('拿到询盘')
				var allEnquirys=eval(json.enquirys)
				fn&&fn(allEnquirys)
//				console.log(json.enquirys)
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}
