<template>
    <div>
        <div style="height: 687px;">
            <m-chat-test></m-chat-test>
        </div>

        <div class="title">
            Attributes
            <div class="title">
                config
            </div>
            <table>
                <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> rightBox</td>
                    <td> false</td>
                    <td> boolean</td>
                    <td> 是否有右侧抽屉,如果为true,则右侧面板显示，可以加入自定义组件</td>
                </tr>
                <tr>
                    <td> brief</td>
                    <td> true</td>
                    <td>boolean</td>
                    <td> 是否开启简约模式,Chat可以被缩小</td>
                </tr>
                <tr>
                    <td> notice</td>
                    <td> false</td>
                    <td>boolean</td>
                    <td> 是否开启桌面消息提醒，即在浏览器之外的提醒</td>
                </tr>
                <tr>
                    <td> voice</td>
                    <td> false</td>
                    <td>boolean</td>
                    <td> 是否开启消息提醒</td>
                </tr>
            </table>

            <div class="title">
                mine
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
                chats
            </div>

            <table>
                <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                </tr>
                <tr>
                    <td> id</td>
                    <td> 10002</td>
                    <td> string/number</td>
                    <td> 会话id</td>
                </tr>
                <tr>
                    <td> name</td>
                    <td> 海喵突基队</td>
                    <td> string</td>
                    <td> 会话名称</td>
                </tr>
                <tr>
                    <td> type</td>
                    <td> group</td>
                    <td> string</td>
                    <td> 会话类型 group/friend 根据你的需要自行扩展</td>
                </tr>
                <tr>
                    <td> avatar</td>
                    <td> /images/group_1.jpg</td>
                    <td> url</td>
                    <td> 会话头像</td>
                </tr>
                <tr>
                    <td> online</td>
                    <td> true</td>
                    <td> boolean</td>
                    <td> type类型为friend</td>
                </tr>
            </table>
        </div>

        <div class="title">
            Events
            <div class="title">
                Chat Event
            </div>
            <table>
                <tr>
                    <th>方法名</th>
                    <th>说明</th>
                    <th>参数</th>
                </tr>
                <tr>
                    <td> chatEvent</td>
                    <td> 操作会话框触发,返回事件类型及窗口信息。具体事件看下表1</td>
                    <td> event,data</td>
                </tr>
                <tr>
                    <td><span style="text-decoration:line-through;"> talkEvent </span></td>
                    <td> 当你点击对话内容返回对话信息触发 (已经弃用)</td>
                    <td> user,message</td>
                </tr>
                <tr>
                    <td> sendMessage</td>
                    <td> 每当你发送一个消息，都可以通过该事件监听到。 <br> 回调参数接受一个object类型的值，携带发送的聊天信息</td>
                    <td> message</td>
                </tr>
                <tr>
                    <td> loadHistory</td>
                    <td> 点击查看更多信息后触发,会返回一个回调方法</td>
                    <td> callback()</td>
                </tr>
                <tr>
                    <td> getMessage</td>
                    <td> 监听接受的消息</td>
                    <td> user,message</td>
                </tr>
                <tr>
                    <td> uploadEvent</td>
                    <td> 文件上传接口</td>
                    <td> data,callback（回调函数）</td>
                </tr>
            </table>

            <div class="title">
                Window Event
            </div>

            <table>
                <tr>
                    <th>事件名称</th>
                    <th>说明</th>
                    <th>参数</th>
                </tr>
                <tr>
                    <td> chatTop</td>
                    <td> 会话置顶</td>
                    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 }</td>
                </tr>
                <tr>
                    <td> chatMin</td>
                    <td> 窗口最小化</td>
                    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 }</td>
                </tr>
                <tr>
                    <td> chatMax</td>
                    <td> 窗口最大化</td>
                    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 }</td>
                </tr>
                <tr>
                    <td> removeChat</td>
                    <td> 移除对话框</td>
                    <td> { id: 会话id, name: 会话名称 ,type: 会话类型 }</td>
                </tr>
                <tr>
                    <td> clickUser</td>
                    <td> 当你点击聊天框内用户头像</td>
                    <td> {id: 用户Id, mine: 是否是自己 , username:用户名称 }</td>
                </tr>
            </table>
        </div>

        <div class="title">
            Methods
        </div>

        <table style="text-align: center;">
            <tr>
                <th>事件名称</th>
                <th>说明</th>
                <th>回调参数/使用方法</th>
            </tr>
            <tr>
                <td> getMessage</td>
                <td> 监听接受的消息</td>
                <td> 参考下方示例1</td>
            </tr>
            <tr>
                <td> getCurrent</td>
                <td> 获取当前会话</td>
                <td> Objectg</td>
            </tr>
        </table>
        <div style="padding: 10px">
            示例
        </div>
        <div>
            <pre class="sample-code">
            let message = {
                    //消息来源用户名
                    username: '七月'
                    //消息来源用户头像
                    avatar: avatar,
                    //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                    id: 1001,
                    //聊天窗口来源类型，从发送消息传递的to里面获取
                    type: 'group',
                    //消息内容  请看 Attributes 中的content说明
                    content:'你好',
                    //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                    cid: 0,
                    //是否我发送的消息，如果为true，则会显示在右方
                    mine: true,
                    //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                    fromid: 10002,
                    //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
                    timestamp: new date(),
                  };
                  // 方法一、 通过内置MChat的event 随时随地引用
                  this.$im.emit("getMessage", message);
                  // 方法二、
                  this.$refs[MChatname].getMessage(message)
        </pre>
        </div>

        <div class="title">
            MChat-right-box 会话框右侧示例
            <div class="title">
                MChat-group-list 群组列表
                <div class="title">
                    Attributes
                </div>

                <table>
                    <tr>
                        <th>参数</th>
                        <th>类型</th>
                        <th>默认值</th>
                        <th>说明</th>
                    </tr>
                    <tr>
                        <td> notices</td>
                        <td> array</td>
                        <td> id, type, title</td>
                        <td> 群公告栏</td>
                    </tr>
                    <tr>
                        <td> userList</td>
                        <td> array</td>
                        <td> id, name,type, avatar</td>
                        <td> 成员信息</td>
                    </tr>
                    <tr>
                        <td> filter-user-method</td>
                        <td> Function(value, data)</td>
                        <td> —</td>
                        <td> 对成员节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏</td>
                    </tr>
                </table>

                <div class="title">
                    Event
                </div>

                <table style="text-align: center;">
                    <tr>
                        <th>方法名</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                    <tr>
                        <td> click</td>
                        <td> 点击群公告，或者成员触发</td>
                        <td> event</td>
                    </tr>
                </table>
            </div>

        </div>
    </div>


</template>

<script>
    import MChatTest from '../test/MChatTest'

    export default {
        name: "MChat-Sample",
        components: {
            MChatTest,
        }
    }
</script>

