import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogCommonForm } from './form';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

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
      toast.success('Blog updated successfully!');
      navigate('/admin/blog/list');
    } catch (error) {
      toast.error('Blog updated failed!');
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
          title="Blog Edit"
          initialValues={blogData}
          onSubmit={handleEditBlog}
        />
      )}
    </>
  );
};
