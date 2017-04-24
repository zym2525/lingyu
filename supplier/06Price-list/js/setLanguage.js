var lng=getCookie('lng')||'CN';
function setLng(){
	var aT=document.querySelectorAll('*[localeString]');
	var aIpt=document.querySelectorAll('input[localeString]');
	aT.forEach(function(oT,index){
		oT.innerHTML=langText[lng][oT.getAttribute('localeString')];
	});
	aIpt.forEach(function(oIpt,index){
		oIpt.value=langText[lng][oIpt.getAttribute('localeString')];
	});
}
setLng();