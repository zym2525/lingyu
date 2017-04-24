function getBasicSchemes(currentPage,fn){
	var str=window.location.search.substring(1);
	var arr=str.split('&');
	var carryCode=arr[2];
	var t=new Date().getTime();
	if(carryCode!='0'){
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8085/bizCenter/schemeService/getBasicSchemes',
			data:{
				'accessToken':getCookie('accessToken'),
				'polCode':arr[0],
				'podCode':arr[1],
				'msgId':t+'',
				'carryCode':carryCode,
				'currentPage':currentPage,
				'pageSize':pageSize,
			},
			success:function(json){
				if(json.retCode==0000){
					fn&&fn(json.schemes,json.num)
				}
			},
		})
	}else{
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8085/bizCenter/schemeService/getBasicSchemes',
			data:{
				'accessToken':getCookie('accessToken'),
				'polCode':arr[0],
				'podCode':arr[1],
				'msgId':t+'',
				'currentPage':currentPage,
				'pageSize':pageSize,
			},
			success:function(json){
				if(json.retCode==0000){
					fn&&fn(json.schemes,json.num)
				}
			},
		})
	}
	
}
