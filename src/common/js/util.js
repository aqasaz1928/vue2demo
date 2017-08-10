/**
 * 解析url参数
 * @example ?id=1&w=2
 * @return Object {
 *  id:1,w:2
 *  }
 */
export function urlParse () {
  let url = window.location.search
  let object = {}
  if (url.length > 3) {
    let arr = url.split('&')
    arr.forEach((item) => {
      if (item.indexOf('?') !== -1) {
        item = item.substring(1)  
      }
      let tempArr = item.split('=')
      if (tempArr.length > 1) {
        let k = decodeURIComponent(tempArr[0])
        let v = decodeURIComponent(tempArr[1])
        object[k] = v
      }
    })
  }
  return object
}
