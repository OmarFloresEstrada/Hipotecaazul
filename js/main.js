/**
 * JavaScript principal para Hipoteca Azul
 * Implementa funcionalidad de accesibilidad y navegación
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleHighContrast = document.getElementById('toggle-high-contrast');
    const fontSizeIncrease = document.getElementById('font-size-increase');
    const fontSizeDecrease = document.getElementById('font-size-decrease');
    const toggleDarkMode = document.getElementById('toggle-dark-mode');

    // Control del menú móvil
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Funcionalidad de accesibilidad
    
    // Alto contraste
    if (toggleHighContrast) {
        toggleHighContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            localStorage.setItem('high-contrast', document.body.classList.contains('high-contrast'));
        });
    }
    
    // Tamaño de fuente
    if (fontSizeIncrease) {
        fontSizeIncrease.addEventListener('click', () => {
            const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            document.documentElement.style.fontSize = (currentSize + 1) + 'px';
            localStorage.setItem('font-size', document.documentElement.style.fontSize);
        });
    }
    
    if (fontSizeDecrease) {
        fontSizeDecrease.addEventListener('click', () => {
            const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            if (currentSize > 12) {
                document.documentElement.style.fontSize = (currentSize - 1) + 'px';
                localStorage.setItem('font-size', document.documentElement.style.fontSize);
            }
        });
    }
    
    // Modo oscuro
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('dark-mode', document.documentElement.classList.contains('dark'));
        });
    }
    
    // Restaurar preferencias de accesibilidad guardadas
    if (localStorage.getItem('high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    if (localStorage.getItem('font-size')) {
        document.documentElement.style.fontSize = localStorage.getItem('font-size');
    }
    
    if (localStorage.getItem('dark-mode') === 'true') {
        document.documentElement.classList.add('dark');
    }
    
    // Función para validar formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Validaciones básicas
            if (name && name.value.trim() === '') {
                valid = false;
                showError(name, 'El nombre es requerido');
            } else if (name) {
                clearError(name);
            }
            
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.value.trim() === '') {
                    valid = false;
                    showError(email, 'El correo electrónico es requerido');
                } else if (!emailRegex.test(email.value)) {
                    valid = false;
                    showError(email, 'Ingresa un correo electrónico válido');
                } else {
                    clearError(email);
                }
            }
            
            if (message && message.value.trim() === '') {
                valid = false;
                showError(message, 'El mensaje es requerido');
            } else if (message) {
                clearError(message);
            }
            
            if (!valid) {
                e.preventDefault();
            }
        });
    }
    
    // Funciones auxiliares para validación de formulario
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || createErrorElement();
        formControl.classList.add('error');
        errorElement.innerText = message;
        
        function createErrorElement() {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            formControl.appendChild(errorDiv);
            return errorDiv;
        }
    }
    
    function clearError(input) {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            errorElement.innerText = '';
        }
    }
});
