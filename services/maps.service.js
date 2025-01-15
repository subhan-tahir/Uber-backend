const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = "AIzaSyBIBso-pbROOCugl11uJNtgJoRtWRGptu4"; // Enclose the key in quotes
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location; // Corrected property access
            return {
                lat: location.lat, // Changed 'ltd' to 'lat'
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
