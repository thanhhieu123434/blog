//Index.js không làm j nghiệp vụ cả, đơn giản là include 2 file admin.js và
//blog.js vào => để app.js có thể nhận được.

var express = require("express");

var router = express.Router();

// Xây dựng router, đường dẫn admin, sử dựng file admin, __dirname sẽ trả về thư
//mục chứa file index.js
router.use("/admin",require(__dirname + "/admin.js"));

// Xây dựng router, đường dẫn blog, sử dựng file blog, __dirname sẽ trả về thư
//mục chứa file index.js
router.use("/blog",require(__dirname + "/blog.js"));

router.get("/",(req,res)=>{
  //res.json({"message":"This is Home Page"});
  res.render("test");
});

router.get("/chat",(req,res)=>{
  res.render("chat");
});
// Export router ra

module.exports = router;
