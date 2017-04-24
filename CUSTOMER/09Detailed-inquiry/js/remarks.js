(function(){
	var oT=document.querySelector('#text_box textarea');
	var oSpan=document.querySelector('#text_box span');
	oT.onfocus=function(){
		hide(oSpan);
	};
	oSpan.addEventListener('touchstart',function(){
		oT.focus();
	},false);
	oT.onblur=function(){
		if(oT.value==''){
			show(oSpan);
		}
	}
})()
function hide(ele){
	ele.style.display='none';
}
function show(ele){
	ele.style.display='block';
}