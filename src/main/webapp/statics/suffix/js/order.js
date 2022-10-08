var paymentName = null;
var statTime = null;
var endTime = null;
var orderId = null;
var total = 0;
var total1 = 0;
var currentPage = 1;
$(function () {
   /* $.ajax({
        url:"http://localhost:8080/order/showAllOrderByMap",
        dataType:"json",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        data:{
            currentPage:currentPage,
            pageSize:3,
            "paymentName":paymentName,
            "orderId":orderId,
            "statTime":statTime,
            "endTime":endTime
        },
        success : function (data){
            total = data.total;
            var orderList = "";
            $('.ordersList tbody').html('');
            for(var i=0;i<data.list.length;i++){
                orderList += " <tr>\n" +
                    "                            <td>\n" +
                    "                                <input type=\"checkbox\" name=\"\" lay-skin=\"primary\"><div class=\"layui-unselect layui-form-checkbox\" lay-skin=\"primary\"><i class=\"layui-icon layui-icon-ok\"></i></div></td>\n" +
                    "                            <td>"+data.list[i].orderId+"</td>\n" +
                    "                            <td>"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                    "                            <td>"+data.list[i].lssgAddress.addressTel+"</td>\n" +
                    "                            <td>"+data.list[i].orderTotalPrice+"</td>\n" +
                    "                            <td>待确认</td>\n" +
                    "                            <td>"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                    "                            <td>"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                    "                            <td>"+data.list[i].paymentName+"</td>\n" +
                    "                            <td>"+showTime(data.list[i].doOrderTime)+"</td>\n" +
                    "                            <td class=\"td-manage\">\n" +
                    "                                <a title=\"查看\" onclick=\"xadmin.open('编辑','order-view.html')\" href=\"javascript:;\">\n" +
                    "                                    <i class=\"layui-icon\">&#xe63c;</i></a>\n" +
                    "                                <a title=\"删除\" onclick=\"member_del(this,'要删除的id')\" href=\"javascript:;\">\n" +
                    "                                    <i class=\"layui-icon\">&#xe640;</i></a>\n" +
                    "                            </td>\n" +
                    "                        </tr>";
            }
            $('.ordersList tbody').append(orderList);
           /!* $("#demo2").hide();
            $("#demo1").show();*!/

        },error : function (data){

        }
    });*/
    total = getListData(currentPage);
});

total = getListData(currentPage);

function getListData(currentPage) {

    $.ajax({
        url:"http://localhost:8080/order/showAllOrderByMap",
        dataType:"json",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        data:{
            currentPage:currentPage,
            pageSize:3,
            "paymentName":paymentName,
            "orderId":orderId,
            "statTime":statTime,
            "endTime":endTime
        },
        success : function (data){
            total = data.total;
            var orderList = "";
            $('.ordersList tbody').html('');
            for(var i=0;i<data.list.length;i++){
                orderList += " <tr>\n" +
                    "                            <td>\n" +
                    "                                <input type=\"checkbox\" name=\"\" lay-skin=\"primary\"><div class=\"layui-unselect layui-form-checkbox\" lay-skin=\"primary\"><i class=\"layui-icon layui-icon-ok\"></i></div></td>\n" +
                    "                            <td>"+data.list[i].orderId+"</td>\n" +
                    "                            <td>"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                    "                            <td>"+data.list[i].lssgAddress.addressTel+"</td>\n" +
                    "                            <td>"+data.list[i].orderTotalPrice+"</td>\n" +
                    "                            <td>待确认</td>\n" +
                    "                            <td>"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                    "                            <td>"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                    "                            <td>"+data.list[i].paymentName+"</td>\n" +
                    "                            <td>"+showTime(data.list[i].doOrderTime)+"</td>\n" +
                    "                            <td class=\"td-manage\">\n" +
                    "                                <a title=\"查看\" onclick=\"xadmin.open('编辑','order-view.html')\" href=\"javascript:;\">\n" +
                    "                                    <i class=\"layui-icon\">&#xe63c;</i></a>\n" +
                    "                                <a title=\"删除\" onclick=\"member_del(this,'要删除的id')\" href=\"javascript:;\">\n" +
                    "                                    <i class=\"layui-icon\">&#xe640;</i></a>\n" +
                    "                            </td>\n" +
                    "                        </tr>";
            }
            $('.ordersList tbody').append(orderList);
            $('#demo2').show();
            $('#demo1').hide();
        },error : function (data){
            console.log(data.responseText);
        }

    });

    $('.orderBtn').click(function () {
        paymentName = $('.orderForm #payment option:selected').text();
        statTime = $('.orderForm #start').val();
        endTime = $('.orderForm #end').val();
        orderId = $('.orderForm .orderId').val();
        $.ajax({
            url:"http://localhost:8080/order/showAllOrderByMap",
            dataType:"json",
            type: "POST",
            async:false,    //设置为同步，中间变量返回中间变量
            data:{
                currentPage:currentPage,
                pageSize:3,
                "paymentName":paymentName,
                "orderId":orderId,
                "statTime":statTime,
                "endTime":endTime
            },
            success : function (data){
                total = data.total;
                var orderList = "";
                $('.ordersList tbody').html('');

                for(var i=0;i<data.list.length;i++){
                    orderList += " <tr>\n" +
                        "                            <td>\n" +
                        "                                <input type=\"checkbox\" name=\"\" lay-skin=\"primary\"><div class=\"layui-unselect layui-form-checkbox\" lay-skin=\"primary\"><i class=\"layui-icon layui-icon-ok\"></i></div></td>\n" +
                        "                            <td>"+data.list[i].orderId+"</td>\n" +
                        "                            <td>"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                        "                            <td>"+data.list[i].lssgAddress.addressTel+"</td>\n" +
                        "                            <td>"+data.list[i].orderTotalPrice+"</td>\n" +
                        "                            <td>待确认</td>\n" +
                        "                            <td>"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                        "                            <td>"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                        "                            <td>"+data.list[i].paymentName+"</td>\n" +
                        "                            <td>"+showTime(data.list[i].doOrderTime)+"</td>\n" +
                        "                            <td class=\"td-manage\">\n" +
                        "                                <a title=\"查看\" onclick=\"xadmin.open('编辑','order-view.html')\" href=\"javascript:;\">\n" +
                        "                                    <i class=\"layui-icon\">&#xe63c;</i></a>\n" +
                        "                                <a title=\"删除\" onclick=\"member_del(this,'要删除的id')\" href=\"javascript:;\">\n" +
                        "                                    <i class=\"layui-icon\">&#xe640;</i></a>\n" +
                        "                            </td>\n" +
                        "                        </tr>";
                }
                $('.ordersList tbody').append(orderList);
                $('#demo2').hide();
                $('#demo1').show();
            },error : function (data){
            }

        });
    });
    return total;
}

/*total1 = clickShow(currentPage);
function clickShow(currentPage){

    $('.orderBtn').click(function () {
        paymentName = $('.orderForm #payment option:selected').text();
        statTime = $('.orderForm #start').val();
        endTime = $('.orderForm #end').val();
        orderId = $('.orderForm .orderId').val();
        $.ajax({
            url:"http://localhost:8080/order/showAllOrderByMap",
            dataType:"json",
            type: "POST",
            async:false,    //设置为同步，中间变量返回中间变量
            data:{
                currentPage:currentPage,
                pageSize:3,
                "paymentName":paymentName,
                "orderId":orderId,
                "statTime":statTime,
                "endTime":endTime
            },
            success : function (data){
                total = data.total;
                var orderList = "";
                $('.ordersList tbody').html('');

                for(var i=0;i<data.list.length;i++){
                    orderList += " <tr>\n" +
                        "                            <td>\n" +
                        "                                <input type=\"checkbox\" name=\"\" lay-skin=\"primary\"><div class=\"layui-unselect layui-form-checkbox\" lay-skin=\"primary\"><i class=\"layui-icon layui-icon-ok\"></i></div></td>\n" +
                        "                            <td>"+data.list[i].orderId+"</td>\n" +
                        "                            <td>"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                        "                            <td>"+data.list[i].lssgAddress.addressTel+"</td>\n" +
                        "                            <td>"+data.list[i].orderTotalPrice+"</td>\n" +
                        "                            <td>待确认</td>\n" +
                        "                            <td>"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                        "                            <td>"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                        "                            <td>"+data.list[i].paymentName+"</td>\n" +
                        "                            <td>"+showTime(data.list[i].doOrderTime)+"</td>\n" +
                        "                            <td class=\"td-manage\">\n" +
                        "                                <a title=\"查看\" onclick=\"xadmin.open('编辑','order-view.html')\" href=\"javascript:;\">\n" +
                        "                                    <i class=\"layui-icon\">&#xe63c;</i></a>\n" +
                        "                                <a title=\"删除\" onclick=\"member_del(this,'要删除的id')\" href=\"javascript:;\">\n" +
                        "                                    <i class=\"layui-icon\">&#xe640;</i></a>\n" +
                        "                            </td>\n" +
                        "                        </tr>";
                }
                $('.ordersList tbody').append(orderList);
                $('#demo2').hide();
                $('#demo1').show();
            },error : function (data){

            }

        });
    });
    return total;
}*/
layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;
    //自定义样式
    laypage.render({
        elem: 'demo2'
        ,count: total
        ,limit:3
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
                getListData(obj.curr)
                //do something
            }
        }
    });


});

/*layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;
    //自定义样式
    laypage.render({
        elem: 'demo2'
        ,count: total
        ,limit:3
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：

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


});*/
/*var currentPage1 = 1;
total1 = show(currentPage1);
function show(currentPage1){
    $('.orderBtn').click(function () {
        paymentName = $('.orderForm #payment option:selected').text();
        statTime = $('.orderForm #start').val();
        endTime = $('.orderForm #end').val();
        orderId = $('.orderForm .orderId').val();
        /!*$.ajax({
            url:"http://localhost:8080/order/showAllOrderByMap",
            dataType:"json",
            type: "POST",
            async:false,    //设置为同步，中间变量返回中间变量
            data:{
                currentPage:currentPage,
                pageSize:3,
                "orderPayStatus":orderPayStatus,
                "orderId":orderId,
                "statTime":statTime,
                "endTime":endTime
            },
            success : function (data){
                total = data.total;
            },error : function (data){

            }
        });*!/
        $('.ordersList tbody').html('');
        $.ajax({
            url:"http://localhost:8080/order/showAllOrderByMap",
            dataType:"json",
            type: "POST",
            //async:false,    //设置为同步，中间变量返回中间变量
            data:{
                currentPage:currentPage1,
                pageSize:3,
                "paymentName":paymentName,
                "orderId":orderId,
                "statTime":statTime,
                "endTime":endTime
            },
            success : function (data){
                total1 = data.total;
                var orderList = "";
                $('.ordersList tbody').html('');
                for(var i=0;i<data.list.length;i++){
                    orderList += " <tr>\n" +
                        "                            <td>\n" +
                        "                                <input type=\"checkbox\" name=\"\" lay-skin=\"primary\"><div class=\"layui-unselect layui-form-checkbox\" lay-skin=\"primary\"><i class=\"layui-icon layui-icon-ok\"></i></div></td>\n" +
                        "                            <td>"+data.list[i].orderId+"</td>\n" +
                        "                            <td>"+data.list[i].lssgAddress.addressUserName+"</td>\n" +
                        "                            <td>"+data.list[i].lssgAddress.addressTel+"</td>\n" +
                        "                            <td>"+data.list[i].orderTotalPrice+"</td>\n" +
                        "                            <td>待确认</td>\n" +
                        "                            <td>"+data.list[i].lssgOrderAction.orderPayStatus+"</td>\n" +
                        "                            <td>"+data.list[i].lssgOrderAction.shoppingStatus+"</td>\n" +
                        "                            <td>"+data.list[i].paymentName+"</td>\n" +
                        "                            <td>"+showTime(data.list[i].doOrderTime)+"</td>\n" +
                        "                            <td class=\"td-manage\">\n" +
                        "                                <a title=\"查看\" onclick=\"xadmin.open('编辑','order-view.html')\" href=\"javascript:;\">\n" +
                        "                                    <i class=\"layui-icon\">&#xe63c;</i></a>\n" +
                        "                                <a title=\"删除\" onclick=\"member_del(this,'要删除的id')\" href=\"javascript:;\">\n" +
                        "                                    <i class=\"layui-icon\">&#xe640;</i></a>\n" +
                        "                            </td>\n" +
                        "                        </tr>";
                }
                $('.ordersList tbody').append(orderList);
                $("#demo2").hide();
                $("#demo1").show();

            },error : function (data){

            }
        });
        //total1 = getListData(currentPage,paymentName,statTime,endTime,orderId);
    });
    return total1;
}*/

/*layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;
    //自定义样式
    laypage.render({
        elem: 'demo1'
        ,count: total1
        ,limit:3
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：

            //首次不执行
            if(!first){
                //清空以前加载的数据
                $('.ordersList tbody').html('');
                //
                clickShow(obj.curr)
                //do something
            }
        }
    });


});*/
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
    //var time = year+"-"+month+"-"+day;
    return time;
}