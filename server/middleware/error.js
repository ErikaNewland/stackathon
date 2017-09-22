const router = require('express').Router();

// error handling
router.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err || 'Internal server error.');
});

module.exports = router;