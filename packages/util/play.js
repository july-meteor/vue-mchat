// 提示音文件
//
// 为了部署方便
const tipSound = require('../static/media/tip.wav');


export function playTipSound(url = tipSound) {
    playMedia(url)
}


function playMedia(src) {
    var borswer = window.navigator.userAgent.toLowerCase();
    if (borswer.indexOf("ie") >= 0) {
        //IE内核浏览器不支持 audion，则使用 embed 播放
        let embedPlay = document.getElementById("embedPlay")
        if (!embedPlay) {
            let body = document.getElementsByTagName("body")[0]
            // 创建 节点
            let el_embed = document.createElement("embed");
            el_embed.id = 'embedPlay'
            el_embed.name = 'embedPlay'
            el_embed.hidden = true
            el_embed.autostart = true
            el_embed.loop = false
            body.append(el_embed);
            embedPlay = el_embed
        }
        if (embedPlay.src != src) {
            embedPlay.src = src
        }
        embedPlay.volume = 100;
        //embed.play();这个不需要
    } else {
        let audioPlay = document.getElementById("audioPlay")
        if (!audioPlay) {
            let body = document.getElementsByTagName("body")[0]
            // 创建 节点
            let el_audio = document.createElement("audio")
            el_audio.id = 'audioPlay'
            el_audio.hidden = true
            body.append(el_audio);
            audioPlay = el_audio
        }
        //浏览器支持 audion
        if (audioPlay.src != src) {
            audioPlay.src = src
        }
        // 为了防止 The play() request was interrupted by a new load request  这个异常。所以音乐延迟播放
        let  playPromise = audioPlay.play();
        if (playPromise) {
            playPromise.then(() => {
                // 音频加载成功
                // 音频的播放需要耗时
                setTimeout(() => {
                    // 后续操作
                }, audioPlay.duration * 1000); // audio.duration 为音频的时长单位为秒
            }).catch((e) => {
                // 音频加载失败
            });
        }

    }
}


