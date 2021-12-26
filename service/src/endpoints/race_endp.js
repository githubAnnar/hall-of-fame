const Helpers = require("../helpers/helpers.js");

// Database repositories
var RaceRepository = require('../repositories/race_repository.js');
var middleware = require("../middleware");

class RaceEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new RaceRepository(this.db);
        this.authJwt = new middleware.authJwt(db);
        console.log(`${Helpers.getDateNowString()} HELLO from RaceEndpoints constructor`);
    }

    endpoints() {
        console.log(`${Helpers.getDateNowString()} Starting enpoints for race`);
        const MODULE = "race";
        const ALL_RACES = "getallraces";
        const ONE_RACE = "getracebyid";
        const ADD_RACE = "addrace";
        const DELETE_RACE = "deleterace";
        const UPDATE_RACE = "updaterace";

        const verifyToken = (req, res, next) => { this.authJwt.verifyToken(req, res, next) };
        const isModerator = (req, res, next) => { this.authJwt.isModerator(req, res, next) };

        const getAllRaces = (req, res, next) => {
            this.repository.getAllRaces(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_RACES}. req:${JSON.stringify(req.params)}`);
        };
        const getRaceById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_RACE}. req:${JSON.stringify(req.params)}`);
            this.repository.getRaceById(res, req.params.id);
        }
        const insertNewRace = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_RACE}. req: ${JSON.stringify(req.body)}`);
            this.repository.insertNewRace(res, req.body.Year, req.body.Length);
        };
        const deleteRace = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: DELETE ${DELETE_RACE}. req: ${JSON.stringify(req.params)}`);
            this.repository.deleteRace(res, req.params.id);
        };
        const updateRaceById = (req, res, next) => {
            this.repository.updateRaceById(res, req.body.id, req.body.year, req.body.length);
            console.log(`${Helpers.getDateNowString()} request: UPDATE ${UPDATE_RACE}. req: ${JSON.stringify(req.body)}`);
        };

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_RACES}`, [verifyToken, getAllRaces]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_RACE}/:id`, [verifyToken, getRaceById]);

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_RACE}/`, [verifyToken, isModerator, insertNewRace]);

        this.app.delete(`/${this.rootPath}/${MODULE}/${DELETE_RACE}/:id`, [verifyToken, isModerator, deleteRace]);

        this.app.patch(`/${this.rootPath}/${MODULE}/${UPDATE_RACE}/`, [verifyToken, isModerator, updateRaceById]);
    }
}

module.exports = RaceEndpoints;