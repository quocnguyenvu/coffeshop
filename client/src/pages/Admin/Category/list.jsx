import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Modal, Button } from 'antd';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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

  const showDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`category/${selectedCategoryId}`);

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== selectedCategoryId),
      );

      toast.success('Category deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete category!');
    } finally {
      setDeleteModalVisible(false);
      setSelectedCategoryId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedCategoryId(null);
  };

  const columns = [
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
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditForm(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteModal(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button type="primary" onClick={() => navigate('/admin/category/create')}>
          Create Category
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} />

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </>
  );
};
