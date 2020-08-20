import * as CryptoJS from 'crypto-js'

/**
 *加密处理
  type 分为 AES 加密 和 Base64转码
 */
export const encryption = (params) => {
    let {
      data,
      type,
      param,
      key
    } = params
    const result = JSON.parse(JSON.stringify(data))
     
    if (type === 'Base64') {
      param.forEach(ele => {
        result[ele] = btoa(result[ele])
      })
    } else {
      param.forEach(ele => {
        var data = result[ele]
        key = CryptoJS.enc.Latin1.parse(key)
        var iv = key
        // 加密
        var encrypted = CryptoJS.AES.encrypt(
          data,
          key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
          })
        result[ele] = encrypted.toString()
      })
    }
    return result
  }