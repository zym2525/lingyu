(function(){
	var oBtn1=document.getElementById('btn1');
	var oBtn2=document.getElementById('btn2');
	var oBtn3=document.getElementById('btn3');
	var oBtn4=document.getElementById('btn4');
	var oBtn5=document.getElementById('btn5');
	var oBtn6=document.getElementById('btn6');
	oBtn1.addEventListener('touchstart',function(){
    	oBtn1.timer=setTimeout(function(){
    		open('../20getEmptyContainers/20.html');
    	},300);
    	oBtn1.addEventListener('touchmove',function(){
    		clearTimeout(oBtn1.timer);
    	},false)
    	return false;
    },false);
	oBtn2.addEventListener('touchstart',function(){
    	oBtn2.timer=setTimeout(function(){
    		open('../21heavyContainerEnterPort/21.html');
    	},300);
    	oBtn2.addEventListener('touchmove',function(){
    		clearTimeout(oBtn2.timer);
    	},false)
    	return false;
    },false);
    oBtn3.addEventListener('touchstart',function(){
    	oBtn3.timer=setTimeout(function(){
    		open('../22scheduledReceipt/22.html');
    	},300);
    	oBtn3.addEventListener('touchmove',function(){
    		clearTimeout(oBtn3.timer);
    	},false)
    	return false;
    },false);
    oBtn4.addEventListener('touchstart',function(){
    	oBtn4.timer=setTimeout(function(){
    		open('../23customsInspection/23.html');
    	},300);
    	oBtn4.addEventListener('touchmove',function(){
    		clearTimeout(oBtn4.timer);
    	},false)
    	return false;
    },false);
    oBtn5.addEventListener('touchstart',function(){
    	oBtn5.timer=setTimeout(function(){
    		open('../24customsRelease/24.html');
    	},300);
    	oBtn5.addEventListener('touchmove',function(){
    		clearTimeout(oBtn5.timer);
    	},false)
    	return false;
    },false);
    oBtn6.addEventListener('touchstart',function(){
    	oBtn6.timer=setTimeout(function(){
    		open('../25heavyContainerShipment/25.html');
    	},300);
    	oBtn6.addEventListener('touchmove',function(){
    		clearTimeout(oBtn6.timer);
    	},false)
    	return false;
    },false);
    $('#arrow').on('touchstart',function(){
    	setCookie('currentCount',2,28);
    	open('../02interface/interface.html');
    });
})()
