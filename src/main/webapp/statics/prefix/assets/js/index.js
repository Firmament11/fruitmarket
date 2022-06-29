$(function () {

});

/**
 *
 * */

function addToCart(productId,nums) {
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
                if(result!=null){
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



