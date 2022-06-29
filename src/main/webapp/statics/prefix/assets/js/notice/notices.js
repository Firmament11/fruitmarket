var publicClassId = getQueryVariable("publicClassId");
var publicInfoId = getQueryVariable("publicInfoId");
console.log("publicInfoId--->"+publicInfoId);
if(!publicInfoId){
    publicInfoId = null;
}
$(function () {
    showInfo(publicClassId,publicInfoId);

    showSomelikePublicInfo(publicClassId);
});



function showInfo(publicClassId,publicInfoId) {
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        data:{
            "publicClassId":publicClassId,
            "publicInfoId":publicInfoId
        },
        url: "/publicInfo/findOneClassInfo",
        success: function (result) {
            console.log("result---->"+result);
            var aHtml = "";
            var oHtml = "";
            if(result!=null){
                for(var i=0;i<result.length;i++){
                    console.log("---1--->"+result[i].publicInfoTitle);

                    //console.log("--2---->"+result[i].publicInfoTitle);
                    aHtml = "<figure>\n" +
                        "                            <div class=\"post_header\">\n" +
                        "                                <h3 class=\"post_title\">"+result[0].publicInfoTitle+"</h3>\n" +
                        "                                <div class=\"blog_meta\">\n" +
                        "                                    <p>发布人 : <a href=\"javascript:void(0)\">"+result[0].publicInfoUser+"</a> / 发布时间 : <a href=\"javascript:void(0)\">"+showTime(result[0].publicInfoTime)+"</a> / In : <a href=\"javascript:void(0)\">"+result[i].lssgPublicClass.publicClassName+"</a></p>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"blog_thumb\">\n" +
                        /*"                                <a href=\"#\"><img src=\"/uploadfiles/notice/"+result[0].publicInfoImg+"\" alt=\"\"></a>\n" +*/
                        "                            </div>\n" +
                        "                            <figcaption class=\"blog_content\">\n" +
                        "                                <div class=\"post_content\">"+result[0].publicInfoContent+"</div>\n" +
                        "                            </figcaption>\n" +
                        "                        </figure>";
                }
            }
            $('.blog_details .container .single_blog').append(aHtml);

            //$('.related_posts .alist').append(oHtml)
        },
        error : function (data){
            alert(data.responseText);
        }
    });
}




function showSomelikePublicInfo(publicClassId) {
    $.ajax({
        dataType: "JSON",
        type: "POST",
        timeout: 20000,
        data:{
            "publicClassId":publicClassId
        },
        url: "/publicInfo/findSomePublicClassInfoWithLimit",
        success: function (result) {
            console.log("result---->"+result);
            var aHtml = "";
            var oHtml = "";
            if(result!=null){
                for(var i=0;i<result.length;i++){
                    console.log("---1--->"+result[i].publicInfoTitle);
                    oHtml  += "<div class=\"col-lg-4 col-md-4 col-sm-6\">\n" +
                        "                                <article class=\"single_related\">\n" +
                        "                                    <figure>\n" +
                        "                                        <div class=\"related_thumb\">\n" +
                        "                                            <a href=\"/beforePage/toNotices?publicClassId="+result[i].lssgPublicClass.publicClassId+"&publicInfoId="+result[i].publicInfoId+"\"><img src=\"/uploadfiles/notice/"+result[i].publicInfoImg+"\" alt=\"\" style='width: 350px;height: 270px;'></a>\n" +
                        "                                        </div>\n" +
                        "                                        <figcaption class=\"related_content\">\n" +
                        "                                            <h4><a href=\"javascript:void(0)\">"+result[i].publicInfoTitle+"</a></h4>\n" +
                        "                                            <div class=\"blog_meta\">\n" +
                        "                                                <span class=\"author\">发布人 : <a href=\"javascript:void(0)\">"+result[i].publicInfoUser+"</a>  </span>\n" +
                        "                                                <span class=\"meta_date\"> "+showTime(result[i].publicInfoTime)+"\t</span>\n" +
                        "                                            </div>\n" +
                        "                                        </figcaption>\n" +
                        "                                    </figure>\n" +
                        "                                </article>\n" +
                        "                            </div>";
                }
            }
            $('.related_posts .alist').append(oHtml)
        },
        error : function (data){
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