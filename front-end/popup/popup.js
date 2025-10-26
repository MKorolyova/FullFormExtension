
async function askAI(language, text) {
  try {
    const response = await fetch('https://localhost:8000/' + 'language?' + language.toString() + '&msg=' + text.toString());

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
