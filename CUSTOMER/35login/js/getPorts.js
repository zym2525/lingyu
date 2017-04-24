//拿港口
function getPorts(token){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/portService/getPorts',
		data:{
			'accessToken':token,
			'isHot':0,
			'msgId':t+'',
			'currentPage':0,
			'pageSize':0,
		},
		success:function(json){
			if(json.retCode==0000){
				sessionStorage.setItem('ports',json.ports);
			}
		},
	})
}
