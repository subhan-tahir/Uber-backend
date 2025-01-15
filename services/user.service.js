const userModel = require("../models/user.model");

//interact with server
module.exports.createUser = async ({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');

    }
     //save the user in the database
    const user = userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password
    })
    return user
}

