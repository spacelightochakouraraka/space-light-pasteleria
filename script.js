// Inicialización del sitio web
document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    initializeScrollEffects();
    initializeMenuUpload();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeAnimations();
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

// Inicializar subida de menú
function initializeMenuUpload() {
    const menuFile = document.getElementById('menuFile');
    const menuDisplay = document.getElementById('menuDisplay');
    const placeholder = document.querySelector('.menu-placeholder');

    if (menuFile) {
        menuFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const result = e.target.result;
                    
                    // Limpiar display anterior
                    menuDisplay.innerHTML = '';
                    
                    if (file.type.startsWith('image/')) {
                        // Es una imagen
                        const img = document.createElement('img');
                        img.src = result;
                        img.style.cssText = `
                            width: 100%;
                            max-width: 700px;
                            height: auto;
                            border-radius: 20px;
                            box-shadow: 0 20px 40px rgba(236, 72, 153, 0.3);
                            margin-top: 2rem;
                            opacity: 0;
                            transform: scale(0.8);
                            transition: all 0.5s ease;
                        `;
                        
                        menuDisplay.appendChild(img);
                        menuDisplay.style.display = 'block';
                        
                        // Animar entrada
                        setTimeout(() => {
                            img.style.opacity = '1';
                            img.style.transform = 'scale(1)';
                        }, 100);
                        
                        // Ocultar placeholder
                        placeholder.style.display = 'none';
                        
                    } else if (file.type === 'application/pdf') {
                        // Es un PDF
                        const pdfContainer = document.createElement('div');
                        pdfContainer.style.cssText = `
                            background: rgba(255, 255, 255, 0.1);
                            padding: 2rem;
                            border-radius: 20px;
                            text-align: center;
                            border: 1px solid rgba(139, 92, 246, 0.3);
                            margin-top: 2rem;
                        `;
                        
                        pdfContainer.innerHTML = `
                            <i class="fas fa-file-pdf" style="font-size: 4rem; color: #EC4899; margin-bottom: 1rem;"></i>
                            <h4 style="color: white; margin-bottom: 1rem;">Menú PDF Subido</h4>
                            <p style="color: rgba(255, 255, 255, 0.8);">${file.name}</p>
                            <a href="${result}" download="${file.name}" 
                               style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1.5rem; 
                                      background: linear-gradient(45deg, #EC4899, #A855F7); 
                                      color: white; text-decoration: none; border-radius: 25px;">
                                <i class="fas fa-download"></i> Descargar PDF
                            </a>
                        `;
                        
                        menuDisplay.appendChild(pdfContainer);
                        menuDisplay.style.display = 'block';
                        placeholder.style.display = 'none';
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Drag and drop functionality
    if (placeholder) {
        placeholder.addEventListener('dragover', function(e) {
            e.preventDefault();
            placeholder.style.borderColor = '#EC4899';
            placeholder.style.transform = 'scale(1.05)';
        });

        placeholder.addEventListener('dragleave', function(e) {
            e.preventDefault();
            placeholder.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            placeholder.style.transform = 'scale(1)';
        });

        placeholder.addEventListener('drop', function(e) {
            e.preventDefault();
            placeholder.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            placeholder.style.transform = 'scale(1)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                menuFile.files = files;
                menuFile.dispatchEvent(new Event('change'));
            }
        });
    }
}

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

console.log('🌟 Space Light - Sitio web cargado exitosamente! 🚀');