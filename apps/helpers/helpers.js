// Hash passwd
var bcryptjs = require("bcryptjs");

var config = require("config");

function hash_password(password){
  // độ dài key
  var saltRounds = config.get("salt");

  var salt = bcryptjs.genSaltSync(saltRounds);
  var hash = bcryptjs.hashSync(password, salt);
  return hash;
}

// giải mã password: truyền vào password nhập vào và mã hash trong db
// nếu trong hash có chứa password thì return true, nếu không thì return false
function compare_password(password,hash){
  // return true nếu hash có chứa password
  // return false nếu hash không có chứa password
  return bcryptjs.compareSync(password, hash);
}
module.exports = {
  "hash_password" : hash_password,
  "compare_password" : compare_password
}
