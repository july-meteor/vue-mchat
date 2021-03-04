<script>
import { layerPosition, layerDrag } from "../../util/layer";
import { default_avatar } from "../../util/constant";

import ChatPage from "./page/chatPage";
import ManagePage from "./page/manage";

export default {
  name: "ChatMain",
  components: {
    ManagePage,
    ChatPage,
  },
  provide() {
    return {
      IChat: this,
    };
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    mine: {
      type: Object,
      default: () => ({}),
    },
    chats: {
      type: Array,
      default: () => [],
    },
    friends: {
      type: Array,
      default: () => [],
    },
    groups: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeName: "chat",
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 初始化窗口的位置
    initChatPosition() {
        if (this.config.fixed) return ;
        let el = this.$refs.chat;
      if (el) {
          this.$nextTick(()=>{
              layerPosition(el, "center");
          });
      }
    },
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    // 事件处理器
    handleEvent(event, data) {
      switch (event) {
        case "buildChat":
          this.handleBuildChat(data);
          break;
        default:
          this.bindEvent(event, data);
          break;
      }
    },
    // 处理建立对话
    handleBuildChat(data) {
      let callback = () => {
        this.activeName = "chat";
        this.$refs.chatPage.selectedPane(data);
      };
      this.bindEvent("buildChat", { model: data, callback });
    },

    pageTurn(name) {
      this.activeName = name;
      if (name === "chat") {
        this.$refs.chatPage.handleEnterFocus();
      }
    },
    // 处理消息
    handleMessage(data) {
      this.$nextTick(() => {
        this.$refs.chatPage.getMessage(data);
      });
    },
    handleChatSet(event) {
      const { name, type, id } = this.getCurrent().chat;
      this.bindChatEvent(event, { id, name, type });
    },
    getCurrent() {
      return this.$refs.chatPage.getCurrent();
    },
    handPanesDrag(e) {

        if (this.config.fixed) return ;
        let el = this.$refs.chat;
      layerDrag(e, el, true);
    },
  },
  render() {
    let {
      handPanesDrag,
      config,
      chats,
      mine,
      friends,
      groups,
      activeName,
      handleChatSet,
      handleEvent,
      pageTurn,
    } = this;

    // 判断当前是哪个页面
    let data_manage_page = {
      props: {
        config,
        mine,
        friends,
        groups,
      },
      ref: "managePage",
      on: {
        bindEvent: function(event, data) {
          handleEvent(event, data);
        },
      },
    };
    const el_manage_page = (
      <manage-page
        style={{ display: activeName === "manage" ? "inline" : "none" }}
        {...data_manage_page}
      ></manage-page>
    );
    // 聊天页面 chat page
    let data_chat_page = {
      props: {
        config,
        chats,
        mine,
      },
      ref: "chatPage",
      on: {
        bindEvent: function(event, data) {
          handleEvent(event, data);
        },
      },
    };

    const el_chat_page = (
      <chat-page
        style={{ display: activeName === "chat" ? "inline" : "none" }}
        {...data_chat_page}
      ></chat-page>
    );

    // 设置项 - 左
    const el_chat_setwin_left_template = (
      <span class="main-box-set-win setting">
        <div class="set-btn-group">
          <div class="btn btn-close">
            <i
              class="m-icon-close"
              title="关闭"
              on-click={(ev) => handleChatSet("chatClose")}
            ></i>
          </div>
          <div class="btn btn-min">
            <i
              class="m-icon-minus"
              title="最小化"
              on-click={(ev) => handleChatSet("chatMin")}
            ></i>
          </div>
          <div class="btn btn-max">
            <i
              class="m-icon-maxus"
              title="最大化"
              on-click={(ev) => handleChatSet("chatMax")}
            ></i>
          </div>
        </div>
      </span>
    );

    let el_chat_page_btn, el_manage_page_btn, el_setting_page_btn;

    if (activeName === "chat") {
      el_chat_page_btn = (
        <i class="m-icon-duihua1 this" on-click={(ev) => pageTurn("chat")}></i>
      );
    } else {
      el_chat_page_btn = (
        <i class="m-icon-duihua" on-click={(ev) => pageTurn("chat")}></i>
      );
    }

    el_manage_page_btn = (
      <i
        class={{ "m-icon-yonghu": true, this: activeName === "manage" }}
        on-click={(ev) => pageTurn("manage")}
      ></i>
    );
    el_setting_page_btn = <i class="m-icon-menu"></i>;
    // 设置项 -中
    const el_chat_setwin_center_template = (
      <span class="main-box-set-win main-pane">
        <div class="pane-group">
          {el_chat_page_btn}
          {el_manage_page_btn}
          {el_setting_page_btn}
        </div>
      </span>
    );

    // 设置项 -右
    const el_chat_setwin_right_template = (
      <span class="main-box-set-win mine-info">
        <span class="info-img-wrapper">
          <img src={default_avatar} />
        </span>
        <i class="m-icon-shrink"></i>
      </span>
    );
    // main
    const el_chat_main = (
      <div
        class={{
         "main-layer layer-anim main-box":true,
          "fixed":config.fixed
      }}
        ref="chat"
        style={{ "z-index": 1002, display: "inline" }}
      >
        <div
          class="main-box-head"
          style="cursor: move;"
          on-mousedown={(ev) => {
            handPanesDrag(ev);
          }}
        ></div>
        {el_manage_page}
        {el_chat_page}
        {el_chat_setwin_left_template}
        {el_chat_setwin_center_template}
        {el_chat_setwin_right_template}
        <span class="im-icon-resize"></span>
      </div>
    );

    return el_chat_main;
  },
  created() {
    this.$nextTick(() => {
      // 设定一些监听的事件
      this.$im.on("getMessage", (msg) => {
        this.handleMessage(msg);
      });
    });
  },
  mounted() {},
  updated() {},
};
</script>

<style scoped>
.chat-show {
  -webkit-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  min-width: 500px;
  width: 800px;
}

.chat-show.alone {
  width: 620px;
}
</style>
