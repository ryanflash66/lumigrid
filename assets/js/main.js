(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelectorAll(".header-logo");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    if(logo.length) {
      // === logo change
      if (ud_header.classList.contains("sticky")) {
        document.querySelector(".header-logo").src =
          "assets/images/logo/logo.svg"
      } else {
        document.querySelector(".header-logo").src =
          "assets/images/logo/logo-white.svg"
      }
    }

    if (document.documentElement.classList.contains("dark")) {
      if(logo.length) {
        // === logo change
        if (ud_header.classList.contains("sticky")) {
          document.querySelector(".header-logo").src =
            "assets/images/logo/logo-white.svg"
        } 
      }
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ===== responsive navbar
  let navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  //===== close navbar-collapse when a  clicked
  document
    .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
    .forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
      })
    );

  // ===== Sub-menu (removed - Pages dropdown no longer exists)

  // ===== Faq accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
    el.querySelector(".faq-btn").addEventListener("click", () => {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  // Enhanced back-to-top button with smooth scroll
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    backToTopBtn.onclick = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  }

    /* ========  themeSwitcher start ========= */

  // themeSwitcher
  const themeSwitcher = document.getElementById('themeSwitcher');

  // Theme Vars
  const userTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color0scheme: dark)').matches;

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
      return;
    }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  // call theme switch on clicking buttons
  themeSwitcher.addEventListener('click', () => {
    themeSwitch();
  });

  // invoke theme check on initial load
  themeCheck();
  /* ========  themeSwitcher End ========= */

  /* ========  Contact Form Handler Start ========= */
  
  // Form validation and submission handler
  // NOTE: Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree endpoint URL
  // Get your endpoint at: https://formspree.io/forms
  const FORMPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT';

  // Validation functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    // Basic phone validation - allows international format with +, spaces, dashes, parentheses
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  function validateForm(form) {
    const errors = {};
    const formData = new FormData(form);
    
    // Validate full name
    const fullName = formData.get('fullName')?.trim() || '';
    if (!fullName) {
      errors.fullName = 'Full name is required';
    } else if (fullName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    // Validate email
    const email = formData.get('email')?.trim() || '';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate phone
    const phone = formData.get('phone')?.trim() || '';
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Validate message
    const message = formData.get('message')?.trim() || '';
    if (!message) {
      errors.message = 'Message is required';
    } else if (message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  }

  // Display error message
  function showFieldError(field, message) {
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Remove error styling
    field.classList.remove('border-red-500', 'border-b-red-500');
    field.classList.add('border-[#f1f1f1]', 'dark:border-dark-3');

    if (message) {
      // Add error styling
      field.classList.remove('border-[#f1f1f1]', 'dark:border-dark-3');
      field.classList.add('border-red-500', 'border-b-red-500');
      
      // Create and insert error message
      const errorElement = document.createElement('span');
      errorElement.className = 'field-error block mt-2 text-sm text-red-500';
      errorElement.textContent = message;
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-live', 'polite');
      field.parentElement.appendChild(errorElement);
      
      // Associate error with field for accessibility
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `error-${field.id}`);
      errorElement.id = `error-${field.id}`;
    } else {
      field.setAttribute('aria-invalid', 'false');
      field.removeAttribute('aria-describedby');
    }
  }

  // Clear all errors
  function clearAllErrors(form) {
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
      showFieldError(field, '');
    });
  }

  // Show success message
  function showSuccessMessage(form) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const successElement = document.createElement('div');
    successElement.className = 'form-message mb-6 p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800';
    successElement.setAttribute('role', 'alert');
    successElement.setAttribute('aria-live', 'polite');
    successElement.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-sm font-medium text-green-800 dark:text-green-200">
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </p>
      </div>
    `;
    
    form.insertBefore(successElement, form.firstChild);
    
    // Scroll to success message
    successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successElement.style.transition = 'opacity 0.3s ease-out';
      successElement.style.opacity = '0';
      setTimeout(() => successElement.remove(), 300);
    }, 5000);
  }

  // Show error message
  function showErrorMessage(form, message = 'Something went wrong. Please try again later.') {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'form-message mb-6 p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800';
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <p class="text-sm font-medium text-red-800 dark:text-red-200">
          ${message}
        </p>
      </div>
    `;
    
    form.insertBefore(errorElement, form.firstChild);
    
    // Scroll to error message
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Set loading state
  function setLoadingState(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const existingMessage = form.querySelector('.form-message');
    
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;
      
      // Remove existing messages during loading
      if (existingMessage) {
        existingMessage.remove();
      }
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      submitButton.innerHTML = 'Send';
    }
  }

  // Handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // Clear previous errors and messages
    clearAllErrors(form);
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Honeypot spam check - if this field is filled, it's likely spam
    const honeypotField = form.querySelector('input[name="website"]');
    if (honeypotField && honeypotField.value.trim() !== '') {
      // Silent fail for spam - don't show error message to spammers
      console.log('Spam detected - form submission blocked');
      return;
    }

    // Validate form
    const errors = validateForm(form);
    
    if (Object.keys(errors).length > 0) {
      // Show validation errors
      Object.keys(errors).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
          showFieldError(field, errors[fieldName]);
        }
      });
      
      // Focus first error field
      const firstErrorField = form.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.focus();
      }
      
      return;
    }

    // Set loading state
    setLoadingState(form, true);

    try {
      // Prepare form data
      const formData = new FormData(form);
      
      // Submit to Formspree
      const response = await fetch(FORMPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        showSuccessMessage(form);
        form.reset();
        clearAllErrors(form);
        
        // Focus on first field after successful submission
        const firstField = form.querySelector('input, textarea');
        if (firstField) {
          firstField.focus();
        }
      } else {
        // Handle Formspree errors
        const data = await response.json();
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.message).join(', ');
          showErrorMessage(form, errorMessages);
        } else {
          showErrorMessage(form);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showErrorMessage(form, 'Network error. Please check your connection and try again.');
    } finally {
      // Reset loading state
      setLoadingState(form, false);
    }
  }

  // Setup character counter for message field
  function setupCharacterCounter(form) {
    const messageField = form.querySelector('textarea[name="message"]');
    const counter = form.querySelector('.message-counter .current-count');
    
    if (messageField && counter) {
      // Update counter on input
      messageField.addEventListener('input', () => {
        const currentLength = messageField.value.length;
        counter.textContent = currentLength;
        
        // Change color when approaching limit
        if (currentLength > 450) {
          counter.parentElement.classList.add('text-red-500');
          counter.parentElement.classList.remove('text-body-color/60', 'dark:text-dark-6/60');
        } else {
          counter.parentElement.classList.remove('text-red-500');
          counter.parentElement.classList.add('text-body-color/60', 'dark:text-dark-6/60');
        }
      });
      
      // Initialize counter
      counter.textContent = messageField.value.length;
    }
  }

  // Real-time validation on blur
  function setupFieldValidation(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    
    fields.forEach(field => {
      field.addEventListener('blur', () => {
        const formData = new FormData(form);
        const fieldName = field.name;
        const fieldValue = formData.get(fieldName)?.trim() || '';
        
        let error = '';
        
        if (!fieldValue) {
          error = `${fieldName === 'fullName' ? 'Full name' : fieldName === 'email' ? 'Email' : fieldName === 'phone' ? 'Phone number' : 'Message'} is required`;
        } else {
          if (fieldName === 'email' && !isValidEmail(fieldValue)) {
            error = 'Please enter a valid email address';
          } else if (fieldName === 'phone' && !isValidPhone(fieldValue)) {
            error = 'Please enter a valid phone number';
          } else if (fieldName === 'message' && fieldValue.length < 10) {
            error = 'Message must be at least 10 characters';
          } else if (fieldName === 'fullName' && fieldValue.length < 2) {
            error = 'Full name must be at least 2 characters';
          }
        }
        
        showFieldError(field, error);
      });
      
      // Clear error on input
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          const formData = new FormData(form);
          const fieldName = field.name;
          const fieldValue = formData.get(fieldName)?.trim() || '';
          
          let error = '';
          if (fieldValue) {
            if (fieldName === 'email' && !isValidEmail(fieldValue)) {
              error = 'Please enter a valid email address';
            } else if (fieldName === 'phone' && !isValidPhone(fieldValue)) {
              error = 'Please enter a valid phone number';
            } else if (fieldName === 'message' && fieldValue.length < 10) {
              error = 'Message must be at least 10 characters';
            } else if (fieldName === 'fullName' && fieldValue.length < 2) {
              error = 'Full name must be at least 2 characters';
            }
          }
          
          if (!error) {
            showFieldError(field, '');
          } else {
            showFieldError(field, error);
          }
        }
      });
    });
  }

  // Initialize form handlers
  function initContactForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Only handle contact forms (forms with fullName, email, phone, message fields)
      const hasContactFields = form.querySelector('[name="fullName"]') && 
                               form.querySelector('[name="email"]') && 
                               form.querySelector('[name="phone"]') && 
                               form.querySelector('[name="message"]');
      
      if (hasContactFields) {
        form.addEventListener('submit', handleFormSubmit);
        setupFieldValidation(form);
        setupCharacterCounter(form);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForms);
  } else {
    initContactForms();
  }

  /* ========  Contact Form Handler End ========= */

  /* ========  Smooth Scroll Handler Start ========= */
  
  // Smooth scroll for anchor links with header offset
  function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#' || href === '') {
          return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Get header height (sticky header)
          const header = document.querySelector('.ud-header');
          const headerHeight = header ? header.offsetHeight : 80;
          
          // Calculate target position
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          // Smooth scroll
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarToggler = document.querySelector('#navbarToggler');
          const navbarCollapse = document.querySelector('#navbarCollapse');
          if (navbarToggler && navbarCollapse) {
            navbarToggler.classList.remove('navbarTogglerActive');
            navbarCollapse.classList.add('hidden');
          }
        }
      });
    });
  }

  // Initialize smooth scroll
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }

  /* ========  Smooth Scroll Handler End ========= */
})();
