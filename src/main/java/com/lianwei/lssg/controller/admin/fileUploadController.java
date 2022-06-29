/*
  麻烦不要将我的代码商用，我知道最近有几个憨憨拿去二开改了给人做毕设，你倒是删了我的信息啊，别让人联系我啊
*/
package com.lianwei.lssg.controller.admin;

import com.lianwei.lssg.utils.Constant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 *  author 太阳的光
 *  time 2019-03
 *  文件上传的接口
 */
@Controller
@RequestMapping("upload")
public class fileUploadController {
    /**
     *公告的图片
     * */
    @RequestMapping("/addPath")
    @ResponseBody
    public Map addPath(HttpServletRequest request, MultipartFile file
    ) throws IOException {
        //这里开始上传文件 第三个参数对应最末级文件夹
        Map map = Constant.FileUploadUtils(request,file ,"notice");
        return map;
    }


    /**
     *   新增管理员图片
     * */
    @RequestMapping("/addAdminPath")
    @ResponseBody
    public Map addAdminPath(HttpServletRequest request, MultipartFile file
    ) throws IOException {
        Map map = Constant.FileUploadUtils(request,file ,"admin");
        return map;
    }
}
