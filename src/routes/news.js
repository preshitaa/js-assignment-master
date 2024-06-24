const News = require('../controllers/news');

module.exports = function(app) {
    
    //Create news
    app.route('/news').post(async (req, res, next) => {
        try {
            return await News.createNews(req, res);
        } catch (err) {
            return next(err);
        }
    });

    // Fetch news by match ID
    app.route('/news/match/:matchId').get(async (req, res, next) => {
        try {
            return await News.getNewsByMatchId(req, res);
        } catch (err) {
            return next(err);
        }
    });

    // Fetch news by tour ID
    app.route('/news/tour/:tourId').get(async (req, res, next) => {
        try {
            return await News.getNewsByTourId(req, res);
        } catch (err) {
            return next(err);
        }
    });

    // Fetch news by sport ID
    app.route('/news/sport/:sportId').get(async (req, res, next) => {
        try {
            return await News.getNewsBySportId(req, res);
        } catch (err) {
            return next(err);
        }
    })
}