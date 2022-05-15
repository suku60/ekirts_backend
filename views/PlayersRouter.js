const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAccess = require('../middlewares/adminAccess');

const PlayersController = require('../controllers/PlayersController');

// PLAYERS CRUD
// create player
router.post('/create', auth, PlayersController.createPlayer);

// read players
router.get('/find/:pk', auth, PlayersController.findPlayerById);
router.get('/find/lobby/:lobbyId', auth, PlayersController.findPlayerByLobbyId);
router.get('/find/user/:userId', auth, PlayersController.findPlayerByUserId);

// update players
router.put('/update/:pk', auth, PlayersController.updatePlayerById);

// delete player
router.delete('/delete/:pk', auth, PlayersController.deletePlayerById);
router.delete('/delete/:userPk/:lobbyPk', auth, PlayersController.deletePlayerByUserAndLobbyId);


module.exports = router;