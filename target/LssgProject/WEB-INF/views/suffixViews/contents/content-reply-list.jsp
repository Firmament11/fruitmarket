
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<html>
<head>
    <meta charset="UTF-8">
    <title>留言列表</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <link rel="stylesheet" href="<%= basePath %>/statics/suffix/css/font.css">
    <link rel="stylesheet" href="<%= basePath %>/statics/suffix/css/index.css">
    <script src="<%= basePath %>/statics/suffix/lib/layui/layui.js" charset="utf-8"></script>
    <script src="<%=basePath%>/statics/suffix/js/jquery.min.js"></script>
    <script src="<%= basePath %>/statics/easyui/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>/statics/js/common.js"></script>
    <script type="text/javascript" src="<%= basePath %>/statics/suffix/js/index.js"></script>

</head>
<body>
<div class="x-nav">
          <span class="layui-breadcrumb">
            <a href="">首页</a>
            <a href="">演示</a>
            <a>
              <cite>导航元素</cite></a>
          </span>
    <a class="layui-btn layui-btn-small" style="line-height:1.6em;margin-top:3px;float:right" onclick="location.reload()" title="刷新">
        <i class="layui-icon layui-icon-refresh" style="line-height:30px"></i></a>
</div>
<div class="layui-fluid">
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-body ">
                    <div class="demoTable" style="padding: 15px; ">
                        <input type="text"  style="width: 250px; height:30px;padding-left: 5px;" name="query" id="query" required  placeholder="请输入关键字"/>
                        <button class="layui-btn layui-btn-small" id="searchByquery">
                            <i class="layui-icon">&#xe615;</i> 搜索
                        </button>
                    </div>
                    <%--<script type="text/html" id="toolbarDemo">
                        <button class="layui-btn layui-btn-danger" lay-event="dels">批量删除</button>
                        <button class="layui-btn" lay-event="add">添加</button>
                    </script>--%>
                    <div class="layui-card-body layui-table-body layui-table-main">
                        <table class="layui-table layui-form" id="member" lay-filter="test"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<%--<script type="text/html" id="barDemo">
    <a style="text-decoration:none" title="停用">
        <i class="layui-icon">&#xe601;</i>
    </a>
    <a title="编辑" class="layui-btn layui-btn-xs" style="text-decoration:none" lay-event="edit" >
        <i class="layui-icon">&#xe642;</i>
    </a>
    <a title="删除" style="text-decoration:none" class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">
        <i class="layui-icon">&#xe640;</i>
    </a>
</script>--%>

<script type="text/html" id="barDemo1">
    <span class="layui-btn layui-btn-danger " > 已禁用 </span>
</script>


<script>
    layui.use(['table', 'layer', 'form'], function () {
        var table = layui.table;
        var layer = layui.layer;
        /*//重新刷新表单
        function reloadData() {
            table.reload('');
        }
        //删除一行数据
        function deleteRow(object) {
            $.ajax({
                type: 'post',
                url: "< %=basePath% >/LssgProduct/delete",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(object),
//               请求成功的回调
                success: function (data) {
                    if (data > 0) {
                        table.reload('member');
                    }
                }
            })
        }
        /!**
         * 删除选中行数据
         * *!/
        function deleteRows(object) {
            $.ajax({
                type: 'post',
                url: "< %=basePath%>/LssgProduct/deletes",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(object),
//               请求成功的回调
                success: function (data) {
                    if (data > 0) {
                        layer.msg("您已经成功删除记录！", {
                            icon: 1,
                            time: 1300,
                            end: function () {
                                table.reload('member');
                            }
                        });
                    }
                }
            })
        }*/

        renderTable('');
        $("#searchByquery").on("click",function(){
            var query=$("#query").val();
            renderTable(query);
        });
        function renderTable(query) {
            //渲染table数据
            table.render({
                elem: '#member'
                , url: '<%=basePath%>/LssgReply/findByPage?query=' +query
                , method: 'post'
                , contentType: 'application/json'
                , toolbar: '#toolbarDemo'
                , title: '用户数据表'
                , request: {
                    pageName: 'curr' //页码的参数名称，默认：page
                    , limitName: 'nums' //每页数据量的参数名，默认：limit
                }
                , cols: [[
                    {type: 'checkbox'}
                    , {field: 'replyId', title: '回复ID', width: 122, fixed: 'right'}
                    , {field: 'lssgMessage.messageId', title: '留言ID', width: 122,templet:function (d) {
                            return '<span style="color:green;">'+d.lssgMessage.messageId+'</span>'
                        }}
                    , {field: 'lssgUserLogin.userName', title: '用户ID', width: 122,templet:function (d) {
                            return '<span style="color:green;">'+d.lssgUserLogin.userName+'</span>'
                        }}
                    , {field: 'replyTime', title: '留言时间',width: 280,templet: function(d){
                            if (d.replyTime == null)
                            {
                                return "暂无数据";
                            }
                            return "<span>"+ showTime(d.replyTime) +"</span>";
                        }
                    }
                    , {field: 'replyContent', title: '内容', width: 370}
                    , {field: 'replyIsShow', title: '状态', width: 120}
                ]]
                , page: true,
                limit: 5,
                limits: [5, 10, 20]
            });
        }
      /*  //监听行具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            //执行删除操作
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    deleteRow(data.productId);
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                var productId= data.productId;
                var tourl = "< %=basePath%>/LssgProduct/toUpdate?productId="+productId;
                layer.open({
                    type: 2,
                    content: tourl,
                    title: '用户信息修改',
                    area: ['100%', '100%']
                })
            }
            //执行修改操作
        });
        //头工具栏事件
        table.on('toolbar(test)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            //table选中行的数据对象 checked
            switch (obj.event) {
                case 'dels':
                    var data = checkStatus.data;
                    var list = [];
                    for(var i in data){
                        list.push(data[i].productId)
                    }
                    layer.confirm('真的删除选中行么', function (index) {
                        deleteRows(list);
                        //layer.close(index);
                    });
                    break;
                case 'getCheckLength':
                    var data = checkStatus.data;
                    layer.msg('选中了：' + data.length + ' 个');
                    break;
                case  "search":
                    //对于事件的处理，重新渲染table的数据
                    table.reload('member',{
                        url: '< %=basePath%>/LssgProduct/findByPage'
                        ,where: {username: $("#name").val()}
                    })
                    break;
                case 'add':
                    var tourl = "< %=basePath%>/LssgProduct/toAdd";
                    layer.open({
                        type: 2,
                        content: tourl,
                        title: '用户信息新增',
                        area: ['100%', '100%']
                    })

            }
        });*/
    });

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

        // var time = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        var time = year+"年"+month+"月"+day+"日"+hours+"时"+minutes+"分"+seconds+"秒";
        return time;
    }

</script>
</body>
</html>
