/**
 *
 * */
$(function () {

});


/**
 *
 * */
var $productId = getQueryVariable("productId");
function addCon($productId) {
    var userLoginName = $(".userLoginName a").text().trim().replace(/\s/g,"");
    if(userLoginName==''){
        layer.msg("您还未登入，请先去登入吧！", {
            icon: 2,//提示的样式
            time: 3000,
            end:function(){
                location.href='/beforePage/toLogin';
            }
        });
    }else {
        $.ajax({
            dataType: "JSON",
            data: {
                "productId": $productId
            },
            type: "POST",
            timeout: 20000,
            url: "/collect/findOneProductInCollect",
            success: function (result, state) {
                for (var key in result) {
                    console.log("result.lssgCollectProducts---->" + result[key]);
                    if (!result[key]) {
                        $.ajax({
                            dataType: "JSON",
                            data: {
                                "productId": $productId
                            },
                            type: "POST",
                            timeout: 20000,
                            url: "/collect/addToCollect",
                            success: function (data, state) {
                                if (data > 0) {
                                    layer.msg("加入成功", {
                                        icon: 1,//提示的样式
                                        time: 2000,
                                        end: function () {
                                            location.href = '/beforePage/toWishList';
                                        }
                                    });
                                } else {
                                    layer.msg("加入失败", {
                                        icon: 2,//提示的样式
                                        time: 2000,
                                        end: function () {
                                            // location.href='/beforePage/toWishList';
                                        }
                                    });
                                }

                            },
                            error: function (data) {
                                alert(data.responseText);
                            }
                        });
                    } else {
                        layer.msg("该商品已收藏", {
                            icon: 2,//提示的样式
                            time: 2000,
                            end: function () {
                                //location.href='/beforePage/toWishList';
                            }
                        });
                        // wishlist.attr("","");
                    }
                }

            },
            error: function (data) {
                alert(data.responseText);
            }
        });
    }
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