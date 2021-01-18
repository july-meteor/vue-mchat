<script>
import { default_avatar } from "../../../../../util/constant";

export default {
  name: "chat-tabs",
  //注入父级属性
  inject: ["IChat"],
  props: {
    panes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      stickyTop: 0,
      zIndex: 1,
    };
  },
  computed: {
    stickyActive() {
      return this.stickyTop > 0;
    },
  },
  methods: {
    handleScroll(event) {
      this.stickyTop = event.target.scrollTop;
    },
    handleEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    // 处理未读信息
    handleUnread() {},
  },
  render() {
    let { IChat, panes, handleScroll, handleEvent } = this;

    const el_chat_tabs = this._l(panes, (pane, index) => {
      const { active, chat, unread } = pane;
      let { name, id, avatar, online } = chat;
      let tabName = name + id + index;
      pane.index = `${index}`;
      // 是否有头像
      avatar = avatar || default_avatar;
      //对话是否激活
      let label = name;
      const el_tab_label = <span class="tab-label"> {label}</span>;
      const el_unread_badge =
        unread > 0 ? <span class="badge">{unread}</span> : "";
      let offline = false;

      if (chat.type === "friend") {
        offline = !online;
      }

      let el_item_avatar;
      if (chat.type === "sys_msg") {
        el_item_avatar = (
          <div class="tab-system">
            <i class="m-icon-sys_msg"></i>
          </div>
        );
      } else {
        el_item_avatar = (
          <img
            src={avatar}
            on-click={(ev) => {
              handleEvent("tabClick", { pane, ev });
            }}
          />
        );
      }
      const el_tab_item = (
        <li
          class={{
            "chat-tab-item": true,
            offline: offline,
            "tab-this": active,
          }}
          id={`tab-${tabName}`}
          key={`tab-${tabName}`}
          on-click={(ev) => {
            handleEvent("tabClick", { pane, ev });
          }}
        >
          {el_unread_badge}
          {el_item_avatar}
          {el_tab_label}
          <i
            class="tab-icon m-icon-error"
            on-click={(ev) => {
              ev.stopPropagation();
              handleEvent("tabRemove", { pane, ev });
            }}
          ></i>
        </li>
      );

      return el_tab_item;
    });
    return (
      <ul
        class="chat-page-tabs"
        on-mousedown={(ev) => {
          IChat.handPanesDrag(ev);
        }}
        on-scroll={(ev) => {
          handleScroll(ev);
        }}
      >
        {el_chat_tabs}
      </ul>
    );
  },
};
</script>

<style scoped>
.badge {
  position: absolute;
  top: 12px;
  left: 10px;
  transform: translateY(-50%) translateX(100%);
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}
</style>
