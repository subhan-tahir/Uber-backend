const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const axios = require('axios');  // Fixed axios import

// Get Coordinates for an address
module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        // Assuming mapsService.getAddressCoordinates works as expected
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

// Get Distance and Time between two locations
module.exports.getDistanceTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.rows[0].elements[0];  // Distance and Time details
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching data from Google Maps API');
    }
}



module.exports.getSuggestions = async (input) => {
    try {
        const errors = validationResult(input);
        if (!errors.isEmpty()) {
            throw new Error('Origin and destination are required');
        }

        // const { input } = req.query;
        console.log("Suggestion Input", input)
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        
        // res.status(200).json({message:"Suggestion api hit successful"});
        return suggestions
    } catch (error) {
        console.error("❌ Internal sdfsdfsderver error:", error.message);
        // res.status(500).json({ message: "Internal server error" });
        return "Asdasd" ;
    }
};
