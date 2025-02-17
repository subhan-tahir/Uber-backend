const sendEmail = require("../services/email.service");

const emailHandler = (username,email)=>{
    const subject = `Welcome to ${username}! Account Created Successfully`;
    const text = `
   
       Hello ${username}  Welcome to my <b>Uber App</b>! We're excited to have you join me.
        Your account has been successfully created with the email: ${email}.
        You can now log in to your account and start exploring all the features we have to offer.
        If you have any questions or need assistance, feel free to reach out to us.
        Thank you for joining!`

    const html = `  <p>Hello <strong>${username}</strong>,</p>
        <p>Welcome to my <strong>auth-app</strong>! </p>
        <img src="https://cdn-icons-png.flaticon.com/256/2111/2111696.png" alt="Your App Logo" width='200px' height="200px" style="display:block;margin:auto;"/>
        <p>Your account has been successfully created with the email: <strong>${email}</strong>.</p>
       `
    sendEmail(email,subject,text,html);
}

module.exports = emailHandler