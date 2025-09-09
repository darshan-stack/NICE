import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipientProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    interests: List[str] = []
    hobbies: List[str] = []
    relationship: Optional[str] = None
    personality: List[str] = []
    lifestyle: List[str] = []
    preferences: List[str] = []

class OccasionInfo(BaseModel):
    occasion: str
    mood: Optional[str] = None
    formality: Optional[str] = None
    budget_range: Optional[Dict[str, float]] = None

class FilterOptions(BaseModel):
    category: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    eco_friendly: Optional[bool] = None
    handmade: Optional[bool] = None
    local: Optional[bool] = None
    rating_min: Optional[float] = None
    sort_by: Optional[str] = None

class PromptRequest(BaseModel):
    prompt: str
    recipient_profile: Optional[RecipientProfile] = None
    occasion_info: Optional[OccasionInfo] = None
    filter_options: Optional[FilterOptions] = None

@app.post("/recommend")
@app.post("/api/ai-recommendations")
def recommend_products(req: PromptRequest):
    # Mock response for testing
    mock_products = [
        {
            "id": "1",
            "name": "Wireless Earbuds",
            "description": "High-quality wireless earbuds with noise cancellation",
            "price": 2999,
            "originalPrice": None,
            "rating": 4.7,
            "reviewCount": 100,
            "category": "Electronics",
            "subCategory": "Audio",
            "brand": "Brand",
            "image": "/placeholder.jpg",
            "inStock": True,
            "fastShipping": True,
            "features": ["Noise Cancellation", "Bluetooth 5.0"],
            "suitabilityScore": 9.5,
            "occasionMatch": 8.7,
            "aiReasoning": f"Perfect for {req.prompt}"
        },
        {
            "id": "2",
            "name": "Smart Watch",
            "description": "Fitness tracking smartwatch with heart rate monitor",
            "price": 5999,
            "originalPrice": None,
            "rating": 4.5,
            "reviewCount": 150,
            "category": "Electronics",
            "subCategory": "Wearables",
            "brand": "Brand",
            "image": "/placeholder.jpg",
            "inStock": True,
            "fastShipping": True,
            "features": ["Heart Rate Monitor", "Fitness Tracking"],
            "suitabilityScore": 9.0,
            "occasionMatch": 8.5,
            "aiReasoning": f"Great for {req.prompt}"
        }
    ]
    
    recipient_profile = req.recipient_profile or RecipientProfile(relationship="friend", interests=["technology"])
    occasion_info = req.occasion_info or OccasionInfo(occasion="birthday")
    filter_options = req.filter_options or FilterOptions()
    
    return {
        "success": True,
        "data": {
            "products": mock_products,
            "recipientAnalysis": {
                "age": recipient_profile.age,
                "gender": recipient_profile.gender,
                "relationship": recipient_profile.relationship or "friend",
                "interests": recipient_profile.interests,
                "hobbies": recipient_profile.hobbies,
                "occasion": occasion_info.occasion,
                "budget": {
                    "min": filter_options.price_min or 0,
                    "max": filter_options.price_max or 5000
                } if filter_options.price_min or filter_options.price_max else None
            }
        },
        "ai_recommendations_text": f"Based on your request '{req.prompt}', here are some product recommendations...",
        "recipient_profile": recipient_profile.dict(),
        "occasion_info": occasion_info.dict(),
        "filter_options": filter_options.dict()
    }

@app.post("/greeting-card")
@app.post("/api/greeting-card")
def create_greeting_card(req: dict):
    return {
        "card_id": "test-card-id",
        "content": {
            "title": "Happy Birthday!",
            "message": f"Wishing you a wonderful day filled with joy!",
            "signature": "Best wishes"
        },
        "created_at": "2023-09-09T12:00:00Z"
    }

@app.post("/thank-you")
@app.post("/api/thank-you")
def create_thank_you_note(req: dict):
    return {
        "note_id": "test-note-id",
        "content": f"Thank you so much for the thoughtful gift!",
        "created_at": "2023-09-09T12:00:00Z"
    }

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy", 
        "details": {
            "products": "Mock products for testing",
            "embedding_model": "Mock model for testing",
            "vector_search": "Mock vector search for testing"
        },
        "routes": [
            "/api/ai-recommendations",
            "/recommend",
            "/api/greeting-card", 
            "/greeting-card",
            "/api/thank-you",
            "/thank-you"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
