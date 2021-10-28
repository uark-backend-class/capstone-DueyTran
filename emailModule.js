require("dotenv").config();
const nodemailer = require("nodemailer");
const { google} = require("googleapis");


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.send = async (to, body) => {

  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const  transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,     
      }
    })

    transport.sendMail({
      to,
      subject: "Shogun Fayetteville Inventory Order",
      html: body,
    })

}  catch (error) {
    return error;
  };
};