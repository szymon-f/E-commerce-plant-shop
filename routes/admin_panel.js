const {
  adminPanelControllerGet,
  adminPanelControllerPost,
  adminPanelProductsControllerGet,
  adminPanelUsersControllerGet,
  adminPanelOrdersControllerGet,
} = require("../controllers/admin_panel_controller");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", adminPanelControllerGet);

router.post("/", adminPanelControllerPost);

router.get("/products", adminPanelProductsControllerGet);

router.get("/users", adminPanelUsersControllerGet);

router.get("/orders", adminPanelOrdersControllerGet);

module.exports = router;
