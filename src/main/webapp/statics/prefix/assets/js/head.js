$(function () {
    showUserInfo();


    showProductClassList();

    queryProduct();

    countCollect();
    countCart();
});


/**
 *
 * */

function showUserInfo() {
    var username = $(".userLoginName").text().trim().replace(/\s/g,"");
    console.log("username---->"+username);
    if(username==''){
        return;
    }else{
        $.ajax({
            dataType: "JSON",
            data: {
                "username":username
            },
            type: "POST",
            timeout: 20000,
            url: "/userLoginInfo/findOneUserInfo",
            success : function (result) {
                console.log("result--->"+result);

                    $(".user-head").attr("src","/uploadfiles/userImg/"+result.userImg);

            },
            error : function (data){
               // alert(data.responseText);
            }
        });
    }

}

/**
 *
 * */
function showProductClassList() {
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        url: "/LssgProductClass/findByAll",
        success : function (result) {
            var classHtml = "";
            var productHtml = "";
            var k = 0;
            var i=0;
            console.log("result--->"+result);
            if(result!=null) {
                for(i;i<result.length;i++){
                    console.log("result[i].productClassName--->"+result[i].productClassName);
                    classHtml += "<li><a href=\"/beforePage/toFruitsList?productClassId="+result[i].productClassId+"\">"+result[i].productClassName+"</a></li>";
                }

                $(".productClassList").append(classHtml);


                $(".categories_title").on("click", function() {
                    $(this).toggleClass('active');
                    $('.categories_menu_toggle').slideToggle('medium');
                });

                categorySubMenuToggle();

                /*---search box slideToggle---*/
                $(".search_box > a").on("click", function() {
                    $(this).toggleClass('active');
                    $('.search_widget').slideToggle('medium');
                });

                /*---canvas menu activation---*/
                $('.canvas_open').on('click', function(){
                    $('.offcanvas_menu_wrapper,.off_canvars_overlay').addClass('active')
                });

                $('.canvas_close,.off_canvars_overlay').on('click', function(){
                    $('.offcanvas_menu_wrapper,.off_canvars_overlay').removeClass('active')
                });

            }
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}

function categorySubMenuToggle(){
    $('.categories_menu_toggle li.menu_item_children > a').on('click', function(){
        if($(window).width() < 991){
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        }
    });
    $('.categories_menu_toggle li.menu_item_children > a').append('<span class="expand"></span>');
}


function queryProduct() {
    $(".queryProduct").click(function () {
       var title = $(".search_box .productName").val();
        var productName = encodeURI(encodeURI(title));
        if(title==''){
            return;
        }else{

            location.href='/beforePage/toVegetablesList?productName='+productName;
            /*$.ajax({
                dataType: "JSON",
                data: {
                    "productName":productName
                },
                type: "POST",
                timeout: 20000,
                url: "/userLoginInfo/findOneUserInfo",
                success : function (result) {
                    console.log("result--->"+result);
                    if(result!=null) {

                    }
                },
                error : function (data){
                    alert(data.responseText);
                }
            });*/
        }

    })
}


function countCollect() {
    var userLoginName = $(".userLoginName a").text().trim().replace(/\s/g,"");
    if(userLoginName==''){
        return;
    }else{

        $.ajax({
            dataType: "JSON",
            data: {
                "userName":userLoginName
            },
            type: "POST",
            timeout: 20000,
            url: "/collect/countCollect",
            success : function (result) {
                console.log("result--->"+result);
                if(result>0) {
                    $(".header_wishlist .lnr-heart").html("");
                    $(".header_wishlist .lnr-heart").append("<span class=\"item_count\">"+result+"</span>")
                }
            },
            error : function (data){
                alert(data.responseText);
            }
        });
    }
}


function countCart() {
    var userLoginName = $(".userLoginName a").text().trim().replace(/\s/g,"");
    if(userLoginName==''){
        return;
    }else{

        $.ajax({
            dataType: "JSON",
            type: "POST",
            timeout: 20000,
            url: "/cart/countCartItme",
            success : function (result) {
                console.log("result----000000---->"+result);
                if(result>0) {
                    $(".mini_cart_wrapper .lnr-cart").html("");
                    $(".mini_cart_wrapper .lnr-cart").append("<span class=\"item_count\">"+result+"</span>")
                }
            },
            error : function (data){
                alert(data.responseText);
            }
        });
    }
}