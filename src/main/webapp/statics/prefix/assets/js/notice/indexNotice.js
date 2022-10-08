/*$(window).on('load', function () {
    showNoticeClass();
    showProduct();
});*/

$(function () {
    showNoticeClass();
    /**
     *数据条数影响商品显示，下标越界
     * */
    var data1 = {"productClassId":2,"isNew":0,"isBest":0};
    var index = 0;
    showProduct(data1,index);

    /**
     *
     * */
    var data2 = {"productClassId":1,"isNew":0,"isBest":0};
    var index2 = 1;
    showProduct(data2,index2);

    /**
     *  数据条数影响商品显示，下标越界
     * */
    var data3 = {"isHot":0};
    var index3 = 1;
    showProduct1(data3,index3);


    /**
     *
     * */
    //var data4 = {"isSpecial":0};
    var index4 = 4;
    showProduct3(index4);


    /**
     *数据条数影响商品显示，下标越界
     * */
    var data5 = {"isSpecial":0};
    var index5 = 0;
    showProduct4(data5,index5);


    //showMessage();

    //addCollect();       //加载加入收藏夹功能
});





/**
 *
 * */
function showNoticeClass() {
    $.ajax({
        dataType: "JSON",
        data: {
            "locationId":2
        },
        type: "POST",
        timeout: 20000,
        url: "/publicClass/findAllByLocation",
        success : function (result) {
            var sHtml = "";
            var aHtml = "";
            for(var i=0;i<result.length;i++){

               sHtml += "<div class=\"single_slider d-flex align-items-center\" data-bgimg=\"/uploadfiles/notice/"+result[i].publicClassImg+"\">\n" +
                   "            <div class=\"container\">\n" +
                   "                <div class=\"row\">\n" +
                   "                    <div class=\"col-lg-6\">\n" +
                   "                        <div class=\"slider_content\">\n" +
                   "                            <h1>"+result[i].publicClassName+"</h1>\n" +
                   "                            <h2>新鲜的农产品</h2>\n" +
                   "                            <p>"+result[i].publicDescription+"</p>\n" +
                   "                            <a href=\"/beforePage/toNotices?publicClassId="+result[i].publicClassId+"\">阅读更多 </a>\n" +
                   "                        </div>\n" +
                   "                    </div>\n" +
                   "                </div>\n" +
                   "            </div>\n" +
                   "        </div>";
            }
            $('.noticeList').append(sHtml);

            dataBackgroundImage();
            var $slider = $('.slider_area');
            if($slider.length > 0){
                $slider.owlCarousel({
                    animateOut: 'fadeOut',
                    autoplay: true,
                    loop: true,
                    nav: false,
                    autoplayTimeout: 5000,
                    items: 1,
                    dots:true,
                });
            }
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}


/*
function showOneClassInfo(publicClassId) {
    ///beforePage/toNotices
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        url: "/publicClass/findAllByLocation",
        success: function (result) {

        },
        error : function (data){
            alert(data.responseText);
        }
    });
}*/



function showProduct(data,index) {
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',
        data:JSON.stringify(data),
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findSomeProductByMap",
        success : function (result){
            var productHtml = "";
            if(result.length%2==0){
                for(var i=0;i<result.length;i++){

                     productHtml += "<div class=\"product_items\">\n" +
             "                                    <article class=\"single_product\">\n" +
             "                                        <figure>\n" +
             "                                            <div class=\"product_thumb\">\n" +
             "\n" +
             "                                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
             "                                                <div class=\"label_product\">\n" +
             "                                                    <span class=\"label_sale\">销售</span>\n" +
             "                                                    <span class=\"label_new\">新鲜的</span>\n" +
             "                                                </div>\n" +
             "                                                <div class=\"action_links\">\n" +
             "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
             "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i].productPhoto+"' name=\"img\">\n" +
             "                                                    <ul>\n" +
             "                                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i].productId+","+1+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
             "                                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
             "                                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
             "                                                    </ul>\n" +
             "                                                </div>\n" +
             "                                            </div>\n" +
             "                                            <figcaption class=\"product_content\">\n" +
             "                                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\">"+result[i].productName+"</a></h4>\n" +
             "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
             "                                                <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
             "                                                <div class=\"price_box\">\n" +
             "                                                    <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
             "                                                    <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
             "                                                </div>\n" +
             "                                            </figcaption>\n" +
             "                                        </figure>\n" +
             "                                    </article>\n" +
             "\n" +
             "                                    <article class=\"single_product\">\n" +
             "                                        <figure>\n" +
             "                                            <div class=\"product_thumb\">\n" +
             "\n" +
             "                                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+1].productPhoto+"\" alt=\"\"></a>\n" +
             "                                                <div class=\"label_product\">\n" +
             "                                                    <span class=\"label_sale\">销售</span>\n" +
             "                                                    <span class=\"label_new\">新鲜的</span>\n" +
             "                                                </div>\n" +
             "                                                <div class=\"action_links\">\n" +
             "                                                    <span class=\"productId\" hidden>"+result[i+1].productId+"</span>\n" +
             "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+1].productPhoto+"' name=\"img\">\n" +
             "                                                    <ul>\n" +
             "                                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i+1].productId+","+1+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
             "                                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
             "                                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+1].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
             "                                                    </ul>\n" +
             "                                                </div>\n" +
             "                                            </div>\n" +
             "                                            <figcaption class=\"product_content\">\n" +
             "                                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i+1].productName+"</a></h4>\n" +
             "                                                <span class=\"productNum\" hidden>"+result[i+1].productNum+"</span>\n" +
             "                                                <p><a href=\"#\">"+result[i+1].lssgProductClass.productClassName+"</a></p>\n" +
             "                                                <div class=\"price_box\">\n" +
             "                                                    <span class=\"current_price\">$"+Number(result[i+1].productMallPrice).toFixed(2)+"</span>\n" +
             "                                                    <span class=\"old_price\">$"+Number(result[i+1].productMarketPrice).toFixed(2)+"</span>\n" +
             "                                                </div>\n" +
             "                                            </figcaption>\n" +
             "                                        </figure>\n" +
             "                                    </article>\n" +
             "\n" +
             "                                </div>";

                   /* productHtml += "<div class=\"product_items\">\n" +
                        "                                    <article class=\"single_product\">\n" +
                        "                                        <figure>\n" +
                        "                                            <div class=\"product_thumb\">\n" +
                        "\n" +
                        "                                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
                        "                                                <div class=\"label_product\">\n" +
                        "                                                    <span class=\"label_sale\">销售</span>\n" +
                        "                                                    <span class=\"label_new\">新鲜的</span>\n" +
                        "                                                </div>\n" +
                        "                                                <div class=\"action_links\">\n" +
                        "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
                        "                                                    <input type=\"hidden\" class=\"imgPath\" name=\"img\">\n" +
                        "                                                    <ul>\n" +
                        "                                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i].productId+","+result[i].productNum+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                        "                                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                        "                                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\"><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                        "                                                    </ul>\n" +
                        "                                                </div>\n" +
                        "                                            </div>\n" +
                        "                                            <figcaption class=\"product_content\">\n" +
                        "                                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails\">"+result[i].productName+"</a></h4>\n" +
                        "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
                        "                                                <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
                        "                                                <div class=\"price_box\">\n" +
                        "                                                    <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
                        "                                                    <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
                        "                                                </div>\n" +
                        "                                            </figcaption>\n" +
                        "                                        </figure>\n" +
                        "                                    </article>\n" +
                        "\n" +
                        "                                </div>";*/
                    i++;

                }
            }else if(result.length%2==1){
                for(var i=0;i<result.length;i++){
                    if(i == result.length-1){
                        i=i-1;
                    }

                     productHtml += "<div class=\"product_items\">\n" +
             "                                    <article class=\"single_product productT\">\n" +
             "                                        <figure>\n" +
             "                                            <div class=\"product_thumb\">\n" +
             "\n" +
             "                                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
             "                                                <div class=\"label_product\">\n" +
             "                                                    <span class=\"label_sale\">销售</span>\n" +
             "                                                    <span class=\"label_new\">新鲜的</span>\n" +
             "                                                </div>\n" +
             "                                                <div class=\"action_links\">\n" +
             "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
             "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i].productPhoto+"' name=\"img\">\n" +
             "                                                    <ul>\n" +
             "                                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i].productId+","+1+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
             "                                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
             "                                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
             "                                                    </ul>\n" +
             "                                                </div>\n" +
             "                                            </div>\n" +
             "                                            <figcaption class=\"product_content\">\n" +
             "                                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\">"+result[i].productName+"</a></h4>\n" +
             "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
             "                                                <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
             "                                                <div class=\"price_box\">\n" +
             "                                                    <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
             "                                                    <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
             "                                                </div>\n" +
             "                                            </figcaption>\n" +
             "                                        </figure>\n" +
             "                                    </article>\n" +
             "\n" +
             "                                    <article class=\"single_product productT\">\n" +
             "                                        <figure>\n" +
             "                                            <div class=\"product_thumb\">\n" +
             "\n" +
             "                                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+1].productPhoto+"\" alt=\"\"></a>\n" +
             "                                                <div class=\"label_product\">\n" +
             "                                                    <span class=\"label_sale\">销售</span>\n" +
             "                                                    <span class=\"label_new\">新鲜的</span>\n" +
             "                                                </div>\n" +
             "                                                <div class=\"action_links\">\n" +
             "                                                    <span class=\"productId\" hidden>"+result[i+1].productId+"</span>\n" +
             "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+1].productPhoto+"' name=\"img\">\n" +
             "                                                    <ul>\n" +
             "                                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i+1].productId+","+1+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
             "                                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
             "                                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+1].productId+",);'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
             "                                                    </ul>\n" +
             "                                                </div>\n" +
             "                                            </div>\n" +
             "                                            <figcaption class=\"product_content\">\n" +
             "                                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i+1].productName+"</a></h4>\n" +
             "                                                <span class=\"productNum\" hidden>"+result[i+1].productNum+"</span>\n" +
             "                                                <p><a href=\"#\">"+result[i+1].lssgProductClass.productClassName+"</a></p>\n" +
             "                                                <div class=\"price_box\">\n" +
             "                                                    <span class=\"current_price\">$"+Number(result[i+1].productMallPrice).toFixed(2)+"</span>\n" +
             "                                                    <span class=\"old_price\">$"+Number(result[i+1].productMarketPrice).toFixed(2)+"</span>\n" +
             "                                                </div>\n" +
             "                                            </figcaption>\n" +
             "                                        </figure>\n" +
             "                                    </article>\n" +
             "\n" +
             "                                </div>";

                   /* productHtml += "<div class=\"product_items\">\n" +
                        "                                    <article class=\"single_product\">\n" +
                        "                                        <figure>\n" +
                        "                                            <div class=\"product_thumb\">\n" +
                        "\n" +
                        "                                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
                        "                                                <div class=\"label_product\">\n" +
                        "                                                    <span class=\"label_sale\">销售</span>\n" +
                        "                                                    <span class=\"label_new\">新鲜的</span>\n" +
                        "                                                </div>\n" +
                        "                                                <div class=\"action_links\">\n" +
                        "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
                        "                                                    <input type=\"hidden\" class=\"imgPath\" name=\"img\">\n" +
                        "                                                    <ul>\n" +
                        "                                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i].productId+","+result[i].productNum+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                        "                                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                        "                                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\"><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                        "                                                    </ul>\n" +
                        "                                                </div>\n" +
                        "                                            </div>\n" +
                        "                                            <figcaption class=\"product_content\">\n" +
                        "                                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails\">"+result[i].productName+"</a></h4>\n" +
                        "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
                        "                                                <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
                        "                                                <div class=\"price_box\">\n" +
                        "                                                    <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
                        "                                                    <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
                        "                                                </div>\n" +
                        "                                            </figcaption>\n" +
                        "                                        </figure>\n" +
                        "                                    </article>\n" +
                        "\n" +
                        "                                </div>";*/

                    if(i<=result.length-2){
                        i++;
                    }else{
                        i = result.length-3;
                    }



                }
            }


            $(".productList").eq(index).append(productHtml);
            if(result.length%2==1){
                $(".productT").eq(result.length-1).hide();
            }
            var $porductColumn5 =  $('.product_column5').eq(index);
            //var $porductColumn5 =  $('.product_column5');
            if($porductColumn5.length > 0){
                $porductColumn5.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                    $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')}).owlCarousel({
                    //autoplay: true,
                    //loop: true,
                    nav: true,
                   //autoplayTimeout: 5000,
                    items: 5,
                    margin: 20,
                    dots:false,
                    navText: ['<i class="ion-ios-arrow-left"></i>','<i class="ion-ios-arrow-right"></i>'],
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        576:{
                            items:2,
                        },
                        768:{
                            items:3,
                        },
                        992:{
                            items:4,
                        },
                        1200:{
                            items:5,
                        },

                    }
                });
            }


        },
        error : function (data){
            alert(data.responseText);
        }
    });
}


function dataBackgroundImage() {
    $('[data-bgimg]').each(function () {
        var bgImgUrl = $(this).data('bgimg');
        $(this).css({
            'background-image': 'url(' + bgImgUrl + ')', // + meaning concat
        });
    });
}

/**
 *
 * */
function showProduct1(data,index) {
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',
        data:JSON.stringify(data),
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findSomeProductByMap",
        success : function (result){
            var productHtml = "";
            for(var i=0;i<result.length-1;i++){



                if(result.length%3==0){
                    for(var i=0;i<result.length;i++){

                        productHtml += "<div class=\"product_items\">\n" +
                   "                            <article class=\"single_product\">\n" +
                   "                                <figure>\n" +
                   "                                    <div class=\"product_thumb\">\n" +
                   "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
                   "                                    </div>\n" +
                   "                                    <figcaption class=\"product_content\">\n" +
                   "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i].productName+"</a></h4>\n" +
                   "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
                   "                                        <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
                   "                                        <div class=\"action_links\">\n" +
                   "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
                   "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i].productPhoto+"' name=\"img\">\n" +
                   "                                            <ul>\n" +
                   "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                   "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                   "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                   "                                            </ul>\n" +
                   "                                        </div>\n" +
                   "                                        <div class=\"price_box\">\n" +
                   "                                            <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
                   "                                            <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
                   "                                        </div>\n" +
                   "                                    </figcaption>\n" +
                   "                                </figure>\n" +
                   "                            </article>\n" +
                   "                            <article class=\"single_product\">\n" +
                   "                                <figure>\n" +
                   "                                    <div class=\"product_thumb\">\n" +
                   "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+1].productPhoto+"\" alt=\"\"></a>\n" +
                   "                                    </div>\n" +
                   "                                    <figcaption class=\"product_content\">\n" +
                   "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i+1].productName+"</a></h4>\n" +
                   "                                                <span class=\"productNum\" hidden>"+result[i+1].productNum+"</span>\n" +
                   "                                        <p><a href=\"#\">"+result[i+1].lssgProductClass.productClassName+"</a></p>\n" +
                   "                                        <div class=\"action_links\">\n" +
                   "                                                    <span class=\"productId\" hidden>"+result[i+1].productId+"</span>\n" +
                   "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+1].productPhoto+"' name=\"img\">\n" +
                   "                                            <ul>\n" +
                   "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i+1].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                   "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                   "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+1].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                   "                                            </ul>\n" +
                   "                                        </div>\n" +
                   "                                        <div class=\"price_box\">\n" +
                   "                                            <span class=\"current_price\">$"+Number(result[i+1].productMallPrice).toFixed(2)+"</span>\n" +
                   "                                            <span class=\"old_price\">$"+Number(result[i+1].productMarketPrice).toFixed(2)+"</span>\n" +
                   "                                        </div>\n" +
                   "                                    </figcaption>\n" +
                   "                                </figure>\n" +
                   "                            </article>\n" +
                   "                            <article class=\"single_product\">\n" +
                   "                                <figure>\n" +
                   "                                    <div class=\"product_thumb\">\n" +
                   "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+2].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+2].productPhoto+"\" alt=\"\"></a>\n" +
                   "                                    </div>\n" +
                   "                                    <figcaption class=\"product_content\">\n" +
                   "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+2].productId+"\">"+result[i+2].productName+"</a></h4>\n" +
                   "                                                <span class=\"productNum\" hidden>"+result[i+2].productNum+"</span>\n" +
                   "                                        <p><a href=\"#\">"+result[i+2].lssgProductClass.productClassName+"</a></p>\n" +
                   "                                        <div class=\"action_links\">\n" +
                   "                                                    <span class=\"productId\" hidden>"+result[i+2].productId+"</span>\n" +
                   "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+2].productPhoto+"' name=\"img\">\n" +
                   "                                            <ul>\n" +
                   "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i+2].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                   "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                   "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+2].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                   "                                            </ul>\n" +
                   "                                        </div>\n" +
                   "                                        <div class=\"price_box\">\n" +
                   "                                            <span class=\"current_price\">$"+Number(result[i+2].productMallPrice).toFixed(2)+"</span>\n" +
                   "                                            <span class=\"old_price\">$"+Number(result[i+2].productMarketPrice).toFixed(2)+"</span>\n" +
                   "                                        </div>\n" +
                   "                                    </figcaption>\n" +
                   "                                </figure>\n" +
                   "                            </article>\n" +
                   "                        </div>";

                        i = i+2;
                    }
                }else{
                    for(var i=0;i<result.length;i++){
                        if(i==result.length-2){
                            i = i-2;
                        }else if(i == result.length-1){
                            i=i-2;
                        }



                        productHtml += "<div class=\"product_items\">\n" +
                   "                            <article class=\"single_product productT2\">\n" +
                   "                                <figure>\n" +
                   "                                    <div class=\"product_thumb\">\n" +
                   "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
                   "                                    </div>\n" +
                   "                                    <figcaption class=\"product_content\">\n" +
                   "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i].productName+"</a></h4>\n" +
                   "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
                   "                                        <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
                   "                                        <div class=\"action_links\">\n" +
                   "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
                   "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i].productPhoto+"' name=\"img\">\n" +
                   "                                            <ul>\n" +
                   "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                   "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                   "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                   "                                            </ul>\n" +
                   "                                        </div>\n" +
                   "                                        <div class=\"price_box\">\n" +
                   "                                            <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
                   "                                            <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
                   "                                        </div>\n" +
                   "                                    </figcaption>\n" +
                   "                                </figure>\n" +
                   "                            </article>\n" +
                   "                            <article class=\"single_product productT2\">\n" +
                   "                                <figure>\n" +
                   "                                    <div class=\"product_thumb\">\n" +
                   "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+1].productPhoto+"\" alt=\"\"></a>\n" +
                   "                                    </div>\n" +
                   "                                    <figcaption class=\"product_content\">\n" +
                   "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i+1].productName+"</a></h4>\n" +
                   "                                                <span class=\"productNum\" hidden>"+result[i+1].productNum+"</span>\n" +
                   "                                        <p><a href=\"#\">"+result[i+1].lssgProductClass.productClassName+"</a></p>\n" +
                   "                                        <div class=\"action_links\">\n" +
                   "                                                    <span class=\"productId\" hidden>"+result[i+1].productId+"</span>\n" +
                   "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+1].productPhoto+"' name=\"img\">\n" +
                   "                                            <ul>\n" +
                   "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i+1].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                   "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                   "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+1].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                   "                                            </ul>\n" +
                   "                                        </div>\n" +
                   "                                        <div class=\"price_box\">\n" +
                   "                                            <span class=\"current_price\">$"+Number(result[i+1].productMallPrice).toFixed(2)+"</span>\n" +
                   "                                            <span class=\"old_price\">$"+Number(result[i+1].productMarketPrice).toFixed(2)+"</span>\n" +
                   "                                        </div>\n" +
                   "                                    </figcaption>\n" +
                   "                                </figure>\n" +
                   "                            </article>\n" +
                   "                            <article class=\"single_product productT2\">\n" +
                   "                                <figure>\n" +
                   "                                    <div class=\"product_thumb\">\n" +
                   "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+2].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+2].productPhoto+"\" alt=\"\"></a>\n" +
                   "                                    </div>\n" +
                   "                                    <figcaption class=\"product_content\">\n" +
                   "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+2].productId+"\">"+result[i+2].productName+"</a></h4>\n" +
                   "                                                <span class=\"productNum\" hidden>"+result[i+2].productNum+"</span>\n" +
                   "                                        <p><a href=\"#\">"+result[i+2].lssgProductClass.productClassName+"</a></p>\n" +
                   "                                        <div class=\"action_links\">\n" +
                   "                                                    <span class=\"productId\" hidden>"+result[i+2].productId+"</span>\n" +
                   "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+2].productPhoto+"' name=\"img\">\n" +
                   "                                            <ul>\n" +
                   "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i+2].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                   "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                   "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+2].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                   "                                            </ul>\n" +
                   "                                        </div>\n" +
                   "                                        <div class=\"price_box\">\n" +
                   "                                            <span class=\"current_price\">$"+Number(result[i+2].productMallPrice).toFixed(2)+"</span>\n" +
                   "                                            <span class=\"old_price\">$"+Number(result[i+2].productMarketPrice).toFixed(2)+"</span>\n" +
                   "                                        </div>\n" +
                   "                                    </figcaption>\n" +
                   "                                </figure>\n" +
                   "                            </article>\n" +
                   "                        </div>";





                        if(i<=result.length-3){
                            i = i+2;
                        }else{
                            i = result.length-4;
                        }



                    }
                }


            }

            $("#pList").append(productHtml);
            if(result.length%3==2){

                $(".productT2").eq(result.length+4-2).remove();
                $(".productT2").eq(result.length+4-3).remove();
                $(".productT2").eq(result.length+4-4).remove();
                $(".productT2").eq(result.length+4-5).remove();
                $(".productT2").eq(result.length+4-6).remove();

                if($('.product_items').length==0){$('.product_items').remove()}
            }
            if(result.length%3==1){

                $(".productT2").eq(result.length).remove();
                $(".productT2").eq(result.length-1).remove();
            }


            var $productColumn2 = $('.product_column2');
            if($productColumn2.length > 0){
                $productColumn2.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                    $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')}).owlCarousel({
                    autoplay: true,
                    loop: true,
                    nav: false,
                    autoplayTimeout: 8000,
                    items: 2,
                    dots:false,
                    margin: 20,
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        768:{
                            items:1,
                        },
                        992:{
                            items:2,
                        },
                    }
                });
            }


        },
        error : function (data){
            alert(data.responseText);
        }
    });
}


/**
 *
 * */
function showProduct3(index) {
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findSomeProductByProduct",
        success : function (result){
            var productHtml = "";
            for(var i=0;i<result.length;i++){

                productHtml += "<article class=\"single_product\">\n" +
                    "                            <figure>\n" +
                    "                                <div class=\"product_thumb\">\n" +
                    "\n" +
                    "                                    <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
                    "                                    <div class=\"label_product\">\n" +
                    "                                        <span class=\"label_sale\">销售</span>\n" +
                    "                                        <span class=\"label_new\">新鲜的</span>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"action_links\">\n" +
                    "                                        <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
                    "                                        <input type=\"hidden\" class=\"imgPath\" value='"+result[i].productPhoto+"' name=\"img\">\n" +
                    "                                        <ul>\n" +
                    "                                            <li class=\"add_to_cart\"><a onclick=\"addToCart("+result[i].productId+","+1+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                    "                                            <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                    "                                            <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                    "                                        </ul>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                                <figcaption class=\"product_content\">\n" +
                    "                                    <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\">"+result[i].productName+"</a></h4>\n" +
                    "                                    <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
                    "                                    <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
                    "                                    <div class=\"price_box\">\n" +
                    "                                        <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
                    "                                        <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
                    "                                    </div>\n" +
                    "                                </figcaption>\n" +
                    "                            </figure>\n" +
                    "                        </article>";


            }
            $("#pList2").append(productHtml);
            var $porductColumn5 =  $('.product_column5').eq(index);
            //var $porductColumn5 =  $('.product_column5');
            if($porductColumn5.length > 0){
                $porductColumn5.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                    $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')}).owlCarousel({
                    autoplay: true,
                    loop: true,
                    nav: true,
                    autoplayTimeout: 5000,
                    items: 5,
                    margin: 20,
                    dots:false,
                    navText: ['<i class="ion-ios-arrow-left"></i>','<i class="ion-ios-arrow-right"></i>'],
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        576:{
                            items:2,
                        },
                        768:{
                            items:3,
                        },
                        992:{
                            items:4,
                        },
                        1200:{
                            items:5,
                        },

                    }
                });
            }
           // addCollect();       //加载加入收藏夹功能
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}




/**
 *
 * */
function showProduct4(data,index) {
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',
        data:JSON.stringify(data),
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findSomeProductByMap",
        success : function (result){
            var productHtml = "";

            for(var i=0;i<result.length-1;i++){
                productHtml = "<div class=\"product_items\">\n" +
                    "                            <article class=\"single_product\">\n" +
                    "                                <figure>\n" +
                    "                                    <div class=\"product_thumb\">\n" +
                    "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i].productPhoto+"\" alt=\"\"></a>\n" +
                    "                                    </div>\n" +
                    "                                    <figcaption class=\"product_content\">\n" +
                    "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i].productId+"\">"+result[i].productName+"</a></h4>\n" +
                    "                                                <span class=\"productNum\" hidden>"+result[i].productNum+"</span>\n" +
                    "                                        <p><a href=\"#\">"+result[i].lssgProductClass.productClassName+"</a></p>\n" +
                    "                                        <div class=\"action_links\">\n" +
                    "                                                    <span class=\"productId\" hidden>"+result[i].productId+"</span>\n" +
                    "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i].productPhoto+"' name=\"img\">\n" +
                    "                                            <ul>\n" +
                    "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                    "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                    "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                    "                                            </ul>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"price_box\">\n" +
                    "                                            <span class=\"current_price\">$"+Number(result[i].productMallPrice).toFixed(2)+"</span>\n" +
                    "                                            <span class=\"old_price\">$"+Number(result[i].productMarketPrice).toFixed(2)+"</span>\n" +
                    "                                        </div>\n" +
                    "                                    </figcaption>\n" +
                    "                                </figure>\n" +
                    "                            </article>\n" +
                    "                            <article class=\"single_product\">\n" +
                    "                                <figure>\n" +
                    "                                    <div class=\"product_thumb\">\n" +
                    "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+1].productPhoto+"\" alt=\"\"></a>\n" +
                    "                                    </div>\n" +
                    "                                    <figcaption class=\"product_content\">\n" +
                    "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+1].productId+"\">"+result[i+1].productName+"</a></h4>\n" +
                    "                                                <span class=\"productNum\" hidden>"+result[i+1].productNum+"</span>\n" +
                    "                                        <p><a href=\"#\">"+result[i+1].lssgProductClass.productClassName+"</a></p>\n" +
                    "                                        <div class=\"action_links\">\n" +
                    "                                                    <span class=\"productId\" hidden>"+result[i+1].productId+"</span>\n" +
                    "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+1].productPhoto+"' name=\"img\">\n" +
                    "                                            <ul>\n" +
                    "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i+1].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                    "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                    "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+1].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                    "                                            </ul>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"price_box\">\n" +
                    "                                            <span class=\"current_price\">$"+Number(result[i+1].productMallPrice).toFixed(2)+"</span>\n" +
                    "                                            <span class=\"old_price\">$"+Number(result[i+1].productMarketPrice).toFixed(2)+"</span>\n" +
                    "                                        </div>\n" +
                    "                                    </figcaption>\n" +
                    "                                </figure>\n" +
                    "                            </article>\n" +
                    "                            <article class=\"single_product\">\n" +
                    "                                <figure>\n" +
                    "                                    <div class=\"product_thumb\">\n" +
                    "                                        <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+result[i+2].productId+"\"><img src=\"/uploadfiles/productImg/"+result[i+2].productPhoto+"\" alt=\"\"></a>\n" +
                    "                                    </div>\n" +
                    "                                    <figcaption class=\"product_content\">\n" +
                    "                                        <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+result[i+2].productId+"\">"+result[i+2].productName+"</a></h4>\n" +
                    "                                                <span class=\"productNum\" hidden>"+result[i+2].productNum+"</span>\n" +
                    "                                        <p><a href=\"#\">"+result[i+2].lssgProductClass.productClassName+"</a></p>\n" +
                    "                                        <div class=\"action_links\">\n" +
                    "                                                    <span class=\"productId\" hidden>"+result[i+2].productId+"</span>\n" +
                    "                                                    <input type=\"hidden\" class=\"imgPath\" value='"+result[i+2].productPhoto+"' name=\"img\">\n" +
                    "                                            <ul>\n" +
                    "                                                <li class=\"add_to_cart\"><a onclick='addToCart("+result[i+2].productId+","+1+");' title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                    "                                                <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                    "                                                <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+result[i+2].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                    "                                            </ul>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"price_box\">\n" +
                    "                                            <span class=\"current_price\">$"+Number(result[i+2].productMallPrice).toFixed(2)+"</span>\n" +
                    "                                            <span class=\"old_price\">$"+Number(result[i+2].productMarketPrice).toFixed(2)+"</span>\n" +
                    "                                        </div>\n" +
                    "                                    </figcaption>\n" +
                    "                                </figure>\n" +
                    "                            </article>\n" +
                    "                        </div>";
                i = i+2;
                $("#p3List").append(productHtml);
            }


            var $productColumn3 = $('.product_column3');
            if($productColumn3.length > 0){
                $productColumn3.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                    $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')}).owlCarousel({
                    autoplay: true,
                    loop: true,
                    nav: true,
                    /*autoplay: false,*/
                    autoplayTimeout: 8000,
                    items: 3,
                    dots:false,
                    margin: 20,
                    //navText: ['<i class="ion-ios-arrow-left"></i>','<i class="ion-ios-arrow-right"></i>'],
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        768:{
                            items:2,
                        },
                        992:{
                            items:3,
                        },
                    }
                });
            }
           // addCollect();       //加载加入收藏夹功能
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}


/**
 *
 * */
function showMessage() {
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        url: "/message/findAllMessage",
        success : function (result){
        },error : function (data){
            alert(data.responseText);
        }
    })
}
