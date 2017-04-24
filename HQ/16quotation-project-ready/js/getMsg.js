(function(){
//	getSchemeInfo(setSchemeInfo);
	getSchemesByEnquiryCode(function(data){
		$('.titleNum').text(data.length);
		$('#top')[0].style.width=1.64*data.length+'rem';
		if($('#top').width()<$('.topBox').width()){
			$('#top').css('margin','0 auto');	
		}
		for(var i=0;i<data.length;i++){
			var oLi=$('<li></li>').text('方案'+(i+1));
			$('#top').append(oLi);
		}
		$('#top li:first-child').addClass('active');
		sessionStorage.setItem('schemeCode',data[0]['schemeCode'])
		setSchemeInfo(data[0]);
		$('#top li').each(function(index,ele){
			$(ele).on('touchstart',function(){
				$('#top li').removeClass('active');
				$(this).addClass('active');
				setSchemeInfo(data[index]);
				sessionStorage.setItem('schemeCode',data[index]['schemeCode'])
			})
		})
	})
	$('.arrow').on('touchstart',function(){
		window.history.back();
	})
	$('.telPhoneNum').each(function(index,ele){
		$(ele).on('touchstart',function(){
			if($(ele).text()){
				telPhone($(ele).text());
			}
		})
		
	})
	function setSchemeInfo(data){
		var oAppend=document.getElementById('append');
		var json2={
				'cost20gp':'num20gp',
				'cost40gp':'num40gp',
				'cost40hq':'num40hq',
				'cost45hc':'num45hc',
			};
		function createLi(id,str,num){
			var oTmp=document.getElementById(id);
		    var oLi=oTmp.cloneNode(true);
		    oLi.removeAttribute('id');
		    switch (str){
		    	case 'num20gp':
		    		$(oLi).children('.kind').attr('id','num20GP').text('20GP*'+num);
		    		$(oLi).children('.bj').children('input').attr('id','cost20gp');
		    		break;
		    	case 'num40gp':
		    		$(oLi).children('.kind').attr('id','num40GP').text('40GP*'+num);
		    		$(oLi).children('.bj').children('input').attr('id','cost40gp');
		    		break;
		    	case 'num40hq':
		    		$(oLi).children('.kind').attr('id','num40HQ').text('40HQ*'+num);
		    		$(oLi).children('.bj').children('input').attr('id','cost40hq');
		    		break;
		    	case 'num45hc':
		    		$(oLi).children('.kind').attr('id','num45HC').text('45HC*'+num);
		    		$(oLi).children('.bj').children('input').attr('id','cost45hc');
		    		break;
		    }
		    return oLi;
		}
		for(var i=0;i<data['feesList'].length;i++){
			//运费
			if(data['feesList'][i]['feeTypeNum']=='0'){
				$('#unit').html(arrHyfCurrency[data['feesList'][i]['currency']]).attr({'currency':data['feesList'][i]['currency'],'feeCode':data['feesList'][i]['feeCode']});
				$('.units').html(arrCurrency[data['feesList'][i]['currency']]);
				for(var key in data['feesList'][i]){
					if(key.substring(0,4)=='cost'&&data['feesList'][i][key]!='0'){
						var oLi=createLi('tplLi',json2[key],data[json2[key]]);
						$(oLi).find('.price').text(data['feesList'][i][key]);
						$('#hyf').append($(oLi));
					}
				}
				$('#hyf li:last-child').addClass('cr')
			}else{
				//附加费
				var oDd=document.createElement('dd');
				oDd.className='clearfix';
		    	if(data['feesList'][i]['byOrder']=='1'){
		    		var fee=`${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['orderPrice']}`;
		    	}else{
		    		var total=Number(data['feesList'][i]['cost20gp'])*Number(data[json2['cost20gp']])+Number(data['feesList'][i]['cost40gp'])*Number(data[json2['cost40gp']])
		    		var fee=`${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost20gp']}*${data[json2['cost20gp']]}+${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost40gp']}*${data[json2['cost40gp']]}=${arrCurrency[data['feesList'][i]['currency']]}${total}`;
		    	}
		    	oDd.innerHTML=`<span class="name fl" localeString='field11'>${data['feesList'][i]['feeTypeEname']}</span>
								<span class="val fr">${fee}</span>
							`;
				oAppend.appendChild(oDd);
			}
		}
		$('#append dd').eq(length-1).addClass('cb');
	    var str='';
	    var total=eval('('+data['primeTotal']+')')
	    for(var key in total){
	    	str+=`<b></b><em>${arrCurrency[key]} </em><span>${total[key]}</span>`;
	    }
	    $('#expireDate').text(data['expireDate'])
		$('.order').html($('.order').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        if(s=='potName'){
	        	if(data[s]){
	        		return data[s];
	        	}else{
	        		return '无';
	        	}
	        }else{
	        	return data[s];
	        }
	    }));
	    $('.destination').html($('.destination').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        if(s=='potName'){
	        	if(data[s]){
	        		return data[s];
	        	}else{
	        		return '无';
	        	}
	        }else{
	        	return data[s];
	        }
	    }));
	    $('.msgg').html($('.msgg').html().replace(/\{\{\w+\}\}/g,function(s){
	        s = s.substring(2, s.length-2);
	        if(s=='potName'){
	        	if(data[s]){
	        		return data[s];
	        	}else{
	        		return '无';
	        	}
	        }else{
	        	return data[s];
	        }
	    }));
	    $('#val').html(str);
	}
	$('#btn').on('touchstart',function(){
		open('../30confirm_offer/30.html');
		return false;
	})
})()
