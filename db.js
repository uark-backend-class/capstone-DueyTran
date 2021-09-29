const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/inventory");

mongoose.connection.on("open", () => { console.log("Connected to mongodb"); });