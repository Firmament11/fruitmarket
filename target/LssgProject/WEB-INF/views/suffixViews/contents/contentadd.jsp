
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<html>
<head>
    <meta charset="utf-8">
    <title>
        文章添加
    </title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">

    <link rel="stylesheet" href="<%= basePath %>/statics/suffix/css/font.css">
    <link rel="stylesheet" href="<%= basePath %>/statics/suffix/css/index.css">
    <script src="<%= basePath %>/statics/suffix/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="<%= basePath %>/statics/suffix/js/index.js"></script>

    <!--<style>
        .imgs{display: none;}
        .picture{display: none;}
    </style>-->

    <!--百度编辑器-->
    <script src="<%= basePath %>/statics/suffix/ueditor/ueditor.config.js"></script>
    <script src="<%= basePath %>/statics/suffix/ueditor/ueditor.all.js"></script>
    <script src="<%= basePath %>/statics/suffix/ueditor/lang/zh-cn/zh-cn.js"></script>
</head>
<body>

<div class="layui-card">
    <form class="layui-form layui-form-pane" action="" id="add">
        <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
            <ul class="layui-tab-title">
                <li class="layui-this">基本信息</li>
                <li>状态信息</li>
                <li>文章内容</li>
            </ul>

            <div class="layui-tab-content" >
                <div class="layui-tab-item layui-show">
                    <!--<form class="layui-form layui-form-pane" action="" id="add">-->
                    <input type="hidden" name="id" value="{$art.id}">
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>文章类型
                        </label>
                        <div class="layui-input-block">
                            <select name="article_category_id" id="article_category_id">

                                <option value="0">---请选择文章类型---</option>
                                <option value="0">小说</option>

                            </select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>文章标题
                        </label>
                        <div class="layui-input-block">
                            <input type="text" name="title" autocomplete="off" value="title" placeholder="空制在80个汉字，160个字符以内"
                                   class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>作者
                        </label>
                        <div class="layui-input-block">
                            <input type="text" name="author" autocomplete="off" value="author" placeholder="空制在80个汉字，160个字符以内"
                                   class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>来源
                        </label>
                        <div class="layui-input-block">
                            <input type="text" name="source" autocomplete="off" value="source" placeholder="空制在80个汉字，160个字符以内"
                                   class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>排序
                        </label>
                        <div class="layui-input-block">
                            <input type="text" name="sort" autocomplete="off" value="sort" placeholder="排序值只能为数字"
                                   class="layui-input">
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <label for="link" class="layui-form-label">
                            <span class="x-red">*</span>文章缩略图
                        </label>
                        <div class="layui-input-inline">
                            <div class="site-demo-upbar">
                                <!--<div class=" layui-upload-button" style="border:#FFFFFF ;">
                                    <button type="button" class="layui-btn" id="test1">
                                        <i class="layui-icon">&#xe67c;</i>上传图片
                                    </button>
                                    <input class="layui-upload" type="file" accept="undefined" id="previewImg" name="images" onchange="upload()">
                                </div>-->
                                <button type="button" class="layui-btn" id="test3"><i class="layui-icon"></i>上传文件</button>

                            </div>
                        </div>


                    </div>
                    <div class="layui-form-item imgs" id="imgshow">
                        <label  class="layui-form-label">文章缩略图展示
                        </label>

                        <img src="images" id="pimages" name="pimages" style="width: 400px;height: 200px;"/>
                        <input id="avatar"   name="image" required="" type="hidden"  value="images">
                    </div>



                    <div class="layui-form-item">
                        <button class="layui-btn" type="button" lay-filter="add" lay-submit="">
                            保存
                        </button>
                    </div>
                    <!--</form>-->
                    <div style="height:100px;"></div>
                </div>
                <div class="layui-tab-item">
                    <!--  <form class="layui-form layui-form-pane" action="" id="add">-->
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>状态
                        </label>
                        <div class="layui-input-block">
                            <input type="radio" name="status" value="1" title="显示" checked>
                            <div class="layui-unselect layui-form-radio layui-form-radioed"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i>
                                <div>显示</div>
                            </div>
                            <input type="radio" name="status" value="0" title="隐藏" >
                            <div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i>
                                <div>隐藏</div>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>是否置顶
                        </label>
                        <div class="layui-input-block">
                            <input type="radio" name="istop" value="1" title="显示" checked>
                            <div class="layui-unselect layui-form-radio layui-form-radioed"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i>
                                <div>置顶</div>
                            </div>
                            <input type="radio" name="istop" value="0" title="隐藏" >
                            <div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i>
                                <div>不置顶</div>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>是否推荐
                        </label>
                        <div class="layui-input-block">
                            <input type="radio" name="isrecommand" value="1" title="显示" checked>
                            <div class="layui-unselect layui-form-radio layui-form-radioed"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i>
                                <div>推荐</div>
                            </div>
                            <input type="radio" name="isrecommand" value="0" title="隐藏" >
                            <div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i>
                                <div>不推荐</div>
                            </div>
                        </div>
                    </div>

                    <div class="layui-form-item layui-form-text">
                        <label class="layui-form-label">
                            <span class='x-red'>*</span>文章简介
                        </label>
                        <div class="layui-input-block">
                            <textarea placeholder="请输入内容" name="abstract" class="layui-textarea">{$art.abstract}</textarea>
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <button class="layui-btn"  type="button" lay-filter="add" lay-submit="">
                            保存
                        </button>
                    </div>
                    <!--</form>-->
                </div>
                <div class="layui-tab-item">
                    <!-- <form class="layui-form layui-form-pane" action="" id="add">-->
                    <div class="layui-form-item">
                        <label for="link" class="layui-form-label">
                            <span class="x-red">*</span>文章内容
                        </label>
                        <div class="layui-input-inline">
                            <textarea  id="content" placeholder="" name="content"></textarea>
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <button class="layui-btn"  type="button" lay-filter="add" lay-submit="">
                            保存
                        </button>
                    </div>
                    <!--</form>-->
                </div>

            </div>

        </div>
    </form>
</div>

<script type="text/javascript">
    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    UE.getEditor('content',{initialFrameWidth:600,initialFrameHeight:400,});
</script>
<script>
    layui.use(['element','layer','form','upload'], function(){
        var  $ = layui.jquery;//jquery
        var lement = layui.element;//面包导航
        var layer = layui.layer;//弹出层
        var form = layui.form;
        var upload = layui.upload;



        //图片上传接口
        /*layui.upload({
          url: './upload.json' //上传接口
          ,success: function(res){ //上传成功后的回调
            $('#LAY_demo_upload').attr('src',res.url);
          }
        });*/
        //指定允许上传的文件类型
        upload.render({
            elem: '#test3'
            ,url: 'https://httpbin.org/post' //改成您自己的上传接口
            ,accept: 'file' //普通文件
            ,done: function(res){
                layer.msg('上传成功');
            }
        });

        //监听提交
        form.on('submit(add)', function(data){
            var title=$("input[name='title']").val();
            //var content=$("textarea[name='content']").val();

            var article_category_id=$('#article_category_id option:selected') .val();//所属文章类型
            //alert(title);
            //var form=$("#cate_add").serialize();
            if(title==""){
                layer.msg('文章标题不能为空',{icon:5,time:2000});return false;
            }
            if(article_category_id==""){
                layer.msg('文章类型不能为空',{icon:5,time:2000});return false;
            }
            /*if(content){
                layer.msg("文章内容不能为空！",{icon:5,time:2000});return false;
          }*/
            var data = data.field;
            $.ajax({
                type:"post",
                url:"",
                data:data,
                dataType:"json",
                success:function(data){
                    if(data.status==1){
                        layer.msg(data.info, {icon: 6,time:2000},function () {
                            window.parent.location.reload();
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        });
                        return false;

                    }else{
                        layer.msg(data.info,{icon:5,time:2000});return false;
                    }
                }

            });

        });

    })
</script>
<!--栏目缩略图上传-->
<script>
    function upload(obj,id){
        var formData = new FormData();
        formData.append('images', $('#previewImg')[0].files[0]);
        formData.append('id', id);//将id追加再id中
        layer.msg('图片上传中', {icon: 16});
        $.ajax({
            type:"post",
            processData: false,
            contentType: false,
            url:"",
            data:formData,
            success:function(data){
                if(data.status == 1){
                    layer.closeAll('loading');
                    //layer.msg(data.info,{icon:1,time:1000});
                    $("#pimages").attr('src',data.image_name);
                    $("#avatar").val(data.image_name);
                    $(".imgs").show();
                    return false;
                }else{
                    layer.msg(data.info,{icon:2,time:1000});
                }
            }
        });
    }
</script>

</body>
</html>
