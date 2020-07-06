if($('#superStyles').length == 0) {
	$('head').append('<style id="superStyles">'+ css +'</style>');
	$('head').append('<script id="superScripts">'+ js +'</script>');
} else {
	$('#superStyles').html(css);
	$('#superScripts').html(js);
}