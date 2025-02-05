const express = require('express');
const { authUSer } = require('../middleware/auth.middleware');
const { body,query } = require('express-validator');
const router = express.Router();
const rideController = require('../controllers/ride.controller')


router.post('/create',
    authUSer,
body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Address'),
body('destination').isString().isLength({min:3}).withMessage('Invalid destination Address'),
body('vehicleType').isString().isIn(['auto','car','moto']),
body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
rideController.createRide
);




router.get('/get-fare',
    authUSer,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup Address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination Address'),
    rideController.getfare
)

module.exports = router