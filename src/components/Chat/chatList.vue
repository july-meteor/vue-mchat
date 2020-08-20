<script>
import { ConvertContext, ConvertRecord, dateFormat} from "../util/convertContext";
import Scroll from "../util/scroll";

export default {
  name: "chat-list",
  componentName: "ChatList",
  props: {
    //聊天记录
    list: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({
        notice: false,
        downBtn: false,
      }),
    },
  },
  data() {
    return {
      load: false,
      scroll: null,
      scrollTimer: null,
      // 标题前消息
      beforeTitle: "",
      // 标题时间
      titleTimer: "",
      //下载历史
      loadHistory: false,
      // 历史是否下载了
      historyLoding: false,
    };
  },
  watch: {
    //
    load(newval) {
      if (newval) {
        setTimeout(() => {
          this.scroll && this.scroll.refresh();
          this.load = false;
        }, 1000);
      }
    },
    list(newval) {
      if (newval) {
        this.$nextTick(() => {
          setTimeout(() => {
            let reset = false;
            if (this.historyLoding) {
              reset = true;
              this.closeTopTip();
              this.$nextTick(() => {
                this.scroll.toBeforePosition();
              });
            }
            this.load = true;
            this.childnodeLoad();
            if (reset) {
              this.scroll.resetTop();
            }
            if (this.scrollType === "scroll") {
              this.scrollBottom();
            }
          }, 300);
        });
      }
    },
    //
    "config.scrollToButton"(newval) {
      if (newval) {
        this.scrollBottom();
      }
    },
    // 未读
    unread(newval) {
      if (newval) {
        this.beforeTitle && this.resetTitle(this.beforeTitle);
        this.saveTitle();
        this.changeTitle();
        if (this.config.notice) {
          this.showBrowser();
        }
      } else {
        this.resetTitle(this.beforeTitle);
      }
    },
  },
  computed: {
    //是否在最下面
    isBottom() {
      return this.scroll && this.scroll.isBottom;
    },
    // 滚动条类型
    scrollType() {
      const { scrollType: type = "noroll" } = this.config;
      return type;
    },
    //未读
    unread() {
      const { unread = 0 } = this.scroll || {};
      this.$emit("messageUnread", unread);
      return unread;
    },
  },
  methods: {
    bindTalkEvent(event,data){
      this.$emit("talkEvent",{event,data})

    },
    // 拉取历史记录
    handleHistory() {
      this.$emit("loadHistory");
    },
    /******  滚动条设置 ******/

    createScroll() {
      const that = this;
      const dom = this.$refs.scroller;
      this.scroll = new Scroll(dom, {
        click: true,
        scrollbars: true,
        mouseWheel: true,
        preventDefault: false,
        interactiveScrollbars: true,
        hijackInternalLinks: true,
        // useTransform: false,
      });
      // copy code
      dom.addEventListener(
        "ontouchstart" in window ? "touchstart" : "mousedown",
        function (e) {
          e.stopPropagation();
          // var target = e.target;
          // console.log(e);
        }
      );

      // scroll done callback
      this.scroll.on("scrollEnd", function () {
        that.scrollTop();
        if (that.historyLoding) return;
        that.scroll.savePosition();
        that.scroll.read();
      });
    },

    // 读取 历史记录强行拉动滚动条
    scrollTop() {
      const { isTop } = this.scroll;
      if (isTop) {
        if (this.loadHistory) {
          this.historyLoding = true;
        } else this.loadHistory = true;
        return;
      }
      this.closeTopTip();
    },
    scrollUp() {
      if (this.scroll) {
        this.scroll.refresh();
        setTimeout(() => {
          this.scroll.scrollTo(0, 0, 200);
        }, 500);
      }
    },
    scrollBottom() {
      if (this.scroll) {
        this.scroll.refresh();
        setTimeout(() => {
          this.scroll.scrollTo(0, this.scroll.maxScrollY, 200);
        }, 500);
      }
    },
    closeTopTip() {
      this.loadHistory = false;
      this.historyLoding = false;
    },
    // 看看有几条了
    childnodeLoad() {
      if (this.scrollType === "scroll") return;
      const parent = this.$refs.main;
      if (!parent) return;
      const childs = parent.children;
      for (let el of childs) {
        const top = el.offsetTop;
        this.scroll.setPosition(top, el);
      }
    },
    scrollRefresh() {
      setTimeout(() => {
        this.scroll && this.scroll.refresh();
        this.scrollRefresh();
      }, 1000);
      return;
    },
    /**** 滚动条结束 ********/
    /*** 标签标题  开始***/
    saveTitle() {
      const { title } = document;
      this.beforeTitle = title;
    },
    resetTitle(title) {
      document.title = title;
      clearTimeout(this.titleTimer);
    },
    changeTitle() {
      const that = this;
      let flage = 0;
      change();
      function change() {
        let title = "【未读】";
        if (flage) {
          title = "【" + that.unread + "条】";
        }
        flage = !flage;
        that.titleTimer = setTimeout(() => {
          that.resetTitle(title + that.beforeTitle);
          change();
        }, 1000);
      }
    },
    showBrowser() {
      if (window.Notification && Notification.permission !== "denied") {
        const { unread } = this;
        Notification.requestPermission(function (status) {
          if (status === "granted")
            new Notification("新消息", {
              body: `您总共有${unread}条消息未读。`,
            });
        });
      }
    },
    /****标签标题 结束 ***/
  },
  mounted() {
    this.createScroll();
    this.scrollRefresh();
  },
  render(h) {
    let {
      list,

      historyLoding,
      scrollUp,
      scrollBottom,
      bindTalkEvent,
      handleHistory,
    } = this;

    const el_record_list = this._l(list, (item) => {
      let contentHtml = h("div", {
        domProps: {
          innerHTML: ConvertContext(item.content),
        },
      });
      let leftName = item.mine ? "" : item.username;
      let rightName = item.mine ? item.username : "";
      let tiem = dateFormat(item.timestamp);
      return (
        <li class={{ "content-mine": item.mine }}>
          <div class="content-user">
            <img src={item.avatar} />
            <cite>
              {leftName}
              <i>{tiem}</i> {rightName}
            </cite>
          </div>
          <div class="content-text" on-click={()=>bindTalkEvent('talkContent')}> {contentHtml}</div>
        </li>
      );
    });

    let el_history_log;
    if (historyLoding) {
      el_history_log = (
        <div class="history_lable" on-click={() => handleHistory()}>
          查看更多消息
        </div>
      );
    }

    // const el_down_button = (
    //   <div class="downBtn">
    //     <span>{{ unread }}</span>
    //   </div>
    // );

    const el_chat_list = (
      <div
        class={{
          "im-chat-content": true,
          listActive: false,
        }}
        ref="scroller"
      >
        {el_history_log}
        <ul ref="main">{el_record_list}</ul>

        <div class="scrollButton" on-click={() => scrollUp()}>
          <i class="up  el-icon-arrow-up"></i>
        </div>
        <div class="scrollButton" on-click={() => scrollBottom()}>
          <i class="down el-icon-arrow-down"></i>
        </div>
      </div>
    );

    return el_chat_list;
  },
};
</script>


<style >
.iScrollVerticalScrollbar.iScrollLoneScrollbar {
  z-index: 1 !important;
  right: 13px !important;
  margin-top: 11px;
  margin-bottom: 11px;
}
</style>
