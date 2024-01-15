import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const adminMenu = [
  {
    key: "dashboard",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  {
    key: "category",
    icon: <VideoCameraOutlined />,
    label: "Category",
    children: [
      {
        key: "category-list",
        label: "Category List",
      },
      {
        key: "category-create",
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
        key: "product-list",
        label: "Product List",
      },
      {
        key: "product-create",
        label: "Create Product",
      },
    ],
  },
  {
    key: "blog",
    icon: <UploadOutlined />,
    label: "Blog",
    children: [
      {
        key: "blog-list",
        label: "Blog List",
      },
      {
        key: "blog-create",
        label: "Create Blog",
      },
    ],
  },
  {
    key: "order",
    icon: <UploadOutlined />,
    label: "Order",
    children: [
      {
        key: "order-list",
        label: "Order List",
      },
    ],
  },
]

export default adminMenu;
