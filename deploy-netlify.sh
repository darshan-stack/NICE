#!/bin/bash

# Clean up any previous build artifacts
rm -rf .next
rm -rf node_modules

# Install dependencies with frozen lockfile for reliability
echo "Installing dependencies with PNPM..."
pnpm install --frozen-lockfile

# Build the Next.js app with verbose output
echo "Building Next.js application..."
NODE_OPTIONS=--max_old_space_size=4096 pnpm run build

# If the build was successful, prepare for Netlify
if [ $? -eq 0 ]; then
    echo "Build successful! Preparing for Netlify deployment..."
    
    # Ensure _redirects is present in the output directory
    cp -f public/_redirects .next/
    
    echo "Deployment preparation complete!"
else
    echo "Build failed. Please check the error messages above."
    exit 1
fi
