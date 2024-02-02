import { Space, Table, Modal, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import axiosClient from '../../../config/axios';
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
        message.error('Failed to fetch products!');
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
      message.success(
        'Product with ID ${selectedProductId} deleted successfully!',
      );
    } catch (error) {
      message.error('Failed to delete product!');
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
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Hình ảnh',
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
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (category) => category?.name,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      render: (dateCreate) => new Date(dateCreate).toLocaleString(),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => showDeleteModal(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          onClick={() => navigate('/admin/product/create')}
        >
          Tạo mới sản phẩm
        </Button>
      </div>

      <Table columns={columns} dataSource={products} />

      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn chắc chắn muốn xóa sản phẩm này ?</p>
      </Modal>
    </>
  );
};
