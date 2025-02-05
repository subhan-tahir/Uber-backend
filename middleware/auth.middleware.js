const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUSer = async (req, res, next) => {
    try {


        // Extract token from cookies or headers
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by decoded token ID
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internel server Error' });
    }
};


