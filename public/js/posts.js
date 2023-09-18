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

// Listen for click events on the delete button
document.addEventListener('click', async function(event) {
  if (event.target && event.target.classList.contains('delete-btn')) {
    const postId = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`api/posts/${postId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the DELETE request was successful
      if (response.ok) {
        alert('Post deleted successfully');
        // Remove the post from the DOM
        event.target.closest('article').remove();
      } else {
        alert('Error deleting post');
      }
    } catch (error) {
      console.error('There was an error:', error);
      alert('Error deleting post');
    }
  }
});

const updatePost = async function (event) {
  if (event.target && event.target.classList.contains('delete-btn')) {
    const commentID = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/comments/${commentID}/`, {
        method: 'POST',
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
  .querySelectorAll('.update-comment')
  .forEach(button => button.addEventListener('click', updatePost));