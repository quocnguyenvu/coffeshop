import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { useState } from 'react'

import CloudinarySingleUploader from '@components/CloudinarySingleUploader'

export const Activity = () => {
  const [thumbnail, setThumbnail] = useState(null)
  const onFinish = (values) => {
    console.log('Received values of form:', values)
  }

  return (
    <Form
      autoComplete="off"
      name="dynamic_form_nest_item"
      style={{
        maxWidth: 600
      }}
      onFinish={onFinish}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                align="baseline"
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8
                }}
              >
                <Form.Item {...restField} label="Nội dung" name={[name, 'content']}>
                  <Input placeholder="Nhập nội dung" />
                </Form.Item>
                <Form.Item {...restField} label="Hình ảnh">
                  <CloudinarySingleUploader image={thumbnail} setImage={setThumbnail} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button block icon={<PlusOutlined />} type="dashed" onClick={() => add()}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
