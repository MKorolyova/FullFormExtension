import { GoogleGenAI } from "@google/genai";



document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputText');
  const btn = document.getElementById('translateBtn');
  const output = document.getElementById('output');
  const language = document.getElementById('languageSelect');


    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({});

async function askAI(language) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "translate the following text to " + language +  text,
  });
  return response.text;
}


  function showMessage(msg){
    output.textContent = msg;
  }

  btn.addEventListener('click', () => {
    const text = (input.value || '').trim();
    if (!text) {
        translation = background.askAI(language.value, text);
    }
    showMessage(translation);
  });


  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      btn.click();
      e.preventDefault();
    }
  });
});

