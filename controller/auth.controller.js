const User = require("../models/User");
const passport = require("passport");

exports.registrationPage = (req, res) => {
    res.render("register")
};

exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, }); // removed admin as second param - const user = new User({ email: req.body.email, admin });
    await User.register(user, req.body.password);
    
    next();
};

exports.login = passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Bad username or password.",
    successRedirect: "/inventoryPage",
});

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/login");
    }
};

exports.loginPage = (req, res) => {
    res.render("login", { errorMessages: req.flash("error") });
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
};

exports.isAuthorized = (req, res, next) => {
    if (req.user.admin) {
        next();
    }
    
    else {
        res.status(401).render("notAuthPage");
    };
};


// exports.googleLogin = passport.authenticate("google", {
//     scope: ["profile", "email"]
// });

exports.googleRedirect = passport.authenticate("google");
