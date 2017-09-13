import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import styles from './Sider.less';

function SiderTop() {
  return (

      <Sider  width={50}>
        <Menu
          theme="dark"
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          inlineCollapsed={true}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>远程协作</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>质控管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>系统配置</span>
          </Menu.Item>
        </Menu>
      </Sider>


  );
}

export default SiderTop;
