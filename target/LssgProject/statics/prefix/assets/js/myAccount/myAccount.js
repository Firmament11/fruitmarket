var currentPage = 1;

var total = 0;
var total2 = 0;

$(function () {

   /* var url = window.location.href;

    var id = url.substring( url.lastIndexOf("#")+1);

    document.getElementById(id).scrollIntoView(true);*/

    /**
     * 我的信息
     * */
    showMyInfo();
    $('.userInfo .userInfoBtn').click(function () {
        var userInfoId = $('.userInfo .userInfoId').val();
        var userRealname = $('.userInfo .userRealname').val();
        var userTel = $('.userInfo .userTel').val();
        var userEmail = $('.userInfo .userEmail').val();
        var userAddr = $('.userInfo .userAddr').val();
        var userSex = $('input:radio[name="id_gender"]:checked').val();

        var data = {"userInfoId":userInfoId,"userRealname":userRealname,"userSex":userSex,"userTel":userTel,"userEmail":userEmail,"userAddr":userAddr};
        $.ajax({
            dataType: "JSON",
            contentType:'application/json;charset=UTF-8',
            data: JSON.stringify(data),
            type: "POST",
            timeout: 20000,
            url: "/userInfo/updateUserInfo",
            success : function (result){
                if(result>0){
                    showMyInfo();
                }
            },error : function (data){
                console.log(data.responseText);
            }
        });
    });
    updatePwd();
    /**
     * 我的订单
     * */
    /**
     * 我的地址
     * */
    $(".shade_content").hide();
    $(".shade").hide();
    showAddress();
    submitAddress();     //新增地址

    /**
     * 我的消息
     * */
    var info1 = "快件已从 宜春 发出";           //模拟数据
    var data = {"shoppingStatus":"已发货"};
    showSomeOrderInfo(data,info1);

    var noPay = {"orderPayStatus":"未支付"};
    countMap(noPay,0);

    var noSent = {"shoppingStatus":"未发货"};
    countMap(noSent,1);

    var send = {"shoppingStatus":"已发货"};
    countMap(send,2);


    total = showReplyInfo(currentPage);

    total2 = showMySendMessage(currentPage);
});

/**
 *
 * */
function showMyInfo(){
    $.ajax({
        url:"/userInfo/showUserInfo",
        dataType:"json",
        type: "POST",
        success : function (result){
            if(result!=null){
                $('.userInfo .userInfoId').val(result.userInfoId);
                $('.userInfo .userRealname').val(result.userRealname);
                $('.userInfo .userTel').val(result.userTel);
                $('.userInfo .userEmail').val(result.userEmail);
                $('.userInfo .userAddr').val(result.userAddr);

                if(result.userImg!=null){
                    $(".uploadHeadImage #imgUrl").attr("src", "/uploadfiles/userImg/"+result.userImg);
                }
                if(null == result.userSex){
                    ($('input:radio[name="id_gender"]').eq(0)).attr("checked","true");
                }else{
                    if($('input:radio[name="id_gender"]:checked').val()=='男'){
                        ($('input:radio[name="id_gender"]').eq(0)).attr("checked","true");
                    }else{
                        ($('input:radio[name="id_gender"]').eq(1)).attr("checked","true");
                    }
                }
            }
        },error : function (data){
            console.log(data.responseText);
        }
    });
}

/**
 *密码修改
 * */
function updatePwd(){
    $('.form-horizontal .userPwdBtn').click(function () {
        var oldUserPwd = $('.form-horizontal #password').val();
        var newUserPwd = $('.form-horizontal #newPassword').val();
        $.ajax({
            dataType: "JSON",
            type: "POST",
            data:{
                "oldUserPwd":oldUserPwd
            },
            timeout: 20000,
            url: "/userLoginInfo/findOneUserLoginInfoByUserId",
            success : function (result){
                if(result.isPwd){
                    var data = {"userPwd":newUserPwd,"userId":result.lssgUserLogin.userId,"userName":result.lssgUserLogin.userName};
                    $.ajax({
                        dataType: "JSON",
                        contentType:'application/json;charset=UTF-8',
                        data: JSON.stringify(data),
                        type: "POST",
                        timeout: 20000,
                        url: "/userLoginInfo/updateUserPwd",
                        success : function (result){
                            if(result>0){
                                //清空输入框数据
                                $('.form-horizontal #password').val('');
                                $('.form-horizontal #newPassword').val('');

                                layer.msg("修改成功！", {
                                    icon: 1,//提示的样式
                                    time: 2000,
                                });
                            }
                        },error : function (data){
                            console.log(data.responseText);

                        }
                    });
                }else{
                    layer.msg("原密码错误！", {
                        icon: 2,//提示的样式
                        time: 2000,
                    });
                }
            },error : function (data){
                console.log(data.responseText);
            }
        });
    })
}

/**
 *
 * */
layui.use(["jquery", "upload", "form", "layer", "element"], function () {
    var $ = layui.$,
        element = layui.element,
        layer = layui.layer,
        upload = layui.upload,
        form = layui.form;

    //拖拽上传
    var uploadInst = upload.render({
        elem: '#headImg',
        url: '/userInfo/addUserImgPath',
        size: 10000,
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#imgUrl').attr('src', result); //图片链接（base64）
            });
        }
        , done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }

            //上传成功
            //打印后台传回的地址: 把地址放入一个隐藏的input中, 和表单一起提交到后台, 此处略..

            $("#imgPath").val(res.path1);

            addImgUrl();

            var demoText = $('#demoText');
            demoText.html('<span style="color: #8f8f8f;">上传成功!!!</span>');

        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });

    element.init();
});

/**
 *
 * */
function addImgUrl() {
    var userImg = $(".uploadHeadImage #imgPath").val();
    var userInfoId = $('.userInfo .userInfoId').val();
    var data = {"userInfoId":userInfoId,"userImg":userImg};
        $.ajax({
            dataType: "JSON",
            contentType:'application/json;charset=UTF-8',
            data: JSON.stringify(data),
            type: "POST",
            timeout: 20000,
            url: "/userInfo/updateUserInfo",
            success : function (result){
                if(result>0){
                    layer.msg("上传成功！", {
                        icon: 1,//提示的样式
                        time: 2000,
                    });
                }

            },error : function (data){
                console.log(data.responseText);
            }
        });

}

/**
 * 显示四个最新的地址
 * */
function showAddress() {
    var addressList = '';
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        url: "/address/findAllAddressByUserId",
        success : function (result) {
            for(var i =0;i<result.length;i++){
                var ps = result[i].addressName.split("-"); //江西省   抚州市  乐安县
                var p = ps[0].substring(0,ps[0].length-1);     //江西
                var s = ps[1]?ps[1].substring(0,ps[1].length-1):'';
                var newAddressName = p+s;
                var x = '';
                if(ps.length>2){
                    x = ps[2].substring(0,ps[2].length-1);//江西抚州
                }
                addressList += "<div class=\"add_mi\" onclick=\"charge('"+ps+"','"+result[i].addressAddr+"','"+result[i].addressTel+"','"+result[i].addressUserName+"',"+result[i].addressId+");\">\n" +
                    "                        <span class=\"xz\" hidden>"+result[i].addressId+"</span>\n" +
                    "                        <p class=\"ss\" id=\"ss\" style=\"border-bottom:1px dashed #ccc;line-height:28px;\">"+newAddressName+"("+result[i].addressUserName+"收)</p>\n" +
                    "                        <p class=\"xz\" id=\"xz\">"+x+" "+result[i].addressAddr+" "+result[i].addressTel+"</p>\n" +
                    "                    </div>";

                if(i==0){
                    firstShow(ps,result[0].addressAddr,result[0].addressTel,result[0].addressUserName,result[0].addressId);
                }
            }

            $('.Caddress .addrList').append(addressList);
            var addressId =$("div[class=add_mi]:first span").text();
            $("div[class=add_mi]:first").css('background','url("/statics/prefix/assets/img/images/mail_1.jpg") no-repeat');
            $("div[class=add_mi]:first").append("<a title='修改地址' onclick='onclick_open1("+addressId+")' style='color: #c97; margin-bottom:9px' class='modify-operation'>修改</a>");
            $("div[class=add_mi]:first").append("<a title='删除地址' id='delete'  onclick='del("+addressId+");' style='color: #c97; margin-bottom:9px;margin-left: 10px;' class='modify-operation'>删除</a>");
            function firstShow(ps,addressAddr,tel,userName,addressId){
                if(ps.size>2){
                    var addrs = ps[0]+" "+ps[1]+" "+ps[2]+" "+addressAddr;
                }else{
                    var addrs = ps[0]+" "+ps[1]+" "+addressAddr;
                }

                var ads = userName+" "+tel;
                $(".confirmAddr-addr-bd").text(addrs);
                $(".confirmAddr-addr-name").text(ads);
                $(".box__wrapper .box__shadow .addId").text(addressId);
            }

        },
        error : function (data){
            alert(data.responseText);
        }
    });
}
/**
 * 回显地址信息
 * */
function charge(ps,addressAddr,tel,userName,addressId) {
    $('.Caddress .add_mi').click(function () {
        $(".modify-operation").remove();
        $(this).append("<a title='修改地址' onclick='onclick_open1("+addressId+")' style='color: #c97; margin-bottom:9px' class='modify-operation'>修改</a>");
        $(this).append("<a title='删除地址' id='delete'  onclick='del("+addressId+");' style='color: #c97; margin-bottom:9px; margin-left: 10px;' class='modify-operation'>删除</a>");
        $(this).css('background', 'url("/statics/prefix/assets/img/images/mail_1.jpg") no-repeat').siblings('.add_mi').css('background', 'url("/statics/prefix/assets/img/images/mail.jpg") no-repeat')
        var addrs = ps.replace(/,/g,' ')+" "+addressAddr;
        var ads = userName+" "+tel;
        $(".confirmAddr-addr-bd").text(addrs);
        $(".confirmAddr-addr-name").text(ads);
        $(".box__wrapper .box__shadow .addId").text(addressId);
    });
}

/**
 *
 * */
function onclick_open1(addressId) {
    $(".shade_content").removeAttr("hidden");
    $(".shade_content").css("display","block");
    $(".shade").removeAttr("hidden");
    $(".shade").css("display","block");

    $.ajax({
        url:"/address/findOneAddressById",
        dataType:"json",
        type: "POST",
        data:{
            "addressId":addressId
        },
        success : function (result){
            $('.shade_from .addressId').text(result.addressId);
            $('.shade_from #name').val(result.addressUserName);
            $('.shade_from #city1').val(result.addressName);
            $('.shade_from #addrs').val(result.addressAddr);
            $('.shade_from #phone').val(result.addressTel);
        },error : function (data){
            console.log(data.responseText);

        }
    });

}


function onclick_close() {
    var shade_content = $(".shade_content");
    var shade = $(".shade");
    if (confirm("确认关闭么！此操作不可恢复")) {
        shade_content.hide();
        shade.hide();
    }
}

/**
 * 删除地址
 * */
function del(addressId) {
    $.ajax({
        url:"/address/delAddress",
        dataType:"json",
        type: "POST",
        data:{
            "addressId":addressId
        },
        success : function (result){
           if(result>0){
               $('.Caddress .addrList').html('');
               showAddress();
           }else{
               $('.Caddress .addrList').html('');
               showAddress();
               layer.msg("修改失败！", {
                   icon: 2,//提示的样式
                   time: 2000,
               });
           }
        },error : function (data){
            console.log(data.responseText);

        }
    });
}


/**
* 修改地址信息
* */
updateAddr();
function updateAddr() {
    $('.sub_set').click(function () {
        var addressId = $('.shade_from .addressId').text();
        var addressUserName = $('.shade_from #name').val();
        var addressName = $('.shade_from #city1').val();
        var addressAddr = $('.shade_from #addrs').val();
        var addressTel = $('.shade_from #phone').val();
        var data = {"addressId":addressId,"addressUserName":addressUserName,"addressName":addressName,"addressAddr":addressAddr,"addressTel":addressTel};
        $.ajax({
            dataType: "JSON",
            contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
            data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
            type: "POST",
            timeout: 20000,
            url: "/address/updateAddress",
            success : function (result) {
                if(result>0){
                    $(".shade_content").hide();
                    $(".shade").hide();
                    $('.Caddress .addrList').html('');
                    showAddress();
                    layer.msg("修改成功！", {
                        icon: 1,//提示的样式
                        time: 2000,
                    });
                }else{
                    $(".shade_content").hide();
                    $(".shade").hide();
                    $('.Caddress .addrList').html('');
                    showAddress();
                    layer.msg("修改失败！", {
                        icon: 2,//提示的样式
                        time: 2000,
                    });
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

function submitAddress() {
    $('.addBtn').click(function () {
        var addressUserName = $('.form-group #addressUserName').val();
        var addressName = $('.form-group #city').val();
        var addressAddr = $('.form-group #addressAddr').val();
        var addressTel = $('.form-group #addressTel').val();
        var data = {"addressUserName":addressUserName,"addressName":addressName,"addressAddr":addressAddr,"addressTel":addressTel};
        $.ajax({
            dataType: "JSON",
            contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
            data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
            type: "POST",
            timeout: 20000,
            url: "/address/addOneAddress",
            success : function (result) {
                if(result.data){
                    $('.form-group #addressUserName').val('');
                    $('.form-group #city').val('');
                    $('.form-group #addressAddr').val('');
                    $('.form-group #addressTel').val('');
                    $('.Caddress .addrList').html('');
                    showAddress();
                }else{
                    layer.msg(result.message, {
                        icon: 0,//提示的样式
                        time: 2000,
                    });
                }
            },
            error : function (data){
                alert(data.responseText);
            }
        });
    })
}


function showSomeOrderInfo(data,info) {
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
        data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
        type: "POST",
        timeout: 20000,
        url: "/order/selectSomeOrderByMap",
        success : function (result) {
            var html = "";
            for(var i=0;i<result.length;i++){
                html += "<li class=\"lg-item\">\n" +
                    "                                            <div class=\"item-info\">\n" +
                    "                                                <a href=\"/beforePage/toProductDetails?productId="+result[i].lssgOrderItemList[0].lssgProduct.productId+"\">\n" +
                    "                                                    <img src=\"/uploadfiles/productImg/"+result[i].lssgOrderItemList[0].lssgProduct.productPhoto+"\" alt=\"抗严寒冬天保暖隔凉羊毛毡底鞋垫超薄0.35厘米厚吸汗排湿气舒适\">\n" +
                    "                                                </a>\n" +
                    "\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"lg-info\">\n" +
                    "\n" +
                    "                                                <p>"+(result[i].lssgOrderAction.orderStatus==1 ? '快件已签收':'快件已从 宜春 发出')+"</p>\n" +
                    "                                                <time>"+showTime(result[i].lssgOrderAction.sentProductTime)+"</time>\n" +
                    "\n" +
                    "                                                <div class=\"lg-detail-wrap\">\n" +
                    "                                                    <a class=\"lg-detail i-tip-trigger\" href=\"#\">查看物流明细</a>\n" +
                    "\n" +
                    "                                                </div>\n" +
                    "\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"lg-confirm\">\n" +
                    "                                                <a class=\"i-btn-typical\" href=\"javascript:void(0)\" onclick=\"confirmReceipt('"+result[i].orderId+"');\">确认收货</a>\n" +
                    "                                            </div>\n" +
                    "                                        </li>";
                $(".orderInfo").html('');
                $(".orderInfo").append(html);
            }
           setInterval('AutoScroll("#s1")', 3000);
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}


function countMap(data,index) {
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
        data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
        type: "POST",
        timeout: 20000,
        url: "/order/countSizeByMap",
        success : function (result) {
            if(result>0){
                $(".ordersInfo span").eq(index).append("<em>"+result+"</em>");
            }
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}

function confirmReceipt(orderId) {
    var data = {"orderId":orderId};
    $.ajax({
        dataType: "JSON",
        contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
        data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
        type: "POST",
        timeout: 20000,
        url: "/order/confirmOrder",
        success : function (result) {
            if(result>0){
                layer.msg("订单完成！", {
                    icon: 1,//提示的样式
                    time: 3000,
                    end:function(){
                        var info = "快件已签收";           //模拟数据
                        var data = {"orderStatus":1,"shoppingStatus":"已发货"};
                        $(".orderInfo").html('');
                        showSomeOrderInfo(data,info);
                    }
                });
            }
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}

function showReplyInfo(currentPage) {
    $.ajax({
        type:"POST",
        async:false,    //设置为同步，中间变量返回中间变量
        url:"/message/findAllReplyWithPageByUid",
        data:{
            currentPage:currentPage,
            pageSize:20
        },
        dataType:"json",
        success : function(data){
            total = data.total;
            var html = "";
            if(data.list.length>0){
                $("#countReply").html("收到的评论");
                $("#countReply").append("<em>"+total+"</em>");
                for(var i=0;i<data.list.length;i++){
                        if(data.list[i].lssgReplyList.length>1){
                            html = '';
                            for(var j =0;j<data.list[i].lssgReplyList.length;j++){
                            html += " <div class=\"social-feed-box\">\n" +
                                "\n" +
                                "                                            <div class=\"pull-right social-action dropdown\">\n" +
                                "                                                <button type=\"button\" class=\"close\">\n" +
                                "                                                    <span aria-hidden=\"true\">x</span>\n" +
                                "                                                    <span class=\"sr-only\">关闭</span>\n" +
                                "                                                </button>\n" +
                                "\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"social-avatar\">\n" +
                                "                                                <a href=\"\" class=\"pull-left\">\n" +
                                "                                                    <img alt=\"image\" src=\"/uploadfiles/userImg/"+data.list[i].lssgReplyList[j].replyUrl+"\">\n" +
                                "                                                </a>\n" +
                                "                                                <div class=\"media-body\">\n" +
                                "                                                    <a href=\"#\">\n" +
                                "                                                        "+data.list[i].lssgReplyList[j].lssgUserLogin.userName+"\n" +
                                "                                                    </a>\n" +
                                "                                                    <small class=\"text-muted\">"+showTime(data.list[i].lssgReplyList[j].replyTime)+"</small>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"social-body\">\n" +
                                "                                                <p>\n" +
                                "                                                    "+data.list[i].lssgReplyList[j].replyContent+"\n" +
                                "                                                </p>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"social-footer\">\n" +
                                "                                                <div class=\"social-comment\">\n" +
                                "\n" +
                                "                                                    <div class=\"media-body\">\n" +
                                "\n" +
                                "                                                        评论了我的帖子:\n" +
                                "                                                        <br/>\n" +
                                "                                                        <a href=\"#\">\n" +
                                "                                                            @"+data.list[i].lssgUserLogin.userName+":"+data.list[i].messageContent+"\n" +
                                "                                                        </a>\n" +
                                "\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "\n" +
                                "                                            </div>\n" +
                                "\n" +
                                "                                            <form class=\"reply1\">\n" +
                                "                                                <div class=\"social-comment\" style=\"margin-top: 15px\">\n" +
                                "\n" +
                                "                                                    <div class=\"media-body\">\n" +
                                "                                                        <textarea class=\"form-control replyContent\" placeholder=\"填写回复...\"></textarea>\n" +
                                "                                                    </div>\n" +
                                "\n" +
                                "                                                </div>\n" +
                                "                                                <div class=\"btn-group\">\n" +
                                "                                                    <button type=\"submit\" onclick='sendReply("+data.list[i].lssgProduct.productId+","+data.list[i].messageId+");' class=\"btn btn-white btn-xs\">\n" +
                                "                                                        <i class=\"fa fa-comments\"></i> 发送\n" +
                                "                                                    </button>\n" +
                                "\n" +
                                "                                                </div>\n" +
                                "                                            </form>\n" +
                                "                                        </div>";
                            }
                        }else{
                            html = " <div class=\"social-feed-box\">\n" +
                                "\n" +
                                "                                            <div class=\"pull-right social-action dropdown\">\n" +
                                "                                                <button type=\"button\" class=\"close\">\n" +
                                "                                                    <span aria-hidden=\"true\">x</span>\n" +
                                "                                                    <span class=\"sr-only\">关闭</span>\n" +
                                "                                                </button>\n" +
                                "\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"social-avatar\">\n" +
                                "                                                <a href=\"\" class=\"pull-left\">\n" +
                                "                                                    <img alt=\"image\" src=\"/uploadfiles/userImg/"+data.list[i].lssgReplyList[0].replyUrl+"\">\n" +
                                "                                                </a>\n" +
                                "                                                <div class=\"media-body\">\n" +
                                "                                                    <a href=\"#\">\n" +
                                "                                                        "+data.list[i].lssgReplyList[0].lssgUserLogin.userName+"\n" +
                                "                                                    </a>\n" +
                                "                                                    <small class=\"text-muted\">"+showTime(data.list[i].lssgReplyList[0].replyTime)+"</small>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"social-body\">\n" +
                                "                                                <p>\n" +
                                "                                                    "+data.list[i].lssgReplyList[0].replyContent+"\n" +
                                "                                                </p>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"social-footer\">\n" +
                                "                                                <div class=\"social-comment\">\n" +
                                "\n" +
                                "                                                    <div class=\"media-body\">\n" +
                                "\n" +
                                "                                                        评论了我的帖子:\n" +
                                "                                                        <br/>\n" +
                                "                                                        <a href=\"#\">\n" +
                                "                                                            @"+data.list[i].lssgUserLogin.userName+":"+data.list[i].messageContent+"\n" +
                                "                                                        </a>\n" +
                                "\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "\n" +
                                "                                            </div>\n" +
                                "\n" +
                                "                                            <form class=\"reply1\">\n" +
                                "                                                <div class=\"social-comment\" style=\"margin-top: 15px\">\n" +
                                "\n" +
                                "                                                    <div class=\"media-body\">\n" +
                                "                                                        <textarea class=\"form-control replyContent\" placeholder=\"填写回复...\"></textarea>\n" +
                                "                                                    </div>\n" +
                                "\n" +
                                "                                                </div>\n" +
                                "                                                <div class=\"btn-group\">\n" +
                                "                                                    <button type=\"submit\" onclick='sendReply("+data.list[i].lssgProduct.productId+","+data.list[i].messageId+");'  class=\"btn btn-white btn-xs\">\n" +
                                "                                                        <i class=\"fa fa-comments\"></i> 发送\n" +
                                "                                                    </button>\n" +
                                "\n" +
                                "                                                </div>\n" +
                                "                                            </form>\n" +
                                "                                        </div>";
                        }

                    $("#myTabContent #home").append(html);
                        html = '';
                }
                //$("#myTabContent #home").html("");
            }


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
        , limit: 20
        , theme: '#71cc2b'
        , curr: location.hash.replace('#!fenye=', '') //获取起始页
        , jump: function (obj, first) {
            //首次不执行
            if (!first) {
                //清空以前加载的数据

                $("#myTabContent #home").html("");
                //
                showReplyInfo(obj.curr);
                //do something
            }
        }
    });
});



function sendReply(productId,messageId) {
    var replyContent = $(".replyContent").val();
    $.ajax({
        type:"POST",
        async:false,    //设置为同步，中间变量返回中间变量
        url:"/message/sentReplyMessage",
        data:{
            currentPage:currentPage,
            pageSize:20,
            "productId":productId,
            "messageId":messageId,
            "replyContent":replyContent
        },
        dataType:"json",
        success : function(data){
        }
    })

}

function showMySendMessage(currentPage) {

    $.ajax({
        type:"POST",
        async:false,    //设置为同步，中间变量返回中间变量
        url:"/message/findMyMessage",
        data:{
            currentPage:currentPage,
            pageSize:20
        },
        dataType:"json",
        success : function(data){
            total2 = data.total;
            var html = "";
            for(var i=0;i<data.list.length;i++){
                html += "<div class=\"social-feed-box\">\n" +
                    "\n" +
                    "                                            <div class=\"pull-right social-action dropdown\">\n" +
                    "                                                <button type=\"button\" class=\"close\">\n" +
                    "                                                    <span aria-hidden=\"true\">x</span>\n" +
                    "                                                    <span class=\"sr-only\">关闭</span>\n" +
                    "                                                </button>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"social-avatar\">\n" +
                    "                                                <a href=\"\" class=\"pull-left\">\n" +
                    "                                                    <img alt=\"image\" src=\"/uploadfiles/userImg/"+data.list[i].lssgUserInfo.userImg+"\">\n" +
                    "                                                </a>\n" +
                    "                                                <div class=\"media-body\">\n" +
                    "                                                    <a href=\"#\">\n" +
                    "                                                        "+data.list[i].lssgUserLogin.userName+"\n" +
                    "                                                    </a>\n" +
                    "                                                    <small class=\"text-muted\">"+showTime(data.list[i].messageTime)+"</small>\n" +
                    "                                                </div>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"social-body\">\n" +
                    "                                                <p>\n" +
                    "                                                   "+data.list[i].messageContent+"\n" +
                    "                                                </p>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"social-footer\">\n" +
                    "                                                <div class=\"social-comment\">\n" +
                    "\n" +
                    "                                                    <div class=\"media-body\">\n" +
                    "\n" +
                    "                                                        对<span class='textColor'>"+data.list[i].lssgProduct.productName+"</span>商品进行反馈了:\n" +
                    "                                                        <br/>\n" +
                    "                                                        \n" +
                    "                                                    <img alt=\"image\" src=\"/uploadfiles/productImg/"+data.list[i].lssgProduct.productPhoto+"\">\n" +
                    "" +
                    "\n" +
                    "                                                        </a>\n" +
                    "                                                    </div>\n" +
                    "                                                </div>\n" +
                    "\n" +
                    "                                            </div>\n" +
                    "                                        </div>";
            }
            $("#ios").html('');
            $("#ios").append(html);
        }
    })
    return total2;
}
layui.use(['laypage', 'layer'], function() {
    var laypage = layui.laypage
        , layer = layui.layer;

    //自定义样式
    laypage.render({
        elem: 'demo3'
        , count: total2
        , limit: 20
        , theme: '#71cc2b'
        , curr: location.hash.replace('#!fenye=', '') //获取起始页
        , jump: function (obj, first) {
            //首次不执行
            if (!first) {
                //清空以前加载的数据

                $("#ios").html('');
                //
                showMySendMessage(obj.curr);
                //do something
            }
        }
    });
});
function chang1() {
    $("#demo3").hide();
    $("#demo2").show();
}
function chang2() {
    $("#demo3").show();
    $("#demo2").hide();
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
    return time;
}



function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-25px"
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });
}

(function($) {
    $.fn.extend({
        Scroll: function(opt, callback) {
            //参数初始化
            if (!opt) var opt = {};
            var _btnUp = $("#" + opt.up); //Shawphy:向上按钮
            var _btnDown = $("#" + opt.down); //Shawphy:向下按钮
            var timerID;
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").height(), //获取行高
                line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10), //每次滚动的行数，默认为一屏，即父容器高度
                speed = opt.speed ? parseInt(opt.speed, 10) : 500; //卷动速度，数值越大，速度越慢（毫秒）
            timer = opt.timer //?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
            if (line == 0) line = 1;
            var upHeight = 0 - line * lineH;
            //滚动函数
            var scrollUp = function() {
                _btnUp.unbind("click", scrollUp); //Shawphy:取消向上按钮的函数绑定
                _this.animate({
                    marginTop: upHeight
                }, speed, function() {
                    for (i = 1; i <= line; i++) {
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({
                        marginTop: 0
                    });
                    _btnUp.bind("click", scrollUp); //Shawphy:绑定向上按钮的点击事件
                });

            }
            //Shawphy:向下翻页函数
            var scrollDown = function() {
                _btnDown.unbind("click", scrollDown);
                for (i = 1; i <= line; i++) {
                    _this.find("li:last").show().prependTo(_this);
                }
                _this.css({
                    marginTop: upHeight
                });
                _this.animate({
                    marginTop: 0
                }, speed, function() {
                    _btnDown.bind("click", scrollDown);
                });
            }
            //Shawphy:自动播放
            var autoPlay = function() {
                if (timer) timerID = window.setInterval(scrollUp, timer);
            };
            var autoStop = function() {
                if (timer) window.clearInterval(timerID);
            };
            //鼠标事件绑定
            _this.hover(autoStop, autoPlay).mouseout();
            _btnUp.css("cursor", "pointer").click(scrollUp).hover(autoStop, autoPlay); //Shawphy:向上向下鼠标事件绑定
            _btnDown.css("cursor", "pointer").click(scrollDown).hover(autoStop, autoPlay);

        }
    })
})(jQuery);