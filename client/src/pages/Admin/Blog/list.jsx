import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Modal, Button } from 'antd';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axiosClient.get('blog');
      setBlogs(response.data.blogs);
    };

    fetchBlogs();
  }, []);

  const openEditForm = (blog) => {
    navigate(`/admin/blog/edit/${blog.id}`);
  };

  const showDeleteModal = (blogId) => {
    setSelectedBlogId(blogId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`blog/${selectedBlogId}`);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== selectedBlogId),
      );

      toast.success('Blog deleted successfully!');
    } catch (error) {
      toast.error('Error deleting blog!');
    } finally {
      setDeleteModalVisible(false);
      setSelectedBlogId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedBlogId(null);
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => (
        <img
          src={thumbnail}
          alt="thumbnail"
          style={{ width: '100px', height: '100px' }}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Date Create',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      render: (dateCreate) => new Date(dateCreate).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditForm(record)}>
            Edit
          </Button>
          <Button danger onClick={() => showDeleteModal(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={blogs} />

      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
    </>
  );
};
