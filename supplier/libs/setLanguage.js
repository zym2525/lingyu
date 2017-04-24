var lng=getCookie('lng')||'CN';
function setLng(){
	$('*[localeString]').each(function(index,oT){
		$(oT).html(langText[lng][oT.getAttribute('localeString')])
	})
	$('input[localeString]').each(function(index,oT){
		$(oT).val(langText[lng][oT.getAttribute('localeString')])
	})
}
setLng();
