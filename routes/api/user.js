var express = require('express');
var router = express.Router();
const User = require('../../models/user');
const Article = require('../../models/article');

// router.post('/whoAmI', (req, res)=>{
//     User.findById(req.user._id, (err, user)=>{
//         if(err){
//             return res.json({
//                 success: false,
//                 msg: "something wrong in get user info\n" + err.message
//             })
//         }
//         res.json({
//             success: true,
//             user
//         })
//     })
// })

router.post('/newArticle', (req,res) => {
    if (!req.body.nameArticle || !req.body.abstract || !req.body.textArticle || !req.body.dateArticle) {
        return res.json({
          success: false,
          msg: "empty filed"
        })
      }
    const RESULT=req.body;
    const ARTICLE = new Article({
        name : RESULT.nameArticle,
        author: req.user._id,
        shortTxt : RESULT.abstract,
        longTxt : RESULT.textArticle,
        date : RESULT.dateArticle,
        link: RESULT.nameArticle
   
  })
  ARTICLE.save((err, article)=>{
    if (err) {
      console.log(err.message);
      return res.json({
        success:false,
        msg: "something wrong in save article."
      })
    }
      res.json({
      success: true,
      msg: "Article successfully saved.",
      article
    })
  })
})

router.post('/viewMyArticles',(req, res) => {
    Article.find({author: req.user._id}, function (err, articles) {
        if (err){
            console.log(err.message);
            return res.json({
              success:false,
              msg: "something wrong in find articles."
            })
        }
        console.log(articles)

        res.json({
            success: true,
            articles
          })
    })
    .populate('author');
})

module.exports = router;