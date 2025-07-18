const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Google OAuth Strategy (only configure if credentials are available)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && 
    process.env.GOOGLE_CLIENT_ID !== 'dummy-client-id') {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with the same email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Link Google account to existing user
        user.googleId = profile.id;
        user.avatar = profile.photos[0].value;
        await user.save();
        return done(null, user);
      }
      
      // Create new user
      user = new User({
        googleId: profile.id,
        username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.random().toString(36).substr(2, 5),
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        isVerified: true,
        profile: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      });
      
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
} else {
  console.log('⚠️  Google OAuth not configured. Using dummy credentials for development.');
}

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
