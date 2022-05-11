const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Lobby } = require('../models/index');
const { Op } = require('sequelize');

const LobbiesController = {};

LobbiesController.createLobby = (req, res) => {

    try {

        let ownerId = req.body.ownerId;
        let lobbyName = req.body.lobbyName;
        let privateGame = req.body.privateGame; 
        let active = req.body.active; 
        let playersSize = req.body.playersSize; 
        let turnSecondsTimer = req.body.turnSecondsTimer; 
        let gameMaxMinutesTimes = req.body.gameMaxMinutesTimes; 
       
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
                    ownerId: ownerId,
                    lobbyName: lobbyName,
                    privateGame: privateGame,
                    active: active,
                    playersSize: playersSize,
                    turnSecondsTimer: turnSecondsTimer,
                    gameMaxMinutesTimes: gameMaxMinutesTimes
                }).then(lobby => {
                    res.status(201).json({ msg: `${lobby.lobbyName} lobby has been created`, lobby: lobby });
                }).catch(err => res.status(400).json({ msg: "Lobby creation failed when connecting to database", error: { name: err.name, message: err.message, detail: error } }));

            } else {
                res.status(200).json({ msg: "Lobbyname already in use" });
            }
        });

    } catch (error) {
        res.status(422).json({ msg: "Lobby creation failed.", error: { name: error.name, message: error.message, detail: error } });
    }
}

// we're doing an update to lobby when it is full

LobbiesController.findLobbyById = (req, res) => {
    try {
        Lobby.findOne({ where: { id: req.body.id } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

LobbiesController.findLobbyByOwnerId = (req, res) => {
    try {
        Lobby.findOne({ where: { ownerId: req.body.id } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

LobbiesController.findActiveLobbies = (req, res) => {
    try {
        Lobby.findOne({ where: { inactive: false } })
            .then(data => {
                res.send(data);
            });
    } catch (err) {
        res.send(err)
    }
}

LobbiesController.findAvailableLobbies = (req, res) => {
    try {
        Lobby.findOne({ where: { full: false } })
            .then(data => {
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