if($('#stylerStyle').length == 0) {
	$('head').append('<style id="stylerStyle">'+ css +'</style>');
	$('head').append('<script id="stylerScript">'+ js +'</script>');
} else {
	$('#stylerStyle').html(css);
	$('#stylerScript').html(js);
}