import { Form, Input, Button, message } from 'antd'
import axiosClient from '../../../config/axios'
import { Title } from '../../../components/Title'

export const User = () => {
  const onFinish = async (values) => {
    try {
      await axiosClient.put('/change-password', values)
      message.success('Thay đổi mật khẩu thành công!')
    } catch (error) {
      message.error('Thay đổi mật khẩu thất bại!')
    }
  }

  return (
    <>
      <Title title="Thay đổi mật khẩu" />
      <Form
        name="change-password"
        layout="vertical"
        style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu cũ!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu mới"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu mới!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('The two passwords do not match!')
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thay đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
