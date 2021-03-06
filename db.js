require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOBD_CONNECTION_STRING);

mongoose.connection.on("open", () => { console.log("Connected to mongodb"); });