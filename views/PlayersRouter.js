const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
// const adminAccess = require('../middlewares/adminAcess');

// const PlayersController = require('../controllers/PlayersController');

// PLAYERS CRUD
// create player
router.post('/create', PlayersController.createPlayer);

// read players
router.get('/find/:pk', auth, PlayersController.findPlayerById);
router.get('/find/lobby/:pk', auth, PlayersController.findPlayerByLobbyId);

// update players
router.post('/update/:pk', auth, PlayersController.updatePlayer);

// delete player
router.delete('/delete/:pk', auth, PlayersController.deletePlayerById);


module.exports = router;