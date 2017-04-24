$(function(){
	var startDate='';
	var endDate='';
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	$('#btn1').on('touchstart',function(){
		if($('#startDate').html()!='起始时间'&&$('#startDate').html()!='Begin Time'){
			startDate=$('#startDate').html();
		}
		if($('#endDate').html()!='结束时间'&&$('#endDate').html()!='End Time'){
			endDate=$('#endDate').html();
		}
//		if($('#orderCode').val()==''&&$('#mbl').val()==''){
//			$('#hintBox').html('请填写订单号或提单号！').show();
//			setTimeout(function(){
//				$('#hintBox').hide();
//			},700)
//		}else{
			var t=new Date().getTime();
			$.ajax({
				type:'POST',
				async:false,
				url:"http://106.14.251.28:8085/bizCenter/order/findByOrder?accessToken="+getCookie('accessToken'),
				data:JSON.stringify({
					"orderCode": $('#orderCode').val(),
		    		"mbl": $('#mbl').val(),
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
})
