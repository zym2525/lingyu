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
	$('#text3').html('确认拨打')
	$('#shadow1').show();
});
$('#cancel2').on('touchstart',function(){
	$('#shadow1').hide();
});
$('#confirm2').on('touchstart',function(){
	$('#shadow1').hide();
	$('#text3').html('');
	telPhone('18858418480');
});
//电话客户
$('.btn2').on('touchstart',function(){
	getSupplierCompanys(setSupplierCompanys);
	return false;
});
function setSupplierCompanys(arrSupplierCompanys){
	data[2]=[];
	for(var i=0;i<arrSupplierCompanys.length;i++){
		data[2].push({
			'id': arrSupplierCompanys[i]['companyCode'],
			'value': arrSupplierCompanys[i]['companyName'],
		})
	}
	if(getCookie('lng')=='CN'){
		f1='取消';
		f2='完成';
	}else{
		f1='Cancel';
		f2='Complete';
	}
	var Select = new IosSelect(1,
	    [data[2]],
	    {
	        itemShowCount:9,		
	        itemHeight: 0.7,
	        headerHeight: 0.88,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	        	getCompanyInfo(selectOneObj.id,function(telNumber){
	        		telPhone(telNumber);
	        	})
	        }
	});
	
}
$('#exit').on('touchstart',function(){
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
				removeCookie('nav3Count');
				sessionStorage.removeItem('currentData')
				sessionStorage.removeItem('currentScrollT')
				sessionStorage.removeItem('currentData2')
				sessionStorage.removeItem('currentScrollT2')
				sessionStorage.removeItem('currentData3')
				sessionStorage.removeItem('currentScrollT3')
				sessionStorage.removeItem('lengths1')
				sessionStorage.removeItem('lengths2')
				sessionStorage.removeItem('lengths3')
				sessionStorage.removeItem('lengths21')
				sessionStorage.removeItem('lengths22')
				sessionStorage.removeItem('lengths23')
				open('../../CUSTOMER/35login/35.html');
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
});