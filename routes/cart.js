const {cartControllerGet, cartControllerPost} = require('../controllers/cart_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', cartControllerPost)

router.get('/', cartControllerGet)

module.exports = router;