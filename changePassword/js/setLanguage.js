var lng=getCookie('lng')||'CN';
function setLng(){
	var aT=document.querySelectorAll('span[localeString]');
	var aIpt=document.querySelectorAll('input[localeString]');
	var aA=document.querySelectorAll('a[localeString]');
	aT.forEach(function(oT,index){
		oT.innerHTML=langText[lng][oT.getAttribute('localeString')];
	});
	aIpt.forEach(function(oIpt,index){
		oIpt.value=langText[lng][oIpt.getAttribute('localeString')];
	});
	aA.forEach(function(oA,index){
		oA.innerHTML=langText[lng][oA.getAttribute('localeString')];
	});
}
setLng();