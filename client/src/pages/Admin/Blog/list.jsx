import { Space, Table } from "antd";
// import { useOrders } from "../../../api/order";

export const BlogList = () => {
  // const { data } = useOrders()

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "images",
      dataIndex: "images",
      key: "images",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={[]} />;
};
