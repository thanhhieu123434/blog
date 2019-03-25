module.exports = function(io){
  io.on("connection",(socket)=>{
    var usernames = [];
    console.log("Have a new user connected");
    // Nghe sự kiện adduser
    socket.on("adduser",(username)=>{
      socket.username = username;
      usernames.push(username);
      //Notify đến người gửi( chỉ một người thôi): socket.emit
      var data = {
        sender : "SERVER",
        message : "You have joind chat room"
      };
      socket.emit("update_message",data);
      // Notify đến những người khác: socket.broadcast.emit
      var data = {
        sender : "SERVER",
        message : username + " have joined chat room"
      };
      socket.broadcast.emit("update_message",data);
      // Nghe sự kiện send_message
      socket.on("send_message",(message)=>{
        // Gửi message đến chính bản thân người chat
        var data = {
          sender : "You",
          message : message
        };
        socket.emit("update_message",data);
        // Gửi message đến những người còn lại
        var data = {
          sender : socket.username,
          message : message
        };
        socket.broadcast.emit("update_message",data);
      });
      // Nghe sự kiện disconnect
      socket.on("disconnect",()=>{
        //Delete user name trong mảng username
        for(var i=0;i<usernames.length;i++){
          if(usernames[i] == socket.username){
            usernames.splice(i,1);
          }
        }
        // Notify đến những user khác user này đã thoát
        var data = {
          sender: "SERVER",
          message : socket.username + " has left chat room"
        };
        socket.broadcast.emit("update_message",data);
      });
    });
  });
}
