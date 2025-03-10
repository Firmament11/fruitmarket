<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="Keywords" content="关键词123">
    <meta name="Description" content="描述">
    <link rel="stylesheet" href="<%= basePath %>/statics/prefix/assets/css/base.css">
    <link rel="stylesheet" type="text/css" href="<%= basePath %>/statics/prefix/assets/css/login.css">
    <link rel="stylesheet" type="text/css" href="<%= basePath %>/statics/layer-v3.1.1/layer/mobile/need/layer.css">
    <title>登录页面</title>
    <script src="<%= basePath %>/statics/prefix/assets/js/login/jquery-3.1.1.min.js"></script>
   <script src="<%= basePath %>/statics/prefix/assets/js/checkcode.js"></script>
    <style>
        #loginname,#nloginpwd{
            width:304px;
        }
    </style>
</head>
<body>
<!-- **************头部页面开始****** -->
<div class="w">
    <div id="logo">
        <a href="<%= basePath %>/beforePage/toIndex">
            <img src="<%= basePath %>/statics/prefix/assets/img/lssgpng.png" height="28" width="118"/>
        </a>
        <b></b>
    </div>
    <!-- 左边登录logo结束 -->
    <a href="#" class="q_link fr">
        <b class="fl"></b>
        登录页面，调查问卷
    </a>
</div>
<!-- ************头部页面结束********** -->
<div id="content">
    <!-- login-wrapk开始 -->
    <div class="login-wrap">
        <!-- w开始 -->
        <div class="w">
            <!-- *****************登录页面开始************ -->
            <div class="login-form">
                <div class="login-tab login-tab-l">
                    <a href="javascript:;">扫码登录</a>
                </div>
                <div class="login-tab login-tab-r">
                    <a href="javascript:;">账号登录</a>
                </div>
                <!-- login-box开始（账户登录） -->
                <div class="login-box" style="visibility: visible; display:block">
                    <div class="mt tab-h"></div>
                    <!-- 登录提示信息开始 -->
                    <div class="msg-wrap">
                        <div class="msg-warn">
                            <b></b>
                            公共电脑不建议自动登录，以防账号丢失！
                        </div>
                        <div class="msg-error hide">
                            <b></b>
                        </div>
                    </div>
                    <!-- 登录提示信息结束 -->
                    <div class="mc">
                        <div class="form">
                            <form action="" id="formlogin" method="post" onSubmit="return false;">
                                <input type="hidden" name="" class="hide" id="" value="">
                                <%--<input type="hidden" name="" class="hide" id="" value="">
                                <input type="hidden" name="" class="hide" id="" value="">
                                <input type="hidden" name="" class="hide" id="" value="">
                                <input type="hidden" name="" class="hide" id="" value="">
                                <input type="hidden" name="" class="hide" id="" value="">
                                <input type="hidden" name="" class="hide" id="" value="">--%>
                                <!-- 用户名输入框fore1 -->
                                <div class="item item-fore1 item-error">
                                    <label for="loginname" class="login-label name-label"></label>
                                    <input type="text" name="username" id="loginname" class="itxt" tabindex="1" autocomplete="off" value="<shiro:principal/>" placeholder="邮箱/用户名/已验证手机">
                                    <span class="clear-btn" style="display:inline;"></span>
                                </div>
                                <!-- 密码输入框fore2 -->
                                <div id="entry" class="item item-fore2" style="visibility: visible">
                                    <label class="login-label pwd-label" for="nloginpwd"></label>
                                    <input type="password" name="password" id="nloginpwd"  class="itxt itxt-error" tabindex="2" autocomplete="off" placeholder="密码">
                                    <span class="clear-btn" style="display: inline;"></span>
                                    <span class="capslock" style="display: none;">
  			  					<b></b>
  			  					大小写锁定已打开
  			  				</span>
                                </div>
                                <!-- 图片验证码开始 fore3-->
                                <div id="o-authcode" class="item item-vcode item-fore3 hide ">
                                    <input type="text" id="authcode" class="itxt itxt02" name="authcode" tabindex="3">
                                    <input type = "button" id="code"  class="verify-code">
                                    <a href="javascript:;" onclick='createCode();'>看不清换一张</a>
                                </div>
                                <!-- 自动登录开始fore4 -->
                                <div class="item item-fore4">
                                    <div class="safe">
                        		<span>
                        			<input type="checkbox" name="chkRememberMe" id="autologin" tabindex="3">
                        			<label for>记住我</label>
                        		</span>
                                        <span class="forget-pw-safe">
                        			<a href="">忘记密码</a>
                        		</span>
                                    </div>
                                </div>
                                <!-- 登录按钮开始 -->
                                <div class="item item-fore5">
                                    <div class="login-btn">
                                        <a href="javascript:;" type="button" class="btn-img btn-entry" id="loginsubmit" tabindex="6" onClick="validate()">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- mc结束 2input+自动登录+登录按钮-->

                </div>
                <!-- login-box结束（账户登录） -->
                <!-- 二维码登陆开始 （扫码登录）-->
                <div class="qrcode-login">
                    <div class="mc">
                        <div class="qrcode-error-2016">
                            <div class="qrcode-error-mask"></div>
                            <p class="err-cont">服务器出错</p>
                            <a href="javascript:void(0)" class="refresh-btn">刷新</a>
                        </div>
                        <div class="qrcode-main">

                            <div class="qrcode-img" style="">
                                <img src="<%= basePath %>/statics/prefix/assets/img/code.png" height="155" width="155"/>
                                <div class="qrcode-error-02 hide" id="J-qrcodeerror" style="display: none;">
                                    <a href="#none">
                                        <span class="error-icon"></span>
                                        <div class="txt">
                                            网络开小差咯
                                            <span class="ml10">刷新二维码</span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="qrcode-help" style="display: none;"></div>
                        </div>
                        <!-- 二维码结束 -->
                        <div class="qrcode-panel">
                            <ul>
                                <li class="fore1">
                                    <span>打开</span>
                                    <a href="">
                                        <span class="red">手机lssg</span>
                                    </a>
                                </li>
                                <li>扫描二维码</li>
                            </ul>
                        </div>
                        <!-- panel结束 -->
                        <div class="coagent qr-coagent" id="qrCoagent" style="display: block; visibility: visible;">
                            <ul>
                                <li><b></b><em>免输入</em></li>
                                <li><b class="faster"></b><em>更快&nbsp;</em></li>
                                <li><b class="more-safe"></b><em>更安全</em></li>
                            </ul>
                        </div>
                    </div>
                    <!-- mc结束 -->
                </div>
                <!-- 二维码登录结束 （扫码登录）-->
                <!-- 登录框底部登录方式 开始qq,微信-->
                <div class="coagent" id="kbCoagent">
                    <ul>
                        <li>
                            <a href="javascript:void(0)" onClick="return false;" class="pdl">
                                <b class="QQ-icon"></b>
                                <span>QQ</span>
                            </a>
                            <span class="line">|</span>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onClick="return false;" class="pdl">
                                <b class="weixin-icon"></b>
                                <span>微信</span>
                            </a>
                            <span class="line">|</span>
                        </li>
                        <li class="extra-r">
                            <div class="regist-link">
                                <a href="<%= basePath %>/beforePage/toRegist" class="">
                                    <b></b>立即注册
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 登录框底部登录方式 结束qq,微信-->
            </div>
            <!-- ************ 登录页面login-form结束************  -->
        </div>
        <!-- w结束 -->
        <!-- 中间广告部分开始 -->
        <div class="login-banner" style="background-color: green">
            <div class="w">
                <div id="banner-bg" class="i-inner" style="background: url(<%= basePath %>/statics/prefix/assets/img/bg/banner13.jpg) no-repeat;"></div>
            </div>
        </div>
        <!-- 中间背景广告结束 -->
    </div>
    <!-- login-wrap结束 -->
</div>
<!-- 内容部分结束 -->
<!-- 底部页面开始 -->
<div class="w">
    <div id="footer-2013">
        <div class="links">
            <a href="">关于我们</a>
            |
            <a href="">联系我们</a>
            |
            <a href="">人才招聘</a>
            |
            <a href="">商家入驻</a>
            |
            <a href="">广告服务</a>
            |
            <a href="">手机lssg</a>
            |
            <a href="">友情链接</a>
            |
            <a href="">销售联盟</a>
            |
            <a href="">lssg社区</a>
            |
            <a href="">lssg公益</a>
            |
            <a href="">英文网站</a>
        </div>
    </div>
</div>
<!-- 底部页面结束 -->

</body>

<script type="text/javascript">
    //alert($)
    //微信登录和账号登录切换
    $(".login-tab-r").click(function(){
        $(".login-box").css({"display":"block","visibility":"visible"});
        $(".qrcode-login").css({"display":"none"})
    });
    $(".login-tab-l").click(function(){
        $(".login-box").css({"display":"none"});
        $(".qrcode-login").css({"display":"block","visibility":"visible"})
    });
    //点击微信图片显示帮助
    $(".qrcode-img").hover(function(){
        $(".qrcode-img").css({"left": "0"});
        $(".qrcode-help").css({"display":"block"});
    },function(){
        $(".qrcode-img").css({"left": "64px"});
        $(".qrcode-help").css({"display":"none"});
    });
    //确认输入用户名密码后，显示验证码
    $("#nloginpwd").blur(function(){
        if(($("#loginname").val() !="" )&&($("#nloginpwd").val() !="")){
            $("#o-authcode").css({"display":"block"});
        }
    })
    createCode();
</script>
<script src="<%= basePath %>/statics/layer-v3.1.1/layer/layer.js"></script>
</html>
