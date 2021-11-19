const Helpers = require("./../helpers/helpers.js");

class RaceRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from RaceRepository constructor`);
    }

    // Get all races
    getAllRaces(res) {
        var sql = 'SELECT Id, Year, Length FROM Race';
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
            console.log(`${Helpers.getDateNowString()} getAllRaces returns ${rows.length} rows`);
        });
    }

    // Get race by Id
    getRaceById(res, id) {
        var sql = 'SELECT Id, Year, Length FROM Race WHERE Id = ?'
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
            console.log(`${Helpers.getDateNowString()} getRaceById returns Id ${row.Id}`);
        });
    }

    // Insert new race
    insertNewRace(res, year, length) {
        var errors = [];

        if (!year) {
            errors.push("No Year is specified!");
        }

        if (!length) {
            errors.push("No Length is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            Year: year,
            Length: length
        };

        var params = [data.Year, data.Length];

        var sql = 'INSERT INTO Race (Year, Length) VALUES (?, ?)';
        this.db.serialize(() => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} INSERT ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });
            this.db.get("SELECT Id FROM Race WHERE Id = (SELECT seq FROM sqlite_sequence WHERE name = 'Race')", [], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} GET ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }

                console.log(`${Helpers.getDateNowString()} insertNewPerson inserted row: ${JSON.stringify(row)}`);
                res.json({
                    "message": "success",
                    "data": row
                });
            });
        });
    }

    // Update Race
    updateRaceById(res, id, year, length) {
        var data = {
            Id: id,
            Year: year,
            Length: length
        };

        var sql = 'UPDATE Race SET Year = COALESCE(?, Year), Length = COALESCE(?, Length) WHERE Id = ?'
        params = [data.Year, data.Length, data.Id];
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
            console.log(`${Helpers.getDateNowString()} updateRaceById: Id: ${data.Id} => Update: ${JSON.stringify(data)}`);
        });
    }

    // Delete Race
    deleteRace(res, id) {
        var sql = 'DELETE FROM Race WHERE Id = ?';
        params = [id];
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
            console.log(`${Helpers.getDateNowString()} deleteRaceId: ${id}`);
        });
    }
}

module.exports = RaceRepository;