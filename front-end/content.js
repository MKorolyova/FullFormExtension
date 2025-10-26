
let selectionButton = null;
let currentSelectedText = '';

function createOrShowSelectionButton(x, y) {
  if (!selectionButton) {
    selectionButton = document.createElement('button');
    selectionButton.textContent = 'Perform Action'; 
    selectionButton.id = 'chrome-ext-selection-button'; 

    Object.assign(selectionButton.style, {
      position: 'absolute',
      zIndex: '99999', 
      backgroundColor: '#4285F4', 
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      transition: 'opacity 0.2s ease-in-out',
      opacity: '0' 
    });


    selectionButton.addEventListener('click', (event) => {
      event.stopPropagation(); 
      console.log('Button clicked! Selected text:', currentSelectedText);
      chrome.runtime.sendMessage({ type: "OPEN_POPUP", text: currentSelectedText });
      hideSelectionButton();
      window.getSelection().empty();
    });

    document.body.appendChild(selectionButton);
  }

  selectionButton.style.left = `${x}px`;
  selectionButton.style.top = `${y}px`;
  selectionButton.style.opacity = '1';
  selectionButton.style.pointerEvents = 'auto';
}

function hideSelectionButton() {
  if (selectionButton) {
    selectionButton.style.opacity = '0'; 
    selectionButton.style.pointerEvents = 'none';

    setTimeout(() => {
      if (selectionButton && selectionButton.parentNode) {
        selectionButton.parentNode.removeChild(selectionButton);
        selectionButton = null; 
      }
    }); 
  }
}


document.addEventListener('mouseup', (event) => {
  const selection = window.getSelection();
  currentSelectedText = selection.toString().trim();

  if (currentSelectedText.length > 0 && !selectionButton?.contains(event.target)) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const buttonX = rect.right + window.scrollX - 50; 
    const buttonY = rect.bottom + window.scrollY + 5; 

    createOrShowSelectionButton(buttonX, buttonY);
  } else if (!selectionButton?.contains(event.target)) { 
    hideSelectionButton();
  }
});


document.addEventListener('mousedown', (event) => {
  if (selectionButton && !selectionButton.contains(event.target) && window.getSelection().toString().trim().length === 0) {
    hideSelectionButton();
  }
});
