const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    // Assuming you're sending updated post data in the request body
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
    };

    const result = await Post.update(updatedData, {
      where: {
        id: req.params.id
      }
    });

    // `result` is an array with one number, indicating the number of rows updated
    if (result[0] === 0) { // No rows were updated
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error updating the post', error: err });
  }
});



module.exports = router;