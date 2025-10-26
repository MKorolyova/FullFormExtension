from fastapi import FastAPI, HTTPException, Query
import google.generativeai as genai

app = FastAPI()

genai.configure(api_key="AIzaSyCUgjQA666rHADcSLUTDXOaAuW4K76nyNg")

@app.get("/translate-text")
def translate_text(
    prompt: str = Query(..., description="Text prompt to generate"),
    language: str = Query(..., description="Language for the output")
):
    try:
        client = genai.Client()
        response = client.models.generate_text(
            model="gemini-2.5-flash",
            prompt=f"{prompt} (Please respond in {language})"
        )
        return {"generated_text": response.text.strip(), "language": language}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
