const Helpers = require("./../helpers/helpers.js");

class ClubRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from ClubRepository constructor`);
    }

    // Get all clubs
    getAllClubs(res) {
        var sql = 'SELECT Club.Id, Cr.Name, Cr.Updated FROM Club JOIN (SELECT * FROM ClubRevision cr1 WHERE cr1.Updated = (SELECT MAX(Updated) FROM ClubRevision cr2 WHERE cr2.Id = cr1.Id)) cr ON club.Id = cr.ClubId';
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
            console.log(`${Helpers.getDateNowString()} getAllClubs returns ${rows.length} rows`);
        });
    }

    // Get Club by Id
    getClubById(res, id) {
        var sql = 'SELECT Club.Id, Cr.Name, Cr.Updated FROM Club JOIN (SELECT * FROM ClubRevision cr1 WHERE cr1.Updated = (SELECT MAX(Updated) FROM ClubRevision cr2 WHERE cr2.Id = cr1.Id)) cr ON club.Id = cr.ClubId WHERE Club.Id = ?'
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
            console.log(`${Helpers.getDateNowString()} getClubById returns Id ${row.Id}`);
        });
    }

    // Get Club revisions
    getClubRevisionsById(res, id) {
        var sql = 'SELECT Id, ClubId, Name, Updated FROM ClubRevision WHERE ClubId = ? ORDER BY Updated';
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
            console.log(`${Helpers.getDateNowString()} getClubRevisionsById returns ${rows.length} rows for id ${id}`);
        });
    }

    // Insert new revision for club by id
    insertClubRevisionById(res, id, name, updateYear) {
        var errors = [];

        if (!id) {
            errors.push("No club id specified!");
        }

        if (!name) {
            errors.push("No club name is specified!");
        }

        if (!updateYear) {
            errors.push("No update year is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            ClubId: id,
            ClubName: name,
            Updated: updateYear
        };

        var sql = 'INSERT INTO ClubRevision (ClubId, Name, Updated) VALUES (?, ?, ?)';
        var params = [data.ClubId, data.ClubName, data.Updated];
        this.db.serialize(() => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });

            this.db.get("SELECT Id, ClubId, Name, Updated FROM ClubRevision WHERE Id = (SELECT seq FROM sqlite_sequence WHERE name = 'ClubRevision')", [], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message })
                    return;
                }

                res.json({
                    "message": "success",
                    "data": row,
                    "id": row.Id
                });
            });

            console.log(`${Helpers.getDateNowString()} insertClubRevisionById inserted Id: ${row.Id}`);
        });
    }

    // Insert new club
    insertNewClub(res, name, updateYear) {
        var errors = [];

        if (!name) {
            errors.push("No club name is specified!");
        }

        if (!updateYear) {
            errors.push("No update year is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            ClubName: name,
            Updated: updateYear
        };

        var sql = 'INSERT INTO Club () VALUES ()';
        var clubRow = null;
        this.db.serialize(() => {
            this.db.run(sql, [], (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });
            this.db.get("SELECT Id FROM Club WHERE Id = (SELECT seq FROM sqlite_sequence WHERE name = 'Club')", [], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }

                clubRow = row;
            });
            this.db.run('INSERT INTO ClubRevision (ClubId, Name, Updated) VALUES', [clubRow.Id, data.ClubName, data.Updated], (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "success",
                    "data": clubId
                });
            });
        });
    }
}

module.exports = ClubRepository;