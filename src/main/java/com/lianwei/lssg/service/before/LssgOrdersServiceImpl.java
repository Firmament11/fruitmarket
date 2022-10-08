/*
  Created by IntelliJ IDEA.
  User: Kalvin
  Date: 2020/5/21
  Time: 16:49
*/
package com.lianwei.lssg.service.before;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lianwei.lssg.dao.before.LssgAddressMapper;
import com.lianwei.lssg.dao.before.LssgOrderItemMapper;
import com.lianwei.lssg.dao.before.LssgOrdersMapper;
import com.lianwei.lssg.dao.before.LssgUserLoginMapper;
import com.lianwei.lssg.entity.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LssgOrdersServiceImpl implements LssgOrdersService{
    @Autowired
    private LssgOrdersMapper lssgOrdersMapper;
    @Autowired
    private LssgOrderItemMapper lssgOrderItemMapper;
    @Autowired
    private LssgAddressMapper lssgAddressMapper;
    @Autowired
    private LssgUserLoginMapper lssgUserLoginMapper;
    @Autowired
    private LssgProductService lssgProductService;
    /**
     *
     * */
    @Transactional
    public Integer submitOrder(LssgOrders lssgOrders) {
        List<LssgOrderItem> lssgOrderItemList = lssgOrders.getLssgOrderItemList();
        for(LssgOrderItem lssgOrderItem : lssgOrderItemList){
            lssgOrdersMapper.addOrderItem(lssgOrderItem);
        }
        return lssgOrdersMapper.addOrders(lssgOrders);
    }
    /**
     *
     * */
    public Integer updateOrderWithAddIdAndPayId(LssgOrders lssgOrders) {
        return lssgOrdersMapper.updateOrderWithAddIdAndPayId(lssgOrders);
    }

    public LssgOrders findOneByOrderId(String orderId) {
        return lssgOrdersMapper.findOneByOrderId(orderId);
    }

    public Integer addOrderAction(LssgOrderAction lssgOrderAction) {
        return lssgOrdersMapper.addOrderAction(lssgOrderAction);
    }

    public LssgOrderAction findOneActionByOrderId(String orderId) {
        return lssgOrdersMapper.findOneActionByOrderId(orderId);
    }

    public Integer delOneOrder(String orderId) {
        return lssgOrdersMapper.delOneOrder(orderId);
    }

    public Integer delOneActionByOrderId(String orderId) {
        return lssgOrdersMapper.delOneActionByOrderId(orderId);
    }

    public Integer updateOrderActionByOrderId(LssgOrderAction lssgOrderAction) {
        return lssgOrdersMapper.updateOrderActionByOrderId(lssgOrderAction);
    }

    /**
     * 根据用户ID查询订单分页显示
     * */
    @Transactional
    public PageInfo<LssgOrders> findOrderByUserId(Integer userId, Integer currentPage, Integer pageSize) {
        PageHelper.startPage(currentPage, pageSize);
        List<LssgOrders> lssgOrdersListl = lssgOrdersMapper.findOrderByUserId(userId);
        List<LssgOrderItem> lssgOrderItemList = null;
        for(int i=0; i< lssgOrdersListl.size() ; i++){
            if( lssgOrdersListl.get(i).getLssgAddress()!=null && lssgOrdersListl.get(i).getLssgAddress().getAddressId()!=null ){
                lssgOrderItemList = lssgOrderItemMapper.findAllOrderItemByOid(lssgOrdersListl.get(i).getOrderId());
                LssgOrderAction lssgOrderAction = lssgOrdersMapper.findOneActionByOrderId(lssgOrdersListl.get(i).getOrderId());
                LssgAddress lssgAddress = lssgAddressMapper.selectOneAddressById(lssgOrdersListl.get(i).getLssgAddress().getAddressId());
                lssgOrdersListl.get(i).setLssgOrderItemList(lssgOrderItemList);
                lssgOrdersListl.get(i).setLssgOrderAction(lssgOrderAction);
                lssgOrdersListl.get(i).setLssgAddress(lssgAddress);
            }else {
                lssgOrdersListl.remove(i--);
            }
        }
        if(lssgOrdersListl!=null && lssgOrdersListl.size()!=0){
            PageInfo<LssgOrders> lssgOrdersPageInfo = new PageInfo<LssgOrders>(lssgOrdersListl);
            lssgOrdersPageInfo.setTotal(lssgOrdersListl.size());
            return lssgOrdersPageInfo;
        }
        return null;
    }

    public List<LssgOrderAction> findSomeActionByMap(Map map) {
        List<LssgOrderAction> lssgOrderActionList = lssgOrdersMapper.findSomeActionByMap(map);
        return lssgOrderActionList;
    }

    /**
     * 根据订单状态（未支付、待收货、待发货）查询所有订单信息分页显示
     * */
    @Transactional
    public PageInfo<LssgOrders> findAllOrderByAction(Map map, Integer currentPage, Integer pageSize) {
        PageHelper.startPage(currentPage, pageSize);
        List<LssgOrders> lssgOrdersList = lssgOrdersMapper.findOrderByMap(map);
        List<LssgOrderItem> lssgOrderItemList = null;
        for(int i=0; i< lssgOrdersList.size() ; i++ ){
            if(lssgOrdersList.get(i).getLssgAddress()!=null && lssgOrdersList.get(i).getLssgAddress().getAddressId()!=null){
                lssgOrderItemList = lssgOrderItemMapper.findAllOrderItemByOid(lssgOrdersList.get(i).getOrderId());
                LssgAddress lssgAddress = lssgAddressMapper.selectOneAddressById(lssgOrdersList.get(i).getLssgAddress().getAddressId());
                lssgOrdersList.get(i).setLssgOrderItemList(lssgOrderItemList);
                lssgOrdersList.get(i).setLssgAddress(lssgAddress);
            }else {
                //当查不到地址的时候，就用默认地址，便于显示，如果一个地址都没有，直接将订单回写，让客户想后台告知后修改
                lssgOrdersList.remove(i--);
            }

        }

        if(lssgOrdersList!=null && lssgOrdersList.size()!=0){
            PageInfo<LssgOrders> lssgOrdersPageInfo = new PageInfo<LssgOrders>(lssgOrdersList);
            lssgOrdersPageInfo.setTotal(lssgOrdersList.size());
            return lssgOrdersPageInfo;
        }else {
            return null;
        }

    }

    public PageInfo<LssgOrders> findAllOrderByMap(Map map, Integer currentPage, Integer pageSize) {
        PageHelper.startPage(currentPage, pageSize);
        List<LssgOrders> lssgOrdersList = lssgOrdersMapper.findAllOrderByMap(map);
        List<LssgOrderItem> lssgOrderItemList;
        for(LssgOrders lssgOrders : lssgOrdersList){
            lssgOrderItemList = lssgOrderItemMapper.findAllOrderItemByOid(lssgOrders.getOrderId());
            LssgAddress lssgAddress = lssgAddressMapper.selectOneAddressById(lssgOrders.getLssgAddress().getAddressId());
            lssgOrders.setLssgOrderItemList(lssgOrderItemList);
            lssgOrders.setLssgAddress(lssgAddress);
        }
        PageInfo<LssgOrders> lssgOrdersPageInfo = new PageInfo<LssgOrders>(lssgOrdersList);
        return lssgOrdersPageInfo;
    }

    public List<LssgOrders> findAllOrderWithPage(Map map) {
        if(!map.isEmpty()){
            int count =(Integer) map.get("nums");//每一页显示的条数
            int start =((Integer)map.get("curr")-1)*count;//每一页的开始下标
            map.put("start",start);
            System.out.println("进入到服务层的查询方法");
        }
        List<LssgOrders> lssgOrdersList = lssgOrdersMapper.findAllOrderWithPage(map);
        for(int i=0 ; i<lssgOrdersList.size(); i++ ){
            if(lssgOrdersList.get(i).getLssgAddress()!=null && lssgOrdersList.get(i).getLssgAddress().getAddressId()!=null ){//先判空，确定有数据可以查询
                LssgAddress lssgAddress = lssgAddressMapper.selectOneAddressById(lssgOrdersList.get(i).getLssgAddress().getAddressId());
                lssgOrdersList.get(i).setLssgAddress(lssgAddress);
            }else {
                lssgOrdersList.remove(i--);
            }
        }
        return lssgOrdersList;
    }

    public int querySize(Map map) {
        return lssgOrdersMapper.querySize(map);
    }

    public int deleteBatchStateByPrimaryKeySelective(String[] orderId) {
        return lssgOrdersMapper.deleteBatchStateByPrimaryKeySelective(orderId);
    }

    @Transactional
    public LssgOrderItem isBuyByProductId(Integer productId,Integer uid) {
        LssgOrderItem lssgOrderItem1 = null;
        List<LssgOrders> lssgOrdersList = lssgOrdersMapper.selectAllOrdersByUid(uid);

        for(LssgOrders lssgOrders : lssgOrdersList){
            Map map = new HashMap();
            map.put("productId",productId);
            map.put("orderId",lssgOrders.getOrderId());
            lssgOrderItem1 = lssgOrderItemMapper.findAllOrderItemByOidAndPid(map);
            if(lssgOrderItem1!=null){
                break;
            }
        }
        return lssgOrderItem1;

    }


    /**
     *
     * @param orderId
     * @return
     */
    @Transactional
    public LssgOrders findOneOrder(String orderId) {
        LssgOrders lssgOrders = lssgOrdersMapper.findOneByOrderId(orderId);
        LssgAddress lssgAddress = lssgAddressMapper.selectOneAddressById(lssgOrders.getLssgAddress().getAddressId());
        LssgOrderAction lssgOrderAction = lssgOrdersMapper.findOneActionByOrderId(orderId);
        List<LssgOrderItem> lssgOrderItemList = lssgOrderItemMapper.findAllOrderItemByOid(lssgOrders.getOrderId());
        LssgUserLogin lssgUserLogin = lssgUserLoginMapper.selectUserLoginInfoByUserId(lssgAddress.getLssgUserLogin().getUserId());
        lssgOrders.setLssgUserLogin(lssgUserLogin);
        lssgOrders.setLssgOrderItemList(lssgOrderItemList);
        lssgOrders.setLssgAddress(lssgAddress);
        lssgOrders.setLssgOrderAction(lssgOrderAction);
        return lssgOrders;
    }

    public List<LssgOrders> findSomeOrderByMap(Map map) {
        List<LssgOrders> lssgOrdersList = lssgOrdersMapper.findOrderByMap(map);
        for(LssgOrders lssgOrders : lssgOrdersList){
            List<LssgOrderItem> lssgOrderItemList = lssgOrderItemMapper.findAllOrderItemByOid(lssgOrders.getOrderId());
            lssgOrders.setLssgOrderItemList(lssgOrderItemList);
        }
        return lssgOrdersList;
    }

    public int querySizeByMap(Map map) {
        return lssgOrdersMapper.querySizeByMap(map);
    }

    public Integer countOrderAction(LssgOrderAction lssgOrderAction) {
        return lssgOrdersMapper.countOrderAction(lssgOrderAction);
    }


}
