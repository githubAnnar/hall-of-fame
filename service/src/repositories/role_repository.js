const Helpers = require("./../helpers/helpers.js");

class RoleRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from RoleRepository constructor`);
    }

    // Get all roles
    getAllRoles(res) {
        var sql = 'SELECT Id, Name, CreatedAt, UpdatedAt FROM Role';
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
            console.log(`${Helpers.getDateNowString()} getAllRoles returns ${rows.length} rows`);
        });
    }

    // Get race by Id
    getRoleById(res, id) {
        var sql = 'SELECT Id, Name, CreatedAt, UpdatedAt FROM Role WHERE Id = ?'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getRoleById returns Id ${row.Id}`);
        });
    }
}

module.exports = RoleRepository;