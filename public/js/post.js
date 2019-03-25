// bắt sự kiện put để cập nhập dữ liệu

function Post(){
  function bindEvent(){
    // bắt sự kiện click vào nút edit
    $(".post_edit").click(function(e){
      var params = {
        id: $(".id").val(),
        title: $(".title").val(),
        //lấy content ra hơi đặc biệt vì dùng tinymce
        content: tinymce.get("content").getContent(),
        author: $(".author").val()
      };

      // Lấy domain ra
      //location.protocol => lấy http:
      var base_url = location.protocol + "//" + document.domain + ":" + location.port;
      //Dùng ajax để call
      $.ajax({
        url: base_url + "/admin/post/edit",
        type: "PUT",
        data: params,
        dataType: "json",
        success: function(res){
          if(res && res.status_code == 200){
            location.reload();
          }
        }
      });
    });
    // bắt sự kiện click vào nút delete
    $(".post_delete").click(function(e){
      var post_id = $(this).attr("post_id");
      var base_url = location.protocol + "//" + document.domain + ":" + location.port;
      $.ajax({
        url: base_url + "/admin/post/delete",
        type: "DELETE",
        data: {id : post_id},
        dataType: "json",
        success: function(res){
          if(res && res.status_code == 200){
            location.reload();
          }
        }
      });
    });
  }
  bindEvent();
}

$(document).ready(function(){
  new Post();
});
