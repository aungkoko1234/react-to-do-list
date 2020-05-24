import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
class Header extends PureComponent {
    render() {
        return (
            <Layout className="layout">
            <Layout.Header>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
              </Menu>
            </Layout.Header>
            </Layout>
        );
    }
}

export default Header;