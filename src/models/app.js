import {queryRootMenus, querySubMenus, queryRemoteCoopCount} from "../services/app"
// import {zhihu} from "../services/example"
import {parse} from 'qs'

import {topMenu, menu} from "../utils/index"

export default {
  namespace: 'app',
  state: {
    topMenu: [],
    subMenu: [],
    countNumber: {
      all: 0,
      attribute: 0,
      finish: 0,
      myApply: 0,
      myAccept: 0,
      process: 0,
    }
  },
  effects: {
    * queryMenu ({payload}, {call, put}) {
      const data = yield call(queryRootMenus)
      if (data.code === 200) {
        const dataList = data.data;
        let remoteCoopDid;
        let currentTopMenu;
        for (let i = 0; i < dataList.length; i++) {
          if (dataList[i].menuUrl === "/remoteCoop") {
            currentTopMenu = "remoteCoop";
            remoteCoopDid = dataList[i].dynamicMenuUid;
            break
          }
        }
        yield put({
          type: 'setTopMenu',
          payload: dataList
        })

        const subData = yield call(querySubMenus, {menuUid: remoteCoopDid})
        if (subData.code === 200) {
          const subDataList = subData.data;

          yield put({
            type: 'setSubMenu',
            payload: subDataList
          })
        }
        if (currentTopMenu === "remoteCoop") {
          yield put({
            type:'queryRcCount'
          })
        }
      }
    },
    * queryRcCount ({payload}, {call, put}) {
      const countData = yield call(queryRemoteCoopCount)
      if (countData.code == 200) {
        yield put({
          type: 'setCountNumber',
          payload: countData.data
        })
      }
    }
  },
  reducers: {
    setTopMenu (state, {payload}) {
      let visibleMenu = payload.map((item) => {
        for (let i = 0; i < topMenu.length; i++) {
          if (item.menuName === i.name) {
            item.name = item.menuName;
            if (item.menuName === "远程质控" || item.menuName === "系统配置") {
              item.route = `${item.menuUrl}?menuUid=${item.dynamicMenuUid}`;
            } else {
              item.route = i.route;
            }
          }
        }
        return item;
      })

      return {
        ...state,
        topMenu: visibleMenu
      }
    },
    setSubMenu (state, {payload}) {
      let visibleMenu = menu.filter((i) => {
        return JSON.stringify(payload).indexOf(i.route) > -1;
      })
      return {
        ...state,
        subMenu: visibleMenu
      }
    },
    setCountNumber (state, {payload}) {
      return {
        ...state,
        countNumber: {
          ...state.countNumber,
          all: payload.allCount,
          attribute: payload.assignedCount,
          finish: payload.completedCount,
          myApply: payload.applicantCount,
          myAccept: payload.acceptanceCount,
          process: payload.processingCount,
        }
      }
    },
    crossApp (state, {payload}) {
      console.log("crossApp")
    },
  },
  subscriptions: {
    setup ({dispatch}) {
      debugger
      // dispatch({type: 'queryMenu'});
    }

  },
};
