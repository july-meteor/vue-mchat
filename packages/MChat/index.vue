<script>
import MChatTabs from "./chatTabs";
import MChatIndex from '../chat'
import { playTipSound } from "../util/play";

export default {
  name: "mchat",
  components: {
    MChatTabs,MChatIndex,
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
      //chats是否隐藏
      chatDisplay: true,
      width: "800",
    };
  },
  computed: {
    alone() {
      let flag = true;
      if (this.chats.length > 1) {
        flag = false;
      }
      return flag;
    },
  },
  watch: {
    alone(nv, ov) {
      if (nv) {
        this.chatDisplay = true;
      }
    },
    "config.brief"(nv, ov) {
      if (!nv) {
        this.chatDisplay = true;
      }
    },
      // 观察窗口变化
     panes(nv,ov){
        // 如果 窗口是从0变多
         let o_len =  ov.length
         if(0 == o_len){
             this.$nextTick(()=>{
                 this.initChatPosition();
             })
         }
     }

  },
  methods: {
      // 初始化窗口的位置
    initChatPosition(){
          let el = this.$refs.chat;
        if (el){
            el.style.left =( document.body.clientWidth -10 - el.clientWidth )/2+ "px";
            el.style.top = (document.body.clientHeight -70 - el.clientHeight)/2+ "px";
        }

    },
    loadHistory(callBack) {
      this.$emit("loadHistory", callBack);
    },
    //  获得当前对话框
    getCurrent(){
        for( let pane of this.panes){
            // 激活的就是当前的
            if (pane.active){
              let { chat, taleList }= pane
                return {chat ,taleList} ;
            }
        }
    },
    // 收到消息
    getMessage(message) {
        let voice = this.config.voice;
      // 提示音
      if (voice) {
        playTipSound();
      }
      this.panes.forEach((item) => {
        let { chat } = item;
        if (chat.id != message.id || chat.type != message.type) return;
        item.getMessage(message);
      });
    },
    handleEvent(event, data) {
      switch (event) {
        case "minRight":
           this.chatDisplay = !this.chatDisplay;
          break;
        case "tabClick":
           this.handleTabClick(data);
          break;
        case "tabRemove":
           this.handleRemoveChat(data);
          break;
        case "chatClose":
           this.handleRemoveChat({pane :this.getCurrent()});
          break;
        case "talkEvent":
           this.bindTalkEvent(event, data)
          break
       default:
           this.bindChatEvent(event, data);
          break;

      }
    },
    // 会话内容的事件
    bindTalkEvent(event, data) {
      this.$emit("talkEvent", event, data);
    },
    // 会话框的事件
    bindChatEvent(event, data) {
      this.$emit("chatEvent", event, data);
    },
    handleTabClick({ pane }) {
      this.selected = pane.index;
    },
     // 处理对话框Setting
    handleChatSet(event){
        const { name, type, id } = this.getCurrent().chat;
        this.bindChatEvent(event, { id, name, type });
    },
    handleRemoveChat({ pane }) {
      const { name, type, id } = pane.chat;
      this.bindChatEvent("removeChat", { id, name, type });
    },
    handleEnter(chat, content) {
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

      this.$emit("sendMessage", message);
    },
    handPanesDrag(e) {
      let el = this.$refs.chat;
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      document.onmousemove = function(e) {
        e.preventDefault();
          let left = e.clientX - X;
          let top = e.clientY - Y;
          el.style.left = left + "px";
          el.style.top = top + "px";
      };
      document.onmouseup = function() {
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
            item.$vnode.componentOptions.Ctor.options.name === "mchat-index"
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
      chats,
      panes,
      handleEvent,
      handleEnter,
      handleChatSet,
      loadHistory,
      chatDisplay,
      alone,
    } = this;
    if (chats.length < 1) return;
    // 窗口页面
    const el_chat_panes = this._l(chats, (chat) => {
      let data_chat = {
        props: {
          chat,
          config,
        },
        ref: "MChatIndex",
        on: {
          enter: function(content) {
            handleEnter(chat, content);
          },
          loadHistory: function(callBack) {
            loadHistory(callBack);
          },
          chatEvent: function (event, data) {
              handleEvent(event, data)

          }
        },
      };
      return <m-chat-index {...data_chat}></m-chat-index>;
    });

    // 标签页面
    const el_chat_tabs = {
      props: {
        panes,
      },
      ref: "MChatTabs",
      on: {
         chatEvent: function(event, data) {
          handleEvent(event, data);
        },
      },
    };
    return (
      <div>
        <div
          class={{
            "im-layer  layer-anim im-box im-chat": true,
            "chat-show": chatDisplay,
            alone: alone,
          }}
          ref="chat"
          style={{
            "z-index": 1002,
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
          <i class="m-icon-top" title="置顶"  on-click={(ev)=>handleChatSet("chatTop")}></i>
          <i class="m-icon-minus" title="最小化" on-click={(ev)=>handleChatSet("chatMin")} ></i>
          <i class="m-icon-maxus" title="最大化" on-click={(ev)=>handleChatSet("chatMax")} ></i>
          <i class="m-icon-close" title="关闭" on-click={(ev)=>handleChatSet("chatClose")} ></i>
          </span>
          <span class="im-icon-resize"></span>
        </div>
      </div>
    );
  },
  created() {
    // 设定一些监听的事件
    this.$im.on("getMessage", (msg) => {
      this.getMessage(msg);
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
  -webkit-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  min-width: 500px;
  width: 800px;
}

.chat-show.alone {
  width: 620px;
}
</style>
