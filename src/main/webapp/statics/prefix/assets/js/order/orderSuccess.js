

$(function(){
    var orderId = getQueryVariable("orderId");
    var paymentId = getQueryVariable("paymentId");
    var doOrderTime;
    $.ajax({
        url:"/order/findOneOrder",
        dataType:"json",
        type: "POST",
        data:{
            "orderId":orderId
        },
        success : function (result){
            var list = '';
            if(result!=null){
                doOrderTime = new Date(result.doOrderTime).getTime();
                var ps = result.lssgAddress.addressName.split("-");
                list = "<p>\n" +
                    "                            金额：<span class=\"pay-total\">"+result.orderTotalPrice+"元</span>\n" +
                    "                        </p>\n" +
                    "                        <p>\n" +
                    "                            订单："+result.orderId+"                    </p>\n" +
                    "                        <p>\n" +
                    "                            配送："+result.lssgAddress.addressUserName+"                                    <span class=\"line\">/</span>\n" +
                    "                            "+tel(result.lssgAddress.addressTel)+"                                    <span class=\"line\">/</span>\n" +
                    "                            "+(ps+' '+result.lssgAddress.addressAddr)+"                                                                <span class=\"line\">/</span>\n" +
                    "                            不限送货时间                                    <span class=\"line\">/</span>\n" +
                    "                            个人电子发票                                                    </p>";
            $('.order-info .info').append(list);
                //订单支付倒计时
                timeShow(doOrderTime,orderId);
            }

        },error : function (data){
            console.log(data.responseText);

        }
    });

    showPayment(paymentId);


    });

/**
 *订单支付倒计时
 * */
function timeShow(doOrderTime,orderId) {
    var cdate = new Date().getTime();
    var newDate = (getEndTime(doOrderTime,0,0,30)-cdate)/1000;
    $(".container #dTime").attr("data",newDate);

    $(".timeBar").each(function () {
        $(this).countdownsync({
            dayTag: "",
            hourTag: "<label class='tt hh dib vam'>00</label><span>时</span>",
            minTag: "<label class='tt mm dib vam'>00</label><span>分</span>",
            secTag: "<label class='tt ss dib vam'>00</label><span>秒</span>",
            dayClass: ".dd",
            hourClass: ".hh",
            minClass: ".mm",
            secClass: ".ss",
            isDefault: false,
            showTemp:1

        }, function () {
            // location.reload();
            //支付超时，订单自动取消
            $.ajax({
                url:"/order/timeOutOrder",
                dataType:"json",
                type: "POST",
                data:{
                    "orderId":orderId
                },
                success : function (result){
                    if(result>0){
                        //跳转到另一个页面（购物车页面也行）
                    }
                },error : function (data){
                    console.log(data.responseText);

                }
            });
        });
    });
}

/**
 * 结束时间(时间戳)
 * */
function getEndTime(starttime,day,hour,min){
    var nd = starttime;
    nd = nd + day * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000 + min * 60 * 1000;
    return nd;

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

/**
 * 电话号码四位变星号
 * */
function tel(addressTel) {
    var newTel = addressTel.substr(0,3)+'****'+addressTel.substr(7);
    return newTel;
}

/**
 * 支付完成
 * */
var orderId = getQueryVariable("orderId");
pay(orderId);
function pay(orderId) {
    $('.clearfix .payBtn').click(function () {
        $.ajax({
            url:"/order/payComple",
            dataType:"json",
            type: "POST",
            data:{
                "orderId":orderId
            },
            success : function (result){
                if(result>0){
                    //跳转到另一个页面
                    layer.msg("支付成功，请耐心等待商家发货！", {
                        icon: 1,//提示的样式
                        time: 2000,
                        end:function(){
                            //跳转到支付页面
                            location.href = '/beforePage/toOrder';
                        }
                    });
                }

            },error : function (data){
                console.log(data.responseText);

            }
        });
    })
}


function showPayment(paymentId) {
    $.ajax({
        url:"/payment/selectOnePaymentById",
        dataType:"json",
        type: "POST",
        data:{
            "paymentId":paymentId
        },
        success : function (result){
            var payHtml = "";
            if(result!=null){
               payHtml = "<div class=\"pay-weixin\">\n" +
                   "                            <div class=\"p-w-hd\">"+result.paymentName+"</div>\n" +
                   "                            <div class=\"p-w-bd\" style=\"position:relative\">\n" +
                   "                                <div class=\"j_weixinInfo\" style=\"position:absolute; top: -36px; left: 130px;\"><span class=\"j_qrCodeCountdown font-bold font-red\">温馨提示：</span>支付接口安全<!--<span class=\"j_qrCodeCountdown font-bold font-red\">60</span>-->请放心支付，请保护密码，防止外泄。</div>\n" +
                   "                                <div class=\"p-w-box\">\n" +
                   "                                    <div class=\"pw-box-hd\">\n" +
                   "                                        <!--<img  id=\"weixinImageUrl\" src=\"//misc.360buyimg.com/lib/img/e/blank.gif\" width=\"298\" height=\"298\"/>-->\n" +
                   "                                        <img id=\"weixinImageUrl\" src=\"/uploadfiles/notice/"+result.paymentImg+"\" width=\"298\" height=\"298\"/>\n" +
                   "                                        <!--<img id=\"weixinImageUrl\" src=\"zhifubao.jpg\" width=\"298\" height=\"298\"/>-->\n" +
                   "                                    </div>\n" +
                   "                                    <div class=\"pw-retry j_weixiRetry\" >\n" +
                   "                                        <a class=\"ui-button ui-button-gray j_weixiRetryButton\" href=\"javascript:getWeixinImage2();\">获取失败 点击重新获取二维码  </a>\n" +
                   "                                    </div>\n" +
                   "                                    <div class=\"pw-error j_weixiError\" ></div>\n" +
                   "                                    <div class=\"pw-box-ft\" style='height: 60px;'>\n" +
                   "                                        <p>请使用"+result.paymentName+"扫一扫</p>\n" +
                   "                                        <p>扫描二维码支付</p>\n" +
                   "                                    </div>\n" +
                   "                                </div>\n" +
                   "                                <div class=\"p-w-sidebar\"></div>\n" +
                   "                            </div>\n" +
                   "                        </div>";
               $("#paymentContent").append(payHtml);
                if(result.paymentName=="支付宝"||result.paymentName=="支付宝支付"){
                    $(".p-w-sidebar").css("background","url(/statics/prefix/assets/img/images/zhifubao2.png) 50px 0 no-repeat");
                    $(".p-w-sidebar").css({"margin-top":"5px"})
                }
            }

        },error : function (data){
            console.log(data.responseText);

        }
    });
}