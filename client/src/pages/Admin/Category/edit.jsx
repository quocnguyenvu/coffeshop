// CategoryEdit.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import CategoryCommonForm from './Form';

export const CategoryEdit = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosClient.get(`category/${categoryId}`);
        setCategory({
          code: response.data.category.code,
          name: response.data.category.name,
          description: response.data.category.description,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleEditCategory = async (values) => {
    const { code, name, description } = values;
    const data = new FormData();

    data.append('code', code);
    data.append('name', name);
    data.append('description', description);

    try {
      const response = await axiosClient.put(`category/${categoryId}`, data);
      console.log('🚀 ~ response:', response);
      navigate('/admin/category/list');
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  return (
    <div>
      <h1>Edit Category</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CategoryCommonForm initialValues={category} onSubmit={handleEditCategory} />
      )}
    </div>
  );
};
