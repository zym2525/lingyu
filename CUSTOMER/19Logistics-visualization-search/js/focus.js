var aF=document.querySelectorAll('.focus');
aF.forEach(function(oF,index){
	userLoad(oF);
});
function userLoad(ele){
	var oInput=ele.querySelector('input');
	var oSpan=ele.querySelector('span');
	oInput.onfocus=function(){
		hide(oSpan);
	};
	oSpan.addEventListener('touchstart',function(){
		oInput.focus();
	},false);
	oInput.onblur=function(){
		if(oInput.value==''){
			show(oSpan);
		}
	}
}
function hide(ele){
	ele.style.display='none';
}
function show(ele){
	ele.style.display='block';
}
