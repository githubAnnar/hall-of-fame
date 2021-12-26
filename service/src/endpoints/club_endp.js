const Helpers = require("../helpers/helpers.js");

// Database repositories
var ClubRepository = require("../repositories/club_repository.js");

var middleware = require("../middleware");

class ClubEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new ClubRepository(this.db);
        this.authJwt = new middleware.authJwt(db);
        console.log(`${Helpers.getDateNowString()} HELLO from ClubEndpoints constructor`);
    }

    endpoints() {
        console.log(`${Helpers.getDateNowString()} Starting enpoints for club`);
        const MODULE = "club";
        const ALL_CLUBS = "getallclubs";
        const ALL_CLUB_REVISIONS = "getallclubrevisions";
        const ONE_CLUB = "getclubbyid";
        const CLUB_REVISIONS = "getclubrevisionsbyid";
        const ADD_CLUB = "addclub";
        const ADD_CLUBR = "addclubrevision";

        const verifyToken = (req, res, next) => { this.authJwt.verifyToken(req, res, next) };
        const isModerator = (req, res, next) => { this.authJwt.isModerator(req, res, next) };

        const getAllClubs = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_CLUBS}. req:${JSON.stringify(req.params)}`);
            this.repository.getAllClubs(res);
        }
        const getAllClubRevisions = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_CLUB_REVISIONS}. req:${JSON.stringify(req.params)}`);
            this.repository.getAllClubRevisions(res);
        };
        const getClubById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_CLUB}. req:${JSON.stringify(req.params)}`);
            this.repository.getClubById(res, req.params.id);
        };
        const getClubRevisionsById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: GET ${CLUB_REVISIONS}. req:${JSON.stringify(req.params)}`);
            this.repository.getClubRevisionsById(res, req.params.id);
        };
        const insertNewClub = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_CLUB}. req: ${JSON.stringify(req.body)}`);
            this.repository.insertNewClub(res, req.body.Name, req.body.Updated);
        };
        const insertClubRevisionById = (req, res, next) => {
            console.log(`${Helpers.getDateNowString()} request: POST ${ADD_CLUBR}. req: ${JSON.stringify(req.body)}`);
            this.repository.insertClubRevisionById(res, req.body.ClubId, req.body.Name, req.body.Updated);
        };

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_CLUBS}`, [verifyToken, getAllClubs]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_CLUB_REVISIONS}`, [verifyToken, getAllClubRevisions]);

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_CLUB}/:id`, [verifyToken, getClubById]);

        this.app.get(`/${this.rootPath}/${MODULE}/${CLUB_REVISIONS}/:id`, [verifyToken, getClubRevisionsById]);

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_CLUB}/`, [verifyToken, isModerator, insertNewClub]);

        this.app.post(`/${this.rootPath}/${MODULE}/${ADD_CLUBR}/`, [verifyToken, isModerator, insertClubRevisionById]);
    }
}

module.exports = ClubEndpoints;