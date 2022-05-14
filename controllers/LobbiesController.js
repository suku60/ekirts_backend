const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Lobby } = require('../models/index');
const { Op } = require('sequelize');

const LobbiesController = {};

LobbiesController.createLobby = (req, res) => {
    
    let body = req.body;
    let lobbyName = req.body.lobbyName;

    let token = req.headers.authorization.split(' ')[1];
    let { user } = jwt.decode(token, authConfig.secret);
    let ownerId = req.body.ownerId

        Lobby.findAll({
            where: {

                [Op.or]: [
                    {
                        lobbyName: {
                            [Op.like]: lobbyName
                        }
                    }
                ]

            }

        }).then(lobbiesWithSameLobbyName => {

            if (lobbiesWithSameLobbyName == 0) {

                Lobby.create({
                    lobbyName: lobbyName,
                    ownerId: ownerId,
                    playersSize: body.playersSize,
                    turnSecondsTimer: body.turnSecondsTimer,
                    gameMaxMinutesTimes: body.gameMaxMinutesTimes
                }).then(lobby => {
                    res.status(201).json({ msg: `${lobby.lobbyName} lobby has been created`, lobby: lobby });
                }).catch(err => res.status(400).json({ msg: "Lobby creation failed when connecting to database. User may be trying to create a lobby without relation to himself.", error: { name: err.name, message: err.message, detail: error } }));

            } else {
                res.status(200).json({ msg: "Lobbyname already in use" });
            }
        });
}

// we're doing an update to lobby when it is full

LobbiesController.findLobbyById = (req, res) => {
    try {
        Lobby.findByPk(req.params.pk)
            .then(data => {
                    res.status(200).json(data);}
            );
    } catch (err) {
        res.send(err);
    }
}

LobbiesController.findLobbyByOwnerId = (req, res) => {

    let ownerId = req.params.pk
    try {
        Lobby.findAll({ where: { ownerId: ownerId } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

LobbiesController.findActiveLobbies = (req, res) => {
    try {
        Lobby.findAll({ where: { inactive: 0 } })
        
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

LobbiesController.findAvailableLobbies = async (req, res) => {

    try {
        Lobby.findAll({
            where: {
                [Op.and]: [
                    {
                        privateGame: {
                            [Op.like]: 0
                        }
                    },
                    {
                        inactive: {
                            [Op.like]: 0
                        }
                    }
                ]
            }
        }).then(data => {
            console.log("data we send as available:", data)
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

LobbiesController.updateLobbyById = async (req, res) => {

    let data = req.body;
    let id = req.params.pk;

    try {
        Lobby.update(data, {
            where: { id: id }
        }).then(updatedLobby => {
            res.status(200).json({ msg: `Lobby id: ${id} has been updated`, lobby: updatedLobby });
        }).catch(error => res.status(404).json({ msg: `There's been an error updating lobby id:${id}` , error: { name: error.name, message: error.message, detail: error } }));

    } catch (error) {
        res.status(422).json({ msg: "You're unauthorized to update this lobby's data", error: { name: error.name, message: error.message, detail: error } });
    }
}

LobbiesController.deleteLobbyById = async (req, res) => {

    let id = req.params.pk;

    try {
        Lobby.findOne({
            where: { id: id },
        }).then(lobby => {
            if (lobby) {
                lobby.destroy({
                    truncate: false
                })
                res.status(200).json({ msg: `Lobby id: ${id} has been deleted.` });
            } else {
                res.status(404).json({ msg: `Lobby id: ${id} has not been deleted.` })
            }
        });
    } catch (error) {
        res.send(error);
    }
}


module.exports = LobbiesController;