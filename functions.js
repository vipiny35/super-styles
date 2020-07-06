function executeScripts(tabId, injectDetailsArray) {
	function createCallback(tabId, injectDetails, innerCallback) {
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}

	var callback = null;

	for (var i = injectDetailsArray.length - 1; i >= 0; --i)
		callback = createCallback(tabId, injectDetailsArray[i], callback);

	if (callback !== null)
		callback();   // execute outermost function
}

function addslashes( str ) {
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function cl(data) {
	console.log(data);
}

function get_hostname(url) {
	return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
}