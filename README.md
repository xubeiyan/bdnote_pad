# BD note Pad

### 简介

试着写一个半音阶口琴的BD谱记录网站

### 依赖

使用`nodejs`，借助`koa2`框架，数据库使用`sqlite`

### 设计

#### 数据库设计

* sheet
	* id 
	* title 名称
	* composer 作曲者
	* uploader 上传者
	* intro 简介
	* bdnote bd谱
* uploader
	* id
	* secretkey 密钥
	* comment 备注
	* expiredtime 过期时间
	
#### 路由设计

* `/` 主页
* `/sheet/list/{:page}` 列表第几页(page)（默认1）(每页项目数和显示模式还是写到前端去得了)
* `/sheet/show/{id}` 显示id为对应值的乐谱
* `/notfound` 未找到页面
* `/sheet/upload` 上传新的乐谱
* `/sheet/uploadpost` 接收乐谱上传
* `/sheet/delete/{id}` 准备删除对应的乐谱 
* `/sheet/deletepost` 删除乐谱
* `/help` 帮助页面