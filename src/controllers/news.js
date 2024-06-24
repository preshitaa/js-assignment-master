const News = require('../models/news');

const createNews = async (req, res) => {
    const { title, description, matchId, tourId } = req.body;
    
    if (!title || !description || (!matchId && !tourId)) {
        return res.status(400).json({ error: 'Title, description, and either matchId or tourId are required' });
    }

    try {
        let sportId = null;
        let finalTourId = tourId;

        if (matchId) {
            const match = await News.getTourIdByMatchId(matchId);
            if (!match) {
                return res.status(404).json({ error: 'Match not found' });
            }
            finalTourId = match.tourId;
        }
        else if (finalTourId) {
            sportId = await News.getSportIdByTourId(finalTourId);
            if (!sportId) {
                return res.status(404).json({ error: 'Tour not found' });
            }
        }

        await News.createNews(title, description, matchId, finalTourId, sportId);
        res.status(201).json({ message: 'News created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating news item' });
    }
};

const getNewsByMatchId = async (req, res) => {
    const { matchId } = req.params;

    try {
        const news = await News.getNewsByMatchId(matchId);
        if (news.length === 0) {
            return res.status(404).json({ error: 'No news found for the specified match ID' });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching news by match ID' });
    }
};

const getNewsByTourId = async (req, res) => {
    const { tourId } = req.params;

    try {
        const news = await News.getNewsByTourId(tourId);
        if (news.length === 0) {
            return res.status(404).json({ error: 'No news found for the specified tour ID' });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching news by tour ID' });
    }
};

const getNewsBySportId = async (req, res) => {
    const { sportId } = req.params;

    try {
        const news = await News.getNewsBySportId(sportId);
        if (news.length === 0) {
            return res.status(404).json({ error: 'No news found for the specified sport ID' });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching news by sport ID' });
    }
};

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId
};