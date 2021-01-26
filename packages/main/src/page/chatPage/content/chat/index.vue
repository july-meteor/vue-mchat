<script>
import chatList from "./chatList";
import enterBox from "./enterBox";
import DrawerBox from "./drawer";
import tools from "./tools";
import { default_avatar } from "../../../../../../util/constant";

export default {
  name: "chat-item",
  componentName: "ChatItem",
  components: {
    chatList,
    enterBox,
    tools,
    DrawerBox,
  },
  inject: ["ChatPage"],
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    chat: {
      type: Object,
      default: () => {},
    },
    // 工具栏配置
    toolConfig: {
      type: Object,
      default: () => ({
        show: ["file", "video", "img"],
        callback: Function,
      }),
    },
    height: {
      default: "500px",
    },
    width: {
      default: "550px",
    },
    //  输入属性 预留给上层模块
    value: {
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // pane index
      index: "0",
      // 聊天记录
      taleList: [],
      //已加载
      loaded: true,
      // 滚动按钮
      scrollToButton: false,
      // 未读
      unread: 0,
      content: "",
      // 有边框控制器
      drawerActive: false,
    };
  },

  watch: {
    value: {
      handler() {
        this.content = this.value;
      },
      immediate: true,
    },
    content: {
      handler() {
        this.$emit("input", this.content);
      },
      immediate: true,
    },
    //
    scrollToButton(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.scrollToButton = false;
        }, 0);
      }
    },
  },
  methods: {
    handleDrawerActive() {
      this.drawerActive = !this.drawerActive;
    },
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    handleEvent(event, data) {
      switch (event) {
        case "loadHistory":
          this.loadHistory(data);
          break;
        default:
          this.bindEvent(event, data);
          break;
      }
    },
    // 拉取历史记录
    loadHistory(last) {
      let that = this;
        let data = {
            chat:this.chat,
            last,
            callback:function (list) {
                list.forEach((item) => {
                    that.taleList.unshift(item);
                });
            },
        };
      this.bindEvent("loadHistory", data);
    },
    // 发送消息
    bindEnter(message) {
      this.bindEvent("enter", message);
      this.$refs.chatList.scrollBottom();
    },
    // 处理收到的消息
    getMessage(message) {
      this.taleList.push(message);
    },
    bindContent(content) {
      this.content += content;
      //触发一次输入框获取焦点
      this.$nextTick(() => {
        this.$refs.enterBox.handleInputFocus();
      });
    },
    bindUpload(data) {
      const { type, file } = data;
      const callback = (url) => {
        if (type === "img") {
          this.bindContent(`img[${url}]`);
        }
      };
      this.bindEvent("uploadEvent", { data, callback });
    },
  },
  render(h) {
    let {
      chat,
      config,
      active,
      taleList,
      drawerActive,
      bindContent,
      handleEvent,
      bindUpload,
      bindEnter,

      handleDrawerActive,
    } = this;
    let { name, avatar } = chat;
    avatar = avatar || default_avatar;
    let el_chat, el_chat_titel, data_chat_list, el_chat_footer;

    let el_chat_title_status,
      offline = false;

    // 标题栏
    el_chat_titel = (
      <div class="chat-title">
        <div class="chat-info" title="群组信息">
          <span class="chat-name">{name}</span>
        </div>
      </div>
    );
    // chat list  的数据
    data_chat_list = {
      props: {
        current: active,
        list: taleList,
        config,
      },
      ref: "chatList",
      on: {
        bindEvent: function(event, data) {
          handleEvent(event, data);
        },
      },
    };
    var self = this;
    let data_tools_bar = {
      props: {
        config,
      },
      on: {
        emoji: function(emoji) {
          bindContent(emoji);
        },
        upload: function(data) {
          bindUpload(data);
        },
      },
    };

    let data_enter_box = {
      props: {
        value: self.content,
      },
      ref: "enterBox",
      on: {
        input: function(value) {
          self.content = value;
        },
        submit: function(data) {
          bindEnter(data);
        },
        bindEvent: function(event, data) {
          handleEvent(event, data);
        },
      },
    };

    el_chat_footer = (
      <div
        class={{
          "chat-footer": true,
          listActive: drawerActive,
        }}
      >
        <tools {...data_tools_bar}></tools>
        <enter-box {...data_enter_box}></enter-box>
      </div>
    );

    let el_drawer_content;
    if (chat.type === "group") {
      let data_drawer_group = {
        props: {
          notices: chat.notices,
          userList: chat.userList,
        },
        ref: "drawerBox",
        on: {
          bindEvent: function(event, data) {
            handleEvent(event, data);
          },
        },
      };
      el_drawer_content = <drawer-box {...data_drawer_group}> </drawer-box>;
    }
    const el_chat_drawer_box = (
      <div
        class={{
          "chat-drawer-box": true,
          display: drawerActive,
        }}
      >
        {el_drawer_content}
      </div>
    );

    //  可能需要改进
    let el_drawer_box_active = (
      <span
        class={{
          "drawer-btn-expand": true,
          close: drawerActive,
        }}
        on-click={() => handleDrawerActive()}
      >
        <i
          class={{
            "im-icon": true,
            "m-icon-arrow-left": !drawerActive,
            "m-icon-arrow-right": drawerActive,
          }}
        ></i>
      </span>
    );

    el_chat = (
      <div class="chat-item">
        {el_chat_drawer_box}
        {el_chat_titel}
        <chat-list {...data_chat_list}> </chat-list>
        {el_chat_footer}
        {el_drawer_box_active}
      </div>
    );
    return el_chat;
  },
};
</script>
