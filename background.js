chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setIcon({ path: "icons/icon16.png" });
  });
  
  // Function to check if the URL is supported
  function checkSupport(url) {
    const supportedUrls = [
      "https://docs.google.com/document/",
      "http://docs.google.com/document/",
      "https://docs.google.com/spreadsheets/",
      "http://docs.google.com/spreadsheets/",
      "https://www.overleaf.com/project/",
      "http://www.overleaf.com/project/"
    ];
    return supportedUrls.some(supportedUrl => url.startsWith(supportedUrl));
  }
  
  // Validate URL and handle errors
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Update icon and storage based on URL
  function updateIconAndStorage(tabId) {
    chrome.tabs.get(tabId, (tab) => {
      if (tab.url && typeof tab.url === 'string' && isValidUrl(tab.url)) {
        const url = new URL(tab.url);
        const isSupported = checkSupport(url.href);
        chrome.action.setIcon({ 
          path: isSupported ? "icons/icon16.png" : "icons/icon16_grey.png" 
        });
        chrome.storage.local.set({ isSupported });
      } else {
        // Handle invalid URL case
        // console.error("Invalid URL:", tab.url);
        chrome.action.setIcon({ path: "icons/icon16_grey.png" });
        chrome.storage.local.set({ isSupported: false });
      }
    });
  }
  
  // Monitor tab changes
  chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId === 0) { // Only for the main frame
      updateIconAndStorage(details.tabId);
    }
  }, { url: [{ urlMatches: '.*' }] });
  
  // Monitor tab activation
  chrome.tabs.onActivated.addListener((activeInfo) => {
    updateIconAndStorage(activeInfo.tabId);
  });
  