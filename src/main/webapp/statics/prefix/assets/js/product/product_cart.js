$(function () {
    /*$(".product_variant .button").click(function () {
        var nums = $(".product_variant #num").val();
        console.log("nums---->"+nums);
        var productId = $(".product_d_right #productId").val();
        console.log("productId---->"+productId);
        $.ajax({
            url:"http://localhost:8080/cart/addProductToCart",
            data:{
                "productId":productId,
                "nums":nums
            },
            dataType:"json",
            type: "POST",
            success : function (result){
                console.log("result--->"+result);
                //console.log("result['cartItems']--->"+result["cartItems"]);
                console.log("result.cartItems--->"+result.cartItems);
               // console.log("result.lssgCart.cartItems.get(1)--->"+result.lssgCart["cartItems"].get(1));
                if(result!=null){
                    /!*for(var keys in result.cartItems){
                        console.log("result.lssgCart[keys]--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys]);
                        console.log("result.lssgCart[keys].buyNum--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].buyNum);
                        console.log("result.lssgCart[keys].cartState--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].cartState);
                        console.log("result.lssgCart[keys].subtotalPrice--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].subtotalPrice);
                        console.log("------------------1-------------------");
                        console.log("result.lssgCart[keys].lssgProduct--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct);
                        console.log("result.lssgCart[keys].lssgProduct.productName--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.productName);
                        console.log("result.lssgCart[keys].lssgProduct.productMallPrice--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.productMallPrice);
                        console.log("------------------2-------------------");
                        console.log("result.lssgCart[keys].lssgProduct.lssgProductClass--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.lssgProductClass);
                        console.log("result.lssgCart[keys].lssgProduct.lssgProductClass.productClassName--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.lssgProductClass.productClassName);
                        console.log("result.lssgCart[keys].lssgProduct.lssgProductClass.productIsShow--->"+"\tkeys--->"+keys+"----->"+result.cartItems[keys].lssgProduct.lssgProductClass.productIsShow);
                    }*!/

                   location.href='http://localhost:8080/beforePage/toCart';
                }else{
                    location.href='http://localhost:8080/beforePage/toLogin';
                }
            },
            error : function (data){
                console.log(data.responseText);

            }

        })
    })*/
});



