const Helpers = require("../helpers/helpers.js");
const middleware = require("../middleware");
const AuthController = require("../controllers/auth.controller");

class AuthEndpoints {
    constructor(rootPath, app, db) {
        this.rootPath = rootPath;
        this.app = app;
        this.db = db;
        this.verifySignup = new middleware.verifySignUp(db);
        this.controller = new AuthController(db);
        console.log(`${Helpers.getDateNowString()} HELLO from AuthEndpoints constructor`);
    }

    endpoints() {
        console.log(`${Helpers.getDateNowString()} Starting enpoints for auth`);
        const MODULE = "auth";
        const SIGNUP = "signup";
        const SIGNIN = "signin";

        // this.app.post(`/${this.rootPath}/${MODULE}/${SIGNUP}/`, (req, res, next) => {
        //     console.log(`${Helpers.getDateNowString()} request: POST ${SIGNUP}. req: ${JSON.stringify(req.body)}`);
        //     this.verifySignup.checkDuplicateUsernameOrEmail(req, res, next).then(ok => {

        //         this.controller.signup(req, res);
        //         console.log(`${Helpers.getDateNowString()} response: POST ${SIGNUP} finished`);

        //     });
        // });

        this.app.post(`/${this.rootPath}/${MODULE}/${SIGNUP}/`, [
            this.verifySignup.checkDuplicateUsernameOrEmail,
            this.verifySignup.checkRolesExisted
        ], this.controller.signup);

        this.app.post(`/${this.rootPath}/${MODULE}/${SIGNIN}/`, (req, res) => {
            this.controller.signin(req, res);
            console.log(`${Helpers.getDateNowString()} request: POST ${SIGNIN}. req: ${JSON.stringify(req.body)}`);
        });
    }

}

module.exports = AuthEndpoints;