var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.send('Add New User');
  });

module.exports = router;
