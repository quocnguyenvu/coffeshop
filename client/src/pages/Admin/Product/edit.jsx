import ProductCommonForm from './form';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  console.log("🚀 ~ productData:", productData)
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosClient.get(`product/${productId}`);
        console.log(response.data.product.categoryId);
        setProductData({
          code: response.data.product.code,
          name: response.data.product.name,
          description: response.data.product.description,
          categoryId: response.data.product.categoryId?.id,
          price: response.data.product.price,
          images: response.data.product.images,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

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

  const handleEditProduct = async (values, editorData, files, categoryId) => {
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
      await axiosClient.put(`product/${productId}`, data);
      toast.success('Product updated successfully!');
      navigate('/admin/product/list');
    } catch (error) {
      toast.error('Product updated failed!');
    }
  };
  return (
    <>
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <ProductCommonForm
          title="Edit Product"
          categories={categories}
          initialValues={productData}
          onSubmit={handleEditProduct}
        />
      )}
    </>
  );
};
