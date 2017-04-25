//互换
$('#exchange').on('touchstart',function(){
	var temp;
	temp=$('#start_box em').html();
	$('#start_box em').html($('#end_box em').html());
	$('#end_box em').html(temp);
	temp=$('#start_box em').attr('code');
	$('#start_box em').attr('code',$('#end_box em').attr('code'));
	$('#end_box em').attr('code',temp);
})
//跳转

//后退
//$('.comeback').on('touchstart',function(){
//	window.history.back();
//})
//选择目的港
$('#end_box').on('touchstart',function(){
	setCookie('local',window.location.href,28)
	open("../04POT/04-1.html");
})
//选择船公司
$('#carrys').on('touchstart',function(){
	getCarrys(setCarrys);
});
function setCarrys(arrCarrys){
	data[1]=[{'id': '0', 'value': ''}];
	for(var i=0;i<arrCarrys.length;i++){
		data[1].push({
			'id': arrCarrys[i]['carryCode'],
			'value': arrCarrys[i]['carryCode'],
		})
	}
}
$('#tel').on('touchstart',function(){
	telPhone($('#tel').html());
});
//获取客户信息
$('footer>div:nth-child(4)').on('touchstart',function(){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8081/userCenter/userService/getUserInfo",
		async:true,
		data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+''
		},
		success:function(json){
			if(json.retCode==0000){
			    $('#userName').html(json['alias']);
			    $('#mobileNo').html(json['mobileNo']);
			    $('#companyName').html(json['companyName']);
			    $('#email').html(json['email']);
			    setCookie('currentCount',0,28);
			  	
			   	isClick($('#change'),function(){
			   		$('#shadow2').show();
					return false;
				});
			}	
		}	
	});
})
//退出
$(document).on('touchstart','#exit',function(){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:true,
		url:'http://106.14.251.28:8081/userCenter/user/logout',
		data:{
			'loginName':getCookie('loginName'),
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'clientId':'123',
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				removeCookie('refreshToken');
				removeCookie('accessToken2');
				removeCookie('accessToken');
				removeCookie('loginName');
				removeCookie('currentCount');
				removeCookie('code');
				removeCookie('port');
				removeCookie('nav1Count');
				removeCookie('nav2Count');
				sessionStorage.removeItem('currentData')
				sessionStorage.removeItem('currentScrollT')
				sessionStorage.removeItem('currentData2')
				sessionStorage.removeItem('currentScrollT2')
				sessionStorage.removeItem('lengths1')
				sessionStorage.removeItem('lengths2')
				sessionStorage.removeItem('lengths3')
				open('../35login/35.html');
			}else{
				if(getCookie('lng')=='CN'){
					$('#hintBox').html('退出失败').show();
				}else{
					$('#hintBox').html('Exit failure').show();
				}
				
				setTimeout(function(){
					$('#hintBox').html('').hide();
				},700)
			}
		},
	});
	return false;
});
// 修改密码
$(document).on('touchstart','#cancel3',function(){
	$('#shadow2').hide();
})
$(document).on('touchstart','#confirm3',function(){
	$('#shadow2').hide();
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8081/userCenter/commonService/unlogin/applyRestPwd',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'loginName':$('#mobileNo').html(),
			'appCode':'dd0557d8-ad20-4f41-a288-6f69862d5362',
			'noticeType':1,
		},
		success:function(json){
			if(json.retCode==0000){
				if(getCookie('lng')=='CN'){
					$('#hintBox').text('已发送邮件！').show();
				}else{
					$('#hintBox').text('E-mail sent！').show();
				}
				setTimeout(function(){
					$('#hintBox').text('').hide()
				},700)
			}else{
				if(getCookie('lng')=='CN'){
					$('#hintBox').text('修改失败！').show();
				}else{
					$('#hintBox').text('Failure！').show();
				}
				setTimeout(function(){
					$('#hintBox').text('').hide()
				},700)
			}
		},
	})
})
//修改邮箱
$(document).on('touchstart','#email',function(){
	$('#shadow').show();
	$('#text2').val('');
	if(getCookie('lng')=='CN'){
		$('#text2').attr('placeholder','请在此输入');
	}else{
		$('#text2').attr('placeholder',' Please enter here');
	}
	
});
$(document).on('touchstart','#cancel1',function(){
	$('#shadow').hide();
});
$(document).on('focus','#text2',function(){
	$('#text2').attr('placeholder','');
});
$(document).on('touchstart','#confirm1',function(){
	$('#email').html($('#text2').val());
	$('#shadow').hide();
});
$(document).on('touchstart','#language_box',function(){
	if(getCookie('lng')=='CN'){
		f1='取消';
		f2='完成';
	}else{
		f1='Cancel';
		f2='Complete';
	}
    var bankId = this.dataset['id'];
    var languageSelect = new IosSelect(1, 
        [dataLng],
        {
            oneLevelId: bankId,
            itemShowCount:9,		
            itemHeight: 0.7,
            headerHeight: 0.88,
            cssUnit: 'rem',
            callback: function (selectOneObj) {
            	setCookie('lng',languageName[Number(selectOneObj.id)],7);
                lng = getCookie('lng');
				$(this).find('span').text(selectOneObj.value)
				setLng();
            }
    });
});
$(document).on('touchstart','#save',function(){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8081/userCenter/userService/updateUserInfo',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'alias':$('#userName').html(),
			'email':$('#email').html(),
			'mobileNo':$('#mobileNo').html(),
		},
		success:function(json){
			if(json.retCode==0000){
				if(getCookie('lng')=='CN'){
					$('#hintBox').text('修改成功！').show();
				}else{
					$('#hintBox').text('successful！').show();
				}
				setTimeout(function(){
					$('#hintBox').text('').hide()
				},700)
			}else{
				if(getCookie('lng')=='CN'){
					$('#hintBox').text('修改失败！').show();
				}else{
					$('#hintBox').text('Failure！').show();
				}
				setTimeout(function(){
					$('#hintBox').text('').hide()
				},700)
			}
		},
	})
});
