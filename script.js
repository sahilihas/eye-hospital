// For comments and 
// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission handling
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.service) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Success message
    alert('Thank you for your appointment request! We will contact you soon to confirm your appointment.');
    
    // Reset form
    appointmentForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Appointment request:', formData);
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate stats counter on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                if (numericValue) {
                    animateCounter(target, numericValue, finalValue);
                }
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target, finalText) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            const currentValue = Math.floor(current);
            if (finalText.includes('+')) {
                element.textContent = currentValue.toLocaleString() + '+';
            } else {
                element.textContent = currentValue.toLocaleString();
            }
        }
    }, 30);
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
});

// Add fade-in effect for service and doctor cards
function addFadeInAnimation() {
    const cards = document.querySelectorAll('.service-card, .doctor-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    addFadeInAnimation();
});

// Navbar hide on scroll down, show on scroll up
let lastScroll = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 50) {
    navbar.style.top = "-100px"; // Hide navbar
  } else {
    navbar.style.top = "0"; // Show navbar
  }

  lastScroll = currentScroll;
});

