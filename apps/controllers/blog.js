// Blog.js Xây dựng những bài hiển thi cho người dùng xem
var express = require("express");

var router = express.Router();

var post_md = require("../models/post");

router.get("/",(req,res)=>{
  //res.json({"message":"This is Blog Page"});
  var data = post_md.getAllPosts();

  data.then((posts)=>{
    var result = {
      posts : posts,
      error : false
    };
      res.render("blog/index",{data:result});
  }).catch((err)=>{
    var result = {
      error : "Could not get data"
    };
    res.render("blog/index",{data:result});
  });
});

router.get("/post/:id",(req,res)=>{
  var data = post_md.getPostById(req.params.id);
  data.then((posts)=>{
    var post = posts[0];
    var result = {
      post : post,
      error: false
    };
    res.render("blog/post", {data:result});
  }).catch((err)=>{
    var result = {
      error : "Could not get post detail"
    };
    res.render("blog/post",{data:result});
  });
});

router.get("/about",(req,res)=>{
  res.render("blog/about");
});


module.exports = router;
