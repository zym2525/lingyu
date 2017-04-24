$('.sailSelector').each(function(index,ele){
	$(ele).on('touchstart',function(){
		var Select = new IosSelect(1, 
		    [data],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$(ele).siblings('.val')[0].innerHTML=selectOneObj.value;
		        }
		});
	})
})
$('.time_selector').each(function(index,ele){
		isClick($(ele),function(){
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
$('.currencys').on('touchstart',function(){
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
$('#unit').on('touchstart',function(){
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
		        }
		});
	})
$('#carrys').on('touchstart',function(){
		var Select = new IosSelect(1, 
		    [arrCarrys],
		    {
		        itemShowCount:9,		
		        itemHeight: 0.7,
		        headerHeight: 0.88,
		        cssUnit: 'rem',
		        callback: function (selectOneObj) {
		        	$('#carrys').siblings('.val').text(selectOneObj.value);
		        	$('#carrys').siblings('.val').attr('code',selectOneObj.id);
		        }
		});
	})

$('#potBtn').on('touchstart',function(){
	setCookie('local',window.location.href,28);
	open('../04POT/04-1.html');
});
