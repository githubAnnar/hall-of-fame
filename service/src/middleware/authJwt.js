const Helpers = require("../helpers/helpers.js");

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const UserRepository = require("../repositories/user_repository");
const RoleRepository = require("../repositories/role_repository");
const UserRoleRepository = require("../repositories/userrole_repository");

class AuthJwtMW {
    constructor(db) {
        this.db = db;
        this.userRepository = new UserRepository(db);
        this.roleRepository = new RoleRepository(db);
        this.userRoleRepository = new UserRoleRepository(db);
        console.log(`${Helpers.getDateNowString()} HELLO from AuthJwtMW constructor`);
    }

    verifyToken = (req, res, next) => {
        let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.userId = decoded.id;
            next();
        });
    };

    isAdmin = (req, res, next) => {
        this.userRepository.findById(req.userId).then(user => {
            this.userRoleRepository.findByUserId(user.id).then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Require Admin Role!"
                });
                return;
            });
        });
    };

    isModerator = (req, res, next) => {
        this.userRepository.findById(req.userId).then(user => {
            this.userRoleRepository.findByUserId(user.id).then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Require Moderator Role!"
                });
            });
        });
    };

    isModeratorOrAdmin = (req, res, next) => {
        this.userRepository.findById(req.userId).then(user => {
            this.userRoleRepository.findByUserId(user.id).then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }

                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Require Moderator or Admin Role!"
                });
            });
        });
    };
}

module.exports = AuthJwtMW;