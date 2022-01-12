<script>
    import MChatTabs from "./chatTabs";
    import MChatIndex from "../chat";
    import { playTipSound } from "../util/play";
    import {layerPosition,layerDrag} from '../util/layer'

    export default {
        name: "mchat",
        components: {
            MChatTabs,
            MChatIndex,
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
                    fixed:true,
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
            panes(nv, ov) {
                // 如果 窗口是从0变多
                let o_len = ov.length;
                if (0 === o_len) {
                    this.$nextTick(() => {
                        this.initChatPosition();
                    });
                }
            },
        },
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
            handleTabClick({ pane }) {
                this.selected = pane.index;
                this.handleEnterFocus(pane)
            },
            handleTabRemove({ pane,ev }) {
                const { name, type, id } = pane.chat;
                this.$emit("removeChat", { id, name, type });
            },
            // enterBox 关闭事件
            handleChatRemove(){
                const { name, type, id } =  this.getCurrent();
                this.$emit("removeChat", { id, name, type });
            },
            handleRightBoxShow(){
                this.chatDisplay = !this.chatDisplay;
            },
            // 对话内容点击
            handleTalkClick(item){
                this.$emit("talkClick", item);
            },
            // 讲话用户头像点击
            handleTalkUserClick(item){
                this.$emit("talkUserClick", item);
            },
            handleChatHeaderClick(pane){
                this.$emit("chatInfo", pane);
            },
            handleLoadHistory(data){
                this.$emit("loadHistory", data);
            },
            //  获得当前对话框
            getCurrent() {
                let  { chat, taleList } = this.getCurrentPane();
                return  {chat, taleList}
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
            // 收到消息
            getMessage(message) {
                this.$nextTick(()=>{
                let voice = this.config.voice;
                // 提示音
                if (voice) {
                    if (!message.mine) {
                        playTipSound();
                    }
                }
                this.panes.forEach((item) => {
                    let { chat } = item;
                    if (chat.id !== message.id || chat.type !== message.type) return;

                    item.getMessage(message);
                });
                })
            },

            handleMsgRead({id,type}){
                this.panes.forEach((item) => {
                    let { chat } = item;
                    if (chat.id !== id || chat.type !== type) return;
                    // 对应的消息已读
                    item.handleScrollRead();
                });
            },
            handleEvent(event, data) {
                switch (event) {

                    default:
                        this.bindChatEvent(event, data);
                        break;
                }
            },
            handleUploadEvent(data,fn){
                this.$emit("uploadEvent",data,fn);
            },
            // 处理对话框Setting
            handleChatSet(event) {
                const { name, type, id } = this.getCurrent().chat;
                this.$emit(event, { id, name, type });
            },
            handleEnter(content) {
                let chat = this.getCurrent().chat;
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
                if (this.config.fixed) return ;
                let el = this.$refs.chat;
                layerDrag(e,el);
            },
            // 输入框对焦
            handleEnterFocus(pane){
                if (!pane  ){
                    pane = this.getCurrentPane();
                }
                setTimeout( ()=>{
                    if (!pane || pane.$children.length<1) {
                        return
                    }
                    const childrenEl = pane.$children.filter(
                        (item) =>
                            item.$vnode.tag &&
                            item.$vnode.componentOptions &&
                            item.$vnode.componentOptions.Ctor.options.name === "enter-box"
                    );
                    if (childrenEl.length >0){
                        childrenEl[0].handleInputFocus();
                    }
                },200)
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
                        this.handleEnterFocus(panes[0]);
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
                handleTabClick,
                handleTabRemove,
                handleRightBoxShow,
                handleChatRemove,
                handleTalkClick,
                handleTalkUserClick,
                handleChatHeaderClick,
                handleLoadHistory,
                handleUploadEvent,
                handleEnter,
                handleChatSet,
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
                        callLoadHistory:handleLoadHistory,
                        emitMessage: handleEnter,
                        callChatClose: handleChatRemove,
                        callTalkClick: handleTalkClick,
                        callTalkUserClick:handleTalkUserClick ,
                        callHeaderClick: handleChatHeaderClick,
                    },
                    ref: "MChatIndex",
                    on: {
                        uploadEvent:function (data,fn) {
                            handleUploadEvent(data,fn)
                        }
                    },
                };
                return <m-chat-index {...data_chat}></m-chat-index>;
            });

            // 标签页面
            const el_chat_tabs = {
                props: {
                    panes,
                    callTabRemove:handleTabRemove,
                    callTabClick:handleTabClick,
                    callRightBoxShow: handleRightBoxShow,
                },
                ref: "MChatTabs",
            };
            return (
                <div>
                <div
                class={{
                        "fixed":config.fixed,
                        "im-layer layer-anim im-box im-chat": true,
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
                <i
        class="m-icon-top"
            title="置顶"
            on-click={(ev) => handleChatSet("chatTop")}
        ></i>
            <i
        class="m-icon-minus"
            title="最小化"
            on-click={(ev) => handleChatSet("chatMin")}
        ></i>
            <i
        class="m-icon-maxus"
            title="最大化"
            on-click={(ev) => handleChatSet("chatMax")}
        ></i>
            <i
        class="m-icon-close"
            title="关闭"
            on-click={(ev) => handleChatSet("chatClose")}
        ></i>
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
