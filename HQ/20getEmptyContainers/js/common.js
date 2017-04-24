(function(){
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	
	var nodes=eval('('+sessionStorage.getItem('nodes')+')');
	console.log(nodes)
	for(var i=0;i<nodes.length;i++){
		switch(nodes[i]['nodeCode']){
			case 'TKX':
				var nodeValue=eval('('+nodes[i]['nodeValue']+')');
				$('#nodeTime').html(nodes[i]['nodeTime']);
		}
	}
	for(var i=0;i<nodeValue['infos'].length;i++){
		for(var key in nodeValue['infos'][i]){
			var oDiv=$('<div></div>').addClass('val').html(nodeValue['infos'][i][key]);
			if(i==nodeValue['infos'].length-1){
				oDiv.addClass('cb');
			}
			switch(key){
				case 'containerNo':
					$('#box1').append(oDiv);
					break;
				case 'sealNo':
					$('#box2').append(oDiv);
					break;
				case 'yard':
					$('#box3').append(oDiv);
					break;
			}
		}
	}
//	getOrder(function(data){
//		for(var i=0;i<data['containers']){
//			
//		}
//	})
	function getOrder(fn){
		var t=new Date().getTime();
		$.ajax({
			type:'POST',
			async:false,
			url:"http://106.14.251.28:8085/bizCenter/order/getOrder?accessToken="+getCookie('accessToken')+"&orderCode="+sessionStorage.getItem('orderCode'),
			contentType: "application/json; charset=utf-8",
			success:function(json){
				console.log(json)
				if(json.code==0000){
					fn&&fn(json.data)
				}
			},
		})
	}
})()
