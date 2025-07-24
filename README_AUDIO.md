# Audio Files for Mission Pikachu

## Required Audio Files

To enable background music, please add these audio files to the project folder:

### Background Music
- **ordinary.mp3** - The main background music file ("Ordinary" by Alex Warren)
- **ordinary.ogg** - Fallback format for better browser compatibility

### File Placement
Place the audio files directly in the project root folder:
```
mission-pikachu/
├── index.html
├── styles.css
├── ordinary.mp3  ← Add this file
├── ordinary.ogg  ← Add this file (optional)
└── other files...
```

### Audio Requirements
- **Format**: MP3 (primary), OGG (fallback)
- **Quality**: Medium quality (128kbps recommended for web)
- **Length**: Full song length
- **Volume**: The app will automatically set volume to 30%

### Autoplay Behavior
- The music will attempt to start automatically when the page loads
- If blocked by browser (common on mobile), it will start on first user interaction
- The music button will show the current status:
  - 🟢 "Now Playing: Ordinary by Alex Warren" (when playing)
  - 🔵 "Click to play Ordinary by Alex Warren" (when ready)
  - 🟡 "Music file not found" (if files are missing)

### Mobile Safari Notes
- iOS Safari requires user interaction before playing audio
- The app handles this automatically by starting music on first tap/click
- Music will loop continuously once started
