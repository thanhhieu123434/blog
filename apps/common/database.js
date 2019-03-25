//Lấy thông số config về mysql của chúng ta
var config = require("config");
//Require mysql vào
var mysql = require("mysql");

// Tạo kết nối đền mysql
var connection = mysql.createConnection({
  host     : config.get("mysql.host"),
  user     : config.get("mysql.user"),
  password : config.get("mysql.password"),
  database : config.get("mysql.database"),
  port : config.get("mysql.port")
});


// Kết nối với Mysql
connection.connect();

function getConnection(){
  //Nếu chưa có connection
  if(!connection){
    connection.connect();
  }
  return connection;
}

module.exports = {
  "getConnection" : getConnection
}
