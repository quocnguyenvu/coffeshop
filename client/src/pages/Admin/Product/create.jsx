import ProductCommonForm from './form';
import axiosClient from '../../../config/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const ProductCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosClient.get('category');
      setCategories(
        response.data.categories.map((category) => {
          return {
            value: category.id,
            label: category.name,
          };
        }),
      );
    };

    fetchCategories();
  }, []);

  const handleCreateProduct = async (
    values,
    description,
    images,
    categoryId,
  ) => {
    const { code, name, price } = values;

    try {
      await axiosClient.post('product/create', {
        code,
        name,
        description,
        price,
        categoryId,
        images,
      });

      message.success('Product created successfully!');
      navigate('/admin/product/list');
    } catch (error) {
      message.error('Product created failed!');
    }
  };
  return (
    <ProductCommonForm
      title="Create Product"
      categories={categories}
      initialValues={{}}
      onSubmit={handleCreateProduct}
    />
  );
};
