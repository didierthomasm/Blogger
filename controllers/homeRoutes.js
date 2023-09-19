const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const transformDate = require('../utils/transformDate');

router.get('/', async (req, res) => {

    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    const date = posts[0].createdAt;
    console.log(transformDate(date)) ;
    // Pass serialized data and session flag into template
    res.render('home', {
      posts,
      logged_in: req.session.logged_in
    });

});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
        {
          model: Comment,
          attributes: ['content', 'created_at', 'id'],
          include: [{
            model: User,
            attributes: ['nickname', 'id'],
          }]
        },
      ],
    });

    const post = postData.get({ plain: true });
    const postOwnerId = post['user_id'];

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      loggedInUserId: req.session.user_id,
      postOwnerId: postOwnerId
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;