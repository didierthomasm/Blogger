const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/sing-up', (req, res) => {
  res.render('register');
})

module.exports = router;