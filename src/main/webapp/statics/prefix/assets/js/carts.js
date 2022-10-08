/**
 * Created by Administrator on 2017/5/24.
 */
$(function () {
    var totalPrice = "";
    var uls = $(".cartBox .order_content");
    var newUl = '';

    $.ajax({
        url:"/cart/fromCartShowProduct",
        dataType:"json",
        type: "POST",
        success : function (result){
                if (result != null) {
                    showData(result);
                } else {
                }

        },
        error : function (data){
            console.log(data.responseText);

        }

    });


function showData(result) {
    var i = 0;
    for (var keys in result.cartItems) {
        i++;
        newUl = "<ul class=\"order_lists\">\n" +
            "                        <li class=\"list_chk productList\">\n" +
            "                            <input type=\"checkbox\" name='productId' id=\"checkbox_" + parseInt(result.cartItems[keys].lssgProduct.productId) + "\" class=\"son_check\" value='"+parseInt(result.cartItems[keys].lssgProduct.productId)+"'>\n" +
            "                            <label for=\"checkbox_" + parseInt(result.cartItems[keys].lssgProduct.productId) + "\"></label>\n" +
            "                        </li>\n" +
            "                        <li class=\"list_con\">\n" +
            "                            <div class=\"list_img\"><a href=\"javascript:;\"><img src=\"/uploadfiles/productImg/"+result.cartItems[keys].lssgProduct.productPhoto+"\" alt=\"\"></a></div>\n" +
            "                            <div class=\"list_text\"><a href=\"javascript:;\">" + result.cartItems[keys].lssgProduct.productName + "</a></div>\n" +
            "                        </li>\n" +
            "                        <li class=\"list_info\">\n" +
            "                            <p>规格：默认</p>\n" +
            "                            <p>尺寸：16*16*3(cm)</p>\n" +
            "                        </li>\n" +
            "                        <li class=\"list_price\">\n" +
            "                            <p class=\"price\">￥" + result.cartItems[keys].lssgProduct.productMallPrice + "</p>\n" +
            "                        </li>\n" +
            "                        <li class=\"list_amount\">\n" +
            "                            <div class=\"amount_box\">\n" +
            "                                <a href=\"javascript:;\" class=\"reduce reSty\">-</a>\n" +
            "                                <input type=\"text\" value=\"" + result.cartItems[keys].buyNum + "\" class=\"sum\">\n" +
            "                                <a href=\"javascript:;\" class=\"plus\">+</a>\n" +
            "                                <span class='productId' hidden>"+parseInt(result.cartItems[keys].lssgProduct.productId)+"</span>\n"+
            "                            </div>\n" +
            "                        </li>\n" +
            "                        <li class=\"list_sum\">\n" +
            "                            <p class=\"sum_price\">￥" + Number(result.cartItems[keys].subtotalPrice).toFixed(2) + "</p>\n" +
            "                        </li>\n" +
            "                        <li class=\"list_op\">\n" +
            "                            <p class=\"del\"><a href=\"javascript:;\" class=\"delBtn\">X</a></p>\n" +
            "                        </li>\n" +
            "                    </ul>";
        uls.append(newUl);
    }

    $(".mini_cart_wrapper .lnr-cart").html("");
    $(".mini_cart_wrapper .lnr-cart").append("<span class=\"item_count\">"+i+"</span>");

    //全局的checkbox选中和未选中的样式
    var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
        $wholeChexbox = $('.whole_check'),

        $cartBox = $('.cartBox'),                       //每个商铺盒子
        $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
        $sonCheckBox = $('.son_check');                 //每个商品的checkbox

    $allCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark')
        }
    });

//===============================================全局全选与单个商品的关系================================
    $wholeChexbox.click(function () {
        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $checkboxs.next('label').addClass('mark');
        } else {
            $checkboxs.prop("checked", false);
            $checkboxs.next('label').removeClass('mark');
        }
        totalMoney();
    });


    $sonCheckBox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //判断：所有单个商品是否勾选
                var len = $sonCheckBox.length;
                var num = 0;
                $sonCheckBox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }
            } else {
                //单个商品取消勾选，全局全选取消勾选
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');
            }
        })
    });

//=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

//店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
    $shopCheckbox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //判断：店铺全选中，则全局全选按钮打对勾。
                var len = $shopCheckbox.length;
                var num = 0;
                $shopCheckbox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }

                //店铺下的checkbox选中状态
                $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
            } else {
                //否则，全局全选按钮取消对勾
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');

                //店铺下的checkbox选中状态
                $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
            }
            totalMoney();
        });
    });


//========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

//店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
    $cartBox.each(function () {
        var $this = $(this);
        var $sonChecks = $this.find('.son_check');
        $sonChecks.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                    var len = $sonChecks.length;
                    var num = 0;
                    $sonChecks.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                    }

                } else {
                    //否则，店铺全选取消
                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                    $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });
    });


    //=================================================商品数量==============================================
    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');
    $plus.click(function () {
        var $inputVal = $(this).prev('input'),
            $count = Number(parseInt($inputVal.val()) + 1);
        var $productId = $(this).next('span').text();
        $.ajax({
            url:"/cart/updateCartProductNum",
            dataType:"json",
            type: "POST",
            data:{
                "productId":$productId,
                "nums":$count
            },
            success : function (result){
                uls.html('');
                showData(result);

            },error : function (data){
                console.log(data.responseText);

            }
        });
        totalMoney();
    });

    $reduce.click(function () {
        var $inputVal = $(this).next('input'),
            $count = Number(parseInt($inputVal.val()) - 1);
        if ($inputVal.val() > 1) {
            $inputVal.val($count);
            /*$priceTotalObj.html('￥' + Number($priceTotal).toFixed(2));*/
        }
        if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
        $(this).addClass('reSty');
            $count = 1;
        }
        var $productId = $(this).next('input').next('a').next('span').text();
        if($count>1||$count==1){
            $.ajax({
                url:"/cart/updateCartProductNum",
                dataType:"json",
                type: "POST",
                data:{
                    "productId":$productId,
                    "nums":$count
                },
                success : function (result){
                    uls.html('');
                    showData(result);

                },error : function (data){
                    console.log(data.responseText);

                }
            });
        }
        totalMoney();
    });

    $all_sum.keyup(function () {
        var $count = 0;
        if ($(this).val() == '') {
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g, ''));
        $count = $(this).val();
        /*$priceTotal = Number($count * Number($price.substring(1)));*/
        $(this).attr('value', $count);
        /*$priceTotalObj.html('￥' + Number($priceTotal).toFixed(2));*/

        var $productId = $(this).next('a').next('span').text();
        $.ajax({
            url:"/cart/updateCartProductNum",
            dataType:"json",
            type: "POST",
            data:{
                "productId":$productId,
                "nums":$count
            },
            success : function (result){
                uls.html('');
                showData(result);

            },error : function (data){
                console.log(data.responseText);

            }
        });
        totalMoney();
    });

//======================================移除商品========================================

    var $order_lists = null;
    var $order_content = '';
    var $productId = "";
    var $count = 0;
    $('.delBtn').click(function () {
        $productId = $(this).parent('.del').parent('.list_op').prev('.list_sum').prev('.list_amount').children('.amount_box').children('.productId').text();
        $count = $(this).parent('.del').parent('.list_op').prev('.list_sum').prev('.list_amount').children('.amount_box').children('.sum').val();
        $order_lists = $(this).parents('.order_lists');
        $order_content = $order_lists.parents('.order_content');
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);
    });

//关闭模态框
    $('.closeModel').click(function () {
        closeM();
    });
    $('.dialog-close').click(function () {
        closeM();
    });

    function closeM() {
        $('.model_bg').fadeOut(300);
        $('.my_model').fadeOut(300);
    }

//确定按钮，移除商品
    $('.dialog-sure').click(function () {
        /*$order_lists.remove();
        if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
            $order_content.parents('.cartBox').remove();
        }*/
        $.ajax({
            url:"/cart/delCartProduct",
            dataType:"json",
            type: "POST",
            data:{
                "productId":$productId,
                "nums":$count
            },
            success : function (result){
                uls.html('');
                showData(result);

            },error : function (data){
                console.log(data.responseText);

            }
        });
        closeM();
        //$sonCheckBox = $('.son_check');
        totalMoney();
    })

//======================================总计==========================================

    function totalMoney() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                var goods = Number($(this).parents('.order_lists').find('.sum_price').html().substring(1)).toFixed(2);
                /*var n = goods.toFixed(2);*/
                var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                total_money = Number(total_money)+Number(goods);
                total_count += num;
            }
        });
        $('.total_text').html('￥'+Number(total_money).toFixed(2));
        $('.piece_num').html(total_count);

        if(total_money!=0 && total_count!=0){
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
                calBtn.removeClass('btn_sty');
            }
        }
    }

}

/**
 * 结算
 * */
    $(".calBtn").click(function () {
        var productIds = [];
        $('.productList input:checkbox[name=productId]:checked').each(function (i) {
            productIds.push($(this).val())
        })
        var totalMoney = $(".totalMoney .total_text").text().substring(1);
        var totalNum = $(".piece .piece_num").text();
        $.ajax({
            url:"/order/submitOrder",
            dataType:"json",
            type: "POST",
            data:{
                "productIds":productIds,
                "totalMoney":totalMoney,
                "totalNum":totalNum
            },
            traditional:true,      //防止深度序列化
            cache:false,
            async:false,
            success : function (result){
                if(result.data){

                    /**
                     * 确认订单提交的时候在删除
                     * */
                   /* $.ajax({
                        url:"/cart/delProductByProductIds",
                        dataType:"json",
                        type: "POST",
                        data:{
                            "productIds":productIds
                        },
                        success : function (result){
                           /!* uls.html('');
                            totalMoney.text('');    //恢复总计样式
                            totalNum.text('');  //恢复购买数量样式
                            showData(result);*!/
                        },error : function (data){
                            console.log(data.responseText);

                        }
                    });*/
                    location.href = '/beforePage/toCheckout?orderId='+result.orderId;
                }else{
                    console.log("失败！");
                }

            },error : function (data){
                console.log(data.responseText);

            }
        });

    })

});


