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
    } else {
        console.log(tab);
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    chrome.action.setIcon({
        path: {
            '16': chrome.runtime.getURL(`icons/active.png`),
            '32': chrome.runtime.getURL(`icons/active.png`),
            '48': chrome.runtime.getURL(`icons/active.png`),
            '128': chrome.runtime.getURL(`icons/active.png`),
        },
    });
    chrome.action.setPopup({
        popup: chrome.runtime.getURL(`popups/active.html`),
    });
    callback('load success!');
    return true;
});
