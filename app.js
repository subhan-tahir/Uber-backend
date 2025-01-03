//a zero-dependency module or library that loads environment variables from a .env file into the runtime environment
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();
const app = express();

app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello World'); 
});
module.exports = app;

