$('.selector').each(function(index,ele){
	$(ele).on('touchstart',function(){
		if(getCookie('lng')=='CN'){
			f1='取消';
			f2='完成';
		}else{
			f1='Cancel';
			f2='Complete';
		}
		var dataId = $(ele)[0].dataset['id'];
		var Select = new IosSelect(1, 
		    [data[index]],
		    {
		        oneLevelId: dataId,
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$(ele)[0].querySelector('em').innerHTML=selectOneObj.value;
		        	$(ele)[0].querySelector('em').setAttribute('code',selectOneObj.id);
		        }
		});
	})
})
$('.time_selector').each(function(index,ele){
	$(ele).on('touchend',function(ev){
		if(getCookie('lng')=='CN'){
			f1='取消';
			f2='完成';
		}else{
			f1='Cancel';
			f2='Complete';
		}
		var Select = new IosSelect(3, 
		    [yearData,monthData,dateData],
		    {
		        itemShowCount:7,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		         relation: [1, 1],
		        cssUnit: 'rem',
		        callback: function (selectOneObj,selectTwoObj,selectThreeObj) {
		        	$(ele)[0].innerHTML=`${selectOneObj.value.substring(0,4)}-${toDou(selectTwoObj.value.substring(0,selectTwoObj.value.length-1))}-${toDou(selectThreeObj.value.substring(0,selectThreeObj.value.length-1))}`;
		        }
		});
		return false;
	})
})
