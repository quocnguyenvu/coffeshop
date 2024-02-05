import {
  UploadOutlined,
  UserOutlined,
  PicLeftOutlined,
  AppstoreOutlined,
  BlockOutlined,
  CreditCardOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme, Breadcrumb, Button } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Sider, Content } = Layout

export const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/verify`, {
        token
      })
      return response.data.isAuthenticated
    } catch (error) {
      return false
    }
  }

  const isAuth = useMemo(() => checkToken(), [])

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = await isAuth
      if (!authenticated) {
        navigate('/login')
      }
    }

    fetchData()
  }, [isAuth, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const breadcrumbs = pathSnippets.map((_, index) => ({
    title: pathSnippets[index]
  }))

  return isAuth ? (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          className="admin-logo"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 64,
            marginBottom: collapsed ? 0 : 16
          }}
        >
          <span style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{collapsed ? 'DAT' : 'DAT COFFEE'}</span>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/admin',
              icon: <UserOutlined />,
              label: 'Trang chủ'
            },
            {
              key: 'category',
              icon: <PicLeftOutlined />,
              label: 'Danh mục',
              children: [
                {
                  key: '/admin/category/list',
                  label: 'Danh sách danh mục'
                },
                {
                  key: '/admin/category/create',
                  label: 'Tạo danh mục'
                }
              ]
            },
            {
              key: 'product',
              icon: <AppstoreOutlined />,
              label: 'Sản phẩm',
              children: [
                {
                  key: '/admin/product/list',
                  label: 'Danh sách sản phẩm'
                },
                {
                  label: 'Tạo sản phẩm',
                  key: '/admin/product/create'
                }
              ]
            },
            {
              key: 'blog',
              icon: <BlockOutlined />,
              label: 'Bài viết',
              children: [
                {
                  label: 'Danh sách bài viết',
                  key: '/admin/blog/list'
                },
                {
                  label: 'Tạo bài viết',
                  key: '/admin/blog/create'
                }
              ]
            },
            {
              key: 'order',
              icon: <CreditCardOutlined />,
              label: 'Đơn hàng'
            },
            {
              key: 'Quản trị viên',
              icon: <UploadOutlined />,
              label: 'Người dùng',
              children: [
                {
                  key: '/admin/password/change',
                  label: 'Đổi mật khẩu'
                }
                // {
                //   key: '/admin/infomation',
                //   label: 'Thông tin cá nhân'
                // },
                // {
                //   key: '/admin/customer-interface',
                //   label: 'Giao diện khách hàng'
                // }
              ]
            }
          ]}
          mode="inline"
          theme="dark"
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout style={{ width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px' }}>
        <Content
          style={{
            margin: '0 16px',
            width: 'calc(100% - 32px)',
            overflow: 'auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Breadcrumb items={breadcrumbs} style={{ margin: '16px 0' }} />
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
              overflow: 'auto'
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
  )
}
