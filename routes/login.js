const express = require('express');
const flash = require('express-flash');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('login', {messages: req.flash()});
})

module.exports = router;
