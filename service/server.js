// Imports
var express = require("express");
var cors = require("cors");
var Helpers = require("./src/helpers/helpers.js");

//import { getDateNowString } from './src/helpers/helpers.js';

console.log(`Count of args: ${process.argv.length}`);

if (process.argv.length === 3) {
    if (process.argv[2] === 'dev') {

    }

    else if (process.argv[2] === 'prod') {

    }
}

else {
    console.log("Wrong Args!");
    return;
}

// Create express app
var app = express();
var db = require("./src/controllers/database.js");
const { exit } = require("process");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const helpers = new Helpers();

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
    console.log(`${getDateNowString()} request on root`);
});