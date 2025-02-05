//a zero-dependency module or library that loads environment variables from a .env file into the runtime environment
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const userRoutes= require('./routes/user.routes');
const app = express();
const cookieParser =  require('cookie-parser');
const connectDB = require('./db/db');
const mapRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')
connectDB();

app.use(cors({ origin: '*', credentials: true }));

//express.json is a Middleware to parse JSON data in the request body
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World'); 
    
});
app.use('/maps',mapRoutes);
app.use('/Uber-users',userRoutes);
app.use('/login',userRoutes);
app.use('/rides',rideRoutes);

module.exports = app;

