const express = require("express");
const app = express();
const cors = require('cors');
const db = require('./db.js');
// const PORT = process.env.PORT || 8888
const router = require('./router');

// Creating cors options

let corsConfig = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(express.json());
app.use(cors(corsConfig));
app.use(router);

db.then(() => {
        app.listen(process.env.PORT || 5000, () => 
        console.log(`Server on port ${PORT}`));
    })
    .catch((err) => console.log(err.message));