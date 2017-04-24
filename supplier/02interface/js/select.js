$('.selector').each(function(index,ele){
	$(ele).on('touchstart',function(){
		if(getCookie('lng')=='CN'){
			f1='取消';
			f2='完成';
		}else{
			f1='Cancel';
			f2='Complete';
		}
		var Select = new IosSelect(1, 
		    [data[index]],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$(ele)[0].querySelector('em').innerHTML=selectOneObj.value;
		        	$(ele)[0].querySelector('em').setAttribute('code',selectOneObj.id);
		        	if(selectOneObj.value!=''){
		        		$(ele)[0].querySelector('#companyBox').innerHTML='';
		        	}else{
		        		if(getCookie('lng')=='CN'){
							$(ele)[0].querySelector('#companyBox').innerHTML='选择船公司';
						}else{
							$(ele)[0].querySelector('#companyBox').innerHTML='CARRIER';
						}
		        	}
		        }
		});
	})
})
//$('#carrys').on('touchend',function(){
//	if($('#carrysName').html()!=''){
//		$('#companyBox').html()=='';
//	}
//})
