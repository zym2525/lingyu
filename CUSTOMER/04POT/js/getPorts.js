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
				sessionStorage.setItem('ports',json.ports)
			}
		},
	})
}
//拿热门港口
function getHotPorts(token,fn){
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
				var hot=eval(json.ports);
				fn&&fn(hot);
			}
		},
	})
}
//模糊查询

function fuzzySearch(token,str,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/portService/fuzzySearch',
		data:{
			'accessToken':token,
			'codeHeader':str,
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				var hot=eval(json.ports);
				fn&&fn(hot[0]['portCode']);
			}
		},
	})
}