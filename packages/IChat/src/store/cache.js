
import { setStore, getStore, removeStore ,clearStore} from  '../../../util/cache'

/**
 * 这里对cache类型进行封装
 * 目前的需求 缓存类型并不适合使用 cookies作为存储方案
 *
 */



export const setCache = (key, params, type = 'session') => {

    setStore({  name: key,  content: params, type })
}

export const getCache = (key) => {
    return getStore({ name: key }) || undefined;
}


export const removeCache = (key) => {
    removeStore({ name: key })
}

export const clearCache = ()=>{
    clearStore({type:true})
}