//互换
$('#exchange').on('touchstart',function(){
	var temp;
	temp=$('#start_box em').html();
	$('#start_box em').html($('#end_box em').html());
	$('#end_box em').html(temp);
})
