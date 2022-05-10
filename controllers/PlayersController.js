const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Player } = require('../models/index');
const { Op } = require('sequelize');

const PlayersController = {};


PlayersController.createPlayer = (req, res) => {

    try {

        let email = req.body.email;
        let username = req.body.username;
        let birthdate = req.body.birthdate; 
        if (!req.body.password) {
            let error = new Error("Player must choose a password")
            throw error;
        }
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        Player.findAll({
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

        }).then(usersEqEmailPlayername => {

            if (usersEqEmailPlayername == 0) {

                Player.create({
                    email: email,
                    username: username,
                    birthdate: birthdate,
                    password: password
                }).then(user => {
                    res.status(201).json({ msg: `${user.username} has joined the game`, user: user });
                }).catch(err => res.status(400).json({ msg: "Player creation failed when connecting to database", error: { name: err.name, message: err.message, detail: error } }));

            } else {
                res.status(200).json({ msg: "Playername or email already in use" });
            }
        });

    } catch (error) {
        res.status(422).json({ msg: "Player creation failed.", error: { name: error.name, message: error.message, detail: error } });
    }
}

PlayersController.findPlayerById = (req, res) => {
    try {
        Player.findOne({ where: { id: req.body.id } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

PlayersController.findPlayerByPlayername = (req, res) => {
    try {
        Player.findOne({ where: { username: req.body.username } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

PlayersController.updatePlayerById = async (req, res) => {

    let data = req.body;
    let id = req.params.pk;

    try {
        Player.update(data, {
            where: { id: id }
        }).then(updatedPlayer => {
            res.status(200).json({ msg: `Player id: ${id} has been updated`, user: updatedPlayer });
        }).catch(error => res.status(404).json({ msg: `There's been an error updating user id:${id}` , error: { name: error.name, message: error.message, detail: error } }));

    } catch (error) {
        res.status(422).json({ msg: "You're unauthorized to update this user's data", error: { name: error.name, message: error.message, detail: error } });
    }
}

PlayersController.deletePlayerById = async (req, res) => {

    let id = req.params.pk;

    try {
        Player.findOne({
            where: { id: id },
        }).then(user => {
            if (user) {
                user.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `Player id: ${id} has been deleted.` });
            } else {
                res.status(404).json({ msg: `Player id: ${id} has not been deleted.` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}


module.exports = PlayersController;