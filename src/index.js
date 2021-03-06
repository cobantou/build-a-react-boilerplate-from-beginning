import dva from 'dva';
import {message} from 'antd'
import createLoading from 'dva-loading'
// import './index.less';
import "babel-polyfill";

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onError (error) {
    debugger
    message.error(error.message)
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));


debugger
// 5. Start
app.start('#root');


