const Helpers = require("./../helpers/helpers.js");

class UserRoleRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from UserRoleRepository constructor`);
    }

    // Get all UserRoles
    findAll() {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole';
        var params = [];
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                return console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
            }

            console.log(`${Helpers.getDateNowString()} findAll returns ${rows.length} rows`);
            return rows;
        });
    }

    getAllUserRoles(res) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole';
        var params = [];
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
            console.log(`${Helpers.getDateNowString()} getAllUserRoles returns ${rows.length} rows`);
        });
    }

    // Get UserRole by RoleId    
    findByRoleId(roleId) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole WHERE RoleId = ?';
        var params = [roleId];
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                return console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
            }

            console.log(`${Helpers.getDateNowString()} findByRoleId returns ${rows.length} rows`);
            return rows;
        });
    }

    getUserRoleByRoleId(res, roleId) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole WHERE RoleId = ?';
        var params = [roleId];
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
            console.log(`${Helpers.getDateNowString()} getUserRoleByRoleId returns ${rows.length} rows`);
        });
    }

    // Get UserRole by UserId
    async findByUserId(userId) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole WHERE UserId = ?';
        var params = [userId];
        await this.db.all(sql, params, (err, rows) => {
            if (err) {
                return console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
            }

            console.log(`${Helpers.getDateNowString()} findByUserId returns ${rows.length} rows`);
            return rows;
        });
    }

    getUserRoleByUserId(res, userId) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole WHERE UserId = ?';
        var params = [userId];
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
            console.log(`${Helpers.getDateNowString()} getUserRoleByUserId returns ${rows.length} rows`);
        });
    }

    // Get UserRole by RoleId & UserId
    findByRoleIdAndUserId(roleId, userId) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole WHERE RoleId = ? AND UserId = ?';
        var params = [roleId, userId];
        this.db.get(sql, params, (err, row) => {
            if (err) {
                return console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
            }

            console.log(`${Helpers.getDateNowString()} findByRoleIdAndUserId returns Id ${row.RoleId}-${row.UserId}`);
            return row;
        });
    }

    getUserRoleByRoleIdAndUserId(res, roleId, userId) {
        var sql = 'SELECT RoleId, UserId, CreatedAt, UpdatedAt FROM UserRole WHERE RoleId = ? AND UserId = ?';
        var params = [roleId, userId];
        this.db.get(sql, params, (err, row) => {
            if (err) {
                console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            });
            console.log(`${Helpers.getDateNowString()} getUserRoleByRoleIdAndUserId returns Id ${row.RoleId}-${row.UserId}`);
        });
    }

    // Insert new userrole
    insertNewUserRole(res, roleId, userId) {
        var errors = [];

        if (!roleId) {
            errors.push("No Role is specified!");
        }

        if (!userId) {
            errors.push("No User is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            RoleId: roleId,
            UserId: userId,
            CreatedAt: new Date().getUTCDate()
        };

        var params = [data.RoleId, data.UserId, data.CreatedAt, data.CreatedAt];

        var sql = 'INSERT INTO UserRole (RoleId, UserId, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?)';
        this.db.serialize(() => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} INSERT ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });
            this.db.get("SELECT RoleId, UserId, CreatedAt, UpdatedTa FROM UserRole WHERE RoleId = ? AND UserId = ?", [data.RoleId, data.UserId], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} GET ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }

                console.log(`${Helpers.getDateNowString()} insertNewUserRole inserted row: ${JSON.stringify(row)}`);
                res.json({
                    "message": "success",
                    "data": row
                });
            });
        });
    }

    // Delete UserRole
    deleteUserRole(res, roleId, userId) {
        var sql = 'DELETE FROM UserRole WHERE RoleId = ? AND UserId = ?';
        var params = [roleId, userId];
        this.db.run(sql, params, (err, result) => {
            if (err) {
                console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                "message": "deleted",
                "id": id
            });
            console.log(`${Helpers.getDateNowString()} deleteUserRole: ${roleId}-${userId}`);
        });
    }
}

module.exports = UserRoleRepository;