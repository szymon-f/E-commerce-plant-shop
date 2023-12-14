const {productsControllerPost, productsControllerGet} = require('../controllers/products_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', productsControllerGet)

module.exports = router;
