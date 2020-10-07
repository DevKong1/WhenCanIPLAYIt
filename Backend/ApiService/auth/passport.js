const GoogleStategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user_Model")

module.exports = function(passport) {
  passport.use(new GoogleStategy({
    clientID: "622730842078-9lofcuu8e3cj16cei8unieq9qgj4ld6h.apps.googleusercontent.com",
    clientSecret: "5EZLbYyh18udNMEXBqGCuISn",
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      mail: profile.emails[0].value,
      nickname: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value
    };
    try {
      let user = await User.findOne({ googleId: profile.id })
      if (!user) user = await User.create(newUser);
      done(null, user);
    } catch (e) {
      console.error(e);
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  })
}