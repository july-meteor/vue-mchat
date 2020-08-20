<script>



export default {
  name: "MChatTabs",
  //注入父级属性
  inject: ["rootChat"],
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
    bindClick(event, data) {
      this.$emit("click", { event, data });
    },
    // 处理未读信息
    handleUnread() {},
  },
  render() {
    let { panes, stickyTop,  handleScroll, bindClick } = this;
    // 标签组件生成
    const el_chat_tabs = this._l(panes, (pane, index) => {
      const { active, chat, unread } = pane;
      const { name, id,  avatar } = chat;

      let tabName = name + id + index;
      pane.index = `${index}`;
      // 未读

      //对话是否激活
      let label = name;
      // let recordImg = pane.recording
      //   ? constant.btnRecording
      //   : constant.btnRecord;

      

      const el_tab_lable = <span class="im-label"> {label}</span>;
      const el_unread_badge = unread > 0? (<span class="badge">{unread}</span>):'';
      // if (unread > 0) {
      //   el_tab_lable = (
      //     <el-badge value={unread}>
      //       <span> {label}</span>
      //     </el-badge>
      //   );
      // } else {
      //   el_tab_lable = <span> {label}</span>;
      // }

      return (
        <li
          class={{ "im-this": active }}
          id={`tab-${tabName}`}
          key={`tab-${tabName}`}
          on-click={(ev) => {
            bindClick("tabClick", { pane, ev });
          }}
        >
          {el_unread_badge}
          <img
            src={avatar}
            on-click={(ev) => {
              bindClick("tabClick", { pane, ev });
            }}
          />
          {el_tab_lable}
          <i
            class="im-icon el-icon-error"
            on-click={(ev) => {
              bindClick("tabRemove", { pane, ev });
            }}
          ></i>
        </li>
      );
    });
    //render对icon css的方式不支持只能
    const el_icon = (
      <i
        class={{
          "im-icon": true,
          "btn-pane-show": true,
          "el-icon-arrow-right": true,
          "el-icon-arrow-down": false,
        }}
        on-click={() => {}}
      ></i>
    );

    return (
      <ul
        class={{
          " im-chat-tabs": true,
          "tabs-shadow": false,
        }}
        on-mousedown={() => {}}
        on-scroll={(ev) => {
          handleScroll(ev);
        }}
      >
        <li
          class={{
            "im-tabs-title": true,
            active: true,
          }}
          style={{
            top: stickyTop + "px",
          }}
        >
          <span class="im-label im-box-setwin " on-click={() => {}}>
            <a class="im-btn-min" href="javascript:;">
              <cite></cite>
            </a>
          </span>
          {el_icon}
        </li>
        {el_chat_tabs}
      </ul>
    );
  },
};
</script>


<style >
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