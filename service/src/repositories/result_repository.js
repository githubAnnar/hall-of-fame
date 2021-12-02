const Helpers = require("./../helpers/helpers.js");

class ResultRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from ResultRepository constructor`);
    }

    // Get all results, returns IResult
    getAllResults(res) {
        var sql = 'SELECT Id, RaceId, PersonRevisionId, ClubRevisionId, Time FROM Result';
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

    // Returns IResultEx
    getAllResultsEx(res) {
        var sql = 'SELECT RE.Id AS ResultId, RE.Time, RA.Id AS RaceId, RA.Year AS RaceYear, RA.Length AS RaceLength, PR.Id AS PersonRevisioinId, PR.PersonId, PR.Firstname, PR.Lastname, PR.Updated AS PersonUpdated, PR.Sex, CR.Id AS ClubRevisionId, CR.ClubId, CR.Name AS ClubName, CR.Updated AS ClubUpdated FROM Result RE LEFT JOIN Race RA ON RE.RaceId = RA.Id INNER JOIN PersonRevision PR ON RE.PersonRevisionId = PR.Id INNER JOIN ClubRevision CR ON RE.ClubRevisionId = CR.Id ORDER BY RE.Time ASC';
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
            console.log(`${Helpers.getDateNowString()} getAllResultsEx returns ${rows.length} rows`);
        });
    }

    // Get result by Id, returns IResult
    getResultById(res, id) {
        var sql = 'SELECT Id, RaceId, PersonRevisionId, CLubRevisionId, Time FROM Result WHERE Id = ?'
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
            console.log(`${Helpers.getDateNowString()} getResultById returns ${row.Id}`);
        });
    }

    // Get result by Id, returns IResultEx
    getResultByIdEx(res, id) {
        var sql = 'SELECT RE.Id AS ResultId, RE.Time, RA.Id AS RaceId, RA.Year AS RaceYear, RA.Length AS RaceLength, PR.Id AS PersonRevisioinId, PR.PersonId, PR.Firstname, PR.Lastname, PR.Updated AS PersonUpdated, PR.Sex, CR.Id AS ClubRevisionId, CR.ClubId, CR.Name AS ClubName, CR.Updated AS ClubUpdated FROM Result RE LEFT JOIN Race RA ON RE.RaceId = RA.Id INNER JOIN PersonRevision PR ON RE.PersonRevisionId = PR.Id INNER JOIN ClubRevision CR ON RE.ClubRevisionId = CR.Id WHERE RE.Id = ?'
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
            console.log(`${Helpers.getDateNowString()} getResultByIdEx returns ${row.Id}`);
        });
    }

    // Get all results by person id, returns IResult
    getResultsByPersonId(res, id) {
        var sql = 'SELECT R.Id, R.RaceId, R.PersonRevisionId, R.ClubRevisionId, R.Time FROM Result R INNER JOIN PersonRevision PR ON PR.Id = R.PersonRevisionId INNER JOIN Person P ON P.Id = PR.PersonId WHERE P.Id = ? ORDER BY R.Time'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getResultsByPersonId returns ${rows.length} rows`);
        });
    }

    // Get all results by person id, returns IResultEx
    getResultsByPersonIdEx(res, id) {
        var sql = 'SELECT RE.Id AS ResultId, RE.Time, RA.Id AS RaceId, RA.Year AS RaceYear, RA.Length AS RaceLength, PR.Id AS PersonRevisioinId, PR.PersonId, PR.Firstname, PR.Lastname, PR.Updated AS PersonUpdated, PR.Sex, CR.Id AS ClubRevisionId, CR.ClubId, CR.Name AS ClubName, CR.Updated AS ClubUpdated FROM Result RE LEFT JOIN Race RA ON RE.RaceId = RA.Id INNER JOIN PersonRevision PR ON RE.PersonRevisionId = PR.Id INNER JOIN ClubRevision CR ON RE.ClubRevisionId = CR.Id WHERE PR.PersonId = ? ORDER BY RE.Time'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getResultsByPersonIdEx returns ${rows.length} rows`);
        });
    }

    // Get all results by Race id, returns IResult
    getResultsByRaceId(res, id) {
        var sql = 'SELECT R.Id, R.RaceId, R.PersonRevisionId, R.ClubRevisionId, R.Time FROM Result R INNER JOIN Race RA ON RA.Id = R.RaceId WHERE RA.Id = ? ORDER BY R.Time'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getResultsByRaceId returns ${rows.length} rows`);
        });
    }

    // Get all results by Race id, returns IResultEx
    getResultsByRaceIdEx(res, id) {
        var sql = 'SELECT RE.Id AS ResultId, RE.Time, RA.Id AS RaceId, RA.Year AS RaceYear, RA.Length AS RaceLength, PR.Id AS PersonRevisioinId, PR.PersonId, PR.Firstname, PR.Lastname, PR.Updated AS PersonUpdated, PR.Sex, CR.Id AS ClubRevisionId, CR.ClubId, CR.Name AS ClubName, CR.Updated AS ClubUpdated FROM Result RE LEFT JOIN Race RA ON RE.RaceId = RA.Id INNER JOIN PersonRevision PR ON RE.PersonRevisionId = PR.Id INNER JOIN ClubRevision CR ON RE.ClubRevisionId = CR.Id WHERE RE.RaceId = ? ORDER BY RE.Time'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getResultsByRaceIdEx returns ${rows.length} rows`);
        });
    }

    // Get all results by Club id, returns IRace
    getResultsByClubId(res, id) {
        var sql = 'SELECT R.Id, R.RaceId, R.PersonRevisionId, R.ClubRevisionId, R.Time FROM Result R INNER JOIN ClubRevision CR ON CR.Id = R.ClubRevisionId INNER JOIN Club C ON C. Id = CR.ClubId WHERE C.Id = ? ORDER BY R.Time'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getResultsByClubId returns ${rows.length} rows`);
        });
    }

    // Get all results by Club id, returns IRaceEx
    getResultsByClubIdEx(res, id) {
        var sql = 'SELECT RE.Id AS ResultId, RE.Time, RA.Id AS RaceId, RA.Year AS RaceYear, RA.Length AS RaceLength, PR.Id AS PersonRevisioinId, PR.PersonId, PR.Firstname, PR.Lastname, PR.Updated AS PersonUpdated, PR.Sex, CR.Id AS ClubRevisionId, CR.ClubId, CR.Name AS ClubName, CR.Updated AS ClubUpdated FROM Result RE LEFT JOIN Race RA ON RE.RaceId = RA.Id INNER JOIN PersonRevision PR ON RE.PersonRevisionId = PR.Id INNER JOIN ClubRevision CR ON RE.ClubRevisionId = CR.Id WHERE CR.ClubId = ? ORDER BY RE.Time'
        var params = [id];
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
            console.log(`${Helpers.getDateNowString()} getResultsByClubIdEx returns ${rows.length} rows`);
        });
    }

    // Insert new result
    insertNewResult(res, raceId, personRevisionId, clubRevisionId, time) {
        var errors = [];

        if (!raceId) {
            errors.push("No Race is specified!");
        }

        if (!personRevisionId) {
            errors.push("No Person is specified!");
        }

        if (!clubRevisionId) {
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
            ClubRevisionId: clubRevisionId,
            Time: time
        };

        var params = [data.RaceId, data.PersonRevisionId, data.ClubRevisionId, data.Time];

        var sql = 'INSERT INTO Result (RaceId, PersonRevisionId, ClubRevisionId, Time) VALUES (?, ?, ?, ?)';
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
    updateResultById(res, id, raceId, personRevisionId, clubRevisionId, time) {
        var data = {
            Id: id,
            RaceId: raceId,
            PersonRevisionId: personRevisionId,
            ClubRevisionId: clubRevisionId,
            Time: time
        };

        var sql = 'UPDATE Result SET RaceId = COALESCE(?, RaceId), PersonRevisionId = COALESCE(?, PersonRevisionId), ClubRevisionId = COALESCE(?, ClubRevisionId), Time = COALESCE(?, Time) WHERE Id = ?'
        var params = [data.RaceId, data.PersonRevisionId, data.ClubRevisionId, data.Time, data.Id];
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