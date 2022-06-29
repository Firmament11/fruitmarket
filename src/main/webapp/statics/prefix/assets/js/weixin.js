/* @update: 2020-4-7 10:56:56 */
function getWeixinImage2() {
    var e;
    getWeixinImage(function (i) {
        if (!i.success) {
            if ("IINDEX0000016" == i.messageCode) $(".j_weixiError").hide(), $(".j_weixiRetry").show(); else {
                var a = i.messageInfo || "\u83b7\u53d6\u4e8c\u7ef4\u7801\u5931\u8d25\uff0c\u8bf7\u9000\u51fa\u6536\u94f6\u53f0\u91cd\u65b0\u4e0b\u5355";
                $(".j_weixinInfo").hide(), $(".j_weixiRetry").hide(), $(".j_weixiError").show(), $(".j_weixiError").html(a)
            }
            return void $(".j_weixinInfo").hide()
        }
        $(".j_weixiRetry").hide(), $(".j_weixiError").hide(), $(".j_weixinInfo").show(), $("#weixinImageUrl").attr("src", i.weixinImageUrl), i.isUseKeepLive ? queryWeixinOrderBankState(i) : e = setInterval(function () {
            queryOrderState(i.payIdSign)
        }, 5e3), $(".j_weixinInfo").html("\u8ddd\u79bb\u4e8c\u7ef4\u7801\u8fc7\u671f\u8fd8\u5269<span class='j_qrCodeCountdown font-bold font-red'>60</span>\u79d2\uff0c\u8fc7\u671f\u540e\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u65b0\u83b7\u53d6\u4e8c\u7ef4\u7801\u3002").removeClass("font-red"), paymentUI.setAuthCountdown(".j_qrCodeCountdown", 60, function () {
            e && clearInterval(e), $(".j_weixinInfo").html('\u4e8c\u7ef4\u7801\u5df2\u8fc7\u671f\uff0c<a href="javascript:getWeixinImage2();">\u5237\u65b0</a>\u9875\u9762\u91cd\u65b0\u83b7\u53d6\u4e8c\u7ef4\u7801\u3002').addClass("font-red"), $("#weixinImageUrl").attr("src", "//img30.360buyimg.com/jr_image/jfs/t2893/157/4205885241/62385/951af5d5/57b51ea9Nb862ca5e.png")
        })
    })
}

function queryOrderState(e) {
    var i = "/async/queryOrderState";
    $.ajax({
        type: "GET",
        url: i,
        data: {cashierId: globalVar.cashierId, payIdSign: e, orderId: globalVar.orderId},
        dataType: "json",
        timeout: 4e3,
        async: !1,
        success: function (e) {
            1 == e.state && window.location.replace(e.url)
        }
    })
}

function queryWeixinOrderBankState(e) {
    function i() {
        a > 3 || $.ajax({
            type: "post",
            url: "//keeplive.jd.com/keepLive",
            data: JSON.stringify(n),
            dataType: "json",
            timeout: 7e4,
            success: function (n) {
                "undefined" != typeof n && ("0000" == n.code ? "1" == e.isH5 ? window.location.reload() : queryOrderState(e.payIdSign) : "01" == n.reconnection && (a++, i()))
            },
            error: function (e) {
                console.info(e)
            }
        })
    }

    var a = 0, n = {
        orderId: globalVar.orderId,
        appId: "KL0001",
        keepTime: 6e4,
        appToken: "9b1c17d9-3cde-428f-a0ca-c365cc1f90d2",
        sign: e.keepliveSign
    };
    i()
}

var getWeixinImage = function (e) {
    var i = "/weixin/getWeixinImageUrl";
    $.ajax({
        type: "get",
        url: i + "?cashierId=" + globalVar.cashierId,
        dataType: "json",
        contentType: "application/json",
        data: {orderId: globalVar.orderId, paySign: globalVar.paySign},
        timeout: 25e3,
        success: function (i) {
            void 0 !== i && e(i)
        }
    })
};
