const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAccess = require('../middlewares/adminAcess');

const LobbiesController = require('../controllers/LobbiesController');

// LOBBIES CRUD
// create lobby
router.post('/create', LobbiesController.createLobby);

// read lobbies
router.get('/find/:pk', auth, LobbiesController.findLobbyById);
router.get('/find/owner/:pk', auth, LobbiesController.findLobbyByOwnerId);
router.get('/find/active', auth, LobbiesController.findActiveLobbies);
router.get('/find/available', auth, LobbiesController.findAvailableLobbies);

// update lobbies
router.post('/update/:pk', auth, LobbiesController.updateLobbyById);

// delete lobby
router.delete('/delete/:pk', auth, adminAccess, LobbiesController.deleteLobbyById);


module.exports = router;