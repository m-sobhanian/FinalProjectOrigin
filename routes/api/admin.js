var express = require('express');
var router = express.Router();
const User = require('../../models/user');
const Article = require('../../models/article');
// const Comment = require('../../models/comment')
// const multer = require("multer");
// const path=require('path');
const fs = require('fs');

// const storage = multer.diskStorage({
//   destination: "./public/uploads/article",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// }).single("pic");


// const storageEditAvatar = multer.diskStorage({
//   destination: "./public/uploads/avatar",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

// const uploadEditAvatar = multer({
//   storage: storageEditAvatar,
//   limits:{fileSize: 1000000},
// }).single("pic");


router.post('/ViewAllUsers', (req,res) => {
    User.find({}, (err, users) => {
        if(err){
            console.log(err.message);
            return res.json({
                success: false,
                msg: 'Something wrong in find users'
            })
        }
        res.json({
            success: true,
            msg: 'Users successfully find.',
            users
        })
    })
})

router.post('/deleteUser', (req,res) => {

    if (!req.body) {
  return res.json({
    success: false,
    msg: "Empty filed"
  })
}

const ID_USER=req.body.idUser
User.deleteOne({_id:ID_USER}, (err) => {
  if (err) {
    console.log(err.message);
    return res.json({
      success:false,
      msg: "Something wrong in delete user."
    })
  }
  const img=req.body.pic;
  const path = 'public/uploads/avatar/' + img; 
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err)
      return
    }
  
    //file removed
  })
  Article.remove({author: ID_USER}, (err)=> {
    if (err) {
        console.log(err.message);
        return res.json({
          success:false,
          msg: "Something wrong in delete articles."
        })
      }
      res.json({
        success: true,
        msg: "User and Articles successfully deleted.",
        
      })
  })
  
})

})


module.exports = router;


