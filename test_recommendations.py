#!/usr/bin/env python3
"""
Test script for the recommendation API
Shows example prompts that work well with the system
"""

import requests
import json

API_BASE = "http://localhost:8000"

def test_recommendation(prompt, description=""):
    """Test a recommendation prompt"""
    print(f"\n{'='*60}")
    print(f"TEST: {description}")
    print(f"PROMPT: {prompt}")
    print(f"{'='*60}")
    
    try:
        response = requests.post(f"{API_BASE}/recommend", 
                               json={"prompt": prompt},
                               headers={"Content-Type": "application/json"})
        
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS!")
            print("\nRECOMMENDATIONS:")
            print(result["recommendations"])
            print(f"\nRecipient Profile: {result['recipient_profile']}")
        else:
            print(f"❌ ERROR {response.status_code}: {response.text}")
            
    except Exception as e:
        print(f"❌ CONNECTION ERROR: {e}")

def main():
    """Run recommendation tests"""
    
    # Test 1: Simple gift request
    test_recommendation(
        "I need a gift for my tech-savvy brother who loves gaming",
        "Tech-savvy gaming enthusiast"
    )
    
    # Test 2: Occasion-specific
    test_recommendation(
        "Birthday gift for my 25-year-old girlfriend who loves fitness and yoga",
        "Birthday gift for fitness lover"
    )
    
    # Test 3: Budget-conscious
    test_recommendation(
        "Affordable gift under 1000 rupees for my colleague who drinks a lot of coffee",
        "Budget-friendly coffee lover gift"
    )
    
    # Test 4: Specific interests
    test_recommendation(
        "Gift for someone who loves reading cooking books and trying new recipes",
        "Cooking enthusiast gift"
    )
    
    # Test 5: Fashion-focused
    test_recommendation(
        "Stylish accessory for my fashion-conscious sister",
        "Fashion accessory gift"
    )

if __name__ == "__main__":
    print("🎁 Gift Recommendation API Test Suite")
    print("Make sure the recommendation service is running on localhost:8000")
    
    # Check if server is running
    try:
        response = requests.get(f"{API_BASE}/health")
        if response.status_code == 200:
            print("✅ Server is running!")
            main()
        else:
            print("❌ Server health check failed")
    except:
        print("❌ Server is not running. Start it with: python recommendation_service.py")
