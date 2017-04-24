var oLanguage = document.querySelector('#language_box');
oLanguage.addEventListener('touchstart', function () {
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