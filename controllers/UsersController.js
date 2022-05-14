const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models/index');
const { Op } = require('sequelize');

const UsersController = {};

UsersController.logUser = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    User.findOne({

        where: { username: username }
    }).then(user => {

        if (!user) {

            res.status(400).json({ msg: "Invalid data. Incorrect username or password." });
        } else {

            if (bcrypt.compareSync(password, user.password)) {

                let token = jwt.sign({ user: user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                res.status(200).json({
                    user: user,
                    token: token
                })
            } else {
                res.status(401).json({ msg: "Invalid user or password." });
            }
        };


    }).catch(error => {
        res.send(error);
    })
}

UsersController.createUser = (req, res) => {

    try {

        let email = req.body.email;
        let username = req.body.username;
        let birthdate = req.body.birthdate; 
        if (!req.body.password) {
            let error = new Error("User must choose a password")
            throw error;
        }
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        User.findAll({
            where: {

                [Op.or]: [
                    {
                        email: {
                            [Op.like]: email
                        }
                    },
                    {
                        username: {
                            [Op.like]: username
                        }
                    }
                ]

            }

        }).then(usersEqEmailUsername => {

            if (usersEqEmailUsername == 0) {

                User.create({
                    email: email,
                    username: username,
                    birthdate: birthdate,
                    password: password
                }).then(user => {
                    res.status(201).json({ msg: `${user.username} has joined the game`, user: user });
                }).catch(err => res.status(400).json({ msg: "User creation failed when connecting to database", error: { name: err.name, message: err.message, detail: error } }));

            } else {
                res.status(200).json({ msg: "Username or email already in use" });
            }
        });

    } catch (error) {
        res.status(422).json({ msg: "User creation failed.", error: { name: error.name, message: error.message, detail: error } });
    }
}

UsersController.findUserById = (req, res) => {
    try {
        User.findByPk(req.params.pk)
            .then(data => {
                res.send(data)
            });
    } catch (err) {
        res.send(err);
    }
}

UsersController.findUserByUsername = (req, res) => {
    try {
        User.findOne({ where: { username: req.body.username } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

UsersController.updateUserById = async (req, res) => {

    let data = req.body;
    let id = req.params.pk;

    try {
        User.update(data, {
            where: { id: id }
        }).then(updatedUser => {
            res.status(200).json({ msg: `User id: ${id} has been updated`, user: updatedUser });
        }).catch(error => res.status(404).json({ msg: `There's been an error updating user id:${id}` , error: { name: error.name, message: error.message, detail: error } }));

    } catch (error) {
        res.status(422).json({ msg: "You're unauthorized to update this user's data", error: { name: error.name, message: error.message, detail: error } });
    }
}

UsersController.deleteUserById = async (req, res) => {

    let id = req.params.pk;

    try {
        User.findOne({
            where: { id: id },
        }).then(user => {
            if (user) {
                user.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `User id: ${id} has been deleted.` });
            } else {
                res.status(404).json({ msg: `User id: ${id} has not been deleted.` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}


module.exports = UsersController;