$(function () {

    countOrders();
    productCount();
    messageCount();
    userCount();
});


/**
 *
 * */
function countOrders() {
    console.log("11111111111");
    $.ajax({
        url:"/order/totalOrders",
        dataType:"json",
        type: "POST",
        success : function (data){
            console.log("data--->"+data);
            $("#orderCount").text(data);
        },error : function (data){
            console.log(data.responseText);

        }
    })
}


/**
 *
 * */
function productCount() {
    $.ajax({
        url:"/LssgProduct/productCount",
        dataType:"json",
        type: "POST",
        success : function (data){
            console.log("data--->"+data);
            $("#productCount").text(data);
        },error : function (data){
            console.log(data.responseText);

        }
    })
}



/**
 *
 * */
function messageCount() {
    $.ajax({
        url:"/message/messageCount",
        dataType:"json",
        type: "POST",
        success : function (data){
            console.log("data--->"+data);
            $("#messageCount").text(data);
        },error : function (data){
            console.log(data.responseText);

        }
    })
}

/**
 *
 * */
function userCount() {
    $.ajax({
        url:"/userLoginInfo/userCount",
        dataType:"json",
        type: "POST",
        success : function (data){
            console.log("data--->"+data);
            $("#userCount").text(data);
        },error : function (data){
            console.log(data.responseText);

        }
    })
}