# AI Translation Chrome Extension

## Project Description
This project is a Chrome Extension that communicates with a locally running FastAPI backend to translate text using the Gemini AI model. The extension captures user-selected text → sends it to your Python server → receives the translation → displays it instantly.

## Features
 - Select text on any webpage and translate it immediately through the popup interface.
 - Automatically expands abbreviations to full English phrases before translating.
 - Retrieves a list of common translation languages from the backend.
 - Uses Google Gemini Flash Lite for accurate, AI-powered translation.

## Getting Started

### Prerequisites
- Gemini API key
- Python 3.13+
- `fastapi` is web framework for building the API
- `uvicorn` is ASGI server for running FastAPI
- `python-dotenv` for loading environment variables
- `google-generativeai` is SDK for interacting with Google's Generative AI models

Install dependencies:
```bash
pip install fastapi
pip install uvicorn
pip install python-dotenv
pip install google-generativeai
```

### Upload the Extension to Chrome
 - Open Chrome
 - Go to: chrome://extensions/
 - Enable Developer Mode (top-right toggle)
 - Click Load unpacked
 - Select the front-end/ folder

### Run the Python Server Locally
Open a terminal in the project root directory and run:

```bash
python sv.py
```

The server will start at: http://127.0.0.1:8000

