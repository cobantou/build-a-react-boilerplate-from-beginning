import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import styles from './Header.less';

function MHeader() {
  return (
    <Header className="header" style={{position:'fixed',width:'100%'}}>
      <div className="logo" />
      <span style={{color:'white'}}>远程放疗协作平台</span>
    </Header>
  );
}

export default MHeader;
