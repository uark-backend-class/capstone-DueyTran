require("dotenv").config();
const Inventory = require("../models/Inventory");
const User = require("../models/User");
const emailModule = require("../emailModule");
const twilioModule = require("../twilioModule");

exports.mainPage = (req, res) => {
    res.render("main-page");
};

exports.inventoryList = async (req, res) => {
    const inventory = await Inventory.find().lean();
    res.render("inventory-page", { title: "Inventory", inventory, email: req.user && req.user.email });        
};

exports.instructionalVideos = (req, res) => {
    res.render("videos-page", );
};

exports.picReferences = (req, res) => {
    res.render("picture-page");
};

exports.addItem = async (req, res) => {
    if (req.params.id) {
        const inventory = await Inventory.findById(req.params.id).lean();
        res.render("update-item", { title: "Update Item", inventory});
    }
    else {
        res.render("add-item", { title: "Add Item"});
    }
    
};

exports.updateItem = async (req, res) => {
    if (req.body.id) {
        await Inventory.findByIdAndUpdate(req.body.id, req.body);
    }
    else {
        const inventory = new Inventory({
            item: req.body.item,
            quantity: req.body.quantity,
            unitType: req.body.unitType,
        });  

        await inventory.save();          
    };    
    
    res.redirect("/inventoryPage");
};

exports.deleteItem = async (req, res) => {
    await Inventory.findByIdAndDelete(req.params.id);
    res.redirect("/inventoryPage");
};

exports.sentForm = (req, res) => { 
    let email = req.body.email
    res.send(req.body.items)
    emailModule.send(req.body.email, JSON.stringify(req.body.items));
    twilioModule.sendSMS(req.body.phone, "New inventory order from Shogun of Fayetteville sent to: " + `${email}`);  
};
 
 exports.newForm = (req, res) => {    
     res.render("new-form")
 };
 
exports.registeredUsers = async (req, res) => { 
    const user = await User.find().lean();
    res.json(user);
};