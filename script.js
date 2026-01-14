// CONFIGURATION: Change WhatsApp number (format: 91XXXXXXXXXX)
const WHATSAPP_NUMBER = '919934642587';

// DOM ELEMENTS
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const bookingForm = document.getElementById('bookingForm');
const copyBtn = document.getElementById('copyBtn');
const routeChips = document.querySelectorAll('.route-chip');
const bookPlaceBtns = document.querySelectorAll('.book-place-btn');
const faqItems = document.querySelectorAll('.faq-item');
const widgetToggle = document.getElementById('widgetToggle');
const widgetContent = document.getElementById('widgetContent');
const placesCarousel = document.getElementById('placesCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
// ========================================
const revealElements = document.querySelectorAll('.routes-section, .booking-section, .cars-section, .places-section, .why-us-section, .testimonials-section, .faq-section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

// ========================================
// POPULAR ROUTES - AUTO FILL FORM
// ========================================
routeChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const pickup = chip.getAttribute('data-pickup');
        const drop = chip.getAttribute('data-drop');
        
        document.getElementById('pickup').value = pickup;
        document.getElementById('drop').value = drop;
        
        // Scroll to booking form smoothly
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // Focus on date field
        setTimeout(() => {
            document.getElementById('date').focus();
        }, 500);
    });
});

// ========================================
// PLACES TO VISIT - BOOK THIS TRIP
// ========================================
bookPlaceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const placeCard = btn.closest('.place-card');
        const destination = placeCard.getAttribute('data-destination');
        
        document.getElementById('pickup').value = 'Purnia, Bihar';
        document.getElementById('drop').value = destination;
        
        // Scroll to booking form
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // Focus on date field
        setTimeout(() => {
            document.getElementById('date').focus();
        }, 500);
    });
});

// ========================================
// PLACES CAROUSEL - TOUCH & BUTTON NAVIGATION
// ========================================
let isCarouselDown = false;
let startX;
let scrollLeft;

// Touch/Mouse drag scrolling
placesCarousel.addEventListener('mousedown', (e) => {
    isCarouselDown = true;
    placesCarousel.style.cursor = 'grabbing';
    startX = e.pageX - placesCarousel.offsetLeft;
    scrollLeft = placesCarousel.scrollLeft;
});

placesCarousel.addEventListener('mouseleave', () => {
    isCarouselDown = false;
    placesCarousel.style.cursor = 'grab';
});

placesCarousel.addEventListener('mouseup', () => {
    isCarouselDown = false;
    placesCarousel.style.cursor = 'grab';
});

placesCarousel.addEventListener('mousemove', (e) => {
    if (!isCarouselDown) return;
    e.preventDefault();
    const x = e.pageX - placesCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    placesCarousel.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
placesCarousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - placesCarousel.offsetLeft;
    scrollLeft = placesCarousel.scrollLeft;
}, { passive: true });

placesCarousel.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - placesCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    placesCarousel.scrollLeft = scrollLeft - walk;
}, { passive: true });

// Previous/Next button navigation
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        placesCarousel.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        placesCarousel.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
}

// ========================================
// CARS CAROUSEL NAVIGATION
// ========================================
const carsCarousel = document.getElementById('carsCarousel');
const carsPrevBtn = document.getElementById('carsPrevBtn');
const carsNextBtn = document.getElementById('carsNextBtn');

// Touch/drag functionality for cars carousel
let isCarsDown = false;
let carsStartX;
let carsScrollLeft;

if (carsCarousel) {
    // Mouse events for desktop
    carsCarousel.addEventListener('mousedown', (e) => {
        isCarsDown = true;
        carsCarousel.style.cursor = 'grabbing';
        carsStartX = e.pageX - carsCarousel.offsetLeft;
        carsScrollLeft = carsCarousel.scrollLeft;
    });

    carsCarousel.addEventListener('mouseleave', () => {
        isCarsDown = false;
        carsCarousel.style.cursor = 'grab';
    });

    carsCarousel.addEventListener('mouseup', () => {
        isCarsDown = false;
        carsCarousel.style.cursor = 'grab';
    });

    carsCarousel.addEventListener('mousemove', (e) => {
        if (!isCarsDown) return;
        e.preventDefault();
        const x = e.pageX - carsCarousel.offsetLeft;
        const walk = (x - carsStartX) * 2;
        carsCarousel.scrollLeft = carsScrollLeft - walk;
    });

    // Touch events for mobile
    carsCarousel.addEventListener('touchstart', (e) => {
        carsStartX = e.touches[0].pageX - carsCarousel.offsetLeft;
        carsScrollLeft = carsCarousel.scrollLeft;
    }, { passive: true });

    carsCarousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carsCarousel.offsetLeft;
        const walk = (x - carsStartX) * 2;
        carsCarousel.scrollLeft = carsScrollLeft - walk;
    }, { passive: true });
}

// Previous/Next button navigation for cars
if (carsPrevBtn) {
    carsPrevBtn.addEventListener('click', () => {
        carsCarousel.scrollBy({
            left: -340,
            behavior: 'smooth'
        });
    });
}

if (carsNextBtn) {
    carsNextBtn.addEventListener('click', () => {
        carsCarousel.scrollBy({
            left: 340,
            behavior: 'smooth'
        });
    });
}

// ========================================
// BOOKING FORM VALIDATION & WHATSAPP SUBMISSION
// ========================================
// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Form validation function
function validateForm() {
    let isValid = true;
    
    // Clear all previous errors
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
    });
    document.querySelectorAll('.error').forEach(input => {
        input.classList.remove('error');
    });
    
    // Name validation
    const name = document.getElementById('name');
    if (name.value.trim().length < 2) {
        showError('nameError', 'Please enter a valid name (at least 2 characters)');
        name.classList.add('error');
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        showError('phoneError', 'Please enter a valid 10-digit mobile number');
        phone.classList.add('error');
        isValid = false;
    }
    
    // Pickup validation
    const pickup = document.getElementById('pickup');
    if (pickup.value.trim().length < 3) {
        showError('pickupError', 'Please enter a valid pickup location');
        pickup.classList.add('error');
        isValid = false;
    }
    
    // Drop validation
    const drop = document.getElementById('drop');
    if (drop.value.trim().length < 3) {
        showError('dropError', 'Please enter a valid drop location');
        drop.classList.add('error');
        isValid = false;
    }
    
    // Date validation
    const date = document.getElementById('date');
    if (!date.value) {
        showError('dateError', 'Please select a journey date');
        date.classList.add('error');
        isValid = false;
    }
    
    // Time validation
    const time = document.getElementById('time');
    if (!time.value) {
        showError('timeError', 'Please select a journey time');
        time.classList.add('error');
        isValid = false;
    }
    
    // Trip type validation
    const tripType = document.getElementById('tripType');
    if (!tripType.value) {
        showError('tripTypeError', 'Please select a trip type');
        tripType.classList.add('error');
        isValid = false;
    }
    
    // Passengers validation
    const passengers = document.getElementById('passengers');
    if (passengers.value < 1 || passengers.value > 15) {
        showError('passengersError', 'Please enter a valid number of passengers (1-15)');
        passengers.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Show error message helper
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Generate WhatsApp message
function generateWhatsAppMessage() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pickup = document.getElementById('pickup').value.trim();
    const drop = document.getElementById('drop').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tripType = document.getElementById('tripType').value;
    const passengers = document.getElementById('passengers').value;
    const notes = document.getElementById('notes').value.trim();
    
    // Format date (DD/MM/YYYY)
    const dateObj = new Date(date);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
    
    // Format time (12-hour format)
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedTime = `${formattedHour}:${minutes} ${ampm}`;
    
    // Create message with exact format specified
    let message = `Ride Request (Website)\n\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Trip: ${tripType}\n`;
    message += `Pickup: ${pickup}\n`;
    message += `Drop: ${drop}\n`;
    message += `Date: ${formattedDate}\n`;
    message += `Time: ${formattedTime}\n`;
    message += `Passengers: ${passengers}\n`;
    
    if (notes) {
        message += `Notes: ${notes}\n`;
    }
    
    return message;
}

// Form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const message = generateWhatsAppMessage();
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset form after submission
            // bookingForm.reset();
        }
    });
}

// Copy message button
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        if (validateForm()) {
            const message = generateWhatsAppMessage();
            
            // Copy to clipboard
            navigator.clipboard.writeText(message).then(() => {
                // Show success feedback
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                copyBtn.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = message;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            copyBtn.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        });
    }
    });
}

// ========================================
// FAQ ACCORDION
// ========================================
if (faqItems && faqItems.length > 0) {
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// DESKTOP FLOATING WIDGET
// ========================================
if (widgetToggle && widgetContent) {
    widgetToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        widgetContent.classList.toggle('show');
    });
    
    widgetContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    document.addEventListener('click', function(e) {
        const widget = document.querySelector('.desktop-widget');
        if (widget && !widget.contains(e.target)) {
            widgetContent.classList.remove('show');
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// REMOVE FOCUS OUTLINE ON MOUSE CLICK (ACCESSIBILITY)
// ========================================
document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
});

document.addEventListener('keydown', () => {
    document.body.classList.remove('using-mouse');
});

// Add CSS for focus management
const style = document.createElement('style');
style.textContent = `
    body.using-mouse *:focus {
        outline: none;
    }
`;
document.head.appendChild(style);

