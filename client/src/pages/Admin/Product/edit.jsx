import ProductCommonForm from './form';
import axiosClient from '../../../config/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosClient.get(`product/${productId}`);

        setProductData({
          code: response.data.product.code,
          name: response.data.product.name,
          description: response.data.product.description,
          categoryId: response.data.product.categoryId?._id,
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

  const handleEditProduct = async (values, description, images, categoryId) => {
    const { code, name, price } = values;

    try {
      await axiosClient.put(`product/${productId}`, {
        code,
        name,
        description,
        price,
        categoryId,
        images,
      });

      message.success('Product updated successfully!');
      navigate('/admin/product/list');
    } catch (error) {
      message.error('Product updated failed!');
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
