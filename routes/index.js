const router = require("express").Router();
const inventory = require("../controller/inventory.controller");

router.get("/", inventory.mainPage);
router.get("/inventoryPage", inventory.inventoryList);
router.get("/videosPage", inventory.instructionalVideos);
router.get("/picReferences" , inventory.picReferences);
router.get("/addItemPage", inventory.addItem);
router.get("/delete/:id", inventory.deleteItem)
router.get("/update/:id", inventory.addItem);
router.post("/updatePage", inventory.updateItem);


module.exports = router;