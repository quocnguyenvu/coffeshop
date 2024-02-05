import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import { Title } from '@components/Title'

const CategoryCommonForm = ({ title, initialValues, onSubmit }) => (
  <>
    <Title title={title} />
    <Form
      autoComplete="off"
      initialValues={initialValues}
      layout="vertical"
      style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
      onFinish={onSubmit}
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
        <Button htmlType="submit" type="primary">
          {title}
        </Button>
      </Form.Item>
    </Form>
  </>
)

export default CategoryCommonForm

CategoryCommonForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
