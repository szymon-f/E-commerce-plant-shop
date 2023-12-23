const {
  adminPanelControllerGet,
  adminPanelControllerPost,
  adminPanelProductsControllerGet,
  adminPanelUsersControllerGet,
  adminPanelOrdersControllerGet,
  adminPanelEditProductControllerGet,
  adminPanelEditProductControllerPost,
  adminPanelProductsControllerDelete
} = require("../controllers/admin_panel_controller");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", adminPanelControllerGet);

router.post("/", adminPanelControllerPost);

router.get("/products", adminPanelProductsControllerGet);

router.get("/deleteProduct/:productId", adminPanelProductsControllerDelete)

router.get("/users", adminPanelUsersControllerGet);

router.get("/orders", adminPanelOrdersControllerGet);

router.get('/editProduct', adminPanelEditProductControllerGet)

router.post("/editProduct", upload.single('imagePath'), adminPanelEditProductControllerPost)

module.exports = router;
