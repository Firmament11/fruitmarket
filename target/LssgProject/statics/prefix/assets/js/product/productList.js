var currentPage = 1;
var shorts = 0;
var total = 0;
$(function () {
    //var productClassId = getQueryVariable("productClassId");
    shorts = $('#short option:selected').val();
    total = getListData(currentPage,shorts) ;

    $(".short").change(function () {
        shorts = $('#short option:selected').val();
        $('#demo2').html('');
        total = getListData(currentPage,shorts);
        layui.use(['laypage', 'layer'], function(){
            var laypage = layui.laypage
                ,layer = layui.layer;

            //自定义样式
            laypage.render({
                elem: 'demo2'
                ,count: total
                ,limit:16
                ,theme: '#71cc2b'
                ,curr: location.hash.replace('#!fenye=', '') //获取起始页
                ,jump: function(obj, first){
                    //首次不执行
                    if(!first){
                        //清空以前加载的数据
                        $("#productList").html("");
                        getListData(obj.curr)
                        //do something
                    }
                }
            });
        });
    });


});


function getListData(currentPage,shorts){

    var productClassId2 = getQueryVariable("productClassId");
    $.ajax({
        type:"POST",
        async:false,    //设置为同步，中间变量返回中间变量
        url:"/LssgProduct/findProductWithPage",
        data:{
            currentPage:currentPage,
            pageSize:16,
            "shorts":shorts,
            "productClassId":productClassId2
        },
        dataType:"json",
        success : function(data){
            total = data.total;
            $(".breadcrumb_content h3").html("");
            $(".productClassNameLi").html("");
            $(".breadcrumb_content h3").text(data.list[0].lssgProductClass.productClassName);
            $(".productClassNameLi").text(data.list[0].lssgProductClass.productClassName);
            $(".page_amount p").html("");
            $(".page_amount p").append("查询到<span style='color: #00ee00'>"+total+"</span>条数")
            var html = "";
            for(var i=0;i<data.list.length;i++) {
                html += " <div class=\"col-lg-3 col-md-4 col-sm-6 col-12 \">\n" +
                    "                        <div class=\"single_product\">\n" +
                    "                            <div class=\"product_thumb\">\n" +
                    "                                <a class=\"primary_img\" href=\"/beforePage/toProductDetails?productId="+data.list[i].productId+"\"><img src=\"/uploadfiles/productImg/"+data.list[i].productPhoto+"\" alt=\"\"></a>\n" +
                    "                                <div class=\"label_product\">\n" +
                    "                                    <span class=\"label_sale\">Sale</span>\n" +
                    "                                    <span class=\"label_new\">New</span>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"action_links\">\n" +
                    "                                    <span class=\"productId\" hidden>"+data.list[i].productId+"</span>\n" +
                    "                                    <input type=\"hidden\" class=\"imgPath\" name=\"img\">\n" +
                    "                                    <ul>\n" +
                    "                                        <li class=\"add_to_cart\"><a onclick=\"addToCart("+data.list[i].productId+","+1+");\" title=\"Add to cart\"><span class=\"lnr lnr-cart\"></span></a></li>\n" +
                    "                                        <li class=\"quick_button\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_box\"  title=\"quick view\"> <span class=\"lnr lnr-magnifier\"></span></a></li>\n" +
                    "                                        <li class=\"wishlist\"><a title=\"Add to Wishlist\" onclick='addCon("+data.list[i].productId+");'><span class=\"lnr lnr-heart\"></span></a></li>\n" +
                    "                                    </ul>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"product_content grid_content\">\n" +
                    "                                <h4 class=\"product_name\"><a href=\"/beforePage/toProductDetails?productId="+data.list[i].productId+"\">"+data.list[i].productName+"</a></h4>\n" +
                    "                                <span class=\"productNum\" hidden>"+data.list[i].productNum+"</span>\n" +
                    "                                <p><a href=\"#\">"+data.list[i].lssgProductClass.productClassName+"</a></p>\n" +
                    "                                <div class=\"price_box\">\n" +
                    "                                    <span class=\"current_price\">$"+Number(data.list[i].productMallPrice).toFixed(2)+"</span>\n" +
                    "                                    <span class=\"old_price\">$"+Number(data.list[i].productMarketPrice).toFixed(2)+"</span>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>";

            }
            $("#productList").html("");
            $("#productList").append(html);
        }


    });
    return total;
}

layui.use(['laypage', 'layer','form'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer;
    var form = layui.form;
    //自定义样式
    laypage.render({
        elem: 'demo2'
        ,count: total
        ,limit:16
        ,theme: '#71cc2b'
        ,curr: location.hash.replace('#!fenye=', '') //获取起始页
        ,jump: function(obj, first){
            //首次不执行
            if(!first){
                //清空以前加载的数据
                $("#productList").html("");
                //
                getListData(obj.curr)
                //do something
            }
        }
    });
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

