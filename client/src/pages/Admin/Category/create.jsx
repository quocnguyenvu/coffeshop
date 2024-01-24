import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import CategoryCommonForm from './Form';
import { toast } from 'react-toastify';

export const CategoryCreate = () => {
  const navigate = useNavigate();

  const handleCreateCategory = async (values) => {
    const { code, name, description } = values;
    const data = new FormData();

    data.append('code', code);
    data.append('name', name);
    data.append('description', description);

    try {
      await axiosClient.post('category/create', data);
      toast.success('Category created successfully!');
      navigate('/admin/category/list');
    } catch (error) {
      toast.error('Category created failed!');
    }
  };

  return (
    <div>
      <h1>Category Create</h1>
      <CategoryCommonForm initialValues={{}} onSubmit={handleCreateCategory} />
    </div>
  );
};
