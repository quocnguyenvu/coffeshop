import { Space, Table, Modal, Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosClient from '../../../config/axios'

export const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosClient.get('category')
      setCategories(response.data.categories)
    }

    fetchCategories()
  }, [])

  const openEditForm = (category) => {
    navigate(`/admin/category/edit/${category.id}`)
  }

  const showDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setDeleteModalVisible(true)
  }

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`category/${selectedCategoryId}`)

      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== selectedCategoryId))

      message.success('Category deleted successfully!')
    } catch (error) {
      message.error('Failed to delete category!')
    } finally {
      setDeleteModalVisible(false)
      setSelectedCategoryId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalVisible(false)
    setSelectedCategoryId(null)
  }

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreated',
      key: 'dateCreated'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditForm(record)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => showDeleteModal(record.id)}>
            Xóa
          </Button>
        </Space>
      )
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={() => navigate('/admin/category/create')}>
          Tạo mới danh mục
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} />

      <Modal
        cancelText="Hủy"
        okText="Xóa"
        open={deleteModalVisible}
        title="Xác nhận xóa"
        onCancel={handleCancelDelete}
        onOk={handleDelete}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
      </Modal>
    </>
  )
}
