import  request  from '../utils/request'

export async function zhihu (params) {
  return request({
    url: "https://zhuanlan.zhihu.com/api/recommendations/columns?limit=8&offset=0&seed=7",
    method: 'get',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'post',
    data: params,
  })
}
