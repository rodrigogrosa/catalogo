const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });

  /* POST to Add User Service */
router.post('/adduser', function (req, res) {

  var db = require("../conecta");
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var user = new Users({ username: userName, email: userEmail });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          res.redirect("userlist");
      }
  });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../conecta");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({}).lean().exec(
     function (e, docs) {
        res.render('userlist', { "userlist": docs });
  });
});



module.exports = router;
