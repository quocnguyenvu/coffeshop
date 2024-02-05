import { Tabs } from 'antd'

import { Title } from '@components/Title'

import { PaymentInfomation } from './payment'

export const AdminInfomation = () => {
  const items = [
    {
      key: '1',
      label: 'Thông tin thanh toán',
      children: <PaymentInfomation />
    },
    {
      key: '2',
      label: 'Thông tin giao hàng',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Thông tin thanh toán',
      children: <PaymentInfomation />
    }
  ]

  return (
    <>
      <Title title="Thông tin" />
      <Tabs defaultActiveKey="1" items={items} />
    </>
  )
}
