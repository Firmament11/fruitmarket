
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<html>
<head>
    <title>Title</title>
</head>
<body>
<!--footer area start-->
<footer class="footer_widgets">
    <div class="footer_top">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-7">
                    <div class="widgets_container contact_us">
                        <div class="footer_logo">
                            <a href="index.jsp"><img src="<%= basePath %>/statics/prefix/assets/img/images/lssg.ico" alt=""></a>
                        </div>
                        <p class="footer_desc">这是来自爸爸的爱</p>
                        <p><span>地址:</span> 不会可以找我运行，qq在下面</p>
                        <p><span>邮箱:</span> <a href="#">2719313634@qq.com</a></p>
                        <p><span>联系我们:</span> <a href="tel:(08)23456789">(08) 12 34 567</a> </p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-5">
                    <div class="widgets_container widget_menu">
                        <h3>信息</h3>
                        <div class="footer_menu">

                            <ul>
                                <li><a href="about.jsp">关于我们</a></li>
                                <li><a href="#">配送信息</a></li>
                                <li><a href="#">隐私保护</a></li>
                                <li><a href="#"> 条款和条件</a></li>
                                <li><a href="contact.jsp">联系我们 </a></li>
                                <li><a href="#">网站导航 </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4">
                    <div class="widgets_container widget_menu">
                        <h3>另外收费的部分</h3>
                        <div class="footer_menu">
                            <ul>
                                <li><a href="#">知名品牌</a></li>
                                <li><a href="#">礼品券 </a></li>
                                <li><a href="#">联盟营销</a></li>
                                <li><a href="#">特殊规格</a></li>
                                <li><a href="#">退货</a></li>
                                <li><a href="#">订单历史记录</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="widgets_container widget_newsletter">
                        <h3>通讯</h3>
                        <p class="footer_desc">订阅我们的每周通讯获取最新消息</p>
                        <div class="subscribe_form">
                            <form id="mc-form" class="mc-form footer-newsletter" >
                                <input id="mc-email" type="email" autocomplete="off" placeholder="Enter you email" />
                                <button id="mc-submit">订阅</button>
                            </form>
                            <!-- mailchimp-alerts Start -->
                            <div class="mailchimp-alerts text-centre">
                                <div class="mailchimp-submitting"></div><!-- mailchimp-submitting end -->
                                <div class="mailchimp-success"></div><!-- mailchimp-success end -->
                                <div class="mailchimp-error"></div><!-- mailchimp-error end -->
                            </div><!-- mailchimp-alerts end -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer_bottom">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-7">
                    <div class="copyright_area">
                        <p>版权  © 2021  <a href="#">标签</a>  . 保留所有权利，设计<a href="#">标签</a></p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-5">
                    <div class="footer_payment">
                        <ul>
                            <li><a href="#"><img src="<%= basePath %>/statics/prefix/assets/img/icon/paypal1.jpg" alt=""></a></li>
                            <li><a href="#"><img src="<%= basePath %>/statics/prefix/assets/img/icon/paypal2.jpg" alt=""></a></li>
                            <li><a href="#"><img src="<%= basePath %>/statics/prefix/assets/img/icon/paypal3.jpg" alt=""></a></li>
                            <li><a href="#"><img src="<%= basePath %>/statics/prefix/assets/img/icon/paypal4.jpg" alt=""></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
<!--footer area end-->
</body>
</html>
