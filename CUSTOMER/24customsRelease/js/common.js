(function(){
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	var nodes=eval('('+sessionStorage.getItem('nodes')+')');
	console.log(nodes)
	for(var i=0;i<nodes.length;i++){
		switch(nodes[i]['nodeCode']){
			case 'HGFX':
				var nodeValue=eval('('+nodes[i]['nodeValue']+')');
				$('#nodeTime').html(nodes[i]['nodeTime']);
		}
	}
	console.log(nodeValue)
	$('#vessel').html(nodeValue['vessel']);
	$('#voyage').html(nodeValue['voyage']);
	for(var i=0;i<nodeValue['infos'].length;i++){
		for(var key in nodeValue['infos'][i]){
			var oDiv=$('<div></div>').addClass('val').html(nodeValue['infos'][i][key]);
			if(i==nodeValue['infos'].length-1){
				oDiv.addClass('cb');
			}
			switch(key){
				case 'declaratNo':
					$('#box1').append(oDiv);
					break;
				case 'releaseTime':
					$('#box2').append(oDiv);
					break;
			}
			
		}
	}
})()
