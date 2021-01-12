/**
 *  tomcat 部署 图片名称不能使用中文
 */

// 用户列表
const user_list = [
    {
        id: 1,
        name: "七月",
        online: true,
        type: "",
        avatar:"",
        role:'master'
    },
    {
        id: 1,
        name: "初音",
        online: true,
        type: "",
        avatar: require("../public/avatar/chuyin.png"),
        role:'manager'
    },
    {
        id: 2,
        name: "雪",
        online: false,
        type: "",
        avatar: require("../public/avatar/xue.png"),
        role:'manager'
    },
    {
        id: 3,
        name: "可可罗",
        online: false,
        type: "",
        avatar: require("../public/avatar/kekeluo.png"),
    },
    {
        id: 4,
        name: "栞",
        online: false,
        type: "",
        avatar: require("../public/avatar/kan.png"),
    },
];

// 公告列表
const notice_list = [
    {
        id: 1,
        type: "文件",
        title: "RocketMQ原理.dock",
    },
    {
        id: 2,
        type: "公告",
        title: "公主连接Rank推荐",
    },
]

// 历史记录
const history = [
    {
        username: "历史记录",
        avatar: require("../public/avatar/temp2.jpg"),
        id: 1,
        type: "group",
        content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
        cid: 0,
        mine: false,
        fromid: 3,
        timestamp: new Date(),
    },
];

//  测试发送数据
const test_send_msg = [
    {
        username: "小白",
        avatar: require("../public/avatar/temp1.jpg"),
        id: 1,
        type: "group",
        content: "img[/emoticon/emoticon_1.jpg]",
        cid: 0,
        mine: false,
        fromid: 2,
        timestamp: new Date(),
    },
    {
        username: "小奶",
        avatar: require("../public/avatar/temp2.jpg"),
        id: 1,
        type: "group",
        content: "video[https://www.w3school.com.cn/i/movie.mp4]",
        cid: 0,
        mine: false,
        fromid: 3,
        timestamp: new Date(),
    },
    {
        username: "老八",
        avatar: require("../public/avatar/temp2.jpg"),
        id: 1,
        type: "group",
        content: "audio[https://www.w3school.com.cn/i/horse.mp3]",
        cid: 0,
        mine: false,
        fromid: 3,
        timestamp: new Date(),
    },
]

const mine = {
    // 昵称
    username: "七月",
    // 用户id
    id: "10001",
    //状态
    status: "online",
    //签名
    sign: "与其感慨路难行,不如马上出发！",
    avatar: require("../public/avatar/avatar_meteor.png"),
}

const chats = [

    {
        id: 1,
        name: "海喵突基队",
        type: "group",
        avatar: require("../public/images/group_1.jpg"),
        userList: user_list,
        notices: [],
        master:1
    },
    {
        id: -1,
        name: "系统消息",
        type: "sys_msg",
        online: false,
    },
    {
        id: 2,
        name: "初音",
        type: "friend",
        online: true,
        avatar: require("../public/avatar/chuyin.png"),
    },
    {
        id: 3,
        name: "雪爷",
        type: "friend",
        online: false,
        avatar: require("../public/avatar/xue.png"),
    },

]

export default {
    notice_list,
    user_list,
    history,
    test_send_msg,
    mine,
    chats
}