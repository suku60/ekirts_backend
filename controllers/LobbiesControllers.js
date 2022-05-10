const authConfig = require('../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Lobby } = require('../models/index');
const { Op } = require('sequelize');

const LobbiesController = {};

// LobbiesController.logLobby = (req, res) => {

//     let lobbyName = req.body.lobbyName;
//     let password = req.body.password;

//     // ACABARRRRRRRRRRRRRRRRRRRRRRRRRRRRR
//     Lobby.findOne({

//         where: { lobbyName: lobbyName }
//     }).then(lobby => {

//         if (!lobby) {

//             res.status(400).json({ msg: "Invalid data. Incorrect lobbyName or password." });
//         } else {

//             if (bcrypt.compareSync(password, lobby.password)) {

//                 let token = jwt.sign({ lobby: lobby }, authConfig.secret, {
//                     expiresIn: authConfig.expires
//                 });

//                 res.status(200).json({
//                     lobby: lobby,
//                     token: token
//                 })
//             } else {
//                 res.status(401).json({ msg: "Invalid lobby or password." });
//             }
//         };


//     }).catch(error => {
//         res.send(error);
//     })
// }

// LobbiesController.createLobby = (req, res) => {

//     try {

//         let email = req.body.email;
//         let lobbyName = req.body.lobbyName;
//         let birthdate = req.body.birthdate; 
//         if (!req.body.password) {
//             let error = new Error("Lobby must choose a password")
//             throw error;
//         }
//         let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

//         Lobby.findAll({
//             where: {

//                 [Op.or]: [
//                     {
//                         email: {
//                             [Op.like]: email
//                         }
//                     },
//                     {
//                         lobbyName: {
//                             [Op.like]: lobbyName
//                         }
//                     }
//                 ]

//             }

//         }).then(lobbysEqEmailLobbyname => {

//             if (lobbysEqEmailLobbyname == 0) {

//                 Lobby.create({
//                     email: email,
//                     lobbyName: lobbyName,
//                     birthdate: birthdate,
//                     password: password
//                 }).then(lobby => {
//                     res.status(201).json({ msg: `${lobby.lobbyName} has joined the game`, lobby: lobby });
//                 }).catch(err => res.status(400).json({ msg: "Lobby creation failed when connecting to database", error: { name: err.name, message: err.message, detail: error } }));

//             } else {
//                 res.status(200).json({ msg: "Lobbyname or email already in use" });
//             }
//         });

//     } catch (error) {
//         res.status(422).json({ msg: "Lobby creation failed.", error: { name: error.name, message: error.message, detail: error } });
//     }
// }

// LobbiesController.findLobbyById = (req, res) => {
//     try {
//         Lobby.findOne({ where: { id: req.body.id } })
//             .then(data => {
//                 res.send(data);
//             });
//     } catch (err) {
//         res.send(err)
//     }
// }

// LobbiesController.findLobbyByLobbyname = (req, res) => {
//     try {
//         Lobby.findOne({ where: { lobbyName: req.body.lobbyName } })
//             .then(data => {
//                 res.send(data);
//             });
//     } catch (err) {
//         res.send(err)
//     }
// }

// LobbiesController.updateLobbyById = async (req, res) => {

//     let data = req.body;
//     let id = req.params.pk;

//     try {
//         Lobby.update(data, {
//             where: { id: id }
//         }).then(updatedLobby => {
//             res.status(200).json({ msg: `Lobby id: ${id} has been updated`, lobby: updatedLobby });
//         }).catch(error => res.status(404).json({ msg: `There's been an error updating lobby id:${id}` , error: { name: error.name, message: error.message, detail: error } }));

//     } catch (error) {
//         res.status(422).json({ msg: "You're unauthorized to update this lobby's data", error: { name: error.name, message: error.message, detail: error } });
//     }
// }

// LobbiesController.deleteLobbyById = async (req, res) => {

//     let id = req.params.pk;

//     try {
//         Lobby.findOne({
//             where: { id: id },
//         }).then(lobby => {
//             if (lobby) {
//                 lobby.destroy({
//                     truncate: false
//                 })
//                 res.status(200).json({ msg: `Lobby id: ${id} has been deleted.` });
//             } else {
//                 res.status(404).json({ msg: `Lobby id: ${id} has not been deleted.` })
//             }
//         });
//     } catch (error) {
//         res.send(error);
//     }
// }


module.exports = LobbiesController;