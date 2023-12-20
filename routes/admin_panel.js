const {
  adminPanelControllerGet,
  adminPanelControllerPost,
  adminPanelProductsControllerGet,
  adminPanelProductsControllerPost,
  adminPanelUsersControllerGet,
  adminPanelOrdersControllerGet,
  adminPanelEditProductControllerGet
} = require("../controllers/admin_panel_controller");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", adminPanelControllerGet);

router.post("/", adminPanelControllerPost);

router.get("/products", adminPanelProductsControllerGet);

router.post("/products", adminPanelProductsControllerPost)

router.get("/users", adminPanelUsersControllerGet);

router.get("/orders", adminPanelOrdersControllerGet);

router.get('/editProduct', adminPanelEditProductControllerGet)

module.exports = router;
