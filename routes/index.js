const router = require("express").Router();
const inventory = require("../controller/inventory.controller");
const auth = require("../controller/auth.controller");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded( { extended: false } );


router.get("/", inventory.mainPage);
router.get("/inventoryPage", inventory.inventoryList);
router.get("/videosPage", inventory.instructionalVideos);
router.get("/picReferences" , inventory.picReferences);
router.get("/register", auth.registrationPage);
router.get("/login", auth.loginPage);
router.get("/logout", auth.logout);
router.post("/register", auth.register, auth.login);
router.post("/login", auth.login);

router.use(auth.isAuthenticated);
router.get("/addItemPage", inventory.addItem);
router.get("/delete/:id", inventory.deleteItem)
router.get("/update/:id", inventory.addItem);
router.get("/newForm", inventory.newForm);
router.post("/updatePage", inventory.updateItem);
router.post("/sentForm",jsonParser, inventory.sentForm);



module.exports = router;