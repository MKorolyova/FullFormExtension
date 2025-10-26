
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    console.log("Selected text from content script:", selectedText);
    chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
    chrome.runtime.sendMessage({ type: "OPEN_TRANSLATOR", text: selectedText });

  }
});

function showPopup(text) {
  chrome.runtime.sendMessage({ type: "OPEN_POPUP", text });
}

let translateButton = null;

// Function to remove the button
function removeButton() {
  if (translateButton) {
    translateButton.remove();
    translateButton = null;
  }
}

document.addEventListener("mouseup", (event) => {
  const selectedText = window.getSelection().toString().trim();
  removeButton(); // remove previous button

  if (selectedText.length > 0) {
    console.log("Selected text:", selectedText);

    // Create the floating button
    translateButton = document.createElement("button");
    translateButton.innerText = "🔤 Translate";
    translateButton.id = "translate-btn";

    // Style the button (defined also in CSS for better control)
    translateButton.style.position = "absolute";
    translateButton.style.top = `${event.pageY + 10}px`;
    translateButton.style.left = `${event.pageX + 10}px`;
    translateButton.style.zIndex = "999999";
    translateButton.style.padding = "6px 10px";
    translateButton.style.background = "#4A90E2";
    translateButton.style.color = "white";
    translateButton.style.border = "none";
    translateButton.style.borderRadius = "6px";
    translateButton.style.cursor = "pointer";
    translateButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    document.body.appendChild(translateButton);

    // Button click handler
    translateButton.addEventListener("click", () => {
      console.log("Button clicked for:", selectedText);
      showPopup(selectedText, event.pageX, event.pageY);
      removeButton();
    });
  }
});

// Remove the button if user clicks elsewhere
document.addEventListener("click", (e) => {
  if (translateButton && !translateButton.contains(e.target)) {
    removeButton();
  }
});

  // Click anywhere else → close popup
  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target)) popup.remove();
  });


