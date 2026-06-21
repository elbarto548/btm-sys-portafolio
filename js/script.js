/**
 * =================================================================
 * ARQUITECTURA DEL PORTAFOLIO Y LÓGICA CENTRAL
 * =================================================================
 * Copyright (c) 2026 Benjamin Ticona Mamani. Todos los derechos reservados.
 * Propietario Verificado: btm-sys
 * * AVISO: Se otorga permiso para ver y auditar este código 
 * con fines educativos y de reclutamiento. La distribución no autorizada, 
 * modificación para uso comercial, o replicación de este código fuente 
 * sin crédito al autor original está estrictamente prohibida.
 * =================================================================
 */

// ============================================
// CYBERSECURITY PORTFOLIO - INTERACTIVE SCRIPTS
// ============================================

// Inicializacion Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Preloader animacion
    startPreloader();
});

// ============================================
// CYBERSECURITY PRELOADER
// ============================================
function startPreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const preloaderBar = document.getElementById('preloader-bar');
    
    const messages = [
        'INITIALIZING SECURE_PROTOCOLS...',
        'SCANNING FOR VULNERABILITIES...',
        'ACCESS GRANTED'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function typeMessage() {
        if (messageIndex < messages.length) {
            const currentMessage = messages[messageIndex];
            
            if (charIndex < currentMessage.length) {
                preloaderText.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                
                // Actualizar la barra de progreso: dividirla equitativamente entre 3 mensajes
                const totalProgress = ((messageIndex * 100) / messages.length) + ((charIndex / currentMessage.length) * (100 / messages.length));
                preloaderBar.style.width = `${Math.min(totalProgress, 100)}%`;
                
                setTimeout(typeMessage, 30); 
            } else {
                messageIndex++;
                charIndex = 0;
                setTimeout(typeMessage, 400); 
            }
        } else {
            // Todos los mensajes escritos, asegúrese de que la barra de progreso esté al 100%
            preloaderBar.style.width = '100%';
            
            // Ocultar preloader después de un breve retraso
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 300);
        }
    }
    
    // Iniciar animación de escritura
    typeMessage();
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Cambiar el icono según el estado del menú
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
});

// Cerrar el menú móvil al hacer clic en un enlace.
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos animados
document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
    observer.observe(el);
});

// Agregar clases de animación a las secciones
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    const cards = section.querySelectorAll('.skill-card, .cert-card, .project-card, .contact-card');
    cards.forEach((card, cardIndex) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${cardIndex * 0.1}s`;
    });
});

// Re-inicializar el observador después de agregar las clases
setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
        observer.observe(el);
    });
}, 100);


// ENLACE DE NAVEGACIÓN ACTIVO AL DESPLAZARSE

const sectionsForNav = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsForNav.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-cyber-green');
        link.classList.add('text-gray-300');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-cyber-green');
        }
    });
});

// EFECTO DE ESCRITURA PARA EL HERO
const typeText = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// EFECTOS DE HOVER EN LAS TARJETAS (Mejorado)
const cards = document.querySelectorAll('.skill-card, .cert-card, .project-card, .contact-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Enhanced hover effect with microanimation
        card.style.transform = 'translateY(-8px) scale(1.03)';
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// EFECTO PARALLAX PARA EL FONDO DEL HERO (Mejorado)
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        const parallaxElements = hero.querySelectorAll('.absolute');
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// EASTER EGG - KONAMI CODE
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'pulse-glow 0.5s ease-in-out 3';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 1500);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: #00ff88;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: float 3s ease-in-out infinite;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// OPTIMIZACIÓN DE RENDIMIENTO
// ============================================
// Función de debounce para eventos de desplazamiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al evento de desplazamiento
const debouncedScroll = debounce(() => {
    // Operaciones relacionadas con el desplazamiento
}, 10);

window.addEventListener('scroll', debouncedScroll);

// CARGA PLENARIA PARA IMÁGENES (si se agregan más tarde :v)

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ACCESIBILIDAD - REDUCIR MOVIMIENTO
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// MENSAJE DE CONSOLA
console.log('%c🛡️ Benjamin Portfolio', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%cRedes & Ciberseguridad', 'color: #00d4ff; font-size: 16px;');
console.log('%cBuilt with ❤️ using HTML5, Tailwind CSS & Vanilla JavaScript', 'color: #a855f7; font-size: 12px;');

// PRELOADER (Opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.loading-overlay');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// TERMINAL INTERACTIVO
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Base de datos de comandos del terminal
const terminalCommands = {
    help: {
        response: `Comandos disponibles: info, proyectos, clear`,
        type: 'success',
        hint: true
    },
    ls: {
        response: `Comandos disponibles: info, proyectos,clear`,
        type: 'success',
        hint: true
    },
    info: {
        response: `👤 PERFIL TÉCNICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: Benjamin
Rol: Estudiante de Informática
Especialización: Redes y Ciberseguridad

🎯 INTERESES:
• Infraestructura de redes
• Sistemas Linux
• Fundamentos de ciberseguridad
• Automatización con Python
• Análisis de datos
• Laboratorios técnicos prácticos`,
        type: 'response'
    },
    about: {
        response: `👤 PERFIL TÉCNICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: Benjamin
Rol: Estudiante de Informática
Especialización: Redes y Ciberseguridad

🎯 INTERESES:
• Infraestructura de redes
• Sistemas Linux
• Fundamentos de ciberseguridad
• Automatización con Python
• Análisis de datos
• Laboratorios técnicos prácticos`,
        type: 'response'
    },
    proyectos: {
        response: `💻 PROYECTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Laravel CRUD: https://github.com/elbarto548/laravel-crud
• Laboratorios de Redes y Ciberseguridad
• Scripts de Automatización en Python
• Consultas SQL avanzadas`,
        type: 'response'
    },
    contact: {
        response: `📞 CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: ticonabenjamin15@gmail.com
📘 Facebook: https://www.facebook.com/share/1BZAwXmEfd/
📸 Instagram: @el_barto548
💻 GitHub: https://github.com/elbarto548`,
        type: 'response'
    },
    cv: {
        response: `📄 CV - Placeholder
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CV no disponible aún - En construcción]

Para más información, usa el comando 'contact'.`,
        type: 'error'
    },
    reset: {
        response: null,
        type: 'system'
    },
    clear: {
        response: null,
        type: 'system'
    },
    matrix: {
        response: null,
        type: 'special'
    },
    scan: {
        response: null,
        type: 'special'
    },
    nmap: {
        response: null,
        type: 'special'
    },
    rick: {
        response: null,
        type: 'special'
    },
    secret: {
        response: null,
        type: 'special'
    }
};

if (terminalInput && terminalOutput) {
    // Enfocar terminal al hacer clic
    terminalOutput.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Manejar entrada del terminal
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            
            if (command) {
                // Agregar comando al output
                addTerminalOutput(`$ ${command}`, 'command');
                
                // Procesar comando
                processTerminalCommand(command);
            }
            
            
            terminalInput.value = '';
        }
    });
}

function addTerminalOutput(text, type = 'response') {
    const p = document.createElement('p');
    p.textContent = text;
    
    switch(type) {
        case 'command':
            p.className = 'terminal-command';
            break;
        case 'response':
            p.className = 'terminal-response';
            break;
        case 'error':
            p.className = 'terminal-error';
            break;
        case 'success':
            p.className = 'terminal-success';
            break;
        default:
            p.className = 'text-gray-400';
    }
    
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function processTerminalCommand(command) {
    if (terminalCommands[command]) {
        const cmd = terminalCommands[command];
        
        if (command === 'reset' || command === 'clear') {
            terminalOutput.innerHTML = '<p class="text-gray-500 animate-pulse">_</p>';
        } else if (cmd.type === 'special') {
           
            handleSpecialCommand(command);
        } else if (cmd.response) {
            const lines = cmd.response.split('\n');
            lines.forEach(line => {
                addTerminalOutput(line, cmd.type);
            });
            
           
            if (cmd.hint) {
                setTimeout(() => {
                    addTerminalOutput('[ALERTA] Detectados 2 protocolos confidenciales en el sistema... Intenta ejecutar \'matrix\' o \'scan\' para inicializarlos.', 'success');
                }, 500);
            }
        }
    } else {
        addTerminalOutput(`Comando no reconocido: '${command}'. Escribe 'help' para ver la lista de comandos permitidos.`, 'error');
    }
}

function handleSpecialCommand(command) {
    switch(command) {
        case 'matrix':
            executeMatrixEffect();
            break;
        case 'scan':
        case 'nmap':
            executeScanEffect();
            break;
        case 'rick':
        case 'secret':
            executeRickEffect();
            break;
    }
}


function executeMatrixEffect() {
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.backgroundColor = 'black';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 33);
    
    setTimeout(() => {
        clearInterval(matrixInterval);
        document.body.removeChild(canvas);
        addTerminalOutput('[+] Inyección de código Matrix completada con éxito. Sistema restablecido.', 'success');
    }, 5000);
}

// Efecto Escaneo de Seguridad
function executeScanEffect() {
    const scanMessages = [
        'Iniciando escaneo de seguridad en btm-sys.netlify.app...',
        '[WAIT] Escaneando puerto 80... ABIERTO (HTTP)',
        '[WAIT] Escaneando puerto 443... ABIERTO (HTTPS)',
        '[WARN] Vulnerabilidad potencial detectada en puerto 22 (SSH)...',
        '[SUCCESS] Auditoría finalizada. Reporte guardado en el núcleo del sistema.'
    ];
    
    let delay = 0;
    scanMessages.forEach((msg, index) => {
        setTimeout(() => {
            addTerminalOutput(msg, index === 3 ? 'error' : 'response');
        }, delay);
        delay += 800;
    });
}

// Rick Astley Easter Egg
function executeRickEffect() {
    const rickLyrics = `
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you
    `;
    
    const lines = rickLyrics.trim().split('\n');
    let delay = 0;
    
    lines.forEach(line => {
        setTimeout(() => {
            addTerminalOutput(line.trim(), 'success');
        }, delay);
        delay += 300;
    });
}

// SISTEMA DE NOTIFICACIONES TOAST
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

function showToast(message, duration = 4000) {
    toastMessage.textContent = message;
    
   
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-x-full');
        toast.classList.add('show');
    }, 50);
    
   
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide', 'opacity-0', 'translate-x-full');
        
     
        setTimeout(() => {
            toast.classList.remove('hide');
            toast.classList.add('hidden');
        }, 500);
    }, duration);
}


// MANEJO DE FORMULARIOS CON FORMSPREE (API Fetch)

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
   
        if (!name || !email || !message) {
            showToast('⚠️ Por favor, completa todos los campos.');
            return;
        }
        
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Enviando...</span>';
        button.disabled = true;
        lucide.createIcons();
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showToast('Mensaje enviado con éxito');
                
                contactForm.reset();
                button.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i><span>¡Enviado!</span>';
                button.classList.add('bg-cyber-green');
                button.classList.remove('from-cyber-green', 'to-cyber-corporate');
                lucide.createIcons();
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('bg-cyber-green');
                    button.classList.add('from-cyber-green', 'to-cyber-corporate');
                    button.disabled = false;
                    lucide.createIcons();
                }, 3000);
            } else {
                const data = await response.json();
                showToast(`❌ Error: ${data.error || 'Hubo un problema al enviar el mensaje'}`);
                
                button.innerHTML = originalText;
                button.disabled = false;
                lucide.createIcons();
            }
        } catch (error) {
            showToast('❌ Error de conexión. Por favor, intenta nuevamente.');
            button.innerHTML = originalText;
            button.disabled = false;
            lucide.createIcons();
        }
    });
}

const yearSpan = document.querySelector('footer p');
if (yearSpan && yearSpan.textContent.includes('©')) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace(/\d{4}/, currentYear);
}


function animateRadialGradients() {
    const hero = document.getElementById('hero');
    if (hero) {
        const gradients = hero.querySelectorAll('.blur-3xl');
        gradients.forEach((gradient, index) => {
            const x = 20 + Math.sin(Date.now() / 2000 + index) * 10;
            const y = 80 + Math.cos(Date.now() / 2000 + index) * 10;
            gradient.style.left = `${x}%`;
            gradient.style.top = `${y}%`;
        });
    }
    requestAnimationFrame(animateRadialGradients);
}


animateRadialGradients();


function updateServerMetrics() {
    const cpuUsage = document.getElementById('cpu-usage');
    const ramUsage = document.getElementById('ram-usage');
    const networkLoad = document.getElementById('network-load');
    
    if (cpuUsage && ramUsage && networkLoad) {

        const cpu = Math.floor(Math.random() * (22 - 10 + 1)) + 10;
        cpuUsage.textContent = `${cpu}%`;
        

        const ram = Math.floor(Math.random() * (48 - 35 + 1)) + 35;
        ramUsage.textContent = `${ram}%`;
        

        const networkStates = ['Optimal', 'Optimal', 'Optimal', 'High'];
        const network = networkStates[Math.floor(Math.random() * networkStates.length)];
        networkLoad.textContent = network;
    }
}


// SISTEMA DE FALLO DE ALIMENTACIÓN DEL SERVIDOR

let metricsInterval = null;
let isPowerLoss = false;

function startMetricsUpdate() {
    if (metricsInterval) clearInterval(metricsInterval);
    metricsInterval = setInterval(updateServerMetrics, 4000);
}

function stopMetricsUpdate() {
    if (metricsInterval) {
        clearInterval(metricsInterval);
        metricsInterval = null;
    }
}


startMetricsUpdate();
updateServerMetrics();


function executeGlitchBurst(serverWidget) {
    let flickerCount = 0;
    const maxFlickers = 4 + Math.floor(Math.random() * 2); 
    
    function flicker() {
        if (flickerCount >= maxFlickers) {
            serverWidget.classList.remove('glitch-active', 'glitch-low', 'glitch-high');
            return;
        }
        
        if (serverWidget.classList.contains('glitch-low')) {
            serverWidget.classList.remove('glitch-low');
            serverWidget.classList.add('glitch-high');
        } else {
            serverWidget.classList.remove('glitch-high');
            serverWidget.classList.add('glitch-low');
        }
        
        flickerCount++;
        setTimeout(flicker, 50 + Math.random() * 50); // 50-100ms
    }
    
    serverWidget.classList.add('glitch-active', 'glitch-low');
    flicker();
}


function executeBlackout(serverWidget) {
    isPowerLoss = true;
    
  
    stopMetricsUpdate();
    

    const cpuUsage = document.getElementById('cpu-usage');
    const ramUsage = document.getElementById('ram-usage');
    const networkLoad = document.getElementById('network-load');
    const statusText = serverWidget.querySelector('.text-cyber-green.text-xs.font-semibold');
    

    if (statusText) {
        statusText.textContent = 'SERVER STATUS: OFFLINE';
    }
    

    if (cpuUsage) cpuUsage.textContent = '--%';
    if (ramUsage) ramUsage.textContent = '--%';
    if (networkLoad) networkLoad.textContent = '--';
    

    serverWidget.classList.add('server-offline');
    

    const blackoutDuration = 2000 + Math.random() * 2000;
    
    setTimeout(() => {

        serverWidget.classList.remove('server-offline');
        isPowerLoss = false;

        if (statusText) {
            statusText.textContent = 'SERVER STATUS: ONLINE';
        }
        startMetricsUpdate();
        updateServerMetrics();
    }, blackoutDuration);
}

function triggerCrisis() {
    const serverWidget = document.getElementById('server-widget');
    if (!serverWidget) return;
    

    const crisisType = Math.random() > 0.5 ? 'glitch' : 'blackout';
    
    if (crisisType === 'glitch') {
        executeGlitchBurst(serverWidget);
    } else {
        executeBlackout(serverWidget);
    }
    

    const stablePeriod = 4000 + Math.random() * 6000;
    setTimeout(triggerCrisis, stablePeriod);
}

setTimeout(triggerCrisis, 4000 + Math.random() * 6000);
