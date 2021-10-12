const User = require("../models/User");
const passport = require("passport");

exports.registrationPage = (req, res) => {
    res.render("register")
};

exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email });
    await User.register(user, req.body.password);

    next();
};

exports.login = passport.authenticate("local", {
    failureRedirect: "/login",
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
    res.render("login");
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
};

