export function changeUrl (type, path, params) {
  const urlDomain = process.env[type]
  let url = ''
  for (let param in params) {
    url += `${param}=${params[param]}&`
  }
  const paramsStr = url.substring(0, url.length - 1)
  window.location.href = `${urlDomain}/jsapp/wechat/${path}/index.html?${paramsStr}`
}
