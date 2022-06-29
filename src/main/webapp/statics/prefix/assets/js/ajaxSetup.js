$(function() {
    $.ajaxSetup({
        complete: function (XMLHttpRequest, textStatus) {
            console.log(textStatus);
            // 通过XMLHttpRequest取得响应头，sessionstatus
            var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
            if (sessionstatus == "TIMEOUT") {
                var win = window;
                while (win != win.top) {
                    win = win.top;
                }
                alert("111");
                win.location.href = XMLHttpRequest.getResponseHeader("content_path");
            }
        }
    });
});