let EventHub = {
    // 订阅
    on: function (channel, callback) {
        if (typeof callback === 'function') {
            this.calls[channel] ? this.calls[channel].push(callback) : this.calls[channel] = [callback];
        }
        return this;
    },
    // 通知
    emit: function (channel, data) {
        this.each(this.calls[channel], function (index, item) {
            item && item(data);
        })
    },
    /**
     *   利用 js 自带的call()函数
     *   通知订阅的人们
     **/
    each: function (obj, fn) {
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
    },
    //订阅列表
    calls: {},
}

exports.events = EventHub;