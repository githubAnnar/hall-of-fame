const Helpers = require("./../helpers/helpers.js");

class ClubRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from ClubRepository constructor`);
    }

    // Get all clubs
    getAllClubs(res){
        var sql = "SELECT Club.Id, Cr.Name, Cr.Updated FROM Club JOIN (SELECT * FROM ClubRevision cr1 WHERE cr1.Updated = (SELECT MAX(Updated) FROM ClubRevision cr2 WHERE cr2.Id = cr1.Id)) cr ON club.Id = cr.ClubId";
        var params = [];
        this.db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(`${this.getdns()} ERROR: ${err.message}`);
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
    getClubById(res){
        
    }
}

module.exports = ClubRepository;