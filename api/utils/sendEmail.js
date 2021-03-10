const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, msg) => {
    return new Promise((resolve, reject) => {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailUsername,
                pass: process.env.emailPassword
            },
            secure: true,
            pool: true
        });
	console.log("Transport created.");
        const message = {
            from: process.env.emailUsername,
            to: email,
            subject: subject, // Subject line
            html: `<p>${msg}</p>`
        };

	console.log("Message body created");
        //var resp = false;
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log("There has been an error:",err);
                resolve(false);
            } else {
                console.log("Email Sent");
                resolve(true);
            }
        });
        //return resp;
    });
}

module.exports = sendEmail;
