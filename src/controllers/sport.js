const Sport = require('../models/sport');

const getAllSportsToursAndMatches = async () => {
    const matches = await Sport.getAllSportsToursAndMatches();
    const res = {};
    matches.forEach(match => {
        const { sportName, tourName, matchName, matchId, startTime, format } = match;
        if (!res[sportName]) {
            res[sportName] = {};
        }
        if (!res[sportName][tourName]) {
            res[sportName][tourName] = [];
        }
        res[sportName][tourName].push({
            matchName: matchName,
            matchId: matchId,
            startTime: startTime,
            format: format
        });

    });
    return res;
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches
}