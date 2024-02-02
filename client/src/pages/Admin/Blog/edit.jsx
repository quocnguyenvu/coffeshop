import { useEffect, useState } from 'react';
import axiosClient from '../../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogCommonForm } from './form';
import { Spin, message } from 'antd';

export const BlogEdit = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axiosClient.get(`blog/${blogId}`);
        setBlogData({
          title: response.data.blog.title,
          description: response.data.blog.description,
          content: response.data.blog.content,
          thumbnail: response.data.blog.thumbnail,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleEditBlog = async (values, content, thumbnail) => {
    const { title, description } = values;

    try {
      await axiosClient.put(`blog/${blogId}`, {
        title,
        description,
        content,
        thumbnail,
      });
      message.success('Chỉnh sửa bài viết thành công!');
      navigate('/admin/blog/list');
    } catch (error) {
      message.error('Chỉnh sửa bài viết thất bại!');
    }
  };

  return (
    <>
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <BlogCommonForm
          title="Chỉnh sửa bài viết"
          initialValues={blogData}
          onSubmit={handleEditBlog}
        />
      )}
    </>
  );
};
