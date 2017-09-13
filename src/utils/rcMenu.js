/**
 * Created by Administrator on 2017/8/14.
 */
export let menu =  [
  {
    key: "workOverview",
    name: "工作概况",
    route:"/remoteCoop/workOverview"
  },{
    key: "myApply",
    name: "我的申请",
    route:"/remoteCoop/list/myApply"
  },{
    key: "myAccept",
    name: "我的受理",
    route:"/remoteCoop/list/myAccept"
  },{
    key: "rmtCoop",
    name: "远程协作",
    route: "远程协作",
    child:[
      {
        key: "attribute",
        name: "待分配",
        route:"/remoteCoop/list/attribute"
      },{
        key: "process",
        name: "处理中",
        route:"/remoteCoop/list/process"
      },{
        key: "finish",
        name: "已完成",
        route:"/remoteCoop/list/finish"
      },{
        key: "all",
        name: "全部",
        route:"/remoteCoop/list/all"
      },
    ]
  },
]

export let topMenu = [
  {
    key:"remoteCoop",
    name:"远程协作",
    route:'/remoteCoop'
  },{
    key:"qaManage",
    name:"远程质控",
    route:'/qaManage'
  },{
    key:"sysConfiguration",
    name:"系统配置",
    route:'/sysConfiguration'
  }
]
