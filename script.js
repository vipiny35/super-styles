$(function() {

	var jsCM;
	var cssCM;

	function init_codemirror(lineWrapping) {
		cssCM = CodeMirror.fromTextArea(document.getElementById('css'), {
			lineNumbers : true,
			mode:  "css",
			theme: 'default csscm',
			indentWithTabs: true,
			lineWrapping: lineWrapping,
			autofocus: true
		});
		jsCM = CodeMirror.fromTextArea(document.getElementById('js'), {
			lineNumbers : true,
			mode:  "javascript",
			theme: 'default jscm',
			indentWithTabs: true,
			lineWrapping: lineWrapping
		});
	}

	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
		var url = tabs[0].url;
		var host = get_hostname(url);

		var width;
		var fontsize;

		fontsize = localStorage['fontsize'];

		if(localStorage['width'] != '' && localStorage['width'] < 781 && localStorage['width'] > 449) {
			width = localStorage['width'];
		} else {
			width = '550';
		}
		$('.width').val(width);
		$('.fontsize').val(fontsize);
		$('body').css('width', width + 'px');

		$('body').prepend('<div class="host">Super Styles - ' + host + '</div>');

		$('.css').val(localStorage[host + '-css']);
		$('.js').val(localStorage[host + '-js']);

		$(document).on('keyup change', function() {
			jsCM.save();
			cssCM.save();
			localStorage[host + '-css'] = $('.css').val();
			localStorage[host + '-js'] = $('.js').val();
			localStorage['width'] = $('.width').val();
			localStorage['fontsize'] = $('.fontsize').val();
			executeScripts(null, 
				[
					{ code: "var css = '"+ addslashes(localStorage[host + '-css'].replace(/(\r\n|\n|\r)/gm,"")) +"';", runAt: 'document_start' },
					{ code: "var js = '"+ addslashes(localStorage[host + '-js'].replace(/(\r\n|\n|\r)/gm,"")) +"';", runAt: 'document_start' },
					{ file: "jquery.js", runAt: 'document_start' },
					{ file: "superstyles.js", runAt: 'document_start' }
				]
			);
		});

		var lineWrapping = false;

		if(localStorage['wrap'] == 1) {
			$('.wrap').prop('checked', true);
			lineWrapping = true;
		}

		$('.wrap').change(function () {
			jsCM.toTextArea();
			cssCM.toTextArea();
			if($('.wrap:checked').length > 0) {
				localStorage['wrap'] = 1;
				lineWrapping = true;
			} else {
				localStorage['wrap'] = 0;
				lineWrapping = false;
			}
			init_codemirror(lineWrapping);
		});

		init_codemirror(lineWrapping);
		$('.codeMirror').css('font-size', fontsize);

	});

});