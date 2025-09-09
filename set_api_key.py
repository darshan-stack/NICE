#!/usr/bin/env python3
"""
Quick script to set your OPENROUTER_API_KEY
"""

import os

def set_api_key():
    api_key = input("Enter your OPENROUTER_API_KEY: ").strip()
    
    if not api_key:
        print("Error: API key cannot be empty")
        return
    
    # Create .env.local with proper UTF-8 encoding
    env_content = f"OPENROUTER_API_KEY={api_key}\n"
    
    try:
        with open('.env.local', 'w', encoding='utf-8') as f:
            f.write(env_content)
        print("✅ API key saved to .env.local")
        
        # Also set as environment variable for current session
        os.environ['OPENROUTER_API_KEY'] = api_key
        print("✅ API key set for current session")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    set_api_key()
