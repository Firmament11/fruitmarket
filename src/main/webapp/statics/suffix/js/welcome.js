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
    $.ajax({
        url:"/order/totalOrders",
        dataType:"json",
        type: "POST",
        success : function (data){
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
            $("#productCount").text(data);
        },error : function (data){

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
            $("#messageCount").text(data);
        },error : function (data){

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
            $("#userCount").text(data);
        },error : function (data){

        }
    })
}