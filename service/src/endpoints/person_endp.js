const Helpers = require("../helpers/helpers.js");

// Database repositories
var PersonRepository = require('../repositories/person_repository.js');

class PersonEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new PersonRepository(this.db);
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

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_PERSONS}`, (req, res, next) => {
            this.repository.getAllPersons(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_PERSONS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_PERSON_REVISIONS}`, (req, res, next) => {
            this.repository.getAllPersonRevisions(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_PERSON_REVISIONS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_PERSON}/:id`, (req, res, next) => {
            this.repository.getPersonById(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_PERSON}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_REVISIONS}/:id`, (req, res, next) => {
            this.repository.getPersonRevisionsById(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_REVISIONS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${PERSON_REVISIONSBYRACE}/:id`, (req, res, next) => {
            this.repository.getPersonRevisionsByRaceId(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${PERSON_REVISIONSBYRACE}. req:${JSON.stringify(req.params)}`);
        });

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_PERSON}/`, (req, res, next) => {
            this.repository.insertNewPerson(res, req.body.Firstname, req.body.Lastname, req.body.Updated, req.body.Gender);
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_PERSON}. req: ${JSON.stringify(req.body)}`);
        });

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_PERSONR}/`, (req, res, next) => {
            this.repository.insertPersonRevisionById(res, req.body.PersonId, req.body.Firstname, req.body.Lastname, req.body.Updated, req.body.Gender);
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_PERSONR}. req: ${JSON.stringify(req.body)}`);
        });
    };
}

module.exports = PersonEndpoints;