<template>
  <div id="app" class="wrapper">
    <MChat-index
      ref="chat"
      :config="config"
      :chats="chats"
      :mine="mine"
      @talkEvent="talkEvent"
      @sendMessage="sendMessage"
      @loadHistory="handleHistory"
    >
      <chat-right-box>
        <template slot-scope="props">
          <chat-right-list
            v-if="props.chat.type == 'group'"
            :notices="props.chat.notices"
            :userList="props.chat.userList"
            :filter-user-method="filterUser"
            @click="handleRightEvent"
          ></chat-right-list>
        </template>
      </chat-right-box>
    </MChat-index>
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
        notice: true,
        // 设定消息提醒的声音文件
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
    fetchUserList(config) {
      let list = CONST.user_list;
      return list;
    },
    handleRightEvent(event) {
      console.log("右边框事件", event);
    },
    handleHistory(callBack) {
      let list = CONST.history;
      callBack(list);
    },
    talkEvent({ event, data }) {
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

      this.$im.emit("getMessage", message);
    },
  },
  mounted() {
    let message = CONST.test_send_msg;
    message.forEach((mes) => {
      this.$im.emit("getMessage", mes);
    });
  },
  mounted() {},
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