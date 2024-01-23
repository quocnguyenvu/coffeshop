import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const CategoryCommonForm = ({ initialValues, onSubmit }) => {
  return (
    <Form
      style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="Code"
        name="code"
        rules={[
          {
            required: true,
            message: 'Please input your code!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryCommonForm;

CategoryCommonForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
