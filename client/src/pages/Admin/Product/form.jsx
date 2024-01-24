import { Form, Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CKEditorComponent from '../../../components/CKeditor';

const ProductCommonForm = ({ initialValues, categories, onSubmit }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [categoryId, setCategoryId] = useState(
    initialValues?.categoryId || 'Select category',
  );

  const [editorData, setEditorData] = useState(initialValues?.content || '');

  const handleEditorDataChange = (newData) => {
    setEditorData(newData);
  };

  const handleFormSubmit = async (values) => {
    try {
      await onSubmit(values, editorData, file, categoryId);
      navigate('/admin/product/list');
    } catch (error) {
      console.error('Error submitting Product form:', error);
    }
  };

  return (
    <Form
      style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
      initialValues={initialValues}
      onFinish={handleFormSubmit}
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
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input your price!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryId"
        rules={[
          {
            required: true,
            message: 'Please select your category!',
          },
        ]}
      >
        <Select
          defaultValue={categoryId}
          style={{ width: 120 }}
          onChange={(value) => setCategoryId(value)}
          options={categories}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <CKEditorComponent
          data={editorData}
          onDataChange={handleEditorDataChange}
        />
      </Form.Item>

      <Form.Item
        label="Thumbnail"
        name="thumbnail"
        rules={[
          {
            required: true,
            message: 'Please input your Thumbnail!',
          },
        ]}
      >
        {initialValues.thumbnail && (
          <img
            src={initialValues.thumbnail}
            alt="thumbnail"
            style={{ width: '100px', height: '100px' }}
          />
        )}
        <input
          type="file"
          name="images"
          multiple
          onChange={(evt) => setFile(evt.target.files)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductCommonForm;

ProductCommonForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
