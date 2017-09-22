const router = require('express').Router();
const passport = require('passport');
const db  = require('../db')

if (process.env.NODE_ENV !== 'production') require('../../secrets')


// passport registration DEFINING FUNCTIONS HERE
passport.serializeUser((user, done) => {
  return done(null, user.id)
})
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))


router.use(passport.initialize());
router.use(passport.session());


module.exports = router;