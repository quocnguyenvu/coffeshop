import { Button, Divider, Form, Input, Radio, Space, message } from 'antd'
import axios from 'axios'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { PageBanner } from '@components/PageBanner'

import { API_USER_URL } from '../../../constants'
import { formattedPrice } from '../../../helper'
const { TextArea } = Input

import './CheckoutPage.scss'

export const CheckoutPage = () => {
  const location = useLocation()
  const { cartData } = location.state
  const [form] = Form.useForm()
  const total = cartData.reduce((total, item) => total + item.amount, 0)

  const [loading, setLoading] = useState(false)
  const [shipMethod, setShipMethod] = useState('save')
  const [paymentMethod, setpaymentMethod] = useState('cod')

  const shippingFee = useMemo(() => {
    if ('save' === shipMethod && 'cod' === paymentMethod) {
      return 30000
    } else if ('save' === shipMethod && 'atm' === paymentMethod) {
      return 30000
    } else if ('fast' === shipMethod && 'cod' === paymentMethod) {
      return 40000
    } else if ('fast' === shipMethod && 'atm' === paymentMethod) {
      return 40000
    }
    return 0
  }, [shipMethod, paymentMethod])

  const onFinish = async (values) => {
    const billData = {
      ...values,
      amount: total + shippingFee,
      products: cartData.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price
      }))
    }

    try {
      setLoading(true)
      await axios.post(`${API_USER_URL}/order`, billData)
      message.success('Đặt hàng thành công')
    } catch (error) {
      console.error('Error creating bill:', error)
      message.error('Đặt hàng thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBanner title="THANH TOÁN ĐƠN HÀNG" />
      <section id="checkout">
        <Container>
          <Form
            form={form}
            initialValues={{
              shipMethod: 'fast',
              paymentMethod: 'cod'
            }}
            layout="vertical"
            name="control-hooks"
            style={{ width: '100%' }}
            onFinish={onFinish}
          >
            <div className="checkout_wrapper">
              <article className="checkout_info">
                <div className="checkout_form">
                  <div className="user-info">
                    <Form.Item
                      label="Họ và tên"
                      name="customerName"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập họ và tên!'
                        }
                      ]}
                    >
                      <Input placeholder="Nguyễn Văn A" />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại nhận hàng"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!'
                        }
                      ]}
                    >
                      <Input placeholder="0123456789" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input placeholder="nguyenvana@gmail.com" />
                    </Form.Item>
                    <Form.Item
                      label="Địa chỉ nhận hàng"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập địa chỉ!'
                        }
                      ]}
                    >
                      <Input placeholder="15 Tôn Đản, Mỹ Khê, Ngũ Hành Sơn, Đà Nẵng" />
                    </Form.Item>
                    <Form.Item label="Ghi chú" name="note">
                      <TextArea placeholder="Ghi chú" rows={4} />
                    </Form.Item>
                  </div>
                  <div className="payment-info">
                    <Form.Item label="Phương thức vận chuyển" name="shipMethod">
                      <Radio.Group onChange={(e) => setShipMethod(e.target.value)}>
                        <Space direction="vertical">
                          <Radio value="save">Giao hàng tiết kiệm</Radio>
                          <Radio value="fast">Giao hàng nhanh</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {'save' === shipMethod && (
                      <div className="payment-info-atm">
                        <p>Thời gian giao hàng dự kiến từ 3 - 5 ngày kể từ khi đặt hàng.</p>
                      </div>
                    )}
                    {'fast' === shipMethod && (
                      <div className="payment-info-atm">
                        <p>Thời gian giao hàng dự kiến từ 1 - 2 ngày kể từ khi đặt hàng.</p>
                      </div>
                    )}
                    <Divider />
                    <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                      <Radio.Group onChange={(e) => setpaymentMethod(e.target.value)}>
                        <Space direction="vertical">
                          <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                          <Radio value="atm">Chuyển khoản ngân hàng</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    {'cod' === paymentMethod && (
                      <div className="payment-info-atm">
                        <p>Bạn vui lòng chuẩn bị đủ tiền để thanh toán cho nhân viên giao hàng.</p>
                      </div>
                    )}
                    {'atm' === paymentMethod && (
                      <div className="payment-info-atm">
                        <p>Bạn vui lòng chuyển khoản cho chúng tôi theo thông tin dưới đây:</p>
                        <p>
                          Ngân hàng: <b>Vietcombank</b>
                        </p>
                        <p>
                          Số tài khoản: <b>123456789</b>
                        </p>
                        <p>
                          Chủ tài khoản: <b>Nguyen Van A</b>
                        </p>
                        <p>
                          Nội dung chuyển khoản: <b>[Số điện thoại] - [Họ và tên]</b>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
              <article className="checkout_product">
                <div>Đơn hàng {`(${cartData?.length} sản phẩm)`} </div>
                <Divider />
                <div className="checkout_product_wrap">
                  {cartData.map((item) => (
                    <div className="checkout_product_item" key={item.key}>
                      <div className="checkout_product_item_image">
                        <img alt={item.product.name} src={item.product.images[0]} />
                      </div>
                      <div className="checkout_product_item_info">
                        <p>{item.product.name}</p>
                        <p>{formattedPrice(item.product.price)}</p>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Form.Item>
                  <div className="checkout_product_total">
                    <table>
                      <tbody>
                        <tr>
                          <td>Tạm tính:</td>
                          <td>{formattedPrice(total)}</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: '1px solid #ccc',
                            paddingBottom: 20
                          }}
                        >
                          <td>Phí vận chuyển:</td>
                          <td>{formattedPrice(shippingFee)}</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: '1px solid #ccc',
                            padding: '20px 0'
                          }}
                        >
                          <td>Tổng tiền:</td>
                          <td>{formattedPrice(total + shippingFee)}</td>
                        </tr>
                        <tr style={{ paddingTop: 20 }}>
                          <td>
                            <i>Sau khi đặt hàng, chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.</i>
                          </td>
                        </tr>
                        <tr style={{ paddingTop: 20 }}>
                          <td>
                            <Link to="/cart">Quay về giỏ hàng</Link>
                          </td>
                          <td>
                            <Button htmlType="submit" loading={loading} type="primary">
                              Đặt hàng
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Form.Item>
              </article>
            </div>
          </Form>
        </Container>
      </section>
      <Footer />
    </>
  )
}
