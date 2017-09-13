import request  from '../utils/request'

export async function queryRootMenus (params) {
  return request({
    url: "/api/rootMenus",
    method: 'get',
    data: params,
  })
}

export async function querySubMenus (params) {
  return request({
    url: "/api/allSubMenus",
    method: 'get',
    data: params,
  })
}

export async function queryRemoteCoopCount (params) {
  return request({
    url: "/api/1.8/assist/remotecooperate/count",
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}
