## 目录
* src
* pkg
* bin

## 设计
    包含通信业务和监视业务两部分，通信业务为编译文件，监视业务为web形式

### 包含文件
* 入口服务
    - 参数解析
    - 错误校验
* 通信服务
    - 用于远端服务器通信(tcp/ip, http)
* 权限服务
    - 远端加密认证,提供文件证书,程序配合证书运行。证书对应连接数/使用期限等
    - 通信加密形式配置
* tcp服务端
    - 端口定义监听
    - 多协程支持
    - 数据转发
* 数据服务
    - 连接数据库，支持自定义数据库类型,默认sqllite，支持mysql/mongo
    - 支持缓存调用，redis/memcache支持

### 主逻辑
启动服务端监听，进行远端权限校验。
客户端接入，验证权限，数据通信
服务端接受数据，调用外部程序，同时写入数据到存储引擎

监控端，根据数据库数据，计算设备状态.