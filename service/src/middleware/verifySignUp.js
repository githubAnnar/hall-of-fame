const Helpers = require("../helpers/helpers.js");

// Database repositories
var RoleRepository = require("../repositories/role_repository");
var UserRepository = require("../repositories/user_repository");

class VerifySignUpMW {
    constructor(db) {
        this.db = db;
        this.roleRepository = new RoleRepository(this.db);
        this.userRepository = new UserRepository(this.db);
        console.log(`${Helpers.getDateNowString()} HELLO from VerifySignUpMW constructor`);
    }

    checkDuplicateUsernameOrEmail = (req, res, next) => {
        // Username
        this.userRepository.findByUsername(req.body.username)
            .then(user => {
                if (user) {
                    res.status(400).send({
                        message: "Failed! Username is already in use!"
                    });
                    return;
                }

                // Email
                this.userRepository.getUserByEmail(res, req.body.email)
                    .then(user => {
                        if (user) {
                            res.status(400).send({
                                message: "Failed! Email is already in use!"
                            });
                            return;
                        }

                        next();
                    });
            });
    };

    checkRolesExisted = (req, res, next) => {
        if (req.body.roles) {
            const allRoleNames = this.roleRepository.findAll().map(r => r.name);
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!allRoleNames.includes(req.body.roles[i])) {
                    res.status(400).send({
                        message: `Failed! Role does not exist = ${req.body.roles[i]}`
                    });
                    return;
                }
            }
        }

        next();
    };
}

module.exports = VerifySignUpMW;