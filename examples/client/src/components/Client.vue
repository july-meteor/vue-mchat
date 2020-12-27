<template>
  <div id="app" class="wrapper">
    <mchat
      ref="chat"
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
          <div v-else>发挥你的想象</div>
        </template>
      </mchat-right-box>
    </mchat>
  </div>
</template>

<script>
export default {
  name: "Client",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      //获取主面板列表信息，下文会做进一步介绍
      config: {
        // 是否有下拉按钮
        downBtn: true,
        rightBox: true,
        // 简约模式
        brief: true,
        // 是否开启桌面消息提醒，即在浏览器之外的提醒
        notice: false,
        // 设定
        voice: true,
      },
      //我的信息
      mine: {},
      //会话
      chats: [],
    };
  },
  created() {
    this.initChat();
    this.socket.on("reset_chat", (data) => {
      console.log("reset_chat", data)
      this.chats = data;
    });
    // 接受消息
    this.socket.on("receive", (data) => {
      this.$refs.chat.getMessage(data);
    });

    this.socket.on("change_status_chat",()=>{
      // 通知用户更新群组 需要加锁。
    this.socket.emit("pull_chat")
    })
  },
  methods: {
    initChat() {
      this.mine = {
        username: this.user.name,
        id: this.user.id,
        status: "online",
        avatar: this.user.avatar,
      };
      let msg = { account: this.user.account };
      if(msg){
      this.socket.emit("online", msg);
      }
    },
    filterUser(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleChatEvent(event, data) {},
    handleRightEvent(event) {
      console.log("右边框事件", event);
    },
    handleHistory(callBack) {},
    talkEvent(event, data) {
      console.log("谈话内容", { event, data });
    },
    sendMessage(data) {
      let _this = this;
      // 神奇的回调。。
      this.socket.emit("message", data, function(params) {
        params.mine = true;
        _this.$refs.chat.getMessage(params);
      });
    },
    //添加回话
    handleAddChat() {},
    handleDelChat() {
    //   this.chats.pop();
    },
  },
  mounted() {},
};
</script>
