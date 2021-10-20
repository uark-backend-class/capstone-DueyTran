require("dotenv").config();
const { response } = require("express");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSMS = (phone, message) => {
    return client.messages.create({
        to: phone,
        from: process.env.TWILIO_TRIAL_PHONE_NUMBER,    
        body: Date() + " " + message,     
    });
};