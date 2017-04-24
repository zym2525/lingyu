(function(){
	$('#arrow').on('touchstart',function(){
		window.history.back();
	})
	var nodes=eval('('+sessionStorage.getItem('nodes')+')');
	console.log(nodes)
	for(var i=0;i<nodes.length;i++){
		switch(nodes[i]['nodeCode']){
			case 'ZXJG':
				var nodeValue=eval('('+nodes[i]['nodeValue']+')');
				$('#nodeTime').html(nodes[i]['nodeTime']);
//				var mbl=nodes[i]['mbl'];
		}
	}
	console.log(nodeValue)
	$('#wharfName').html(nodeValue['wharfName']);
	for(var i=0;i<nodeValue['infos'].length;i++){
//		var oDiv2=$('<div></div>').addClass('val').html(mbl);
//		$('#box1').append(oDiv2);
		for(var key in nodeValue['infos'][i]){
			var oDiv=$('<div></div>').addClass('val').html("<span>"+nodeValue['infos'][i][key].split(' ')[0]+"</span>");
			if(i==nodeValue['infos'].length-1){
				oDiv.addClass('cb');
			}
			switch(key){
				case 'mbl':
					$('#box1').append(oDiv);
					break;
				case 'containerNo':
					$('#box2').append(oDiv);
					break;
				case 'sealNo':
					$('#box3').append(oDiv);
					break;
				case 'arrivalTime':
					$('#box4').append(oDiv);
					break;
			}
			
		}
	}
})()
