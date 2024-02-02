import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { Title } from '@components/Title'

const CategoryCommonForm = ({ title, initialValues, onSubmit }) => {
  return (
    <>
      <Title title={title} />
      <Form
        style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
        initialValues={initialValues}
        onFinish={onSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh mục!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {title}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CategoryCommonForm

CategoryCommonForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}
