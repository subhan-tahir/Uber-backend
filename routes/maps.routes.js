const express = require('express');
const { authUSer } = require('../middleware/auth.middleware');
const router = express.Router();
const { query } = require('express-validator');
const { getCoordinates, getDistanceTime, getSuggestions } = require('../controllers/maps.controller');
const { getAutoCompleteSuggestions } = require('../services/maps.service');
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUSer,
    getCoordinates
);

router.get(
    '/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUSer,
    async (req, res) => {
        console.log("🚀 Received request to /get-distance-time");
        console.log("Query Params:", req.query);

        try {
            const { pickup, destination } = req.query;
            console.log(req.query);
            console.log("Fetching distance and time for:", pickup, destination);

            const distanceTime = await getDistanceTime(pickup, destination);
            console.log("✅ Distance & Time Response:", distanceTime);

            res.status(200).json(distanceTime);
        } catch (error) {
            console.error("❌ Error fetching distance and time:", error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUSer,
    async (req, res) => {
        try {
            const { input } = req.query;
            const inputSuggestion = await getSuggestions(input);
            res.status(200).json(inputSuggestion);
        } catch (error) {
            console.error("❌ Error fetching distance and time:", error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
)

module.exports = router