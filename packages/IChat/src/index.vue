<template>
    <ChatMain
            ref="chat"
            :mine="mine"
            :friends="friends"
            :groups="groups"
            :chats="channel"
            :config="config"
            @bindEvent="handleEvent"
    >
    </ChatMain>
</template>

<script>
    import ChatMain from "../../main/index";
    import {createStore, mapStates} from "./store/helper";

    export default {
        name: "IChat",
        components: {
            ChatMain,
        },
        props: {
            config: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            mine: {
                type: Object,
                default: function () {
                    return {};
                },
            },
        },
        computed: {
            ...mapStates({channel: "channel", groups: "groups", friends: "friends"}),
        },
        watch: {},
        data() {
            // 注册 store
            this.store = createStore();
            return {};
        },
        methods: {
            // 初始化
            setData({friends = [], groups = [], messages = []}) {
                this.setFriends(friends);
                this.setGroups(groups);
                this.setSystemMessage(messages);
            },
            setFriends(friends = []) {
                this.store.commit("setFriends", friends);
                for (const item of friends) {
                    if (!item.userList || item.userList.length < 0) {
                        continue;
                    }
                    for (let user of item.userList) {
                        user.type = "friend";
                        this.store.commit("replaceChannel", user);
                    }
                }
            },
            setGroups(groups = []) {
                this.store.commit("setGroups", groups);
                for (let item of groups) {
                    item.type = "group";
                    this.store.commit("replaceChannel", item);
                }
            },
            //设置系统消息
            setSystemMessage(messages = []) {
                this.store.commit("setSystemMessage", messages);
                this.store.replaceSystemMessage();
            },
            bindEvent(event, data) {
                this.$emit("bindEvent", event, data);
            },
            handleEvent(event, data) {
                switch (event) {
                    case "addGroup":
                        this.handleAddGroup(data);
                        break;
                    case "renameGroup":
                        this.handleRenameGroup(data);
                        break;
                    // 创建聊天对话
                    case "buildChat":
                        this.handleBuildChat(data);
                        break;
                    case "removeChat":
                        this.handleDelChat(data);
                        break;
                    case "acceptFriend":
                        this.handleAcceptFriend(data);
                        break;
                    case "rejectFriend": // 拒接好友申请
                        this.handleRejectFriend(data);
                        break;
                    case "clickGroupUser":
                        this.handleApplyForFriend(data);
                        break;
                    default:
                        this.bindEvent(event, data);
                        break;
                }
            },
            // 系统消息 如果是空的则为 创建系统消息频道
            newSystemMessage(message) {
                if (message) {
                    this.store.newSystemMessage(message);
                    this.store.buildSysChannel();
                }
            },
            getMessage(message) {
                this.store.checkingMessage(message);
                this.$nextTick(() => {
                    this.$refs.chat.handleMessage(message);
                });
            },

            handleBuildChat(data) {
                const {model, callback} = data;
                this.store.buildChannel(model);
                // 切换
                callback();
            },
            handleDelChat(data) {
                this.store.removeChannel(data);
            },
            handleAcceptFriend(data) {
                const {id, from, message} = data;
                let title = `同意${from.name}的好友申请`;
                const options = this.store.getFriendGroup();
                this.$confirmFriend(title, {
                    info: {
                        avatar: from.avatar,
                        name: from.name,
                        options,
                        message,
                    },
                })
                    .then(({selected}) => {
                        this.bindEvent("acceptFriend", {data, selected});
                        this.$INotify({
                            title: '提示',
                            message: `好友${from.name}添加成功！`,
                            type: "success"
                        })
                    })
                    .catch(() => {
                        console.log("你拒接了xx的好友申请!");
                    });
            },
            handleRejectFriend(data) {
                const {from} = data;
                let title = `拒接${from.name}的好友申请`;
                this.$IConfirm(title, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.bindEvent("rejectFriend", data);

                    })
                    .catch(() => {
                    });
            },
            handleAddGroup(data) {
                this.$IPrompt("请输入分组名", "添加分组", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                })
                    .then(({value}) => {
                        this.bindEvent("addGroup", value);
                    })
                    .catch(() => {
                    });
            },
            handleRenameGroup(data) {
                this.$IPrompt("请输入分组名", "分组重命名", {
                    inputValue: data.name,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                })
                    .then(({value}) => {
                        data.name = value;
                        this.bindEvent("renameGroup", data);
                    })
                    .catch(() => {
                    });
            },
            handleApplyForFriend(event) {
                const {key, value} = event;
                const {id, name, avatar} = value;
                const options = this.store.getFriendGroup();
                if (id === this.mine.id) {
                    this.$INotify({
                        title: '提示',
                        message: "你点了点自己",
                        type: "success"
                    })
                    return
                }
                let title = `${this.mine.username}-添加好友`;
                this.$applyFriend(title, {
                    info: {
                        avatar,
                        name: name,
                        options,
                    },
                }).then((data) => {
                    const model = {
                        from: {
                            id: this.mine.id,
                            name: this.mine.username,
                            avatar: this.mine.avatar,
                        },
                        to: {
                            id,
                            name,
                            avatar,
                        },
                        message: data.value,
                    }
                    this.bindEvent("applyFriend", model);
                }).catch(() => {
                });
            }
        },
    };
</script>

<style scoped></style>
