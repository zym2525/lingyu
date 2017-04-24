//询盘
function getEnquirys(token,enquiryState,currentPage,fn,isBackward){
//	isBackward=isBackward||1;
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
			'schemeStatus':'',
			'enquiryTimeStart':'2010-03-10',
			'enquiryTimeEnd':'2047-03-10',
			'pageSize':pageSize,
			'currentPage':currentPage,
		},
		success:function(json){
			console.log(json)
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
function findByOrder(currentPage,status,fn){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8085/bizCenter/order/findByOrder?accessToken="+getCookie('accessToken'),
		async:true,
		data:JSON.stringify({
			"orderCode": "",
		    "bookingNo": "",
		    "createTimeBegin": "",
		    "createTimeEnd": "",
		    "currentPage": currentPage,
		    "pageSize": orderPageSize,
		    'status':'status',
		}),
		contentType: "application/json; charset=utf-8",
		success:function(json){
			if(json.code==0000){
				console.log(json.data)
				fn&&fn(json.data);
			}
		},
	});
}

//客户公司
function getSupplierCompanys(fn){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8081/userCenter/companyService/getSupplierCompanys",
		async:true,
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				fn&&fn(json.companys);
			}
		},
	});
}
//客户公司电话
function getCompanyInfo(companyCode,fn){
	var t=new Date().getTime();
	$.ajax({
		type:"post",
		url:"http://106.14.251.28:8081/userCenter/companyService/getCompanyInfo",
		async:true,
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'companyCode':companyCode,
		},
		success:function(json){
			if(json.retCode==0000){
				fn&&fn(json['mobileNo']);
			}
		},
	});
}