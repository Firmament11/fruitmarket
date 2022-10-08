function  serializeArrayToObject(formId) {
    //序列化成数组。
    var test = $("#"+formId).serializeArray();
    //序列化后的结果
    var temp = new Object();
    //嵌套循环：
    //1,大循环是为了找到所有的name     username    password     age  ......
   //2小循环是为了拿到对应的值。
    //3,解析为json对象：
   // {username='',password='',age='',}
    for (var i = 0; i < test.length; i++) {
        var arr = test[i].name.split(".");//对名称进行分解,为处理属性是对象打下基础
        var objName = "temp";
        for (var j = 0; j < arr.length - 1; j++) {
            if (eval("temp." + arr[j]) == undefined || eval("temp." + arr[j]) == null)
                eval("temp." + arr[j] + "={}");//当前属性是对象，进行对象实例化
            objName = objName + "." + arr[i];
        }
        //实例化成JSON对象。
        //temp[test[i].name]=stringToJson(test[i].value);
        eval("(" + "temp." + test[i].name + "='" + stringToJson(test[i].value) + "'" + ")");
        //  {“name='张三',password='12345',}
    }
    return temp;
}
/***********************过滤json字符串开始*********************************/
function stringToJson(v) {
    if (v.indexOf("\"") != -1) {
        v = v.toString().replace(new RegExp('(["\"])', 'g'), "\\\"");
    }
    else if (v.indexOf("\\") != -1)
        v = v.toString().replace(new RegExp("([\\\\])", 'g'), "\\\\");
    return v;
}

//获取到地址栏上的参数 ，传入参数的键名
function getURLParamValue(pName) {
    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var start = url.indexOf("?");
        var str = url.substr(start + 1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            if ([strs[i].split("=")[0]] == pName)
                return decodeURI(strs[i].split("=")[1]);
        }
    }
    else
        return "";
}


/**
 * @authors Mzong(mzong121491@gmail.com)
 * @date    2019-01-18 11:15
 * @requires  layui
 * @version $1.1.0$
 */

layui.define("layer", function(exports){
    //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var $ = layui.jquery,
        form = layui.form;
    // 返回的对象
    var returnObj = {
        /**
         * 省市县三级联动
         *
         * @param { string } [form] [form是layui.form对象]
         * @param {string} [province] [省容器的name名字 ]
         *    eg:<select name="province">
         * @param {string} [city] [省容器的name名字]
         * @param {string} [district] [县容器的name名字]
         * @return {undefined} [无返回值]
         */
        showCity: function(province, city, district) {
            //AreaData是地址传过来的json对象
            var AreaData = $.rawCitiesData;
            if("undefined" == typeof AreaData) {
                layer.open({
                    title: '系统提示'
                    ,content: '调用showCity之前请引入地址数据'
                });
                return;
            }
            var htmlProvince = '',
                htmlCity = '',
                htmlDistrict = '',
                cityData = '',
                districtData = '',
                $province = $('select[name='+province+']'),
                $city = $('select[name='+city+']'),
                $district = $('select[name='+district+']'),
                provVal = $province.attr('data-area') || '', // 省默认值
                cityVal = $city.attr('data-area') || '', // 市默认值
                distVal = $district.attr('data-area') || ''; // 县默认值
            $province.find('option').not(':first').remove();
            $city.find('option').not(':first').remove();
            $district.find('option').not(':first').remove();
            form.render('select');

            // 加载省数据
            loadProvince();
            function loadProvince() {
                AreaData.forEach(function(v, i) {
                    htmlProvince += '<option value='+v.code+'>'+v.name+'</option>';
                });
                $province.append(htmlProvince);

                // 默认选中省
                defaultSelect($province, provVal, function(code) {
                    cityData = findPlace(AreaData, code);
                    loadCity(cityData, true);
                });

                form.render('select');

            }

            // 加载城市数据
            function loadCity(city, hasDefault) {
                $city.find('option').not(':first').remove();
                htmlCity = '';
                var city = city || [];
                city.forEach(function(v, i) {
                    htmlCity += '<option value='+v.code+'>'+v.name+'</option>';
                });
                $city.append(htmlCity);

                // 默认加载才执行，手动选中不执行
                if (hasDefault) {
                    // 默认选中城市
                    defaultSelect($city, cityVal, function(code) {
                        // 加载默认城市数据
                        districtData = findPlace(cityData, code);
                        loadDistrict(districtData, true);
                    });
                }

                form.render('select');
            }

            // 加载县数据
            function loadDistrict(districtData, hasDefault) {
                $district.find('option').not(':first').remove();
                htmlDistrict = '';
                var districtData = districtData || [];
                districtData.forEach(function(v, i) {
                    htmlDistrict += '<option value='+v.code+'>'+v.name+'</option>';
                });
                $district.append(htmlDistrict);

                if (hasDefault) {
                    // 默认选中县
                    defaultSelect($district, distVal);
                }

                form.render('select');
            }

            // 查找地点数据
            function findPlace(data, code) {
                var resData = [];
                data.forEach(function(v, i) {
                    if (v.code === code) {
                        resData = v.sub
                    }
                });

                return resData;
            }

            /*
            * 查找默认选中项
            * @param {object} jq元素
            * @param {string} 默认值
            * @param {function} 回调函数
            */
            function defaultSelect($el, SelectVal, callback) {
                $('option', $el).each(function(i, el) {
                    var $this = $(this);
                    var optVal = $this.html();
                    var code;
                    if (optVal == SelectVal) {
                        $this.attr("selected", true);
                        code = $this.val();
                        // 加载默认城市数据
                        callback && callback(code);
                    }
                });
            }

            // 省选择
            form.on('select('+province+')', function(data) {
                var code = data.value;
                // console.log(data.elem); //得到select原始DOM对象
                // console.log(code); //得到被选中的值
                if (code != '') {

                    cityData = findPlace(AreaData, code);

                    loadCity(cityData);
                    loadDistrict();

                } else {
                    loadCity();
                    loadDistrict();
                }
                // console.log(data.othis); //得到美化后的DOM对象
            });
            // 市选择
            form.on('select('+city+')', function(data){
                var code = data.value;
                if (code != '') {

                    districtData = findPlace(cityData, code);

                    loadDistrict(districtData);
                    // console.log(data.elem); //得到select原始DOM对象
                } else {
                    loadDistrict();
                }
                // console.log(data.othis); //得到美化后的DOM对象
            });
            form.on('select('+district+')', function(data){
                // console.log(data.elem); //得到select原始DOM对象
                // console.log(data.value); //得到被选中的值
                // console.log(data.othis); //得到美化后的DOM对象
            });
        },
        /**
         * 获取省市县数据
         *
         * @param { object } [address] [address eg:广东省广州市天河区]
         * @return {object} [address][根据code码返回地址名称]
         */
        getCity: function(address) {
            //AreaData是地址传过来的json对象
            var AreaData = $.rawCitiesData;
            if("undefined" == typeof AreaData) {
                layer.open({
                    title: '系统提示'
                    ,content: '调用getCity之前请引入地址数据'
                });
                return;
            }
            var province = address.province,
                city = address.city,
                district = address.district,
                provinceName = '',
                cityName = '',
                districtName = '';

            function findIndex(arr, target) {
                return arr.findIndex(function(v, i) {
                    return target == v.code;
                })
            }

            if (province) {
                var findProvinceIndex = findIndex(AreaData, province);
                provinceName = AreaData[findProvinceIndex].name;
            }

            if (province && city) {
                var findCityIndex = findIndex(AreaData[findProvinceIndex].sub, city);
                cityName = AreaData[findProvinceIndex].sub[findCityIndex].name;
            }

            if (province && city && district) {
                var findDistrictIndex = findIndex(AreaData[findProvinceIndex].sub[findCityIndex].sub, district);

                districtName = AreaData[findProvinceIndex].sub[findCityIndex].sub[findDistrictIndex].name;
            }

            return {
                provinceName: provinceName,
                cityName: cityName,
                districtName: districtName
            }
        }
    }

    // exports module
    exports('common', returnObj);
});
