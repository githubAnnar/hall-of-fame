const Helpers = require("../helpers/helpers.js");

// Database repositories
var PersonRepository = require('../repositories/person_repository.js');

var middleware = require("../middleware");

class PersonEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new PersonRepository(this.db);
        this.authJwt = new middleware.authJwt(db);
        console.log(`${Helpers.getDateNowString()} HELLO from PersonEndpoints constructor`);
    }

    enpoints() {
        console.log(`${Helpers.getDateNowString()} Starting enpoints for club`);
        const MODULE = "person";
        const ALL_PERSONS = "getallpersons";
        const ALL_PERSON_REVISIONS = "getallpersonrevisions";
        const ONE_PERSON = "getpersonbyid";
        const PERSON_REVISIONS = "getpersonrevisionsbyid";
        const PERSON_REVISIONSBYRACE = "getpersonrevisionsbyraceid";
        const ADD_PERSON = "addperson";
        const ADD_PERSONR = "addpersonrevision";

        const verifyToken = (req, res, next) => { this.authJwt.verifyToken(req, res, next) };
        const isModerator = (req, res, next) => { this.authJwt.isModerator(req, res, next) };

        const getAllPersons = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_PERSONS}. req:${JSON.stringify(req.params)}`);
            this.repository.getAllPersons(res);
        };
        const getAllPersonRevisions = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_PERSON_REVISIONS}. req:${JSON.stringify(req.params)}`);
            this.repository.getAllPersonRevisions(res);
        };
        const getPersonById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_PERSON}. req:${JSON.stringify(req.params)}`);
            this.repository.getPersonById(res, req.params.id);
        };
        const getPersonRevisionsById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_REVISIONS}. req:${JSON.stringify(req.params)}`);
            this.repository.getPersonRevisionsById(res, req.params.id);
        };
        const getPersonRevisionsByRaceId = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_REVISIONSBYRACE}. req:${JSON.stringify(req.params)}`);
            this.repository.getPersonRevisionsByRaceId(res, req.params.id);
        }
        const insertNewPerson = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_PERSON}. req: ${JSON.stringify(req.body)}`);
            this.repository.insertNewPerson(res, req.body.Firstname, req.body.Lastname, req.body.Updated, req.body.Gender);
        };
        const insertPersonRevisionById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_PERSONR}. req: ${JSON.stringify(req.body)}`);
            this.repository.insertPersonRevisionById(res, req.body.PersonId, req.body.Firstname, req.body.Lastname, req.body.Updated, req.body.Gender);
        };

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_PERSONS}`, [verifyToken, getAllPersons]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_PERSON_REVISIONS}`, [verifyToken, getAllPersonRevisions]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_PERSON}/:id`, [verifyToken, getPersonById]);

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_REVISIONS}/:id`, [verifyToken, getPersonRevisionsById]);

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_REVISIONSBYRACE}/:id`, [verifyToken, getPersonRevisionsByRaceId]);

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_PERSON}/`, [verifyToken, isModerator, insertNewPerson]);

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_PERSONR}/`, [verifyToken, isModerator, insertPersonRevisionById]);
    };
}

module.exports = PersonEndpoints;