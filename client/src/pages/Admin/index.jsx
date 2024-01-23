import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Breadcrumb } from 'antd';
import { useMemo, useState } from 'react';
import { Footer } from 'antd/es/layout/layout';

const { Sider, Content } = Layout;

export const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const isTokenExpired = () => {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     try {
  //       const decodedToken = decode(token);

  //       return decodedToken.exp < Date.now() / 1000;
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       return true;
  //     }
  //   }

  //   return true; // Token does not exist
  // };

  const isAuth = useMemo(() => {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }, []);

  return isAuth ? (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/admin',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: 'category',
              icon: <VideoCameraOutlined />,
              label: 'Category',
              children: [
                {
                  key: '/admin/category/list',
                  label: 'Category List',
                },
                {
                  key: '/admin/category/create',
                  label: 'Create Category',
                },
              ],
            },
            {
              key: 'product',
              icon: <UploadOutlined />,
              label: 'Product',
              children: [
                {
                  key: '/admin/product/list',
                  label: 'Product List',
                },
                {
                  label: 'Create Product',
                  key: '/admin/product/create',
                },
              ],
            },
            {
              key: 'blog',
              icon: <UploadOutlined />,
              label: 'Blog',
              children: [
                {
                  label: 'Blog List',
                  key: '/admin/blog/list',
                },
                {
                  label: 'Create Blog',
                  key: '/admin/blog/create',
                },
              ],
            },
            {
              key: 'order',
              icon: <UploadOutlined />,
              label: 'Order',
              children: [
                {
                  label: 'Order List',
                  key: '/admin/order/list',
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout
        style={{ width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px' }}
      >
        <Content
          style={{
            margin: '0 16px',
            width: 'calc(100% - 32px)',
            overflow: 'auto',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            {pathSnippets.map((snippet, index) => {
              const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
              return <Breadcrumb.Item key={url}>{snippet}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', height: 60, width: '100%' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
