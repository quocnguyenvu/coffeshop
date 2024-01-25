import axiosClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { BlogForm } from './form';
import { toast } from 'react-toastify';

export const BlogCreate = () => {
  const navigate = useNavigate();

  const handleCreateBlog = async (values, content, thumbnail) => {
    console.log("🚀 ~ thumbnail:", thumbnail)
    const { code, title, description } = values;

    try {
      await axiosClient.post('blog/create', {
        code,
        title,
        description,
        content,
        thumbnail,
      });
      toast.success('Blog created successfully!');
      navigate('/admin/blog/list');
    } catch (error) {
      toast.error('Blog created failed!');
    }
  };

  return (
    <BlogForm
      title="Blog Create"
      initialValues={{}}
      onSubmit={handleCreateBlog}
    />
  );
};
