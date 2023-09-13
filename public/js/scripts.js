/*
// Password toggle
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.querySelector('input[type="password"]');
  const togglePasswordButton = document.createElement('button');
  togglePasswordButton.innerHTML = '👁️'; // Eye emoji, but you can replace it with an icon
  togglePasswordButton.classList.add('toggle-password');

  const container = passwordInput.parentNode;
  container.classList.add('show-password');
  container.appendChild(togglePasswordButton);

  togglePasswordButton.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type); // Toggle between password visibility
  });
});
*/
