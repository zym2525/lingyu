//拿运价方案
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
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}
//模糊查费项列表
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
//费项列表
function getFeeTypes(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/feeService/getFeeTypes',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			console.log(json)
			if(json.retCode==0000){
				fn&&fn(json.types);
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
			}else{
				alert('没拿到')
				console.log(json)
			}
		},
	})
}
//模糊查询船信息
function fsVessel(str,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/simpleDataService/fsVessel',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'vesselHeader':str,
		},
		success:function(json){
			if(json.retCode==0000){
				fn&&fn(eval(json.vessels));
			}else{
				$('.fuzzy .view').empty();
				var oLi=$('<li class="item"><span></span></li>');
				oLi.find('span').text('无此船');
				$('.fuzzy .view').append(oLi);
				setTimeout(function(){
					$('.fuzzy .view').empty();
				},1000)
			}
			
		},
	})
}
//模糊查询航次信息
function fsVessel(str,fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8085/bizCenter/simpleDataService/fsVoyage',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
			'voyageHeader':str,
		},
		success:function(json){
			if(json.retCode==0000){
				fn&&fn(eval(json.vessels));
			}else{
				$('.fuzzy .view').empty();
				var oLi=$('<li class="item"><span></span></li>');
				oLi.find('span').text('无此船');
				$('.fuzzy .view').append(oLi);
				setTimeout(function(){
					$('.fuzzy .view').empty();
				},1000)
			}
			
		},
	})
}