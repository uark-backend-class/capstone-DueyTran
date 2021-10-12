const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
const User = require("./models/User");
const passport = require("passport");
const session = require("express-session");

require("./db");

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

const app = express();
app.use(
    session({
        secret: "shogunAPI"
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("./public"))
app.use(express.urlencoded( { extended: true } ));
app.use(routes);

app.listen(3000, () => {
    console.log("Listening - 3000");
});