import { Space, Table, Modal, Button } from 'antd';
import { useState, useEffect } from 'react';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get('product');
        setProducts(response.data.products);
      } catch (error) {
        toast.error('Failed to fetch products!');
      }
    };

    fetchProducts();
  }, []);

  const showDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModalVisible(true);
  };

  const handleEdit = (productId) => {
    navigate(`/admin/product/edit/${productId}`);
  };
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`product/${selectedProductId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProductId),
      );
      toast.success(
        'Product with ID ${selectedProductId} deleted successfully!',
      );
    } catch (error) {
      toast.error('Failed to delete product!');
    } finally {
      setDeleteModalVisible(false);
      setSelectedProductId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedProductId(null);
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <img
          src={images[0]}
          alt="product"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (category) => category?.name,
    },
    {
      title: 'Date Create',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      render: (dateCreate) => new Date(dateCreate).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button danger onClick={() => showDeleteModal(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={products} />

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </>
  );
};
