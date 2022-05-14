const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Player } = require('../models/index');
const { Op } = require('sequelize');

const PlayersController = {};


PlayersController.createPlayer = (req, res) => {
    let body = req.body;

    try {
        Player.findAll({
            where: {
                [Op.and]: [
                    {
                        lobbyId: {
                            [Op.like]: body.lobbyId
                        }
                    },
                    {
                        userId: {
                            [Op.like]: body.userId
                        }
                    }
                ]
            }
        }).then(player => {

            console.log("this is the data", typeof(player), player, player.length)

            if(player.length !== 0 ){
                res.send('User has already joined this lobby')
            }else{
                console.log("we're creating...", body.playerColor, "lobbyId:",body.lobbyId, "userid:",body.userId)
                Player.create({
                    
                    playerColor: body.playerColor,
                    lobbyId: body.lobbyId,
                    userId: body.userId
                }).then(player => {
                    if (player) {
                        res.send(player)
                    } else {
                        res.status(500).json({ msg: `User wasn't able to join this lobby` });
                    }
                })
            }
                
            });
    } catch (err) {
        res.send(err)
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