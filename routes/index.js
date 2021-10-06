const router = require("express").Router();
const inventory = require("../controller/inventory.controller");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded( { extended: false } );

router.get("/", inventory.mainPage);
router.get("/inventoryPage", inventory.inventoryList);
router.get("/videosPage", inventory.instructionalVideos);
router.get("/picReferences" , inventory.picReferences);
router.get("/addItemPage", inventory.addItem);
router.get("/delete/:id", inventory.deleteItem)
router.get("/update/:id", inventory.addItem);
router.get("/newForm", inventory.newForm);
router.post("/updatePage", inventory.updateItem);
router.post("/sentForm",jsonParser, inventory.sentForm);

module.exports = router;