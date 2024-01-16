import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Breadcrumb } from "antd";
import { useState } from "react";
import { Footer } from "antd/es/layout/layout";
const { Header, Sider, Content } = Layout;

export const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let isAuth = false;
  const userInfo = JSON.parse(localStorage.getItem("token"));

  if (userInfo && userInfo.phoneNumber) {
    if (userInfo.role !== "admin") {
      isAuth = true
    }
  }

  return isAuth ? (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/admin",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "category",
              icon: <VideoCameraOutlined />,
              label: "Category",
              children: [
                {
                  key: "/admin/category/list",
                  label: "Category List",
                },
                {
                  key: "/admin/category/create",
                  label: "Create Category",
                },
              ],
            },
            {
              key: "product",
              icon: <UploadOutlined />,
              label: "Product",
              children: [
                {
                  key: "/admin/product/list",
                  label: "Product List",
                },
                {
                  label: "Create Product",
                  key: "/admin/product/create",
                },
              ],
            },
            {
              key: "blog",
              icon: <UploadOutlined />,
              label: "Blog",
              children: [
                {
                  label: "Blog List",
                  key: "/admin/blog/list",
                },
                {
                  label: "Create Blog",
                  key: "/admin/blog/create",
                },
              ],
            },
            {
              key: "order",
              icon: <UploadOutlined />,
              label: "Order",
              children: [
                {
                  label: "Order List",
                  key: "/admin/order/list",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout
        style={{ width: collapsed ? "calc(100% - 80px)" : "calc(100% - 200px" }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 80,
            width: "100%",
          }}
        />
        <Content
          style={{
            margin: "0 16px",
            width: "calc(100% - 32px)",
            overflow: "auto",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", height: 60, width: "100%" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
