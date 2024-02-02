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

      message.success('Tạo mới danh mục thành công!');
      navigate('/admin/category/list');
    } catch (error) {
      message.error('Tạo mới danh mục thất bại!');
    }
  };

  return (
    <CategoryCommonForm
      title="Tạo danh mục mới"
      initialValues={{}}
      onSubmit={handleCreateCategory}
    />
  );
};
