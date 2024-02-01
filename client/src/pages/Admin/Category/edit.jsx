import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import CategoryCommonForm from './form';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

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
    const { name, description } = values;

    try {
      await axiosClient.put(`category/${categoryId}`, {
        name,
        description,
      });

      toast.success('Category edited successfully!');
      navigate('/admin/category/list');
    } catch (error) {
      toast.error('Category edited failed!');
    }
  };

  return (
    <>
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <CategoryCommonForm
          title="Edit Category"
          initialValues={category}
          onSubmit={handleEditCategory}
        />
      )}
    </>
  );
};
