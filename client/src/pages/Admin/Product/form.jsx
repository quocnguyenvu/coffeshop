import { Form, Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CKEditorComponent from '../../../components/CKeditor';

const ProductCommonForm = ({ title, initialValues, categories, onSubmit }) => {
  const [file, setFile] = useState();
  const [categoryId, setCategoryId] = useState(
    initialValues?.categoryId || null,
  );

  const [editorData, setEditorData] = useState(
    initialValues?.description || '',
  );

  const handleEditorDataChange = (newData) => {
    setEditorData(newData);
  };

  const handleFormSubmit = async (values) => {
    try {
      await onSubmit(values, editorData, file, categoryId);
    } catch (error) {
      console.error('Error submitting Product form:', error);
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
        >
          <Select
            defaultValue={categoryId}
            style={{ width: '100%' }}
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
        >
          {initialValues.images?.length > 0 && (
            <img
              src={initialValues.images[0]}
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
    </>
  );
};

export default ProductCommonForm;

ProductCommonForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
