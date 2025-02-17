const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,  
            subject,
            text,
            html,
        };
        console.log('mail options',mailOptions);
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to: ${to}`);
    } 
    catch (error) {
        console.error('❌ Error sending email:', error);
    }
};

module.exports = sendEmail;

