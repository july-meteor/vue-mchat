/**
 * 忽略大小写判断字符串是否相同
 * @param str1
 * @param str2
 * @returns {boolean}
 */
export const isStrEqualsIgnorecase = (str1, str2) => {
  if (str1.toUpperCase() === str2.toUpperCase()) {
    return true
  }
  return false
}
/**
 * 判断是否为空
 */
export function isEmpty(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}

