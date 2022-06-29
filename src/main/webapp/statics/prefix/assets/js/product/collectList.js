/**
 *
 * */
var currentPage = 1;
var total = showProductToCollect(currentPage) ;
console.log("total--->"+total);
$(function () {

    showProductToCollect(currentPage);
});

/**
 * 分页显示收藏夹商品
 * */
function showProductToCollect(currentPage) {

    $.ajax({
        dataType: "JSON",
        type: "POST",
        async:false,    //设置为同步，中间变量返回中间变量
        timeout: 20000,
        url: "/collect/showCollect",
        data:{
            currentPage:currentPage,
            pageSize:3
        },
        success : function (data,state) {
            console.log("state--->"+state);
            console.log("data---->"+data);

            var content = '';
            if(data.list.length>0){
                $(".noProduct").hide();
                $(".collectListTable").show();
                $('tbody').html('');
                total = data.total;

                for(var i=0;i<data.list.length;i++){
                    content += "<tr>\n" +
                        "                                    <td class=\"product_remove\"><a class='del' onclick='del("+data.list[i].productId+"); '>X</a></td>\n" +
                        "                                    <td class=\"product_thumb\"><a href=\"#\"><img src=\"/uploadfiles/productImg/"+data.list[i].productImg+"\" alt=\"\"></a></td>\n" +
                        "                                    <td class=\"product_name\"><a href=\"#\">"+data.list[i].productName+"</a></td>\n" +
                        "                                    <td class=\"product-price\">￥"+data.list[i].productPrice+"</td>\n" +
                        "                                    <td class=\"product_quantity productNum\">"+(data.list[i].productNum>0?'有货':'无货')+"</td>\n" +
                        "                                    <td class=\"product_total\"><a onclick='add("+data.list[i].productId+");'>加入购物车</a></td>\n" +
                        "                                </tr>";


                }
                $('tbody').html('');
                $('tbody').append(content);
            }else{
                //显示一张图片
                $(".collectListTable").hide();
                $("#demo2").hide();
                $(".noProduct").show();
            }
        },
        error : function (data){
            alert(data.responseText);
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
        ,limit:3
        ,theme: '#28a745;'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if(!first){
                //清空以前加载的数据
                $(".t").html("");
                //
                showProductToCollect(obj.curr)
                //do something
            }
        }
    });
});


/**
 * 根据商品ID删除商品
 * */
function del(productId) {
    console.log("productId----->"+productId);
    $.ajax({
        dataType: "JSON",
        type: "POST",
        data:{
            "productId":productId
        },
        timeout: 20000,
        url: "/collect/delCollectProduct",
        success : function (data,state) {
            console.log("state--->"+state);
            console.log("data---->"+data);
            if(data==1){
                total = showProductToCollect(currentPage);
                console.log("total2--->"+total);
                $(".header_wishlist .lnr-heart").html("");
                $(".header_wishlist .lnr-heart").append("<span class=\"item_count\">"+total+"</span>");
                layui.use(['laypage', 'layer'], function(){
                    var laypage = layui.laypage
                        ,layer = layui.layer;


                    //自定义样式
                    laypage.render({
                        elem: 'demo2'
                        ,count: total
                        ,limit:3
                        ,theme: '#28a745;'
                        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
                        ,jump: function(obj, first){
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            console.log(obj.limit); //得到每页显示的条数

                            //首次不执行
                            if(!first){
                                //清空以前加载的数据
                                $(".t").html("");
                                //
                                showProductToCollect(obj.curr)
                                //do something
                            }
                        }
                    });
                });
            }
        },
        error : function (data){
            alert(data.responseText);
        }

    })
}

/**
 * 商品加入购物车
 * */

function add(productId) {
    console.log("productId----->"+productId);

    $.ajax({
        dataType: "JSON",
        type: "POST",
        data:{
            "productId":productId
        },
        timeout: 20000,
        url: "/cart/addProductToCart",
        success : function (result) {
            console.log("result---->"+result);
            if(result!=null){

                for(var keys in result.cartItems){
                    console.log("result.lssgCart[keys]--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys]);
                    console.log("result.lssgCart[keys].buyNum--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].buyNum);
                    console.log("result.lssgCart[keys].cartState--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].cartState);
                    console.log("result.lssgCart[keys].subtotalPrice--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].subtotalPrice);
                    console.log("------------------1-------------------");
                    console.log("result.lssgCart[keys].lssgProduct--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct);
                    console.log("result.lssgCart[keys].lssgProduct.productName--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.productName);
                    console.log("result.lssgCart[keys].lssgProduct.productMallPrice--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.productMallPrice);
                    console.log("------------------2-------------------");
                    console.log("result.lssgCart[keys].lssgProduct.lssgProductClass--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.lssgProductClass);
                    console.log("result.lssgCart[keys].lssgProduct.lssgProductClass.productClassName--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.lssgProductClass.productClassName);
                    console.log("result.lssgCart[keys].lssgProduct.lssgProductClass.productIsShow--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.lssgProductClass.productIsShow);
                }

                location.href='/beforePage/toCart';
            }else{
                location.href='/beforePage/toLogin';
            }
        },
        error : function (data){
            alert(data.responseText);
        }

    })
}