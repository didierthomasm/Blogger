const router = require('express').Router();
const apiRoute = require('./apiRoutes');
const viewRoute = require('./viewRoutes');

router.use('/api', apiRoute);
router.use('/', viewRoute);

module.exports = router;