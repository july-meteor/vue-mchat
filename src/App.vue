<template>
  <div id="app" class="wrapper">
    <!--<el-row>-->
      <!--<el-col :span="8">-->
        <!--<el-card class="box-card">-->
          <!--<div slot="header" class="clearfix">-->
            <!--<span>操作示例</span>-->
          <!--</div>-->
          <!--<el-button @click="handleAddChat">增加会话</el-button>-->
          <!--<el-button @click="handleDelChat">删除会话</el-button>-->
          <!--<el-button @click="config.brief= !config.brief">简约模式</el-button>-->
        <!--</el-card>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <span class="m-icon-ashbin"></span>//记住别写错！！


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
          <div v-else>发挥你的想象</div>
        </template>
      </mchat-right-box>
    </mchat>
  </div>
</template>
<script>
import CONST from "./constant";

//红色语录
var replay = [
  "我认识的人很多，而且我的同志遍布五湖四海。emoji[嘻嘻]",
  "我才五年级，老马讲什么都听不懂了，因为他坚持奋斗福报走资理论。emoji[威武]",
  "我喜欢你，emoji[爱你]从初级阶段直到共产主义。",
  "奋斗了三十年他终究还是离开了我们，但他还在我们身边。 ",
  "我通过了你的入党申请，现在我们可以开始为全人类解放的伟大事业共同奋斗了。emoji[心]emoji[心]",
  "资产阶级的白鸽不会亲吻乌鸦，世间没有所谓跨阶级的爱。",
  "中国真好，下次还来。",
  "生而为人，为人民服务。",
  "<（@￣︶￣@）>",
  "(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？",
];


export default {
  name: "app",
  data() {
    return {
      //获取主面板列表信息，下文会做进一步介绍
      config: {
        // 是否有下拉按钮
        downBtn: true,
        rightBox: true,
        // 简约模式
        brief:true,
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

      //
      this.$refs.mchat.getMessage(message);

      //自动回复
        var authReplay = {
            username: "july-meteor",
            avatar:require("../public/avatar/heiqi.png"),
            id: to.id,
            type: to.type,
            content:  replay[(Math.random() * 9) | 0],
            cid: 0,
            mine: false,
            fromid: -1,
            timestamp: new Date(),
        };


    },
    //添加回话
    handleAddChat() {
     let chatId =   parseInt(Math.random() * 10, 10)
      let newChat = {
        id:chatId,
        name: "新会话",
        type: "friend",
        avatar:require("../public/avatar/temp2.jpg"),
      };
      this.chats.push(newChat);
    },
    handleDelChat() {
      this.chats.pop();
    },
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
