console.log("Service worker started."); // This will show in the extension's service worker console

// Listen for messages from content scripts or other parts of your extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TEXT_SELECTED") {
    console.log("Service worker received selected text:", message.text);
    // Now you can process the text, send it to an API, etc.
    // Example: send it to Gemini API (as discussed in your previous question)
    // generateContentFromGemini(message.text);
  }
});