var oTimerSel=document.querySelector('.time_selector');
oTimerSel.addEventListener('touchstart',function (){
	var Select = new IosSelect(3, 
	    [yearData,monthData,dateData],
	    {
	        itemShowCount:7,		
	        itemHeight: 0.7,
	        headerHeight: 0.88,
	        cssUnit: 'rem',
	        callback: function (selectOneObj,selectTwoObj,selectThreeObj) {
	        	oTimerSel.innerHTML=`${selectOneObj.value.substring(0,4)}-${selectTwoObj.value.substring(0,selectTwoObj.value.length-1)}-${selectThreeObj.value.substring(0,selectThreeObj.value.length-1)}`;
	        }
	});
},false);
$('.selector').each(function(index,ele){
	$(ele).on('touchstart',function(){
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
		        }
		});
	})
})
