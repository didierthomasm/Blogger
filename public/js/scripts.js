const createPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-create-post').value.trim();
  const description = document.querySelector('#description-create-post').value.trim();
  const content = document.querySelector('#content-create-post').value.trim();

  if (title && description && content) {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify( { title, description, content } ),
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
  .querySelector('.create-post')
  .addEventListener('submit', createPost);

