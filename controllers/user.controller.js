const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require('../services/user.service')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    console.log(req.body);
    const {fullname,email,password} = req.body;
    const hashpassword = await userModel.hashpassword(password);
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashpassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Extract user from request
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'invalid email or password'})
    }
    const token = user.generateAuthToken();
    res.status(200).json({token,user})
}   
module.exports.getUserProfile = async(req,res,next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    res.status(200).json({message:'logged out'})
}