/**
 *  tomcat 部署 图片名称不能使用中文
 */

const group_list = [
    {
        id: 1,
        name: "小小甜心",
        avatar: require("../public/avatar/group_xxtx.png"),
        userList: [],
        notify: '小小甜心',
        sign: "8月22日 17:44",
        mine: "炼铜术士",
        introduce: ' = 。 ='
    },
    {
        id: 2,
        name: "美食殿堂",
        avatar: require("../public/avatar/group_msdt.jpg"),
        userList: [],
        mine: "主人",
        sign: "1月2日 10:27",
    },

];

const friend_groups = [
    {
        index: 0,
        name: 'UE对不起',
        userList: [
            {
                id: 1,
                cid: 123401,
                name: "怜",
                remark: '剑圣',
                online: true,
                avatar: require("../public/avatar/lian.png"),
                sign: "继续下去的话优衣会生气的。"
            },
            {
                id: 2,
                cid: 123402,
                name: "真琴",
                online: false,
                remark: '狼',
                avatar: require("../public/avatar/zhenqin.png"),
                sign: "对不起,优衣！",
                email:''
            },
            {
                id: 3,
                cid: 123403,
                name: "日和",
                online: true,
                remark: '猫拳',
                avatar: require("../public/avatar/riheli.png"),
                sign: "因为骑士先生，他还有优衣的嘛……"
            },
        ]
    },
    {
        index: 2,
        name: '老师',
        userList: [
            {
                id: 3,
                cid: 123405,
                name: "伊绪",
                remark: '伊绪老师',
                online: false,
                avatar: require("../public/avatar/yixu.png"),
                sign: "66666666"
            },
            {
                id: 4,
                cid: 123406,
                name: "美里",
                remark: '圣母',
                online: true,
                avatar: require("../public/avatar/shengmu.png"),
                sign: "777777777777777"
            },
        ]
    },


];


// 用户列表
const user_list = [
    {
        id: 1,
        name: "七月",
        online: true,
        type: "",
        avatar: "",
        role: 'master'
    },
    {
        id: 1,
        name: "初音",
        online: true,
        type: "",
        avatar: require("../public/avatar/chuyin.png"),
        role: 'manager'
    },
    {
        id: 2,
        name: "雪",
        online: false,
        type: "",
        avatar: require("../public/avatar/xue.png"),
        role: 'manager'
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

const system_message =  [
    {
        id: 0,
        name: '草野优衣',
        avatar: require("../public/avatar/ue.png"),
        type: 'applyFriend',
        message: '骑士君，我是优衣啊！',
        timestamp: '刚刚',
    },
    {
        id: 1,
        name: '真琴',
        avatar: require("../public/avatar/zhenqin.png"),
        type: 'acceptFriend',
        message: '已经同意你的好友申请',
        timestamp: '五天前',
    },

    {
        id: 2,
        name: '优衣',
        avatar: require("../public/avatar/ue1.png"),
        type: 'rejectFriend',
        message: "你是谁我不认识你啊！",
        timestamp: '十天前',

    },
    {
        id: 4,
        type: 'system',
        message: "'海喵突基队'创建成功！",
        timestamp: '一个月前',
    },
    {
        id: 3,
        type: 'system',
        message: 'IChat欢迎您，有问题请加QQ群:961226240!',
        timestamp: '一个月前',
    }
]



export default {
    notice_list,
    user_list,
    history,
    test_send_msg,
    mine,
    group_list,
    system_message,
    friend_groups,
}