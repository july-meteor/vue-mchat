<script>
import { ConvertContext, dateFormat } from "./convertContext";
import Scroll from "../../../../../../util/scroll";

export default {
  name: "chat-list",
  componentName: "ChatList",
  props: {
    //是否是当前对话框
    current: {
      type: Boolean,
      default: false,
    },
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
      // 锁
      lock: false,
      scroll: null,
      scrollTimer: null,
      // 标题前消息
      beforeTitle: "",
      // 标题时间
      titleTimer: "",
      //下载历史
      loadHistory: false,
      // 历史是否下载了
      historyBtnShow: false,
    };
  },
  watch: {
    // 当前窗口切换
    current(newVal, oldVal) {
        this.scrollRefresh()
      if (newVal) {
        let reset = this.isBottom;
        this.scrollRefresh();
        if (reset) {
          this.scrollBottom();
        }
      }
      if (!newVal && oldVal) {
        this.scroll.read();
      }
    },
      // 锁
     lock(newVal) {
          if (newVal) {
              setTimeout(() => {
                  if (this.lock){
                      this.lock = false;
                  }
              }, 1000);
          }
      },
    list(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          // 更新节点
          this.updateNode();
          // 下载记录历史
          /**
           *    这里的延时的原因
           *    是因为发送图片，render的时间太长
           *    导致scrollrefresh的  长度不对。
           *    加锁避免，其他人的竞争
           */
          setTimeout(() => {
            if (this.loadHistory) {
              this.closeTopTip();
              this.scrollRefresh();
              this.scroll.toBeforePosition();
            }
            if (this.current && this.isBottom) {
              this.scrollBottom();
            }
            //还有一种情况是自己发送的。。
          }, 100);
        });
      }
    },
    //
    "config.scrollToButton"(newVal) {
      if (newVal) {
        this.scrollBottom();
      }
    },
    // 未读
    unread(newVal) {
      // if (newVal) {
      //   this.beforeTitle && this.resetTitle(this.beforeTitle);
      //   this.saveTitle();
      //   this.changeTitle();
      //   if (this.config.notice) {
      //     this.showBrowser();
      //   }
      // } else {
      //   this.resetTitle(this.beforeTitle);
      // }
    },
  },
  computed: {
    //是否在最下面
    isBottom() {
      return this.scroll && this.scroll.isBottom;
    },
    //未读
    unread() {
      const { unread = 0 } = this.scroll || {};
      this.bindEvent("unread", unread);
      return unread;
    },
  },
  methods: {
      // 计算是否已经加载
      calcLoaded(){
          let el =  this.$el
          if(!el)  return
          let width =  el.clientWidth
          //有宽度表示页面被显示了,并且只会触发一次。
          if (width >0 ){
              if (!this.loaded) {
                  this.loaded = true;
                  this.scrollRefresh()
              }
          } else {
              this.loaded = false;
          }
      },
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    bindTalkEvent(data) {
      this.bindEvent("talkEvent", data);
    },
    bindClickUser(data) {
      let userInfo = {
        id: data.id,
        username: data.username,
        mine: data.mine,
      };
      this.bindEvent("clickUser", userInfo);
    },

    // 拉取历史记录
    handleHistory() {
      //锁住拉取
      this.loadHistory = true;
        this.loadHistory = true;
        let last = {};
        if (this.list != null && this.list.length>0){
            last = this.list[ this.list.length-1];
        }
      this.bindEvent("loadHistory",last);
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
        function(e) {
          //阻止冒泡事件
          e.stopPropagation();
        }
      );

      // 停止滚动时触发。
      this.scroll.on("scrollEnd", function() {
        that.scrollTop();
        that.scroll.savePosition();
      });
    },

    // 读取 历史记录强行拉动滚动条
    scrollTop() {
      //是否触顶
      const { isTop } = this.scroll;
      if (isTop) {
        // 后期自动拉取历史再改进
        this.historyBtnShow = true;
        return;
      }
      this.closeTopTip();
    },
    scrollUp() {
      if (this.scroll) {
        this.scrollRefresh();
        this.scroll.scrollTo(0, 0, 200);
      }
    },
    scrollBottom() {
      if (this.scroll) {
        this.scrollRefresh();
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 200);
      }
    },
    closeTopTip() {
      this.loadHistory = false;
      this.historyBtnShow = false;
    },
    // 节点加载
    updateNode() {
      const parent = this.$refs.main;
      if (!parent) return;
      const childs = parent.children;
      for (let el of childs) {
        const top = el.offsetTop;
        this.scroll.addNode(top, el);
      }
    },
    // 刷新滚动条长度
    scrollRefresh() {
        this.scroll.refresh();
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
        Notification.requestPermission(function(status) {
          if (status === "granted")
            new Notification("新消息", {
              body: `您总共有${unread}条消息未读。`,
            });
        });
      }
    },
    /****标签标题 结束 ***/
  },
  render(h) {
    let {
      list,
      historyBtnShow,
      scrollUp,
      scrollBottom,
      bindTalkEvent,
      bindClickUser,
      handleHistory,
    } = this;

    /**
     *  渲染 如果要提供更好的 如 图片显示效果，需要更改 vnode的构建
     *  图片方面可以参考 element-ui image的处理
     */
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
            <img src={item.avatar} on-click={() => bindClickUser(item)} />
            <cite>
              {leftName}
              <i>{tiem}</i> {rightName}
            </cite>
          </div>
          <div class="content-text" on-click={() => bindTalkEvent(item)}>
            {" "}
            {contentHtml}
          </div>
        </li>
      );
    });

    let el_history_log;
    if (historyBtnShow) {
      el_history_log = (
        <div class="history_label" on-click={() => handleHistory()}>
          查看更多消息
        </div>
      );
    }

    /**
     *  滚动条快捷按钮
     * @type {boolean}
     */

    // const el_scroll_up =(
    //     <div class="scrollButton" on-click={() => scrollUp()}>
    //               <i class="up  m-icon-arrow-up"></i>
    //       </div>
    //          )
    //
    //   const el_scroll_down =(
    //       <div class="scrollButton" on-click={() => scrollBottom()}>
    //           <i class="down m-icon-arrow-down"></i>
    //       </div>
    //          )

    const el_chat_list = (
      <div
        class={{
          "chat-content": true,
          listActive: false,
        }}
        ref="scroller"
      >
        {el_history_log}
        <ul ref="main" class="talk-list">
          {el_record_list}
        </ul>
      </div>
    );

    return el_chat_list;
  },
    updated(){
        // 解决聊天窗口发生变化，滚动条不会自动计算问题。
        this.calcLoaded()
    },
    mounted() {
        this.createScroll();
    },
};
</script>

<style>
.iScrollVerticalScrollbar.iScrollLoneScrollbar {
  z-index: 1 !important;
  right: 13px !important;
  margin-top: 11px;
  margin-bottom: 11px;
}
</style>
