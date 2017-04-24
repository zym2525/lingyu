var oTimerSel=document.querySelector('.time_selector');
oTimerSel.addEventListener('touchstart',function (){
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
	        	oTimerSel.innerHTML=`${selectOneObj.value.substring(0,4)}-${toDou(selectTwoObj.value.substring(0,selectTwoObj.value.length-1))}-${toDou(selectThreeObj.value.substring(0,selectThreeObj.value.length-1))}`;
	        }
	});
},false);
