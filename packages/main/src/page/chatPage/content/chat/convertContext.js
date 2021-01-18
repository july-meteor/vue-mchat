/**
 * 用得到的工具类
 */
import emojis from "./emoji";


//转换 聊天内容
export function ConvertContext(content) {
    //支持的html标签
    var html = function (end) {
        return new RegExp('\\n*\\[' + (end || '') + '(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
    };
    content = (content || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') //XSS
        .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@
        // .replace(/\s{2}/g, '&nbsp') //转义空格
        .replace(/img\[([^\s]+?)\]/g, function (img) {  //转义图片
            return '<img class="im-content-img" src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
        })
        .replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function (str) { //转义文件
            var href = (str.match(/file\(([\s\S]+?)\)\[/) || [])[1];
            var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
            if (!href) return str;
            return '<a class="layui-layim-file" href="' + href + '" download target="_blank"><i class="layui-icon">&#xe61e;</i><cite>' + (text || href) + '</cite></a>';
        })
        .replace(/emoji\[([^\s[\]]+?)\]/g, function (emoji) {  //转义表情
            var alt = emoji.replace(/^emoji/g, '');
            return '<img alt="' + alt + '" title="' + alt + '" src="' + emojis[alt] + '">';
        }).replace(/audio\[([^\s]+?)\]/g, function (i) {
            return '<div data-src="' + i.replace(/(^audio\[)|(\]$)/g, "") + '"> <audio  controls  src="' + i.replace(/(^audio\[)|(\]$)/g, "") + '" ></audio></div>'
        }).replace(/video\[([^\s]+?)\]/g, function (i) {
            return '<video controls="controls" src="' + i.replace(/(^video\[)|(\]$)/g, "") + '"></video>'
        }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function (str) { //转义链接
            var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
            var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
            if (!href) return str;
            return '<a href="' + href + '" target="_blank">' + (text || href) + '</a>';
        }).replace(html(), '<$1 $2>').replace(html('/'), '</$1>') //转移HTML代码
        .replace(/\n/g, '<br>')
    //转义换行 

    return (content);

}






export function ConvertRecord(data) {
    let contenxt = ConvertContext(data.content);
    let tiem = dateFormat(data.timestamp)
    let leftName = data.mine ? "" : data.username;
    let rightName = data.mine ? data.username : "";

    let mineHtml = data.mine ? "class='layim-chat-mine'" : ""
    let htmlContext = "<li " + mineHtml + ">"
    htmlContext += "<div class='layim-chat-user'> <img src='http://www.qsfj.com/data/upload/201805/f_b68ccc238a400550805c6b7ed1df9d6c.jpg' />"
    htmlContext += "<cite>" + leftName + "<i>" + tiem + "</i>" + rightName + "</cite> </div>"
    htmlContext += "<div class='layim-chat-text'>" + contenxt + "</div></li>"

    return htmlContext;
}

//补齐数位
var digit = function (num) {
    return num < 10 ? '0' + (num | 0) : num;
};

export function dateFormat(timestamp) {
    var d = new Date(timestamp || new Date());
    return d.getFullYear() + '-' + digit(d.getMonth() + 1) + '-' + digit(d.getDate())
        + ' ' + digit(d.getHours()) + ':' + digit(d.getMinutes()) + ':' + digit(d.getSeconds());
}

