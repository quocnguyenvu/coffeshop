import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table } from 'antd';
import axiosClient from '../../../api/axios';

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axiosClient.get('blog');
      console.log("🚀 ~ response:", response)
      setBlogs(response.data.blogs);
    };

    fetchBlogs();
  }, []);

  const openEditForm = (blog) => {
    navigate(`/admin/blog/edit/${blog.id}`);
  };

  const handleDelete = async (blogId) => {
    try {
      await axiosClient.delete(`blog/${blogId}`);

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogId),
      );

      console.log('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
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
          <a onClick={() => openEditForm(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={blogs} />;
};
