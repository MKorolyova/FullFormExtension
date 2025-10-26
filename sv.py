from fastapi import FastAPI, HTTPException, Query
import uvicorn
import google.generativeai as genai


app = FastAPI()

genai.configure(api_key="AIzaSyCUgjQA666rHADcSLUTDXOaAuW4K76nyNg")

@app.get("/language/{language}/msg/{msg}")
def translate_text(language: str, msg: str,):
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(f"Explain this abbreviation {msg} (Please respond in {language})")
        return {"translation": response.text.strip(), "language": language}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":

    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
