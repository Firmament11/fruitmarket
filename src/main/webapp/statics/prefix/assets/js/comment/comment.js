var currentPage = 1;

var total = 0;
$(function () {

    /**
     *
     * */
    var productId = getQueryVariable("productId");
    showProductDetails(productId);
    var index = 0;
    showLikeProduct(productId,index);
    var index2 = 1;
    showHotProduct(productId,index2);

    /**
     *
     * */
    showInfoEffect(productId);
    /**
     *
     * */
    start();

    /**
     *
     * */
    total = getListData(currentPage) ;
    console.log("total--->"+total);

    /**
     *
     * */
    var username = $('#username').text();
    console.log("username---->"+username);
    if(username==''){
        $('.commentDiv').hide();
        $('.reply .reply_content').hide();
        return ;
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
                if(result!=null) {
                    showReply(result.userImg);
                }
            },
            error : function (data){
                alert(data.responseText);
            }
        });
    }


    $('.commentDiv').hide();
    $('.reply .reply_content').hide();

    /**
     *
     * */
    hiddenShow(productId);

    /**
     *
     * */
    submitComment();

    });


    /*$(".comment_text ").mouseenter(function () {

        $(this).children(".reviews_meta").append("<span class=\"reply reply_content\" id='reply_content'>回复</span>");

        $(this).children(".reviews_meta").append("<span class=\"reply reply_delete\">删除</span>");
        $(".comment-send").remove("");

        $("#reply_content").click(function () {
            $(".comment-send").remove("");
            $(".reviews_comment_box").append("<div class=\"comment-send \">" +
                    "<div class=\"user-face\">" +
                    "<img class=\"user-head\" src=\"//i1.hdslb.com/bfs/face/735e915bc41d361f0d6dcf54c93526599cc3527a.jpg@52w_52h.webp\">" +
                    "</div>" +
                    "<div class=\"textarea-container\">" +
                    "<i class=\"ipt-arrow\"></i>" +
                    "<textarea cols=\"80\" name=\"msg\" rows=\"5\" placeholder=\"请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。\" class=\"ipt-txt\">" +
                    "</textarea><button type=\"submit\" class=\"comment-submit\" data-rid=\"2850691451\" data-pid=\"2850691451\">发表评论</button>" +
                    "</div>" +
                    "<div class=\"comment-emoji\"><i class=\"face\"></i><span class=\"text\">表情</span>" +
                    "</div>" +
                    "</div>");
                    /!*$(".comment-send").css('display', 'block').siblings(".comment-send").css('display', 'none');*!/

        });
    });



    $(".comment_text").mouseleave(function () {
        $(this).children(".reviews_meta").children(".reply").remove("")
    })
*/


function getListData(currentPage){
    var productId = getQueryVariable("productId");
    console.log("productId--->"+productId);
    var rateNum = 0;
    console.log("currentPage--->"+currentPage);
    $.ajax({
        type:"POST",
        async:false,    //设置为同步，中间变量返回中间变量
        url:"/message/findMessageByProductIdWithPage",
        data:{
            currentPage:currentPage,
            pageSize:3,
            "productId":productId
        },
        dataType:"json",
        success : function(data){
            total = data.total;
            console.log("total---->"+total);
            var startList = "";
            var contentHtml = "";
            var replyHtml = "";
            $('.star_rating ul').html('');
            console.log("data.list.length---->"+data.list.length);
            for(var i=0;i<data.list.length;i++) {
                console.log("data.list[i].messageName---->"+data.list[i].messageName);

                console.log("data.list[i].lssgUserInfo.userImg---->"+data.list[i].lssgUserInfo.userImg);
                console.log("data.list[i].lssgUserInfo.lssgUserLogin.userName---->"+data.list[i].lssgUserLogin.userName);

                console.log("data.list[i].productStars---->"+data.list[i].productStars);
                rateNum = data.list[i].productStars;

                /*$(".layui-rate li").addClass("on");
                layui.use(['rate'], function(){
                    var rate = layui.rate;
                    rate.render({
                        elem: '#startUl'
                        ,value: rateNum
                        ,readonly: false
                        ,theme: '#FF8000' //自定义主题色
                    });
                });*/

                var a = 0;
                if(data.list[i].productStars>0){
                    for(var k=1;k<=rateNum;k++){
                        startList += "<li class='on'><a href=\"javascript:;\">"+k+"</a></li>";

                    }
                    console.log("i------------------------->"+i);



                }




                contentHtml = "<div class=\"reviews_comment_box conts\">\n" +
                    "                                        <div class=\"comment_thmb\">\n" +
                    "                                            <img class='getgold_top_head_img' src=\"/uploadfiles/userImg/"+data.list[i].lssgUserInfo.userImg+"\" alt=\"\">\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"comment_text\">\n" +
                    "                                            <div class=\"reviews_meta\">\n" +
                    "<div class=\"star_rating star\">\n" +
                    "                                                    <ul class='startUl' id='startUl'>\n" +
                    "                                                        \n" +
                    "\n" +
                    "                                                    </ul>\n" +
                    "                                                </div>\n"+
                    "\n" +
                    "                                                <p><strong>"+data.list[i].lssgUserLogin.userName+" </strong>"+showTime(data.list[i].messageTime)+"</p>\n" +
                    "                                                <span>"+(data.list[i].messageContent)+"</span>\n" +
                    "                                                <span class=\"reply reply_content\">回复</span>\n" +
                    "                                                <span hidden>"+data.list[i].messageId+"</span>\n" +
                    "                                                <a class='delContetn' onclick='delMessage("+data.list[i].messageId+")'>删除</a>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </div>";



                $('.messageContentList').append(contentHtml);
                $('.star_rating .startUl').html('');
                ($('.star_rating .startUl').eq(i)).append(startList);


                $('.delContetn').eq(i).hide();
                var username = $('#username').text();
                console.log("username---->"+username);
                console.log(data.list[i].lssgUserLogin.userName+"-----1---"+username);
                if(username==data.list[i].lssgUserLogin.userName){
                    $('.delContetn').eq(i).show();
                }






                console.log("data.list[i].lssgReplyList---->"+data.list[i].lssgReplyList);
                console.log("data.list[i].lssgReplyList.length---->"+data.list[i].lssgReplyList.length);
                if(data.list[i].lssgReplyList.length==0){
                    console.log("无回复信息")
                }else{
                    $.each(data.list[i].lssgReplyList,function (j,value){
                        console.log("value.replyId--->"+j+"------>"+value.replyId);
                        console.log("value.replyName--->"+j+"------>"+value.replyName);
                        console.log("value.lssgUserInfo--->"+j+"------>"+value.lssgUserInfo);

                        console.log("value.replyUrl--->"+j+"------>"+value.replyUrl);


                        console.log("value.lssgUserLogin--->"+j+"------>"+value.lssgUserLogin);
                        console.log("value.lssgUserLogin.userName--->"+j+"------>"+value.lssgUserLogin.userName);
                        console.log("data.list[i].lssgUserLogin.userName--->"+j+"------>"+data.list[i].lssgUserLogin.userName);

                        replyHtml = "<div class=\"reviews_comment_box reply_box\">\n" +
                            "                                        <div class=\"comment_thmb \">\n" +
                            "                                            <img class='getgold_top_head_img' src=\"/uploadfiles/userImg/"+value.replyUrl+"\" alt=\"\">\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"comment_text\">\n" +
                            "                                            <div class=\"reviews_meta\">\n" +
                            "\n" +
                            "                                                <p><strong>"+value.replyName+" </strong>"+showTime(value.replyTime)+"</p>\n" +
                            "                                                <span style='color: #00ee00'>@"+data.list[i].lssgUserLogin.userName+"</span>\n" +
                            "                                                <span>"+(value.replyContent)+"</span>\n" +
                            "                                                <span class=\"reply reply_content\" id='' >回复</span>\n" +
                            "                                                <span hidden>"+data.list[i].messageId+"</span>\n" +
                            "                                                <span hidden>"+value.lssgUserLogin.userId+"</span>\n" +
                            "                                                <a class='delContetn' onclick='delMessage(0,"+value.replyId+");'>删除</a>\n" +
                            "\n" +
                            "                                            </div>\n" +
                            "                                        </div>";
                        ($('.conts').eq(i)).after(replyHtml);
                        $('.delContetn').eq(j).hide();
                        var username = $('#username').text();
                        console.log("username---->"+username);
                        console.log(data.list[i].lssgUserLogin.userName+"----2----"+username);
                        if(username==data.list[i].lssgUserLogin.userName){
                            $('.delContetn').eq(j).show();
                        }
                    });
                }
                //contentList = contentHtml + replyHtml;

            }


            $('#comentLi').html("全部反馈("+total+")")


        }
    });
    return total;
}
layui.use(['laypage', 'layer'], function() {
    var laypage = layui.laypage
        , layer = layui.layer;

    //自定义样式
    laypage.render({
        elem: 'demo2'
        , count: total
        , limit: 3
        , theme: '#71cc2b'
        , curr: location.hash.replace('#!fenye=', '') //获取起始页
        , jump: function (obj, first) {
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if (!first) {
                //清空以前加载的数据
                $(".messageContentList").html("");
                //
                getListData(obj.curr);
                showReply();
                //do something
            }
        }
    });
});


/**
 *
 * */
var messageId;
var userId;
function showReply(userImg){
    var i = 0;
    $(".comment-send").remove("");

    $(".reply_content").click(function () {
        console.log("1234567879");
        i++;
        $(".comment-send").remove("");
        $(".reviews_comment_box").after("<div class=\"comment-send \" style='display: none'>" +
            "<div class=\"user-face\" style='float: left;margin: 15px 15px;' >" +
            "<img class=\"user-head getgold_top_head_img\"  src=\"/uploadfiles/userImg/"+userImg+"\">" +
            "</div>" +
            "<div class=\"textarea-container\" >" +
            "<i class=\"ipt-arrow\"></i>" +
            "<textarea type='input' cols=\"80\" id='emotion' name=\"emotion\" rows=\"3\" placeholder=\"请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。\" class=\"emotion\">" +
            "</textarea>" +
            "<div class='reply_btn'><button type=\"button\" class=\"btn  btno\">回复</button></div>" +
            "</div>" +
            "<div class=\"comment-emoji\" style='margin-bottom: 20px;'><i class=\"face\"></i><span id=\"face\" >表情</span>" +
            "</div>" +
            "</div>");

        // 绑定表情
        $(this).parent(".reviews_meta").parent(".comment_text").parent(".reviews_comment_box").next(".comment-send").children(".comment-emoji").children('#face').SinaEmotion($('.emotion'));
        $(this).parent(".reviews_meta").parent(".comment_text").parent(".reviews_comment_box").next(".comment-send").children(".comment-emoji").append("<div class='en-div'></div>");


        $(this).parent(".reviews_meta").parent(".comment_text").parent(".reviews_comment_box").next(".comment-send").css("display","block");
        console.log("i---->"+i);
        if(i%2==0){
            $(this).parent(".reviews_meta").parent(".comment_text").parent(".reviews_comment_box").next(".comment-send").css("display","none");
        }else{
            $(this).parent(".reviews_meta").parent(".comment_text").parent(".reviews_comment_box").next(".comment-send").css("display","block");
        }

        messageId = $(this).next("span").text();
        userId = $(this).next("span").next("span").text();
        console.log("messageId---1111-->"+messageId);
        console.log("userId---1111-->"+userId);
        var userName = $(this).parent(".reviews_meta").children("p").children("strong").text();
        console.log("userName---->"+userName);
        $(this).parent(".reviews_meta").parent(".comment_text").parent(".reviews_comment_box").next(".comment-send").children(".textarea-container").children(".emotion").attr('placeholder',"@"+userName);
        sentReply(messageId,userId);

    });
}

function sentReply(messageId,userId) {
    console.log("messageId-22222--->"+messageId);
    $('.reply_btn .btno').click(function () {
        var replyContent = $(this).parent(".reply_btn").prev('#emotion').val();
        console.log("replyContent---->"+replyContent);
        var productId = getQueryVariable("productId");
        if(userId==undefined||userId==''){
            userId = 0;
        }
        $.ajax({
            dataType: "JSON",
            data: {
                "productId":productId,
                "replyContent":replyContent,
                "messageId":messageId,
                "userId":userId
            },
            type: "POST",
            timeout: 20000,
            url: "/message/sentReplyMessage",
            success : function (result) {
                console.log("result--->"+result);
                if(result>0){

                    $("#review_comment").val('');
                    $('.messageContentList').html('');
                    getListData(currentPage);
                    showReply();
                    /*layer.msg(result.message, {
                        icon: 0,//提示的样式
                        time: 2000,
                        end:function(){
                            showAddress();
                        }
                    });*/
                }
            },
            error : function (data){
                alert(data.responseText);
            }
        });
    })
}



//时间转换函数
function showTime(tempDate)
{
    var d = new Date(tempDate);
    var year = d.getFullYear();
    var month = d.getMonth();
    month++;
    var day = d.getDate();
    var hours = d.getHours();

    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    month = month<10 ? "0"+month:month;
    day = day<10 ? "0"+day:day;
    hours = hours<10 ? "0"+hours:hours;
    minutes = minutes<10 ? "0"+minutes:minutes;
    seconds = seconds<10 ? "0"+seconds:seconds;

    var time = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    //var time = year+"-"+month+"-"+day;
    return time;
}

function start() {
        var oStar = document.getElementById("star");

        var aLi = oStar.getElementsByTagName("li");

        var oUl = oStar.getElementsByTagName("ul")[0];

        var oSpan = oStar.getElementsByTagName("span")[1];

        var oP = oStar.getElementsByTagName("p")[0];

        var i = iScore = iStar = 0;

        var aMsg = [

            "很不满意|差得太离谱，与卖家描述的严重不符，非常不满",

            "不满意|部分有破损，与卖家描述的不符，不满意",

            "一般|质量一般，没有卖家描述的那么好",

            "满意|质量不错，与卖家描述的基本一致，还是挺满意的",

            "非常满意|质量非常好，与卖家描述的完全一致，非常满意"

        ];

        for (i = 1; i <= aLi.length; i++){

            aLi[i - 1].index = i;



            //鼠标移过显示分数

            aLi[i - 1].onmouseover = function (){

                fnPoint(this.index);

                //浮动层显示

                oP.style.display = "block";

                //计算浮动层位置

                oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";

                //匹配浮动层文字内容

                oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]

            };



            //鼠标离开后恢复上次评分

            aLi[i - 1].onmouseout = function (){

                fnPoint();

                //关闭浮动层

                oP.style.display = "none"

            };



            //点击后进行评分处理

            aLi[i - 1].onclick = function (){

                iStar = this.index;

                oP.style.display = "none";

                oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"

            }

        }



        //评分处理

        function fnPoint(iArg){

            //分数赋值

            iScore = iArg || iStar;

            for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";

        }




}

/**
 *
 * */

function submitComment() {
    $('#commentBtn').click(function () {
        var pingfeng = $("#star #pingfeng strong").text();
        var productStars = pingfeng.substring(0,pingfeng.length-2);
        var messageContent = $("#review_comment").val();
        var productId = $('#productId').val();
        console.log("productId---->"+productId);
        var message = {"productId":productId,"productStars":productStars,"messageContent":messageContent};
        $.ajax({
            dataType: "JSON",
            //contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
            data: message,                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
            type: "POST",
            timeout: 20000,
            url: "/message/sentOneMessage",
            success : function (result) {
                console.log("result--->"+result);
                if(result>0){

                    $("#review_comment").val('');
                    $('.messageContentList').html('');
                    getListData(currentPage);
                    showReply();
                    /*layer.msg(result.message, {
                        icon: 0,//提示的样式
                        time: 2000,
                        end:function(){
                            showAddress();
                        }
                    });*/
                }
            },
            error : function (data){
                alert(data.responseText);
            }
        });
    })
}


/**
 *
 * */
function hiddenShow(productId) {
    //做个判断用户是否登入
    var username = $(".userLoginName").text().trim().replace(/\s/g,"");
    if(username==''){
        $('.commentDiv').hide();
        $('.reply .reply_content').hide();
        return ;
    }else{
        $.ajax({
            dataType: "JSON",

            data: {
                "productId":productId
            },
            type: "POST",
            timeout: 20000,
            url: "/order/isBuyProduct",
            success : function (result){
                console.log("result-00000--->"+result);
                if(result){
                    $('.commentDiv').show();
                    $('.reply .reply_content').show();
                }else{
                    $('.commentDiv').hide();
                    $('.reply .reply_content').hide();
                }
            },error : function (data){
                alert(data.responseText);
            }
        });
    }

}


/**
 *
 * */
function delMessage(messageId,replyId) {

        console.log("messageId--000-->"+messageId);
        console.log("replyId--000-->"+replyId);
        if(messageId==undefined){
            messageId = 0
        }
        if(replyId==undefined){
            replyId = 0
        }
        $.ajax({
            dataType: "JSON",

            data: {
                "messageId":messageId,
                "replyId":replyId
            },
            type: "POST",
            timeout: 20000,
            url: "/message/delOneInfo",
            success : function (result){
                if(result>0){
                    $("#review_comment").val('');
                    $('.messageContentList').html('');
                    getListData(currentPage);
                    showReply();
                }
            },error : function (data){
                alert(data.responseText);
            }
        });
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
 *
 * */
function showProductDetails(productId) {
    console.log("productId----->"+productId);
    $.ajax({
        dataType: "JSON",
        data: {
            "productId":productId
        },
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findOneProductByProductId",
        success : function (result){
            var html = "";
            console.log("result---->"+result);
            console.log("result.productName---->"+result.productName);
            console.log("result.productPhoto---->"+result.productPhoto);
            console.log("result.smallPhoto---->"+result.smallPhoto);
            console.log("result.bigPhoto---->"+result.bigPhoto);
            html = " <div class=\"col-lg-6 col-md-6\">\n" +
                "                <div class=\"product-details-tab\">\n" +
                "                    <div id=\"img-1\" class=\"zoomWrapper single-zoom\">\n" +
                "                        <a href=\"#\">\n" +
                "                            <img id=\"zoom1\" src=\"/uploadfiles/productImg/"+result.bigPhoto+"\" data-zoom-image=\"/uploadfiles/productImg/"+result.bigPhoto+"\" alt=\"big-1\">\n" +
                "                        </a>\n" +
                "                    </div>\n" +
                "                    <div class=\"single-zoom-thumb\">\n" +
                "                        <ul class=\"s-tab-zoom owl-carousel single-product-active\" id=\"gallery_01\">\n" +
                "                            <li>\n" +
                "                                <a href=\"#\" class=\"elevatezoom-gallery active\" data-update=\"\" data-image=\"/uploadfiles/productImg/"+result.bigPhoto+"\" data-zoom-image=\"/uploadfiles/productImg/"+result.bigPhoto+"\">\n" +
                "                                    <img src=\"/uploadfiles/productImg/"+result.bigPhoto+"\" alt=\"zo-th-1\"/>\n" +
                "                                </a>\n" +
                "\n" +
                "                            </li>\n" +
                "                            <li >\n" +
                "                                <a href=\"#\" class=\"elevatezoom-gallery active\" data-update=\"\" data-image=\"/uploadfiles/productImg/"+result.productPhoto+"\" data-zoom-image=\"/uploadfiles/productImg/"+result.productPhoto+"\">\n" +
                "                                    <img src=\"/uploadfiles/productImg/"+result.productPhoto+"\" alt=\"zo-th-1\"/>\n" +
                "                                </a>\n" +
                "\n" +
                "                            </li>\n" +
                "                            <li >\n" +
                "                                <a href=\"#\" class=\"elevatezoom-gallery active\" data-update=\"\" data-image=\"/uploadfiles/productImg/"+result.smallPhoto+"\" data-zoom-image=\"/uploadfiles/productImg/"+result.smallPhoto+"\">\n" +
                "                                    <img src=\"/uploadfiles/productImg/"+result.smallPhoto+"\" alt=\"zo-th-1\"/>\n" +
                "                                </a>\n" +
                "\n" +
                "                            </li>\n" +
                "                        </ul>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "\n" +
                "            <div class=\"col-lg-6 col-md-6\">\n" +
                "                <div class=\"product_d_right\">\n" +
                "                    <form action=\"#\">\n" +
                "                        <input type=\"text\" hidden=\"hidden\" id=\"productId\" value=\""+result.productId+"\"/>\n" +
                "                        <h1><a href=\"#\">"+result.productName+"</a></h1>\n" +
                "\n" +
                "                        <div class=\"price_box\">\n" +
                "                            <span class=\"current_price\">￥"+Number(result.productMallPrice).toFixed(2)+"</span>\n" +
                "                            <span class=\"old_price\">￥"+Number(result.productMarketPrice).toFixed(2)+"</span>\n" +
                "                        </div>\n" +
                "                        <div class=\"price_box\">\n" +
                "                            <span class=\"\">库存：<span class=\"productNumSpan\" style=\"color: #2FAB11\">"+result.productNum+"</span></span>\n" +
                "                        </div>\n" +
                "                        <div class=\"product_desc\">\n" +
                "                            <p>"+result.productNotes+"</p>\n" +
                "                        </div>\n" +
                "\n" +
                "                        <div class=\"product_variant quantity\">\n" +
                "                            <label>数量</label>\n" +
                "                            <input min=\"1\" max=\"100\" value=\"1\" type=\"number\" id=\"num\">\n" +
                "                            <button class=\"button\" type=\"button\" onclick='addCart("+result.productId+")'>加入购物车</button>\n" +
                "\n" +
                "                        </div>\n" +
                "                        <div class=\" product_d_action\">\n" +
                "                            <ul>\n" +
                "                                <li><a href=\"javascript:void(0)\" title=\"Add to wishlist\" onclick='addCon("+result.productId+");'><i class=\"glyphicon glyphicon-heart\" style=\"color: rgb(0, 180, 0); font-size: 33px;\"></i>添加到收藏夹</a></li>\n" +
                "                            </ul>\n" +
                "                        </div>\n" +
                "                    </form>\n" +
                "\n" +
                "                </div>\n" +
                "            </div>";

            $("#productDetails").html('');
            $("#productDetails").append(html);

            $(".product_info_content").html(result.productEffect);
            dataBackgroundImage();

            $("#zoom1").elevateZoom({
                gallery:'gallery_01',
                responsive : true,
                cursor: 'crosshair',
                zoomType : 'inner'

            });

            var $singleProductActive = $('.single-product-active');
            if($singleProductActive.length > 0){
                $('.single-product-active').owlCarousel({
                    autoplay: true,
                    loop: true,
                    nav: true,
                    autoplayTimeout: 7000,
                    items: 4,
                    margin:15,
                    dots:false,
                    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        320:{
                            items:2,
                        },
                        400:{
                            items:3,
                        },
                        992:{
                            items:3,
                        },
                        1200:{
                            items:4,
                        },


                    }
                });
            }
        },
        error : function (data){
            alert(data.responseText);
        }
    })
    }

function addCart(productId) {
    var nums = $(".product_variant #num").val();
    /*console.log("nums---->"+nums);
    console.log("productId---->"+productId);*/
    var userLoginName = $(".userLoginName a").text().trim().replace(/\s/g,"");
    if(userLoginName==''){
        layer.msg("您还未登入，请先去登入吧！", {
            icon: 2,//提示的样式
            time: 3000,
            end:function(){
                location.href='/beforePage/toLogin';
            }
        });
    }else{
        $.ajax({
            url:"/cart/addProductToCart",
            data:{
                "productId":productId,
                "nums":nums
            },
            dataType:"json",
            type: "POST",
            success : function (result){
                console.log("result--->"+result);
                //console.log("result['cartItems']--->"+result["cartItems"]);
                console.log("result.cartItems--->"+result.cartItems);
                // console.log("result.lssgCart.cartItems.get(1)--->"+result.lssgCart["cartItems"].get(1));
                if(result!=null){
                    /*for(var keys in result.cartItems){
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
                    }*/

                    location.href='/beforePage/toCart';
                }else{
                    location.href='/beforePage/toLogin';
                }
            },
            error : function (data){
                console.log(data.responseText);

            }

        })
    }


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
function showLikeProduct(productId,index) {
    $.ajax({
        dataType: "JSON",
        data: {
            "productId":productId
        },
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findLikeSomeProduct",
        success : function (result){
            var html = "";
            console.log("result"+result);
            console.log("result.length"+result.length);
            for(var i=0;i<result.length;i++){
                console.log("result[i].productName"+result[i].productName);
                html += "<article class=\"single_product\">\n" +
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
                    "                                        <input type=\"hidden\" class=\"imgPath\" name=\"img\">\n" +
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
            $("#likeProduct").html('');
            $("#likeProduct").append(html);

            var $porductColumn5 =  $('.product_column5').eq(index);
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
        },
        error : function (data){
            alert(data.responseText);
        }
    })
}


/**
 *
 * */
function showHotProduct(productId,index) {
    $.ajax({
        dataType: "JSON",
        data: {
            "productId":productId
        },
        type: "POST",
        timeout: 20000,
        url: "/LssgProduct/findHotSomeProduct",
        success : function (result){
            var html = "";
            console.log("result"+result);
            console.log("result.length"+result.length);
            for(var i=0;i<result.length;i++){
                console.log("result[i].productName"+result[i].productName);
                html += "<article class=\"single_product\">\n" +
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
                    "                                        <input type=\"hidden\" class=\"imgPath\" name=\"img\">\n" +
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
            $("#hotProduct").html('');
            $("#hotProduct").append(html);

            var $porductColumn5 =  $('.product_column5').eq(index);
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
        },
        error : function (data){
            alert(data.responseText);
        }
    })
}



/**
 *
 * */
function showInfoEffect(productId) {

}