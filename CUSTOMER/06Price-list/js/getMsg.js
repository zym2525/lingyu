$(function(){
	
	if(sessionStorage.getItem('scrollT')){
		setBasicSchemes(eval(sessionStorage.getItem('currentData')))
		$('.content').scrollTop(sessionStorage.getItem('scrollT'));
	}else{
		getBasicSchemes(iNum,setBasicSchemes);
	}
	$('.content').on('scroll',function(){
		
		if(($(this)[0].scrollHeight-50)<=($(this).height()+$(this).scrollTop())){
			iNum+=1;
			getBasicSchemes(iNum,setBasicSchemes);
			$('.content').scrollTop($('.content').scrollTop()+60)
		}
	})
	
})
function setBasicSchemes(data){
	for(var i=0;i<data.length;i++){
		currentData.push(data[i]);
		var oSection=templateSchemes('tpl',data[i]);
		arrSection.push(oSection);
	}
	putBasicSchemes();
}
function putBasicSchemes(){
	var oContent=document.getElementById('content');
	oContent.innerHTML='';
	for(var i=0;i<arrSection.length;i++){
		oContent.appendChild(arrSection[i]);
	}
}
//正常询盘
function templateSchemes(id,json){
//	var ofeesList=eval('('+json['feesList'][0]+')');
//	console.log(json['feesList'])
	var oTmp=document.getElementById(id);
    var oSection = oTmp.cloneNode(true);
    var aNum=oSection.getElementsByClassName('number');
    oSection.removeAttribute('id');
    oSection.className='container';
    for(var i=0;i<json['feesList'].length;i++){
    	if(json['feesList'][i]['feeTypeNum']=='0'){
    		for(var j=0;j<aNum.length;j++){
		    	aNum[j].innerHTML=aNum[j].innerHTML.replace(/\{\{\w+\}\}/g,function(s){
			        s = s.substring(2, s.length-2);
			        if(json['feesList'][i][s]){
			        	return json['feesList'][i][s];
			        }else{
			        	return '--';
			        }
			    });   
		    }
    		oSection.setAttribute('cost20gp',json['feesList'][i]['cost20gp']||'0');
    	}
    }
    
    oSection.innerHTML=oSection.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        return json[s];
    });
//  oSection.setAttribute('Cost20gp',ofeesList['fees'][0]['cost20gp']);
    oSection.setAttribute('sailingDay',parseFloat(json['sailingDay']));
    oSection.setAttribute('customsClearance',json['customsClearance']);
    isClick($(oSection),function(){
    	sessionStorage.setItem('currentData',JSON.stringify(currentData));
    	sessionStorage.setItem('scrollT',$('.content').scrollTop())
    	sessionStorage.setItem('schemes',JSON.stringify(json));
    	open('../08Freight-details/08.html');
    })
    return oSection;
}
