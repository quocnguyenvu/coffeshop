import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import CKEditorComponent from '../../../components/CKeditor';
import PropTypes from 'prop-types';
import CloudinarySingleUploader from '../../../components/CloudinarySingleUploader';

export const BlogForm = ({ title, initialValues, onSubmit }) => {
  const [thumbnail, setThumbnail] = useState(
    initialValues?.thumbnail ? initialValues.thumbnail : null,
  );
  const [content, setContent] = useState(initialValues?.content || '');

  useEffect(() => {
    setContent(initialValues?.content || '');
  }, [initialValues]);


  const handleFormSubmit = async (values) => {
    try {
      await onSubmit(values, content, thumbnail);
    } catch (error) {
      console.error('Error submitting Blog form:', error);
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          paddingBottom: 30,
          marginBottom: 30,
          borderBottom: '1px solid #eee',
        }}
      >
        <h1>{title}</h1>
      </div>
      <Form
        style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
        layout="vertical"
        onFinish={handleFormSubmit}
        autoComplete="off"
        initialValues={initialValues}
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
          rules={[
            {
              required: true,
              message: 'Please input your content!',
            },
          ]}
        >
          <CKEditorComponent
            data={content}
            onDataChange={(newData) => setContent(newData)}
          />
        </Form.Item>

        <Form.Item label="Thumbnail" name="thumbnail">
          <CloudinarySingleUploader image={thumbnail} setImage={setThumbnail} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
