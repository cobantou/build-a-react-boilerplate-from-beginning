import React from 'react';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import styles from './app.less';

function App({children, location, dispatch, app}) {
  return (
    <Layout>
      <Layout>
        <Layout className={styles.contentWrapper}>
          <Content  className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

App.propTypes = {};

export default connect(({app}) => ({app}))(App);
