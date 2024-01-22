import axiosClient from '../../../api/axios';
import { Button, Form, Input } from 'antd';

export const CategoryCreate = () => {
  const handleCreateCategory = async (values) => {
    try {
      const response = await axiosClient.post('category/create', values);

      console.log('Category created successfully!', response.data);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <Form
      style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
      name="vertical"
      layout="vertical"
      onFinish={handleCreateCategory}
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
        label="Category Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your category name!',
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
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
