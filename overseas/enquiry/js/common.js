(function(){
	$('#arrow').on('touchstart',function(){
		sessionStorage.removeItem('enquiry');
		open('../02interface/interface.html');
	});
	var data=eval('('+sessionStorage.getItem('enquiry')+')');
	console.log(data)
	$('#pol').text(data['polName']);
	$('#pod').text(data['podName']);
	$('#carry').text(data['carryCode']||'全部');
	$('#expectDate').text(data['elements']['expectDate']);
	$('#remark').val(data['elements']['remark']);
	$('.num').html($('.num').html().replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        if(data['elements'][s]&&data['elements'][s]!='0'){
        	return data['elements'][s];
        }else{
        	return '0';
        }
    }))
	$('#btn').on('touchstart',function(){
		if(getCookie('lng')=='CN'){
			f1='取消';
			f2='完成';
		}else{
			f1='Cancel';
			f2='Complete';
		}
		var Select = new IosSelect(1, 
		    [conpanyArr],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	var t=new Date().getTime();
					$.ajax({
						type:'POST',
						async:false,
						url:'http://106.14.251.28:8085/bizCenter/enquiryService/backwardEnquiry',
						data:{
							'accessToken':getCookie('accessToken'),
							'msgId':t+'',
							'enquiryCode':data['enquiryCode'],
							'destcompanycode':selectOneObj.id,
						},
						success:function(json){
							console.log(json)
							if(json.retCode==0000){
								if(getCookie('lng')=='CN'){
									$('#hintBox').html('询价成功！').show();
								}else{
									$('#hintBox').html('Inquiry success！').show();
								}
								setTimeout(function(){
									setCookie('nav1Count',1,28);
									sessionStorage.removeItem('currentData')
									sessionStorage.removeItem('currentScrollT')
									sessionStorage.removeItem('enquiry');
									$('#hintBox').hide();
									open('../02interface/interface.html');
								},700)
							}else{
								if(getCookie('lng')=='CN'){
									$('#hintBox').html('询价失败！').show();
								}else{
									$('#hintBox').html('Inquiry failed！').show();
								}
								setTimeout(function(){
									$('#hintBox').hide();
								},700)
							}
						},
					})
		        }
		});
		
	})
})()