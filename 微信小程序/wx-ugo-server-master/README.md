# 黑马优购小程序服务端



## 项目环境

数据库：MySQL

服务端：NodeJS

> 注意：先启动 MySQL 数据库，并导入对应的数据库文件，再启动 Node 服务器。



## MySQL 数据库

> 数据库文件地址：/wx-ugo-server/db/newshop.sql

命令行导入 MySQL 参考代码：

```shell
# 1.0 用root登录
mysql -u root -p

# 2.0 新建数据库 - 导入前先建空数据库
create database ugoshop;

# 3.1 选择数据库
mysql> use ugoshop;

# 3.2 设置数据库编码
mysql> set names utf8;

# 3.3 导入数据（注意sql文件的路径）
mysql> source /wx-ugo-server/db/newshop.sql;
```



## NodeJS

> 服务端文件夹：/wx-ugo-server/

命令行运行 Node 参考代码：

```shell
# 进入服务端目录
cd wx-ugo-server

# 安装依赖
npm install

# 启动服务器
node app.js

```



# 服务器部署

小程序请求有以下要求：

1. 经过 ICP 备案的域名
2. 使用 https 安全协议
3. 不支持 IP 地址访问

如果小程序需要发布上线，请按上述要求部署服务器，如果没有域名和服务器，可自行购买。

> 注意：https 协议使用 443 端口，自行申请和部署相应的 SSL 证书，不要使用类似 8888 等测试端口。

合法请求参考：

https://autumnfish.cn/wx/api/public/v1/home/swiperdata

https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata

https://api.zbztb.cn/api/public/v1/home/swiperdata

https://www.uinav.com/api/public/v1/home/swiperdata

