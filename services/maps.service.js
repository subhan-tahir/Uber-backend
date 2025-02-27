const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API; // Enclose the key in quotes
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location; // Corrected property access
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message || error);
        throw error;
    }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    console.log("Fetching from Google API:", url);

    try {
        const response = await axios.get(url); // Set a timeout of 10s
        console.log("Google API Response:", response.data);

        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Google API Error: ${response.data.status}`);
        }
    } catch (err) {
        console.error("Google API request failed:", err.message);
        throw err;
    }
};
