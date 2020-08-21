// 用户列表
const user_list = [
  {
    id: 1,
    name: "七月",
    type: "",
    avatar: "/avatar/avatar_meteor.png",
  },
  {
    id: 1,
    name: "初音",
    type: "",
    avatar: "/avatar/初音.png",
  },
  {
    id: 2,
    name: "雪",
    type: "",
    avatar: "/avatar/雪.png",
  },
  {
    id: 3,
    name: "可可罗",
    type: "",
    avatar: "/avatar/可可罗.png",
  },
  {
    id: 4,
    name: "栞",
    type: "",
    avatar: "/avatar/栞.png",
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
    avatar: "/avatar/temp2.jpeg ",
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
    avatar: "/avatar/temp1.jpg",
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
    avatar: "/avatar/temp2.jpeg ",
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
    avatar: "/avatar/temp2.jpeg ",
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
  avatar: "/avatar/avatar_meteor.png",
}

const chats = [
  {
    id: 1,
    name: "海喵突基队",
    type: "group",
    avatar: "/images/group_1.jpg",
    userList: user_list,
    notices: notice_list,
  },
  // {
  //   id: 2,
  //   name: "初音",
  //   type: "friend",
  //   avatar: "/avatar/初音.png",
  // },
]

export default {
  notice_list,
  user_list,
  history,
  test_send_msg,
  mine,
  chats
}