//拿全部港口
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
		},
		success:function(json){
			if(json.retCode==0000){
				alert('拿到港口')
				console.log(json.ports)
				sessionStorage.setItem('ports',json.ports)
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}
//拿热门港口
function getHotPorts(token){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/portService/getPorts',
		data:{
			'accessToken':token,
			'isHot':1,
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				alert('拿到热门港口')
				console.log(json.ports)
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}