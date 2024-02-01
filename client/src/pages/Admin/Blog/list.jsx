import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Modal, Button, message } from 'antd';
import axiosClient from '../../../config/axios';

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

      message.success('Blog deleted successfully!');
    } catch (error) {
      message.error('Error deleting blog!');
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
      title: 'Hình ảnh',
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
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      render: (dateCreate) => new Date(dateCreate).toLocaleString(),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditForm(record)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => showDeleteModal(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={() => navigate('/admin/blog/create')}>
          Tạo mới bài viết
        </Button>
      </div>
      <Table columns={columns} dataSource={blogs} />

      <Modal
        title="Xác nhận xóa bài viết"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
      </Modal>
    </>
  );
};
