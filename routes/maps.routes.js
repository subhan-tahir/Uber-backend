const expree = require('express');
const { authUSer } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/get-coordinates',authUSer,getCoordinate)