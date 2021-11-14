const Helpers = require("./../helpers/helpers.js");

class ClubRepository {
    constructor(db) {
        this.db = db;
        console.log(`${Helpers.getDateNowString()} HELLO from ClubRepository constructor`);
    }
}

module.exports = ClubRepository;