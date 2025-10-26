
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    console.log("Selected text from content script:", selectedText);
    chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
  }
});
