const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    Player
} = require('../models/index');
const {
    Op
} = require('sequelize');

const PlayersController = {};


PlayersController.createPlayer = async (req, res) => {
    let body = req.body;

    try {
        Player.findAll({
            where: {
                [Op.and]: [{
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

            if (player.length !== 0) {
                res.send('User has already joined this lobby')
            } else {
                Player.create({

                    playerColor: body.playerColor,
                    lobbyId: body.lobbyId,
                    userId: body.userId
                }).then(player => {
                    if (player) {
                        res.send(player)
                    } else {
                        res.status(500).json({
                            msg: `User wasn't able to join this lobby`
                        });
                    }
                }).catch((err) =>
                res.status(400).json({
                    error: err,
                })
            );
            }

        }).catch((err) =>
        res.status(400).json({
            error: err,
        })
    );
    } catch (err) {
        res.send(err)
    }


}

PlayersController.findPlayerById = async (req, res) => {
    try {
        Player.findByPk(req.params.pk).then(data => {
                res.send(data)
            }).catch((err) =>
            res.status(400).json({
                error: err,
            })
        );
    } catch (err) {
        res.send(err);
    }
}

PlayersController.findPlayerByLobbyId = async (req, res) => {
    lobbyId = req.params.lobbyId

    try {

        Player.findAll({
                where: {
                    lobbyId: lobbyId
                }
            }).then(player => {
                res.send(player);
            });
    } catch (err) {
        res.send("error finding players", err)
    }
}

PlayersController.findPlayerByUserId = async (req, res) => {
    userId = req.params.userId

    try {

        Player.findAll({
                where: {
                    userId: userId
                }
            }).then(player => {
                res.send(player);
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
            where: {
                id: id
            }
        }).then(updatedPlayer => {
            res.status(200).json({
                msg: `Player id: ${id} has been updated`,
                user: updatedPlayer
            });
        }).catch(error => res.status(404).json({
            msg: `There's been an error updating player id:${id}`,
            error: {
                name: error.name,
                message: error.message,
                detail: error
            }
        }));

    } catch (error) {
        res.status(422).json({
            msg: "You're unauthorized to update this player's data",
            error: {
                name: error.name,
                message: error.message,
                detail: error
            }
        });
    }
}

PlayersController.deletePlayerByUserIdAndLobbyId = async (req, res) => {

    console.log("deletiing player....", req.params.userId, req.params.lobbyId)

    let userId = req.params.userId;
    let lobbyId = req.params.lobbyId;

    try {
        Lobby.findOne({
            where: {
                [Op.and]: [
                    {
                        userId: {
                            [Op.like]: userId
                        }
                    },
                    {
                        lobbyId: {
                            [Op.like]: lobbyId
                        }
                    }
                ]
            }
        }).then((player) => {
            console.log("found user?", player)
            if (player) {
                player.destroy({
                    truncate: false
                })
                res.status(200).json({
                    msg: `Player id: ${id} has been deleted.`
                });
            } else {
                res.status(404).json({
                    msg: `Player id: ${id} has not been deleted.`
                })
            }
        }).catch((err) =>
        res.status(400).json({
            error: err,
        })
        )
    } catch (error) {
        res.send(error);
    }
}

PlayersController.deletePlayerById = async (req, res) => {
   let id = req.params.pk;
   console.log("id=?", id)

   try {
       Player.findOne({
           where: { id: id }
       }).then(player => {
           if(!player){
               res.status(404).json({
                   msg: "Player doesn't exist."
               })
           }else{
               player.destroy({
                   truncate: false
               });
               res.status(200).json({
                msg: "Player has been deleted."
            })
           }
       });
   }catch (error) {
       res.send(error);
   }
}


module.exports = PlayersController;