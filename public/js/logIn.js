const logInFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify( {email, password} ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
        .querySelector('.login-section')
        .addEventListener('submit', logInFormHandler);

const singUpFormHandler = async (event)=> {
  event.preventDefault();
  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const nickname = document.querySelector('#nickname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();

  if (password !== confirmPassword) {
    alert('Password do not match');
    return false;
  }

  if (firstName && lastName && nickname && email && password && confirmPassword) {
    const response = await fetch('/api/users/signup', {
      method:'POST',
      body:JSON.stringify( { firstName, lastName , nickname, email, password, confirmPassword } ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-section')
  .addEventListener('submit', singUpFormHandler);