const Helpers = require("./../helpers/helpers.js");

class PersonRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from PersonRepository constructor`);
    }

    // Get all persons
    getAllPersons(res) {
        var sql = 'SELECT Person.Id, pr.Firstname, pr.Lastname, pr.Updated, pr.Gender FROM Person JOIN (SELECT * FROM PersonRevision pr1 WHERE pr1.Id = (SELECT MAX(Id) FROM PersonRevision pr2 WHERE pr2.PersonId = pr1.PersonId)) pr ON Person.Id = pr.PersonId';
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
            console.log(`${Helpers.getDateNowString()} getAllPersons returns ${rows.length} rows`);
        });
    }

    // Get all person revisions
    getAllPersonRevisions(res) {
        var sql = 'SELECT pr.Id, Person.Id, pr.Firstname, pr.Lastname, pr.Updated, pr.Gender FROM Person JOIN (SELECT * FROM PersonRevision pr1 WHERE pr1.Id = (SELECT MAX(Id) FROM PersonRevision pr2 WHERE pr2.PersonId = pr1.PersonId)) pr ON Person.Id = pr.PersonId';
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
            console.log(`${Helpers.getDateNowString()} getAllPersonRevisions returns ${rows.length} rows`);
        });
    }

    // Get person by Id
    getPersonById(res, id) {
        var sql = 'SELECT Person.Id, pr.Firstname, pr.Lastname, pr.Updated, pr.Gender FROM Person JOIN (SELECT * FROM PersonRevision pr1 WHERE pr1.Id = (SELECT MAX(Id) FROM PersonRevision pr2 WHERE pr2.PersonId = pr1.PersonId)) pr ON Person.Id = pr.PersonId WHERE Person.Id = ?'
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
            console.log(`${Helpers.getDateNowString()} getPersonById returns Id ${row.Id}`);
        });
    }

    // Get person revisions
    getPersonRevisionsById(res, id) {
        var sql = 'SELECT Id, PersonId, Firstname, Lastname, Updated, Gender FROM PersonRevision WHERE PersonId = ? ORDER BY Updated';
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
            console.log(`${Helpers.getDateNowString()} getPersonRevisionsById returns ${rows.length} rows for id ${id}`);
        });
    }

    // Get person revisions by race
    getPersonRevisionsByRaceId(res, id) {
        var sql = 'SELECT PR.Id, PR.PersonId, PR.Firstname, PR.Lastname, PR.Updated, PR.Gender FROM PersonRevision PR INNER JOIN Result R ON PR.Id = R.PersonRevisionId WHERE R.RaceId = ?';
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
            console.log(`${Helpers.getDateNowString()} getPersonRevisionsByRaceId returns ${rows.length} rows for id ${id}`);
        });
    }

    // Insert new revision for person by id
    insertPersonRevisionById(res, id, firstName, lastName, updateYear, Gender) {
        var errors = [];

        if (!id) {
            errors.push("No person id specified!");
        }

        if (!firstName) {
            errors.push("No person Firstname is specified!");
        }

        if (!lastName) {
            errors.push("No person Lastname is specified!");
        }

        if (!updateYear) {
            errors.push("No update year is specified!");
        }

        if (!Gender) {
            errors.push("No Gender is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            PersonId: id,
            FirstName: firstName,
            LastName: lastName,
            Updated: updateYear,
            Gender: Gender
        };

        var sql = 'INSERT INTO PersonRevision (PersonId, Firstname, Lastname, Updated, Gender) VALUES (?, ?, ?, ?, ?)';
        var params = [data.PersonId, data.FirstName, data.LastName, data.Updated, data.Gender];
        this.db.serialize(() => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });

            this.db.get("SELECT Id, PersonId, Firstname, Lastname, Updated, Gender FROM PersonRevision WHERE Id = (SELECT seq FROM sqlite_sequence WHERE name = 'PersonRevision')", [], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message })
                    return;
                }
                console.log(JSON.stringify(row));
                res.json({
                    "message": "success",
                    "data": row,
                    "id": row.Id
                });
            });
        });
    }

    // Insert new person
    insertNewPerson(res, firstName, lastName, updateYear, Gender) {
        var errors = [];

        if (!firstName) {
            errors.push("No Firstname is specified!");
        }

        if (!lastName) {
            errors.push("No Lastname is specified!");
        }

        if (!updateYear) {
            errors.push("No update year is specified!");
        }

        if (!Gender) {
            errors.push("No Gender is specified!");
        }

        if (errors.length) {
            console.error(`${Helpers.getDateNowString()} ERROR: ${errors.join(", ")}`);
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var data = {
            FirstName: firstName,
            LastName: lastName,
            Updated: updateYear,
            Gender: Gender
        };

        var sql = 'INSERT INTO Person DEFAULT VALUES';
        var personRow = null;
        this.db.serialize(() => {
            this.db.run(sql, [], (err) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} INSERT 1 ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
            });
            this.db.get("SELECT Id FROM Person WHERE Id = (SELECT seq FROM sqlite_sequence WHERE name = 'Person')", [], (err, row) => {
                if (err) {
                    console.error(`${Helpers.getDateNowString()} GET ERROR: ${err.message}`);
                    res.status(400).json({ "error": err.message });
                    return;
                }
                personRow = row;
                console.log(`${Helpers.getDateNowString()} insertNewPerson inserted row: ${JSON.stringify(personRow)}`);

                this.db.run('INSERT INTO PersonRevision (PersonId, Firstname, Lastname, Updated, Gender) VALUES (?, ?, ?, ?, ?)', [personRow.Id, data.FirstName, data.LastName, data.Updated, data.Gender], (err) => {
                    if (err) {
                        console.error(`${Helpers.getDateNowString()} INSERT 2 ERROR: ${err.message}`);
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    res.json({
                        "message": "success",
                        "data": personRow
                    });
                });
            });
        });
    }
}

module.exports = PersonRepository;