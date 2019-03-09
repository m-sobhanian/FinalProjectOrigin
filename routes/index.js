var express = require('express');
var router = express.Router();
const path=require('path');
const multer = require("multer");
const User = require('../models/user');
const Article = require('../models/article');
const auth = require('../tools/authentication.js');
const ac = require('../tools/ac.js');
const admin = require('./api/admin');
const user = require('./api/user');
const passport = require('passport');
const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/FinalProject2", {useCreateIndex: true, useNewUrlParser: true });

var db = mongoose.connect('mongodb://localhost:27017/FinalProject2', {useCreateIndex: true, useNewUrlParser: true },function(err, res){
    if(err){ console.log('Failed to connect to ' + db); }  
    else{ console.log('Connected to ' + db); } 
});



const storage = multer.diskStorage({
  destination: "./public/uploads/avatar",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("pic");


/* GET home page. */
router.get('/', function(req, res) {
  Article.find({}, function (err, articles) {
    if (err){
      console.log("errrrrr")
      res.send(err);
    }
    console.log("Articleeeees")
    console.log(articles)
    res.render('index.ejs', {
        articles
    })

})
.populate('author');

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
  if (!req.body) return res.sendStatus(400)
  upload(req, res,  (err) => {
    if (err) {
      console.log(err.message);
      return res.json({
        success:false,
        msg: "something wrong in user sign up."
      })
    }
    else{
      if (req.file == undefined) {
        return res.json({
          success:false,
          msg: "Please choose image."
        })
      }
      else {
        const  {fname, lname, username, password, phone, optradio}=req.body;

        let user = new User({
          firstname : fname,
          lastname : lname,
          username : username,
          password : password,
          phone : phone,
          sex: optradio,
          role: "user",
          pic: req.file.filename
         
        })

        user.save((err, user)=>{
          if (err) {
            console.log(err.message);
            return res.json({
              success:false,
              msg: "Something wrong in user sign up."
            })
          }
            res.json({
            success: true,
            msg: "You are successfully sign up.",
            user
          })
        })
      }
    }
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
