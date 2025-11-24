async function askAI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response; 
  } catch (error) {
    console.error('Fetch error:', error);
    return "Error fetching translation";
  }
}

document.getElementById('translateBtn').addEventListener('click', async () => {
  const language = document.getElementById('languageSelect').value;
  const text = document.getElementById('inputText').value.trim();

  if (text){
    const response = await askAI(`http://127.0.0.1:8000/language/${language.toString()}/msg/${text.toString()}`);
    const data = await response.json();
    document.getElementById('output').textContent = data.translation;
  }

});

document.getElementById('inputText').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('translateBtn').click();
    e.preventDefault();
  }
});


document.addEventListener("DOMContentLoaded", async () => {
  const data = await chrome.storage.local.get("selectedText");
  const response = await askAI(`http://127.0.0.1:8000/languages/`);
  const languagesData = await response.json();
  const languages = languagesData.languages.split(',').map(lang => lang.trim());
  document.getElementById('languageSelect').innerHTML = languages.map(lang => `<option value="${lang}">${lang}</option>`).join('');
  if (data.selectedText) {
    document.getElementById("inputText").value = data.selectedText;

    const language = document.getElementById('languageSelect').value;
    const response = await askAI(`http://127.0.0.1:8000/language/${language}/msg/${data.selectedText}`);
    const translationData = await response.json();
    document.getElementById('output').textContent = translationData.translation;
  }
});


