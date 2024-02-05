import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ProductCommonForm from './form'
import axiosClient from '../../../config/axios'

export const ProductCreate = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosClient.get('category')
      setCategories(
        response.data.categories.map((category) => ({
          value: category.id,
          label: category.name
        }))
      )
    }

    fetchCategories()
  }, [])

  const handleCreateProduct = async (values, description, images, categoryId) => {
    const { code, name, price } = values

    try {
      await axiosClient.post('product/create', {
        code,
        name,
        description,
        price,
        categoryId,
        images
      })

      message.success('Tạo sản phẩm thành công!')
      navigate('/admin/product/list')
    } catch (error) {
      message.error('Tạo sản phẩm thất bại!')
    }
  }
  return <ProductCommonForm categories={categories} initialValues={{}} title="Tạo sản phẩm mới" onSubmit={handleCreateProduct} />
}
