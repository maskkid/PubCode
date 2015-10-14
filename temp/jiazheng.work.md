**接口规则**

所有接口主要包含四部分，请求地址，请求方式（GET，POST），请求参数，返回结果（数据格式json）

----------------------

**通用返回码**
* 分为3种情况
    - 返回码 < 100   : 业务码
    - 返回码 100~199 : 服务器、数据库异常状态码
    - 200~999 预留，未定义
    - 返回码 > 1000 : 未知错误

* 返回数据格式
    - {error:0, msg:'提示信息', data:{{},{},...}}

* 详细说明：0/1 通用提示
    - 0 : 成功/正确/true
    - 1 : 失败/错误/false
    - 2 : 没有授权
    - 3 : 授权过期
    - 4 : 参数错误
    - 99 : token错误
    - 101: 数据库链接失败
    - 1001：未知错误

----------------

**接口**

            说明：
                1. 所有接口参照“接口通用定义”项，具体接口返回值，只设定data项。
                2. DOMAIN_URL 表示接口主站网址，比如 http://www.baidu.com


* 接口通用定义：api_url+token=[token]
    - url : DOMAIN_URL/index.php?c=api&a=[api_string]&token=[token]
    - method : post/get
    - param : {a:a, b:b, c:c, ...}
    - return : 
            {
                code    :code,
                msg     :string, 
                data    : {
                    [list/item] :{},
                    'other':[其他自定义项]}
                }

* 检测token
    - url       : DOMAIN_URL/index.php?c=api&a=check_token&token=[token]
    - url       : DOMAIN_URL/api/check_token?token=[token]
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:"正确/错误提示"}

* 刷新token
    - url       : DOMAIN_URL/index.php?c=api&a=refresh_token&token=[token]
    - url       : DOMAIN_URL/api/refresh_token?token=[token]
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:"更新token成功/更新token失败", data:{item:'新token[string]'}}

* 根据token获取手机号
    - url       : DOMAIN_URL/index.php?c=api&a=get_mobile&token=[token]
    - url       : DOMAIN_URL/api/get_mobile
    - method    : get
    - param     : {token:[token]}
    - return    : {code:0/1, msg:'正确/错误提示', data:{item:'手机号[number]'}

* 获取验证码
    - url       : DOMAIN_URL/index.php?c=api&a=get_vcode
    - url       : DOMAIN_URL/api/account/vcode
    - method    : get
    - param     : {mobile:number}
    - return    : {code:0/1, msg:"正确/错误提示", data:{item:'验证码[string]'}}

* 登陆
    - url       : DOMAIN_URL/index.php?c=api&a=login
    - url       : DOMAIN_URL/api/account/login
    - method    : post
    - param     : {mobile:num, vcode:string}
    - return    : {code:0/1, msg:'登陆成功/验证码错误或已过期', data:{'token':string}}

* 获取服务类型列表
    - url       : DOMAIN_URL/index.php?c=api&a=get_service
    - url       : DOMAIN_URL/api/service/list
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:'正确/错误提示', data:{ 
                        list : { 
                            一级分类id : {
                                title:'一级分类名称',
                                children:{id1:'二级分类1', id2:'二级分类2'} 
                            },
                            {...}, 
                        }
    
* 根据服务类型id获取服务人员
    - url       : DOMAIN_URL/index.php?c=api&a=get_worker&serviceid=[serviceid]
    - url       : DOMAIN_URL/api/worker/list/[serviceid]
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:'正确/错误提示', data:{ 
                        'price' : '服务价格',
                        'list' : { 
                            id : {
                                id:'id',
                                name : '姓名',
                                mobile : '手机号',
                                province : '省份',
                                city : '城市',
                                district : '地区',
                                ...
                            },
                            {...}, 
                        }

* 添加订单
    - url       : DOMAIN_URL/index.php?c=api&a=order_add
    - url       : DOMAIN_URL/api/order/add
    - method    : post
    - param     : {serviceid:number, workerid:number, contacter:'联系人', address:'地址', ordertime:'服务时间,比如：2015-10-12 15:30:00', remark:'其他需求'}
    - return    : {code:0/1, msg:'成功/失败提示'}

* 获取某个订单
    - url       : DOMAIN_URL/index.php?c=api&a=order_item
    - url       : DOMAIN_URL/api/order/item/[orderid]?token=[token]
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:'成功/失败提示'}

* 取消订单
    - url       : DOMAIN_URL/index.php?c=api&a=order_cancel
    - url       : DOMAIN_URL/api/order/cancel?token=[token]
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:'成功/失败提示'}
    

* 获取某人订单列表
    - url       : DOMAIN_URL/index.php?c=api&a=order_list&token=[token]
    - url       : DOMAIN_URL/api/order/list?token=[token]
    - method    : get
    - param     : null
    - return    : {code:0/1, msg:'正确/错误提示', data:{ 
                        'list' : {
                            1 : { // 受理中
                                id : {
                                    id:'订单id',

                                    servicename : '服务名',
                                    contacter : '联系人',
                                    province : '省份',
                                    city : '城市',
                                    district : '地区',
                                    ...
                                },
                                {...}, 
                            },

                            2 : { // 已完成
                                ...
                            },

                            3 : { // 已取消
                                ...
                            }
                            
                        }


* 订单付款
    - url       : DOMAIN_URL/index.php?c=api&a=order_pay&token=[token]
    - url       : DOMAIN_URL/api/order/pay?token=[token]
    - method    : post
    - param     : {orderid:'订单id[int]', money:'付款金额[float]'}
    - return    : {code:0/1, msg:'成功/失败提示'}


* 订单评分
    - url       : DOMAIN_URL/index.php?c=api&a=order_comment
    - url       : DOMAIN_URL/api/order/comment?token=[token]
    - method    : post
    - param     : {orderid:'订单id[int]', score:'评分1-5分[int]', comment:'评论内容[string]'}
    - return    : {code:0/1, msg:'成功/失败提示'}