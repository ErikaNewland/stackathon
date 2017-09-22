const router = require('express').Router();
const morgan = require('morgan');

router.use(morgan('dev'));

module.exports = router;