<template>
  <div id="app" class="wrapper">
       <svg-icon slot="reference" iconClass="smiley"></svg-icon>
    <MChat-index
      ref="MChat"
      :config="config"
      @chatEvent="chatEvent"
      @sendMessage="sendMessage"
      @loadHistory="handleHistory"
    ></MChat-index>
  </div>
</template>
<script>
// 历史记录
const history = [
  {
    username: "初音",
    avatar: "/avatar/初音.png",
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
    avatar: "/avatar/avatar_meteor.png",
  },
  {
    id: 1,
    name: "初音",
    type: "",
    avatar: "/avatar/初音.png",
  },
  {
    id: 2,
    name: "雪",
    type: "",
    avatar: "/avatar/雪.png",
  },
  {
    id: 3,
    name: "可可罗",
    type: "",
    avatar: "/avatar/可可罗.png",
  },
  {
    id: 4,
    name: "栞",
    type: "",
    avatar: "/avatar/栞.png",
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
];

export default {
  name: "app",
  data() {
    return {
      config: {
        //获取主面板列表信息，下文会做进一步介绍
        config: {
          // 是否有下拉按钮
          downBtn: true,
          rightBox:true,
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
          avatar: "/avatar/avatar_meteor.png",
        },
        //会话
        chats: [
          {
            id: 1,
            name: "海喵突基队",
            type: "group",
            avatar: "/images/group_1.jpg",
            userList: user_list,
            notices: notice_list,
          },
          {
            id: 2,
            name: "初音",
            type: "friend",
            avatar: "/avatar/初音.png",
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
    chatEvent({ event, data }) {
      let ary = [];
      let channels = this.config.chats;
      let len = channels.length;
      switch (event) {
        case "removeChat":
          if (len < 1) return;

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
      const { mine, to, content, timestamp } = data;
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
      // 方法一、 通过内置MChat的event 随时随地引用 
      this.$im.emit("getMessage", message);
      // 方法二、
      this.$refs[MChatname].getMessage(message)
    },
  },
  mounted() {
    // let message = CONST.test_send_msg;
    // message.forEach((mes) => {
    //   this.$im.emit("getMessage", mes);
    // });
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
