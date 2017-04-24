var oLanguage = document.querySelector('#language_box');
var f1='';
var f2='';
oLanguage.addEventListener('touchstart', function () {
	if(getCookie('lng')=='CN'){
		f1='取消';
		f2='完成';
	}else{
		f1='Cancel';
		f2='Complete';
	}
    var bankId = oLanguage.dataset['id'];
    var languageSelect = new IosSelect(1, 
        [data],
        {
            oneLevelId: bankId,
            itemShowCount:9,		
            itemHeight: 0.7,
            headerHeight: 0.88,
            cssUnit: 'rem',
            callback: function (selectOneObj) {
            	setCookie('lng',languageName[Number(selectOneObj.id)],7);
                lng = getCookie('lng');
				setLng();
            }
    });
},false);