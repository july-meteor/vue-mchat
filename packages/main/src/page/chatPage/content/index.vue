<script>
import ChatItem from "./chat";
import MessageItem from "./message";

export default {
  name: "content-item",
  componentName: "ContentItem",
  components: {
    MessageItem,
    ChatItem,
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
    height: {
      default: "500px",
    },
    width: {
      default: "550px",
    },
  },
  data() {
    return {
      // pane index
      index: "0",
      // 未读
      unread: 0,
    };
  },
  computed: {
    // 是否被激活
    active() {
      const flag = this.ChatPage.selected === this.index;

      return flag;
    },
  },

  methods: {
    handleEvent(event, data) {
      switch (event) {
        case "unread":
          this.handleUnread(data);
          break;
        case "enter":
          this.bindEvent("enter", { chat: this.chat, content: data });
          break;
        default:
          this.bindEvent(event, data);
          break;
      }
    },
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    getMessage(message) {
      let el = this.$refs.chatItem;
      if (el) {
        el.getMessage(message);
      }
    },
    handleUnread(count) {
      if (this.active) {
        this.unread = 0;
      } else {
        this.unread = count;
      }
    },
  },
  render(h) {
    let { chat, config, active, handleEvent } = this;
    let { name } = chat;
    // 该成作为 中间层使用 保证tabs不与 item内容发生直接联系

    let el_content;
    if (chat.type === "sys_msg") {
      const data_item = {
        props: {
          chat,
          config,
          active,
        },
        ref: "MessageItem",
        on: {
          bindEvent: function(event, data) {
            handleEvent(event, data);
          },
        },
      };
      el_content = <message-item {...data_item}></message-item>;
    } else {
      const data_item = {
        props: {
          chat,
          config,
          active,
        },
        ref: "chatItem",
        on: {
          bindEvent: function(event, data) {
            handleEvent(event, data);
          },
        },
      };
      el_content = <chat-item {...data_item}></chat-item>;
    }

    const el_chat = (
      <div
        id={`chat-page-${name}`}
        key={`chat-page-${name}`}
        class={{
          "chat-page": true,
          display: active,
        }}
      >
        {el_content}
      </div>
    );
    return el_chat;
  },
};
</script>
