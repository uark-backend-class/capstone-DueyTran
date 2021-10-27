const router = require("express").Router();
const inventory = require("../controller/inventory.controller");
const auth = require("../controller/auth.controller");

router.get("/", inventory.mainPage);
router.get("/inventoryPage", inventory.inventoryList);
router.get("/videosPage", inventory.instructionalVideos);
router.get("/picReferences" , inventory.picReferences);
router.get("/register", auth.registrationPage);
router.get("/login", auth.loginPage);
router.get("/logout", auth.logout);
// router.get("/auth/google", auth.googleLogin);
// router.get("/auth/google/redirect", auth.googleRedirect, (req, res) => res.redirect("/inventoryPage"));
router.post("/register", auth.register, auth.login);
router.post("/login", auth.login);

router.use(auth.isAuthenticated);
router.use(auth.isAuthorized);
router.get("/addItemPage", inventory.addItem);
router.get("/delete/:id", inventory.deleteItem)
router.get("/update/:id", inventory.addItem);
router.get("/newForm", inventory.newForm);
router.get("/usersPage", inventory.registeredUsers)
router.post("/updatePage", inventory.updateItem);
router.post("/sentForm", inventory.sentForm);


module.exports = router;