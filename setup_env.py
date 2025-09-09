#!/usr/bin/env python3
"""
Setup script to create .env.local file with proper encoding
Run this script to set up your environment variables
"""

import os

def create_env_file():
    """Create .env.local file with UTF-8 encoding"""
    
    print("Setting up environment file...")
    
    # Get API key from user
    api_key = input("Enter your OPENROUTER_API_KEY: ").strip()
    
    if not api_key:
        print("Error: API key cannot be empty")
        return False
    
    # Create .env.local content
    env_content = f"""# Environment variables for Gift Recommendation AI
OPENROUTER_API_KEY={api_key}

# Optional: Add other environment variables here
# DATABASE_URL=your_database_url
# DEBUG=true
"""
    
    try:
        # Write with UTF-8 encoding
        with open('.env.local', 'w', encoding='utf-8') as f:
            f.write(env_content)
        
        print("✅ Successfully created .env.local file")
        print("You can now run: python recommendation_service.py")
        return True
        
    except Exception as e:
        print(f"❌ Error creating .env.local: {e}")
        return False

if __name__ == "__main__":
    create_env_file()
