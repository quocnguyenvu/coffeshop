import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import CloudinarySingleUploader from '../../../components/CloudinarySingleUploader';
import { useState } from 'react';

export const Activity = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'content']}
                  label="Nội dung"
                >
                  <Input placeholder="Nhập nội dung" />
                </Form.Item>
                <Form.Item {...restField} label="Hình ảnh">
                  <CloudinarySingleUploader
                    image={thumbnail}
                    setImage={setThumbnail}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
