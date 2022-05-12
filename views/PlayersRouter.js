const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAccess = require('../middlewares/AdminAccess');

const PlayersController = require('../controllers/PlayersController');

// PLAYERS CRUD
// create player
router.post('/create', PlayersController.createPlayer);

// read players
router.get('/find/:pk', auth, PlayersController.findPlayerById);
router.get('/find/lobby/:pk', auth, PlayersController.findPlayerByLobbyId);

// update players
router.put('/update/:pk', auth, adminAccess, PlayersController.updatePlayerById);

// delete player
router.delete('/delete/:pk', auth, PlayersController.deletePlayerById);


module.exports = router;