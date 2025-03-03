
const mongoose = require('mongoose');
//bcrypt for hashing and comparing password
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'first name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minLength: [3, 'first name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    image: {
        type: String,  // Define the type properly
        required: false, // Required should be at the same level as 'type'
    }
})

// const profileSchema = new mongoose.Schema({

// });


userSchema.methods.generateAuthToken = function () {
    //this._id refers to the user's ID in MongoDB.
    console.log('user id get from mongoDB in current user collection',{id:this._id})
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}
//compare for login user
userSchema.methods.comparePassword = async function (password) {
    //bcrypt.compare take two parameters one is plain text password and second is hashed password
    return await bcrypt.compare(password, this.password)
}
//hash for register user
userSchema.statics.hashpassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('Uber-users', userSchema);

// const profileModel = mongoose.model('post', profileSchema);

module.exports = {
    userModel,
    // profileModel
}