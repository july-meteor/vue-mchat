<p align="center">
 <h1> <img width="45px" src="https://img-blog.csdnimg.cn/20181109170115221.jpg">
MChat</h1>

</p>

<p align="center">  
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.2-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  
  <a href="https://github.com/18106960985/meteor-curator-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

简体中文 | [English](README.en.md)

# 如果觉得还行,请给一个👉 star,谢谢😎 !

## 简介 

### 这是一款基于vue与elementu-ui开发的聊天室组件库，在UI上模仿了TIM及微信。在提供基础封装的同时，最大程度的增加扩展性。

![演示图](/doc/img/vue_mchat_demo.gif)
![MChat-index演示图](/doc/img/sample_1.png)


[演示地址](http://www.julymeteor.com/chat/)
 - [Github](https://github.com/july-meteor/vue-mchat)
 - [Gitee](https://gitee.com/july-meteor/vue-mchat)


## 🌰 项目来由
```
vue-mchat 是本人前端阶段性学习总结的项目，因为并非前端开发工程师所以还是有不少瑕疵。
项目去重了很多业务相关的东西,只提供扩展思路和接方法接口，并非是我无法实现。
只是想抛砖引玉！（其实是突然上了推荐，不知所措。😲只能爬起来更新了)
```
***


## v1.0.0内容
- 基础聊天室功能 
    - 文字媒体转换
    - 未读提醒
    - 多会话
- 右边框
    - 基础群组模板 
    - 自定义组件扩展 
- 工具栏
   - 自定义组件扩展
## 下一版本计划

以整理代码结构为主，会提供一些对接MChat的演示例子

- 提供更好的演示服务
    - 用户注册/登录
    - 群聊
- 提供弹出层封装
- 工具类
   - 文件上传
   - 代码
   
   
   

#### 安装
*使用 `npm` 安装

  ``` bash
  npm install vue-mchat
  ```

* 使用 `yarn` 安装

  ``` bash
  
  ```
#### 使用
在`main.js`中引入
  ``` bash
  // 进入css
  import 'MChat/lib/MChat.css'
  //引入组件
  import MChat from 'MChat'
  // 使用vue加载组件
  Vue.use(MChat)
  ```
#组件说明

[Sample](/src/App.vue) 
### MChat
#### Attributes
##### config  `MChat配置信息`
<table  style="text-align: center;">
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>默认值</th>
     <th>说明</th>
  </tr>
  <tr >
    <td> rightBox </td>
    <td> false </td>
    <td> boolean </td>
    <td> 是否有右侧抽屉,如果为true,则右侧面板显示，可以加入自定义组件</td>
  </tr>
  <tr >
    <td> brief </td>
    <td> true </td>
    <td>boolean</td>
    <td> 是否开启简约模式,Chat可以被缩小</td>
  </tr>
  <tr >
    <td> notice </td>
    <td> false </td>
    <td>boolean</td>
    <td> 是否开启桌面消息提醒，即在浏览器之外的提醒</td>
  </tr>
  <tr >
    <td> voice </td>
    <td> false </td>
    <td>boolean</td>
    <td> 是否开启消息提醒</td>
  </tr>
</table>

##### mine  `我的信息`

<table  style="text-align: center;">
  <tr>
    <th>参数</th>
    <th>默认值</th>
    <th>类型</th>
     <th>说明</th>
  </tr>
  <tr >
    <td> id </td>
    <td> 10001 </td>
    <td> string/number </td>
    <td> 我的id</td>
  </tr>
    <tr >
      <td> username </td>
      <td> july-meteor </td>
      <td> string </td>
      <td> 我的昵称</td>
    </tr>
    <tr >
      <td> sign </td>
      <td> 与其感慨路难行,不如马上出发！ </td>
      <td> string </td>
      <td> 签名</td>
    </tr>
    <tr >
      <td> avatar </td>
      <td> '/avatar/avatar_meteor.png' </td>
      <td> url </td>
      <td> 头像</td>
    </tr>
    <tr>
      <td> data </td>
      <td> 你需要的数据 </td>
      <td> object </td>
      <td> 扩展数据</td>
    </tr>
</table>

##### chats  `会话属性`

<table  style="text-align: center;">
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>默认值</th>
     <th>说明</th>
  </tr>
  <tr >
    <td> id </td>
    <td> 10002 </td>
    <td> string/number </td>
    <td> 会话id </td>
  </tr>
   <tr >
     <td> name </td>
     <td> 海喵突基队 </td>
     <td> string </td>
     <td> 会话名称</td>
   </tr>
  <tr >
    <td> type </td>
    <td> group </td>
    <td> string </td>
    <td> 会话类型 group/friend 根据你的需要自行扩展</td>
  </tr>
  <tr >
    <td> avatar </td>
    <td> /images/group_1.jpg </td>
    <td> url </td>
    <td> 会话头像 </td>
  </tr>
  <tr >
    <td> online </td>
    <td> true </td>
    <td> boolean </td>
    <td> type类型为friend  </td>
  </tr>
</table>

##### Content  talk content format 
<table  style="text-align: center;">
  <tr>
    <th> 类型 </th>
    <th>格式</th>
    <th>说明</th>
    <th>参考值</th>
  </tr>
  <tr >
    <td> Text </td>
    <td> ---- </td>
    <td> 普通文字信息 </td>
    <td> hello july meteor  </td>
  </tr>
  <tr >
     <td> emoji </td>
     <td> emoji[url] </td>
     <td> 表情 </td>
     <td> emoji[汗] </td>
  </tr>
  <tr >
    <td> Audio </td>
    <td> audio[url] </td>
    <td> 视频消息 </td>
    <td> audio[https://www.w3school.com.cn/i/horse.mp3] </td>
  </tr>
  <tr >
     <td> Video </td>
     <td> video[url] </td>
     <td> 音频 </td>
     <td> video[https://www.w3school.com.cn/i/movie.mp4]  </td>
  </tr>
  <tr >
     <td> Image </td>
     <td> img[url] </td>
     <td> 图片类型 </td>
     <td> img[/emoticon/emoticon_1.jpg] </td>
  </tr>
</table>


#### Methods

<table  style="text-align: center;">
  <tr>
    <th>方法名</th>
    <th>说明</th>
    <th>参数</th>
  </tr>
  <tr >
    <td> chatEvent </td>
    <td> 操作会话框触发,返回事件类型及窗口信息。具体事件看下表1</td>
    <td> event,data </td>
  </tr>
  <tr >
    <td > <span style="text-decoration:line-through;"> talkEvent </span> </td>
    <td> 当你点击对话内容返回对话信息触发 (已经弃用) </td>
    <td> user,message </td>
  </tr>
  <tr >
    <td> sendMessage </td>
    <td> 每当你发送一个消息，都可以通过该事件监听到。 </br>
    回调参数接受一个object类型的值，携带发送的聊天信息 </td>
    <td> message </td>
  </tr>
  <tr >
    <td> loadHistory </td>
    <td> 点击查看更多信息后触发,会返回一个回调方法  </td>
    <td> funcation() </td>
  </tr>
  <tr >
    <td> getMessage </td>
    <td> 监听接受的消息 </td>
    <td> user,message </td>
  </tr>
</table>

表1
<table  style="text-align: center;">
  <tr>
    <th>事件名称</th>
    <th>说明</th>
    <th>参数</th>
  </tr>
  <tr >
    <td> chatTop </td>
    <td> 会话置顶</td>
    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 } </td>
  </tr>
  <tr >
    <td> chatTop </td>
    <td> 会话置顶</td>
    <td> 窗口信息 </td>
  </tr>
  <tr >
    <td> clickTalk </td>
    <td>  当你点击对话内容返回对话信息触发 </td>
    <td> 对话内容 </td>
  </tr>
    <tr >
      <td> clickUser </td>
      <td>  当你点击聊天框内用户头像 </td>
      <td> {id: 用户Id, mine: 是否是自己 , username:用户名称 } </td>
    </tr>
</table>



#### MChat Events

<table  style="text-align: center;">
  <tr>
    <th>事件名称</th>
    <th>说明</th>
    <th>回调参数/使用方法</th>
  </tr>
  <tr >
    <td> getMessage </td>
    <td> 监听接受的消息  </td>
    <td> 参考下方示例1 </td>
  </tr>
  <tr >
    <td> getCurrent </td>
    <td> 获取当前会话  </td>
    <td> Objectg </td>
  </tr>
</table>
<div>
<p stype="color:red"> 示例1 </p>
       <pre>
            let message = {
                    //消息来源用户名
                    username: '七月'
                    //消息来源用户头像
                    avatar: avatar,
                    //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                    id: 1001,
                    //聊天窗口来源类型，从发送消息传递的to里面获取
                    type: 'group',
                    //消息内容  请看 Attributes 中的content说明
                    content:'你好',
                    //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                    cid: 0,
                    //是否我发送的消息，如果为true，则会显示在右方
                    mine: true,
                    //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                    fromid: 10002,
                    //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
                    timestamp: new date(),
                  };
                  // 方法一、 通过内置MChat的event 随时随地引用 
                  this.$im.emit("getMessage", message);
                  // 方法二、
                  this.$refs[MChatname].getMessage(message)
        </pre>
</div>



**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 或者 发邮件给我，根据star和watch的人数进行下一步更新

### MChat-right-box  

** 通过 `Scoped slot` 可以获取到 chat (内部的状态管理）的数据，用法参考 demo。

### MChat-group-list

#### Attributes
<table  style="text-align: center;">
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>默认值</th>
     <th>说明</th>
  </tr>
  <tr >
    <td> notices </td>
    <td> array </td>
    <td> id, type, title  </td>
    <td> 群公告栏 </td>
  </tr>
  <tr >
    <td> userList </td>
    <td> array </td>
    <td> id, name,type, avatar  </td>
    <td> 成员信息 </td>
  </tr>
  <tr >
    <td> filter-user-method </td>
    <td> Function(value, data) </td>
    <td> —  </td>
    <td> 对成员节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 </td>
  </tr>
</table>

#### Methods

<table  style="text-align: center;">
  <tr>
    <th>方法名</th>
    <th>说明</th>
    <th>参数</th>
  </tr>
  <tr >
    <td> click </td>
    <td> 点击群公告，或者成员触发 </td>
    <td> event  </td>
  </tr>
</table>

#### Event



## QQ交流群
![共同进步](/doc/img/qq_group.png)

## Browsers support

Modern browsers and Internet Explorer 10+.

| ![IE](/doc/img/icon/ie10.png)</br>IE / Edge | ![Firefox](/doc/img/icon/Firefox.png)</br>Firefox | ![Chrome](/doc/img/icon/Chrome.png)</br>Chrome | ![](/doc/img/icon/Safari.png)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](/LICENSE)

Copyright (c) 2020-present july-meteor
