import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  PicLeftOutlined,
  AppstoreOutlined,
  BlockOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Breadcrumb, Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Footer } from 'antd/es/layout/layout';
import axios from 'axios';

const { Sider, Content } = Layout;

export const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/verify`,
        {
          token,
        },
      );
      return response.data.isAuthenticated;
    } catch (error) {
      return false;
    }
  };

  const isAuth = useMemo(() => checkToken(), []);

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = await isAuth;
      if (!authenticated) {
        navigate('/login');
      }
    };

    fetchData();
  }, [isAuth, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const breadcrumbs = pathSnippets.map((_, index) => {
    return {
      title: pathSnippets[index],
    };
  });

  return isAuth ? (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="admin-logo"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 64,
            marginBottom: collapsed ? 0 : 16,
          }}
        >
          <span style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            {collapsed ? 'DAT' : 'DAT COFFEE'}
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/admin',
              icon: <UserOutlined />,
              label: 'Trang chủ',
            },
            {
              key: 'category',
              icon: <PicLeftOutlined />,
              label: 'Danh mục',
              children: [
                {
                  key: '/admin/category/list',
                  label: 'Danh sách danh mục',
                },
                {
                  key: '/admin/category/create',
                  label: 'Tạo danh mục',
                },
              ],
            },
            {
              key: 'product',
              icon: <AppstoreOutlined />,
              label: 'Sản phẩm',
              children: [
                {
                  key: '/admin/product/list',
                  label: 'Danh sách sản phẩm',
                },
                {
                  label: 'Tạo sản phẩm',
                  key: '/admin/product/create',
                },
              ],
            },
            {
              key: 'blog',
              icon: <BlockOutlined />,
              label: 'Bài viết',
              children: [
                {
                  label: 'Danh sách bài viết',
                  key: '/admin/blog/list',
                },
                {
                  label: 'Tạo bài viết',
                  key: '/admin/blog/create',
                },
              ],
            },
            {
              key: 'order',
              icon: <CreditCardOutlined />,
              label: 'Đơn hàng',
            },
            // {
            //   key: 'content',
            //   icon: <CreditCardOutlined />,
            //   label: 'Giao diện',
            //   children: [
            //     {
            //       label: 'Nội dung hoạt động',
            //       key: '/admin/content/activity',
            //     },
            //   ],
            // },
            {
              key: 'user',
              icon: <UploadOutlined />,
              label: 'Đổi mật khẩu',
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbs} />
            <Button type="primary" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
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
