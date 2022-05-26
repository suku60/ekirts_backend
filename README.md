<div align=center>

## Ekirts videogame backend.

---

<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">

---

This project is a complete backend for my first webgame. Here you'll find the basic CRUD for every endpoint, aswell as it's characteristics. 
This is a Rest API with a mySql database and we're using libreries such as sequelize and express to create our server. 

---

#### How to run 

clone this repository. Open a console and type

```git clone https://github.com/suku60/ekirts_backend```

or download the files. 

then, type 
```npm init```

this will install all needed dependencies. 

```npm run dev```
server will be running as default in port 8888.

</div>

---

#### Endpoints 


##### Users

- Login 
  
```router.post('/login', UsersController.logUser);```


- Create users:

```router.post('/create', UsersController.createUser);```

- Read users:
  
```router.get('/find/:pk', auth, UsersController.findUserById);```

```router.get('/find', auth, UsersController.findUserByUsername);```


- Update users:
  
```router.put('/update/:pk', auth, UsersController.updateUserById);```

```router.put('/update/status/:username', auth, adminAccess, UsersController.updateUserStatus);```

- Delete users:
```router.delete('/delete/:pk', auth, adminAccess, UsersController.deleteUserById);```


##### Lobbies

- Create lobbies:

```router.post('/create', auth, LobbiesController.createLobby);```


- Read lobbies:

```router.get('/find/:pk', auth, LobbiesController.findLobbyById);```

```router.get('/find/owner/:pk', auth, LobbiesController.findLobbyByOwnerId);```

```router.get('/findActive', auth, LobbiesController.findActiveLobbies);```

```router.get('/findAvailable', auth, LobbiesController.findAvailableLobbies);```

- Update lobbies:
  
```router.put('/update/:pk', auth, LobbiesController.updateLobbyById);```


- Delete lobbies:
```router.delete('/delete/:pk', auth, adminAccess, LobbiesController.deleteLobbyById);```


##### Players

- Create players:

```router.post('/create', PlayersController.createPlayer);```


- Read players:

```router.get('/find/:pk', PlayersController.findPlayerById);```

```router.get('/find/lobby/:lobbyId', PlayersController.findPlayerByLobbyId);```

```router.get('/find/user/:userId', PlayersController.findPlayerByUserId);```

- Update players:
  
```router.put('/update/:pk', PlayersController.updatePlayerById);```


- Delete players:
```router.delete('/delete/:pk', PlayersController.deletePlayerById);```





