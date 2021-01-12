
/**
 * cache 工具类
 *  web 浏览器存在3种类型
 * 1、cookies
 * 2、session
 * 3、storeage  localStoreage  sessionStorage
 * sessionStorage 单页面存在
 * localStoreage 本地内存存储
 *
 * 这里默认使用localStoreage作为存储
 */


// import Cookies from 'js-cookie'
import { isEmpty } from './StringUtil'

// 项目cache key
const keyPre = 'IChat_'

/**
 *
 */
export const setStore = (params = {}) => {
  let {
    name,
    content,
    type
  } = params
  name = keyPre + name
  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }

  convertStor(type).setItem(name, JSON.stringify(obj))

}

const convertStor = (type) => {
  let storeage
  if (type) {
    storeage = window.sessionStorage
  } else {
    storeage = window.localStorage
  }

  return storeage
}

export const getStore = (params = {}) => {
  let {
    name,
    debug
  } = params
  name = keyPre + name

  let obj = {}
  let content
  obj = convertStor(true).getItem(name)
  if (isEmpty(obj)) obj = convertStor(false).getItem(name)
  if (isEmpty(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch (e) {
    return obj
  }

  if (debug) {
    return obj
  }
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}

/**
 *  删除store
 */
export const removeStore = (params = {}) => {
  let {
    name,
    type
  } = params
  name = keyPre + name
  convertStor(type)
}

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  const { type } = params
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  const list = []
  const {
    type
  } = params
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i)
        })
      })
    }
  }
  return list
}

// export const getCookies = (key) => { return Cookies.get(key) }
//
// export function setCookies(key, params) { return Cookies.set(key, params) }
//
// export function removeCookies(key) { return Cookies.remove(key) }
