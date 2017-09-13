/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import {message} from 'antd'
import {CORS} from './config'

axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({statusText: 'OK', status: 200, data: result})
      })
    })
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request(options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }


  return fetch(options).then((response) => {
    const {data} = response;

    if (data.code >= 1000) {
      throw  {response}
    }
    return data
  }).catch((error) => {
// debugger
    const {response} = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const {data, statusText,request} = response;

      statusCode = data.code || response.status;
      msg = data.msg || statusText;

      if (request.responseURL.indexOf("login")>-1) {
        // 跳转到登陆页
        msg="登陆失效,即将跳转到登陆页...";
        window.parent.postMessage("login","/")
      }else if(request.responseURL.indexOf("error.jsp")>-1){
        msg="应用异常"
      }else if(request.responseURL.indexOf("unauthorized.jsp")>-1){
        msg="没有权限"
      }

    } else {
      statusCode = 600
      msg = error.message || '网络错误'
    }
    //可以throw到全局处理，也可以返回给请求调用者。
    //return { success: false, code:statusCode, msg: msg }
    throw  new Error(msg)
  })
}
