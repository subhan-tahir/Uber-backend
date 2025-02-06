const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require('../services/user.service')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Extract data from the request
    const { fullname, email, password } = req.body;
    console.log(req.body);
    try{
        // Check if email already exists
        let exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        //Hash the password
        const hashpassword = await userModel.hashpassword(password);
``
        //save user on the database
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashpassword
        });
        //user created successfuly
        
            const token = user.generateAuthToken();
            res.json({message:'Signed up Succesfully',token ,user})
        
        
    }
    catch(error){
        console.error('Siguup error:',error)
    }

}

module.exports.loginUser = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract user credentials from request
        const { email, password } = req.body;
        console.log(req.body)
        // Check if the user exists
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Email does not exist please create an account' });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate authentication token
        const token = user.generateAuthToken();

        // Respond with token and user data
        res.status(200).json({ token, user ,message:'User logged in successfully'});
       
    } catch (error) {
        // Handle unexpected errors
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'logged out' })
}