/**
 *  tomcat 部署 图片名称不能使用中文
 */

const group_list = [
    {
        id: 1,
        name: "小小甜心",
        avatar: require("../public/avatar/group_xxtx.png"),
        userList: [
            {
                id: 10001,
                cid: 123403,
                name: "七月",
                online: true,
                remark: '七月',
                avatar: require("../public/avatar/avatar_meteor.png"),
                sign: "与其感慨路难行,不如马上出发！",
                email: ''
            },
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
                email: ''
            },


        ],
        notify: '小小甜心',
        sign: "8月22日 17:44",
        mine: "炼铜术士",
        introduce: ' = 。 ='
    },
 
];


const group_list_change = [
    {
        id: 1,
        name: "小小甜心",
        avatar: require("../public/avatar/group_xxtx.png"),
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

        ],
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
        id: 0,
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
                online: true,
                remark: '狼',
                avatar: require("../public/avatar/zhenqin.png"),
                sign: "对不起,优衣！",
                email: ''
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
        id: 1,
        index: 2,
        name: '老师',
        userList: [
            {
                id: 3,
                cid: 123405,
                name: "伊绪",
                remark: '伊绪老师',
                online: true,
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

const friend_groups_change = [
    {
        id: 0,
        index: 0,
        name: 'UE对不起',
        userList: [
            {
                id: 1,
                cid: 123401,
                name: "怜",
                remark: '剑圣',
                online: false,
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
                email: ''
            },
            {
                id: 3,
                cid: 123403,
                name: "日和",
                online: false,
                remark: '猫拳',
                avatar: require("../public/avatar/riheli.png"),
                sign: "因为骑士先生，他还有优衣的嘛……"
            },
        ]
    },
    {
        id: 1,
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
                online: false,
                avatar: require("../public/avatar/shengmu.png"),
                sign: "777777777777777"
            },
        ]
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

const system_message = [

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
    {
        id: 2,
        from:
        {
            id: 0,
            name: '真琴',
            avatar: require("../public/avatar/zhenqin.png"),
        },
        to:
        {
            id: 1,
            name: '七月',
            avatar: require("../public/avatar/avatar_meteor.png"),
        },
        type: 'acceptFriend',
        message: '已经同意你的好友申请',
        timestamp: '五天前',
    },

]


const system_message_change = [

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



const status_change_2 =  [
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
                online: true,
                remark: '狼',
                avatar: require("../public/avatar/zhenqin.png"),
                sign: "对不起,优衣！",
                email: ''
            },
        ]
        
    


const status_change_1 = [
    {
        id: 1,
        cid: 123401,
        name: "怜",
        remark: '剑圣',
        online: false,
        avatar: require("../public/avatar/lian.png"),
        sign: "继续下去的话优衣会生气的。"
    },

];




export default {
    notice_list,
    history,
    mine,
    group_list,
    system_message,
    friend_groups,
    group_list_change,
    friend_groups_change,
    system_message_change,
    status_change_1,
    status_change_2
}