$(function () {
    //
  countAction(2);
    //
   countAction(4);

   var data1 = Number($(".sendOrder .badge-success").text());
   var data2 = Number($(".noOrder .badge-info").text());
   console.log("data1--->"+data1);
   $(".totalInfo").append("<span class=\"layui-badge\">"+(data1+data2)+"</span>")

});


function countAction(orderStatus) {
    var object = {"orderStatus":orderStatus};
    $.ajax({
        type: 'post',
        url: "/order/countOrderActionByMap",
        dataType: 'json',
        async:false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(object),
        // 请求成功的回调
        success: function (data){
            if(data>0&&orderStatus==4){
                $(".sendOrder").append("<span class=\"pull-right badge badge-success\">+"+data+"</span>");
            }
            if(data>0&&orderStatus==2){
                $(".noOrder").append("<span class=\"pull-right badge badge-info\">+"+data+"</span>");
            }
        }
    });

    }