$(function(){
//	$('#btnEnquirys').on('touchstart',function(){
		var port=getCookie('port')||'DUBAI';
		$('#pod').html(port);
		$('#pod').attr('code',getCookie('code')||'AEDUB');
		removeCookie('local');
		var bSinEnquirys=false;
		var bSinlogistics=false;
		var scrollBtn11=false;
		var scrollBtn12=false;
		var scrollBtn13=false;
		if(getCookie('currentCount')==1){
			loadEnquirys();
//			cancel();
		}
		$('#btnEnquirys').on('touchstart',function(){
			setCookie('nav1Count',0,28);
			loadEnquirys();
//			cancel();
		});
//		$('#btnlogistics').on('touchstart',loadNodes);

//		$('.enterances2 .enquiry').each(function(index,ele){
			$('.enterances2').on('scroll',function(){
				switch (getCookie('nav1Count')){
					case '0':
					console.log(1)
						currentScrollT[0]=$('.enterances2').scrollTop();
						break;
					case '1':
						currentScrollT[1]=$('.enterances2').scrollTop();
						break;
					case '2':
						currentScrollT[2]=$('.enterances2').scrollTop();
						break;
				}
				sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
			})
//		})
		
		$('.enterances2').on('scroll',function(){
			if(($(this)[0].scrollHeight-60)<($(this).height()+$(this).scrollTop())){
				switch (getCookie('nav1Count')){
					case '0':
						if(scrollBtn11) return;
						iNav1Num1+=pageSize;
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,5);
						break;
					case '1':
						if(scrollBtn12) return;
						iNav1Num2+=pageSize;
						getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,3);
						break;
					case '2':
						if(scrollBtn13) return;
						break;
				}
				$(this).scrollTop($(this).scrollTop()+10)
			}
//			return false;
		})
		$('.shuaxin1').on('touchstart',function(){
			iNav1Num1=0;
			iNav1Num2=0;
			iNav1Num3=0;
			currentData[[],[],[]];
			currentScrollT[0,0,0];
			arrEnquirys1=[];
			arrEnquirys2=[];
			arrEnquirys3=[];
			scrollBtn11=false;
			scrollBtn12=false;
			scrollBtn13=false;
			$('.enterances2 .enquiry').empty();
			sessionStorage.removeItem('currentData')
			sessionStorage.removeItem('currentScrollT')
			$('.enterances2').scrollTop(0);
			getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,5);
			getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,3);
		})

		//加载询盘
		function loadEnquirys(){
			if(bSinEnquirys) return;
			bSinEnquirys=true;
			if(sessionStorage.getItem('datas')!=null){
				switch (getCookie('nav1Count')){
					case '0':
						scrollBtn11=true;
						setEnquirys0(eval('('+sessionStorage.getItem('datas')+')'));
						$('.nav1 li:first-child .n').html(eval('('+sessionStorage.getItem('datas')+')').length);
						getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,3);
						break;
					case '1':
						scrollBtn12=true;
						setEnquirys1(eval('('+sessionStorage.getItem('datas')+')'));
						$('.nav1 li:nth-child(2) .n').html(eval('('+sessionStorage.getItem('datas')+')').length);
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,5);
						break;
					case '2':
						break;
				}
				sessionStorage.removeItem('datas');
			}else{
				if(sessionStorage.getItem('currentData')&&sessionStorage.getItem('currentScrollT')){
					var arr1=eval(sessionStorage.getItem('currentData'))
					var arr2=eval(sessionStorage.getItem('currentScrollT'))
					iNav1Num1=arr1[0].length-pageSize;
					iNav1Num2=arr1[1].length-pageSize;
					iNav1Num3=arr1[2].length-pageSize;
					setEnquirys0(arr1[0])
					setEnquirys1(arr1[1])
					setEnquirys2(arr1[2])
					currentData=[[],[],[]];
					for(var i=0;i<arr1.length;i++){
						currentScrollT[i]=arr2[i];
						for(var j=0;j<arr1[i].length;j++){
							currentData[i].push(arr1[i][j])
						}
					}
					$('.enterances2').scrollTop(arr2[getCookie('nav1Count')]);
				}else{
					getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,5);
					getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,3);
//					getEnquirys(getCookie('accessToken'),2,setEnquirys2);
				}
				
			}
		}
		
		//取消询盘
		function cancel(){
			arrEnquirys1.forEach(function(ele,index){
				ele.querySelectorAll('.cancel')[0].addEventListener('touchstart',function(ev){
					$('#text3').html('确认取消')
					$('#shadow1').show();
					$('#cancel2').on('touchstart',function(){
						$('#shadow1').hide();
					});
					$('#confirm2').on('touchstart',function(){
						var t=new Date().getTime();
						$.ajax({
							type:'POST',
							async:false,
							url:'http://106.14.251.28:8085/bizCenter/enquiryService/cancelEnquiry',
							data:{
								'accessToken':getCookie('accessToken'),
								'msgId':t+'',
								'enquiryCode':ele.getAttribute('enquiryCode'),
							},
							success:function(json){
								console.log(json)
								if(json.retCode==0000){
									arrEnquirys1.splice(index,1);
									arrEnquirys3.unshift(ele);
									$('#shadow1').hide();
									$('#text3').html('')
									putEnquirys(arrEnquirys1,document.getElementById('enquiry1'));
									$('.nav1 li:first-child .n').html(`(${arrEnquirys1.length})`);
									putEnquirys(arrEnquirys3,document.getElementById('enquiry3'));
									$('.nav1 li:last-child .n').html(`(${arrEnquirys3.length})`);
								}else{
									$('#text3').html('取消失败')
								}
							},
						})
						
					});
					ev.cancelable=true;
				},false)
			});
		}
		
//	});
})
function setEnquirys0(data,iNum){
	var oContent1=document.getElementById('enquiry1');
	if(iNum) sessionStorage.setItem('lengths1',iNum);
	for(var i=0;i<data.length;i++){
		currentData[0].push(data[i]);
		var oSection=templateEnquirys0('tpl',data[i]);
		arrEnquirys1.push(oSection);
	}
	putEnquirys(arrEnquirys1,oContent1);
	$('.nav1 li:first-child .n').html(sessionStorage.getItem('lengths1'));
}
function putEnquirys(arr,oParent){
	oParent.innerHTML='';
	for(var i=0;i<arr.length;i++){
		oParent.appendChild(arr[i]);
	}
}
function setEnquirys1(data,iNum){
//	arrEnquirys2=[];
	if(iNum) sessionStorage.setItem('lengths2',iNum);
	var oContent=document.getElementById('enquiry2');
	for(var i=0;i<data.length;i++){
		currentData[1].push(data[i]);
		var oSection=templateEnquirys0('tpl',data[i]);
		arrEnquirys2.push(oSection);
	}
	putEnquirys(arrEnquirys2,oContent);
	$('.nav1 li:nth-child(2) .n').html(sessionStorage.getItem('lengths2'));
}
function setEnquirys2(data,iNum){
//	arrEnquirys3=[];
	if(iNum) sessionStorage.setItem('lengths3',iNum);
	var oContent=document.getElementById('enquiry3');
	for(var i=0;i<data.length;i++){
		currentData[2].push(data[i]);
		var oSection=templateEnquirys0('tpl',data[i]);
		arrEnquirys3.push(oSection);
	}
	putEnquirys(arrEnquirys3,oContent);
	$('.nav1 li:last-child .n').html(sessionStorage.getItem('lengths3'));
}
//询盘
function templateEnquirys0(id,json){
	var oTmp=document.getElementById(id);
    var oSection=oTmp.cloneNode(true);
    var oNum=oSection.getElementsByClassName('num')[0];
    oSection.removeAttribute('id');
    //查运价方案
    if(json['schemeStatus']=='5'){
    	oSection.className='container';
		isClick($(oSection),function(){
			sessionStorage.setItem('currentData',JSON.stringify(currentData));
			sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
			sessionStorage.setItem('enquiryCode',json['enquiryCode']);
    		open('../27confirm_offer/27.html');
		})
    }else if(json['schemeStatus']=='3'){
    	oSection.className='container bReady';
    	isClick($(oSection),function(){
    		sessionStorage.setItem('currentData',JSON.stringify(currentData));
			sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
			sessionStorage.setItem('schemeCode',json['schemeCode']);
	    	open('../16quotation-project-ready/16.html');
		})
    }
	oNum.innerHTML=oNum.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        if(json['elements'][s]&&json['elements'][s]!='0'){
        	return s.substring(3).toUpperCase()+'*'+json['elements'][s];
        }else{
        	return '';
        }
    });
    if(json['elements']['remark']){
    	var oRemark=oSection.getElementsByClassName('remarkBox')[0];
    	oRemark.innerHTML=json['elements']['remark'];
    }
    if(json['carryCode']&&json['carryCode']!='0'){
    	var oCarryName=oSection.getElementsByClassName('carryName')[0];
    	oCarryName.innerHTML=json['carryCode'];
    }else{
    	var oCarryName=oSection.getElementsByClassName('carryName')[0];
    	oCarryName.innerHTML='全部';
    }
    oSection.innerHTML=oSection.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        return json[s];
    });
    return oSection;
}
