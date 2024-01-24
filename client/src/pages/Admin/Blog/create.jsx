import axiosClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { BlogForm } from './form';
import { toast } from 'react-toastify';

export const BlogCreate = () => {
  const navigate = useNavigate();
  const handleCreateBlog = async (values, editorData, file) => {
    const { code, title, description } = values;

    const blogData = new FormData();
    blogData.append('code', code);
    blogData.append('title', title);
    blogData.append('content', editorData);
    blogData.append('description', description);
    blogData.append('thumbnail', file[0]);

    try {
      await axiosClient.post('blog/create', blogData);
      toast.success('Blog created successfully!');
      navigate('/admin/blog/list');
    } catch (error) {
      toast.error('Blog created failed!');
    }
  };

  return (
    <div>
      <h1>Blog Create</h1>
      <BlogForm initialValues={{}} onSubmit={handleCreateBlog} />
    </div>
  );
};
