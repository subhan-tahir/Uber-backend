const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const { userModel } = require('../models/user.model');
// const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', [
    
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name muste be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 3 characters'),

],
    userController.registerUser
)


router.post('/login', [
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],userController.loginUser)


router.post("/user-profile", async (req, res) => {
    console.log(req.body);
    try {
        const { image,userId } = req.body;

        if (!image || !userId) {
            return res.status(400).json({ error: "No image provided" });
        }

        // Save Image in Database
        // const newProfile = await userModel.create({ image });
        let newProfile = await userModel.findOne({ _id: userId });

        if(!newProfile){
            return res.status(404).json({data:"User not found"})
        }

        newProfile.image = image

        // let profile = await newProfile.save()
        let profile = await newProfile.save();


        res.status(200).json({ 
            message: "Profile updated successfully", 
            profileData: profile
        });
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).json({ error: "Internal server  error" });
    }
});






router.get("/get-profile/:userId", async (req, res) => { 
    try {
        const userId = req.params.userId; 
        console.log("User ID:", userId); 

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const profile = await userModel.findOne({ _id: userId });
        
        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        res.status(200).json({ profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router
