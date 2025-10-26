from fastapi import FastAPI, HTTPException, Query
import uvicorn
import google.generativeai as genai


app = FastAPI()

genai.configure(api_key="AIzaSyCUgjQA666rHADcSLUTDXOaAuW4K76nyNg")

@app.get("/language/{language}/msg/{msg}")
def translate_text(language: str, msg: str,):
    try:
        model = genai.GenerativeModel('gemini-flash-lite-latest')
        response = model.generate_content(f"Given the input text {msg} and the target language {language}, follow these rules strictly: If {msg} is an abbreviation, first expand it to its full English phrase. Then, translate that full English phrase into {language}. Output format: `Full English phrase - Full phrase in {language}`. Do not include any other text, explanations, or punctuation beyond this specific format. If {msg} is normal text (not an abbreviation), translate it directly into {language}. Output format: `Translation in {language}`. Provide only the translation, without any additional text, preambles, or punctuation marks.  Input: {msg} Language: {language} Output:") 
        return {"translation": response.text.strip(), "language": language}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/languages/")
def get_supported_languages():
    try:
        model = genai.GenerativeModel('gemini-flash-lite-latest')
        response = model.generate_content(f"Give me a list of 15 the most common supported languages for translation separated by commas and nothing else.")
        return {"languages": response.text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
