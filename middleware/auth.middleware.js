//Middleware check token is or not
const userModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports.authUSer = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split( '')[1];
    if(!token){
        return res.status(401)({message:'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //find user
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }
    catch(error){
    return res.json.status(401).json({message:'Unauthorized'}); 
    }
}
