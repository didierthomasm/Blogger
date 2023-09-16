const comments = async function (event) {
  event.preventDefault();

  const content = document.querySelector('#content-comment').value.trim();
  const postId = document.querySelector('.create-comment').getAttribute('data-post-id');

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, post_id: postId } ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.create-comment')
  .addEventListener('submit', comments);