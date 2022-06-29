var currentPage = 1;

$(function () {
    var productName = GetQueryString("productName"); //获取地址栏参数
    var query = decodeURI(productName); //只需要转一次码
    var total = querySmoeProduct(query,currentPage);
});

function querySmoeProduct(query,currentPage) {
    $.ajax({
              dataType: "JSON",
              async:false,
              data: {   currentPage:currentPage,
                        pageSize:16,
                        "query":query
                      },
              type: "POST",
              timeout: 20000,
              url: "/LssgProduct/findSomeProductByProductNameWithProductName",
              success : function (data) {
                  total = data.total;
                  if(data.list.length>0) {
                      console.log("data--->"+data);
                      var html = "";
                      for(var i=0;i<data.list.length;i++) {
                          console.log("data.list[i].productName---->"+data.list[i].productName);
                          console.log("data.list[i].lssgProductClass.productClassName---->"+data.list[i].lssgProductClass.productClassName);
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
                              "                                <p><a href=\"#\">Fruits</a></p>\n" +
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
                      $(".page_amount p").html("");
                      $(".page_amount p").append("查询到<span style='color: #00ee00'>"+total+"</span>条数")
                  }
              },
              error : function (data){
                  alert(data.responseText);
              }
          });
}

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
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if(!first){
                //清空以前加载的数据
                //$("#productList").html("");
                //
                var productName = GetQueryString("productName"); //获取地址栏参数
                var query = decodeURI(productName); //只需要转一次码
                querySmoeProduct(query,obj.curr)
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




// 利用正则表达式方式，获取地址栏中的的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null)
        return unescape(r[2]);
    return null;
}