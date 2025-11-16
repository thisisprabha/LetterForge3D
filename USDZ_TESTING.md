# USDZ Export Testing Guide

## How USDZ Export Works

**Current Behavior:**
- ✅ Exports **only the currently selected letter** (0-9)
- ✅ Creates a proper USDZ ZIP file with geometry and material properties
- ✅ Includes glass material properties (IOR, roughness, transmission, color)

**To Export All Letters:**
Currently, you need to export each letter individually. Future enhancement could add batch USDZ export.

## Testing on iOS Simulator

### Method 1: Using the Test Page

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open the test page:**
   - Navigate to: `http://localhost:5173/test-usdz.html`
   - Or: `http://YOUR_IP:5173/test-usdz.html` (for iOS Simulator)

3. **In iOS Simulator:**
   - Open Safari
   - Go to the test page URL
   - Drag & drop a USDZ file or click to upload
   - The model will display using `<model-viewer>`

### Method 2: Direct File Testing

1. **Export a USDZ file from the app:**
   - Select a letter (0-9)
   - Choose "USDZ (iOS 3D)" format
   - Click "Export Current"

2. **In iOS Simulator:**
   - Drag the `.usdz` file into Safari
   - Or use the Files app to open it

## Testing on Real iPhone/iPad

### Method 1: AR Quick Look (Best for AR)

1. **Export USDZ from the app** (same as above)

2. **Transfer to iPhone:**
   - Email it to yourself
   - AirDrop it
   - Upload to iCloud Drive
   - Or host it on a web server

3. **Open in AR Quick Look:**
   - Tap the USDZ file in Mail/Files
   - Or open the test page (`test-usdz.html`) in Safari
   - Tap the "View in AR" button
   - iOS will open AR Quick Look automatically

### Method 2: Web Testing

1. **Host the app or test page:**
   ```bash
   npm run dev
   # Note the local IP address
   ```

2. **On iPhone:**
   - Connect to same WiFi network
   - Open Safari
   - Go to: `http://YOUR_IP:5173/test-usdz.html`
   - Upload USDZ file
   - Tap AR button for AR Quick Look

## Test Page Features

The `test-usdz.html` page includes:
- ✅ Drag & drop USDZ file upload
- ✅ 3D model viewer (using `<model-viewer>`)
- ✅ AR Quick Look link for iOS
- ✅ Works in iOS Simulator
- ✅ Works on real iPhone/iPad

## Troubleshooting

### USDZ file not opening?
- ✅ Make sure it's a valid ZIP file (we now create proper ZIP archives)
- ✅ Check file extension is `.usdz`
- ✅ Try opening in Files app first

### AR not working?
- ✅ AR Quick Look requires iOS 12+
- ✅ Must be on a real device (not simulator)
- ✅ Camera permissions may be needed

### Model not displaying?
- ✅ Check browser console for errors
- ✅ Ensure `<model-viewer>` library loaded
- ✅ Try a different USDZ file

## Next Steps

To export all letters 0-9 at once, we could add:
- Batch USDZ export function
- ZIP file containing all letters
- Or individual files for each letter

