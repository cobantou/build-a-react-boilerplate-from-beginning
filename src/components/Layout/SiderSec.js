import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Spin} from 'antd';
import {Link} from 'dva/router'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import pathToRegexp from 'path-to-regexp'
import styles from './Sider.less';
import classnames from "classnames"


function SiderSec({menu, location,countNumber}) {
  //获取当前选中项
  let defaultSelectedKeys = [];
  if (menu.length) {
    defaultSelectedKeys = [menu[0].key];
  }

  const getSelectKeys = (menu) => {
    for (let item of menu) {
      if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
        defaultSelectedKeys = [item.key];
        break
      }
      if (item.child && item.child.length > 0) {
        getSelectKeys(item.child)
      }
    }
  }
  getSelectKeys(menu);

  function hasClass(ele, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
  }
  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
  }
  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }

  let defaultOpenKeys = [];
  // 递归生成菜单
  const getMenus = (menuTreeN) => {
    return menuTreeN.map((item) => {
      if (item.child) {
        defaultOpenKeys.push(item.key)
        return (
          <SubMenu
            key={item.key}
            title={<span>
              {item.icon && <Icon type={item.icon}/>}
              <i className={classnames({[styles.menuIcon]: true, [styles[item.key]]:true}) }></i>
              <span className={styles.menuText}>{item.name}</span>
            </span>}
          >
            {getMenus(item.child)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} className={123}>
          <Link
            to={item.route}
            onFocus={(e)=>{
              addClass( e.currentTarget.parentElement,"focus")
            }}
            onBlur={(e)=>{
              removeClass( e.currentTarget.parentElement,"focus")
            }}
          >
            {item.icon && <Icon type={item.icon}/>}
            <i className={classnames({[styles.menuIcon]: true, [styles[item.key]]:true}) }></i>
            <span className={styles.menuText}>{item.name}</span>
            <span className={styles.menuNumber}>{countNumber[item.key]}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
  const menuItems = getMenus(menu)

  return (
    <div className={styles.normal}>
      <Sider style={{overflow: 'auto', height: '100%'}} width={180}>
        <div className={styles.menuName}>
          远程协作
        </div>
        {
          menu.length > 0
            ? <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys }
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={defaultSelectedKeys }
            style={{height: '100%', borderRight: 0}}
          >
            {menuItems}
          </Menu>
            : null
        }
      </Sider>
      <Spin spinning={!menu.length > 0} tip="加载中" style={{position: "absolute", top: 150}}>
      </Spin>
    </div>
  );
}

/*
class SiderSec extends React.Component {
  constructor(props) {
    super(props)
    let defaultSelectedKeys = [];
    if (props.menu.length) {
      defaultSelectedKeys = [props.menu[0].key];
    }
    this.state = {
      defaultSelectedKeys: defaultSelectedKeys,
      defaultOpenKeys: [],
      focusKey: null,
      menuItems: []
    }
  }

  getSelectKeys = (menu) => {
    for (let item of menu) {
      if (item.route && pathToRegexp(item.route).exec(this.props.location.pathname)) {
        this.setState({
          defaultSelectedKeys: [item.key]
        })
        break
      }
      if (item.child && item.child.length > 0) {
        this.getSelectKeys(item.child)
      }
    }
  }

// let defaultOpenKeys = [];
// 递归生成菜单
  getMenus = (menuTreeN) => {
    let othis = this;

    return menuTreeN.map((item) => {
      if (item.child) {
        this.setState({
          defaultOpenKeys: this.state.defaultOpenKeys.concat([item.key])
        })

        return (
          <SubMenu
            key={item.key}
            title={<span>
              {item.icon && <Icon type={item.icon}/>}
              <i className={classnames({[styles.menuIcon]: true, [styles[item.key]]: true}) }></i>
              <span className={styles.menuText}>{item.name}</span>
            </span>}
          >
            {this.getMenus(item.child)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} className={classnames({"focus": this.state.focusKey===item.key}) }>
          <Link
            to={item.route}
            onFocus={(e)=> {
              //addClass(e.currentTarget.parentElement, "focus")

              this.setState({
                focusKey: item.key
              },function(){
                console.log(this)
                this.forceUpdate();
              })
            }}
            // onBlur={(e) => {
            //   // removeClass(e.currentTarget.parentElement, "focus")
            //   this.setState({
            //     focusKey: null
            //   })
            // }}
          >
            {item.icon && <Icon type={item.icon}/>}
            <i className={classnames({[styles.menuIcon]: true, [styles[item.key]]: true}) }></i>
            <span className={styles.menuText}>{item.name}</span>
            <span className={styles.menuNumber}>{this.props.countNumber[item.key]}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
// const menuItems = getMenus(menu)

  componentWillMount() {
    const {defaultOpenKeys, defaultSelectedKeys} = this.state;
    const {menu} = this.props;
    this.getSelectKeys(menu);
    this.setState({
      menuItems: this.getMenus(menu)
    })
  }

  componentWillReceiveProps(nextProps) {
    const {menu}=nextProps
    const { defaultOpenKeys, defaultSelectedKeys} = this.state;
    this.getSelectKeys(menu);
    this.setState({
      menuItems: this.getMenus(menu)
    })
  }

  render() {
    const {defaultOpenKeys, defaultSelectedKeys, menuItems} = this.state;
    const {menu} = this.props;
    // this.getSelectKeys(menu);
    // const menuItems = this.getMenus(menu)
    return (
      <div className={styles.normal}>
        <Sider style={{overflow: 'auto', height: '100%'}} width={180}>
          <div className={styles.menuName}>
            远程协作
          </div>
          {
            menu.length > 0
              ? <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={defaultSelectedKeys }
              defaultOpenKeys={defaultOpenKeys}
              selectedKeys={defaultSelectedKeys }
              style={{height: '100%', borderRight: 0}}
            >
              {menuItems}
            </Menu>
              : null
          }
        </Sider>
        <Spin spinning={!menu.length > 0} tip="加载中" style={{position: "absolute", top: 150}}>
        </Spin>
      </div>
    );

  }
}
*/


export default SiderSec;
