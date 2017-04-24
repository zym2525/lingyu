window.onload=function(){
	if(getCookie('refreshToken')==''){
		open("../35login/35.html")
	}else if(getCookie('accessToken')==''){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8081/userCenter/user/refreshToken',
			data:{
				'refreshToken':getCookie('refreshToken'),
				'accessToken':getCookie('accessToken2'),
				'msgId':t+''
			},
			success:function(json){
				if(json.retCode==0000){
					setCookie('accessToken',json.accessToken,7);
					setCookie('accessToken2',json.accessToken,28);
					setCookie('refreshToken',json.refreshToken,28);
					getPorts(getCookie('accessToken'));
					getUserInfo(function(data){
						setCookie('accountType',data.companyType,28);
						switch(data['companyType']){
							case 0:
								open("../02interface/interface.html");
							  break;
							case 1:
								open("../../overseas/02interface/interface.html");
							  break;
							case 2:
								open("../../HQ/02interface/interface.html");
							  break;
							case 3:
								open("../../supplier/02interface/interface.html");
							  break;
						}
					})
				}else{
					alert('登录过期！')
					open("../35login/35.html")
				}
			},
		});
	}else{
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8081/userCenter/user/refreshToken',
			data:{
				'refreshToken':getCookie('refreshToken'),
				'accessToken':getCookie('accessToken'),
				'msgId':t+''
			},
			success:function(json){
				if(json.retCode==0000){
					setCookie('accessToken',json.accessToken,7);
					setCookie('accessToken2',json.accessToken,28);
					setCookie('refreshToken',json.refreshToken,28);
					getPorts(getCookie('accessToken'));
					getUserInfo(function(data){
						setCookie('accountType',data.companyType,28);
						switch(data['companyType']){
							case 0:
								open("../02interface/interface.html");
							  break;
							case 1:
								open("../../overseas/02interface/interface.html");
							  break;
							case 2:
								open("../../HQ/02interface/interface.html");
							  break;
							case 3:
								open("../../supplier/02interface/interface.html");
							  break;
						}
					})
				}else{
					alert('登录超时！')
					open("../35login/35.html")
				}
			},
		});
	}
};
