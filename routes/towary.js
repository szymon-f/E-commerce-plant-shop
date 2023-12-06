const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Strona z wszystkimi towarami');
})

module.exports = router;
