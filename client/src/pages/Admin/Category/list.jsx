import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table } from 'antd';
import axiosClient from '../../../api/axios';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosClient.get('category');
      setCategories(response.data.categories);
    };

    fetchCategories();
  }, []);

  const openEditForm = (category) => {
    navigate(`/admin/category/edit/${category.id}`);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axiosClient.delete(`category/${categoryId}`);

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId),
      );

      console.log('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openEditForm(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={categories} />;
};
