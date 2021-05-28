chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
  })

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url);
    });
});