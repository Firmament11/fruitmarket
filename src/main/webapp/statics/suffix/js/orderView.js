$(function () {
    var orderId = getQueryVariable("orderId");
    showOrder(orderId);

});

/**
 *
 * */
function showOrder(orderId) {
    $.ajax({
        url:"/order/findOneOrderByOrder",
        data:{
            "orderId":orderId
        },
        type: 'post',
        traditional: true,
        dataType: "JSON",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {

            var orderBase = "";
            var addressInfo = "";
            var productList = "";
            var productPrice = "";
            $('.orderStu').html('');
            if(data.lssgOrderAction.orderStatus==1){
                $('.orderStu').html("已完成")
            }else if(data.lssgOrderAction.orderStatus==2){
                $('.orderStu').html("已取消")
            } else if(data.lssgOrderAction.orderStatus==3){
                $('.orderStu').html("待支付")
            } else if(data.lssgOrderAction.orderStatus==4){
                $('.orderStu').html("待发货")
            } else if(data.lssgOrderAction.orderStatus==5){
                $('.orderStu').html("待收货")
            }

            //
            orderBase = "<tr>\n" +
                "                    <td>"+data.orderId+"</td>\n" +
                "                    <td>"+data.lssgUserLogin.userName+"</td>\n" +
                "                    <td>"+data.paymentName+"</td>\n" +
                "                    <td>"+data.lssgOrderAction.shoppingStatus+"</td>\n" +
                "                </tr>";
            $('#orderBase').append(orderBase);

            //
            addressInfo = "<tr>\n" +
                "                    <td>"+data.lssgAddress.addressUserName+"</td>\n" +
                "                    <td>"+data.lssgAddress.addressTel+"</td>\n" +
                "                    <td>"+data.lssgAddress.addressName+"</td>\n" +
                "                    <td>"+data.lssgAddress.addressAddr+"</td>\n" +
                "                </tr>";
            $("#addressInfo").append(addressInfo);

            //"++"
            for(var i=0;i<data.lssgOrderItemList.length;i++){
                productList += "<tr>\n" +
                    "                    <td><img src='http://localhost:8080/uploadfiles/productImg/"+data.lssgOrderItemList[i].lssgProduct.productPhoto+"' style='width: 60px;height: 60px;'></td>\n" +
                    "                    <td>"+data.lssgOrderItemList[i].lssgProduct.productName+"</td>\n" +
                    "                    <td>"+data.lssgOrderItemList[i].lssgProduct.productMallPrice+"</td>\n" +
                    "                    <td>"+data.lssgOrderItemList[i].orderProductNum+"</td>\n" +
                    "                    <td>"+data.lssgOrderItemList[i].subtotalPrice+"</td>\n" +
                    "                </tr>";
            }
            $("#productList").append(productList);

            //
            productPrice = "<tr>\n" +
                "                    <td>"+data.orderTotalPrice+"</td>\n" +
                "                    <td>"+data.lssgOrderAction.orderPayStatus+"</td>\n" +
                "                    <td>"+data.orderTotalPrice+"</td>\n" +
                "                    <td>"+data.orderTotalPrice+"</td>\n" +
                "                </tr>";

            $("#productPrice").append(productPrice);


        }
    });
}





/**
 * 获取地址栏上的参数
 * */
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

