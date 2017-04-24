(function(){
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	var nodes=eval('('+sessionStorage.getItem('nodes')+')');
	console.log(nodes)
	for(var i=0;i<nodes.length;i++){
		switch(nodes[i]['nodeCode']){
			case 'YPCD':
				var nodeValue=eval('('+nodes[i]['nodeValue']+')');
				$('#nodeTime').html(nodes[i]['nodeTime']);
				var mbl=nodes[i]['mbl'];
		}
	}
	$('#vessel').html(nodeValue['vessel']);
	$('#voyage').html(nodeValue['voyage']);
	$('#box1').html(mbl);
	$('#box2').html(nodeValue['blStatus']);
	$('#box3').html(nodeValue['operateTime'].split(' ')[0]);
//	for(var i=0;i<nodeValue['infos'].length;i++){
//		var oDiv2=$('<div></div>').addClass('val').html(mbl);
//		$('#box1').append(oDiv2);
//		for(var key in nodeValue['infos'][i]){
//			var oDiv=$('<div></div>').addClass('val').html(nodeValue['infos'][i][key]);
//			if(i==nodeValue['infos'].length-1){
//				oDiv.addClass('cb');
//			}
//			switch(key){
//				case 'containerNo':
//					$('#box1').append(oDiv);
//					break;
//				case 'checkStatus':
//					$('#box2').append(oDiv);
//					break;
//			}
//		}
//	}
})()
