var q = require("q");
// Require database trong thư mục database
var db = require("../common/database");
// Lấy connection trong database
var conn = db.getConnection();


function addUser(user){
  if(user){
    var defer = q.defer();
    // ? sẽ nhận đối tuowngk là user
    var query = conn.query("INSERT INTO users SET ?",user,function(err,result){
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

function getUserByEmail(email){
  if(email){
    var defer = q.defer();
    // ? sẽ nhật object đối tương là email = email
    var query = conn.query("SELECT * FROM users WHERE ?",{email:email},(err,result)=>{
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

function getAllUsers(){
  var defer = q.defer();
  var query = conn.query("SELECT * FROM users",(err,users)=>{
    if(err){
      defer.reject(err);
    }
    else{
      defer.resolve(users);
    }
  });
  return defer.promise;
}

module.exports = {
  "addUser" : addUser,
  "getUserByEmail" : getUserByEmail,
  "getAllUsers" : getAllUsers
}
