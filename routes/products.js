const {productsControllerPost, productsControllerGet, productsControllerSaveToSession} = require('../controllers/products_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', productsControllerGet)

router.post('/', productsControllerPost)

router.post('/add-to-cart', productsControllerSaveToSession);

module.exports = router;
