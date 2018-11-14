const User = require("../models/UserModel"); //Model
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const dotenv = require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      //options for strategy
      callbackURL: "http://localhost:3300/api/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          return done(null, currentUser);
        } else {
          new User({
            displayName: profile.displayName,
            googleId: profile.id,
            name: profile.name,
            email: profile.emails[0].value
          })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);

//Access token  is for access. refresh token refreshes access token. profile brings back profile information, done calls when done with callback function

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY
    },
    function(jwtPayload, done) {
      User.findOne({ _id: jwtPayload.id }, function(err, user) {
        if (user) {
          return done(null, user);
        } else {
          return done(err, false);
        }
      });
    }
  )
);
