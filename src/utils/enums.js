/**
 * Created by Administrator on 2017/8/16.
 */
export const enums = {
  cooperativeType: {
    RemoteStructAndPlan: "远程勾靶+计划",
    RemotePlan: "远程计划",
    RemoteStruct: "远程勾靶"
  },
  cooperateStatus: {
    0: "待分配",
    10: "待勾靶",
    20: "已勾靶",
    30: "待计划",
    40: "已计划",
    50: "已确认",
    60: "已中止",
    70: "已删除",
  },
  menuUrlToStatus: {
    myApply: "myApply",
    myAccept: "myCase",
    attribute: "attribute",
    process: "process",
    finish: "finish",
    all: "all",
  }
}
