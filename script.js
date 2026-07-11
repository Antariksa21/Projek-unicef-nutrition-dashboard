// Game state variables
let isPlaying = false;
let isGameOver = false;
let score = 0;
let highScore = parseInt(localStorage.getItem('neon_runner_high_score')) || 0;
let gameLevel = 1;
let lastTime = 0;

// Physics settings
let currentSpeed = 6;
const BASE_SPEED = 6;
const MAX_SPEED = 15;
const SPEED_INCREMENT = 0.6;

let dinoY = 0; // Height above ground (in pixels)
let dinoVelocityY = 0;
const GRAVITY = 0.65;
const JUMP_FORCE = 12.5;
let isJumping = false;

// Obstacles management
let obstacles = [];
let distanceSinceLastSpawn = 0;
let targetSpawnDistance = 350;

// Particles management
const particles = [];
let soundEnabled = true;
let audioCtx = null;

// DOM Elements
const gameContainer = document.getElementById('game-container');
const dinoEl = document.getElementById('dino');
const obstaclesContainer = document.getElementById('obstacles-container');
const particleCanvas = document.getElementById('particle-canvas');
const pCtx = particleCanvas.getContext('2d');
const scoreValEl = document.getElementById('score-val');
const highScoreValEl = document.getElementById('high-score-val');
const levelValEl = document.getElementById('level-val');
const screenOverlay = document.getElementById('screen-overlay');
const screenTitle = document.getElementById('screen-title');
const screenMessage = document.getElementById('screen-message');
const gameOverStats = document.getElementById('game-over-stats');
const finalScoreEl = document.getElementById('final-score');
const finalHighScoreEl = document.getElementById('final-high-score');
const actionBtn = document.getElementById('action-btn');
const btnTextEl = document.getElementById('btn-text');
const btnIconEl = document.getElementById('btn-icon');
const flashLayer = document.getElementById('flash-layer');
const gridLines = document.getElementById('grid-lines');
const audioBtn = document.getElementById('audio-btn');
const soundOnIcon = audioBtn.querySelector('.sound-on-icon');
const soundOffIcon = audioBtn.querySelector('.sound-off-icon');

// Obstacle template definitions
const OBSTACLE_TYPES = [
    {
        // Single Cactus
        width: 30,
        height: 55,
        svg: `<svg class="cactus-svg" viewBox="0 0 30 60"><path d="M15 60 V10 C15 5, 20 5, 20 10 V60 M15 25 C15 20, 7 20, 7 28 V35 C7 40, 15 40, 15 35 M15 35 C15 30, 23 30, 23 35 V38 C23 43, 15 43, 15 38" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
        // Double Cactus
        width: 45,
        height: 55,
        svg: `<svg class="cactus-svg" viewBox="0 0 45 60"><path d="M20 60 V10 C20 5, 25 5, 25 10 V60 M20 25 C20 20, 12 20, 12 28 V32 M20 32 C20 28, 28 28, 28 32 V36 M35 60 V25 C35 22, 38 22, 38 25 V60 M35 38 C35 35, 30 35, 30 38 M35 42 C35 39, 43 39, 43 42" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
        // Triple Cactus Clump
        width: 60,
        height: 55,
        svg: `<svg class="cactus-svg" viewBox="0 0 60 60"><path d="M30 60 V10 C30 5, 35 5, 35 10 V60 M30 25 C30 20, 22 20, 22 28 V35 M30 35 C30 30, 38 30, 38 35 V38 M12 60 V28 C12 25, 16 25, 16 28 V60 M12 38 C12 35, 6 35, 6 38 V40 M48 60 V22 C48 19, 52 19, 52 22 V60 M48 35 C48 32, 42 32, 42 35 V38" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    }
];

// Obstacle Class
class Obstacle {
    constructor(type, startX) {
        this.type = type;
        this.x = startX;
        this.width = type.width;
        this.height = type.height;

        this.element = document.createElement('div');
        this.element.className = 'obstacle';
        this.element.innerHTML = type.svg;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.transform = `translateX(${this.x}px)`;

        obstaclesContainer.appendChild(this.element);
    }

    update(dt) {
        // Move obstacle left, normalized for 60fps delta
        this.x -= currentSpeed * (dt / 16.66);
        this.element.style.transform = `translateX(${this.x}px)`;
    }

    destroy() {
        this.element.remove();
    }
}

// Particle Class for visual effects (canvas-drawn)
class Particle {
    constructor(x, y, vx, vy, size, color, alphaDecay = 0.02, gravity = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.alpha = 1;
        this.alphaDecay = alphaDecay;
        this.gravity = gravity;
    }

    update(dt) {
        const tScale = dt / 16.66;
        this.vy += this.gravity * tScale;
        this.x += this.vx * tScale;
        this.y += this.vy * tScale;
        this.alpha -= this.alphaDecay * tScale;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Initialize Web Audio API
function initAudio() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
        audioCtx = new AudioContextClass();
    }
}

// Sound FX: Retro Beep Sweep (Jump)
function playJumpSound() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'triangle';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
}

// Sound FX: High Pitch Double Chirp (Level Up)
function playLevelSound() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880.00, now + 0.07); // A5

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.setValueAtTime(0.1, now + 0.07);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.25);
}

// Sound FX: White Noise-like Synth Crash (Game Over)
function playCrashSound() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sawtooth';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.45);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.45);

    osc.start(now);
    osc.stop(now + 0.45);
}

// Canvas Sizing and Helpers
function resizeCanvas() {
    particleCanvas.width = gameContainer.clientWidth;
    particleCanvas.height = gameContainer.clientHeight;
}

// Pad score with leading zeros
function formatScore(num) {
    return String(num).padStart(5, '0');
}

function updateHighScoreDisplay() {
    highScoreValEl.textContent = formatScore(highScore);
}

// Setup Event Listeners
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
updateHighScoreDisplay();

// Input Listeners
window.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'ArrowUp') {
        // Space / Arrow Up trigger jump or start
        e.preventDefault();
        if (!isPlaying && !isGameOver) {
            startGame();
        } else if (isPlaying) {
            triggerJump();
        }
    } else if (e.key === 'Enter') {
        // Enter key restarts when game is over
        if (isGameOver) {
            startGame();
        } else if (!isPlaying) {
            startGame();
        }
    }
});

// Touch/Click to jump on container
gameContainer.addEventListener('mousedown', (e) => {
    // Avoid double trigger if clicking audio/action buttons
    if (e.target.closest('#audio-btn') || e.target.closest('#action-btn')) return;
    if (isPlaying) {
        triggerJump();
    }
});

gameContainer.addEventListener('touchstart', (e) => {
    if (e.target.closest('#audio-btn') || e.target.closest('#action-btn')) return;
    if (isPlaying) {
        e.preventDefault(); // Prevent double click-simulation
        triggerJump();
    }
}, { passive: false });

// Audio Button Toggle
audioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    initAudio();
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        soundOnIcon.classList.remove('hidden');
        soundOffIcon.classList.add('hidden');
        playJumpSound(); // Chirp for confirmation
    } else {
        soundOnIcon.classList.add('hidden');
        soundOffIcon.classList.remove('hidden');
    }
});

// Action button triggers run
actionBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
});

// Physics and State Actions
function triggerJump() {
    if (!isJumping && isPlaying) {
        isJumping = true;
        dinoVelocityY = JUMP_FORCE;
        dinoEl.classList.add('jumping');
        dinoEl.classList.remove('running');
        playJumpSound();

        // Spawn liftoff dust particles
        spawnLiftoffParticles();
    }
}

// Spawns dust particles on jump liftoff
function spawnLiftoffParticles() {
    const dinoLeft = dinoEl.offsetLeft;
    const dinoWidth = dinoEl.clientWidth;
    const groundLevel = particleCanvas.height - 60;
    
    for (let i = 0; i < 6; i++) {
        particles.push(new Particle(
            dinoLeft + dinoWidth / 2 + (Math.random() - 0.5) * 20,
            groundLevel - 2,
            -currentSpeed * 0.3 + (Math.random() - 0.5) * 2,
            -Math.random() * 2,
            Math.random() * 3 + 2,
            'rgba(0, 242, 254, 0.4)',
            0.03
        ));
    }
}

// Spawns dust particles on landing
function spawnLandingParticles() {
    const dinoLeft = dinoEl.offsetLeft;
    const dinoWidth = dinoEl.clientWidth;
    const groundLevel = particleCanvas.height - 60;
    
    for (let i = 0; i < 8; i++) {
        particles.push(new Particle(
            dinoLeft + dinoWidth / 2 + (Math.random() - 0.5) * 25,
            groundLevel - 2,
            -currentSpeed * 0.4 + (Math.random() - 0.5) * 4,
            -Math.random() * 2 - 1,
            Math.random() * 4 + 1.5,
            'rgba(0, 242, 254, 0.5)',
            0.04
        ));
    }
}

// Spawns running foot dust
function spawnFootDust() {
    const dinoLeft = dinoEl.offsetLeft;
    const groundLevel = particleCanvas.height - 60;
    
    // Spawn dust near dino's rear foot
    particles.push(new Particle(
        dinoLeft + 15,
        groundLevel - 4,
        -currentSpeed * 0.4 - Math.random() * 2,
        -Math.random() * 1.5,
        Math.random() * 4 + 1,
        'rgba(0, 242, 254, 0.5)',
        0.035
    ));
}

// Spawns game over explosion burst
function spawnCrashExplosion(x, y) {
    const colors = ['#00f2fe', '#ff007f', '#ffb800', '#ffffff'];
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push(new Particle(
            x,
            y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed - 1.5,
            Math.random() * 5 + 3,
            colors[Math.floor(Math.random() * colors.length)],
            0.015,
            0.12 // gravity
        ));
    }
}

// Start Game Loop
function startGame() {
    initAudio();
    
    // Reset state variables
    isPlaying = true;
    isGameOver = false;
    score = 0;
    gameLevel = 1;
    currentSpeed = BASE_SPEED;
    dinoY = 0;
    dinoVelocityY = 0;
    isJumping = false;
    distanceSinceLastSpawn = 0;
    targetSpawnDistance = 350;

    // Reset UI displays
    scoreValEl.textContent = formatScore(score);
    levelValEl.textContent = gameLevel;
    
    // Reset CSS variables
    gridLines.style.setProperty('--grid-speed', `${1.2 / (currentSpeed / BASE_SPEED)}s`);

    // Reset dino visual state
    dinoEl.className = 'dino running';
    dinoEl.style.transform = 'translateY(0px)';
    gameContainer.classList.remove('game-over');

    // Clear obstacles
    obstacles.forEach(obs => obs.destroy());
    obstacles = [];

    // Clear particles
    particles.length = 0;

    // Hide Screen Overlay
    screenOverlay.classList.add('fade-out');

    // Trigger game loop
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// Game Over Action
function triggerGameOver() {
    isPlaying = false;
    isGameOver = true;
    
    // Pause CSS animations
    gameContainer.classList.add('game-over');
    dinoEl.classList.remove('running');
    dinoEl.classList.remove('jumping');
    dinoEl.classList.add('crashed');

    playCrashSound();

    // Spawn dramatic explosion at dino center
    const dinoLeft = dinoEl.offsetLeft;
    const dinoWidth = dinoEl.clientWidth;
    const dinoHeight = dinoEl.clientHeight;
    const groundLevel = particleCanvas.height - 60;
    const crashX = dinoLeft + dinoWidth / 2;
    const crashY = groundLevel - dinoY - dinoHeight / 2;
    spawnCrashExplosion(crashX, crashY);

    // High score management
    const flooredScore = Math.floor(score);
    if (flooredScore > highScore) {
        highScore = flooredScore;
        localStorage.setItem('neon_runner_high_score', highScore);
        updateHighScoreDisplay();
    }

    // Populate game over screen
    screenTitle.textContent = "GAME OVER";
    screenMessage.textContent = "Your journey ended in a shower of sparks.";
    finalScoreEl.textContent = formatScore(flooredScore);
    finalHighScoreEl.textContent = formatScore(highScore);

    // Show stats and update button text
    gameOverStats.classList.remove('hidden');
    btnTextEl.textContent = "RUN AGAIN";
    
    // Switch icon to restart circular arrow
    btnIconEl.innerHTML = `<path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>`;

    // Show Overlay Screen
    screenOverlay.classList.remove('fade-out');
}

// Core Game Loop
function gameLoop(time) {
    if (!isPlaying && !isGameOver) return; // Cut execution if completely idle

    const dt = time - lastTime;
    lastTime = time;

    // Cap deltaTime to avoid massive position jumps during lag spikes
    const cappedDt = Math.min(dt, 100);

    update(cappedDt);
    render();

    if (isPlaying) {
        requestAnimationFrame(gameLoop);
    }
}

// Handle Game Updates
function update(dt) {
    if (!isPlaying) {
        // Continue updating particles even when crashed
        updateParticlesOnly(dt);
        return;
    }

    // 1. Update score (1 point per 65ms approximately)
    score += dt * 0.015;
    scoreValEl.textContent = formatScore(Math.floor(score));

    // 2. Check for level ups and adjust speed
    const newLevel = Math.floor(score / 200) + 1;
    if (newLevel > gameLevel) {
        gameLevel = newLevel;
        levelValEl.textContent = gameLevel;
        
        // Increase speed, cap at MAX_SPEED
        currentSpeed = Math.min(BASE_SPEED + (gameLevel - 1) * SPEED_INCREMENT, MAX_SPEED);
        
        // Sync scroll speed of grid
        gridLines.style.setProperty('--grid-speed', `${1.2 / (currentSpeed / BASE_SPEED)}s`);

        // Play level up sound and screen flash
        playLevelSound();
        flashLayer.classList.add('flash-active');
        setTimeout(() => {
            flashLayer.classList.remove('flash-active');
        }, 300);
    }

    // 3. Update dino jumping physics
    if (isJumping) {
        // Frame-rate independent physics scale factor
        const tScale = dt / 16.66;
        dinoY += dinoVelocityY * tScale;
        dinoVelocityY -= GRAVITY * tScale;

        if (dinoY <= 0) {
            dinoY = 0;
            dinoVelocityY = 0;
            isJumping = false;
            dinoEl.classList.remove('jumping');
            dinoEl.classList.add('running');
            spawnLandingParticles();
        }
    } else {
        // Spawn dust while running
        if (Math.random() < 0.25) {
            spawnFootDust();
        }
    }

    // 4. Update particles
    updateParticlesOnly(dt);

    // 5. Spawning Obstacles
    distanceSinceLastSpawn += currentSpeed * (dt / 16.66);
    if (distanceSinceLastSpawn >= targetSpawnDistance) {
        const containerWidth = gameContainer.clientWidth;
        
        // Select random obstacle type
        const typeIndex = Math.floor(Math.random() * OBSTACLE_TYPES.length);
        const obstacleType = OBSTACLE_TYPES[typeIndex];
        
        // Create new obstacle
        obstacles.push(new Obstacle(obstacleType, containerWidth));
        
        // Reset distance tracker and calculate randomized spacing based on current speed
        distanceSinceLastSpawn = 0;
        targetSpawnDistance = (42 * currentSpeed) + 80 + Math.random() * 320;
    }

    // 6. Update obstacles & Collision Detection
    const dinoLeft = dinoEl.offsetLeft;
    const dinoWidth = dinoEl.clientWidth;
    const dinoHeight = dinoEl.clientHeight;

    // Define Dino box inside relative frame (x horizontal, y vertical from ground)
    const dinoBox = {
        left: dinoLeft + 10,
        right: dinoLeft + dinoWidth - 10,
        bottom: dinoY + 3,
        top: dinoY + dinoHeight - 5
    };

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.update(dt);

        // Remove obstacle if fully off-screen
        if (obs.x < -obs.width) {
            obs.destroy();
            obstacles.splice(i, 1);
            continue;
        }

        // Define Obstacle box
        const obsBox = {
            left: obs.x + 6,
            right: obs.x + obs.width - 6,
            bottom: 0 + 2,
            top: obs.height - 2
        };

        // Collision Check: Intersection of overlapping ranges
        const collidesX = dinoBox.right > obsBox.left && dinoBox.left < obsBox.right;
        const collidesY = dinoBox.top > obsBox.bottom && dinoBox.bottom < obsBox.top;

        if (collidesX && collidesY) {
            triggerGameOver();
            break;
        }
    }
}

// Particle update helper
function updateParticlesOnly(dt) {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(dt);
        p.draw(pCtx);
        if (p.alpha <= 0 || p.size <= 0.5) {
            particles.splice(i, 1);
        }
    }
}

// Render styling applications
function render() {
    // Render dino jumping offset using transforms (for composition speed)
    dinoEl.style.transform = `translateY(${-dinoY}px)`;
}
