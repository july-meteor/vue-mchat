/**
 * 为了更好的打印日志分析，这里自己编写观察者时间中心
 */


//声明一个函数对象 eventHub
var EventHub = function () {
    // 订阅列表
    this.calls = {};
}
/**
 *   利用 js 自带的call()函数
 *   通知订阅的人们
 **/
EventHub.prototype.each = function (obj, fn) {
    var _this = this, key;
    if (typeof fn !== 'function') return _this;
    obj = obj || [];
    if (obj.constructor === Object) {
        for (key in obj) {
            if (fn.call(obj[key], key, obj[key])) break;
        }
    } else {
        for (key = 0; key < obj.length; key++) {
            if (fn.call(obj[key], key, obj[key])) break;
        }
    }
    return _this;
}


// 订阅方法
EventHub.prototype.on = function (channel, callback) {
    if (typeof callback === 'function') {
        this.calls[channel] ? this.calls[channel].push(callback) : this.calls[channel] = [callback];
    }
    return this;
}


//通知方法
EventHub.prototype.emit = function (channel, data) {
    this.each(this.calls[channel], function (index, item) {
        item && item(data);
    })
}


/**
 *  这是一个跟业务相关的额外扩展
 */

// EventHub.prototype.send = function ( data) {
//     this.emit('send',data);
// }




var eventHub = new EventHub();



export default eventHub;

