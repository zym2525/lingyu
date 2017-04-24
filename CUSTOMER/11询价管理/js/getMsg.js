$(function(){
	getEnquirys(getCookie('accessToken'),0,setEnquirys);
})
function setEnquirys(data){
	var oContent=document.getElementById('content');
	for(var i=0;i<data.length;i++){
		var oSection=templateEnquirys0('tpl',data[i]);
		oContent.appendChild(oSection);
	}
}
//正常询盘
function templateEnquirys0(id,json){
	var oTmp=document.getElementById(id);
    var oSection = oTmp.cloneNode(true);
    var aNum=oSection.getElementsByClassName('number');
    oSection.removeAttribute('id');
    oSection.className='container';
    for(var i=0;i<aNum.length;i++){
    	aNum[i].innerHTML=aNum[i].innerHTML.replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        return json['enquiryElements'][s];
	    });   
    }
    oSection.innerHTML=oSection.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        return json[s];
    });
    return oSection;
}
