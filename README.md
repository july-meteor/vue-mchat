<p align="center">
 <h1> <img width="45px" src="https://img-blog.csdnimg.cn/20181109170115221.jpg">
MChat-Air</h1>

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


## 简介
![演示图](/doc/img/demo_gif.gif)

![](/doc/img/demo_1.png)
这是一款基于vue与elementu-ui开发的聊天室组件库，在UI上模仿了TIM及微信。在提供基础封装的同时，最大程度的增加扩展性。

## v1.0.0内容
- 基础聊天室功能 
    - 文字媒体
    -  
- 右边框自定义扩展
- 工具栏自定义扩展

#### 安装
*使用 `npm` 安装

  ``` bash
  npm install vue-meteor-chat
  ```

* 使用 `yarn` 安装

  ``` bash
  yarn add mchat
  ```
#### 使用
在`main.js`中引入
  ``` bash
  //引入组件
  import MChat from 'vue-meteor-chat'
  // 使用vue加载组件
  Vue.use(MChat)
  ```
## 组件说明
#### MChat-index 
![MChat-index演示图](/doc/img/mchatIndexDemo.png)
```bash
<template>
  <div id="app" class="wrapper">
    <MChat-index
      ref="chat"
      :config="config"
      @talkEvent="talkEvent"
      @sendMessage="sendMessage"
      @loadHistory="handleHistory"
    >
    </MChat-index>
  </div>
</template>
<script>
  // 历史记录
  const history = [
    {
      username: "初音",
      avatar: "/static/avatar/初音.png",
      id: 1,
      type: "group",
      content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
      cid: 0,
      mine: false,
      fromid: 3,
      timestamp: new Date(),
    },
  ];
  const user_list = [
    {
      id: 1,
      name: "七月",
      type: "",
      avatar: "/static/avatar/avatar_meteor.png",
    },
    {
      id: 1,
      name: "初音",
      type: "",
      avatar: "/static/avatar/初音.png",
    },
    {
      id: 2,
      name: "雪",
      type: "",
      avatar: "/static/avatar/雪.png",
    },
    {
      id: 3,
      name: "可可罗",
      type: "",
      avatar: "/static/avatar/可可罗.png",
    },
    {
      id: 4,
      name: "栞",
      type: "",
      avatar: "/static/avatar/栞.png",
    },
  ];
  // 公告列表
  const notice_list = [
    {
      id: 1,
      type: "文件",
      title: "RocketMQ原理.dock",
    },
    {
      id: 2,
      type: "公告",
      title: "公主连接Rank推荐",
    },
  ]
  export default {
    name: "app",
    data() {
      return {
        config: {
          //获取主面板列表信息，下文会做进一步介绍
          config: {
            // 是否有下拉按钮
            downBtn: true,
          },
          //我的信息
          mine: {
            // 昵称
            username: "七月",
            // 用户id
            id: "10001",
            //状态
            status: "online",
            //签名
            sign: "与其感慨路难行,不如马上出发！",
            avatar: "/static/avatar/avatar_meteor.png",
          },
          //会话
          chats: [
            {
              id: 1,
              name: "海喵突基队",
              type: "group",
              avatar: "/static/images/group_1.jpg",
              userList: user_list,
              notices: notice_list,
            },
            {
              id: 2,
              name: "初音",
              type: "friend",
              avatar: "/static/avatar/初音.png",
            },
          ],
        },
      };
    },
    methods: {
      handleHistory(callBack) {
        let list = history;
        callBack(list);
      },
      talkEvent({event, data}) {
        switch (event) {
          case "removeChat":
            let channels = this.config.chats;
            let len = channels.length;
            if (len < 1) return;
            let ary = [];
            for (let i = 0; i < len; i++) {
              let model = channels[i];
              if (model.id != data.id) {
                ary.push(model);
              }
            }
            this.config.chats = ary;
            break;
        }
      },
      sendMessage(data) {
        const {mine, to, content, timestamp} = data;
        let message = {
          //消息来源用户名
          username: mine.username,
          //消息来源用户头像
          avatar: mine.avatar,
          //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
          id: to.id,
          //聊天窗口来源类型，从发送消息传递的to里面获取
          type: to.type,
          //消息内容
          content,
          //消息id，可不传。除非你要对消息进行一些操作（如撤回）
          cid: 0,
          //是否我发送的消息，如果为true，则会显示在右方
          mine: true,
          //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
          fromid: mine.id,
          //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
          timestamp,
        };
        this.$im.emit("getMessage", message);
      },
    },
    mounted() {
      let message = CONST.test_send_msg;
      message.forEach((mes) => {
        this.$im.emit("getMessage", mes);
      });
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

```
### MChat Attributes
#### config  `MChat配置信息`
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
    <td>boolean</td>
    <td> 是否有右侧抽屉,如果为true,则右侧面板显示，可以加入自定义组件</td>
  </tr>
</table>

#### mine  `我的信息`

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

#### chats  `会话属性`

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
     <td> userList </td>
     <td> 
       <pre>[{id: 1, name: "七月", type: "admin", avatar: "/avatar/avatar_meteor.png" }]</pre> 
     </td>
     <td> array </td>
     <td> 使用user-list 组件需要该参数</td>
   </tr>
   <tr >
     <td> notices </td>
     <td> 
       <pre>[{id: 1, type: "文件", title: "RocketMQ原理.dock" }]</pre> 
     </td>
     <td> array </td>
     <td> 使用notice-box 组件需要该参数</td>
   </tr>
</table>

### MChat Methods

<table  style="text-align: center;">
  <tr>
    <th>方法名</th>
    <th>说明</th>
    <th>参数</th>
  </tr>
  <tr >
    <td> chatEvent </td>
    <td> 操作会话框触发,返回事件类型及窗口信息 </td>
    <td> event  </td>
  </tr>
  <tr >
    <td> talkEvent </td>
    <td> 当你点击对话内容返回对话信息触发 </td>
    <td> user,message </td>
  </tr>
  <tr >
    <td> sendMessage </td>
    <td> 每当你发送一个消息，都可以通过该事件监听到。回调参数接受一个object类型的值，携带发送的聊天信息 </td>
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

### MChat Events

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


**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**


## Browsers support

Modern browsers and Internet Explorer 10+.

| ![IE](/doc/img/icon/ie10.png)</br>IE / Edge | ![Firefox](/doc/img/icon/Firefox.png)</br>Firefox | ![Chrome](/doc/img/icon/Chrome.png)</br>Chrome | ![](/doc/img/icon/Safari.png)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](/LICENSE)

Copyright (c) 2020-present july-meteor
