import { Link, useLocation } from 'react-router-dom';
import { Container } from '../../../components/Container';
import { Button, Divider, Form, Input, Radio, Space } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_USER_URL } from '../../../constants';
import { useMemo, useState } from 'react';
import { formattedPrice } from '../../../helper';
import { Footer } from '../../../components/Footer';
import { PageBanner } from '../../../components/PageBanner';

import './CheckoutPage.scss';
const { TextArea } = Input;

export const CheckoutPage = () => {
  const location = useLocation();
  const cartData = location.state.cartData;
  const [form] = Form.useForm();
  const total = cartData.reduce((total, item) => total + item.amount, 0);

  const [loading, setLoading] = useState(false);
  const [shipMethod, setShipMethod] = useState('save');
  const [paymentMethod, setpaymentMethod] = useState('cod');

  const shippingFee = useMemo(() => {
    if (shipMethod === 'save' && paymentMethod === 'cod') {
      return 30000;
    } else if (shipMethod === 'save' && paymentMethod === 'atm') {
      return 30000;
    } else if (shipMethod === 'fast' && paymentMethod === 'cod') {
      return 40000;
    } else if (shipMethod === 'fast' && paymentMethod === 'atm') {
      return 40000;
    }
    return 0;
  }, [shipMethod, paymentMethod]);

  const onFinish = async (values) => {
    const billData = {
      ...values,
      amount: total + shippingFee,
      products: cartData.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      setLoading(true);
      await axios.post(`${API_USER_URL}/order`, billData);
      toast.success('Đặt hàng thành công');
    } catch (error) {
      console.error('Error creating bill:', error);
      toast.error('Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBanner title="THANH TOÁN ĐƠN HÀNG" />
      <section id="checkout">
        <Container>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
            style={{ width: '100%' }}
            initialValues={{
              shipMethod: 'fast',
              paymentMethod: 'cod',
            }}
          >
            <div className="checkout_wrapper">
              <article className="checkout_info">
                <div className="checkout_form">
                  <div className="user-info">
                    <Form.Item
                      name="customerName"
                      label="Họ và tên"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập họ và tên!',
                        },
                      ]}
                    >
                      <Input placeholder="Nguyễn Văn A" />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      label="Số điện thoại nhận hàng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!',
                        },
                      ]}
                    >
                      <Input placeholder="0123456789" />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <Input placeholder="nguyenvana@gmail.com" />
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label="Địa chỉ nhận hàng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập địa chỉ!',
                        },
                      ]}
                    >
                      <Input placeholder="15 Tôn Đản, Mỹ Khê, Ngũ Hành Sơn, Đà Nẵng" />
                    </Form.Item>
                    <Form.Item name="note" label="Ghi chú">
                      <TextArea rows={4} placeholder="Ghi chú" />
                    </Form.Item>
                  </div>
                  <div className="payment-info">
                    <Form.Item name="shipMethod" label="Phương thức vận chuyển">
                      <Radio.Group
                        onChange={(e) => setShipMethod(e.target.value)}
                      >
                        <Space direction="vertical">
                          <Radio value="save">Giao hàng tiết kiệm</Radio>
                          <Radio value="fast">Giao hàng nhanh</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {shipMethod === 'save' && (
                      <div className="payment-info-atm">
                        <p>
                          Thời gian giao hàng dự kiến từ 3 - 5 ngày kể từ khi
                          đặt hàng.
                        </p>
                      </div>
                    )}
                    {shipMethod === 'fast' && (
                      <div className="payment-info-atm">
                        <p>
                          Thời gian giao hàng dự kiến từ 1 - 2 ngày kể từ khi
                          đặt hàng.
                        </p>
                      </div>
                    )}
                    <Divider />
                    <Form.Item
                      name="paymentMethod"
                      label="Phương thức thanh toán"
                    >
                      <Radio.Group
                        onChange={(e) => setpaymentMethod(e.target.value)}
                      >
                        <Space direction="vertical">
                          <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                          <Radio value="atm">Chuyển khoản ngân hàng</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    {paymentMethod === 'cod' && (
                      <div className="payment-info-atm">
                        <p>
                          Bạn vui lòng chuẩn bị đủ tiền để thanh toán cho nhân
                          viên giao hàng.
                        </p>
                      </div>
                    )}
                    {paymentMethod === 'atm' && (
                      <div className="payment-info-atm">
                        <p>
                          Bạn vui lòng chuyển khoản cho chúng tôi theo thông tin
                          dưới đây:
                        </p>
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
                          Nội dung chuyển khoản:{' '}
                          <b>[Số điện thoại] - [Họ và tên]</b>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
              <article className="checkout_product">
                <div>Đơn hàng {`(${cartData.length} sản phẩm)`} </div>
                <Divider />
                <div className="checkout_product_wrap">
                  {cartData.map((item) => (
                    <div className="checkout_product_item" key={item.key}>
                      <div className="checkout_product_item_image">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                        />
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
                            paddingBottom: 20,
                          }}
                        >
                          <td>Phí vận chuyển:</td>
                          <td>{formattedPrice(shippingFee)}</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: '1px solid #ccc',
                            padding: '20px 0',
                          }}
                        >
                          <td>Tổng tiền:</td>
                          <td>{formattedPrice(total + shippingFee)}</td>
                        </tr>
                        <tr style={{ paddingTop: 20 }}>
                          <td>
                            <i>
                              Sau khi đặt hàng, chúng tôi sẽ liên hệ với bạn để
                              xác nhận đơn hàng.
                            </i>
                          </td>
                        </tr>
                        <tr style={{ paddingTop: 20 }}>
                          <td>
                            <Link to="/cart">Quay về giỏ hàng</Link>
                          </td>
                          <td>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                            >
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
  );
};
