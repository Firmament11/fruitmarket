package com.lianwei.lssg.controller.before;

import com.lianwei.lssg.entity.LssgUserInfo;
import com.lianwei.lssg.entity.LssgUserLogin;
import com.lianwei.lssg.service.before.LssgUserInfoService;
import com.lianwei.lssg.utils.Constant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
@Controller
@RequestMapping("userInfo")
public class LssgUserInfoController {
    @Resource
    private LssgUserInfoService lssgUserInfoService;
    @Resource
    HttpServletRequest request;
    /**
     *
     * */
    @RequestMapping("/addUserImgPath")
    @ResponseBody
    public Map addPath(MultipartFile file) throws IOException {
        Map map = Constant.FileUploadUtils(request,file ,"userImg");
        return map;
    }

    /**
     *
     * */
    @RequestMapping("/showUserInfo")
    @ResponseBody
    public LssgUserInfo showUserInfo(){
        HttpSession session = request.getSession();
        LssgUserLogin lssgUserLogin = (LssgUserLogin) session.getAttribute("lssgUserLogin");
        return lssgUserInfoService.selectOneByUserId(lssgUserLogin.getUserId());
    }

    /**
     *
     * */
    @RequestMapping("/updateUserInfo")
    @ResponseBody
    public Integer updateUserInfo(@RequestBody LssgUserInfo lssgUserInfo){
        return lssgUserInfoService.updateOneUserInfo(lssgUserInfo);
    }

    /**
     *
     * */
    @RequestMapping("/findAllByMapWithPage")
    @ResponseBody
    public Map findAllByMapWithPage(@RequestBody Map map){
        Map map1 = new HashMap();
        List<LssgUserInfo> lssgPublicInfos = lssgUserInfoService.findAllUserInfoWithPage(map);
        map1.put("count",lssgUserInfoService.querySize(map));
        map1.put("data", lssgPublicInfos);
        map1.put("code", 0);
        map1.put("msg", "");
        return map1;
    }

    /**
     *
     * */
    @RequestMapping("/UpdateOneUserState")
    @ResponseBody
    public Integer UpdateOneUserState(@RequestParam("userState")Integer userState, @RequestParam("userInfoId")Integer userInfoId){
        return lssgUserInfoService.forbidOneUser(userInfoId,userState);
    }

    /**
     *
     * */
    @RequestMapping("/delOneUserInfo")
    @ResponseBody
    public Integer delOneAdmin(@RequestBody Integer userInfoId){
        return lssgUserInfoService.delOneUserInfoById(userInfoId);
    }

    /**
     *
     * */
    @RequestMapping("/delAllBySelected")
    @ResponseBody
    public Integer delAllBySelected(@RequestBody Integer[] userInfoIds){
        return lssgUserInfoService.deleteBatchStateByPrimaryKeySelective(userInfoIds);
    }
}

