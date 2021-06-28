<script>
    import {default_avatar } from '../util/constant'

    function  noop() {

    }

    export default {
        name: "MChatTabs",
        //注入父级属性
        inject: ["rootChat"],
        props: {
            panes: {
                type: Array,
                default: () => [],
            },
            callTabRemove:{
                type:Function,
                default:noop
            },
            callTabClick:{
                type:Function,
                default:noop
            },
            callRightBoxShow:{
                type:Function,
                default:noop
            },
        },
        data() {
            return {
                stickyTop: 0,
                zIndex: 1,
                // 缩小模式
                miniMode:false,
                // 用于记录窗口是否被打开，写得有点烂
                tempRecordDisplay:undefined,
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
            // 处理缩小模式
            handleMiniMode(){
                this.miniMode = !this.miniMode;
                if (this.miniMode && this.rootChat.chatDisplay){
                    this.tempRecordDisplay = this.rootChat.chatDisplay;
                    this.callRightBoxShow();
                }else {
                    if (!this.miniMode && this.tempRecordDisplay !== this.rootChat.chatDisplay) {
                        this.callRightBoxShow();
                    }
                }
            },
            // 处理 chat box是否要打开
            handleBoxSwitch(){
                this.callRightBoxShow();
                this.tempRecordDisplay = this.rootChat.chatDisplay;
                this.miniMode = false;
            },
            // 处理未读信息
            handleUnread() {},


        },
        render() {
            let {
                rootChat,
                panes,
                stickyTop,
                miniMode,
                handleScroll,
                handleMiniMode,
                handleBoxSwitch,
                callTabRemove,
                callTabClick,

            } = this;
            // 如果只有一个chat的情况
            if (rootChat.alone) return;
            const { config, chatDisplay } = rootChat;
            const el_chat_tabs = this._l(panes, (pane, index) => {
                const { active, chat, unread } = pane;
                // 判断下是否是缩小模式如果是只放过激活的
                if (miniMode && !active){
                     return
                }
                let { name, id, avatar,online } = chat;
                let tabName = name + id + index;
                pane.index = `${index}`;
                // 是否有头像
                avatar = avatar || default_avatar;

                //对话是否激活
                let label = name;
                const el_tab_lable = <span class="im-label"> {label}</span>;
                const el_unread_badge =
                    unread > 0 ? <span class="badge">{unread}</span> : "";
                let offline = false;
                if (chat.type === "friend"){
                    offline = !online;
                }

                let el_chat_tab_remove = "";
                if (config.tabRemove){
                    el_chat_tab_remove = (
                        <i
                             class="im-icon m-icon-error"
                             on-click={(ev) => {
                             ev.stopPropagation();
                              callTabRemove({ pane, ev });
                             }}
                        ></i>
                    )
                }

                const  el_chat_tab =(
                    <li
                        class={{
                                "im-chat-tab":true,
                                 "offline":offline,
                                 "im-this": active }}
                                 id={`tab-${tabName}`}
                                 key={`tab-${tabName}`}
                                 on-click={(ev) => {
                                    ev.stopPropagation();
                                    callTabClick({ pane, ev });
                                 }}
                    >
                        {el_unread_badge}
                        <img
                            src={avatar}
                            on-click={(ev) => {
                                ev.stopPropagation();
                                callTabClick({ pane, ev });
                            }}
                         />
                         {el_tab_lable}
                         {el_chat_tab_remove}
                    </li>
                         )

                return el_chat_tab;
            });
            //render对icon css的方式不支持只能

            let el_tabs_bar = "";

            if (config.brief) {
                const el_icon = (
                    <i
            class={{
                    "im-icon": true,
                        "btn-pane-show": true,
                        "m-icon-arrow-right": !chatDisplay,
                        "m-icon-arrow-left": chatDisplay,
                }}
                on-click={() => {
                    handleBoxSwitch();
                }}
            ></i>
            );

                el_tabs_bar = (
                    <li
                    class={{
                            "im-chat-tab":true,
                                "im-tabs-title": true,
                                active: true,
                        }}
                    style={{
                        top: stickyTop + "px",
                    }}
            >
            <span class="im-label im-box-setwin " on-click={() => {handleMiniMode()}}>
            <a class="im-btn-min" href="javascript:;">
                    <cite></cite>
                    </a>
                    </span>
                {el_icon}
            </li>
            );
            }

            return (
                <ul
        class={{
                "im-chat-tabs": true,
                "normal": !miniMode,
                "tabs-shadow": !chatDisplay,
            }}
            on-mousedown={(ev) => {
                rootChat.handPanesDrag(ev);
            }}
            on-scroll={(ev) => {
                handleScroll(ev);
            }}
        >
            {el_tabs_bar}
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