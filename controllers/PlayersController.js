const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Player } = require('../models/index');
const { Op } = require('sequelize');

const PlayersController = {};


PlayersController.createPlayer = (req, res) => {

    try {

        let playerColor = req.body.playerColor;
        // userId&lobby will be here with params
        let userId = req.body.userId;
        let lobbyId = req.body.lobbyId; 
        let username = req.body.username;
       
        Player.create({
            playerColor: playerColor,
            userId: userId,
            lobbyId: lobbyId
        }).then(player => {
            res.status(201).json({ msg: `${username} has joined ${lobbyName}`, player: player });
        }).catch(err => res.status(400).json({ msg: "Error joining when connecting to database", error: { name: err.name, message: err.message, detail: error } }));


    } catch (error) {
        res.status(422).json({ msg: "Unable to join game.", error: { name: error.name, message: error.message, detail: error } });
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

PlayersController.findPlayerByLobbyId = (req, res) => {
    try {
        Player.findOne({ where: { lobbyId: req.body.lobbyId } })
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
        }).catch(error => res.status(404).json({ msg: `There's been an error updating player id:${id}` , error: { name: error.name, message: error.message, detail: error } }));

    } catch (error) {
        res.status(422).json({ msg: "You're unauthorized to update this player's data", error: { name: error.name, message: error.message, detail: error } });
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