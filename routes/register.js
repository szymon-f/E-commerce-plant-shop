const {registerControllerPost, registerValidator} = require('../controllers/register_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req, res) => {
  res.render('register', {messages: req.flash()});
})

router.post('/', registerValidator, registerControllerPost)

module.exports = router;
