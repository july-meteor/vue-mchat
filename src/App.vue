<template>
  <div id="app" class="wrapper">
    <mchat
      ref="mchat"
      :config="config"
      :chats="chats"
      :mine="mine"
      @chatEvent="handleChatEvent"
      @talkEvent="talkEvent"
      @sendMessage="sendMessage"
      @loadHistory="handleHistory"
    >
      <mchat-right-box>
        <template slot-scope="props">
          <mchat-group-list
            v-if="props.chat.type == 'group'"
            :notices="props.chat.notices"
            :userList="props.chat.userList"
            :filter-user-method="filterUser"
            @click="handleRightEvent"
          ></mchat-group-list>
          <div v-else > 发挥你的想象</div>
        </template>
      </mchat-right-box>
    </mchat>
  </div>
</template>
<script>
import CONST from "./constant";

export default {
  name: "app",
  data() {
    return {
      //获取主面板列表信息，下文会做进一步介绍
      config: {
        // 是否有下拉按钮
        downBtn: true,
        rightBox: true,
        minRight: true,
        // 是否开启桌面消息提醒，即在浏览器之外的提醒
        notice: false,
        // 设定
        voice: true,
      },
      //我的信息
      mine: CONST.mine,
      //会话
      chats: CONST.chats,
    };
  },
  methods: {
    filterUser(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    fetchNotices() {
      let list = CONST.notice_list;
      return list;
    },
    handleChatEvent(event, data) {
      let channels = this.chats;
      let len = channels.length;
      if (len < 1) return;
      let ary = [];
      switch (event) {
        case "removeChat":
          for (let i = 0; i < len; i++) {
            let model = channels[i];
            if (model.id != data.id) {
              ary.push(model);
            }
          }
          this.chats = ary;
          break;
      }
    },
    handleRightEvent(event) {
      console.log("右边框事件", event);
    },
    handleHistory(callBack) {
      let list = CONST.history;
      callBack(list);
    },
    talkEvent(event, data) {
      console.log("谈话内容", { event, data });
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

      // this.$im.emit("getMessage", message);
      this.$refs.mchat.getMessage(message);
    },
  },
  mounted() {
    let message = CONST.test_send_msg;
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