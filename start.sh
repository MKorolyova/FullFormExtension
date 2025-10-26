#!/bin/bash

if ! command -v python3 &> /dev/null
then
    sudo apt update -y
    sudo apt install -y python3 python3-venv python3-pip
fi

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate

pip install --upgrade pip > /dev/null 2>&1
pip install fastapi uvicorn google-generativeai > /dev/null 2>&1

chmod +x ./sv.py
python3 ./sv.py

