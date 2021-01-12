'use strict'
import IScroll from 'iscroll'

/**
 * http://caibaojian.com/iscroll-5/scrollers.html
 *  已读未读是根据 每次新增数据 li 链上挂上 node 来判断
 *
 */


class Scroll extends IScroll {
    domNodes = []
    isCroll = null
    readPosition = 0
    // 之前是在第几个
    beforeIndex = 0

    constructor(node, options) {
        super(node, options)
    }

    get nodePosition() {
        return this.domNodes
    }

    //  根据节点来判断是否已读
    get unread() {
        let result = 0
        this.domNodes.forEach(i => {
            const {read} = i
            if (!read) {
                result += 1
            }
        })
        return result
    }

    get isTop() {
        let top = false
        let {y} = this
        if (y === 0) top = true
        return top
    }

    // 增加节点
    addNode(top, node) {
        if (!this.domNodes.find(i => {
            if (i.node === node) return i
        })) {
            this.domNodes.push({node, read: false, top})
        }
    }


    // 重新设置顶点
    resetTop() {
        const postion = this.domNodes
        if (!postion) return
        const newPosition = postion.map(({node, read}) => {
            return {
                node, read, top: node.offsetTop
            }
        })
        newPosition.sort((a, b) => a.top - b.top)
        this.domNodes = newPosition
        const index = this._findIndex()
        index > -1 && this.read(index)
    }

    // 之前的node
    beforeNode() {
        const beforeIndex = this.domNodes.length - this.beforeIndex;
        if (!beforeIndex) {
            return null;
        }
        return this.domNodes[beforeIndex]
    }

    //
    read() {
        this.domNodes.forEach((i, j) => {
            i.read = true
        })
    }

    //
    reading() {
        const key = index || this.findCurrentIndex()
        let bottom = this.isBottom
        this.domNodes.forEach((i, j) => {
            if (bottom || key > j) {
                i.read = true
            }
        })
    }


    get isBottom() {
        let result = false
        const {y, maxScrollY} = this
        result = Math.abs(y) >= Math.abs(maxScrollY)
        return result
    }

    // 查找当前的索引
    findCurrentIndex() {
        const {y} = this
        let currentTop = Math.abs(y)
        if (currentTop == 0) return 0
        const doms = this.domNodes
        let result = -1
        doms.forEach((i, j) => {
            const {top} = i
            if (result === -1 || currentTop >= top) {
                result = j + 1
            }
        })
        return result
    }

    // 保存当前位置
    savePosition() {
        this.saveCurrentIndex()
    }

    saveCurrentIndex() {
        const nodeIndex = this.findCurrentIndex()
        // 这个索引需要从末尾往上找才
        this.beforeIndex = this.domNodes.length - nodeIndex;
    }

    // 前往先前的坐标点
    toBeforePosition() {
        if (this.beforeNode()) {
            let {node} = this.beforeNode()
            if (node) {
                this.scrollToElement(node, 0, 0, -30)
            }
        }
    }
}

export default Scroll
