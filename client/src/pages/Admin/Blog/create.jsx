import axiosClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { BlogCommonForm } from './form';
import { toast } from 'react-toastify';

export const BlogCreate = () => {
  const navigate = useNavigate();

  const handleCreateBlog = async (values, content, thumbnail) => {
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
    <BlogCommonForm
      title="Blog Create"
      initialValues={{}}
      onSubmit={handleCreateBlog}
    />
  );
};
