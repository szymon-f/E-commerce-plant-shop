const {cartControllerGet} = require('../controllers/cart_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) =>{
    res.send("blok płatności nie jest połączony")
})

router.get('/', cartControllerGet)

module.exports = router;