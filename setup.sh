#!/bin/bash

echo "Setting up TactixStation environment..."

# Install dependencies for backend (FastAPI example)
pip install fastapi uvicorn requests python-multipart

# Install Node.js dependencies
npm install

echo "Setup complete! You can now start the backend with:"
echo "  uvicorn main:app --reload"

echo "And the frontend with:"
echo "  npm run dev"
