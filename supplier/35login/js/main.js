$(function(){
	var doc=document.documentElement;
	doc.style.fontSize=doc.clientWidth/750*100+'px';
	window.onresize=function(){
		doc.style.fontSize=doc.clientWidth/750*100+'px';
	};
//	$('#content').on('touchmove',function(ev){
////		ev.preventDefault();
//		return false;
//	},false)
	setTimeout(function(){
		document.getElementsByTagName('body')[0].style.visibility='visible';
	},1)
})

function open(address){
	var aA=document.createElement('a');
	aA.setAttribute("href",address); 
	var bodys=document.getElementsByTagName("body")[0]; 
	bodys.appendChild(aA); 
	aA.click();
	bodys.removeChild(aA);
}
