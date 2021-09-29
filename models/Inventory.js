const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
    item: String,
    quantity: Number,
    unitType: String,
});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;