// script.js
const signupForm = document.getElementById('signup-form');
const unameInput = document.getElementById('uname');
const pswInput = document.getElementById('psw');
const signupBtn = document.getElementById('signup-btn');

signupBtn.addEventListener('click', (e) => {
  e.preventDefault(); // prevent form submission
  const uname = unameInput.value;
  const psw = pswInput.value;

  // simulate login credentials validation (replace with your actual validation logic)
  if (uname && psw) {
    // auto-login logic
    localStorage.setItem('username', uname);
    localStorage.setItem('password', psw);
    window.location.href = 'dashboard.html'; // redirect to dashboard page
  } else {
    alert('Invalid credentials');
  }
});
// Login function (unchanged)
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('uname').value.trim();
  const password = document.getElementById('psw').value.trim();

  if (username && password) {
    if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
      alert('Login successful!');
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  } else {
    alert('Please fill in both username and password.');
  }
});