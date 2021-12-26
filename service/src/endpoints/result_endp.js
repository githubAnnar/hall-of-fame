const Helpers = require("../helpers/helpers.js");

// Database repositories
var ResultRepository = require('../repositories/result_repository.js');
var middleware = require("../middleware");

class ResultEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new ResultRepository(this.db);
        this.authJwt = new middleware.authJwt(db);
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

        const verifyToken = (req, res, next) => { this.authJwt.verifyToken(req, res, next) };
        const isModerator = (req, res, next) => { this.authJwt.isModerator(req, res, next) };

        const getAllResults = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_RESULTS}. req:${JSON.stringify(req.params)}`);
            this.repository.getAllResults(res);
        };
        const getAllResultsEx = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
            this.repository.getAllResultsEx(res);
        }
        const getResultById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_RESULT}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultById(res, req.params.id);
        };
        const getResultByIdEx = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_RESULT_EX}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultByIdEx(res, req.params.id);
        };
        const getResultsByPersonId = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_RESULTS}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultsByPersonId(res, req.params.id);
        };
        const getResultsByPersonIdEx = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultsByPersonIdEx(res, req.params.id);
        };
        const getResultsByRaceId = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${RACE_RESULTS}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultsByRaceId(res, req.params.id);
        };
        const getResultsByRaceIdEx = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${RACE_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultsByRaceIdEx(res, req.params.id);
        };
        const getResultsByClubId = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${CLUB_RESULTS}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultsByClubId(res, req.params.id);
        }
        const getResultsByClubIdEx = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${CLUB_RESULTS_EX}. req:${JSON.stringify(req.params)}`);
            this.repository.getResultsByClubIdEx(res, req.params.id);
        }
        const insertNewResult = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_RESULT}. req: ${JSON.stringify(req.body)}`);
            this.repository.insertNewResult(res, req.body.raceId, req.body.personRevisionId, req.body.clubId, req.body.time);
        };
        const deleteResult = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: DELETE ${DELETE_RESULT}. req: ${JSON.stringify(req.params)}`);
            this.repository.deleteResult(res, req.params.id);
        }
        const updateResultById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: UPDATE ${UPDATE_RESULT}. req: ${JSON.stringify(req.body)}`);
            this.repository.updateResultById(res, req.body.id, req.body.raceId, req.body.personRevisionId, req.body.clubId, req.body.time);
        }

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_RESULTS}`, [verifyToken, getAllResults]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_RESULTS_EX}`, [verifyToken, getAllResultsEx]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_RESULT}/:id`, [verifyToken, getResultById]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_RESULT_EX}/:id`, [verifyToken, getResultByIdEx]);

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_RESULTS}/:id`, [verifyToken, getResultsByPersonId]);

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_RESULTS_EX}/:id`, [verifyToken, getResultsByPersonIdEx]);

        this.app.get(`/${this.rootPath}/${MODULE}/${RACE_RESULTS}/:id`, [verifyToken, getResultsByRaceId]);

        this.app.get(`/${this.rootPath}/${MODULE}/${RACE_RESULTS_EX}/:id`, [verifyToken, getResultsByRaceIdEx]);

        this.app.get(`/${this.rootPath}/${MODULE}/${CLUB_RESULTS}/:id`, [verifyToken, getResultsByClubId]);

        this.app.get(`/${this.rootPath}/${MODULE}/${CLUB_RESULTS_EX}/:id`, [verifyToken, getResultsByClubIdEx]);

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_RESULT}/`, [verifyToken, isModerator, insertNewResult]);

        this.app.delete(`/${this.rootPath}/${MODULE}/${DELETE_RESULT}/:id`, [verifyToken, isModerator, deleteResult]);

        this.app.patch(`/${this.rootPath}/${MODULE}/${UPDATE_RESULT}/`, [verifyToken, isModerator, updateResultById]);
    }
}

module.exports = ResultEndpoints;