var express = require('express');
var router = express.Router();
const path=require('path');
const User = require('../models/user');
const auth = require('../tools/authentication.js');
const ac = require('../tools/ac.js');
const admin = require('./api/admin');
const user = require('./api/user');

const passport = require('passport');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/FinalProject2", {useCreateIndex: true, useNewUrlParser: true });

// var db = mongoose.connect('mongodb://localhost:27017/FinalProject1', {useCreateIndex: true, useNewUrlParser: true },function(err, res){
//     if(err){ console.log('Failed to connect to ' + db); }  
//     else{ console.log('Connected to ' + db); } 
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/panel*' , function(req, res, next ){
res.sendFile('index.html',{root: path.join(__dirname, '../panel/build')});
})

router.get('/createAdmin', (req, res)=>{
  res.render('createAdmin')
})

router.post('/createAdmin', function (req, res) {
  const user = new User({
    username: "admin",
    password: "admin",
    role: "admin"
  })
  user.save((err, user) =>{
    if(err){
      console.log(err.message);
      return res.json({
        success: false,
        msg: "something wrong in admin creation\n"+err.message
      })
    }
    res.json({
      success: true,
      msg: "You are successfully sign up.",
      user
    })
  })
})

router.post('/signUp', (req, res)=>{
  let result=req.body;
  let user = new User({
    firstname : result.fname,
    lastname : result.lname,
    username : result.username,
    password : result.password,
    phone : result.phone,
    sex: result.optradio,
    role: "user"
   
  })
  
  user.save((err, user)=>{
    if (err) {
      console.log(err.message);
      return res.json({
        success:false,
        msg: "something wrong in user sign up."
      })
    }
      res.json({
      success: true,
      msg: "You are successfully sign up.",
      user
    })
  })
})

router.post('/signin', passport.authenticate('local-login'), (req, res) => {
  console.log(req.body);
  User.find({username:req.body.username},(err, user)=> {
    if(err){
      res.json({
        success: false,
        msg: "something is wrong."
      });
    }
    else{
      res.json({
        success: true,
        msg: "you are logged in",
        user
      });
    }
  })
 
});

// router.use('/api/admin', auth.isLogedIn, ac.roleBaseAccess(['admin']),admin);
router.use('/api/user', auth.isLogedIn, ac.roleBaseAccess(['admin', 'user']), user);

module.exports = router;
