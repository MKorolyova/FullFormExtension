chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "OPEN_POPUP") {
    await chrome.storage.local.set({ selectedText: message.text });
    await chrome.action.openPopup();
  }
});
