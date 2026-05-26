// ============ PARTICLE GENERATION ============
function generateParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 5;
        const randomDuration = 8 + Math.random() * 4;
        
        particle.style.left = randomX + 'px';
        particle.style.bottom = '-10px';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============ FORM VALIDATION ============
class FormValidator {
    constructor() {
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    clearErrors() {
        this.emailError.textContent = '';
        this.passwordError.textContent = '';
        this.emailInput.classList.remove('error');
        this.passwordInput.classList.remove('error');
    }

    validateForm() {
        this.clearErrors();
        let isValid = true;

        if (!this.emailInput.value.trim()) {
            this.emailError.textContent = 'Email is required';
            this.emailInput.classList.add('error');
            isValid = false;
        } else if (!this.validateEmail(this.emailInput.value)) {
            this.emailError.textContent = 'Please enter a valid email';
            this.emailInput.classList.add('error');
            isValid = false;
        }

        if (!this.passwordInput.value.trim()) {
            this.passwordError.textContent = 'Password is required';
            this.passwordInput.classList.add('error');
            isValid = false;
        } else if (!this.validatePassword(this.passwordInput.value)) {
            this.passwordError.textContent = 'Password must be at least 6 characters';
            this.passwordInput.classList.add('error');
            isValid = false;
        }

        return isValid;
    }
}

// ============ LOGIN HANDLER ============
class LoginManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.loginContainer = document.getElementById('loginContainer');
        this.floatingZone = document.getElementById('floatingZone');
        this.loginBtn = this.loginForm.querySelector('.btn-login');
        this.validator = new FormValidator();
        this.isLoggedIn = false;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        document.getElementById('signupLink').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Sign up feature coming soon!');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isLoggedIn) {
                this.handleLogout();
            }
        });
    }

    handleLogin(e) {
        e.preventDefault();

        if (!this.validator.validateForm()) {
            return;
        }

        const email = document.getElementById('email').value;
        const userName = email.split('@')[0];

        // Show loading state
        this.loginBtn.disabled = true;
        this.loginBtn.classList.add('loading');

        // Simulate login delay
        setTimeout(() => {
            this.transitionToFloatingZone(userName, email);
        }, 1500);
    }

    transitionToFloatingZone(userName, email) {
        this.isLoggedIn = true;

        // Update user info
        document.getElementById('userName').textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
        document.getElementById('userEmail').textContent = email;

        // Fade out login and fade in floating zone
        this.loginContainer.classList.add('fade-out');
        
        setTimeout(() => {
            this.loginContainer.style.display = 'none';
            this.floatingZone.classList.add('active');
        }, 400);

        // Reset form
        setTimeout(() => {
            this.loginForm.reset();
            this.loginBtn.disabled = false;
            this.loginBtn.classList.remove('loading');
            this.validator.clearErrors();
        }, 500);
    }

    handleLogout() {
        this.isLoggedIn = false;

        // Fade out floating zone
        this.floatingZone.classList.remove('active');
        this.floatingZone.classList.add('fade-out');

        setTimeout(() => {
            this.floatingZone.style.display = 'none';
            this.floatingZone.classList.remove('fade-out');
            this.loginContainer.style.display = 'flex';
            this.loginContainer.classList.remove('fade-out');
        }, 400);
    }
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    generateParticles();
    new LoginManager();

    // Easter egg: Continuous particle generation
    setInterval(() => {
        generateParticles();
    }, 8000);
});

// ============ KEYBOARD SUPPORT ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('email').value && !document.getElementById('loginContainer').style.display) {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
