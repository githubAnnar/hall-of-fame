const Helpers = require("../helpers/helpers.js");

// Database repositories
var ResultRepository = require('../repositories/result_repository.js');
class ResultEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new ResultRepository(this.db);
        console.log(`${Helpers.getDateNowString()} HELLO from ResultEndpoints constructor`);
    }

    endpoints() {
        console.log(`${Helpers.getDateNowString()} Starting enpoints for result`);
        const MODULE = "result";
        const ALL_RESULTS = "getallresults";
        const ALL_RESULTS_EX = "getallresultsex";
        const ONE_RESULT = "getresultbyid";
        const ONE_RESULT_EX = "getresultbyidex";
        const PERSON_RESULTS = "getresultsbypersonid";
        const PERSON_RESULTS_EX = "getresultsbypersonidex";
        const RACE_RESULTS = "getresultsbyraceid";
        const RACE_RESULTS_EX = "getresultsbyraceidex";
        const CLUB_RESULTS = "getresultsbyclubid";
        const CLUB_RESULTS_EX = "getresultsbyclubidex";
        const ADD_RESULT = "addresult";
        const DELETE_RESULT = "deleteresult";
        const UPDATE_RESULT = "updateresult";

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_RESULTS}`, (req, res, next) => {
            this.repository.getAllResults(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_RESULTS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_RESULTS_EX}`, (req, res, next) => {
            this.repository.getAllResultsEx(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_RESULT}/:id`, (req, res, next) => {
            this.repository.getResultById(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_RESULT}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_RESULT_EX}/:id`, (req, res, next) => {
            this.repository.getResultByIdEx(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_RESULT_EX}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_RESULTS}/:id`, (req, res, next) => {
            this.repository.getResultsByPersonId(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_RESULTS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_RESULTS_EX}/:id`, (req, res, next) => {
            this.repository.getResultsByPersonIdEx(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${RACE_RESULTS}/:id`, (req, res, next) => {
            this.repository.getResultsByRaceId(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${RACE_RESULTS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${RACE_RESULTS_EX}/:id`, (req, res, next) => {
            this.repository.getResultsByRaceIdEx(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${RACE_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${CLUB_RESULTS}/:id`, (req, res, next) => {
            this.repository.getResultsByClubId(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${CLUB_RESULTS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${CLUB_RESULTS_EX}/:id`, (req, res, next) => {
            this.repository.getResultsByClubIdEx(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${CLUB_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
        });

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_RESULT}/`, (req, res, next) => {
            this.repository.insertNewResult(res, req.body.raceId, req.body.personRevisionId, req.body.clubId, req.body.time);
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_RESULT}. req: ${JSON.stringify(req.body)}`);
        });

        this.app.delete(`/${this.rootPath}/${MODULE}/${DELETE_RESULT}/:id`, (req, res, next) => {
            this.repository.deleteResult(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: DELETE ${DELETE_RESULT}. req: ${JSON.stringify(req.params)}`);
        });

        this.app.patch(`/${this.rootPath}/${MODULE}/${UPDATE_RESULT}/`, (req, res, next) => {
            this.repository.updateResultById(res, req.body.id, req.body.raceId, req.body.personRevisionId, req.body.clubId, req.body.time);
            console.log(`${Helpers.getDateNowString()} request: UPDATE ${UPDATE_RESULT}. req: ${JSON.stringify(req.body)}`);
        });
    }
}

module.exports = ResultEndpoints;