export const getParameterValue = (parameter) => {
  var reg = new RegExp('(^|&)' + parameter + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/* 获取URL中hash参数的值 */
export const getParameterHashValue = (parameter) => {
  var reg = new RegExp('(^|&)' + parameter + '=([^&]*)(&|$)', 'i')
  var r = window.location.hash.substr(3).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
