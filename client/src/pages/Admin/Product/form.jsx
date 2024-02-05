import { Form, Input, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { useState } from 'react'

import CKEditorComponent from '@components/CKeditor'
import CloudinaryMultipleUploader from '@components/CloudinaryMultipleUploader'
import { Title } from '@components/Title'

const ProductCommonForm = ({ title, initialValues, categories, onSubmit }) => {
  const [images, setImages] = useState(initialValues?.images || [])

  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || null)

  const [description, setDescription] = useState(initialValues?.description || '')

  const handleFormSubmit = async (values) => {
    try {
      await onSubmit(values, description, images, categoryId)
    } catch (error) {
      console.error('Error submitting Product form:', error)
    }
  }

  return (
    <>
      <Title title={title} />
      <Form
        autoComplete="off"
        initialValues={initialValues}
        layout="vertical"
        style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="Mã sản phẩm"
          name="code"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã sản phẩm!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên sản phẩm!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá sản phẩm!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Danh mục" name="categoryId">
          <Select
            defaultValue={categoryId}
            options={categories}
            style={{ width: '100%' }}
            onChange={(value) => setCategoryId(value)}
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả sản phẩm!'
            }
          ]}
        >
          <CKEditorComponent data={description} onDataChange={(newData) => setDescription(newData)} />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="thumbnail">
          <CloudinaryMultipleUploader multiple images={images} setImages={setImages} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            {title}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ProductCommonForm

ProductCommonForm.propTypes = {
  categories: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
