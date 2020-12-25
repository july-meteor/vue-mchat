import request from '../utils/request'


/**
 *  登录平台
 * @param form
 */
export  function  login(form) {
    return request({
        url:"/login",
        method:'post',
        data:form
    })
}

/**
 * 注册账号
 * @param form
 */
export  function  register(form) {
    return request({
        url:"/register",
        method:'post',
        data:form
    })
}

/**
 *  依据token加载 身份
 */
export function  load(){
    return request({
        url:"/load",
        method:'get',
    })


}