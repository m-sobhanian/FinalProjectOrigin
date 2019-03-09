var express = require('express');
var router = express.Router();
const User = require('../../models/user');
const Article = require('../../models/article');
const multer = require("multer");
const path=require('path');

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("pic");

router.post('/whoAmI', (req, res)=>{
    User.findById(req.user._id, (err, user)=>{
        if(err){
            return res.json({
                success: false,
                msg: "Something wrong in get user info\n" + err.message
            })
        }
        res.json({
            success: true,
            user
        })
    })
})

router.post('/newArticle', (req,res) => {
    if (!req.body) {
        return res.json({
          success: false,
          msg: "Empty filed"
        })
      }


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
            const RESULT=req.body;
            const ARTICLE = new Article({
              name : RESULT.nameArticle,
              author: req.user._id,
              shortTxt : RESULT.abstract,
              longTxt : RESULT.textArticle,
              date : RESULT.dateArticle,
              link: RESULT.nameArticle,
              pic: "uploads/" + req.file.filename
         
        })
    
        ARTICLE.save((err, article)=>{
              if (err) {
                console.log(err.message);
                return res.json({
                  success:false,
                  msg: "Something wrong in save article."
                })
              }
                res.json({
                success: true,
                msg: "Article successfully saved.",
                article
              })
            })
          }
        }
      })



  //   const RESULT=req.body;
  //   const ARTICLE = new Article({
  //       name : RESULT.nameArticle,
  //       author: req.user._id,
  //       shortTxt : RESULT.abstract,
  //       longTxt : RESULT.textArticle,
  //       date : RESULT.dateArticle,
  //       link: RESULT.nameArticle
   
  // })
  // ARTICLE.save((err, article)=>{
  //   if (err) {
  //     console.log(err.message);
  //     return res.json({
  //       success:false,
  //       msg: "Something wrong in save article."
  //     })
  //   }
  //     res.json({
  //     success: true,
  //     msg: "Article successfully saved.",
  //     article
  //   })
  // })
})

router.post('/viewMyArticles',(req, res) => {
    Article.find({author: req.user._id}, function (err, articles) {
        if (err){
            console.log(err.message);
            return res.json({
              success:false,
              msg: "Something wrong in find articles."
            })
        }
        // console.log(articles)

        res.json({
            success: true,
            articles
          })
    })
    .populate('author');
})


router.post('/editProfile', (req,res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password || !req.body.phone || !req.body.sex) {
    return res.json({
        success: false,
        msg: "Empty filed"
      })
    }
  const RESULT=req.body;
User.updateOne({_id:req.user._id}, {firstname : RESULT.firstname, lastname : RESULT.lastname, username : RESULT.username,  password : RESULT.password, phone : RESULT.phone, sex: RESULT.sex, role: RESULT.role}, (err, user) => {
  if (err) {
    console.log(err.message);
    return res.json({
      success:false,
      msg: "Something wrong in save article."
    })
  }
  res.json({
    success: true,
    msg: "Profile successfully edited.",
    RESULT
  })
})

})


module.exports = router;