// listen for a tab to be updaated
chrome.tabs.onUpdated.addListener((tabId , changeInfo, tab) => {
    
    // when the tab content successfully loaded
    if (changeInfo.status === 'complete') {
        
        // select emmediately the active tab
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
            var url = tabs[0].url;
            
            // the current tab's url contains this string
            if (url.includes('fanrock=true')) {

                // send a message to the current (active) tab
                chrome.tabs.sendMessage(tabs[0].id, {data: 'load modal'}, (response) => {});
            }
        });
    }
});