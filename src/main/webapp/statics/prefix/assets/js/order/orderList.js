var currentPage = 1;
$(function () {

    var total = getListData(currentPage) ;
    console.log("total--->"+total);




});

function getListData(currentPage) {
    $.ajax({
        url:"/order/showAllOrder",
        dataType:"json",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        data:{
            currentPage:currentPage,
            pageSize:2
        },
        success : function (data){
            var orderListUl = "";
            var orderTab = "";
            var orderProductList = "";
            total = data.total;
            if(total>0){
                $('.main_con .orders').html('');

                for(var i=0;i<data.list.length;i++) {
                    //订单头部信息
                    orderListUl = "<ul class=\"order_list_th w978 clearfix\">\n" +
                        "                    <li class=\"col01\">下单时间："+showTime(data.list[i].doOrderTime)+"</li>\n" +
                        "                    <li class=\"col02\">订单号："+data.list[i].orderId+"</li>\n" +
                        "                    <li class=\"col02 stress\">"+data.list[i].lssgOrderAction.orderPayStatus+"</li>\n" +
                        "                    <li class=\"col01 payTime\">支付时间："+showTime(data.list[i].lssgOrderAction.lastPayTime)+"</li>\n" +
                        "                </ul>";



                    //
                    orderTab = "<table class=\"order_list_table w980\">\n" +
                        "                    <tbody>\n" +
                        "                    <tr>\n" +
                        "                        <td width=\"55%\" class=\"orderProductList\">\n" +
                        "                            \n" +
                        "                        </td>\n" +
                        "                        <td width=\"11.25%\">"+Number(data.list[i].orderTotalPrice).toFixed(2)+"</td>\n" +
                        "                        <td width=\"11.25%\">"+(data.list[i].lssgAddress.addressUserName=='undefined'?data.list[i].lssgUserLogin.userName:data.list[i].lssgAddress.addressUserName)+"</td>\n" +
                        "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                        "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                        "                        <td width=\"11.25%\" class='stute'><a href=\"#\" class=\"oper_btn\"></a></td>\n" +
                        "                    </tr>\n" +
                        "                    </tbody>\n" +
                        "                </table>";

                    $('.main_con .orders').append(orderListUl);
                    $('.main_con .orders').append(orderTab);

                    if(data.list[i].lssgOrderAction.orderPayStatus=='已支付'){
                        ($('.payTime').eq(i)).show();
                        if(data.list[i].lssgOrderAction.shoppingStatus=='已发货'){
                            $(".stute a").eq(i).text("待收货")
                        }else{
                            //$(".stute a").eq(i).text("提醒发货")
                            $(".stute a").eq(i).hide()
                        }
                        //$(".stute a").eq(i).attr("href","#")

                    }else{
                        ($('.payTime').eq(i)).hide();
                        $(".stute a").eq(i).text("去支付");
                        $(".stute a").eq(i).attr("href","/beforePage/toOrderSuccess?orderId="+data.list[i].orderId+"&paymentId="+data.list[i].lssgPayment.paymentId);
                    }
                    $.each(data.list[i].lssgOrderItemList,function (j,value){
                        orderProductList = "<ul class=\"order_goods_list clearfix\">\n" +
                            "                                <li class=\"col01\"><img src=\"/uploadfiles/productImg/"+value.lssgProduct.productPhoto+"\"></li>\n" +
                            "                                <li class=\"col02\">"+value.lssgProduct.productName+"&nbsp;&nbsp;<i>"+value.lssgProduct.productMallPrice+"/kg</i></li>\n" +
                            "                                <li class=\"col03\">"+value.orderProductNum+"</li>\n" +
                            "                                <li class=\"col04\">"+Number(value.subtotalPrice).toFixed(2)+"元</li>\n" +
                            "                            </ul>";

                        ($(".orderProductList").eq(i)).append(orderProductList);
                    });
                }
                $('.category #allOrders').html('');
                if(total>0){
                    $('.category #allOrders').append("全部订单<em>"+total+"</em>");
                }else{
                    $('.category #allOrders').append("全部订单");
                }
            }else{
                $('.category #allOrders').style.visibility='hidden'
            }

        },error : function (data){
            console.log(data.responseText);
        }
    });
    return total;
}

layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;


    //自定义样式
    laypage.render({
        elem: 'demo2'
        ,count: total
        ,limit:2
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){

            //首次不执行
            if(!first){
                //清空以前加载的数据
                //$(".t").html("");
                //
                getListData(obj.curr)
                //do something
            }
        }
    });


});

//时间转换函数
function showTime(tempDate)
{
    var d = new Date(tempDate);
    var year = d.getFullYear();
    var month = d.getMonth();
    month++;
    var day = d.getDate();
    var hours = d.getHours();

    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    month = month<10 ? "0"+month:month;
    day = day<10 ? "0"+day:day;
    hours = hours<10 ? "0"+hours:hours;
    minutes = minutes<10 ? "0"+minutes:minutes;
    seconds = seconds<10 ? "0"+seconds:seconds;

     var time = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    return time;
}

/**
 *
 * */

var total1 =showOrderListByAction(currentPage);
function showOrderListByAction(currentPage) {
    $.ajax({
        url:"/order/showAllOrderByNoPay",
        dataType:"json",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        data:{
            currentPage:currentPage,
            pageSize:2,
            "orderPayStatus":"未支付"
        },
        success : function (data){
            total1 = data.total;
            if(total1>0){
               var orderListUl = "";
               var orderTab = "";
               var orderProductList = "";

               $('.ordersWithNoPay').html('');

               for(var i=0;i<data.list.length;i++) {

                   //订单头部信息
                   orderListUl = "<ul class=\"order_list_th w978 clearfix\">\n" +
                       "                    <li class=\"col01\">下单时间："+showTime(data.list[i].doOrderTime)+"</li>\n" +
                       "                    <li class=\"col02\">订单号："+data.list[i].orderId+"</li>\n" +
                       "                    <li class=\"col02 stress\">"+data.list[i].lssgOrderAction.orderPayStatus+"</li>\n" +
                       "                </ul>";

                   orderTab = "<table class=\"order_list_table w980\">\n" +
                       "                    <tbody>\n" +
                       "                    <tr>\n" +
                       "                        <td width=\"55%\" class=\"orderProductList1\">\n" +
                       "                            \n" +
                       "                        </td>\n" +
                       "                        <td width=\"11.25%\">"+Number(data.list[i].orderTotalPrice).toFixed(2)+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                       "                        <td width=\"11.25%\"  class='stute'><a href=\"#\" class=\"oper_btn\">去支付</a></td>\n" +
                       "                    </tr>\n" +
                       "                    </tbody>\n" +
                       "                </table>";

                   $('.ordersWithNoPay').append(orderListUl);
                   $('.ordersWithNoPay').append(orderTab);

                   if(data.list[i].lssgOrderAction.orderPayStatus=='已支付'){
                       ($('.payTime').eq(i)).show();
                       if(data.list[i].lssgOrderAction.shoppingStatus=='已发货'){
                           $(".stute a").eq(i).text("待收货")
                       }else{
                           $(".stute a").eq(i).text("提醒发货")
                       }

                   }else{
                       ($('.payTime').eq(i)).hide();
                       $(".stute a").eq(i).text("去支付");
                       $(".stute a").eq(i).attr("href","/beforePage/toOrderSuccess?orderId="+data.list[i].orderId+"&paymentId="+data.list[i].lssgPayment.paymentId);
                   }

                   $.each(data.list[i].lssgOrderItemList,function (j,value){
                       orderProductList = "<ul class=\"order_goods_list clearfix\">\n" +
                           "                                <li class=\"col01\"><img src=\"/uploadfiles/productImg/"+value.lssgProduct.productPhoto+"\"></li>\n" +
                           "                                <li class=\"col02\">"+value.lssgProduct.productName+"&nbsp;&nbsp;<i>"+value.lssgProduct.productMallPrice+"/kg</i></li>\n" +
                           "                                <li class=\"col03\">"+value.orderProductNum+"</li>\n" +
                           "                                <li class=\"col04\">"+Number(value.subtotalPrice).toFixed(2)+"元</li>\n" +
                           "                            </ul>";

                       ($(".orderProductList1").eq(i)).append(orderProductList);
                   });
               }
               $('.category #noPayLi').html('');
               if(total1>0){
                   $('.category #noPayLi').append("待付款<em>"+total1+"</em>");
               }else{
                   $('.category #noPayLi').append("待付款");
               }
           }else{
               $('.category #noPayLi').style.visibility='hidden'
           }

        },error : function (data){
            console.log(data.responseText);

        }
    });
    return total1;
}

layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;


    //自定义样式
    laypage.render({
        elem: 'demo3'
        ,count: total1
        ,limit:2
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){
            //首次不执行
            if(!first){
                //清空以前加载的数据
                //$(".t").html("");
                //
                showOrderListByAction(obj.curr)
                //do something
            }
        }
    });


});


/**
 *
 * */

var total2 =showOrderListByActionNoSend(currentPage);
function showOrderListByActionNoSend(currentPage) {
    $.ajax({
        url:"/order/showAllOrderByNoPay",
        dataType:"json",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        data:{
            currentPage:currentPage,
            pageSize:2,
            "shoppingStatus":"未发货"
        },
        success : function (data){

            total2 = data.total;

           if(total2>0){
               var orderListUl = "";
               var orderTab = "";
               var orderProductList = "";

               $('.ordersWithNoSend').html('');
               for(var i=0;i<data.list.length;i++) {
                   //订单头部信息
                   orderListUl = "<ul class=\"order_list_th w978 clearfix\">\n" +
                       "                    <li class=\"col01\">下单时间："+showTime(data.list[i].doOrderTime)+"</li>\n" +
                       "                    <li class=\"col02\">订单号："+data.list[i].orderId+"</li>\n" +
                       "                    <li class=\"col02 stress\">"+data.list[i].lssgOrderAction.orderPayStatus+"</li>\n" +
                       "                    <li class=\"col01 payTime\">"+(data.list[i].lssgOrderAction.lastPayTime!=null?'支付时间：'+showTime(data.list[i].lssgOrderAction.lastPayTime):'')+"</li>\n" +
                       "                </ul>";

                   //
                   orderTab = "<table class=\"order_list_table w980\">\n" +
                       "                    <tbody>\n" +
                       "                    <tr>\n" +
                       "                        <td width=\"55%\" class=\"orderProductList2\">\n" +
                       "                            \n" +
                       "                        </td>\n" +
                       "                        <td width=\"11.25%\">"+Number(data.list[i].orderTotalPrice).toFixed(2)+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                       "                    </tr>\n" +
                       "                    </tbody>\n" +
                       "                </table>";

                   $('.ordersWithNoSend').append(orderListUl);
                   $('.ordersWithNoSend').append(orderTab);

                   /*($('.payTime').eq(i)).hide();
                   if(data.list[i].lssgOrderAction.orderPayStatus=='已支付'){
                       ($('.payTime').eq(i)).show();
                       if(data.list[i].lssgOrderAction.shoppingStatus=='已发货'){
                           //$(".stute a").eq(i).text("待收货")
                       }else{
                           $(".stute a").eq(i).text("提醒发货")
                       }

                   }else{
                       ($('.payTime').eq(i)).hide();
                       $(".stute a").eq(i).text("去支付");
                       $(".stute a").eq(i).attr("href","/beforePage/toOrderSuccess?orderId="+data.list[i].orderId+"&paymentId="+data.list[i].lssgPayment.paymentId);
                   }*/
                   $.each(data.list[i].lssgOrderItemList,function (j,value){

                       orderProductList = "<ul class=\"order_goods_list clearfix\">\n" +
                           "<li class=\"col01\"><img src=\"/uploadfiles/productImg/"+value.lssgProduct.productPhoto+"\"></li>\n" +
                           "<li class=\"col02\">"+value.lssgProduct.productName+"&nbsp;&nbsp;<i>"+value.lssgProduct.productMallPrice+"/kg</i></li>\n" +
                           "<li class=\"col03\">"+value.orderProductNum+"</li>\n" +
                           "<li class=\"col04\">"+Number(value.subtotalPrice).toFixed(2)+"元</li>\n" +
                           "</ul>";

                       ($(".orderProductList2").eq(i)).append(orderProductList);
                   });
               }
               $('.category #noSendLi').html('');
               if(total2>0){
                   $('.category #noSendLi').append("待发货<em>"+total2+"</em>");
               }else{
                   $('.category #noSendLi').append("待发货");
               }
           }else{
               $('.category #noPayLi').style.visibility='hidden'
           }
        },error : function (data){
            console.log(data.responseText);

        }
    });
    return total2;
}

layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;


    //自定义样式
    laypage.render({
        elem: 'demo4'
        ,count: total2
        ,limit:2
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){

            //首次不执行
            if(!first){
                //清空以前加载的数据
                //$(".t").html("");
                //
                showOrderListByActionNoSend(obj.curr)
                //do something
            }
        }
    });


});
/**
 *
 * */
var total3 =showOrderListByActionNoSouHuo(currentPage);
function showOrderListByActionNoSouHuo(currentPage) {
    $.ajax({
        url:"/order/showAllOrderByNoPay",
        dataType:"json",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        data:{
            currentPage:currentPage,
            pageSize:2,
            "shoppingStatus":"已发货"
        },
        success : function (data){

            total3 = data.total;
           if (total3>0){

               var orderListUl = "";
               var orderTab = "";
               var orderProductList = "";

               $('.ordersWithNoCompl').html('');

               for(var i=0;i<data.list.length;i++) {

                   //订单头部信息
                   orderListUl = "<ul class=\"order_list_th w978 clearfix\">\n" +
                       "                    <li class=\"col01\">下单时间："+showTime(data.list[i].doOrderTime)+"</li>\n" +
                       "                    <li class=\"col02\">订单号："+data.list[i].orderId+"</li>\n" +
                       "                    <li class=\"col02 stress\">"+data.list[i].lssgOrderAction.orderPayStatus+"</li>\n" +
                       "                    <li class=\"col01 payTime\">支付时间："+showTime(data.list[i].lssgOrderAction.lastPayTime)+"</li>\n" +
                       "                </ul>";

                   //
                   orderTab = "<table class=\"order_list_table w980\">\n" +
                       "                    <tbody>\n" +
                       "                    <tr>\n" +
                       "                        <td width=\"55%\" class=\"orderProductList3\">\n" +
                       "                            \n" +
                       "                        </td>\n" +
                       "                        <td width=\"11.25%\">"+Number(data.list[i].orderTotalPrice).toFixed(2)+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                       "                        <td width=\"11.25%\">"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                       "                        <td width=\"11.25%\" class='stute comProduct'><a href=\"javascript:void(0);\" onclick='comProduct('"+data.list[i].orderId+"')' class=\"oper_btn\">确认收货</a></td>\n" +
                       "                    </tr>\n" +
                       "                    </tbody>\n" +
                       "                </table>";

                   $('.ordersWithNoCompl').append(orderListUl);
                   $('.ordersWithNoCompl').append(orderTab);
                   if(data.list[i].lssgOrderAction.orderPayStatus=='已支付'){
                       ($('.payTime').eq(i)).show();
                       if(data.list[i].lssgOrderAction.shoppingStatus=='已发货'){
                           $(".stute a").eq(i).text("待收货")
                       }else{
                           $(".stute a").eq(i).text("提醒发货")
                       }

                   }else{
                       ($('.payTime').eq(i)).hide();
                       $(".stute a").eq(i).text("去支付");
                       $(".stute a").eq(i).attr("href","/beforePage/toOrderSuccess?orderId="+data.list[i].orderId+"&paymentId="+data.list[i].lssgPayment.paymentId);
                   }
                   $.each(data.list[i].lssgOrderItemList,function (j,value){
                       orderProductList = "<ul class=\"order_goods_list clearfix\">\n" +
                           "                                <li class=\"col01\"><img src=\"/uploadfiles/productImg/"+value.lssgProduct.productPhoto+"\"></li>\n" +
                           "                                <li class=\"col02\">"+value.lssgProduct.productName+"&nbsp;&nbsp;<i>"+value.lssgProduct.productMallPrice+"/kg</i></li>\n" +
                           "                                <li class=\"col03\">"+value.orderProductNum+"</li>\n" +
                           "                                <li class=\"col04\">"+Number(value.subtotalPrice).toFixed(2)+"元</li>\n" +
                           "                            </ul>";

                       ($(".orderProductList3").eq(i)).append(orderProductList);
                   });
               }
               $('.category #noComplLi').html('');
               if(total3>0){
                   $('.category #noComplLi').append("待收货<em>"+total3+"</em>");
               }else{
                   $('.category #noComplLi').append("待收货");
               }

           }else {
               $('.category #noComplLi').style.visibility='hidden'
           }

        },error : function (data){
            console.log(data.responseText);

        }
    });
    return total3;
}

layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;


    //自定义样式
    laypage.render({
        elem: 'demo5'
        ,count: total3
        ,limit:2
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if(!first){
                //清空以前加载的数据
                //$(".t").html("");
                //
                showOrderListByActionNoSouHuo(obj.curr)
                //do something
            }
        }
    });


});


function comProduct(orderId) {
    var data = {"orderId":orderId};
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
        data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
        type: "POST",
        timeout: 20000,
        url: "/order/confirmOrder",
        success : function (result) {
            if(result>0){
                layer.msg("订单完成！", {
                    icon: 1,//提示的样式
                    time: 3000,
                    end:function(){

                        showOrderListByActionNoSouHuo(currentPage);
                    }
                });
            }
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}


