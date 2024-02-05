import { Spin, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CategoryCommonForm from './form'
import axiosClient from '../../../config/axios'

export const CategoryEdit = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosClient.get(`category/${categoryId}`)
        setCategory({
          name: response.data.category.name,
          description: response.data.category.description
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [categoryId])

  const handleEditCategory = async (values) => {
    const { name, description } = values

    try {
      await axiosClient.put(`category/${categoryId}`, {
        name,
        description
      })

      message.success('Chỉnh sửa danh mục thành công!')
      navigate('/admin/category/list')
    } catch (error) {
      message.error('Chỉnh sửa danh mục thất bại!')
    }
  }

  return (
    <>
      {loading ? (
        <Spin size="large" tip="Loading">
          <div className="content" />
        </Spin>
      ) : (
        <CategoryCommonForm initialValues={category} title="Chỉnh sửa danh mục" onSubmit={handleEditCategory} />
      )}
    </>
  )
}
