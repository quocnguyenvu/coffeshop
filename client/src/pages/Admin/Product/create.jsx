import ProductCommonForm from './form';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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

  const handleCreateProduct = async (values, editorData, files, categoryId) => {
    const { code, name, price } = values;
    const data = new FormData();

    data.append('code', code);
    data.append('name', name);
    data.append('description', editorData);
    data.append('price', price);
    data.append('categoryId', categoryId);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append('images', files[i]);
      }
    }

    try {
      await axiosClient.post('product/create', data);
      toast.success('Product created successfully!');
      navigate('/admin/product/list');
    } catch (error) {
      toast.error('Product created failed!');
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
