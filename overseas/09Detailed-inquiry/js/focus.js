var oRemarks=document.querySelector('#text_box');
//var oRemarks2=document.querySelector('#text2');
userLoad(oRemarks);
//userLoad2(oRemarks2);
function userLoad(ele){
	var oInput=ele.querySelector('textarea');
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
function userLoad2(ele){
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
