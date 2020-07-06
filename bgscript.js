/*
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage")
		sendResponse({data: localStorage[request.key]});
	else
		sendResponse({}); // snub them.
});
*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var url = tab.url;
	var host = get_hostname(url);
	executeScripts(tabId, 
		[
			{ code: "var css = '"+ addslashes(localStorage[host + '-css'].replace(/(\r\n|\n|\r)/gm,"")) +"';", runAt: 'document_start' },
			{ code: "var js = '"+ addslashes(localStorage[host + '-js'].replace(/(\r\n|\n|\r)/gm,"")) +"';", runAt: 'document_start' },
			{ file: "jquery.js", runAt: 'document_start' },
			{ file: "styler.js", runAt: 'document_start' }
		]
	);

});