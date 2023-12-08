const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');

// router.use(cookieParser);

router.get('/', (req, res) => {
  res.render('login');
//   res.clearCookie('registerSuccessMessage');
})

module.exports = router;
