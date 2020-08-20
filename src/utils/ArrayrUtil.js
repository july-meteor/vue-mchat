
/**
 *  数组工具
 */

/**
 * 数组对象去重
 * uniqeByKeys(arr,['id']);
 * @param array
 * @param kys
 */
export const uniqeByKeys = (array, keys) => {
  const arr = []
  const hash = {}
  for (let i = 0, j = array.length; i < j; i++) {
    const k = objToString(array[i], keys)
    if (!(k in hash)) {
      hash[k] = true
      arr.push(array[i])
    }
  }
  return arr
}

const objToString = (obj, keys) => {
  let tr = keys.length
  const key = []
  while (tr--) {
    key.push(obj[keys[tr]])
  }
  return key.join('|')
}
