(function(){
	var oGetCode=document.getElementById('getCode');
	var oCount=document.getElementById('count');
	var count=60;
	var timer=null;
	oGetCode.addEventListener('touchstart',function(){
		oGetCode.style.display='none';
		oCount.style.display='block';
		clearInterval(timer);
		clock();
		timer=setInterval(clock,1000);
		function clock(){
			count--;
			if(count==0){
				clearInterval(timer);
				oGetCode.style.display='block';
				oCount.style.display='none';
			}
			oCount.innerHTML=`${count}秒`;
		}
	},false);
})()
