(function(){
	var oUser=document.querySelector('.user');
	var oPassword=document.querySelector('.password');
	userLoad(oUser);
	userLoad(oPassword);
})()
function userLoad(ele){
	var oInput=ele.querySelector('input');
	var oSpan=ele.querySelector('span');
	oInput.onfocus=function(){
		hide(oSpan);
	};
	oSpan.addEventListener('touchstart',function(){
		oInput.focus();
	},false);
	oInput.onblur=function(){
		if(oInput.value==''){
			show(oSpan);
		}
	}
}
function hide(ele){
	ele.style.display='none';
}
function show(ele){
	ele.style.display='block';
}
//登录
(function(){
//	hint();
	if(!getCookie('lng')){
		setCookie('lng','CN',28);
	}
	var oUser=$('.user input');
	var oPassword=$('.password input');
	var bSin=false;
	$('#btn').on('touchstart',function(){
		if(bSin){
			return;
		}
		bSin=true;
		if(oUser.val()==''&&oPassword.val()==''){
			$('#hint').html(langText[getCookie('lng')||'CN']['user_p']);
			hint();
			bSin=false;
		}else if(oUser.val()==''){
			console.log(2)
			$('#hint').html(langText[getCookie('lng')||'CN']['user']);
			hint();
			bSin=false;
		}else if(oPassword.val()==''){
			console.log(2)
			$('#hint').html(langText[getCookie('lng')||'CN']['password2']);
			hint();
			bSin=false;
		}else{
			if(getCookie('lng')=='CN'){
				$('#hint').text('正在登录!');
			}else{
				$('#hint').text('LOADING!');
			}
			$('#hint').show().css('margin-left',-Number($('#hint').width())/2);
//			alert('正在登录!')
			var t=new Date().getTime();
//			var p=oPassword.val();
//			hex_md5(p).substring(8,24);
//			AndroidWebView.showInfoFromJs()
			setTimeout(function(){
				$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8081/userCenter/user/login',
				data:{
					'loginName':oUser.val(),
					'password':oPassword.val(),
					'appCode':'dd0557d8-ad20-4f41-a288-6f69862d5362',
					'deviceCode':'app:00-E0-70-5A-32-91',
					'msgId':t+'',
				},
				success:function(json){
					if(json.retCode==0000){
						if(!getCookie('lng')){
							setCookie('lng','CN',28);
						}
						setCookie('accessToken',json.accessToken,7);
						setCookie('accessToken2',json.accessToken,28);
						setCookie('refreshToken',json.refreshToken,28);
						setCookie('accountType',json['accountType'],7);
						setCookie('loginName',oUser.val(),30);
						getPorts(json.accessToken);
						$('#hint').html('');
						$('#hint').hide();
						oUser.val('');
						oPassword.val('');
						switch(json['accountType']){
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
						bSin=false;
					}else{
						$('#hint').html(json.retMsg);
						hint();
						bSin=false;
					}
				},
			});
			},2)
		}
		return false;
	});
	function hint(){
		$('#hint').show().css('margin-left',-Number($('#hint').width())/2);
		setTimeout(function(){
			$('#hint').hide();
			bSin=false;
		},700);
	}
	$('#forget').on('touchstart',function(){
//		open("../36forgetPassword/36.html");
		return false;
	})
})();
//拿港口

