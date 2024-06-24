const mysql = require('../lib/mysql');

const createNews = async (title, description, matchId, tourId, sportId) => {
    const statement = 'INSERT INTO news (title, description, matchId, tourId, sportId) VALUES (?, ?, ?, ?, ?)';
    const parameters = [title, description, matchId || null, tourId || null, sportId];
    return mysql.query(statement, parameters);
};

const getNewsByMatchId = async (matchId) => {
    const statement = 'SELECT * FROM news WHERE matchId = ? ORDER BY createdAt desc';
    const parameters = [matchId];
    return mysql.query(statement, parameters);
};

const getNewsByTourId = async (tourId) => {
    const statement = 'SELECT * FROM news WHERE tourId = ? ORDER BY createdAt desc';
    const parameters = [tourId];
    return mysql.query(statement, parameters);
};

const getNewsBySportId = async (sportId) => {
    const statement = 'SELECT * FROM news WHERE sportId = ? ORDER BY createdAt desc';
    const parameters = [sportId];
    return mysql.query(statement, parameters);
};

const getSportIdByTourId = async (tourId) => {
    const statement = 'SELECT sportId FROM tours WHERE id = ? limit 1';
    const parameters = [tourId];
    const result = await mysql.query(statement, parameters);
    return result.length ? result[0].sportId : null;
};

const getTourIdByMatchId = async (matchId) => {
    const statement = 'SELECT tourId FROM matches WHERE id = ? limit 1';
    const parameters = [matchId];
    const result = await mysql.query(statement, parameters);
    return result.length ? result[0] : null;
};

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId,
    getSportIdByTourId,
    getTourIdByMatchId
};