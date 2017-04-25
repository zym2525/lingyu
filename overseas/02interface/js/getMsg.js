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
		var scrollBtn21=false;
		var scrollBtn22=false;
		if(getCookie('currentCount')==1){
			loadEnquirys();
			cancel();
			setLng();
		}else if(getCookie('currentCount')==2){
			loadNodes();
		}
		$('#btnEnquirys').on('touchstart',function(){
			setCookie('nav1Count',0,28);
			loadEnquirys();
			cancel();
			setLng();
		});
		$('#btnlogistics').on('touchstart',function(){
			setCookie('nav2Count',0,28);
			loadNodes()
		});
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
//		$('.enterances3 .content').each(function(index,ele){
			$('.enterances3').on('scroll',function(){
				switch (getCookie('nav2Count')){
					case '0':
						currentScrollT2[0]=$('.enterances3').scrollTop();
						break;
					case '1':
						currentScrollT2[1]=$('.enterances3').scrollTop();
						break;
				}
				sessionStorage.setItem('currentScrollT2',JSON.stringify(currentScrollT2));
			})
			
//		})
		
		
		//懒加载
		$('.enterances2').on('scroll',function(){
			if(($(this)[0].scrollHeight-100)<=($(this).height()+$(this).scrollTop())){
				switch (getCookie('nav1Count')){
					case '0':
						if(scrollBtn11) return;
						iNav1Num1+=pageSize;
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,0);
						break;
					case '1':
						if(scrollBtn12) return;
						iNav1Num2+=pageSize;
						getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,1);
						cancel()
						break;
					case '2':
						if(scrollBtn13) return;
						iNav1Num3+=pageSize;
						getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2);
						break;
				}
				$(this).scrollTop($(this).scrollTop()+100)
			}
			setLng();
		})
		$('.enterances3').on('scroll',function(){
			if(($(this)[0].scrollHeight-100)<=($(this).height()+$(this).scrollTop())){
				switch (getCookie('nav2Count')){
					case '0':
						if(scrollBtn21) return;
						orderNum+=orderPageSize;
						findByOrder(orderNum,setNewNodes);
						break;
					case '1':
						orderNum2+=orderPageSize;
						findHistoryOrder(orderNum2,setNewNodes);
						break;
				}
				$(this).scrollTop($(this).scrollTop()+100)
			}
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
			$('.enterances2').scrollTop(0)
			getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,0);
			getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,1);
			getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2);
		})
		$('.shuaxin2').on('touchstart',function(){
			orderNum=0;
			orderNum2=0;
			currentData2=[[],[]];
			currentScrollT2=[0,0];
			arrNodes=[];
			arrNodes2=[];
			scrollBtn21=false;
			scrollBtn22=false;
			$('.enterances3 .content').empty();
			sessionStorage.removeItem('currentData2')
			sessionStorage.removeItem('currentScrollT2')
			$('.enterances3').scrollTop(0);
			findByOrder(orderNum,setNewNodes);
			findHistoryOrder(orderNum2,setNewNodes2)
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
						getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,1);
						getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2);
						break;
					case '1':
						scrollBtn12=true;
						setEnquirys1(eval('('+sessionStorage.getItem('datas')+')'));
						$('.nav1 li:nth-child(2) .n').html(eval('('+sessionStorage.getItem('datas')+')').length);
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,0);
						getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2);
						break;
					case '2':
						scrollBtn13=true;
						setEnquirys2(eval('('+sessionStorage.getItem('datas')+')'));
						$('.nav1 li:last-child .n').html(eval('('+sessionStorage.getItem('datas')+')').length);
						getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,0);
						getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,1);
						break;
				}
				sessionStorage.removeItem('datas');
			}else{
				if(sessionStorage.getItem('currentScrollT')&&sessionStorage.getItem('currentData')){
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
					getEnquirys(getCookie('accessToken'),0,iNav1Num1,setEnquirys0,1,0);
					getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,1);
					getEnquirys(getCookie('accessToken'),2,iNav1Num3,setEnquirys2);
				}
				
			}
		}
		//加载物流
		function loadNodes(){
			if(bSinlogistics) return;
			bSinlogistics=true;
			if(sessionStorage.getItem('dataNodes')&&sessionStorage.getItem('dataNodes')!='[]'){
				switch (getCookie('nav2Count')){
					case '0':
						arrNodes=[];
						$('#Nodes1').empty();
						scrollBtn21=true;
							setNewNodes(eval('('+sessionStorage.getItem('dataNodes')+')'));
						break;
					case '1':
						arrNodes2=[];
						$('#Nodes2').empty();
						scrollBtn22=true;
							setNewNodes2(eval('('+sessionStorage.getItem('dataNodes')+')'));
						break;
				}
				sessionStorage.removeItem('dataNodes');
			}else{
				if(sessionStorage.getItem('currentScrollT2')&&sessionStorage.getItem('currentData2')){
					var arr1=eval(sessionStorage.getItem('currentData2'))
					var arr2=eval(sessionStorage.getItem('currentScrollT2'))
					orderNum=arr1[0].length-orderPageSize;
					orderNum2=arr1[1].length-orderPageSize;
					setNewNodes(arr1[0])
					setNewNodes2(arr1[1])
					currentData2=[[],[]];
					for(var i=0;i<arr1.length;i++){
						currentScrollT2[i]=arr2[i];
						for(var j=0;j<arr1[i].length;j++){
							currentData2[i].push(arr1[i][j])
						}
					}
						$('.enterances3').scrollTop(arr2[getCookie('nav2Count')]);
				}else{
					findByOrder(orderNum,setNewNodes);
					findHistoryOrder(orderNum2,setNewNodes2)
				}
			}
		}
		
		//取消询盘和询价
		function cancel(){
			arrEnquirys2.forEach(function(ele,index){
//				ele.querySelectorAll('.cancel')[0].removeEventListener('touchstart',cancelEnquirys,false)
//				ele.querySelectorAll('.cancel')[0].addEventListener('touchstart',cancelEnquirys,false)
				ele.querySelectorAll('.cancel')[0].onclick=cancelEnquirys
				function cancelEnquirys(ev){
					if(getCookie('lng')=='CN'){
						$('#text3').html('确认取消')
					}else{
						$('#text3').html('Confirm to cancel?')
					}
					$('#shadow1').show();
					$('#cancel2').on('touchstart',function(){
						$('#shadow1').hide();
					});
					$('#confirm2')[0].onclick=function(){
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
								if(json.retCode==0000){
									arrEnquirys2.splice(index,1);
									currentData[1].splice(index,1);
									arrEnquirys3.unshift(ele);
									$('#shadow1').hide();
									$('#text3').html('');
//									putEnquirys(arrEnquirys2,document.getElementById('enquiry2'));
									$(ele).remove();
									$('#enquiry3').scrollTop(0);
									if(($('#enquiry2')[0].scrollHeight)<=($('#enquiry2').height()+$('#enquiry2').scrollTop())){
										getEnquirys(getCookie('accessToken'),0,iNav1Num2,setEnquirys1,1,1);
										$('.nav1 li:nth-child(2) .n').html(Number($('.nav1 li:nth-child(2) .n').html()));
									}else{
										$('.nav1 li:nth-child(2) .n').html(Number($('.nav1 li:nth-child(2) .n').html())-1);
									}
									
									putEnquirys(arrEnquirys3,document.getElementById('enquiry3'));
									$('.nav1 li:last-child .n').html(Number($('.nav1 li:last-child .n').html())+1);
								}else{
									if(getCookie('lng')=='CN'){
										$('#text3').html('取消失败')
									}else{
										$('#text3').html('Failed')
									}
									
								}
							},
						})
					};
					ev.cancelable=true;
				}
			});
//			arrEnquirys1.forEach(function(ele,index){
//				ele.querySelectorAll('.Inquiry')[0].addEventListener('touchstart',function(ev){
//					$('#text3').html('确认询价吗')
//					$('#shadow1').show();
//					$('#cancel2').on('touchstart',function(){
//						$('#shadow1').hide();
//					});
//					$('#confirm2').on('touchstart',function(){
//						open('../enquiry/enquiry.html');
//					});
//					ev.cancelable=true;
//				},false)
//			});
		}
		
//	});
})
function setEnquirys0(data,iNum){
	if(iNum) sessionStorage.setItem('lengths1',iNum);
	var oContent1=document.getElementById('enquiry1');
	for(var i=0;i<data.length;i++){
		currentData[0].push(data[i]);
		var oSection=templateEnquirys0('tpl',data[i]);
			arrEnquirys1.push(oSection);
	}
	putEnquirys(arrEnquirys1,oContent1);
	$('.nav1 li:first-child .n').html(sessionStorage.getItem('lengths1'));
	setLng();
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
	$('#enquiry3 .cancel').hide();
	$('.nav1 li:last-child .n').html(sessionStorage.getItem('lengths3'));
}
//询盘
function templateEnquirys0(id,json){
	var oTmp=document.getElementById(id);
    var oSection=oTmp.cloneNode(true);
    var oNum=oSection.getElementsByClassName('num')[0];
    oSection.removeAttribute('id');
    oSection.setAttribute('enquiryCode',json['enquiryCode']);
    //查运价方案
    //询价状态
    switch(json['status']){
    	case 0:
    		oSection.className='container bReady';
    		if(json['enquirybizStatus']=='0'){
    			oSection.getElementsByClassName('Inquiry')[0].style.display='block';
    		}
    		if(json['schemeStatus']==0){
    			oSection.className='container bReady';
	    		var oT1=oSection.getElementsByClassName('t1')[0];
	    		oT1.className='active';
				oT1.getElementsByTagName('div')[0].setAttribute('localeString','field1_2');
				isClick($(oSection),function(){
					if(json['schemeCode']){
	    				sessionStorage.setItem('schemeCode',json['schemeCode']);
	    			}
					sessionStorage.setItem('currentData',JSON.stringify(currentData));
					sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
	    			sessionStorage.setItem('enquiryCode',json['enquiryCode']);
		    		open('../15quotation-project-not/15.html');
				})
		    }else if(json['schemeStatus']==3){
		    	var oT1=oSection.getElementsByClassName('t1')[0];
	    		oT1.className='active';
		    	var oT2=oSection.getElementsByClassName('t2')[0];
	    		oT2.className='active';
				oT1.getElementsByTagName('div')[0].setAttribute('localeString','field1_2')
				oT2.getElementsByTagName('div')[0].setAttribute('localeString','field2_2')
	    		oSection.className='container bReady';
	    		isClick($(oSection),function(){
	    			if(json['schemeCode']){
	    				sessionStorage.setItem('schemeCode',json['schemeCode']);
	    			}
	    			sessionStorage.setItem('currentData',JSON.stringify(currentData));
					sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
	    			sessionStorage.setItem('enquiryCode',json['enquiryCode']);
		    		open('../16quotation-project-ready/16.html');
	    		})
		    }else if(json['schemeStatus']==5){
		    	if(json['enquirybizStatus']=='1'){
		    		oSection.getElementsByClassName('cancelBtn')[0].style.display='block';
		    	}
//				 oSection.className='container';
		    }
    		break;
    	case 2:
    		oSection.className='container';
    		break;
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
    }
    if(json['bookingNum']){
    	$(oSection).find('.bookingNum').text(json['bookingNum']+'次');
    }
    if(json['enquiryNum']){
    	$(oSection).find('.enquiryNum').text(json['enquiryNum']+'次');
    }
    oSection.innerHTML=oSection.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        return json[s];
    });
    oSection.getElementsByClassName('Inquiry')[0].addEventListener('touchstart',function(ev){
    	if(getCookie('lng')=='CN'){
			$('#text3').html('确认询价吗')
		}else{
			$('#text3').html('Confirm the quotation?')
		}
		
		$('#shadow1').show();
		$('#cancel2').on('touchstart',function(){
			$('#shadow1').hide();
		});
		$('#confirm2').on('touchstart',function(){
			sessionStorage.setItem('currentData',JSON.stringify(currentData));
			sessionStorage.setItem('currentScrollT',JSON.stringify(currentScrollT));
			sessionStorage.setItem('enquiry',JSON.stringify(json));
			open('../enquiry/enquiry.html');
		});
		ev.cancelable=true;
	},false);
    return oSection;
}
//订单
function templateNodes(id,json){
	var oTmp=document.getElementById(id);
	var oDiv=oTmp.cloneNode(true);
	oDiv.removeAttribute('id');
	oDiv.className='order_cell';
	isClick($(oDiv),function(){
		sessionStorage.setItem('currentData2',JSON.stringify(currentData2));
		sessionStorage.setItem('currentScrollT2',JSON.stringify(currentScrollT2));
		sessionStorage.setItem('orderCode',json['orderCode']);
    	open('../18Logistics-visualization-detail/18.html');
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
		currentData2[0].push(data[i]);
		var oDiv=templateNodes('tpl2',data[i]);
		arrNodes.push(oDiv);
	}
	putNewNodes(arrNodes,oContent)
	if(data[0]){
		$('.nav2 li:first-child .nm').html(`(${data[0]['num']})`);
	}
}
function setNewNodes2(data){
	var oContent=document.getElementById('Nodes2');
	for(var i=0;i<data.length;i++){
		currentData2[1].push(data[i]);
		var oDiv=templateNodes('tpl2',data[i]);
		arrNodes2.push(oDiv);
	}
	putNewNodes(arrNodes2,oContent)
}
function putNewNodes(arr,oParent){
	oParent.innerHTML='';
	for(var i=0;i<arr.length;i++){
		oParent.appendChild(arr[i]);
	}
}