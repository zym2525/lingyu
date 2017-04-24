//拿运价方案
function getSchemeInfo(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/schemeService/getSchemeTotalInfo',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'schemeCode':sessionStorage.getItem('schemeCode'),
		},
		success:function(json){
			if(json.retCode==0000){
				console.log(json)
				fn&&fn(json.schemes);
			}
		},
	})
}
function getEnquiryInfo(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/enquiryService/getEnquiryInfo',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'enquiryCode':sessionStorage.getItem('enquiryCode'),
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				fn&&fn(json);
			}
		},
	})
}
//模糊查客户
function fzCustomCompany(str,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8081/userCenter/companyService/fzSupplierCompany',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'companyCode':str,
		},
		success:function(json){
			console.log(json)
			if(json['retCode']=='0000'){
				fn&&fn(json.companys);
			}
			
		},
	})
}
//费项列表
function fzFeeTypes(str,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/feeService/fzFeeTypes',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'feeTypeCode':str,
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				fn&&fn(json);
			}
		},
	})
}
//获取币制信息
function getCurrencys(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/simpleDataService/getCurrencys',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				fn&&fn(eval(json.currencys));
			}
		},
	})
}
//模糊查供应商公司
function fzSupplierCompany(str,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8081/userCenter/companyService/fzSupplierCompany',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'companyCode':str,
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				fn&&fn(json.companys);
			}else{
				$('.companyBox .s2').text('无此客户！')
				setTimeout(function(){
					$('.companyBox .s2').text('').hide();
				},700)
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
				console.log(json.carrys)
				var arrCarrys=eval(json.carrys);
				fn&&fn(arrCarrys)
			}
		},
	})
}
