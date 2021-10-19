require("dotenv").config();
const nodemailer = require("nodemailer");

// let transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: process.env.MAILTRAP_USERNAME,
//         pass: process.env.MAILTRAP_PASSWORD,
//     }
//   });

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOEKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    }
  });



  exports.send = (to, body) => {    
    transport.sendMail({
        to,        
        subject: "Shogun Fayettevill Inventory Order " + Date(),
        from: "shogunfayetteville@gmail.com",
        html: body,        
    });
  }