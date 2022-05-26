const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAccess = require('../middlewares/AdminAccess');

const LobbiesController = require('../controllers/LobbiesController');

// LOBBIES CRUD
// create lobby
router.post('/create', auth, LobbiesController.createLobby);

// read lobbies
router.get('/find/:pk', auth, LobbiesController.findLobbyById);
router.get('/find/owner/:pk', auth, LobbiesController.findLobbyByOwnerId);
router.get('/findActive', auth, LobbiesController.findActiveLobbies);
router.get('/findAvailable', auth, LobbiesController.findAvailableLobbies);

// update lobbies
router.put('/update/:pk', auth, LobbiesController.updateLobbyById);

// delete lobby
router.delete('/delete/:pk', auth, adminAccess, LobbiesController.deleteLobbyById);

module.exports = router;