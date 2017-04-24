(function(){
//	var oSort=document.querySelector('#sort');
//	var oList=document.querySelector('#list');
//	oSort.addEventListener('touchstart',function(){
//		oList.classList.toggle('show');
//	},false);
	$('#sort').on('touchstart',function(){
		if($('#list').css('display')=='block'){
			$('#list').hide();
		}else{
			$('#list').show();
		}
	});
	$('.arrow').on('touchstart',function(){
		sessionStorage.removeItem('currentData');
		sessionStorage.removeItem('scrollT');
		window.history.back();
	});
	$('#list li:first-child').on('touchstart',function(){
		arrSection.sort(function(oSection1,oSection2){
			return Number(oSection1.getAttribute('cost20gp'))-Number(oSection2.getAttribute('cost20gp'));
		});
		$('.content').scrollTop(0);
		putBasicSchemes();
		setTimeout(function(){
			$('#list').hide();
		},300);
	});
	$('#list li:nth-child(2)').on('touchstart',function(){
		arrSection.sort(function(oSection1,oSection2){
			return Number(oSection1.getAttribute('sailingday'))-Number(oSection2.getAttribute('sailingday'));
		});
		$('.content').scrollTop(0);
		putBasicSchemes();
		setTimeout(function(){
			$('#list').hide();
		},300);
	});
	$('#list li:last-child').on('touchstart',function(){
		arrSection.sort(function(oSection1,oSection2){
			return week[oSection1.getAttribute('customsclearance')]-week[oSection2.getAttribute('customsclearance')];
		});
		$('.content').scrollTop(0);
		putBasicSchemes();
		setTimeout(function(){
			$('#list').hide();
		},300);
	});
})()
