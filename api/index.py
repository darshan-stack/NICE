import os
import sys
from pathlib import Path

# Add parent directory to path for imports
parent_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(parent_dir))

# Import the FastAPI app
try:
    from recommendation_service import app
except ImportError as e:
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/health")
    async def health_check():
        return {"status": "error", "message": f"Failed to import app: {str(e)}"}

# Vercel serverless function handler
from fastapi.middleware.cors import CORSMiddleware

# Ensure CORS is configured
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
