//询盘
function getEnquirys(token,enquiryState,currentPage,fn,isBackward,schemeStatus){
	isBackward=isBackward||1;
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquirys',
		data:{
			'accessToken':token,
			'enquiryStatus':enquiryState,
			'msgId':t+'',
			'isBackward':isBackward,
			'schemeStatus':schemeStatus,
			'enquiryTimeStart':'2010-03-10',
			'enquiryTimeEnd':'2047-03-10',
			'currentPage':currentPage,
			'pageSize':pageSize,
		},
		success:function(json){
			if(json.retCode==0000){
				var allEnquirys=eval(json.enquirys)
				fn&&fn(allEnquirys,json.num);
			}
		},	
	})
}
//拿船公司
function getCarrys(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/carryService/getCarrys',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				var arrCarrys=eval(json.carrys);
				fn&&fn(arrCarrys)
			}
		},
	})
}
//全程跟踪
function getNewNodes(fn){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8085/bizCenter/logisticalInfoService/getNewNodes",
		async:true,
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				fn&&fn(json.nodes);
			}
		},
	});
}
