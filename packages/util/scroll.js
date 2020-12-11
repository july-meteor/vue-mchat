'use strict'
import IScroll from 'iscroll'
/**
 * 【中文Api地址】https://iiunknown.gitbooks.io/iscroll-5-api-cn/content/index.html
 */

class Scroll extends IScroll {
  domPotision = []
  isCroll = null
  previousPostion = 0
  beforeNode = null

  constructor(node, options) {
    super(node, options)
  }

  setPosition(postion, node) {
    // this._findDom(postion, node)
    this.addPostion(postion, node)
  }

  get nodePosition() {
    return this.domPotision
  }

  get unread() {
    let result = 0
    this.domPotision.forEach(i => {
      const { read } = i
      if (!read) {
        result += 1
      }
    })
    return result
  }

  get isTop() {
    let top = false
    let { y } = this
    if (y === 0) top = true
    return top
  }

  addPostion(top, node) {
    if (!this.domPotision.find(i => {
      if (i.node === node) return i
    })) {
      this.domPotision.push({ node, read: false, top })
    }
  }

  resetTop() {
    const postion = this.domPotision
    if (!postion) return
    const newPosition = postion.map(({ node, read }) => {
      return {
        node, read, top: node.offsetTop
      }
    })
    newPosition.sort((a, b) => a.top - b.top)
    this.domPotision = newPosition
    const index = this._findIndex()
    index > -1 && this.read(index)
  }

  _findIndex() {
    const beforeNode = this.beforeNode
    return this.domPotision.findIndex(i => i.node == beforeNode.node)
  }

  read(index) {
    const key = index || this.findDom()
    let bottom = this.isBottom

    this.domPotision.forEach((i, j) => {
      if (bottom || key > j) {
        i.read = true
      }
    })
  }

  get isBottom() {
    let result = false
    const { y, maxScrollY } = this
    result = Math.abs(y) >= Math.abs(maxScrollY)
    return result
  }

  findDom() {
    const { y } = this
    let currentTop = Math.abs(y)
    if (currentTop == 0) return 0
    const doms = this.domPotision
    let result = -1

    // doms.forEach((i, j) => {
    //   const { top: t, node } = i
    //   const size = node.offsetHeight
    //   if (result < 0 && currentTop < t + size) {
    //     result = j
    //     if (currentTop > t) result += 1
    //   }
    // })

    doms.forEach((i, j) => {
      const { top } = i
      if (result === -1 || currentTop >= top) {
        result = j + 1
        // currentTop = top
        // if (currentTop > top) result += 1
      }
    })

    return result
  }

  savePosition() {
    const { y } = this
    this.previousPostion = y
    this.savseCurrentNode()
  }

  savseCurrentNode() {
    const nodeIndex = this.findDom()
    this.beforeNode = this.domPotision[nodeIndex]
  }

  toBeforePosition() {
    // scrollToElement(el, time, offsetX, offsetY, easing)
    const { node } = this.beforeNode
    this.scrollToElement(node, 0, 0, -30)
  }
}

export default Scroll
