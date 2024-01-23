import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import CategoryCommonForm from './Form';

export const CategoryCreate = () => {
  const navigate = useNavigate();

  const handleCreateCategory = async (values) => {
    const { code, name, description } = values;
    const data = new FormData();

    data.append('code', code);
    data.append('name', name);
    data.append('description', description);

    try {
      const response = await axiosClient.post('category/create', data);
      console.log("🚀 ~ response:", response);
      navigate('/admin/category/list');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <h1>Category Create</h1>
      <CategoryCommonForm initialValues={{}} onSubmit={handleCreateCategory} />
    </div>
  );
};
