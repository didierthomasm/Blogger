const singUpFormHandler = async (event)=> {
  event.preventDefault();
  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const nickname = document.querySelector('#nickname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (firstName && lastName && nickname && email && password) {
    const response = await fetch('/api/user/signup', {
      method:'POST',
      body:JSON.stringify( { firstName, lastName , nickname, email, password } ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.signup-section')
  .addEventListener('submit', singUpFormHandler);