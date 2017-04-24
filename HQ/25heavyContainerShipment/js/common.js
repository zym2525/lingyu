(function(){
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	var nodes=eval('('+sessionStorage.getItem('nodes')+')');
	console.log(nodes)
	for(var i=0;i<nodes.length;i++){
		switch(nodes[i]['nodeCode']){
			case 'ZXZC':
				var nodeValue=eval('('+nodes[i]['nodeValue']+')');
				$('#nodeTime').html(nodes[i]['nodeTime']);
		}
	}
	for(var i=0;i<nodeValue['infos'].length;i++){
		for(var key in nodeValue['infos'][i]){
			if(key=='shipmentTime'){
				var oDiv=$('<div></div>').addClass('val').html(nodeValue['infos'][i][key].split(' ')[0]);
			}else{
				var oDiv=$('<div></div>').addClass('val').html(nodeValue['infos'][i][key]);
			}
			
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
				case 'shipmentTime':
					$('#box3').append(oDiv);
					break;
			}
		}
	}
})()
