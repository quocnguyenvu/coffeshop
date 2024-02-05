import { Descriptions, message } from 'antd'
import { useEffect, useState } from 'react'

import axiosClient from '@/config/axios'

export const PaymentInfomation = () => {
  const [payment, setPayment] = useState({})
  const [, setLoading] = useState(false)

  const fetchPayment = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get('payment')
      setPayment(response.data.payment)
    } catch (error) {
      message.error('Lỗi khi lấy thông tin thanh toán!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayment()
  }, [])

  return (
    <div>
      <Descriptions title="Thông tin thanh toán">
        <Descriptions.Item label="Tên tài khoản">{payment.accountName}</Descriptions.Item>
        <Descriptions.Item label="Số tài khoản">{payment.accountNumber}</Descriptions.Item>
        <Descriptions.Item label="Ngân hàng">{payment.bank}</Descriptions.Item>
        <Descriptions.Item label="QR code">{payment.qrCode}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}
