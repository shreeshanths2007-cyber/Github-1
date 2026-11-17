document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeOpen = document.getElementById('eyeOpen');
  const eyeClosed = document.getElementById('eyeClosed');
  const submitBtn = document.getElementById('submitBtn');
  const statusAlert = document.getElementById('statusAlert');

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    eyeOpen.classList.toggle('hidden', isPassword);
    eyeClosed.classList.toggle('hidden', !isPassword);
  });

  // Basic validation helpers
  function validateEmail(email) {
    const trimmed = email.trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your Gmail address.' };
    }
    // Check general email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: 'Please enter a valid email address (e.g., user@gmail.com).' };
    }
    return { valid: true };
  }

  function validatePassword(password) {
    if (!password) {
      return { valid: false, message: 'Please enter your password.' };
    }
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters long.' };
    }
    return { valid: true };
  }

  // Clear errors on input
  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('error-border');
    emailError.textContent = '';
    hideAlert();
  });

  passwordInput.addEventListener('input', () => {
    passwordInput.classList.remove('error-border');
    passwordError.textContent = '';
    hideAlert();
  });

  function showAlert(message, type) {
    statusAlert.textContent = message;
    statusAlert.className = `status-alert ${type}`;
  }

  function hideAlert() {
    statusAlert.className = 'status-alert hidden';
    statusAlert.textContent = '';
  }

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const emailCheck = validateEmail(email);
    const passCheck = validatePassword(password);

    let hasError = false;

    if (!emailCheck.valid) {
      emailInput.classList.add('error-border');
      emailError.textContent = emailCheck.message;
      hasError = true;
    }

    if (!passCheck.valid) {
      passwordInput.classList.add('error-border');
      passwordError.textContent = passCheck.message;
      hasError = true;
    }

    if (hasError) return;

    // Simulate authentication / submit process
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Signing in...</span>';
    hideAlert();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Sign In</span>';
      showAlert(`Welcome! Successfully logged in as ${email.trim()}`, 'success');
      form.reset();
    }, 1000);
  });
});
