
(function(){
	var oUser=document.querySelector('.user');
//	var oRetCode=document.querySelector('.retCode');
//	var oNewPassword=document.querySelector('.newPassword');
//	var oRePassword=document.querySelector('.rePassword');
	userLoad(oUser);
//	userLoad(oRetCode);
//	userLoad(oNewPassword);
//	userLoad(oRePassword);
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
$('.confirm').on('touchstart',function(){
	alert(1)
	if($('.user input').val()==''){
		$('#hint').html('请输入账号！')
		hint();
	}else{
		$('.user input').val()='';
		open("../35login/35.html");
	}
//	
})
//登录
//(function(){
//	var oUser=$('.user input');
//	var oPassword=$('.retCode input');
//	var oNewPassword=$('.newPassword input');
//	var oRePassword=$('.rePassword input');
//	$('.confirm').click(function(){
//		if(oUser.val()==''&&oPassword.val()==''){
//			$('#hint').html('请输入账户和验证码！');
//			hint();
//		}else if(oUser.val()==''){
//			$('#hint').html('请输入账户！');
//			hint();
//		}else if(oPassword.val()==''){
//			$('#hint').html('请输入验证码！');
//			hint();
//		}else if(oNewPassword.val()==''){
//			$('#hint').html('请输入新密码！');
//			hint();
//		}else if(oRePassword.val()==''){
//			$('#hint').html('请确认密码！');
//			hint();
//		}else{
//			var t=new Date().getTime();
//			$.ajax({
//				type:'POST',
//				async:false,
//				url:'http://120.26.95.49:8081/userCenter/user/login',
//				data:{
//					'loginName':oUser.val(),
//					'password':hex_md5(oPassword.val()),
//					'appCode':'dd0557d8-ad20-4f41-a288-6f69862d5362',
//					'clientId':'dd0557d8-ad20-4f41-a288-6f6986225362',
//					'msgId':t+''
//				},
//				dataType:'json',
//				success:function(json){
//					if(json.retCode==0000){
//						alert('成功')
//					}else{
//						$('#hint').html(json.retMsg);
//						hint();
//					}
//				},
//			});
//		}
//	})
	function hint(){
		$('#hint').show();
		setTimeout(function(){
			$('#hint').hide();
		},1000);
	}
//})()