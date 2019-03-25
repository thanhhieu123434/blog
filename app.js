var express = require("express");
// Dùng module config để cài thông tin cấu hình cho hệ thống 1 cách tự động
// Như là port hệ thông nghe, sẽ được cấu hình trong thư mục config chứ không
// phải hash code như ban đầu
var config = require("config");
// Dùng module body-parser để lấy thông tin từ form người dùng gửi lên bằng
//method post
var bodyParser = require("body-parser");
// Dùng module express-session để quản lý các session trong js
var session = require("express-session");

var app = express();

//body parser: sẽ decoded cái body trong form ra dạng JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Cấu hình cho express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // false để có thể lưu dữ liệu khác vào cookie
}))


//cấu hình ejs: tham số thứ nhất là thư mục tên views, tham số thứ 2 là đường
//dẫn tuyệt đối
app.set("views",__dirname + "/apps/views");
//setup ejs là template engine mặc định, sau câu lệnh dưới đây thì tất cả các
//file có phần mở rộng là ejs trong thư mục views đêu có thể được render ra
//trong biến response
app.set("view engine","ejs");
//Static folder, cấu hình cho express nhận thư mục public là static folder cho
//project. Để truy cập vào những file trong này, chúng ta sẽ sử dụng router là
// /static/css hay /static/imgs hay /static/js,...
app.use("/static",express.static(__dirname+"/public"));
// Tạo router trong controler, sau đó include router vào trong app.js
// Biến __dirname sẽ return thư mục hiện tại mà app.js nằm
var controllers = require(__dirname + "/apps/controllers");
// Include vào trong app.js bằng app.use
app.use(controllers);

//lấy host trong file default.json trong thư mục config
var host = config.get("server.host");
//lấy port trong file default.json trong thư mục config
var port = config.get("server.port");

var server = require("http").Server(app);

server.listen(3000,()=>{
  console.log("Server is running at port: " + port);
});

var io = require("socket.io")(server);

var socketcontrol = require("./apps/common/socketcontrol")(io);
