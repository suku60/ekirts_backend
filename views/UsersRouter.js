const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAccess = require('../middlewares/adminAcess');

const UsersController = require('../controllers/UsersController');

// USERS CRUD
// login user
router.post('/login', UsersController.logUser);

// create user
router.post('/create', UsersController.createUser);

// read users
router.get('/find/:pk', auth, UsersController.findUserById);
router.get('/find/:username', auth, UsersController.findUserByUsername);

// update users
router.post('/update/:pk', auth, UsersController.updateUserById);

// delete user
router.delete('/delete/:pk', auth, UsersController.deleteUserById);


module.exports = router;