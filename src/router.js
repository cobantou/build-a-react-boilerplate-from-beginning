import React from 'react'
/*
import PropTypes from 'prop-types'
*/
import { Router } from 'dva/router'
import App from './routes/app'

import MsgTplSetting from "./routes/MsgTplSetting.js";

import MsgSetting from "./routes/MsgSetting.js";

import MsgList from "./routes/MsgList.js";

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      // indexRoute: {onEnter: (nextState, replace) => replace('/remoteCoop/workOverview')},
      childRoutes: [
        {
          path: 'msgTplSetting',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/msgTplSetting'));
              cb(null, require('./routes/MsgTplSetting'))
            }, 'msgTplSetting')
          }
        },
        {
          path: 'msgSetting',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/msgSetting'));
              cb(null, require('./routes/MsgSetting'))
            }, 'msgSetting')
          }
        },
        {
          path: 'msgList',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/msgList'));
              cb(null, require('./routes/MsgList'))
            }, 'msgList')
          }
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            /*require.ensure([], (require) => {
              cb(null, require('routes/error/'))
            }, 'error')*/
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />;
}

/*
Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}
*/

export default Routers
