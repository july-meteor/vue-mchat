/**
 * 使用 js 内置的array  实现 顺序存储队列
 *  并且确保全局一个
 *   先进先出
 *   因为web的特性所以这里需要进行 缓存
 *  这里使用cookies 或者 session  进行持久化
 */

import { getStore, setStore, removeStore, clearStore, getAllStore } from './cache'


const KEY = 'array_queue';



let ArrayQueue = function () {
    this.ary = []
    // 定义一个 数组
    let value = getStore({ name: KEY });
    if (value) {
        this.ary = value
    }
}

ArrayQueue.prototype.push = function (obj) {
    this.ary.push(obj)
    setStore({
        name: KEY,
        content: this.ary,
        type: true
    })
}


// 获取第一个数组 并删除
ArrayQueue.prototype.get = function () {
    let value = this.ary.shift();
    setStore({
        name: KEY,
        content: this.ary,
        type: true
    })

    return value
}

// 清空数组
ArrayQueue.prototype.clear = function () {
    this.ary = []
    setStore({
        name: KEY,
        content: this.ary,
        type: true
    })
}

// 最后一个
ArrayQueue.prototype.getRear = function () {

}

// 长度
ArrayQueue.prototype.size = function () {
    return this.ary.length;
}



let queue = new ArrayQueue();

export default queue;