#!/bin/bash

[ ! -d "venv" ] && python3 -m venv venv
source venv/bin/activate

pip install --upgrade pip > /dev/null 2>&1
pip install fastapi uvicorn google-generativeai > /dev/null 2>&1

chmod +x ./sv.py

./sv.py

