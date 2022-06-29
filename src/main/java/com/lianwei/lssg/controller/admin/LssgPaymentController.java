/*
  麻烦不要将我的代码商用，我知道最近有几个憨憨拿去二开改了给人做毕设，你倒是删了我的信息啊，别让人联系我啊
*/
package com.lianwei.lssg.controller.admin;

import com.lianwei.lssg.entity.LssgPayment;
import com.lianwei.lssg.service.admin.LssgPaymentService;
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
@RequestMapping("payment")
public class LssgPaymentController {
    @Resource
    private LssgPaymentService lssgPaymentService;

    /**
     *
     * */
    @RequestMapping("/findAllPayment")
    @ResponseBody
    public List<LssgPayment> findAllPayment(){
        return lssgPaymentService.findAllPayment();
    }

    /**
     *
     * */
    @RequestMapping("/findAllByMapWithPage")
    @ResponseBody
    public Map findAllByMapWithPage(@RequestBody Map map){
        Map map1 = new HashMap();
        List<LssgPayment> lssgPayments = lssgPaymentService.findAllPaymentWithPage(map);
        map1.put("count",lssgPaymentService.querySize(map));
        map1.put("data", lssgPayments);
        map1.put("code", 0);
        map1.put("msg", "");
        return map1;
    }

    /**
     *
     * */
    @RequestMapping("/findOnePaymentById")
    @ResponseBody
    public LssgPayment findOnePaymentById(@RequestBody Integer paymentId){
        return lssgPaymentService.selectOneById(paymentId);
    }

    /**
     *
     * */
    @RequestMapping("/selectOnePaymentById")
    @ResponseBody
    public LssgPayment selectOnePaymentById(@RequestParam("paymentId") Integer paymentId){
        return lssgPaymentService.selectOneById(paymentId);
    }

    /**
     *
     * */
    @RequestMapping("/updateOnePayment")
    @ResponseBody
    public Integer updateOnePayment(@RequestBody LssgPayment lssgPayment){
        System.out.println("lssgPayment----->"+lssgPayment);
        return lssgPaymentService.updateOnePayment(lssgPayment);
    }

    /**
     *
     * */
    @RequestMapping("/changeOnePayment")
    @ResponseBody
    public Integer changeOnePayment(@RequestBody LssgPayment lssgPayment){
        return lssgPaymentService.changeOnePayment(lssgPayment);
    }

    /**
     *
     * */
    @RequestMapping("/delOnePayment")
    @ResponseBody
    public Integer delOnePayment(@RequestBody Integer paymentId){
        return lssgPaymentService.delOnePayment(paymentId);
    }

    /**
     *
     * */
    @RequestMapping("/delAllBySelected")
    @ResponseBody
    public Integer delAllBySelected(@RequestBody Integer[] paymentIds){
        return lssgPaymentService.deleteBatchStateByPrimaryKeySelective(paymentIds);
    }

    /**
     *
     * */
    @RequestMapping("/addPayment")
    @ResponseBody
    public Integer addPayment(@RequestBody LssgPayment lssgPayment){
        return lssgPaymentService.addOnePayment(lssgPayment);
    }

}
