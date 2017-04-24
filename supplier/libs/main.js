$(function(){
	var doc=document.documentElement;
	doc.style.fontSize=doc.clientWidth/750*100+'px';
	var loaclHeight = $('document').height();
//	$("input,textarea").on('touchstart',function(){
//		var _this=this;
//		setTimeout(function(){
//			_this.scrollIntoViewIfNeeded()
//		},100)
//	});

	if (/Android/gi.test(navigator.userAgent)) {

		window.addEventListener('resize', function () {

			if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {

				window.setTimeout(function () {

					document.activeElement.scrollIntoViewIfNeeded(true);
					document.activeElement.scrollIntoView(true);

				}, 300);

			}

		})
	}

	setTimeout(function(){
		document.getElementsByTagName('body')[0].style.visibility='visible';
	},1);
})
	
function open(address){
	location=address
}
function telPhone(address){
	var aA=document.createElement('a');
	aA.setAttribute("href",'tada:tel/'+address);
	var bodys=document.getElementsByTagName("body")[0]; 
	bodys.appendChild(aA); 
	aA.click();
	bodys.removeChild(aA);
}
function isClick(obj,fn){
	var flag = false;
	obj.on('touchstart', function(e){  
      	flag = true;  
	});  
	obj.on('touchmove', function(e){  
	     flag = false;  
	});  
	obj.on('touchend', function(e){  
	     if (flag){  
	        fn&&fn(obj);
	     }  
	}) 
}
