<script>
import ChatTabs from "./tabs";
import ContentItem from "./content";

import { playTipSound } from "../../../../util/play";
import { default_avatar } from "../../../../util/constant";

export default {
  name: "chat-page",
  components: {
    ChatTabs,
    ContentItem,
  },
  provide() {
    return {
      ChatPage: this,
    };
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        rightBox: false,
        brief: false,
        voice: false,
        notice: false,
      }),
    },
    mine: {
      type: Object,
      default: () => ({
        id: "10001",
        username: "jule-meteor",
        status: "online",
        sign: "与其感慨路难行,不如马上出发！",
        avatar: "/avatar/avatar_meteor.png",
      }),
    },
    chats: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      panes: [],
      selected: "0",
      // 主体是否隐藏
      display: true,
      width: "800",
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 方法集中处理，有些方法
    handleEvent(event, data) {
      switch (event) {
        case "tabClick":
          this.handleTabClick(data);
          break;
        case "tabRemove":
          this.handleRemoveChat(data);
          break;
        case "chatClose":
          this.handleRemoveChat({ pane: this.getCurrent() });
          break;
        case "enter":
          this.handleEnter(data);
          break;
        default:
          this.bindEvent(event, data);
          break;
      }
    },

    // 会话框的事件
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    //
    selectedPane(data) {
      const { id, type } = data;
      this.panes.forEach((item, index) => {
        const { chat } = item;
        if (chat.id === id && chat.type === type) {
          this.selected = item.index;
          this.handleEnterFocus(item);
        }
      });
    },
    handleTabClick({ pane }) {
      this.selected = pane.index;
      this.handleEnterFocus(pane);
      // 输入框对焦
    },
    // 后续删除
    handleRemoveChat({ pane }) {
      const { name, type, id } = pane.chat;
      this.bindEvent("removeChat", { id, name, type });
    },
    handleEnter({ chat, content }) {
      const mine = this.mine;
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
      //是否写回去
      this.bindEvent("sendMessage", message);
    },
    getMessage(message) {
      this.$nextTick(() => {
        let voice = this.config.voice;
        // 提示音
        if (voice) {
          if (!message.mine) {
            playTipSound();
          }
        }
        this.panes.forEach((item) => {
          let { chat } = item;
          if (chat.id === message.id && chat.type === message.type) {
            item.getMessage(message);
          }
        });
      });
    },
    //  获得当前对话框
    getCurrent() {
      let { chat, taleList } = this.getCurrentPane();
      return { chat, taleList };
    },
    //  获得当前对话框内部使用
    getCurrentPane() {
      for (let pane of this.panes) {
        // 激活的就是当前的
        if (pane.active) {
          return pane;
        }
      }
    },
    // 输入框对焦
    handleEnterFocus(pane) {
      if (!pane) {
        pane = this.getCurrentPane();
      }
      setTimeout(() => {
        if (!pane || pane.$children.length < 1) {
          return;
        }
        const childrenEl = pane.$children[0].$children.filter(
          (item) =>
            item.$vnode.tag &&
            item.$vnode.componentOptions &&
            item.$vnode.componentOptions.Ctor.options.name === "enter-box"
        );
        if (childrenEl.length > 0) {
          childrenEl[0].handleInputFocus();
        }
      }, 200);
    },
    //生成panes的数据
    calcPaneInstances(isForceUpdate = false) {
      //绕了一圈最终决定由chat-box 来决定 chat-tabs的属性
      if (this.$children) {
        const childPanes = this.$children.filter(
          (item) =>
            item.$vnode.tag &&
            item.$vnode.componentOptions &&
            item.$vnode.componentOptions.Ctor.options.name === "content-item"
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
          this.handleEnterFocus(panes[0]);
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
  },
  render() {
    let { config, chats, panes, handleEvent, handleEnter, loadHistory } = this;

    // 处理空会话问题

    if (chats.length < 1) {
      return (
        <div class="main-box-content">
          <div class="chat-page-tabs">
            <span class="none">暂时没有会话 </span>
          </div>
          <div class="chat-page none"></div>
        </div>
      );
    }

    // 窗口页面
    const el_chat_panes = this._l(chats, (chat) => {
      // 窗口类型判断
      let data_chat;
      data_chat = {
        props: {
          chat,
          config,
        },
        ref: "ContentItem",
        on: {
          bindEvent: function(event, data) {
            handleEvent(event, data);
          },
        },
      };
      return <content-item {...data_chat}></content-item>;
    });

    // 标签页面
    const el_chat_tabs = {
      props: {
        panes,
      },
      ref: "ChatTabs",
      on: {
        bindEvent: function(event, data) {
          handleEvent(event, data);
        },
      },
    };
    return (
      <div class="main-box-content">
        <chat-tabs {...el_chat_tabs}></chat-tabs>
        {el_chat_panes}
      </div>
    );
  },
  created() {},
  mounted() {
    this.calcPaneInstances();
  },
  updated() {
    this.calcPaneInstances();
  },
};
</script>

<style scoped></style>
