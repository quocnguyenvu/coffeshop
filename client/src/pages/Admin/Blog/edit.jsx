// BlogEdit.js
import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogForm } from './form';

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
          code: response.data.blog.code,
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

  const handleEditBlog = async (values, editorData, file) => {
    const { code, title, description } = values;

    const updatedBlogData = new FormData();
    updatedBlogData.append('code', code);
    updatedBlogData.append('title', title);
    updatedBlogData.append('content', editorData);
    updatedBlogData.append('description', description);

    if (file) {
      updatedBlogData.append('thumbnail', file[0]);
    }

    try {
      await axiosClient.put(`blog/${blogId}`, updatedBlogData);
      navigate('/admin/blog/list');
    } catch (error) {
      console.error('Error updating Blog:', error);
    }
  };

  return (
    <div>
      <h1>Blog Edit</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BlogForm initialValues={blogData} onSubmit={handleEditBlog} />
      )}
    </div>
  );
};
