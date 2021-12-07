const Helpers = require("../helpers/helpers.js");

// Database repositories
var RaceRepository = require('../repositories/race_repository.js');
class RaceEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new RaceRepository(this.db);
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

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_RACES}`, (req, res, next) => {
            this.repository.getAllRaces(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_RACES}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_RACE}/:id`, (req, res, next) => {
            this.repository.getRaceById(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_RACE}. req:${JSON.stringify(req.params)}`);
        });

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_RACE}/`, (req, res, next) => {
            this.repository.insertNewRace(res, req.body.Year, req.body.Length);
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_RACE}. req: ${JSON.stringify(req.body)}`);
        });

        this.app.delete(`/${this.rootPath}/${MODULE}/${DELETE_RACE}/:id`, (req, res, next) => {
            this.repository.deleteRace(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: DELETE ${DELETE_RACE}. req: ${JSON.stringify(req.params)}`);
        });

        this.app.patch(`/${this.rootPath}/${MODULE}/${UPDATE_RACE}/`, (req, res, next) => {
            this.repository.updateRaceById(res, req.body.id, req.body.year, req.body.length);
            console.log(`${Helpers.getDateNowString()} request: UPDATE ${UPDATE_RACE}. req: ${JSON.stringify(req.body)}`);
        });
    }
}

module.exports = RaceEndpoints;