const router = require('express').Router();
const { User } = require('../../models');

router.get('/user-logged', async (req, res) => {
  try {
    return req.session.user_id;
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const newUser = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err){
    console.error(err);
    res.status(500).send('Error registering user.')
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validPassword = await userData.checkPassword(req.body.password);

    if (!userData || !validPassword) {
      res
        .status(400)
        .json( { message: 'Incorrect email or password! '});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json( { user: userData, message: 'You are now logged in!' });
    })


  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;