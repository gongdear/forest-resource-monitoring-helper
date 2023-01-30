// 浏览器新建tab页事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === 'loading') {
        chrome.action.setIcon({
            path: {
                '16': chrome.runtime.getURL(`icons/disable.png`),
                '32': chrome.runtime.getURL(`icons/disable.png`),
                '48': chrome.runtime.getURL(`icons/disable.png`),
                '128': chrome.runtime.getURL(`icons/disable.png`),
            },
        });
        chrome.action.setPopup({
            popup: chrome.runtime.getURL(`popups/disable.html`),
        });
    }
});
// 浏览器切换tab页事件
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.action.setIcon({
        path: {
            '16': chrome.runtime.getURL(`icons/disable.png`),
            '32': chrome.runtime.getURL(`icons/disable.png`),
            '48': chrome.runtime.getURL(`icons/disable.png`),
            '128': chrome.runtime.getURL(`icons/disable.png`),
        },
    });
    chrome.action.setPopup({
        popup: chrome.runtime.getURL(`popups/disable.html`),
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    const status = request.greet;
    chrome.action.setIcon({
        path: {
            '16': chrome.runtime.getURL(`icons/${status}.png`),
            '32': chrome.runtime.getURL(`icons/${status}.png`),
            '48': chrome.runtime.getURL(`icons/${status}.png`),
            '128': chrome.runtime.getURL(`icons/${status}.png`),
        },
    });
    chrome.action.setPopup({
        popup: chrome.runtime.getURL(`popups/${status}.html`),
    });
    callback('load success!');
    return true;
});
