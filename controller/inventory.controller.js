const Inventory = require("../models/Inventory");

exports.mainPage = (req, res) => {
    res.render("main-page");
};

exports.inventoryList = async (req, res) => {
    const inventory = await Inventory.find().lean();
    res.render("inventory-page", { title: "Inventory List", inventory });
};

exports.instructionalVideos = (req, res) => {
    res.render("videos-page", );
};

exports.picReferences = (req, res) => {
    res.render("picture-page");
}

exports.addItem = async (req, res) => {
    if (req.params.id) {
        const inventory = await Inventory.findById(req.params.id).lean();
        res.render("update-item", { title: "Update Item", inventory });
    }
    else {
        res.render("add-item", { title: "Add Item" });
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
}

exports.sentForm = (req, res) => {    
    res.send(req.body.item + " " + req.body.quantity + " " + req.body.unitType);
 };
 
 exports.newForm = (req, res) => {    
     res.render("new-form", { title: "New Inventory Order" })
 };
 
 