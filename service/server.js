// Imports
var express = require("express");
var cors = require("cors");
var Helpers = require('./src/helpers/helpers.js');

var ClubEndpoints = require('./src/endpoints/club_endp.js');
var PersonEndpoints = require('./src/endpoints/person_endp.js');
var RaceEndpoints = require('./src/endpoints/race_endp.js');
var ResultEndpoints = require('./src/endpoints/result_endp.js');

console.log(`${Helpers.getDateNowString()} Count of args: ${process.argv.length}`);

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
const AuthEndpoints = require("./src/endpoints/auth_endp.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
// });

const clubEndpoints = new ClubEndpoints("api", app, db);
const personEndpoints = new PersonEndpoints("api", app, db);
const raceEndpoints = new RaceEndpoints("api", app, db);
const resultEndpoints = new ResultEndpoints("api", app, db);
const authEndpoints = new AuthEndpoints("api", app, db);

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log(`${Helpers.getDateNowString()} Server running on port ${HTTP_PORT}`);
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
    console.log(`${Helpers.getDateNowString()} request on root`);
});

clubEndpoints.endpoints();
personEndpoints.enpoints();
raceEndpoints.endpoints();
resultEndpoints.endpoints();
authEndpoints.endpoints();