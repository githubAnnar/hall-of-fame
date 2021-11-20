const Helpers = require("./../helpers/helpers.js");

class ResultRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from ResultRepository constructor`);
    }

    // Get all results
    getAllResults(res) {
        var sql = 'SELECT Id, RaceId, PersonRevisionId, ClubId, Time FROM Result';
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
            console.log(`${Helpers.getDateNowString()} getAllResults returns ${rows.length} rows`);
        });
    }

    // Get result by Id
    getResultById(res, id) {
        var sql = 'SELECT Id, RaceId, PersonRevisionId, CLubId, Time FROM Result WHERE Id = ?'
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
            console.log(`${Helpers.getDateNowString()} getResultById returns Id ${row.Id}`);
        });
    }

    // Insert new result
    insertNewResult(res, raceId, personRevisionId, clubId, time) {
        var errors = [];

        if (!raceId) {
            errors.push("No Race is specified!");
        }

        if (!personRevisionId) {
            errors.push("No Person is specified!");
        }

        if (!clubId) {
            errors.push("No Club is specified!");
        }

        if (!time) {
            errors.push("No Time is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            RaceId: raceId,
            PersonRevisionId: personRevisionId,
            ClubId: clubId,
            Time: time
        };

        var params = [data.RaceId, data.PersonRevisionId, data.ClubId, data.Time];

        var sql = 'INSERT INTO Result (RaceId, PersonRevisionId, ClubId, Time) VALUES (?, ?, ?, ?)';
        this.db.serialize(() => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} INSERT ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });
            this.db.get("SELECT Id FROM Result WHERE Id = (SELECT seq FROM sqlite_sequence WHERE name = 'Result')", [], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} GET ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }

                console.log(`${Helpers.getDateNowString()} insertNewResult inserted row: ${JSON.stringify(row)}`);
                res.json({
                    "message": "success",
                    "data": row
                });
            });
        });
    }

    // Update Result
    updateResultById(res, id, raceId, personRevisionId, clubId, time) {
        var data = {
            Id: id,
            RaceId: raceId,
            PersonRevisionId: personRevisionId,
            ClubId: clubId,
            Time: time
        };

        var sql = 'UPDATE Result SET RaceId = COALESCE(?, RaceId), PersonRevisionId = COALESCE(?, PersonRevisionId), ClubId = COALESCE(?, ClubId), Time = COALESCE(?, Time) WHERE Id = ?'
        var params = [data.RaceId, data.PersonRevisionId, data.ClubId, data.Time, data.Id];
        this.db.run(sql, params, (err, result) => {
            if (err) {
                console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            });
            console.log(`${Helpers.getDateNowString()} updateResultById: Id: ${data.Id} => Update: ${JSON.stringify(data)}`);
        });
    }

    // Delete Result
    deleteResult(res, id) {
        var sql = 'DELETE FROM Result WHERE Id = ?';
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} deleteResultId: ${id}`);
        });
    }
}

module.exports = ResultRepository;