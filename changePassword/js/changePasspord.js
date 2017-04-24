(function(){
	$('#confirm').on('touchstart',function(){
		if($('#oldPassword').val()==''){
			$('#hint').html('请输入原密码！');
			hint();
		}else if($('#newPassword').val()==''){
			$('#hint').html('请输入新密码！');
			hint();
		}else if($('#newPassword').val()!=$('#rePassword').val()){
			$('#hint').html('请确认密码！');
			hint();
		}else if($('#email').val()==''){
			$('#hint').html('请输入邮箱！');
			hint();
		}else{
			var t=new Date().getTime();
			$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8081/userCenter/userService/updatePwd',
				data:{
					'password':$('#newPassword').val(),
					'oldPwd':$('#oldPassword').val(),
					'accessToken':getCookie('accessToken2'),
					'msgId':t+''
				},
				success:function(json){
					if(json.retCode==0000){
						$('#hint').html('密码修改成功！');
						hint();
						setTimeout(function(){
							window.history.back();
						},1000);
					}else{
						$('#hint').html('请输入正确的信息！');
						hint();
						console.log(json)
					}
				},
			});
		}
	});
	function hint(){
		$('#hint').show();
		setTimeout(function(){
			$('#hint').hide();
		},1000);
	}
})()
	

