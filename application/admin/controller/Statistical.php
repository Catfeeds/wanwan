<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/31 0031
 * Time: 下午 1:54
 */

namespace app\admin\controller;


class Statistical extends Base
{
    //来源统计
    public function source(){
        //order_num订单数,sign_num已签到人数，member_num会员转换人数,order_sum_price订单总额,user_num客户人数
        $res = model('source')->query("select *,
                            (select count(*) from mfw_activity_order where source=s.id) as order_num, 
                            (select count(*) from mfw_activity_order where source=s.id and sign_time>0) as sign_num,
                            (select count(*) from mfw_user where source=s.id and member_grade=1) as member_num,
                            (select sum(order_price) from mfw_activity_order where source=s.id and order_status<>2) as order_sum_price,
                            (select count(*) from mfw_user where source=s.id) as user_num
                            from mfw_source as s");
        $this->assign('res',$res);
        return $this->fetch();
    }
}