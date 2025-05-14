// initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // booking form validation 1
  const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // clear previous error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach((msg) => msg.remove());

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const classType = document.getElementById('classType').value;

      const nameRegex = /^[a-zA-Z\s-]+$/;
      const phoneRegex = /^\d+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true;

      // validation logic
      if (!name) {
        valid = false;
        showErrorMessage('Name is required.', 'fullName');
      } else if (!nameRegex.test(name)) {
        valid = false;
        showErrorMessage('Name can only contain letters, spaces, and hyphens (-).', 'fullName');
      }

      if (!email) {
        valid = false;
        showErrorMessage('Email is required.', 'email');
      } else if (!emailRegex.test(email)) {
        valid = false;
        showErrorMessage('Please enter a valid email address.', 'email');
      }

      if (!phone) {
        valid = false;
        showErrorMessage('Phone number is required.', 'phone');
      } else if (!phoneRegex.test(phone)) {
        valid = false;
        showErrorMessage('Phone number must only contain numbers.', 'phone');
      }

      if (!classType) {
        valid = false;
        showErrorMessage('Class type is required.', 'classType');
      }

      if (valid) {
        alert("Thank you for booking, " + name + "! We'll be in touch shortly.");
        bookingForm.reset();
      }
    });

    function showErrorMessage(message, fieldId) {
      const field = document.getElementById(fieldId);
      const errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      errorElement.textContent = message;
      field.parentNode.appendChild(errorElement);
    }
  }

  // timetable filtering functionality
  if (document.querySelector('.timetable-container')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timetableRows = document.querySelectorAll('.timetable tbody tr');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        timetableRows.forEach(row => {
          if (filterValue === 'all' || row.classList.contains(filterValue)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }
});

// gallery page
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.gallery-main')) {
    // initializes carousel with autoplay
    const galleryCarousel = new bootstrap.Carousel('#galleryCarousel', {
      interval: 3000, // rotate every 3 seconds
      pause: 'hover'  // pause on hover
    });
  }
});

// booking form validation 2
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    
    // name validation (only letters, spaces, and hyphens)
    nameInput.addEventListener('input', function() {
      const nameRegex = /^[a-zA-Z\s-]+$/;
      if (this.value && !nameRegex.test(this.value)) {
        this.classList.add('is-invalid');
      } else {
        this.classList.remove('is-invalid');
      }
    });
    
    // email validation
    emailInput.addEventListener('input', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.classList.add('is-invalid');
      } else {
        this.classList.remove('is-invalid');
      }
    });
    
    // form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // field validation
      let isValid = true;
      const nameRegex = /^[a-zA-Z\s-]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // name validation
      if (!nameRegex.test(nameInput.value)) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      }
      
      // email validation
      if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }
      
      // submits if valid
      if (isValid) {
        // in a real world application, you would send the form data to a server here
        alert('Thank you for your message! We will respond soon.');
        contactForm.reset();
      }
    });
  }
  
  // initialize google maps if needed
  if (document.querySelector('.map-container')) {
    console.log('Google Maps initialized');
    // additional map customization would go here
  }
});