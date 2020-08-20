<script>
import MChatTabs from "./chatTabs";

export default {
  name: "MChat-index",
  components: {
    MChatTabs,
  },
  provide() {
    return {
      rootChat: this,
    };
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        img: "image/cover.png",
        name: "MChat",
        dept: "Meteor chat",
        callback: () => {},
      }),
    },
  },
  data() {
    return {
      panes: [],
      selected: "0",
    };
  },

  methods: {
    loadHistory(callBack) {
      this.$emit("loadHistory", callBack);
    },
    // 收到消息
    handleMessage(message) {
      this.panes.forEach((item) => {
        let { chat } = item;
        if (chat.id != message.id || chat.type != message.type) return;
        item.getMessage(message);
      });
    },
    handleEnter(chat, content) {
      const { mine } = this.config;
      let message = {
        //自己的信息
        mine: {
          id: mine.id,
          username: mine.username,
          avatar: mine.avatar,
          mine: true,
        },
        // 目标
        to: {
          id: chat.id,
          name: chat.name,
          type: chat.type,
          avatar: chat.avatar,
        },
        //内容
        content,
        //数据类型
        type: "text",
        //发起的时间戳
        timestamp: new Date(),
      };

      this.$emit("sendMessage", message);
    },
    handleEvent({ event, data }) {
      switch (event) {
        case "tabClick":
          this.handleTabClick(data);
          break;
        case "tabRemove":
          this.handleRemoveChat(data);
          break;
        default:
          break;
      }
    },
    // 会话内容的事件
    handleTalkEvent(event) {
      this.$emit("talkEvent", event);
    },
    // 会话框的事件
    handleChatEvent() {
      this.$emit("chatEvent", event);
    },
    handleTabClick({ pane }) {
      this.selected = pane.index;
    },
    handleRemoveChat({ pane }) {
      const { name, type, id } = pane.chat;
      this.handleTalkEvent({ event: "removeChat", data: { id, name, type } });
    },
    handPanesDrag(e) {
      let el = this.$refs.chat;
      var oDiv = el;
      var disX = e.clientX - oDiv.offsetLeft;
      var disY = e.clientY - oDiv.offsetTop;
      document.onmousemove = function (e) {
        e.preventDefault();
        var l = e.clientX - disX;
        var t = e.clientY - disY;
        oDiv.style.left = l + "px";
        oDiv.style.top = t + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    //生成panes的数据
    calcPaneInstances(isForceUpdate = false) {
      //绕了一圈最终决定由chat-box 来决定 chat-tabs的属性
      if (this.$children) {
        const childPanes = this.$children.filter(
          (item) =>
            item.$vnode.tag &&
            item.$vnode.componentOptions &&
            item.$vnode.componentOptions.Ctor.options.name === "MChat"
        );
        // update indeed
        const panes = childPanes.map((item) => item.$vnode.componentInstance);
        const panesChanged = !(
          panes.length === this.panes.length &&
          panes.every((pane, index) => pane === this.panes[index])
        );
        if (isForceUpdate || panesChanged) {
          this.selected = "0";
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
  },
  render() {
    let {
      handPanesDrag,
      config,
      panes,
      handleEvent,
      handleEnter,
      loadHistory,
    } = this;
    const { chats } = config;

    // 窗口页面
    const el_chat_panes = this._l(chats, (chat) => {
      let data_chat = {
        props: {
          chat,
        },
        ref: "MChat",
        on: {
          enter: function (content) {
            handleEnter(chat, content);
          },
          loadHistory: function (callBack) {
            loadHistory(callBack);
          },
        },
      };
      return <m-chat {...data_chat}></m-chat>;
    });
    // 标签页面
    const el_chat_tabs = {
      props: {
        panes,
      },
      ref: "MChatTabs",
      on: {
        click: function (data) {
          handleEvent(data);
        },
      },
    };

    return (
      <div>
        <div
          class={{
            "im-layer  layer-anim im-box im-chat": true,
            "chat-show": true,
          }}
          ref="chat"
          style={{
            "z-index": 1002,
            left: "296.5px",
            display: "inline",
          }}
        >
          <div
            class="im-layer-title"
            style="cursor: move;"
            on-mousedown={(ev) => {
              handPanesDrag(ev);
            }}
          ></div>
          <div class="im-layer-tabs im-layer-content">
            <m-chat-tabs {...el_chat_tabs}></m-chat-tabs>
            {el_chat_panes}
          </div>
          <span class="im-box-setwin">
            <a class="im-btn-min" href="javascript:;">
              <cite></cite>
            </a>
            <a class="im-ico im-icon-max" href="javascript:;"></a>
            <a class="im-ico im-icon-close" href="javascript:;"></a>
          </span>
          <span class="im-icon-resize"></span>
        </div>
      </div>
    );
  },
  created() {
    // 设定一些监听的事件
    this.$im.on("getMessage", (msg) => {
      this.handleMessage(msg);
    });
  },
  mounted() {
    this.calcPaneInstances();
  },
  updated() {
    this.calcPaneInstances();
  },
};
</script>

<style scoped>
.chat-show {
  -webkit-box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  min-width: 500px;
  width: 800px;
}
.hidden-right-box {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
</style>

