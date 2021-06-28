<template>
    <div>
        <div class="demo-box">
            <div class="demo-header demo-title">
                操作示例
            </div>
            <div class="demo-body">
                <button class="m-button m-button-primary" @click="handleAddChat">增加会话</button>
                <button class="m-button m-button-primary" @click="handleDelChat">删除会话</button>
                <button class="m-button m-button-primary" @click="config.brief= !config.brief">简约模式</button>
            </div>

        </div>

        <mchat
                ref="mchat"
                :config="config"
                :chats="chats"
                :mine="mine"
                @removeChat="handleChatRemove"
                @talkUserClick="handleTalkUserClick"
                @talkClick="handleTalkClick"
                @chatInfo="handleChatInfo"
                @sendMessage="sendMessage"
                @loadHistory="handleHistory"
                @uploadEvent="handleUpload"
        >
            <mchat-right-box>
                <template slot-scope="props">
                    <mchat-group-list
                            v-if="props.chat.type == 'group'"
                            :notices="props.chat.notices"
                            :userList="props.chat.userList"
                            :filter-user-method="filterUser"
                            @click="handleRightEvent"
                    ></mchat-group-list>
                    <div v-else>发挥你的想象</div>
                </template>
            </mchat-right-box>
        </mchat>


    </div>
</template>
<script>
    import CONST from "../constant";

    //红色语录
    var replay = [
        "我认识的人很多，而且我的同志遍布五湖四海。emoji[嘻嘻]",
        "我才五年级，老马讲什么都听不懂了，因为他坚持奋斗福报走资理论。emoji[威武]",
        "我喜欢你，emoji[爱你]从初级阶段直到共产主义。",
        "奋斗了三十年他终究还是离开了我们，但他还在我们身边。 ",
        "我通过了你的入党申请，现在我们可以开始为全人类解放的伟大事业共同奋斗了。emoji[心]emoji[心]",
        "资产阶级的白鸽不会亲吻乌鸦，世间没有所谓跨阶级的爱。",
        "中国真好，下次还来。",
        "生而为人，为人民服务。",
        "<（@￣︶￣@）>",
        "(*^__^*) emojio[嘻嘻] ，请我喝咖啡吗？",
    ];


    export default {
        name: "i-chat-test",
        data() {
            return {
                //获取主面板列表信息，下文会做进一步介绍
                config: {
                    // 是否有下拉按钮
                    downBtn: true,
                    rightBox: true,
                    // 简约模式
                    brief: true,
                    // 是否开启桌面消息提醒，即在浏览器之外的提醒
                    notice: false,
                    // 设定
                    voice: true,
                    //上传文件的扩展名
                    fileExt:"",
                    tabRemove:false,
                    fixed:true,
                },
                //我的信息
                mine: CONST.mine,
                //会话
                chats: CONST.chats,
                // chats: [],

            };
        },
        methods: {
            filterUser(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            fetchNotices() {
                return  CONST.notice_list;
            },
            handleChatRemove({ id, name, type }){
                console.log("事件名：removeChat。点击对话标签删除或择对话框关闭触发",item);
                let channels = this.chats;
                let len = channels.length;
                if (len < 1) return;
                let ary = [];
                for (let i = 0; i < len; i++) {
                    let model = channels[i];
                    if (model.id !== id) {
                        ary.push(model);
                    }
                }
                this.chats = ary;
            },
            handleRightEvent(event) {
                console.log("右边框事件", event);
            },
            handleHistory(data) {
                const {chat ,last, callback} = data;
                console.log("获取历史记录",data);
                let history = [
                    {
                        username: "历史记录",
                        avatar: require("../../public/avatar/temp2.jpg"),
                        id: 1,
                        type: "group",
                        content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
                        cid: parseInt(Math.random() * 10, 10),
                        mine: false,
                        fromid: 3,
                        timestamp: new Date(),
                    },
                ];
                callback(history);
            },

            sendMessage(data) {
                console.log("发送内容", {data});
                const {mine, to, content, timestamp} = data;
                let message = {
                    //消息来源用户名
                    username: mine.username,
                    //消息来源用户头像
                    avatar: mine.avatar,
                    //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                    id: to.id,
                    //聊天窗口来源类型，从发送消息传递的to里面获取
                    type: to.type,
                    //消息内容
                    content,
                    //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                    cid: 0,
                    //是否我发送的消息，如果为true，则会显示在右方
                    mine: true,
                    //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                    fromid: mine.id,
                    //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
                    timestamp,
                };
                //
                this.$refs.mchat.getMessage(message);
                //自动回复
                let authReplay = {
                    username: "july-meteor",
                    avatar:require("../../public/avatar/heiqi.png"),
                    id: to.id,
                    type: to.type,
                    content:  replay[(Math.random() * 9) | 0],
                    cid: 0,
                    mine: false,
                    fromid: -1,
                    timestamp: new Date(),
                };
                this.$im.emit("getMessage", authReplay);
            },
            //添加回话
            handleAddChat() {
                let chatId = parseInt(Math.random() * 10, 10)
                let newChat = {
                    id: chatId,
                    name: "新会话",
                    type: "friend",
                    avatar: require("../../public/avatar/temp2.jpg"),
                };
                this.chats.push(newChat);
            },
            handleDelChat() {
                this.chats.pop();
            },
            handleUpload(data,fn){
                console.log("文件上传",data);
            },
            handleTalkUserClick(item){
                console.log("事件名：talkUserClick。对话用户头像点击事件",item);
            },
            handleTalkClick(item){
                console.log("事件名：talkClick。对话内容点击事件",item);
            },
            handleChatInfo(item){
                console.log("事件名：chatInfo。点击窗口对话头像触发",item);
            },
        },
        mounted() {

        },
    };
</script>

<style lang="scss">


    .demo-box {
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        transition: .3s;
        border-radius: 4px;
        overflow: hidden;
        .demo-header {
            padding: 18px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            .demo-title {
            }
        }
        .demo-body {
            padding: 20px;

        }

    }
</style>
