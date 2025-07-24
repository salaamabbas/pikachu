# Mission Pikachu: Unlock Your Surprise 💚⚡

A romantic interactive quiz website with beautiful 3D tilt effects and personalized photos for Mummy Lubnah.

## ✨ Features Added

### 🎴 3D Tilt Card Effects
- **Memory Photos**: Each quiz mission displays a beautiful photo with 3D tilt effects
- **Love Letter**: The handwritten letter card tilts and glows on hover
- **Music Card**: Animated vinyl record with spinning effects
- **Option Buttons**: All buttons now have subtle 3D tilt interactions

### 🎵 Enhanced Music Experience
- **Animated Vinyl Record**: Spins when "Ordinary" by Alex Warren is playing
- **Music Card Design**: Beautiful album cover-style presentation
- **Floating Music Notes**: Gentle animation effects

### 📸 Photo Integration
- **Mission-Specific Photos**: Each quiz question shows a related memory photo
- **Hover Effects**: Photos zoom and reveal captions on hover
- **Placeholder Images**: Currently using placeholder images with themed colors

## 🔧 How to Add Real Photos

### Step 1: Add Photo Files
1. Create a `photos` folder in the project directory
2. Add your photos with these names:
   - `laughter.jpg` - For Mission 1 (weird laughter)
   - `math.jpg` - For Mission 2 (math homework help)
   - `pool.jpg` - For Mission 3 (BSK swimming pool)

### Step 2: Update Photo URLs
In `script.js`, replace the placeholder URLs:

```javascript
// Replace these lines in the quizData array:
photo: "https://via.placeholder.com/300x200/FFD3E1/2D5A3D?text=Mummy+Lubnah+Laughing+💚",
// With:
photo: "./photos/laughter.jpg",

photo: "https://via.placeholder.com/300x200/A8E6CF/D63384?text=Math+Pikachu+Pro+⚡",
// With:
photo: "./photos/math.jpg",

photo: "https://via.placeholder.com/300x200/87CEEB/FF6B9D?text=BSK+Pool+Memory+🏊‍♀️",
// With:
photo: "./photos/pool.jpg",
```

### Step 3: Add Real Music (Optional)
1. Download "Ordinary" by Alex Warren as an MP3 file
2. Save it as `ordinary.mp3` in the project folder
3. Update the audio source in `index.html`:
```html
<source src="./ordinary.mp3" type="audio/mpeg">
```

## 🎮 How to Use

1. Open `index.html` in a web browser
2. Click "Start Mission 🚀"
3. Complete all 3 missions by selecting the correct answers
4. Enjoy the beautiful love letter and final Pikachu hug!

## 💝 Special Effects

- **3D Tilt**: Hover over any card to see beautiful 3D tilt effects
- **Photo Zoom**: Hover over photos to see them zoom with captions
- **Vinyl Animation**: Music card spins when playing
- **Phone Vibration**: Final hug screen vibrates on mobile devices
- **Confetti Rain**: Celebration effects with hearts and leaves

## 🎨 Color Scheme

- **Pastel Green**: #a8e6cf (forest theme)
- **Blush Pink**: #ffd3e1 (romantic theme)
- **Pikachu Yellow**: #ffd93d (accent color)
- **Deep Green**: #2d5a3d (text color)
- **Pink Accent**: #d63384 (highlights)

Enjoy your magical Pikachu surprise! 🤗💚⚡
