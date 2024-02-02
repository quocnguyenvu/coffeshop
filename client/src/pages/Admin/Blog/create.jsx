import axiosClient from '../../../config/axios'
import { useNavigate } from 'react-router-dom'
import { BlogCommonForm } from './form'
import { message } from 'antd'

export const BlogCreate = () => {
  const navigate = useNavigate()

  const handleCreateBlog = async (values, content, thumbnail) => {
    const { title, description } = values

    try {
      await axiosClient.post('blog/create', {
        title,
        description,
        content,
        thumbnail
      })
      message.success('Tạo mới bài viết thành công!')
      navigate('/admin/blog/list')
    } catch (error) {
      message.error('Tạo mới bài viết thất bại!')
    }
  }

  return <BlogCommonForm title="Tạo bài viết mới" initialValues={{}} onSubmit={handleCreateBlog} />
}
