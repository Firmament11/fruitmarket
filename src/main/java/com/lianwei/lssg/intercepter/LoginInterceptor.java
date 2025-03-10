package com.lianwei.lssg.intercepter;


import com.lianwei.lssg.entity.LssgAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    HttpSession session ;


    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        // 执行完毕，返回前拦截
    }


    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
        // 在处理过程中，执行拦截
    }


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
        // 在拦截点执行前拦截，如果返回true则不执行拦截点后的操作（拦截成功）
        // 返回false则不执行拦截
        LssgAdmin lssgAdmin = (LssgAdmin) session.getAttribute("lssgAdmin");
        //String uri = request.getRequestURI(); // 获取登录的uri，这个是不进行拦截的
        //if(session.getAttribute("LOGIN_USER")!=null || uri.indexOf("system/login")!=-1) {// 说明登录成功 或者 执行登录功能
        if(lssgAdmin!=null) {
            // 登录成功不拦截
            return true;
        }else {
            // 拦截后进入登录页面
            //执行这里表示用户身份需要验证，跳转到登录界面
            request.getRequestDispatcher("/admin/toLogin").forward(request, response);
            return false;
        }
    }
}