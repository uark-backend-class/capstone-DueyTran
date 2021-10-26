if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};

const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
const User = require("./models/User");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("./db");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
},
    async function(accessToken, refreshToken, profile, cb) {
        let user = await User.findOne({ email: profile._json.email });

        if (user) {
            cb(null, user);
        }
        else {
            let newUser = new User({ googleId: profile.id, email: profile._json.email });
            await newUser.save();
            cb(null, newUser);
        }
    }
));
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
        secret: process.env.SESSION_SECRET
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("./public"))
app.use(express.urlencoded( { extended: true } ));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log("Listening - 3000");
});