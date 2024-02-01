import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import CategoryCommonForm from './form';
import { toast } from 'react-toastify';

export const CategoryCreate = () => {
  const navigate = useNavigate();

  const handleCreateCategory = async (values) => {
    const { name, description } = values;

    try {
      await axiosClient.post('category/create', {
        name,
        description,
      });

      toast.success('Category created successfully!');
      navigate('/admin/category/list');
    } catch (error) {
      toast.error('Category created failed!');
    }
  };

  return (
    <CategoryCommonForm
      title="Category Create"
      initialValues={{}}
      onSubmit={handleCreateCategory}
    />
  );
};
