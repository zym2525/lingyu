window.onload=function(){
	var doc=document.documentElement;
	doc.style.fontSize=doc.clientWidth/750*100+'px';
	var loaclHeight = $('document').height();
	window.onresize=function(){
		doc.style.fontSize=doc.clientWidth/750*100+'px';
//		var keyboardHeight = loaclHeight - $('document').height()
//		$("input,textarea").focus(function(){
//			var offset=loaclHeight-keyboardHeight;
//			$('document').css('margin-top',offset);
//		});
	};
	setTimeout(function(){
		document.getElementsByTagName('body')[0].style.visibility='visible';
	},1);
}
//$('.enterances').on('touchmove',function(ev){
//		ev.preventDefault();
//	},false)
function open(address){
	var aA=document.createElement('a');
	aA.setAttribute("href",address); 
	var bodys=document.getElementsByTagName("body")[0]; 
	bodys.appendChild(aA); 
	aA.click();
	bodys.removeChild(aA);
}
function telPhone(address){
	var aA=document.createElement('a');
	aA.setAttribute("href",'tada:tel/'+address);
	var bodys=document.getElementsByTagName("body")[0]; 
	bodys.appendChild(aA); 
	aA.click();
	bodys.removeChild(aA);
}
//window.onresize=function(){
//	var loaclHeight = $('document').height();//获取可视宽度
//	$("input,textarea").focus(function() {
//		var keyboardHeight = loaclHeight - $('document').height();//获取键盘的高度
//		var keyboardY = loaclHeight - keyboardHeight;
//		var addBottom = (parseInt($(this).position().top) + parseInt($(this).height()));//文本域的底部
//		var offset = addBottom - keyboardY;//计算上滑的距离
//		$('document').scrollTop(offset);
//		});
//}