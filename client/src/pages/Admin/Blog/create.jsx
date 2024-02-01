import axiosClient from '../../../config/axios';
import { useNavigate } from 'react-router-dom';
import { BlogCommonForm } from './form';
import { message } from 'antd';

export const BlogCreate = () => {
  const navigate = useNavigate();

  const handleCreateBlog = async (values, content, thumbnail) => {
    const { title, description } = values;

    try {
      await axiosClient.post('blog/create', {
        title,
        description,
        content,
        thumbnail,
      });
      message.success('Blog created successfully!');
      navigate('/admin/blog/list');
    } catch (error) {
      message.error('Blog created failed!');
    }
  };

  return (
    <BlogCommonForm
      title="Blog Create"
      initialValues={{}}
      onSubmit={handleCreateBlog}
    />
  );
};
