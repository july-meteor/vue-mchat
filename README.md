<p align="center">
 <h1> <img width="45px" src="https://img-blog.csdnimg.cn/20181109170115221.jpg">
MChat</h1>

</p>

<p align="center">  
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
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

## 演示代码和vue3版本在项目目录下，serve 使用的是 node.js 数据库采用的是 Mongodb

[群聊演示地址](http://120.77.44.62/im/)
[文档-示例](http://120.77.44.62/)

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
