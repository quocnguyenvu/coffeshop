import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import CKEditorComponent from '../../../components/CKeditor';
import PropTypes from 'prop-types';
import CloudinarySingleUploader from '../../../components/CloudinarySingleUploader';

export const BlogForm = ({ title, initialValues, onSubmit }) => {
  const [image, setImage] = useState(
    initialValues?.thumbnail ? initialValues.thumbnail : null,
  );
  const [editorData, setEditorData] = useState(initialValues?.content || '');

  useEffect(() => {
    setEditorData(initialValues?.content || '');
  }, [initialValues]);

  const handleEditorDataChange = (newData) => {
    setEditorData(newData);
  };

  const handleFormSubmit = async (values) => {
    try {
      await onSubmit(values, editorData, image);
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
            data={editorData}
            onDataChange={handleEditorDataChange}
          />
        </Form.Item>

        <Form.Item label="Thumbnail" name="thumbnail">
          <CloudinarySingleUploader image={image} setImage={setImage} />
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
