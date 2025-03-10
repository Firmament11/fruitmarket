<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<html>
<head>
    <title>Title</title>
    <!--要改成本机静态资源存放的的地址-->
    <link href="<%= basePath %>/statics/layui/css/layui.css" rel="stylesheet" media="all"/>
    <script src="<%= basePath %>/statics/layui/layui.js"></script>
    <script src="<%=basePath%>/statics/suffix/js/jquery.js"></script>
    <script src="<%= basePath %>/statics/easyui/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>/statics/js/common.js"></script>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
</head>
<body>
<form class="layui-form" id="ff"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>商品基本信息</legend>
    </fieldset>
    <div class="layui-form-item">
        <label class="layui-form-label">商品类型</label>
        <div class="layui-input-block">
            <input type="text" id="productClassName" name="productClassName" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            状态
        </label>
        <div class="layui-input-block">
            <input type="radio" name="productIsShow" id="state0" value="0" title="显示" checked>
            <div class="layui-unselect layui-form-radio layui-form-radioed"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i>
                <div>显示</div>
            </div>
            <input type="radio" name="productIsShow" id="state1" value="1" title="隐藏" >
            <div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i>
                <div>隐藏</div>
            </div>
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
            <input type="text" id="productDescription" name="productDescription" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="userForm">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>
<script src="<%= basePath %>/statics/layui/layui.js" charset="utf-8"></script>
<!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
<script type="text/javascript">
    layui.use(["jquery", "upload", "form", "layer", "element"], function () {
        var $ = layui.$,
            element = layui.element,
            layer = layui.layer,
            upload = layui.upload,
            form = layui.form;
        function getAllClass(object) {
            $.ajax({
                type: 'post',
                url: "<%=basePath%>/LssgProductClass/findByAll",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(object),
                // 请求成功的回调
                success: function (data) {
                    //绑定班级下拉框
                    if (data != null)
                        for (var i = 0; i < data.length; i++) {
                            $("#productSelect").append("<option value='" + data[i].productClassId + "'>" + data[i].productClassName + "</option>");
                        }
                    layui.use(['form'], function () {
                        var form = layui.form;
                        form.render('select'); //刷新select选择框渲染
                    });
                }
            })

        }
        //获取到所有图书类别信息，并绑定到下拉选择框中
        var obj = new Object();
        getAllClass(obj);
    });
</script>
</body>
