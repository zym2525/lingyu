
$(function(){
	var bSinEnquirys=false;
	var bSinlogistics=false;
	var bSinInquirys=false;
	var scrollBtn11=false;
	var scrollBtn12=false;
	var scrollBtn13=false;
	var scrollBtn21=false;
	var scrollBtn22=false;
	var scrollBtn23=false;
	var scrollBtn31=false;
	var scrollBtn32=false;
//	$('#btnEnquirys').on('touchstart',function(){
		var port=getCookie('port')||'DUBAI';
		$('#pod').html(port);
		$('#pod').attr('code',getCookie('code')||'AEDUB');
		removeCookie('local');
//		console.log(sessionStorage.getItem('datas'))
		if(getCookie('currentCount')==1){
			loadEnquirys();
		}else if(getCookie('currentCount')==2){
			loadNodes();
		}
		$('#btnEnquirys').on('touchstart',function(){
			setCookie('nav1Count',0,28);
			loadEnquirys();
		});
		$('#btnlogistics').on('touchstart',function(){
			setCookie('nav3Count',0,28);
			loadNodes();
		});
		
//		$('.enterances2 .enquiry').each(function(index,ele){
			$('.enterances2').on('scroll',function(){
				switch (getCookie('nav1Count')){
					case '0':
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
//		$('.enterances3 .content').each(function(index,ele){
			$('.enterances3').on('scroll',function(){
				switch (getCookie('nav3Count')){
					case '0':
						currentScrollT3[0]=$('.enterances3').scrollTop();
						break;
					case '1':
						currentScrollT3[1]=$('.enterances3').scrollTop();
						break;
				}
				sessionStorage.setItem('currentScrollT3',JSON.stringify(currentScrollT3));
			})
//		})
//		$('.enterances4 .content').each(function(index,ele){
			
//		})
		
		
		//懒加载
		$('.enterances2').on('scroll',function(){
//			console.log($('.enterances2').height()+$('.enterances2').scrollTop())
			if(($(this)[0].scrollHeight-700)<($(this).height()+$(this).scrollTop())){
				switch (getCookie('nav1Count')){
					case '0':
						if(scrollBtn11) return;
						iNav1Num1+=pageSize;
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1);
						break;
					case '1':
						if(scrollBtn12) return;
						iNav1Num2+=pageSize;
						getEnquirys(getCookie('accessToken'),1,iNav1Num2,setEnquirys1,1);
						break;
					case '2':
						if(scrollBtn13) return;
						iNav1Num3+=pageSize;
						getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2,1);
						break;
				}
				$(this).scrollTop($(this).scrollTop()+100)
			}
			
		})
		$('.enterances3').on('scroll',function(){
//			console.log($('.enterances2').height()+$('.enterances2').scrollTop())
			if(($(this)[0].scrollHeight-100)<=($(this).height()+$(this).scrollTop())){
				switch (getCookie('nav3Count')){
					case '0':
						if(scrollBtn31) return;
						orderNum+=orderPageSize;
						findByOrder(orderNum,'0,1',setNewNodes);
						break;
					case '1':
						if(scrollBtn32) return;
						orderNum2+=orderPageSize;
						findByOrder(orderNum2,2,setNewNodes2);
						break;
				}
				$(this).scrollTop($(this).scrollTop()+50)
			}
			
		})
		
		$('.enterances4').on('scroll',function(){
			
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
			getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1);
			getEnquirys(getCookie('accessToken'),1,iNav1Num2,setEnquirys1,1);
			getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2,1);
		})
		$('.shuaxin3').on('touchstart',function(){
			orderNum=0;
			orderNum2=0;
			currentData3=[[],[]];
			currentScrollT3=[0,0];
			scrollBtn31=false;
			scrollBtn32=false;
			$('.enterances3 .content').empty();
			sessionStorage.removeItem('currentData3')
			sessionStorage.removeItem('currentScrollT3')
			$('.enterances3').scrollTop(0);
			findByOrder(orderNum,'0,1',setNewNodes);
			findByOrder(orderNum2,2,setNewNodes2);
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
						getEnquirys(getCookie('accessToken'),1,iNav1Num2,setEnquirys1,1);
						getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2,1);
						break;
					case '1':
						scrollBtn12=true;
						setEnquirys1(eval('('+sessionStorage.getItem('datas')+')'));
						$('.nav1 li:nth-child(2) .n').html(eval('('+sessionStorage.getItem('datas')+')').length);
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1);
						getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2,1);
						break;
					case '2':
						scrollBtn13=true;
						setEnquirys2(eval('('+sessionStorage.getItem('datas')+')'));
						$('.nav1 li:last-child .n').html(eval('('+sessionStorage.getItem('datas')+')').length);
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1);
						getEnquirys(getCookie('accessToken'),1,iNav1Num2,setEnquirys1,1);
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
					getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1);
					getEnquirys(getCookie('accessToken'),1,iNav1Num2,setEnquirys1,1);
					getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2,1);
				}
				
			}
		}
		//加载物流
		function loadNodes(){
			if(bSinlogistics) return;
			bSinlogistics=true;
			if(sessionStorage.getItem('dataNodes')&&sessionStorage.getItem('dataNodes')!='[]'){
				switch (getCookie('nav3Count')){
					case '0':
						$('#Nodes1').empty();
						scrollBtn31=true;
							setNewNodes(eval('('+sessionStorage.getItem('dataNodes')+')'));
						break;
					case '1':
						$('#Nodes2').empty();
						scrollBtn32=true;
							setNewNodes2(eval('('+sessionStorage.getItem('dataNodes')+')'));
						break;
				}
				sessionStorage.removeItem('dataNodes');
			}else{
				if(sessionStorage.getItem('currentData3')&&sessionStorage.getItem('currentScrollT3')){
					var arr1=eval(sessionStorage.getItem('currentData3'))
					var arr2=eval(sessionStorage.getItem('currentScrollT3'))
					orderNum=arr1[0].length-orderPageSize;
					orderNum2=arr1[1].length-orderPageSize;
					setNewNodes(arr1[0])
					setNewNodes2(arr1[1])
					currentData3=[[],[]];
					for(var i=0;i<arr1.length;i++){
						currentScrollT3[i]=arr2[i];
						for(var j=0;j<arr1[i].length;j++){
							currentData3[i].push(arr1[i][j])
						}
					}
						$('.enterances3').scrollTop(arr2[getCookie('nav3Count')]);
				}else{
					findByOrder(orderNum,'0,1',setNewNodes);
					findByOrder(orderNum2,2,setNewNodes2);
				}
			}
		}
		//加载询价
		
			
			
		
		//取消询盘
		function cancel(){
			arrInquirys1.forEach(function(ele,index){
				ele.querySelectorAll('.cancel')[0].addEventListener('touchstart',function(ev){
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
								arrInquirys1.splice(index,1);
								arrInquirys3.unshift(ele);
								$('#text3').html('确认取消')
								$('#shadow1').show();
								$('#cancel2').on('touchstart',function(){
									$('#shadow1').hide();
								});
								$('#confirm2').on('touchstart',function(){
									$('#shadow1').hide();
									$('#text3').html('')
									putEnquirys(arrInquirys1,document.getElementById('eq1'));
									$('.nav2 li:first-child .n').html(Number($('.nav2 li:first-child .n').html())-1);
									putEnquirys(arrInquirys3,document.getElementById('eq3'));
									$('.nav2 li:last-child .n').html(Number($('.nav2 li:last-child .n').html())+1);
								});
							}
						},
					})
					ev.cancelable=true;
				},false)
			});
		}
//	});
})
function setEnquirys0(data,iNum){
//	arrEnquirys1=[];
	if(iNum) sessionStorage.setItem('lengths1',iNum);
	var oContent=document.getElementById('enquiry1');
	for(var i=0;i<data.length;i++){
		currentData[0].push(data[i]);
		var oSection=templateEnquirys0('tpl',data[i],i);
		arrEnquirys1.push(oSection);
	}
	putEnquirys(arrEnquirys1,oContent);
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
function templateEnquirys0(id,json,index){
	var oTmp=document.getElementById(id);
    var oSection=oTmp.cloneNode(true);
    var oNum=oSection.getElementsByClassName('num')[0];
    oSection.removeAttribute('id');
//  oSection.setAttribute('enquiryCode',json['enquiryCode']);
    //查运价方案
    if(json['status']==1||json['status']==2){
    	$(oSection).find('.btn').hide();
    	$(oSection).css('paddingBottom',0);
    }
    if(json['schemeStatus']=='0'||json['schemeStatus']=='1'||json['schemeStatus']=='2'||json['schemeStatus']=='5'){
    	oSection.className='container';
		if(json['enquirybizStatus']==1){
			if(getCookie('lng')=='CN'){
				$(oSection).find('.btn2').html('已询价')
			}else{
				$(oSection).find('.btn2').html('Inquiryed')
			}
			
		}
    }else if(json['schemeStatus']==3){
    	oSection.className='container bReady';
    	$(oSection).find('.btn').hide();
    	$(oSection).css('paddingBottom',0);
    	isClick($(oSection),function(){
    		sessionStorage.setItem('currentData',JSON.stringify(currentData));
			sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
    		sessionStorage.setItem('enquiryCode',json['enquiryCode']);
    		sessionStorage.setItem('schemeCode',json['schemeCode']);
	    	open('../30confirm_offer_2/30_2.html');
    	})
    }else{
    	isClick($(oSection),function(){
    		sessionStorage.setItem('currentData',JSON.stringify(currentData));
			sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
    		sessionStorage.setItem('enquiryCode',json['enquiryCode']);
    		sessionStorage.setItem('schemeCode',json['schemeCode']);
	    	open('../30confirm_offer_2/30_2.html');
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
    if(json['carryCode']){
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
    if(oSection.getElementsByClassName('btn1')[0]){
    	oSection.getElementsByClassName('btn1')[0].addEventListener('touchstart',function(){
    		sessionStorage.setItem('currentData',JSON.stringify(currentData));
			sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
	    	sessionStorage.setItem('enquiryCode',json['enquiryCode']);
	    	open('../32HQ_direct_offer/32.html');
	    },false);
    }
    if(json['enquirybizStatus']=='0'){
    	$(oSection).find('.btn2').on('touchstart',backwardEnquiry)
	    function backwardEnquiry(){
	    	var t=new Date().getTime();
			$.ajax({
				type:'POST',
				async:false,
				url:'http://106.14.251.28:8085/bizCenter/enquiryService/backwardEnquiry',
				data:{
					'accessToken':getCookie('accessToken'),
					'msgId':t+'',
					'enquiryCode':json['enquiryCode'],
				},
				success:function(json){
					if(json.retCode==0000){
						if(getCookie('lng')=='CN'){
							$('#hintBox').html('询价成功！').show();
						}else{
							$('#hintBox').html('Inquiry success！').show();
						}
						setTimeout(function(){
							$('#hintBox').hide();
							currentData[0][index]['enquirybizStatus']=1;
							if(getCookie('lng')=='CN'){
								$(oSection).find('.btn2').html('已询价')
							}else{
								$(oSection).find('.btn2').html('Inquiryed')
							}
							$(oSection).find('.btn2').off('touchstart',backwardEnquiry);
							arrInquirys1=[];
							bSinInquirys=false;
						},700)
					}else{
						$('#hintBox').html('询价失败！').show();
						setTimeout(function(){
							$('#hintBox').hide();
						},700)
					}
				},
			})
	    }
   }
    return oSection;
}
//订单
function templateNodes(id,json){
	var oTmp=document.getElementById(id);
	var oDiv=oTmp.cloneNode(true);
	oDiv.removeAttribute('id');
	oDiv.className='order_cell';
	isClick($(oDiv),function(){
		sessionStorage.setItem('currentData3',JSON.stringify(currentData3));
		sessionStorage.setItem('currentScrollT3',JSON.stringify(currentScrollT3));
		sessionStorage.setItem('orderCode',json['orderCode']);
    	open('../33orderDetails/orderDetails.html');
	})
	$(oDiv).find('.mbl').text(json['mbl']||'尚未录入')
	$(oDiv).find('.orderCode').text(json['orderCode']||'尚未录入')
	if(json['node']){
		$(oDiv).find('.voyage').text(json['node']['voyage']||'尚未录入')
		$(oDiv).find('.nodeTime').text(json['node']['nodeTime']||'尚未录入')
		$(oDiv).find('.nodeName').text(json['node']['nodeName']||'尚未录入')
	}else{
		$(oDiv).find('.voyage').text('尚未录入')
		$(oDiv).find('.nodeTime').text('尚未录入')
		$(oDiv).find('.nodeName').text('尚未录入')
	}
	$(oDiv).find('.orderCode').text(json['orderCode'])
    return oDiv;
}
function setNewNodes(data){
	var oContent=document.getElementById('Nodes1');
	for(var i=0;i<data.length;i++){
		currentData3[0].push(data[i]);
		var oDiv=templateNodes('tpl3',data[i]);
		oContent.appendChild(oDiv);
	}
	if(data[0]){
		$('.nav3 li:first-child .nm').html(`(${data[0]['num']})`);
	}
}
function setNewNodes2(data){
	var oContent=document.getElementById('Nodes2');
	for(var i=0;i<data.length;i++){
		currentData3[1].push(data[i]);
		var oDiv=templateNodes('tpl3',data[i]);
		oContent.appendChild(oDiv);
	}
	if(data[0]){
		$('.nav3 li:last-child .nm').html(`(${data[0]['num']})`);
	}
}
//询价管理
function templateEnquirys1(id,json){
	var oTmp=document.getElementById(id);
    var oSection=oTmp.cloneNode(true);
    var oNum=oSection.getElementsByClassName('num')[0];
    oSection.removeAttribute('id');
    oSection.setAttribute('enquiryCode',json['enquiryCode']);
    //查运价方案
    if(json['schemeStatus']<=2){
    	 oSection.className='container bReady';
    	 $(oSection).find('.bCompete').css('backgroundImage',"url(../img/yibaojia"+json['schemeCount']+".png)")
    	 isClick($(oSection),function(){
    	 	sessionStorage.setItem('currentData2',JSON.stringify(currentData2));
			sessionStorage.setItem('currentScrollT2',JSON.stringify(currentScrollT2));
    	 	sessionStorage.setItem('enquiryCode',json['enquiryCode']);
			open('../16quotation-project-ready/16.html');
    	 })
    }else if(json['schemeStatus']==3){
    	oSection.className='container bReady';
    	 isClick($(oSection),function(){
    	 	sessionStorage.setItem('currentData2',JSON.stringify(currentData2));
			sessionStorage.setItem('currentScrollT2',JSON.stringify(currentScrollT2));
    	 	sessionStorage.setItem('schemeCode',json['schemeCode']);
			open('../30confirm_offer_2/30_2.html');
    	 })
    }else if(json['schemeStatus']==4){
    	oSection.className='container bReady';
    }else{
		 oSection.className='container'; 	
    }
    if(json['status']==1){
    	$(oSection).find('.cancel').hide();
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
    if(json['carryCode']){
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
    if(json['status']==2){
    	$(oSection).find('.cancel').hide();
    }
    return oSection;
}
function setInquirys0(data,iNum){
//	arrInquirys1=[];
	if(iNum) sessionStorage.setItem('lengths21',iNum);
	var oContent=document.getElementById('eq1');
	for(var i=0;i<data.length;i++){
		currentData2[0].push(data[i]);
		var oSection=templateEnquirys1('tpl2',data[i]);
		arrInquirys1.push(oSection);
	}
	putEnquirys(arrInquirys1,oContent);
	$('.nav2 li:first-child .n').html(sessionStorage.getItem('lengths21'));
}
function setInquirys1(data,iNum){
//	arrInquirys2=[];
	if(iNum) sessionStorage.setItem('lengths22',iNum);
	var oContent=document.getElementById('eq2');
	for(var i=0;i<data.length;i++){
		currentData2[1].push(data[i]);
		var oSection=templateEnquirys1('tpl2',data[i]);
		arrInquirys2.push(oSection);
	}
	putEnquirys(arrInquirys2,oContent);
	$('.nav2 li:nth-child(2) .n').html(sessionStorage.getItem('lengths22'));
}
function setInquirys2(data,iNum){
//	arrInquirys3=[];
	if(iNum) sessionStorage.setItem('lengths23',iNum);
	var oContent=document.getElementById('eq3');
	for(var i=0;i<data.length;i++){
		currentData2[2].push(data[i]);
		var oSection=templateEnquirys1('tpl2',data[i]);
		arrInquirys3.push(oSection);
	}
	putEnquirys(arrInquirys3,oContent);
	$('.nav2 li:last-child .n').html(sessionStorage.getItem('lengths23'));
}