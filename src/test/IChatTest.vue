<template>
  <div>
    <div class="demo-box">
      <div class="demo-header demo-title">操作示例</div>
      <div class="demo-body">
      </div>
    </div>
    <IChat ref="IChat" :config="config" :mine="mine" @bindEvent="handleEvent">
    </IChat>
  </div>
</template>
<script>
import CONST from "../IChatConstant";

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
  name: "i-chat-test",
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
        //上传文件的扩展名
        fileExt: "",
        fixed:true,
      },
      //我的信息
      mine: CONST.mine,
      //会话
      groupList: CONST.group_list,
      groupListT: CONST.group_list_change,
      friendList: CONST.friend_groups,
      friendListT: CONST.friend_groups_change,
      systemMessage: CONST.system_message,
      systemMessageT: CONST.system_message_change,
      status1: CONST.status_change_1,
      status2: CONST.status_change_2,
    };
  },
  methods: {
    handleEvent(event, data) {
      switch (event) {
        case "sendMessage":
          this.sendMessage(data);
          break;
        case "loadHistory":
          this.handleHistory(data);
          break;

        default:
          console.log("事件", event);
          break;
      }
    },
    handleRightEvent(event) {
      console.log("右边框事件", event);
    },
    handleHistory(callBack) {
      let history = [
        {
          username: "历史记录",
          avatar: require("../../public/avatar/temp2.jpg"),
          id: 1,
          type: "group",
          content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
          cid: parseInt(Math.random() * 10, 10),
          mine: false,
          fromid: 3,
          timestamp: new Date(),
        },
        {
          username: "历史记录",
          avatar: require("../../public/avatar/temp2.jpg"),
          id: 1,
          type: "group",
          content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
          cid: parseInt(Math.random() * 10, 10),
          mine: false,
          fromid: 3,
          timestamp: new Date(),
        },
        {
          username: "历史记录",
          avatar: require("../../public/avatar/temp2.jpg"),
          id: 1,
          type: "group",
          content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
          cid: parseInt(Math.random() * 10, 10),
          mine: false,
          fromid: 3,
          timestamp: new Date(),
        },
        {
          username: "历史记录",
          avatar: require("../../public/avatar/temp2.jpg"),
          id: 1,
          type: "group",
          content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
          cid: parseInt(Math.random() * 10, 10),
          mine: false,
          fromid: 3,
          timestamp: new Date(),
        },
      ];
      callBack(history);
    },
    talkEvent(event, data) {
      console.log("谈话内容", { event, data });
    },
    sendMessage(data) {
      console.log("发送内容", { data });
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
      this.$refs.IChat.getMessage(message);
    },

    handleUpload(data, fn) {
      console.log("文件上传", data);
    },
    unitSystemMessageInsertChange() {
      let index = 20;
      setInterval(() => {
        let message = {
          id: index,
          from: {
            id: 0,
            name: "草野优衣",
          },
          to: {
            id: 1,
            name: "七月",
          },
          type: "acceptFriend",
          message: index,
          timestamp: undefined,
        };
        index++;
        console.log("系统消息推送单元测试:{%s}", index);
        this.$refs.IChat.newSystemMessage(message);
      }, 2000);
    },
    unitSystemMessageChange() {
      let index = 0;
      setInterval(() => {
        console.log("新增系统消息动态变更测试");
        if (index % 2) {
          this.$refs.IChat.setSystemMessage(this.systemMessage);
        } else {
          this.$refs.IChat.setSystemMessage(this.systemMessageT);
        }
        index++;
      }, 2000);
    },
    unitStatusChange() {
      let index = 0;
      setInterval(() => {
        console.log("系统消息动态变更测试");
        if (index % 2) {
          this.$refs.IChat.setSystemMessage(this.status1);
        } else {
          this.$refs.IChat.setSystemMessage(this.status2);
        }
        index++;
      }, 2000);
    },

    unitGroupStatusChange() {
      let index = 0;
      setInterval(() => {
        console.log("群组状态变化测试");
        if (index % 2) {
          this.$refs.IChat.setGroups(this.groupList);
        } else {
          this.$refs.IChat.setGroups(this.groupListT);
        }
        index++;
      }, 2000);
    },
    unitFriendStatusChange() {
      let index = 0;
      setInterval(() => {
        console.log("好友状态变化测试");
        if (index % 2) {
          this.$refs.IChat.setFriends(this.friendList);
        } else {
          this.$refs.IChat.setFriends(this.friendListT);
        }
        index++;
      }, 2000);
    },
  },
  mounted() {
    let data = {
      friends: this.friendList,
      groups: this.groupList,
      messages: this.systemMessage,
    };

    // this.$refs.IChat.newSystemMessage()

    this.$nextTick(() => {
      this.$refs.IChat.setData(data);
      //   this.unitSystemMessageChange();
      // this.unitGroupStatusChange();
      // this.unitStatusChange();
      // this.unitFriendStatusChange();
    });
  },
};
</script>

<style lang="scss">

.demo-box {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  border-radius: 4px;
  overflow: hidden;
  .demo-header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  .demo-body {
    padding: 20px;
  }
}
</style>
