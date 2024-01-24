import ProductCommonForm from './form';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export const ProductCreate = () => {
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

  const handleCreateCategory = async (
    values,
    editorData,
    files,
    categoryId,
  ) => {
    const { code, name, price } = values;
    const data = new FormData();

    data.append('code', code);
    data.append('name', name);
    data.append('description', editorData);
    data.append('price', price);
    data.append('categoryId', categoryId);

    if (files) {
      data.append('images', files);
    }

    try {
      await axiosClient.post('product/create', data);
      toast.success('Product created successfully!');
    } catch (error) {
      toast.error('Product created failed!');
    }
  };
  return (
    <div>
      <h1>Product Create</h1>
      <ProductCommonForm
        categories={categories}
        initialValues={{}}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
};
