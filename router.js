const router = require('express').Router();

const UsersRouter = require('./views/UsersRouter');
const LobbiesRouter = require('./views/LobbiesRouter');
const PlayersRouter = require('./views/PlayersRouter');

router.use('/users', UsersRouter);
router.use('/lobbies', LobbiesRouter);
router.use('/players', PlayersRouter);

module.exports = router;
