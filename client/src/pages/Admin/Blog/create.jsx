import { useState } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../api/axios';

export const BlogCreate = () => {
  const [file, setFile] = useState();

  const handleCreateBlog = async (values) => {
    const { code, title, content, description } = values;

    const blogData = new FormData();
    blogData.append('code', code);
    blogData.append('title', title);
    blogData.append('content', content);
    blogData.append('description', description);
    blogData.append('thumbnail', file[0]);

    try {
      const response = await axiosClient.post('blog/create', blogData);

      console.log('Blog created successfully!', response.data);
    } catch (error) {
      console.error('Error creating Blog:', error);
    }
  };

  return (
    <div>
      <h1>Blog Create</h1>
      <Form
        style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
        name="vertical"
        layout="vertical"
        onFinish={handleCreateBlog}
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
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!',
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

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: 'Please input your content!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please input your image!',
            },
          ]}
        >
         <input
            type="file"
            name="images"
            onChange={(evt) => setFile(evt.target.files)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
