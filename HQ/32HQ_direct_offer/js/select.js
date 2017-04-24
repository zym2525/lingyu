$('.sailSelector').each(function(index,ele){
	isClick($(ele),function(ele){
		if(getCookie('lng')=='CN'){
			f1='取消';
			f2='完成';
		}else{
			f1='Cancel';
			f2='Complete';
		}
		var Select = new IosSelect(1, 
		    [data],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	ele.find('.val')[0].innerHTML=selectOneObj.value;
		        }
		});
	})
})
$('.time_selector').each(function(index,ele){
	isClick($(ele),function(){
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
		        	$(ele).find('.val')[0].innerHTML=`${selectOneObj.value.substring(0,4)}-${toDou(selectTwoObj.value.substring(0,selectTwoObj.value.length-1))}-${toDou(selectThreeObj.value.substring(0,selectThreeObj.value.length-1))}`;
		        }
		});
	})
})
isClick($('.currencys'),function(){
	if(getCookie('lng')=='CN'){
		f1='取消';
		f2='完成';
	}else{
		f1='Cancel';
		f2='Complete';
	}
	var _this=this;
	var Select = new IosSelect(1, 
	    [currencys],
	    {
	        itemShowCount:9,		
	        itemHeight: 0.7,
	        headerHeight: 0.88,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	        	$(_this).text(selectOneObj.value);
	        	$(_this).siblings('.currencys').text(selectOneObj.value);
	        	$(_this).parent().parent().attr('currenys',selectOneObj.id);
	        	toTotalAll();
	        	toTotalFeesAll();
	        	toProfit();
	        }
	});
})

isClick($('#unit'),function(){
	var Select = new IosSelect(1, 
	    [currencys],
	    {
	        itemShowCount:9,		
	        itemHeight: 0.7,
	        headerHeight: 0.88,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	        	$('#unit').text(arrHyfCurrency[selectOneObj.id]);
	        	$('#unit').attr('currency',selectOneObj.id);
	        	$('#hyf em').text(selectOneObj.value);
	        	toTotalAll();
	        	toTotalFeesAll();
	        	toProfit();
	        }
	});
})

isClick($('#carrys'),function(){
	var Select = new IosSelect(1, 
	    [arrCarrys],
	    {
	        itemShowCount:9,		
	        itemHeight: 0.7,
	        headerHeight: 0.88,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	        	console.log(selectOneObj.value,selectOneObj.id)
	        	$('#carrys').find('.val').text(selectOneObj.value);
	        	$('#carrys').find('.val').attr('code',selectOneObj.id);
	        }
	});
})

isClick($('#potBtn'),function(){
	setCookie('local',window.location.href,28);
	open('../04POT/04-1.html');
})
