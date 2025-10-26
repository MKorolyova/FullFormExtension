
let selectedText = "";
 document.getElementById('inputText').setAttribute('value', selectedText);


async function askAI(language, text) {
  try {
    const response = await fetch(' http://127.0.0.1:8000/' + 'language/' + language.toString() + '/msg/' + text.toString());

    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.translation; 
  
  } catch (error) {
    console.error('Fetch error:', error);
    return "Error fetching translation";
  }
}

document.getElementById('translateBtn').addEventListener('click', async () => {
  const language = document.getElementById('languageSelect').value;
  const text = document.getElementById('inputText').value.trim();

  if (text){
    const translation = await askAI(language, text);
    document.getElementById('output').textContent = translation;
  }

});

document.getElementById('inputText').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('translateBtn').click();
    e.preventDefault();
  }
});

chrome.runtime.onMessage.addListener((message, sender), async ()=> {
  if (message.type === "TEXT_SELECTED") {
    const language = document.getElementById('languageSelect').value;
    const translation = await askAI(language, text);
    selectedText = message.text;
    document.getElementById('inputText').setAttribute('value', message.text);
    document.getElementById('output').textContent = translation;
  }
});


