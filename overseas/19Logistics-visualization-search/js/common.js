$(function(){
	var startDate='';
	var endDate='';
	var customCode='';
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	getCustomCompanys(function(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i]['companyName']!='system公司'){
				data[1].push({
					'id': arr[i]['companyCode'], 
					'value': arr[i]['companyName']
				})
			}
		}
	})
	//模糊查客户
	$('#text2 input,#text2 .s1').on('touchstart',function(){
		if(getCookie('lng')=='CN'){
			f1='取消';
			f2='完成';
		}else{
			f1='Cancel';
			f2='Complete';
		}
		var Select = new IosSelect(1, 
		    [data[1]],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$('#text2 input').val(selectOneObj.value).attr('customCode',selectOneObj.id);
		        	if($('#text2 input').val()){
		        		$('#text2 .s1').hide();
		        	}
		        }
		});
	})
	
	$('#btn1').on('touchstart',function(){
		if($('#startDate').html()!='起始时间'&&$('#startDate').html()!='Begin Time'){
			startDate=$('#startDate').html();
		}
		if($('#endDate').html()!='结束时间'&&$('#endDate').html()!='End Time'){
			endDate=$('#endDate').html();
		}
//		if($('#customerName').val()==''&&$('#orderCode').val()==''&&$('#mbl').val()==''){
//			$('#hintBox').html('请填写客户名称或订单号或提单号！').show();
//			setTimeout(function(){
//				$('#hintBox').hide();
//			},700)
//		}else{
			var t=new Date().getTime();
			$.ajax({
				type:"post",
				url:"http://106.14.251.28:8085/bizCenter/order/findByOrder?accessToken="+getCookie('accessToken'),
				async:true,
				data:JSON.stringify({
					"orderCode": $('#orderCode').val(),
				    "bookingNo": $('#mbl').val(),
				    "customCode": $('#customerName').attr('customCode')||'',
				    "createTimeBegin": startDate,
				    "createTimeEnd": endDate,
				    'status':'0,1',
				}),
				contentType: "application/json; charset=utf-8",
				success:function(json){
					console.log(json)
					if(json.code==0000){
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('搜索成功！').show();
						}else{
							$('#hintBox').html('successful！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
							if(json.data){
								sessionStorage.setItem('dataNodes',JSON.stringify(json.data));
							}
							sessionStorage.removeItem('currentData2')
							sessionStorage.removeItem('currentScrollT2')
							window.history.back();
						},700)
					}else{
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('搜索失败！').show();
						}else{
							$('#hintBox').html('failure！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
						},700)
					}
				},
			})
//		}
		return false;
	})
	function getCustomCompanys(fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:'http://106.14.251.28:8081/userCenter/companyService/getCustomCompanys',
			data:{
				'accessToken':getCookie('accessToken'),
				'msgId':t+'',
			},
			success:function(json){
				console.log(json)
				if(json.retCode==0000){
					fn&&fn(json.companys);
				}
			},
		})
	}
})
