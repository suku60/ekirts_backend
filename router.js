const router = require('express').Router();

const UsersRouter = require('./views/UsersRouter');
const LobbiesRouter = require('./views/LobbiesRouter');

router.use('/users', UsersRouter);
router.use('/movies', LobbiesRouter);

module.exports = router;
