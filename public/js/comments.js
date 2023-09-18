const createComment = async function (event) {
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
  .addEventListener('submit', createComment);

const deleteComment = async function (event) {
  if (event.target && event.target.classList.contains('delete-btn')) {
    const commentID = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/comments/${commentID}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      // Check if the DELETE request was successful
      if (response.ok) {
        alert('Comment deleted successfully');
        // Remove the comment from the DOM
        event.target.closest('article').remove();
      } else {
        alert('Error deleting comment');
      }
    } catch (error) {
      console.error('There was an error:', error);
      alert('Error deleting comment');
    }
  }
};

document
        .querySelectorAll('.delete-btn')
        .forEach(button => button.addEventListener('click', deleteComment));