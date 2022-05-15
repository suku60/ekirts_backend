const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAccess = require('../middlewares/adminAccess');

const UsersController = require('../controllers/UsersController');

// USERS CRUD
// login user
router.post('/login', UsersController.logUser);

// create user
router.post('/create', UsersController.createUser);

// read users
router.get('/find/:pk', auth, UsersController.findUserById);
router.get('/find', auth, UsersController.findUserByUsername);

// update users
router.put('/update/:pk', auth, UsersController.updateUserById);
// router.put('/update/status/:username', auth, adminAccess, UsersController.updateUserStatus);

// delete user
router.delete('/delete/:pk', auth, adminAccess, UsersController.deleteUserById);


module.exports = router;