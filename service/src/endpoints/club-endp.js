const Helpers = require("./../helpers/helpers.js");

// Database repositories
var ClubRepository = require("./../repositories/club_repository.js");

class ClubEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.repository = new ClubRepository(this.db);
        console.log(`${Helpers.getDateNowString()} HELLO from ClubEndpoints constructor`);
    }

    endpoints() {
        console.log(`${Helpers.getDateNowString()} Starting enpoints for club`);
        const MODULE = "club";
        const ALL_CLUBS = "getallclubs";
        const ONE_CLUB = "getclubbyid";
        const CLUB_REVISIONS = "getclubrevisionsbyid";

        this.app.get(`/${this.rootPath}/${MODULE}/${ALL_CLUBS}`, (req, res, next) => {
            this.repository.getAllClubs(res);
            console.log(`${Helpers.getDateNowString()} request: GET ${ALL_CLUBS}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${ONE_CLUB}/:id`, (req, res, next) => {
            this.repository.getClubById(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${ONE_CLUB}. req:${JSON.stringify(req.params)}`);
        });

        this.app.get(`/${this.rootPath}/${MODULE}/${CLUB_REVISIONS}/:id`, (req, res, next) => {
            this.repository.getClubRevisionsById(res, req.params.id);
            console.log(`${Helpers.getDateNowString()} request: GET ${CLUB_REVISIONS}. req:${JSON.stringify(req.params)}`);
        });
    }
}

module.exports = ClubEndpoints;