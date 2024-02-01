import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../config/axios';
import CategoryCommonForm from './form';
import { message } from 'antd';

export const CategoryCreate = () => {
  const navigate = useNavigate();

  const handleCreateCategory = async (values) => {
    const { name, description } = values;

    try {
      await axiosClient.post('category/create', {
        name,
        description,
      });

      message.success('Category created successfully!');
      navigate('/admin/category/list');
    } catch (error) {
      message.error('Category created failed!');
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
