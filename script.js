// Test if script is loading
console.log('🚀 SCRIPT LOADED - Mission Pikachu starting!');

// Quiz data - Using real photos!
const quizData = [
    {
        mission: "Mission 1",
        question: "Who has the weirdest laughter?",
        options: ["Pikachu Salaam", "Pikachu Leilah", "Both"],
        correct: 1,
        feedback: "🤣 Correct! Nothing beats your weird Pikachu laughter, Mummy Lubnah!",
        photo: "./laughter.jpg", // Your photo of her laughing
        caption: "That infectious Pikachu laughter we all love! 😂",
        wrongFeedback: "Try again! We both know whose laugh is the most adorable! 😘"
    },
    {
        mission: "Mission 2", 
        question: "Who will help Lubnah with her math homework?",
        options: ["Pikachu Salaam", "Pikachu Leilah", "ChatGPT"],
        correct: 1,
        feedback: "✔️ Correct! You're the Math Pikachu Pro, Mummy Lubnah, and Lubnah will be lucky to have you!",
        photo: "./math.jpg", // Your photo related to math/studying
        caption: "Our brilliant Math Pikachu ready to help! 📚⚡",
        wrongFeedback: "Come on! We both know you're the math genius here! 🧙‍♀️"
    },
    {
        mission: "Mission 3",
        question: "Who almost drowned at BSK swimming pool?",
        options: ["Pikachu Salaam", "Pikachu Leilah", "The Lifeguard"],
        correct: 1,
        feedback: "🤣 Correct! That moment will go down in Pikachu history, Mummy Lubnah!",
        photo: "./pool.jpg", // Your photo from BSK swimming pool
        caption: "The legendary BSK swimming pool adventure! 🏊‍♀️😅",
        wrongFeedback: "Really? We both know who the pool adventure star was! 😂💦"
    },
    {
        mission: "Mission 4",
        question: "Who is the one and only Kagujje? 👑💕",
        options: ["Pikachu Leilah", "Pikachu Salaam", "Both are Kagujjes"],
        correct: 1,
        feedback: "💖 Absolutely right! Salaam is THE Kagujje - your king, your heart, your everything! The one who loves you beyond words and dreams of forever with his beautiful Pikachu! 👑✨",
        photo: "./laughter.jpg", // Using existing photo as placeholder
        caption: "The Kagujje who adores his Pikachu Queen! 👑💕",
        wrongFeedback: "My love, there's only ONE Kagujje in this world, and he's completely crazy about you! 😘👑"
    }
];

// Game state
let currentMission = 0;
let completedMissions = 0;

// DOM elements - will be initialized after DOM loads
let screens = {};
let elements = {};

// Initialize the app
function init() {
    // Initialize DOM elements
    screens = {
        welcome: document.getElementById('welcome-screen'),
        quiz: document.getElementById('quiz-screen'),
        letter: document.getElementById('letter-screen'),
        hug: document.getElementById('hug-screen')
    };

    elements = {
        startBtn: document.getElementById('start-btn'),
        missionTitle: document.getElementById('mission-title'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        feedback: document.getElementById('feedback'),
        nextBtn: document.getElementById('next-btn'),
        progressFill: document.querySelector('.progress-fill'),
        keys: document.querySelectorAll('.key'),
        playMusicBtn: document.getElementById('play-music'),
        backgroundMusic: document.getElementById('background-music'),
        hugBtn: document.getElementById('hug-btn'),
        giggleSound: document.getElementById('giggle-sound'),
        restartBtn: document.getElementById('restart-btn')
    };
    
    // Add event listeners
    elements.startBtn.addEventListener('click', startQuiz);
    elements.nextBtn.addEventListener('click', nextMission);
    elements.playMusicBtn.addEventListener('click', toggleMusic);
    elements.hugBtn.addEventListener('click', showHugScreen);
    elements.restartBtn.addEventListener('click', restartExperience);
    
    // Initialize 3D tilt effects
    initTiltEffects();
}

// 3D Tilt Effect Function
function initTiltEffects() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });
}

// Screen transition function
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Start the quiz
function startQuiz() {
    showScreen('quiz');
    loadMission();
}

// Load current mission
function loadMission() {
    console.log('Loading mission:', currentMission, 'Total missions:', quizData.length);
    
    if (currentMission >= quizData.length) {
        console.log('All missions completed, showing letter');
        showScreen('letter');
        return;
    }
    
    const mission = quizData[currentMission];
    console.log('Mission data:', mission);
    elements.missionTitle.textContent = mission.mission;
    elements.questionText.textContent = mission.question;
    
    // Update memory photo with error handling
    const memoryImg = document.getElementById('memory-img');
    const photoCaption = document.getElementById('photo-caption');
    
    // Add error handling for photos
    memoryImg.onerror = function() {
        // Fallback to placeholder if photo doesn't load
        const fallbackPhotos = {
            'laughter.jpg': 'https://via.placeholder.com/300x200/FFD3E1/2D5A3D?text=Mummy+Lubnah+Laughing+💚',
            'math.jpg': 'https://via.placeholder.com/300x200/A8E6CF/D63384?text=Math+Pikachu+Pro+⚡',
            'pool.jpg': 'https://via.placeholder.com/300x200/87CEEB/FF6B9D?text=BSK+Pool+Memory+🏊‍♀️'
        };
        const photoName = mission.photo.split('./')[1];
        this.src = fallbackPhotos[photoName] || 'https://via.placeholder.com/300x200/FFD3E1/A8E6CF?text=Beautiful+Memory+💚';
    };
    
    memoryImg.src = mission.photo;
    photoCaption.textContent = mission.caption;
    
    // Update progress bar
    const progress = ((currentMission + 1) / quizData.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    
    // Clear previous options and feedback
    elements.optionsContainer.innerHTML = '';
    elements.feedback.classList.remove('show');
    elements.nextBtn.style.display = 'none';
    
    // Create option buttons with tilt effect
    mission.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn tilt-card';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        elements.optionsContainer.appendChild(button);
    });
    
    // Re-initialize tilt effects for new elements
    setTimeout(() => initTiltEffects(), 100);
}

// Handle option selection
function selectOption(selectedIndex) {
    console.log('selectOption called with index:', selectedIndex, 'current mission:', currentMission);
    const mission = quizData[currentMission];
    console.log('Current mission data:', mission);
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.style.pointerEvents = 'none');
    
    if (selectedIndex === mission.correct) {
        console.log('Correct answer selected!');
        // Correct answer
        buttons[selectedIndex].classList.add('correct');
        elements.feedback.textContent = mission.feedback;
        elements.feedback.classList.add('show');
        
        // Unlock key animation
        if (elements.keys[currentMission]) {
            elements.keys[currentMission].classList.add('unlocked');
        }
        completedMissions++;
        console.log('Completed missions:', completedMissions);
        
        // Show next button or finish
        setTimeout(() => {
            elements.nextBtn.style.display = 'block';
            if (currentMission < quizData.length - 1) {
                console.log('Setting up next mission button');
                elements.nextBtn.textContent = 'Next Mission ➡️';
                elements.nextBtn.onclick = nextMission;
            } else {
                console.log('All missions completed, setting up letter button');
                // All missions completed, show continue to letter button
                elements.nextBtn.textContent = 'Open Your Love Letter 💌';
                elements.nextBtn.onclick = () => showScreen('letter');
            }
        }, 2000);
    } else {
        // Incorrect answer with personalized feedback
        buttons[selectedIndex].classList.add('incorrect');
        elements.feedback.textContent = mission.wrongFeedback || "Nice try, my beautiful Pikachu! But we both know the real answer! 😘💚";
        elements.feedback.classList.add('show');
        
        // Add a playful shake animation to the photo
        const memoryPhoto = document.getElementById('memory-photo');
        memoryPhoto.style.animation = 'shake 0.5s ease-in-out';
        
        // Re-enable buttons after a delay
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.style.pointerEvents = 'auto';
                btn.classList.remove('incorrect');
            });
            elements.feedback.classList.remove('show');
            memoryPhoto.style.animation = '';
        }, 3000);
    }
}

// Move to next mission
function nextMission() {
    console.log('nextMission called, current mission:', currentMission);
    if (currentMission < quizData.length - 1) {
        currentMission++;
        console.log('Moving to mission:', currentMission);
        loadMission();
        // Reset the next button onclick to default
        elements.nextBtn.onclick = nextMission;
    } else {
        console.log('All missions completed, should show letter');
        showScreen('letter');
    }
}

// Toggle background music
function toggleMusic() {
    const vinylRecord = document.querySelector('.vinyl-record');
    
    if (!elements.backgroundMusic) {
        console.log('Background music element not found');
        return;
    }
    
    if (elements.backgroundMusic.paused) {
        elements.backgroundMusic.play().then(() => {
            console.log('Music started successfully');
            elements.playMusicBtn.textContent = '🎵 Now Playing: "Ordinary" by Alex Warren';
            if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
        }).catch(e => {
            console.log('Music play failed:', e);
            elements.playMusicBtn.textContent = '🎵 Click to enable music 🎵';
        });
    } else {
        elements.backgroundMusic.pause();
        elements.playMusicBtn.textContent = '🎵 Play "Ordinary" by Alex Warren 🎵';
        if (vinylRecord) vinylRecord.style.animationPlayState = 'paused';
    }
}

// Play voice note
function playVoiceNote() {
    // Since we don't have an actual voice file, we'll show a message
    elements.voiceNoteBtn.textContent = '🎤 "I love you, Mummy Lubnah" ❤️';
    setTimeout(() => {
        elements.voiceNoteBtn.textContent = '🎤 Play Voice Message';
    }, 3000);
}

// Show hug screen with effects
function showHugScreen() {
    showScreen('hug');
    
    // Trigger phone vibration if supported
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 500]);
    }
    
    // Play giggle sound effect (placeholder)
    try {
        elements.giggleSound.play();
    } catch (e) {
        console.log('Giggle sound not available');
    }
    
    // Add surprise animations
    setTimeout(() => {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach((confetti, index) => {
            setTimeout(() => {
                confetti.style.animation = 'confettiFall 2s linear infinite';
            }, index * 100);
        });
        
        // Add surprise message popup
        showSurpriseMessage();
    }, 500);
    
    // Animate love counter
    animateLoveCounter();
}

// Surprise message popup
function showSurpriseMessage() {
    const surpriseMessages = [
        "You're reading this because you're AMAZING! 💚",
        "Plot twist: I fall in love with you more every day! 😍",
        "Fun fact: You're the best thing that ever happened to me! ⚡",
        "Breaking news: You're absolutely perfect! 📰💖",
        "Did you know? Your smile is my favorite view! 😊"
    ];
    
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'surprise-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">×</span>
            <h3>💚 Surprise Message! 💚</h3>
            <p>${randomMessage}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="popup-btn">Aww, I love you too! 🥰</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 8000);
}

// Animate love counter
function animateLoveCounter() {
    const counter = document.getElementById('love-counter');
    const symbols = ['∞', '💚', '⚡', '💖', '🥰', '∞'];
    let index = 0;
    
    const interval = setInterval(() => {
        counter.textContent = symbols[index];
        index = (index + 1) % symbols.length;
    }, 800);
    
    // Stop after 10 seconds and show infinity
    setTimeout(() => {
        clearInterval(interval);
        counter.textContent = '∞';
    }, 10000);
}

// Global audio context for better performance
let globalAudioContext = null;

// Initialize audio context
function initAudioContext() {
    if (!globalAudioContext) {
        try {
            globalAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Audio context initialized');
        } catch (error) {
            console.log('Audio context initialization failed:', error);
        }
    }
    
    if (globalAudioContext && globalAudioContext.state === 'suspended') {
        globalAudioContext.resume().then(() => {
            console.log('Audio context resumed');
        });
    }
}

// Add some interactive sound effects
function playClickSound() {
    try {
        if (!globalAudioContext) {
            initAudioContext();
        }
        
        if (!globalAudioContext || globalAudioContext.state !== 'running') {
            console.log('Audio context not ready');
            return;
        }
        
        const oscillator = globalAudioContext.createOscillator();
        const gainNode = globalAudioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(globalAudioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, globalAudioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, globalAudioContext.currentTime + 0.1);
        
        oscillator.start(globalAudioContext.currentTime);
        oscillator.stop(globalAudioContext.currentTime + 0.1);
        
        console.log('Click sound played');
    } catch (error) {
        console.log('Click sound failed:', error);
    }
}

// Add touch support for mobile
document.addEventListener('touchstart', () => {
    // Enable audio context on first touch for mobile devices
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

// Restart the entire experience
function restartExperience() {
    // Reset game state
    currentMission = 0;
    completedMissions = 0;
    
    // Reset progress bar
    elements.progressFill.style.width = '0%';
    
    // Reset keys
    elements.keys.forEach(key => {
        key.classList.remove('unlocked');
    });
    
    // Reset next button
    elements.nextBtn.style.display = 'none';
    elements.nextBtn.textContent = 'Next Mission ➡️';
    elements.nextBtn.onclick = nextMission;
    
    // Reset music
    elements.backgroundMusic.pause();
    elements.playMusicBtn.textContent = '🎵 Play "Ordinary" by Alex Warren';
    const vinylRecord = document.querySelector('.vinyl-record');
    if (vinylRecord) {
        vinylRecord.style.animationPlayState = 'paused';
    }
    
    // Go back to welcome screen
    showScreen('welcome');
}

// Prevent zoom on double tap for better mobile experience
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);



// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    init(); // Call the init function
    
    // Start with mission 0
    currentMission = 0;
    completedMissions = 0;
    
    console.log('Total quiz data length:', quizData.length);
    console.log('Quiz data:', quizData);
    console.log('Loading mission:', currentMission);
    
    // Check if elements are properly initialized
    console.log('Elements check:', {
        missionTitle: !!elements.missionTitle,
        questionText: !!elements.questionText,
        optionsContainer: !!elements.optionsContainer,
        feedback: !!elements.feedback,
        nextBtn: !!elements.nextBtn,
        keys: elements.keys ? elements.keys.length : 0
    });
    
    loadMission(currentMission);
    
    // Initialize audio context on first user interaction
    const initAudio = () => {
        initAudioContext();
        console.log('Audio initialized on user interaction');
    };
    
    // Add click sounds to all buttons
    document.addEventListener('click', (e) => {
        initAudio();
        if (e.target.tagName === 'BUTTON') {
            setTimeout(() => playClickSound(), 100);
        }
    });
    
    // Also add touch events for mobile
    document.addEventListener('touchstart', (e) => {
        initAudio();
        if (e.target.tagName === 'BUTTON') {
            setTimeout(() => playClickSound(), 100);
        }
    });
    
    // Setup background music with user interaction
    const backgroundMusic = document.getElementById('background-music');
    let musicStarted = false;
    
    if (backgroundMusic) {
        // Set volume to a comfortable level
        backgroundMusic.volume = 0.3;
        backgroundMusic.loop = true;
        
        // Function to start music
        const startMusic = () => {
            if (!musicStarted && backgroundMusic) {
                backgroundMusic.play().then(() => {
                    musicStarted = true;
                    console.log('Background music started!');
                    // Update music button
                    const playBtn = elements.playMusicBtn;
                    const vinylRecord = document.querySelector('.vinyl-record');
                    if (playBtn) playBtn.textContent = '🎵 Playing "Ordinary" by Alex Warren 🎵';
                    if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
                }).catch(e => {
                    console.log('Music play failed:', e);
                    const playBtn = elements.playMusicBtn;
                    if (playBtn) playBtn.textContent = '🎵 Click to Play Music 🎵';
                });
            }
        };
        
        // Start music on any user interaction
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('touchstart', startMusic, { once: true });
        document.addEventListener('keydown', startMusic, { once: true });
        
        // Also try when the play button is clicked
        if (elements.playMusicBtn) {
            elements.playMusicBtn.addEventListener('click', startMusic);
        }
        
        console.log('Music setup complete');
    } else {
        console.log('Background music element not found');
    }
});
