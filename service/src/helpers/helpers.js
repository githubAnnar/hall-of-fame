module.exports = function getDateNowString() {
    logDate = new Date(Date.now());
    return logDate.toLocaleTimeString('nb-NO');
}