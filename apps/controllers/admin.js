// Admin.js chính là router cho admin => quản lý các file blog
var express = require("express");

var router = express.Router();

var user_md = require("../models/user");

var helpers = require("../helpers/helpers");

var post_md = require("../models/post");



//Viết 1 router đơn giản cho admin
router.get("/",(req,res)=>{
  if(req.session.user){
    //res.json({"message":"This is Admin Page"});
    // Lấy data post ra
    var data = post_md.getAllPosts();
    data.then((posts)=>{
      var data = {
        posts: posts,
        error: false
      };
      res.render("admin/dashboard",{data:data});
    }).catch(err=>{
      res.render("admin/dashboard",{data:{error: "Get post data is error"}});
    });
  }
  else{
    res.redirect("/admin/signin")
  }
});

router.get("/signup",(req,res)=>{
  res.render("signup",{data:{}});
});

// Lấy các thông tin mà user điền trong form
router.post("/signup",(req,res)=>{
  var user = req.body;
  if(user.email.trim().length == 0){
    res.render("signup",{data:{error:"Email is required"}});
  }
  if(user.passwd != user.repasswd && user.passwd.trim().length != 0){
    res.render("signup",{data:{error:"Password is not Match"}});
  }
  //  mã hóa mật khẩu
  var password1 = helpers.hash_password(user.passwd);
  user = {
    email : user.email,
    password : password1,
    first_name : user.firstname,
    last_name : user.lastname
  }
  var result = user_md.addUser(user);

  result.then((data)=>{
    //res.json({message:"Insert Success"});
    //chuyển hướng sang trang signin: redirect
    res.redirect("/admin/signin");
  }).catch((err)=>{
    res.render("signup",{data:{error:"error"}});
  });

});

// Signin
router.get("/signin",(req,res)=>{
  res.render("signin",{data:{}});
})

router.post("/signin",(req,res)=>{
  var param = req.body;
  if(param.email.trim().length==0){
    res.render("signin",{data:{error:"Please Enter an email"}});
  }
  else{
    // hàm này được viết trong user
    data = user_md.getUserByEmail(param.email);
    if(data){
      data.then((users)=>{
        // Câu lệnh SELECT luôn trả về một mảng các users
        var user = users[0];
        var status = helpers.compare_password(param.password,user.password);
        if(!status){
          res.render("signin",{data:{error:"Password Wrong"}});
        }
        else{
          // Khi đăng nhập thành công, đẩy data user vào trong session của chúng ta
          req.session.user = user;
          console.log(req.session.user);
          // Khi đăng nhập thành công thì chuyển hướng sang trang chủ admin
          res.redirect("/admin");
        }
      })
    }
    else{
      res.render("signin",{data:{error:"User not exists"}})
    }
  }
});

router.get("/post/new",(req,res)=>{
  if(req.session.user){
    res.render("admin/post/new",{data:{error:false}});
  }
  else{
    res.redirect("/admin/signin")
  }
});

router.post("/post/new",(req,res)=>{
  var params = req.body;
  var now = new Date();
  if(params.title.trim().length==0){
    var data = {
      error:"Please Enter a Title"
    };
    res.render("admin/post/new",{data:data});
  }
  else{
    // params.created_at = now;
    // params.updated_at = now;
    params = {
      title : params.title,
      content : params.content,
      author : params.author,
      created_at : now,
      updated_at : now
    }

    var data = post_md.addPost(params);

    data.then((result)=>{
      res.redirect("/admin");
    }).catch((err)=>{
      var data = {
        error : "Could not insert post"
      };
      res.render("admin/post/new",{data:data});
    });
  }
});

//:id dùng để nhận parameter
router.get("/post/edit/:id",(req,res)=>{
  if(req.session.user){
    var params = req.params;
    var id = params.id;
    var data = post_md.getPostById(id);
    if(data){
      data.then((posts)=>{
        var post = posts[0];
        var data = {
          post : post,
          error : false
        };
        res.render("admin/post/edit",{data:data});
      }).catch(err=>{
        var data = {
          error : "Could not get Post by Id"
        };
        res.render("admin/post/edit",{data:data});
      });
    }
    else{
      var data = {
        error : "Could not get Post by Id"
      };
      res.render("admin/post/edit",{data:data});
    }
  }
  else{
    res.redirect("/admin/signin");
  }
});

router.put("/post/edit",(req,res)=>{
  var params = req.body;
  data = post_md.updatePost(params);

  if(!data){
    res.json({status_code: 500});
  }
  else{
    data.then((result)=>{
      res.json({status_code: 200});
    }).catch((err)=>{
      res.json({status_code: 500});
    });
  }
});


router.delete("/post/delete",(req,res)=>{
  var post_id = req.body.id;

  var data = post_md.deletePost(post_id);

  if(!data){
    res.json({status_code: 500});
  }
  else{
    data.then((result)=>{
      res.json({status_code: 200});
    }).catch((err)=>{
      res.json({status_code: 500});
    });
  }
});

router.get("/post",(req,res)=>{
  if(req.session.user){
    res.redirect("/admin");
  }
  else{
    res.redirect("/admin/signin");
  }
})


router.get("/user",(req,res)=>{
  if(req.session.user){
    var data = user_md.getAllUsers();
    data.then((users)=>{
      var data = {
        users : users,
        error : false
      };
      res.render("admin/user",{data:data});
    }).catch((err)=>{
      var data = {
        error : "Coule not get users"
      };
      res.render("admin/user",{data:data});
    });
  }
  else{
    res.redirect("/admin/signin");
  }
})
module.exports = router;
