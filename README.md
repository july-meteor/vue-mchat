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

# 如果觉得还行,请给一个👉 star,谢谢😎 ! 有疑问请加群。

## 简介 

### 这是一款基于 vue.js 开发的聊天室组件库，在提供基础封装的同时，最大程度的增加扩展性。

下面是效果演示图：

![演示图](/doc/img/vue_mchat_demo.gif)

MChat组件效果图：

![MChat群聊界面](/doc/img/MChat-group.png)

![MChat群聊界面1](/doc/img/MChat-say.png)

IChat组件效果图：

![IChat群聊界面](/doc/img/IChat-group.png)

![IChat群聊界面1](/doc/img/IChat-Say.png)

![IChat群组信息](/doc/img/IChat-group_info.png)

![IChat系统消息信息](/doc/img/IChat-system.png)

## 🌰 加群获得群聊版本代码

[群聊演示地址](http://www.julymeteor.com/im/)
[静态效果演示](http://www.julymeteor.com/chat/)
 - [Github](https://github.com/july-meteor/vue-mchat)
 - [Gitee](https://gitee.com/july-meteor/vue-mchat)


## 项目来由

```
vue-mchat 是本人前端阶段性学习总结的项目，因为并非前端开发工程师所以还是有不少瑕疵。

如果有问题或者需求可以加群问，或者提 `Issues`!
```

***
   
#### 如何安装

* 使用 `npm` 安装

  ``` bash
  npm install vue-mchat
  ```
##### 使用

在`main.js`中引入

  ``` bash
  # npm 下载方式
  // 进入css
  import 'MChat/lib/MChat.css'
  //引入组件
  import MChat from 'MChat'
  // 使用vue加载组件
  Vue.use(MChat)
  # 
  ```

#### 如何进行二次开发

##### 方案一：

直接将 `pacages` 文件夹复制到你需要的项目，在 `main.js` 中引入 `vue-mchat`:

```JavaScript
import App from './App.vue'
import MChat from '../packages/index'

Vue.use(MChat)
```

##### 方案二：

在 `vue-mchat` 的基础上进行开发，通过打包成js库引入：

在 `vue-mchat` 目录下执行：

```bash
npm run lib 
```

可获得 `lib` 文件其中包含 `MChat` 的编译文件库，将 `lib` 整个复制到项目里，在 `main.js` 中引入:

```JavaScript
import  '../lib/MChat.css'
import MChat from '../lib/MChat.umd'

Vue.use(MChat)
```


# 组件API

可以根据 `src/test/` 下的 `Test.vue` 进行静态调试

## MChat 与 IChat 的区别

MChat 只具备有基础的 WebIM 功能，它没有用户管理及群组模块，则意味着你需要自己掌控数据变化。适用场景：客服系统

IChat 是模仿 Mac 上的 QQ 进行设计的，它封装了用户群组管理的数据模块，你只需要对接API就能使用。适用场景：独立的 WebIM

## MChat

### Attributes

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
    <td> callback() </td>
  </tr>
  <tr >
    <td> getMessage </td>
    <td> 监听接受的消息 </td>
    <td> user,message </td>
  </tr>
    <tr >
    <td> uploadEvent </td>
    <td> 文件上传接口 </td>
    <td> data,callback（回调函数） </td>
  </tr>
</table>

##### 窗口级事件

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
    <td> chatMin </td>
    <td> 窗口最小化</td>
    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 } </td>
  </tr>
  <tr >
    <td> chatMax </td>
    <td> 窗口最大化</td>
    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 }
  </tr>
    <tr >
    <td> removeChat </td>
    <td> 移除对话框</td>
    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 }
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

## IChat

### Attributes

<table  style="text-align: center;">
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>默认值</th>
     <th>说明</th>
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

### 初始化

```JavaScript

    let data = {
      // 好友列表
      friends: this.friendList,
      // 群组列表
      groups: this.groupList,
      // 系统消息列表
      messages: this.systemMessage,
    };
     this.$nextTick(() => {
      this.$refs.IChat.setData(data);
    });

```

##### `groups` 群组列表数据格式

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
    <td> 群组Id</td>
  </tr>
    <tr >
      <td> name </td>
      <td> 共同进步 </td>
      <td> string </td>
      <td> 群组名称</td>
    </tr>
    <tr >
      <td> mine </td>
      <td> null </td>
      <td> string </td>
      <td> 当前人在群组里的昵称</td>
    </tr>
    <tr >
      <td> avatar </td>
      <td> '/avatar/avatar_meteor.png' </td>
      <td> url </td>
      <td> 头像</td>
    </tr>
     <tr>
      <td> sign </td>
      <td> 8月22日 17:44 </td>
      <td> string </td>
      <td> 最后发言时间</td>
    </tr>
    <tr>
      <td> introduce </td>
      <td> 这里是共同进步 </td>
      <td> string </td>
      <td> 群介绍</td>
    </tr>
    <tr>
      <td> userList </td>
      <td> <pre> [{
                id: 1,
                cid: 123401,
                name: "怜",
                remark: '剑圣',
                online: false,
                avatar:"",
                sign: "。"
            }]</pre> </td>
      <td> object </td>
      <td> 成员数组，online 表示是否在线 </td>
    </tr>
</table>

##### `friends` 好友列表数据格式

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
    <td> 好友分组Id</td>
  </tr>
  <tr >
    <td> name </td>
    <td> 好友 </td>
    <td> string </td>
    <td> 分组名称</td>
  </tr>
    <tr>
      <td> userList </td>
      <td> <pre> [ {
                id: 1,
                cid: 123401,
                name: "怜",
                remark: '剑圣',
                online: true,
                avatar: "",
                sign: ""
            },]</pre> </td>
      <td> object </td>
      <td> 分组成员，online 表示是否在线 </td>
    </tr>
</table>

##### `messages` 系统消息列表数据格式


<table  style="text-align: center;">
  <tr>
    <th>参数</th>
    <th>默认值</th>
    <th>类型</th>
     <th>说明</th>
  </tr>
  <tr >
    <td> id </td>
    <td> null </td>
    <td> string/number </td>
    <td> 消息Id</td>
  </tr>
    <tr >
    <td> message </td>
    <td> null </td>
    <td> string </td>
    <td> 消息内容</td>
  </tr>
   <tr>
    <td> timestamp </td>
    <td> null </td>
    <td> string </td>
    <td> 时间戳</td>
  </tr>
     <tr>
    <td> from </td>
    <td> <pre>
       {
            id: 0,
            name: '真琴',
            avatar: require("../public/avatar/zhenqin.png"),
        },
    </pre> </td>
    <td> Object </td>
    <td> 发送人</td>
   </tr>
       <tr>
    <td> to </td>
    <td> <pre>
       {
            id: 0,
            name: '真琴',
            avatar: require("../public/avatar/zhenqin.png"),
        },
    </pre> </td>
    <td> Object </td>
    <td> 发送目标人</td>
  </tr>
  <tr >
    <td> type </td>
    <td> null </td>
    <td> string </td>
    <td> 消息类型包含以下几张类型{ 'applyFriend':'申请好友', 'acceptFriend':'接受好友申请', 'rejectFriend':'拒接好友申请',
    'accept':'被拒接好友申请',
    'reject':'被拒接好友申请',
    'system':'系统消息'}</td>
  </tr>
  
</table>

```
[
    {
        id: 1,
        from:
        {
            id: 0,
            name: '草野优衣',
            avatar: require("../public/avatar/ue.png"),
        },
        to:
        {
            id: 1,
            name: '七月',
            avatar: require("../public/avatar/avatar_meteor.png"),
        },
        type: 'acceptFriend',
        message: '111',
        timestamp: undefined
    },
]
```

#### Methods

IChat 将全部事件集中到了 `bindEvent(event, data)` 上:

```html
  <IChat ref="IChat" :config="config" :mine="mine" @bindEvent="handleEvent">
    </IChat>
```

bindEvent 包含以下事件

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
    <td> sendMessage </td>
    <td> 每当你发送一个消息，都可以通过该事件监听到。 </br>
    回调参数接受一个object类型的值，携带发送的聊天信息 </td>
    <td> message </td>
  </tr>
  <tr >
    <td> loadHistory </td>
    <td> 点击查看更多信息后触发,会返回一个回调方法  </td>
    <td> callback() </td>
  </tr>
  <tr >
    <td> getMessage </td>
    <td> 监听接受的消息 </td>
    <td> user,message </td>
  </tr>
    <tr >
    <td> uploadEvent </td>
    <td> 文件上传接口 </td>
    <td> data,callback（回调函数） </td>
  </tr>
</table>

#### Event

初始化 `IChat` 数据:

```JavaScript
  this.$refs.IChat.setData();
```

更新群组列表 `groups`:

```JavaScript
  this.$refs.IChat.setGroups();
```

更新好友列表 `friends`:

```JavaScript
  this.$refs.IChat.setFriends();
```

更新系统消息列表 `messages`:

```JavaScript
  this.$refs.IChat.setSystemMessage();
```

新的系统消息:

```JavaScript
  this.$refs.IChat.newSystemMessage();
```

新消息:

```JavaScript
  this.$refs.IChat.getMessage();
```



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
