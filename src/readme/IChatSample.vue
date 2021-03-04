<template>
    <div>
        <div style="height: 687px;">
            <i-chat-test></i-chat-test>
        </div>

        <div class="title">
            Attributes
            <div class="title">
                config
            </div>
            <table style="text-align: center;">
                <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> fixed</td>
                    <td> boolean</td>
                    <td> false</td>
                    <td> 窗口是否固定</td>
                </tr>
            </table>

            <div class="title">
                mine
            </div>
            <table style="text-align: center;">
                <tr>
                    <th>参数</th>
                    <th>默认值</th>
                    <th>类型</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> id</td>
                    <td> 10001</td>
                    <td> string/number</td>
                    <td> 我的id</td>
                </tr>
                <tr>
                    <td> username</td>
                    <td> july-meteor</td>
                    <td> string</td>
                    <td> 我的昵称</td>
                </tr>
                <tr>
                    <td> sign</td>
                    <td> 与其感慨路难行,不如马上出发！</td>
                    <td> string</td>
                    <td> 签名</td>
                </tr>
                <tr>
                    <td> avatar</td>
                    <td> '/avatar/avatar_meteor.png'</td>
                    <td> url</td>
                    <td> 头像</td>
                </tr>
                <tr>
                    <td> data</td>
                    <td> 你需要的数据</td>
                    <td> object</td>
                    <td> 扩展数据</td>
                </tr>
            </table>
            <div class="title">
                初始化
            </div>
            <pre>
             let data = {
                  // 好友列表
                  friends: this.friendList,
                  // 群组列表
                  groups: this.groupList,
                  // 系统消息列表
                  messages: this.systemMessage,
                };
                 this.$nextTick(() => {
                  this.$refs.IChat.setData(data);
                });
            </pre>

            <div class="title">
                `groups` 群组列表数据格式
            </div>

            <table>
                <tr>
                    <th>参数</th>
                    <th>默认值</th>
                    <th>类型</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> id</td>
                    <td> 10001</td>
                    <td> string/number</td>
                    <td> 群组Id</td>
                </tr>
                <tr>
                    <td> name</td>
                    <td> 共同进步</td>
                    <td> string</td>
                    <td> 群组名称</td>
                </tr>
                <tr>
                    <td> mine</td>
                    <td> null</td>
                    <td> string</td>
                    <td> 当前人在群组里的昵称</td>
                </tr>
                <tr>
                    <td> avatar</td>
                    <td> '/avatar/avatar_meteor.png'</td>
                    <td> url</td>
                    <td> 头像</td>
                </tr>
                <tr>
                    <td> sign</td>
                    <td> 8月22日 17:44</td>
                    <td> string</td>
                    <td> 最后发言时间</td>
                </tr>
                <tr>
                    <td> introduce</td>
                    <td> 这里是共同进步</td>
                    <td> string</td>
                    <td> 群介绍</td>
                </tr>
                <tr>
                    <td> userList</td>
                    <td>
                        <pre> [{
                            id: 1,
                            cid: 123401,
                            name: "怜",
                            remark: '剑圣',
                            online: false,
                            avatar:"",
                            sign: "。"
                        }]</pre>
                    </td>
                    <td> object</td>
                    <td> 成员数组，online 表示是否在线</td>
                </tr>
            </table>
            <div class="title">
                `friends` 好友列表数据格式
            </div>


            <table style="text-align: center;">
                <tr>
                    <th>参数</th>
                    <th>默认值</th>
                    <th>类型</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> id</td>
                    <td> 10001</td>
                    <td> string/number</td>
                    <td> 好友分组Id</td>
                </tr>
                <tr>
                    <td> name</td>
                    <td> 好友</td>
                    <td> string</td>
                    <td> 分组名称</td>
                </tr>
                <tr>
                    <td> userList</td>
                    <td> <pre> [ {
                id: 1,
                cid: 123401,
                name: "怜",
                remark: '剑圣',
                online: true,
                avatar: "",
                sign: ""
            },]</pre>
                    </td>
                    <td> object</td>
                    <td> 分组成员，online 表示是否在线</td>
                </tr>
            </table>

            <div class="title">
                `messages` 系统消息列表数据格式
            </div>


            <table style="text-align: center;">
                <tr>
                    <th>参数</th>
                    <th>默认值</th>
                    <th>类型</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> id</td>
                    <td> null</td>
                    <td> string/number</td>
                    <td> 消息Id</td>
                </tr>
                <tr>
                    <td> message</td>
                    <td> null</td>
                    <td> string</td>
                    <td> 消息内容</td>
                </tr>
                <tr>
                    <td> timestamp</td>
                    <td> null</td>
                    <td> string</td>
                    <td> 时间戳</td>
                </tr>
                <tr>
                    <td> from</td>
                    <td>
                        <pre>
                           {
                                id: 0,
                                name: '真琴',
                                avatar: require("../public/avatar/zhenqin.png"),
                            },
                        </pre>
                    </td>
                    <td> Object</td>
                    <td> 发送人</td>
                </tr>
                <tr>
                    <td> to</td>
                    <td>
                        <pre>
                           {
                                id: 0,
                                name: '真琴',
                                avatar: require("../public/avatar/zhenqin.png"),
                            },
                        </pre>
                    </td>
                    <td> Object</td>
                    <td> 发送目标人</td>
                </tr>
                <tr>
                    <td> type</td>
                    <td> null</td>
                    <td> string</td>
                    <td> 消息类型包含以下几张类型{ 'applyFriend':'申请好友', 'acceptFriend':'接受好友申请', 'rejectFriend':'拒接好友申请',
                        'accept':'被拒接好友申请',
                        'reject':'被拒接好友申请',
                        'system':'系统消息'}
                    </td>
                </tr>
            </table>

            <pre>
                [
                    {
                        id: 1,
                        from:
                        {
                            id: 0,
                            name: '草野优衣',
                            avatar: require("../public/avatar/ue.png"),
                        },
                        to:
                        {
                            id: 1,
                            name: '七月',
                            avatar: require("../public/avatar/avatar_meteor.png"),
                        },
                        type: 'acceptFriend',
                        message: '111',
                        timestamp: undefined
                 },
            ]
            </pre>
        </div>

        <div class="title">
            Events
            <div class="title">
                bindEvent
            </div>

            bindEvent 包含以下事件

            <table>
                <tr>
                    <th>方法名</th>
                    <th>说明</th>
                    <th>参数</th>
                </tr>
                <tr >
                    <td> chatEvent </td>
                    <td> 操作会话框触发,返回事件类型及窗口信息。具体事件看下表1</td>
                    <td> event,data </td>
                </tr>
                <tr >
                    <td> sendMessage </td>
                    <td> 每当你发送一个消息，都可以通过该事件监听到。 <br>
                        回调参数接受一个object类型的值，携带发送的聊天信息 </td>
                    <td> message </td>
                </tr>
                <tr >
                    <td> loadHistory </td>
                    <td> 点击查看更多信息后触发,会返回一个回调方法  </td>
                    <td> callback() </td>
                </tr>
                <tr >
                    <td> getMessage </td>
                    <td> 监听接受的消息 </td>
                    <td> user,message </td>
                </tr>
                <tr >
                    <td> uploadEvent </td>
                    <td> 文件上传接口 </td>
                    <td> data,callback（回调函数） </td>
                </tr>
            </table>
        </div>

        <div class="title">
            Methods
        </div>

        初始化 `IChat` 数据:
       <pre>
           this.$refs.IChat.setData();
       </pre>

        更新群组列表 `groups`:
        <pre>
        this.$refs.IChat.setGroups();
        </pre>

        更新好友列表 `friends`:
        <pre>
        this.$refs.IChat.setFriends();
        </pre>

        更新系统消息列表 `messages`:
        <pre>
        this.$refs.IChat.setSystemMessage();
        </pre>

        新的系统消息:
        <pre>
        this.$refs.IChat.newSystemMessage();
        </pre>

        新消息:
        <pre>
        this.$refs.IChat.getMessage();
        </pre>
    </div>

</template>

<script>
    import IChatTest from '../test/IChatTest'

    export default {
        name: "IChatSample",
        components: {
            IChatTest,
        }
    }
</script>

