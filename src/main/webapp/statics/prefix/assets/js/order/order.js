/**
 *
 * */
var productIds = [];
$(function () {
    var orderId = getQueryVariable("orderId");
    $.ajax({
        url:"/order/checkOrderToProduct",
        dataType:"json",
        type: "POST",
        data:{
            "orderId":orderId
        },
        success : function (result){
            var orderProductList = '';
            var productListPrice = 0.00;
            var orderId = '';
            $.each(result,function (i,value) {
                orderProductList += "<tr>\n" +
                    "                                <td>"+value.lssgProduct.productName+"</td>\n" +
                    "                                <td>"+value.lssgProduct.productMallPrice+"</td>\n" +
                    "                                <td>"+value.orderProductNum+"</td>\n" +
                    "                                <td>"+(value.lssgProduct.productNum>0?'有货':'无货')+"</td>\n" +
                    "                                <td class=\"goods-price\"> "+value.subtotalPrice+"</td>\n" +
                    "                            </tr>";
                productListPrice = value.lssgOrders.orderTotalPrice;
                orderId = value.lssgOrders.orderId;
            })
            $('.order_table tbody').append(orderProductList);
            $('.footTr .goods-price').text(Number(productListPrice).toFixed(2));
            var devPrice = $('.devPrice').text();
            var totalPrice = Number(productListPrice) + Number(devPrice);
            $('.box__shadow .realpay--price').text(Number(totalPrice).toFixed(2));

            $(".shade_content").hide();
            $(".shade").hide();

            submitAddress(orderId);     //新增地址
        },error : function (data){
            console.log(data.responseText);
        }
    });

    showAddress();      //显示地址
    showPayment();       //显示支付方式
});

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

/**
 *
 * */

function submitAddress(orderId) {
    $('.modal-footer .addBtn').click(function () {
        //console.log("orderId--->"+orderId);
        var addressUserName = $('.modal-body #addressUserName').val();
        var addressName = $('.modal-body #city').val();
        var addressAddr = $('.modal-body #addressAddr').val();
        var addressTel = $('.modal-body #addressTel').val();
        var data = {"addressUserName":addressUserName,"addressName":addressName,"addressAddr":addressAddr,"addressTel":addressTel};

        $.ajax({
            dataType: "JSON",
            contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
            data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
            type: "POST",
            timeout: 20000,
            url: "/address/addOneAddress",
            success : function (result) {
                if(result.data){
                    $('.Caddress .addrList').html('');
                    showAddress();
                    /*layer.msg(result.message, {
                        icon: 0,//提示的样式
                        time: 2000,
                        end:function(){
                            showAddress();
                        }
                    });*/
                }else{
                    layer.msg(result.message, {
                        icon: 0,//提示的样式
                        time: 2000,
                    });
                }


            },
            error : function (data){
                alert(data.responseText);
            }
        });
    })
}

/**
 * 显示四个最新的地址
 * */

function showAddress() {
    var addressList = '';
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        url: "/address/findAllAddressByUserId",
        success : function (result) {
            console.log("result--->"+result);
            //江西省-抚州市-乐安县 ---》江西抚州(罗伟收)

            for(var i =0;i<result.length;i++){
                var  ps = ['','',''];
                    ps = result[i].addressName.split("-"); //江西省   抚州市  乐安县
                var p = ps[0].substring(0,ps[0].length-1);     //江西
                var s = ps[1]?ps[1].substring(0,ps[1].length-1):'';
                    //抚州
                var newAddressName = p+s;
                var x = '';
                if(ps.length>2){
                    x = ps[2].substring(0,ps[2].length-1);//江西抚州
                }
                addressList += "<div class=\"add_mi\" onclick=\"charge('"+ps+"','"+result[i].addressAddr+"','"+result[i].addressTel+"','"+result[i].addressUserName+"',"+result[i].addressId+");\">\n" +
                    "                        <span class=\"xz\" hidden>"+result[i].addressId+"</span>\n" +
                    "                        <p class=\"ss\" id=\"ss\" style=\"border-bottom:1px dashed #ccc;line-height:28px;\">"+newAddressName+"("+result[i].addressUserName+"收)</p>\n" +
                    "                        <p class=\"xz\" id=\"xz\">"+x+" "+result[i].addressAddr+" "+result[i].addressTel+"</p>\n" +
                    "                    </div>";

                if(i==0){
                    firstShow(ps,result[0].addressAddr,result[0].addressTel,result[0].addressUserName,result[0].addressId);
                }
            }

            $('.Caddress .addrList').append(addressList);
            var addressId =$("div[class=add_mi]:first span").text();
            $("div[class=add_mi]:first").css('background','url("/statics/prefix/assets/img/images/mail_1.jpg") no-repeat');
            $("div[class=add_mi]:first").append("<a title='修改地址' onclick='onclick_open1("+addressId+")' style='color: #c97; margin-bottom:9px' class='modify-operation'>修改</a>");

            function firstShow(ps,addressAddr,tel,userName,addressId){
                if(ps.size>2){
                    var addrs = ps[0]+" "+ps[1]+" "+ps[2]+" "+addressAddr;
                }else{
                    var addrs = ps[0]+" "+ps[1]+" "+addressAddr;
                }

                var ads = userName+" "+tel;
                $(".confirmAddr-addr-bd").text(addrs);
                $(".confirmAddr-addr-name").text(ads);
                $(".box__wrapper .box__shadow .addId").text(addressId);
            }

            },
        error : function (data){
            alert(data.responseText);
        }
    });
}

function charge(ps,addressAddr,tel,userName,addressId) {
    $('.Caddress .add_mi').click(function () {
        $(".modify-operation").remove();
        $(this).append("<a title='修改地址' onclick='onclick_open1("+addressId+")' style='color: #c97; margin-bottom:9px' class='modify-operation'>修改</a>");

        $(this).css('background', 'url("/statics/prefix/assets/img/images/mail_1.jpg") no-repeat').siblings('.add_mi').css('background', 'url("/statics/prefix/assets/img/images/mail.jpg") no-repeat')
        var addrs = ps.replace(/,/g,' ')+" "+addressAddr;
        var ads = userName+" "+tel;
        $(".confirmAddr-addr-bd").text(addrs);

        $(".confirmAddr-addr-name").text(ads);
        $(".box__wrapper .box__shadow .addId").text(addressId);
    });
}

/**
 * 回显地址信息
 * */
function onclick_open1(addressId) {
    console.log("我被触发了");
    $(".shade_content").removeAttr("hidden");
    $(".shade_content").css("display","block");
    $(".shade").removeAttr("hidden");
    $(".shade").css("display","block");

    $.ajax({
        url:"/address/findOneAddressById",
        dataType:"json",
        type: "POST",
        data:{
            "addressId":addressId
        },
        success : function (result){
            $('.shade_from .addressId').text(result.addressId);
            $('.shade_from #name').val(result.addressUserName);
            $('.shade_from #city1').val(result.addressName);
            $('.shade_from #addrs').val(result.addressAddr);
            $('.shade_from #phone').val(result.addressTel);


        },error : function (data){
        }
    });

}

function onclick_close() {
    var shade_content = $(".shade_content");
    var shade = $(".shade");
    if (confirm("确认关闭么！此操作不可恢复")) {
        shade_content.hide();
        shade.hide();
    }
}

/**
 * 修改地址信息
 * */
updateAddr();
function updateAddr() {
    $('.sub_set').click(function () {
       var addressId = $('.shade_from .addressId').text();
       var addressUserName = $('.shade_from #name').val();
       var addressName = $('.shade_from #city1').val();
       var addressAddr = $('.shade_from #addrs').val();
       var addressTel = $('.shade_from #phone').val();
       var data = {"addressId":addressId,"addressUserName":addressUserName,"addressName":addressName,"addressAddr":addressAddr,"addressTel":addressTel};
        $.ajax({
            dataType: "JSON",
            contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
            data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
            type: "POST",
            timeout: 20000,
            url: "/address/updateAddress",
            success : function (result) {
                if(result>0){
                    $(".shade_content").hide();
                    $(".shade").hide();
                    $('.Caddress .addrList').html('');
                    showAddress();
                    layer.msg("修改成功！", {
                        icon: 1,//提示的样式
                        time: 2000,
                        /*end:function(){
                            showAddress();
                        }*/
                    });
                }else{
                    $(".shade_content").hide();
                    $(".shade").hide();
                    $('.Caddress .addrList').html('');
                    showAddress();
                    layer.msg("修改失败！", {
                        icon: 2,//提示的样式
                        time: 2000,
                    });
                }


            },
            error : function (data){
                alert(data.responseText);
            }
        });

    })
}

/**
 * 显示支付方式
 * */
function showPayment() {

    var paymentList = '';
    $.ajax({
        url:"/payment/findAllPayment",
        dataType:"json",
        type: "POST",
        success : function (result){
           for(var i = 0;i<result.length;i++){
               paymentList += "<div class=\"panel-default\" >\n" +
                   "                                <input class=\"payment\" name=\"check_method\" type=\"radio\" data-target=\"createp_account\" value='"+result[i].paymentId+"'/>\n" +
                   "                                <label class='payname' data-toggle=\"collapse\" data-target=\"#method\" aria-controls=\"method\">"+result[i].paymentName+"</label>\n" +
                   "                            </div>";
           }
            $('.paymentList').append(paymentList);
            $("div[class=panel-default]:first .payment").prop("checked",'checked');
        },error : function (data){
            console.log(data.responseText);
        }
    });
}

/**
 * 订单提交
 * */
submitOrder();
function submitOrder() {
    $('.payment_method .orderSubmitBtn').click(function () {
        var addressId = $(".box__wrapper .box__shadow .addId").text();
        var paymentId = $("input[name='check_method']:checked").val();
        var orderId = getQueryVariable("orderId");
        var notes = $('.footTr .remarks-item #remarks-cont').val();
        if(addressId!=null&&addressId.trim()!=''){
            $.ajax({
                url:"/order/submitWithOrder",
                dataType:"json",
                type: "POST",
                data:{
                    "addressId":addressId,
                    "paymentId":paymentId,
                    "orderId":orderId,
                    "notes":notes
                },
                success : function (result){
                    if(result>0){
                        //2、跳转到支付页面 1、删除购物车购买的这些商品
                        layer.msg("订单提交成功！正在联系商家24小时内发货。。。", {
                            icon: 1,//提示的样式
                            time: 2000,
                            end:function(){
                                //删除购物车购买的这些商品
                                $.ajax({
                                    url:"/cart/delProductByProductIds",
                                    dataType:"json",
                                    type: "POST",
                                    data:{
                                        "productIds":productIds
                                    },
                                    success : function (result){
                                        console.log("result--->"+result);
                                    },error : function (data){
                                        console.log(data.responseText);
                                    }
                                });
                                //跳转到支付页面
                                location.href = '/beforePage/toOrderSuccess?orderId='+orderId+"&paymentId="+paymentId;
                            }
                        });
                    }else{
                        layer.msg("订单提交失败！重新提交订单。", {
                            icon: 2,//提示的样式
                            time: 2000,
                            end:function(){

                            }
                        });
                    }

                },error : function (data){
                    console.log(data.responseText);
                }
            });
        } else {
            layer.alert('您还未添加地址', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 0
            });
        }
    })
}