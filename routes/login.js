const {loginControllerGet, loginControllerPost} = require('../controllers/login_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', loginControllerGet)

router.post('/', loginControllerPost)

module.exports = router;
