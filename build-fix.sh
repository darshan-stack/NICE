# This script temporarily removes problematic dependencies to allow the build to complete
echo "Backing up package.json..."
cp package.json package.json.bak

echo "Modifying package.json for build compatibility..."
# Use sed to modify the package.json file (simplifying React versions)
sed -i 's/"react": "\^19"/"react": "18.2.0"/g' package.json
sed -i 's/"react-dom": "\^19"/"react-dom": "18.2.0"/g' package.json

echo "Installing dependencies..."
pnpm install

echo "Building application..."
pnpm run build

echo "Restoring original package.json..."
mv package.json.bak package.json

echo "Build process completed."
