import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import axiosClient from "../../../api/axios";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosClient.get("category");

      setCategories(response.data.categories);
    };

    fetchCategories();

  }, []);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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

  return <Table columns={columns} dataSource={categories} />;
};
