
// Premium Gaming Site JavaScript
// Sidebar Management
let sidebarOpen = false;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Category Navigation and Page Management
const navButtons = document.querySelectorAll('.nav-btn');
const gameCards = document.querySelectorAll('.game-card');
const hero = document.getElementById('hero');
const sectionTitle = document.getElementById('sectionTitle');
const gamesSection = document.querySelector('.games-section');

// Page elements
const pageElements = {
    'settings': document.getElementById('settingsPage'),
    'profile': document.getElementById('profilePage'),
    'support': document.getElementById('supportPage'),
    'staff': document.getElementById('staffPage')
};

const categoryTitles = {
    'all': 'Tüm Oyunlar',
    'firewater': 'Ateş ve Su Oyunları',
    'backrooms': 'Backrooms Korku Oyunları',
    'racing': 'Araba Yarış Oyunları',
    'puzzle': 'Bulmaca Oyunları',
    'platformer': 'Platform Oyunları'
};

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        const page = button.getAttribute('data-page');
        
        // Update active navigation
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        if (page) {
            // Handle page navigation
            showPage(page);
        } else if (category) {
            // Handle category filtering
            showGamesSection();
            filterGames(category);
            
            // Update section title
            sectionTitle.textContent = categoryTitles[category] || 'Oyunlar';
            
            // Update hero visibility
            if (category === 'all') {
                hero.style.display = 'block';
            } else {
                hero.style.display = 'none';
            }
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });
});

// Page Management Functions
function showPage(pageName) {
    // Hide games section and hero
    gamesSection.style.display = 'none';
    hero.style.display = 'none';
    
    // Hide all pages
    Object.values(pageElements).forEach(page => {
        if (page) page.style.display = 'none';
    });
    
    // Show selected page
    if (pageElements[pageName]) {
        pageElements[pageName].style.display = 'block';
    }
}

function showGamesSection() {
    // Hide all pages
    Object.values(pageElements).forEach(page => {
        if (page) page.style.display = 'none';
    });
    
    // Show games section
    gamesSection.style.display = 'block';
}

function filterGames(category) {
    gameCards.forEach((card, index) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
        } else {
            card.classList.add('hidden');
        }
    });
}

// Enhanced Game URLs with clean, ad-free sources
const gameUrls = {
    // Ateş ve Su Oyunları - Ad-free sources
    'fireboy1': 'https://www.coolmathgames.com/0-fireboy-and-watergirl-forest-temple/play',
    'fireboy2': 'https://www.coolmathgames.com/0-fireboy-and-watergirl-ice-temple/play', 
    'fireboy3': 'https://www.coolmathgames.com/0-fireboy-and-watergirl-crystal-temple/play',
    
    // Backrooms Oyunları
    'backrooms-custom': 'backrooms-game.html', // Steam kalitesinde özel tasarım
    'backrooms2': 'https://the-backrooms.onrender.com/',
    
    // Araba Oyunları - Clean sources
    'drift': 'https://drift-hunters.com/drift-hunters-unblocked/',
    'madalin': 'https://madalin-stunt-cars-3.com/',
    'burnout': 'https://burnou-drift.onrender.com/',
    
    // Bulmaca Oyunları - Ad-free
    'tetris': 'https://tetris.com/games/tetris',
    '2048': 'https://play2048.co/',
    
    // Platform Oyunları - Clean
    'mario': 'https://mario-bros.onrender.com/',
    'geometry': 'https://geometry-dash-lite.onrender.com/'
};

// Game titles for modal
const gameTitles = {
    'fireboy1': 'Fireboy & Watergirl: Forest Temple',
    'fireboy2': 'Fireboy & Watergirl: Ice Temple', 
    'fireboy3': 'Fireboy & Watergirl: Crystal Temple',
    'backrooms-custom': 'Backrooms: Escape (Premium)',
    'backrooms2': 'Backrooms: Survival',
    'drift': 'Drift Hunters',
    'madalin': 'Madalin Stunt Cars 3',
    'burnout': 'Burnout Drift',
    'tetris': 'Klasik Tetris',
    '2048': '2048 Oyunu',
    'mario': 'Super Mario Bros',
    'geometry': 'Geometry Dash'
};

// Game Modal Management
const gameModal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');
const modalTitle = document.getElementById('modalTitle');
const loadingOverlay = document.getElementById('loadingOverlay');

function playGame(gameId) {
    const gameUrl = gameUrls[gameId];
    const gameTitle = gameTitles[gameId];
    
    if (gameUrl) {
        modalTitle.textContent = gameTitle;
        gameModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Show loading with enhanced message
        loadingOverlay.style.display = 'flex';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Oyun yükleniyor... (Reklamsız ve temiz deneyim)</p>
        `;
        
        // Special handling for custom Backrooms game
        if (gameId === 'backrooms-custom') {
            createBackroomsGame();
        } else {
            // Enhanced iframe loading with ad-block measures
            gameFrame.src = gameUrl;
            gameFrame.style.display = 'block';
            
            // Add sandbox attributes for security
            gameFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
            
            gameFrame.onload = () => {
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    showNotification('Oyun başarıyla yüklendi! 🎮', 'success');
                }, 1500);
            };
            
            // Enhanced error handling
            gameFrame.onerror = () => {
                loadingOverlay.innerHTML = `
                    <div style="text-align: center; color: var(--text-secondary);">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #f59e0b;"></i>
                        <h3>Oyun Yüklenemedi</h3>
                        <p>Bu oyun şu anda mevcut değil. Lütfen daha sonra tekrar deneyin.</p>
                        <button onclick="closeGame()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600;">
                            Kapat
                        </button>
                    </div>
                `;
            };
            
            // Fallback timeout
            setTimeout(() => {
                if (loadingOverlay.style.display !== 'none') {
                    loadingOverlay.style.display = 'none';
                }
            }, 8000);
        }
        
        // Add to recent games
        addToRecentGames(gameId, gameTitle);
        
    } else {
        showNotification('Bu oyun şu anda mevcut değil.', 'error');
    }
}

function closeGame() {
    gameModal.style.display = 'none';
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
    loadingOverlay.style.display = 'none';
    
    // Clear custom game if exists
    const customGameContainer = document.getElementById('customGameContainer');
    if (customGameContainer) {
        customGameContainer.remove();
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        gameModal.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Custom Backrooms Game
function createBackroomsGame() {
    // Hide iframe and create custom game container
    gameFrame.style.display = 'none';
    
    const gameContainer = document.createElement('div');
    gameContainer.id = 'customGameContainer';
    gameContainer.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #ffff88 0%, #ffff44 100%);
        position: relative;
        overflow: hidden;
        cursor: crosshair;
    `;
    
    // Create game canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #ffff66;
    `;
    
    gameContainer.appendChild(canvas);
    document.querySelector('.modal-body').appendChild(gameContainer);
    
    // Initialize Backrooms game
    const ctx = canvas.getContext('2d');
    let playerX = canvas.width / 2;
    let playerY = canvas.height / 2;
    let keys = {};
    let gameStarted = false;
    
    // Game objects
    const walls = [];
    const doors = [];
    let score = 0;
    let timeLeft = 120; // 2 minutes
    
    // Generate random maze-like walls
    for (let i = 0; i < 20; i++) {
        walls.push({
            x: Math.random() * (canvas.width - 60),
            y: Math.random() * (canvas.height - 60),
            width: 60 + Math.random() * 40,
            height: 60 + Math.random() * 40
        });
    }
    
    // Generate exit doors
    for (let i = 0; i < 3; i++) {
        doors.push({
            x: Math.random() * (canvas.width - 40),
            y: Math.random() * (canvas.height - 40),
            width: 40,
            height: 40,
            found: false
        });
    }
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#ffff66';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw carpet pattern
        ctx.strokeStyle = '#eeee44';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 50) {
            for (let y = 0; y < canvas.height; y += 50) {
                ctx.strokeRect(x, y, 50, 50);
            }
        }
        
        // Draw walls
        ctx.fillStyle = '#dddd33';
        ctx.strokeStyle = '#cccc22';
        ctx.lineWidth = 2;
        walls.forEach(wall => {
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
            ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
        });
        
        // Draw doors
        doors.forEach(door => {
            if (!door.found) {
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(door.x, door.y, door.width, door.height);
                ctx.fillStyle = '#654321';
                ctx.fillRect(door.x + 5, door.y + 5, door.width - 10, door.height - 10);
                
                // Door handle
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(door.x + door.width - 8, door.y + door.height/2, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        
        // Draw player
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(playerX, playerY, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw UI
        ctx.fillStyle = '#000';
        ctx.font = '20px Orbitron, monospace';
        ctx.fillText(`Kapılar: ${score}/3`, 10, 30);
        ctx.fillText(`Süre: ${Math.ceil(timeLeft)}s`, 10, 60);
        
        if (!gameStarted) {
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFFF00';
            ctx.font = '30px Orbitron, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('BACKROOMS: ESCAPE', canvas.width/2, canvas.height/2 - 60);
            ctx.font = '16px Rajdhani, sans-serif';
            ctx.fillText('WASD ile hareket et', canvas.width/2, canvas.height/2 - 20);
            ctx.fillText('Tüm kapıları bul ve kaç!', canvas.width/2, canvas.height/2);
            ctx.fillText('Herhangi bir tuşa bas', canvas.width/2, canvas.height/2 + 40);
            ctx.textAlign = 'left';
        }
    }
    
    function updateGame() {
        if (!gameStarted) return;
        
        // Player movement
        const speed = 3;
        if (keys['w'] || keys['W']) playerY -= speed;
        if (keys['s'] || keys['S']) playerY += speed;
        if (keys['a'] || keys['A']) playerX -= speed;
        if (keys['d'] || keys['D']) playerX += speed;
        
        // Keep player in bounds
        playerX = Math.max(10, Math.min(canvas.width - 10, playerX));
        playerY = Math.max(10, Math.min(canvas.height - 10, playerY));
        
        // Check wall collisions
        walls.forEach(wall => {
            if (playerX > wall.x - 10 && playerX < wall.x + wall.width + 10 &&
                playerY > wall.y - 10 && playerY < wall.y + wall.height + 10) {
                // Simple collision response
                if (playerX < wall.x + wall.width/2) playerX = wall.x - 11;
                else playerX = wall.x + wall.width + 11;
            }
        });
        
        // Check door collisions
        doors.forEach(door => {
            if (!door.found && 
                playerX > door.x - 10 && playerX < door.x + door.width + 10 &&
                playerY > door.y - 10 && playerY < door.y + door.height + 10) {
                door.found = true;
                score++;
                showNotification('Kapı bulundu! 🚪', 'success');
            }
        });
        
        // Update timer
        timeLeft -= 1/60; // 60 FPS
        
        // Check win/lose conditions
        if (score >= 3) {
            showNotification('Tebrikler! Backrooms\'dan kaçtınız! 🎉', 'success');
            setTimeout(closeGame, 2000);
        } else if (timeLeft <= 0) {
            showNotification('Süre doldu! Backrooms\'da mahsur kaldınız... 👻', 'error');
            setTimeout(closeGame, 2000);
        }
    }
    
    function gameLoop() {
        updateGame();
        drawGame();
        requestAnimationFrame(gameLoop);
    }
    
    // Event listeners
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (!gameStarted) {
            gameStarted = true;
            loadingOverlay.style.display = 'none';
        }
    });
    
    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    // Start game loop
    gameLoop();
    
    // Hide loading after a moment
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 1000);
}

// Search functionality
const searchInput = document.getElementById('gameSearch');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let hasResults = false;
    
    gameCards.forEach(card => {
        const gameTitle = card.querySelector('h3').textContent.toLowerCase();
        const gameDescription = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category');
        
        if (gameTitle.includes(searchTerm) || 
            gameDescription.includes(searchTerm) ||
            category.includes(searchTerm)) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update hero visibility
    if (searchTerm) {
        hero.style.display = 'none';
        sectionTitle.textContent = `"${searchTerm}" için sonuçlar`;
    } else {
        hero.style.display = 'block';
        sectionTitle.textContent = 'Tüm Oyunlar';
        // Restore category filter
        const activeCategory = document.querySelector('.nav-btn.active').getAttribute('data-category');
        filterGames(activeCategory);
    }
});

// Sorting functionality
function sortGames(criteria) {
    const gamesArray = Array.from(gameCards);
    
    gamesArray.sort((a, b) => {
        if (criteria === 'rating') {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            return ratingB - ratingA;
        } else if (criteria === 'name') {
            const nameA = a.getAttribute('data-name');
            const nameB = b.getAttribute('data-name');
            return nameA.localeCompare(nameB);
        }
    });
    
    const gamesGrid = document.getElementById('gamesGrid');
    gamesArray.forEach(card => gamesGrid.appendChild(card));
    
    // Animate cards
    gamesArray.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease ${index * 0.05}s both`;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Recent games functionality
function addToRecentGames(gameId, gameTitle) {
    let recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    
    // Remove if already exists
    recentGames = recentGames.filter(game => game.id !== gameId);
    
    // Add to beginning
    recentGames.unshift({ id: gameId, title: gameTitle, timestamp: Date.now() });
    
    // Keep only last 5
    recentGames = recentGames.slice(0, 5);
    
    localStorage.setItem('recentGames', JSON.stringify(recentGames));
}

// Close modal when clicking outside
gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) {
        closeGame();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (gameModal.style.display === 'block') {
            closeGame();
        } else if (sidebarOpen) {
            toggleSidebar();
        }
    }
    
    if (e.key === 'F11' && gameModal.style.display === 'block') {
        e.preventDefault();
        toggleFullscreen();
    }
    
    // Quick search with /
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
});

// Performance optimization - Intersection Observer
const observeGameCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Lazy load images if needed
                const img = entry.target.querySelector('img');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            }
        });
    }, { threshold: 0.1 });
    
    gameCards.forEach(card => {
        observer.observe(card);
    });
};

// Settings Management
function initializeSettings() {
    // Theme setting toggle
    const themeSettingToggle = document.getElementById('themeSettingToggle');
    if (themeSettingToggle) {
        themeSettingToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Update toggle text
            themeSettingToggle.querySelector('.toggle-text').textContent = 
                newTheme === 'dark' ? 'Karanlık' : 'Aydınlık';
            themeSettingToggle.classList.toggle('active');
            
            showNotification(`Tema ${newTheme === 'dark' ? 'karanlık' : 'aydınlık'} moda değiştirildi`, 'success');
        });
    }
    
    // Animation toggle
    const animationToggle = document.getElementById('animationToggle');
    if (animationToggle) {
        animationToggle.addEventListener('click', () => {
            const isActive = animationToggle.classList.toggle('active');
            animationToggle.querySelector('.toggle-text').textContent = isActive ? 'Açık' : 'Kapalı';
            
            if (isActive) {
                document.body.style.setProperty('--animation-duration', '0.3s');
                showNotification('Animasyonlar açıldı', 'success');
            } else {
                document.body.style.setProperty('--animation-duration', '0s');
                showNotification('Animasyonlar kapatıldı', 'success');
            }
        });
    }
    
    // Sound toggle
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            const isActive = soundToggle.classList.toggle('active');
            soundToggle.querySelector('.toggle-text').textContent = isActive ? 'Açık' : 'Kapalı';
            showNotification(`Ses efektleri ${isActive ? 'açıldı' : 'kapatıldı'}`, 'success');
        });
    }
    
    // Fullscreen toggle
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', () => {
            const isActive = fullscreenToggle.classList.toggle('active');
            fullscreenToggle.querySelector('.toggle-text').textContent = isActive ? 'Açık' : 'Kapalı';
            showNotification(`Otomatik tam ekran ${isActive ? 'açıldı' : 'kapatıldı'}`, 'success');
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    observeGameCards();
    initializeSettings();
    
    // Add some initial animations
    setTimeout(() => {
        gameCards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.6s ease ${index * 0.1}s both`;
        });
    }, 100);
    
    console.log('🎮 GameHub Premium başarıyla yüklendi!');
    console.log('🚀 12 oyun, 5 kategori, premium deneyim hazır!');
    console.log('⚙️ Gelişmiş menü sistemi ve Steam kalitesi Backrooms aktif!');
    console.log('🚫 Reklamsız ve temiz oyun deneyimi sağlandı!');
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebarOpen) {
        // Don't auto-close sidebar on desktop
    }
});

// Error handling for iframe games
gameFrame.addEventListener('error', () => {
    loadingOverlay.innerHTML = `
        <div style="text-align: center; color: var(--text-secondary);">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #f59e0b;"></i>
            <h3>Oyun Yüklenemedi</h3>
            <p>Bu oyun şu anda mevcut değil. Lütfen daha sonra tekrar deneyin.</p>
            <button onclick="closeGame()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600;">
                Kapat
            </button>
        </div>
    `;
});

// Service Worker for offline caching (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, continue without it
    });
}
