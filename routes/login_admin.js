const {loginAdminControllerGet, loginAdminControllerPost} = require('../controllers/login_admin_controller')

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', loginAdminControllerGet)

router.post('/', loginAdminControllerPost)

module.exports = router;
