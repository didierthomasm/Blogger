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

document.querySelectorAll('.update-post-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const post = btn.closest('.post');
    post.querySelector('.display-state').style.display = 'none';
    post.querySelector('.edit-state').style.display = 'block';
  });
});

document.querySelectorAll('.cancel-post-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const post = btn.closest('.post');
    post.querySelector('.display-state').style.display = 'block';
    post.querySelector('.edit-state').style.display = 'none';
  });
});

document.querySelectorAll('.save-post-btn').forEach(btn => {
  btn.addEventListener('click', async function() {
    const postSection = btn.closest('.post');
    const postId = postSection.getAttribute('data-id');

    const postTitle = postSection.querySelector('.post-title-edit').value.trim();
    const postDescription = postSection.querySelector('.post-description-edit').value.trim();
    const postContent = postSection.querySelector('.post-content-edit').value.trim();




    try {
      const response = await fetch(`/api/posts/${postId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: postContent,
          title: postTitle,
          description: postDescription
        })
      });

      if (response.ok) {
        // Update the displayed content and toggle views
        postSection.querySelector('.post-title').textContent = postTitle;
        postSection.querySelector('.post-description').textContent = postDescription;
        postSection.querySelector('.post-content').textContent = postContent;

        postSection.querySelector('.display-state').style.display = 'block';
        postSection.querySelector('.edit-state').style.display = 'none';
        alert('Post updated successfully');
      } else {
        alert('Error updating post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating post');
    }
  });
});