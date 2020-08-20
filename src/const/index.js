

/**
 *  protoConst 只是协议的编号
 * controlConst 是整个chat 里事件的映照表
 */

//协议常量
export const protoConst = {
    CHECKIN: 0xD0,
    CHANNEL_SWITCH: 0xD1,
    //语音
    CHANNEL_VOICE: 0xA3,
    // 媒体消息
    MEDIA_MSG: 0x81,
    //单呼
    SINGLE_CALL: 0xAB,
    SINGLE_CALL_VOICE: 0xAC,
    // 请求信息
    REQUEST_MESSAGE:0XC1,
    RESPONSE_MESSAGE:0XC2,
    // 服务器下发
    SERVER_MESSAGE: 0XB1,
    
}

export const eventConst ={
    WS_CLOSE:'websocket_close',
    WS_ACTIVE:'websocket_active',
    WS_OPEN:'websocket_open',
    WS_RECONNECT:'websocket_reconnect',
    WS_ERROR:'websocket_error',
}

/**
 *  提供个需要刷新消费的事件
 */
export const provideConst= {
    // 其他终端登录
     OTHER_TERMINAL_LONGIN:'other_terminal_login',
     WS_CLOSE:'websocket_close',

}



//控制协议常量
export const controlConst = {
   

    LOGIN: 'login',
    SEND: 'send',
    // 退出指令
    LOGOUT:'logout',
    MESSAGE: 'message',
    CHANNEL_ADD: 'channel_add',
    CHANNEL_REMOVE: 'channel_remove',
    //语音发送
    CHANNEL_VOICE: 'channel_voice',
    //消息接受
    CHANNEL_ON_MSG: 'channel_on_msg',

    CHANNEL_MSG: 'channel_msg',
    //129 的媒体协议
    MEDIA_MSG: 'channle_media_msg',
    //消息发送
    CHANNEL_EMIT_MSG: 'channel_emit_msg',
    CHANNEL_SWITCH: "channel_switch",
    SINGLE_CALL: 'single_call',
    //单呼回应
    SINGLE_CALL_LISTEN: 'single_call_listen',
    //单呼语音包
    SINGLE_CALL_VOICE: 'single_call_voice',
    
    SET_CHANNEL_EVENT: 'set_channel_event',
    // 其他终端登录
    SERVER_MSG_OTHER_LOIN: 'server_msg_other_terminal_login',

}

// 配置常量
export const configConst = {
    wshost: '127.0.0.1',
    wsport: '18600',
    log: true
}


// 一些资源常量
const btnRecord = "/static/btn/btn_record.png",
    btnRecording = "/static/btn/btn_recording.png",
    avatar_terminal = '/static/avatar/img_avatar_terminal.jpg',
    tipsSound = '../../static/media/tip.wav'


export const constant = {
    btnRecord,
    btnRecording,
    avatar_terminal,
    tipsSound,
    ONLINE: 1,
    OFFLINE: 0,
    HIDE: 3,
    singlecall: {
        // 申请单呼
        apply: 0,
        // 被对方确认 
        beConfirm: 1,
        // 单呼退出，服务器清除状态并转发（主叫和被叫都会收到服务器下发）
        quit: 2,
        // 被拒绝 目前主要原因是被服务器拒绝
        reject: 3,
        // 被退出？
        beQuit: 4,
    }
}

