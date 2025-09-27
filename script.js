// Inicialización del sitio web
document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeAnimations();
    initializeGame();
});

// Crear estrellas animadas
function initializeStars() {
    const starsContainer = document.getElementById('stars-container');
    const numberOfStars = 150;
    const numberOfShootingStars = 3;

    // Crear estrellas normales
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        const size = Math.random();
        
        if (size < 0.3) {
            star.classList.add('star', 'small');
        } else if (size < 0.7) {
            star.classList.add('star', 'medium');
        } else {
            star.classList.add('star', 'large');
        }

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(star);
    }

    // Crear estrellas fugaces
    for (let i = 0; i < numberOfShootingStars; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 100 + '%';
        shootingStar.style.animationDelay = Math.random() * 10 + 's';
        shootingStar.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(shootingStar);
    }
}

// Efectos de scroll
function initializeScrollEffects() {
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        // Efecto header al hacer scroll
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Mostrar/ocultar botón scroll to top
        if (scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Parallax effect para elementos flotantes
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función de subida de menú removida - ahora usamos imagen estática
// La imagen del menú se muestra directamente desde el HTML

// Menú móvil
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Botón scroll to top
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animaciones de entrada
function initializeAnimations() {
    // Intersection Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.menu-category, .contact-card, .chef-card, .about-content').forEach(el => {
        observer.observe(el);
    });
}

// Función para cargar mapa (placeholder)
function loadMap() {
    const mapContainer = document.querySelector('.map-container');
    
    // Simulación de carga de mapa
    mapContainer.innerHTML = `
        <div style="width: 100%; height: 400px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)); 
                    border-radius: 15px; display: flex; align-items: center; justify-content: center; 
                    border: 1px solid rgba(139, 92, 246, 0.3);">
            <div style="text-align: center; color: white;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Cargando mapa...</p>
                <small style="opacity: 0.7;">Aquí se integrará tu mapa de Google Maps</small>
            </div>
        </div>
    `;
    
    // Simular tiempo de carga
    setTimeout(() => {
        mapContainer.innerHTML = `
            <div style="width: 100%; height: 400px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)); 
                        border-radius: 15px; display: flex; align-items: center; justify-content: center; 
                        border: 1px solid rgba(139, 92, 246, 0.3); position: relative; overflow: hidden;">
                <div style="text-align: center; color: white; z-index: 2; position: relative;">
                    <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem; color: #EC4899;"></i>
                    <h3>Mapa Interactivo</h3>
                    <p style="margin: 1rem 0;">Calle de las Estrellas 123, Ciudad Espacial</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                        <button onclick="openDirections()" style="background: linear-gradient(45deg, #EC4899, #A855F7); 
                                color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;">
                            <i class="fas fa-directions"></i> Direcciones
                        </button>
                        <button onclick="openStreetView()" style="background: linear-gradient(45deg, #06B6D4, #3B82F6); 
                                color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;">
                            <i class="fas fa-street-view"></i> Vista 360°
                        </button>
                    </div>
                </div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                            background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%);
                            animation: rotate 20s linear infinite;"></div>
            </div>
        `;
    }, 2000);
}

// Funciones para el mapa
function openDirections() {
    // Aquí integrarías con Google Maps Directions
    alert('Abriendo direcciones en Google Maps...\n(Integra aquí tu enlace de Google Maps)');
}

function openStreetView() {
    // Aquí integrarías con Google Street View
    alert('Abriendo vista de calle...\n(Integra aquí Google Street View)');
}

// Efectos adicionales para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de typing para el título
    initializeTypingEffect();
    
    // Efectos de hover para las tarjetas
    initializeCardEffects();
    
    // Efectos de partículas en hover
    initializeParticleEffects();
    
    // Auto-scroll para testimonials (si los agregas después)
    initializeAutoScroll();
});

// Efecto de escritura para el título
function initializeTypingEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid #EC4899';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Efectos de hover para tarjetas
function initializeCardEffects() {
    const cards = document.querySelectorAll('.menu-category, .contact-card, .chef-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Crear efecto de partículas
            createHoverParticles(this);
        });
        
        card.addEventListener('mousemove', function(e) {
            // Efecto de seguimiento del mouse
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Crear partículas en hover
function createHoverParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #EC4899, #06B6D4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleFloat 2s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Efectos de partículas
function initializeParticleEffects() {
    // Agregar CSS para animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 1024px) {
            .nav-links.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(15, 15, 30, 0.98);
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(139, 92, 246, 0.3);
                padding: 2rem;
                gap: 1rem;
                animation: slideDown 0.3s ease-out;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Auto-scroll para futuras secciones
function initializeAutoScroll() {
    // Placeholder para futuras funcionalidades de auto-scroll
    console.log('Auto-scroll initialized');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #10B981, #059669)' : 'linear-gradient(45deg, #EC4899, #A855F7)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar animación CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(notification);
    
    // Auto-remove después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            notification.remove();
            styleSheet.remove();
        }, 500);
    }, 3000);
}

// Función de validación para formularios futuros
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.push('Email no válido');
    }
    
    if (!formData.message || formData.message.length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

// Event listeners adicionales
window.addEventListener('load', function() {
    // Ocultar loading screen si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a Space Light! ✨', 'success');
    }, 2000);
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en el sitio:', e.error);
    // En producción, podrías enviar esto a un servicio de logging
});

// Función para integración con Google Analytics (futuro)
function trackEvent(eventName, parameters = {}) {
    // Placeholder para Google Analytics
    console.log('Tracking event:', eventName, parameters);
    
    // Ejemplo de implementación:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, parameters);
    // }
}

// Funciones de utilidad
const utils = {
    // Debounce function para optimizar eventos
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function para scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    
    // Función para detectar dispositivo móvil
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Función para generar ID único
    generateId: function() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }
};

// Optimización de rendimiento
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading para imágenes futuras
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ==================== MINIJUEGO ESPACIAL ====================

// Variables del juego
let game = {
    canvas: null,
    ctx: null,
    isRunning: false,
    isPaused: false,
    score: 0,
    lives: 3,
    cakes: 0,
    player: {
        x: 0,
        y: 0,
        width: 60,
        height: 40,
        speed: 5
    },
    ingredients: [],
    particles: [],
    keys: {},
    lastIngredientTime: 0,
    ingredientSpawnRate: 2000,
    gameSpeed: 1
};

// Inicializar el juego
function initializeGame() {
    game.canvas = document.getElementById('gameCanvas');
    if (!game.canvas) return;
    
    game.ctx = game.canvas.getContext('2d');
    game.player.x = game.canvas.width / 2 - game.player.width / 2;
    game.player.y = game.canvas.height - game.player.height - 20;
    
    // Event listeners para botones
    document.getElementById('startGameBtn')?.addEventListener('click', startGame);
    document.getElementById('resumeGameBtn')?.addEventListener('click', resumeGame);
    document.getElementById('restartGameBtn')?.addEventListener('click', restartGame);
    document.getElementById('playAgainBtn')?.addEventListener('click', restartGame);
    
    // Event listeners para teclado
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Event listeners para touch (móvil)
    game.canvas.addEventListener('touchstart', handleTouchStart);
    game.canvas.addEventListener('touchmove', handleTouchMove);
    
    // Inicializar pantalla de inicio
    showScreen('gameStartScreen');
}

// Manejar teclas presionadas
function handleKeyDown(e) {
    game.keys[e.code] = true;
    
    if (e.code === 'Space') {
        e.preventDefault();
        if (game.isRunning && !game.isPaused) {
            pauseGame();
        } else if (game.isPaused) {
            resumeGame();
        }
    }
}

// Manejar teclas liberadas
function handleKeyUp(e) {
    game.keys[e.code] = false;
}

// Manejar touch para móvil
function handleTouchStart(e) {
    e.preventDefault();
    const rect = game.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    
    if (x < game.canvas.width / 2) {
        game.keys['ArrowLeft'] = true;
    } else {
        game.keys['ArrowRight'] = true;
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    const rect = game.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    
    game.keys['ArrowLeft'] = false;
    game.keys['ArrowRight'] = false;
    
    if (x < game.canvas.width / 2) {
        game.keys['ArrowLeft'] = true;
    } else {
        game.keys['ArrowRight'] = true;
    }
}

// Iniciar el juego
function startGame() {
    game.isRunning = true;
    game.isPaused = false;
    game.score = 0;
    game.lives = 3;
    game.cakes = 0;
    game.ingredients = [];
    game.particles = [];
    game.gameSpeed = 1;
    game.ingredientSpawnRate = 2000;
    
    updateUI();
    hideAllScreens();
    gameLoop();
}

// Pausar el juego
function pauseGame() {
    if (!game.isRunning) return;
    game.isPaused = true;
    showScreen('gamePauseScreen');
}

// Reanudar el juego
function resumeGame() {
    if (!game.isRunning) return;
    game.isPaused = false;
    hideAllScreens();
    gameLoop();
}

// Reiniciar el juego
function restartGame() {
    startGame();
}

// Mostrar pantalla específica
function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).style.display = 'block';
}

// Ocultar todas las pantallas
function hideAllScreens() {
    document.getElementById('gameStartScreen').style.display = 'none';
    document.getElementById('gamePauseScreen').style.display = 'none';
    document.getElementById('gameEndScreen').style.display = 'none';
}

// Bucle principal del juego
function gameLoop() {
    if (!game.isRunning || game.isPaused) return;
    
    update();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// Actualizar lógica del juego
function update() {
    // Mover jugador
    if (game.keys['ArrowLeft'] && game.player.x > 0) {
        game.player.x -= game.player.speed;
    }
    if (game.keys['ArrowRight'] && game.player.x < game.canvas.width - game.player.width) {
        game.player.x += game.player.speed;
    }
    
    // Generar ingredientes
    const now = Date.now();
    if (now - game.lastIngredientTime > game.ingredientSpawnRate) {
        spawnIngredient();
        game.lastIngredientTime = now;
    }
    
    // Actualizar ingredientes
    for (let i = game.ingredients.length - 1; i >= 0; i--) {
        const ingredient = game.ingredients[i];
        ingredient.y += ingredient.speed * game.gameSpeed;
        
        // Verificar colisión con jugador
        if (checkCollision(game.player, ingredient)) {
            if (ingredient.type === 'good') {
                game.score += ingredient.points;
                game.cakes++;
                createParticles(ingredient.x, ingredient.y, '#EC4899');
            } else {
                game.lives--;
                createParticles(ingredient.x, ingredient.y, '#FF6B6B');
            }
            game.ingredients.splice(i, 1);
        }
        // Remover ingredientes que salieron de pantalla
        else if (ingredient.y > game.canvas.height) {
            if (ingredient.type === 'good') {
                game.lives--;
            }
            game.ingredients.splice(i, 1);
        }
    }
    
    // Actualizar partículas
    for (let i = game.particles.length - 1; i >= 0; i--) {
        const particle = game.particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        particle.alpha = particle.life / particle.maxLife;
        
        if (particle.life <= 0) {
            game.particles.splice(i, 1);
        }
    }
    
    // Aumentar dificultad
    if (game.score > 0 && game.score % 100 === 0) {
        game.gameSpeed = Math.min(2, 1 + game.score / 1000);
        game.ingredientSpawnRate = Math.max(800, 2000 - game.score / 50);
    }
    
    // Verificar fin del juego
    if (game.lives <= 0) {
        endGame();
    }
    
    updateUI();
}

// Dibujar en el canvas
function draw() {
    // Limpiar canvas
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    // Dibujar fondo estrellado
    drawStars();
    
    // Dibujar ingredientes
    game.ingredients.forEach(ingredient => {
        drawIngredient(ingredient);
    });
    
    // Dibujar jugador (nave pastelera)
    drawPlayer();
    
    // Dibujar partículas
    game.particles.forEach(particle => {
        drawParticle(particle);
    });
}

// Dibujar estrellas de fondo
function drawStars() {
    game.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 50; i++) {
        const x = (i * 37) % game.canvas.width;
        const y = (i * 23) % game.canvas.height;
        const size = Math.sin(Date.now() * 0.001 + i) * 2 + 1;
        game.ctx.fillRect(x, y, size, size);
    }
}

// Dibujar ingrediente
function drawIngredient(ingredient) {
    game.ctx.save();
    game.ctx.translate(ingredient.x + ingredient.width/2, ingredient.y + ingredient.height/2);
    game.ctx.rotate(ingredient.rotation);
    
    // Dibujar ingrediente según tipo
    if (ingredient.type === 'good') {
        // Ingrediente bueno (harina, huevos, etc.)
        game.ctx.fillStyle = ingredient.color;
        game.ctx.fillRect(-ingredient.width/2, -ingredient.height/2, ingredient.width, ingredient.height);
        game.ctx.fillStyle = '#FFF';
        game.ctx.font = '12px Arial';
        game.ctx.textAlign = 'center';
        game.ctx.fillText(ingredient.emoji, 0, 4);
    } else {
        // Ingrediente malo (asteroides)
        game.ctx.fillStyle = ingredient.color;
        game.ctx.fillRect(-ingredient.width/2, -ingredient.height/2, ingredient.width, ingredient.height);
        game.ctx.fillStyle = '#FFF';
        game.ctx.font = '12px Arial';
        game.ctx.textAlign = 'center';
        game.ctx.fillText('☄️', 0, 4);
    }
    
    game.ctx.restore();
    ingredient.rotation += 0.1;
}

// Dibujar jugador
function drawPlayer() {
    game.ctx.save();
    game.ctx.translate(game.player.x + game.player.width/2, game.player.y + game.player.height/2);
    
    // Cuerpo de la nave
    game.ctx.fillStyle = '#EC4899';
    game.ctx.fillRect(-game.player.width/2, -game.player.height/2, game.player.width, game.player.height);
    
    // Detalles de la nave
    game.ctx.fillStyle = '#06B6D4';
    game.ctx.fillRect(-game.player.width/2 + 5, -game.player.height/2 + 5, game.player.width - 10, 8);
    
    // Emoji de pastel
    game.ctx.fillStyle = '#FFF';
    game.ctx.font = '16px Arial';
    game.ctx.textAlign = 'center';
    game.ctx.fillText('🧁', 0, 5);
    
    game.ctx.restore();
}

// Dibujar partícula
function drawParticle(particle) {
    game.ctx.save();
    game.ctx.globalAlpha = particle.alpha;
    game.ctx.fillStyle = particle.color;
    game.ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    game.ctx.restore();
}

// Generar ingrediente
function spawnIngredient() {
    const types = [
        { type: 'good', emoji: '🌾', color: '#F59E0B', points: 10 }, // Harina
        { type: 'good', emoji: '🥚', color: '#FEF3C7', points: 15 }, // Huevos
        { type: 'good', emoji: '🍓', color: '#EF4444', points: 20 }, // Fresas
        { type: 'good', emoji: '🍫', color: '#92400E', points: 25 }, // Chocolate
        { type: 'bad', emoji: '☄️', color: '#6B7280', points: 0 }    // Asteroide
    ];
    
    const ingredientType = types[Math.floor(Math.random() * types.length)];
    const isGood = Math.random() < 0.7; // 70% ingredientes buenos
    
    const ingredient = {
        x: Math.random() * (game.canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 2 + Math.random() * 2,
        type: isGood ? 'good' : 'bad',
        emoji: isGood ? ingredientType.emoji : '☄️',
        color: isGood ? ingredientType.color : '#6B7280',
        points: isGood ? ingredientType.points : 0,
        rotation: 0
    };
    
    game.ingredients.push(ingredient);
}

// Verificar colisión
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Crear partículas
function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 4 + 2,
            color: color,
            life: 30,
            maxLife: 30,
            alpha: 1
        });
    }
}

// Terminar juego
function endGame() {
    game.isRunning = false;
    document.getElementById('finalScore').textContent = game.score;
    document.getElementById('cakesCreated').textContent = game.cakes;
    showScreen('gameEndScreen');
}

// Actualizar interfaz
function updateUI() {
    document.getElementById('currentScore').textContent = game.score;
    document.getElementById('cakesCount').textContent = game.cakes;
    document.getElementById('livesCount').textContent = game.lives;
}

console.log('🌟 Space Light - Sitio web cargado exitosamente! 🚀');
