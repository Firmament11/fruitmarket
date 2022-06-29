$(function(){
	/*var stuList = getStuList();//设置传送信息：学生的集合*/
	 var ms = 5;
	//聚焦失焦input
	$('input').eq(0).focus(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("支持中文，字母，数字，'-'，'_'的多种组合");
		}
	})
	$('input').eq(1).focus(function(){
		if($(this).val().length==0){
		    $(this).parent().next("div").text("建议使用字母、数字和符号两种以上的组合，6-20个字符");
		}
	})
	$('input').eq(2).focus(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("请再次输入密码");
		}
	})
	/*$('input').eq(3).focus(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("验证完后，你可以使用该手机登陆和找回密码");
		}
	})*/
	$('input').eq(4).focus(function(){	
		if($(this).val().length==0){
			$(this).parent().next().next("div").text("看不清？点击图片更换验证码");
		}
	})
	//input各种判断
	//用户名：
	$('input').eq(0).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text(" ");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val().length>0 && $(this).val().length<4){
			$(this).parent().next("div").text("长度只能在4-20个字符之间");
			$(this).parent().next("div").css("color",'red');
		}else if($(this).val().length>=4&& !isNaN($(this).val())){
			$(this).parent().next("div").text("用户名不能为纯数字");
			$(this).parent().next("div").css("color",'red');

        }else{
			var username = $(this).val();
			console.log(username);
            $.ajax({
                url:"http://localhost:8080/userLoginInfo/findOneUserLoginInfo",
                data:{"username":username},
                dataType:"JSON",
                success: function (data) {
                    console.log("data-->"+data);
                    console.log("data.userName---->"+data.userName);
                    if(username==data.userName){
                        $(".username_div").text("该用户名已被注册");
                        $(".username_div").css("color",'red');
                        /*$(this).parent().next("div").text("该用户名已被注册");
                        $(this).parent().next("div").css("color",'red');*/
                        return;
                    }
                }
            });

			$(this).parent().next("div").text("");
		}
	});
	//密码
	$('input').eq(1).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val().length>0 && $(this).val().length<6){
			$(this).parent().next("div").text("长度只能在6-20个字符之间");
			$(this).parent().next("div").css("color",'red');
		}else{
			$(this).parent().next("div").text("");
		}		
	})
//	确认密码
	$('input').eq(2).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val()!=$('input').eq(1).val()){
			$(this).parent().next("div").text("两次密码不匹配");
			$(this).parent().next("div").css("color",'red');
		}else{
			$(this).parent().next("div").text("");
		}		
	})
//	手机号
	/*$('input').eq(3).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next("div").text("");
			$(this).parent().next("div").css("color",'#ccc');
		}else if($(this).val().substr(0,3)!=138&&$(this).val().substr(0,3)!=189&&$(this).val().substr(0,3)!=139&&$(this).val().substr(0,3)!=158&&$(this).val().substr(0,3)!=188&&$(this).val().substr(0,3)!=157||$(this).val().length!=11){
			$(this).parent().next("div").text("手机号格式不正确");
			$(this).parent().next("div").css("color",'red');
		}else{
			$(this).parent().next("div").text("");
		}		
	})*/
// 	验证码
//	 验证码刷新
	function code(){
		var str="qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
		var str1=0;
		for(var i=0; i<4;i++){
			str1+=str.charAt(Math.floor(Math.random()*62)) 
		}
		str1=str1.substring(1)
		$("#code").text(str1);
	}
	code();
	$("#code").click(code);	
//	验证码验证
	$('input').eq(4).blur(function(){
		if($(this).val().length==0){
			$(this).parent().next().next("div").text("");
			$(this).parent().next().next("div").css("color",'#ccc');
		}else if($(this).val().toUpperCase()!=$("#code").text().toUpperCase()){
			$(this).parent().next().next("div").text("验证码不正确");
			$(this).parent().next().next("div").css("color",'red');
		}else{
			$(this).parent().next().next("div").text("");
		}		
	})
//	提交按钮
	$("#submit_btn").click(function(e){		
		for(var j=0 ;j<5;j++){
			if($('input').eq(j).val().length==0){				
				$('input').eq(j).focus();				
				if(j==4){
					$('input').eq(j).parent().next().next("div").text("此处不能为空");
					$('input').eq(j).parent().next().next("div").css("color",'red');
					e.preventDefault();
					return;
				}
				$('input').eq(j).parent().next(".tips").text("此处不能为空");
				$('input').eq(j).parent().next(".tips").css("color",'red');	
				e.preventDefault();
				return;
			}			
		}
		//协议
		if($("#xieyi")[0].checked){
            var username = $('input').eq(0).val();
            var userpwd = $('input').eq(1).val();
            var data = {"username":username,"userpwd":userpwd};
            console.log("data"+data);
            $.ajax({
                dataType: "json",
                contentType:'application/json;charset=UTF-8',//关键是要加上这行 ***少了这行会报415错误 //设置json格式
                data: JSON.stringify(data),                //少了这行会报400错误 通过 JSON.stringify() 把 JavaScript 对象转换为字符串。
                type: "POST",
                url: "http://localhost:8080/userLoginInfo/regist",
                success : function (result) {
                    if(result>0){

                        alert("注册成功!快去登入吧。。。");

                        //window.open("http://localhost:8080/beforePage/toLogin","_blank");
                        location.href='http://localhost:8080/beforePage/toLogin';
                    }else{
                        alert("注册失败");
                    }


                },
                error : function (data){
                    alert(data.responseText);
                }
            });

		}else{						
			$("#xieyi").next().next().next(".tips").text("请勾选协议");
			$("#xieyi").next().next().next(".tips").css("color",'red');
			e.preventDefault();
			return;
		}
	})
});
