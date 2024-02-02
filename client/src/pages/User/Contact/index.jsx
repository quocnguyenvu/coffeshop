import { Container } from '../../../components/Container'
import { Footer } from '../../../components/Footer'
import { PageBanner } from '../../../components/PageBanner'
import { Form, Input, Button, message, Divider } from 'antd'
import axios from 'axios'
import { API_USER_URL } from '../../../constants'
import { useRef } from 'react'

import './Contact.scss'

export const ContactPage = () => {
  const formRef = useRef()

  const onFinish = async (values) => {
    try {
      await axios.post(`${API_USER_URL}/send-mail`, values)
      message.success('Gửi email thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể. Cảm ơn bạn đã liên hệ với chúng tôi!')
      formRef.current.resetFields()
    } catch (error) {
      message.error('Gửi email thất bại! Vui lòng thử lại sau.')
    }
  }

  return (
    <>
      <PageBanner title="LIÊN HỆ VỚI CHÚNG TÔI" />
      <section id="contact">
        <Container>
          <article className="contact-header">
            <h2>Hãy cho chúng tôi biết tôi có thể giúp gì cho bạn?</h2>
            <p>Liên hệ với chung tôi qua những thông tin được cung cấp dưới đây</p>
            <p></p>
          </article>
          <Divider />
          <article className="contact-wrap">
            <article className="contact-info">
              <Divider style={{ borderColor: '#ccc' }} orientation="left">
                <span style={{ fontSize: 24 }}>Thông tin liên hệ</span>
              </Divider>
              <table>
                <tbody>
                  <tr>
                    <td>Địa chỉ:</td>
                    <td>123 Đường ABC, Quận XYZ, TP.HCM</td>
                  </tr>
                  <tr>
                    <td>Điện thoại:</td>
                    <td>0123 456 789</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <a href="mailto:abc@gmail.com"></a>
                    </td>
                  </tr>
                  <tr>
                    <td>Website:</td>
                    <td>
                      <a href="https://www.abc.com">www.abc.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <Divider style={{ borderColor: '#ccc' }} orientation="left">
                  <span style={{ fontSize: 24 }}>Kết nối với chúng tôi</span>
                </Divider>
                <div className="social">
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                      <path fill="#3f51b5" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path>
                      <path
                        fill="#fff"
                        d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"
                      ></path>
                    </svg>
                  </a>

                  <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                      <linearGradient
                        id="PgB_UHa29h0TpFV_moJI9a_9a46bTk3awwI_gr1"
                        x1="9.816"
                        x2="41.246"
                        y1="9.871"
                        y2="41.301"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#f44f5a"></stop>
                        <stop offset=".443" stopColor="#ee3d4a"></stop>
                        <stop offset="1" stopColor="#e52030"></stop>
                      </linearGradient>
                      <path
                        fill="url(#PgB_UHa29h0TpFV_moJI9a_9a46bTk3awwI_gr1)"
                        d="M45.012,34.56c-0.439,2.24-2.304,3.947-4.608,4.267C36.783,39.36,30.748,40,23.945,40	c-6.693,0-12.728-0.64-16.459-1.173c-2.304-0.32-4.17-2.027-4.608-4.267C2.439,32.107,2,28.48,2,24s0.439-8.107,0.878-10.56	c0.439-2.24,2.304-3.947,4.608-4.267C11.107,8.64,17.142,8,23.945,8s12.728,0.64,16.459,1.173c2.304,0.32,4.17,2.027,4.608,4.267	C45.451,15.893,46,19.52,46,24C45.89,28.48,45.451,32.107,45.012,34.56z"
                      ></path>
                      <path
                        d="M32.352,22.44l-11.436-7.624c-0.577-0.385-1.314-0.421-1.925-0.093C18.38,15.05,18,15.683,18,16.376	v15.248c0,0.693,0.38,1.327,0.991,1.654c0.278,0.149,0.581,0.222,0.884,0.222c0.364,0,0.726-0.106,1.04-0.315l11.436-7.624	c0.523-0.349,0.835-0.932,0.835-1.56C33.187,23.372,32.874,22.789,32.352,22.44z"
                        opacity=".05"
                      ></path>
                      <path
                        d="M20.681,15.237l10.79,7.194c0.689,0.495,1.153,0.938,1.153,1.513c0,0.575-0.224,0.976-0.715,1.334	c-0.371,0.27-11.045,7.364-11.045,7.364c-0.901,0.604-2.364,0.476-2.364-1.499V16.744C18.5,14.739,20.084,14.839,20.681,15.237z"
                        opacity=".07"
                      ></path>
                      <path
                        fill="#fff"
                        d="M19,31.568V16.433c0-0.743,0.828-1.187,1.447-0.774l11.352,7.568c0.553,0.368,0.553,1.18,0,1.549	l-11.352,7.568C19.828,32.755,19,32.312,19,31.568z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            <article className="contact-form">
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '20px'
                }}
              >
                <h3>Gửi tin nhắn cho chúng tôi</h3>
              </div>
              <Form onFinish={onFinish} name="control-hooks" ref={formRef}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập họ và tên của bạn!'
                    }
                  ]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập email của bạn!'
                    }
                  ]}
                >
                  <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại của bạn!'
                    }
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề!'
                    }
                  ]}
                >
                  <Input placeholder="Tiêu đề" />
                </Form.Item>
                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập nội dung!'
                    }
                  ]}
                >
                  <Input.TextArea rows={3} placeholder="Bạn muốn nói gì với chúng tôi?" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </article>
          </article>
        </Container>
      </section>
      <Footer />
    </>
  )
}
