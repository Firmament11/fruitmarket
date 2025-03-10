/*
  麻烦不要将我的代码商用，我知道最近有几个憨憨拿去二开改了给人做毕设，你倒是删了我的信息啊，别让人联系我啊
*/
package com.lianwei.lssg.controller.admin;

import com.lianwei.lssg.entity.LssgPublicClass;
import com.lianwei.lssg.service.admin.LssgPublicClassService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  author 太阳的光
 *  time 2019-03
 *  订单支付的接口
 */
@Controller
@RequestMapping("publicClass")
public class LssgPublicClassController {
    @Resource
    private LssgPublicClassService lssgPublicClassService;

    /**
     *
     * */
    @RequestMapping("/addOnePublicClass")
    @ResponseBody
    public Integer addOnePublicClass(@RequestBody LssgPublicClass lssgPublicClass){
        return lssgPublicClassService.addOnePublicClass(lssgPublicClass);
    }

    /**
     *
     * */
    @RequestMapping("/UpdateOnePublicClassState")
    @ResponseBody
    public Integer UpdateOnePublicClassState(@RequestParam("classState")Integer classState,@RequestParam("publicClassId")Integer publicClassId){
        Map map = new HashMap();
        map.put("publicClassId",publicClassId);
        map.put("classState",classState);
        return lssgPublicClassService.delOnePublicClass(map);
    }

    /**
     *
     * */
    @RequestMapping("/findAllPublicClass")
    @ResponseBody
    public Map findAllPublicClass(@RequestBody Map map){
        List<LssgPublicClass> lssgOrdersList = lssgPublicClassService.findAllPublicClass(map);
        Map map1 = new HashMap();
        map1.put("count", lssgPublicClassService.querySize(map));
        map1.put("data", lssgOrdersList);
        map1.put("code", 0);
        map1.put("msg", "");
        return map1;
    }

    /**
     *
     * */
    @RequestMapping("/delOneById")
    @ResponseBody
    public Integer delOneById(@RequestBody Integer publicClassId){
        return lssgPublicClassService.delOnePublicClassById(publicClassId);
    }

    /**
     *
     * */
    @RequestMapping("/deleteSelectPublicClass")
    @ResponseBody
    public int deleteSelectBooks(@RequestBody Integer[] publicClassIds){
        for (Integer publicClassId : publicClassIds) {
            System.out.println(publicClassId);
        }
        return lssgPublicClassService.deleteBatchStateByPrimaryKeySelective(publicClassIds);
    }

    /**
     *
     * */
    @RequestMapping("/selectAllPublicClass")
    @ResponseBody
    public List<LssgPublicClass> selectAllPublicClass(){
        return lssgPublicClassService.selectAllPublicClass();
    }

    /**
     *
     * */
    @RequestMapping("/findAllByLocation")
    @ResponseBody
    public List<LssgPublicClass> findAllByLocation(@RequestParam("locationId")Integer locationId){
        return lssgPublicClassService.selectAllPublicClassByLocation(locationId);
    }

}
