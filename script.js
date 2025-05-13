let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Close menu when clicking a nav link
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

const typedTextSpan = document.querySelector(".typed-text");
const text = "Vishnu";
const typingDelay = 200;
const erasingDelay = 200;
const newTextDelay = 2000;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!isDeleting && charIndex < text.length) {
        typedTextSpan.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, typingDelay);
    } else if (isDeleting && charIndex > 0) {
        typedTextSpan.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, erasingDelay);
    } else {
        isDeleting = !isDeleting;
        setTimeout(typeEffect, isDeleting ? erasingDelay : newTextDelay);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    typedTextSpan.textContent = '';
    setTimeout(typeEffect, newTextDelay);
});

// Read More/Less functionality
const readMoreBtn = document.querySelector('.read-more-btn');
const moreText = document.querySelector('.more-text');

// Initially hide the extra text
moreText.style.display = 'none';

readMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (moreText.style.display === 'none') {
        // Show more text
        moreText.style.display = 'inline';
        readMoreBtn.textContent = 'Read Less';
    } else {
        // Hide extra text
        moreText.style.display = 'none';
        readMoreBtn.textContent = 'Read More';
    }
});

// Character count functionality
const textarea = document.querySelector('textarea');
const charCount = document.querySelector('#current');
const maxCount = document.querySelector('#maximum');
const maxLength = 500;
maxCount.textContent = maxLength;

textarea.addEventListener('input', function() {
    const remaining = this.value.length;
    charCount.textContent = remaining;
    if (remaining > maxLength * 0.9) {
        charCount.style.color = '#ff1d15';
    } else {
        charCount.style.color = 'inherit';
    }
});

// Form validation function
function validateForm(formData) {
    const { name, email, subject, message } = Object.fromEntries(formData.entries());
    
    if (!name || !email || !subject || !message) {
        showToast('Please fill all required fields', true);
        return false;
    }
    
    if (message.length > 500) {
        showToast('Message must be less than 500 characters', true);
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', true);
        return false;
    }
    
    return true;
}

// Form submission with loading and toast
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        if (!validateForm(formData)) return;
        
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.loader');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        loader.style.display = 'block';
        submitBtn.disabled = true;
        
        try {
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch('https://api-portfolio-at5a.onrender.com/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            showToast(result.message || 'Message sent successfully!');
            this.reset();
            document.querySelector('#current').textContent = '0';
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again.', true);
        } finally {
            btnText.textContent = 'Send Message';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Toast function
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('i');
    const toastMessage = toast.querySelector('.message');
    
    toastMessage.textContent = message;
    
    if (isError) {
        toast.style.backgroundColor = '#ff1d15';
        toastIcon.className = 'bx bx-error-circle';
    } else {
        toast.style.backgroundColor = '#ea580c';
        toastIcon.className = 'bx bx-check-circle';
    }
    
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}
document.getElementById('contactBtn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior

    const email = 'vishnuwitty@gmail.com'; // Replace with your email
    const subject = encodeURIComponent('Excited to Connect with You!');
    const body = encodeURIComponent(`Hi Vishnu,

I came across your portfolio and was impressed by your work. I'd love to learn more about your projects and explore the possibility of working together.

Looking forward to hearing from you!

Best regards,
[Your Name]`);


    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
});
