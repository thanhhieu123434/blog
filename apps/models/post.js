var q = require("q");
// Require database trong thư mục database
var db = require("../common/database");
// Lấy connection trong database
var conn = db.getConnection();

function getAllPosts(){
  var defer = q.defer();
  // selection tất cả các bài post không cần điều kiện nào cả
  var query = conn.query("SELECT * FROM posts",(err,posts)=>{
    if(err){
      defer.reject(err);
    }
    else{
      defer.resolve(posts);
    }
  });
  return defer.promise;
}

function addPost(params){
  if(params){
    console.log(params.title);
    var defer = q.defer();
    var query = conn.query("INSERT INTO posts SET ?",params,(err,result)=>{
      if(err){
        defer.reject(err);
      }
      else{
        defer.resolve(result);
      }
    });
    return defer.promise;
  }
  else{
      return false;
  }
}

function getPostById(id){
  var defer = q.defer();
  // selection tất cả các bài post không cần điều kiện nào cả
  var query = conn.query("SELECT * FROM posts WHERE ?",{id:id},(err,posts)=>{
    if(err){
      defer.reject(err);
    }
    else{
      defer.resolve(posts);
    }
  });
  return defer.promise;
}

function updatePost(params){
  if(params){
    var defer = q.defer();
    var query = conn.query("UPDATE posts SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?",[params.title,params.content,params.author,new Date(),params.id],(err,result)=>{
      if(err){
        defer.reject(err);
      }
      else{
        defer.resolve(result);
      }
    });
    return defer.promise;
  }
  else{
    return false;
  }
}

function deletePost(id){
  if(id){
    var defer = q.defer();
    var query = conn.query("DELETE FROM posts WHERE id = ?",[id],(err,result)=>{
      if(err){
        defer.reject(err);
      }
      else{
        defer.resolve(result);
      }
    });
    return defer.promise;
  }
  else{
    return false;
  }
}
 module.exports = {
   "getAllPosts" : getAllPosts,
   "addPost" : addPost,
   "getPostById" : getPostById,
   "updatePost" : updatePost,
   "deletePost" : deletePost
 }
